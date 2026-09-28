# Config: Chemistry 2e, Chapter 3

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 3 Composition of Substances and Solutions, modules m68699 (introduction), m68700, m68702, m68703, m68704 |
| Front matter | the chapter introduction (m68699) is a page of its own in `ch03/intro/`, listed before 3.1, built in the prep pass with Figure 3.1, the swimming pool |
| Unit of work | one section = one page; sections never folded (root rule 11) |
| Order | 3.1 to 3.4 built in parallel by one agent per section, then the chapter pass |
| Loop | prep → plan file → build → validator for each section, then the chapter pass; review after |
| Prose | verbatim; objectives, summary (to `summary_html`), key equations and glossary pulled into the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case, standing in place of the book's own header over the same material; the book's `<h3>` sub-headers (Formula Mass for Covalent Substances, for Ionic Compounds, Determining Percent Composition from Molecular or Empirical Formulas, Deriving Empirical Formulas from Percent Composition) kept; an example's `<h3>` is "Example 3.N · the book's title" |
| Boxed notes | 3.1's "How Sciences Interconnect" note, Counting Neurotransmitter Molecules in the Brain, kept verbatim as `<div class="note">` with its eyebrow and `<h3>`, its Figures 3.9 and 3.10 numbered; its footnote kept at the note's end |
| Link to Learning | all three dropped and named in `notes`: 3.1 (the mole video), 3.2 (empirical-formula video), 3.3 (PhET dilution simulation, the trigger for 3.3's dilution Sim) |
| Tables | 3.1's unnumbered table of atomic and molar masses stays in the text as a `div.book-table` with no number in its eyebrow ("Table"); the Key Equations tables of 3.2 to 3.4 are not printed, they are `chapter.json`'s equations |
| Example numbers | the publisher's: 3.1 to 3.8 in 3.1, 3.9 to 3.13 in 3.2, 3.14 to 3.21 in 3.3, 3.22 to 3.25 in 3.4 |
| Figure numbers | the publisher's, 3.1 (intro) to 3.19; list in `exploration.md`, checked on openstax.org for 3.1 and 3.4 |
| Figures | the formula-mass tables with models (3.2 to 3.4) become a live Figure, a fold at 3.1's discretion; the six mass–mole–number flowcharts of 3.1's examples are carried by one still Sim with the examples' numbers as states, the flowchart images themselves kept as unnumbered `figure` rows only where the example reads badly without them; Figure 3.11 becomes a still figure with element-mass sliders; 3.3 builds a dilution Sim (and a molarity view, one figure or two at its discretion); 3.4 a Sim of one mass ratio read as %, ppm and ppb is proposed and decided by its plan |
| Unnumbered images | a `figure` row with no number, eyebrow "Figure": the example tables of 3.1 (ibuprofen, aluminum sulfate, glycine) may be states of the formula-mass figure instead; the saccharin structure and 3.4's flowchart are faithful copies; the eleven structural formulas in 3.1's exercises go on their cards |
| Kept photographs | `photo` rows with the book's number and caption including the credit clause, bundle file copied into `media/ch03/` under its own name; each plan decides keep or drop |
| Motion | nothing in the chapter has a clock; every figure is still, registers no cycle and gets no transport |
| 3D | molecule insets (the formula-mass models, dopamine) carry a 2D and a 3D view behind `F.choice`, 2D default, free orbit; the NaCl crystal is a packing, 3D; a beaker drawn with particles is a particle picture and 3D by the book's rules unless the plan argues it flat; no locked views |
| Colour coding | `amount`, `mass`, `volume`, `concentration`; `ch03/COLOR.md` holds the detail |
| Symbols | nine rows merged: `L`, `L_1`, `L_2` (volume, `\kL`, `\kLone`, `\kLtwo`), `M_1`, `M_2`, `C_1`, `C_2` (concentration, `\kMone`, `\kMtwo`, `\kCone`, `\kCtwo`), untyped `N_A` and `n_fu` (the formula units per molecule, LaTeX `n`, never `\kn`). Reused: `n`, `m`, `MM` (`\kMM`), `V`, `V_1`, `V_2`, `n_1`, `n_2`, `M` (`\kM`). No new type |
| Inline exercises | every Check Your Learning inline after its example with the book's answer, in a host `<div class="exercises" data-place="…">`: 8, 5, 8, 4 |
| Exercises tab | the end-of-chapter items of each module, kind `exercise`; no `simulation-exercise` in the chapter |
| Exercise placement | nothing moved; no `source_section` |
| Answers | the book's key only; unkeyed numerical items left out and named in `exercise_notes`; unkeyed conceptual items kept with an AI-marked suggested approach; the numbers are in `exploration.md` |
| Generated questions | none |
| Concept nodes | 23 merged (7, 5, 6, 5), 39 edges, every one into this chapter or Chapter 1; edges from Chapter 2 and into Chapter 9 wait for the chapter pass |
| Formulas | 11 equations (8 important), 17 variables; no anchors until the sections are built |
| Glossary | 20 entries in the book's words (4, 2, 9, 5) |
| Dollar signs, degrees | none in the chapter's prose; `°` and `^\circ` as the root rules say (3.3's exercise at 20 °C) |
| Cross references | plain text; the periodic table (Example 3.3's "referring to the periodic table") may link `/chemistry-2e/sheets/elements/` |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |

## What the build changed

| Setting | As built |
|---|---|
| Figures | 3.1 folds Figures 3.2 + 3.3 + 3.4 into one live Figure (chloroform, aspirin, sodium chloride; 2D default, 3D choice, NaCl a 3 × 3 × 3 packing); the three example tables stay as unnumbered `figure` rows inside their examples, with Example 3.7's flowchart and the saccharin structure; one still Sim carries the mass–mole–number route of Examples 3.3 to 3.8, and the other five flowcharts are dropped and named in `notes`. 3.2 makes Figure 3.11 a still Figure with a sample choice and two mass sliders. 3.3 builds a molarity Sim and folds the dilution photograph, Figure 3.16, into a live dilution Figure. 3.4 builds the Sim of one mass ratio read as %, ppm and ppb and keeps Example 3.23's flowchart unnumbered |
| 3D | the two beaker figures of 3.3 are flat, argued in its plan: the particles are a count read off the picture, which a turned beaker would hide |
| Colour coding | 3.4 binds `mass` only; volume appears there in prose and the kept flowchart |
| Exercises | 3.3 leaves out the two “outline the steps” items fs-idm59335888 and fs-idm3478704, whose part (b) is unkeyed; 3.1 keeps exercise 6, a choice among three drawn molecules, as an open item. Kept: 19, 7, 14, 6 end-of-chapter items and 8, 5, 8, 4 Check Your Learning |
| Concept nodes | 43 edges after the chapter pass added molecular-versus-formula-mass → ionic-compounds; the other Chapter 2 edges and ideal-gas-law → molar-mass were already rows |
| Formulas | every variable and equation anchored in the chapter pass |
| Glossary | “Avogadro’s number (N<sub>A</sub>)” renamed “Avogadro’s number”, since a term is shown and matched as plain text |
