# Plan: 16.4 Free Energy (m68819)

Written 2026-10-05 before the build and left for review, as `ch16/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Five objectives, three numbered figures (16.12, 16.13, 16.14), two numbered tables (16.3, 16.4) and two unnumbered data tables (Examples 16.7 and 16.8), seven worked examples (16.7 to 16.13) each with its Check Your Learning, no boxed note, no Link to Learning, thirty-seven end-of-section items (chapter exercises 30 to 66).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `gibbs` | Gibbs free energy (our own, for the opening; Table 16.3) | introduces `gibbs-free-energy`, `free-energy-and-spontaneity`; uses `enthalpy`, `entropy`, `temperature`, `state-function`, `second-law-of-thermodynamics`, `entropy-change-of-universe`, `entropy-change-of-surroundings`, `enthalpy-change-at-constant-pressure`, `first-law-of-thermodynamics` |
| `free-work` | What’s “Free” about Δ*G*? (the book's) | introduces `free-energy-and-maximum-work`; uses `gibbs-free-energy`, `work`, `expansion-work`, `reversible-process` |
| `calculating` | Calculating Free Energy Change (the book's; Examples 16.7, 16.8 in `ex-vaporization`, `ex-hgo`) | introduces `standard-free-energy-change`, `standard-free-energy-of-formation`; uses `state-function`, `standard-state`, `standard-entropy`, `standard-enthalpy-of-formation`, `standard-entropy-change`, `enthalpy-change` |
| `coupled` | Free Energy Changes for Coupled Reactions (the book's; Example 16.9 in `ex-coupled`) | introduces `free-energy-of-coupled-reactions`; uses `hess-law`, `standard-free-energy-of-formation` |
| `temperature` | Temperature Dependence of Spontaneity (the book's; Figure 16.12 + 16.13, Examples 16.10, 16.11 in `ex-co`, `ex-boiling`) | introduces `temperature-dependence-of-spontaneity`; uses `exothermic-and-endothermic`, `free-energy-and-spontaneity`, `boiling-point` |
| `equilibrium` | Free Energy and Equilibrium (the book's; Table 16.4, Figure 16.14, Examples 16.12, 16.13 in `ex-nonstandard`, `ex-ksp`) | introduces `free-energy-and-reaction-quotient`, `free-energy-and-equilibrium-constant`; uses `reaction-quotient`, `equilibrium-constant`, `ideal-gas-constant`, `solubility-product`, `chemical-equilibrium` |

Each worked example reinforces the concept of its span.

## Figures

- sim-temp-spont · Figure 16.12 + 16.13 · gibbs-free-energy, temperature-dependence-of-spontaneity, free-energy-and-spontaneity · variation by slider: the book draws four fixed lines and a table of their four cases; here one line ΔG = ΔH − TΔS starts at the dashed ΔH level and leaves it by −TΔS, a shaded wedge that widens with T, so the reader sees why temperature decides the sign only when the two terms pull opposite ways; a tap on a cell of the book's table gives ΔH and ΔS that cell's signs, and the cell the line is in is outlined · arrows: none (the book draws lines and labels only) · still, ΔG against T is a relation with no clock; no transport · sliders ΔH (energy, −100 to 100 kJ, default 44.01 kJ), ΔS (entropy, −250 to 250 J/K, default 118.8 J/K) and T (temperature, 1 to 1000 K, default 298.0 K, also the point dragged along the line), the vaporization of water of Examples 16.7 and 16.11, so the default reproduces ΔG° = 8.6 kJ at 298 K; special ΔG = 0 as a dashed circle on all three sliders (T = ΔH/ΔS on T, ΔH = TΔS on ΔH, ΔS = ΔH/T on ΔS), landing on one morphs the readout into T = ΔH/ΔS = 370.5 K · headline "At 298.0 K, $\kdG > 0$: the process is nonspontaneous." · the graph is the figure (ΔG from −150 to 150 kJ, T from 0 to 1000 K, the line clipped to the frame and the live point pinned past it), its lower half, ΔG < 0, tinted in ink as the book tints "Spontaneous"; Figure 16.12's two-by-two table beside it, each cell a sketch of its line over the same tinted half and the words "spontaneous at high T" and so on · 2D, a graph (book rule) · ΔH a dashed level, ΔG solid, −TΔS the wedge between them with a bracket at the live T that states its value, all `energy` and told by dashing and label (book `COLOR.md`); the crossing a hollow dot on the zero line with its temperature; no referents (one line) · readout $\kdG = \kdH - \kT\kdS = 44.01\ \text{kJ} - (298.0\ \text{K})(0.1188\ \text{kJ/K}) = 8.61\ \text{kJ}$; note: where the signs agree, the temperature at which the line crosses zero; where they differ, that the line never crosses · rebuilt 2026-11-16 (second pass): the first two builds drew a bare line in a small graph beside a table at tick size; now the wedge shows the entropy term growing with T, the table chooses the case, the point is dragged on the line, and every label is at label size
  works: read off the images: Figure 16.12, a two-by-two table, columns "ΔH > 0 (endothermic)" and "ΔH < 0 (exothermic)", rows "ΔS > 0 (increase in entropy)" and "ΔS < 0 (decrease in entropy)"; cells: ΔH > 0, ΔS > 0 "ΔG < 0 at high temperature, ΔG > 0 at low temperature, process is spontaneous at high temperature"; ΔH < 0, ΔS > 0 "ΔG < 0 at any temperature, process is spontaneous at any temperature"; ΔH > 0, ΔS < 0 "ΔG > 0 at any temperature, process is nonspontaneous at any temperature"; ΔH < 0, ΔS < 0 "ΔG < 0 at low temperature, ΔG > 0 at high temperature, process is spontaneous at low temperature". Figure 16.13, "Free energy" against "Increasing temperature (K)", a dashed zero line, the upper half "Nonspontaneous" (ΔG > 0), the lower "Spontaneous" (ΔG < 0); four straight lines from two intercepts on the ΔG axis (above zero for ΔH > 0, below for ΔH < 0), rising when ΔS < 0 and falling when ΔS > 0; only the two lines whose signs agree cross zero. No numbers; Examples 16.7 and 16.11 give 44.01 kJ, 118.8 J/K, 8.6 kJ at 298 K and T = 370.5 K · must hold: (1) the line meets the ΔG axis at ΔH (T = 0) and falls when ΔS > 0, rises when ΔS < 0; (2) it crosses zero at ΔH/ΔS exactly when the two signs agree, and the hollow dot and the T slider's circle sit there; (3) the outlined cell is the case the signs of ΔH and ΔS make, its sketch has the line's direction, and a tap on a cell puts the line in that case; (4) ΔG = 8.61 kJ at 298.0 K on load, and the bracket's −TΔS (−35.4 kJ) added to ΔH gives it; (5) the wedge lies between the ΔH level and the line and is as tall as the bracket at every T; (6) labels stay clear of the line, the frame and each other at the slider extremes
- sim-gibbs · Figure 16.14 · free-energy-and-reaction-quotient, free-energy-and-equilibrium-constant, standard-free-energy-change · variation by slider: the book draws three curves for ΔG° < 0, > 0 and = 0; here one ΔG° slider bends one curve through all three, and the reader drags a mixture along it: the tangent at the mixture has slope ΔG = ΔG° + RT ln Q, its head on the downhill end, and goes flat at the minimum, where Q = K. That sets ΔG (a slope at one mixture) apart from ΔG° (the bracket between the two end levels), which the book's picture leaves to the reader · arrows: symbolic, the tangent's head points the way the reaction runs · still, a relation with no clock: the reaction's approach to equilibrium is told by the headline and the arrow, not run · sliders ΔG° (energy, −2.50 to 2.50 kJ/mol, default −2.00 kJ/mol, the book's panel (a); detents at ±2.00 for panels (a) and (b); special 0 "K = 1", panel (c)) and reaction progress (untyped, 1 % to 99 % product, default 30 %, also the point dragged along the curve; special Q = K where the curve is lowest, landing on it morphs the readout from ΔG = ΔG° + RT ln Q into K = e^(−ΔG°/RT)) · headline "$\kQrxn < \kK$: $\kdG < 0$, and the reaction proceeds forward, down to the minimum." · the graph is the figure: G for one mole of reactant A turning into product B at 298.15 K, G = (x − ½)ΔG° + RT[(1 − x) ln(1 − x) + x ln x], measured from midway between the two standard values so the curve keeps to the middle of a frame fixed at −2.9 to 1.7 kJ and fills it; no tick numbers on G, as the book prints none; G°(reactants) and G°(products) dashed levels, each named over its own end, the ΔG° bracket beside the frame; x axis from Reactants to Products in percent product; the minimum with a dashed drop line and "K = 2.24", the mixture with its drop line and "Q = 0.30/0.70 = 0.429" · 2D, a graph (book rule) · curve, tangent and bracket `energy`, told apart by weight and label; Q and K labels `equilibrium-constant` · readout $\kdG = \kdGo + R\kT\ln\kQrxn = (-2.00 + 2.479\ln 0.429)\ \text{kJ/mol} = -4.10\ \text{kJ/mol}$, and on the special $\kQrxn = \kK = e^{-\kdGo/R\kT} = e^{0.807} = 2.24$; note "At 298.15 K, RT = 2.479 kJ/mol." and the matching row of Table 16.4 · rebuilt 2026-11-16 (second pass): the first two builds left a shallow curve in a tall frame, a readout that wrapped, and nothing that said what ΔG is on the picture; now the curve fills the frame, the slope is drawn and named, the mixture is dragged on the curve, and the readout is one line
  works: read off the image: three panels, "Gibbs free energy (G)" against "Reaction progress" from "Reactants" to "Products", no numbers; (a) G°(reactants) high and G°(products) lower, a double arrow between the two dashed levels "ΔG° < 0", the minimum right of centre and below both levels, over "Q = K > 1"; (b) the mirror, "ΔG° > 0", minimum left of centre, "Q = K < 1"; (c) the two levels equal, "ΔG° = 0", minimum at the centre, "Q = K = 1"; a dashed drop from each minimum to the axis · must hold: (1) the curve starts at G°(reactants) and ends at G°(products), and the bracket between the two levels reads ΔG°; (2) the minimum lies right of centre for ΔG° < 0, left for ΔG° > 0, at the centre for 0, below both levels, and there Q = K = e^(−ΔG°/RT) (2.24 for −2.00 kJ/mol, 0.365 for 2.50, 1.00 for 0); (3) the tangent touches the curve at the mixture, its slope is ΔG = ΔG° + RT ln Q, its head points downhill toward the minimum from either side, and it is flat with no head at Q = K; (4) ΔG = −4.10 kJ/mol at Q = 0.429 on load; (5) the Q, K and slope labels stay clear of each other and inside the frame at the slider extremes

Extra simulations: none. Figure 16.12 is the book's table of the four cases drawn as an image; folded into 16.13, its four cells sit beside the graph, choose the case when tapped, and the reader's line moves among them, so the table and the plot are read together.

## Tables

Table 16.3 (Relation between Process Spontaneity and Signs of Thermodynamic Properties) and Table 16.4 (Relations between Standard Free Energy Changes and Equilibrium Constants) as `div.book-table` with eyebrow and title; the data tables of Examples 16.7 and 16.8 as `div.book-table` without a number. Table 16.3 prints no header row.

## Photographs and images

None in the text. The acetic acid dimer (`CNX_Chem_16_04_aceticdimr_img.jpg`) is kept inside the prompt of exercise `fs-idm230037264`, as `config.md` says.

## Types bound

`energy` (G, ΔG, ΔG°, ΔG_f°, ΔG₁°, ΔG₂°, H, ΔH, ΔH°, ΔH_f°, q_sys, q_surr, w, w_max; the line, curve, levels and bracket of both figures), `entropy` (ΔS, ΔS°, ΔS_univ, S°; the ΔS slider), `temperature` (T; the T slider and axis), `equilibrium-constant` (Q, Q_P, K, K_P, K_sp; the Q and K labels), `pressure` (the partial pressures of Example 16.12, values only). R, ν and the reaction progress stay ink.

## Referents

None: each figure draws one line or curve, and no example names a thing the text and a figure both point at. ΔG₁° and ΔG₂° are not drawn, so they carry no `ref`.

## Exercises

Seven Check Your Learning items, each after its example (hosts `ex-vaporization`, `ex-hgo`, `ex-coupled`, `ex-co`, `ex-boiling`, `ex-nonstandard`, `ex-ksp`), all keyed: numbers for 16.7 (102.0 kJ/mol), 16.8 (140.8 and 141.5 kJ/mol), 16.9 (−199.7 kJ), 16.11 (313 K), 16.12 (45.1 kJ/mol), 16.13 (0.32); an open answer for 16.10.

Twenty-two end-of-section items: nineteen keyed (31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 56, 58, 60, 62, 64, 66), three unkeyed conceptual kept with an AI-marked suggested approach (30 `fs-idm162318800`, 32 `fs-idm139518608`, 63 `fs-idm154668704`). Fifteen unkeyed numerical items left out and named in `exercise_notes`: 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 57, 59, 61, 65. Nothing moved. Exercise 55's key prints "−0.16 kJ" for a ΔS°: kept as printed, the number checked as −0.16 with a hint to give ΔS° in kJ/K.

## Left out

Nothing of the prose. Errata kept as printed: −285.83 in Example 16.7's table against −286.83 in Example 16.11; "ΣνG_f°" without the Δ and ΔS° for the S° values in Example 16.8; "201.3 kJ + −300.1 kJ"; "H2S" in Example 16.9; exercise 41 (e) "SnCl₄(l) ⟶ SnCl₄(l)"; the key of exercise 55. Exercise 56's "Δ*G*º" is written with ° (standing decision). The glossary's "Gibbs free energy change (*G*)" is the term of `gibbs-free-energy` already.

## Wanted at chapter level

- forms `eq-gibbs-free-energy` → 16.4-gibbs
- forms `eq-free-energy-change` → 16.4-gibbs
- forms `eq-free-energy-entropy-universe` → 16.4-gibbs
- forms `eq-free-energy-max-work` → 16.4-free-work
- forms `eq-standard-free-energy-change` → 16.4-calculating
- forms `eq-free-energy-from-formation` → 16.4-calculating
- forms `eq-crossover-temperature` → 16.4-temperature
- forms `eq-free-energy-nonstandard` → 16.4-equilibrium
- forms `eq-standard-free-energy-k` → 16.4-equilibrium
- forms `eq-k-from-standard-free-energy` → 16.4-equilibrium
- variables `16.4/G` → 16.4-gibbs
- variables `16.4/ΔG` → 16.4-gibbs
- variables `16.4/H` → 16.4-gibbs
- variables `16.4/ΔH` → 16.4-gibbs
- variables `16.4/q_sys` → 16.4-gibbs
- variables `16.4/w_max` → 16.4-free-work
- variables `16.4/ΔG°` → 16.4-calculating
- variables `16.4/ΔH°` → 16.4-calculating
- variables `16.4/ΔG_f°` → 16.4-calculating
- variables `16.4/ΔH_f°` → 16.4-ex-vaporization
- variables `16.4/ΔG_1°` → 16.4-coupled
- variables `16.4/ΔG_2°` → 16.4-coupled
- variables `16.4/R` → 16.4-equilibrium
- variables `16.4/Q_c` → 16.4-equilibrium
- variables `16.4/Q_P` → 16.4-equilibrium
- variables `16.4/K` → 16.4-equilibrium
- variables `16.4/K_P` → 16.4-equilibrium
- variables `16.4/K_sp` → 16.4-ex-ksp
- variables: a new row `16.4/Q_conc` (\kQc, "the reaction quotient written with molar concentrations", concept `reaction-quotient`, as in 13.2) → 16.4-equilibrium; the text writes the book's *Q*<sub>C</sub> with `\kQc`

Applied by the chapter pass (2026-10-05): every anchor as listed, ten forms and eighteen variables; the new row Q_conc (13.2's meaning, concept `reaction-quotient`) at 16.4-equilibrium. Eight rows added so that each macro the page writes has a row here: S, T, ΔS, ΔS_univ and q_surr at 16.4-gibbs, ΔS° at 16.4-calculating, S° at 16.4-ex-vaporization, all with their earlier meanings, and w at 16.4-free-work as the useful work a spontaneous process may accomplish, with `redefines`.

## Derivations

- Gibbs free energy, ΔG = −TΔS_univ · score 5 · built as drv-free-energy-universe
- What's "free" about ΔG?, ΔG = w_max · score 12 · not built: the book declines the derivation as beyond its scope, and it rests on the split of work into expansion and other work and on reversible work as the maximum, which the book never states
- Free energy changes for coupled reactions, ΔG° of vaporization from the formation reactions · score 1 · not built: a sum of chemical equations with their free energies added, one move, not a chain of equations
- Temperature dependence of spontaneity, T = ΔH/ΔS · score 0 · built as drv-crossover-temperature (a thin printed block)
- Free energy and equilibrium, ΔG = ΔG° + RT ln Q · score 0 · not built: stated as a law, with no derivation the book hides
- Free energy and equilibrium, ΔG° = −RT ln K and K = e^(−ΔG°/RT) · score 1 · built as drv-free-energy-equilibrium
- Example 16.8, ΔG° of HgO decomposition two ways · score 1 · not built: a worked example substituting into the section's formulas
- Example 16.13, Ksp of AgCl from free energies of formation · score 1 · not built: a worked example substituting into the section's formulas
