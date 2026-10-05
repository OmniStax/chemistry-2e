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

- sim-ice-universe · Sim · entropy-change-of-universe, entropy-change-of-surroundings, second-law-of-thermodynamics, predict-spontaneity-from-entropy · variation by slider and choice: the example computes ΔS_univ at two temperatures; here the reader sweeps the temperature and sees ΔS_surr = q_surr/T shrink as T rises while ΔS_sys stays fixed, the two nearly cancelling, and ΔS_univ cross zero at 271.5 K, where the process turns from nonspontaneous to spontaneous; freezing (the Check Your Learning) reverses every sign · arrows: none (no heat arrow is drawn; the quantities are bars and a curve) · still, nothing in the idea has a clock; redraw on input, no cycle, no transport · slider T (temperature, 240 to 310 K, default 263.15 K, detents at the book's 263.15 K and 283.15 K, a dashed special at 271.5 K where ΔS_univ = 0, solved from the example's numbers); choice process (melting, freezing; discrete states) · headline "At 263.15 K (−10.00 °C) the surroundings lose more entropy than the ice gains, so melting is nonspontaneous." · graph beside the bars: on the left three bars on one zero line, ΔS_sys, ΔS_surr and ΔS_univ (J/K, fixed range ±28 J/K, the largest |ΔS_surr| being 25.0 J/K at 240 K); on the right ΔS_univ against T (240 to 310 K, −4 to +4 J/K, the curve reaching ±2.9 J/K at the slider ends), the current state a dot with drop lines, the zero crossing a dashed vertical labelled with its temperature, the region above zero labelled spontaneous and the one below nonspontaneous · 2D, bars and a graph (book rule) · colour: every bar and the curve in `entropy`, the system's and surroundings' bars hollow at a light fill and the universe's solid (decoration, not hue: one category); T in `temperature`; q_surr in `energy` in the readout; no referents, since neither the ice nor the surroundings is drawn as a body · labels: the three bar names over their columns and each bar's value at its end, axis titles; nothing moves, at most eight labels · readout $\Delta S_{univ} = \Delta S_{sys} + q_{surr}/T$ with the live numbers, as Example 16.4 writes it, the result to one decimal as the book gives it; no note (the headline names the sign and the graph the crossing)

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
