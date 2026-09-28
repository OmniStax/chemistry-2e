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

- `sim-vapor` · Figure 10.22 · vapor-pressure-dynamic-equilibrium, vapor-pressure-and-imf · flow by animation, variation by choice, shape in 3D · moving: from the moment the evacuated flask is closed, molecules leave the liquid at a steady rate and return at a rate that grows with the vapor, until the two rates are equal and the pressure holds; the idea is a process in time · choice liquid (diethyl ether, ethanol, water, ethylene glycol; Example 10.5's four), no slider (temperature is held at 20 °C, the Check Your Learning table's temperature; temperature is the next figure's idea) · headline on the strip: "Diethyl ether: 38 molecules leave and 38 return each second; the vapor pressure has reached 60.4 kPa." · flat strip beneath: a U-tube manometer whose arms part by the vapor pressure, and the pressure against time with the equilibrium level dashed · physical 3D particle box (book rule: a particle picture is 3D): a sealed flask on a floor, pitch bounded to 0.02 to 1.2 rad so it is never seen from beneath, yaw free, no idle spin since the molecules already move, snap views front and corner. Molecules in the element palette, drawn by their carbon and oxygen atoms and the hydrogens of their O–H groups, one molecule standing for 2 kPa of vapor (the headline's note says so); the liquid a translucent ink slab. Binds pressure and time. Vapor pressures at 20 °C from the same Clausius-Clapeyron model as `sim-bp`, so the two figures agree: ether 60 kPa, ethanol 6.0 kPa (the table's 5.95), water 2.8 kPa, ethylene glycol 0.04 kPa (no molecule drawn). Readout: P_vap = the live number, and rate of vaporization = rate of condensation once reached.
- `sim-ke` · Figure 10.23 · vapor-pressure-and-temperature · variation by slider · still: the distribution answers the temperature; nothing in the idea has a clock · slider T (temperature, 250 to 400 K, default 350 K, the high curve) and KE_min (energy, 5 to 25 kJ/mol, default 15), the low curve fixed at 300 K dashed · headline "At 350 K, 1.6% of the molecules have the 15 kJ/mol needed to escape, 2.2 times as many as at 300 K." · graph alone · 2D. The tails beyond the minimum are filled in the temperature hue at two weights (hollow for the fixed low curve); kinetic energy axis in the energy hue. The distribution is the kinetic energy distribution the book drew in Chapter 9 (f ∝ √E e^(−E/RT)), and the fractions are its exact tails. Readout: the two fractions and their ratio.
- `sim-bp` · Figure 10.24 · boiling-point, clausius-clapeyron-equation, clausius-clapeyron-calculations · variation by slider, standardisation · still: the curves answer the pressure · slider P (pressure, 20 to 120 kPa, default 101.3, a special circle at 101.3 labelled 1 atm, detents at 68 (Example 10.6) and 40 (its Check Your Learning)), choice liquid (which curve the readout solves) · headline "At 101.3 kPa, water boils at 100.0 °C." · graph alone · 2D. The four curves in `F.cat(0..3)` (instances with no type), axes in the pressure and temperature hues, the pressure line dashed across, each crossing marked with a drop line to its boiling point; glycol's crossing is off the axis and says so. Curves from the Clausius-Clapeyron equation with normal boiling points 34.6, 78.4, 100.0 and 197.3 °C and ΔH_vap 26.5, 41.4 (the book's Check Your Learning value), 40.67 (the book's value at the boiling point) and 50.5 kJ/mol; the book prints only water's and ethanol's. Readout: the two-point form solved for T₂, numbers and result for the chosen liquid.
- `fig-sweat` · Figure 10.25 · photo, kept: the example points at it.
- `fig-ice` · Figure 10.26 · photo, kept: the four thermometer readings are the evidence.
- `fig-iodine` · Figure 10.27 · photo, kept: the purple vapor is the physical fact the text points at.
- `fig-ladder` · Figure 10.28 · enthalpies-of-phase-change · standardisation · still faithful redraw, no controls: three levels and three arrows, nothing varies · none · 2D ladder (book rule). The arrows and ΔH labels in the energy hue, levels in ink, water's values from the text (6.01 + 44.01 = 50.02 kJ/mol) set beside them. Readout: ΔH_sub = ΔH_fus + ΔH_vap with those numbers.
- `sim-heat` · Figure 10.29 · heating-curve, heating-curve-calculations · flow by animation, variation by slider · moving: heat is added (or removed) at a steady rate, and a marker runs along the curve, holding at each plateau, since the idea is a clock of steady heating · sliders m (mass, 10 to 200 g, default 135), T_start and T_end (temperature, −40 to 140 °C, defaults −15 and 120, Example 10.10; setting T_end below T_start draws the cooling curve of its Check Your Learning) · headline "4.23 kJ of 416 kJ added: the ice is warming." · graph alone, heat added on the x axis in the energy hue (0 to 650 kJ, fixed from the slider maxima: 200 g from −40 to 140 °C is 633 kJ) · 2D. Segments named H₂O(s), H₂O(l), H₂O(g) and the plateaus by their transition, in ink. Readout: q_total as the sum of the steps the path crosses, each rounded to three figures, and the total of those rounded terms, so Example 10.10 reads 416 kJ as the book does; a cooling path gives negative terms and a negative total.

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
