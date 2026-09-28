# Exploration: Chemistry 2e, Chapter 10 Liquids and Solids

Written 2026-09-28, before the chapter was prepared. The seven modules were converted with `python3 tools/convert.py 10` and read in full; the figure and example numbers of 10.3 and 10.6 were checked against openstax.org, and the rest follow from them. Nothing in the chapter departs from the book's organisation as the book's `RULES.md` records it.

## Why this chapter

Chapter 9 let gas molecules fly apart and ignored what they feel for one another; this chapter turns the attractions on. It names the forces between molecules (10.1), shows what they do to a liquid's flow, surface and climb up a tube (10.2), follows a substance through its changes of state and the heat each costs (10.3), maps the states on one pressure-temperature plane (10.4), and ends inside the solid, first by the forces that hold it (10.5) and then by the geometry of its packing and the X-rays that measure it (10.6). The thread is one contest, attraction against kinetic energy, drawn first as three flasks in Figure 10.2 and last as a crystal.

## Modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images outside exercises, CYL = Check Your Learning (all keyed), Exer. = end-of-section exercises, Keyed = those with the book's solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68760 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 10.1 Intermolecular Forces | m68761 | 3 | 13 | 1 | 1 | 8 | 3 | 21 | 11 | 2 link-to-learning, 1 everyday-life, 1 sciences-interconnect |
| 10.2 Properties of Liquids | m68764 | 1 | 7 | 0 | 2 | 5 | 1 | 8 | 4 | 1 everyday-life |
| 10.3 Phase Transitions | m68768 | 6 | 8 | 1 | 0 (1 unnumbered in a CYL) | 13 | 6 | 24 | 12 | — |
| 10.4 Phase Diagrams | m68769 | 3 | 7 | 0 | 0 (1 unnumbered) | 4 | 3 | 10 | 5 | 1 link-to-learning, 1 everyday-life |
| 10.5 The Solid State of Matter | m68770 | 0 | 9 | 0 | 1 | 8 | 0 | 11 | 5 | 1 sciences-interconnect |
| 10.6 Lattice Structures in Crystalline Solids | m68773 | 6 | 21 | 3 | 0 | 18 | 6 | 31 | 16 | 1 link-to-learning, 1 chemist-portrait |

## Numbers as openstax.org prints them

- Figures: intro 10.1 (Punch, dry ice). 10.1: 10.2 KMTPhases1, 10.3 WaterPhase, 10.4 ButanePhase, 10.5 IntravInter, 10.6 DispForces, 10.7 PentIso, 10.8 Geckos, 10.9 DipDip, 10.10 HBonding, 10.11 HydrideBP1, 10.12 HydrideBP2, 10.13 DNA, 10.14 DNA2. 10.2: 10.15 Viscosity, 10.16 Droplet, 10.17 Strider, 10.18 Meniscus, 10.19 Wicking, 10.20 CapRise, 10.21 BloodDraw. 10.3: 10.22 VapPress1, 10.23 VapPress3, 10.24 VapPress2, 10.25 Evap (inside Example 10.9), 10.26 MeltingIce, 10.27 Sublimtn, 10.28 PhaseChng, 10.29 HeatCurve. 10.4: 10.30 PhaseDi, 10.31 H2OPhasDi2, 10.32 FreezeDry, 10.33 IceMelt, 10.34 CO2PhasDi, 10.35 CritFluid, 10.36 SupCritCof. 10.5: 10.37 TypesSol, 10.38 BoronOxide (it draws SiO₂), 10.39 IonicSolid, 10.40 Metallic, 10.41 NtwrkSolid, 10.42 MolSolids, 10.43 Carbon, 10.44 Graphene, 10.45 CrystDfcts. 10.6: 10.46 UnitCell1, 10.47 SimpleCub1, 10.48 SimpleCub2, 10.49 SimpleCub3, 10.50 CubUntCll, 10.51 BdyCntrdCb, 10.52 FcCntrdCbc, 10.53 CbcCltPckd, 10.54 ClstPckng2, 10.55 GenUnitCll, 10.56 CrystalSys, 10.57 TetOctHole, 10.58 IntIonst, 10.59 CsClStrctr, 10.60 NaClStrctr, 10.61 ZnSStrctr, 10.62 CaF2Strctr, 10.63 ConDec, 10.64 XRyDiff1, 10.65 XRyDiff2, 10.66 RFranklin.
- The 10.2 exercise photograph of a floating needle (`CNX_Chem_10_02_Needlefloa_img.jpg`) is a CNXML `<figure>` with a credit caption but is unnumbered, as every image inside an exercise is.
- Tables: 10.1 Melting and Boiling Points of the Halogens (10.1); 10.2 Viscosities and 10.3 Surface Tensions of Common Substances at 25 °C (10.2); 10.4 Types of Crystalline Solids and Their Properties (10.5). Unnumbered: the alcohols' vapor pressures in 10.3's first CYL, the critical temperatures and pressures in 10.4, the exercise tables of 10.2 and 10.5.
- Examples: 10.1–10.3 (10.1), 10.4 (10.2), 10.5–10.10 (10.3), 10.11–10.13 (10.4), none in 10.5, 10.14–10.19 (10.6).
- Unnumbered inline images: 10.1 BoilPoints_img (the group 14 hydrides, in Example 10.1); 10.3 Ethanol_img (four structures, Example 10.5); 10.6 SimpCube_img (Example 10.14), Ex100602_img (Example 10.15), LiClstrctr (Example 10.18, no `_img` suffix).

## What is new

The three van der Waals forces and the reasoning that ranks substances by them; viscosity, surface tension, cohesion and adhesion, and the capillary-rise equation; vapor pressure as a dynamic equilibrium, boiling point as a function of pressure, the Clausius-Clapeyron equation in three forms, the enthalpies of the six transitions and the heating curve; the phase diagram with its triple and critical points; the four kinds of crystalline solid; unit cells, closest packing, holes, ionic structures and the Bragg equation. New symbols: capillary height, surface tension, contact angle, tube radius, ΔH<sub>vap</sub>, ΔH<sub>fus</sub>, ΔH<sub>sub</sub>, the Clausius-Clapeyron constant A, the unit cell edge, the atomic radius, the order, plane spacing and angle of the Bragg equation.

## Sketches to redraw and photographs to keep

Redraw: every diagram and graph (10.2, 10.5, 10.6, 10.7, 10.9, 10.10, 10.11, 10.12, 10.16 and 10.17 as their drawn halves, 10.20, 10.22, 10.23, 10.24, 10.28, 10.29, 10.30, 10.31, 10.34, 10.37 to 10.42, 10.45 to 10.64, 10.65 as an apparatus), and the inline graph of Example 10.1. Keep as the book's images: 10.13 and 10.14 (DNA; the double helix and its full Lewis structure are the feature's subject and a faithful redraw adds nothing) and 10.36(a) caffeine unless 10.4 folds it. Photographs kept, since the text points at each: 10.3, 10.4, 10.8 (Geckos note), 10.15, 10.16 and 10.17 photographic halves, 10.18, 10.19, 10.21 (in its note), 10.25 (inside Example 10.9, a candidate to drop as a stock scene beside an example, 10.3 decides), 10.26 (the four readings of the melting ice are the evidence), 10.27, 10.32, 10.33, 10.35, 10.43, 10.66 (Portrait of a Chemist). 10.44 graphene shapes is a drawing, 3D candidate.

## Notes, links and PhET

Boxed notes kept verbatim: Geckos and Intermolecular Forces, Hydrogen Bonding and DNA (10.1); Biomedical Applications of Capillary Action (10.2); Decaffeinating Coffee Using Supercritical CO₂ (10.4); Graphene: Material of the Future (10.5); X-ray Crystallographer Rosalind Franklin (10.6). Link to Learning dropped and named in `notes`: 10.1 the PhET States of Matter simulation and Kellar Autumn's video; 10.4 the supercritical transition video; 10.6 the Bragg simulator. Each simulation link is a trigger for a Sim: PhET States of Matter (particles of a chosen substance heated and cooled through the three phases, with an interaction-potential view) for 10.1, and a Bragg angle explorer for 10.6. 10.1's exercise `fs-idm78391360` opens the PhET simulation: a `simulation-exercise`, held and named in `exercise_notes` unless 10.1's Sim carries all three parts and the plan rewrites the prompt against it.

## Exercises and keys

Keyed counts are in the module table. Unkeyed numerical items, left out and named in `exercise_notes`: 10.2 `fs-idp26872272`; 10.3 `fs-idm91183360`, `fs-idm100561472` (a pressure read off Figure 10.24), `fs-idm4941728`; 10.4 `fs-idm134300544` and `fs-idm180256816` (values read off a diagram); 10.6 `fs-idp53519632`, `fs-idm25352864`, `fs-idp21112320`, `fs-idp8185568`, `fs-idp64501504`, `fs-idm23848128`, `fs-idp31363760`. Unkeyed choice items kept open with their options, never graded: 10.3 `fs-idm190677696`; 10.5 `fs-idp95742064`, `fs-idp12717008`; 10.6 `fs-idp80534576`. Every other unkeyed item is conceptual (including 10.6's coordination-number and formula questions, which the text answers in words) and is kept with an AI-marked suggested approach that never states the answer. No item belongs to another section; no moves.

Errata to carry as printed and name in `notes`: 10.1 Example 10.3 gives ethanol's boiling point as 78.4 °C in the problem and 78.5 °C in the solution; 10.1 `fs-idm20127408`'s answer writes "ICI" for ICl; 10.3 the first CYL answer ends "41.4 kJ/mol**"; 10.4 the critical-point table's CNXML summary gives K and atm while its cells give °C and kPa (the cells are printed); 10.4 `fs-idm135170880`'s answer images label carbon's regions "Water (liquid)" and "Water vapor (gas)"; 10.5 the headers "Covalent Network Solid" and "Molecular Solid" are singular; 10.6 the tungsten answer reads "19.26 g/cm" without the cube; 10.6 Example 10.17's CYL "What it the formula"; `fs-idp122808832`'s answer "the formula for thallium is TlI"; `fs-idp80497568` "occupied the same cites"; the figure ids of 10.59, 10.60 and 10.62 carry `_10_07_` names; 10.60's alt text calls NaCl "Body-centered simple cubic".

## Flat or 3D (root rule 28 and the book's `RULES.md`)

- Physical 3D, settled by the book: every unit cell and crystal structure, 10.46 to 10.62 and the four solids 10.39 to 10.42 and 10.41's networks; spheres with the element palette, bounded orbit, snap views along the cell axes and the body and face diagonals where the text measures along them. 10.53 + 10.54 (the two stackings) and 10.57 (holes) are layered-sphere scenes; 10.56 (the fourteen cells) is a choice among cells, not fourteen scenes. The graphene shapes of 10.44 are 3D.
- Particle pictures, 3D by the book with readings on a flat strip: 10.2 (three phases), 10.22 (vapor over a liquid in a bulb, with a manometer bench), 10.16 and 10.17's surface molecules, 10.37 (crystalline against amorphous), and a phase-change box if 10.3 builds one.
- Built both ways with a view choice, 2D by default (the book's rule for intermolecular forces and structures the text names): 10.5, 10.6, 10.7, 10.9, 10.10, 10.19's inset, the acetic acid dimer and 10.38.
- Apparatus bench, 3D: 10.65 the diffractometer; 10.20 capillary tubes is a candidate (a beaker with tubes of three radii).
- Flat: every graph and ladder (10.11, 10.12, Example 10.1's graph, 10.23, 10.24, 10.28, 10.29, 10.30, 10.31, 10.34), 10.45 defects (a single layer), 10.55's axes drawing may be a locked view of a cell, 10.63 waves, 10.64 Bragg planes (a section through the crystal is the point).

## Folds (candidates, each section's call)

10.11 + 10.12 (one graph whose period-2 points are revealed); 10.30 + 10.31 + 10.34 (a phase diagram with a substance choice, a draggable state point and the transitions it crosses; 10.4 decides whether 10.30 stays the generic one); 10.47 + 10.48 + 10.49 and 10.50 + 10.51 + 10.52 (one cubic cell with a choice of simple, body-centered, face-centered, a coordination view and a cut-away showing the fractions); 10.53 + 10.54; 10.59 to 10.62 (one ionic cell with a compound choice); 10.63 + 10.64 (Bragg planes with an angle slider and the resulting interference).

## Root rule 23, BE INSPIRING

The chapter's single most striking thing is that every number in it (a boiling point, a vapor pressure, a melting point, a density) comes from how hard particles hold one another and how fast they move. Three pictures can carry that. First, one particle box running through the whole chapter: choose a substance (Ne, Ar, CH₄, HCl, H₂O, the book's own examples, each in element colours) and raise the temperature; the particles vibrate, slide and escape in 3D, the vapor above them pushes on a manometer, and the heating curve of 10.3 draws itself on the strip beneath, plateau by plateau, the heat of each step in the energy hue. Second, the phase diagram as a place the reader walks: a point dragged across water's and carbon dioxide's diagrams changes the box beside it, frost forms below the triple point, and past the critical point the meniscus fades out as it does in Figure 10.35. Third, the crystal built by hand: stack hexagonal layers A, B, then choose A or C, and watch the face-centered cube appear when the stack is turned to its body diagonal; drop cations into the holes and read the formula; then shine X-rays at the planes and turn the angle until the reflected waves line up. Each of these makes a result the book states in words into something the reader sees happen.
