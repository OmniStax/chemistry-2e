# Plan: 10.4 Phase Diagrams

Written before the build on 2026-09-28 and applied without a check-in, as `ch10/config.md` records.

## Sub-concepts

| Span | Header | Concepts |
|---|---|---|
| `phase-diagram` | Phase diagrams | phase-diagram (introduces) |
| `water-diagram` | The phase diagram of water | read-phase-diagram (introduces), solid-liquid-curve-slope (introduces), vapor-pressure-and-temperature, boiling-point (uses) |
| `triple-point` | The triple point | triple-point (introduces) |
| `ex-water-state` | Example 10.11 | read-phase-diagram (uses) |
| `carbon-dioxide` | The phase diagram of carbon dioxide | solid-liquid-curve-slope (reinforces), read-phase-diagram (reinforces) |
| `ex-co2-state` | Example 10.12 | read-phase-diagram (uses) |
| `supercritical` | Supercritical fluids (the book's header) | critical-point-and-supercritical-fluid (introduces) |
| `ex-critical-co2` | Example 10.13 | critical-point-and-supercritical-fluid (uses) |
| `decaf` | the note Decaffeinating Coffee Using Supercritical CO₂ | critical-point-and-supercritical-fluid (uses) |

## Figures

- sim-phase · Figure 10.30 + 10.31 + 10.34 · phase-diagram, read-phase-diagram, triple-point, solid-liquid-curve-slope, critical-point-and-supercritical-fluid · value add: variation by slider and choice (the reader walks a state point across the diagram and sees the state named, the isobar's crossings listed, and the molecules of the sample rearrange), standardisation (both substances on one honest log-pressure frame drawn from measured data) · still: nothing in the idea has a clock; the molecule window morphs between arrangements when the state changes · choice substance (water, carbon dioxide; the generic 10.30 is carried by the transition names written at each crossing); sliders T (temperature, °C, one slider per substance so each spans its own axis) and P (pressure, kPa, a geometric series of values on a log track, shown in kPa) with dashed special circles at the triple point, the critical point, 1 atm, and the melting, boiling or sublimation temperature at the current pressure · headline names the state at the live T and P, or the phases in equilibrium on a curve · graph left, molecule window beside it at the right · 2D: a pressure-temperature graph is a relation between quantities (rule 28.1); the window is a flat strip of readings, not a scene to turn.
  Defaults: water, −10 °C, 50 kPa (Example 10.11 (a)). Curves: water from steam-table vapor pressures, the ice vapor-pressure table and a melting curve falling 10 °C by 110,000 kPa, on axes of −50 to 600 °C and 0.01 to 100,000 kPa; carbon dioxide from its triple point (−56.6 °C, 518 kPa) and critical point (31.1 °C, 7380 kPa) through the Clausius-Clapeyron form, sublimation with ΔH_sub = 26.1 kJ/mol, melting rising 83 °C per 10⁶ kPa as the book's diagram draws it. Water's critical pressure is the book's 22,089 kPa. Region names in ink; the dashed isobar and the P axis in the pressure hue, the T axis and the crossing temperatures in the temperature hue. Labels: region names (five at most), triple and critical point labels, crossing names at the isobar (at most three); nothing else carries an entity label; molecules are named in the window's legend line.
- fig-freezedry · Figure 10.32 · photograph, kept: the text points at it (freeze-drying by sublimation).
- fig-icemelt · Figure 10.33 · photograph, kept: the text points at it (glacier movement).
- fig-critfluid · Figure 10.35 · photograph series, kept: the four photographs are the evidence of the vanishing meniscus.
- fig-supcritcof · Figure 10.36 · kept as the book's image: (a) a caffeine ball-and-stick named in the note and (b) a flow schematic; neither varies or moves (rule 24.9, a molecule merely named).

Exercise images, kept in the prompt or answer: `CNX_Chem_10_04_Ex06answer_img.jpg`, `CNX_Chem_10_04_CPhaseDi_img.jpg`, `CNX_Chem_10_04_Exercise10a_img.jpg` to `10d_img.jpg` (the answer images carry the book's "Water (liquid)" label error, printed as the book has it).

Extra simulations: none; the one figure carries the section's three ideas.

## Tables

The unnumbered critical-point table in the text as `div.book-table` without a number, cells in °C and kPa as printed.

## Binds

`temperature` and `pressure` only (chapter `COLOR.md`).

## Exercises

- Inline: `cyl1` (Example 10.11, open, keyed), `cyl2` (Example 10.12, open, keyed), `cyl3` (Example 10.13, open, keyed).
- End of section (54 to 63): 54 `fs-idm158754672` unkeyed conceptual, open with an AI approach; 55 `fs-idm163161056` keyed open; 56 `fs-idm134300544` unkeyed numerical, left out; 57 `fs-idm79316176` keyed open; 58 `fs-idm31738208` unkeyed, AI approach; 59 `fs-idm184592816` keyed open with its answer image; 60 `fs-idm180256816` unkeyed numerical, left out; 61 `fs-idp24718944` keyed open; 62 `fs-idm97492688` unkeyed, AI approach; 63 `fs-idm135170880` keyed open with its answer images.

## Wanted at chapter level

- none

Applied by the chapter pass (2026-09-28): nothing wanted.
