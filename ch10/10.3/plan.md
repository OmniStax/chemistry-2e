# Plan: 10.3 Phase Transitions (m68768)

Source: `source.md`, converted with `python3 tools/convert.py 10.3`.
Status: built 2026-09-28 without a review stop, on Chen's instruction to finish the book without check-ins (`config.md`); left here for review.

Three learning objectives, eight figures (10.22 to 10.29, 10.25 inside Example 10.9), one unnumbered image (Example 10.5), one unnumbered table (Example 10.5's Check Your Learning), Examples 10.5 to 10.10 with their six Check Your Learning items, twenty-four end-of-section exercises (30 to 53 of the chapter, twelve keyed), thirteen glossary terms. No note, no Link to Learning. One page.

## Sub-concepts (page headers)

1. `changes-of-state` **Changes of state**: the opening paragraph. Uses `phase-from-imf-and-kinetic-energy`.
2. `vaporization` **Vaporization and condensation** (the book's header): the closed-container paragraph and Figure 10.22. Introduces `vapor-pressure-dynamic-equilibrium`.
3. `vapor-imf` **Vapor pressure and intermolecular forces**: the paragraph on chemical identity and Example 10.5 (`ex-vapor-imf`) with its Check Your Learning and table. Introduces `vapor-pressure-and-imf`; uses `rank-by-intermolecular-forces`, `hydrogen-bonding`.
4. `vapor-temperature` **Vapor pressure and temperature**: the kinetic energy paragraph and Figure 10.23. Introduces `vapor-pressure-and-temperature`.
5. `boiling` **Boiling points** (the book's header): the definition paragraph, Figure 10.24, Example 10.6 (`ex-leadville`). Introduces `boiling-point`.
6. `clausius` **The Clausius-Clapeyron equation**: the three forms and their paragraphs, Examples 10.7 (`ex-isooctane`) and 10.8 (`ex-benzene`). Introduces `clausius-clapeyron-equation`, `clausius-clapeyron-calculations`.
7. `vaporization-enthalpy` **Enthalpy of vaporization** (the book's header): the two equations, Example 10.9 (`ex-sweat`) with Figure 10.25. Introduces `enthalpies-of-phase-change`.
8. `melting` **Melting and freezing** (the book's header): Figure 10.26, the equilibrium paragraph, the enthalpy of fusion. Reinforces `enthalpies-of-phase-change`.
9. `sublimation` **Sublimation and deposition** (the book's header): Figure 10.27, the enthalpy of sublimation, the Hess's law sum, Figure 10.28. Reinforces `enthalpies-of-phase-change`.
10. `heating-curves` **Heating and cooling curves** (the book's header): q = mcΔT, the stove paragraph, Figure 10.29, Example 10.10 (`ex-heat-total`). Introduces `heating-curve`, `heating-curve-calculations`.

Objectives, the summary (to `summary_html`), the Key Equations table (the chapter's three Clausius-Clapeyron rows) and the glossary go to the tables.

## Figures

- `sim-vapor` · Figure 10.22 · vapor-pressure-dynamic-equilibrium, vapor-pressure-and-imf · value add: flow by animation (the book's three stills (a), (b), (c) are one process in time) and variation by choice (the four liquids of Example 10.5) · arrows: kinematic in the book (molecules leaving the surface); here the molecules themselves fly · moving: from the moment the flask is sealed, molecules leave at a steady rate and return at a rate that grows with the vapor until the two are equal · choice liquid (diethyl ether, ethanol, water, ethylene glycol), no slider (20 °C, the Check Your Learning table's temperature) · headline: "Diethyl ether: more molecules leave the liquid than return, and the pressure is still rising." then "… molecules leave and return at equal rates, and the vapor pressure holds at 58.7 kPa." · graph beside: the rate of vaporization and the rate of condensation against time (0 to 9 s), F.cat(0) and F.cat(3) keyed by F.legend, the rate axis unnumbered and fixed by diethyl ether's rate so the liquids compare · 2D, rebuilt flat on 2026-11-14: the 3D box with view buttons was not the book's apparatus and turning it showed nothing. Vapor pressures at 20 °C are measured values (ether 58.7 kPa handbook, ethanol 5.95 kPa the book's table, water 2.34 kPa the book's 17.5 torr, ethylene glycol 0.007 kPa handbook), not Figure 10.24's curves, whose constant ΔH puts water at 2.8 kPa there; one molecule drawn per 2 kPa, so glycol shows none. Readout: the two rates compared (> then =) and P with its live value, two lines.
  works: parts: a round flask, sealed, its liquid filling the bottom; a side arm leaving the flask's upper right and running level to the left limb of a U-tube; the U-tube's right limb closed at the top (vacuum above the mercury); mercury in the bottom of the U · flow: molecules leave the surface, fly straight, turn at the glass, and return into the liquid; the vapor's pressure pushes the mercury down in the left limb and up in the closed right limb · must hold: (1) no molecule outside the flask's inside or above it in the side arm; (2) mercury levels equal at P = 0, the right limb higher by P (0.4 units per mmHg, so 440 mmHg for ether is 176 units), the bracket spanning exactly the two levels; (3) the drawn count, the manometer, the graph and the readout come from the same flights: births evenly spaced at the rate that keeps P/2 kPa molecules aloft on average, the expected count scaled to settle on it exactly; (4) the rates equal and the readout reads "=" only once P is within 0.5 % of its final value; (5) the liquids compare on one fixed rate axis · read off the image: three panels (a) arrows up only, "Molecules escape liquid's surface to form vapor", (b) a few molecules in the vapor, (c) many, "Equilibrium reached, vapor pressure determined", bracket "Vapor pressure" between the two mercury levels; a gauge on top of the side arm (not drawn: the manometer already reads the pressure); the closed right limb is higher than the open left one in (c). The book gives no numbers.
- `sim-ke` · Figure 10.23 · vapor-pressure-and-temperature · variation by slider · arrows: none · still: the distribution answers the temperature · slider T (temperature, 250 to 500 K, default 400 K, special circle at 300 K, the fixed curve) and KE_min (energy, 3 to 12 kJ/mol, default 7.5) · headline "At 400 K, 21% of the molecules have at least 7.5 kJ/mol, 1.91 times the fraction at 300 K." · graph alone · 2D. Axis 0 to 15 kJ/mol so the peaks sit near the left as the book draws them (the old 0 to 20 axis squeezed both curves into one corner and their tails out of sight); the live tail filled, the 300 K tail hatched; curves named by temperature as the book names them Low T and High T. Readout: the fraction for each temperature, one line each.
  works: read off the image: two curves, "Low T" taller and narrower, "High T" lower and broader, crossing once past the low curve's peak; a dashed vertical line "Minimum KE needed to escape" to the right of both peaks; axes "Kinetic energy" and "Number of molecules", unnumbered. Our energies and temperatures are the book's shape made quantitative with Chapter 9's distribution.
- `sim-bp` · Figure 10.24 · boiling-point, clausius-clapeyron-equation, clausius-clapeyron-calculations · variation by slider · arrows: none · still: the curves answer the pressure · slider P (pressure, 20 to 140 kPa, default 101.3, special 1 atm, detents 68 (Example 10.6) and 40 (its Check Your Learning)), select liquid (the curve the readout solves) · headline "At 101.3 kPa, water boils at 100.0 °C." · graph alone · 2D, axes 0 to 140 °C and 0 to 140 kPa, the book's frame (it runs to 140 °C and 133 kPa), so ethylene glycol's curve shows from 80 °C as in the book. Curves from the Clausius-Clapeyron equation through each normal boiling point (34.6, 78.4, 100.0, 197.3 °C) with ΔH_vap 26.5, 41.4 (the book's), 40.67 (the book's) and 53.2 kJ/mol (handbook, at the boiling point; was 50.5). Readout: the two-point form solved for T₂ as one chain, numbers and result.
  works: read off the image: ether 25 kPa at 0 °C, about 59 at 20 °C, 101.3 at 35 °C, 133 at 44 °C (model 27, 60.5, 101.3 at 34.6, 133 at 42.9); ethanol about 47 kPa at 60 °C and 101.3 at 79 °C (model 46, 78.4; 133 at 85.3); water about 19 kPa at 60 °C, 101.3 at 100 °C, 133 at 107 °C (model 21, 100.0, 133 at 107.9); ethylene glycol from 80 °C, about 1.5 kPa at 100 °C and 12 at 140 °C (model 3, 15; measured glycol is near 16 kPa at 140 °C, so the model sits between the book's sketch and the data). Book names "ethyl ether", "ethyl alcohol"; the figure uses the text's names. Ticks 27, 53, 80, 107, 133 kPa are 200 to 1000 torr; ours run by 20 kPa. Check Your Learning: ether boils at 10 °C at about 40 kPa (model 9.3 °C at 40 kPa); Example 10.6: water at 68 kPa boils near 90 °C (model 89.0 °C).
- `fig-sweat` · Figure 10.25 · photo, kept: the example points at it.
- `fig-ice` · Figure 10.26 · photo, kept: the four thermometer readings are the evidence.
- `fig-iodine` · Figure 10.27 · photo, kept: the purple vapor is the physical fact the text points at.
- `fig-ladder` · Figure 10.28 · reverted on 2026-11-14 to the book's image: the still redraw added water's values (6.01 + 44.01 = 50.02 kJ/mol), which the section never states and which mix a 25 °C enthalpy of vaporization with a 0 °C enthalpy of fusion; without them it repeats the book's diagram, and the derivation just above already carries the sum.
- `sim-heat` · Figure 10.29 · heating-curve, heating-curve-calculations · flow by animation, variation by slider · arrows: none · moving: heat is added (or removed) at a steady rate and the marker runs along the curve, holding on each plateau; a steady burner is a clock · sliders m (mass, 10 to 150 g, default 135), T₁ and T₂ (temperature, −40 to 140 °C, defaults −15 and 120, Example 10.10; T₂ below T₁ draws the cooling curve of its Check Your Learning) · headline "139 kJ of 416 kJ added: the water is boiling at 100 °C." · graph alone, 0 to 500 kJ (150 g from −40 to 140 °C is 475 kJ; the old 700 kJ axis left the book's case in the left 60 %) · 2D. Each slope named by its phase and each plateau by the two phases on it, as the book names them. Readout: q_total as the sum of the steps, each under a brace naming it (ice, melting, water, boiling, steam), each rounded to three figures, and the total of those rounded terms (416 kJ as the book has it).
  works: read off the image: −10 to 120 °C by 20, unnumbered heat axis; H₂O(s) rising to 0 °C, plateau "H₂O(s) and H₂O(l)" from "Solid begins to melt" to "All solid melted", H₂O(l) rising steeply to 100 °C, plateau "H₂O(g) and H₂O(l)" from "Liquid begins to boil" to "All liquid evaporated", about six times the melting plateau, then H₂O(g). Example 10.10: 4.23 + 45.0 + 56.4 + 305 + 5.02 = 416 kJ (the book's 2.09, 4.18, 1.86 J/g·°C, 6.01 and 40.67 kJ/mol); its Check Your Learning: 94.0 g from 80.0 to −30.0 °C releases 68.7 kJ.

Images kept:

- `fig-structures` · unnumbered image in Example 10.5 · kept as the book's image (`figure` row with no number): four structural formulas the example asks the reader to read; a redraw would copy them.

Extra simulations, not built: a closed flask with a temperature slider whose vapor pressure climbs the curve of Figure 10.24 (the two figures together carry it).

## Tables

The alcohols' vapor pressures in Example 10.5's Check Your Learning, unnumbered, as `div.book-table` with no eyebrow, inside the Check Your Learning prompt row as HTML. (The prompt of `cyl1` carries the table so the card is whole.)

## Binds

Pressure, temperature, energy, time (the clock of `sim-vapor`), mass (the heat readout). Amount is not drawn: n appears only as m/18.02 inside the numbers.

## Exercises

- Inline: `cyl1` Example 10.5 (keyed open), `cyl2` 10.6 (40 kPa), `cyl3` 10.7 (41.4 kJ/mol, the key's "41.4 kJ/mol**" carried in the solution), `cyl4` 10.8 (30.1 kPa), `cyl5` 10.9 (28 kJ), `cyl6` 10.10 (68.7 kJ).
- End of section (30 to 53): keyed 31, 33, 35, 37, 39, 41 (about 95 °C, number), 43, 45, 47, 49, 51 (1125 kJ, number), 53 (open, two parts); unkeyed conceptual 30, 32, 34, 36, 40, 44, 46, 48 with an AI approach; 50 (`fs-idm190677696`) an open item with its options; unkeyed numerical 38 (`fs-idm91183360`), 42 (`fs-idm100561472`), 52 (`fs-idm4941728`) left out.

## Wanted at chapter level

- eq-clausius-clapeyron → 10.3-clausius
- eq-clausius-clapeyron-log → 10.3-clausius
- eq-clausius-clapeyron-two-point → 10.3-clausius
- eq-sublimation-sum → 10.3-sublimation

Applied by the chapter pass (2026-09-28): each equation anchored as listed, and its variables anchored with it.

## Derivations

- `clausius`, the two-point Clausius-Clapeyron equation · score 4, a printed block · built as drv-clausius-clapeyron-two-point: four nodes, the logarithmic form from P = Ae^(−ΔH/RT) by the log rules of Appendix B, the line at each of the two points with ln A isolated, and the join that eliminates A and merges the logs. The exponential form and its "where" paragraph stay displayed; everything from "This equation is often rearranged" to the two-point result is replaced, with the two skipped lines ("combined into") inserted.
- `sublimation`, ΔH_sub = ΔH_fus + ΔH_vap · score 1, a thin printed block · built as drv-enthalpy-of-sublimation: one node, Hess's law over melting then vaporization. The array and its "For example:" are replaced; the paragraph that says the model is approximate stays.
