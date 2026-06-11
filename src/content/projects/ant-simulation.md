---
name: ant-simulation
description: Ant foraging simulation where the optimal route emerges with no central control, just local pheromones and evaporation.
repo: https://github.com/sarfios20/ant-simulation
tags: ["javascript", "canvas", "simulation", "emergent order"]
year: 2026
featured: true
draft: false
---

Open-world ant colony in the style of Sebastian Lague: two pheromones (one toward food, one toward the nest) with decaying deposits and per-type evaporation rates. Each ant only senses its immediate surroundings, yet the colony converges on the fast route in virtually every run, discarding the slow detour through the mud. Pure JavaScript on canvas, no dependencies and no server, with the logic isolated in a core validated by a headless test.
