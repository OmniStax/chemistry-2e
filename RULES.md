# Chemistry 2e: the book's rules

What is true of this book and of no other; the rules for every book are the root `RULES.md`, and this is the file its item 18 asks for. A chapter's decisions are in its `config.md`, the book's colour plan in `COLOR.md` beside this file (root rule 22). The long form is `docs/rationale/Chemistry 2e RULES.md`, kept for people.

## Source

The book is the OpenStax CNXML bundle at `source/osbooks-chemistry-bundle/` in this folder (a shallow clone of github.com/openstax/osbooks-chemistry-bundle, gitignored, read-only). Only `collections/chemistry-2e.collection.xml` (col26069) is built. One module is one section; modules are `m68NNN` at `modules/<module>/index.cnxml`, with images in `media/` beside them. `modules.json` and `toc.md` map every chapter, introduction and section to its module, title and publisher slug.

`python3 tools/convert.py 1.4` from this folder writes `ch01/1.4/source.md` (`1` for a whole chapter, `preface` for the Preface, `--out DIR` elsewhere) through the shared `omnistax-content/tools/cnxml2md.py`, whose docstring lists every marker: `{eq:id}`, `{term:…}`, `[ref:…]`, `> FIGURE {fig:id}`, `> IMAGE {img:id}`, `> TABLE {tab:id}`, `:::note [class] Title`, `:::example`, `:::exercise {id}`, `{section:…}`, `- {def}`. Ids are the book's CNXML ids; an exercise's `source_id` is its block's id. The degree sign is `°` (U+00B0) everywhere; the converter normalises the bundle's `º`.

## Structure

book → chapters (21) → sections (N.M) → titled headers, two levels in places → worked examples. Every chapter opens on an unnumbered introduction module under a splash photograph, the book opens on a Preface (m68662), and the book prints no chapter summary and no closing summary. One module, one section, one page; the chapter introduction is the page `chNN/intro/`, the Preface is `intro/`, each listed first (root rule 21). An introduction page keeps the book's words and its photograph as Figure N.1 with caption and credit, and has no lead, objectives, summary, glossary or exercises. Sections are never folded, not even 13.1.

| Id | Chapter | Introduction |
|---|---|---|
| ch01 | Essential Ideas | m68663 |
| ch02 | Atoms, Molecules, and Ions | m68684 |
| ch03 | Composition of Substances and Solutions | m68699 |
| ch04 | Stoichiometry of Chemical Reactions | m68730 |
| ch05 | Thermochemistry | m68723 |
| ch06 | Electronic Structure and Periodic Properties of Elements | m68728 |
| ch07 | Chemical Bonding and Molecular Geometry | m68736 |
| ch08 | Advanced Theories of Covalent Bonding | m68743 |
| ch09 | Gases | m68748 |
| ch10 | Liquids and Solids | m68760 |
| ch11 | Solutions and Colloids | m68776 |
| ch12 | Kinetics | m68785 |
| ch13 | Fundamental Equilibrium Concepts | m68796 |
| ch14 | Acid-Base Equilibria | m68802 |
| ch15 | Equilibria of Other Reaction Classes | m68810 |
| ch16 | Thermodynamics | m68815 |
| ch17 | Electrochemistry | m68820 |
| ch18 | Representative Metals, Metalloids, and Nonmetals | m68828 |
| ch19 | Transition Metals and Coordination Chemistry | m68841 |
| ch20 | Organic Chemistry | m68845 |
| ch21 | Nuclear Chemistry | m68850 |

A chapter folder is `ch` plus the two-digit number. A chapter's book-level rows (types, symbols, concepts, prerequisite edges) are staged in its `book-rows.json` and merged with `tools/mergebook.py merge chNN`, never written into `book.json` by hand.

The thirteen appendices are not pages. Twelve are reference tables and are sheets, `sheets/<id>.json`, written by `tools/elements.py` (Appendix A, all 118 elements, declared in `book.json` as the sheet `elements`) and `tools/appendices.py` (C through M), each marked `"generated_by": "tool"`; a sheet cell carries the same HTML the prose does. Appendix B is prose and becomes a page listed after the chapters when the app has a place for it. A cross-reference to an appendix points at the publisher's page until then.

## Apparatus

Inside each module, in order: learning objectives in `<md:abstract>`; the narrative with examples, figures, equations, inline definitions and notes; "Key Concepts and Summary"; "Key Equations" (51 of 114 sections); "Chemistry End of Chapter Exercises"; the glossary. Nothing is aggregated at chapter end. The summary goes to `summary_html`, printed at the end of the text (root rule 21); objectives, key equations and glossary go to the tables. An introduction module carries no apparatus.

Worked examples are `<example>` elements numbered Example N.M chapter-wide, each with a title, a problem, a Solution and a Check Your Learning whose answer is in a note.

The key covers the odd-numbered exercises of each section (873 of 1736), inline in the `<exercise>` element; every Check Your Learning is keyed. A keyed "Answers will vary" or a narrated PhET run is an open answer the reader compares with. An unkeyed numerical exercise is left out and named in `exercise_notes`; an unkeyed conceptual exercise is kept with a suggested approach marked as OmniStax's own (root rule 13). No answer is ever generated.

## Licence and attribution

CC BY-NC-SA 4.0, copyright Rice University, published by OpenStax, by Paul Flowers, Klaus Theopold, Richard Langley and William R. Robinson; the contributing authors are not named in the footer. Adapted pages are shared under the same licence. A section's publisher page is the `openstax` prefix of `book.json` followed by the section's `slug` from `chapter.json`. Third-party credits are a "(credit: …)" clause at the end of a caption, sometimes one per panel, and a kept photograph keeps the whole clause. All of this is in `book.json`.

## Voice

Full sentences in a plain, measured register on the formal side of plain: "we" when working something out, "you" when addressing the reader, "note that" and a parenthetical aside rather than a colon, the full name before the symbol, the reason before the rule. Write against these:

> Whether you are aware or not, chemistry is part of your everyday world. In this course, you will learn many of the essential principles underlying the chemistry of modern-day life.

> It is important to understand that no single boron atom weighs exactly 10.8 amu; 10.8 amu is the average mass of all boron atoms, and individual boron atoms weigh either approximately 10 amu or 11 amu.

> The spontaneity of a process is not correlated to the speed of the process. A spontaneous change may be so rapid that it is essentially instantaneous or so slow that it cannot be observed over any practical period of time.

No fragment-headed captions, no semicolon chains, no editorial framing.

## Types

Fourteen types in `book.json`, in scheme order: time, amount of substance, mass, volume, concentration, pressure, temperature, energy, entropy, rate, wavelength, frequency, potential, charge. Untyped and in ink: length, density, a count of particles, a percent, a mole ratio, an equilibrium constant, a reaction quotient, a rate constant. `COLOR.md` says why each type is there and what its variants are.

Variants share the hue and differ by decoration: initial (subscript i or 0) hollow or dashed, final filled, standard state by its ° mark, per-mole by its unit. A derived quantity is another type: molarity is not an amount, a rate is not a concentration, entropy is not an energy. pH and pOH are variants of concentration with the p as decoration.

Every coloured symbol has a `symbols` row with its type and macro (`\kn`, `\kM`, `\kdH`); an untyped symbol has a row with LaTeX only, or none. Macros are derived from the table: a new symbol is a new row, never a new macro.

## Exercise kinds

Three, declared in `book.json`. `check-your-learning`: the item at the end of a worked example, inline after it with the book's answer. `exercise`: the End of Chapter items, in the Exercises document; the book gives them no type, so the kind stays one and the Bloom level sorts them. `simulation-exercise`: an End of Chapter item whose prompt opens a PhET or other external simulation; in the Exercises document only once a Sim of our own carries the idea and the plan rewrites the prompt against it, otherwise held and named in `exercise_notes`. Exercises stay in their section; where one is taken from a sibling section, it carries `source_section` and both sections' `exercise_notes` say so.

## Figures

Figures, tables and examples are numbered chapter-wide as openstax.org prints them, from the opener's photograph as Figure N.1; the number is the publisher's, never a count of CNXML figures. A bare `<media>` in the text, an example or an exercise is an unnumbered image (529 in the book), content the page cannot do without.

An interactive figure replacing a numbered book figure keeps the number, eyebrow "Figure N.M", the book's images in `originals`, the book's caption in `original_caption`. One replacing an unnumbered image is a `figure` row with no number, eyebrow "Figure". One replacing nothing is a Sim. A kept photograph is a `photo` row with its number. A fold names its own `number` and the rest under `folds`. Sub-figures (a), (b) under one number are one row with several `originals`. Images carry no `width`, so `widths` stays empty and no `data-width` is written. Images are served from `media/<chapter>/` under the bundle's file names, copied there, never moved.

Two dimensions or three (root rule 24.8), settled for this book on 2026-09-12 from a side-by-side comparison. Settled without question: molecular geometry, orbitals, hybrid orbitals, unit cells and coordination geometries are 3D; graphs, ladders, energy diagrams, the periodic table, Lewis structures and symbolic benches are 2D. The four borderline groups: a particle picture (a gas box, a collision box, an equilibrium box, dissolution, a phase change, microstates) is 3D, spheres in a box the reader turns, its readings on a flat strip beneath. An experiment or apparatus (a galvanic or electrolytic cell, a calorimeter, a buret, a barometer, a mass spectrometer, Rutherford's foil) is 3D, a bench with a bounded orbit that never shows its underside. A molecule inset in an otherwise flat figure (a balloon's gas, water under a beaker, intermolecular forces, a hydration shell) and a structure the text names (a ball-and-stick, a functional group, orbital overlap) are built both ways with a view choice, 2D and 3D, defaulting to 2D, because the flat diagram is itself something the book teaches; the 3D stage mounts on the first switch. Every 3D figure follows root rule 26.

Two conventions of the book the app honours: the molecular drawings' atom palette (carbon black, hydrogen white, oxygen red, nitrogen blue, chlorine green, sulfur yellow, phosphorus orange, copper brown, sodium purple, titanium gray), drawn live through `F.el`, never the type scheme; and the spectra of Chapter 6 in the colours of visible light, kept as physical fact.

Photographs are kept where they show the thing the passage is about, where the text points at them, and in every Portrait of a Chemist box; dropped where they are a collage opener or a stock scene beside an example or a note. Every chapter opener's photograph is kept on the introduction page.

Boxed notes (Chemistry in Everyday Life, How Sciences Interconnect, Portrait of a Chemist, stepwise) are kept verbatim as `<div class="note">` with an eyebrow carrying the book's heading and an `<h3>` carrying the note's title; their figures are treated as any figure. Link to Learning notes are dropped and named in `notes`, and a link to a simulation of an idea the section teaches is the trigger for a Sim of our own.

Tables stay in the text as `div.book-table` with the publisher's number as eyebrow and the book's title as caption; a spanned header is written from the CNXML by hand. A table is never a `<figure>`. The unnumbered Key Equations table is not printed; it is the chapter's equations table.

Three ideas are spatial and use `F.view3d`: molecular geometry (7.6), hybrid orbitals (8.2), crystal lattices (10.6). Everything else, including particle boxes, cells and titrations, is planar.

## Files

The root layout, plus `sheets/`, `COLOR.md`, `modules.json`, `toc.md` and `tools/` (`convert.py`, `mergebook.py`, `elements.py`, `appendices.py`). Template sections: `ch01/1.4` (sliders, `F.select`, detents, `F.hover`, `F.cat`, a photograph, tables in `div.book-table`), `ch01/1.6` (one still Figure, a long exercise list), `ch07/7.6` (3D through `F.view3d`, `F.mesh`, `F.el`, `F.choice`); `ch01/intro/` and `intro/` for introduction pages; `ch01/COLOR.md`, `config.md`, `exploration.md` and `book-rows.json` for the chapter files. `text.html` holds the prose verbatim in `<section id>` blocks with `<h2>` headers in the book's voice, `<h3>` for the book's sub-headers and examples (`<div class="example" id="ex-…">`), `<sub>` and `<sup>` for formulas in prose and LaTeX in math, `\k` macros only for typed symbols, and every `<figure>` carrying `id`, `class`, `data-figure`, `data-original` and `data-original-caption` in agreement with its row. `figures.js` is one function per figure through `F.sim(root, id, H)` with colours only through `C(type)`, `PAL`, `F.el` and `F.cat`, never a hex literal.

The app builds one book by environment: every command from `omnistax-web/` carries `OMNISTAX_CONTENT_DIR="../omnistax-content/Chemistry 2e" OMNISTAX_BOOK=chemistry-2e`, with `PATH=/home/flober/.nvm/versions/node/v20.20.2/bin:$PATH`; `astro build` takes `--outDir` outside the repo, never `dist`. Pages serve at `/chemistry-2e/<chapter>/<section>/`.
