# Plan: 11.3 Solubility (m68782)

Written 2026-09-28 before the build and left for review, as `ch11/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

Three objectives, ten numbered figures (11.8 to 11.17, 11.11 inside the note on the bends), one unnumbered image (the ammonia equilibrium), two worked examples (11.1, 11.2) with a Check Your Learning each, three Link to Learning notes (dropped), one boxed note (Decompression Sickness or “The Bends”), ten end-of-section exercises and one moved in from 11.4.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `solubility` | Solubility and saturated solutions | introduces `solubility-and-saturation` |
| `supersaturated` | Supersaturated solutions | introduces `supersaturated-solutions` |
| `gases` | Solutions of gases in liquids (the book's header; Figures 11.8, 11.9) | introduces `gas-solubility-and-temperature` |
| `henry` | Gas pressure and Henry’s law (Figure 11.10, Examples 11.1 and 11.2, the note with Figure 11.11, the ammonia image) | introduces `henrys-law`, `henrys-law-calculations`; uses `gas-solubility-and-temperature` |
| `nyos` | Supersaturated solutions of gases (Figure 11.12, Sim) | uses `supersaturated-solutions`, `henrys-law` |
| `liquids` | Solutions of liquids in liquids (the book's header; Figures 11.13 to 11.15) | introduces `miscibility` |
| `solids` | Solutions of solids in liquids (the book's header; Figures 11.16, 11.17) | introduces `solid-solubility-and-temperature`; uses `solubility-and-saturation`, `supersaturated-solutions` |

## Figures

- sim-gas-solubility · Figure 11.8 · gas-solubility-and-temperature, henrys-law, henrys-law-calculations · variation by slider: the book's five curves give one pressure only, and Henry’s law is left to an equation; here the temperature read on the curves sets k and a second graph beside shows the straight line C_g = kP_g along which the pressure slider walks, so warming the water visibly flattens the line · still, the graphs answer their sliders · T (temperature, 0 to 30 °C, default 20), P_g (pressure, 0 to 200 kPa, default 20.7, detent at 20.7, dashed circle at 101.3 labelled "1 atm"), gas (a choice of the five, oxygen by default) · headline "At 20 °C, oxygen at 20.7 kPa dissolves to 2.82 × 10⁻⁴ mol/L of water." · two graphs side by side, solubility against temperature (the book's, 0 to 30 °C, 0 to 2.5 × 10⁻³ mol/L) and C_g against P_g (0 to 200 kPa, 0 to 5 × 10⁻³ mol/L); curves `F.cat(i)`, the chosen gas heavier, labels on the curves as the book prints them (five, never moving) · 2D, graphs are flat (book rule)
- fig-o2-bubbles · Figure 11.9 · gas-solubility-and-temperature · kept photograph, the text points at it · photo
- fig-beverage · Figure 11.10 · henrys-law · kept photograph with its particle inset, the text and an exercise point at it; the inset’s arrows show bubbles leaving, which sim-gas-solubility already varies by pressure · photo
- fig-recompress · Figure 11.11 · henrys-law · kept photograph inside the note · photo
- fig-ammonia · unnumbered image · henrys-law · kept as the book prints it, a Lewis-structure equation (book rule: Lewis structures are 2D and a symbolic equation teaches nothing live) · figure row, no number
- fig-lake-nyos · Figure 11.12 · supersaturated-solutions · kept photograph · photo
- sim-nyos · Sim · supersaturated-solutions, henrys-law · flow by animation: the text says a turnover brought saturated water to the surface; the reader sees a parcel of bottom water rise, the solubility it may keep fall with the pressure (about 1 atm for each 10 m, as the note on the bends says), and the excess CO₂ leave as bubbles · moving, the parcel rises at constant speed from its starting depth to the surface (the turnover has a clock), the transport runs it · starting depth (length, untyped, 20 to 200 m, default 200) · headline "At 120 m the water can hold 0.44 M of CO₂, so 0.27 M of the 0.71 M it carried has come out as gas." · scene left (the crater lake in section, the parcel, bubbles), graph beside (depth down, C_g across, the solubility line and the parcel’s point) · 2D, a cross-section and a graph; k for CO₂ is the 3.4 × 10⁻² M/atm the book gives at 25 °C in its exercises, named in the caption
- fig-antifreeze · Figure 11.13 · miscibility · kept photograph · photo
- fig-oil-water · Figure 11.14 · miscibility · kept photograph, an exercise points at it · photo
- fig-bromine · Figure 11.15 · miscibility · kept photograph; bromine’s orange is a fact of the photograph · photo
- sim-solid-solubility · Figure 11.16 · solid-solubility-and-temperature, solubility-and-saturation, supersaturated-solutions · variation by slider: the book’s curves are read by eye; here the reader picks a compound, sets the temperature and the amount added to 100 g of water, and the point says whether the solution is unsaturated, saturated (on the curve) or holds more than its solubility (undissolved, or supersaturated if cooled with care); the trigger is the dropped PhET soluble-salts link · still, answers its sliders · compound (a dropdown of the eight, KNO₃ by default), T (temperature, 0 to 100 °C, default 40), solute added (untyped, g per 100 g of water, 0 to 300, default 50, a dashed circle at the solubility labelled "saturated") · headline "At 40 °C, 100 g of water dissolves about 64 g of KNO₃, so 50 g makes an unsaturated solution." · the graph alone, 0 to 100 °C by 20, 0 to 300 g by 50; eight curves `F.cat(i)`, the chosen one heavier; names on the curves where the book prints them (eight, fixed, so they never collide) · 2D, graphs are flat
- fig-handwarmer · Figure 11.17 · supersaturated-solutions · kept photograph · photo

## Tables

None.

## Types bound

`concentration` (C_g, the solubility axes of 11.8 and the Sim), `pressure` (P_g and its axis), `temperature` (T and the temperature axes of 11.8 and 11.16). The solubility of 11.16 in g per 100 g of water, k, depth, counts and the curves stay ink or `F.cat`; atoms `F.el`.

## Exercises

Two Check Your Learning, inline after Examples 11.1 and 11.2 (hosts `ex-henry` and `ex-trout`), numbers from the key: 0.0725 g/L and 8.2 mg/L. Ten end-of-section items (chapter exercises 16 to 25): five keyed (fs-idp18282480 open; fs-idp50664544 40 % with a 10 % tolerance, since the book rounds to one significant digit; fs-idp47233328 2.8 g; fs-idp43619984 2.9 atm; fs-idm32553568 102 L); three unkeyed conceptual with an AI approach (fs-idp15462384, fs-idm29975600, fs-idp36424272); fs-idm7358128 open with its options and an AI approach, never graded; fs-idm19146000 (exercise 24, the oxygen in an aquarium) unkeyed numerical, left out. Moved in: 11.4’s keyed fs-idp128725184 (oil and water of Figure 11.14) with `source_section: "11.4"`.

## Left out

The three Link to Learning notes (the PhET soluble-salts simulation, the sodium acetate video, the hand-warmer video). Errata kept as printed: Example 11.1’s Check Your Learning answer “7.25 × 10⁻³ in 100.0 mL” without its unit, and Example 11.2’s “approximately ~1.2 mol/L” for 1.2 × 10⁻³ mol/L.

## Wanted at chapter level

- variables `C_g` → 11.3-henry
- variables `k_H` → 11.3-henry
- variables `P_g` → 11.3-henry
- equations `eq-henrys-law` → 11.3-henry
- 11.4 `exercise_notes`: fs-idp128725184 is placed in 11.3, where Figure 11.14 and miscibility are taught.
- `config.md`: the unnumbered ammonia image of 11.3 (`CNX_Chem_11_02_ammonia1_img.jpg`) is kept as a figure row with no number.

Applied by the chapter pass (2026-09-28): the three variables and Henry's law anchored to 11.3-henry through `ost set`; the note on fs-idp128725184 already stood in both sections' `exercise_notes`, and the two agree; `config.md` records the unnumbered ammonia image.
