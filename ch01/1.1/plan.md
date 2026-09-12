# Plan: 1.1 Chemistry in Context (m68664)

Source: `source.md`, converted from the CNXML with the shared converter.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the chapter in one job; the decisions below follow `RULES.md`,
`config.md` and `COLOR.md` where a rule would have asked.

A qualitative section, the first of the book: no worked example, no
equation, no Check Your Learning, no table, no boxed note and no Link to
Learning. Four numbered figures (a photograph pair, two flowcharts and one
composite of a photograph beside three molecular pictures), eight glossary
terms, and seven end-of-chapter exercises, four of them keyed. It stays one
page.

## Sub-concepts (page headers)

The book has three titled runs of text after an untitled opening. Page
structure, one block per idea, with the span ids the coverage rows and the
chapter's anchors use:

1. `history` **Chemistry before it was a science** (book: the untitled
   opening, from flint and pottery through the Greek elements and the
   alchemists to Percy Lavon Julian's soybeans; Figure 1.2 sits where the
   text points at it).
2. `central-science` **Chemistry: the central science** (book's own
   header: the web of disciplines, Figure 1.3, and the definition of
   chemistry).
3. `scientific-method` **The scientific method** (book's own header:
   observation and experiment, hypothesis, law, theory, and the path of
   discovery; Figure 1.4). Introduces `scientific-method` and
   `hypothesis-law-theory`.
4. `domains` **The domains of chemistry** (book's own header: the
   macroscopic, microscopic and symbolic domains worked through on water;
   Figure 1.5). Introduces `domains-of-chemistry`.

The learning objectives, the summary (to `summary_html`) and the glossary
come out of the running text into the tables. The `[ref:…]` markers are
written as the book's own words, "Figure 1.2", "Figure 1.3", "Figure 1.4"
and "Figure 1.5 (b)", and the build links them to the rows that carry those
numbers.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| scientific-method | idea | scientific-method | the definition, Figure 1.4, exercise q1 |
| hypothesis-law-theory | skill | scientific-method | the three definitions, exercises q2 and q3 |
| domains-of-chemistry | idea | domains | the three definitions, Figure 1.5, exercises q4 to q7 |

`central-science` and `history` introduce no node: the definition of
chemistry is a glossary term and the history is narrative, and neither is
tested. `central-science` carries a `uses` row for `domains-of-chemistry`
only where the text leans on it, which it does not, so it carries none.

## Figures

id · replaces · concepts · moving or still · sliders · headline · graph

1. `fig-alchemist` · Figure 1.2, a `photo` row · none · the two
   photographs, an alchemist's workshop circa 1580 beside Alma Levant
   Hayden at the FDA in 1952 · **keep**: the text points at it ("extend
   life (Figure 1.2)") and the contrast between the two pictures is the
   passage's point, alchemy against a methodical, recorded practice. The
   bundle's image is copied under its own file name and the caption is
   kept whole with its credit clause. No width in the CNXML, so `widths`
   stays empty and no `data-width` is written.
2. `fig-chemweb` · Figure 1.3, a `figure` row with the book's image as its
   original · none · **still**: a diagram of relationships, with nothing
   in it to vary · no sliders · no headline · no graph. Redrawn faithfully:
   the same twenty boxes and the same twenty-eight links, chemistry at the
   centre set in a heavier stroke, in `PAL` neutrals so it reads in both
   themes. Draws nothing.
3. `fig-scimethod` · Figure 1.4, a `figure` row with the book's image as
   its original · scientific-method · **still**: a procedure, not a
   quantity; the loop in it is a loop of reasoning and has no clock ·
   no sliders · no headline · no graph. Redrawn faithfully: the six boxes,
   the arrow down from observation, the two curved arrows between
   hypothesis and experiment, the arrow from experiment to the body of
   knowledge, the arrow back from knowledge to hypothesis, and the two
   elbowed arrows to law and to theory, every label the book's own. The
   book sets three phrases in red for emphasis; they are set in a heavier
   weight here, since red is not a type. Draws nothing.
4. `sim-water` · Figure 1.5, a `sim` row with the book's composite as its
   original · domains-of-chemistry · **still**: the figure answers its
   temperature slider and nothing else; there is no clock in the idea of
   a state at a temperature, and a molecule that jiggled would be
   decoration · slider: temperature $\kT$ in °C, −40 to 140, step 1,
   default 25, type `temperature` · headline: "At 25 °C the water in the
   beaker is a liquid, H₂O(l), and its molecules are close together and
   disordered" · no graph. Three panels across one canvas: on the left a
   beaker with a thermometer in it, holding ice, water or nothing but
   vapour as the temperature says (the macroscopic domain); on the right
   a circle of water molecules locked into six-membered rings, packed and
   disordered, or far apart (the microscopic domain); between them the
   formula H₂O with its state letter and the two arrows that say the
   picture on each side is the same water (the symbolic domain), each
   panel captioned with the name of its domain. Readout: $\kT$ with its
   number beside the formula in the state it names, and a small line
   saying that the formula names both the water in the beaker and the
   molecule in the circle, and only the letter in parentheses changes.
   Draws `temperature`: the thermometer's column, the slider and the T of
   the readout. The water, the ice, the vapour and the molecules are ink
   and `PAL` neutrals; the book's `COLOR.md` would draw the oxygen red and
   the hydrogen white from the element palette, but `figlib` has no
   `F.el()` yet, so oxygen is a filled ink disc and hydrogen a hollow one
   until it does (listed below).

No figure folds another; no figure serves an exercise; no unnumbered
image in the section.

Extra simulations (rule 15), considered and rejected: a sorter that lets
the reader drop a statement into hypothesis, law or theory, and a sorter
for the three domains. Both are the exercises q2 to q7 with a picture on
them, and neither opens a view the text does not give. None built.

## Tables

None in this section.

## Exercises

All seven are conceptual; there is no numerical item and no Check Your
Learning. Kind `exercise`, all at the end. The keyed four carry the book's
own answer; the unkeyed three are conceptual and carry an AI-written
suggested approach, marked as generated, as `config.md` says for unkeyed
conceptual items. Nothing is held for a later page and nothing is taken
from a sibling.

- `q1` fs-idm34987968 (freezing point without a thermometer), keyed,
  Apply, scientific-method.
- `q2` fs-idp45595424 (barometric pressure, natural selection, the truck),
  unkeyed, Understand, hypothesis-law-theory; AI approach.
- `q3` fs-idp38309200 (gas pressure, particles in ratios, salt at higher
  temperature), keyed, Understand, hypothesis-law-theory.
- `q4` fs-idm58468592 (lead pipe, chlorine atom, the label Al, the symbol
  Al), unkeyed, Understand, domains-of-chemistry; AI approach. The
  underlined items of the book are kept as `<u>` in the prompt.
- `q5` fs-idm67489232 (the H atom, copper wire, Ni powder, the sulfur
  molecule), keyed, Understand, domains-of-chemistry.
- `q6` fs-idp6505632 (a theory of gas pressure, macroscopic or
  microscopic), unkeyed, Understand, domains-of-chemistry with
  hypothesis-law-theory at weight 1, since the item names a theory and
  turns on the domain; AI approach.
- `q7` fs-idp40361152 (heat to melt 2 lb of ice), keyed, Understand,
  domains-of-chemistry.

No generated questions: every node has a book exercise.

## Colour

The page binds `temperature` alone, for the thermometer, the slider and
the T of the readout in `sim-water`, as `ch01/COLOR.md` lists for 1.1.
Everything else on the page is ink and `PAL` neutrals: the beaker, the
water, the molecules, the boxes and arrows of the two flowcharts. No new
hue, no new macro; `\kT` is the one macro the page writes.

## Wanted at chapter level

- No variable or equation row belongs to 1.1, so there is no anchor to
  list for this section.
- Book level, `omnistax-web/src/lib/fig/figlib.ts`: the element palette
  `F.el('O')`, `F.el('H')` that the book's `COLOR.md` proposes does not
  exist; `sim-water` draws its water molecules in ink (oxygen filled,
  hydrogen hollow) and should take `F.el('O')` and `F.el('H')` once the
  layer has them.

Decided in the chapter pass, 2026-09-12: the element palette is a book-level
want and is not built in this chapter. `sim-water` keeps its ink discs, filled
for oxygen and hollow for hydrogen, and the want is carried forward in the
chapter's log entry under what is left for a later pass.

## Recoloured and re-controlled, 2026-09-12

Brought up to root rules 7, 25 and 26 by Claude Fable 5.1. `sim-water` now
draws every water molecule in the element palette in all three phases,
oxygen red and hydrogen white with an ink outline through `F.el`, so the
want carried forward from the chapter pass is met; the phase is still
told by packing, and the temperature hue stays on the slider, the
thermometer and the T of the readout. The state is also a segmented
control beside the slider (rule 26.1): solid, liquid and gas, the one
the temperature falls in marked, and pressing one moves the temperature
to a value inside that state, so the slider and the buttons agree. Every
atom and the thermometer name themselves under the pointer through
`F.hover` (rule 26.6). The page still binds `temperature` alone; the
element colours are not a binding. The caption says to choose a state
and to rest the pointer on an atom.

## Two dimensions or three, 2026-09-12

Brought up to the book's rule on dimension (Chemistry 2e `RULES.md`, Figures,
root rule 24.8 and 26) by Claude Fable 5.1. Figure 1.5 is a molecule inset in
an otherwise flat figure, so it is built both ways.

- `sim-water` (Figure 1.5): a view choice, 2D and 3D, 2D the default. The 2D
  stage is what stood before; the 3D stage mounts on the first switch and
  shows the microscopic domain as a cluster on `F.view3d`, ice as two
  honeycomb layers of water molecules with hydrogen bonds between them, the
  liquid thirty molecules in disorder, the gas seven far apart, inside a
  faint sphere that stands for the book's circle; it shares the temperature
  slider, the state buttons and the readout. Orbit free (a cluster has no
  ground); idle spin on, since the figure is still; front and above views;
  zoom; every atom carries a hover name. `draws` unchanged.
