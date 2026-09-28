# Config: Chemistry 2e, Chapter 4

Proposed by the prep agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after.

| Setting | Value |
|---|---|
| Chapter | 4 Stoichiometry of Chemical Reactions, modules m68730 (introduction), m68709, m68710, m68713, m68714, m68716 |
| Front matter | the introduction is `ch04/intro/`, built in the prep pass with Figure 4.1 |
| Unit of work | one section = one page; never folded |
| Loop | prep → plan file → build → validator, all five sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, summary (`summary_html`), key equations and glossary to the tables |
| Headers | one `<h2>` per sub-concept in the book's voice; the book's own headers stand in their place; examples are `<h3>` "Example 4.N · Title" |
| Boxed notes | everyday-life (Stomach Antacids, Culinary Aspects of Chemistry in 4.2; Airbags in 4.3) and sciences-interconnect (Green Chemistry and Atom Economy in 4.4) kept verbatim as `div.note` with eyebrow and `<h3>`; their figures keep their numbers (4.8, 4.12, 4.15) |
| Link to Learning | dropped and named in `notes`: 4.1 (one), 4.2 (two), 4.4 (one, the PhET limiting-reactant simulation, trigger for a Sim) |
| Tables | Tables 4.1 and 4.2 in 4.2 as `div.book-table`; the atom-count tables of 4.1 and Example 4.7 are unnumbered book tables kept in the text; the Key Equations table of 4.4 is not printed |
| Example numbers | 4.1–4.2 (4.1), 4.3–4.7 (4.2), 4.8–4.11 (4.3), 4.12–4.13 (4.4), 4.14–4.16 (4.5) |
| Figure numbers | 4.1 to 4.18 as `exploration.md` lists them, checked on openstax.org for 4.2 |
| Unnumbered images | the route boxes inside examples of 4.3 and 4.5 are `figure` rows with no number (eyebrow "Figure"), redrawn or folded into a live route figure as the section judges; images inside exercises go on the exercise card |
| Figures | root rules 14, 24–28; Figures keep the book's numbers, agent additions are Sims; each plan line names its value add and tier |
| Motion | per figure; a still figure registers no cycle and no transport. Candidates for motion: a titration delivering titrant, a reaction box running to completion |
| 3D | a particle box or a bench only where the plan argues it (book `RULES.md`, root rule 28); default flat |
| Colour coding | per `COLOR.md`: `amount`, `mass`, `volume`, `concentration`; everything else ink |
| Symbols | none new; reuse `n` `\kn`, `m` `\km`, `MM` `\kMM`, `V` `\kV`, `M` `\kM` |
| Inline exercises | every Check Your Learning inline after its example with the book's answer, 16 in all, each with a `data-place` host |
| Exercises tab | end-of-chapter items, kind `exercise` |
| Exercise placement | nothing moved between sections; see `exploration.md` |
| Answers | the book's key only; unkeyed numerical items left out and named in `exercise_notes`; unkeyed conceptual items kept with an AI-marked suggested approach |
| Generated questions | none |
| Concept nodes | 29 merged (6, 9, 4, 5, 5) with 43 edges; edges into Chapters 2 and 3 wait for the chapter pass |
| Formulas | `chapter.json`: 3 equations (percent yield important; atom economy and molarity in mmol/mL not), 1 variable (M in 4.5); no anchors until the sections are built |
| Glossary | the book's wording, 49 entries (9, 23, 2, 5, 10) |
| Degrees and dollars | `°` only; `&#36;` in prose, `＄` in exercise strings (4.4's gold-atoms item) |
| Cross references | plain text; the periodic table may link to the elements sheet |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |

## What the build changed

- 3D: none. Every figure of the chapter is flat; the particle-box and bench candidates were judged against the book's drawings and drawn flat.
- Motion: two figures carry a clock, `sim-hcl` (Figure 4.5, molecules entering the water) and `sim-titration` (4.5, titrant delivered drop by drop); every other figure is still.
- Folds: one, Figures 4.2 + 4.3 as `sim-methane` in 4.1. Figure 4.11 is `sim-flowchart`, with the route of each 4.3 example lit on it; the unnumbered route boxes stay as their own still copies beside their examples.
- Sims added: `sim-balance` (4.1), `sim-precipitation` (4.2), `sim-ammonia` (4.3), `sim-silicon-nitride` and `sim-percent-yield` (4.4), `sim-titration` (4.5).
- Formulas: `eq-percent-yield` and `eq-atom-economy` anchored in 4.4, `eq-molarity-mmol` and the variable M at `4.5-titration-calc`.
- Concept edges: 57, of which 14 were staged by the chapter pass into Chapters 2 and 3 and within the chapter.
