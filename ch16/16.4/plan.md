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

- sim-temp-spont · Figure 16.12 + 16.13 · gibbs-free-energy, temperature-dependence-of-spontaneity, free-energy-and-spontaneity · variation by slider: the book draws four fixed lines and a table of their four cases; here the reader sets the signs and sizes of ΔH and ΔS and watches one line ΔG = ΔH − TΔS tilt, swing through all four cases and cross zero at T = ΔH/ΔS, while the case it is in lights up in the book's table beside the graph · arrows: none (the book draws lines and labels only) · still, ΔG against T is a relation with no clock; no transport · sliders ΔH (energy, −100 to 100 kJ, default 44.01 kJ), ΔS (entropy, −250 to 250 J/K, default 118.8 J/K) and T (temperature, 1 to 1000 K, default 298.0 K), the vaporization of water of Examples 16.7 and 16.11, so the default reproduces ΔG° = 8.6 kJ at 298 K; special values named by the text, ΔG = 0, as a dashed circle on all three sliders (T = ΔH/ΔS on T, ΔH = TΔS on ΔH, ΔS = ΔH/T on ΔS), landing on one morphs the readout into T = ΔH/ΔS = 370.5 K · headline "At 298.0 K, $\kdG > 0$: the process is nonspontaneous." · the graph is the figure (ΔG from −150 to 150 kJ, T from 0 to 1000 K, the line clipped to the frame and the live point pinned past it), Figure 16.12's two-by-two table beside it with a small sketch of each case's line in its cell, the current case outlined and its line in the `energy` hue, the other three in muted ink · 2D, a graph (book rule) · ΔH as a dashed level, ΔG solid, the −TΔS gap a bracket at the live T, all `energy` and told by dashing and label (book `COLOR.md`); the crossing a hollow dot on the zero line; "spontaneous" and "nonspontaneous" written in the two halves; no referents (one line) · readout $\kdG = \kdH - \kT\kdS = 44.01\ \text{kJ} - (298.0\ \text{K})(0.1188\ \text{kJ/K}) = 8.61\ \text{kJ}$; note: where the signs agree, the temperature at which the line crosses zero; where they differ, that the line never crosses
- sim-gibbs · Figure 16.14 · free-energy-and-reaction-quotient, free-energy-and-equilibrium-constant, standard-free-energy-change · variation by slider: the book draws three curves for ΔG° < 0, > 0 and = 0; here one ΔG° slider bends one curve through all three, its minimum sliding to where Q = K, and a second slider puts the mixture anywhere along the reaction so the reader reads Q, the sign of ΔG = ΔG° + RT ln Q and the way the reaction must go to reach the minimum · arrows: none (the book's ΔG° arrows are a double-headed measure, drawn here as a bracket) · still, a relation with no clock: the reaction's approach to equilibrium is told by the headline, not run · sliders ΔG° (energy, −5.00 to 5.00 kJ/mol, default −2.00 kJ/mol, the book's panel (a) with its minimum two thirds of the way; detents at ±2.00 for panels (a) and (b); special 0 "K = 1", panel (c)) and progress (untyped, the fraction of reactant turned to product, 0.01 to 0.99, default 0.30; special Q = K where the curve is lowest, landing on it morphs the readout from ΔG = ΔG° + RT ln Q into K = e^(−ΔG°/RT)) · headline "$\kQrxn < \kK$: $\kdG < 0$, and the mixture moves toward products, down to the minimum." · the graph is the figure: G for one mole of reactant A turning into product B at 298.15 K, G = (1 − x)G°(A) + xG°(B) + RT[(1 − x) ln(1 − x) + x ln x], whose slope is ΔG° + RT ln Q and whose minimum is at Q = K; no tick numbers on G, as the book prints none, G°(reactants) and G°(products) dashed levels with the ΔG° bracket beside the frame; x axis from Reactants to Products; the minimum with a dashed drop line and "Q = K = 2.24", the mixture a dot with its drop line and "Q = 0.429" · 2D, a graph (book rule) · curve and dot `energy`; Q and K labels `equilibrium-constant` · readout $\kdG = \kdGo + R\kT\ln\kQrxn = -2.00 + (8.314\times10^{-3})(298.15)\ln 0.429 = -4.10\ \text{kJ/mol}$, and on the special $\kdG = 0$, $\kK = e^{-\kdGo/R\kT} = e^{0.807} = 2.24$; note the matching row of Table 16.4 ("$\kK > 1$: products are more abundant at equilibrium.")

Extra simulations: none. Figure 16.12 is the book's table of the four cases drawn as an image; folded into 16.13, its four cells sit beside the graph and the reader's line moves among them, so the table and the plot are read together.

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
