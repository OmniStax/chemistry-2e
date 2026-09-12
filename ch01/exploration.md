# Exploration: Chemistry 2e, Chapter 1 Essential Ideas

Written 2026-09-12, before the chapter was prepared. The source of record is
the CNXML bundle at `source/osbooks-chemistry-bundle/`; the seven modules of
the chapter were converted with `python3 tools/convert.py 1` and read in full,
together with the Preface. The book's organisation, its apparatus and its
conventions are as `exploration.md` beside `RULES.md` records them for the
whole book; nothing in this chapter departs from that account.

## Why this chapter

It is the book's first, and it is the chapter the rest of the book measures
with. Six sections take the reader from what chemistry is and how a chemist
argues, through what matter is and how it is sorted, to the properties that
tell one substance from another, and then to the three skills every later
chapter assumes: making a measurement in SI units, reporting it with the
right number of digits, and converting it. Nothing in the chapter is a
reaction; everything in it is a habit. The concept map of the whole book
starts here, and `book.json` carries no concept yet, so every prerequisite
edge this chapter writes falls inside it.

## Chapter 1 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline
images, Eq. = marked display equations, Defs = glossary entries, CYL = Check
Your Learning items (every one keyed), Exer. = end-of-chapter exercises,
Keyed = those carrying the book's own solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68663 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 1.1 Chemistry in Context | m68664 | 0 | 4 (1 photo pair, 2 flowcharts, 1 composite) | 0 | 0 | 0 | 8 | 0 | 7 | 4 | — |
| 1.2 Phases and Classification of Matter | m68667 | 0 | 12 (8 photos, 4 sketches) | 0 | 1 | 1 | 17 | 0 | 18 | 9 | 2 link-to-learning, 2 everyday-life |
| 1.3 Physical and Chemical Properties | m68670 | 0 | 5 (3 photo sets, 2 sketches) | 0 | 0 | 1 | 6 | 0 | 8 | 4 | 1 everyday-life |
| 1.4 Measurements | m68674 | 2 | 3 (1 photo, 2 sketches) | 0 | 4 | 6 | 14 | 2 | 10 | 5 | 2 link-to-learning |
| 1.5 Measurement Uncertainty, Accuracy, and Precision | m68690 | 5 | 2 sketches | 8 | 1 | 3 | 7 | 5 | 13 | 6 | — |
| 1.6 Mathematical Treatment of Measurement Results | m68683 | 5 | 1 sketch | 0 | 2 | 31 | 5 | 5 | 43 | 22 | — |

Ninety-nine exercises, fifty of them keyed, which is the odd-numbered half of
the book's own list as the Preface promises; the parity runs over the
publisher's chapter-wide numbering, so it is not the odd-numbered item of each
section's list that carries the answer. Twelve Check Your Learning items, all
of them keyed, and none before 1.4: the first three sections are qualitative
and set no worked example at all. Fifty-seven glossary entries. The four
tables of 1.4 are two numbered data tables, one numbered prefix table and the
unnumbered Key Equations table; 1.6's two are Table 1.6 and its own Key
Equations table.

## The figure numbers

The book numbers figures chapter-wide on openstax.org, beginning with the
introduction's splash photograph as Figure 1.1, and it numbers a figure that
sits inside a boxed note or a worked example while leaving a figure inside an
exercise unnumbered. Applying that rule to the CNXML gives the twenty-eight
numbers below, and the reading was checked against the publisher's own pages
for 1.2 (Figures 1.6 to 1.17 and Table 1.1), 1.3 (1.18 to 1.22), 1.5 (1.26,
1.27 and Table 1.5) and 1.6 (1.28 and Table 1.6); it agrees in every case.

| Section | Number | CNXML id | What it is |
|---|---|---|---|
| Intro | 1.1 | CNX_Chem_01_00_DailyChem | photo collage: coffee, soap, remote, gas pump |
| 1.1 | 1.2 | CNX_Chem_01_01_Alchemist | photos: an alchemist's workshop, Alma Levant Hayden in 1952 |
| 1.1 | 1.3 | CNX_Chem_01_01_ChemWeb | flowchart: chemistry among the other sciences |
| 1.1 | 1.4 | CNX_Chem_01_01_SciMethod | flowchart: the scientific method |
| 1.1 | 1.5 | CNX_Chem_01_01_WaterDom | iceberg photo beside molecular pictures of the three phases |
| 1.2 | 1.6 | CNX_Chem_01_02_StatesMatt | sketch: three beakers, solid, liquid, gas |
| 1.2 | 1.7 | CNX_Chem_01_02_Plasma | photo: a plasma cutting torch |
| 1.2 | 1.8 | CNX_Chem_01_02_ConsMatter | sketch: the beer bottle and the car battery |
| 1.2 | 1.9 | CNX_Chem_01_02_decomp | photos: mercury(II) oxide decomposing in three frames |
| 1.2 | 1.10 | CNX_Chem_01_02_Mixtures | photos: salad dressing and a sports drink, each magnified |
| 1.2 | 1.11 | CNX_Chem_01_02_MattType | flowchart: classifying matter |
| 1.2 | 1.12 | CNX_Chem_01_02_GoldAtoms | photos: a gold nugget and an STM image of gold atoms |
| 1.2 | 1.13 | CNX_Chem_01_02_Cellulose | photos and models: cotton from boll to molecule |
| 1.2 | 1.14 | CNX_Chem_01_02_Molecules | sketch: ball models of H2, O2, P4, S8, water, CO2, glucose |
| 1.2 | 1.15 | CNX_Chem_01_01_Electrolys | sketch in a note: water decomposed over a battery |
| 1.2 | 1.16 | CNX_Chem_01_01_FuelCell | sketch in a note: a proton-exchange fuel cell |
| 1.2 | 1.17 | CNX_Chem_01_02_CellPhone | labelled photo in a note: what a phone is made of |
| 1.3 | 1.18 | CNX_Chem_01_03_PhysChange | photos: wax melting, steam condensing |
| 1.3 | 1.19 | CNX_Chem_01_03_Rust | photos: rusted iron, unrusted chromium |
| 1.3 | 1.20 | CNX_Chem_01_03_ChemChange | photos: copper in nitric acid, a match, meat, a banana |
| 1.3 | 1.21 | CNX_Chem_01_03_HazDiamond | sketch in a note: the NFPA hazard diamond |
| 1.3 | 1.22 | CNX_Chem_01_03_PeriodicPU | the periodic table, shaded by metal, metalloid, nonmetal |
| 1.4 | 1.23 | CNX_Chem_01_04_MYdCmIn | sketch: a metre beside a yard, a centimetre beside an inch |
| 1.4 | 1.24 | CNX_Chem_01_04_Kilogram | photo: the prototype kilogram at NIST |
| 1.4 | 1.25 | CNX_Chem_01_04_Volume | sketch: the cubic metre, the litre and the millilitre nested |
| 1.5 | 1.26 | fs-idm337865984 (CNX_Chem_01_05_Measure) | sketch: a graduated cylinder with the meniscus magnified |
| 1.5 | 1.27 | fs-idm1827280 (CNX_Chem_01_05_Archery) | sketch: three archery targets, accuracy against precision |
| 1.6 | 1.28 | CNX_Chem_01_06_TempScales | sketch: the Fahrenheit, Celsius and kelvin thermometers |

The eight unnumbered inline images are all in 1.5, and every one of them is
content the page cannot do without:

| Id | File | What it shows |
|---|---|---|
| fs-idm244068192 | CNX_Chem_01_05_SigDigits5_img | leading, captive and trailing zeros named on 3090 and 0.008020 |
| fs-idp40720144 | CNX_Chem_01_05_SigDigits1_img | counting from the first nonzero digit: 1267 m, 55.0 g |
| fs-idm113793344 | CNX_Chem_01_05_SigDigits2_img | captive and leading zeros: 70.607 mL, 0.00832407 mL |
| fs-idp29412624 | CNX_Chem_01_05_SigDigits3_img | the ambiguity of 1300 g |
| fs-idm330284704 | CNX_Chem_01_05_SigDigits4_img | the two addition and subtraction sums set out in columns |
| fs-idm332426528 | CNX_Chem_01_04_CylRebar | the rebar example's two cylinder readings, 13.5 and 22.4 mL |
| fs-idm283007920 | CNX_Chem_01_04_CylGold | the gold-coloured rock's readings, 17.1 and 19.8 mL |
| fs-idp94481888 | CNX_Chem_01_05_Archer2_img | the four archers an exercise asks the reader to judge |

The last two of these carry `01_04` in their file names although they are
printed in the 1.5 module; the bundle's file names are kept as they are when
the images are copied into `media/ch01/`.

## The tables, in the book's order

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 1.1 | 1.2 | fs-idp31507504 | Elemental Composition of Earth |
| Table 1.2 | 1.4 | fs-idm81346144 | Base Units of the SI System |
| Table 1.3 | 1.4 | fs-idm81128320 | Common Unit Prefixes |
| Table 1.4 | 1.4 | fs-idm45639696 | Densities of Common Substances |
| Table 1.5 | 1.5 | fs-idp31780400 | Volume (mL) of Cough Medicine Delivered by 10-oz (296 mL) Dispensers |
| Table 1.6 | 1.6 | fs-idm222237232 | Common Conversion Factors |

Each stays in the running text as a `div.book-table` with that number as its
eyebrow and the book's own title as its caption. Two further tables carry no
number: the unnumbered one-column Key Equations tables of 1.4 and 1.6, which
are the book's own formula sheet and go to `chapter.json`'s equations rather
than into the text. Table 1.3 prints a footnote-free prefix column but Table
1.6 carries a footnote on the pound, which the converter has set apart and
which the 1.6 page keeps with the table.

## The Link to Learning notes and the PhET items

Five Link to Learning notes in the chapter, none of them kept. Each section
that has one names it in `notes`, one plain sentence:

| Section | Redirect | What it pointed at |
|---|---|---|
| 1.2 | openstax.org/l/16plasma | a video on plasma and where it is met |
| 1.2 | openstax.org/l/16mercury and /l/16silvchloride | the breakdown of mercury oxide, and the photochemical decomposition of silver chloride |
| 1.4 | openstax.org/l/16notation | a refresher on scientific notation |
| 1.4 | openstax.org/l/16phetmasvolden | the PhET density simulation, mass, volume and density with a beaker and a balance |

The PhET density simulation is the only external simulation the chapter
leans on, and it carries four pieces of the book:

- **Example 1.4.2**, "Using Displacement of Water to Determine Density", which
  is not a problem but a set of instructions for running the simulation, with
  its own Check Your Learning ("use the simulator to measure the density of
  the foam sample", answer 0.230 g/mL).
- **Three end-of-chapter exercises of 1.4**: fs-idm165750544 (keyed; the
  unknown green block, answered as malachite against an outside gemstone
  density guide), fs-idm307823136 (unkeyed; the red block against fluid
  densities above and below it) and fs-idm160286704 (keyed; the floating foam
  block and Archimedes' principle).

These four are the chapter's `simulation-exercise` material. A figure of our
own in 1.4 that weighs a block, sinks it in a cylinder and reads the level
carries the first three of them exactly; the buoyancy of the fourth (a fluid
whose density the reader sets, and a block that floats or sinks) is outside
what the section teaches, and that item is held. The decision, and the
rewritten prompts, belong in 1.4's plan.

## Observations that affect the plan

- **The chapter divides cleanly in two.** 1.1 to 1.3 are qualitative: no
  worked example, no equation, no Check Your Learning, and exercises that ask
  the reader to classify and to explain. 1.4 to 1.6 are the measuring
  sections, and they carry every example, every equation and eighty-six of the
  ninety-nine exercises between them. The figures follow the same split: the
  first three sections want pictures that sort and show, the last three want
  instruments the reader can read.
- **Photographs are most of 1.2 and 1.3.** Eight of 1.2's twelve figures and
  three of 1.3's five are photographs, and they are not all decoration. The
  ones the text points the reader at and that show the thing the passage is
  about are the mercury(II) oxide decomposing (1.9), the salad dressing beside
  the sports drink (1.10), the gold nugget beside the STM image (1.12), the
  cotton at five magnifications (1.13), the rusted iron beside the chromium
  (1.19), the four chemical changes (1.20) and the labelled cell phone (1.17).
  The plasma torch (1.7) is a stock scene the text names in passing, and the
  melting wax and condensing steam of 1.18 are stock scenes for a change the
  reader already understands; those two are the candidates for dropping, and
  each section's plan decides its own.
- **Four of the book's sketches are the chapter's live figures.** The three
  beakers of Figure 1.6, the nested cubes and the density table behind Figure
  1.25, the meniscus of Figure 1.26 with the archery targets of Figure 1.27,
  and the three thermometers of Figure 1.28. Each is a picture of one frame of
  something that has a knob on it in life.
- **Two flowcharts are redrawn still, not made live.** Figure 1.4, the
  scientific method, and Figure 1.11, classifying matter, are diagrams of a
  procedure rather than pictures of a quantity; there is nothing in either to
  vary. They are redrawn faithfully so that they read in both themes and so
  that the boxes are legible, and they register no cycle. Figure 1.3, the web
  of sciences around chemistry, is the same kind of thing.
- **The unnumbered images cannot be `photo` rows.** The app's validator
  refuses a `photo` row that carries no number, since such a row's eyebrow has
  nothing to read, and it accepts a `figure` row with no number, whose eyebrow
  reads "Figure". So each of 1.5's eight inline images is kept as a `figure`
  row with no number: a faithful redrawing with no sliders, which is what root
  rule 14 asks for a figure that serves an example or an exercise.
- **Three cross-section references inside the chapter.** 1.5's rebar example
  and its Check Your Learning both send the reader to Table 1.4, the densities
  of common substances, which is printed in 1.4; and 1.6's exercise
  fs-idm101514016 sends the reader to Table 1.2, the base units, also in 1.4.
  Both are named in the book's own words as "Table 1.4" and "Table 1.2", and
  the page does not link them, since a table is not a figure row. Nothing else
  in the chapter refers to a figure or a table outside its own section, and no
  reference crosses out of the chapter except the two to Appendix B (in 1.4
  and 1.5), which point at the publisher's page until the app has that page.
- **No exercise has to be held for a later section.** Every end-of-chapter
  item of a module tests what that module teaches, which is what the book's
  rules predict. Two are worth naming. 1.3's fs-idp121106016 prints the
  definition of density in its own prompt and asks why the ratio of two
  extensive properties is intensive: it tests intensive and extensive
  properties, it is answerable from the prompt alone, and it stays in 1.3.
  1.6's density exercises (fs-idm215857872 and the five that follow it)
  compute with a density the reader met in 1.4: they stay in 1.6, since the
  work in them is the unit arithmetic, and they are tagged to both sections'
  concepts.
- **The periodic table.** Three sentences of the chapter refer to it, all in
  1.3: "These properties can be used to sort the elements into three classes:
  metals ..., nonmetals ..., and metalloids", "The periodic table is a table of
  elements that places elements with similar properties close together", and
  the caption of Figure 1.22, which explains the shading and the symbol
  colours. The app has no sheet mechanism yet, so 1.3 keeps the book's words,
  keeps Figure 1.22 as the book's own image, and names the deferred sheet in
  its `notes`. 1.1 and 1.2 mention the table only inside the definition of the
  symbolic domain.
- **Two symbols collide with the book's own type table, and neither is a
  quantity of that type.** 1.5's bathtub example writes V = l × w × d, where d
  is a depth; 1.6's derivation of the Fahrenheit equation writes y = mx + b,
  where m is a slope and b an intercept. Neither d nor m there is a density or
  a mass, and neither may be written with a typed macro. Both are ink.
- **The chapter introduction is two paragraphs and a collage.** m68663 carries
  the splash photograph, the alarm-clock paragraph and the "why should we
  study chemistry" paragraph, and its CNXML abstract is the chapter's own list
  of section titles rather than a set of objectives, so the converted
  `## Learning Objectives` block of `ch01/intro/source.md` is a table of
  contents and is not kept on the page. The Preface is longer, prints seven
  unnumbered images borrowed from later chapters, and defines no term.

## What a live figure could show in this chapter that print cannot

Root rule 23, answered section by section. The book's own answer to what
makes chemistry hard is in 1.1: a chemist thinks in three domains at once,
and print can show only one of them per frame. Every figure below is judged
by whether it puts two domains on one canvas, or puts a knob on an instrument
the book can only photograph.

1. **1.1 Chemistry in Context.** The one thing print cannot do here is show
   the same substance in two domains at the same time and let the reader move
   between them: a beaker of water the reader warms and cools, with the liquid
   line and the bubbles above and the molecules crowding, sliding and flying
   apart below, and H₂O(s), H₂O(l), H₂O(g) written between the two as the
   state changes. That is Figure 1.5's iceberg, its molecular pictures and its
   formula, all three domains, in one picture that answers a temperature
   slider instead of standing still. The scientific-method flowchart is the
   opposite case and stays a still drawing.
2. **1.2 Phases and Classification of Matter.** Two. The three beakers of
   Figure 1.6 become one beaker whose state the reader sets, with the particle
   picture beneath showing why a solid keeps its shape, a liquid keeps its
   volume and a gas keeps neither. And the flowchart of Figure 1.11 is the
   chapter's sorting lesson: print draws the tree, but a reader learns it by
   dropping a sample into it. A still redrawing of the tree is what the figure
   row is; whether a sample can be walked down it is a Sim the section may
   propose.
3. **1.3 Physical and Chemical Properties.** The honest answer is that this
   section's ideas are categories, not quantities, and its photographs already
   do the work; the one place a knob helps is the contrast between extensive
   and intensive, where doubling the sample doubles the mass and the volume on
   the readout and leaves the density and the temperature where they were.
   That is one picture for the section's second objective, and it is the only
   one this section needs.
4. **1.4 Measurements.** A cube the reader sizes with a slider, sitting on a
   balance, with the readout writing density = mass ÷ volume in live numbers
   and the material chosen from the book's own density table, so that the
   reader sees a gold cube and a lead cube of one size weigh differently and a
   gold cube and a lead brick of one mass stand at different sizes. Beside it,
   the same block lowered into a graduated cylinder while the water rises by
   exactly its volume: that is the displacement method, it is what the PhET
   link showed, and it carries three of the chapter's four simulation items.
   The nested cubes of Figure 1.25 fold into the same figure as its scale.
5. **1.5 Measurement Uncertainty, Accuracy, and Precision.** Two things print
   cannot do. A meniscus the reader drags between two millilitre marks, with a
   magnifier on it and the reading written underneath with the certain digits
   set and the estimated digit changing as the meniscus moves: the reader feels
   where the uncertainty lives instead of being told. And the archery targets
   of Figure 1.27, which in print are three fixed outcomes and live are one
   target with two separate knobs, accuracy and precision, so that turning one
   moves the group and turning the other tightens it; the reader discovers that
   the two words are independent by finding all four corners of the pair.
6. **1.6 Mathematical Treatment of Measurement Results.** The three
   thermometers of Figure 1.28 as one instrument: a single mercury column the
   reader drags, with all three scales beside it reading at once, the two
   reference temperatures marked on each, and the equation beneath filled in
   with the live numbers, so that the reader sees the zero points differ while
   the degree sizes of Celsius and kelvin agree. That is the section's whole
   argument about y = mx + b against y = mx in one picture.

What should not be built in this chapter: an animation of unit cancellation
that only redraws the book's struck-out labels, and a periodic table of our
own, which is a sheet the app does not serve yet and not a figure of 1.3.
