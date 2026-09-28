# Plan: 3.2 Determining Empirical and Molecular Formulas (m68702)

Source: `source.md`, converted with `python3 tools/convert.py 3.2`. Status: built 2026-09-28 without a review stop, as `ch03/config.md` records; this file is left for review.

Three objectives, three numbered figures (3.11 flowchart, 3.12 hematite photograph inside Example 3.11, 3.13 fermentation tanks inside Example 3.12), five worked examples (3.9 to 3.13) each with a Check Your Learning, twelve end-of-chapter exercises of which six are keyed, one Link to Learning (dropped), two glossary terms and three key equations. One page.

## Sub-concepts (page headers)

1. `percent` **Percent composition** (the section's opening paragraph, the definition, the 10.0-g hydrocarbon, Example 3.9 `ex-percent`; then the book's h3 "Determining Percent Composition from Molecular or Empirical Formulas" in `from-formula`, with the fertilizer paragraph, ammonia and Example 3.10 `ex-aspirin`). `percent` introduces `percent-composition`, uses `formula-mass`; `from-formula` introduces `percent-composition-from-formula`, uses `molar-mass`.
2. `empirical` **Empirical formulas from the masses of the elements** (CH₂, ClO₃.₅ to Cl₂O₇, the three-step summary, Figure 3.11 as `sim-empirical`, Example 3.11 `ex-hematite` with Figure 3.12; then the book's h3 "Deriving Empirical Formulas from Percent Composition" in `from-percent` with Example 3.12 `ex-co2` and Figure 3.13). `empirical` introduces `empirical-formula`, uses `mass-mole-conversion`, `molar-mass`; `from-percent` introduces `empirical-formula-from-percent`, uses `percent-composition`, `empirical-formula`.
3. `molecular` **Molecular formulas from empirical formulas** (empirical formula mass, n, (AₓB_y)ₙ, CH₂O to C₆H₁₂O₆, Example 3.13 `ex-nicotine`). Introduces `molecular-formula-from-empirical`; uses `empirical-formula`, `molar-mass`.

The Link to Learning (empirical-formula video) is dropped and named in `notes`. Summary to `summary_html`; objectives, key equations and glossary to the tables. Errata kept as printed: Example 3.13's ratio table writes 8.624 where the line above has 8.641 mol H; the key of exercise fs-idm130496608 gives % N = 82.24% for ammonia where the text computes 82.27%.

## Figures

1. `sim-empirical` · Figure 3.11 · empirical-formula, empirical-formula-from-percent, percent-composition · standardisation and variation: the book's six-box chart for elements A and X with every box showing its live value (masses, moles, the ratio after dividing by the smaller, the whole-number ratio and the formula), and the sample's percent composition as a bar above it, so the reader sees that the formula depends only on the ratio of the moles, not on the size of the sample · still: the values answer the sliders, nothing has a clock · `F.select` of the sample (hematite Fe and O, the default; the C and H compound; the Cl and O compound; the fermentation gas as a 100-g sample of C and O), sliders mass of A and mass of X (g, `mass`), relabelled to the chosen elements and reset to the book's masses when the sample changes · headline "34.97 g Fe and 15.03 g O contain 0.6261 mol Fe and 0.9394 mol O, so the empirical formula is Fe₂O₃." · no graph; the empirical formula unit is drawn as a row of atoms in `F.el` colours beside the last box, with hover names · readout one inline equation `\kn = \km / \kMM` for element A with the live numbers, a small line for the ratio · 2D (a flow chart and a bar; nothing is an arrangement in space). Binds `mass`, `amount`. The multiplier is the smallest whole number up to 6 that brings both subscripts within 0.1 of whole numbers; where none does, the last box says that no small whole-number ratio fits.
2. `fig-hematite` · Figure 3.12, photograph, kept: Example 3.11 points at it and shows the mineral whose formula it derives.
3. `fig-brewtank` · Figure 3.13, photograph, kept: Example 3.12 points at it and names where the gas comes from.

Motion: none; no cycle, no transport. Labels: each box names itself (six boxes); atoms named by hover.

Extra simulations considered and left: a molecular-formula slider for n (the text's two lines and Example 3.13 carry it and a slider of n shows only a subscript growing); a fertilizer comparison bar of % N (a table of three numbers, no variation).

## Exercises

- Inline `check-your-learning`, keyed: `cyl1` after `ex-percent` (12.1% C, 16.1% O, 71.79% Cl), `cyl2` after `ex-aspirin` (69.9% Fe), `cyl3` after `ex-hematite` (N₂O₅), `cyl4` after `ex-co2` (CH₂O), `cyl5` after `ex-nicotine` (C₈H₁₀N₄O₂).
- End `exercise`, keyed: fs-idm130496608, fs-idp103798128, fs-idm2827872, fs-idm108358432, fs-idm149528800, fs-idp63104368. Formula answers are `open` with the book's key as solution.
- End `exercise`, unkeyed conceptual, kept with an AI-marked suggested approach: fs-idm115920688.
- Left out, unkeyed and numerical: fs-idm99186192, fs-idm78648848, fs-idm106900080, fs-idm234233056, fs-idp2230736.

## Colour

Binds `mass` and `amount`. Percentages, mole ratios, subscripts and n (formula units per molecule) are ink; atoms in `F.el`.

## Wanted at chapter level

- equations `eq-percent-composition` anchor → 3.2-percent
- equations `eq-formula-units-per-molecule` anchor → 3.2-molecular
- equations `eq-molecular-formula` anchor → 3.2-molecular
- concept_prereqs `empirical-formula` → `molar-mass`

### Applied by the chapter pass

The three equation anchors set as asked, and `n_fu` anchored to 3.2-molecular. The edge empirical-formula → molar-mass is not added: empirical-formula already needs mass-mole-conversion, which needs molar-mass. The edge empirical-formula → Chapter 2’s empirical-formula-from-molecular-formula was already a row.
