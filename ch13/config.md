# Config: Chemistry 2e, Chapter 13

Proposed by the agent after the chapter exploration (2026-09-28). Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; the per-section stops of root rule 2, the plan review of root rule 5 and the user picks of root rule 15 are replaced by a plan file per section, written before the section is built and left for review after. Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 13 Fundamental Equilibrium Concepts, modules m68796 (introduction), m68797, m68798, m68799, m68801 |
| Front matter | the chapter introduction (m68796) is a page of its own in `ch13/intro/`, listed before 13.1, built by the prep agent with Figure 13.1 and no figure of its own |
| Unit of work | one section = one page; sections never folded, 13.1 included (root rule 11, the book's `RULES.md`) |
| Loop | prep → plan file → build → validator, the four sections in parallel, then the chapter pass; review after |
| Prose | verbatim; objectives, the section summary (to `summary_html`), the key equations and the glossary go to the tables (root rule 4) |
| Headers | one `<h2>` per sub-concept in the book's voice and sentence case; the book's own headers mark real divisions and the page's headers follow them; a worked example's `<h3>` is its number and the book's title |
| Boxed notes | Equilibrium and Soft Drinks (13.3), kept verbatim as `<div class="note">` with the book's eyebrow and an `<h3>` title, Figure 13.7 inside it |
| Link to Learning | the one in 13.3 (equilibrium and pressure) dropped and named in `notes`; it is the trigger for 13.3's Le Châtelier box |
| Tables | none numbered; Example 13.3's table of initial concentrations stays unnumbered as `div.book-table`; 13.4's ICE tables are unnumbered images written as tables or one live unnumbered Figure; Key Equations tables not printed |
| Example numbers | the publisher's: 13.1–13.5 (13.2), 13.6–13.10 (13.4) |
| Figure numbers | the publisher's, 13.1 to 13.9, listed per section in `exploration.md` |
| Figures | Figure 13.2 a moving 3D box with its two graphs beneath; 13.5 a moving Figure with a choice of starting mixture; 13.6 a still Figure with a choice of mixture; 13.8 a still reaction diagram; 13.9 a faithful copy unless the section argues more; 13.3's Le Châtelier box a Sim; folds are each section's call |
| Photographs | Figures 13.3, 13.4 (13.1) and 13.7 (13.3) kept, since the text points at each; Figure 13.1 kept on the introduction page |
| Unnumbered images kept as `figure` rows | 13.4's ICE tables if a section keeps them as images rather than HTML tables; the exercise image `CNX_Chem_13_05_Butane_img.jpg` is left out with its unkeyed item |
| 3D | particle pictures (13.2, the Le Châtelier Sim) are 3D with a flat strip of readings, bounded orbit, never from beneath; graphs, reaction diagrams, ICE tables and the plant diagram stay flat |
| Motion | per figure in its plan line; clocks are natural for 13.2 and 13.5 and for the Le Châtelier box's return to equilibrium; 13.6, 13.8 and the ICE tables are still, with no transport |
| Colour | `concentration`, `time`, `rate` for curves and boxes; `pressure` and `temperature` where K_P or a partial pressure is drawn; `volume` for a piston; `energy` for ΔH and reaction-diagram energies; every K and Q in ink; see `COLOR.md` |
| Symbols | sixteen rows added: typed `rate_f` `\kratef`, `rate_r` `\krater` (rate), `[C]` `\kconcC`, `[D]` `\kconcD` (concentration), `P_D` `\kPD` (pressure); untyped `k_f`, `k_r`, `Q_conc`, `Q_P`, `K_c`, `K_P`, `K_c_prime`, `K_c1`, `K_c2`, `Δn_gas`, `x_ice`; reused `K`, `Q_c` (latex Q), `[A]` `\kconcA`, `[B]` `\kconcB`, `P_A`–`P_C`, `P` `\kP`, `M` `\kM`, `T` `\kT`, `ΔH` `\kdH`, `rate` `\krate`, `t` `\kt`, untyped `R`; no new type |
| Inline exercises | eleven Check Your Learning items (5 in 13.2, 6 in 13.4, two of them in Example 13.9), inline after their examples, each with a `data-place` host |
| Exercises tab | the end-of-section items of each module, kind `exercise`; no `simulation-exercise` in the chapter |
| Exercise placement | `fs-idp194491952` (13.2) and `fs-idp92538384` (13.3) move to 13.1 with `source_section`; every other item stays in its own section |
| Answers to book problems | the book's key only; twenty unkeyed numerical items left out and named in `exercise_notes` (4 in 13.2, 16 in 13.4); one unkeyed choice item (13.3) kept open with its options; twenty-three other unkeyed items kept with an AI-marked suggested approach (list in `exploration.md`) |
| Generated questions | none |
| Concept nodes | 22 rows merged before the sections are built (3, 8, 6, 5), 53 prerequisite edges, into Chapters 3, 4, 5, 9, 10, 12 and within the chapter |
| Formulas | `ch13/chapter.json`: equal rates, Q_c, Q_P, P = MRT, K = Q, K_P = K_c(RT)^Δn, Δn, the three coupled-equilibria rules, K_c = k_f/k_r; 28 variables; no anchors until the chapter pass |
| Glossary | the book's wording, 8 entries (2, 5, 1, 0); terms are plain words, the book's "(*K*)" and "(*Q*)" dropped from the term |
| Degrees | `°` in prose and `^\circ` in math |
| Cross references | plain text to other sections; Appendix B (the quadratic formula) and Appendix E (water's vapor pressure) point at the `water` sheet or the publisher's page as the book's `RULES.md` says |
| Voice | root rule 17 and the book's Voice section |
| Labels | Figure for a book number, Sim for an addition; the word "demo" nowhere |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}`, `2026-09-28` |
| Book manifest | `ch13` added to `book.json` by `ost merge chemistry-2e 13` |
