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
4. `sim-extensive` · replaces nothing (a Sim, no number) · extensive-and-intensive-properties · **still**: the figure answers its two sliders and nothing else, no clock is in the idea, so it registers no cycle and gets no transport · the volume of the sample of milk $\kV$ (0.25 to 4.00 L, default 3.79 L, the book's gallon; type volume) and its temperature $\kT$ (0 to 60 °C, default 20 °C, the book's room temperature; type temperature) · "3.79 L of milk at 20 °C has a mass of 3.90 kg and a density of 1.03 g/mL" · no graph: beside the scene stand four bars, mass and volume growing with the slider in their hues, density and temperature standing still · Readout: $\km = d\,\kV$ with the live numbers and $\kT$; small line saying that doubling the sample doubles the first two and leaves the last two. The scene is a jug of milk on a balance with a thermometer in it: the milk and its level are the volume hue, the balance and its reading the mass hue, the thermometer column and its reading the temperature hue, and the density in ink, as the chapter's `COLOR.md` says. The density of milk is taken as 1.03 g/mL, the round figure for whole milk, since the book gives none; it is stated in the caption. Draws mass, volume, temperature.
5. `fig-hazard-diamond` · keeps Figure 1.21, a `photo` row · chemical-property · the book's own image · the diamond's red, blue, yellow and white are the NFPA's own convention and the substance of the figure (the text says "the top (red) diamond"), not a type of the scheme, and `figlib` has no way to draw them but a hex literal, which the figure prompt forbids; so the book's image is kept rather than redrawn. It is a diagram the book prints as a JPG, and a `photo` row with its number is the row the schema has for a kept book image.
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

The page binds `mass`, `volume` and `temperature`, all through
`sim-extensive`: the balance and its reading and the $\km$ of the readout
in the mass hue, the milk, its level and the $\kV$ slider in the volume
hue, the thermometer column, the $\kT$ slider and its reading in the
temperature hue. Density is in ink, as the chapter's `COLOR.md` says, and
so is everything else on the page. The element palette is not used.

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
