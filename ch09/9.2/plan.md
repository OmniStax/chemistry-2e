# Plan: 9.2 Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas Law (m68751)

Source: `source.md`, converted from the CNXML with `python3 tools/convert.py 9.2`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the showcase sections in one job; the decisions below follow the
book's `RULES.md`, the chapter's `config.md`, `COLOR.md` and
`exploration.md` where a rule would have asked.

The section that states the four gas laws and combines them. Two learning
objectives, ten numbered figures (three photographs, seven sketches and
graphs), sixteen display equations, six worked examples each with a Check
Your Learning, two Link to Learning notes, two Chemistry in Everyday Life
notes, thirty end-of-chapter exercises of which fifteen are keyed, two
unnumbered images inside exercises, no numbered table, and a glossary of ten
terms. One page (root rule 11).

## Sub-concepts (page headers)

The book's own six titled headers name the sub-concepts, so the page's
header stands in the book's place (config: Headers). The opening paragraph
and the two boxed notes get blocks of their own so that each idea is one
span. One block per idea:

1. `history` **The four properties of a gas, and the balloonists who
   related them** (book: the opening paragraph, Figure 9.9). Uses
   `gas-pressure`.
2. `amontons` **Pressure and temperature: Amontons's law** (book's header;
   Figure 9.10 and Figure 9.11, the law under both names, the two-state
   form, absolute zero, Example 9.5 as `ex-hair-spray` with its Check Your
   Learning inline). Introduces `amontons-law` and `absolute-zero`; uses
   `gas-pressure` and `celsius-kelvin-conversion`.
3. `charles` **Volume and temperature: Charles's law** (book's header;
   Figure 9.12, the law, Example 9.6 as `ex-co2` and Example 9.7 as
   `ex-gas-thermometer`, each with its Check Your Learning inline).
   Introduces `charles-law`; reinforces `absolute-zero`; uses `volume` and
   `celsius-kelvin-conversion`.
4. `boyle` **Volume and pressure: Boyle's law** (book's header; Figure
   9.13 + 9.14, the law, the paragraph on linearizing data, Example 9.8 as
   `ex-syringe` with its Check Your Learning inline). Introduces
   `boyles-law`; uses `gas-pressure` and `volume`.
5. `breathing` **Boyle's law in every breath** (the Chemistry in Everyday
   Life note "Breathing and Boyle's Law", kept verbatim as a titled aside
   with Figure 9.15 inside it). Reinforces `boyles-law`.
6. `avogadro` **Moles of gas and volume: Avogadro's law** (book's header;
   the hypothesis and the law). Introduces `avogadro-law`; uses `volume`
   and `atoms-and-molecules`.
7. `ideal-gas-law` **The ideal gas law** (book's header; the four laws
   listed, PV = nRT, the gas constant, the two Sims, ideal behavior,
   Example 9.9 as `ex-methane` with its Check Your Learning inline).
   Introduces `ideal-gas-law` and `ideal-gas`; reinforces the four laws;
   uses `convert-units`.
8. `combined-gas-law` **The combined gas law** (book: the paragraph that
   derives it, Example 9.10 as `ex-scuba` with Figure 9.16 inside it and
   its Check Your Learning inline). Introduces `combined-gas-law`; uses
   `ideal-gas-law` and `ideal-gas`.
9. `diving` **Pressure and depth in scuba diving** (the Chemistry in
   Everyday Life note "The Interdependence between Ocean Depth and Pressure
   in Scuba Diving", kept verbatim; its photograph, Figure 9.17, dropped).
   Reinforces `boyles-law`; uses `gas-pressure`.
10. `stp` **Standard conditions of temperature and pressure** (book's
    header; STP, the IUPAC footnote as a parenthetical sentence, the
    standard molar volume, Figure 9.18). Introduces
    `standard-temperature-and-pressure`; uses `ideal-gas-law` and
    `avogadro-law`.

The two Link to Learning notes (the Charles's law video and the PhET
ideal-gas simulation) are dropped and named in `notes`; the second is the
trigger for `sim-gas-box`. Every `[ref:…]` to a figure is the book's own
wording, "Figure 9.11", which the build links. The references to "a later
module of this chapter" and "the final module of this chapter" stay in the
book's words. The IUPAC footnote on standard pressure is set as a
parenthetical sentence where the book hangs it. The Key Equations table is
`eq-ideal-gas` in `chapter.json` and is not printed. Learning objectives,
the summary and the glossary go to the tables.

## Concept nodes (in book-rows.json, merged into book.json)

| id | kind | introduced in | evidence on this page |
|---|---|---|---|
| amontons-law | result, eq-amontons | amontons | Figures 9.10 and 9.11, Example 9.5 and its Check Your Learning; exercises fs-idm6254784, fs-idm211017328, fs-idm189510384 |
| absolute-zero | idea | amontons (reinforced in charles) | the extrapolated lines of Figures 9.11 and 9.12; no book exercise tests it alone |
| charles-law | result, eq-charles | charles | Figure 9.12, Examples 9.6 and 9.7 with their Check Your Learning; exercises fs-idm119503088, fs-idm162722032, fs-idm221278704 |
| boyles-law | result, eq-boyle | boyle | Figure 9.13 + 9.14, Example 9.8, the breathing note; exercises fs-idp16137760, fs-idm228222512, fs-idm150329120, fs-idm136587680 |
| avogadro-law | result, eq-avogadro | avogadro | Figure 9.18; exercises fs-idm153017968, fs-idm259995696 |
| ideal-gas | idea | ideal-gas-law | the definition, the low-pressure high-temperature caveat, the note in Example 9.10; no exercise tests it alone |
| ideal-gas-law | result, eq-ideal-gas | ideal-gas-law | the two Sims, Example 9.9; exercises fs-idm221266736, fs-idm24946256, fs-idm95690800, fs-idm192798240, fs-idm247077296, fs-idm188679440 |
| combined-gas-law | result, eq-combined-gas | combined-gas-law | Example 9.10; exercises fs-idm71892416, fs-idm23005472 |
| standard-temperature-and-pressure | idea | stp | Figure 9.18; exercises fs-idp25675936, fs-idm259995696 |

Two nodes (`absolute-zero`, `ideal-gas`) have no book exercise of their own;
no question is generated for them (config: generated questions, none).

## Figures

id · replaces · concepts · still or moving, and why · sliders (type) ·
headline · graph

1. `fig-ballooning` · Figure 9.9, the three balloon flights of 1783 ·
   **photograph, kept**: the opening paragraph is about these flights and
   points at the figure; the book's caption (no credit clause is printed);
   `widths` empty since the bundle gives no width.
2. `sim-amontons-sphere` · replaces Figure 9.10 (the sealed sphere over a
   hot plate in three frames) · amontons-law · **moves**: the particles in
   the sphere travel and quicken as it warms, and the gauge has something to
   read only because they strike the wall, so the figure registers a
   continuous cycle (no scrubber, since the motion has no period) and
   carries the transport · sliders: temperature `T` (150 to 600 K,
   temperature; default 298) and amount `n` (0.25 to 2.00 mol, amount;
   default 1.00), the sphere's volume fixed at 1.00 L and written on the
   canvas · "At 298 K the gauge reads 24.5 atm; P/T stays at 0.0821 atm/K
   however the sphere is heated." · no graph: the sphere in its bath on the
   hot plate, the gauge above, the plate's glow and the bath in the
   temperature hue, the needle and dial in the pressure hue · readout
   $\kP/\kT = k$ with the live numbers · draws pressure, temperature,
   amount.
3. `sim-amontons-graph` · replaces Figure 9.11 (the table and graph of air
   at constant volume) · amontons-law, absolute-zero · **still**: a state is
   a place on the line, not a journey · sliders: `T_1` and `T_2` (100 to
   500 K, temperature; defaults 273 and 373), the initial state hollow and
   the final filled, as the chapter's colour plan marks a variant · "At 273 K
   the line gives 56.8 kPa and at 373 K 77.6 kPa; the ratio P/T is the same
   at both, 0.208 kPa/K." · the book's six data points with their table on
   the left, the fitted line in the pressure hue, the dashed extrapolation
   to 0 K in the same hue and the marker at absolute zero in ink · readout
   $\kPone/\kTone = \kPtwo/\kTtwo$ with the live numbers · draws pressure,
   temperature.
4. `sim-charles-graph` · replaces Figure 9.12 (the table and graph of one
   mole of methane at 1 atm) · charles-law, absolute-zero · **still**, for
   the same reason · sliders: `T_1` and `T_2` (111 to 500 K, temperature;
   defaults 283 and 303, the temperatures of Example 9.6), the line stopping
   at 111 K where methane liquefies and dashed from there to the origin ·
   "At 283 K the line gives 23.2 L and at 303 K 24.9 L; V/T is 0.0821 L/K
   at both." · the book's five points with their table on the left, the
   line in the volume hue · readout $\kVone/\kTone = \kVtwo/\kTtwo$ · draws
   volume, temperature.
5. `sim-boyle` · replaces Figure 9.13 and folds Figure 9.14 (the syringe
   with its gauge and the two graphs; 9.14 draws the same two graphs with
   the instrument removed), eyebrow "Figure 9.13 + 9.14", `folds` naming
   9.14, both images under `originals` · boyles-law · **still**: the
   plunger answers its slider and nothing here has a clock · sliders: `V_1`
   and `V_2` (5.0 to 30.0 mL, volume; defaults 15.0 and 7.5, the volumes of
   Example 9.8), with PV = 195 psi·mL from the book's data · "At 7.5 mL the
   gauge reads 26.0 psi; halving the volume from 15.0 mL has doubled the
   pressure from 13.0 psi." · the syringe across the top with the plunger at
   V₂ and a dashed plunger at V₁, the gauge on it; below, P against V with
   the book's five points and the hyperbola, and 1/P against V with the
   straight line, both markers on each · readout $\kPone\kVone =
   \kPtwo\kVtwo$ · draws pressure, volume.
6. `sim-breathing` · replaces Figure 9.15 (the chest on inspiration and on
   expiration) inside the breathing note · boyles-law · **moves**: a breath
   is a cycle the note itself counts at twenty a minute; one loop is one
   breath and takes about 4.5 real seconds, with a scrubber since the
   period is finite · sliders: the tidal volume, the air one breath moves
   (0.3 to 3.0 L, volume; default 0.5), and the breathing rate (8 to 30
   breaths per minute, in ink, since a rate of breathing is not a type of
   this book; default 20) · "The diaphragm contracts and the lungs expand to
   2.7 L, so the pressure in them falls 1 to 3 torr below the air outside
   and air flows in." · no graph: a torso in profile drawn simply, the lungs
   filled in the volume hue and swelling with the breath, the diaphragm
   flattening and doming, arrows for the air in and out, and the book's
   pressure label in the pressure hue · readout: the lung volume and the
   book's 1 to 3 torr difference, the Boyle's law reasoning in one sentence
   · draws volume, pressure.
7. `fig-scuba` · Figure 9.16, the diver · **photograph, kept**: Example
   9.10 and exercises fs-idp16137760 and fs-idm131888352 point at it; the
   book's caption with its credit clause; `widths` empty.
8. `sim-gas-box` · Sim, replaces nothing (the PhET simulation of the
   dropped Link to Learning note is what it stands in for) · ideal-gas-law,
   and the four laws it holds still · **moves**: the particles travel and
   strike the walls and the piston, their speed rising with the
   temperature, their count with the amount, and the box widening with the
   volume; a continuous cycle with no scrubber and the transport · sliders:
   volume `V` (1.0 to 30.0 L, volume; default 22.4), temperature `T` (100 to
   600 K; default 273), amount `n` (0.2 to 4.0 mol; default 1.00), and a
   fourth, named control, the law being held (free, Amontons, Charles,
   Boyle, Avogadro; in ink): choosing a law locks the two quantities it
   holds constant, so Boyle locks T and n and leaves the volume slider and
   the gauge, and Charles holds P fixed so that the piston moves out as T
   rises and the volume slider follows it · "1.00 mol at 273 K in 22.4 L
   presses at 1.00 atm; this is the standard molar volume." · no graph: the
   cylinder with its piston, the gauge in the pressure hue, the gas body in
   the volume hue, the heat under the cylinder in the temperature hue, the
   particles in ink; a small honest count of strikes on the walls in the
   last second is written beside the gauge · readout $\kP\kV = \kn R\kT$
   with the live numbers each in its hue · draws pressure, volume,
   temperature, amount.
9. `sim-four-graphs` · Sim, replaces nothing · ideal-gas-law, boyles-law,
   charles-law, amontons-law · **still**: a state is a place, and the
   marker answers the sliders · sliders `V` (1.0 to 30.0 L), `T` (100 to
   600 K), `n` (0.2 to 4.0 mol) · "V = 22.4 L, T = 273 K, n = 1.00 mol: the
   same state is one point on each of the four graphs, and P = 1.00 atm on
   all of them." · four graphs in a two-by-two grid, P against V (the
   hyperbola), V against T, P against T and 1/P against V (the three
   straight lines), each with the curve for the current values of the other
   two quantities and one marker for the state; the axis ranges are fixed
   from the slider maxima and a pressure past 10 atm is pinned at the edge
   · readout: the pressure from $\kP = \kn R\kT/\kV$ · this Sim is what
   exercise fs-idm188679440 asks the reader to draw · draws pressure,
   volume, temperature, amount.
10. `sim-balloons` · replaces Figure 9.18 (three balloons of He, NH₃ and
    O₂, one mole each) · avogadro-law, standard-temperature-and-pressure ·
    **still**: the balloons answer their sliders · sliders: the gas in each
    of the three balloons (a named control over He, H₂, N₂, O₂, NH₃, CH₄,
    CO₂ and Ar, in ink; defaults He, NH₃, O₂) and the amount `n` in every
    balloon (0.25 to 2.00 mol, amount; default 1.00) · "One mole each of He,
    NH₃ and O₂ at STP: 4.0 g, 17.0 g and 32.0 g, and each balloon holds
    22.4 L." · no graph: three balloons of one size in the volume hue, a
    few molecules of each gas drawn inside them in the element palette
    (`F.el`), the mass on each label in ink · readout $\kV = \kn R\kT/\kP$
    at STP · draws volume, amount.

Photographs and unnumbered images: Figure 9.9 kept and Figure 9.16 kept as
above; Figure 9.17, the coral of the Great Barrier Reef, dropped as a stock
scene beside a note and named in `notes`. The unnumbered image
fs-idm227684464 (the weather balloon beside exercise fs-idm24946256) is a
photograph of the thing the prompt names and is dropped, named in `notes`;
the unnumbered image fs-idm159072736 is the book's drawn answer to
fs-idm188679440, which `sim-four-graphs` draws live, so that exercise's
solution is the book's words and a pointer to the Sim. Every sketch and
graph is replaced. Figures that serve exercises: `sim-charles-graph`
(fs-idm162722032 reads a volume off its line, fs-idm119503088 asks how it
changes), `sim-boyle` (fs-idm150329120, fs-idm221266736), `sim-four-graphs`
(fs-idm188679440), `fig-scuba` (fs-idp16137760).

The element palette: `ch09/COLOR.md` was written before `F.el` landed and
says Figure 9.18's balloons name their gases in ink; the book's own
drawing colours the molecules by element, so the molecules inside the
balloons are drawn in the element palette (helium, nitrogen, hydrogen,
oxygen, carbon, argon), which is the one colour a figure may use that is
not a type and is used only on an atom. The balloons themselves stay in
the volume hue and the labels in ink, as the colour plan says. The
particles of `sim-gas-box` and `sim-amontons-sphere` are generic gas
particles and stay in ink.

The Sims the chapter's `exploration.md` names for this section, the gas box
and the one state on four graphs, are both built. Extra simulations (root
rule 15) considered and left: an animation of the algebra rearranging
PV = nRT (redraws a rearrangement the reader can do) and a
molecular-speed distribution (9.5's figure). Nothing else is built.

## Tables

None. The section prints no numbered table; its one `> TABLE` is the
unnumbered Key Equations table, which is `eq-ideal-gas` in `chapter.json`.
The pressure-temperature and volume-temperature data the book prints beside
Figures 9.11 and 9.12 are drawn inside those figures as the book's tables,
not set as tables of their own.

## Exercises

- Inline, kind `check-your-learning`, with the book's answers, `source_id`
  the example's own id: `cyl1` after `ex-hair-spray` (nitrogen cooled to
  –73 °C, 400 torr), `cyl2` after `ex-co2` (oxygen at –70 °C, 21.6 mL),
  `cyl3` after `ex-gas-thermometer` (ethane at 467 K, 635 mL), `cyl4` after
  `ex-syringe` (the syringe at 11.0 psi; the book keys (a) about 17–18 mL,
  (b) ~18 mL, (c) 17.7 mL, so the checked number is part (c) and the whole
  answer is the solution), `cyl5` after `ex-methane` (hydrogen in a 180-L
  tank, 350 bar), `cyl6` after `ex-scuba` (ammonia at 0 °C and 1.00 atm,
  0.193 L).
- End, kind `exercise`, keyed and kept with the book's answer: `e2`
  fs-idp16137760 (bubbles rising; open), `e4` fs-idm153017968 (directly
  proportional; open), `e6` fs-idm150329120 (the Boyle graph with double
  the moles; open), `e8` fs-idm162722032 (1 mol of methane at 150 K from
  Figure 9.12; number, 12.5 L), `e10` fs-idm211017328 (the spray can in a
  fire; number, 3.40 × 10³ torr), `e12` fs-idm221278704 (hydrogen warmed
  from –196 °C; number, 12.1 L), `e14` fs-idm24946256 (the weather balloon;
  number, 217 L), `e16` fs-idm95690800 (BF₃; multi, 8.190 × 10⁻² mol and
  5.553 g), `e18` fs-idm192798240 (grams of gas in three cases; multi),
  `e20` fs-idm71892416 (medical oxygen; number, 5561 L), `e22`
  fs-idm247077296 (butane left in the cylinder; number, 46.4 g), `e24`
  fs-idm188679440 (draw the four graphs; open, the book's answer in words
  and the Sim named), `e26` fs-idp25675936 (two refrigerants at STP;
  multi, 1.85 L and 4.66 L), `e28` fs-idm23005472 (Mount Crumpit; number,
  0.644 atm), `e30` fs-idm136587680 (volume tripled; open).
- End, kind `exercise`, unkeyed conceptual, kept with an AI-marked
  suggested approach: `e1` fs-idm6254784 (the bicycle in the sun), `e3`
  fs-idm228222512 (inversely proportional and the other things), `e5`
  fs-idm119503088 (the Charles graph with double the moles), `e7`
  fs-idm221266736 (what else is needed for the mass of air), `e25`
  fs-idm259995696 (hydrogen atoms in methane against hydrogen), `e29`
  fs-idm189510384 (temperature doubled at constant volume).
- Left out, unkeyed numerical, named in `exercise_notes`: fs-idm179450656
  (the syringe at 12.5 mL), fs-idm244984432 (carbon monoxide's
  temperature), fs-idm179333888 (the balloon with five more breaths),
  fs-idm207691136 (the air bag in kPa), fs-idm171506192 (iodine vapor),
  fs-idm87206720 (the high altitude balloon), fs-idm131888352 (the scuba
  tank filled to capacity), fs-idp25823920 (oxygen consumed in an hour),
  fs-idm26646416 (helium from radium).
- No `simulation-exercise`; no item taken from a sibling section; none
  given away.
- Weights: `e5` gives `charles-law` its full value and `avogadro-law` 2,
  since the doubling of moles is the Avogadro half of the reasoning; `e6`
  likewise for `boyles-law` and `avogadro-law`; `e24` gives `ideal-gas-law`
  its full value and each of `boyles-law`, `charles-law` and `amontons-law`
  2, since each graph is one law; `e25` gives `avogadro-law` its full value
  and `standard-temperature-and-pressure` 2; `e26` gives
  `standard-temperature-and-pressure` its full value and `ideal-gas-law`
  2, since the calculation is the ideal gas law at one set of conditions;
  `e7` gives `ideal-gas-law` full value and `boyles-law` 2, since the data
  are Figure 9.13's.

## Views

- Formulas: `eq-amontons`, `eq-charles`, `eq-boyle`, `eq-avogadro`,
  `eq-ideal-gas`, `eq-combined-gas`, all important, anchored below.
- Definitions: the thirteen variable rows of the chapter and the ten
  glossary terms.
- Concept map: the nine nodes above with their edges into 9.1 and Chapter
  1.

## Colour

The page binds `pressure`, `volume`, `temperature` and `amount`, the whole
gas law in colour, as `ch09/COLOR.md` says: the gauge, the pressure axes
and every P are the pressure hue; the gas body, the plunger's travel, the
lungs, the balloons and every V the volume hue; the heat under a vessel,
the temperature axes and every T the temperature hue; the amount slider and
every n the amount hue. The gas constant R, the constant k, the molar
masses, the particles, the vessel walls, the syringe and the breathing rate
are ink. `time` is not bound: the two moving figures give no time a
reading. The element palette is used once, for the molecules inside the
balloons of Figure 9.18, as said above.

## Wanted at chapter level

- variables `P` → 9.2-amontons
- variables `V` → 9.2-charles
- variables `n` → 9.2-avogadro
- variables `T` → 9.2-amontons
- variables `R` → 9.2-ideal-gas-law
- variables `P_1` → 9.2-amontons
- variables `P_2` → 9.2-amontons
- variables `V_1` → 9.2-charles
- variables `V_2` → 9.2-charles
- variables `T_1` → 9.2-amontons
- variables `T_2` → 9.2-amontons
- variables `n_1` → 9.2-avogadro
- variables `n_2` → 9.2-avogadro
- equations `eq-amontons` → 9.2-amontons
- equations `eq-charles` → 9.2-charles
- equations `eq-boyle` → 9.2-boyle
- equations `eq-avogadro` → 9.2-avogadro
- equations `eq-ideal-gas` → 9.2-ideal-gas-law
- equations `eq-combined-gas` → 9.2-combined-gas-law
- `ch09/COLOR.md`: the paragraph that says Figure 9.18's balloons are
  drawn alike and name their gases in ink should now say that the molecules
  inside them are drawn in the element palette, since `F.el` exists; the
  balloons and the labels stay as it says.
- `ch09/config.md`, Sims row: the gas box's volume slider runs 1.0 to
  30.0 L (not 0.5 to 10 L as `exploration.md` proposed), so that the
  default state is the standard molar volume, 1.00 mol at 273 K in 22.4 L.

### What the chapter pass did with them (2026-09-12)

Every item above was applied. The thirteen variable rows and the six
equation rows of `ch09/chapter.json` now carry the anchors this list asks
for, each law landing on the header that states it. `ch09/COLOR.md` says
that the molecules inside the three balloons of Figure 9.18 take their
atoms' colours from the element palette, now that `F.el` exists, while the
balloons themselves stay in the volume hue and their labels in ink, and
that the particles of the gas box remain generic and stay in ink; the
Colour coding line of `ch09/config.md` says the same. The Sims line of
that file now records the gas box's volume slider as running from 1.0 to
30.0 L, so that its default state is the standard molar volume. The
Formulas line corrects its count of the variable rows from nine to
thirteen and records that the anchors are written.

Two figure rows of `section.json` were corrected in the same pass, since a
page colours every type its figures draw or its readouts state: Figure
9.10 draws the sealed sphere's volume in the volume hue and so gains
`volume` to its `draws`, and Figure 9.18's readout states the pressure and
the temperature of standard conditions in their own hues and so gains
`pressure` and `temperature`. The page still binds exactly the four types
of the ideal gas law.

## Recoloured and re-controlled, 2026-09-12

Brought up to root rules 7, 25 and 26 by Claude Fable 5.1. No figure of
the section draws a grey particle any more. The gas box takes a gas
chosen from a row of buttons, He, N₂, O₂, Ar and CO₂ with nitrogen the
default, and every particle in the cylinder is a molecule of that gas
in its element's colours through `F.el`, with the right atom count and
a hint of the shape, tumbling along its heading; the law lock, which was
a slider whose value was a name, is a row of buttons, free and the four
laws (rule 26.1). Figure 9.10's sphere holds air and draws it as four
nitrogen molecules to one oxygen. Figure 9.18's three gas pickers are
dropdowns through `F.select`, eight gases each, and its molecules are
drawn from the same table as the box. Every molecule, gauge, piston,
hot plate, bath and balloon names itself under the pointer through
`F.hover` (rule 26.6). The categorical palette is not needed: no figure
of the section lays more than one gas on one graph. The page still
binds `pressure`, `volume`, `temperature` and `amount`; the element
colours are not a binding. The captions of 9.10, the gas box and 9.18
say which gas is drawn and how to choose it.

## Two dimensions or three, 2026-09-12

Brought up to the book's rule on dimension (Chemistry 2e `RULES.md`, Figures,
root rule 24.8 and 26) by Claude Fable 5.1. Particle pictures are 3D, an inset
molecule is built both ways.

- `sim-gas-box`: a glass box closed by a piston on `F.view3d`, the molecules
  of the chosen gas as spheres in the element palette (up to forty, ten per
  mole), moved every frame by the same wall-strike engine in three
  dimensions; the gauge, the readings and the law held on a flat strip
  beneath; the four-law lock and the gas choice kept. Orbit free (a box of
  gas has no up), idle spin off since the molecules already move, auto-rotate
  button present, front and corner views, zoom. Every sphere and the piston
  carry a hover name.
- `sim-amontons-sphere` (Figure 9.10): a glass sphere of air in a water bath
  on a hot plate, twelve molecules per mole; gauge and readings on the strip
  beneath. Orbit: pitch 0.02 to 1.25 rad (1° to 72° above level), since the
  plate is a ground and the scene is never seen from beneath; yaw free; spin
  off; front and above views.
- `sim-balloons` (Figure 9.18): a view choice, 2D and 3D, 2D the default. The
  2D stage is what stood before; the 3D stage mounts on the first switch,
  three translucent spheres in the volume hue with their knots, strings and
  molecules, sharing the dropdowns, the amount slider and the readout. Orbit
  free (hanging balloons have no ground); spin off; front and corner views.
- The flat particle engine, `speedOf` and `hotplate` are gone from the file;
  `draws` lists unchanged.

## Figure audit pass, 2026-09-12

Brought up to the audit of the book's figures against `RULES.md`. Each line
below says what the figure now is: its tier, whether it moves, its controls,
whether it is flat or three-dimensional and with what bound, and whether its
labels are on.

- `sim-amontons-sphere` (Figure 9.10): a moving Figure, a continuous cycle
  with the transport and no scrubber. Controls: the temperature and amount
  sliders. 3D: the sphere stands in a bath on a hot plate, so the yaw is free
  and the pitch is held between level and 72° above it, and the scene never
  spins on its own, since its particles already move. Two things the audit
  found are corrected. The bath is water, so the temperature slider now runs
  from 273 K to 373 K, the ice point to the boiling point, instead of 150 K
  to 600 K. And no body is tinted by the temperature any more (root rule 7):
  the water is drawn in ink at a fixed opacity and the plate's element in the
  page colour, while the temperature hue stays on the slider, the reading and
  the T of the readout. Labels on: the sphere, the bath and the plate, each
  with a hover name.
- `sim-amontons-graph` (Figure 9.11): a still Figure, two temperature
  sliders, flat, labels on. The two pressure labels now take opposite sides
  of their points where the two states are close or coincide, as 9.12's
  volume labels already did, so they no longer overprint.
- `sim-charles-graph` (Figure 9.12): unchanged. A still Figure, two sliders,
  flat, labels on.
- `sim-boyle` (Figure 9.13 + 9.14): a still Figure, two volume sliders,
  flat, labels on. Its `original_caption` now prefixes each of the two book
  captions with its own number, so the reader who calls up the originals sees
  which caption belongs to which picture.
- `sim-breathing` (Figure 9.15): a moving Figure, one breath a cycle, with
  the transport and its scrubber. Controls: the tidal-volume slider and the
  rate slider. Flat. Two things are corrected. **The cycle now runs in real
  time**, so the rate slider really does change how long a breath takes,
  instead of changing only the printed numbers. And the swelling of the
  lungs, which is a few percent of their radius and invisible at life size,
  is exaggerated four times, or by as much of that as the chest will hold at
  the largest breath, with the factor drawn written beside the lungs and
  again in the readout, and the true volumes given throughout (rule 28.4).
  The lungs now grow about a fixed centre, so the diaphragm and its label
  stay on the canvas at every setting. Labels on.
- `sim-gas-box` (Sim): a moving Sim, a continuous cycle with the transport
  and no scrubber. Controls: the gas dropdown, the volume, temperature and
  amount sliders, and the buttons for the law held. 3D: a box of gas has no
  up to keep, so the yaw is free, and it does not spin on its own. **A slider
  a law has taken over is now disabled and greyed** rather than moved and
  snapped back (rule 24.6, `ctl().disable`): under Amontons's law the volume
  and the amount are locked, under Charles's law the amount is locked and the
  volume follows the piston, under Boyle's law the temperature and the amount
  are locked, and under Avogadro's law the temperature is locked and the
  volume follows the piston. A line on the strip says so. Labels on, with a
  hover name on every molecule, the piston and the gas.
- `sim-four-graphs` (Sim): a still Sim, three sliders, flat, labels on. Its
  readout said that the P–V graph stands still under the temperature slider,
  which is not true of that graph. It now says what is true: the volume
  slider leaves the two curves drawn against V exactly where they are and
  only slides the marker along them, and the temperature slider does the same
  to the P against T line, since that graph is drawn at one volume and one
  amount.
- `sim-balloons` (Figure 9.18): a still Figure. Controls: a view choice of 2D
  and 3D with 2D the default, three gas dropdowns and the amount slider; the
  scene mounts on the first switch and turns freely, since hanging balloons
  have no ground, and does not spin on its own. The string of each balloon is
  now short enough that it never reaches the name of the gas beneath it, even
  at two moles. Labels on, with a hover name on every molecule and every
  balloon.
