# Plan: 12.5 Collision Theory (m68793)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Three objectives, four numbered figures (12.13 to 12.16, 12.16 inside Example 12.13), one worked example with its Check Your Learning, no boxed note, no Link to Learning, seventeen end-of-section items. Key Concepts and Summary to `summary_html`; the Key Equations table is the chapter's forms table and is not printed; the glossary is the concepts' terms.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `postulates` | Postulates of collision theory | introduces `collision-theory`; uses `reaction-rate` |
| `orientation` | Orientation and energy of collisions (Figure 12.13 + 12.14) | introduces `collision-orientation`, `activated-complex`; uses `collision-theory`; reinforces `concentration-and-rate` |
| `activation` | Activation energy and the Arrhenius equation (the book's header) | introduces `activation-energy`, `reaction-energy-diagram`, `reaction-diagram`; uses `kinetic-energy`, `enthalpy-change`, `exothermic-process` |
| `arrhenius` | The Arrhenius equation (Figure 12.15) | introduces `arrhenius-equation`, `frequency-factor`, `energy-distribution-and-rate`; uses `rate-constant`, `ideal-gas-constant`, `average-kinetic-energy-and-temperature`, `temperature-and-rate` |
| `graphical` | Finding an activation energy (the linear form and Example 12.13, Figure 12.16) | introduces `activation-energy-from-rate-constants`; uses `arrhenius-equation`, `activation-energy` |

Example 12.13 is `div.example#ex-ea` inside `graphical`, with its two data tables unnumbered and its Check Your Learning host after it.

## Figures

- sim-collision · Figure 12.13 + 12.14 · collision-orientation, activation-energy, activated-complex, reaction-energy-diagram, reaction-diagram · flow by animation, variation by choice and slider: the book draws two frozen collisions of CO with O₂ and, apart from them, an unlabeled reaction diagram; here one collision runs on a clock above the diagram it traces, the system's energy a dot that climbs the barrier as the molecules close in, and it either passes the transition state to CO₂ + O or turns back where the curve meets the collision energy; striking oxygen first bends the barrier into a wall with no transition state at all · arrows: symbolic (the reaction arrows of 12.13 and the E_a and ΔH brackets of 12.14; the molecules move but the book draws no arrow of motion) · moving: a collision is an event in time, one approach and one parting per loop, 3 to 7 s with the energy, hold 1.2 s, transport; the motion is integrated on the drawn potential, so the molecules slow as they climb and the products leave faster than the reactants came · orientation choice (oxygen end first, carbon end first; default carbon), collision energy (energy, 50 to 280 kJ/mol, default 240, dashed circle at E_a = 200 kJ/mol) · headline: "The carbon end strikes with at least E_a: the molecules pass the transition state and part as CO₂ and O." · reaction diagram beneath (the scene is horizontal): energy (kJ/mol, −100 to 300, axis title in `energy`) against extent of reaction, curve ink, E_a bracket at the peak and ΔH bracket over the products' plateau in `energy`, the collision energy a dashed `energy` line, the dot in `energy`; labels CO + O₂, transition state (lifted above the collision-energy line when that line would cross it), CO₂ + O (the last two fade with the oxygen-first wall) · 2D (book rule for particle pictures: the four atoms lie on the line of approach, so turning shows nothing): space-filling discs on that line, `F.el` C and O keyed by a legend, no labels on the moving atoms (26.7), hover names on every atom, and one still line under them naming what the four atoms are at that moment (CO + O₂, activated complex, CO₂ + O), which puts the section's new term on the arrangement it names · readout: collision energy compared with E_a, both in `energy`, the relation sign live; no note, since the headline says the outcome · numbers: ΔH = −34 kJ/mol from the book's own formation enthalpies (Appendix G: CO₂ −393.5, O(g) 249.17, CO −110.52 kJ/mol; checked again 2026-11-16: −33.8); E_a about 200 kJ/mol, the gas-kinetics value for CO + O₂ ⟶ CO₂ + O (k = 2.5 × 10¹² e^(−24 000 K/T) cm³ mol⁻¹ s⁻¹, so E_a ≈ 24 000 K × R); the caption names the reaction and no number
  works: parts: CO (C dark, O red, joined) and O₂ (two O, joined), space-filling; a reaction diagram, energy against extent of reaction · flow: the two molecules approach along one line; carbon first with enough energy, the near O of O₂ joins the C and the far O leaves; otherwise they part · must hold: (1) the dot's height is the pair's energy at the molecules' separation drawn above; (2) the dot turns back exactly where the curve meets the dashed collision energy; (3) carbon-first at or above E_a ends as CO₂ (O–C–O) and a lone O moving away; (4) oxygen-first never passes; (5) the name under the atoms reads "activated complex" only while the dot is near the peak of a collision that passes. · read off the images: 12.13 top: C–O, its O end against O₂, "No reaction"; bottom: O–C, its C end against O₂, giving O=C=O + O, "More CO₂ formation"; 12.14: A + B on a plateau, "Transition state" at the peak, E_a from the reactants' level to the peak, ΔH from the reactants' level down to the products', C + D on the lower plateau; no numbers. Second pass 2026-11-16: the flat scene was four small discs in a blank band over a shallow diagram; the atoms are now half as large again and fill the band, the stage is named, the diagram is taller on −100 to 300 (ticks of 100), its labels at label size, and ΔH brackets the products' plateau instead of hiding under E_a.
- sim-distribution · Figure 12.15 · energy-distribution-and-rate, arrhenius-equation, activation-energy · variation by slider: the book's two panels are two settings of one picture; here dragging E_a moves the threshold across both curves (panel a), dragging T₂ broadens its curve and swells its tail beyond E_a (panel b), and the readout writes the two-point Arrhenius equation for the pair · arrows: symbolic (the book's pointers to E_a) · still, the distribution answers its sliders; no clock · E_a (energy, 2 to 19 kJ/mol, default 8), T₂ (temperature, 300 to 900 K, default 600; T₁ held at 300 K, the reference curve) · headline: "At T₂ = 600 K, 36% of the molecules reach E_a = 8 kJ/mol, against 9.3% at T₁ = 300 K." · graph alone, the graph is the idea: kinetic energy (kJ/mol, 0 to 20, title in `energy`) against number of molecules (no numbers, as the book), Maxwell–Boltzmann energy distributions drawn exactly for each temperature, tails beyond E_a filled, E_a a dashed `energy` line labeled once; the two curves told apart by `F.cat(0)` and `F.cat(1)` and named in a legend (labels beside them sat on the curves and on each other where the curves cross); each curve's average kinetic energy, 3/2 RT, a dotted drop to the axis, so the passage's comparison of E_a with the average kinetic energy can be read off · 2D, a graph (book rule) · readout ln(k₁/k₂) = (E_a/R)(1/T₂ − 1/T₁) with the live numbers, and on its own line k₂/k₁ = e^(…); no note · ranges chosen so the book's picture is the default: at energies the reader can see, E_a is a few RT; the readout carries the true values at every setting
  works: read off the image: (a) one curve, "Lower activation energy, E_a" and "Higher activation energy, E_a" arrows to the right of the peak, the tail beyond each shaded; (b) T₁ taller and narrower, T₂ lower and broader, crossing once, "T₁ < T₂", one E_a well right of both peaks with both tails shaded; axes "Kinetic energy", "Number of molecules", unnumbered. Checked 2026-11-16: fraction beyond E_a = erfc(√x) + 2√(x/π)e^(−x), x = E_a/RT: 9.3 % at 300 K and 36 % at 600 K for 8 kJ/mol; k₂/k₁ = e^(1.60) = 4.97. The tail's growth (3.9 times) is not the growth of k (5.0 times), since the Arrhenius factor counts energy along the line of centres, so the caption asks the reader to compare them and claims no equality.
- sim-arrhenius-plot · Figure 12.16 · activation-energy-from-rate-constants, arrhenius-equation · variation by slider: the book's plot fixes one triangle with no numbers on it and the text says any two points may be used; here the reader picks the two measurements, the line is drawn through those two, the triangle's legs carry Δ(ln k) and Δ(1/T), and the readout runs the worked slope and E_a. The first and last points give the book's 1.8 × 10⁵ J/mol and a line that passes the other three; two neighbouring points give 1.7 or 2.0 × 10⁵ and a line that visibly misses the far point, which is why the book takes the widest pair · arrows: none · still · T₁ (temperature, the cooler measurement, 555 to 700 K) and T₂ (temperature, the warmer, 575 to 781 K), each stepping through the table's rows, the other pushed along so T₁ < T₂; default 555 K and 781 K, the book's pair · headline: "The line through 555 K and 781 K passes close to the other three points, and its slope gives E_a = 1.8 × 10⁵ J/mol." (or "misses the point at … K" when a point lies more than 0.4 in ln k off the line) · graph alone: ln k (−18 to −2) against 1/T (1.1 to 1.9 × 10⁻³ K⁻¹), both in ink as the chapter's COLOR.md has them, five ink points with hover names giving each row of both tables, the picked two larger and labeled T₁, T₂ in `temperature`, the legs dashed in muted ink with their differences beside them · 2D, a graph · readout: slope = Δ(ln k)/Δ(1/T) with the table's numbers, and on its own line E_a = −slope × R; the slope is rounded to two figures before it is multiplied, as the book does
  works: read off the image: axes 1/T (K⁻¹) with ticks 1.4, 1.6, 1.8 × 10⁻³ and ln k with ticks −2 to −14 by 2; five points on a falling straight line; a dashed right triangle under the line, vertical leg "Δ(ln k)" down from the upper-left point, horizontal leg "Δ(1/T)" across to the lower-right point; no numbers on the legs. Points from Example 12.13's second table: (1.80, −14.860), (1.74, −13.617), (1.55, −9.362), (1.43, −6.759), (1.28, −3.231) × 10⁻³ K⁻¹; worked slope (−14.860 − (−3.231))/(1.80 − 1.28) × 10³ = −11.629/0.52 × 10³ = −2.2 × 10⁴ K, E_a = 1.8 × 10⁵ J/mol. must hold: (1) the default readout is the book's worked numbers exactly; (2) the triangle's corners are the two picked points; (3) the line passes through both picked points; (4) T₁ is always cooler than T₂. Brought back 2026-11-16 after the first pass reverted it: that Sim's dropdown changed only the triangle on a fixed fitted line, so every choice looked the same; drawing the line through the picked pair makes a poor pair visibly miss.

No photograph or unnumbered image in the module. Extra simulations: none; the collision figure carries the PhET items of this section.

## Types bound

`energy` (E_a, ΔH, the collision energy, both energy axes), `temperature` (T, T₁, T₂, the T₂ slider), `rate-constant` (k, k₁, k₂, A in the prose and readouts). Ink: R, ln k, 1/T, counts, the orders; atoms by `F.el`; the two distribution curves by `F.cat`.

## Exercises

Check Your Learning after Example 12.13, host `ex-ea`, source id the example's, answer 1.1 × 10⁵ J/mol.

Seventeen end-of-section items:

- Keyed, kept (9): fs-idp801808 (open), fs-idm141471856 (open), fs-idm162997840 (open), fs-idm166001648 (multi, 4 and 128 times), fs-idm128511072 (3.9 × 10¹⁵ s⁻¹), fs-idm131383728 (43.0 kJ/mol), fs-idm58458096 (177 kJ/mol), fs-idm167771040 (multi: E_a 108 kJ, A 2.0 × 10⁸ s⁻¹, k 3.2 × 10⁻¹⁰ s⁻¹, 1.81 × 10⁸ h; part (c) in the solution; the key's "E_a = 108 kJ" carried as printed), fs-idp11390128 (`simulation-exercise`, open, keyed).
- Unkeyed conceptual with an AI-marked approach (4): fs-idm147445136, fs-idm190953584, fs-idm122581792, fs-idp179196768 (`simulation-exercise`).
- Unkeyed choice, kept open with its options and never graded (1): fs-idm3600240, with an AI-marked approach.
- Unkeyed numerical, left out and named (3): fs-idm67340288, fs-idm129065792, fs-idm166518032.

The two PhET items are carried by sim-collision: their prompts are rewritten against Figure 12.13 + 12.14, where carbon monoxide plays A and the oxygen molecule BC of A + BC ⟶ AB + C, the energy view is the diagram beneath, and the straight and angled shots are the carbon-first and oxygen-first orientations; the keyed item keeps the book's answer word for word.

## Left out

Nothing of the prose. Errata kept as printed: the "*E*<sub>a</sub>** =" markup slip of Example 12.13 is written plainly; the key to fs-idm167771040 gives "E_a = 108 kJ" with no (a) and no per mole.

## Wanted at chapter level

- variables `E_a` → 12.5-activation
- variables `ΔH` → 12.5-activation
- variables `A_freq` → 12.5-arrhenius
- variables `R` → 12.5-arrhenius
- variables `T` → 12.5-arrhenius
- variables `T_1` → 12.5-ex-ea
- variables `T_2` → 12.5-ex-ea
- variables `k_1` → 12.5-ex-ea
- variables `k_2` → 12.5-ex-ea
- forms `eq-arrhenius` → 12.5-arrhenius
- forms `eq-arrhenius-linear` → 12.5-graphical
- forms `eq-arrhenius-two-point` → 12.5-ex-ea

Applied by the chapter pass (2026-10-05): all twelve anchors set as listed; the Arrhenius forms write `\kk`, `\kkone`, `\kktwo` and `\kAfreq`.

## Derivations

- Finding an activation energy, the linear form of the Arrhenius equation · score 3 · not built: two moves (take ln, split the log), under the hidden bar
- Example 12.13, alternative approach, the two-point form of the Arrhenius equation · score 5 · built as drv-arrhenius-two-point
