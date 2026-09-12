# Config: Chemistry 2e, Chapter 6

Proposed by the agent after the chapter exploration (2026-09-12). Status:
applied as proposed on 2026-09-12, on Chen's instruction to build the showcase
sections in one job without check-ins; the per-section stops of root rule 2,
the plan review of root rule 5 and the user picks of root rule 15 are replaced
by a plan file written before the section is built and left for review after.
Each line is a setting and its value.

**Only 6.2, The Bohr Model, is built in this pass.** The chapter's other four
sections are listed in `chapter.json` and have no page, and the chapter has no
introduction page yet: m68728, the Crab Nebula opener, waits for the pass that
builds the rest of the chapter. `chapter.json` records the introduction's
module and slug so that the page can be built later without finding them
again.

| Setting | Value |
|---|---|
| Chapter | 6 Electronic Structure and Periodic Properties of Elements, modules m68728 (introduction), m68729, m68732, m68733, m68734, m68735 |
| Built | 6.2 The Bohr Model (m68732) alone; 6.1, 6.3, 6.4 and 6.5 are listed in `chapter.json` with their modules, titles and slugs and carry no page, no variables, no equations and no glossary rows |
| Front matter | none yet; the chapter introduction (m68728) is a page of its own in `ch06/intro/` by root rule 21 and is left for the pass that builds the chapter |
| Unit of work | one section = one page; sections are never folded (root rule 11) |
| Prose | verbatim; the learning objectives, the section summary (to `summary_html`), the key equations and the glossary are pulled into the tables and the views (root rule 4) |
| Headers | the page's own headers carry the split of root rule 3, one `<h2>` for each sub-concept, written in the book's voice and in sentence case. 6.2 prints no titled header of its own, so every header on the page is the page's; a worked example's `<h3>` is its number and the book's title for it |
| Boxed notes | 6.2 has none: no `everyday-life`, no `sciences-interconnect`, no `chemist-portrait` and no `link-to-learning` note falls in this section, so the page carries no titled aside and `notes` names no dropped link |
| Tables | 6.2 prints no numbered table. Its one `> TABLE` block is the unnumbered Key Equations table, which is not printed: it is the equations table of `chapter.json`. No `div.book-table` is written |
| Example numbers | the publisher's, chapter-wide as the figures are: 6.1 carries Examples 6.1 to 6.3, so 6.2's two are Example 6.4 and Example 6.5 |
| Figure numbers | the publisher's, chapter-wide from the introduction's photograph as Figure 6.1 to Figure 6.35 in 6.5; 6.2 carries Figures 6.14 and 6.15. The list is in `exploration.md` |
| Figures | the book's two sketches of the hydrogen energy levels fold into one interactive Figure, since they draw one scene in two frames because print cannot move (root rule 14): its row's `number` is 6.14, its `folds` names 6.15, its eyebrow reads "Figure 6.14 + 6.15", its `originals` carry both of the book's images and both captions, and the prose's references to either number land on it. The section's plan states the fold and its reason |
| Sims | two, neither numbered and each labelled "Sim": the orbit beside the rung, and the transition series on a wavelength axis. `exploration.md` says what each shows that print cannot, and the section's plan repeats it in one line apiece |
| Unnumbered images | the spectra plate the last exercise prints (`fs-exercise`, the file the book numbers 6.13 in 6.1) is kept as a `figure` row with no number, whose eyebrow reads "Figure": the validator refuses a `photo` row without a number, and a faithful copy is what root rule 14 asks for a figure that serves an exercise. It is copied into `media/ch06/` under the bundle's own file name |
| Kept photographs | none; 6.2 prints no photograph. The bundle's images carry no `width`, so `widths` stays empty and no `data-width` is written |
| Sim sliders | whatever is interesting and variable in the idea: the quantum number an electron starts in and the one it ends in, the nuclear charge of the one-electron ion, the floor of a transition series and the highest level drawn into it |
| Motion | decided per figure in its plan line with the reason (root rule 14). The folded Figure moves: an electron that travels between two rungs and a photon that leaves the atom are an event with a time in it, so it registers a cycle and gets the app's transport. Both Sims are still: a set of orbits and a family of transitions answer their sliders and nothing else, so each registers `update: () => {}`, registers no cycle and gets no transport |
| 3D | none; every figure of this section is planar and drawn through `figlib`. The chapter's one spatial idea is the orbital shapes of 6.3, which is not built |
| Colour coding | the section binds `energy` and `wavelength`, and nothing else. Quantum numbers, the nuclear charge, the orbit radius, the Bohr radius, Planck's constant, the speed of light, the Rydberg constant and the constant k render in ink. The colours of the visible band on the spectrum strip are the colours of light and a physical fact, not a type, as the book's `RULES.md` says of the Chapter 6 spectra. Colour reaches the canvas only through `C()` and `PAL`, and a `\k` macro is written only for a symbol with a row in `book.json` `symbols`; `ch06/COLOR.md` holds the detail |
| Symbols | eight rows added to `book.json` through `tools/mergebook.py`: two typed, `E_n` and `ΔE`, with the macros `\kEn` and `\kdE`, and six untyped, `n_quantum`, `r`, `a_0`, `h`, `c` and `R_inf`, each with its LaTeX and no macro. The principal quantum number is `n_quantum`, never `n`: `n` is the amount of substance and carries the macro `\kn`, and a quantum number is not an amount. No new type: energy and wavelength are already declared |
| Inline exercises | both Check Your Learning items are `check-your-learning` cards placed inline right after the example each parallels, with the book's own answer from the `[answer]` note |
| Exercises tab | the end-of-chapter items of the module, kind `exercise`, placed at the end |
| Exercise placement | an exercise goes with the section that introduces what it tests. Two items of 6.2 lean on a section that is not built, the Rutherford model of 2.2 and the line spectra of 6.1; both are kept on this page, since neither section is a page to hold them for, and `exercise_notes` says so. No row carries a `source_section` |
| Answers to book problems | the book's key only, never computed. Six unkeyed numerical items are left out and named in `exercise_notes`; the two unkeyed conceptual items are kept with a suggested approach the page marks as OmniStax's own |
| Simulation exercises | none; the section has no PhET item |
| Suggested approaches | generated and marked as generated, for the two unkeyed conceptual items only; never for a numerical item |
| Generated questions | none, of any kind |
| Concept nodes | testable units only, kinds idea/result/skill, canonical book-independent kebab-case ids; nine nodes for 6.2 with two placeholder nodes standing for ideas of 6.1 that the section leans on, and prerequisite edges into Chapter 1 where they hold |
| Formulas | `ch06/chapter.json`: seven equations, all in 6.2, with the book's own three Key Equations and the photon relation `important` and the three derivation steps not; twelve variable rows. No row carries an `anchor`, since an anchor is written against the built page's own ids and the section pass writes them into its plan for the chapter pass to apply |
| Glossary | the book's own wording, four entries, all in 6.2 |
| Degrees | the degree sign `°` (U+00B0), never the masculine ordinal `º` (U+00BA); the section states no temperature, so the rule falls nowhere here |
| Dollar signs | `&#36;` in the prose of `text.html`, and the fullwidth `＄` inside a `prompt` or `solution` string and inside `\text{}` of a display equation; the section writes no dollar sign |
| Cross references | a reference to a section or a figure of a chapter not yet built is plain text in the book's wording. 6.2 names Electromagnetic Energy once, in Example 6.5, and it is left as the book's own words; the two references inside the section point at Figures 6.14 and 6.15 and are linked by the build to the one figure that carries both numbers |
| Voice | root rule 17 and the Voice section of the book's `RULES.md`: full sentences in a plain, measured register, on the formal side of plain, in every lead, caption, headline, readout, suggested approach, concept why and log line |
| Labels | a figure carrying the book's number is a Figure; one that replaces nothing in the book is a Sim and carries no number. The word "demo" appears nowhere |
| `ai` and `built` | `ai` names the model that did each half of the work, `{"text": …, "figures": …}`; `built` is `2026-09-12` |
| Book manifest | `ch06` added to `book.json` `chapters` in numeric order by `tools/mergebook.py merge ch06` and never by hand |
