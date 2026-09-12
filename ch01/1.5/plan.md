# Plan: 1.5 Measurement Uncertainty, Accuracy, and Precision (m68690)

Source: `source.md` (converted from CNXML). Status: built 2026-09-12
without a review stop, on Chen's instruction to build the chapter in one
job; the plan is left here for review after.

The section that teaches the reader how much a number means. One
paragraph on exact numbers, two sketch figures (the graduated cylinder
with its meniscus magnified, Figure 1.26, and the three archery targets,
Figure 1.27), eight unnumbered inline images (five significant-figure
diagrams, the two column sums, two graduated-cylinder readings and the
four archers of an exercise), one table (Table 1.5), five worked examples
(Examples 1.3 to 1.7 in the book's chapter-wide numbering), each with a
keyed Check Your Learning, no boxed note, no equation for the formula
sheet, seven glossary entries and thirteen end-of-chapter exercises, six
of them keyed. One page (root rule 11).

## Sub-concepts (page headers)

The book has three titled headers (Significant Figures in Measurement,
Significant Figures in Calculations, Accuracy and Precision) over an
argument that runs in six steps. One block per idea:

1. `exact-numbers` **Exact numbers and uncertain ones** (book: the
   opening paragraph; counting and defined quantities are exact, measured
   ones are not).
2. `uncertainty` **Every measurement has an uncertain last digit** (book:
   the header Significant Figures in Measurement and its first three
   paragraphs; the meniscus of Figure 1.26, the quarter on two balances,
   the definitions of uncertainty and of significant figures, the scale
   that reads 120).
3. `counting-digits` **Counting significant figures: leading, captive,
   and trailing zeros** (book: from "A measurement result is properly
   reported" to the census paragraph, with the five inline diagrams).
4. `rounding` **Rounding a calculated result** (book: the header
   Significant Figures in Calculations, the three rules, the four
   illustrations to three significant figures, and Example 1.3, Rounding
   Numbers, `ex-rounding`).
5. `calculations` **Carrying significant figures through a calculation**
   (book: Example 1.4, Addition and Subtraction, `ex-add-subtract`, with
   the column sums; Example 1.5, Multiplication and Division,
   `ex-multiply-divide`; the paragraph on the reason for the rules;
   Example 1.6, the bathtub, `ex-bathtub`; Example 1.7, the rebar by
   water displacement, `ex-rebar`, with its two cylinder readings).
6. `accuracy-precision` **Repeated measurements: precision and accuracy**
   (book: the header Accuracy and Precision, the definitions, Figure
   1.27, the cough-syrup dispensers and Table 1.5).

The book's own headers stay as `<h3>` inside the block that carries them.
The reference to Appendix B is a link to the publisher's page
(`b-essential-mathematics`), as the chapter config says; the two
references to Table 1.4 are the book's words, unlinked, since a table is
not a figure row. "Figure 1.26", "Figure 1.27" and "Table 1.5" are written
in the book's words where the converter left `[ref:…]`. The bathtub
example's $V = l \times w \times d$ is plain ink LaTeX: its $d$ is a
depth, not a density (chapter `COLOR.md`). No dollar sign occurs in the
section.

Learning objectives, the summary (to `summary_html`) and the glossary
(already in `chapter.json`) come out of the running text. The section
states no key equation.

## Concept nodes (already in book.json)

| id | kind | introduced in | evidence |
|---|---|---|---|
| exact-and-uncertain-numbers | idea | exact-numbers | the eggs and the defined conversions; e2 and the unkeyed exact-or-uncertain item kept with a suggested approach |
| measurement-uncertainty | idea | uncertainty | Figure 1.26, the quarter on two balances, the definition of uncertainty |
| significant-figures | idea | uncertainty | the definition of significant figures and digits, the scale that reads 120 |
| count-significant-figures | skill | counting-digits | the five diagrams; e1, e3 |
| rounding-rules | skill | rounding | the three rules and their four illustrations; Example 1.3 and cyl1; e4 |
| significant-figures-in-calculations | skill | calculations | Examples 1.4 to 1.7 with cyl2 to cyl5; e5 |
| accuracy-and-precision | idea | accuracy-precision | Figure 1.27, Table 1.5; e6 and the unkeyed classification item kept with a suggested approach |

The section leans on `measurement-parts` and `scientific-notation` (1.4),
and its last two examples on `density`, `volume` and
`measure-volume-by-displacement` (1.4); the coverage rows mark each as
used where the text uses it.

## Figures

id · replaces · concepts · moving or still, with the reason · sliders
(type) · headline · graph

1. `sim-meniscus` · replaces Figure 1.26 (the 25-mL graduated cylinder
   with the meniscus magnified) · measurement-uncertainty,
   significant-figures · **still**: the picture answers its sliders and
   nothing in it has a clock; no cycle, no transport · the liquid volume
   $\kV$ (volume; 5.00 to 24.90 mL by 0.02, default 21.62 so that the
   book's reading of 21.6 mL comes up on load) and the tenths digit the
   reader estimates (ink; 0 to 9, default 6) · "the bottom of the
   meniscus lies between the 21 and 22 mL marks; you have read the tenths
   digit as 6, which is a reasonable estimate" (and, when the reader's
   digit is far from the meniscus, that a digit of 5 to 7 would be the
   reasonable one) · none. The cylinder is drawn on the left with its
   1-mL divisions, the magnifier beside it shows the two marks the
   meniscus lies between and the reader's estimate as a dashed level, and
   the reading is written on the right with the certain digits in ink and
   the estimated digit marked. Readout: $\kV = 21.6\ \text{mL}$ with a
   small line saying which digits are certain and why the scale allows
   one tenth. Draws volume.
2. `sim-targets` · replaces Figure 1.27 (three archery targets) ·
   accuracy-and-precision · **still**: a scatter of arrows about a target
   that changes as the sliders change; nothing moves in time · the
   distance of the group from the bull's-eye (ink; 0 to 15 cm, default
   0), the spread of the group (ink; 0.5 to 12 cm, default 1.5) and the
   number of arrows (ink; 3 to 8, default 3) · the book's own sentence
   for the case the sliders make: "these arrows are close to one another
   but not on target, so they are precise but not accurate" · none. The
   live target is drawn on the left; on the right a two-by-two grid,
   accurate or not against precise or not, holds a small target for each
   corner with the book's (a), (b) and (c) on the three the book drew and
   the fourth corner, accurate but not precise, which the book only
   describes (dispenser #2), and the corner the sliders are in is
   highlighted. Readout: the mean distance of the arrows from the
   bull's-eye and the greatest distance between two of them, in
   centimetres. Draws nothing: an accuracy and a precision are in ink.

The seven unnumbered inline images the text needs are `figure` rows with
no number (a `photo` row without a number fails the validator, as the
chapter config says), each a faithful still redrawing with no sliders,
registered with `update: () => {}` and no cycle, carrying the book's
image as its `originals` so the reader can call it up:

3. `fig-zeros` (fs-idm244068192): 3090 and 0.008020 with the captive,
   trailing and leading zeros named.
4. `fig-count-digits` (fs-idp40720144): 1267 m and 55.0 g, the first
   nonzero digit on the left marked and the count bracketed.
5. `fig-captive-leading` (fs-idm113793344): 70.607 mL and 0.00832407 mL,
   the leading zeros muted.
6. `fig-trailing` (fs-idp29412624): 1300 g with its two trailing zeros in
   doubt, and the three exponential forms that settle it.
7. `fig-column-sums` (fs-idm330284704): the two column sums of Example
   1.4 with the dropped digits muted and the rounding named.
8. `fig-rebar` (fs-idm332426528): the cylinder before and after the
   69.658-g piece of rebar goes in, 13.5 mL to 22.4 mL, the rise
   bracketed. Draws volume (the water and its readings) and mass (the
   rebar's mass), as the chapter `COLOR.md` says a cylinder beside a
   weighed mass does.
9. `fig-gold` (fs-idm283007920): the same for the 51.842-g piece of
   shiny yellowish material, 17.1 mL to 19.8 mL, at the Check Your
   Learning place of Example 1.7. Draws volume and mass.

The eighth image, the four archers W, X, Y and Z (fs-idp94481888), is the
diagram of an end-of-chapter exercise and nowhere in the running text, so
it travels with its exercise as the card's `figure` (the book's image at
`/media/ch01/CNX_Chem_01_05_Archer2_img.jpg`) rather than as a figure row
standing in the prose where nothing refers to it. The gold cylinder image
is also given to its Check Your Learning card the same way, since the
card's prompt says "with results as shown". The bundle's images carry no
`width`, so `widths` stays empty and no `data-width` or
`data-original-width` is written. No photograph in the section.

Extra simulations (root rule 15), considered and left:

- A balance whose resolution the reader switches between 0.01 g and
  0.001 g, reading the quarter as 6.72 g and then 6.723 g: the meniscus
  figure already makes the point that the last digit is the instrument's,
  and a second instrument would repeat it. Left.
- A calculator strip that shows a product's digits and greys the ones
  the rule drops: the column-sums figure does this for addition, and for
  multiplication it would only redraw the arrows of Example 1.5. Left.
- The three dispensers of Table 1.5 plotted as five points each on a
  volume axis with the 296-mL target marked: real, but the table already
  reads off in one glance and the targets figure carries the same lesson
  with its fourth corner. Left.

None built.

## Exercises

- 5 Check Your Learning items, kind `check-your-learning`, inline at the
  Check Your Learning place of their example, each with the book's answer
  from the `[answer]` note: `cyl1` after `ex-rounding` (four numbers to
  round; open, since a tolerance check cannot tell 0.42 from 0.424), `cyl2`
  after `ex-add-subtract` (open, for the same reason), `cyl3` after
  `ex-multiply-divide` (open), `cyl4` after `ex-bathtub` (the density of
  the liquid, number, 1.034 g/mL), `cyl5` after `ex-rebar` (number for
  (a), 19 g/cm³, with the book's (b) in the solution, and the book's
  cylinder image on the card).
- 6 keyed end-of-chapter items, kind `exercise`, kept with the book's
  answer: `e1` (fs-idp24074624, exponential notation; open), `e2`
  (fs-idp30473840, exact or uncertain; open), `e3` (fs-idp16088144, the
  number of significant figures in seven measurements; multi, one integer
  per part), `e4` (fs-idp15391168, rounding to two significant figures;
  open), `e5` (fs-idp358584288, six calculations; open), `e6`
  (fs-idp30946992, the archery contest; open, with the book's image on
  the card).
- 2 unkeyed conceptual items kept with an AI-written suggested approach,
  marked as generated: `e7` (fs-idp26053648, six quantities to judge
  exact or uncertain) and `e8` (fs-idp33718320, three sets of repeated
  measurements to classify as accurate, precise, both or neither; the
  approach says what to compare and does not grade the sets).
- 5 unkeyed numerical items left out and named in `exercise_notes`:
  fs-idm29064528 (scientific notation), fs-idp191983136 and
  fs-idp334498416 (significant-figure counts), fs-idp108082000 (rounding),
  fs-idp356573616 (eight calculations).
- Nothing taken from or held for a sibling section; no
  `simulation-exercise` in this section; no generated questions, every
  node having a book exercise.
- Weights: `cyl2`, `cyl3` and `e5` give `significant-figures-in-calculations`
  the full value and `rounding-rules` 2, since the rounding is the last
  step of each; `cyl4` and `cyl5` give `density` 2 and `cyl5` gives
  `measure-volume-by-displacement` 2 beside the full value for the
  significant-figure work; `e1` gives `scientific-notation` 2 beside the
  full value for `count-significant-figures`.

## Table

Table 1.5, Volume (mL) of Cough Medicine Delivered by 10-oz (296 mL)
Dispensers, stays in the text as a `div.book-table` with that eyebrow and
the book's title, in `accuracy-precision` where the book prints it.

## Colour

The page binds `volume` (the liquid in the meniscus figure, its $\kV$
slider and readout, the water and its readings in the two cylinder
figures) and `mass` (the rebar's and the rock's mass beside the
cylinders). Everything else is ink: the digits and the zeros, the rounding,
the accuracy and precision of the arrows, the $l$, $w$ and $d$ of the
bathtub.

## Wanted at chapter level

- No variable or equation row of `chapter.json` belongs to 1.5, so there
  is no anchor to write.
- concepts `rounding-rules`, `significant-figures-in-calculations`
  (`evidence`): the examples are named "Example 1.3" and "Examples
  1.5.2, 1.5.3 and 1.5.4"; the book numbers them chapter-wide, Example
  1.3 to Example 1.7, and the pages label them so.

Decided in the chapter pass, 2026-09-12: the evidence of `rounding-rules` and
of `significant-figures-in-calculations` now names the examples as the
publisher numbers them, Example 1.3 to Example 1.7, and the change is merged
into `book.json`. The four archers stay on the exercise card's own `figure`,
which the validator accepts, and the eight unnumbered figures keep their
"Figure" eyebrow.

The chapter pass removed the three of the book's own titled headers that stood
as an `<h3>` directly under this page's own `<h2>`, since the two said the same
thing twice and no other page of the chapter prints both; the page's own
headers carry the split, as root rule 3 asks, and `config.md` records the form.

## Recoloured and re-controlled, 2026-09-12

Brought up to root rules 7, 25 and 26 by Claude Fable 5.1. Figure 1.27's
four corners are four archers, and they take the categorical palette
`F.cat(i)` (rule 7.4): each corner's arrows wear one hue, the live
group on the large target wears the hue of the corner it currently
falls in, and the label under each corner is the legend, set in ink
with a swatch of the hue beside it, so the reader sees which archer the
sliders have made without reading the grid. Every arrow names itself
and its distance from the bull's eye under the pointer (rule 26.6). The
arrow count stays a plain integer slider. The page binds nothing new;
the categorical palette is not a binding. The other figures of the
section draw no atom, particle or instance to tell apart and are left
as built.
