# Exploration: Chemistry 2e (OpenStax), the full-book pass

Written 2026-09-12, before any section was converted for building. The
source of record is the CNXML bundle at `source/osbooks-chemistry-bundle/`
(a shallow clone of github.com/openstax/osbooks-chemistry-bundle,
gitignored); no PDF of the book has been downloaded, and none is needed,
since every piece of apparatus sits inside its module. The bundle holds
two books that share modules, Chemistry 2e (`collections/chemistry-2e.collection.xml`,
collection id col26069) and Chemistry: Atoms First 2e; only the first is
built, and the second is ignored.

What was read in full: the Preface; the introduction and every section of
Chapters 1, 2 and 4; the introduction and two sections each of Chapters 6,
7, 9, 13, 14, 16, 17, 20 and 21; the introduction of every other chapter;
and the head of every appendix. The section titles of every chapter were
read from the collection. The modules were converted for reading with the
physics book's `cnxml2md.py`, since the shared converter had not yet moved
to `omnistax-content/tools/` when this pass ran, and the raw CNXML was read
wherever that converter lost something (the list is at the end).

## The organising units

book → chapters (21) → sections (numbered N.M) → titled narrative headers
(two levels deep in places: "Electronegativity" over "Electronegativity
versus Electron Affinity") → worked examples. One CNXML module is one
section, and a chapter is a `<col:subcollection>` of the collection whose
first module is an unnumbered Introduction. The book opens on a Preface
and closes on thirteen appendices, all of them top-level modules outside
any chapter. It prints no chapter summary and no closing summary of its
own.

This maps onto the working format without any folding: one module, one
section, one page; the chapter introduction is the chapter's own `intro/`
page, first in its folder (root rule 21); the Preface (m68662, slug
`preface`) is the book's own `intro/` page, listed before Chapter 1. The
appendices are not chapters and not sections; what they are, and where
they go, is decided under "Front matter and appendices" below. Nothing is
thin enough to tempt a fold: the shortest section, 13.1 Chemical
Equilibria, still has three figures, five exercises and a glossary.

The 149 modules of the collection are the Preface, 21 introductions, 114
sections and 13 appendices. The chapters, with their ids and the number
of sections each:

| Id | Chapter | Sections |
|---|---|---|
| ch01 | Essential Ideas | 6 |
| ch02 | Atoms, Molecules, and Ions | 7 |
| ch03 | Composition of Substances and Solutions | 4 |
| ch04 | Stoichiometry of Chemical Reactions | 5 |
| ch05 | Thermochemistry | 3 |
| ch06 | Electronic Structure and Periodic Properties of Elements | 5 |
| ch07 | Chemical Bonding and Molecular Geometry | 6 |
| ch08 | Advanced Theories of Covalent Bonding | 4 |
| ch09 | Gases | 6 |
| ch10 | Liquids and Solids | 6 |
| ch11 | Solutions and Colloids | 5 |
| ch12 | Kinetics | 7 |
| ch13 | Fundamental Equilibrium Concepts | 4 |
| ch14 | Acid-Base Equilibria | 7 |
| ch15 | Equilibria of Other Reaction Classes | 3 |
| ch16 | Thermodynamics | 4 |
| ch17 | Electrochemistry | 7 |
| ch18 | Representative Metals, Metalloids, and Nonmetals | 12 |
| ch19 | Transition Metals and Coordination Chemistry | 3 |
| ch20 | Organic Chemistry | 4 |
| ch21 | Nuclear Chemistry | 6 |

The module ids and titles of every section are in `toc.md` and
`modules.json`, which the converter pass writes.

## Where the apparatus sits

Everything is inside the module, in this order:

- **Learning objectives** are the module's `<md:abstract>`: a paragraph
  "By the end of this section, you will be able to:" and a `<list>` of
  three to five items. The physics converter drops the abstract; the
  chemistry converter has to read it, since it is the only place the
  objectives are printed.
- **The narrative**, with `<term>` for a defined word, `<equation>`
  (MathML, almost all of it `<m:mtext>` chemical formulas rather than
  algebra), `<figure>` with a caption, bare `<media>` for an unnumbered
  inline image, `<table>` with a `<title>`, `<note>` in four classes, and
  `<footnote>`.
- **Worked examples** are `<example>` elements, numbered on openstax.org
  as Example N.M. Their inner structure is fixed: a titled first
  paragraph that states the problem (the title is the example's name,
  "Calculation of Density"), a paragraph titled "Solution" with the
  working, and a paragraph titled "Check Your Learning" that poses a
  parallel problem, followed by a `<note>` titled "Answer:" that carries
  its answer. Every Check Your Learning carries its answer. There is no
  "Strategy" or "Discussion" paragraph as in the physics book; a few
  examples (1.4's water-displacement one, 2.2's Rutherford ones) are
  instructions to use a PhET simulation rather than problems. The book
  has 301 examples and 293 Check Your Learning items over the 114
  sections.
- **The section summary** is a `<section class="summary">` titled "Key
  Concepts and Summary", one to three paragraphs of the book's own
  prose, present in every section.
- **Key Equations** is a `<section class="key-equations">` holding a
  one-column unstyled table, one equation per row, present in 51 of the
  114 sections (none in Chapter 18, 19 or 20). This is the book's own
  formula sheet and feeds `chapter.json`'s equations table directly.
- **End-of-chapter exercises** are a `<section class="exercises">` titled
  "Chemistry End of Chapter Exercises" inside each module: the book
  aggregates nothing at the end of the chapter in CNXML, whatever the
  print edition does. Every `<exercise>` is untyped (no `type`
  attribute), and the module gives no other heading to sort them by. A
  keyed exercise carries its `<solution>` inline.
- **The glossary** is a `<glossary>` of `<definition>` elements at the end
  of the module, 766 over the book.

There is no AP test prep, no boxed strategy, no problem-solving box.

### The answer key

The Preface says it: "Odd-numbered Exercises are provided to students in
the Answer Key". The count over the whole book is 873 keyed of 1736
exercises, and in every chapter it is the odd-numbered items of each
section's list. Over the chapters read in full: Chapter 1, 50 of 99
(1.1: 4 of 7; 1.2: 9 of 17; 1.3: 4 of 8; 1.4: 5 of 10; 1.5: 7 of 13; 1.6:
21 of 44); Chapter 2, 31 of 61; Chapter 4, 48 of 95. Some keyed answers
are not answers: "Answers will vary. Sample answer: …" (1.2's list of
commercial products), and the solutions that describe a PhET run (2.3's
Build an Atom items) only make sense beside the simulation. Neither is
to be turned into a graded answer. A conceptual exercise is keyed as
often as a numerical one, since the key runs by position, so the
Exercises document will carry the book's own answer to half the
conceptual questions and an AI-marked approach to the other half.

### The note kinds

Four classes of `<note>`, counted over the book:

| Class | Count | Shape | What it should become |
|---|---|---|---|
| `link-to-learning` | 95 | One or two sentences with a link through openstax.org/l/… to a video, a PhET simulation (28 of the links), an interactive periodic table or a data site | Not a note on the page. Where the link is a simulation of an idea the section teaches, it is the trigger for a Sim of our own and the link is left out and named in `notes`; where it is a video or a data site, the link is left out and named in `notes`, as the physics book does with PhET |
| `everyday-life` | 44 | A titled box of two to six paragraphs, often with its own figure ("Chemistry in Everyday Life: Hazard Diamond", "Breathing and Boyle's Law") | Kept verbatim in the text as a titled aside (`aside.book-note` with the book's title as its eyebrow), with its figure treated as any figure |
| `sciences-interconnect` | 19 | The same shape ("How Sciences Interconnect: Green Chemistry and Atom Economy") | Kept verbatim, the same treatment |
| `chemist-portrait` | 10 | A titled biography with a photograph ("Portrait of a Chemist: Paula Hammond") | Kept verbatim, the same treatment; the portrait photograph is kept, since it is the point of the box |

The untitled `<note>` "Answer:" inside an example is not a note kind; it
is the Check Your Learning key. The 1.5 significant-figure boxes and the
4.2 solubility rules are tables and prose, not notes.

### Tables

191 `<table>` elements, numbered chapter-wide on openstax.org (Table
1.1 is the SI base units); a few are unnumbered and unstyled (the Key
Equations table, the atom-count tables in 4.1's balancing walkthrough).
Chapter 12 has 37, most of them data for the rate-law examples. The
converter flattens a spanned header; where a table matters (the
polyatomic ions of 2.6, the solubility rules of 4.2, the pressure units
of 9.1) it is written from the CNXML by hand, as the physics book does.
A table stays in the text as a `div.book-table` with the book's number
as its eyebrow.

### Footnotes

`<footnote>` elements sit inline in the prose and in table cells (the
kilogram's redefinition in 1.4, the IUPAC definition of group 12 in 2.5,
the pound as a unit of weight in 1.6's conversion table, the two
citations at the head of 20.1). The physics converter glues the footnote
text into the sentence; the chemistry converter has to set it apart.

## Front matter and appendices

The Preface (m68662) is what the physics Preface is: "About OpenStax",
the licence, the pedagogical features (Chemistry in Everyday Life, How
Sciences Interconnect, Portrait of a Chemist, Link to Learning, Examples
with Check Your Learning), the answer-key policy, and the authors. It is
the book's `intro/` page by root rule 21 and is built as the physics one
was. Its one useful fact for the tables is the author list, confirmed
against openstax.org: senior contributing authors Paul Flowers
(University of North Carolina at Pembroke), Klaus Theopold (University of
Delaware), Richard Langley (Stephen F. Austin State University) and
William R. Robinson, PhD; fourteen contributing authors follow, whom the
footer does not name.

The thirteen appendices, with what each is and whether the app wants it:

| Appendix | Module | What it is | Wanted as |
|---|---|---|---|
| A The Periodic Table | m68859 | One image of the table and a link to accessible tables | The periodic table sheet, above all: an interactive table the app serves everywhere, built from data, not from the image |
| B Essential Mathematics | m68860 | Prose with examples: exponential arithmetic, significant figures, logarithms, quadratic equations, graphs | A reference page of its own; not a sheet of numbers |
| C Units and Conversion Factors | m68861 | Four tables: length, volume, mass, energy, pressure | The units table |
| D Fundamental Physical Constants | m68862 | One table: amu, Avogadro's number, Boltzmann's constant, e, m_e, F, R, h, c, and the rest | The constants sheet |
| E Water Properties | m68863 | Density, vapour pressure, K_w against temperature, plus phase-diagram data | A data sheet the equilibrium and phase chapters read |
| F Composition of Commercial Acids and Bases | m68864 | One small table | A data sheet |
| G Standard Thermodynamic Properties | m68865 | ΔH°_f, ΔG°_f, S°_298 for a few hundred substances | A data sheet the thermochemistry and thermodynamics figures read |
| H Ionization Constants of Weak Acids | m68866 | K_a with Lewis structures | A data sheet |
| I Ionization Constants of Weak Bases | m68867 | K_b with Lewis structures | A data sheet |
| J Solubility Products | m68868 | K_sp | A data sheet |
| K Formation Constants for Complex Ions | m68869 | K_f | A data sheet |
| L Standard Electrode (Half-Cell) Potentials | m68870 | E° | A data sheet the galvanic-cell figures read |
| M Half-Lives for Several Radioactive Isotopes | m68871 | Half-lives and decay modes | A data sheet the decay figures read |

The decision, recorded in `RULES.md`: the appendices are reference
sheets, not pages, since the working format has no place for a module
that is neither a chapter nor a section and the reader wants them beside
every page rather than at the end of the book. The app serves them as
sheets the way it serves the formula sheet; the data lives in
`sheets/<id>.json` under this folder, one file per appendix, written
from the CNXML tables by a tool of this book. The periodic table is the
first sheet and the one every chapter from 1.3 on refers to. Appendix B
is prose and is the one exception: it is a page, converted as a section
is, listed nowhere in the chapters. Until the app has sheets, a
cross-reference to an appendix points at the publisher's page, as the
physics book's Appendix C reference does.

## The figure conventions

Figures are numbered chapter-wide on openstax.org, and the chapter
opener's photograph is Figure N.1, so Chapter 1's first section figure is
1.2. There are 627 `<figure>` elements in the book, and 529 bare
`<media>` elements that print an image with no number and no caption:
a Lewis structure in the running text, a reaction scheme drawn as a
picture, the two graduated cylinders of 1.5's rebar example, the archery
targets an exercise refers to, the conjugate-pair diagrams of 14.1. They
are heaviest where the book draws molecules (131 in Chapter 7, 110 in
Chapter 20), and they are content, not decoration: 14.1's explanation of
conjugate pairs and 20.1's naming examples are unreadable without them.
The physics converter drops every bare `<media>`; the chemistry converter
must keep them as unnumbered figure blocks, and the section plan must
decide each one (a Lewis structure is redrawn live or copied; an
exercise's diagram is copied faithfully by root rule 14).

Every chapter opens on a splash photograph with a caption and credit; it
is the point of the introduction page and is kept. Inside sections the
photographs are of three kinds: the thing the passage is about (mercury
oxide decomposing, lead iodide precipitating, copper wire in silver
nitrate, the bromine tube), which are kept; portraits in the chemist
boxes, kept; and stock scenes beside an example or a note (a sapphire
ring, a scuba diver, a match, cell towers), dropped unless the text
points the reader at them.

The book's molecular drawings follow one atom palette, stated in the
captions and alt texts rather than in a key: carbon black, hydrogen
white, oxygen red, nitrogen blue, chlorine green, sulfur yellow,
phosphorus orange, copper brown, sodium purple, titanium gray. It is the
conventional CPK colouring, and the plan for it is in `COLOR.md`. Ball-and-
stick and space-filling models are drawn side by side with the Lewis
structure (2.4's methane, 20.1's alkanes), so a figure that replaces one
of these has three representations to carry. Chapter 6's spectra and
blackbody curves use the visible spectrum as their colour, which no
scheme should override.

Images carry no `width` attribute in this bundle (the physics bundle's
do), so `widths` stays empty and the app shows each image at its natural
size, capped by the viewport rule.

## Outside the book

The book links out only through openstax.org/l/… redirects (140 links),
plus one to OER Commons in the Preface and one to a gemstone density
guide in a 1.4 exercise. Twenty-eight of the redirects are PhET
simulations (density, Rutherford scattering, Build an Atom, Isotopes and
Atomic Mass, Build a Molecule, the ideal gas, the photoelectric effect,
states of matter and more); the rest are videos, IUPAC's periodic table,
and data sites. Nothing is resolved locally; every link is left out of
the page and named in `notes`, and the PhET ones are the seed list for
the Sims below. The book cross-references itself with `<link
document="mNNNNN">` (to another section, to an appendix) and `<link
target-id>` (to a figure, table, example or exercise in the same
module); the converter renders the first as a module link and the second
as `[ref:id]`.

## What would make chemistry open up

Root rule 23 asks the question before any rule is written: what would
make an intuitive and stunning learning experience for this book? The
honest answer is that chemistry, more than physics, is taught through
pictures of things that cannot be seen, and print can show only one
frame of each. The three domains of 1.1 (macroscopic, microscopic,
symbolic) are the book's own frame for it, and the figures that will
matter most are the ones that show two domains at once: a beaker and
the molecules in it, an equation and the atoms it counts. Every Sim
below is judged by that.

What the app can draw. `figlib.ts` is a planar canvas layer: lines,
arrows, dots, text, brackets, axes and curves in a fixed 1400-unit
space, with sliders bound to types and a transport for figures that
move. It can draw a beaker, a particle box, a titration curve, an energy
ladder, a periodic-table grid, a Lewis structure and a cell with
electrons running round a wire. It cannot rotate a molecule. The app
does load three.js on every page (`omnistax.config.ts` names
`/vendor/three.min.js`, r128, as a global `THREE`, and two physics
figures use it: the braking car of 2.5 and the gravity figure of 6.5),
so a 3D figure is possible where the idea is spatial, at the cost of
writing it against `THREE` directly rather than through `figlib`. The
list marks which figures need it. They are few: molecular geometry
(7.6), hybrid orbitals (8.2), and crystal lattices (10.6).

1. **Essential Ideas.** A beaker whose contents the reader can heat and
   cool, drawn twice on one canvas: the liquid line rising and falling
   above, the molecules crowding, sliding and flying apart below, with
   the formula H₂O(l) → H₂O(g) written between them as the phase changes.
   That is 1.1's three domains in one picture. For 1.4 and 1.6, a
   cube the reader sizes with a slider while a balance reads its mass
   and a readout writes density = mass/volume with the live numbers; for
   1.5, a graduated cylinder whose meniscus the reader sets and a
   magnifier over the estimated digit, and an archery target that
   scatters as accuracy and precision are turned separately. All planar.
2. **Atoms, Molecules, and Ions.** Rutherford's foil: alpha particles
   fired at a lattice of gold atoms whose nucleus size the reader sets,
   with the deflection count accumulating on a ring, so the reader sees
   why almost all pass through and one in thousands comes back. A build-
   an-atom bench: protons, neutrons and electrons dragged onto a nucleus
   while the symbol ᴬ_ZX^q, the mass number and the stability read out.
   A mass spectrum that grows peak by peak as isotopes are added, with
   the average atomic mass computed under it. Chapter 2.5 is where the
   periodic table sheet first appears: hover an element for its number,
   mass, group name and state, with metals, metalloids and nonmetals
   shaded as the book shades them. All planar.
3. **Composition of Substances and Solutions.** The mole made visible: a
   slider for the number of particles that runs from one molecule to
   6.022 × 10²³, with the mass on a balance and the volume of gas beside
   it, so the reader feels how a count becomes a gram. A solution figure
   where solute is dropped into a beaker and molarity, mass percent and
   ppm read out together, and dilution drawn as water added to the same
   beaker while M₁V₁ = M₂V₂ stays true. Planar.
4. **Stoichiometry of Chemical Reactions.** A reaction drawn as a
   particle box: the reader sets the number of H₂ and Cl₂ molecules,
   presses play, and molecules pair off until one kind runs out, with
   the leftover counted, which is the limiting reactant without a word
   of algebra. A balancing bench where the coefficients are sliders and
   an atom tally under the equation turns green element by element. A
   titration the reader runs: a buret drips, the indicator turns at the
   equivalence point, and the curve draws itself (planar; the full pH
   curve waits for Chapter 14).
5. **Thermochemistry.** A calorimeter with two liquids at two
   temperatures poured together, a thermometer settling, and the heat
   flow drawn as a bar that leaves one and enters the other with q read
   out; an enthalpy diagram where the reader stacks Hess's law steps and
   watches the arrows add to the overall ΔH. Planar.
6. **Electronic Structure and Periodic Properties.** The Bohr ladder:
   energy levels drawn to scale, the reader picks n_i and n_f, the
   electron jumps and a photon of the right colour leaves, landing as a
   line on a spectrum strip beneath; this one figure carries 6.1's line
   spectra and 6.2's model. Blackbody curves that shift as the
   temperature slider moves, with the visible band painted. Orbitals
   filling one electron at a time in an aufbau diagram while the
   periodic table lights up the block, so the reader sees the table's
   shape come from the filling order (6.4). Periodic trends as the
   table itself coloured by radius, ionization energy or
   electronegativity, hovered for the number (6.5). The orbital shapes
   of 6.3 are the one thing here that wants 3D; a planar cross-section
   with the nodes drawn is the honest fallback.
7. **Chemical Bonding and Molecular Geometry.** Two atoms the reader
   pulls apart and pushes together while the potential-energy curve of
   7.2 is traced under them, with the bond length at the well. A Lewis-
   structure bench: valence electrons counted, dots placed, formal
   charges read out, resonance forms flipped (7.3, 7.4). Molecular
   geometry (7.6) is the chapter's reason for 3D: a central atom with
   electron domains the reader adds one at a time, the shape settling
   into linear, trigonal planar, tetrahedral, and the molecule
   rotatable; a planar drawing can show the names but not the angles.
8. **Advanced Theories of Covalent Bonding.** Orbital overlap as two
   lobes sliding into each other (sigma head-on, pi sideways), planar;
   hybrid orbitals in 3D as in Chapter 7. A molecular-orbital diagram
   the reader fills electron by electron for O₂ and N₂, with bond order
   and magnetism read out, which explains the liquid oxygen of the
   chapter opener.
9. **Gases.** The chapter the app was made for: a box of particles with
   sliders for pressure, volume, temperature and amount, the walls
   moving, the particles speeding up as they warm, a pressure gauge
   reading their collisions, and each of the four laws shown by holding
   two sliders still; the Maxwell-Boltzmann curve beneath it reshaping as
   the temperature moves (9.2, 9.5). A barometer and manometer whose
   mercury column follows the pressure (9.1). Effusion as two gases
   racing through a pinhole at rates in the ratio of their root masses
   (9.4). A van der Waals correction that bends the ideal line as
   pressure rises (9.6). All planar, and all moving.
10. **Liquids and Solids.** A phase diagram the reader walks across with
    a point, the beaker beside it showing the state and the boundary
    crossings named. A vapour-pressure figure where molecules escape a
    liquid surface faster as it warms and the curve rises to 1 atm at
    the boiling point. Unit cells (10.6) want 3D: a cube of spheres the
    reader turns, with the atoms per cell counted as the corners,
    faces and body are clicked.
11. **Solutions and Colloids.** Dissolution as ions leaving a lattice
    and being surrounded by water molecules oriented by charge (planar).
    Colligative properties as one picture: a solvent's vapour-pressure
    curve lowered as solute is added, with the freezing and boiling
    points moving on the axis. Henry's law as gas above a liquid at a
    pressure the reader sets.
12. **Kinetics.** Concentration against time with the rate as the
    slope drawn at a point the reader drags, and the order as the
    curve's shape; the integrated rate laws as the same data
    replotted (ln[A], 1/[A]) until one is a line. A collision box where
    temperature and an activation-energy bar decide which collisions
    react, with the Arrhenius plot beside it. A reaction-coordinate
    diagram whose hill a catalyst lowers.
13. **Fundamental Equilibrium Concepts.** Q climbing toward K as
    reactants become products in a particle box, both plotted against
    time; a Le Châtelier bench where the reader adds reactant, removes
    product, compresses or heats, and watches the composition shift and
    settle. This is the chapter where "push an equilibrium" is the
    whole lesson, and it is planar.
14. **Acid-Base Equilibria.** A titration the reader runs to the end,
    the pH curve drawing itself, the buffer region flat, the
    equivalence point steep, the indicator's colour band overlaid to
    show why one dye works and another does not (14.7). The pH scale as
    a slider with [H₃O⁺] and [OH⁻] read out in counts of ions per
    billion water molecules. A weak acid's ionization drawn as the
    fraction of molecules that have given up a proton at a given K_a.
15. **Equilibria of Other Reaction Classes.** A saturated solution where
    ions leave and return to the solid at equal rates, K_sp read from
    the concentrations; the common-ion effect as more of one ion added
    and the solid growing. Planar.
16. **Thermodynamics.** Microstates counted live: four particles in two
    boxes, then six, then more, with the most probable distribution
    winning as the count grows (16.2). A ΔG = ΔH − TΔS figure where
    temperature is the slider and the sign of ΔG flips at the
    crossing, with the reaction drawn as spontaneous or not. Planar.
17. **Electrochemistry.** A galvanic cell the reader can watch work:
    electrons crossing the wire, the anode thinning and the cathode
    thickening, ions crossing the salt bridge, the voltmeter reading
    E°_cell from the two half-cell potentials the reader picks from
    the standard-potential sheet (17.2, 17.3). The Nernst equation as
    the same cell with concentrations the reader changes. Electrolysis
    as the cell run backwards with a battery. Planar, and the chapter's
    best figure.
18. **Representative Metals, Metalloids, and Nonmetals.** A descriptive
    chapter with twelve sections and no worked examples. What opens it
    up is the periodic table sheet again, filtered: the reader picks a
    group and the table highlights it while the section's compounds and
    reactions are listed beside. Few Sims, many kept photographs.
19. **Transition Metals and Coordination Chemistry.** Crystal-field
    splitting as an energy diagram whose gap the reader sets, with the
    complex's colour computed as the complement of the light absorbed
    (19.3), which explains the chapter opener's minerals. Coordination
    geometries want 3D as Chapter 7 does.
20. **Organic Chemistry.** A structure bench: the skeletal, condensed
    and expanded formulas of one molecule drawn together and updated as
    the reader adds a carbon or moves a substituent, with the IUPAC name
    read out; cis and trans as a double bond that cannot turn while a
    single bond beside it can. Planar; ball-and-stick would be nicer in
    3D but the naming lesson does not need it.
21. **Nuclear Chemistry.** The band of stability as a chart the reader
    hovers, with decay modes coloured; a decay figure where a sample of
    N nuclei decays at random and the half-life is read from the curve
    (21.3); a binding-energy-per-nucleon curve with fission and fusion
    arrows; a decay chain stepping from U-238 to Pb-206. Planar.

The figures that should not be built: animations of a reaction
mechanism that only replay the book's arrows, and molecule viewers for
molecules the section only names. A Sim earns its place by showing a
domain the print cannot (root rule 15).

## What the converter loses

Read against the raw CNXML, the physics `cnxml2md.py` loses these for
chemistry, listed for the converter pass:

- the learning objectives in `<md:abstract>`;
- every bare `<media>` (529 in the book): the image is dropped and the
  sentence that introduced it ("with results as shown") is left hanging;
- an `<equation>` inside a `<note>`, so a Check Your Learning whose
  answer is an equation (4.1's balanced equations, 4.2's net ionic
  equation) comes out as an empty "Answer:";
- an `<equation>` or `<media>` inside a list item or an exercise
  sub-part, so "(f)" in 4.3's exercise list and "(a) (b) (c)" in 20.2's
  naming exercises are empty;
- `<footnote>` text, which is glued into the sentence;
- a nested `<list>` inside a numbered item, which is emitted twice
  (4.2's oxidation-number guideline 3);
- a table's spanned header and its title row, flattened into one pipe
  row; and the `<title>` of a `<note>` box, which is kept but its class
  ("chemistry everyday-life") is emitted as a bracket rather than as a
  named kind.

Everything else it does well: the terms, the module and target links,
the examples with their Check Your Learning and answer, the exercises
with their solutions, the glossary and the section summary.
