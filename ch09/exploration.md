# Exploration: Chemistry 2e, Chapter 9 Gases

Written 2026-09-12, before section 9.2 was prepared, and extended on 2026-09-28 for the rest of the chapter. The source of record is the
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

9.2 was built on 2026-09-12. The rest of the chapter was read in full on
2026-09-28, when the five other sections and the introduction were prepared;
what that reading found is in the sections from "The rest of the chapter" on,
and the tables below now cover every module. The figure numbers of 9.3 were
checked against the publisher's page and agree.

## Chapter 9 modules

Ex. = worked examples, Fig. = numbered figures, Img. = unnumbered inline images,
Tables = numbered tables (the unnumbered Key Equations table of each module is
not counted), Eq. = marked display equations, Defs = glossary entries, CYL =
Check Your Learning items (every one keyed), Exer. = end-of-chapter exercises,
Keyed = those carrying the book's own solution.

| Section | Module | Ex. | Fig. | Img. | Tables | Eq. | Defs | CYL | Exer. | Keyed | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Intro | m68748 | 0 | 1 photo | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| 9.1 Gas Pressure | m68750 | 4 | 7 (4 photos, 3 sketches) | 8 (4 in examples, 4 in exercises) | 1 | 8 | 9 | 4 | 17 | 9 | 1 link-to-learning, 1 everyday-life, 1 sciences-interconnect |
| 9.2 Relating Pressure, Volume, Amount, and Temperature | m68751 | 6 | 10 (3 photos, 7 sketches and graphs) | 2 | 0 | 16 | 10 | 6 | 30 | 15 | 2 link-to-learning, 2 everyday-life |
| 9.3 Stoichiometry of Gaseous Substances, Mixtures, and Reactions | m68752 | 9 | 8 (2 photos, 6 sketches and graphs) | 0 | 1 | 34 | 4 | 9 | 33 | 16 | 1 link-to-learning, 1 sciences-interconnect, 1 chemist-portrait |
| 9.4 Effusion and Diffusion of Gases | m68754 | 3 | 4 (1 photo, 3 sketches) | 0 | 0 | 13 | 5 | 3 | 9 | 5 | 1 sciences-interconnect |
| 9.5 The Kinetic-Molecular Theory | m68758 | 1 | 4 (1 sketch, 3 graphs) | 0 | 0 | 14 | 2 | 1 | 9 | 4 | 1 link-to-learning |
| 9.6 Non-Ideal Gas Behavior | m68759 | 1 | 2 (1 graph, 1 sketch) | 3 (1 in text, 2 in exercises) | 1 | 4 | 2 | 1 | 7 | 4 | — |

One hundred and five end-of-chapter exercises in the chapter, fifty-three of them
keyed, which is the odd-numbered half of the book's own list as the Preface
promises. Twenty-four Check Your Learning items (the earlier count missed the one of 9.6, headed "Check your Learning"), all of them keyed. Thirty-two
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
| 9.3 | 9.19 | CNX_Chem_09_03_liquidgas | photos, inside Example 9.13: the four steps of finding a volatile liquid's molar mass |
| 9.3 | 9.20 | CNX_Chem_09_03_DaltonLaw1-f981 | sketch: three cylinders at 300, 450 and 600 kPa combined into one at 1350 kPa |
| 9.3 | 9.21 | CNX_Chem_09_03_WaterVapor | sketch: a gas collected over water in an inverted flask |
| 9.3 | 9.22 | CNX_Chem_09_03_WaterVapor2 | graph: the vapor pressure of water against temperature |
| 9.3 | 9.23 | CNX_Chem_09_03_Ammonia | sketch: one balloon of N₂ and three of H₂ giving two of NH₃ |
| 9.3 | 9.24 | CNX_Chem_09_03_GlobalWarming-b740 | sketch in a note: the greenhouse effect |
| 9.3 | 9.25 | CNX_Chem_09_03_GlobalWarming2 | graphs in a note: atmospheric CO₂ over 700,000 years and since 1960 |
| 9.3 | 9.26 | CNX_Chem_09_03_SusanSolom | photo in a portrait: Susan Solomon |
| 9.4 | 9.27 | CNX_Chem_09_04_Diffusion | sketch: H₂ and O₂ bulbs before, just after and long after the stopcock opens |
| 9.4 | 9.28 | CNX_Chem_09_04_DiffEff | sketch: diffusion against effusion through a barrier |
| 9.4 | 9.29 | CNX_Chem_09_04_Effusion2 | photos: helium and argon balloons when filled and 12 hours later |
| 9.4 | 9.30 | CNX_Chem_09_04_GasDiff | sketch in a note: a UF₆ gaseous diffuser |
| 9.5 | 9.31 | CNX_Chem_09_04_KMT2 (an 09_04 name in 9.5) | sketch: three piston cylinders for Amontons's (captioned Charles's in the image), Boyle's and Avogadro's laws |
| 9.5 | 9.32 | CNX_Chem_09_05_MolSpeed1 | graph: the speed distribution of O₂ at 300 K with v_p and u_rms |
| 9.5 | 9.33 | CNX_Chem_09_05_MolSpeed2 | graph: N₂ at 100, 200, 500 and 1000 K |
| 9.5 | 9.34 | CNX_Chem_09_05_MolSpeed3 | graph: Xe, Ar, Ne and He at one temperature |
| 9.6 | 9.35 | CNX_Chem_09_06_ZvsPgraph | graph: Z against P for H₂, N₂, O₂, CH₄ and CO₂ |
| 9.6 | 9.36 | CNX_Chem_09_06_RealGas2 | sketch: ideal against real boxes at constant pressure and at constant volume |

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

## The rest of the chapter (2026-09-28)

Two corrections to the 2026-09-12 figure list for 9.1: Figure 9.3 is a pair of photographs (an elephant and a figure skater), not a sketch, and Figure 9.8, the layers of the atmosphere, is a drawing, not a photograph. The 9.1 unnumbered images are the four manometers inside Examples 9.3 and 9.4 (`CNX_Chem_09_01_Manometer1_img` to `Manometer3_img` and `manometer4_img`, lower-case m) and four inside exercises (`Manometer5_img` to `Manometer8_img`). 9.6's are the van der Waals equation image in the text (`CNX_Chem_09_06_vanderWaals_img`) and two inside exercises (`Exercise1_img`, `RealGases`). Bundle quirks: `DaltonLaw1-f981.jpg`, `GlobalWarming-b740.jpg` carry hash suffixes; Figure 9.31 is `CNX_Chem_09_04_KMT2` though it sits in 9.5; 9.2's Figure 9.10 is `09_01_Amontons1`. No file name has a space.

### Photographs, kept or dropped

| Number | Decision | Why |
|---|---|---|
| 9.3 | kept | the elephant and the skater are the text's worked comparison, and it points at them |
| 9.6 | kept, inside its note | the note describes the cuff and gauge the photograph shows |
| 9.7 | kept, inside its note | the note points at it and its isobars are what the caption explains |
| 9.19 | kept, inside Example 9.13 | the four photographs are the procedure the example lists |
| 9.25 | a graph of data, faithful still copy or the section's call | the note's argument is the data; no slider changes the past |
| 9.26 | kept | a Portrait of a Chemist |
| 9.29 | kept | the two balloons are the experiment that shows Graham's law |

### What becomes of each figure (the reading each section's plan starts from)

| Number | Treatment | Class |
|---|---|---|
| 9.2 | still Figure: the column of air over a thumbnail with P = F/A, a force and an area slider | flat |
| 9.4 | Figure: a mercury and a water barometer side by side, an atmospheric-pressure slider raising both columns, the readout p = hρg in each | physical 3D bench, pitch bounded above the bench, or a locked view; 9.1 decides |
| 9.5 + manometer images of Examples 9.3 and 9.4 | fold candidate: one manometer with a closed or open end chosen (`F.choice`), gas and atmospheric pressure sliders, the book's three equations; the example images as its states | physical 3D bench or locked view; 9.1 decides |
| 9.8 | still copy of the layers, the book's altitudes | flat |
| 9.20 | Figure: three cylinders of named gases poured into one, partial pressures stacked to the total | particle picture, 3D |
| 9.21 + 9.22 + Table 9.2 | fold candidate: the collection flask with a temperature slider, the vapor pressure read off the curve and subtracted from the total | apparatus 3D beside a flat graph |
| 9.23 | Figure: balloons of N₂, H₂ and NH₃ with a choice of reaction, volumes in the coefficients' ratio | molecule inset, 2D and 3D views behind a choice |
| 9.24 | faithful still copy, symbolic arrows | flat |
| 9.27 + 9.28 | moving Figure: two bulbs, a stopcock to open, H₂ and O₂ mixing, the lighter gas crossing first; effusion through a pinhole as a choice | particle picture, 3D, moves (a time is in the idea) |
| 9.30 | faithful still copy in its note, or a moving diffuser if 9.4 argues it | flat |
| 9.31 | moving Figure: one piston cylinder, a choice of law, particles striking the walls with collision marks | particle picture, 3D, moves |
| 9.32 + 9.33 + 9.34 | fold candidate: the Maxwell-Boltzmann curve with a temperature slider and a gas choice, v_p and u_rms marked, the book's curves as states | flat, still; the Sim that replaces the dropped gas simulator |
| 9.35 | Figure: Z against P for the book's five gases, a pressure slider running a marker along each | flat, still |
| 9.36 | Figure: ideal and real boxes side by side, attractions drawn as the book's double arrows | particle picture, 3D, moves |
| vdW image | the equation redrawn in type hues with its two corrections labeled, live with Table 9.3's constants and Example 9.24's defaults | flat |

### Keyed against unkeyed

| Section | Exercises | Keyed | Unkeyed numerical, left out | Unkeyed conceptual, kept with an approach |
|---|---|---|---|---|
| 9.1 | 17 | 9 | fs-idp74012224, fs-idp30544832, fs-idp128422496, fs-idm81032176, fs-idp27847856, fs-idm35876656 | fs-idp152253216, fs-idp32052448 |
| 9.3 | 33 | 16 | fs-idp231956592, fs-idp20795744, fs-idm10841488, fs-idp106657088, fs-idp19919472, fs-idp100299232, fs-idp38931136, fs-idp46179152, fs-idp152416544, fs-idp228232112, fs-idp88428400, fs-idp68901248, fs-idp86448160, fs-idp55931680, fs-idp224745536 | fs-idp50300640, fs-idp39361600 |
| 9.4 | 9 | 5 | fs-idm54751408, fs-idm82361856, fs-idm32668896 | fs-idm51619904 |
| 9.5 | 9 | 4 | fs-idp62923856, fs-idm98413904 | fs-idm159823744, fs-idm213877296, fs-idm194405232 (a derivation) |
| 9.6 | 7 | 4 | fs-idm23432208 | fs-idp200327600, fs-idm58636672 |

Every Check Your Learning is keyed. No item is a simulation-exercise.

### Items that lean on another section and stay

- 9.5's fs-idm150122880 is about the opening photograph's hot-air balloon and uses 9.3's gas density; keyed and kept in 9.5, where the book puts it, since its (a) and (b) are about kinetic-molecular reasoning. Its text "shown at the opening of this chapter" stays plain.
- 9.5's fs-idp16129152 refers to Figure 9.34, which draws no H₂ or H₂O curve; carried as printed.
- 9.4's fs-idp44111184 answer derives Graham's law from kinetic energy, a 9.5 idea; kept in 9.4 with its key.
- 9.3's Example 9.16 cites Appendix E; the water sheet may be linked.

### Errata carried as printed

9.1: "is*twice*" in the source is a converter join of "is *twice*" (write a space); Table 9.1's sentence before it ends without a period. 9.3: Figure 9.20's caption says "gasses" and its image labels the third cylinder 6000 kPa while the caption says 600; Example 9.12's `occupies of volume`. 9.4: the key equation writes √m_B/√m_A beside the molar masses; the uranium note's "only about 0.4% enrichment, is achieved" sentence. 9.5: the section opens Part II with "According to Graham's law" for what is kinetic-molecular reasoning; Figure 9.32's caption writes ν_p for v_p; Figure 9.31's image labels panel (a) "Charles's Law" for a temperature raised at constant volume; Figure 9.34's caption begins with a lower-case "molecular". 9.6: the Figure 9.35 description labels Z in kPa; Example 9.24's constant `L² atm mol²`; fs-idm89275552's "If XX behaved"; the CYL answer's five significant figures.

### Root rule 28 for the rest of the chapter

Physical 3D: the barometer and manometers of 9.1 (a bench, never seen from beneath), Dalton's cylinders and the collection flask of 9.3, the diffusion bulbs of 9.4, the piston cylinders of 9.5, the ideal and real boxes of 9.6. Each may instead be a locked view where the plan argues no turn adds anything; a particle picture is 3D by the book's rules. Mathematical 3D: none. Flat: every graph, the atmosphere's layers, the greenhouse sketch, the van der Waals equation.

### Root rule 23 for the rest of the chapter

9.2 gives the reader the knobs on the gas; the rest of the chapter should let the reader look inside it. The chapter's arc is macroscopic law (9.1–9.3), then molecules in motion that explain it (9.4–9.5), then molecules that are too big and too sticky for it (9.6), and the figures can follow that arc with one gas box that changes what it shows: in 9.1 its walls feel the collisions and a gauge reads them; in 9.3 two gases poured together keep their own pressures; in 9.4 a hole opens and the lighter molecules leave first; in 9.5 a histogram of the same molecules' speeds builds up under the box as they move, and the temperature slider flattens it; in 9.6 the molecules grow and attract until Z leaves 1 on its graph beside them. A reader who has used the gas box of 9.2 should recognise it in every section, and see that the ideal gas law was a statement about these moving particles all along.
