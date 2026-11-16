# Plan: 16.3 The Second and Third Laws of Thermodynamics (m68818)

Written 2026-10-05 before the build and left for review, as `ch16/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, no numbered figure, two numbered tables (16.1, 16.2), three worked examples (16.4, 16.5, 16.6) each with a Check Your Learning, no boxed note, no Link to Learning, ten end-of-section items (chapter exercises 20 to 29).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `second-law` | The Second Law of Thermodynamics (the book's; Table 16.1) | introduces `entropy-change-of-universe`, `second-law-of-thermodynamics`, `entropy-change-of-surroundings`; uses `entropy`, `system`, `surroundings`, `heat-flow`, `temperature`, `reversible-process`, `spontaneous-process`, `nonspontaneous-process`, `chemical-equilibrium` |
| `ex-ice` | Example 16.4 · Will Ice Spontaneously Melt? | introduces `predict-spontaneity-from-entropy`; reinforces `entropy-change-of-surroundings`; uses `melting`, `celsius-kelvin-conversion` |
| `third-law` | The Third Law of Thermodynamics (the book's; Table 16.2) | introduces `third-law-of-thermodynamics`, `standard-entropy`, `standard-entropy-change`; uses `boltzmann-entropy-equation`, `microstate`, `crystalline-solid`, `absolute-zero`, `standard-state`, `balanced-equation` |
| `ex-condensation` | Example 16.5 · Determination of ΔS° | introduces `calculate-standard-entropy-change`; uses `condensation`, `entropy-and-phase` |
| `ex-methanol` | Example 16.6 · Determination of ΔS° | reinforces `calculate-standard-entropy-change`; uses `combustion-reaction` |

## Figures

The book prints no figure in this section. One Sim for the section's result, after Example 16.4 and its Check Your Learning:

- sim-ice-universe · Sim · entropy-change-of-universe, entropy-change-of-surroundings, second-law-of-thermodynamics, predict-spontaneity-from-entropy · variation by slider and choice: the example computes ΔS_univ at two temperatures; here the reader sees the sum itself, ΔS_sys and ΔS_surr laid tail to head on one scale so that what is left over from zero is ΔS_univ, and sweeps T to watch ΔS_surr = q_surr/T shorten until the leftover changes side at 271.5 K; freezing (the Check Your Learning) reverses every sign · arrows: symbolic (each bar is pointed at its head, the way the change runs) · still, nothing in the idea has a clock; redraw on input, no cycle, no transport · slider T (temperature, 240 to 310 K, default 263.15 K, detents at the book's 263.15 K and 283.15 K, a dashed special at 271.5 K where ΔS_univ = 0, solved from the example's numbers); choice process (melting, freezing; discrete states) · headline "At 263.15 K the surroundings lose more entropy than the ice gains: melting is nonspontaneous." · scene above graph: three rows on one horizontal scale of 40 units a J/K (ΔS_sys from zero, ΔS_surr from its head, ΔS_univ solid from zero to where the two end, its value and the verdict beside it), the zero line sliding to the other side for freezing so the scale stays as large; below, the sizes of the two against T (240 to 310 K, 19 to 26 J/K): the dashed level 22.1 J/K and the curve 6.00 kJ/T, the gap between them shaded, the gap at the slider's T drawn solid and named ΔS_univ, the crossing a dashed vertical at 271.5 K, the two sides marked spontaneous and nonspontaneous · 2D, bars and a graph (book rule) · colour: every bar and both curves in `entropy`, the system's and surroundings' bars hollow and the universe's solid, the level dashed and the curve solid with an `F.legend` key above the box (one category: decoration and dash, not hue); T in `temperature`; q_surr in `energy` in the readout; no referents · labels: row names with the body under each (ice or water, surroundings, universe), a value at each bar's head, hover names on the bars, the gap and the crossing · readout $\Delta S_{univ} = \Delta S_{sys} + q_{surr}/T$ with the live numbers as one chain, as Example 16.4 writes it, to one decimal; a note says the example's rounded values put the balance at 271.5 K where ice melts at 273.15 K · rebuilt 2026-11-16 (second pass): the three bars stood side by side on a ±28 J/K scale, so ΔS_univ, the answer, was a 4-unit sliver beside two tall bars, and the graph plotted only ΔS_univ; the sum was nowhere to be seen as a sum
  works: read off Example 16.4 (the book prints no image here): ΔS_sys = 22.1 J/K, q_surr = −6.00 × 10³ J; at 263.15 K (−10.00 °C) ΔS_univ = −0.7 J/K, at 283.15 K (10.00 °C) +0.9 J/K; the Check Your Learning (freezing): +0.7 and −0.9 J/K · must hold: (1) the ΔS_surr bar starts where the ΔS_sys bar ends and the ΔS_univ bar ends where the ΔS_surr bar ends, at every T and for both processes; (2) at the two detents the readout and the ΔS_univ label give −0.7 and +0.9 J/K (melting), +0.7 and −0.9 J/K (freezing); (3) ΔS_univ = 0 at 6000/22.1 = 271.5 K, the dashed circle, where the curve meets the level; (4) the gap drawn in the graph at T equals the ΔS_univ bar in size; (5) freezing turns every bar over and leaves the graph's two curves where they are, the words spontaneous and nonspontaneous changing sides; (6) the ΔS_univ stub is visible at the book's two temperatures (28 and 36 units long)

Extra simulations: none built. A ledger of νS° bars for the reactions of Examples 16.5 and 16.6 was weighed and dropped: Table 16.2 and the examples' sums already show every number, and a choice of three reactions would add standardisation only.

## Tables

Table 16.1 (the second law, the book's header row "The Second Law of Thermodynamics" as its caption) and Table 16.2 (standard entropies, the CNXML caption as its caption, the carbon, hydrogen and oxygen rows as spanned header rows) as `div.book-table`; the cells as printed, not the summary attribute's different values. Key Equations not printed.

## Types bound

`entropy` (ΔS, ΔS_univ, ΔS_sys, ΔS_surr, S, S°, ΔS°, the bars and the curve), `energy` (q_rev, q_surr), `temperature` (T, T_sys, T_surr, the slider and the axis). W, k and ν stay in ink.

## Referents

None.

## Exercises

Three Check Your Learning items, inline: after Example 16.4 (host `ex-ice`, freezing at the two temperatures, two keyed values), after Example 16.5 (host `ex-condensation`, −120.6 J K⁻¹ mol⁻¹), after Example 16.6 (host `ex-methanol`, 24.7 J/K). Ten end-of-section items: five keyed (fs-idp33735696, fs-idp170448352, fs-idp175070256, fs-idp194136688, fs-idp127896592); one unkeyed conceptual kept with an AI-marked suggested approach (fs-idp47425392); four unkeyed numerical left out and named in `exercise_notes` (fs-idp174223232, fs-idp125011360, fs-idp53811024, fs-idp277989936). Nothing moved.

## Left out

Nothing of the prose. The converter's stray `**` after the third-law equation is an empty paragraph in the CNXML and is not carried. Errata kept as printed: Example 16.4's "S_univ < 0" and "S_univ > 0" and the summary's "S_univ > 0" without the Δ; Example 16.5's answer in J K⁻¹ mol⁻¹; Example 16.6's Check Your Learning "Ca(OH)₂(s)" with an upright s.

## Wanted at chapter level

- variables `16.3/ΔS_univ` → 16.3-second-law
- variables `16.3/ΔS_sys` → 16.3-second-law
- variables `16.3/ΔS_surr` → 16.3-second-law
- variables `16.3/T_sys` → 16.3-second-law
- variables `16.3/T_surr` → 16.3-second-law
- variables `16.3/q_surr` → 16.3-second-law
- variables `16.3/S°` → 16.3-third-law
- variables `16.3/ΔS°` → 16.3-third-law
- variables `16.3/ν_coef` → 16.3-third-law
- forms `eq-entropy-change-universe` → 16.3-second-law
- forms `eq-second-law` → 16.3-second-law
- forms `eq-second-law-surroundings` → 16.3-second-law
- forms `eq-third-law` → 16.3-third-law
- forms `eq-standard-entropy-change` → 16.3-third-law

Applied by the chapter pass (2026-10-05): every anchor as listed, nine variables and five forms. Four rows added so that each macro the page writes has a row here: S at 16.3-third-law; T, ΔS and q_rev at 16.3-second-law, with 16.2's meanings. `config.md` now gives Table 16.1 its header row and Table 16.2 its CNXML caption as titles, as built.

## Derivations

- The second law of thermodynamics, heat flow between two objects in three cases · score 3 · not built: a prose-first illustration by cases, argued in words with inequalities of magnitude; it fails the hidden bar, and the law is stated as a generalization from the cases
- The third law of thermodynamics, S = k ln 1 = 0 · score 1 · not built: one substitution, not a chain
