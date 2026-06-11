---
title: "How I cleaned a 120-notebook mess"
description: "From 120+ Jupyter notebooks and sys.path hacks to an installable package with snapshot tests, and the unexpected payoff for AI coding."
date: 2026-06-11
tags: ["python", "jupyter", "data-engineering", "refactoring"]
draft: false
---

I was brought in to a repo built by data analysts with varying degrees of programming knowledge (I found the mismatch jarring: the same person could understand complex SQL queries on the fly and struggle with basic Python). 120+ Jupyter notebooks plus a dozen non-packaged .py files imported with sys.path hacks that broke with any change. Symptom-driven development: multiple drop_duplicates in succession, silent error coercion, datatypes cast back and forth, and no separation between input, output, cleanup and business logic.

## Surviving while learning

I couldn't stop the world and rewrite everything. I was still learning the domain and also had to deliver, so the first stage was sporadically cleaning things up: moving logic into functions and untangling the weird paths data would flow through the notebooks.

The scary part of every cleanup was changing an output without noticing. My answer was a crude, manual form of snapshot testing: before refactoring I would save the output, and afterwards check that the refactored code still produced the same thing. It gave me the confidence to make more aggressive refactors.

## Fail early and loud

What those cleanups and that manual diffing kept surfacing was always the same enemy: datatypes (yay for dynamically typed languages!). It came to a head with END2END, the most ambitious pipeline in the repo, hours of processing feeding a Tableau dashboard. Problems usually came from upstream phases where the bad datatype wasn't a problem yet, so nothing failed catastrophically (or it got coerced into a default) and I didn't notice until much later.

So I identified critical points, boundaries in the process, and checked extensively for correctness there. I went for fail early and loud: from then on I removed errors='coerce' and other silent error handling whenever I could, extending the guideline to the entire codebase and not just those spot checks.

## A real package

Checks tell you when something breaks; the next step was removing reasons for things to break. I made a proper installable package in src/ with proper reusable functions, and centralized database access and most input reading. My first concern was composability: you need client debt? Just call the function and presto. But it did something else too: it separated the read layer from the business logic. This would become very useful later on. Who knew that following the standard advice would be beneficial.

## Testing got cheap

Composability was the goal; testability was the gift. With the read layer separated, it was easy to keep a set of standard inputs and expected outputs for automated, much easier testing. What used to be me manually diffing outputs by hand became a systematic safety net of snapshot and golden tests.

## Sharpening the tools

Along the way I was also investing in the repo's tooling. A pre-commit hook to strip notebook output from commits (anyone who has diffed a notebook knows why), and since I was already messing with the tooling, ruff as well. And a small script for git worktrees: I had used them a bit when someone wanted a 'quick' thing, not just to avoid stashing my changes but because switching context meant pulling the data from scratch, which could take 10 minutes or more. Still, the setup was annoying enough (new worktree, reinstall the venv, copy the hooks over) that I rarely bothered. So I scripted it: one command gives me a fresh worktree with the venv dependencies installed and my pre-commit hooks in place. At the time it was just a convenience.

## The unexpected payoff: AI coding

Meanwhile I was getting more and more into AI coding. I had been using Copilot autocomplete and ChatGPT for bigger things, but remained unimpressed with agentic coding: I didn't trust an agent not to subtly break something, and checking every change by hand was more work than just doing it myself. Snapshot testing changed that equation. Let the agent make the change, run the snapshots against the expected outputs, and the question "did it break anything?" answers itself. Agentic coding went from a toy to something I could lean on. And the worktree script found its real purpose: spin up one worktree per agent and let several work in parallel, each in its own sandbox, while the snapshot tests keep them honest.

## You live and you learn

While writing this I learned that pandera or Great Expectations could have done many of the things I built by hand. You live and you learn.

But the lesson I keep coming back to is another one. I followed the most common advice in software, separate your concerns, chasing composability, and it kept paying me back in ways I never planned: testability first, then confidence, then a whole AI workflow. Who knew that following the standard advice would be beneficial in so many different ways.
