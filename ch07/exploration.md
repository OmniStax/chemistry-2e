# Exploration: Chemistry 2e, Chapter 7 Chemical Bonding and Molecular Geometry

First written 2026-09-12 for the showcase build of 7.6; rewritten 2026-09-28 for the whole chapter, when 7.1 to 7.5 and the introduction were prepared. The source of record is the CNXML bundle at `source/osbooks-chemistry-bundle/`; every module was converted with `python3 tools/convert.py` and read in full. The book's organisation, apparatus and conventions are as the book's `RULES.md` records them; nothing in this chapter departs from that account. What is said of 7.6 below is what the 2026-09-12 pass found and built, kept as it stood.

## Chapter 7 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered images in the reading (worked examples and Check Your Learning answers included) / inside exercises, Tab. = tables, Eq. = display equations, Defs = glossary entries, CYL = Check Your Learning items (all keyed), Exer. = end-of-chapter exercises, Keyed = those carrying the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tab. | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68736 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 7.1 Ionic Bonding | m68737 | 2 | 2 (1 photo triple, 1 sketch) | 0 / 0 | 0 | 1 | 2 | 2 | 10 | 5 | — |
| 7.2 Covalent Bonding | m68738 | 1 | 5 (1 photo, 1 graph, 3 sketches) | 0 / 0 | 1 numbered, 1 in a CYL answer | 3 | 5 | 1 | 12 | 6 | Portrait of a Chemist: Linus Pauling |
| 7.3 Lewis Symbols and Structures | m68739 | 2 | 4 (1 photo, 3 sketches) | 30 / 43 | 0 | 4 | 9 | 2 | 21 | 11 | How Sciences Interconnect: Fullerene Chemistry |
| 7.4 Formal Charges and Resonance | m68740 | 3 | 0 | 13 / 21 | Key Equations | 1 | 5 | 3 | 20 | 10 | 1 link-to-learning |
| 7.5 Strengths of Ionic and Covalent Bonds | m68741 | 2 | 1 sketch | 3 / 4 | 3 numbered, Key Equations, 1 in an exercise | 13 | 3 | 2 | 21 | 10 | 1 AP item |
| 7.6 Molecular Structure and Polarity | m68742 | 8 | 15 sketches | 12 / 5 | 0 | 4 | 16 | 8 | 32 | 16 | 2 link-to-learning |

One hundred and sixteen end-of-chapter exercises, fifty-eight keyed, the odd-numbered half as the Preface promises; eighteen Check Your Learning items, all keyed; forty glossary entries. "molecular structure" is defined twice, in 7.4 (arrangement of atoms) and in 7.6 (placement of the atoms only); each section keeps its own row.

## The figure numbers

Chapter-wide from the opener as Figure 7.1, checked against openstax.org (7.5 prints Figure 7.13, Tables 7.2 to 7.4 and Examples 7.9 and 7.10). A figure inside a boxed note or a worked example is numbered; an image inside an exercise or a bare `<media>` is not.

| Section | Number | CNXML id | What it is | Recommendation |
|---|---|---|---|---|
| Intro | 7.1 | CNX_Chem_07_00_Bucky | photos: a C<sub>60</sub> model, a soccer ball, a radar dome | kept on the introduction page |
| 7.1 | 7.2 | CNX_Chem_07_01_NaClPhotos | photos: sodium under oil, chlorine gas, salt crystals | keep: the text argues from the contrast |
| 7.1 | 7.3 | CNX_Chem_07_01_NaClStruc | sketch: the NaCl lattice, packed and expanded | physical 3D (a crystal's packing), panels (a) and (b) as a choice |
| 7.2 | 7.4 | CNX_Chem_07_02_Morse | graph: potential energy of two H atoms against distance | still Figure, flat, a distance slider moving the two atoms along the curve; binds energy |
| 7.2 | 7.5 | CNX_Chem_07_02_HClBond | sketch: electron density and δ+/δ− of H–Cl | flat; candidate to fold with 7.8 |
| 7.2 | 7.6 | CNX_Chem_07_02_ENTable | sketch: Pauling electronegativities on the periodic table | flat hover table; may link the elements page |
| 7.2 | 7.7 | CNX_Chem_07_02_Pauling | photo: Linus Pauling | keep (Portrait of a Chemist) |
| 7.2 | 7.8 | CNX_Chem_07_02_DeltaEN | sketch: bond type against ΔEN | flat; fold candidate "Figure 7.5 + 7.8": pick two elements, the density shifts and the scale marks the bond type |
| 7.3 | 7.9 | CNX_Chem_07_03_3rowLewis | sketch: Lewis symbols of the third period | flat, faithful or a still Figure stepping the period |
| 7.3 | 7.10 | CNX_Chem_07_03_IonLewis | sketch: Lewis symbols in the formation of NaCl, MgO, CaF<sub>2</sub> | flat, choice of compound |
| 7.3 | 7.11 | CNX_Chem_07_03_Smalley | photo: Richard Smalley | keep (inside the Fullerene note) |
| 7.3 | 7.12 | CNX_Chem_07_03_PF5SF6_img | sketch: Lewis structures of PCl<sub>5</sub> and SF<sub>6</sub> | flat, faithful |
| 7.5 | 7.13 | CNX_Chem_07_05_BornHaber | sketch: the Born-Haber cycle for CsF | flat energy ladder, still; binds energy |
| 7.6 | 7.14 to 7.28 | as built | see `7.6/plan.md` | built |

The file of Figure 7.3 is `CNX_Chem_07_01_NaClStruc-1938.jpg` in the bundle; Figure 7.12's file ends in `_img` though it is numbered. No bundle file name in this chapter carries a space. The Fullerene note of 7.3 cites Figure 7.1 in the introduction module; that reference is plain text or a link to the introduction page.

## The table numbers

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 7.1 | 7.2 (in Example 7.3) | fs-idm2614240 | Bond Polarity and Electronegativity Difference |
| Table 7.2 | 7.5 | fs-idp13638832 | Bond Energies (kJ/mol) (a spanned header, no CNXML title) |
| Table 7.3 | 7.5 | fs-idm44464336 | Average Bond Lengths and Bond Energies for Some Common Bonds |
| Table 7.4 | 7.5 | fs-idm33829552 | the Born-Haber steps for CsF (no printed title) |

Unnumbered: the answer table of Example 7.3's Check Your Learning (fs-idm25109184), the ionization energy table inside the AP item of 7.5 (fs-idm30060832), and the Key Equations tables of 7.4 and 7.5, which become the chapter's equations. The summary attribute of Table 7.4 describes NaCl while the table prints CsF; the printed table is followed.

## The worked example numbers

7.1: Examples 7.1 (Cations) and 7.2 (Anions). 7.2: 7.3 (Electronegativity and Bond Polarity). 7.3: 7.4 (Writing Lewis Structures) and 7.5 (Octet Rule Violations). 7.4: 7.6 and 7.7 (Calculating Formal Charge, twice the same title) and 7.8 (Using Formal Charge to Determine Molecular Structure). 7.5: 7.9 (Bond Energies and Enthalpy Changes) and 7.10 (Lattice Energy Comparisons). 7.6: 7.11 to 7.18, titled in `7.6/plan.md`.

## What is new in the chapter

The chapter moves from single atoms (Chapter 6) to atoms joined. 7.1 and 7.2 give the two limiting kinds of bond and the electronegativity scale between them; 7.3 gives the notation every later section writes in; 7.4 chooses between Lewis structures and introduces resonance; 7.5 puts energies on bonds and lattices; 7.6 turns the flat structures into shapes. Each section leans on the one before, and 7.3's Lewis structure is the chapter's hub.

Leaning on earlier chapters, whose concepts are being prepared at the same time: ions and ionic compounds (Chapter 2), electron configurations, ionization energy and electron affinity (6.4, 6.5), enthalpy, Hess's law and enthalpies of formation (5.3). The edges are in the notes file under "Edges wanted later". Two cross-references reach Appendix G (7.5), linkable to its data sheet.

## Link to Learning, PhET and exercises that need care

- 7.4's link to an online quiz on resonance structures and formal charge is dropped and named in `notes`; it is the trigger for a Sim in 7.4 if the section judges one worth it.
- 7.6's two PhET notes and five simulation exercises are as built.
- 7.5's `fs-idp12625232` is an AP item (footnote kept as printed); parts (a), (c) and (d) test Chapter 6's radii and ionization energies and part (b) tests lattice energy; it stays in 7.5 where the book puts it.

## Exercises that belong to another section

One move. `fs-idp49074848` of 7.2 ("Why is it incorrect to speak of a molecule of solid NaCl?", keyed) tests what 7.1 teaches (an ionic formula is not a molecule); it goes to 7.1 with `source_section` "7.2", and both sections' `exercise_notes` say so. Every other item tests its own section.

## Keyed and unkeyed, and what is left out

| Section | Exercises | Keyed | Unkeyed conceptual (kept with an approach) | Unkeyed numerical or computational (left out) | Unkeyed choice (open item with options) |
|---|---|---|---|---|---|
| 7.1 | 10 (+1 moved in) | 5 (+1) | 5 | 0 | 0 |
| 7.2 | 12 (−1 moved out) | 6 (−1) | 6 | 0 | 0 |
| 7.3 | 21 | 11 | 8 | 2: `fs-idm40885728`, `fs-idp157470896` (molar mass and composition first) | 0 |
| 7.4 | 20 | 10 | 10 | 0 | 0 |
| 7.5 | 21 | 10 | 5 | 4: `fs-idp57429280`, `fs-idp65498352`, `fs-idm2894352`, `fs-idp57420000` | 2: `fs-idp46666496`, `fs-idp15208208` |
| 7.6 | 32 | 16 | as built | as built | as built |

The section reads each item's CNXML before classing it; the table is the prep's default.

## Where the chapter is spatial (root rule 28)

- **Physical 3D**: Figure 7.3, the NaCl lattice, is a crystal's packing, which the book's `RULES.md` settles as 3D: spheres in the element palette, a bounded free orbit, the book's two panels (packed, expanded with rods) as a choice, and the six neighbours of one ion picked out. The 7.6 molecules are built.
- **Mathematical 3D**: none outside 7.6.
- **Locked view**: none; nothing else is printed in perspective.
- **Flat**: everything else, the Morse graph, the electronegativity table, the Lewis symbols and structures, resonance forms, the Born-Haber ladder and the tables.

## What would make this chapter open up (root rule 23)

The chapter is the book's turn from atoms to substances, and its hardest ideas are balances that print can only state. What the reader should come away having seen:

- **A bond is an energy minimum.** Figure 7.4 as a live curve: pull two hydrogen atoms apart and push them together, and the bond length is where the energy stops falling. The same curve reads again in 7.5, where the depth of the well is the bond energy.
- **Polarity is a slide, not three boxes.** Choose two elements and watch the shared density shift toward the more electronegative one while a marker slides from pure covalent through polar covalent to ionic (Figures 7.5 + 7.8), with ΔEN read off Pauling's table.
- **A Lewis structure is bookkeeping that can be done step by step.** A builder that walks the five steps for a chosen molecule or ion, counting valence electrons down to zero, is 7.3's one strong Sim candidate; the 2026-09-12 pass rejected it for 7.6 because it belongs here.
- **Resonance is an average, never a flicker.** The nitrite or carbonate ion with its forms side by side and the hybrid drawn with equal partial bonds, bond lengths read against Table 7.3's single and double values; the figure must not animate between forms, since the text insists the molecule never fluctuates.
- **Lattice energy follows Coulomb.** Sliders for the ionic charges and the interionic distance with ΔH<sub>lattice</sub> = C(Z<sup>+</sup>)(Z<sup>−</sup>)/R<sub>o</sub> read out, LiF and MgO as detents, and the Born-Haber ladder for CsF built step by step so that the unknown step closes the cycle.
- **A lattice is a solid, not a molecule.** Turning the NaCl crystal shows why no Na–Cl pair is special: every ion has six equal neighbours.

### 7.6, as found in 2026-09-12

Section 7.6 is where the book leaves the flat page: a molecule occupies space, its bond angles are measurable, and whether it is polar depends on how its bond moments add in three dimensions. The pass built a rotatable VSEPR bench (Figure 7.16 + 7.19 + 7.20), a bond-moment bench (Figure 7.26 + 7.27), a moving Figure 7.28 in which molecules align in a field, a measuring Figure 7.14, still redraws of the fixed arrangements, and one Sim of electron domains settling into the five geometries, all through `F.view3d` on Chen's decision of 2026-09-12. It considered and rejected a glycine bench, a Lewis-structure builder (which belongs to 7.3) and a hover electronegativity table (which is Figure 7.6 in 7.2). Everything in 7.6 leaned on 7.2's `bond-polarity` and 7.3's `lewis-structure`, which were placeholders then and are now full concepts of their sections.
