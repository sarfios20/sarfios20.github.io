---
title: "How I cleaned a 120-notebook mess"
description: "From 120+ Jupyter notebooks and sys.path hacks to an installable package with snapshot tests, and the unexpected payoff for AI coding."
date: 2026-06-11
tags: ["python", "jupyter", "data-engineering", "refactoring"]
draft: false
---

I was brought in to a repo built by data analysts with varying degrees of programming knowledge (I found the mismatch jarring: the same person could understand complex SQL queries on the fly and struggle with basic Python). 120+ Jupyter notebooks plus a dozen non-packaged .py files imported with sys.path hacks that broke with any change. Symptom-driven development: multiple drop_duplicates in succession, silent error coercion, datatypes cast back and forth, and no separation between input, output, cleanup and business logic.

To be fair to them the underlying database didn't help: it was really ad hoc SQL tables the BI team built for specific Tableau dashboards, not made for analysts to be pulling data directly and joining with other tables, which often involved quite a tortuous route. To give you a taste: every table had a ZONA column, and it never meant the same thing twice. Sometimes it held the zone, sometimes its internal code, sometimes a brand name stored as a literal, and which one depended on the zone itself and even on the date of the row. Joining two tables often involved a CASE expression as the join key, with hardcoded lists of special zones.

## Surviving while learning

I couldn't stop the world and rewrite everything. I was still learning the domain and its many quirks, and also had to deliver, so the first stage was sporadically cleaning things up: moving logic into functions and untangling the weird paths data would flow through the notebooks.

The scary part of every cleanup was changing an output without noticing. My answer was a crude, manual form of snapshot testing: before refactoring I would save the output, and afterwards check that the refactored code still produced the same thing. This gave me the confidence to make more aggressive refactors.

## Fail early and loud

What those cleanups and that manual diffing kept surfacing was often the same enemy: datatypes (yay for dynamically typed languages!). It came to a head with END2END, the most ambitious pipeline in the repo, hours of processing (on an 8GB RAM laptop) feeding a Tableau dashboard. Problems usually came from upstream phases where the bad datatype wasn't a problem yet, so nothing failed catastrophically (or it got coerced into a default) and I didn't notice until much later.

So I identified critical points, boundaries in the process, and checked extensively for correctness there. I went for fail early and loud. This caused quite a bit of work, as one fix could create problems in other parts of the pipeline that now gave loud errors. From then on I removed errors='coerce' and other silent error handling whenever I could, extending the guideline to the entire codebase and not just those spot checks.

## A real package

Checks tell you when something breaks; the next step was removing reasons for things to break, and the sys.path hacks were at the top of that list. If I moved a notebook into a folder to organize things, every import that depended on it broke, and any fix had to work on my coworker's paths too, not just mine. At the same time I was unifying the read layer for the old and the new billing system, one place that would deal with the SQL quirks in an abstract, composable way, which meant running head-first into those hacks every day. So I made a proper installable package in src/ with proper reusable functions, and centralized database access and most input reading. My first concern was composability: you need client debt? Just call the function and left join with your dataframe. But it did something else too: it separated the read layer from the business logic. This would become very useful later on.

## Testing got cheap

Composability was the goal; testability was the gift. With the read layer separated, it was easy to keep a set of standard inputs and expected outputs for automated, much easier testing. What used to be me manually diffing outputs by hand became a systematic safety net of snapshot and golden tests.

## Improving tooling

Along the way I was also investing in the repo's tooling. A pre-commit hook to strip notebook output from commits (anyone who has diffed a notebook knows why), and since I was already messing with the tooling, ruff as well. And a small script for git worktrees: I had used them a bit when someone wanted a 'quick' thing, not just to avoid stashing my changes but because switching context meant pulling the data from scratch, which could take 10 minutes or more. Still, the setup was annoying enough (new worktree, reinstall the venv, copy the hooks over) that I rarely bothered. So I scripted it: one command gives me a fresh worktree with the venv dependencies installed and my pre-commit hooks in place. At the time it was just a convenience but would come in handy later on.

## The unexpected payoff: AI coding

I had been using Copilot autocomplete and ChatGPT for bigger or more complex things, but remained unimpressed with agentic coding: I didn't like how things would turn out and there was a lot of specific context that you had to know. Around January I tried and very much liked Claude Opus 4.5. I found it to be a game changer and quickly set out to create a workflow based on agentic AI. Luckily I already had all the tools I needed: snapshot testing, worktree scripts and the composable read functions that deal with the underlying complexity (such as client migrations to the new billing system or the weird roundabout ways to join tables). This allowed me to quickly spin up a new worktree, explain what I needed and let the agent work: the read functions made it easy for the agent to pull data and avoid the gotchas, and the snapshot tests answered the question I cared about, did it break anything? With each agent isolated in its own worktree I could even have several tasks running in parallel while I managed their work. I do have to admit that while it works for easy "glue" tasks, quickly switching between tasks makes me less able to focus deeply and more likely to miss important details, so for breaking new ground I have to be careful and not be dispatching agents left and right.

## Common advice is good advice

While writing this I learned that pandera or Great Expectations could have done many of the things I built by hand. Well, you live and you learn.

But the lesson I keep coming back to is another one. When I first joined I didn't want to overengineer things, as that could make things difficult for my coworkers. So I waited to feel the pain before making changes, and when I did, I followed the common bread and butter software development advice: separate your concerns, fix the cause and not the symptom, fail early and loud, don't repeat yourself, automate your setup, don't change data types 4 times in a row, and so on. Those changes kept resulting in benefits I did not foresee at the time: testability first, then the confidence to refactor aggressively, more robust pipelines, task switching without the 10-minute data pull, and finally read functions that facilitate the AI workflow.

Who knew that following the standard advice would come in handy in so many different ways.
