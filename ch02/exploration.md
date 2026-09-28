# Exploration: Chemistry 2e, Chapter 2 Atoms, Molecules, and Ions

Written 2026-09-28, before the chapter was prepared. The eight modules were converted with `python3 tools/convert.py 2` and read in full. The book's organization and apparatus are as the book's `RULES.md` records them; nothing in this chapter departs from that account.

## Why this chapter

Chapter 1 gave the reader habits; this chapter gives the particles. It runs from Dalton's postulates and the two mass laws they explain, through the experiments that opened the atom (Thomson, Millikan, Rutherford, Soddy, Chadwick), to the bookkeeping every later chapter assumes: atomic number, mass number, isotopes and average atomic mass, then formulas, the periodic table, ions, and the names of compounds. It is the first chapter that reads the periodic table, and the first that writes a chemical formula in earnest.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered images, CYL = Check Your Learning (all keyed), Exer. = end-of-chapter exercises, Keyed = those carrying the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68684 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 2.1 Early Ideas in Atomic Theory | m68685 | 2 | 4 | 3 (2 in Example 2.1, 1 in an exercise) | 1 + 1 unnumbered in an exercise | 4 | 4 | 2 | 4 | 2 | — |
| 2.2 Evolution of Atomic Theory | m68687 | 0 | 5 | 0 | 0 | 1 | 6 | 0 | 5 | 3 | 3 link-to-learning (Thomson's voice; a Rutherford simulation; PhET Rutherford Scattering) |
| 2.3 Atomic Structure and Symbolism | m68692 | 3 | 5 | 0 | 3 + Key Equations | 6 | 11 | 3 | 17 | 8 | 5 link-to-learning (IUPAC; PhET Build an Atom; PhET Isotopes and Atomic Mass; a mass spectrometry animation and video) |
| 2.4 Chemical Formulas | m68693 | 1 | 9 | 12 (all in exercises) | 0 | 0 | 6 | 1 | 10 | 5 | 2 link-to-learning (PhET Build a Molecule; carvone video); 1 chemist-portrait (Paula Hammond) |
| 2.5 The Periodic Table | m68695 | 1 | 3 | 0 | 0 | 0 | 22 | 1 | 8 | 4 | 1 link-to-learning (two interactive periodic tables) |
| 2.6 Ionic and Molecular Compounds | m68696 | 5 | 4 | 0 | 1 | 0 | 8 | 5 | 6 | 3 | 1 link-to-learning (molten salt video) |
| 2.7 Chemical Nomenclature | m68698 | 2 | 1 | 0 | 8 | 2 | 4 | 2 | 11 | 6 | 1 link-to-learning (naming practice site); 2 everyday-life (Ionic Compounds in Your Cabinets; Erin Brockovich and Chromium Contamination) |

61 exercises, 31 keyed; 14 Check Your Learning items; 14 worked examples; 61 glossary entries.

## Figure, table and example numbers

Checked against openstax.org for 2.4 (2.16 to 2.24) and 2.7 (Tables 2.6 to 2.13, Figure 2.32); the rest follow from the same rule and agree.

| Section | Figures | Tables | Examples |
|---|---|---|---|
| intro | 2.1 Biomarkers (photo) | — | — |
| 2.1 | 2.2 Dalton1 (penny and copper atoms), 2.3 Dalton2 (copper(II) oxide), 2.4 Dalton3 (copper and oxygen reacting), 2.5 MultProp (two copper chlorides) | 2.1 Constant Composition of Isooctane | 2.1, 2.2 |
| 2.2 | 2.6 CathodeRay (Thomson, Braun's tube, tube diagram), 2.7 Millikan (apparatus and five drops), 2.8 AtomModels (plum pudding, Saturn), 2.9 Rutherford (foil experiment), 2.10 GoldFoil3 (foil explained at the nucleus) | — | — |
| 2.3 | 2.11 AtomSize (stadium and blueberry), 2.12 Iodine (goiter, iodized salt; inside Example 2.3), 2.13 SiSymbol (jar of Hg), 2.14 AtomSym (isotope symbol anatomy), 2.15 MassSpec (spectrometer and zirconium spectrum) | 2.2 Properties of Subatomic Particles, 2.3 Some Common Elements and Their Symbols, 2.4 Nuclear Compositions of Atoms of the Very Light Elements | 2.3, 2.4, 2.5 |
| 2.4 | 2.16 MethaneRep, 2.17 Sulfur (S₈), 2.18 Hydrogen (H, 2H, H₂, 2H₂), 2.19 TiO2 (sunscreen, crystal), 2.20 Benzene, 2.21 AceticAcid, 2.22 PaulaHammond (portrait), 2.23 Isomers (acetic acid, methyl formate), 2.24 Isomers2 (carvone) | — | 2.6 |
| 2.5 | 2.25 Mendeleev (portrait and his table), 2.26 PerTable1 (the periodic table), 2.27 PerTable2 (the families) | — | 2.7 |
| 2.6 | 2.28 NaCation, 2.29 IonCharges (common ion charges on the table), 2.30 NaClMolten (photos), 2.31 Sapphire (inside Example 2.10) | 2.5 Common Polyatomic Ions | 2.8 to 2.12 |
| 2.7 | 2.32 ErinBrocko (in a note) | 2.6 to 2.9, 2.10 Nomenclature Prefixes (a spanned header, no CNXML title), 2.11 (spanned header), 2.12, 2.13 | 2.13, 2.14 |

Unnumbered images: 2.1's `CNX_Chem_02_01_Dalton6_img` and `Dalton8_img` (Example 2.1 and its Check Your Learning; the page cannot do without them) and `Dalton10_img` (an exercise); 2.4's twelve structural drawings inside exercises (`Question3a` to `3d`, `4a` to `4d`, `7a`, `7b`, and the answer's `9a`, `9b`). 2.1's exercise `fs-idp146757152` carries an unnumbered table. File names have no spaces.

## What is new, sketches and photographs

New: the atom's inside (electron, nucleus, proton, neutron), the amu, Z and A, ions, isotopes and average atomic mass, formulas of three kinds, the periodic table, ionic against molecular compounds, and nomenclature. Sketches that argue for redrawing live: the Dalton particle pictures (2.2 to 2.5, and the example images), the cathode ray tube (2.6c), Millikan's apparatus and drops (2.7), the two atom models (2.8), the foil experiment and its explanation (2.9 + 2.10, a fold candidate), the scale picture (2.11), the isotope symbol (2.14), the mass spectrometer and spectrum (2.15), the formula and model sets (2.16, 2.17, 2.18, 2.20, 2.21, 2.23, 2.24), the sodium atom and cation (2.28), the ion charges on the table (2.29). Photographs to keep: Thomson and Braun's tube (2.6a, b, the tube the text names), the jar of mercury (2.13, the text points at it), the goiter and iodized salt (2.12, inside the example it motivates; the section decides), Paula Hammond (2.22, a Portrait of a Chemist, always kept), Mendeleev (2.25a), molten salt conducting (2.30), Erin Brockovich (2.32a, in the note). Likely dropped as stock scenes: the sunscreen (2.19a), the vinegar jug (2.21a), the benzene vial (2.20d), the sapphire ring (2.31), the plum pudding and Saturn photographs (2.8, which the section may keep as the book's analogy), the stadium and blueberries (2.11, the section decides against a live scale figure).

## Link to Learning and PhET

Every Link to Learning is dropped and named in its section's `notes`. Four PhET simulations stand behind material: Rutherford Scattering (2.2; exercises `fs-idp23410688` unkeyed, `fs-idm61727056` keyed), Build an Atom (2.3; `fs-idm164758784` keyed, `fs-idp1819392` unkeyed, `fs-idm103886288` keyed), Isotopes and Atomic Mass (2.3; `fs-idm28786800` unkeyed, `fs-idm112612912` keyed, which repeats it), Build a Molecule (2.4; `fs-idm75792016` unkeyed, `fs-idm57514192` keyed, `fs-idm80750976` unkeyed). These ten are `simulation-exercise` items, carried only where the section's own Sim does the job and the prompt is rewritten against it; otherwise held and named in `exercise_notes`.

## Exercises of another section

None. Every exercise tests its own module; 2.5's isotope-symbol items lean on 2.3 but ask for group names, and 2.7's item naming HBr as a gas stays with nomenclature. No `source_section`.

## Keyed and unkeyed

| Section | Exercises | Keyed | Unkeyed conceptual (kept, suggested approach) | Unkeyed with a definite answer (left out) | Unkeyed simulation |
|---|---|---|---|---|---|
| 2.1 | 4 | 2 | `fs-idp28065472`, `fs-idp146757152` (a judgment about the laws from given masses; the section may instead leave it out as numerical) | — | — |
| 2.2 | 5 | 3 | `fs-idm71935680` | — | `fs-idp23410688` |
| 2.3 | 17 | 8 | `fs-idp67066944`, `fs-idm4055376` | `fs-idm2862432`, `fs-idm75926528`, `fs-idp18872976`, `fs-idm201300912`, `fs-idp15704448` | `fs-idp1819392`, `fs-idm28786800` |
| 2.4 | 10 | 5 | `fs-idm171756048` | `fs-idp231487264`, `fs-idp33519568` | `fs-idm75792016`, `fs-idm80750976` |
| 2.5 | 8 | 4 | — | `fs-idm430913456`, `fs-idm315946160`, `fs-idm281322784`, `fs-idm251902464` | — |
| 2.6 | 6 | 3 | — | `fs-idp44267360`, `fs-idp4856416`, `fs-idp286976176` | — |
| 2.7 | 11 | 6 | — | `fs-idp283375776`, `fs-idp279465312`, `fs-idp279319168`, `fs-idp268274912`, `fs-idp282334032` | — |

## Errata carried as printed

- 2.2: Figure 2.6's caption says "mass-to-charge ratio", the text "charge-to-mass ratio".
- 2.5: the glossary prints "hydrate", a term 2.7 defines; it stays in 2.5's glossary as printed. "representative element" is defined as columns 1, 2 and 12–18 in the glossary and 13–18 in the text; Figure 2.27's alt text says 1, 2 and 12 through 18.
- 2.7: "Some examples demonstrating this Some other examples are shown in Table 2.11" is printed garbled; the answer to `fs-idp268321696` (e) prints "AIF<sub>3</sub>·3H<sub>2</sub>O" with a capital I for the l of aluminum. The Erin Brockovich note's dollar sign is `&#36;`.
- 2.3: Table 2.4's summary gives abundances that differ from its cells; the cells are the book's.

## 3D under root rule 28

Physical 3D (apparatus, a bench with a bounded orbit): the gold foil experiment (2.9 + 2.10) is the strongest case, a ring screen around a foil the reader looks into; the cathode ray tube (2.6c), Millikan's chamber (2.7) and the mass spectrometer (2.15) are candidates the sections weigh against a flat diagram, which reads the deflection better. Structures the text names, 2D and 3D behind a view choice: methane, S₈, benzene, acetic acid and the isomers of 2.4, and the chromate and dichromate of 2.32b; the carvone mirror pair (2.24) is the one where 3D carries the idea, since spatial isomers differ only in space. A particle picture in 3D (the book's rule): the Dalton pictures of 2.1 are small clusters and read well flat; the section decides. Everything else is flat: the symbol anatomy, the spectrum, the periodic tables, the scale picture.

## Root rule 23: be inspiring

The chapter's wonder is that the inside of something no one has seen was worked out from where the pieces went: a beam that bent, drops that fell at whole-number charges, and particles that came back off tissue paper. The live figures should let the reader do those experiments, turning the fields on the beam, charging the drops, aiming at the foil, and then turn the same counting into the practical: build an ion by adding and removing particles and watch its symbol write itself, mix isotopes and watch the average mass move between them, read a formula four ways, and see charges balance into a formula.
