# Plan: 2.5 The Periodic Table (m68695)

Source: `source.md`, converted with `tools/convert.py 2.5`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left here for review after.

Three objectives, three numbered figures (2.25 Mendeleev and his table, 2.26 the periodic table, 2.27 the families), one worked example (2.7, Naming Groups of Elements) with its Check Your Learning, one Link to Learning (two external interactive periodic tables, dropped and named in `notes`), one footnote on group 12, eight end-of-chapter exercises of which four are keyed, and twenty-two glossary terms.

## Sub-concepts (page headers)

1. `grouping-elements` **Elements that behave alike** (book: the three groupings of Li, Na, K; Ca, Sr, Ba; F, Cl, Br, I; Mendeleev and Meyer; Figure 2.25).
2. `modern-table` **The periodic law and the modern periodic table** (book: the periodic law, periods and groups, Figure 2.26 with the elements page linked beside it; Tacke and Noddack and the last natural elements).
3. `metals-nonmetals` **Metals, nonmetals, and metalloids** (book: the paragraph sorting the elements into three classes and the colours of Figure 2.26).
4. `element-families` **Main-group elements, transition metals, and the named groups** (book: the classes and group names, the footnote on group 12, Figure 2.27, Example 2.7 with its Check Your Learning, Elion and Hitchings' purine analogues).
5. `bracketed-masses` **Atomic masses in square brackets** (book: the closing paragraph on radioactive elements).

## Figures

- Figure 2.25 · photo · kept (a portrait of the chemist the text names and the table the text describes); value add none, tier 0; no controls; flat; still, no cycle.
- Figure 2.26 · photo · kept as the book's image per `config.md`, with the elements page (`/chemistry-2e/sheets/elements/`) linked beside it, whose "Colour by: Metals, metalloids, nonmetals" reproduces the shading; tier 0; no controls; flat; still.
- Figure 2.27 · photo · kept as the book's image, the elements page's "Family" colouring reproducing it; tier 0; no controls; flat; still.

No Sim. The Link to Learning's two interactive tables are answered by the book's own elements page, which the page links; a second periodic table here would duplicate it (config: build no table of our own). `figures.js` is not written. Nothing binds a type (`ch02/COLOR.md`: 2.5 binds nothing).

## Exercises

- Check Your Learning of Example 2.7 inline under `data-place="ex-naming-groups"`, the book's answer, open.
- Keyed: `fs-idm319896576`, `fs-idm419056816`, `fs-idm415648752`, `fs-idm430165648`, open answers from the key; "the periodic table" in each prompt links to the elements page.
- Unkeyed with a definite answer, left out and named in `exercise_notes`: `fs-idm430913456`, `fs-idm315946160`, `fs-idm281322784`, `fs-idm251902464`.

## Errata as printed (in `notes`)

Glossary "hydrate" (a term of 2.7) and "representative element … columns 1, 2, and 12–18" (the text says 13–18); the text's "George Hitchens" kept as printed.

## Wanted at chapter level

- eq/var anchors: none (the section has no equation or variable rows).
- Glossary anchors: periodic-law → 2.5-modern-table; periodic-table → 2.5-modern-table; period, series, group → 2.5-modern-table; metal, nonmetal, metalloid → 2.5-metals-nonmetals; main-group-element, representative-element, transition-metal, inner-transition-metal, lanthanide, actinide, alkali-metal, alkaline-earth-metal, pnictogen, chalcogen, halogen, noble-gas, inert-gas → 2.5-element-families; hydrate → 2.7 (term of 2.7, printed in 2.5's glossary). Row ids as the chapter's glossary rows spell them.
- No concept, edge or symbol fix.

**Applied by the chapter pass (2026-09-28).** Glossary rows carry no anchor field, so the glossary anchors listed above are not written; each term already sits in its section's glossary, and "hydrate" stays in 2.5's as printed.
