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
