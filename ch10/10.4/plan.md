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

- sim-phase · Figure 10.30 + 10.31 + 10.34 · phase-diagram, read-phase-diagram, triple-point, solid-liquid-curve-slope, critical-point-and-supercritical-fluid · value add: variation by slider and choice (the reader walks a state point across the diagram and reads the state, and the line of constant pressure through it gives the melting, boiling or sublimation temperature at that pressure, which is how Examples 10.11 and 10.12 and their Check Your Learning questions read the diagram), and an honest scale: both substances drawn to scale from measured data on a logarithmic pressure axis, water with a close-up strip of −12 to 3 °C beside its full diagram on the same pressure axis, so the lean of its solid-liquid curve is seen at its true size rather than "greatly exaggerated for clarity" as the book's 10.31 draws it · arrows: none (the book's 10.30 transition arrows are symbolic; their names go into the curve key) · still: nothing in the idea has a clock; the molecule window eases between arrangements when the state changes, and a change of substance bends one set of curves into the other · choice substance (water, carbon dioxide); sliders T (temperature, °C; water −50 to 500, carbon dioxide −100 to 100, the slider's range eased to the substance's axis) and P (pressure, kPa, stepped on a log track through 1, 1.5, 2, 2.5, 3, 4 … 9 of each decade, so every pressure of the examples and exercises is a stop) with dashed specials at the triple point, the critical point, 1 atm, and on T the crossings at the current P · headline names the state in a sentence, or the phases in equilibrium on a curve; the readout writes the reading as one chain, the transition temperatures at the current pressure in order with T set among them (T_melt = 0.0 °C < T = 25.0 °C < T_boil = 96.7 °C) · graph left, molecule window at the right · 2D: a pressure-temperature graph is a relation between quantities (rule 28.1); the window is a flat strip, every molecule seen (rule 28.5).
  works: parts: two axes, temperature (°C, linear) along the bottom and pressure (kPa, logarithmic) up the side; three curves, solid-gas (AB), liquid-gas (BC) and solid-liquid (BD), meeting at the triple point B; the liquid-gas curve ending at the critical point C, from which dashed lines run up and to the right to fence the supercritical fluid; four regions named in ink; for water a second, narrower panel at the left on the same pressure axis covering −12 to 3 °C, its strip shaded in the full diagram; the state point, its dashed line of constant pressure across every panel, a hollow dot where that line crosses a curve with the crossing temperature beside it; a key naming each curve with its pair of transitions (the content of 10.30's arrows); a window of molecules beside the graph · flow: none; a change of state rearranges the window's molecules · must hold: (1) the three curves meet at one point, the triple point, and the liquid-gas curve stops at the critical point; (2) water's solid-liquid curve leans left (melting point falls as pressure rises) and carbon dioxide's leans right, each to scale, the lean of water's readable in the close-up; (3) carbon dioxide's triple point stands above 1 atm (101 kPa), so its isobar at 1 atm crosses only the solid-gas curve, at −78 °C; (4) water's isobar at 1 atm crosses at 0 °C and 100 °C; (5) Example 10.11 (a), −10 °C and 50 kPa, is in the ice region and the opening state; (6) the critical points sit at 374 °C and 22,089 kPa (water) and 31.1 °C and 7380 kPa (carbon dioxide), the triple points at 0.01 °C and 0.6117 kPa and −56.6 °C and 518 kPa; (7) the close-up and the full diagram agree: the same pressure gives the same isobar height in both, and the same crossing temperatures; (8) the window shows one phase in a region, two with their boundary on a curve, three at the triple point, and one with no boundary above the critical point; (9) nothing unnamed: curves in the key, points labelled, regions named, the isobar carries its pressure, molecules named over the window · read off the image: 10.30 has no numbers: regions Solid, Liquid, Gas, the critical point and triple point, and arrow pairs Melting/Freezing, Vaporization/Condensation, Sublimation/Deposition. 10.31 marks 0.6, 101 and 22,089 kPa and 0, 0.01, 100 and 374 °C, labels A, B, C, D, "Ice (solid)", "Water (liquid)", "Water vapor (gas)", and is not to scale (its 0 to 0.01 °C gap is as wide as 0 to 20 °C, and its solid-liquid curve leans by tens of degrees); 10.34 runs −100 to 100 °C and 10 to 1,000,000 kPa on a log axis, names Solid, Liquid, Gas, SCF and T_C, and draws the solid-liquid curve rising steeply from the triple point and bending right near 300,000 kPa. The figure draws carbon dioxide's solid-liquid curve from the Span-Wagner melting equation (−37 °C at 100,000 kPa; past 31 °C above about 590,000 kPa, where the solid borders the supercritical fluid), which follows the image's shape without its sharp bend. The book's answers to Example 10.11's Check Your Learning (s → g at −58 °C at 0.3 kPa; l → g at 78 °C at 50 kPa) and 10.12's (l → g at −10 °C at 1500 kPa; s → g at −60 °C at 50 kPa) are not what measured data or the book's own images give; the figure gives −8 °C, 81 °C, −28 °C and −87 °C.
  Defaults: water, −10 °C, 50 kPa (Example 10.11 (a)); carbon dioxide opens at −30 °C and 2000 kPa (Example 10.12 (a)). Curves: water from steam-table vapor pressures, the ice vapor-pressure table and a melting curve falling 0.7 °C by 10,000 kPa and 9 °C by 100,000 kPa, on axes of −50 to 500 °C and 0.01 to 100,000 kPa; carbon dioxide from its triple and critical points through the Clausius-Clapeyron form, sublimation with ΔH_sub = 26.1 kJ/mol. Region names in ink; the dashed isobar and the P axis in the pressure hue, the T axis and the crossing temperatures in the temperature hue; curves and points in their referent colours. Rebuilt 2026-11-14: the old drawing put water on one to-scale frame of −50 to 600 °C, where the ice region was a sliver, the triple point sat in a corner and the solid-liquid curve's lean could not be seen; its readout joined two formulas with commas, its crossing labels coloured whole phrases, and the pressure slider rewrote its own value text by hand.
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
