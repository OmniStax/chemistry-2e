# Plan: 3.1 Formula Mass and the Mole Concept (m68700)

Source: `source.md`, converted with `python3 tools/convert.py 3.1`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; this file stands in for the review stop (root rules 2, 5, 15).

## Sub-concepts and spans

| Span | `<h2>` | Holds |
|---|---|---|
| `formula-mass` | Formula mass | the opening paragraph on quantitative chemistry, the definition, the book's `<h3>` Formula Mass for Covalent Substances (chloroform, aspirin, the fold of Figures 3.2 + 3.3 + 3.4, Example 3.1 `ex-ibuprofen`) and `<h3>` Formula Mass for Ionic Compounds (NaCl, the electron-mass paragraph, Example 3.2 `ex-alsulfate`) |
| `mole` | The mole | water against hydrogen peroxide, the amount unit, Avogadro's number |
| `molar-mass` | Molar mass | the definition, Figures 3.5 and 3.6, the unnumbered table, the drop of water and Figure 3.7 |
| `conversions` | Converting between mass, moles, and numbers of entities | the bridging sentence, the Sim, Examples 3.3 to 3.8 (`ex-potassium`, `ex-argon`, `ex-copper`, `ex-glycine`, `ex-vitaminc`, `ex-saccharin`), Figure 3.8 inside Example 3.5, and the How Sciences Interconnect note with Figures 3.9 and 3.10 and its footnote |

## Concepts (all in `book.json`)

- `formula-mass` introduced in `formula-mass`; `molecular-versus-formula-mass` introduced in `formula-mass` (the covalent and ionic sub-headers), reinforced in `ex-alsulfate`.
- `mole` and `avogadro-number` introduced in `mole`.
- `molar-mass` introduced in `molar-mass`; uses `formula-mass`.
- `mass-mole-conversion` introduced in `conversions`, used in `ex-potassium`, `ex-argon`, `ex-glycine`, `ex-vitaminc`.
- `count-atoms-and-molecules` introduced in `ex-copper`, reinforced in `ex-saccharin`.

## Figures

The page binds `mass` and `amount` (ch03 `COLOR.md`); only the Sim draws them.

- `fig-formula-mass` (Figure 3.2), `fig-aspirin-mass` (Figure 3.3), `fig-salt-mass` (Figure 3.4) · photos kept, each after the paragraph that cites it. Reverted on 2026-11-14 from one folded live figure (a compound dropdown and a 2D/3D view): the dropdown only swapped three still tables, the 3D view turned a model whose shape is not the lesson here (the sum is), and the flat redraw lost the book's models. Nothing varied, so the book's three images are back under their own numbers.
- `fig-ibuprofen-table`, `fig-alsulfate-table`, `fig-glycine-table` · unnumbered, kept images · the book's own formula-mass tables that the solutions of Examples 3.1, 3.2 and 3.6 read from; faithful copies (serve the examples).
- `fig-moles` · Figure 3.5 · photo kept: the text points at it and it shows one mole of eight elements side by side.
- `fig-compounds` · Figure 3.6 · photo kept: the text points at it.
- `fig-water` · Figure 3.7 · photo kept: the text points at it.
- `sim-mole-chain` · Sim, replaces nothing · mass-mole-conversion, count-atoms-and-molecules, molar-mass, avogadro-number · standardisation and variation: the six examples are routes on one chain, mass ⇄ moles ⇄ entities (⇄ carbon atoms for Example 3.8), and each example's ballpark estimate is read off a line of powers of ten of one mole · arrows: symbolic (the route from the given quantity to the wanted one) · still, the numbers answer the slider · select `example` (six, a dropdown), one slider for the given quantity: the mass `m` (mass; g, mg for saccharin) or the amount `n` (amount; read in mol as the examples write it, 9.2 × 10⁻⁴ mol), the other slider hidden · headline "4.7 g of potassium is 0.12 mol of K atoms." · no graph; the chain above, the estimate line below · 2D. Rebuilt on 2026-11-14: the boxes were small in a blank stage with an empty fourth slot, the caption ran to four sentences, and the slider only restated the arithmetic; the chain now fills the stage (the carbon box comes in only for Example 3.8) and the estimate line shows what the book does first in every example ("a bit more than one-tenth the molar mass").
  works: parts (three boxes, mass in the mass hue, moles in the amount hue, the count in ink, a fourth for carbon atoms in Example 3.8; between neighbours one factor: molar mass, Avogadro's number, C atoms per molecule; under them a logarithmic line from 10⁻⁵ mol to 1 mol whose decade ticks each carry the moles, the mass ℳ × 10ᵏ and the count N_A × 10ᵏ; a pin at the sample's amount) · flow (the lit arrows run from the box the example gives to the one it asks for; a factor reads "divide by" against its natural direction and "multiply by" with it) · must hold (each example opens on the book's numbers to the book's significant figures: 0.12 mol K; 0.037 g Ar; 4.74 × 10²² Cu atoms; 0.3776 mol glycine; 0.0250 g vitamin C; 1.31 × 10²⁰ molecules and 9.17 × 10²⁰ C atoms; the pin sits just right of 0.1 mol for potassium, just left of 0.001 mol for argon, just left of 0.1 mol for copper, between 0.1 and 1 mol for glycine, just right of 0.0001 mol for vitamin C; the pin stays on the line at every slider extreme; the readout is one chain with units on every number) · read off the image (the flowcharts read "Mass of K atoms (g) → Divide by molar mass (g/mol) → Moles of K atoms (mol)", "Multiply by molar mass (g/mol)" for argon and vitamin C, and "Multiply by Avogadro's number (mol⁻¹) → Number of Cu atoms" for copper and saccharin; molar masses 39.10, 39.95, 63.55, 75.07, 176.124 and 183.18 g/mol from the text; the saccharin flowchart stops at molecules, the carbon step is the text's)
- `fig-potassium-route`, `fig-argon-route`, `fig-copper-route`, `fig-glycine-route`, `fig-saccharin-route` · unnumbered, kept images · the flowcharts of Examples 3.3 to 3.6 and 3.8, put back on 2026-11-14: each solution ends a sentence on a colon that points at its flowchart, and with the image dropped the colon led nowhere.
- `fig-copper` · Figure 3.8 · photo kept: Example 3.5 points at it.
- `fig-vitaminc-route` · unnumbered, kept image · Example 3.7's flowchart, kept because the solution reads "as shown:" and points at it.
- `fig-saccharin` · unnumbered, kept image · the structural formula the example names ("which has the structural formula:"), a faithful copy; a molecule merely named gets no viewer (root rule 24.9).
- `fig-brain` · Figure 3.9 · photo kept: the note points at it.
- `fig-exocytosis` · Figure 3.10 · kept as the book's image: the synapse sketch shows no quantity and no motion the note asks the reader to imagine, and dopamine is a molecule merely named (root rule 24.9), so a model viewer would add nothing.

Extra simulations considered and left: the eight one-mole samples of Figure 3.5 on one balance (the photograph already makes the point that equal moles differ in mass); a drop of water counted in molecules (the text's arithmetic is its whole content).

## Tables

The unnumbered table of atomic and molar masses stays in `molar-mass` as a `div.book-table` with eyebrow "Table". Its Cl row prints 35.45 as the rendered table does; the alt text's 33.45 is an erratum and is not carried.

## Exercises

- Inline, kind `check-your-learning`, the book's answers: `cyl1` acetaminophen 151.16 amu, `cyl2` calcium phosphate 310.18 amu, `cyl3` 0.360 mol Be, `cyl4` 504.5 g Au, `cyl5` 4.585 × 10²² Au atoms, `cyl6` 0.073 mol sucrose, `cyl7` 14.2 g hydrazine, `cyl8` 9.545 × 10²² molecules and 9.545 × 10²³ H atoms (multi).
- End, kind `exercise`, keyed: exercises 1, 3, 5 (four structural formulas in the prompt), 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31. Multi-part numerical keys become `multi`; worded keys `open`.
- Unkeyed conceptual, kept with an AI-marked suggested approach: 8 (fs-idp25588816), 10 (fs-idp69842848); 6 (fs-idp50213376), a choice among three drawn molecules, kept as an open item with its drawings and a suggested approach, never graded.
- Left out, unkeyed numerical: 2, 4, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, named in `exercise_notes`.

## Wanted at chapter level

- variables `m` → 3.1-conversions
- variables `MM` → 3.1-molar-mass
- variables `n` → 3.1-mole
- variables `N_A` → 3.1-mole
- concept_prereqs formula-mass → Chapter 2's atomic-mass and chemical-formula concepts (from the chapter notes)
- concept_prereqs molecular-versus-formula-mass → Chapter 2's ionic-compound concept (from the chapter notes)
- concept_prereqs ideal-gas-law (9.2) → molar-mass (from the chapter notes)
- config.md "Unnumbered images": 3.1 keeps four example images as `figure` rows (the three formula-mass tables, Example 3.7's flowchart, the saccharin structure is a fifth) and drops five flowcharts to the Sim; the exercise structures sit on their cards.

### Applied by the chapter pass

The four variable anchors set as asked. The edges formula-mass → average-atomic-mass and formula-mass → molecular-formula were already rows; molecular-versus-formula-mass → ionic-compounds added and merged; ideal-gas-law → molar-mass was already a row of Chapter 9. The config line on unnumbered images is folded into `config.md`’s “What the build changed”. The glossary term “Avogadro’s number (N<sub>A</sub>)” is renamed “Avogadro’s number”, since a term is shown and matched as plain text.
