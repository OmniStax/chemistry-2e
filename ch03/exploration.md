# Exploration: Chemistry 2e, Chapter 3 Composition of Substances and Solutions

Written 2026-09-28, before the chapter was prepared. The five modules were converted with `python3 tools/convert.py 3` and read in full. The book's organisation and apparatus are as the book's `RULES.md` records them; nothing in this chapter departs from that account.

## Why this chapter

It is the chapter where chemistry starts to count. 3.1 turns a formula into a mass and a mass into a number of particles through the mole; 3.2 runs the argument backwards, from masses measured on a balance to a formula; 3.3 and 3.4 carry the same counting into mixtures, as molarity, dilution and the percentage and parts-per units. Every later chapter that weighs, dissolves or titrates assumes it.

## Chapter 3 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images, CYL = Check Your Learning (all keyed), Exer. = end-of-chapter exercises, Keyed = with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68699 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 3.1 Formula Mass and the Mole Concept | m68700 | 8 | 9 | 21 (10 in examples, 11 in exercises) | 1 unnumbered | 4 | 8 | 31 | 16 | 1 link-to-learning, 1 sciences-interconnect |
| 3.2 Determining Empirical and Molecular Formulas | m68702 | 5 | 3 | 0 | Key Equations only | 2 | 5 | 12 | 6 | 1 link-to-learning |
| 3.3 Molarity | m68703 | 8 | 3 | 0 | Key Equations only | 9 | 8 | 25 | 12 | 1 link-to-learning (PhET) |
| 3.4 Other Units for Solution Concentrations | m68704 | 4 | 3 | 1 (a flowchart in Example 3.23) | Key Equations only | 5 | 4 | 12 | 6 | — |

Eighty exercises, forty keyed, numbered chapter-wide (3.1 is 1 to 31, 3.2 is 32 to 43, 3.3 is 44 to 68, 3.4 is 69 to 80), so the keyed items are the odd numbers: the first item of 3.2 and of 3.3 is even and unkeyed, the first of 3.4 odd and keyed. Twenty-five Check Your Learning items, twenty glossary entries. 3.1 prints no Key Equations table.

## Numbers as openstax.org prints them

Checked against the publisher's pages for 3.1 and 3.4; the rest follow from the same rule.

| Section | Figures | Examples | Tables |
|---|---|---|---|
| Intro | 3.1 `CNX_Chem_03_00_Pool` (photo) | — | — |
| 3.1 | 3.2 chloroform, 3.3 aspirin, 3.4 NaCl (each a formula-mass table beside a ball-and-stick model), 3.5 one mole of eight elements (photo), 3.6 one mole of four compounds (photo), 3.7 a water droplet (photo), 3.8 copper wire (photo, inside Example 3.5), 3.9 brain and neurons (photos, in the note), 3.10 exocytosis and dopamine (sketch and model, in the note) | 3.1 to 3.8 | one unnumbered table (element, atomic mass, molar mass, atoms per mole) |
| 3.2 | 3.11 the empirical-formula flowchart, 3.12 hematite (photo, inside Example 3.11), 3.13 fermentation tanks (photo, inside Example 3.12) | 3.9 to 3.13 | — |
| 3.3 | 3.14 espresso (photo), 3.15 vinegar (photo, inside Example 3.16), 3.16 two copper nitrate solutions (photo) | 3.14 to 3.21 | — |
| 3.4 | 3.17 bleach (photo), 3.18 saline and a glucose meter (photos), 3.19 tap water and an inline filter (photos) | 3.22 to 3.25 | — |

Unnumbered images: in 3.1, the ibuprofen, aluminum sulfate and glycine formula-mass tables (with models), the five mass-to-moles-to-number flowcharts (K, Ar, Cu, glycine, vitamin C, saccharin; six boxes-and-arrows images in all) and the saccharin structure; eleven exercise images in 3.1 (the structural formulas of fs-idp1038448, fs-idp20009152 and fs-idp50213376); in 3.4 the density-to-mass flowchart of Example 3.23. File names carry no spaces; `CNX_Chem_03_02_moles-6296.jpg` and similar carry a hash suffix and are copied under their own names.

## What is new

The mole and Avogadro's number; molar mass and its equality with formula mass; the mass–mole–number chain; percent composition; empirical and molecular formulas; solutions, solvent and solute; molarity; dilution and C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub>; mass, volume and mass-volume percentages; ppm and ppb. The chapter leans on Chapter 2's atomic masses, formulas and ionic compounds, which are being prepared at the same time.

## Sketches to replace, photographs to keep or drop

- **Figures 3.2, 3.3, 3.4** (the formula-mass tables with models) are the chapter's first live figure: a formula chosen, its atoms drawn in the element palette, and the table of count × atomic mass = subtotal adding up in the readout. They fold naturally (3.2 + 3.3 + 3.4) with the three unnumbered tables of Examples 3.1, 3.2 and 3.6 as further choices; 3.1's plan decides the fold. The models are molecule insets (2D with a 3D view choice, as the book's `RULES.md` settles); NaCl's model is a crystal packing, 3D by the same rules.
- **The six boxes-and-arrows flowcharts** of 3.1 are one idea drawn six times: grams ⇄ moles ⇄ entities. A still Sim with a mass slider and a substance choice, the chain of three readouts in the mass, amount and (ink) count, carries all of them; each example keeps the book's numbers as a state.
- **Figure 3.11**, the empirical-formula flowchart, becomes a still figure whose element masses are sliders and whose steps (moles, divide by smallest, multiply to whole numbers) are read live, defaulting to hematite's 34.97 g and 15.03 g.
- **Figure 3.10** (exocytosis and dopamine) sits in a boxed note: a faithful copy, or dopamine as a molecule inset; the section decides.
- **Figure 3.16**, the two copper nitrate solutions, is a photograph whose colour is a physical fact; it is kept, and the PhET dilution link is the trigger for a dilution Sim of our own (a beaker of the same solute, a volume slider, the colour paling as the physical fact, C<sub>1</sub>V<sub>1</sub> = C<sub>2</sub>V<sub>2</sub> in the readout). A molarity Sim (amount and volume sliders, a beaker drawn with solute particles) is the other candidate for 3.3; the two may be one figure.
- **Photographs**: 3.5, 3.6, 3.7 (text points at each, the scale of the mole), 3.8 (inside an example; a stock scene, a candidate to drop), 3.9 (in the note, kept with the note), 3.12 and 3.13 (inside examples; candidates to drop), 3.14 (text points at it; keep), 3.15 (stock, candidate to drop), 3.17, 3.18, 3.19 (the text points at each; keep). Each section's plan decides.

## Link to Learning and PhET

Three notes, all dropped and named in `notes`: 3.1's mole video (openstax.org/l/16molevideo), 3.2's empirical-formula video (/l/16empforms), 3.3's PhET dilution simulation (/l/16Phetsolvents), which triggers 3.3's dilution Sim. No end-of-chapter item opens an external simulation, so there is no `simulation-exercise`. The BRAIN Initiative link inside 3.1's note is part of the note and stays as text.

## Exercises that belong to another section

None. Every item tests what its own module teaches. Three reach back and stay: 3.3's fs-idm26471216 (a limit in mg/L converted to molarity) and 3.4's fs-idm5149536 and fs-idm39094144 (mixed units to molarity and back) use molarity from 3.3, which is earlier.

## Keyed and unkeyed

| Section | Keyed | Unkeyed conceptual (kept, suggested approach) | Unkeyed numerical (left out) |
|---|---|---|---|
| 3.1 | 16 | fs-idp25588816 (1 mol of H<sub>2</sub>, O<sub>2</sub>, F<sub>2</sub>), fs-idp69842848 (moles of O atoms, explain) | 13 |
| 3.2 | 6 | fs-idm115920688 (what is needed for a molecular formula) | 5 |
| 3.3 | 12 | fs-idm107608448 (what changes on dilution), fs-idm80527600 (200 mL and 400 mL of one solution); the "outline the steps" items fs-idm59335888 and fs-idm3478704 have a conceptual (a) and a numerical (b), and the section decides | 9 to 11 |
| 3.4 | 6 | — | 6 |

## 3D (root rule 28)

Physical 3D: the NaCl crystal of Figure 3.4 (a packing), and the molecule insets of 3.2 to 3.4, 3.10 and the example tables, each 2D by default with a 3D view (the book's borderline rule). A dilution or molarity beaker drawn with particles is a particle picture, which the book's rules make 3D (spheres the reader turns, readings on a flat strip); the section may argue a flat beaker instead if the particles are only a count. No locked views: the chapter prints no perspective drawing. Everything else (the flowcharts, the tables, the percentages) is flat. No figure has a clock; the chapter is still throughout.

## BE INSPIRING (root rule 23)

The mole is the chapter's wonder: a number too large to picture that a balance counts in seconds. The live figures should let the reader hold a mass and see the count it stands for, slide one gram of copper up to a mole and watch 10<sup>22</sup> become 6 × 10<sup>23</sup>, and put the drop of water beside the earth's population. The empirical-formula figure should make the moment a messy ratio (1 : 1.5) snaps into whole numbers visible. In the solution sections the beaker is the protagonist: the same amount of solute in more water pales before the reader's eyes, and the readout keeps C<sub>1</sub>V<sub>1</sub> equal to C<sub>2</sub>V<sub>2</sub> while both factors change, which is the whole argument of dilution. 3.4's units are one ratio read at four magnifications, per hundred, per million, per billion; a single mass-ratio slider read in every unit at once would tell that story.

## Errata, as built

Kept as printed and named in the sections’ `notes`: Example 3.13’s ratio table writes 8.624 where the line above gives 8.641 mol H (3.2); the key of the ammonia exercise gives 82.24% N where the text computes 82.27% (3.2); Example 3.24 prints “alchol” (3.4). The alt text of 3.1’s unnumbered table gives 33.45 for chlorine where the table reads correctly; the table is kept as a `div.book-table` from its cells, so the slip does not reach the page.
