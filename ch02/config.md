# Config: Chemistry 2e, Chapter 2

Proposed by the prep agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 2 Atoms, Molecules, and Ions, modules m68684 (introduction), m68685, m68687, m68692, m68693, m68695, m68696, m68698 |
| Front matter | the chapter introduction (m68684) is a page of its own in `ch02/intro/`, listed before 2.1, built by the prep agent |
| Unit of work | one section = one page; sections never folded |
| Order | 2.1 to 2.7 in book order, built in parallel by one agent per section, then the chapter pass |
| Prose | verbatim; objectives, summary (to `summary_html`), key equations and glossary pulled into the tables and views (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; where the book prints its own header over the same material (Chemical Symbols, Isotopes, Atomic Mass in 2.3; Ionic Compounds, Molecular Compounds in 2.6; the nine headers of 2.7) the page's header stands in its place. 2.7's two levels (Ionic Compounds over three sub-headers, Molecular Compounds over one) keep the book's sub-headers as `<h3>`. A worked example's `<h3>` is its number and the book's title |
| Boxed notes | kept verbatim as `<div class="note">` with an eyebrow carrying the book's heading and an `<h3>` with the note's title: Portrait of a Chemist, Paula Hammond (2.4, with Figure 2.22); Chemistry in Everyday Life, Ionic Compounds in Your Cabinets (2.7, with Table 2.8) and Erin Brockovich and Chromium Contamination (2.7, with Figure 2.32) |
| Link to Learning | every one dropped and named in `notes`: three in 2.2, five in 2.3, two in 2.4, one each in 2.5, 2.6 and 2.7; a PhET link is the trigger for a Sim of the section's own (Rutherford Scattering, Build an Atom, Isotopes and Atomic Mass, Build a Molecule) |
| Tables | Tables 2.1 to 2.13 stay in the text as `div.book-table` with the publisher's number as eyebrow and the book's title as caption; Tables 2.10 and 2.11 carry their titles in a spanned header row, written by hand as the caption; 2.3's Key Equations table is not printed; the unnumbered data table inside 2.1's exercise `fs-idp146757152` stays in the exercise |
| Example numbers | the publisher's, chapter-wide: 2.1, 2.2 (2.1); 2.3 to 2.5 (2.3); 2.6 (2.4); 2.7 (2.5); 2.8 to 2.12 (2.6); 2.13, 2.14 (2.7) |
| Figure numbers | the publisher's, 2.1 (intro) to 2.32 (2.7); the list is in `exploration.md`, checked against openstax.org for 2.4 and 2.7 |
| Figures | the book's sketches of an experiment, a particle picture, a symbol or a formula become live Figures with the book's number, folded where one figure is clearer (2.9 + 2.10 the obvious candidate); each section's plan decides depth and folds. Photographs are kept where the text points at them or they show the thing the passage is about, always for Paula Hammond, and dropped as stock scenes otherwise; each plan says which |
| Unnumbered images | 2.1's three sphere drawings and 2.4's twelve structural drawings are `figure` rows with no number (eyebrow "Figure"), redrawn where the drawing reads better in both themes, copied otherwise; the answers' drawings (`Question9a`, `9b`) sit in their solution |
| Periodic table | the book's elements page, `/chemistry-2e/sheets/elements/` (sheet `elements`), is the chapter's periodic table. 2.5 links to it where the text points at the periodic table and does not build a table of its own: its "Colour by" choices reproduce the shading of Figure 2.26 (Metals, metalloids, nonmetals) and Figure 2.27 (Family), and its Group, Period, Block, State and Family filters answer 2.5's exercises. 2.5 keeps Figures 2.26 and 2.27 as the book's images (`photo` rows are refused without a number; they carry their numbers) with the link beside them; 2.3's pointer to Appendix A and 2.6's uses of the table link there too. The page takes no URL parameters yet, so a link cannot open it coloured by family; wanted at chapter level if a section finds it matters |
| Ion charges | Figure 2.29 is a periodic table of ion charges; 2.6 decides whether to redraw it live or keep the book's image, and never builds a second full table |
| Motion | decided per figure (root rule 14). Candidates with a clock: the cathode ray (2.6), Millikan's falling drops (2.7), α particles through the foil (2.9 + 2.10), ions through the spectrometer (2.15). Everything else is still: no cycle, no transport |
| 3D | per `exploration.md` and the book's rules: the gold foil experiment is a bench with a bounded orbit (never from beneath); the cathode ray tube, Millikan's chamber and the mass spectrometer are argued flat or bench in their plans; named molecules in 2.4 (and chromate and dichromate in 2.7) carry a 2D and 3D view choice, 2D by default; carvone's mirror pair is 3D |
| Colour coding | `ch02/COLOR.md`: the chapter binds `charge` (2.2, 2.3, 2.6) and `mass` (2.1, 2.2, 2.3); everything else is ink; atoms in the element palette through `F.el` |
| Symbols | none added. Reused: `Z`, `A` (untyped), `e` (`\ke`, charge), `m` (`\km`), `Q_charge` (`\kQ`). The book writes average mass, abundance and the numbers of particles in words |
| Inline exercises | every Check Your Learning inline after its example, with the book's answer, under a `data-place` host: 2, 0, 3, 1, 1, 5, 2 |
| Exercises tab | end-of-chapter items, kind `exercise`, in their own section; no `source_section` in this chapter |
| Answers | the book's key only. Unkeyed conceptual items kept with an AI-marked suggested approach; unkeyed items with a definite answer (symbols, counts, names, formulas, averages) left out and named in `exercise_notes`. The ten PhET items are `simulation-exercise`, carried only by a Sim of the section's own with the prompt rewritten against it, otherwise held and named |
| Concept nodes | 40 in `book.json`: 3, 5, 9, 5, 5, 7, 6; 69 prerequisite edges, into Chapter 1 and within the chapter |
| Formulas | `ch02/chapter.json`: 4 equations (2.2 electron mass; 2.3 nucleon numbers, atomic charge, average atomic mass, the last the book's Key Equation and important); 3 variables (Z, A, e); no anchors until the chapter pass |
| Glossary | the book's wording, 61 entries (4, 6, 11, 6, 22, 8, 4), including 2.5's "hydrate" as printed |
| Errata | as printed and named in `notes`, listed in `exploration.md` |
| Degrees and dollars | `°` outside math, `^\circ` inside; the Erin Brockovich settlement's dollar sign is `&#36;` |
| Cross references | plain text to other sections; the elements page linked where the text points at the periodic table or Appendix A |
| Labels | an agent-added interactive is a Sim; a transformed book figure keeps "Figure N" |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`; `2026-09-28` |

## What the build changed

- Unnumbered images: 2.1's `Dalton8_img` and `Dalton10_img` and all twelve of 2.4's exercise drawings sit in their exercise cards (prompt or solution), not as `figure` rows; only `Dalton6_img` is a `figure` row (`fig-dalton-test`).
- 2.2 binds `charge` only; no figure reads out the electron's mass.
- 2.4's three Build a Molecule items are held and named in `exercise_notes`.
- Anchors set by the chapter pass; glossary rows carry no anchor.
