# Plan: 4.5 Quantitative Chemical Analysis

Written 2026-09-28 before building, per root rule 5; left for review after, as `ch04/config.md` records.

## Sub-concepts (spans)

| Span | Header | Introduces |
|---|---|---|
| `quantitative` | Quantitative analysis | quantitative-analysis |
| `titration` | Titration | titration |
| `titration-calc` | Calculating a concentration from a titration | titration-calculation (states eq-molarity-mmol and the variable M) |
| `ex-titration` | Example 4.14 · Titration Analysis | (uses) |
| `gravimetric` | Gravimetric Analysis | gravimetric-analysis |
| `ex-gravimetric` | Example 4.15 · Gravimetric Analysis | (uses) |
| `combustion` | Combustion analysis | combustion-analysis |
| `ex-combustion` | Example 4.16 · Combustion Analysis | (uses) |

The book prints two headers (Titration, Gravimetric Analysis); the span `titration-calc` opens before Example 4.14 with its own header in the book's voice, and `combustion` opens at the paragraph that defines combustion analysis. Summary to `summary_html`; objectives and glossary (10 terms) to the tables. No boxed notes and no Link to Learning in this module.

## Figures

- fig-buret · Figure 4.16 · photo · titration · kept: the text points at it for the buret, and panel (b) shows the 0.01 mL reading · none · none · 2D
- sim-titration · Sim · titration, titration-calculation · flow by animation and variation by slider: the reader watches titrant leave the buret drop by drop until the indicator turns, and sees on the graph that the end point is where the millimoles of NaOH delivered reach the millimoles of HCl in the sample · moving, the titrant runs from the buret at a steady rate and stops at the end point, since a titration has a clock in it · sliders: NaOH molarity (concentration), sample volume (volume), HCl molarity (concentration); defaults 0.250 M, 50.00 mL, 0.176 M reproduce Example 4.14 (end point 35.2 mL) · headline states the volume delivered and, at the end point, the HCl molarity · graph beside (the buret is a vertical scene): mmol against mL of NaOH, the NaOH line rising to the dashed level of mmol HCl, fixed axes 0–50 mL and 0–20 mmol · 2D: the bench is drawn flat because the lesson is the volume read against the millimoles, not the shape of the glassware; the book's rule puts a buret in 3D as a bench, and that is argued past here since a turned buret adds no view the scale does not already give
- fig-map7 · Figure (unnumbered route of Example 4.14) · titration-calculation · standardisation: the book's route boxes redrawn with each box in the hue of the quantity it holds · still, a faithful copy · none · headline names the route · none · 2D
- fig-filter · Figure 4.17 · photo · gravimetric-analysis · kept: the text points at it for the filtration of a precipitate · none · none · 2D
- fig-map8 · Figure (unnumbered route of Example 4.15) · gravimetric-analysis · standardisation · still, a faithful copy · none · headline names the route · none · 2D
- sim-combustion · Figure 4.18 · combustion-analysis · variation by slider: the reader sets the mass each absorber gains and reads the moles of C and H and the formula they give · still, the absorbers answer the sliders and nothing flows that the reader needs to watch · sliders: mass of CO₂ absorbed (mass), mass of H₂O absorbed (mass); defaults 3.94 mg and 1.61 mg, Example 4.16's polyethylene · headline states the H-to-C ratio and the formula · none, the readings sit under each absorber · 2D, flat schematic as the book draws it; the gas stream is notation here (a symbolic arrow), not animated
- fig-combmap · Figure (unnumbered flow chart of Example 4.16) · combustion-analysis · standardisation · still, a faithful copy · none · headline names the two routes · none · 2D

Colours that are physical facts: the pink of the indicator at the end point (phenolphthalein pink, `INDICATOR_PINK`), the green and blue grains of the two absorbers in Figure 4.18 as the book draws them (`H2O_ABSORBER`, `CO2_ABSORBER`), the furnace's glow (`FURNACE`). Route boxes of a percent, a mole ratio or a formula are untyped and ink.

Labels (26.7): the titration labels the buret, the flask and the two lines of the graph once each; the drops are unlabelled and carry a hover name. Figure 4.18 labels its five parts, as the book does, and each absorber's reading.

## Binds

`volume`, `concentration`, `amount`, `mass`. The sim-titration draws volume, concentration and amount; the combustion figure draws mass and amount; the routes draw what their boxes hold.

## Exercises

- Check Your Learning, 3, all keyed, inline after each example with a host: cyl1 (0.2648 M), cyl2 (23.76%), cyl3 (CH, open).
- End of Chapter, 9 keyed kept: fs-idm186096, fs-idp52490448, fs-idm17012464, fs-idp87527952, fs-idp969280, fs-idp26486752, fs-idp97761872, fs-idp204697696, fs-idp13191008.
- Left out, unkeyed and numerical: fs-idm9962448, fs-idm31045184, fs-idp68782720, fs-idp205066064, fs-idm26094912, fs-idp204713328, fs-idp69216752, fs-idp126088400, fs-idm1209456.

## Extra simulations considered

None built beyond the titration Sim. A gravimetric balance Sim was judged against Example 4.15's route and dropped: it would only restate one multiplication chain.

## Wanted at chapter level

- anchor: eq-molarity-mmol → 4.5-titration-calc
- anchor: variables 4.5/M → 4.5-titration-calc
- edge: titration-calculation → molarity (3.3)
- edge: combustion-analysis → empirical-formula (3.2)
- edge: gravimetric-analysis → percent-composition (3.2)

Applied by the chapter pass: eq-molarity-mmol and variable 4.5/M anchored at 4.5-titration-calc; the three edges merged (gravimetric-analysis → percent-composition).
