# Plan: 16.2 Entropy (m68817)

Written 2026-10-05 before the build and left for review, as `ch16/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Three objectives, five numbered figures (16.7 to 16.11), one unnumbered image (Example 16.2), two worked examples (16.2, 16.3) with a Check Your Learning each, no boxed note, one Link to Learning (dropped, named in `notes`; it triggers the 16.10 + 16.11 figure), fourteen end-of-section items (chapter exercises 6 to 19). Key Concepts and Summary to `summary_html`; the Key Equations table is the chapter's forms table and is not printed; the glossary is the concepts' terms.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `reversible-heat` | Reversible heat and entropy (own header; fig-carnot) | introduces `reversible-process`, `entropy`; uses `state-function`, `heat-flow`, `temperature`, `kelvin` |
| `microstates` | Entropy and Microstates (sim-microstates, sim-energy-microstates) | introduces `microstate`, `boltzmann-entropy-equation`, `most-probable-distribution`; uses `entropy`, `state-function`, `dispersal-of-matter-and-energy`, `ideal-gas`, `spontaneous-process`, `heat-flow` |
| `ex-delta-s` | Example 16.2 (fig-ex-matter) | reinforces `boltzmann-entropy-equation`, `microstate` |
| `predicting-sign` | Predicting the Sign of ΔS (sim-entropy-phase) | introduces `entropy-and-phase`, `entropy-and-temperature`, `entropy-and-molecular-structure`, `predict-sign-of-entropy-change`; uses `melting`, `freezing`, `vaporization`, `sublimation`, `condensation`, `deposition`, `kinetic-molecular-theory`, `average-kinetic-energy-and-temperature`, `mixture`, `properties-of-solutions` |
| `ex-predict-sign` | Example 16.3 | reinforces `predict-sign-of-entropy-change` |

## Figures

- fig-carnot · Figure 16.7, kept photograph · `entropy` · the two portraits the text points at; no value a redraw could add · arrows: none · still, a photograph · no controls · caption as printed (its "Nicholas" against the text's "Nicolas" carried); the bundle's alt names only Clausius and misspells him, so the alt is our own · photo row
- sim-microstates · Figure 16.8 · `microstate`, `most-probable-distribution`, `boltzmann-entropy-equation` · kept and fixed 2026-11-14: variation by choice. The book draws the sixteen microstates of four particles once; here the reader chooses two, four or six particles and sees every microstate (4, 16, 64) sorted into its distribution, with a probability bar W/2^N beside each row, so the share of all particles in one box falls from 1/2 to 1/8 to 1/32 (exercise 9) while the even split stays the largest; choosing a starting and a final distribution gives ΔS = k ln(W_f/W_i) (Example 16.2 on load) · arrows: none · still · choices N (2, 4, 6; default 4, the book's), initial and final distribution ((a) to (g), past N + 1 hidden; defaults (a) and (c), Example 16.2) · headline "All four particles sit in one box in 2 of the 16 microstates, a probability of 1/8." · graph beside: W and its probability bar on one scale for every N · 2D (book rule) · particles told apart by `F.cat` (the text names none), hover names on every particle; the initial row outlined dashed, the final row filled · readout ΔS = k ln(W_f/W_i) with the live counts · fixed: the boxes were drawn at about half the size the stage allows, with the particles tiny; now the boxes and particles fill the width, the probability column is narrowed, and the caption is cut
  works: read off the image: five rows (a) to (e); (a) one microstate, all four particles (red, green, blue, yellow) in the left box; (b) four microstates with one particle in the right box (red, green, blue, yellow in turn); (c) six with two in each box; (d) four with one in the left box; (e) one with all four in the right. W = 1, 4, 6, 4, 1 of 16. The alt text agrees · must hold: (1) row k holds C(N, k) microstates and every microstate appears once; (2) each microstate has N particles split as its row says; (3) W and the fraction W/2^N match the row's count, and the bars share one scale; (4) the readout's W_f and W_i are the counts of the rows marked final and initial, and 1.38 × 10⁻²³ J/K × ln 6 = 2.47 × 10⁻²³ J/K on load (Example 16.2)
- sim-energy-microstates · Figure 16.9 · `microstate`, `most-probable-distribution`, `boltzmann-entropy-equation`, `dispersal-of-matter-and-energy` · kept and fixed 2026-11-14: variation by choice: the ten microstates of two energy units shared by the hot object (A, B) and the cold object (C, D) in the objects' referent colours as the text marks them; choosing a starting and a final distribution gives ΔS and the probability of each, so the reader sees that heat flowing from hot to cold, (a) to (b), raises the count · arrows: none · still · choices initial and final ((a), (b), (c); defaults (a) and (b)) · headline "From (a) to (b) the number of microstates rises from 3 to 4, and the probability from 3/10 to 4/10." · graph beside, as sim-microstates · 2D · energy units are ink asterisks as the book draws them; letters in their object's colour; hover names · readout ΔS = k ln(W_f/W_i) · fixed: the letters and asterisks were set at label size in small boxes; now the boxes fill the width and the letters are large enough to read the asterisks against, and the caption is cut
  works: read off the image: (a) three microstates: A with both units (one asterisk above, one below), A and B one each, B with both; (b) four: A and C, A and D, B and C, B and D, one asterisk over each; (c) three: C with both, C and D one each, D with both. A, B in red; C, D in blue. The alt text agrees · must hold: (1) each microstate carries exactly two asterisks; (2) the rows hold 3, 4 and 3 microstates; (3) a particle holding both units has one asterisk above and one below its letter, as the book draws it; (4) the readout gives k ln(4/3) = 3.97 × 10⁻²⁴ J/K on load and 0 J/K from (a) to (c) (the Check Your Learning)
- fig-ex-matter · Example 16.2's image (unnumbered) · reverted to the book's image 2026-11-14: the redraw was a smaller copy in other colours and showed nothing the image does not; Figure 16.8 with (a) and (c) chosen reads the same count live. Kept as a `figure` row with no number, eyebrow "Figure", its image in its own markup
- sim-entropy-phase · Figure 16.10 + 16.11 · `entropy-and-phase`, `entropy-and-temperature` · rebuilt flat 2026-11-14: flow by animation and variation by slider. The book's three flasks and two graphs become one sample of water the reader heats: its molecules vibrate in a lattice, crowd at the bottom and move over one another, or fly through the whole container leaving short trails, faster as T rises, while beside it the point climbs S against T and the spread of kinetic energies widens · arrows: kinematic (the book draws the gas molecules with motion streaks) · moving: the molecules move on an endless clock (a liquid falls together under its own attraction, drawn as a pull to the floor; a gas fills the box); a change of phase moves the molecules one after another to the new state (LaggedStart) · slider T (temperature, 100 to 1000 K, default 298 K; dashed circles at 273.15 K and 373.15 K, melting and boiling, where half the molecules hold the old phase and half the new and the readout becomes ΔS = q_rev/T) · headline per phase, for example "At 298 K the molecules of liquid water move over and around one another." · graphs beside the box: S against T (0 to 1000 K, 0 to 250 J/K) with the solid, liquid and gas ranges shaded as the book does and the jumps labelled melting and boiling, the point with drop lines; beneath it the distribution of kinetic energies (0 to 25 kJ/mol, fraction of molecules unnumbered as the book prints it), the live T in ink over the faint 100 K curve, the book's T₁ and T₂ > T₁ · 2D (book rule, root 28.5): the 3D box was small, its view buttons sat under it and the molecules hid one another; a flat box shows every molecule and its trail · molecules by `F.el` (O, H) with hover names · readout off the circles S_solid, S_liquid or S_gas with its value; on them ΔS = q_rev/T = 6010 J / 273.15 K = 22.0 J/K or 40 700 J / 373.15 K = 109.1 J/K · model as before: ΔH_fus 6.01 kJ/mol, ΔH_vap 40.7 kJ/mol, liquid C_p 75.3 J/(mol·K), gas C_p 33.6 J/(mol·K), the solid's entropy proportional to T, fixed so that liquid water at 298.15 K has Appendix G's 70.0 J/(mol·K); the gas at 298 K then extrapolates to 188.4 against Appendix G's 188.8 · fold: number 16.10, folds 16.11, both images in `originals`
  works: parts: one closed container of water, its molecules drawn whole (an oxygen and two hydrogens); beside it the entropy of the sample against its temperature, and the distribution of the molecules' kinetic energies · flow: in the solid each molecule vibrates about a fixed place in a compact block; in the liquid the molecules stay together at the bottom of the container and move over and around one another; in the gas they fly straight across the whole container, trailing streaks · must hold: (1) the solid's molecules sit in a regular block and only vibrate; (2) the liquid's molecules touch their neighbours, fill the bottom and move past one another; (3) the gas's molecules spread through the whole container and move fastest; (4) S rises with T in every phase and jumps up at melting and at boiling, the boiling jump the larger (22.0 against 109.1 J/K), as the book's graph; (5) S starts at 0 at 0 K; (6) the kinetic energy curve at the higher temperature is lower and wider, its peak further right, as T₂ against T₁; (7) at 298 K the readout gives 70.0 J/K, Appendix G's S° of H₂O(l) · read off the images: Figure 16.10, three stoppered flasks, "Crystalline solid" (a compact cube of green spheres), "Liquid" (spheres spread one layer deep over the floor) and "Gas" (spheres with streaks through the flask), double arrows "ΔS > 0" and "ΔS < 0" between them, "Increasing entropy" over all. Figure 16.11, left: "Fraction of molecules" against "Kinetic energy", curves T₁ (tall, narrow) and T₂ (low, wide), "T₂ > T₁"; right: "Entropy (S)" against "Temperature (K)" from 0, bands "Solid", "Liquid", "Gas", straight rising segments with vertical jumps labelled "Melting" and "Boiling", the boiling jump the larger. No numbers. The plan of 2026-10-05 put four temperatures (100, 200, 500 and 1000 K) on the book's distribution; the image has two, unnumbered, and the figure now draws one faint reference against the live curve

No other photograph or image in the module. Extra simulations: none.

## Referents

- `hot-object` · the hot object, particles A and B · sim-energy-microstates
- `cold-object` · the cold object, particles C and D · sim-energy-microstates

The book prints the two objects' letters in two colours; the page keeps that, and the text marks every mention of each object and of its particles.

## Types bound

`entropy` (S, ΔS, S_f, S_i, S_solid, S_liquid, S_gas, the S axis and its values), `temperature` (T, the slider and axis, 50 °C and room temperature in Example 16.3), `energy` (q_rev, "reversible heat", heat); the kinetic energy axis of 16.11 is `energy` (no `velocity` since 2026-11-14). Ink: W, W_f, W_i, k, N, n, probabilities, the energy-unit asterisks, Example 16.2's W_c and W_a.

## Exercises

Two Check Your Learning items, inline after their examples: `ex-delta-s` (0 J/K, number), `ex-predict-sign` (open, the book's four signs and reasons).

Fourteen end-of-section items, kind `exercise`, numbers 6 to 19:

- Keyed, kept (7): fs-idm145774432 (7, number 0 J/K), fs-idm72753056 (9, open), fs-idm18362192 (11, number 1.91 × 10⁻²³ J/K), fs-idm215000480 (13, open), fs-idm136809856 (15, open), fs-idm203140096 (17, open; its "Fe₂O₂" carried as printed), fs-idp19392560 (19, open).
- Unkeyed conceptual, kept with an AI-marked suggested approach (5): fs-idm56843152 (8), fs-idm199093136 (12), fs-idm12232336 (14), fs-idm216212480 (16), fs-idm213645360 (18).
- Unkeyed numerical, left out (2): fs-idp46279440 (6), fs-idm215906096 (10).
- Nothing moved in or out.

## Left out

The Link to Learning on the states of matter simulator. Carried as printed: Figure 16.7's "Nicholas", "one of the other two distribution", Example 16.2's W_c/W_a for W_f/W_i.

## Wanted at chapter level

- variables `S` → 16.2-reversible-heat
- variables `ΔS` → 16.2-reversible-heat
- variables `q_rev` → 16.2-reversible-heat
- variables `T` → 16.2-reversible-heat
- variables `W` → 16.2-microstates
- variables `k_B` → 16.2-microstates
- variables `S_f` → 16.2-microstates
- variables `S_i` → 16.2-microstates
- variables `W_f` → 16.2-microstates
- variables `W_i` → 16.2-microstates
- variables `N_particles` → 16.2-microstates
- variables `n_boxes` → 16.2-microstates
- variables `S_solid` → 16.2-predicting-sign
- variables `S_liquid` → 16.2-predicting-sign
- variables `S_gas` → 16.2-predicting-sign
- forms `eq-entropy-change-reversible-heat` → 16.2-reversible-heat
- forms `eq-boltzmann-entropy` → 16.2-microstates
- forms `eq-entropy-change-microstates` → 16.2-microstates
- forms `eq-number-of-microstates` → 16.2-microstates
- forms `eq-entropy-phase-order` → 16.2-predicting-sign

Applied by the chapter pass (2026-10-05): every anchor as listed, fifteen variables and five forms.

## Derivations

- Entropy and microstates, ΔS = k ln(W_f/W_i) · score 1 · built as drv-entropy-microstates (a thin printed chain, two moves)
