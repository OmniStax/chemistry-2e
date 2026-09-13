# Experiment log: Chemistry 2e (OpenStax)

Source: OpenStax Chemistry 2e, CC BY-NC-SA 4.0, copyright Rice University,
by Paul Flowers, Klaus Theopold, Richard Langley and William R. Robinson.
CNXML source: `source/osbooks-chemistry-bundle/`, a shallow clone of
github.com/openstax/osbooks-chemistry-bundle (gitignored), collection
`chemistry-2e.collection.xml`: a Preface, 21 chapters of 114 sections
with an introduction each, and 13 appendices. No PDF. The table of
contents with module ids is `toc.md`.

Workflow: the full-book pass of root rule 18 first, then chapters in
waves of three, each chapter going through prep / sections / chapter
pass, with `tools/mergebook.py` merging each chapter's book-level rows.

## Pass 1: the full-book pass (2026-09-12)

Prompted by: Chen asking to convert this book, and root rule 18, which says every book
begins with one pass that leaves its rules and tools behind before a
section is planned.

What the exploration found, in brief (`exploration.md` has the whole of
it). One module is one section and everything sits inside it: the
objectives in the module's abstract, the narrative, worked examples
with a Check Your Learning and its answer, "Key Concepts and Summary",
"Key Equations" in 51 sections, "Chemistry End of Chapter Exercises",
and the glossary. Nothing is aggregated at the end of a chapter and
there is no AP test prep. The 1736 exercises carry no type; the key
covers the odd-numbered ones, 873 in all, so half the conceptual
questions have the book's own answer and half will carry an AI-marked
approach. Four note classes: Link to Learning (95, of which 28 are PhET
simulations, none kept, all named in `notes` and used as the seed list
for Sims), Chemistry in Everyday Life (44), How Sciences Interconnect
(19) and Portrait of a Chemist (10), the last three kept as titled
asides. 627 numbered figures and 529 unnumbered inline images, the
latter mostly Lewis structures and reaction schemes that the page
cannot do without. The molecular
drawings use the CPK atom palette, named in the captions. Images carry
no width. The book links out only through openstax.org redirects.

What was decided, in `RULES.md` and `COLOR.md`:
- the Preface is the book's `intro/` page and each chapter's
  introduction is its `intro/` page, by root rule 21; the thirteen
  appendices are not pages but reference sheets, `sheets/<id>.json`
  written from their tables, with the periodic table first and Appendix
  B (Essential Mathematics) the one prose exception that becomes a page
  later;
- fourteen types in scheme order (time, amount, mass, volume,
  concentration, pressure, temperature, energy, entropy, rate,
  wavelength, frequency, potential, charge); mass is typed because the
  mass–mole conversion is the book's central skill, pH is a variant of
  concentration, and K, Q, k, Z, A, counts, ratios and percents stay in
  ink;
- the atom palette is a second, fixed, non-scheme palette that figures
  draw from directly, proposed as `F.el(symbol)` in `figlib`, which does
  not switch off with colour coding and never appears in the colour
  menu;
- three exercise kinds: `check-your-learning` (inline after its
  example), `exercise` (the Exercises document) and
  `simulation-exercise` (held until a Sim of our own carries the idea);
- photographs kept where they show the thing the passage is about or
  sit in a chemist's portrait, dropped where they are stock scenes;
  three spatial ideas (7.6, 8.2, 10.6) may use the three.js the app
  already loads, everything else is planar.

`book.json` carries the identity, the licence, the Preface as `intro`,
the fourteen types, thirty-one symbols with `\k` macros for the typed
ones, the three kinds, and empty `chapters`, `concepts` and
`concept_prereqs`. `exploration.md` closes with the per-chapter list of
what a live figure could show that print cannot, which is what root
rule 23 asks for and what the chapter passes plan against.

The converter and the table of contents are the subject of pass 1a,
below.

Left for the chapter passes: the Preface page in `intro/`; the sheets tool and the
first sheet (the periodic table), which Chapter 1 needs at 1.3; the
element palette in `figlib`; each chapter's `config.md`, `COLOR.md` and
`exploration.md`; and the config list for Chapter 1, which the report of
this pass puts to Chen before any section is built.

Checks: `book.json` parses; `npm run check:content` with the chemistry
environment (`OMNISTAX_CONTENT_DIR="../omnistax-content/Chemistry 2e"
OMNISTAX_BOOK=chemistry-2e`) reads the manifest and reports "0 chapters,
0 sections, 11 checks, no errors": an empty `chapters` array and an
`intro` record whose page is not yet built both pass.

## Pass 1a: the shared converter, `toc.md` and `modules.json` (2026-09-12)

Root rule 18 says a tool more than one book uses lives above the
books, so the shared converter is `omnistax-content/tools/cnxml2md.py`.
For this book it emits, with the markers its docstring lists: the
learning objectives from `md:abstract` as a headed block, the summary,
key-equations and exercises
sections marked on their headers, notes kept with their class and
title (the "Answer" note after a Check Your Learning as `[answer]`),
tables as a `> TABLE {tab:id}` block followed by a markdown table, or an
irregular block with spans where a cell spans or holds paragraphs,
images outside figures (529 in this book, the Lewis structures and
reaction schemes) as `> IMAGE {img:id}` lines, a figure's `splash` or
`scaled-down` class on its FIGURE line, sub and superscripts in prose
kept as HTML, footnotes, and cross-module references with their module.

Reaction notation is plain LaTeX (`\longrightarrow`,
`\rightleftharpoons`, `\cancel{}`, cell bars), since the app never
imports the mhchem extension KaTeX ships; one import in
`omnistax-web/src/lib/math/prerender.ts` would enable `\ce` later. All
5369 math snippets of the book parse in the app's KaTeX with no error.

It also escapes `%`, `$`, `#`, `_` and `&` inside `\text{}` (an
unescaped `%` would swallow the rest of a text run), writes out the
column spec of a three-column `array` (a bare `{l}` is a KaTeX error),
prints a nested list once, and keeps images outside figures. Still flat
for this book: `mmultiscripts` (warned where it occurs), bold and
italic `mtext` variants, a unit inside `<mn>`, stepwise lists.

`modules.json` lists every chapter with its introduction module and
sections, the Preface and the thirteen appendices; no module carries a
slug, so slugs follow openstax.org (`preface`, `N-introduction`,
`N-M-title-kebab`). `toc.md` is the collection order without page
numbers, there being no PDF. `tools/convert.py` converts a chapter, a
section, the preface or an appendix in one command. The whole book
counts 114 sections, 627 figures, 191 tables, 1558 equations, 301
examples with 292 Check Your Learning answers, 1736 end-of-chapter
exercises of which the key covers 873, and 766 glossary entries.
`mergebook.py` still derives its book from its own location, so a copy
in this book's `tools/` will serve until it takes the book from an
argument.


## Pass 2 (2026-09-12): Chapter 1, Essential Ideas, is built

Prompted by: Chen asking for the chapter to be built in one job, with no
per-section check-ins, a plan file written before each page and left for
review after.

What was built. Eight pages: the book's Preface as its own introduction in
`intro/`, the chapter introduction in `ch01/intro/`, and the six sections 1.1
to 1.6, none of them folded. Thirty-eight figure rows across them: fourteen
photographs of the book kept with their numbers and their credit clauses,
twelve faithful copies of the book's flowcharts, unnumbered diagrams and
cylinders, and twelve interactive figures, nine of which carry a number of the
book (the states of matter of 1.6, the balances of 1.8, the electrolysis cell
of 1.15, the metre rule of 1.23, the nested volumes of 1.25, the meniscus of
1.26, the archers of 1.27 and the three thermometers of 1.28) and three of
which replace nothing and are Sims: the extensive-against-intensive jug of
1.3, and the density cube and the displacement cylinder of 1.4. Every figure
of the chapter is still: nothing in this material has a clock in it, so no
figure registers a cycle and none carries a transport. Seventy-nine exercises,
twelve of them the Check Your Learning items placed inline after their
examples; 93 concept coverage rows against 39 concept nodes with 47
prerequisite edges; 57 glossary entries, 8 variables and 6 equations in
`chapter.json`; six of the book's tables kept in the running text as
`div.book-table`, numbered Table 1.1 to Table 1.6 as the publisher numbers
them.

What the chapter pass changed. The anchors the sections asked for are written
on all eight variable rows and all six equation rows, each naming an id in the
section's own text, and the density row's unit now reads as the book writes
it, "g/cm³ (g/mL for liquids and solids, g/L for gases)". The book numbers its
worked examples chapter-wide, as it numbers its figures and its tables, so
1.4's two examples are Example 1.1 and Example 1.2 rather than a number built
from the section, and the evidence of five concept nodes now names the
examples the way the pages label them. Three of the book's own titled headers
in 1.5 and one in 1.6 stood as an `<h3>` directly under the page's own `<h2>`
and said the same thing twice; the page's header now stands in the book's
place, as it does on every other page of the chapter. The three Chemistry in
Everyday Life notes carry the book's heading as a `div.eyebrow` above the
note's title, which is the form the app's stylesheet sets. `ch01/COLOR.md` and
`config.md` now say what the pages do rather than what was expected of them:
the chapter binds `mass`, `volume` and `temperature`, and `time` is not bound,
since the second is named among the base units of 1.4 and no figure gives it a
reading.

What was learned about this book's constructs. The publisher's chapter-wide
numbering reaches further than the figures: a table, a worked example and a
figure are all numbered from the start of the chapter, and a page that numbers
an example from its section will disagree with the prose that cites it. The
`everyday-life` note is the book's own box and the app has a form for it
already, the eyebrow inside `.note`, so the box needs no new class. An exercise
placed inline needs its `place.after` to be an id the text carries: the app
mounts a card host of its own beside that id, and the twelve Check Your
Learning items of this chapter all land where the book puts them. The bundle's
images carry no width, so `widths` stays empty throughout and every image is
served at its natural size.

What is left for a later pass. The element palette of the book's molecular
drawings has no home in `figlib` yet: `F.el('O')` and `F.el('H')` would let
1.1's water figure and 1.2's Figure 1.14 draw their molecules live instead of
in ink and in the book's photograph. The periodic table of 1.3 waits for the
sheet mechanism, and 1.3 keeps the book's own image and names the deferral. The
floating-foam exercise of 1.4, fs-idm160286704, waits for a figure that can
float a block in a fluid whose density the reader sets.

The checks. `npm run check:content` reads the whole book with no error, 11
checks over 1 chapter, 6 sections and 2 introduction pages; `astro check`
reports no error across 142 files; the book builds. A headless pass over all
eight pages in light and in dark found no console error and no page error,
every image with a natural width, a canvas under every interactive figure, no
transport anywhere, and the inline exercises mounted at their own hosts.
Screenshots of all 23 canvases at 1400 wide show no label collision and no
clipped text. The physics book still checks clean, which this pass touched
nothing of.


## Pass 3 (2026-09-12): Three showcase sections are built: 6.2, 7.6 and 9.2

Prompted by: Chen asking for the three sections of this book with the
richest opportunity for interactive simulation to be built as showcases,
in one job with no check-ins. Chapters 6, 7 and 9 were prepared in the
pass before this one, each listed whole in its `chapter.json` with rows
for the one section that would be built; this pass built those three
sections and closed over them. The per-section stops of root rule 2, the
plan review of root rule 5 and the user picks of root rule 15 were
replaced by a `plan.md` written before each section and left for review
after, which is where every decision named below is recorded.

## What was built

**6.2 The Bohr Model** (m68732). Nine page headers over the book's own
argument, which prints no header of its own, the prose verbatim from the
planetary atom to the model's failures. Four figure rows: one interactive
Figure folding Figures 6.14 and 6.15 into a ladder of the hydrogen
energy levels that an electron climbs and falls while a photon leaves
for the wavelength strip or arrives from it, two Sims (the series of
transitions that end on one orbit, and the orbit radius read off the
rungs), and the two-spectra image of 6.1 kept unnumbered for the
exercise that argues from it. Seven equations and fourteen variable rows
in `chapter.json`, four glossary entries, eleven concepts on eighteen
prerequisite edges, ten new symbols with their `\k` macros, two
inline Check Your Learning items and nine end-of-chapter exercises; six
unkeyed numerical items are left out and named.

**7.6 Molecular Structure and Polarity** (m68742). Eleven page headers,
the book's four sub-headers among them, and eight worked examples with
their Check Your Learning beneath each. Twenty-four figure rows carrying
fifteen of the book's numbers, Figures 7.14 to 7.28, three of them folded
(7.16 with 7.19 and 7.20 into one VSEPR bench, 7.26 with 7.27 into one
bond-moment bench), eleven unnumbered Lewis structures and sketches
redrawn faithfully, and one Sim in which the regions of electron density
find their own places. Seven of the figures are three-dimensional scenes
the reader turns by dragging. Three equations and three untyped variable
rows, sixteen glossary entries, eleven concepts (two of them placeholders
in 7.2 and 7.3) on thirteen edges, eight inline items, seventeen
end-of-chapter exercises and four of the five PhET items rewritten
against this page's own figures.

**9.2 Relating Pressure, Volume, Amount, and Temperature: The Ideal Gas
Law** (m68751). Ten page headers, six worked examples, and the
book's two Chemistry in Everyday Life asides kept verbatim. Ten figure
rows: two kept photographs (Figures 9.9 and 9.16), six interactive
Figures for Figures 9.10 to 9.18 with 9.13 and 9.14 folded into one
syringe and graph, and two Sims, the gas box that holds any two of the
four properties still and the one state drawn on four graphs at once.
Six equations and thirteen variable rows, ten glossary entries, ten
concepts on twenty-two edges, nine new symbols for the two-state pairs,
six inline items and twenty-one end-of-chapter exercises; nine unkeyed
numerical items and the coral photograph of Figure 9.17 are left out and
named.

## What the closing pass did

Every anchor the three plans asked for is written: the thirty variable
rows and sixteen equation rows of the three `chapter.json` files now land
on the header that states each one, so the formula sheet and the
definitions view jump into the page. `eq-ionization-limit` gained the
`ktex` its plan proposed, so the sheet colours its energies as the page
does. Two figure rows of 9.2 were corrected, since a page colours every
type its figures draw or its readouts state: Figure 9.10 draws the sealed
sphere's fixed volume in the volume hue, and Figure 9.18's readout states
the pressure and temperature of standard conditions in theirs, so both
rows gained those types to `draws`. The three chapters' `config.md` and
`COLOR.md` files were brought up to date where they were written before
the element palette landed and before Chen's decision on three
dimensions; `ch07/config.md` carries that decision, and `RULES.md` was
not touched.

## What was learned

**A moving particle box is a gauge, not an animation.** The box of 9.2
earns its clock because the pressure it reads is the rate at which the
particles strike the wall: the gauge has something to read only because
the particles travel, and the readout can say "about ten strikes on the
walls each second" and mean it. The three properties the reader sets are
sliders and the fourth is the reading, so holding two of them still is
what turns the one box into each of the four laws in turn, and a still
graph beside it is the better picture of a state, since a state is a
place on a line rather than a journey. Of the ten figures of 9.2 only
three carry a transport, and each of the three has something that
travels.

**A projected molecule was not enough.** The section's ideas are the
angle between two bonds and the sum of three vectors in space, and
`figlib`'s `view()` and `face()` state one viewpoint rather than letting
the reader take another. The seven spatial figures of 7.6 are therefore
full scenes on the global `THREE`, which the shell loads on every page,
and the reader turns each by dragging it. What print cannot do, and what
a fixed projection cannot either, is show that the marked bond angle of
formaldehyde stays 118° while the angle a flat drawing seems to show runs
from 118° to 135° as the molecule turns; that is the whole argument for
why a Lewis structure says nothing about shape, and the figure makes it
in one gesture. The book's own flat notation, the wedge-and-dash
sketches and the Lewis structures, stays on `figlib`, where it belongs.

**A photon figure wants two frames at once.** The ladder of 6.2 draws the
energy levels to scale and a wavelength strip beneath them, and the one
thing that ties them is the photon: it leaves the ladder at an emission
and lands on the strip as a line, where every line the reader has landed
stays. The strip is logarithmic from 10 nm to 10 μm so that the
ultraviolet, the visible band and the infrared all fit one fixed frame at
every nuclear charge, and the visible band is painted in the colours of
light, which this book's `RULES.md` keeps as a physical fact rather than
a type. Drawing the rungs to scale is what makes the crowding toward the
ionization limit visible, and it is also what forces the upper labels
onto leaders.

## How a three-dimensional figure mounts, and what `figlib` should gain

`7.6/figures.js` carries one helper, `viewer(stage, {h, dist, tilt,
spin, onRender})`. It appends a `div.three-wrap` to the figure's stage
with its aspect ratio set to 1400 : h so the scene sits where a `figlib`
canvas would, and mounts a `THREE.WebGLRenderer` with `alpha: true` and a
transparent clear colour in it, so the page's own panel shows through in
both themes. One directional lamp from the upper left front and an
ambient light; a perspective camera at `dist`; a `part(x)` group per
panel, each tilted alike, that a pointer drag turns together about the
screen's vertical and horizontal axes, with a slow idle spin until the
first drag and none under reduced motion or while the page's animation
switch is off. Atoms are spheres in the element palette through
`F.el(symbol)`, bonds are cylinders in ink, lone pairs are half-opaque
lobes, arcs and brackets are lines, bond moments are cylinder-and-cone
arrows, and every label is an HTML `.lab3d` element laid over the canvas
at the projected point, so it sets in the page's face. Geometries are
shared, a redraw disposes the materials it replaces, a `ResizeObserver`
follows the container, the device pixel ratio is capped at two, the
renderer draws only when something changed and only while an
`IntersectionObserver` says the figure is on screen, and it disposes
itself five seconds after its wrapper leaves the document. A browser
without WebGL gets one sentence in the wrapper instead of a scene.

Before 8.2 draws hybrid orbitals and 10.6 draws crystal lattices,
`figlib` should carry that helper as `F.view3d(stage, opts)` beside
`F.sim()`, with the sphere, cylinder, lobe, arrow and arc builders, so
the next section copies nothing. Two smaller things go with it: `sim()`
should be able to say that a stage wants no canvas of its own, which a
3D figure asks for today by passing no height; and the `.three-wrap` rule
should take its aspect ratio from a `data-h` attribute as canvases do,
rather than have the figure override `aspect-ratio` and `background`
inline.

## Checks

`npm run check:content` with `OMNISTAX_BOOKS=chemistry-2e` reports four
chapters, nine sections, two introduction or summary pages, eleven
checks, no errors; `npm test` passes 378 of 378; `astro check` reports no
error and no warning over 143 files; a build of the book succeeds. A
headless pass over the three pages in light and dark found no console or
page error, every image loading, every `figure.sim` with a canvas, a
transport on the six moving figures and on no still one, and every
eyebrow agreeing with its row. On 7.6 each of the seven three-dimensional
figures mounts a WebGL canvas with no context loss and a transparent
ground, spins idly, stops when dragged and turns with the drag, and
renders in both themes; no yaw or pitch slider remains anywhere on the
page. One fix pass followed: the bond-distance label of Figure 7.14 sat
on the C and O labels, so those two now stand above their atoms, and the
upper hydrogen's label was clipped by the top of the frame, so both
hydrogen labels were drawn in and dropped; a second measurement pass over
every label of every scene reports no overlap and nothing outside its
frame. Screenshots of all thirty-eight figures at 1400 wide are in the
pass's scratch directory. Finally `npm run check:content` and `npm test`
with no book chosen pass for every book the content root holds: this one,
College Physics 2e and the figure sandbox.

## Pass 4 (2026-09-12): the figure audit over every built section

Chapters 1, 6.2, 7.6 and 9.2 were read against the root rules as revised
through item 28 and fixed in one pass with the physics book (its LOG, pass 34,
records the kinds of fault and the two library changes). What is this book's
own: Figure 1.14 and the hazard diamond of 1.21 are drawn live, one through
`F.el` with a 2D and a 3D view, the other with the four NFPA colours as
physical fact; the accuracy test of 1.27 judges the centroid; the dipoles of
7.28 now turn the hydrogen end to the negative plate; the bond moments of 7.26
use the book's own Figure 7.6 electronegativities; the ladder of 6.14 + 6.15
has a magnified inset above n = 3; held laws in the gas box disable their
sliders. The notes follow.

#### Chemistry 2e: the figure audit pass over ch01, 6.2, 7.6 and 9.2

Worked from the audit of 2026-09-12 against the root `RULES.md`, the book's
own `RULES.md` and `COLOR.md`, and each chapter's `config.md`. Every row of
Part B that names these chapters was taken, and the patterns of Part A were
swept over every `figures.js`, `text.html` caption and `plan.md` of them, not
only over the figures the tables name.

##### 1.1 Chemistry in Context

The plan said Figure 1.3 was redrawn with twenty boxes; the book and the code
both have eighteen, and the plan now says eighteen. Nothing else in the
section needed a change: `sim-water` already carried its 2D and 3D views, its
state buttons and its hover names, and its plan line now states the tier, the
motion, the controls, the bound on the orbit and the labels in one place.

##### 1.2 Phases and Classification of Matter

Figure 1.14, the molecules of the elements and of the compounds, was still
the book's photograph because `F.el` did not exist when the section was
built. It does now, and the book's rule asks a structure the text names to be
built both ways, so the figure is redrawn live: hydrogen, oxygen, phosphorus
and sulfur as molecules of one element, water, carbon dioxide and glucose as
molecules of compounds, every atom a disc in its element's colour, with a
view choice of 2D and 3D, 2D the default and the scene mounting on the first
switch. Its row changed from `photo` to `figure` and took the book's image
and caption into `originals` and `original_caption`, so the reader can still
call up the book's own picture.

Three smaller faults went with it. The gas of Figure 1.6 drew a different
number of molecules in each container at the same density, which said it was
two samples rather than one; it now draws the same twenty-seven molecules in
both, sparser in the wide vessel. The solid of the same figure was drawn at
the volume of the liquid, though water is one of the few substances that
expand on freezing, so the ice is now 1.09 times the liquid's volume and the
headline says why. Figure 1.8 drew its bars on two scales in one panel, so
960 g of water came out shorter than 40 g of sugar, and the 606.6 g label of
the battery panel ran off the canvas; every bar of both panels is now drawn
to one scale, chosen so the longest bar and its number both fall inside the
frame, and a line beneath says so. Figure 1.11's readout, a chain of
fragments, is one sentence.

##### 1.3 Physical and Chemical Properties

Figure 1.21, the NFPA hazard diamond, was kept as the book's JPG because the
four colours of the sign could only be written as hex literals, which the
book's `RULES.md` forbade. The rule now makes one exception, for a colour
that is a physical fact and belongs to none of the four families root rule 7
names, so the diamond is redrawn: the four quadrants in the NFPA's own red,
blue, yellow and white, named in constants and standing unchanged in both
themes, with the 0 to 4 scale in the words of the passage, the abbreviations
of the white diamond, and a hover name on every quadrant.

##### 1.4 Measurements

The cubes of Figure 1.25 and of the density Sim were projected by a
hand-rolled isometric skew. They are the book's own perspective drawings, so
they now go through the drawing layer's locked view, `F.view` and `F.face`:
one fixed viewpoint, one fixed lamp, shaded faces and no orbit, which keeps
them flat figures in cost and in chrome. A face takes no type hue, as root
rule 7 asks of a body, and the edge written beside a cube is a length and
stays in ink, so `ch01/COLOR.md`'s line about the cube's shaded faces wearing
the volume hue was corrected. The density headline, which ran the volume and
the mass together in one clause, is two sentences, and its small line
compares the sample with a cube of gold or of lead without editorializing
about lead-filled bricks.

##### 1.5 Measurement Uncertainty, Accuracy, and Precision

Accuracy was judged by the mean distance of the arrows from the bull's eye,
which is not accuracy but a mixture of accuracy and precision, and it failed
the book's own "accurate but not precise" corner. Accuracy is now the
distance of the centre of the group from the bull's eye and precision the
greatest distance between two arrows, and the corner passes. The rebar stood
through the floor of its cylinder and now rests on it, each object placed by
its own half-height. All eight headlines of the section, which were lowercase
fragments or semicolon chains, are capitalised full sentences.

##### 1.6 Mathematical Treatment of Measurement Results

The kelvin column was read to a hundredth of a kelvin against a Celsius
reading to a tenth and against Example 1.11's 310.2 K. It is now read to a
tenth, and the two reference sentences still name the exact defining values,
273.15 K and 373.15 K.

##### 6.2 The Bohr Model

Three named species, hydrogen, He⁺ and Li²⁺, were a slider called Z in all
three figures; they are states and are now a row of buttons. On the ladder of
Figures 6.14 and 6.15 the rungs from n = 3 up lie within about fifty units of
one another, so a jump between them could not be seen: they are drawn again
in an inset magnified eight times, with the factor stated and the band it
enlarges outlined on the ladder. The transition arrow is notation and grew
with the electron; it now stands still at its full length while only the
electron and the photon move. The word "electron" sat on the rung and now
stands beside it with a leader. The orbit Sim ran to n = 8, where the last
three orbits were off the frame and identical: it stops at n = 6, and the
canvas scale is fixed at what holds the largest orbit the buttons reach. The
series Sim counted its ultraviolet lines at 380 nm while its visible band
began at 400 nm, so the three counts did not add up to the number of lines;
both boundaries are now 400 nm, and the highest-orbit slider is moved to a
legal value rather than silently overridden.

The nucleus and the electron stay in ink. A nucleus drawn without its
electrons is not yet an atom of any element and an electron belongs to no
element at all, so neither can take an element colour, and the book's
`COLOR.md` now says so in a sentence of its own. `fig-spectra` stays a kept
image in a `figure` row with no number, which is what this book gives an
unnumbered image it keeps rather than redraws; the book's `RULES.md` now
records that convention, which only `ch01/config.md` and `ch06/config.md`
carried before.

##### 7.6 Molecular Structure and Polarity

Figure 7.28 had its dipoles backwards: the molecules settled with the
hydrogen end of HF toward the positive plate while the headline and the
readout said the negative one. The hydrogen end carries the partial positive
charge, so the molecules now settle the other way round and the drawing
agrees with the words. The bond-moment bench of Figures 7.26 and 7.27 drew
its arrows from modern Pauling values while citing the book's Figure 7.6
table; it now uses the book's own values, H 2.1, B 2.0, C 2.5, N 3.0, O 3.5,
F 4.0, P 2.1, S 2.5 and Cl 3.0, printed to one decimal as the book prints
them. That table gives carbon and sulfur the same value, so OCS draws no
arrow on its C–S bond, and the readout says so and repeats what the text
says, that sulfur is in fact very slightly the more electronegative.

The fold of Figure 7.20 claimed the three possible placements of the two lone
pairs of ClF₃ and only ever drew the observed one; a choice of the three now
appears where there are five regions and two lone pairs, with the readout
saying which is observed and why. The lone-pair slider of the settling Sim
was forced to zero at five and six regions, where a bare repulsion cannot
tell an axial site from an equatorial one; it is now disabled and greyed
there through the new `ctl().disable`, and clamped rather than snapped back
elsewhere. Lone-pair lobes were the one body of the section that could not be
picked and now name themselves under the pointer. The VSEPR bench and the
bond-moment bench carried up to thirteen names on an idly spinning molecule;
each labels a kind once by default and puts the rest behind a Labels button,
off by default, with hover names throughout. Formaldehyde and the bond-moment
bench had snap-to-view buttons named for a tetrahedron, which mean nothing
for a planar molecule, and now have their own. Twelve colon-led captions are
sentences, the molecule dropdown is called "molecule or bond", since the list
holds two single bonds beside the molecules, and Figure 7.14's caption ends
at the observation rather than arguing about what the figure shows. The plan
described a `viewer()` that no longer exists; it now states the bounds and
the Labels decision of every scene.

##### 9.2 Relating Pressure, Volume, Amount, and Temperature

The sealed sphere of Figure 9.10 stood in a water bath heated from 150 K to
600 K, which is neither water nor a bath, and the bath was tinted by the
temperature, which root rule 7 forbids of a body. The slider now runs from
273 K to 373 K, the ice point to the boiling point, and the water is drawn in
ink at a fixed opacity while the temperature hue stays on the slider and the
readout. The gas box's locked sliders moved and snapped back; they are now
disabled and greyed through the new `ctl().disable`, and a line on the strip
says which the law has taken. The breathing figure's rate slider changed only
the printed numbers, since one breath always took four and a half real
seconds; the cycle now runs in real time, and the swelling of the lungs,
which is a few percent of their radius, is exaggerated four times or by as
much of that as the chest will hold, with the factor drawn beside the lungs
and in the readout and the true volumes given throughout. The four-graph Sim
said the P–V graph stands still under the temperature slider, which is not
true of that graph; it now says what is true of which slider. The two
pressure labels of Figure 9.11 overprinted where the two states met and now
take opposite sides, as 9.12's already did; the string of a balloon in Figure
9.18 crossed the name of its gas at two moles and is now short enough that it
does not. The fold of Figures 9.13 and 9.14 carried one caption for two
originals and now prefixes each with its number.

##### Chapter files

`ch01/config.md` and `ch09/config.md` both said "3D: none" while three and
four of their figures are `F.view3d` scenes; both now say which figures are
three-dimensional and with what bound. `ch07/config.md` had no 3D row at all
and now has one. `ch01/config.md`'s colour row said the element palette is
not used in the chapter, which stopped being true when the water, the gases
and now the molecules of Figure 1.14 took it; `ch09/config.md`'s said the
particles in the box are generic and drawn in ink, which stopped being true
when they became named gases. Both are corrected. Every section's `plan.md`
carries a dated audit section stating, figure by figure, the tier, the
motion, the controls, whether the figure is flat or three-dimensional and
with what bound, and whether its labels are on.

##### Checks

`node --check` passes on all nine `figures.js`. `check:content` with
`OMNISTAX_BOOK=chemistry-2e` reports four chapters, nine sections, two
introduction or summary pages, twelve checks, no errors and two warnings,
both of them pre-existing sheet cells that hold a word beside a number
(`sheets/water.json` and `sheets/ksp.json`). The same command with
`OMNISTAX_BOOK=college-physics-2e` reports no errors. No headline of these
chapters holds a middle-dot join and no caption of them cites its own figure.
