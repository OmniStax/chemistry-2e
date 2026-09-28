# Plan: 4.1 Writing and Balancing Chemical Equations (m68709)

Source: `source.md`, converted with `tools/convert.py 4.1`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the plan is left here for review after.

Two objectives, two numbered figures (4.2 and 4.3), six unnumbered atom-count tables, two worked examples (4.1 and 4.2) each with a Check Your Learning, one Link to Learning (dropped), no photograph, no boxed note, eleven end-of-chapter exercises of which the key covers the six odd-numbered ones, nine glossary terms.

## Sub-concepts (page headers)

1. `chemical-equations` **A chemical equation names what reacts and what forms**: the opening paragraph, Figure 4.2 + 4.3, the four fundamental aspects.
2. `coefficient-ratios` **Coefficients are ratios**: the smallest whole numbers, the 1:2:1:2 ratio, the three readings (molecules, dozens, moles).
3. `balanced-equations` **Balancing Equations** (book header): the definition, the oxygen count of the methane equation and its table.
4. `balancing-by-inspection` **Balancing by inspection**: the decomposition of water with its three tables, the Sim, Example 4.1 with its Check Your Learning.
5. `fractional-coefficients` **Fractional coefficients and the smallest whole numbers**: ethane through 7/2, ammonia divided by 3.
6. `additional-information` **Additional Information in Chemical Equations** (book header): state abbreviations, Δ over the arrow.
7. `ionic-equations` **Equations for Ionic Reactions** (book header): molecular, complete ionic and net ionic equations, spectator ions, Example 4.2 with its Check Your Learning.

## Concept nodes (merged in prep)

| id | introduced in | also |
|---|---|---|
| chemical-equation | chemical-equations | uses in coefficient-ratios, reinforced in additional-information |
| coefficients-as-ratios | coefficient-ratios | reinforced in fractional-coefficients |
| balanced-equation | balanced-equations | used in balancing-by-inspection |
| balance-by-inspection | balancing-by-inspection | reinforced in fractional-coefficients, used in ionic-equations |
| ionic-equations | ionic-equations | |
| write-net-ionic-equation | ionic-equations | |

## Figures

id · replaces · concepts · value add · motion · controls · headline · graph · 2D/3D

1. `sim-methane` · Figure 4.2 + 4.3 (the methane equation over its space-filling models, and the mixture before and after with three methane and six oxygen molecules) · chemical-equation, coefficients-as-ratios, balanced-equation · value add: variation by slider; the book draws the same reaction at one scale and then at three, and one live drawing shows that the 1:2:1:2 ratio and the atom balance hold at every scale, which the reader would otherwise imagine · still: a number of molecules is set and the two mixtures answer it, nothing has a clock · one slider, methane molecules (1 to 6, step 1, untyped count, detents at 1 and 3, the book's two pictures; default 1, Figure 4.2's state) · "3 methane molecules and 6 oxygen molecules react to yield 3 carbon dioxide molecules and 6 water molecules." · no graph; the atom tally of each side is written under its box · 2D: the book draws flat space-filling models of named molecules, and a particle box turned in 3D would teach nothing about the counting, which is the idea. Molecules drawn as overlapping discs in `F.el` colours; each kind is labelled once in a legend row under the boxes, every atom names itself under the pointer. Readout: the equation with the live coefficients; note: the atom counts per side.
2. `sim-balance` · Sim · balanced-equation, balance-by-inspection, coefficients-as-ratios · value add: variation by slider, standardisation of the counting tables; the book's tables show one state per change, and here each coefficient change redraws the counts at once · still: no clock · a dropdown of the section's four reactions (water decomposition, Example 4.1's N₂O₅, ethane combustion, ammonia) and one coefficient slider per species (1 to 9, step 1, untyped), the fourth slider fading out for a three-species reaction; a dashed circle on each slider at the balanced coefficient the text names (rule 26.1) · headline says which elements balance and, once all do, whether the coefficients are the smallest whole numbers (the 3N₂ + 9H₂ ⟶ 6NH₃ case) · no graph: per element a row of atom discs, reactant side growing left from a centre rule and product side growing right, with the count at each end and = or ≠ at the rule · 2D. Defaults are the book's starting states (all coefficients 1). Readout: the equation with the live coefficients and, as note, the per-element coefficient × subscript sums as the book's tables write them.

Photographs: none. Unnumbered images: the structural formula of exercise fs-idp109313632, whose item is unkeyed and left out, so it is not copied.

Extra simulations (root rule 15), judged and left: a beaker of dissociated ions under a molecular / complete / net choice, with the spectators fading (the book's struck-out spectators in the display equations already do this, and the ions are merely named); a state-symbol picker (nothing varies). None built.

## Exercises

- `cyl1` after `ex-n2o5` (ammonium nitrate, open, the book's answer), `cyl2` after `ex-ionic` (brine, open, the three equations). Apply.
- End of chapter, kind `exercise`, ids by position: `e1` (balanced, Understand, key), `e2` (the three kinds of equation, unkeyed conceptual, AI suggested approach), `e3` (eight equations to balance, Apply), `e5` (four narratives, Apply; key prints MgC1₂ with a digit one, carried as printed), `e7` (fireworks, Apply), `e9` (hydrofluoric acid and fluorite, Apply), `e11` (complete and net ionic from molecular, Apply). All open answers with the key's equations.
- Left out, unkeyed and an answer to compute: fs-idp14690896, fs-idp106387184, fs-idp109313632, fs-idp61581984.

## Colour

Binds nothing. Coefficients, subscripts and atom counts are counts and stay ink; every atom is in its element colour through `F.el`.

## Wanted at chapter level

- concept_prereqs chemical-equation → the chemical formula concept of 2.4 (once ch02 is merged)
- concept_prereqs ionic-equations → the ionic compounds concept of 2.6 (once ch02 is merged)
- No anchors: 4.1 has no variables or equations rows.

Applied by the chapter pass: chemical-equation → molecular-formula (the 2.4 concept of chemical formulas is molecular-formula); ionic-equations → ionic-compounds. No anchors needed.
