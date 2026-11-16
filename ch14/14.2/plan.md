# Plan: 14.2 pH and pOH (m68804)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

Three objectives, four numbered figures (14.2 the pH and pOH chart, 14.3 inside the Environmental Science note, 14.4, 14.5), one numbered table (14.1), three worked examples (14.4 to 14.6) with a Check Your Learning each, one boxed note, eleven end-of-section items (chapter exercises 15 to 25).

## Sub-concepts and spans

The book prints no headers in this section; the page takes its own.

| Span | Header | Concepts |
|---|---|---|
| `acidic-basic` | Acidic, basic, and neutral solutions | introduces `acidic-basic-neutral`, `acidic-solution`, `basic-solution`, `neutral-solution`; uses `water-autoionization`, `ion-product-constant-for-water` |
| `p-functions` | The pH and pOH scales | introduces `ph-and-poh-scales`, `ph`, `poh`, `ph-plus-poh`; uses `ion-product-constant-for-water` |
| `neutral-ph` | Neutral solutions at 25 °C and at other temperatures (Table 14.1, Figure 14.2) | reinforces `acidic-basic-neutral`; uses `ph-plus-poh`, `kw-ion-concentrations` |
| `calculations` | Calculating pH and pOH (Examples 14.4 to 14.6, the Environmental Science note with Figure 14.3) | introduces `ph-calculations`; uses `ph`, `poh`, `ph-plus-poh` |
| `measuring` | Measuring pH (Figures 14.4, 14.5) | introduces `measuring-ph`; uses `ph` |

## Figures

- sim-ph-scale · Figure 14.2 · ph-and-poh-scales, ph, poh, ph-plus-poh, acidic-basic-neutral · variation by slider and choice, and a relation the book's table leaves in its digits: the chart's two concentration columns are drawn as a graph beside its pH and pOH columns, the rows still pH −1 to 15 and a log axis of 10⁻¹⁵ to 10¹ M across, so [H₃O⁺] and [OH⁻] are two straight lines, one falling a power of ten a row as the other rises one, crossing on the neutral row; a pH slider moves one solution's row and a dot rides each line, dropped to the axis, its concentration beside it; a temperature choice slides the [OH⁻] line and the pOH column 1.38 rows, so the reader sees the crossing itself move from pH 7.00 to 6.31 and a pH of 7.00 fall on the basic side · arrows: symbolic (the leaders from each sample solution to its pH, and the acidic–basic double arrow) · still, the chart answers its controls and has no clock · pH slider (concentration, −1.00 to 15.00, default 2.92, the solution of Example 14.4, [H₃O⁺] = 1.2 × 10⁻³ M; a dashed circle at the neutral pH, 7.00 or 6.31, labelled "neutral"); temperature choice 25 °C, 80 °C (temperature), default 25 °C; at 80 °C the slider ends at pH 13.62, where [OH⁻] reaches the axis's 10 M, and every sample but pure water fades out, because their pH values are the book's at 25 °C; pure water stays and moves with the neutral row, as the text says · headline "At 25 °C, pH 2.92 is acidic: [H₃O⁺] is greater than [OH⁻]." (acidic, neutral or basic, with greater than, equals or less than) · graph beside the book's vertical chart, sharing its rows: graph, pH, pOH, then the sample-solution scale · 2D, a chart (book rule) · readout, three different formulas on three lines: pH = −log[H₃O⁺] = −log(1.20 × 10⁻³) = 2.92, pOH = −log[OH⁻] = −log(8.32 × 10⁻¹²) = 11.08, pK_w = pH + pOH = 2.92 + 11.08 = 14.00, the concentrations to three figures so that each logarithm gives back the pH shown; no note · labels: the two lines are named on the lines, once; the column titles, the pH and pOH row values and the seventeen sample solutions are the chart's own frame and stand still, and the exercises read lime juice and wine from them, so they are drawn as the book draws them; the row carries its pH and pOH on panels and a row value it covers fades; a sample within 0.05 of the slider's pH is lit; hover names each solution with its pH and each dot with its concentration · colours: pH, pOH, the row, the column titles and the readout's numbers `concentration`; the two lines, their dots and values `F.cat(0)` ([H₃O⁺]) and `F.cat(1)` ([OH⁻]), two instances of one type that must be told apart; the choice `temperature`; pK_w `equilibrium-constant` in the readout; the book's red-to-blue arrow is decoration and drawn in ink (chapter `COLOR.md`), the neutral band a faint ink band · K_w at 80 °C from the text's 4.9 × 10⁻⁷ M, pK_w = 12.62
  works: parts (the book's chart: a header row over five columns, [H₃O⁺] (M), [OH⁻] (M), pH, pOH, Sample Solution; seventeen rows pH −1 to 15; a vertical scale with a tick per row in the last column, each sample's label joined to its point on the scale by an arrow; a double arrow at the right, acidic at the top, basic at the bottom, neutral at the pH 7 row, which is shaded. Here the first two columns are one graph on the same rows, a grid line per row and per power of ten, ticks named under it at every second power from 10⁻¹⁵ to 10¹) · must hold (on every row the [H₃O⁺] line stands at 10^−pH and the [OH⁻] line at 10^−pOH, so on an integer row each line crosses a grid node, the book's table entry; the lines cross on the shaded neutral row, at pH = pK_w/2, 7.00 or 6.31, where pure water's arrow points; pH + pOH = 14.00 at 25 °C and 12.62 at 80 °C; the dots sit on the lines and the readout's three lines agree with the values beside them; −log of each concentration as written gives the pH or pOH written; no value covers a line, a dot or the other value; no row value touches the row's panels; the sample arrows point at the book's pH) · read off the image (rows 10¹ … 10⁻¹⁵ and the reverse, pH −1 … 15, pOH 15 … −1; samples measured on the image's scale, tick spacing 60.75 px: 1 M HCl 0.0, gastric juice 1.5, lime juice 2.0 (the answer key's 1 × 10⁻² M agrees), 1 M CH₃CO₂H (vinegar) 2.4, stomach acid 2.9, wine 3.5 (the arrow sits at 3.55), orange juice 4.2, coffee 5.0, rain water 5.7, pure water 7.0, blood 7.4, ocean water 8.0, baking soda 8.4, Milk of Magnesia 10.5, household ammonia, NH₃ 11.9, bleach 12.6, 1 M NaOH 14.0; the arrow is red to blue in the image and ink here, as `COLOR.md` says; Example 14.4's 1.2 × 10⁻³ M and pH 2.92 are the opening state, and 80 °C gives the text's 4.9 × 10⁻⁷ M and 6.31)
  Rebuilt 2026-11-16 (second pass). The first pass kept the book's table with a marker row: a look-up the still image already gives, with the lesson, the two concentrations trading places tenfold a row and meeting at neutral, left in the digits. The table's two concentration columns are now the graph above; the sample scale, the pH and pOH columns and the 80 °C choice stay. At 80 °C pure water now stays on the scale at 6.31 instead of fading with the rest, and the slider stops where [OH⁻] leaves the chart (it used to reach 240 M).
- fig-acid-rain · Figure 14.3 · kept photograph inside the Environmental Science note; the note points at it · photo
- fig-ph-meter · Figure 14.4 · measuring-ph · kept photograph; the text points at it · photo
- fig-indicator · Figure 14.5 · measuring-ph · kept photograph; the text points at it and the indicator colours are physical fact · photo

Extra simulations: none. The chart carries the section's one idea, a single log scale on which [H₃O⁺] and [OH⁻] slide against each other; a second figure would repeat it.

## Tables

Table 14.1 in the text as `div.book-table`. The Key Equations table is not printed; its five relations are the forms of `ph`, `poh` and `ph-plus-poh`.

## Types bound

`concentration` ([H₃O⁺], [OH⁻], pH, pOH, the chart's columns and marker, the concentrations in the examples), `temperature` (25 °C, 80 °C, 40 °C, the figure's choice), `equilibrium-constant` (K_w, pK_w). Logarithm terms stay ink. Following the chapter's `COLOR.md`, the kind in general ("the pH of a solution", the definitions) stays ink; a particular pH or concentration in a worked example wears the hue.

## Referents

None.

## Exercises

Three Check Your Learning items inline, hosts `ex-ph-from-h3o` (5.70), `ex-h3o-from-ph` (12 M), `ex-poh` (pOH = 11.6, pH = 2.4). Eleven end-of-section items: six keyed kept (fs-idp63054032 open; fs-idp62460480, fs-idm78388032, fs-idp61935360, fs-idp268784 multi; fs-idm209904880 number, its key labelled [OH⁻] for the hydronium concentration the question asks, carried as printed), five unkeyed numerical left out and named (fs-idm59232064, fs-idp100037936, fs-idm113520992, fs-idm93267520, fs-idm60999568). No unkeyed conceptual item, no PhET item. Nothing moves between sections.

## Left out

Objectives, summary, key equations and glossary go to the tables. Errata kept as printed: Figure 14.3's caption "It also is corrodes statues"; the key of fs-idm209904880 names [OH⁻]; Table 14.1's CNXML summary writes H₂O⁺ (the summary is not printed; the table is right). Figure 14.4's dollar sign written `&#36;`.

## Wanted at chapter level

- variables `pH` → 14.2-p-functions
- variables `pOH` → 14.2-p-functions
- variables `pK_w` → 14.2-p-functions
- forms `eq-ph` → 14.2-p-functions
- forms `eq-h3o-from-ph` → 14.2-p-functions
- forms `eq-poh` → 14.2-p-functions
- forms `eq-oh-from-poh` → 14.2-p-functions
- forms `eq-ph-plus-poh` → 14.2-p-functions
- concepts `acidic-basic-neutral` overlaps `acidic-solution`, `basic-solution` and `neutral-solution` (the glossary's three words as concepts of their own); one of the two sets could fold into the other

Applied by the chapter pass (2026-10-05): every anchor as asked; rows `K_w`, `[H3O+]`, `[OH-]` and `T` added, since the page writes them through their macros. `acidic-basic-neutral` is folded into `acidic-solution`, `basic-solution` and `neutral-solution`, the glossary's three words, with the temperature dependence moved into `neutral-solution`'s statement; its coverage rows and exercise tag go to `neutral-solution`, and its edges to the three (each now rests on `water-autoionization`). The general mentions of pH, pOH, concentration and temperature this page kept in ink are marked, as root rule 7 asks; `COLOR.md` says so.

## Derivations

- The pH and pOH scales, pKw = pH + pOH and 14.00 at 25 °C · score 2 · built as drv-pkw
