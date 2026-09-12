# Exploration: Chemistry 2e, Chapter 9 Gases

Written 2026-09-12, before section 9.2 was prepared. The source of record is the
CNXML bundle at `source/osbooks-chemistry-bundle/`; the seven modules of the
chapter were converted with `python3 tools/convert.py 9` and read, and 9.2, the
one section this pass builds, was read in full. The book's organisation, its
apparatus and its conventions are as `exploration.md` beside `RULES.md` records
them for the whole book; nothing in this chapter departs from that account.

## Why this section

Chapter 9 is the chapter the app was made for. Four macroscopic properties of a
gas — pressure, volume, amount and temperature — are tied together by one
equation, and the book teaches that equation by holding two of the four still at
a time and watching the other two move. Print can only draw one frame of each
pairing, so the chapter spends six numbered figures on what is really one
picture with four knobs on it. Section 9.2 is where all four laws are stated and
combined, and it is the one section of the chapter that a reader can be given
the knobs for directly.

Only 9.2 is built in this pass. The chapter's other five sections and its
introduction are not; `chapter.json` lists every section of the chapter so the
contents reads correctly, and carries variable, equation and glossary rows for
9.2 alone.

## Chapter 9 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images,
Tables = numbered tables (the unnumbered Key Equations table of each module is
not counted), Eq. = marked display equations, Defs = glossary entries, CYL =
Check Your Learning items (every one keyed), Exer. = end-of-chapter exercises,
Keyed = those carrying the book's own solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68748 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 9.1 Gas Pressure | m68750 | 4 | 7 (3 photos, 4 sketches) | 8 | 1 | 8 | 9 | 4 | 17 | 9 | 1 link-to-learning, 1 everyday-life, 1 sciences-interconnect |
| 9.2 Relating Pressure, Volume, Amount, and Temperature | m68751 | 6 | 10 (3 photos, 7 sketches and graphs) | 2 | 0 | 16 | 10 | 6 | 30 | 15 | 2 link-to-learning, 2 everyday-life |
| 9.3 Stoichiometry of Gaseous Substances, Mixtures, and Reactions | m68752 | 9 | 8 | 0 | 1 | 34 | 4 | 9 | 33 | 16 | 1 link-to-learning, 1 sciences-interconnect, 1 chemist-portrait |
| 9.4 Effusion and Diffusion of Gases | m68754 | 3 | 4 | 0 | 0 | 13 | 5 | 3 | 9 | 5 | 1 sciences-interconnect |
| 9.5 The Kinetic-Molecular Theory | m68758 | 1 | 4 | 0 | 0 | 14 | 2 | 1 | 9 | 4 | 1 link-to-learning |
| 9.6 Non-Ideal Gas Behavior | m68759 | 1 | 2 | 3 | 1 | 4 | 2 | 0 | 7 | 4 | — |

One hundred and five end-of-chapter exercises in the chapter, fifty-three of them
keyed, which is the odd-numbered half of the book's own list as the Preface
promises. Twenty-three Check Your Learning items, all of them keyed. Thirty-two
glossary entries. Section 9.2 alone carries thirty exercises, fifteen of them
keyed, six worked examples with six Check Your Learning items, and ten of the
book's glossary terms.

## The figure numbers

The book numbers figures chapter-wide on openstax.org, beginning with the
introduction's splash photograph as Figure 9.1, and it numbers a figure that
sits inside a boxed note or a worked example while leaving a figure inside an
exercise unnumbered. Applying that rule to the CNXML gives the numbers below;
the reading for 9.2 was checked against the publisher's own page and agrees in
every case, Figure 9.9 to Figure 9.18.

| Section | Number | CNXML id | What it is |
|---|---|---|---|
| Intro | 9.1 | CNX_Chem_09_00_HotAirBall | photo: hot air balloons over a valley |
| 9.1 | 9.2 | CNX_Chem_09_01_Pressure1 | sketch: the same force on a small area and a large one |
| 9.1 | 9.3 | CNX_Chem_09_01_Pressure2 | sketch: an elephant's foot and a woman's heel |
| 9.1 | 9.4 | CNX_Chem_09_01_Barometer | sketch: a mercury barometer |
| 9.1 | 9.5 | CNX_Chem_09_01_Manometer | sketch: the closed-end and open-end manometers |
| 9.1 | 9.6 | CNX_Chem_09_01_Spygmo | photo: a sphygmomanometer |
| 9.1 | 9.7 | CNX_Chem_09_01_WeatherMap | photo: a weather map of pressure systems |
| 9.1 | 9.8 | CNX_Chem_09_01_Atmosphere | photo: the atmosphere seen from orbit |
| 9.2 | 9.9 | CNX_Chem_09_02_Ballooning | photos: the three balloon flights of 1783 |
| 9.2 | 9.10 | CNX_Chem_09_01_Amontons1 | sketch: a sealed sphere and its gauge on a hot plate, in three frames |
| 9.2 | 9.11 | CNX_Chem_09_02_Amontons2 | table and graph: pressure against temperature for air at constant volume |
| 9.2 | 9.12 | CNX_Chem_09_02_Charles2 | table and graph: volume against temperature for 1 mol of methane at 1 atm |
| 9.2 | 9.13 | CNX_Chem_09_03_BoylesLaw1 | sketch and two graphs: a syringe with a gauge, P against V and 1/P against V |
| 9.2 | 9.14 | CNX_Chem_09_02_Boyleslaw2 | two graphs: the hyperbola of P against V, and 1/P against V |
| 9.2 | 9.15 | CNX_Chem_09_02_BoylesLaw4 | sketch in a note: the chest on inhalation and on exhalation |
| 9.2 | 9.16 | CNX_Chem_09_02_Scuba | photo: a diver underwater with a tank |
| 9.2 | 9.17 | CNX_Chem_09_02_GreatBarri | photo in a note: coral at the Great Barrier Reef |
| 9.2 | 9.18 | CNX_Chem_09_02_HENH3O2 | sketch: three balloons of He, NH₃ and O₂, one mole each |
| 9.3 | 9.19 to 9.26 | — | not read in detail; this pass does not build 9.3 |
| 9.4 | 9.27 to 9.30 | — | not read in detail |
| 9.5 | 9.31 to 9.34 | — | not read in detail |
| 9.6 | 9.35, 9.36 | — | not read in detail |

The two unnumbered inline images of 9.2 both sit inside an exercise, which is
where the book leaves an image unnumbered:

| Id | File | What it shows |
|---|---|---|
| fs-idm227684464 | CNX_Chem_09_02_WeatherBall_img | a weather balloon held before launch, beside the exercise that asks for its volume |
| fs-idm159072736 | CNX_Chem_09_02_Exercise25_img | the four ideal-gas graphs that answer exercise fs-idm188679440 |

The first is a photograph of the thing the exercise names and carries no
information the prompt does not; it is dropped and named in `notes`. The second
is the book's own answer to a keyed exercise and is the drawing the Sim of the
four graphs makes live, so the exercise's answer points at that Sim rather than
at a copy of the image.

## The tables, in the book's order

| Number | Section | CNXML id | Title |
|---|---|---|---|
| Table 9.1 | 9.1 | fs-idp189967312 | Pressure Units |
| Table 9.2 | 9.3 | fs-idm68841392 | Water Vapor Pressure at Various Temperatures |
| Table 9.3 | 9.6 | fs-idm15100464 | Values of van der Waals Constants for Some Common Gases |

**Section 9.2 prints no numbered table.** Its one `> TABLE` is the unnumbered
one-column Key Equations table, which is the book's own formula sheet and goes
to `chapter.json`'s equations rather than into the text. The page therefore
carries no `div.book-table`; the pressure-against-temperature and
volume-against-temperature data the book prints beside Figures 9.11 and 9.12 are
part of those figures and are drawn with them, not set as tables of their own.

## The Link to Learning notes and the PhET items

Two Link to Learning notes in 9.2, neither of them kept, each named in `notes`
in one plain sentence:

| Redirect | What it pointed at |
|---|---|
| openstax.org/l/16CharlesLaw | a video showing a gas shrinking as it is cooled and expanding as it is warmed |
| openstax.org/l/16IdealGasLaw | the PhET simulation of pressure, volume, temperature and amount, with the instruction to change one while holding the others |

The second is the trigger for a Sim of our own, and it is the reason this
section was chosen as a showcase: the whole of what that simulation offers is
what the section's first Sim gives, on the page, in the book's own units and
with the book's own equation written under it.

**Section 9.2 sets no `simulation-exercise`.** None of its thirty end-of-chapter
items is an instruction to open an external simulation; every one is a
conceptual question or a calculation. The chapter's PhET material is the note
above alone.

## Exercises of 9.2 that lean on another section

Every one of the thirty items tests what 9.2 teaches, so none is held for a
later page and no row carries a `source_section`. Four are worth naming:

- **fs-idm119503088** (unkeyed) and **fs-idm150329120** (keyed) ask how the
  graphs of Figure 9.12 and Figure 9.13 would change if the moles of gas were
  doubled. Both are answerable from 9.2 alone, and both are carried exactly by
  the section's own figures, which have a slider for the amount.
- **fs-idm221266736** (unkeyed) asks what else is needed to find the mass of the
  air behind Figure 9.13. The answer is the molar mass of air, which the book
  introduces in 3.1; the item stays in 9.2, since the reasoning it tests is the
  ideal gas law, and its concept row names `ideal-gas-law` alone: the merge
  tool accepts a placeholder only under a section of the chapter staging it, so
  no node stands for molar mass until Chapter 3 is built.
- **fs-idm188679440** (keyed) asks the reader to draw the four ideal-gas graphs.
  Its keyed answer is an image rather than a sentence; the page keeps the
  book's answer in words and sends the reader to the Sim that draws all four
  from one state.

Example 9.9 converts 655 g of CH₄ into moles with the molar mass, which is also
a 3.1 idea. It stays where the book prints it, and the prerequisite edge from
`ideal-gas-law` to Chapter 3's molar mass is written when Chapter 3 is built.

## Observations that affect the plan

- **Four laws, one equation, one picture.** Amontons's, Charles's, Boyle's and
  Avogadro's laws are each stated as a proportionality between two of the four
  properties with the other two held constant, and the section ends by
  combining them. Print has to draw four figures because it cannot hold two
  knobs still while the reader turns a third; a canvas can.
- **The book's data are the figures' data.** Figure 9.11 prints six
  pressure-temperature pairs for air at constant volume, Figure 9.12 five
  volume-temperature pairs for one mole of methane at 1 atm, and Figure 9.13
  five volume-pressure pairs for an air sample at room temperature. Example 9.8
  and three exercises are read off those points, so a figure that replaces one
  of them must plot the book's own numbers and default to them.
- **Figure 9.14 says the same thing as Figure 9.13 with the syringe removed.**
  The book draws the hyperbola and the straight line twice, once beside the
  instrument and once on their own; one figure that draws the syringe and both
  graphs together carries both numbers, which is the fold root rule 14
  describes. The section's plan decides it and states the eyebrow.
- **Two of the section's four photographs earn their place.** The three balloon
  flights of Figure 9.9 are what the opening paragraph is about and the text
  points at them; the diver of Figure 9.16 is named by Example 9.10 and by two
  exercises, so the reader must be able to see what the problem is about. The
  coral of Figure 9.17 is a stock scene beside a note and is dropped, and the
  weather balloon inside an exercise is dropped with it.
- **Breathing has a clock in it.** Figure 9.15 draws inhalation and exhalation
  as two frames of one cycle that the note's own sentence counts at twenty a
  minute. It is the one figure of the section whose idea is a motion rather
  than an answer to a knob.
- **Temperature must be in kelvin, and the section says so four times.** The
  page leans on 1.6's Celsius-to-kelvin conversion throughout, every figure
  reads its temperature axis in kelvin, and absolute zero is where every
  extrapolated line meets the axis. That is the one idea of the section that a
  graph teaches better than a sentence.
- **The section leans on 9.1 for what a pressure is.** It never defines
  pressure or its units, and it writes pressures in kPa, torr, psi, atm and bar
  as the examples happen to use them. 9.1 is not built, so a placeholder
  concept stands for it and the unit names are kept in the book's words.

## What a live figure could show in this section that print cannot

Root rule 23, answered for 9.2, expanding the chapter's entry in the book's own
`exploration.md` ("a box of particles with sliders for pressure, volume,
temperature and amount, the walls moving, the particles speeding up as they
warm, a pressure gauge reading their collisions, and each of the four laws shown
by holding two sliders still"). Everything below is planar and drawn through
`figlib`; nothing in this section is spatial, so no figure needs the projection
and none uses `THREE`.

**The Sims this section builds.** Two, each replacing nothing in the book and
so carrying no number and the eyebrow "Sim".

1. **The gas box, the section's centrepiece.** A cylinder of gas with a piston
   on it and a gauge above it, the particles drawn inside and moving, with
   three sliders — volume, temperature and amount — and the pressure read off
   the gauge as the fourth quantity, computed from the other three. Above the
   sliders, a row of four names, Amontons, Charles, Boyle and Avogadro, each
   locking the two quantities its law holds constant, so that choosing Boyle
   locks the temperature and the amount and leaves the reader one knob and one
   reading. Beneath the box, PV = nRT is written with the live numbers in it,
   each in the hue of its type. What the reader sees that print cannot: the
   same box obeying all four laws, so that the four laws stop being four facts
   and become four ways of holding the same equation still. It **moves**: the
   particles travel and strike the walls, and the gauge reading is the rate of
   those strikes, so the figure registers a cycle and carries the transport.
   Sliders: volume `volume` (0.5 to 10 L), temperature `temperature` (100 to
   600 K), amount `amount` (0.2 to 4 mol); the pressure readout is typed
   `pressure`. No projection.
2. **One state on four graphs.** The same gas state drawn on four axes at once —
   P against V, V against T, P against T, and 1/P against V — with one marker
   on each and the two sliders that move it. Turning the temperature slider
   slides the marker up two of the graphs and along a third while the fourth
   stands still, and the reader sees which pairing each law is about without
   being told. What print cannot do: print draws the four graphs as four
   pictures of four different experiments; here they are four views of one gas.
   It is **still**: the state is a place, not a journey, and the marker answers
   the sliders. Sliders: volume `volume`, temperature `temperature`, amount
   `amount`. This Sim is what exercise fs-idm188679440 asks the reader to draw.
   No projection.

**The book's figures, and what becomes of each.** The section's plan writes the
line and the reason for each; this is the reading the plan starts from.

| Number | Treatment | Moving? |
|---|---|---|
| 9.9 | kept photograph, the book's caption and its credit clause | — |
| 9.10 | interactive Figure: the sealed sphere over its hot plate, a temperature slider, the needle swinging and the particles inside quickening, with P/T held on the readout | moves: the particles travel |
| 9.11 | interactive Figure: the book's six air data points on a P–T graph, the fitted line, the dashed extrapolation to absolute zero, and a marker the temperature slider carries | still: a state, not a journey |
| 9.12 | interactive Figure: the book's five methane points on a V–T graph, the line stopping at 111 K where methane liquefies, and the extrapolation to the origin | still |
| 9.13 + 9.14 | one interactive Figure that folds both: the syringe whose plunger the reader moves, its gauge, and the two graphs beside it carrying the book's five points, the hyperbola and the straight line. Eyebrow "Figure 9.13 + 9.14", `folds` naming 9.14 | still |
| 9.15 | interactive Figure inside the everyday-life note: the chest cavity drawn simply, the diaphragm falling and rising, lung volume and the lung pressure difference read out through the cycle | moves: a breath is a cycle the note counts at twenty a minute |
| 9.16 | kept photograph, the book's caption and its credit clause; two exercises and Example 9.10 point at it | — |
| 9.17 | dropped, a stock scene beside a note, and named in `notes` | — |
| 9.18 | interactive Figure: three balloons of one mole each, the gas of each chosen by the reader, the volume standing at 22.4 L while the mass on the label changes | still |

What should not be built here: an animation of the algebra that rearranges
PV = nRT, which only redraws a rearrangement the reader can do; and a
molecular-speed distribution, which is 9.5's figure and not this section's,
though the gas box's particles quicken as the temperature rises.
