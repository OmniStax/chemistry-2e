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
- sim-microstates · Figure 16.8 · `microstate`, `most-probable-distribution`, `boltzmann-entropy-equation` · variation by choice and standardisation: the book draws the sixteen microstates of four particles once; here the reader chooses two, four or six particles and sees every microstate (4, 16, 64) sorted into its distribution, with a probability bar W/2^N beside each row, so the share of all particles in one box falls from 1/2 to 1/8 to 1/32 (exercise 9) while the even split stays the largest; choosing a starting and a final distribution gives ΔS = k ln(W_f/W_i) (Example 16.2 on load, exercise 7 at (b) to (d)) · arrows: none · still: a count has no time in it · choices N (2, 4, 6; default 4, the book's), initial distribution and final distribution ((a) to (g), the letters past N + 1 hidden as the count changes; defaults (a) and (c), Example 16.2) · headline "All four particles sit in one box in 2 of the 16 microstates, a probability of 1/8." · graph beside: each distribution's row of microstates, then W and its probability bar on one scale for every N · 2D (book rule: microstate counts are flat) · the particles told apart by colour as the book does, `F.cat` (the text names no particle, so they are instances, not referents), hover names on every particle; row letters and W values are the frame; the initial row outlined hollow, the final row filled (rule 7's decoration) · readout ΔS = k ln(W_f/W_i) with the live counts; no note
- sim-energy-microstates · Figure 16.9 · `microstate`, `most-probable-distribution`, `boltzmann-entropy-equation`, `dispersal-of-matter-and-energy` · variation by choice and standardisation: the ten microstates of two energy units shared by the hot object (A, B) and the cold object (C, D) in the objects' referent colours as the text marks them; choosing a starting and a final distribution gives ΔS (the Check Your Learning at (a) to (c) reads 0 J/K) and the probability of each · arrows: none · still · choices initial and final distribution ((a), (b), (c); defaults (a) and (b), the most probable flow the text names) · headline "From (a) to (b) the number of microstates rises from 3 to 4, and the probability from 3/10 to 4/10." · graph beside, as sim-microstates · 2D · the energy units are ink asterisks as the book draws them; letters in their object's colour; hover names on every particle · readout ΔS = k ln(W_f/W_i)
- fig-ex-matter · Example 16.2's image (unnumbered) · `microstate`, `boltzmann-entropy-equation` · faithful copy: standardisation alone, the four particles in the same colours as sim-microstates · arrows: symbolic (the process arrow) · still, no controls · 2D · figure row, no number; no readout
- sim-entropy-phase · Figure 16.10 + 16.11 · `entropy-and-phase`, `entropy-and-temperature` · flow by animation, variation by slider and 3D: one mole of water in a closed container whose molecules vibrate about fixed sites, slide past each other, or fly through the whole container, faster as T rises, while the strip beneath moves the point along S against T and broadens the speed distribution; the book's three flasks and two graphs become one sample the reader heats · arrows: kinematic (16.10 draws the gas molecules with motion trails) · moving: thermal motion on a 6 s loop with no hold, speeds scaled by √T; a change of phase moves the molecules one after another from the old packing to the new (LaggedStart) · slider T (temperature, 50 to 1000 K, default 298 K; detents at 100, 200, 500 and 1000 K, the four temperatures of 16.11; dashed circles at 273.15 K and 373.15 K, melting and boiling, where half the molecules hold the old phase and half the new and the readout morphs to ΔS = q_rev/T) · headline per phase, for example "At 298 K the molecules of liquid water move over and around one another." · graph below: the speed distribution (v 0 to 2500 m/s in `velocity`, fraction of molecules unnumbered as the book prints it, the four book temperatures faint and labelled, the live curve in ink) beside S against T (0 to 1000 K in `temperature`, 0 to 250 J/K in `entropy`, solid, liquid and gas columns, the jumps labelled melting and boiling, the point with drop lines); ranges fixed from the slider's ends · 3D, physical (book rule: a particle picture), a glass box on a ground, molecules by `F.el` (O, H) with hover names, pitch 1° to 69° so never from beneath, yaw free, no idle spin since the molecules move, views front and corner; flat fallback by the library · readout off the circles S_liquid (or S_solid, S_gas) at T with its value; on them ΔS = q_rev/T = 6010 J / 273.15 K = 22.0 J/K or 40 700 J / 373.15 K = 109.1 J/K · model: water is given as the identity so the particles can wear their element colours; ΔH_fus 6.01 kJ/mol and ΔH_vap 40.7 kJ/mol (Chapter 10), liquid C_p 75.3 J/(mol·K) (4.184 J/g·°C), the solid's entropy taken as proportional to T and fixed so that liquid water at 298.15 K has Appendix G's 70.0 J/(mol·K), gas C_p 33.6 J/(mol·K); the gas at 298 K then extrapolates to Appendix G's 188.8 within 0.1 · fold: number 16.10, folds 16.11, both images in `originals`

No other photograph or image in the module. Extra simulations: none.

## Referents

- `hot-object` · the hot object, particles A and B · sim-energy-microstates
- `cold-object` · the cold object, particles C and D · sim-energy-microstates

The book prints the two objects' letters in two colours; the page keeps that, and the text marks every mention of each object and of its particles.

## Types bound

`entropy` (S, ΔS, S_f, S_i, S_solid, S_liquid, S_gas, the S axis and its values), `temperature` (T, the slider and axis, 50 °C and room temperature in Example 16.3), `energy` (q_rev, "reversible heat", heat), `velocity` (the speed axis of 16.11). Ink: W, W_f, W_i, k, N, n, probabilities, the energy-unit asterisks, Example 16.2's W_c and W_a.

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
