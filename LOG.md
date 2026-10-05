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


## Pass 5 (2026-09-28): Chapter 4, Stoichiometry of Chemical Reactions, is built

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Six pages: the chapter introduction in `ch04/intro/` with
Figure 4.1, and the five sections 4.1 to 4.5, none of them folded. Thirty
figure rows across them, numbered 4.1 to 4.18 as the publisher numbers them
with no gap: photographs kept where the text points at them (4.1, 4.4, 4.6 to
4.10, 4.12, 4.15 to 4.17), the book's drawings redrawn as live Figures (the
methane reaction of 4.2 folded with the mixtures of 4.3, the dissolving acid
of 4.5, the ten-box route chart of 4.11, the sandwich and the hydrogen and
chlorine box of 4.13 and 4.14, the combustion train of 4.18), the unnumbered
route boxes of Examples 4.8 to 4.11 and 4.14 to 4.16 as still copies with each
box in the hue of what it holds, and six Sims that replace nothing: a
balancing bench (4.1), a mixing bench for twelve soluble salts (4.2), the
ammonia ratio at any count (4.3), the silicon nitride masses and a percent
yield (4.4), and a titration (4.5). Two figures carry a clock, the acid
entering the water and the titrant leaving the buret; every other figure is
still, and every figure is flat. Sixty-six exercises, sixteen of them the
Check Your Learning items placed inline after their examples, each with its
host; the end-of-chapter items are the forty-eight the key answers plus two
unkeyed conceptual questions kept with a suggested approach. Twenty-nine
concept nodes with fifty-seven prerequisite edges; forty-nine glossary
entries, three equations and one variable in `chapter.json`; Tables 4.1 and
4.2 kept in 4.2 as `div.book-table`.

What the chapter pass changed. Fourteen prerequisite edges staged and merged:
the chemical equation now rests on molecular formulas and ionic equations on
ionic compounds (Chapter 2), oxidation numbers on ions and atomic charge, mole
stoichiometry on the mole and Avogadro's number, mass stoichiometry on molar
mass, mass–mole conversion and molarity, the titration calculation on
molarity, combustion analysis on the empirical formula, gravimetric analysis
on percent composition, theoretical yield on Dalton's atomic theory, and
within the chapter the limiting reactant on the coefficients read as ratios
and its identification on mass–mole conversion. The three equation rows and
the variable M are anchored in the text of 4.4 and 4.5. Each section's plan
records what it asked for and what was applied.

Decisions. No exercise moved between sections. Two keyed items of 4.3 that
point at the reactions of an unkeyed exercise carry those reactions in their
own prompts. Molarity, the stoichiometric factor, coefficients, subscripts
and every percent stay ink; the route boxes of the book, shaded by kind, take
the type hue of the quantity each holds.

Errata, carried as printed and named in `notes`: the key's MgC1₂ with a digit
one (4.1), "(2 × 3+) = 6 +" in Example 4.7 (4.2), CO₂(s) in an unkeyed item of
4.4 (left out); a stray `**` in the key of Example 4.6 is dropped.

Checks. `ost check chemistry-2e` reports no errors and the two standing sheet
warnings. `npm test`, `astro check` and a build of the book pass, and every
page of the chapter was opened in light and dark with no console error, no
blank canvas, no KaTeX error, no missing image and every inline card present.


## Pass 6 (2026-09-28): Chapter 3, Composition of Substances and Solutions, is built

Prompted by: Chen asking for the rest of the book to be built in waves,
with no check-ins. The chapter was prepared in one pass (its
`config.md`, `COLOR.md`, `exploration.md`, the introduction page and
its rows), its four sections were built in parallel by one agent each,
and a chapter pass closed over them. The review stops of root rules 2,
5 and 15 are replaced by a `plan.md` per page, left for review.

## What was built

**Introduction** (m68699). The book's paragraph on a swimming pool's
calcium, under Figure 3.1.

**3.1 Formula Mass and the Mole Concept** (m68700). Four page headers.
Figures 3.2, 3.3 and 3.4 are folded into one live Figure of chloroform,
aspirin and sodium chloride, each model drawn flat by default and turned
in 3D on a choice, the salt as a packing of ions. One still Sim carries
the route from grams to moles to entities through Examples 3.3 to 3.8;
five of the examples' six flowcharts are left out for it. Thirteen
figure rows in all, eight Check Your Learning items and nineteen
end-of-chapter exercises of thirty-one.

**3.2 Determining Empirical and Molecular Formulas** (m68702). Figure
3.11 becomes a still Figure: the six-box chart with live values under
two mass sliders and a choice of the section's samples, the formula
unit drawn in element colours. Three figure rows, five Check Your
Learning items, seven exercises of twelve.

**3.3 Molarity** (m68703). A molarity Sim (a balance, the moles, and a
beaker of solute glyphs) and a live dilution Figure folding the
photograph of Figure 3.16, the copper nitrate blue paling as a named
physical colour while C₁V₁ = C₂V₂ holds. Both are flat, argued in the
plan. Four figure rows, eight Check Your Learning items, fourteen
exercises of twenty-five.

**3.4 Other Units for Solution Concentrations** (m68704). A Sim that
reads one mass ratio as a percentage, in ppm and in ppb at once. Five
figure rows, four Check Your Learning items, six exercises of twelve.

The chapter holds 23 concepts on 43 edges, 11 equations and 17
variables (every one anchored), 20 glossary entries and nine new
symbols; no new type. Nothing in it has a clock.

## Decisions

- The chapter pass anchored every variable and equation, added the
  edge molecular-versus-formula-mass → ionic-compounds into Chapter 2
  (the other edges the prep asked for were already rows), and renamed
  the glossary term "Avogadro's number (N<sub>A</sub>)" to "Avogadro's
  number", since the app shows and matches a term as plain text.
- 3.3's "outline the steps" items whose second part is unkeyed are
  left out whole; 3.1's choice among three drawn molecules is kept as
  an open item.
- 3.4 binds mass only; its volumes stay in prose.

## Errata

Example 3.13 writes 8.624 where the line above gives 8.641 mol H; the
key gives 82.24% N for ammonia where the text computes 82.27%; Example
3.24 prints "alchol". All kept as printed and named in `notes`.

## Checks

`ost check` clean for the chapter, `npm test`, `astro check`, a build,
and every page of the chapter in light and dark in a headless browser.


## Pass 7 (2026-09-28): Chapter 2, Atoms, Molecules, and Ions, is built and passed

Prompted by: Chen asking for the rest of the book to be built in waves,
with no check-ins. The chapter was prepared in one pass (its `config.md`,
`COLOR.md`, `exploration.md`, the introduction page and its rows), its
seven sections were built in parallel by one agent each, and a chapter
pass tied them together.

## What was built

Eight pages: the introduction and 2.1 to 2.7. Figures 2.1 to 2.32 in the
publisher's order, 2.9 and 2.10 folded into one live figure; 21 live
figures and Sims (the cathode ray, Millikan's drops, the gold foil bench
in 3D, the ion builder that writes its own symbol, the average-mass
balance, the mass spectrometer, the 2D and 3D molecules of 2.4 with the
carvone mirror pair, the ion and formula Sims of 2.6, chromate and
dichromate), the rest kept as the book's photographs. Tables 2.1 to 2.13,
Examples 2.1 to 2.14 with 14 inline checks, 51 exercises in all, 40
concepts, 4 equations and 3 variables (every one anchored), 61 glossary
entries; no new type or symbol. Only the four experiments have a clock.

## Decisions

- The chapter pass anchored every variable and equation and added the
  edges empirical-formula → empirical-formula-from-molecular-formula,
  formula-mass → average-atomic-mass and formula-mass → molecular-formula
  into Chapter 3, and predict-ion-charge → predict-ion-charge-from-group
  and ionic-bond → ionic-and-covalent-bonds into Chapter 7.
- The glossary anchors 2.5 and 2.7 asked for are not written, since a
  glossary row carries no anchor.
- The element palette gained Al, Se, Zr, Pb and Cr, so the figures that
  drew those atoms in the fallback colour now draw them in their own.
- 2.5 builds no periodic table; it keeps Figures 2.26 and 2.27 and links
  the elements page. The three Build a Molecule items of 2.4 are held and
  named, since no figure of the page builds a molecule.
- Two figure captions that spoke of "the book" were reworded.

## Errata

Figure 2.6's caption says "mass-to-charge"; 2.5's glossary prints
"hydrate" and "12–18"; 2.7 prints "Some examples demonstrating this Some
other examples" and the key's "AIF₃·3H₂O"; Table 2.4's summary differs
from its cells. All kept as printed and named in `notes`.

## Checks

`ost check` clean for the chapter, `npm test` (two failures, both in
other chapters), `astro check`, a build, and every page of the chapter in
light and dark in a headless browser with no console error, no blank
canvas, no KaTeX error, no missing image and every inline card present.


## Pass 8 (2026-09-28): Chapter 5, Thermochemistry, is built

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Four pages: the chapter introduction in `ch05/intro/` with
Figure 5.1 and its one footnote, and the three sections 5.1 to 5.3, none of
them folded. Twenty-one figure rows across them, numbered 5.1 to 5.24 as the
publisher numbers them, with the collage of Figure 5.2 dropped and the folds
named on their rows: photographs kept where the text points at them (5.1, 5.3,
5.5, 5.7 to 5.10, 5.13, 5.15 to 5.18, 5.20 to 5.23), the fast and slow
molecules of 5.4 and 5.6 folded into one moving Figure in three dimensions,
the coffee cup calorimeter of 5.11, 5.12 and 5.14 folded into one moving flat
Figure, the first-law diagram of 5.19 and the Hess ladder of 5.24 redrawn as
still Figures, and one Sim that replaces nothing, a heating bench over the
sixteen substances of Table 5.1. Two figures carry a clock, heat flowing to
equilibrium and a calorimeter settling; every other figure is still.
Sixty-eight exercises, sixteen of them the Check Your Learning items placed
inline after their examples, each with its host; the end-of-chapter items are
the forty-three the key answers plus nine unkeyed conceptual questions, or parts of one, kept
with a suggested approach. Twenty-three concept nodes with forty-seven
prerequisite edges; thirty-two glossary entries, twelve equations and twenty
variables in `chapter.json`; Tables 5.1 and 5.2 kept as `div.book-table`.

What the chapter pass changed. Every equation and variable row anchored to
the span that introduces it. Eight prerequisite edges staged and merged now
that Chapters 3 and 4 are in the book: thermochemical equations rest on
balanced equations, the limiting reactant, mass and mole conversion and molar
mass; the enthalpy of combustion on mass and mole conversion and molar mass;
reaction enthalpies from formation enthalpies on balanced equations; coffee
cup calorimetry on molarity. Section 5.3 binds energy alone, since no figure
draws PΔV, and `COLOR.md` says so.

Errata carried as printed and named in `notes`: Example 5.4's 4.18 and 4.184,
Example 5.5's "1.34 × 10³ kJ, or 1.34 kJ", Example 5.7's −48.8 and 48.7 kJ,
the ethanol equation's "(g+", Table 5.2's isooctane −5465.5 against −5460,
Example 5.9's "perchlorate", Example 5.15's −136.80 and −138.4 kJ; the book's
º in two keys is written °.

Checks: `ost check` and the content check clean for the book, `npm test`,
`astro check`, a build, and every page of the chapter in a headless browser
in light and dark.


## Pass 9 (2026-09-28): Chapter 7, Chemical Bonding and Molecular Geometry, is built and passed

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Six pages today: the chapter introduction in `ch07/intro/`
with Figure 7.1, and the sections 7.1 to 7.5, none of them folded; 7.6 was
built on 2026-09-12 and its figures are untouched. Fifty-eight figure rows
across the five sections, numbered 7.2 to 7.13 as the publisher numbers them:
the NaCl photographs of Figure 7.2, the lattice of Figure 7.3 in three
dimensions with its two panels as a choice, the potential energy curve of
Figure 7.4 as a live graph, Figures 7.5 and 7.8 folded into one polarity
Figure, Pauling's table of Figure 7.6 redrawn and his portrait kept, the
Lewis symbols and structures of 7.3 and 7.4 redrawn faithfully or copied, and
the Born-Haber ladder of Figure 7.13 told step by step. Sims that replace
nothing: a charge balance for ionic formulas, a Lewis structure walked through
its five steps, formal charges counted on eight candidate structures, the
resonance hybrids of nitrite and carbonate drawn beneath their forms and never
animated between them, a bond length and strength bench, an enthalpy from bond
energies, and a lattice energy bench after Coulomb. Every figure is still.
Eighty-five exercises, ten of them the Check Your Learning items placed inline
after their examples, each with its host. One exercise moved: the molecule of
solid NaCl, printed in 7.2, is set in 7.1 with its `source_section`. Six
unkeyed computational items are left out and named, and two unkeyed choice
items of 7.5 are kept open with their options.

What the chapter pass changed. Every equation and variable row of the chapter
anchored to the span that introduces it: six equations and fourteen
variables. Fifteen prerequisite edges staged and merged now that Chapters 2,
5 and 6 are in the book: ionic bonds rest on ionic compounds, the charge and
configuration of an ion on the configurations of ions and on the trends in
ionization energy and electron affinity, electronegativity on electron
affinity, Lewis symbols on valence electrons, the Born-Haber cycle on Hess's
law, the enthalpy of formation, ionization energy and electron affinity, and
enthalpies from bond energies on thermochemical equations; within the
chapter, resonance on multiple bonds, Lewis structures on electronegativity,
and 7.6's bond distances on the covalent bond of 7.2. The symbols IE and EA
render upright. The glossary term that carried HTML, the lattice energy, is
plain words.

Errata carried as printed and named in `notes`: the Fullerene Chemistry note's
"since prehistoric times, ." and "C<sub>60.</sub>", Example 7.5's "six steps"
for five, and Table 7.4, printed for CsF while its description speaks of
NaCl.

Checks: `ost check` and the content check clean for the book, `npm test`
(664 passing), `astro check` with no errors, a build, and every page of the
chapter in light and dark with no console errors, no KaTeX errors, no missing
images and every exercise card rendered.


## Pass 10 (2026-09-28): Chapter 8, Advanced Theories of Covalent Bonding, is built and passed

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Five pages: the chapter introduction in `ch08/intro/` with the
liquid oxygen photograph of Figure 8.1 and a still copy of the N₂ and O₂ Lewis
structures, and the sections 8.1 to 8.4, none of them folded. Thirty-seven
figure rows, numbered 8.1 to 8.40 as the publisher numbers them, with seven
folds where one live figure is clearer: the overlap bench of Figures 8.3 to
8.5, water's orbitals of 8.6 and 8.7, the sp² set of 8.10 to 8.12, the sp³d
and sp³d² sets of 8.19 and 8.20, the π lobes of 8.23 to 8.25 with a twist
slider, the σ and π molecular orbitals of 8.29 to 8.31, and one molecular
orbital diagram for Figures 8.34 to 8.36 and 8.40, where the reader picks a
molecule and its charge and reads the bond order and the unpaired electrons.
Orbitals and hybrid orbitals are three-dimensional, lobes in the two phase
colours; the energy curve of Figure 8.2 is live with the book's 74 pm and
−7.24 × 10⁻¹⁹ J; the Gouy balance, the adding waves, s-p mixing and the bands
of a solid are flat benches. Walter Kohn's portrait and the HIV-1 protease
image are kept. Every figure is still. Fifty-three exercises, seven of them
the Check Your Learning items placed inline after their examples, each with
its host. Four unkeyed numerical items are left out and named, and the true or
false item of 8.4 is kept open with its options.

What the chapter pass changed. Every variable and equation row anchored: four
variables (E, r_bond, ψ, Ψ) and four equations (the bond order and its three
worked instances). Thirteen prerequisite edges staged and merged now that
Chapters 6 and 7 are in the book: valence bond theory on orbital shapes,
hybridization and molecular orbital theory on wave functions, hybridization
and the orbital diagrams on electron configurations, the Aufbau principle and
Hund's rule, paramagnetism on orbital diagrams, bond distance and bond order
on bond energy and bond length, and delocalization on resonance. The edge
into wave interference waits, since Chapter 6 has no such concept. Six
glossary definitions that carried HTML are plain words. The H₂O, H₂S and H₂Te
image stays the book's. Three figures tidied: the sp³d molecule clears its
headline, the s-p mixing headline writes σ and π with subscripts, and the
bands readout reads cleanly for very many atoms.

Errata carried as printed: the "(yellow)" hybrids of Figure 8.8 drawn purple,
an unclosed parenthesis in an 8.2 answer, the key equation's "number of
bonding electron", the glossary's "π* bonding orbital" and "σ* bonding
orbital" for antibonding orbitals, "atoms in the 2s orbital" in an 8.4 answer,
and the summary's "is in advantage of".

Checks: `ost check` clean for the book, `npm test`, `astro check`, a build,
and every page of the chapter in light and dark with no console errors, no
KaTeX errors and no missing images.


## Pass 11 (2026-09-28): Chapter 6, Electronic Structure and Periodic Properties of Elements, is built and passed

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Five pages today: the chapter introduction in `ch06/intro/`
with the Crab Nebula of Figure 6.1, and the sections 6.1, 6.3, 6.4 and 6.5,
none of them folded; 6.2 was built on 2026-09-12 and its figures are
untouched. Thirty-nine figure rows across the four sections, numbered 6.2 to
6.35 as the publisher numbers them. In 6.1 a traveling wave, the
electromagnetic spectrum, the AM and FM signals, a vibrating string, the
blackbody curves and the photoelectric effect move or answer their sliders,
and the fringes, the drumhead, the solar spectrum, the neon sign and the line
spectra are kept as photographs; the radio towers of Figure 6.4 are left out.
In 6.3 the electron wave about an orbit, electrons arriving one by one at a
double slit, the radial distributions, and the s, p and d orbitals in three
dimensions with their lobes signed, beside a Sim of the de Broglie
wavelength from an electron to a softball. In 6.4 the Aufbau ladder filled
one electron at a time, the notation and the filling order, the periodic
table by blocks with Figures 6.27 and 6.29 folded into one, and the
unnumbered orbital diagrams of hydrogen to neon and of phosphorus. In 6.5 the
halogen radii, the trends of radius and ionization energy with Figures 6.31
and 6.33 folded, the atoms and their ions, the ionization energies and
electron affinities on the periodic table with Figures 6.34 and 6.35 folded,
and a Sim of successive ionization energies. Seventy-five exercises, eleven
of them the Check Your Learning items placed inline after their examples,
each with its host. Three exercises moved from 6.5 to 6.4, which relates
configurations to the groups: the group of ns²np³, the group of ns², and why
aluminum is in group 13 and not group 3, each with its `source_section`.
Seven unkeyed numerical items of 6.1 are left out and named; the unkeyed
conceptual items of 6.3, 6.4 and 6.5 carry a suggested approach, and the
picks among the book's options are kept open with their options.

The build changed one default of the config: 6.4 sets Z, the number of
electrons, as a slider from 1 to 118 rather than a choice of element, since
the Aufbau procedure adds one electron at a time and the ordered count is the
idea.

What the chapter pass changed. Every equation and variable row of 6.1, 6.3
and 6.5 anchored to the span that introduces it: fifteen equations and
thirty-two variables. Three prerequisite edges staged and merged: the trend
in ionization energy rests on Hund's rule, and now that Chapter 2 is in the
book, the instability of the classical atom rests on the nuclear model and
the hydrogen-like ions on the subatomic particles. The eleven glossary terms
that carried HTML are plain words. Two sentences of 6.2's Figure headings
are now in American spelling. Three figures were set right after the page
read: the bracket of the valence electron of sodium no longer runs into the
bracket of the core, the labels of the de Broglie scale no longer run into one
another, and the radial graph of 6.3 names its axis below the headline.

Errata carried as printed and named in `notes`: Figure 6.9's caption names a
blue curve that is drawn grey, and "Neils Bohr" in 6.1; "the special
distribution" for spatial, Example 6.7's "*m*" for m_l, a key's m₁, and ν
written for velocity in one exercise of 6.3. The alt text of Figures 6.34 and
6.35 disagrees with the images for ruthenium, helium, sulfur and neon, and
the folded figure follows the images.

Checks: `ost check` and the content check clean for the book, `npm test`
(663 of 664 passing; the one failure is a fold in Chapter 9, still being built), `astro check` with no errors, a build, and every page of the
chapter in light and dark with no console errors, no KaTeX errors, no missing
images and every exercise card rendered.


## Pass 12 (2026-09-28): Chapter 9, Gases, is built and passed

Prompted by: Chen asking for the book to be finished without check-ins, a plan
file written before each page and left for review after.

What was built. Six pages today: the chapter introduction in `ch09/intro/`
with Figure 9.1, and the sections 9.1 and 9.3 to 9.6, none of them folded; 9.2
was built on 2026-09-12 and its figures are untouched. Twenty-seven figure
rows across the five sections, numbered 9.2 to 9.36 as the publisher numbers
them: the force over an area of Figure 9.2, the barometer and the manometer of
Figures 9.4 and 9.5 as flat side elevations with the four manometers of
Examples 9.3 and 9.4 drawn beside them as still copies, the photographs of
9.3, 9.6, 9.7, 9.19, 9.26 and 9.29 kept, Dalton's four cylinders of Figure
9.20 in three dimensions, the collection over water folded with its
vapor-pressure curve into Figure 9.21 + 9.22, the combining volumes of Figure
9.23, the diffusion bulbs folded into Figure 9.27 + 9.28, the diffuser of
Figure 9.30 as a still copy, the kinetic-molecular cylinders of Figure 9.31
counting their strikes on the walls, the three speed distributions folded
into Figure 9.32 + 9.33 + 9.34, the compressibility curves of Figure 9.35
calculated from the van der Waals equation, and the ideal and real boxes of
Figure 9.36. Two Sims replace nothing: the one straight line of gas density
against molar mass, and a gas box that tallies the speeds of its own
molecules under the Maxwell-Boltzmann curve, which answers the dropped gas
simulator. Sixty-six exercises, eighteen of them the Check Your Learning
items placed inline after their examples, each with its host. Nothing moved
between sections. Twenty-seven unkeyed numerical items are left out and named
in `exercise_notes`; the unkeyed conceptual items are kept with a suggested
approach.

What the chapter pass changed. Every equation and variable row of the chapter
anchored to the span that introduces it: fifteen equations and twenty-eight
variables of the five new sections, beside 9.2's anchors of 2026-09-12. Two
symbol rows staged and merged for the manometer, P_gas and P_atm, both
pressures, and the figures of 9.1 now write them. `sim-over-water` named only
one of its two originals in the text and failed the fold test; it now names
both. A caption of 9.5 that spoke of "the book" and of its controls was
rewritten as a sentence in the book's voice. `COLOR.md` records the bindings
as built: 9.3 binds pressure, volume, temperature and mass but not amount,
9.4 mass alone, and 9.5 pressure, volume and amount as well as temperature,
energy and mass.

Errata carried as printed and named in `exploration.md`: Figure 9.20's
"gasses" and its 6000 kPa against the caption's 600, Example 9.12's "occupies
of volume", the uranium note's "only about 0.4% enrichment, is achieved",
"According to Graham's law" at the head of 9.5's Part II, Figure 9.32's ν_p,
Figure 9.31's panel labelled "Charles's Law", Figure 9.34's lower-case
caption, Example 9.24's `L² atm mol²` and "If XX behaved".

Checks: `ost check` and the content check clean for the book, `npm test`
(664 passing), `astro check` with no errors, a build, and every page of the
chapter in light and dark with no console errors, no KaTeX errors, no missing
images, every figure drawn and every exercise card rendered.


## Pass 13 (2026-09-28): Chapter 10, Liquids and Solids, is built and passed

Built: the introduction and six sections, 10.1 to 10.6, in the publisher's
numbering, Figures 10.1 to 10.66 all shown and linked. Twenty-three live
figures, eleven of them folds: the hydride boiling points of 10.11 and 10.12;
one phase diagram drawn to scale for 10.30, 10.31 and 10.34 with a substance
choice and a state point; crystalline against amorphous (10.37 and 10.38);
the four kinds of solid (10.39 to 10.42); the cubic cells (10.46 to 10.49 and
10.50 to 10.52); the two stackings (10.53 and 10.54); the fourteen lattices
(10.55 and 10.56); the holes (10.57 and 10.58); the four ionic structures
(10.59 to 10.62); and the Bragg planes (10.63 and 10.64). Unit cells and
solids are physical 3D with bounded orbit; the intermolecular-force drawings
carry the 2D/3D view choice. The DNA images, the three unnumbered example
images of 10.6 and the photographs stay as the book's. One hundred ten
exercises, nineteen of them Check Your Learning items placed inline after
their examples, each with its host. Nothing moved between sections. Thirteen
unkeyed numerical items are left out and named in `exercise_notes`; four
unkeyed choice items are kept open with their options; the unkeyed conceptual
items are kept with a suggested approach.

What the chapter pass changed. Every equation and variable row of the
chapter anchored: six equations and twenty-three variables, the capillary
rise equation at 10.2, the three Clausius-Clapeyron forms and the sublimation
sum at 10.3, the Bragg equation at 10.6, and the edge length and atomic
radius at Example 10.14. A Sim header of 10.6 that spoke of "the book" was
rewritten. `config.md` names the three unnumbered images of 10.6 and records
what the build changed; `COLOR.md` records the bindings as built. Every
`F.vbracket` call was read and takes its side as a number.

Errata carried as printed and named in `exploration.md`: Example 10.3's
78.4 and 78.5 °C, "ICI" for ICl, "41.4 kJ/mol**", the critical-point
table's K and atm description against its °C and kPa cells, the carbon
answer images labelled "Water", the tungsten "19.26 g/cm", "What it the
formula", "the formula for thallium is TlI", "the same cites", and 10.4's
first two Check Your Learning answers, which the to-scale diagram does not
reproduce.

Checks: `ost check` clean for the chapter (one error in 11.3, not this
chapter's), `npm test` (665 passing), `astro check` with no errors, a build,
and every page of the chapter in light and dark with no console errors, no
KaTeX errors, every lazy image of 10.1 and 10.6 loaded once scrolled, every
figure drawn and every exercise card rendered.


## Pass 14 (2026-09-28): Chapter 11, Solutions and Colloids, is built and passed

Built: the introduction and five sections, 11.1 to 11.5, in the publisher's
numbering, Figures 11.1 to 11.37 all shown and linked. Sixteen live figures,
two of them folds: osmosis and reverse osmosis (11.24 and 11.25), with an
applied pressure that runs past the osmotic pressure, and one amphiphile
with a choice of head group (11.31 and 11.32); two are Sims of OmniStax's
own, the Lake Nyos turnover and the Tyndall glass. The mixing bulbs, the
hydrating crystal, the conductivity bench, the ion pairs, the osmosis tube
and the precipitator are physical 3D with bounded orbit; the graphs, the
phase diagram, the energy steps, the red cells and the emulsified oil drop
stay flat. The photographs, 11.2's hydronium image, 11.3's ammonia image and
the six step diagrams of 11.4's examples stay as the book's. Sixty-nine
exercises, thirteen of them Check Your Learning items placed inline after
their examples, each with its host. One item moved: 11.4's question on why
the oil and water of Figure 11.14 stay apart now tests 11.3. Nineteen
unkeyed numerical items are left out and named in `exercise_notes`; one
unkeyed choice item is kept open with its options; the unkeyed conceptual
items are kept with a suggested approach.

What the chapter pass changed. Every equation and variable row of the
chapter anchored: ten equations and twenty-three variables, Henry's law at
11.3, and mole fraction, molality, Raoult's law in three forms, the boiling
and freezing point laws, osmotic pressure and the van't Hoff factor at the
headings of 11.4 that teach them. Figure 11.3 draws argon with the element
palette, which now grades the noble gases by period. The Figure 11.6 bench
is drawn so that it shows in light; Figure 11.7, the osmosis tube and the
precipitator are framed so that nothing is clipped, and the osmosis tube's
water and solution labels stand beside it. `config.md` records what the
build changed and `COLOR.md` the bindings as built.

Errata carried as printed and named in `exploration.md`: Example 11.2's
"approximately ~1.2 mol/L", Example 11.1's Check Your Learning answer with
no unit, C₂H₂(OH)₂ once for ethylene glycol in Example 11.3, "electroyte",
Table 11.3's title "Predicated" and its summary against its HCl row, and the
key that uses 5.14 °C/m for benzene where Table 11.2 gives 5.12.

Checks: `ost check` clean for the book, `npm test` (665 passing), `astro
check` with no errors, a build, and every page of the chapter in light and
dark with no console errors, no KaTeX errors, every figure drawn and every
exercise card rendered.

Review pass ch03 (2026-10-04, Claude Opus 5.5 high): 20 pass, 9 fixed, 0 rewrite filed.

Review pass ch01 (2026-10-04, Claude Opus 5.5 high): 15 pass, 21 fixed, 0 rewrite filed.
Review pass ch04 (2026-10-04, Claude Opus 5.5 high): 14 pass, 20 fixed, 0 rewrite filed.
Review pass ch02 (2026-10-04, Claude Opus 5.5 high): 19 pass, 19 fixed (13 figures, 6 leads), 0 rewrite filed.
Review pass ch05 (2026-10-04, Claude Opus 5.5 high): 16 pass, 7 fixed (5 figures, 2 leads), 0 rewrite filed.
