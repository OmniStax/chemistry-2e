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

1. `sim-states` · replaces Figure 1.6 (the three flasks) · states-of-matter,
   matter · **still**: the idea has no time in it; the sample answers the
   state slider and nothing moves of itself · state (solid, liquid, gas;
   ink, the slider's value written as the word rather than a number) and
   the sample's volume $\kV$ (50 to 200 mL, default 100, volume) · "A
   liquid takes the shape of each container but keeps its volume of 100
   mL, forming a horizontal surface" · none. One sample drawn in two
   containers of different shape, a narrow and a wide one, so the reader
   sees what each state keeps: the solid its shape and volume, the liquid
   its volume at two heights, the gas neither. The particle picture is
   drawn beneath each container in ink, a lattice, a crowd and a few far
   apart, with three lines saying why. Readout $\kV$ with the live
   numbers; small line the book's own sentence for the state. Draws volume.
2. `sim-conservation` · replaces Figure 1.8 (the bottle and the battery) ·
   conservation-of-matter · **still**: each slider sets how far a
   conversion has run, and the picture answers it · the fraction of the
   sugar fermented (0 to 100 %, ink) and the fraction of the battery
   discharged (0 to 100 %, ink) · "With the fermentation 40% along and the
   battery 60% discharged, the kinds of matter have changed and neither
   balance has moved" · none. The bottle stands on a balance reading
   1000.0 g and the battery's reacting substances on one reading 642.6 g;
   beside each, bars of the kinds of matter present, drawn to scale from
   the formula masses (glucose 180.2 to ethanol 92.1 and carbon dioxide
   88.0; lead, lead oxide and sulfuric acid 642.6 to lead sulfate 606.6
   and water 36.0), shrink and grow as the sliders move while the balance
   readings do not. The balance readings and the $\km$ of the readout are
   the mass hue, and nothing else on the canvas is; the bars are ink,
   since they are kinds of matter rather than a bound quantity. Draws mass.
3. `fig-classify` · replaces Figure 1.11 (the flowchart) · classification-
   of-matter · **still**, a faithful copy: a diagram of a procedure, with
   nothing to vary · no sliders · no headline · none. Redrawn so that it
   reads in both themes, with the book's boxes, questions and Yes/No
   arrows; kind `figure`. Draws nothing.
4. `sim-electrolysis` · replaces Figure 1.15 (water decomposed over a
   battery, in a note) · atoms-and-molecules, elements-and-compounds,
   conservation-of-matter · **still**: the slider sets how much water has
   decomposed, and the tubes and the molecules answer it · the number of
   water molecules decomposed (0 to 12 by 2, default 6, ink) · "6 water
   molecules have become 6 hydrogen molecules and 3 oxygen molecules, and
   the hydrogen tube holds twice the gas" · none. The beaker, the battery
   and the two inverted tubes on the left, with the collected gas in the
   volume hue and the hydrogen tube filling at twice the rate; the
   remaining water molecules and the hydrogen and oxygen molecules formed
   drawn on the right in ink (oxygen a filled disc, hydrogen a hollow
   one); the equation with the live counts and $\kV_{\text{H}_2} =
   2\kV_{\text{O}_2}$ in the readout. The book's three domains on one
   canvas. Draws volume.
5. `fig-fuel-cell` · replaces Figure 1.16 (the fuel cell, in a note) ·
   elements-and-compounds, atoms-and-molecules · **still**, a faithful
   copy: a schematic of a device, redrawn in ink with the book's labels
   (hydrogen and oxygen in, unused hydrogen and water out, anode, proton
   exchange membrane, cathode, electric power) · no sliders · none. Kind
   `figure`. Draws nothing.

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

No Sim is built; the section's three interactive figures all carry the
book's numbers.

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
