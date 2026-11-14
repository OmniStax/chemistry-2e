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

- sim-collision · Figure 12.13 + 12.14 · collision-orientation, activation-energy, activated-complex, reaction-energy-diagram, reaction-diagram · flow by animation, variation by choice and slider, and 3D: the book draws two frozen collisions of CO with O₂ and, apart from them, an unlabeled reaction diagram; here one collision runs on a clock above the diagram it traces, the system's energy a dot that climbs the barrier as the molecules close in, and it either passes the transition state to CO₂ + O or turns back where the curve meets the collision energy; striking oxygen first bends the barrier into a wall with no transition state at all · arrows: symbolic (the reaction arrows of 12.13 and the E_a and ΔH brackets of 12.14; the molecules move but the book draws no arrow of motion) · moving: a collision is an event in time, one approach and one parting per loop, 3 to 7 s with the energy, hold 1.2 s, transport; the motion is integrated on the drawn potential, so the molecules slow as they climb and the products leave faster than the reactants came · orientation choice (oxygen end first, carbon end first; default carbon), collision energy (energy, 50 to 320 kJ/mol, default 240, dashed circle at E_a = 200 kJ/mol) · headline in the scene's band: "The carbon end strikes with more than E_a: the molecules pass the transition state and part as CO₂ and O." · reaction diagram beneath (the scene is horizontal): energy (kJ/mol, −100 to 350, axis title in `energy`) against extent of reaction, curve ink, E_a and ΔH brackets in `energy`, the collision energy a dashed `energy` line, the dot in `energy`; labels CO + O₂, transition state (lifted above the collision-energy line when that line would cross it), CO₂ + O (the last two fade with the oxygen-first wall) · 2D, rebuilt flat on 2026-11-14 (book rule for particle pictures): the 3D scene carried side/above view buttons and its four atoms all lie on the line of approach, so turning showed nothing; now the atoms are space-filling discs on that line in the top band, as the book draws them, `F.el` C and O keyed by a legend, no labels on the moving atoms (26.7), hover names on every atom; the headline is the canvas's own · readout: collision energy compared with E_a, both in `energy`, the relation sign live; no note, since the headline says the outcome · numbers: ΔH = −34 kJ/mol from the book's own formation enthalpies (Appendix G: CO₂ −393.5, O(g) 249.17, CO −110.52 kJ/mol); E_a about 200 kJ/mol, the gas-kinetics value for CO + O₂ ⟶ CO₂ + O (k = 2.5 × 10¹² e^(−24 000 K/T) cm³ mol⁻¹ s⁻¹, so E_a ≈ 24 000 K × R); the caption names the reaction and no number it cannot stand behind
  works: parts: CO (C dark, O red, joined) and O₂ (two O, joined), space-filling; a reaction diagram, energy against extent of reaction · flow: the two molecules approach along one line; carbon first with enough energy, the near O of O₂ joins the C and the far O leaves; otherwise they part · must hold: (1) the dot's height is the pair's energy at the molecules' separation drawn above; (2) the dot turns back exactly where the curve meets the dashed collision energy; (3) carbon-first above E_a ends as CO₂ (O–C–O) and a lone O moving away; (4) oxygen-first never passes. · read off the images: 12.13 top: C–O, its O end against O₂, "No reaction"; bottom: O–C, its C end against O₂, giving O=C=O + O, "More CO₂ formation"; 12.14: A + B on a plateau, "Transition state" at the peak, E_a from the reactants' level to the peak, ΔH from the reactants' level down to the products', C + D on the lower plateau; no numbers.
- sim-distribution · Figure 12.15 · energy-distribution-and-rate, arrhenius-equation, activation-energy · variation by slider: the book's two panels are two settings of one picture; here dragging E_a moves the threshold across both curves (panel a), dragging T₂ broadens its curve and swells its tail beyond E_a (panel b), and the readout writes the two-point Arrhenius equation for the pair, so the reader sees a few percent of molecules become a fifth and k grow elevenfold · arrows: symbolic (the book's pointers to E_a) · still, the distribution answers its sliders; no clock · E_a (energy, 2 to 19 kJ/mol, default 8), T₂ (temperature, 300 to 900 K, default 600; T₁ held at 300 K, the reference curve) · headline: "At T₂ = 600 K, 36% of the molecules reach E_a = 8 kJ/mol, against 9.3% at T₁ = 300 K." · graph alone, the graph is the idea: kinetic energy (kJ/mol, 0 to 20, title in `energy`) against number of molecules (no numbers, as the book), Maxwell–Boltzmann energy distributions drawn exactly for each temperature, tails beyond E_a filled, E_a a dashed `energy` line labeled once; the two curves told apart by `F.cat(0)` and `F.cat(1)` and labeled T₁ and T₂ beside them (two curves, no referent the text names) · 2D, a graph (book rule) · readout ln(k₁/k₂) = (E_a/R)(1/T₂ − 1/T₁) with the live numbers, and on its own line k₂/k₁ = e^(…) = 4.97, which the growth of the tail shows (it was joined to the first by a comma); no note · ranges chosen so the book's picture is the default: at energies the reader can see, E_a is a few RT; the readout carries the true values at every setting
  works: read off the image: (a) one curve, "Lower activation energy, E_a" and "Higher activation energy, E_a" arrows to the right of the peak, the tail beyond each shaded; (b) T₁ taller and narrower, T₂ lower and broader, crossing once, "T₁ < T₂", one E_a well right of both peaks with both tails shaded; axes "Kinetic energy", "Number of molecules", unnumbered. Reworked 2026-11-14: the 0 to 30 axis with E_a at 12 squeezed both peaks into the left tenth and left T₁'s tail invisible (2 %); 0 to 20 with E_a at 8 shows both tails as the book does, and every setting still states its true fractions.
- sim-arrhenius-plot · Figure 12.16 · the book's image, kept (a `photo`); reverted on 2026-11-14. The Sim's only control chose which two of the five points the slope triangle used; every pair gives about the same E_a, so the choice did not change the idea, and the still with Example 12.13's worked slope beside it says all of it. The book's line, points and triangle are clean and correct.

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
