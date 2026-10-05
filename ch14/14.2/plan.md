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

- sim-ph-scale · Figure 14.2 · ph-and-poh-scales, ph, poh, ph-plus-poh, acidic-basic-neutral · variation by slider and choice: the book's chart is one fixed table; here a pH slider moves one solution down the ladder and its [H₃O⁺], [OH⁻], pH and pOH are read together across the four columns, [H₃O⁺] falling tenfold for each unit as [OH⁻] rises tenfold, and a temperature choice slides the [OH⁻] and pOH columns 1.38 units against the pH column, so the neutral band moves from 7.00 at 25 °C to 6.31 at 80 °C and a pH of 7.00 turns basic · arrows: symbolic (the leaders from each sample solution to its pH, and the acidic–basic double arrow) · still, the chart answers its controls and has no clock · pH slider (concentration, −1.00 to 15.00, default 7.00, a dashed circle at the neutral pH, 7.00 or 6.31, labelled "neutral"); temperature choice 25 °C, 80 °C (temperature), default 25 °C; a change slides the two columns and the band, the sample solutions fading out at 80 °C because their pH values are the book's at 25 °C · headline "At 25 °C, pH 7.00 is neutral: [H₃O⁺] equals [OH⁻]." (acidic, neutral or basic, with greater than, equals or less than) · graph alone, the book's vertical chart: columns [H₃O⁺], [OH⁻], pH, pOH, then the sample-solution scale · 2D, a chart (book rule) · readout pH + pOH = 7.00 + 7.00 = pK_w = 14.00 with the live numbers; no note, the headline and the columns say the rest · labels: the column titles, the row values and the seventeen sample solutions are the chart's own frame and stand still, and the exercises read lime juice and wine from them, so all are drawn as the book draws them (the solutions at the pH read off the book's scale: 1 M HCl 0, gastric juice 1.5, lime juice 2.0, 1 M CH₃CO₂H 2.4, stomach acid 2.9, wine 3.5, orange juice 4.2, coffee 5.0, rain water 5.7, pure water 7.0, blood 7.4, ocean water 8.0, baking soda 8.4, Milk of Magnesia 10.5, household ammonia 11.9, bleach 12.6, 1 M NaOH 14.0); the marker carries its four live values on panels in the concentration hue, and a row value it covers fades; hover names each solution with its pH · colours: pH, pOH, [H₃O⁺], [OH⁻], the marker and column titles `concentration`; the choice `temperature`; pK_w `equilibrium-constant` in the readout; the book's red-to-blue arrow is decoration and drawn in ink (chapter `COLOR.md`), the neutral band a faint ink band · K_w at 80 °C from the text's 4.9 × 10⁻⁷ M, pK_w = 12.62
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
