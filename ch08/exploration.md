# Exploration: Chemistry 2e, Chapter 8 Advanced Theories of Covalent Bonding

Written 2026-09-28, before the chapter was prepared. The five modules were converted with `python3 tools/convert.py 8` and read in full; the figure, table and example numbers of 8.2 and 8.4 were checked against openstax.org. Nothing in the chapter departs from the book's organisation as the book's `RULES.md` records it.

## Why this chapter

Chapter 7 drew molecules as Lewis structures and predicted their shapes by VSEPR theory; this chapter asks why the electrons are where those models put them. It gives two answers. Valence bond theory (8.1 to 8.3) builds bonds from overlapping atomic orbitals, hybridizes them to match the shapes of Chapter 7, and adds π bonds from what is left over. Molecular orbital theory (8.4) spreads the electrons over the whole molecule and explains what the first theory cannot: the two unpaired electrons that hold liquid oxygen in a magnet. The chapter opens and closes on that one observation.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68743 | 0 | 1 photo | 1 (N₂, O₂ Lewis) | 0 | 0 | 0 | 0 | 0 | — |
| 8.1 Valence Bond Theory | m68744 | 1 | 4 | 3 | 1 | 5 | 1 | 8 | 4 | — |
| 8.2 Hybrid Atomic Orbitals | m68745 | 2 | 16 | 5 | 0 | 7 | 2 | 14 | 7 | 1 link-to-learning |
| 8.3 Multiple Bonds | m68746 | 1 | 5 | 2 | 0 | 0 | 1 | 9 | 5 | — |
| 8.4 Molecular Orbital Theory | m68747 | 3 | 14 (1 photo, 1 rendering) | 4 | 2 | 16 | 3 | 19 | 9 | 3 link-to-learning, 1 chemist-portrait, 2 sciences-interconnect |

## Numbers as openstax.org prints them

- Figures: intro 8.1 (LiqO2 photo). 8.1: 8.2 Morse (energy against distance), 8.3 overlap, 8.4 sigma, 8.5 pi. 8.2: 8.6 H2Ovb, 8.7 H2Otet, 8.8 spGeom, 8.9 spDiag, 8.10 sp2Geom, 8.11 sp2Conv, 8.12 BH3, 8.13 BH3Diag, 8.14 sp2Ex, 8.15 sp3Geom, 8.16 sp3Diag, 8.17 ethane, 8.18 sp3d_img (SF4, ClF3, ClF4⁺ Lewis structures), 8.19 sp3d (PCl5), 8.20 SF6, 8.21 HybrdOrbit. 8.3: 8.22 sp3config (ethene energy diagram), 8.23 C2H4orbit, 8.24 spC, 8.25 C2H2, 8.26 C6H6. 8.4: 8.27 Gouy, 8.28 waveadd, 8.29 ssigma, 8.30 pMOsigma, 8.31 pMOpi, 8.32 Kohn (photo), 8.33 HIVProteas, 8.34 FillMo, 8.35 H2MO, 8.36 He2MO, 8.37 X2MOs, 8.38 spmix, 8.39 Band, 8.40 O2MO.
- Tables: 8.1 Representative Bond Energies and Lengths (8.1, spanned title row, two three-column halves); 8.2 Comparison of Bonding Theories and 8.3 Electron Configuration and Bond Order (8.4).
- Examples: 8.1 (8.1), 8.2 and 8.3 (8.2), 8.4 (8.3), 8.5, 8.6, 8.7 (8.4). Figure 8.40 sits inside Example 8.6.

## What is new

Orbital overlap and its energy curve, σ and π bonds, the five hybrid sets and the rule that assigns them, the σ framework with π bonds from unhybridized p orbitals, restricted rotation, resonance and delocalization, bonding and antibonding molecular orbitals, the MO diagram and its filling, bond order (the chapter's one Key Equation, in 8.4), s-p mixing, paramagnetism and diamagnetism.

## Sketches, photographs, and boxed notes

- Sketches to replace: every orbital drawing (8.3 to 8.8, 8.10, 8.11, 8.15, 8.17, 8.19, 8.20, 8.21, 8.23 to 8.25, 8.29 to 8.31), the energy curve 8.2, the energy-level diagrams (8.9, 8.13, 8.16, 8.22, 8.34 to 8.38, 8.40), the wave addition 8.28, the bands 8.39, the Gouy balance 8.27. Lewis structures (8.14, 8.18, 8.26 and the inline ones) are faithful flat copies.
- Photographs: Figure 8.1 kept on the intro page; 8.32 (Walter Kohn) kept, since every Portrait of a Chemist keeps its photograph; 8.33 (HIV-1 protease rendering) kept as the book's image, since the text points at it and a protein is beyond anything the page could draw honestly.
- Boxed notes, kept verbatim: Walter Kohn (chemist-portrait), Computational Chemistry in Drug Design and Band Theory (sciences-interconnect), all in 8.4.
- Link to Learning, dropped and named in `notes`: 8.2 hybrid orbitals in three dimensions (a trigger for 8.2's 3D figures); 8.4 the paramagnetism video, the Orbitron animations of molecular orbitals (a trigger for 8.4's MO figures), the benzene MO drawings. No PhET item and no simulation-exercise in the chapter.

## Exercises

Every exercise tests what its own section teaches; none is moved. Keyed against unkeyed (odd keyed, even unkeyed): 8.1 4/4, 8.2 7/7, 8.3 5/4, 8.4 9/10. Unkeyed numerical, to be left out and named in `exercise_notes`: 8.1 fs-idp204835968 (HCl bond energy), 8.4 fs-idm138595920 (number of MOs), fs-idm131971232 (bond order of a configuration), fs-idm79754896 (bond orders of pairs). Every other unkeyed item is conceptual and is kept with a suggested approach; 8.4 fs-idm16460880 is a true-or-false item and is kept as an open item with its two options, never graded. Several keyed answers are images (8.1 fs-idp84623072 and fs-idp108425904, 8.2 fs-idm9916608, fs-idp96568912, fs-idm32929264, fs-idp29495632, 8.3 fs-idp37364832 and fs-idp47770992, 8.4's Check Your Learning of Example 8.5); they go on the card as unnumbered images.

## Two dimensions or three (root rule 28)

Orbitals and hybrid orbitals are 3D by the book's `RULES.md`, and this chapter is where that ruling matters most. All are **mathematical 3D** (a lobe is a surface of a wave function, not an object): house style, ink and element colours, no ground, free orbit, built through `F.view3d` and `F.mesh` lobes as in 7.6.

- Full 3D scenes: the overlap figures 8.3 to 8.5 (one bench, end to end against side by side, with the internuclear axis and the node); the hybrid sets 8.8, 8.10, 8.15, 8.19, 8.20 and their table 8.21 (one mixing bench that morphs s + n p into the set, fold candidate "Figure 8.8 + 8.10 + 8.15"); water 8.6 + 8.7 (90° against 109.5°/104.5°); ethane 8.17 with its free rotation; ethene 8.23 and acetylene 8.24 + 8.25 with the π lobes, where turning one CH2 group about the axis breaks the π overlap; the σ, σ*, π, π* orbitals 8.29 to 8.31 with their nodal planes.
- Flat: the energy curve 8.2, every energy-level and MO diagram, the wave addition 8.28, the bands 8.39, every Lewis structure, the tables. 8.27 (Gouy balance) is an apparatus and would be a bounded-orbit bench by the book's rule; the section decides whether it earns one or stays a faithful still.
- Locked view: 8.11, the book's thin-balloon convention, may be a view of the 8.10 scene rather than its own figure.

## Root rule 23: what would make this chapter inspiring

The one story is the magnet. The intro shows oxygen held between the poles; 8.4 ends by counting the two unpaired electrons that do it. The strongest figures let the reader build a molecule's electrons and watch the answer appear:

1. **An energy curve you can walk** (8.2): drag two hydrogen atoms together, watch their 1s clouds merge into one and the energy fall to its minimum at 74 pm and 7.24 × 10⁻¹⁹ J, then rise; the bond length and the bond energy are read off the curve, not given.
2. **Overlap you can turn** (8.3 to 8.5): rotate one p orbital relative to another and watch the overlap and the bond it makes change from σ to π to nothing.
3. **Hybridization as a morph** (8.8 to 8.21): pick the number of regions of electron density; the s and p lobes blend into the hybrid set and open to 180°, 120°, 109.5° or the bipyramid and octahedron, with the energy-level diagram beside it redistributing the electrons.
4. **Twisting ethene** (8.23): turn one end of the molecule and watch the π overlap vanish; turn ethane and nothing changes. Restricted rotation becomes something felt.
5. **Waves that add and cancel** (8.28 to 8.31): slide the phase of one atomic wave function against the other and watch the bonding orbital become the antibonding one, the node appearing between the nuclei.
6. **The MO diagram as a game** (8.34 to 8.40 + Table 8.3): pick a period-two diatomic molecule and a charge, fill the diagram by Aufbau and Hund, and read the bond order and the unpaired electrons; choose O₂ and a small magnet in the corner starts to pull. s-p mixing is the switch between N₂ and O₂.

## Errata gathered by the chapter pass

Carried as printed:

- 8.2, Figure 8.8: the caption says the hybrid orbitals are "(yellow)" while the image draws them purple.
- 8.2, fs-idp86297648: the answer has an unclosed parenthesis.
- 8.4, the key equation reads "number of bonding electron".
- 8.4, glossary: "π* bonding orbital" and "σ* bonding orbital" name antibonding orbitals.
- 8.4, fs-idm76747104: the answer says "atoms in the 2s orbital".
- 8.4, summary: "is in advantage of".
