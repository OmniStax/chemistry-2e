# Exploration: Chemistry 2e, Chapter 7 Chemical Bonding and Molecular Geometry

Written 2026-09-12, before the chapter was prepared. The source of record is
the CNXML bundle at `source/osbooks-chemistry-bundle/`; the seven modules of
the chapter were converted with `python3 tools/convert.py 7` and 7.6 was read
in full, the other five closely enough to number the chapter's figures, tables
and worked examples and to know what 7.6 leans on. The book's organisation,
its apparatus and its conventions are as `exploration.md` beside `RULES.md`
records them for the whole book; nothing in this chapter departs from that
account.

## Why this chapter, and why one section of it

Chen asked for the three sections of the book with the richest opportunity for
interactive simulation to be built as showcases. Section 7.6, Molecular
Structure and Polarity, is one of them, and it is the only section of this
chapter prepared here: the chapter's other five sections are listed in
`chapter.json` but are not built, and the chapter has no introduction page
yet. The section is where the book leaves the flat page. Everything before it
in the chapter is drawn in two dimensions, and 7.6 is the point at which the
book has to say that a molecule occupies space, that the angles between its
bonds are measurable quantities, and that whether a molecule is polar depends
on how its bond moments are arranged in three dimensions. Print can name a
tetrahedron; it cannot turn one.

## Chapter 7 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline
images, Eq. = marked display equations, Defs = glossary entries, CYL = Check
Your Learning items (every one keyed), Exer. = end-of-chapter exercises,
Keyed = those carrying the book's own solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68736 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 7.1 Ionic Bonding | m68737 | 2 | 2 (1 photo pair, 1 sketch) | 0 | 0 | 1 | 2 | 2 | 10 | 5 | — |
| 7.2 Covalent Bonding | m68738 | 1 | 5 (1 photo, 4 sketches) | 0 | 2 (1 numbered) | 3 | 5 | 1 | 12 | 6 | — |
| 7.3 Lewis Symbols and Structures | m68739 | 2 | 4 (1 photo, 3 sketches) | 69 | 0 | 4 | 9 | 2 | 21 | 11 | — |
| 7.4 Formal Charges and Resonance | m68740 | 3 | 0 | 34 | 1 (key equations) | 1 | 5 | 3 | 20 | 10 | 1 link-to-learning |
| 7.5 Strengths of Ionic and Covalent Bonds | m68741 | 2 | 1 sketch | 7 | 5 (3 numbered) | 13 | 3 | 2 | 21 | 10 | — |
| 7.6 Molecular Structure and Polarity | m68742 | 8 | 15 sketches | 17 | 0 | 4 | 16 | 8 | 32 | 16 | 2 link-to-learning |

One hundred and sixteen end-of-chapter exercises, fifty-eight of them keyed,
which is the odd-numbered half of the book's own list as the Preface promises.
Eighteen Check Your Learning items, all of them keyed. Forty glossary entries,
sixteen of them in 7.6. The chapter carries no `everyday-life`,
`sciences-interconnect` or `chemist-portrait` note, so 7.6 keeps no titled
aside; it carries two `link-to-learning` notes, both of them PhET simulations,
and those are named below.

## The figure numbers

The book numbers figures chapter-wide on openstax.org, beginning with the
introduction's splash photograph as Figure 7.1, and it numbers a figure that
sits inside a boxed note or a worked example while leaving an image inside an
exercise unnumbered. Applying that rule to the CNXML gives the twenty-eight
numbers below. Section 7.6 holds Figures 7.14 to 7.28, every one of them a
sketch; the chapter has three photographs in all and none of them is in 7.6.

| Section | Number | CNXML id | What it is |
|---|---|---|---|
| Intro | 7.1 | CNX_Chem_07_00_Bucky | photo: a buckyball model |
| 7.1 | 7.2 | CNX_Chem_07_01_NaClPhotos | photos: sodium, chlorine and the salt they make |
| 7.1 | 7.3 | CNX_Chem_07_01_NaClStruc | sketch: the sodium chloride lattice |
| 7.2 | 7.4 | CNX_Chem_07_02_Morse | graph: the potential energy of two hydrogen atoms against distance |
| 7.2 | 7.5 | CNX_Chem_07_02_HClBond | sketch: the partial charges of a hydrogen chloride bond |
| 7.2 | 7.6 | CNX_Chem_07_02_ENTable | sketch: electronegativities across the periodic table |
| 7.2 | 7.7 | CNX_Chem_07_02_Pauling | photo: Linus Pauling |
| 7.2 | 7.8 | CNX_Chem_07_02_DeltaEN | sketch: the bond-type scale against electronegativity difference |
| 7.3 | 7.9 | CNX_Chem_07_03_3rowLewis | sketch: Lewis symbols of the first three periods |
| 7.3 | 7.10 | CNX_Chem_07_03_IonLewis | sketch: Lewis structures of some ions |
| 7.3 | 7.11 | CNX_Chem_07_03_Smalley | photo: Richard Smalley |
| 7.3 | 7.12 | CNX_Chem_07_03_PF5SF6_img | sketch: the expanded octets of PF5 and SF6 |
| 7.5 | 7.13 | CNX_Chem_07_05_BornHaber | sketch: the Born-Haber cycle for sodium chloride |
| 7.6 | 7.14 | CNX_Chem_07_06_CH2O | sketch: the bond angle and bond length of formaldehyde |
| 7.6 | 7.15 | CNX_Chem_07_06_BeF2 | sketch: BeF2, two bonds 180° apart |
| 7.6 | 7.16 | CNX_Chem_07_06_Egeom | sketch: the five electron-pair geometries with their angles |
| 7.6 | 7.17 | CNX_Chem_07_06_CH4 | sketch: methane in wedge and dash notation |
| 7.6 | 7.18 | CNX_Chem_07_06_NH3 | sketch: ammonia in three panels, electron pairs, structure, angles |
| 7.6 | 7.19 | CNX_Chem_07_06_molgeom | sketch: the molecular structures that follow from each electron-pair geometry |
| 7.6 | 7.20 | CNX_Chem_07_06_Axeq | sketch: axial and equatorial positions, and the three arrangements of ClF3 |
| 7.6 | 7.21 | CNX_Chem_07_06_BCl3mol | sketch in Example 7.11: trigonal planar BCl3 |
| 7.6 | 7.22 | CNX_Chem_07_06_NH4mol | sketch in Example 7.12: the tetrahedral ammonium ion |
| 7.6 | 7.23 | CNX_Chem_07_06_H2Omol | sketch in Example 7.13: water, tetrahedral electron pairs and a bent structure |
| 7.6 | 7.24 | CNX_Chem_07_06_SF4mol | sketch in Example 7.14: SF4, trigonal bipyramidal and seesaw |
| 7.6 | 7.25 | CNX_Chem_07_06_XeF4mol | sketch in Example 7.15: XeF4, octahedral and square planar |
| 7.6 | 7.26 | CNX_Chem_07_06_BondVector | sketch: the bond moment vectors of C–H and B–F |
| 7.6 | 7.27 | CNX_Chem_07_06_CO2H2Odip | sketch: the bond moments of CO2 cancelling and those of water not |
| 7.6 | 7.28 | CNX_Chem_07_06_Dipolfield | sketch: HF molecules at random, then aligned in an electric field |

Seventeen unnumbered inline images belong to 7.6: eleven Lewis structures and
three-dimensional sketches in the running text and the worked examples
(CO2, BCl3, the ammonium ion, water, SF4, XeF4, glycine and its
three-dimensional form, alanine, OCS, chloromethane, H2S with ammonia), and
four inside exercises (the AB2 shapes of the twenty-third item, the three CS3
resonance structures of the twenty-fifth, and the answer sketch of the
twenty-seventh). They are content the page cannot do without, and the section
plan decides each one by root rule 14.

## The table numbers

The chapter prints four numbered tables and none of them is in 7.6, so the
section keeps no `div.book-table`.

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 7.1 | 7.2 | fs-idm2614240 | Bond Polarity and Electronegativity Difference |
| Table 7.2 | 7.5 | fs-idp13638832 | Bond Energies (kJ/mol) |
| Table 7.3 | 7.5 | fs-idm44464336 | Average Bond Lengths and Bond Energies for Some Common Bonds |
| Table 7.4 | 7.5 | fs-idm33829552 | the Born-Haber cycle for sodium chloride, step by step |

The two unnumbered tables of 7.2 and 7.5 and the Key Equations tables of 7.4
and 7.5 are not numbered and none of them is in 7.6.

## The worked example numbers

The book numbers its worked examples chapter-wide as it numbers its figures.
7.1 holds Examples 7.1 and 7.2, 7.2 holds 7.3, 7.3 holds 7.4 and 7.5, 7.4
holds 7.6 to 7.8, and 7.5 holds 7.9 and 7.10, so the eight examples of 7.6
are Examples 7.11 to 7.18:

| Number | Title |
|---|---|
| Example 7.11 | Predicting Electron-pair Geometry and Molecular Structure: CO2 and BCl3 |
| Example 7.12 | Predicting Electron-pair Geometry and Molecular Structure: Ammonium |
| Example 7.13 | Predicting Electron-pair Geometry and Molecular Structure: Lone Pairs on the Central Atom |
| Example 7.14 | Predicting Electron-pair Geometry and Molecular Structure: SF4 |
| Example 7.15 | Predicting Electron-pair Geometry and Molecular Structure: XeF4 |
| Example 7.16 | Predicting Structure in Multicenter Molecules |
| Example 7.17 | Molecular Simulation |
| Example 7.18 | Polarity Simulations |

Examples 7.17 and 7.18 are worked against a PhET simulation rather than
against the printed page: each poses its problem as an instruction to build a
molecule in the simulator and read an answer off it. Their Check Your Learning
items are open ones, and the section plan decides whether the Sims of our own
carry them; where a Sim does, the prompt is rewritten against it, and where
none does, the example is kept with the book's own words and its link named in
`notes`.

## What 7.6 leans on

Nothing in the section is self-contained, and four of its debts fall in
sections of this chapter that are not built:

- **Lewis structures (7.3).** Every prediction in 7.6 begins with one, and
  step 1 of the section's own procedure says so. This is the section's
  largest debt and it is carried by a placeholder concept, `lewis-structure`.
- **Polar covalent bonds and electronegativity (7.2).** The bond dipole
  moment is the electronegativity difference turned into a vector, and the
  whole of the polarity half of the section rests on it. It is carried by a
  placeholder concept, `bond-polarity`.
- **Resonance (7.4).** Named once, in the Check Your Learning of Example
  7.11, where the carbonate ion's three identical C–O bonds each count as one
  region of electron density. No placeholder is written for it: the sentence
  is the book's own and reads without one.
- **Bond distance (7.5).** The section measures bond distances but does not
  explain what sets them; the Ångstrom and the picometer are introduced here.

From Chapter 1, which is built, one edge holds: a molecule is a collection of
atoms bonded together, which is `atoms-and-molecules` of 1.2, and the section's
opening idea that a molecule has measurable angles and distances stands on it.

## The section's Link to Learning and PhET items

Both notes of 7.6 are `link-to-learning` and both are PhET simulations. By the
book's rules they are dropped from the page and named in `notes`, one plain
sentence each, and each is the trigger for a Sim of our own:

- the molecular shape simulator (openstax.org/l/16MolecShape), which builds a
  molecule from bonds and lone pairs and names its electron-pair geometry and
  its molecular structure;
- the molecule polarity simulation (openstax.org/l/16MolecPolarity), which
  sets the electronegativity of each atom and shows the bond moments, the
  molecular dipole and the behaviour of the molecule in an electric field.

Five end-of-chapter exercises are instructions to run one of those two
simulations and are kind `simulation-exercise`: the twenty-eighth, twenty-ninth
and thirtieth run the polarity simulation, and the thirty-first and
thirty-second run the shape simulator. Three of them are keyed. The section
plan decides which of the five the Sims of our own can carry with their
prompts rewritten; any the Sims cannot carry is left out and named in
`exercise_notes`.

## Exercises of the section that need another section

None is held for a later page and none is taken from a sibling, so no row
carries a `source_section`. Every one of the thirty-two items tests what 7.6
teaches, and the twenty-seventh, which asks for the molecular structure of a
compound given its molar mass and its percent composition, is the one item
that also reaches back, to the empirical-formula work of 3.2; the page keeps
it where the book puts it, since the shape is what it asks for.

## What would make this section open up (root rule 23)

The book's own answer to this question for Chapter 7 is in `exploration.md`
beside `RULES.md`: molecular geometry is the chapter's reason for three
dimensions, because a planar drawing can show the names of the shapes but not
the angles between them. Three things in the section are genuinely spatial and
print can only gesture at each.

The app can carry all three through `figlib` rather than through `THREE`.
`figlib`'s `view()` projects a point of a solid onto the canvas from a
viewpoint given as a yaw, a pitch and a distance, and `face()` fills and
shades one face of it, which is enough to draw a central atom, its bonds and
its lone pairs as a rotatable solid. The projection's yaw and pitch become
sliders, so the reader turns the molecule rather than accepting the book's one
viewpoint; both sliders are untyped and draw in ink, as every slider of this
section does. `THREE` is not needed and is not used: nothing here wants a lit,
textured, depth-buffered scene, and a figure written against `figlib` keeps
the label discipline, the palette and the transport the rest of the book's
figures have.

### The Sim this section builds

**Electron domains finding their places.** A central atom with a number of
regions of electron density that the reader sets, each drawn as a cloud on a
sphere around it, starting from positions that are not the answer and pushing
one another apart until they settle. The reader watches two regions swing to
opposite poles, three spread into a triangle, four fall into a tetrahedron,
five separate into an axial pair and an equatorial three, and six square
themselves into an octahedron, with the angle between the two nearest regions
read out as it grows and settles.

- *What the reader sees that print cannot.* Figure 7.16 states the five
  answers; this shows where they come from. The whole of VSEPR theory is the
  claim that the regions arrange themselves to maximize their separation, and
  a reader who has watched the separation grow to its largest value has seen
  the theory work rather than been told its results. It also makes the fifth
  case honest: the trigonal bipyramid is the one arrangement in which the
  positions are not all equivalent, and that shows up here as two of the five
  settling closer together than the other three.
- *Sliders.* The number of regions of electron density, two to six; the
  proportion of them that are lone pairs, zero to three, drawn as the larger
  clouds the section's size order calls for; the projection's yaw and pitch.
  All four are untyped and in ink.
- *Motion.* It moves. The regions travel and the separation angle grows as a
  clock runs, so the figure registers a cycle and carries the app's transport,
  with a stop that returns the regions to their scattered start.
- *Projection.* Yes. This is the figure the projection exists for.
- *Number.* None. It replaces nothing in the book and is a Sim.

### The book's spatial figures, and what they become

These are the section plan's to settle in detail; the reading here is what the
prep recommends.

- **Figures 7.16, 7.19 and 7.20 fold into one interactive Figure**, the
  VSEPR bench: a central atom whose bonding regions and lone pairs the reader
  sets, drawn as a rotatable solid with the atoms in the element palette and
  the lone pairs as clouds, with the bond angles measured on the drawing and
  the electron-pair geometry and the molecular structure named beneath it.
  Figure 7.16 is the electron-pair geometries, 7.19 is the molecular
  structures that follow from them, and 7.20 is the axial and equatorial
  distinction within one of them; they are three printings of the same object
  and one figure that draws it shows all three. Its eyebrow reads "Figure 7.16
  + 7.19 + 7.20", it carries all three images as its `originals`, and every
  one of the three numbers in the prose links to it. Still: the arrangement
  answers the sliders and has no clock in it. The projection's yaw and pitch
  are its other two sliders.
- **Figures 7.26 and 7.27 fold into one interactive Figure**, the bond-moment
  bench: a molecule whose shape and whose electronegativity difference on each
  bond the reader sets, with each bond moment drawn as a vector whose length
  follows the difference and the molecular dipole drawn as their sum. Figure
  7.26 is one bond's vector and 7.27 is the sum over a molecule; the second
  is the first added up, and one figure that draws both shows why CO2 is
  nonpolar and water is not. Still: nothing in a vector sum takes time.
- **Figure 7.28 is an interactive Figure of its own and it moves.** Molecules
  tumbling at random in a liquid, and then, when the reader switches the field
  on, turning until their positive ends face the negative plate. The book
  draws the before and the after; the turning is the thing, and it has a clock
  in it, so this figure registers a cycle and carries the transport.
- **Figure 7.14 is an interactive Figure**, still: formaldehyde with its bond
  angle and its bond length measured on the drawing, which is what the
  section's first two definitions are about.
- **Figures 7.15, 7.17, 7.18 and 7.21 to 7.25 state fixed arrangements** and
  are redrawn faithfully as still Figures with the book's numbers, each one
  the molecule the passage or the worked example is about. Figure 7.17 keeps
  the book's wedge and dash notation, which the caption explains, and Figures
  7.18, 7.23, 7.24 and 7.25 keep the book's panels (a), (b) and (c).

### What was considered and rejected

- *A glycine bench for Example 7.16*, turning the whole amino acid and naming
  the local geometry of each interior atom as the reader points at it. It
  would only animate what the book's own three-dimensional sketch already
  shows, and the example's lesson is that a multicentre molecule is handled
  one centre at a time, which is a reading skill rather than a spatial one.
- *A Lewis-structure builder* to carry step 1 of the procedure. It belongs to
  7.3, which is not built, and putting it here would make 7.6 teach the
  previous section's skill.
- *An electronegativity table the reader hovers.* That is Figure 7.6, in 7.2,
  and 7.6 uses the difference rather than the table.
