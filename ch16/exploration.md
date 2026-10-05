# Exploration: Chemistry 2e, Chapter 16 Thermodynamics

Written 2026-10-05, before the chapter was prepared. The five modules were converted with `python3 tools/convert.py 16` and read in full. Figure, table and example numbers follow openstax.org (checked on the publisher's pages for 16.1, 16.2, 16.3 and 16.4), from the opener as Figure 16.1. Nothing departs from the book's organisation.

## Why this chapter

Chapter 5 measured the heat of a reaction; this chapter asks whether the reaction will go at all. 16.1 separates spontaneity from speed (Tc-99m against U-238, diamond against graphite) and finds the common thread of spontaneous change in the dispersal of matter (a gas filling an evacuated flask with no change in energy) and of energy (heat flowing from hot to cold). 16.2 gives that dispersal a number: Clausius's ΔS = q_rev/T, then Boltzmann's S = k ln W, made concrete by counting the sixteen microstates of four particles in two boxes and the ten of two energy units shared by four particles, and turned into rules for the sign of ΔS (phase, temperature, molecular complexity, mixing). 16.3 states the second law over the universe, ΔS_univ = ΔS_sys + ΔS_surr > 0, with ΔS_surr = q_surr/T, and fixes the zero of entropy by the third law so that standard entropies can be tabulated and summed. 16.4 folds both into one system quantity, ΔG = ΔH − TΔS, reads spontaneity off its sign, computes it from tables two ways, couples reactions, finds the temperature where the sign changes (T = ΔH/ΔS) and closes on ΔG = ΔG° + RT ln Q and ΔG° = −RT ln K, the bridge back to Chapters 13 to 15.

## Modules

| Section | Module | Ex. | Fig. | Img. (outside exercises) | Tables | Glossary | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68815 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 16.1 Spontaneity | m68816 | 1 | 5 | 0 | 0 | 2 | 1 | 5 | 3 | — |
| 16.2 Entropy | m68817 | 2 | 5 | 1 (Example 16.2) | 0 | 3 | 2 | 14 | 7 | Key Equations; 1 Link to Learning (states of matter simulator) |
| 16.3 The Second and Third Laws of Thermodynamics | m68818 | 3 | 0 | 0 | 2 | 4 | 3 | 10 | 5 | Key Equations |
| 16.4 Free Energy | m68819 | 7 | 3 | 0 (1 in an exercise) | 2 + 2 unnumbered in examples | 3 | 7 | 37 | 19 | Key Equations |

No boxed note (no Chemistry in Everyday Life, How Sciences Interconnect or Portrait of a Chemist) in the chapter.

## Numbers as openstax.org prints them

- Figures: intro 16.1 Geyser. 16.1: 16.2 decayrates (graph, U-238 and Tc-99m remaining against time), 16.3 carbon (diamond and graphite, photographs with structure drawings), 16.4 Gas (two flasks, valve closed then open), 16.5 Temperature (X hot, Y cold, then in contact), 16.6 Process (three photographs (a)(b)(c), inside Example 16.1, caption only credits). 16.2: 16.7 Carnot (two portraits (a)(b)), 16.8 Microstates (sixteen microstates in five distributions), 16.9 Energy (two energy units among A, B, C, D, ten microstates), 16.10 Entropies (solid, liquid, gas flasks), 16.11 EntGraph (speed distributions at four temperatures beside S against T with melting and boiling jumps). 16.3: none. 16.4: 16.12 Scenarios (a 2×2 table drawn as an image), 16.13 TempSpont (ΔG against T, four lines), 16.14 Gibbs (G against reaction progress, (a)(b)(c)).
- Tables: 16.1 the second law (ΔS_univ > 0, < 0, = 0; its header row, “The Second Law of Thermodynamics”, is its title), 16.2 standard entropies (16.3; its CNXML caption, which the converter dropped, is its title), 16.3 Relation between Process Spontaneity and Signs of Thermodynamic Properties, 16.4 Relations between Standard Free Energy Changes and Equilibrium Constants (both 16.4). Unnumbered data tables inside Examples 16.7 (`fs-idm230329280`) and 16.8 (`fs-idm232730384`). Key Equations tables are not printed.
- Examples: 16.1 (16.1), 16.2–16.3 (16.2), 16.4–16.6 (16.3), 16.7–16.13 (16.4).
- Unnumbered images: `CNX_Chem_16_03_Matter_img.jpg` (Example 16.2, four particles spread from one box to six two-and-two microstates); `CNX_Chem_16_04_aceticdimr_img.jpg` (exercise `fs-idm230037264`, the acetic acid dimer).
- File-name quirks: 16.2's Microstates, Gas, Temperature and EntGraph are `CNX_Chem_16_02_*` while its other images are `16_03`; 16.1's Gas, Temperature and Process are `16_02`. 16.4 uses `CNX_Chem_16_04_TempSpont-d7b9.jpg` and `CNX_Chem_16_04_Gibbs-1aa8.jpg`; the bundle also holds `-a89a`, `-05d9`, `CNX_Chem_16_05_Gibbs.jpg` and `CNX_Chem_16_05_TempSpont.jpg`, which no module names. No bundle name carries a space. Appendix G is the sheet `/chemistry-2e/sheets/thermo/`, Appendix J `/chemistry-2e/sheets/ksp/`.

## What is new

Spontaneous and nonspontaneous processes, spontaneity against rate, dispersal of matter and energy; reversible processes, entropy, microstates and distributions, the Boltzmann equation, the sign of ΔS; the entropy change of the universe, the second and third laws, standard entropies and standard entropy changes; Gibbs free energy, its relation to spontaneity and to maximum work, standard free energy changes and free energies of formation, coupled reactions, the temperature dependence of spontaneity, ΔG under nonstandard conditions and its link to K. `spontaneous-process` already stands in 11.1 and is reused; the glossary's "spontaneous change" is a term for it.

No new type: `entropy` and `energy` are already declared. Symbols staged and merged: entropy `S°` `\kSo`, `ΔS°` `\kdSo`, `ΔS_univ` `\kdSuniv`, `ΔS_sys` `\kdSsys`, `ΔS_surr` `\kdSsurr`, `S_f` `\kSf`, `S_i` `\kSi`, `S_solid` `\kSsolid`, `S_liquid` `\kSliquid`, `S_gas` `\kSgas`; energy `G` `\kG`, `ΔG°` `\kdGo`, `ΔG_f°` `\kdGf`, `ΔG_1°` `\kdGone`, `ΔG_2°` `\kdGtwo`, `q_rev` `\kqrev`, `q_surr` `\kqsurr`, `q_sys` `\kqsys`, `q_X` `\kqX`, `q_Y` `\kqY`, `w_max` `\kwmax`; temperature `T_X` `\kTX`, `T_Y` `\kTY`, `T_sys` `\kTsys`, `T_surr` `\kTsurr`; untyped `W`, `W_f`, `W_i`, `k_B` (latex k), `N_particles` (N), `n_boxes` (n), `ν_coef` (\nu). Reused: `S` `\kS`, `ΔS` `\kdS`, `ΔG` `\kdG`, `H` `\kH`, `ΔH` `\kdH`, `ΔH°` `\kdHo`, `ΔH_f°` `\kdHf`, `ΔU` `\kdU`, `q` `\kq`, `w` `\kwork`, `P` `\kP`, `ΔV` `\kdV`, `T` `\kT`, `K` `\kK`, `Q_c` `\kQrxn` (latex Q), `Q_P` `\kQP`, `K_P` `\kKP`, `K_sp` `\kKsp`, untyped `R`.

## Sketches to redraw and photographs to keep

- 16.2 decayrates: a graph the text points at, two curves (one per isotope, referent colours), percent remaining (ink) against time (time hue). A faithful copy or a still Figure; nothing varies that the text asks about. Section's call, lowest tier by default.
- 16.3 carbon: photographs with structure drawings; keep as a photo row, or redraw the two lattices as a 3D Figure with a choice of allotrope (unit cells are 3D by the book's rule). The section decides whether the lattices add a view the photograph lacks (they are taught in 10.5).
- 16.4 Gas and 16.5 Temperature: the chapter's two founding pictures, and both draw what moves. 16.4 is a particle picture (3D by the book's rule: two connected flasks, a valve choice closed/open, gas particles in element colours, molecules crossing on a clock, a count in each flask on a flat strip, P = 0 in the empty flask, w = 0, q = 0, ΔU = 0 in the readout). 16.5 is a heat-flow strip (T_X and T_Y bars converging on a clock, q_X = −q_Y in the readout). Kinematic arrows (heat, particle paths) put both at the moving tier; one fold 16.4 + 16.5 with a choice of matter or energy is possible.
- 16.6 Process: three photographs inside Example 16.1, kept as one photo row (the example's three parts point at them).
- 16.7 Carnot: two portraits the text points at; kept. The bundle alt describes only Clausius (and misspells him "Clasius"); write your own.
- 16.8 Microstates + 16.9 Energy (+ Example 16.2's image): the chapter's showpiece. A still Sim or Figure where the reader picks the number of particles (4, 6, more) and sees every microstate grouped into distributions as a histogram of W per distribution, the probability of all-in-one-box falling as N grows (exercise `fs-idm72753056` asks exactly this), and S = k ln W in the readout; a second choice for energy units among particles (16.9). The book's states (N = 4, two boxes; two units, four particles) are the defaults. Discrete states are choices, not sliders.
- 16.10 Entropies: a particle picture (3D by the book's rule), phase as a choice (solid, liquid, gas) or folded with 16.11.
- 16.11 EntGraph: two graphs, speed distributions at 100, 200, 500, 1000 K beside S against T with jumps at melting and boiling. A still Sim with a temperature slider moving a point along the S–T curve while the speed distribution broadens; folds well with 16.10 (the particle box beside it). The Link to Learning (states of matter simulator, openstax.org/l/16freemotion) is dropped and named in `notes`, and triggers this Sim.
- 16.12 Scenarios: a table drawn as an image; write it as an HTML table in `div.book-table` (keeping the Figure number and eyebrow as the book prints it) or keep it as a figure row; folds naturally into 16.13.
- 16.13 TempSpont: the natural slider figure. ΔG = ΔH − TΔS as a line against T, sliders for ΔH and ΔS (energy and entropy hues), the crossing T = ΔH/ΔS a dashed special, the spontaneous region below zero; the four book lines as detents or a choice of scenario (16.12). Defaults from Example 16.11 (water: 44.01 kJ, 118.8 J/K, crossing 370.5 K).
- 16.14 Gibbs: G against reaction progress for ΔG° < 0, > 0, = 0, the minimum at Q = K. A still Sim with a ΔG° slider (or the three panels as a choice) and a point the reader drags along the curve showing Q and ΔG = ΔG° + RT ln Q with the slope's sign; minimum at K = e^(−ΔG°/RT).

## Notes, Link to Learning and PhET

One Link to Learning (16.2, the states of matter simulator), dropped and named in `notes`; it is the trigger for the 16.10/16.11 Sim. No `simulation-exercise` in the chapter.

## Exercises that belong elsewhere

None move. `fs-idp277989936` and `fs-idp127896592` (16.3, ΔS° from Appendix G) and `fs-idm195989408` and `fs-idm134681120` (16.4, ΔG° for the same reactions) are pairs across sections; each stays where the book puts it. `fs-idm184693712` (16.4, diamond to graphite) returns to 16.1's example but needs ΔG°, so it stays in 16.4.

## Keyed and unkeyed

- 16.1: 5 items, 3 keyed (`fs-idp114103472`, `fs-idp1018800`, `fs-idm103719792`). Unkeyed conceptual, kept with an AI-marked suggested approach: `fs-idp120021296`, `fs-idp158359616`. Nothing left out. CYL 1.
- 16.2: 14 items, 7 keyed. Unkeyed numerical, left out: `fs-idp46279440`, `fs-idm215906096` (2). Kept with a suggested approach: `fs-idm56843152`, `fs-idm199093136`, `fs-idm12232336`, `fs-idm216212480`, `fs-idm213645360` (5). 12 items. CYL 2.
- 16.3: 10 items, 5 keyed. Left out: `fs-idp174223232`, `fs-idp125011360`, `fs-idp53811024`, `fs-idp277989936` (4). Kept with a suggested approach: `fs-idp47425392`. 6 items. CYL 3.
- 16.4: 37 items, 19 keyed. Left out: `fs-idm134681120`, `fs-idm160458752`, `fs-idm217769472`, `fs-idm118316848`, `fs-idm124546864`, `fs-idm45665120`, `fs-idm139694688`, `fs-idm13994016`, `fs-idm56827936`, `fs-idm189903696`, `fs-idm181696144`, `fs-idm234603840`, `fs-idm184693712`, `fs-idm156294896`, `fs-idm182364544` (15). Kept with a suggested approach: `fs-idm162318800`, `fs-idm139518608`, `fs-idm154668704` (3). 22 items. CYL 7.
- Every CYL is keyed and needs its `data-place` host. Read the CNXML for each key.

## Errata to carry as printed and name in `notes`

- 16.1: "(*P* = 0). (" stray full stop before the figure reference.
- 16.2: Figure 16.7's caption "Nicholas Léonard Sadi Carnot" against the text's "Nicolas"; "the flow of heat to yield one of the other two distribution"; Example 16.2 writes W_c/W_a for W_f/W_i; exercise `fs-idm203140096` (b) "Fe₂O₂(s)".
- 16.3: Example 16.4 concludes "S_univ < 0" and "S_univ > 0" without the Δ (CNXML), and the summary "S_univ > 0" likewise; Table 16.2's summary attribute lists other values (219.5, 229.5, 130.57…) than the cells print, so use the cells; the converter leaves a stray `**` after the third-law equation; Example 16.6's CYL writes "Ca(OH)₂(s)" with an upright s; Example 16.5's answer "−120.6 J K⁻¹ mol⁻¹".
- 16.4: Example 16.7's table prints ΔH_f°(H₂O(l)) = −285.83 kJ/mol while its equation (and Example 16.11's) writes −286.83 yet gets 44.01 kJ; Example 16.8 (a) "ΣνG_f°" without the Δ, and (b) writes ΔS° for the S° values; "201.3 kJ + −300.1 kJ"; Example 16.9 "H2S" without the subscript; exercise `fs-idm128725552` (e) "SnCl₄(l) ⟶ SnCl₄(l)"; `fs-idm62833440` prints "Δ*G*º" with the ordinal (write ° per the standing decision); key `fs-idm230037264` "−0.16 kJ" for a ΔS°; the glossary's "Gibbs free energy change (*G*)"; Table 16.4's summary names a "Comments" column the cells head "Composition of an Equilibrium Mixture".

## Errata as built

Carried as printed and named in each section's `notes` or `exercise_notes`, as listed above, with two additions found in the build: Figure 16.2's time axis reads hours where its caption and curves need days (drawn in days, `notes` of 16.1), and the text of 16.4 speaks of “two yellow lines”, the book's colours for the two cases of Figure 16.13 whose ΔH and ΔS share a sign (kept, `notes` of 16.4). Exercise 56's “Δ*G*º” is written with °, and every degree sign inside an exercise's math is `^\circ`.

## Modelled numbers

Two figures draw numbers the book does not print. Figure 16.5 gives objects X and Y a heat capacity of 1.00 kJ/K each, which its caption states, starts them at 350 K and 290 K (the reader's sliders), and lets the heat flow fall with their temperature difference over ten minutes of model time. Figure 16.10 + 16.11 draws the entropy of one mole of water against temperature from ΔH_fus = 6.01 kJ/mol and ΔH_vap = 40.7 kJ/mol (Chapter 10), C_p = 75.3 J/(mol·K) for the liquid and 33.6 J/(mol·K) for the gas, with the solid's entropy taken as proportional to T and fixed so that the liquid has Appendix G's 70.0 J/(mol·K) at 298.15 K; the gas extrapolated to 298 K then lands within 0.1 of Appendix G's 188.8. The book's own Figure 16.11 prints the shape with no numbers on its entropy axis.

## Root rule 28

Physical 3D: the two flasks of Figure 16.4 (particle picture, bounded orbit, never from beneath), the phases of Figure 16.10 (particle picture), and, if the section redraws them, the diamond and graphite lattices of Figure 16.3. Nothing mathematical in 3D: the microstate counts, the S–T curve, ΔG against T and G against reaction progress are flat. No locked view.

## BE INSPIRING

Make the reader feel that the second law is counting. Start with four coloured particles and two boxes, let the reader add particles and watch the middle distribution swallow the probability until "all in one box" vanishes, and read S = k ln W climbing beside it; the same counting runs heat downhill from X to Y. Then hand the reader the two dials chemistry actually turns, ΔH and ΔS, and let them drag a line across ΔG = 0 to find where ice melts, water boils, or HgO decomposes, before rolling a ball down the G-against-progress curve into the equilibrium valley where Q meets K.
