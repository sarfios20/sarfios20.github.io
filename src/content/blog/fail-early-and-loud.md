---
title: "Fail Early and Loud"
description: "TODO"
date: 2026-05-12
tags: ["data-engineering", "python", "pipelines"]
draft: true
---

<!--
SKELETON — pre-prose notes from Obsidian (/home/dav/Documents/blog-drafts/FAIL EARLY AND LOUD.md).
Raw bullets below, untouched. Develop into prose.
-->


Messy ad-hoc notebooks with defensive programming (multiple drop duplicates),  Data analysts that pushed their limits and that often needed things fast.
-
Thid repo was build by data analysts and as It grew they where unable to contain the maddness. I was brought in to help with scale and transforming ad-hoc notebooks for data extraction into repeatable pipelines. 
-
A common approach to solve problems was to treat symptoms and not the real cause.for example, I was perplexed when a drop_duplicates seemed to have failed to dedup my dataframe (trailing whitespaces in the db), the proposed solution: "do it again". At least now I understood why I had encountered this pattern in the codebase.
-
i and I decided against massive refactor all in one as many things where working even if held by duct tape and prayers. avoid premature optimization, feels the pain points and get stuff done. also I was worried that fixing one place could cause the duct tape to burst in another.


deliver the deliverable but accumulating tech deb and failing to produce a system or if producing a system is a frail one. generating downstream or lacking a downstream


sometimes different stages expected and transformed the same data to different datatypes back and fort


END2END pipeline most ambitious project
-
the foundations simply could not hold this system.
-
END2END pipeline was slow it would take hours and use much of the cornucopia of my 8gb of RAM, limiting what kind of work I could do in the meantime. 


was failing each time we updatet the tableau, often an error that passed silently several stages caused problems. each time I had to start again from earlier phases, sometimes I would need several iterations to find the root cause.


solution: ensure correctness at critical checkpoints and try to fix problems as upstream as possible, as opposed to "I fix it when it happens to be a problem". this prevented errors downstream so fixing (and noticing them) was faster and easier. I put my sights in particular in inputs and outputs even if it meant adding yet another data conversion. not only it was easy and fast to do, it also open the door to the tool I needed for more profound changes: snapshot testing


then when fixing a problem or when I had time I added this fail early and loud gulideline in normal operations between this checkpoints, turning laxness into stricness. this was less necesary having the checkpoints so i didn't prioritized but still and over time it lead to an improved codebase


result: Now updating the END2END tableau often works and where updating it used to be a slog now at least works (still a heavy proccess that takes hours to complete) and that allowed to little by little automate the process, my next step is to use my old laptop (now that I have been upgraded to a better one) as a makeshift server automatically launching this and other routine processes and perhaps a primitive ssh, but more on that another time


bonus: writing this led to me thinking that this problem surely other people has encountered it and solved already and sure enough there seems to be multiple options, such as pandera or great expectations. Any of them is probably a better option that my home made clean_dataframe function. you live and you learn 


about your problem: **is already solved**
