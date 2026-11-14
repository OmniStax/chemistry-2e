# Plan: 4.1 Writing and Balancing Chemical Equations (m68709)

Source: `source.md`, converted with `tools/convert.py 4.1`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the plan is left here for review after.

Two objectives, two numbered figures (4.2 and 4.3), six unnumbered atom-count tables, two worked examples (4.1 and 4.2) each with a Check Your Learning, one Link to Learning (dropped), no photograph, no boxed note, eleven end-of-chapter exercises of which the key covers the six odd-numbered ones, nine glossary terms.

## Sub-concepts (page headers)

1. `chemical-equations` **A chemical equation names what reacts and what forms**: the opening paragraph, Figure 4.2, the four fundamental aspects.
2. `coefficient-ratios` **Coefficients are ratios**: the smallest whole numbers, the 1:2:1:2 ratio, the three readings (molecules, dozens, moles), Figure 4.3.
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

1. `fig-methane-equation` · Figure 4.2, the book's image, kept (kind `photo`). Re-examined 2026-11-14: the figure's lesson is the anatomy of an equation (the braces naming each reactant, each product, the two coefficients and the two sides), nothing in it varies, and the redraw that folded it into `sim-methane` had left every one of those labels out. The book's image is back in its place after the first paragraph.
2. `sim-methane` · Figure 4.3 (the mixture before and after reaction, three methane and six oxygen molecules) · coefficients-as-ratios, chemical-equation, balanced-equation · value add: motion the reader would otherwise imagine (the atoms of the first mixture are the atoms of the second, regrouped) and variation by slider (the 1:2:1:2 ratio at every number of molecules, the text's 1-2-1-2, 2-4-2-4, 3-6-3-6) · arrows: symbolic in the book (one grey arrow between the mixtures), kept; what moves is the atoms · moving: row by row, one methane molecule and two oxygen molecules come apart and their nine atoms cross to stand as one carbon dioxide and two water molecules; about 4 s at three molecules, then a hold · one slider, methane molecules (1 to 6, step 1, an untyped count; opens at 3, the book's picture) · no headline: the counts are written over the columns · no graph · 2D: flat space-filling models, every molecule visible; a turn would show nothing about the counting. Readout: the four numbers of molecules as a ratio reduced to 1:2:1:2.
  works: parts (two outlined mixtures, each titled as the book titles it; in the first a column of methane molecules and two columns of oxygen molecules, one row per methane; in the second a column of carbon dioxide and two of water; over each column its count and name; under each mixture its atoms counted by element; the book's arrow between them) · flow (the atoms of one row leave the first mixture and arrive in the second: the carbon and one O₂ become CO₂, the other O₂ gives each water its oxygen and the four hydrogens go two to each water; where a molecule stood it stays faint, so the first mixture can still be counted) · must hold (no atom appears or vanishes: nine leave a row and nine arrive; the molecules formed are always 1 CO₂ and 2 H₂O for each row gone; at the end the two tallies are equal, n carbon, 4n hydrogen and 4n oxygen; at 3 the counts are the image's 3, 6, 3, 6 and 12 red, 3 black, 12 white on each side; the readout's ratio reduces to 1:2:1:2 at every setting) · read off the image ("Mixture before reaction", "Mixture after reaction", a grey arrow; 3 CH₄ and 6 O₂ scattered on the left, 3 CO₂ and 6 H₂O on the right; carbon black, oxygen red, hydrogen white. The alt text speaks of a dashed vertical line; the image has an arrow and no line, and the figure draws the arrow. The image scatters the molecules; the figure sets them in rows of one methane to two oxygens so that the ratio is seen without counting.)
3. `sim-balance` · Sim (it stands where the book links to a balancing simulator) · balanced-equation, balance-by-inspection, coefficients-as-ratios · value add: variation by slider, and the reason a coefficient moves an element's count by a whole molecule's worth: each species stands as that many whole molecules, with the book's counting table under them written for the live coefficients · arrows: symbolic (the reaction arrow) · still: no clock · a dropdown of the section's four reactions (water decomposes, Example 4.1's N₂O₅ forms, ethane burns, ammonia forms) and one coefficient slider per species (1 to 9, step 1, untyped); ethane has four species and so five controls, the other three reactions four · no headline · no graph · 2D. Opens on the book's starting state, H₂O ⟶ H₂ + O₂ with every coefficient 1. Readout: the equation with the live coefficients and the book's "(balanced)" or "(unbalanced)" after it; where every element balances but the coefficients share a factor (3N₂ + 9H₂ ⟶ 6NH₃) it says so. The balanced coefficients are no longer marked on the sliders: finding them is the exercise. The rows of atom discs of the earlier build are gone: at 54 hydrogen atoms they could not be counted, and the table says the same in the book's own form.
  works: read off the text, there is no image (the four reactions and their species in the book's order: H₂O ⟶ H₂ + O₂, balanced 2, 2, 1; N₂ + O₂ ⟶ N₂O₅, balanced 2, 5, 2; C₂H₆ + O₂ ⟶ H₂O + CO₂, balanced 2, 7, 6, 4; N₂ + H₂ ⟶ NH₃, balanced 1, 3, 2, and 3, 9, 6 before dividing by 3. The table's form: columns Element, Reactants, Products, Balanced?; an entry "2 × 2 = 4", two terms as "(1 × 2) + (2 × 1) = 4", and "4 = 4, yes" or "1 ≠ 2, no".) must hold (the molecules drawn for a species are as many as its coefficient, and each has the atoms of its formula, so the atoms on screen are the atoms the table counts; a subscript never changes; the readout says balanced only when every row says yes; one scale for all the molecules of a reaction)

Photographs: none. Unnumbered images: the structural formula of exercise fs-idp109313632, whose item is unkeyed and left out, so it is not copied.

Extra simulations (root rule 15), judged and left: a beaker of dissociated ions under a molecular / complete / net choice, with the spectators fading (the book's struck-out spectators in the display equations already do this, and the ions are merely named); a state-symbol picker (nothing varies). None built.

## Exercises

- `cyl1` after `ex-n2o5` (ammonium nitrate, open, the book's answer), `cyl2` after `ex-ionic` (brine, open, the three equations). Apply.
- End of chapter, kind `exercise`, ids by position: `e1` (balanced, Understand, key), `e2` (the three kinds of equation, unkeyed conceptual, AI suggested approach), `e3` (eight equations to balance, Apply), `e5` (four narratives, Apply; key prints MgC1₂ with a digit one, carried as printed), `e7` (fireworks, Apply), `e9` (hydrofluoric acid and fluorite, Apply), `e11` (complete and net ionic from molecular, Apply). All open answers with the key's equations.
- Left out, unkeyed and an answer to compute: fs-idp14690896, fs-idp106387184, fs-idp109313632, fs-idp61581984.

## Colour

Binds nothing. Coefficients, subscripts and atom counts are counts and stay ink; every atom is in its element colour through `F.el`. The two mixtures of `sim-methane` are the referents `before` and `after`.

## Wanted at chapter level

- concept_prereqs chemical-equation → the chemical formula concept of 2.4 (once ch02 is merged)
- concept_prereqs ionic-equations → the ionic compounds concept of 2.6 (once ch02 is merged)
- No anchors: 4.1 has no variables or equations rows.

Applied by the chapter pass: chemical-equation → molecular-formula (the 2.4 concept of chemical formulas is molecular-formula); ionic-equations → ionic-compounds. No anchors needed.
