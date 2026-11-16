# Plan: 3.2 Determining Empirical and Molecular Formulas (m68702)

Source: `source.md`, converted with `python3 tools/convert.py 3.2`. Status: built 2026-09-28 without a review stop, as `ch03/config.md` records; this file is left for review.

Three objectives, three numbered figures (3.11 flowchart, 3.12 hematite photograph inside Example 3.11, 3.13 fermentation tanks inside Example 3.12), five worked examples (3.9 to 3.13) each with a Check Your Learning, twelve end-of-chapter exercises of which six are keyed, one Link to Learning (dropped), two glossary terms and three key equations. One page.

## Sub-concepts (page headers)

1. `percent` **Percent composition** (the section's opening paragraph, the definition, the 10.0-g hydrocarbon, Example 3.9 `ex-percent`; then the book's h3 "Determining Percent Composition from Molecular or Empirical Formulas" in `from-formula`, with the fertilizer paragraph, ammonia and Example 3.10 `ex-aspirin`). `percent` introduces `percent-composition`, uses `formula-mass`; `from-formula` introduces `percent-composition-from-formula`, uses `molar-mass`.
2. `empirical` **Empirical formulas from the masses of the elements** (CH₂, ClO₃.₅ to Cl₂O₇, the three-step summary, Figure 3.11 as `sim-empirical`, Example 3.11 `ex-hematite` with Figure 3.12; then the book's h3 "Deriving Empirical Formulas from Percent Composition" in `from-percent` with Example 3.12 `ex-co2` and Figure 3.13). `empirical` introduces `empirical-formula`, uses `mass-mole-conversion`, `molar-mass`; `from-percent` introduces `empirical-formula-from-percent`, uses `percent-composition`, `empirical-formula`.
3. `molecular` **Molecular formulas from empirical formulas** (empirical formula mass, n, (AₓB_y)ₙ, CH₂O to C₆H₁₂O₆, Example 3.13 `ex-nicotine`). Introduces `molecular-formula-from-empirical`; uses `empirical-formula`, `molar-mass`.

The Link to Learning (empirical-formula video) is dropped and named in `notes`. Summary to `summary_html`; objectives, key equations and glossary to the tables. Errata kept as printed: Example 3.13's ratio table writes 8.624 where the line above has 8.641 mol H; the key of exercise fs-idm130496608 gives % N = 82.24% for ammonia where the text computes 82.27%.

## Figures

1. `sim-empirical` · Figure 3.11 · empirical-formula, empirical-formula-from-percent, percent-composition · standardisation and variation: the book's six-box chart for elements A and X with every box showing its live value, fed by the sample drawn as a bar split by mass percent; the reader changes the mass of the sample and sees both masses and both amounts change while the mole ratio and the formula hold, then changes the percent composition and sees the ratio and the formula change, which the book's blank chart cannot show · arrows: symbolic (the chart's steps), none animated · still: the values answer the controls, nothing has a clock · `F.select` of the sample (hematite Fe and O, the default; the C and H compound; the Cl and O compound; the fermentation gas as a 100-g sample of C and O); slider mass of the sample (g, `mass`); slider percent of the first element by mass (ink), relabelled to the chosen element, with dashed circles at the book's composition (named for the sample) and at one or two other real compounds of the same two elements (FeO; CH₄, CH; ClO₂, Cl₂O; CO); both reset to the book's numbers when the sample changes · headline "Fe₂O₃: 2 atoms of Fe for every 3 atoms of O, whatever the mass of the sample." · no graph; the empirical formula unit is drawn as a row of atoms per element in `F.el` colours under the last box, with hover names · readout one chain, the mole ratio: n_Fe : n_O = 0.6261 mol : 0.9394 mol = 1.000 : 1.500 = 2 : 3; no note · 2D (a flow chart and a bar; nothing is an arrangement in space). Binds `mass`, `amount`. The multiplier is the smallest whole number up to 5 that brings both subscripts within 0.04 of whole numbers, none above 9; where none does, the last box says so and the chain stops at the decimal ratio.
  works: parts: six boxes in three stages, "Mass of A atoms" → "Moles of A atoms" above "Mass of X atoms" → "Moles of X atoms", each pair joined by an arrow "Divide by molar mass"; the two mole boxes' lines meet in one arrow "Divide by lowest number of moles" into "A to X mole ratio", and an arrow "Convert ratio to lowest whole numbers" leads to "Empirical formula". Added: the sample as a bar above the chart, split by mass percent, which the two mass boxes read · flow: none (a procedure, left to right) · must hold: (1) each mass box is the sample's mass times its percent, and the two add up to the sample's mass; (2) each mole box is its mass divided by the molar mass on its arrow; (3) the smaller amount reads 1.000 in the ratio; (4) changing the mass of the sample changes the four left boxes and leaves the ratio, the multiplier and the formula as they were; (5) on load the boxes read the numbers of Example 3.11 (34.97 g, 15.03 g, 0.6261 mol, 0.9394 mol, 1.000 : 1.500, × 2, Fe₂O₃), and the other samples give CH₂, Cl₂O₇ and CO₂; (6) the atoms drawn are the subscripts of the formula; (7) the readout's chain is true as written, with ≈ where the whole numbers are a rounding · read off the image: the six box names and three arrow phrases above, lower-cased here; mass boxes yellow, mole boxes pink, the last two grey in the image (highlights, not the book's types: here mass boxes wear `mass`, mole boxes `amount`, the rest ink). The alt text agrees with the image. Molar masses 55.85, 16.00, 12.01, 1.008, 35.45 g/mol are the text's. Re-examined 2026-11-14: rebuilt. The chart was drawn small under a thin bar with a headline, a readout and a note that all repeated its boxes, and the two mass sliders made the reader double both by hand to see that the sample's size does not matter; the controls are now the sample's mass and its percent composition, the chart fills the stage, and the readout carries the mole ratio as one chain.
2. `fig-hematite` · Figure 3.12, photograph, kept: Example 3.11 points at it and shows the mineral whose formula it derives.
3. `fig-brewtank` · Figure 3.13, photograph, kept: Example 3.12 points at it and names where the gas comes from.

Motion: none; no cycle, no transport. Labels: each box names itself (six boxes); the bar's two parts carry their symbols and percents; atoms named by hover.

Extra simulations considered and left: a molecular-formula slider for n (the text's two lines and Example 3.13 carry it and a slider of n shows only a subscript growing); a fertilizer comparison bar of % N (a table of three numbers, no variation).

## Exercises

- Inline `check-your-learning`, keyed: `cyl1` after `ex-percent` (12.1% C, 16.1% O, 71.79% Cl), `cyl2` after `ex-aspirin` (69.9% Fe), `cyl3` after `ex-hematite` (N₂O₅), `cyl4` after `ex-co2` (CH₂O), `cyl5` after `ex-nicotine` (C₈H₁₀N₄O₂).
- End `exercise`, keyed: fs-idm130496608, fs-idp103798128, fs-idm2827872, fs-idm108358432, fs-idm149528800, fs-idp63104368. Formula answers are `open` with the book's key as solution.
- End `exercise`, unkeyed conceptual, kept with an AI-marked suggested approach: fs-idm115920688.
- Left out, unkeyed and numerical: fs-idm99186192, fs-idm78648848, fs-idm106900080, fs-idm234233056, fs-idp2230736.

## Colour

Binds `mass` and `amount`. The bar is outlined in the sample's referent colour while it has the book's composition, and in ink once the percent is moved off it. Percentages, mole ratios, subscripts and n (formula units per molecule) are ink; atoms in `F.el`.

## Wanted at chapter level

- equations `eq-percent-composition` anchor → 3.2-percent
- equations `eq-formula-units-per-molecule` anchor → 3.2-molecular
- equations `eq-molecular-formula` anchor → 3.2-molecular
- concept_prereqs `empirical-formula` → `molar-mass`

### Applied by the chapter pass

The three equation anchors set as asked, and `n_fu` anchored to 3.2-molecular. The edge empirical-formula → molar-mass is not added: empirical-formula already needs mass-mole-conversion, which needs molar-mass. The edge empirical-formula → Chapter 2’s empirical-formula-from-molecular-formula was already a row.

## Derivations

- `molecular`, the molecular formula from the empirical formula and the molar mass · score 0 · not built: two displayed lines that state a procedure (a ratio of masses, subscripts multiplied by it), not a chain from facts to a result.
- Example 3.13, the molecular formula of nicotine · score 1 · not built: a worked example applying the section's own method, every line printed.
