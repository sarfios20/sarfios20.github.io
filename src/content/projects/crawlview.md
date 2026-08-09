---
name: crawlview
description: Paste a URL and watch a site draw its own shape while it gets crawled, with broken links marked as they are found.
repo: https://github.com/sarfios20/crawlview
url: https://crawlview-production.up.railway.app
tags: ["elixir", "phoenix", "liveview", "otp", "crawler"]
year: 2026
featured: true
---

A crawler you watch instead of wait for. One GenServer owns each crawl and is the only thing that
writes its state, and fetches run in supervised tasks that are monitored but not linked, so a page
that blows up costs that page and nothing else. The live screen and the JSON API are two renderings
of the same snapshot.
