# Plan: 1.2 Phases and Classification of Matter (m68667)

Source: `source.md` (converted from CNXML). Status: built 2026-09-12 without
a review stop, on Chen's instruction to build the chapter in one job; the
decisions below are made as `$CHEM/RULES.md` and `ch01/config.md` say, and
the plan is left for review after.

The chapter's second section and its first qualitative one: no worked
example, no equation, no Check Your Learning. Twelve numbered figures, of
which four are sketches (the three flasks of 1.6, the bottle and battery of
1.8, the flowchart of 1.11, the electrolysis of 1.15 and the fuel cell of
1.16, the last two inside a boxed note) and the rest photographs; one table;
two Link to Learning notes, dropped; two Chemistry in Everyday Life notes,
kept as titled asides; eighteen end-of-chapter exercises, nine of them keyed.
One page (root rule 11).

## Sub-concepts (page headers)

The book has two titled sub-headers of its own, "Classifying Matter" and
"Atoms and Molecules", and the run of the argument before the first. Both
sub-headers are absorbed into the page headers below rather than printed
again under them, since each would otherwise sit under a header that says
the same thing. One block per idea:

1. `matter` **Matter and its states** (book: the definition of matter; solid,
   liquid and gas with Figure 1.6; plasma; sand and clouds).
2. `mass-weight` **Mass and weight** (book: mass measured by a balance;
   weight as the force of gravity; the astronaut).
3. `conservation` **The law of conservation of matter** (book: the law in
   italics; brewing and the lead-acid battery with Figure 1.8; why
   convincing examples are rare).
4. `pure-substances` **Classifying matter: pure substances, elements and
   compounds** (book: the head of "Classifying Matter"; pure substance;
   elements; compounds with Figure 1.9; combined elements differ from free
   ones).
5. `mixtures` **Mixtures: heterogeneous and homogeneous** (book: mixture;
   heterogeneous mixture; homogeneous mixture and solution; Figure 1.10).
6. `classification` **Sorting a sample: the classification of matter** (book:
   the paragraph on the number of compounds and mixtures; Figure 1.11; the
   eleven elements of the crust with Table 1.1).
7. `atoms-molecules` **Atoms and molecules** (book: the atom and the gold
   nugget with Figure 1.12; Dalton; the size of an atom with Figure 1.13;
   the mass of an atom; molecules with Figure 1.14).
8. `everyday-life` **Chemistry in everyday life: decomposing water, and the
   chemistry of a cell phone** (book: the two boxed notes, verbatim, as
   `div.note` with an `h3` of the book's heading; Figures 1.15, 1.16 and
   1.17 inside them).

Cross references are the book's own wording, "Figure 1.6", "Table 1.1"; the
reference to Dalton's theory in the chapter on atoms and molecules is plain
text. The one display equation of the note, the decomposition of water,
stays inline as the converter gives it. Chemical formulas in prose are the
converter's `<sub>` and `<sup>`. No symbol of this section has a row in
`book.json`, so no `\k` macro is written in the text; the figure readouts
write `\kV` and `\km` for the volumes and masses they draw.

Learning objectives, the summary and the glossary go to `section.json` and
`chapter.json`. The eighteen exercises go to the Exercises document; nothing
is inline.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| matter | idea | matter | the definition, the balloon; the summary; exercises e1 and e15 touch it |
| states-of-matter | idea | matter | Figure 1.6; exercise e2 |
| mass-versus-weight | idea | mass-weight | the astronaut; exercises e1, e13 |
| conservation-of-matter | result | conservation | Figure 1.8; exercises e14, e16, e17, e18 |
| elements-and-compounds | idea | pure-substances | Figure 1.9; exercises e5, and as a second concept e4, e6, e8, e9, e10, e12, e16 |
| mixtures | idea | mixtures | Figure 1.10; exercises e3, e4 |
| classification-of-matter | skill | classification | Figure 1.11, Table 1.1; exercises e8, e9, e10, e15 |
| atoms-and-molecules | idea | atoms-molecules | Figures 1.12, 1.13, 1.14; exercises e6, e7, e11, e12 |

Every concept of the section has a book exercise that tests it. The
coverage rows mark `matter` as used at `mass-weight`, `mass-versus-weight`
as used at `conservation` (the law is stated in terms of quantity of
matter, which is what the balance reads), `elements-and-compounds` and
`mixtures` as used at `classification`, `elements-and-compounds` as used at
`atoms-molecules`, and the two notes as reinforcing atoms and molecules and
elements and compounds and using the conservation law.

## Figures

id · replaces · concepts · moving or still, with the reason · sliders · headline · graph

The lines below are as rebuilt in the figure re-examination of 2026-11-14 (Claude Fable 5.2); the dated
sections further down record the earlier passes and are superseded where they differ.

1. `sim-states` · replaces Figure 1.6 · states-of-matter, matter · value add: variation, the one sample
   seen in two containers of different shape and at any tilt, which the book's three upright flasks cannot
   show (what "takes the shape of its container" and "forms a horizontal surface" mean) · arrows: none ·
   still, the picture answers its controls; a change of state bends the sample from one shape into the
   next over 0.9 s · state (choice: solid, liquid, gas; opens on liquid), tilt (0 to 20°, opens at 12°,
   untyped) · headline: the book's own labels for the state shown ("A liquid takes the shape of its
   container, with a horizontal surface and a fixed volume.") · no graph · 2D (rebuilt flat: a section
   through each container shows the shape, the surface and the fill; the 3D scene was small, its labels
   sat on it and a turn showed nothing more, root rule 28.5). The water molecules of the old scene are
   gone: the book's passage is about shape and volume and says nothing of particles here. Draws volume
   (the sample's fill and its millilitres); the flask and the cylinder are the referents `wide`, `narrow`.
   works: parts: a stoppered conical flask (the book's) and a stoppered cylinder, each standing on a wedge
   on one bench; the sample inside each · flow: nothing flows; on a change of state the sample's outline
   bends into its new shape · must hold: (1) both containers are closed by a stopper, so the gas is held;
   (2) the solid is the same square block in both and at every tilt, resting on the floor and sliding to
   the low side; (3) the liquid's surface is horizontal at every tilt, in both containers; (4) the liquid
   has the same volume in both (the same area of section, 80 mL) though its shape differs; (5) the gas
   fills each container entirely, up to the stopper, so its volume is the container's, 250 mL and 150 mL;
   (6) the readout's volumes agree with the labels · read off the image: three stoppered conical flasks;
   "Solid: Has fixed shape and volume", "Liquid: Takes shape of container, Forms horizontal surface, Has
   fixed volume", "Gas: Expands to fill container"; a red cube, a red-brown liquid about a third of the
   way up, a pale brown gas filling the flask. The alt text calls the flasks beakers; they are flasks.
   The millilitres are the figure's own (the book gives none).
2. `sim-conservation` · replaces Figure 1.8 · conservation-of-matter · value add: variation, every stage
   between the book's before and after, with the total seen not to move · arrows: the book's two
   before-to-after arrows are symbolic and are not drawn · still: each slider sets how far a change has
   run · fermented (0 to 100 % by 10, opens at 50), discharged (the same), both untyped · no headline (the
   bars and the readout say it) · beside each apparatus one stacked bar of everything on that balance,
   its two ends fixed, the total bracketed above it in the mass hue; the substances used up are listed on
   the first line beneath and those formed, with the rest, on the second · 2D. The masses are the
   figure's own, since the book gives none: 80.0 g of sugar in a 500.0 g bottle, and five reactions'
   worth of battery, 3213.0 g, in 5000.0 g, in the ratios of the formula masses (glucose 180.16 to ethanol
   92.14 and carbon dioxide 88.02; Pb 207.2, PbO₂ 239.2, 2 H₂SO₄ 196.2 to 2 PbSO₄ 606.6 and 2 H₂O 36.0),
   chosen so that every step of the battery slider is exact to 0.1 g. Draws mass (balance readings,
   totals, the readout's grams); the substances take `F.cat` colours, the same in the bar, the key and the
   drawing (sugar on the bottle's floor, carbon dioxide's bubbles, the plates and their sulfate coat).
   works: parts: a capped bottle standing on a balance; a lead-acid battery (case, lid, two posts, vent
   caps, a cutaway showing plates in acid) standing on a second balance; a bar and its key beside each ·
   flow: nothing leaves either vessel; inside, sugar becomes ethanol and carbon dioxide, and lead, lead
   oxide and sulfuric acid become lead sulfate and water · must hold: (1) the bottle is capped at every
   setting; (2) each balance reads the same at every setting; (3) each bar's ends do not move and its
   segments are to scale; (4) the numbers in the key and the readout add up to the total as written;
   (5) at 0 % only the starting substances have length and at 100 % only the products · read off the
   image: (a) a bottle labelled "Pre-beer" with "Sugar" on its floor, an arrow, the same bottle with
   "Carbonation", "Beer", "Ethanol" and bubbles; (b) a cutaway car battery, "Sheets of Pb and PbO₂ and
   H₂SO₄", an arrow, the same battery, "PbSO₄ and H₂O". No numbers in the image or the text.
3. `fig-classify` · replaces Figure 1.11 · classification-of-matter · value add: variation, a sample the
   text names walked down the tree, so the reader sees the two questions answered and why; the still
   flowchart alone was a restyled copy of the book's · arrows: the flowchart's, symbolic · still; on a
   change of sample its tag travels the new path over 0.9 s · sample (a dropdown of eight, two of each
   class, all named in the section's own text: gold, aluminum, table salt, silver chloride, Italian
   dressing, granite, a sports drink, salt water; none is an item of exercises e9 or e10; opens on Italian
   dressing, the subject of Figure 1.10 just above) · no headline · no graph · 2D. Under the chart two
   lines give the answer to each question met and the book's reason for it; the readout writes sample,
   class, sub-class. Kind `sim` with the number, eyebrow "Figure 1.11". Draws nothing typed.
   works: parts: the book's seven boxes and three questions, joined by six elbowed Yes/No arrows · flow:
   none · must hold: (1) boxes, questions and Yes/No sides are the book's (No to the left, Yes to the
   right, at all three questions); (2) exactly one path is lit and it ends at the sample's class; (3) the
   two answers written beneath are the ones on the lit path · read off the image: "Matter"; "Does it have
   constant properties and composition?" No: "Mixture", Yes: "Pure substance"; "Is it uniform
   throughout?" No: "Heterogeneous", Yes: "Homogeneous"; "Can it be simplified chemically?" No: "Element",
   Yes: "Compound".
4. `sim-electrolysis` · replaces Figure 1.15 (in a note) · atoms-and-molecules, elements-and-compounds,
   conservation-of-matter · value add: variation, the two-to-one volumes and the molecule counts at every
   extent, where the book draws one moment · arrows: the book's three wide arrows from sample to circle
   are symbolic and are replaced by colour (each gas's circle wears its tube's colour) · still: the slider
   sets how many of eight water molecules have decomposed · water molecules decomposed (0 to 8 by 2, opens
   at 4, untyped) · no headline · no graph · 2D (rebuilt flat as the book draws it: the 3D bench was
   small, its labels covered the tubes, and the lesson is two gas columns and three counts, root rule
   28.5). Readout: the equation with the live counts (the book's 2 H₂O → 2 H₂ + O₂ while nothing has
   decomposed), and V(H₂) = 2 V(O₂) on a second line. Draws volume (the gas columns and their brackets);
   atoms through `F.el`; the tubes are the referents `h2-tube`, `o2-tube`.
   works: parts: a beaker of water; a battery standing on its floor, under water, its two terminals on
   top, − on the left and + on the right; an inverted test tube over each terminal, closed and rounded at
   the top, open at the bottom, standing higher than the beaker; three circles of molecules, water,
   hydrogen, oxygen · flow: gas forms at each terminal and bubbles up inside its tube to collect at the
   closed top, pushing the tube's water down · must hold: (1) each tube's mouth is under water and over
   its own terminal; (2) the gas is at the top of each tube with water beneath it; (3) the hydrogen column
   is twice the oxygen column at every setting, and hydrogen is over the negative terminal; (4) the water
   molecules left, the hydrogen and the oxygen molecules formed are 8 − n, n and n/2, and the atoms
   balance; (5) the equation in the readout carries the same counts · read off the image: − on the left
   terminal, + on the right; gas in the left tube about twice that in the right; circles "Water 2H₂O(l)",
   "Hydrogen 2H₂(g)", "Oxygen O₂(g)" holding two water, two hydrogen and one oxygen molecule. The image's
   ring round the tubes and its green divider are supports and are not drawn.
5. `fig-molecules` (Figure 1.14) and `fig-fuel-cell` (Figure 1.16) · **reverted to the book's images**,
   `photo` rows with their numbers. The redrawn molecules were flat discs where the book prints shaded
   space-filling models with "Oxygen atom", "Hydrogen atom" and "Carbon atom" pointed out; the 2D/3D
   choice turned molecules the passage only names, whose shapes it does not discuss (root rule 24.9). The
   fuel cell was an ink restyling of a drawing the book prints more clearly in colour, in a note, about a
   device whose parts (anode, cathode, protons) this page has not taught (rule 26.5).

The bundle's images carry no `width`, so `widths` is empty on every row
and no `data-width` or `data-original-width` is written.

### Photographs and images

| Number | What | Decision |
|---|---|---|
| 1.7 | the plasma cutting torch | **drop**: a stock scene the text names only in passing, named in `notes` |
| 1.9 | mercury(II) oxide decomposing, three frames | **keep**: the text points at it and it shows the thing the passage is about |
| 1.10 | salad dressing and a sports drink, magnified | **keep**: the text points at it twice and the magnified drops are the argument |
| 1.12 | the gold nugget and the STM image of gold atoms | **keep**: the text points at it and the atoms are the point |
| 1.13 | cotton from boll to molecule | **keep**: the text points at it as the section's picture of scale |
| 1.14 | the ball models of seven molecules | **keep as the book's image**, a `photo` row with its number: it is a drawing rather than a photograph, but its colours are the book's element palette, which the app does not have yet (`F.el` is proposed in `COLOR.md` and not built), and redrawing seven molecules in ink would lose what the figure shows; when the element palette exists the row can become a live drawing |
| 1.17 | the labelled cell phone | **keep**: the whole note is about it |

No unnumbered image in this section.

### Figures that serve exercises

None; no exercise of the section refers to a figure.

### Extra simulations considered (root rule 15)

- A sample the reader chooses (copper, water, air, salad dressing) walked
  down the flowchart of Figure 1.11 with the branch taken lit. Judged: it
  would animate the reading of a tree the still figure already gives, and
  the exercises e9, e10 and e15 are that walk done by the reader; not
  built.
- A balance with an astronaut on the earth and on the moon, weight in one
  reading and mass in the other. Judged: two numbers and a factor of six,
  which the text already states in one sentence; not built.

No Sim is built; the section's four interactive figures all carry the
book's numbers. (The flowchart walk listed above was built on 2026-11-14
as Figure 1.11 itself, with samples from the text rather than the exercises.)

## Exercises

All eighteen are kind `exercise`, placed at the end, ids `e1` to `e18` in
the book's order, each with its `source_id` and a `cite` to the span it
turns on.

- **Keyed, the book's answer (9):** e2 (fs-idp51841840), e4
  (fs-idp135248192), e6 (fs-idm34556656), e8 (fs-idm11351120, the book's
  "Answers will vary" sample, an open answer), e10 (fs-idp134896512), e12
  (fs-idm38551280), e14 (fs-idm50582272), e16 (fs-idp17429552, part (b) as
  a number, 0.9 g, with the book's whole answer as the solution), e18
  (fs-idp17769472, parts (a) and (c) as numbers, (b) in the solution).
- **Unkeyed conceptual, an AI-marked suggested approach (9):** e1
  (fs-idm68837632), e3 (fs-idm29164608), e5 (fs-idm23683040), e7
  (fs-idm12578096), e9 (fs-idm27722240, answered by the method of Figure
  1.11 and the section's own lists rather than by a list of eight
  classifications, so that the approach is not a key), e11
  (fs-idm25131712), e13 (fs-idm29444768), e15 (fs-idm10469360), e17
  (fs-idm1546416).
- **Left out:** none. **Held for or taken from another section:** none.
  **Simulation exercises:** none in this section.

Bloom: Understand for the definitional items, Apply for the classification
and listing items, Analyze for the three conservation scenarios. Weights
(root rule 20) give a second concept 2 where an item merely names it
(elements and compounds in the molecule and classification items) and 3
where it is half the work (states of matter in e15).

## Tables

Table 1.1, Elemental Composition of Earth, stays in the text at
`classification` as a `div.book-table` with the book's six columns.

## Colour

The page binds `volume` (the sample of Figure 1.6 and the gases of Figure
1.15) and `mass` (the balance readings of Figure 1.8). Everything else is
ink: the particles, the bars of kinds of matter, the flowchart, the fuel
cell, the states, the elements. No element palette.

## Wanted at chapter level

- `ch01/COLOR.md`, the section table: 1.2 binds `mass` as well as `volume`,
  for the balance readings of Figure 1.8; the type table's `mass` row
  should add 1.2 to "Where it is bound".
- No variable or equation row of `chapter.json` belongs to 1.2, so there
  is no anchor to write.
- `book.json` symbols: nothing wanted; the section writes `\kV` and `\km`
  in figure readouts only.
- When `F.el` (the element palette) exists in `figlib`, Figure 1.14
  (`fig-molecules`) can be redrawn live and its row changed from `photo` to
  `sim`; until then it is the book's image.

Decided in the chapter pass, 2026-09-12: `ch01/COLOR.md` now names 1.2 in the
`mass` row and in the `volume` row, and the section table records that this
page binds both. Figure 1.14 stays the book's photograph, and the redrawing
it would allow is carried forward in the log entry with the element palette.

## Recoloured and re-controlled, 2026-09-12

Brought up to root rules 7, 25 and 26 by Claude Fable 5.1. Figure 1.6's
state slider is a segmented control, solid, liquid, gas (rule 26.1), and
its sample is given an identity so that its particles can have one
(rule 7.2): it is water, drawn beneath each container molecule by
molecule in the element palette, packed as a lattice, a crowd or a few
far apart. Figure 1.15's water, hydrogen and oxygen molecules and Figure
1.16's hydrogen, oxygen and water are drawn in element colours through
`F.el`, hydrogen with an ink outline; the protons of the fuel cell are
hydrogen ions and keep hydrogen's colour with a plus mark, and the
electrons stay ink, hollow with a minus, since an electron has no
element to take a colour from (the same reasoning as `ch06/COLOR.md`
gives for the Bohr electron). Figure 1.8's bars of matter, which were
ink at low alpha, are the mass hue: each bar's length is a mass and the
bars of one balance add up to what that balance reads, so the figure is
coloured throughout rather than half coloured. Every atom, ion,
electron, tube and battery names itself under the pointer through
`F.hover` (rule 26.6). The page still binds `volume` and `mass`. The
captions of 1.6 and 1.15 say to choose the state and name the colours.

## Two dimensions or three, 2026-09-12

Brought up to the book's rule on dimension (Chemistry 2e `RULES.md`, Figures,
root rule 24.8 and 26) by Claude Fable 5.1. A particle picture is 3D, an
experiment is a bench with a bounded orbit, a faithful copy stays flat.

- `sim-states` (Figure 1.6): two glass containers on a ground on `F.view3d`,
  the water inside each as spheres, a lattice of 27 in the solid's cube, 27
  in disorder in the liquid's slab, a few far apart through the gas; the
  headline, the words on packing and the readout on a flat strip beneath.
  Orbit: pitch 0 to 1.25 rad (level to 72° above), since the containers stand
  on a ground and are never seen from beneath; yaw free; idle spin on, since
  the figure is still; front and above views; zoom; hover names on every
  atom, sample and container.
- `sim-electrolysis` (Figure 1.15): a bench scene on `F.view3d`, the beaker,
  the battery with its terminals, the two inverted tubes with their water
  and the gas collected, the molecules formed drawn in the gas of each tube
  and the water remaining in the beaker, all named under the pointer; the
  percentages, the counts and the equation on a flat strip beneath. Orbit:
  pitch 0.04 to 0.95 rad (2° to 54° above the bench top), yaw −π/2 to π/2
  (the front half), so the bench is never seen from beneath or behind; no
  idle spin, since a bench has a front (rule 26.2 allows the omission);
  front and above views; zoom.
- `fig-fuel-cell` (Figure 1.16) stays a flat faithful copy: a faithful copy
  is not a simulation. `draws` unchanged.

## Figure audit pass, 2026-09-12

Brought up to the audit of the book's figures against `RULES.md`. Each line
below says what the figure now is: its tier, whether it moves, its controls,
whether it is flat or three-dimensional and with what bound, and whether its
labels are on.

- `sim-states` (Figure 1.6): a still `F.view3d` scene, no cycle and no
  transport. Controls: the state buttons and the volume slider. Bound: the
  yaw is free and the pitch runs from level to 72° above it, so the
  containers are never seen from beneath; the scene spins idly. Two things
  the audit found are corrected: the gas now draws the same twenty-seven
  molecules in both containers, sparser in the wide one, since it is one
  sample and not two; and the ice is drawn at 1.09 times the volume of the
  liquid, with the headline saying that water expands by about a tenth on
  freezing. Labels: the two container names are the frame, and every molecule
  answers the pointer.
- `sim-conservation` (Figure 1.8): a still simulation. Controls: the two
  extent sliders. Flat. Every bar of both panels is now drawn to one scale,
  0.22 canvas units to the gram, chosen so that the longest bar and the
  number beside it both fall inside the canvas; a line under the bars says
  so. Labels on.
- `fig-classify` (Figure 1.11): a faithful copy, still, no controls, flat,
  labels on. Its readout is one sentence rather than a chain of fragments.
- `fig-molecules` (Figure 1.14): **changed from a kept photograph to a
  redrawn Figure.** `F.el` now exists, and the book's rule for this chapter
  asks a structure the text names to be built both ways, so the seven
  molecules are drawn live: hydrogen, oxygen, phosphorus and sulfur as
  molecules of one element, water, carbon dioxide and glucose as molecules of
  compounds, every atom a disc in its element's colour. A still figure: a
  molecule has no clock in it. Control: a view choice of 2D and 3D, 2D the
  default, the scene mounting on the first switch, each molecule turning
  about its own centre with the yaw free and an idle spin, since a molecule
  has no ground. Labels: the seven formulas, one per molecule, are always on
  in both views, each naming a kind once and none of them moving or
  colliding; every atom carries a hover name. The row keeps the number 1.14
  and the book's image and caption in `originals` and `original_caption`, so
  the reader can still call up the book's own picture.
- `sim-electrolysis` (Figure 1.15) and `fig-fuel-cell` (Figure 1.16):
  unchanged but for the wording of one line, which was a middle-dot join and
  is now two sentences.

## Figure pass, 2026-09-28 (Claude Opus 5.5)

Judged against `docs/prompts/manim-style.md`; only the figures below changed.

- `sim-states` · a change of state moves each of the 27 molecules from its place in the old packing to its place in the new one over 0.9 s while the old body fades and the new one fills (manim 15/16).
- `sim-conservation` · readout one equation for the bottle, the battery's mass in the sentence (manim 12).
- `sim-electrolysis` · readout the reaction alone, V(H₂) = 2V(O₂) in the sentence (manim 12).

## Figure re-examination, 2026-11-14 (Claude Fable 5.2)

Every drawn figure was set beside the book's image. `sim-states`, `sim-conservation` and `sim-electrolysis`
were rebuilt (the first and last flat), `fig-classify` became interactive, and `fig-molecules` and
`fig-fuel-cell` went back to the book's images; the plan lines and `works:` blocks under "Figures" are
the current ones. The page still binds `volume` and `mass`; the only element colours left are the
hydrogen and oxygen of Figure 1.15. Captions cut to what to change and what to look at.
