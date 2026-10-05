# Plan: 14.7 Acid-Base Titrations (m68809)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

Three objectives, three numbered figures (14.18 titration curves (a) and (b), 14.19 indicator chart, 14.20 the two curves with three indicator ranges), one numbered table (14.2, with a footnote under each acid column), two worked examples (14.21, 14.22) with a Check Your Learning each, no boxed note, no Link to Learning, four end-of-section items (chapter exercises 92 to 95), three glossary terms (already the terms of `titration-curve`, `acid-base-indicators`, `color-change-interval`).

## Sub-concepts and spans

The book prints two headers, and the page follows them (root rule 3); the section's opening paragraph sits in the first block.

| Span | Header | Concepts |
|---|---|---|
| `titration-curves` | Titration curves (the book's header; Examples 14.21 and 14.22, the four stages, Table 14.2, Figure 14.18 + 14.20) | introduces `titration-curve`, `strong-acid-titration-ph`, `weak-acid-titration-ph`; uses `titration`, `equivalence-point`, `ph`, `ph-calculations`, `henderson-hasselbalch`, `salt-solution-calculations`, `acid-ionization-constant` |
| `indicators` | Acid-base indicators (the book's header; Figure 14.19, the choice of indicator) | introduces `acid-base-indicators`, `color-change-interval`, `choose-indicator`; uses `henderson-hasselbalch`, `measuring-ph`, `end-point`, `equivalence-point`; reinforces `titration-curve` |

## Figures

- sim-titration · Figure 14.18 + 14.20 · titration-curve, strong-acid-titration-ph, weak-acid-titration-ph, choose-indicator, color-change-interval · value add: variation by slider and choice. The book draws the two curves twice and the indicator ranges once as fixed pictures; here the reader adds titrant along the volume axis and watches the chosen sample's pH climb its curve, the readout switching from the acid's own equation to the excess hydroxide's at the equivalence point, while the flask takes the chosen indicator's real color; the stretch of volume over which that indicator changes color is laid on the volume axis in its own colors, so the gradual 0.2 to 5.6 mL change of methyl orange in the acetic acid titration stands beside the 0.05 mL change of phenolphthalein at its equivalence point; a pK_a slider weakens or strengthens the weak acid, the half-equivalence pH following pK_a and the steep rise shortening as the acid weakens · arrows: none (the book's leaders from the equivalence labels are notation) · still: a titration curve is pH against volume of titrant, with no clock in it, and the drip of titrant on a clock is 4.5's Sim · slider V (volume, 0 to 50.00 mL, step 0.05, default 25.00 mL, dashed circles at 12.50 mL "half-equivalence" and 25.00 mL "equivalence", detents at 0 and 37.50 mL, the worked examples' four volumes); slider pK_a (equilibrium-constant, 3.00 to 9.00, default 4.74 with a detent labelled CH₃CO₂H); choice acid: strong acid, weak acid (default strong, Example 14.21 first); choice indicator: methyl orange, litmus, phenolphthalein (default methyl orange, Figure 14.20's three) · headline "At 25.00 mL of NaOH, the equivalence point, the HCl solution is at pH 7.00 and methyl orange is yellow." (the stage, the sample, its pH and the indicator's color name) · graph alone with a flask inset at its right: pH 0 to 14 against V 0 to 50 mL as the book draws them, both fixed (no state leaves them: the curves run from pH 1.00 to 12.52, and the weak acid's from at most 5.0 at pK_a 9.00) · 2D: a graph (book rule), and the flask is an apparatus drawn flat as an inset because its lesson is the indicator's color, not the glassware's shape; a 3D bench adds no view the curve lacks (the argument 4.5 made) · readout: below the equivalence point $\kpH = -\log\kconcHyd$ for HCl and $\kpH = \kpKa + \log(\kconcAm/\kconcHA)$ for the weak acid, from the equivalence point on $\kpH = 14.00 + \log\kconcOH$ for both, each with the live equilibrium concentrations to three figures and the pH computed from the numbers shown (the forms morph at the equivalence point); note: the volumes between which the chosen indicator changes color, the fact the bar on the volume axis makes visible · model: the exact charge balance of the solution (Na⁺, H₃O⁺, Cl⁻ or A⁻, OH⁻, K_w = 1.0 × 10⁻¹⁴), which gives the book's 1.00, 7.00, 12.30, 2.87, 4.74 and 8.72 at the examples' volumes and Table 14.2's values to ±0.01; K_a = 10^(−pK_a), so 4.74 stands for the book's 1.8 × 10⁻⁵ · labels: the two curves named once each in their referent colors (HCl; CH₃CO₂H, or weak acid HA away from 4.74), the two equivalence points with their pH as the book labels them, the indicator's range named at the right end of its band: five; the marker, the flask and the half-equivalence point carry hover names; the curve not chosen stays drawn, fainter, since the comparison of the two is what the book's stages turn on · colours: the two curves and their names `F.ref` (strong-titration, weak-titration); V and the volume axis title `volume`; pH axis, marker drop line and concentrations `concentration`; pK_a, 14.00 `equilibrium-constant`; the indicator bands, the color-change bar and the flask liquid through `F.fact` in the indicators' real colors (methyl orange red #d9342b to yellow #f2c12e, litmus red #c8323c to blue #3a56b8, phenolphthalein colorless to pink #e0479e); the frame in ink
- fig-indicators · Figure 14.19 · acid-base-indicators, color-change-interval · kept as printed: a chart of nineteen indicators' colors and color-change intervals, the text points at it, its colors are physical fact, and a redraw would vary nothing (rule 24.3); three of its indicators are live in the Figure 14.18 + 14.20 choice · arrows: none · photo row with its number

Extra simulations: none. A drip clock would repeat 4.5's titration Sim, and a separate indicator Sim (In⁻/HIn ratio against pH) would restate the band and flask of the fold.

## Tables

Table 14.2 in the text as `div.book-table`, its two column footnotes as `p.tnote` beneath. The Key Equations table is not printed (the module has none).

## Types bound

`volume` (titrant and sample volumes: 25.00 mL, 12.50 mL…), `concentration` (0.100 M, [H₃O⁺], [OH⁻], pH and pOH values of particular solutions), `amount` (0.002500 mol and other particular amounts), `equilibrium-constant` (K_a, K_b, K_w, pK_a). Following the chapter's `COLOR.md`, the kind in general (the definitions, "solution pH" as a property) stays ink; a particular pH, volume or concentration in an example wears its hue. Logarithm terms, x and coefficients stay ink.

## Referents

`strong-titration` (the titration of 25.00 mL of 0.100 M HCl) and `weak-titration` (the titration of 25.00 mL of 0.100 M acetic acid), both drawn by sim-titration; the text marks the comparisons, the stage paragraphs and the indicator paragraphs where each titration or its curve is named.

## Exercises

Two Check Your Learning items inline, hosts `ex-strong-titration` (1.000, 1.5111, 7, 12.523) and `ex-weak-titration` (2.37, 3.92, 8.29, 12.097), each a `multi` keyed from the book. Four end-of-section items: `fs-idm5595328` (92, keyed open), `fs-idm81056688` (93, unkeyed conceptual, kept with an AI suggested approach), `fs-idp255636208` (94, keyed multi, five pH values), `fs-idp105330480` (95, unkeyed numerical, left out and named). Nothing moves between sections.

## Left out

Objectives, summary and glossary go to the tables. Kept as printed: "intial" in Example 14.21 (b). The indicator equation's roman "pKa" is written as pK_a (named in `notes`).

## Wanted at chapter level

- variables `V` (14.7) meaning: the book also divides an amount by V for the whole titration solution (Example 14.21), so "the volume of titrant added, or of the whole titration solution where an amount is divided by it"
- variables `n` (14.7) meaning: the book's n(H⁺) and n(OH⁻) are the amounts of acid and base in the titration solution, so "the amount of acid or base in the titration solution, in moles"
- variables rows for 14.7, each with the meaning it has in 14.1–14.3: `[H3O+]`, `[OH-]`, `[A-]`, `[HA]`, `pOH`, `K_a`, `K_b_ion`, `K_w`, `pK_w` (all used in the text or the readout)
- variables `V` → 14.7-titration-curves
- variables `n` → 14.7-titration-curves
- variables `pH` → 14.7-titration-curves
- variables `pK_a` → 14.7-titration-curves

Applied by the chapter pass (2026-10-05): `V` and `n` take the meanings asked; the four anchors set; rows `[H3O+]`, `[OH-]`, `[A-]`, `[HA]`, `pOH`, `K_a`, `K_b_ion`, `K_w`, `pK_w` added with their 14.1 to 14.3 meanings, at `titration-curves`. General mentions of pH, volume and titrant are marked.
