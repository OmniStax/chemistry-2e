# Plan: 1.4 Measurements (m68674)

Source: `source.md`, converted from the CNXML with `python3 tools/convert.py 1.4`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the chapter in one job; the decisions below follow the book's
`RULES.md` and the chapter's `config.md` where a rule would have asked.

The chapter's first measuring section. Four learning objectives, three
figures (two sketches and one photograph), three numbered tables and the
unnumbered Key Equations table, one display equation, two worked examples
each with a Check Your Learning, two Link to Learning notes, ten
end-of-chapter exercises of which five are keyed and three lean on the PhET
density simulation, and a glossary of fourteen terms. One page (root rule
11).

## Sub-concepts (page headers)

The book's own headers are "SI Base Units" (with Length, Mass, Temperature
and Time beneath it) and "Derived SI Units" (with Volume and Density). The
five opening paragraphs before the first header carry three ideas of their
own, so the page divides them. One block per idea:

1. `three-parts` **What a measurement is made of** (book: the three kinds
   of information in a measurement; decimal and scientific notation with
   the airliner and the mosquito; units as standards of comparison, the
   soft drink, the hamburger and the phenobarbital dose). Introduces
   `measurement-parts` and `scientific-notation`.
2. `si-units` **The seven base units** (book: the seven fundamental
   properties, the International System, NIST; Table 1.2). Introduces
   `si-base-units`.
3. `prefixes` **Prefixes for fractions and multiples** (book: the gallon,
   quart and pint; powers of ten; the kilometer; Table 1.3). Introduces
   `unit-prefixes`; uses `scientific-notation`.
4. `base-units` **SI base units** (book's header; the French Revolution
   paragraph, then its four sub-headers kept as `<h3>` with ids `length`,
   `mass`, `temperature` and `time`; Figure 1.23 under Length and Figure
   1.24 under Mass). Reinforces `si-base-units`; uses `unit-prefixes`
   under Length and Time.
5. `derived` **Derived SI units** (book's header; the one paragraph that
   says volume comes from length and density from mass and length).
   Introduces `derived-units`.
6. `volume` **Volume** (book's sub-header, kept as the block's `<h2>`; the
   cubic meter, the liter, the cubic centimeter and the milliliter; Figure
   1.25). Introduces `volume`; uses `derived-units` and `unit-prefixes`.
7. `density` **Density** (book's sub-header; the definition, the units,
   the range from gasoline to gold, Table 1.4, the sentence on measuring
   mass and volume separately, the key equation, Example 1.1 as
   `ex-density` with its Check Your Learning inline after it). Introduces
   `density`; uses `derived-units`, `volume` and
   `extensive-and-intensive-properties`.
8. `displacement` **Measuring a volume by displacement of water** (book:
   Example 1.2 as `ex-displacement`, with its Check Your Learning inline
   after it). Introduces `measure-volume-by-displacement`; uses `density`
   and `volume`.

The two Link to Learning notes (the scientific-notation refresher and the
PhET density simulation) are dropped and named in `notes`. The two
"simulation" links inside Example 1.2 are unlinked words, and the
example's own instructions are kept verbatim: the interactive figure that
stands before the example is the simulator the example's words point at.
Its note "see end of chapter Exercise 42 and Exercise 43" is written with
the publisher's chapter-wide numbers (1.1 sets seven exercises, 1.2
eighteen, 1.3 eight, so 1.4's ten are 34 to 43). The cross reference to
Appendix B is a link to the publisher's page. The footnote on the 2019
redefinition of the kilogram is set as a parenthetical sentence with its
link. The `{index:IUPAC}` marker is the plain word. Chemical formulas do
not occur; the superscripts of units are `<sup>` in the prose and LaTeX
in the display equations.

Learning objectives, the summary and the glossary go to the tables; the
Key Equations table is the chapter's `eq-density`.

## Concept nodes (in book-rows.json, merged into book.json)

| id | kind | introduced in | evidence on this page |
|---|---|---|---|
| measurement-parts | idea | three-parts | the three kinds of information, the phenobarbital dose; no book exercise tests it alone |
| scientific-notation | skill | three-parts | the airliner and the mosquito, the factors of Table 1.3; no exercise here (1.5 sets seven) |
| si-base-units | idea | si-units | Table 1.2, the four sub-headers; exercises fs-idm323373040 and fs-idm314038064 |
| unit-prefixes | skill | prefixes | Table 1.3; exercise fs-idm344858160 |
| derived-units | idea | derived | the paragraph under Derived SI Units; exercise fs-idm314038064 (c), (d), (f), (g) |
| volume | idea | volume | Figure 1.25 and the four glossary terms; no book exercise tests it alone |
| density | result, eq-density | density | Table 1.4, the key equation, Example 1.1 and its Check Your Learning, exercise fs-idm165750544 |
| measure-volume-by-displacement | skill | displacement | Example 1.2 and its Check Your Learning, exercise fs-idm165750544 |

Three nodes (`measurement-parts`, `scientific-notation`, `volume`) have no
book exercise of their own on this page; no question is generated for
them (config: generated questions, none).

## Figures

id · replaces · concepts · still or moving, and why · sliders (type) ·
headline · graph

1. `sim-length` · replaces Figure 1.23 (a meter beside a yard, a
   centimeter beside an inch) · si-base-units · **still**: a length answers
   its slider and nothing in the idea has a clock · one slider, a length
   in centimeters (1 to 100, default 100, ink, since length is untyped) ·
   "100 cm is 1 m, which is 1.094 yd or 39.37 in." · no graph: the two
   rulers are the picture, a metric rule marked in centimeters above a
   yard rule marked in inches and feet, the chosen length drawn as a bar
   over both, and beside them the book's inset of 1 in against 2.54 cm ·
   draws nothing.
2. `fig-kilogram` · Figure 1.24, the replica prototype kilogram at NIST ·
   **photograph, kept**: the Mass paragraph points the reader at it and it
   shows the object the paragraph describes; the book's caption with its
   credit clause; `widths` empty since the bundle gives no width.
3. `sim-volume` · replaces Figure 1.25 (the nested cubic meter, liter and
   milliliter; the cubic centimeter beside a dime) · volume, derived-units
   · **still**: a cube answers its edge slider · one slider, the edge of a
   cube in centimeters (1 to 100, default 10, ink) · "A cube 10 cm on an
   edge holds 1,000 cm³, which is 1,000 mL or 1 L." · no graph: the cube is
   drawn in the volume hue inside the outline of the 1 m³ box, with the 1
   dm³ and 1 cm³ cubes beside it for scale and the 1.8 cm dime beside the
   cubic centimeter as the book's part (b) has it · readout $\kV = a^3$
   with the value in cm³, and in L or m³ where the edge reaches them ·
   draws volume.
4. `sim-density` · Sim, replaces nothing · density, derived-units ·
   **still**: a cube on a balance answers its sliders · two sliders, the
   material (an index over the seven solids of Table 1.4: ice, oak, iron,
   copper, silver, lead, gold; ink) and the edge of the cube (0.50 to 3.00
   cm, default 2.00, ink) · "A lead cube 2.00 cm on an edge has a volume
   of 8.00 cm³ and a mass of 90.7 g, so its density is 11.3 g/cm³." · no
   graph: the cube in the volume hue sits on a balance whose pan, needle
   and reading are the mass hue · readout density = $\km / \kV$ with the
   live numbers, m in the mass hue, V in the volume hue, density in ink ·
   reproduces Example 1.1 on load (lead at 11.34 g/cm³ gives the book's
   90.7 g; the densities are the book's own to three figures) · draws
   mass, volume.
5. `sim-displacement` · Sim, replaces nothing · measure-volume-by-
   displacement, density · **still**: the water level answers its sliders,
   and the block is held under the surface as the example instructs · three
   sliders, the material (iron, wood, foam, the unknown copper-containing
   sample, copper, lead, gold; ink), the volume of the block (1.0 to 20.0
   mL, default 4.0, volume) and the water in the cylinder before the block
   goes in (10.0 to 40.0 mL, default 25.5, volume) · "The water rises from
   25.5 mL to 29.5 mL, so the iron block has a volume of 4.0 mL; it weighs
   31.48 g, so its density is 7.9 g/mL." · no graph: a balance on the left
   reads the block's mass in the mass hue, and a graduated cylinder on the
   right shows the water before and after in the volume hue with the rise
   bracketed · readout $\kV = V_2 - V_1$ and density = $\km / \kV$ with the
   numbers · reproduces Example 1.2 on load (iron at 7.87 g/mL gives the
   book's 31.48 g; wood 0.65, foam 0.230 and the unknown 3.26 g/mL are the
   values the book's simulator uses) and carries the simulation exercises
   below · draws mass, volume.

Photographs and unnumbered images: one photograph (Figure 1.24, kept, above);
no unnumbered image in this section. Every sketch is replaced. Figures that
serve exercises: `sim-displacement` carries the keyed PhET exercise and
Example 1.2's Check Your Learning.

Extra simulations (root rule 15), considered and left:

- A ladder of powers of ten with the prefixes of Table 1.3 on it: the table
  already states every factor, and 1.5 is where scientific notation is
  worked. Left.
- A block that floats or sinks as the fluid's density is changed (the red
  block and foam exercises): buoyancy is not what the section teaches, and
  the book's own example has the reader push the wood under. Left.
- A thermometer with the three scales: 1.6 owns it. Left.

The two Sims above are the section's own additions; nothing else is built.

## Tables

Three numbered tables stay in the text as `div.book-table`, numbered as the
publisher prints them: Table 1.2 Base Units of the SI System (in `si-units`),
Table 1.3 Common Unit Prefixes (in `prefixes`), Table 1.4 Densities of
Common Substances (in `density`). The unnumbered Key Equations table is not
printed; it is `eq-density` in `chapter.json`.

## Exercises

- Inline, kind `check-your-learning`, with the book's answers: `cyl1` after
  `ex-density` (the 0.843 cm copper cube: (a) 0.599 cm³, (b) 8.91 g/cm³;
  multi), and `cyl2` after `ex-displacement` (the foam sample, 0.230 g/mL;
  number). The second is a PhET instruction in the book; its prompt is
  rewritten against `sim-displacement`, which carries a foam sample at the
  book's density, since the config keeps every Check Your Learning inline
  and the figure carries the idea. The rewritten wording is named in
  `exercise_notes`.
- End, kind `exercise`, keyed and kept: `e1` fs-idm323373040 (a meter is
  about a yard; choice over the book's four options; Remember), `e2`
  fs-idm314038064 (the SI unit for seven measurements; open with the book's
  answer; Understand), `e3` fs-idm344858160 (eight prefix symbols; open
  with the book's answer; Remember).
- End, kind `simulation-exercise`, keyed and carried by `sim-displacement`:
  `s1` fs-idm165750544 (the unknown green block: m = 18.58 g, V = 5.7 mL, d
  = 3.3 g/mL, malachite; multi over the three numbers with the book's (c)
  and (d) in the solution; Apply). The prompt is rewritten against the
  figure: the reader selects the unknown material and sets the block's
  volume to 5.7 mL; the gemstone-guide link is named in words.
- Left out, unkeyed: fs-idm230641408 (is a liter an ounce, a pint, a quart
  or a gallon), fs-idm147829600 (SI units for seven measurements, the first
  list), fs-idm323234992 (prefixes for six factors), fs-idm239239696 (the
  132.6 g piece of jewelry), fs-idm307823136 (the red block against fluids
  of several densities; also a buoyancy item the figure does not carry).
- Held, keyed but not carried: fs-idm160286704 (the floating foam block
  and Archimedes' principle) needs a block that floats and a fluid whose
  density the reader sets, which is outside what the section teaches and
  what `sim-displacement` draws; it is named in `exercise_notes` and stays
  a `simulation-exercise` for a later figure.
- No item taken from a sibling section; none given away.
- Suggested approaches: none needed, every kept item is keyed.
- Weights: `e2` gives `si-base-units` its full value and `derived-units`
  weight 2, since three of its seven parts are derived units; `s1` gives
  `measure-volume-by-displacement` its full value and `density` weight 2,
  since the density is one division once the volume is read.

## Views

- Formulas: `eq-density`, important, anchored below.
- Definitions: the five variable rows of the section (m, V, d, t, T) and
  the fourteen glossary terms.
- Concept map: the eight nodes above with their edges to 1.1, 1.3 and
  onward to 1.5 and 1.6.

## Colour

The page binds `mass` and `volume`: `sim-density` and `sim-displacement`
draw the balance in the mass hue and the cube, the block and the water in
the volume hue, and their readouts write $\km$ and $\kV$; `sim-volume`
draws the cube in the volume hue. Density, length, the edge of a cube, the
material and the prefixes stay in ink. Neither `time` nor `temperature` is
bound: no figure of the page gives the second or the kelvin a reading, so
the t and T rows of the chapter stay in ink here, as `ch01/COLOR.md`
allows.

## Wanted at chapter level

- variables `m` → 1.4-density
- variables `V` → 1.4-volume
- variables `d` → 1.4-density
- variables `t` → 1.4-time
- variables `T` → 1.4-temperature
- equations `eq-density` → 1.4-density
- The `d` row's unit reads g/cm³; the section also writes g/mL and g/L, and
  the row could say "g/cm³ (g/mL for liquids and solids, g/L for gases)"
  in the book's words.

Decided in the chapter pass, 2026-09-12: every anchor above is written into
`chapter.json`, and the `d` row's unit now reads "g/cm³ (g/mL for liquids and
solids, g/L for gases)". The page's two worked examples are renumbered to the
publisher's chapter-wide numbering, Example 1.1 and Example 1.2, in the text,
in the figure captions and in the exercise prompts that name them; `config.md`
records the numbering. Example 1.2's Check Your Learning is kept inline as the
page built it, and `config.md` now says so. The floating-foam item
fs-idm160286704 stays held and named in `exercise_notes`.
