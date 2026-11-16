# Plan: 1.6 Mathematical Treatment of Measurement Results (m68683)

Source: `source.md`, converted from the CNXML with `tools/convert.py 1.6`.
Status: built 2026-09-12 without a review stop, on Chen's instruction to
build the chapter in one job; the plan is left here for review after.

The last of the chapter's three measuring sections, and the one that turns
measurement into arithmetic. Two objectives, one sketch figure (the three
thermometers of Figure 1.28), one table (Table 1.6, the common conversion
factors), five worked examples each with a Check Your Learning, five key
equations, forty-three end-of-chapter exercises of which the key covers the
twenty-two odd-numbered ones, and five glossary terms. No photograph, no
boxed note and no Link to Learning. One page (root rule 11).

## Sub-concepts (page headers)

The book has two titled sub-headers, "Conversion Factors and Dimensional
Analysis" and "Conversion of Temperature Units", and an untitled opening
that derives a speed and a time from the same relation. The page divides
the run of the argument into seven blocks, one per idea, and keeps the
book's two headers as `<h3>` at the head of the block where each falls:

1. `dimensional-analysis` **Units follow the same arithmetic as their
   numbers** (book: the sprinter's speed from distance and time, the same
   relation rearranged for the time, the units dividing alongside the
   numbers, and the definition of dimensional analysis and the factor-label
   method). The speed relation `eq-speed` anchors here.
2. `conversion-factors` **A conversion factor is a ratio equal to one**
   (book: the header "Conversion Factors and Dimensional Analysis"; the
   factor derived from 2.54 cm = 1 in.; Table 1.6; the basketball player's
   34-inch jump; Example 1.8, Using a Unit Conversion Factor, with its Check
   Your Learning).
3. `computing-quantities` **Computing a quantity from measurements in
   different units** (book: the paragraph on applying the factor-label
   method beyond simple conversions; Example 1.9, the density of antifreeze,
   and Example 1.10, the Roadster's fuel economy and its cost, each with its
   Check Your Learning).
4. `temperature-scales` **Temperature and how a scale is fixed** (book: the
   header "Conversion of Temperature Units"; the definition of temperature,
   how a thermometer reads it, and the reference temperatures of the Celsius
   and Fahrenheit scales).
5. `linear-not-proportional` **Why the Celsius and Fahrenheit scales are
   related by a line, not a proportion** (book: y = mx for most units, with
   feet and inches as the example; y = mx + b for the two temperature
   scales; the slope 9 °F / 5 °C and the intercept 32 °F derived from the
   two defining temperatures; the equation for T_°F and its rearrangement
   for T_°C). The variables `T_C` and `T_F` and the equations
   `eq-fahrenheit-from-celsius` and `eq-celsius-from-fahrenheit` anchor here.
6. `kelvin-scale` **The kelvin scale and the three scales compared** (book:
   the absolute scale, Lord Kelvin, the freezing and boiling temperatures
   of water in kelvins, the slope of 1 K/°C, the two kelvin equations, the
   note that 273.15 is experimental, Figure 1.28, and the paragraph on which
   scale is used where). The variable `T_K` and the equations
   `eq-kelvin-from-celsius` and `eq-celsius-from-kelvin` anchor here.
7. `temperature-examples` **Converting a temperature** (book: Example 1.11,
   Conversion from Celsius, and Example 1.12, Conversion from Fahrenheit,
   each with its Check Your Learning).

The examples are numbered as the publisher prints them, chapter-wide: 1.4
has two and 1.5 five, so this section's are Examples 1.8 to 1.12. The
cross reference to Table 1.6 is written in the book's own words and
unlinked, since a table is not a figure row; the reference to Figure 1.28
is the book's wording and the build links it to the figure row. Exercise
p29 refers to Table 1.2 of 1.4 and names it in the book's words, unlinked.
The chapter on gases is named as the book names it, "this text's chapter
on gases". The slope m and the intercept b of the derivation, and the x and
y that stand for the two temperatures, are plain ink LaTeX (`ch01/COLOR.md`);
the three scale temperatures take `\kTC`, `\kTF` and `\kTK`, the rows
`book.json` carries for them. The book's `\cancel{}` on the units that
cancel is kept in every display equation. The dollar signs of Example 1.10
are `&#36;` in the prose, `\text{＄}` inside its display equations and the
fullwidth `＄` in the Check Your Learning prompt and answer.

Learning objectives, the section summary, the key equations and the
glossary come out of the running text into the tables and the views. The
Check Your Learning items are inline after their examples; the
end-of-chapter exercises go to the Exercises document.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| dimensional-analysis | idea | dimensional-analysis | the sprinter's speed and the time to run 25 m; the definition; the summary |
| unit-conversion-factor | idea | conversion-factors | 2.54 cm = 1 in.; the two forms of the factor in Example 1.8; Table 1.6; p1, p3 |
| convert-units | skill | conversion-factors | the 34-inch jump; Example 1.8 and its Check Your Learning; p5 to p23, p27, p29 |
| compute-with-units | skill | computing-quantities | Examples 1.9 and 1.10 and their Check Your Learning; p23, p25, p31 to p35 |
| temperature-scales | idea | temperature-scales, reinforced in kelvin-scale | the definitions of temperature and Fahrenheit; the reference temperatures; Figure 1.28 |
| linear-versus-proportional-scales | idea | linear-not-proportional | y = mx against y = mx + b; the slope and intercept derived |
| celsius-fahrenheit-conversion | result, eq-fahrenheit-from-celsius | linear-not-proportional | the two equations; Examples 1.11 and 1.12; p37 to p43 |
| celsius-kelvin-conversion | result, eq-kelvin-from-celsius | kelvin-scale | the two equations; Examples 1.11 and 1.12; p37 to p41 |

The section leans on `si-base-units`, `unit-prefixes`, `derived-units`,
`scientific-notation`, `density` and `significant-figures-in-calculations`
from 1.4 and 1.5, which the coverage rows mark as used where the text uses
them.

## Figures

id · replaces · concepts · still or moving · sliders · headline · graph

1. `sim-temperature-scales` · replaces Figure 1.28 (the Fahrenheit,
   Celsius and kelvin thermometers) · temperature-scales,
   linear-versus-proportional-scales, celsius-fahrenheit-conversion,
   celsius-kelvin-conversion · value add: variation by slider (one
   temperature moved, three readings answering at different rates) and
   the section's y = mx + b argument drawn on the same axis as the
   thermometers · arrows: none · **still**: the idea has no time in it,
   so no cycle and no transport · three sliders, one per scale and all
   three linked: $\kTF$ (−112 to 248 °F), $\kTC$ (−80 to 120 °C) and
   $\kTK$ (193.15 to 393.15 K), step 0.1, type temperature, opening on
   Example 1.11's 37.0 °C; the reader drags whichever scale they have a
   number on and the other two follow, so the figure converts in every
   direction the section's four equations do; dashed circles on each at
   the image's three temperatures (−40, freezing, boiling) · no
   headline: the reading over each thermometer and the readout say it ·
   graph below, on the thermometers' own Celsius axis: the three readings
   against the Celsius temperature, the end of each liquid thread
   standing over its point. The Celsius line passes through the origin,
   the kelvin line runs parallel to it 273.15 higher (a degree of the
   same size, another zero), the Fahrenheit line is steeper and meets 0 °C
   at 32 °F, and it crosses the Celsius line at −40 · 2D. Readout: the
   two conversions from the scale the reader set, each whole on its line.
   One hue, as `ch01/COLOR.md` says: Celsius liquid filled, the other two
   hollow, names, marks and brackets in ink. Draws temperature.

   works: parts: three glass thermometers, each a bulb joined to a stem
   with a narrow bore, the liquid filling the bulb and reaching along the
   bore to the reading; three marks on every stem (boiling point of
   water, freezing point of water, −40) joined across all three; a
   bracket on each between freezing and boiling · flow: none; the liquid
   ends lengthen and shorten together as the temperature is set · must
   hold: (1) the three liquid ends stand at the same place, since it is
   one temperature; (2) each of the nine marks sits on its own scale
   where its number belongs and the three marks of one temperature line
   up; (3) the three readings are one temperature: T_F = 9/5 T_C + 32 and
   T_K = T_C + 273.15 with the numbers shown; (4) Fahrenheit graduations
   are closer together than Celsius and kelvin ones, 180 against 100
   between the same two marks; (5) on the graph only the Celsius line
   passes through the origin, the kelvin line is parallel to it, and the
   Fahrenheit and Celsius lines cross at −40; (6) each dot on the graph
   is under the end of the liquid; (7) every readout line is true as
   written · read off the image: heads "Fahrenheit", "Celsius",
   "Kelvin"; "Boiling point of water" at 212 °F, 100 °C, 373.15 K;
   "Freezing point of water" at 32 °F, 0 °C, 273.15 K; brackets "180
   Fahrenheit degrees", "100 Celsius degrees", "100 kelvins"; a black
   line at −40 °F, −40 °C, 233.15 K. The alt text agrees with the image.
   The image stands the thermometers upright; they are laid on their
   sides here so that the graph can share their axis (rule 14: laid out
   for the one thing to see first, the three readings of one
   temperature). The kelvin reading is given to a hundredth so that it
   matches the image's 273.15 K and the readout adds up; Example 1.11
   rounds the same sum to 310.2 K.

The book's one figure is a sketch and is replaced; there is no photograph
to keep or drop and no unnumbered image. No exercise refers to a figure.

Extra simulations (root rule 15), considered and left:

- A conversion factor the reader flips over, with the units cancelling
  when it is the right way up and piling up (g²/oz) when it is not: it
  would only redraw the book's struck-out labels with a switch on them,
  which the chapter exploration names as the thing not to build. Left.
- A sprinter on a strip with distance and time on sliders and the speed
  read out: the arithmetic is one division and the units are the lesson,
  and a strip would show the running rather than the dividing. Left.
- The line y = mx + b of the derivation as a graph of its own: folded
  into the graph beside the thermometers, where it is the same picture
  with the readings on it. Not separate.

None built.

## Exercises

- 5 Check Your Learning items, kind `check-your-learning`, inline after
  the example each parallels, with the book's own answer from the answer
  note: `cyl1` after `ex-frisbee` (9.345 qt to liters, number), `cyl2`
  after `ex-antifreeze` (1.000 oz to liters, number), `cyl3` after
  `ex-roadster` (the Prius, multi: fuel economy and fuel cost), `cyl4`
  after `ex-body-temperature` (80.92 °C to K and °F, multi), `cyl5` after
  `ex-oven` (50 °F to °C and K, multi). All Apply.
- 22 end-of-chapter exercises keyed and kept, kind `exercise`, ids by
  their position in the book's list of 43 so that `p7` is the seventh
  item: `p1` (conversion factors as ratios, Understand, open with the
  book's three ratios, citing `conversion-factors`), `p3` (the soft-drink
  label, open with the book's factor and its two significant figures),
  `p5` (the soccer ball, open with the book's ranges), `p7` (the 12.0-oz
  can, number), `p9` (the red blood cell, number), `p11` (the weight
  lifter, number with the book's "yes"), `p13` (5.0 μL of serum, number),
  `p15` (nine quantities in SI base units, multi), `p17` (the 12.0-gal
  tank, number), `p19` (the long ton, number), `p21` (seven conversions,
  multi), `p23` (the cubit, multi), `p25` (the phosphoric acid and the
  flask, number with the book's "yes"), `p27` (the student's height and
  weight, multi), `p29` (the two-by-four, multi), `p31` (aluminum's
  density, number), `p33` (the masses of mercury and octane, multi),
  `p35` (the volumes of iodine and hydrogen, multi), `p37` (the boiling
  temperature of gold, multi), `p39` (the freezer, multi), `p41` (liquid
  ammonia, multi), `p43` (45 °C, number). All Apply except `p1`.
- 21 exercises left out, having no answer in the book's key, the
  even-numbered items: fs-idm321326256, fs-idm124621456, fs-idm128259568,
  fs-idm290820272, fs-idp3893440, fs-idm311405440, fs-idm293326720,
  fs-idm247037968, fs-idm242942368, fs-idm311016240, fs-idm219388000,
  fs-idm306975136, fs-idm110873792, fs-idm207241008, fs-idm95632784,
  fs-idm215482272, fs-idm305607360, fs-idm182387776, fs-idm291580080,
  fs-idm294247168, fs-idm307064960. Every one is numerical, so no
  suggested approach is written.
- `p23` names the 50-Trillion Angstrom Run and sends the reader to the
  exercise before it (fs-idm219388000), which is unkeyed and left out; the
  prompt keeps the book's words with that parenthetical reference removed,
  since everything the item needs is stated in it.
- `p15` sends the reader to Table 1.2 of 1.4 for the SI base units; the
  prompt names the table in the book's words.
- Nothing taken from a sibling section and nothing held for one: every
  item of the module tests what the module teaches. The density items
  `p31`, `p33` and `p35` compute with the density of 1.4 and stay here,
  since the work in them is the unit arithmetic; they are tagged to both
  sections' concepts.
- No generated questions: every node has a book exercise.
- Weights (root rule 20, the agent's judgement): `p3` gives
  `unit-conversion-factor` its full value and
  `significant-figures-in-calculations` weight 2, since the second question
  of the item is how many figures the factor can carry; `p13` gives
  `convert-units` its full value and `unit-prefixes` weight 2; `p15` gives
  `unit-prefixes` and `scientific-notation` their full value and
  `convert-units` weight 2, since the work is reading the prefixes off;
  `p21` gives `convert-units` its full value and `compute-with-units`
  weight 2 for the area and the volume among its parts; `p25` gives
  `compute-with-units` its full value and `density` weight 2; `p31`, `p33`
  and `p35` give `density` its full value and `compute-with-units` weight
  2, `p33` and `p35` also `convert-units` weight 1 for the millilitre and
  the litre in them; the Check Your Learning items and the temperature
  items carry the Bloom value on every concept they name.

## Table

Table 1.6, Common Conversion Factors, stays in `conversion-factors` as a
`div.book-table` with the eyebrow "Table 1.6" and the book's title, three
columns (Length, Volume, Mass), four rows, with the book's footnote on the
pound printed under the table and marked on the cell.

## Views

- Formulas: the five equations of the section already in `chapter.json`,
  the four temperature conversions important and the speed relation not.
- Definitions: the three variables of the section (`T_C`, `T_F`, `T_K`);
  the five glossary terms.
- Concept map: the eight nodes above with their edges into 1.4 and 1.5.

## Colour

The page binds `temperature` alone: the thermometer figure carries $\kTC$
on its slider, paints its three columns and the two lines of its graph in
the temperature hue, and states $\kTF$, $\kTC$ and $\kTK$ in its readout.
Everything else on the page is ink: the conversion factors and the units
that cancel inside them, the distances, times, masses and volumes of the
examples, the slope and intercept of the derivation, and the numbers on the
graph's axes.

## Wanted at chapter level

- variables `T_C` → 1.6-linear-not-proportional
- variables `T_F` → 1.6-linear-not-proportional
- variables `T_K` → 1.6-kelvin-scale
- equations `eq-speed` → 1.6-dimensional-analysis
- equations `eq-fahrenheit-from-celsius` → 1.6-linear-not-proportional
- equations `eq-celsius-from-fahrenheit` → 1.6-linear-not-proportional
- equations `eq-kelvin-from-celsius` → 1.6-kelvin-scale
- equations `eq-celsius-from-kelvin` → 1.6-kelvin-scale
- The `temperature-scales` node's evidence names Figure 1.28, which this
  page places in `kelvin-scale` where the book places it, so the node is
  introduced in `temperature-scales` and reinforced in `kelvin-scale`;
  nothing to change unless the chapter pass prefers the node introduced
  where the figure is.

Decided in the chapter pass, 2026-09-12: every anchor above is written into
`chapter.json`. The `temperature-scales` node is left where the section puts
it, introduced where the three scales are compared and reinforced where
Figure 1.28 is placed, since the book places the figure there and the node's
evidence reads correctly either way.

The chapter pass removed the book's own header "Conversion Factors and
Dimensional Analysis", which stood as an `<h3>` directly under this page's own
`<h2>` and said the same thing twice; the page's own headers carry the split,
as root rule 3 asks, and `config.md` records the form.

## Recoloured and re-controlled, 2026-09-12

Reviewed against root rules 7, 25 and 26 by Claude Fable 5.1 and left
as built: Figure 1.28 draws three thermometers and a graph in the one
temperature hue and ink, with no atom, particle or instance that a
categorical hue would tell apart, and its one control is a temperature
on a slider. Nothing in it is half coloured.

## Figure audit pass, 2026-09-12

Brought up to the audit of the book's figures against `RULES.md`. Each line
below says what the figure now is: its tier, whether it moves, its controls,
whether it is flat or three-dimensional and with what bound, and whether its
labels are on.

- `sim-temperature-scales` (Figure 1.28): a still simulation, one Celsius
  slider, flat, labels on. The kelvin reading is now given to a tenth, as the
  Celsius reading is and as Example 1.11's 310.2 K is, rather than to a
  hundredth; the two reference sentences still name the exact defining values
  273.15 K and 373.15 K.

## Figure pass, 2026-09-28 (Claude Opus 5.5)

Judged against `docs/prompts/manim-style.md`; only the figures below changed.

- `sim-temperature-scales` · dashed circles on T at −40 °C, 0 °C and 100 °C (manim 8).

## Derivations

- `linear-not-proportional`, the Celsius–Fahrenheit equation · score 1, a printed block · built as drv-celsius-fahrenheit: four nodes (slope, intercept, the equation with and without units, its rearrangement for °C); the block's displayed lines and connecting phrases are replaced, its opening sentence kept.
- `kelvin-scale`, the kelvin–Celsius equations · score 3 · not built: stated with the slope in prose, the intercept skipped; four moves but under the score bar, and the method is the one built just above.

## Figure re-examination, 2026-11-14 (Claude Fable 5.2)

- `sim-temperature-scales` (Figure 1.28): rebuilt with the book's image
  open. The earlier drawing had left out everything the image is about
  (the nine numbers at the three marked temperatures, the brackets of 180
  Fahrenheit degrees, 100 Celsius degrees and 100 kelvins, the line at
  −40), its readout added 37.0 + 273.15 to 310.1, its headline repeated
  the three readings, and its caption described the picture. Now: the
  thermometers lie over the graph's Celsius axis with every number of the
  image on them, a slider for each scale, the readout's two conversions
  each on one line with units, and a two-sentence caption.
