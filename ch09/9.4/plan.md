# Plan: 9.4 Effusion and Diffusion of Gases (m68754)

Source: `source.md`, converted with `python3 tools/convert.py 9.4`.
Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins (`config.md`); left for review after the build.

Two learning objectives, four numbered figures (9.27 to 9.30: three sketches and one pair of photographs), three worked examples (9.20 to 9.22) each with a Check Your Learning, one How Sciences Interconnect note, no numbered table, nine end-of-chapter exercises of which five are keyed, and five glossary terms. The section prints no header of its own, so the page's headers split it (config: Headers).

## Sub-concepts (page headers)

1. `mean-free-path` **Collisions and the mean free path** (the opening paragraph). Introduces `mean-free-path`.
2. `diffusion` **Diffusion and effusion** (diffusion, Figure 9.27 + 9.28, the rate of diffusion and its equation, the factors it depends on, effusion). Introduces `diffusion-and-effusion`; uses `mean-free-path`.
3. `graham` **Graham's law of effusion** (Graham's statement, its two equations, Figure 9.29). Introduces `grahams-law`; uses `diffusion-and-effusion`, `molar-mass`.
4. `graham-calc` **Calculations with Graham's law**: Example 9.20 `ex-h2-o2`, Example 9.21 `ex-xe-ne`, Example 9.22 `ex-unknown`, each with its Check Your Learning inline. Introduces `grahams-law-calculations`; uses `grahams-law`.
5. `uranium` **Enriching uranium by gaseous diffusion** (the How Sciences Interconnect note, Figure 9.30). Uses `grahams-law`, `diffusion-and-effusion`.

## Figures

- `sim-bulbs` · Figure 9.27 + 9.28 · diffusion-and-effusion, grahams-law · the book's three frozen stages (closed, just opened, some time after) become one running process, and the reader sees why "just after" has more of the lighter gas on the far side: each molecule's speed is drawn in proportion to 1/√ℳ, and the counts on the strip beneath show the lighter gas crossing first; Figure 9.28's effusion is the second state of the same bulbs, the right bulb emptied and the tube narrowed to a pinhole; tier: a moving particle picture, the chapter's gas box reused · moving: the molecules travel, since the lag of the heavier gas in time is the whole idea; a continuous run with the transport and no scrubber, as 9.2's gas box; choosing any control restarts from the separated state · choices (rule 26.1): process (diffusion, effusion), stopcock (closed, open), gases (H₂ and O₂, the book's; Ne and Xe, Example 9.21; CH₄ and CO₂, Example 9.22) · headline: how many molecules of each gas have reached the right bulb · strip beneath with the counts in each bulb, one bar per gas in `F.cat(0)`, `F.cat(1)` with the formula beside it, and the Graham readout with ℳ in the mass hue · 3D, physical: a particle picture in glass bulbs (book `RULES.md`), no ground, the orbit free in yaw and pitch held within ±70° so the stopcock stays readable, no idle spin since the molecules already move; flat fallback from `F.view3d`.
- `fig-balloons` · Figure 9.29 · photo, kept: the two balloons are the experiment that shows Graham's law (config: Photographs).
- `sim-diffuser` · Figure 9.30 · diffusion-and-effusion, grahams-law · flow by animation: the book's cylinder, porous barrier tube, feed, depleted and enriched streams, every UF₆ molecule a uranium disc in its element colour with its isotope's referent ring (²³⁵UF₆ `uf6-235`, ²³⁸UF₆ `uf6-238`), since the isotope is the only difference (chapter `COLOR.md`), and the reader sees the separation happen rather than imagining it from frozen arrows; hover names on the molecules; tier: moving, set by the arrows · arrows: kinematic (the feed flowing in, the flow along the tube, the six crossings through the barrier, the depleted and enriched streams leaving); no notation arrows · moving: the UF₆ molecules flow along the tube in two staggered lanes, ²³⁵UF₆ far more often than ²³⁸UF₆ passing through the barrier, wandering the shell in straight runs (behind the tube from the upper half) and leaving by the enriched outlet, the rest carried on to the depleted outlet; a 5 s loop with a 1.2 s hold, seamless because each shell path lasts three loops and carries three molecules a loop apart; the book's arrows are deleted, the motion carries them, and drawn faint only under reduced motion · no sliders or choices, since no quantity of the plumbing varies · headline none; labels as the book's; readout Graham's law for the two isotopes, ℳ in the mass hue, giving 1.0043, the book's 0.4% · 2D (the book prints it flat; a plumbing diagram, not a particle box the reader must turn).

The Graham's law examples get no figure of their own: `sim-bulbs` carries the gas pairs of Examples 9.20 to 9.22 and its readout computes the book's ratio for the chosen pair.

## Exercises

Inline: three Check Your Learning items after Examples 9.20, 9.21, 9.22 (79 mL/s → 52 mL/s; 32 h; 162 g/mol), each with a `data-place` host.
End: fs-idp190361360 (4.2 h, number), fs-idm51619904 (unkeyed conceptual, kept with an AI approach), fs-idp44111184 (keyed derivation, open), fs-idm14659040 (keyed list, open), fs-idm4750352 (1.4; 1.2, multi), fs-idp1096352 (51.7 cm, number). Left out as unkeyed numerical: fs-idm54751408, fs-idm82361856, fs-idm32668896. No `source_section`, no simulation-exercise.

## Binds

`mass` (ℳ_A, ℳ_B in the readout of `sim-bulbs`). Time is not read. Rate of effusion is words and ink. Molecules in `F.el`; bars and rings in `F.cat`.

## Notes

No Link to Learning in this section. Errata kept as printed: the key equation's √m beside √ℳ (not printed, it is the equations table); the uranium note's "only about 0.4% enrichment, is achieved" sentence.

## Wanted at chapter level

- eq-rate-of-diffusion → 9.4-diffusion
- eq-graham → 9.4-graham
- MM_A → 9.4-graham
- MM_B → 9.4-graham

### Applied by the chapter pass

Every item above was applied on 2026-09-28: the two equations and the two variable rows carry the anchors listed.
