# Exploration: Chemistry 2e, Chapter 13 Fundamental Equilibrium Concepts

Written 2026-09-28, before the chapter was prepared. The five modules were converted with `python3 tools/convert.py 13` and read in full. The figure, table and example numbers follow the book's order as openstax.org prints them, from the opener as Figure 13.1. Nothing in the chapter departs from the book's organisation as the book's `RULES.md` records it; 13.1 is thin and stays a page of its own.

## Why this chapter

Chapter 12 asked how fast a reaction goes; this one asks where it stops, and answers that it never stops. A reversible reaction reaches equilibrium when its forward and reverse rates, the rate laws of Chapter 12, become equal (13.1). The reaction quotient measures a mixture's status, its constant value at equilibrium is K, and comparing Q with K says which way a mixture will go; gases add K_P and the (RT)^Δn bridge, phases decide what enters the expression, and coupled equations multiply their constants (13.2). A stressed equilibrium shifts back, with K fixed under concentration and volume changes and moved by temperature, and a catalyst only hastens the approach (13.3). The ICE table turns all of it into arithmetic (13.4). The thread is 13.1's pair of rates: every later result can be read as those two rates falling out of balance and coming back.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68796 | 0 | 1 drawing | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 13.1 Chemical Equilibria | m68797 | 0 | 3 | 0 | 0 | 2 | 0 | 5 | 3 | — |
| 13.2 Equilibrium Constants | m68798 | 5 | 2 | 0 | 0 (1 unnumbered in Example 13.3) | 5 | 5 | 25 | 12 | Key Equations |
| 13.3 Shifting Equilibria: Le Châtelier’s Principle | m68799 | 0 | 3 | 0 | 0 | 1 | 0 | 19 | 10 | 1 link-to-learning, 1 everyday-life (soft drinks) |
| 13.4 Equilibrium Calculations | m68801 | 5 | 0 | 5 (ICE tables) | 0 | 0 | 6 | 40 | 20 | one exercise image |

## Numbers as openstax.org prints them

- Figures: intro 13.1 Blood (a drawing, not a photograph, kept as the opener). 13.1: 13.2 equilibrium (three panels: particle views of the sealed tube, concentration against time, rate against time), 13.3 dynamic (juggling photograph), 13.4 bromine (photograph). 13.2: 13.5 quotient (four panels, concentration and Q_c against time from reactants only and from product only), 13.6 mixtures (bar charts of three mixtures before and at equilibrium). 13.3: 13.7 SuperSat (photograph, inside the soft-drinks note; its file is named `13_01`), 13.8 catalyst (two reaction diagrams), 13.9 factory (the Haber-Bosch plant).
- Tables: none numbered. Example 13.3 prints an unnumbered table of initial concentrations; it stays with the example as `div.book-table` without a number. The Key Equations table of 13.2 is not printed.
- Examples: 13.1–13.5 (13.2); 13.6–13.10 (13.4). Example 13.9 carries two Check Your Learning items.
- Unnumbered images: 13.4 `CNX_Chem_13_04_ICETable1_img.jpg`, `ICETable2_img`, `ICETable3_img`, `ICETable30_img` (the ICE tables of Examples 13.7, 13.9 and 13.10); in exercises, `CNX_Chem_13_05_Butane_img.jpg` (fs-idp307489856). No bundle name carries a space.

## What is new

Reversible reactions and the double arrow; equilibrium as equal forward and reverse rates; its dynamic nature, for chemical and phase equilibria. The reaction quotient Q_c and Q_P; K ≡ Q at equilibrium and the law of mass action; the meaning of K's magnitude and its silence about speed; Q against K for the direction of reaction; K_P = K_c(RT)^Δn; homogeneous and heterogeneous equilibria, pure liquids and solids left out; coupled equilibria. Le Châtelier's principle; stresses of concentration, volume and temperature; K = k_f/k_r and its temperature dependence; a catalyst leaves K unchanged; the Haber-Bosch process. ICE tables, K from equilibrium data, a missing concentration, equilibrium concentrations from initial ones by the quadratic formula, and the small-x approximation.

No new type. New typed symbols: rate_f, rate_r (rate); [C], [D] (concentration); P_D (pressure). New untyped: k_f, k_r, Q_conc (Q_c), Q_P, K_c, K_P, K_c', K_c1, K_c2, Δn, x. K and Q (key `Q_c`, latex Q) already stand untyped in `book.json` from the full-book pass and are reused as the generic K and Q.

## Sketches to redraw and photographs to keep

- 13.2 (13.1): the three panels are one experiment and fold naturally into one live Figure 13.2: a sealed box of N₂O₄ and NO₂ molecules in 3D (a particle picture, so 3D by the book's rule) over a flat strip with the two concentration curves and the two rate curves running on one clock until the rates meet. Moving; the clock is the lesson.
- 13.3 juggling and 13.4 bromine (13.1): photographs the text points at; kept.
- 13.5 (13.2): the four panels are two runs of one reaction; a live Figure 13.5 with a choice of starting mixture (reactants only, product only) and a clock, concentrations and Q_c drawn together, the K line reached from both sides. It may share an engine with 13.2's box; the section decides whether the box appears.
- 13.6 (13.2): three mixtures before and after; a still Figure with a choice of mixture (or sliders for the four initial concentrations, the book's three as detents) whose bars settle to the equilibrium bars, Q against K in the readout.
- 13.7 (13.3): a photograph inside the soft-drinks note; kept.
- 13.8 (13.3): two reaction diagrams, uncatalyzed and catalyzed; a still Figure reusing Chapter 12's reaction-diagram drawing, `F.cat(0)` uncatalyzed and `F.cat(1)` catalyzed as 12.19 does, with the forward and reverse E_a brackets shrinking together and K unchanged in the readout.
- 13.9 (13.3): the Haber-Bosch plant is a labelled flow diagram, not a bench; a faithful copy by default. The section may argue a still Sim of the ammonia yield against pressure and temperature, but only if it opens a view the text lacks.
- 13.4's four ICE tables: unnumbered images; each is a table, so the section writes them as HTML tables (or one live ICE Figure with no number, eyebrow "Figure", if a slider teaches); the exercise image `Butane_img` stays on its card.

## Notes and Link to Learning

The soft-drinks note (Equilibrium and Soft Drinks, Chemistry in Everyday Life, 13.3) is kept verbatim with Figure 13.7. The one Link to Learning (13.3, a video of equilibrium shifting with pressure) is dropped and named in `notes`; it is the trigger for 13.3's Le Châtelier box, whose piston carries the volume stress. No PhET item and no `simulation-exercise` in the chapter.

## Exercises that belong elsewhere

- `fs-idp194491952` (13.2, the Br₂ equilibrium needs a closed vessel, Figure 13.4) tests 13.1's dynamic phase equilibrium: moved to 13.1 with `source_section` "13.2".
- `fs-idp92538384` (13.3, radioactive Ag⁺ appearing in a saturated silver sulfate solution) tests 13.1's dynamic nature of equilibrium: moved to 13.1 with `source_section` "13.3".
Both sections' `exercise_notes` say so. Every other item stays where it is printed.

## Keyed and unkeyed

- 13.1: 5 items (3 keyed); `fs-idp122639232` and `fs-idp13186176` unkeyed conceptual, kept with a suggested approach. With the two moves in, 7 items.
- 13.2: 25 items (12 keyed). Unkeyed numerical, left out: `fs-idp100224800`, `fs-idp163618080`, `fs-idp94819040`, `fs-idp72435440`. Unkeyed conceptual or expression-writing, kept with a suggested approach: `fs-idp109971312`, `fs-idp176984288`, `fs-idp114043728`, `fs-idp237441536`, `fs-idp68591104`, `fs-idp52174160`, `fs-idp132912112`, `fs-idp93479024`, `fs-idp282222272`. One move out (`fs-idp194491952`).
- 13.3: 19 items (10 keyed). No unkeyed numerical item. Kept with a suggested approach: `fs-idp22318672`, `fs-idp55085984`, `fs-idp20860880`, `fs-idp212372192`, `fs-idp384696688`, `fs-idp31242816`, `fs-idp261498704`, `fs-idm33369776`; `fs-idp219741088` is an unkeyed choice item, kept open with its four options. One move out (`fs-idp92538384`).
- 13.4: 40 items (20 keyed). Unkeyed numerical, left out: `fs-idp235853120`, `fs-idp220009680`, `fs-idp99340080`, `fs-idp95397216`, `fs-idp165909856`, `fs-idp120770528`, `fs-idp193760224`, `fs-idp277387888`, `fs-idp97213088`, `fs-idp145400352`, `fs-idp124881392`, `fs-idp307489856`, `fs-idp186517200`, `fs-idp301926064` (part (a) is conceptual, part (b) numerical), `fs-idp157265136`, `fs-idp303786512`. Kept with a suggested approach: `fs-idp155255936` (change terms from stoichiometry, a skill with no number to compute), `fs-idp76682304`, `fs-idp359131456`, `fs-idp222775760`.

## Errata to carry as printed and name in `notes`

- 13.2 `fs-idp110211104` key: (e) is labelled *Q<sub>P</sub>* where the item gives *K<sub>c</sub>* and concentrations, and (f) *Q<sub>c</sub>* where it gives *K<sub>P</sub>* and pressures.
- 13.2 Example 13.5's Check Your Learning labels both given constants *K*<sub>c1</sub> (490 and 67).
- 13.2 Example 13.3's table summary lists 0.0203 M where the table prints 0.020 M; the table is followed.
- 13.3 prints "Le Chatelier’s principle" once without the accent, and 13.3's acetic acid exercise `fs-idp261498704` gives acetate as (*l*); both kept.
- 13.4 `fs-idp151659712` writes "NaSO<sub>4</sub>" for Na<sub>2</sub>SO<sub>4</sub>; `fs-idp149802032`'s key gives 1.90 atm for all three pressures; `fs-idm19235840`'s key writes pressures in square brackets. All kept as printed.

## Depth: flat, locked or 3D (root rule 28)

- Physical 3D: the sealed box of Figure 13.2 (N₂O₄ and NO₂ in `F.el` colours, spheres the reader turns, bounded orbit, never from beneath) and 13.3's Le Châtelier box (H₂, I₂, HI or N₂O₄/NO₂, with a piston for volume). Both are particle pictures, which this book draws in 3D over a flat strip of readings.
- Flat: every graph (13.2(b)(c), 13.5, 13.6's bars), the reaction diagrams of 13.8, the ICE tables, the Haber-Bosch flow diagram.
- No locked view: the book prints nothing in perspective here besides the photographs.

## BE INSPIRING (root rule 23)

The chapter's single picture is two rates meeting. The Figure 13.2 box should let the reader watch individual N₂O₄ molecules split and NO₂ pairs join, the count of each settling while the splitting and joining never stop, with the two rate curves drawn from the same events meeting on the strip beneath; a molecule the reader follows keeps changing identity after the curves go flat, which is the whole meaning of "dynamic". The same engine then carries the rest of the chapter: 13.5 starts it from the other side and finds the same K; 13.6 turns Q against K into a race the reader predicts before pressing play; 13.3 lets the reader stress it (add a gas, push the piston, warm it) and watch Q jump off K and come back, with K itself moving only under temperature. The ICE table of 13.4 is the same run written as three rows of numbers.
