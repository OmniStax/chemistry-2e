# Plan: 4.3 Reaction Stoichiometry (m68713)

Source: `source.md`, converted with `python3 tools/convert.py 4.3`. Status: built 2026-09-28 without a review stop, as `ch04/config.md` records; this file is left for review.

Three objectives, three numbered figures (4.10 photograph, 4.11 flowchart, 4.12 photograph in the Airbags note), four unnumbered route boxes inside the examples, four worked examples (4.8 to 4.11) each with a Check Your Learning, eighteen end-of-chapter exercises of which nine are keyed, and two glossary terms. One page.

## Sub-concepts (page headers)

1. `stoichiometry` **Stoichiometry** (the opening paragraph, the pancake recipe and its two display equations). Introduces `stoichiometry`; uses `balanced-equation`, `coefficients-as-ratios`.
2. `factors` **Stoichiometric factors** (the ammonia equation, its factors in molecules, dozens and moles, the closing sentence; `sim-ammonia`). Introduces `stoichiometric-factor`; uses `coefficients-as-ratios`.
3. `moles` **Relating moles and numbers of molecules** (Example 4.8 `ex-moles-reactant` with Figure 4.10 and `fig-route-al`; Example 4.9 `ex-product-molecules` with `fig-route-propane`). Introduces `mole-stoichiometry`; uses `stoichiometric-factor`.
4. `masses` **Relating masses** (the sentence on measuring mass; Example 4.10 `ex-masses-product` with `fig-route-naoh`; Example 4.11 `ex-masses-reactants` with `fig-route-octane`). Introduces `mass-stoichiometry`; uses `mole-stoichiometry`, `stoichiometric-factor`.
5. `routes` **The general route** (the closing paragraph, Figure 4.11 as `sim-flowchart`, the Airbags note with Figure 4.12). Reinforces `mass-stoichiometry`, `stoichiometric-factor`.

No Link to Learning in this module. The Key Concepts and Summary go to `summary_html`; objectives and glossary to the tables. No key equations.

## Figures

1. `sim-ammonia` · Sim · stoichiometric-factor · intuition and variation: the 3 : 1 : 2 ratio holds whatever the count, and the same factor reads in molecules, dozens or moles · still: the counts answer the slider, nothing has a clock · slider H₂ taken (count, 3 to 18 in steps of 3, untyped, ink), choice of unit (molecules, dozen, mol) · headline "9 H₂ molecules react with 3 N₂ molecules to give 6 NH₃ molecules." · no graph: reactant molecules on the left, product molecules on the right, drawn flat in `F.el` colours (N blue, H white), the arrow symbolic · readout the factor times the count; with mol chosen the amounts are written with `\kn` · 2D (a flat bench of molecules as the book's equations of 4.1 draw them; the lesson is a ratio, not an arrangement in space). Binds `amount` through the readout in the mol state.
2. `fig-iodine` · Figure 4.10, photograph, kept: Example 4.8 points at it and it shows the reaction the example computes.
3. `fig-route-al`, `fig-route-propane`, `fig-route-naoh`, `fig-route-octane` · the four unnumbered route boxes (moleratio1, moleratio2, map2, map3), redrawn as faithful still copies, eyebrow "Figure", no controls · standardisation: each box takes the type hue of what it holds (mass, amount), the book's own shading idea, and the arrows name the factor used · still · 2D. Bind `mass`, `amount`.
4. `sim-flowchart` · Figure 4.11 · mass-stoichiometry, mole-stoichiometry, stoichiometric-factor · standardisation and variation: the book's ten-box chart with the route of any of the four examples lit, its given amount on a slider, each box on the route showing its live value · still: a route is chosen, not run; the route draws along its length when it changes (arrival, not a clock) · choice of example reaction (F.select: Examples 4.8 to 4.11), choice of the given quantity (mass, moles, particles of A) and of the wanted one (mass, moles, particles of B); one slider for the given amount, whose quantity follows the given choice (mass g, amount mol, or particles ×10²³, the leaving slider fading out, manim 9) · headline "0.429 mol of Al reacts with 0.644 mol of I₂." · no graph · readout the chain of factors with the live numbers, `\km` and `\kn` coloured · 2D. The volume boxes (pure substance by density, solution by molarity) are drawn in the volume hue as the book draws them but carry no route here, since none of the four examples starts from a volume; the particle boxes are counts and ink. Binds `mass`, `amount`, `volume`.
5. `fig-airbag` · Figure 4.12, photograph, kept: the note points at it and it shows the deployed bags.

Motion: none. No figure has a clock, so no cycle and no transport. Labels: every box names itself; no entity label count exceeds six on the route figures; molecules in `sim-ammonia` are named once by a legend and carry hover names.

Extra simulations considered and left: a mass-to-mass balance for Example 4.10 (the flowchart carries it); an airbag inflating from sodium azide (the volume of a gas is Chapter 9's).

## Exercises

- Inline `check-your-learning`, keyed: `cyl1` after `ex-moles-reactant` (2.04 mol), `cyl2` after `ex-product-molecules` (4.8 × 10²⁴), `cyl3` after `ex-masses-product` (39.0 g), `cyl4` after `ex-masses-reactants` (13.22 g).
- End `exercise`, keyed and kept: fs-idp147780304 and fs-idp61309952 (prompts rewritten to carry the reactions of the unkeyed items they refer to, fs-idp166618800 and fs-idp16477696, with their images on the card), fs-idp272460112, fs-idp172099056, fs-idp65199360, fs-idp220471472, fs-idp82714064, fs-idp8090960, fs-idp149769296.
- Left out, unkeyed and numerical: fs-idp166618800, fs-idp16477696, fs-idp33547424, fs-idp102353344, fs-idp216213984, fs-idp9841552, fs-idp89497728, fs-idp10650096, fs-idp158165536.
- No item moved between sections.

## Colour

Binds `amount`, `mass` and `volume`. Molar mass, density, molarity, the stoichiometric factor and the particle count are ink.

## Wanted at chapter level

- concept_prereqs `mole-stoichiometry` → `mole`
- concept_prereqs `mole-stoichiometry` → `avogadro-number`
- concept_prereqs `mass-stoichiometry` → `molar-mass`
- concept_prereqs `mass-stoichiometry` → `mass-mole-conversion`
- concept_prereqs `mass-stoichiometry` → `molarity`

Applied by the chapter pass: all five edges staged in book-rows.json and merged.
