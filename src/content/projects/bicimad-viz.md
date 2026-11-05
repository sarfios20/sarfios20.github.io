---
name: bicimad-viz
description: "Madrid's public e-bike system on one page: where the stations are, how the city empties and fills hour by hour, and how many trips it takes a day. All from open data."
repo: https://github.com/sarfios20/bicimad-viz
url: https://bicimad-viz.pages.dev
tags: ["python", "open-data", "svg", "dataviz"]
year: 2026
featured: false
---

A Python script downloads six open data sources from Madrid's portal and the EMT (the portal API, the GBFS availability feed, district GeoJSON and a 315 MB ZIP of trip records) and aggregates the 4.1 million trips of 2022 in about five seconds with multiprocessing. The page on top is plain HTML and SVG with no dependencies. The dashboard itself is in Spanish.
