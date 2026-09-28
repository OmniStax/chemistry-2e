# Config: Chemistry 2e, Chapter 6

Proposed by the agent after the chapter exploration (2026-09-12 for 6.2,
2026-09-28 for the rest of the chapter). Status: 6.2 applied as proposed on
2026-09-12, on Chen's instruction to build the showcase sections in one job
without check-ins; the introduction, 6.1, 6.3, 6.4 and 6.5 applied as
proposed on 2026-09-28, on Chen's instruction to finish the book without
check-ins. The per-section stops of root rule 2, the plan review of root
rule 5 and the user picks of root rule 15 are replaced by a plan file per
section, written before the section is built and left for review after.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Chapter | 6 Electronic Structure and Periodic Properties of Elements, modules m68728 (introduction), m68729, m68732, m68733, m68734, m68735 |
| Built | 6.2 The Bohr Model (m68732) on 2026-09-12, kept exactly as it stands with its rows, page and concepts; the introduction on 2026-09-28 in the prep pass; 6.1, 6.3, 6.4 and 6.5 in the pass of 2026-09-28 |
| Front matter | the chapter introduction (m68728) is a page of its own in `ch06/intro/`, listed before 6.1 (root rule 21): the book's paragraph on the Crab Nebula under its photograph, Figure 6.1, with no lead, objectives or exercises |
| Unit of work | one section = one page; sections are never folded (root rule 11) |
| Prose | verbatim; the learning objectives, the section summary (to `summary_html`), the key equations and the glossary are pulled into the tables and the views (root rule 4) |
| Headers | the page's own headers carry the split of root rule 3, one `<h2>` for each sub-concept, in the book's voice and in sentence case; the book's own titled headers (Waves, Blackbody Radiation and the Ultraviolet Catastrophe, The Aufbau Principle and so on) are kept as the page's `<h2>` where they already mark a sub-concept; a worked example's `<h3>` is its number and the book's title. 6.2 prints no titled header of its own |
| Boxed notes | kept verbatim as `div.note` with the book's eyebrow and an `<h3>` title: 6.1 has one Chemistry in Everyday Life (Wireless Communication) and one Portrait of a Chemist (Dorothy Crowfoot Hodgkin). The six Link to Learning notes (6.1 two, 6.3 three, 6.5 one) are dropped and named in `notes`; 6.1's photoelectric simulation link is the trigger for a Sim of its own, and 6.5's periodic-trends visualization link for the trends Sim. 6.2 has none |
| Tables | in the text as `div.book-table` with the publisher's number and title: Table 6.1 in 6.3, Tables 6.2 and 6.3 in 6.5. The unnumbered tables of 6.3's Example 6.8 (the question and its completed answer) are written as unnumbered `div.book-table` inside the example; the table in the key of 6.3's last exercise goes in its solution. Every Key Equations table is the chapter's equations table and is not printed |
| Example numbers | the publisher's, chapter-wide: 6.1 carries Examples 6.1 to 6.3, 6.2 Examples 6.4 and 6.5, 6.3 Examples 6.6 to 6.9, 6.4 Examples 6.10 and 6.11, 6.5 Examples 6.12 and 6.13 |
| Figure numbers | the publisher's, chapter-wide from the introduction's photograph as Figure 6.1 to Figure 6.35 in 6.5, checked on openstax.org; the list per section is in `exploration.md` |
| Figures | each section's plan decides, by root rules 14 and 24 to 28, what each sketch becomes and argues the tier; `exploration.md` proposes a translation for every numbered figure. 6.2's two hydrogen ladders fold into one Figure 6.14 + 6.15 |
| Sims | agent-added figures labelled "Sim" and carrying no number; 6.2 has two, the orbit beside the rung and the transition series; the proposals for the other sections are in `exploration.md` |
| Unnumbered images | an image the book prints without a number inside the text, an example or an exercise (6.2 one, 6.3 two, 6.4 thirteen, 6.5 one) is a `figure` row with no number whose eyebrow reads "Figure", faithful or live as the section's plan decides; an image inside an exercise stays a faithful copy on its card. 6.2's spectra plate is kept that way under the bundle's own file name |
| Kept photographs | the introduction's Crab Nebula (6.1); in 6.1 the interference fringes (6.6), the drumhead (6.8) and the neon sign (6.12) are pointed at by the text and kept; the radio towers (6.4) of the Everyday Life note is the section's call; in 6.3 the water ripples (6.16). Images carry no `width`, so `widths` stays empty and no `data-width` is written |
| Sim sliders | whatever is interesting and variable in the idea, the book's numbers as defaults; a quantum number, an element, a subshell or a spin state is a discrete choice (`F.choice`/`F.select`), never a slider |
| Motion | decided per figure in its plan line with the reason (root rule 14). 6.2's folded Figure moves; its two Sims are still. The candidates with a clock in them elsewhere are the travelling wave (6.2), the AM and FM signals (6.5), the vibrating string (6.7), the photons of the photoelectric effect (6.11) and the electrons arriving one by one at the double slit (6.18) |
| 3D | 6.2 none. By the book's `RULES.md`, orbitals are 3D: Figures 6.20 and 6.21 are mathematical 3D through `F.view3d` (free orbit, no ground, house style). Locked views (`view()`/`face()`) for the spheres the book prints in perspective: the spinning electrons (6.23), the diatomic halogens of 6.30(a) and the atoms and ions of 6.32. The electron double slit (6.18) is an apparatus and so a candidate for a bench by the book's borderline rule; its lesson is the pattern on the screen, and 6.3's plan decides. Everything else is flat: spectra, graphs, ladders, orbital diagrams and the periodic table |
| Colour coding | the chapter declares no new type. Each section binds only what its figures draw, its sliders carry or its readouts state, as `ch06/COLOR.md` records; atoms and ions through `F.el`, the colours of visible light as physical fact, categorical instances (the s, p, d and f blocks, the sign of a wavefunction's lobe) through `F.cat`. Colour reaches the canvas only through `C()`, `PAL`, `F.el` and `F.cat`, and a `\k` macro is written only for a symbol with a row in `book.json` |
| Symbols | 6.2's eight rows as they stand. Added on 2026-09-28: typed `λ_max` (`\klammax`) and `Δt` (`\kdt`), untyped `v`, `p_momentum`, `Δx`, `Δp_x`, `hbar`, `n_i`, `n_f`, `l_quantum`, `m_l`, `m_s`, `Z_eff`. Reused: `E` `\kE`, `λ` `\klam`, `ν` `\knu`, `m` `\km`, `T` `\kT`, `ΔE` `\kdE`, `E_f`, `E_i`, `n_quantum`, `h`, `c`, `R_inf`, `k`, `Z`, `r`, and `IE` `\kIE`, `EA` `\kEA` and `ψ` as another chapter staged them the same day. `n_1` and `n_2` of the Rydberg formula are quantum numbers written plain, never `\knone`/`\kntwo` (amounts) |
| Inline exercises | every Check Your Learning is a `check-your-learning` card placed inline after the example it parallels, with its host `<div class="exercises" data-place="…">`, carrying the book's own answer |
| Exercises tab | the end-of-chapter items of each module, kind `exercise`; none is a PhET item |
| Exercise placement | an exercise goes with the section that introduces what it tests. Three items move from 6.5 to 6.4, which relates electron configurations to the groups of the periodic table: `fs-idm150214960`, `fs-idm121823200` and `fs-idp177066416`; each carries `source_section` 6.5 and both sections' `exercise_notes` say so. 6.2's two items that lean on 2.2 and 6.1 stay on 6.2 as its config of 2026-09-12 decided |
| Answers to book problems | the book's key only, never computed, read from the CNXML. Unkeyed numerical items are left out and named in `exercise_notes` (6.1 seven, 6.2 six). Unkeyed conceptual items are kept with a suggested approach marked as OmniStax's own; an unkeyed item that asks the reader to pick from a list is kept as an open item with its options, never graded |
| Suggested approaches | generated and marked as generated, for unkeyed non-numerical items only |
| Generated questions | none, of any kind |
| Concept nodes | testable units, kinds idea/result/skill, canonical book-independent ids: 6.1 nine (its two placeholders of 2026-09-12, `photon-energy` and `line-spectra`, completed in place with evidence and an equation, id, name and why unchanged), 6.2 nine as they stand, 6.3 nine, 6.4 nine, 6.5 seven; prerequisite edges into Chapters 1, 2 and 5 where they hold |
| Formulas | `ch06/chapter.json`: twenty-two equations (6.1 five, 6.2 seven, 6.3 six, 6.5 four) with the book's Key Equations `important`, and `ktex` wherever a typed symbol appears; forty-six variable rows. 6.2's anchors stand; the other sections' anchors are written by the chapter pass from their plans |
| Glossary | the book's own wording, fifty entries: 6.1 seventeen, 6.2 four, 6.3 seventeen, 6.4 seven, 6.5 five |
| Degrees | the degree sign `°` (U+00B0) outside math and `^\circ` inside, never `º`; 6.1's blackbody at 5250 °C is the one place the chapter writes a temperature |
| Dollar signs | `&#36;` in the prose of `text.html`; the chapter writes none |
| Cross references | plain text in the book's wording; a reference to another section's figure keeps the book's words. Where the text points at the periodic table (6.4, 6.5), the elements page `/chemistry-2e/sheets/elements/` may be linked |
| Voice | root rule 17 and the Voice section of the book's `RULES.md`, American spelling, full sentences, in every lead, caption, headline, readout, suggested approach, concept why and log line |
| Labels | a figure carrying the book's number is a Figure; one that replaces nothing in the book is a Sim and carries no number |
| `ai` and `built` | `{"text": "Claude Opus 5.5", "figures": "Claude Opus 5.5"}` and `2026-09-28` on every page of this pass; 6.2 keeps its own of 2026-09-12 |
| Book manifest | `ch06` in `book.json` `chapters` through `ost merge`, never by hand |

## What the build changed

- 6.4's Aufbau figure sets Z, the number of electrons, as a slider from 1 to 118 rather than a choice of element. The procedure adds one electron at a time, so the ordered count is the idea, and the name of the element rides in the headline.
- Four figures fold two of the book's: Figure 6.14 + 6.15 (6.2, as before), Figure 6.27 + 6.29 (the blocks of the periodic table), Figure 6.31 + 6.33 (the radius and ionization-energy trends) and Figure 6.34 + 6.35 (the ionization energies and electron affinities on the periodic table). The photograph of radio and cell towers, Figure 6.4, is left out.
- Every variable and equation row of 6.1, 6.3 and 6.5 carries its anchor; 6.4 writes no variable or equation rows.
- Three concept edges were staged and merged in the chapter pass: `ionization-energy-trend` rests on `hunds-rule`, `classical-atom-instability` on `nuclear-model-of-the-atom`, and `hydrogen-like-ions` on `subatomic-particles`, so the chapter now carries 90 prerequisite edges.
- The eleven glossary terms of 6.1 and 6.3 that carried HTML are plain words, such as "wavelength (λ)" and "magnetic quantum number (mₗ)".
