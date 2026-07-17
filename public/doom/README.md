# DOOM easter egg — third-party assets

This folder holds a self-hosted, lazy-loaded build of the original **DOOM (1993)**
that powers the site's easter egg. None of this is original site code — it is
only fetched when a visitor actually opens the game.

## Engine
[js-dos](https://js-dos.com) v8.4.1 ([source](https://github.com/caiiiycuk/js-dos)) —
DOSBox compiled to WebAssembly. Distributed under the GPL.

- `js-dos.js`, `js-dos.css`
- `emulators/*` (including `wdosbox.wasm`, the DOSBox core)

## Game data — `doom.jsdos`
A js-dos bundle containing the DOS `DOOM.EXE` and the **shareware** `DOOM1.WAD`
(v1.9, MD5 `f0cefca49926d00903cf57551d901abe`, 4,196,020 bytes — "Knee-Deep in
the Dead"). The DOOM shareware episode is freely redistributable under id
Software's shareware license; this is **not** the commercial "Ultimate DOOM"
data. DOOM © id Software.

The DOOM engine source was released by id Software under the GPL; the DOSBox /
js-dos WebAssembly builds here are distributed under that license. This project
is itself GPL-3.0, so redistributing these GPL builds alongside it is compatible.
