# Experiment log: Chemistry 2e (OpenStax)

Source: OpenStax Chemistry 2e, CC BY-NC-SA 4.0, copyright Rice University,
by Paul Flowers, Klaus Theopold, Richard Langley and William R. Robinson.
CNXML source: `source/osbooks-chemistry-bundle/`, a shallow clone of
github.com/openstax/osbooks-chemistry-bundle (gitignored), collection
`chemistry-2e.collection.xml`: a Preface, 21 chapters of 114 sections
with an introduction each, and 13 appendices. No PDF. The table of
contents with module ids is `toc.md`.

Workflow: the full-book pass of root rule 18 first, then chapters in
waves as the physics book was finished, prep / sections / chapter pass,
with `tools/mergebook.py` merging each chapter's book-level rows.

## Pass 1: the full-book pass (2026-09-12)

Prompted by: a second book, and root rule 18, which says every book
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
cannot do without and that the physics converter drops. The molecular
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
  wavelength, frequency, potential, charge); mass is typed here though
  physics leaves it untyped, pH is a variant of concentration, and K, Q,
  k, Z, A, counts, ratios and percents stay in ink;
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

Root rule 18 says a tool a second book uses moves up, so
`cnxml2md.py` now lives at `omnistax-content/tools/cnxml2md.py`, and
the physics copy is a two-line stub that runs it; the physics rules
name the new path. The converter was extended for what this book uses
and physics did not, with the markers its docstring lists: the
learning objectives from `md:abstract` as a headed block (the old
converter dropped them), the summary, key-equations and exercises
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

The physics modules all convert differently now, in intended ways
only: `%`, `$`, `#`, `_` and `&` escaped inside `\text{}` (the old
converter let a `%` swallow the rest of a text run), the column spec of
a three-column `array` written out (the old `{l}` was a KaTeX error),
nested lists no longer printed twice, images outside figures no longer
dropped. The marker counts (exercises, problems, solutions, examples,
figures, definitions) are identical old against new for every module.
The physics `source.md` files already in the repository were not
regenerated. Still flat: `mmultiscripts` (four physics uses, warned),
bold and italic `mtext` variants, a unit inside `<mn>`, stepwise lists.

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
