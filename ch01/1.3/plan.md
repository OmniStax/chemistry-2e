# Plan: 1.3 Physical and Chemical Properties (m68670)

Source: `source.md`, converted from the CNXML by `tools/convert.py 1.3`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the chapter in one job; the decisions below follow the book's
`RULES.md` and the chapter's `config.md` where a rule would have asked.

The chapter's shortest section and its last qualitative one: two
objectives, no worked example, no Check Your Learning, no equation of its
own and no table. Five numbered figures (three sets of photographs, the
hazard diamond inside a Chemistry in Everyday Life note, and the periodic
table), one boxed note, eight end-of-chapter exercises of which the key
covers four, and six glossary terms. One page (root rule 11).

## Sub-concepts (page headers)

The book runs its argument without a titled header: properties and
changes of the physical kind, then of the chemical kind, then the
extensive-against-intensive distinction, the boxed note, and the three
classes of elements with the periodic table. One block per idea:

1. `physical` **Physical properties and physical changes** (book: the
   opening paragraph, which defines a property, a physical property and a
   physical change and lists wax melting, sugar dissolving and steam
   condensing; Figure 1.18).
2. `chemical` **Chemical properties and chemical changes** (book: the two
   paragraphs that define a chemical property and a chemical change, with
   iron against chromium and nitroglycerin against neon; Figures 1.19 and
   1.20).
3. `extensive` **Extensive and intensive properties** (book: the paragraph
   on the gallon and the cup of milk and the drop and the pot of hot oil;
   the section's one Sim sits at its end).
4. `hazard` **Chemistry in Everyday Life: Hazard Diamond** (the boxed note,
   kept verbatim as a `<div class="note">` with the book's title as its
   `<h3>`, with Figure 1.21 inside it where the book prints it).
5. `elements` **Metals, nonmetals and metalloids** (book: the two closing
   paragraphs on conductivity, the three classes and the periodic table;
   Figure 1.22).

The `[ref:…]` references are written as the book prints them, "Figure
1.18" and so on, and the build links each to its row. The learning
objectives, the summary and the glossary come out of the running text into
the tables; the book prints no key equation for this section.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| physical-property | idea | physical | the definition and its examples; four of the six underlined properties of fluorine (ex1); the conductivity of `elements` uses it |
| chemical-property | idea | chemical | the definition, iron against chromium (Figure 1.19), nitroglycerin against neon; two of the fluorine properties (ex1); the hazard diamond's flammability and reactivity use it |
| physical-and-chemical-change | idea | physical (the physical change is defined there; the chemical change in `chemical` reinforces it) | Figures 1.18 and 1.20; the summary; ex2, ex3, ex4, ex5 |
| classify-physical-or-chemical | skill | chemical (where the text models the judgement: rust is a different kind of matter, so its formation is a chemical change) | ex2 and ex3 (ten changes), ex4 (the expanding oxygen), ex5 (hydrogen and oxygen making water vapor) |
| extensive-and-intensive-properties | idea | extensive | the milk and the oil; ex6, ex7, ex8 |

The section rests on `matter` (1.1) through its prerequisite edges and on
nothing else; no coverage row of this page uses a concept of another
section.

## Figures

id · replaces · concepts · moving or still · sliders · headline · graph

1. `fig-physical-change` · keeps Figure 1.18, a `photo` row · physical-and-chemical-change · a photograph · keep: the text points the reader at it ("when steam condenses into liquid water (Figure 1.18)") and the concept's evidence names it; the wax and the steam are the two changes the sentence lists, not a stock scene beside it. Caption kept whole with both credit clauses.
2. `fig-rust` · keeps Figure 1.19, a `photo` row · chemical-property · a photograph · keep: the text points at it and it shows the thing the passage is about, iron that rusts beside chromium that does not.
3. `fig-chemical-change` · keeps Figure 1.20, a `photo` row · physical-and-chemical-change · a photograph · keep: the text points at it and its four panels are the four chemical changes the sentence lists (copper in nitric acid, combustion, cooking, rotting).
4. `sim-extensive` · replaces nothing (a Sim, no number) · extensive-and-intensive-properties · value add: variation by slider, on the book's own case: the gallon and the cup of milk, each at 20 °C, and the two poured together, so the reader sees at once which readings add and which are the same in all three · arrows: none · **still**: the picture answers its two sliders and has no clock, so no cycle and no transport · sliders: the volume of the first sample $\kV_1$ (1000 to 4000 mL, opening on 3790 mL, the book's gallon, marked on the slider) and of the second $\kV_2$ (100 to 1000 mL, opening on 240 mL, the book's cup, marked); both type volume. The temperature slider of the first build is gone: it moved one bar and changed nothing in the idea, and a density held at 1.03 g/mL from 0 to 60 °C was not true of milk · no headline: the four rows under the samples say it, mass and volume written with + and =, temperature and density with = and =, bracketed "extensive" and "intensive" · no graph · Readout: $\kd = \km/\kV$ with the mass and volume of the samples poured together, the one thing the rows do not say (why a ratio of two extensive properties stays put, exercise 8) · 2D. The density of milk is taken as 1.03 g/mL, since the book gives none; the caption says so. Draws mass, volume, temperature, density.
  works: parts: three beakers, each standing on the pan of its own top-pan balance, each with a thermometer standing in the milk; the first two hold the two samples, the third holds both; the balances' displays are the first row of the table of readings beneath · flow: none · must hold: (1) the third volume is the sum of the first two, and its level stands where its graduations say; (2) the third balance reads the sum of the two readings shown, to the gram; (3) the small beaker is drawn to the same scale as the large ones (0.6 as wide, so a milliliter stands 1/0.36 as high), and each level agrees with that beaker's own graduations; (4) every thermometer's bulb is under the milk and all three columns stand at the same height, 20 °C; (5) the density row reads 1.03 g/mL in all three and the readout's quotient of the numbers shown rounds to it at every setting; (6) the figure opens on a gallon and a cup · read off the image: no image; from the text, a gallon and a cup of milk, each at 20 °C, combined, the temperature staying at 20 °C. A gallon is taken as 3790 mL and a cup as 240 mL.
5. `fig-hazard-diamond` · keeps Figure 1.21, a `photo` row · chemical-property · the book's own drawing, restored on 2026-11-14. The redraw was a still copy that showed less than the image and disagreed with it: it wrote "0–4" in the three numbered diamonds where the book shows a worked sign (4, 3, 2), "OX" where the book shows the struck-through W, left out the radioactive symbol, and moved each scale away from the diamond it rates into a table. The book's image keeps each scale beside its diamond and is the better figure.
6. `fig-periodic-table` · keeps Figure 1.22, a `photo` row · physical-property (uses) · the book's own image, as `config.md` decides: the periodic table sheet is deferred until the app can serve one, the text keeps the book's words about the table, and the deferral is named in `notes`.

No sketch of a quantity is in the section, so no book figure becomes an
interactive Figure. No unnumbered image. No table. No figure serves an
exercise. The bundle's images carry no width, so `widths` stays empty and
no `data-width` is written. The five images are copied from the bundle's
`media/` into `media/ch01/` under their own names.

Extra simulations (root rule 15), considered and left:

- A sorting bench where the reader drags the book's changes (wax melting,
  rust forming, sugar dissolving, a match burning) into physical or
  chemical: it would only replay the exercises, which already ask exactly
  this, and it shows nothing the photographs do not. Left.
- The gallon and the cup of milk poured together at 20 °C: the same idea as
  `sim-extensive`, which already carries it with one slider. Left.
- The drop and the pot of hot oil, with heat as a second extensive bar: it
  would bind `energy` for one bar and the chapter's colour plan keeps 1.3
  to mass, volume and temperature. Left, and the heat stays in the prose.

Only `sim-extensive` is built, as the chapter exploration proposed for
this section.

## Exercises

- No Check Your Learning; nothing inline.
- Eight end-of-chapter items, all of them conceptual, kept as `ex1` to
  `ex8` in the book's order, kind `exercise`, placed at the end:
  - `ex1` (fs-idp14236032) the six underlined properties of fluorine;
    unkeyed; Understand; an open answer with an AI-written suggested
    approach, marked as generated; tags physical-property and
    chemical-property.
  - `ex2` (fs-idp131775248) five changes, condensation to melting gold;
    keyed; Apply; the book's list as an open answer; tags
    classify-physical-or-chemical at full value and
    physical-and-chemical-change at weight 2.
  - `ex3` (fs-idp293285456) five more changes, coal to the screwdriver;
    unkeyed; Apply; AI-marked approach; the same tags and weights.
  - `ex4` (fs-idm547056) the oxygen that expands from 10 mL to 11 mL; keyed
    "physical"; Apply; open answer from the key; tags
    classify-physical-or-chemical, physical-and-chemical-change at 2.
  - `ex5` (fs-idp144519488) hydrogen and oxygen making water vapor;
    unkeyed; Apply; AI-marked approach; the same tags.
  - `ex6` (fs-idp42952176) explain extensive against intensive; keyed;
    Understand; open answer from the key; tags
    extensive-and-intensive-properties.
  - `ex7` (fs-idp85586464) five properties to sort; unkeyed; Apply;
    AI-marked approach; tags extensive-and-intensive-properties.
  - `ex8` (fs-idp121106016) why density, the ratio of two extensive
    properties, is intensive; keyed; Analyze; the book's answer; its
    display equation kept in the prompt with $\km$ and $\kV$ in their hues
    and $d$ in ink; tags extensive-and-intensive-properties.
- Nothing left out: every unkeyed item is a conceptual question, which the
  chapter config keeps with a suggested approach marked as generated, and
  no numerical item is unkeyed. No answer is computed.
- Nothing held for another section and nothing taken from one; 1.6's
  density problems stay with 1.6, as the chapter exploration decided.
- No generated questions: every node has a book exercise. Bloom levels,
  tags and weights are the agent's judgement.

## Views

- Formulas: none; the section states no equation of the chapter's table.
- Definitions: the six glossary terms, already in `chapter.json`.
- Concept map: the five nodes above with their edges from `matter`.

## Colour

The page binds `mass`, `volume`, `temperature` and `density`, all through
`sim-extensive`: the balance readings and the $\km$ of the readout in the
mass hue, the milk, its level, the two volume sliders and the volume row in
the volume hue, the thermometer columns and the temperature row in the
temperature hue, the density row and the readout's result in the density
hue. The element palette is not used.

## Wanted at chapter level

- Nothing: `chapter.json` carries no variable row and no equation row for
  1.3, so there is no anchor to write, and every concept id, glossary term
  and symbol the page needs already exists.

Checked in the chapter pass, 2026-09-12: nothing was wanted and nothing was
changed on this page beyond the form of the Hazard Diamond note, whose heading
is now an eyebrow carrying the book's own heading above the note's title, as
every note of the chapter is.

## Recoloured and re-controlled, 2026-09-12

Reviewed against root rules 7, 25 and 26 by Claude Fable 5.1 and left
as built: `sim-extensive` draws no atom, molecule or particle, so the
element palette has nothing to colour; its milk, jug, balance and
thermometer wear the mass, volume and temperature hues and ink as the
chapter's colour plan says, its density bar is ink because density is a
ratio, and its two controls are quantities on sliders with no discrete
state among them. Nothing in the figure is half coloured.

## Figure audit pass, 2026-09-12

Brought up to the audit of the book's figures against `RULES.md`. Each line
below says what the figure now is: its tier, whether it moves, its controls,
whether it is flat or three-dimensional and with what bound, and whether its
labels are on.

- `sim-extensive` (Sim): a still simulation, no cycle and no transport.
  Controls: the volume and temperature sliders. Flat. Labels on, and there
  are four of them.
- `fig-hazard-diamond` (Figure 1.21): rebuilt as the line above now says.

## Figure pass, 2026-09-28 (Claude Opus 5.5)

Judged against `docs/prompts/manim-style.md`; only the figures below changed.

- `sim-extensive` · readout the mass equation alone, the temperature in the sentence (manim 12).

## Figure re-examination, 2026-11-14 (Claude Fable 5.2)

Both drawn figures were judged with the book's image open.

- `sim-extensive` (Sim): rebuilt, as its plan line now says. The first build was one jug drawn as a toy with four bars and a temperature slider that did not touch the idea. It is now the book's gallon and cup poured together, with the readings in rows that add or stay. Its referents are `milk-1` and `milk-2`, the two samples; the earlier `jug` is gone. The beakers of the two samples wear their referent hues, the third beaker, the balances and the thermometers are ink.
- `fig-hazard-diamond` (Figure 1.21): reverted to the book's image, as its plan line says. The page no longer draws any fact colour.
