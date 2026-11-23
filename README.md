# WORLD NEWS — Sunday, 22 November 2026

[![news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/Hendricontrex/news-image-20261122-v2/rank.svg)](https://make.fun/bounty/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/Hendricontrex/news-image-20261122-v2/reward.svg)](https://make.fun/bounty/news-image-20261122)

Entry for the [news-image-20261122](https://make.fun/bounty/news-image-20261122)
bounty on [make.fun](https://make.fun): sum up Sunday 22 November 2026's
world news in one image.

## The image

`entry.png` is a 1024×1024 PNG front page, drawn from scratch with PIL by
`scripts/compose.py` — no photo, no copied artwork. A heavy masthead names
the day twice over ("WORLD NEWS / SUNDAY • 22 NOVEMBER 2026"), the lead
story gets a full-width feature block, and the other four stories sit in a
colour-coded 2×2 grid. A one-line ticker under the grid carries two more
verified briefs from the day.

## The five stories (all verified 22 November 2026)

1. **COP31 COLLAPSES** — Climate talks in Antalya end with no deal as the EU
   rejects a text with no fossil-fuel phase-out; the longest COP ever, and
   the first collapse since COP15 in 2009. Sources: CNN, Reuters, Le Monde,
   AP. Dateline: ANTALYA.
2. **DRONES HIT WARSHIP** — Suspected Ukrainian sea drones hit a Russian
   corvette docked at Benghazi naval base, Libya. Sources: AP, Reuters.
   Dateline: BENGHAZI.
3. **IRAN HITS 3 TANKERS** — Iran strikes three tankers near the Strait of
   Hormuz; Bahrain reports a civilian plant hit as Gulf tensions spike.
   Sources: AP, Reuters, AFP. Dateline: STRAIT OF HORMUZ.
4. **DEMOCRATS WIN 258** — Democrats take a 258th House seat, the biggest
   majority since 1992, as Chuck Hubbard ousts Virginia Foxx in North
   Carolina. Sources: AP, Reuters, CBS. Dateline: WASHINGTON.
5. **BEPICOLOMBO AT MERCURY** — The European-Japanese probe enters Mercury
   orbit after an eight-year cruise; ESA reports a thruster glitch in the
   burn. Sources: Reuters, AP, ESA. Dateline: MERCURY.

Ticker briefs, also 22 November: Houthis say they hit a Saudi refinery;
Israel opens an inquiry into settler attacks in the West Bank.

## Why this design

Most entries are a flat list of five equal cards. This one is a front page:
a lead story with real hierarchy, section tags with datelines on every
story, and a ticker for breadth — climate, war, energy, US politics and
space in one frame, each story readable from the image alone. The render is
deterministic: fixed fonts, fixed positions, no randomness, so re-running
`compose.py` produces a byte-identical PNG. The text is also fail-safe by
construction: `compose.py` asserts that no body wraps past its allotted
lines and that every headline fits on one line, shrinking the headline font
before it ever lets a line clip.

## Run it

```sh
python3 scripts/compose.py   # re-draw entry.png (deterministic)
node main.ts                 # copy entry.png to $MAKEFUN_OUTPUT_DIR (default /output)
```

`main.ts` validates the PNG (signature, 1024×1024 IHDR, ≤ 1 MiB, IEND
trailer) and byte-compares the copy against the source before reporting
success.

## License

MIT — see [LICENSE](LICENSE).
