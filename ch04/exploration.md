# Exploration: Chemistry 2e, Chapter 4 Stoichiometry of Chemical Reactions

Written 2026-09-28 by the chapter's prep agent. The six modules were converted with `python3 tools/convert.py 4` and read in full. The book's organisation and apparatus are as the book's `exploration.md` records; nothing in this chapter departs from it.

## Why this chapter

It is where the book's symbols start to move. Chapter 1 gave the habits of measurement and Chapters 2 and 3 the formula and the mole; this chapter joins formulas into equations (4.1), sorts reactions into three families (4.2), and turns the coefficients of a balanced equation into the arithmetic of amounts (4.3), of shortfalls (4.4) and of analysis (4.5). The stoichiometric factor is the one idea every later quantitative chapter reuses.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered images, Tab. = tables (numbered / unnumbered), CYL = Check Your Learning (all keyed), Exer. = end-of-chapter exercises.

| Section | Module | Ex. | Fig. | Img. | Tab. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68730 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 4.1 Writing and Balancing Chemical Equations | m68709 | 2 | 2 | 1 (in an exercise) | 0 / 7 | 9 | 2 | 11 | 6 | 1 link-to-learning |
| 4.2 Classifying Chemical Reactions | m68710 | 5 | 6 | 0 | 2 / 1 | 23 | 5 | 30 | 15 | 2 everyday-life, 2 link-to-learning |
| 4.3 Reaction Stoichiometry | m68713 | 4 | 3 | 6 (4 in examples, 2 in exercises) | 0 | 2 | 4 | 18 | 9 | 1 everyday-life |
| 4.4 Reaction Yields | m68714 | 2 | 3 | 1 (in an exercise) | 0 / 1 key-equations | 5 | 2 | 18 | 9 | 1 link-to-learning, 1 sciences-interconnect |
| 4.5 Quantitative Chemical Analysis | m68716 | 3 | 3 | 4 (3 in examples, 1 in an exercise) | 0 | 10 | 3 | 18 | 9 | — |

95 exercises, 48 keyed; 16 Check Your Learning items; 49 glossary entries.

## Numbers as openstax.org prints them (4.2 checked on the publisher's page)

| Section | Figures | Tables | Examples |
|---|---|---|---|
| Intro | 4.1 rocket (CNX_Chem_04_00_Rocket) | — | — |
| 4.1 | 4.2 methane equation over space-filling models (rxn2); 4.3 mixtures before and after, ratios kept (rxn3) | seven unnumbered atom-count tables | 4.1 Balancing Chemical Equations; 4.2 Ionic and Molecular Equations |
| 4.2 | 4.4 PbI2 precipitate photo; 4.5 HCl in water, two flasks with molecular insets (HClsoln); 4.6 citrus and vinegar photos; 4.7 ammonia photos; 4.8 fish and lemon photo with equation, in the Culinary note (file CNX_Chem_14_03_FishLemon); 4.9 copper wire in silver nitrate, three photos (file CNX_Chem_04_04_CuAgNO3) | Table 4.1 solubility guidelines (spanned headers, write by hand); Table 4.2 Common Strong Acids; one unnumbered atom/charge table in Example 4.7 | 4.3 Predicting Precipitation Reactions; 4.4 Writing Equations for Acid-Base Reactions; 4.5 Assigning Oxidation Numbers; 4.6 Describing Redox Reactions; 4.7 Balancing Redox Reactions in Acidic Solution |
| 4.3 | 4.10 aluminum and iodine photos; 4.11 flowchart of stoichiometry calculations; 4.12 airbag photo, in the Airbags note | — | 4.8 Moles of Reactant Required; 4.9 Number of Product Molecules; 4.10 Relating Masses of Reactants and Products; 4.11 Relating Masses of Reactants |
| 4.4 | 4.13 sandwich analogy; 4.14 H2 + Cl2 space-filling, chlorine limiting; 4.15 ibuprofen photo and BHC process, in the Green Chemistry note | Key Equations (not printed) | 4.12 Identifying the Limiting Reactant; 4.13 Calculation of Percent Yield |
| 4.5 | 4.16 buret photos; 4.17 filtration photo; 4.18 combustion analysis apparatus (schematic) | — | 4.14 Titration Analysis; 4.15 Gravimetric Analysis; 4.16 Combustion Analysis |

The unnumbered images inside examples (4.3: moleratio1, moleratio2, map2, map3; 4.5: map7, map8, combmap) are the book's calculation-route boxes: small flowcharts (Mass → Moles → Moles → Mass) that the page cannot do without.

## What is new, and what to redraw

New: the chemical equation and its balance; ionic equations; three reaction classes, solubility guidelines, oxidation numbers and the half-reaction method; stoichiometric factors; limiting reactant and yields; titration, gravimetric and combustion analysis.

Sketches to replace: 4.2 and 4.3 (molecules in the element palette, a still or a count slider), 4.11 and the route boxes (a still Figure; one live route map may fold 4.11 with the example boxes of 4.3 and 4.5), 4.13 and 4.14 (a limiting-reactant figure, sliders for the two amounts, the book's 28 and 11 slices and 3 and 2 mol as defaults), 4.18 (the combustion train, redrawn). Photographs to keep: 4.4, 4.9, 4.10 (the text points at each and they show the reaction), 4.16 and 4.17 (apparatus the text points at), 4.1. Photographs to judge: 4.5 is a sketch with molecular insets (redraw as a figure), 4.6, 4.7 and 4.8 are stock scenes the text points at (keep or drop per the book's rule), 4.12 and 4.15 are note photographs.

Link to Learning: 4.1 balancing tutorial; 4.2 microscopic view of strong and weak acids, hybrid rocket video; 4.4 PhET Reactants, Products and Leftovers, which is the trigger for a Sim of limiting reactants. All dropped and named in `notes`.

## Exercises that belong elsewhere

None moved. 4.2's fs-idp29496096 asks about physical change, balance and net ionic equations as well as combustion; it stays, since its classification half is 4.2's. 4.4's fs-idm72007808 and fs-idm19471568 lean on the mole of 3.1, a chapter not built yet, so they stay in 4.4 (`source_section` may point only into the same or a built chapter). 4.3's keyed fs-idp147780304 and fs-idp61309952 refer to the reactions of the unkeyed "write and outline" items fs-idp166618800 and fs-idp16477696; the reactions must be carried into the keyed prompts, and 4.4's fs-idm7557120 likewise.

## Keyed counts

4.1: 6 of 11; 4.2: 15 of 30; 4.3: 9 of 18; 4.4: 9 of 18; 4.5: 9 of 18. Every CYL keyed.

## Flat or 3D (root rule 28)

Physical 3D candidates: the particle pictures of 4.3 and 4.14 (molecules in a box, book rule: particle pictures are 3D, spheres in a box the reader turns), 4.5's flask insets, and 4.18's combustion train and 4.16's buret (apparatus, benches with bounded orbit). Each section's plan decides; the cheapest honest reading is flat for 4.2/4.3 (the book draws the molecules in a row as an equation), and a box for 4.14 only if the reader turns amounts and watches leftovers. No mathematical 3D.

## Root rule 23: BE INSPIRING

Stoichiometry is usually taught as arithmetic; here it can be watched. A balancing bench where the reader changes coefficients and sees atoms counted on each side, never allowed to touch a subscript; a reaction box where the reader sets moles of hydrogen and chlorine and watches the pairs react until one runs out, the leftovers glowing as excess; a titration where the buret delivers drop by drop, the moles of titrant climbing toward the analyte's until the indicator turns at the equivalence point, the readout writing M from the live volume; a combustion train in which the reader burns a hydrocarbon of chosen x and y and weighs the two absorbers. The rocket on the opener's page is the chapter's promise: amounts measured precisely decide whether the reaction delivers.

## Errata (gathered by the chapter pass)

Carried as printed and named in each section's `notes`:

- 4.1: the key's answer to part (c) of the fifth exercise (fs-idp122928448) prints MgC1₂ with a digit one.
- 4.2: Example 4.7, step 5, prints "(2 × 3+) = 6 +".
- 4.4: the unkeyed exercise fs-idp61299760 prints the product of heating calcium carbonate as CO₂(s); the item is left out as unkeyed.
- 4.2: Example 4.6's Check Your Learning answer carries a stray `**` after "Sn(s)" in the source; it is dropped.
