# Plan: 2.7 Chemical Nomenclature (m68698)

Source: `source.md`, converted with `tools/convert.py 2.7`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left here for review after.

One objective, one numbered figure (2.32, Erin Brockovich and the chromate and dichromate ions, inside a note), eight tables (2.6 to 2.13), two display formulas of hydrates, two worked examples (2.13, 2.14) each with a Check Your Learning, two Chemistry in Everyday Life notes, one Link to Learning (a naming practice website, dropped and named in `notes`), eleven end-of-chapter exercises of which six are keyed, four glossary terms.

## Sub-concepts (page headers)

The book's headers stand as the page's `<h2>` in sentence case; the two headers nested under "Ionic Compounds" and the one under "Molecular (Covalent) Compounds" stay `<h3>`.

1. `nomenclature` **Naming inorganic compounds** (book: the opening paragraph, nomenclature and binary compounds). Uses `ionic-and-covalent-bonds`.
2. `ionic-compounds` **Ionic compounds** (book: the four questions; h3 Compounds Containing Only Monatomic Ions with Table 2.6; h3 Compounds Containing Polyatomic Ions with Table 2.7; the note Ionic Compounds in Your Cabinets with Table 2.8). Introduces `name-ionic-compounds`; uses `ionic-compounds`, `polyatomic-ions`.
3. `variable-charge` **Compounds containing a metal ion with a variable charge** (book: iron chlorides, Table 2.9, the -ic and -ous names). Introduces `name-variable-charge-metal-compounds`; uses `predict-ion-charge-from-group`, `ionic-compound-formula`.
4. `hydrates` **Ionic hydrates** (book: hydrates, the two formulas, Table 2.10, Example 2.13 with its Check Your Learning, the Erin Brockovich note with Figure 2.32). Introduces `name-hydrates`; uses `name-variable-charge-metal-compounds`.
5. `molecular-compounds` **Molecular (covalent) compounds** (book: the paragraph on ratios; h3 Compounds Composed of Two Elements; Table 2.11; common names; Example 2.14 with its Check Your Learning). Introduces `name-binary-molecular-compounds`; uses `molecular-compounds`.
6. `binary-acids` **Binary acids** (book: the three rules, Table 2.12). Introduces `name-binary-acids`.
7. `oxyacids` **Oxyacids** (book: the four rules, carbonic acid, Table 2.13). Introduces `name-oxyacids`; uses `polyatomic-ions`.

## Figures

- `fig-chromate` · Figure 2.32 · polyatomic-ions (the Cr(VI) oxyanions the note names) · value add: shape in 3D; the reader turns chromate's tetrahedron and sees dichromate as two tetrahedra sharing a corner oxygen atom, where the book prints one fixed view · still: a molecule has no clock · choices `ion` (chromate, dichromate) and `model` (structural formula, ball-and-stick); no slider · headline names the ion and what the model shows · no graph · both ways per the book's rule for a structure the text names: the structural formula is the flat default (`CrO₄²⁻` and `Cr₂O₇²⁻` in brackets with the charge), the ball-and-stick a 3D scene on `F.view3d` mounted on the first switch; physical 3D, free orbit (an ion has no ground), idle spin, views front and top. Bond orders as the book draws them (two double bonds on each chromium, the rest single). Atoms through `F.el`; chromium is not in the element palette and falls to its fallback (wanted below). Photograph (a), Erin Brockovich, is reached through the original the figure swaps to, as 2.2 does with Thomson; the note's text points at her by the figure number. Charges in ink: 2.7 binds nothing.

No Sim. The Link to Learning is a drill site, not a simulation of an idea; the naming rules are tables and flowing prose that no slider varies. Nothing binds a type (`ch02/COLOR.md`: 2.7 binds nothing).

## Tables

2.6 to 2.13 as `div.book-table`; 2.10 and 2.11 carry the spanned header row as their caption. Table 2.7 prints two columns of data under a three-column grid; two columns are written.

## Exercises

- Check Your Learning of Example 2.13 under `data-place="ex-naming-ionic"`, of Example 2.14 under `data-place="ex-naming-covalent"`, the book's answers, open.
- Keyed, open answers from the key: `fs-idp282297472`, `fs-idm250352`, `fs-idp268321696` (answer (e) printed "AIF₃·3H₂O", kept), `fs-idp279515392`, `fs-idp268365168`, `fs-idp268310912`.
- Unkeyed with a definite answer, left out and named in `exercise_notes`: `fs-idp283375776`, `fs-idp279465312`, `fs-idp279319168`, `fs-idp268274912`, `fs-idp282334032`.

## Errata as printed (in `notes`)

"Some examples demonstrating this Some other examples are shown in Table 2.11"; the key's "AIF₃·3H₂O"; "the principle element". The settlement's dollar sign is `&#36;`.

## Wanted at chapter level

- Glossary anchors: nomenclature → 2.7-nomenclature; binary-compound → 2.7-nomenclature; binary-acid → 2.7-binary-acids; oxyacid → 2.7-oxyacids; hydrate (2.5's row) → 2.7-hydrates. Row ids as the chapter's glossary rows spell them.
- Element palette: `Cr` is missing from `omnistax-web/src/lib/fig/elements.ts`; the book draws chromium light steel blue (Figure 2.32b).
- No concept, edge or symbol fix.

**Applied by the chapter pass (2026-09-28).** Glossary rows carry no anchor field, so the anchors listed are not written. The element palette now carries Cr; Figure 2.32 draws chromium in its own colour.
