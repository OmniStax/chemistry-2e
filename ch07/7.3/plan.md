# Plan: 7.3 Lewis Symbols and Structures (m68739)

Source: `source.md`, converted with `python3 tools/convert.py 7.3`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left for review.

Two learning objectives, four numbered figures (7.9 to 7.12; 7.11 a photograph in the Fullerene note), twenty-eight unnumbered images in the reading, two worked examples (7.4, 7.5) each with a keyed Check Your Learning, one boxed note (How Sciences Interconnect, Fullerene Chemistry), no table, no Link to Learning, twenty-one end-of-chapter exercises (eleven keyed), a glossary of nine terms already in `chapter.json`. The page binds no type (chapter `COLOR.md`): Lewis symbols and structures are ink, electrons placed in the current step of the Sim carry the book's red mark as `F.cat(0)`.

## Sub-concepts (page headers)

1. `lewis-symbols` **Lewis symbols** (the section's opening paragraph and the book's header; the calcium symbol, Figure 7.9, the cation and anion images, Figure 7.10). Introduces `lewis-symbol`; uses `valence-and-core-electrons`, `ion-configurations`, `predict-ion-charge`, `ionic-bond`.
2. `lewis-structures` **Lewis structures** (book's header; Cl<sub>2</sub>, lone pairs, the single bond). Introduces `lewis-structure`; uses `lewis-symbol`, `covalent-bond-formation`.
3. `octet-rule` **The octet rule** (book's sub-header; CCl<sub>4</sub>, SiH<sub>4</sub>, NH<sub>3</sub>, H<sub>2</sub>O, HF). Introduces `octet-rule`; uses `lewis-structure`.
4. `multiple-bonds` **Double and triple bonds** (book's sub-header). Introduces `multiple-bonds`; uses `octet-rule`.
5. `writing-lewis` **Writing Lewis structures with the octet rule** (book's header; the five steps worked on SiH<sub>4</sub>, CHO<sub>2</sub><sup>−</sup>, NO<sup>+</sup>, OF<sub>2</sub>; the Sim; Example 7.4 `ex-titan` with its Check Your Learning; the Fullerene note). Reinforces `lewis-structure`; uses `octet-rule`, `multiple-bonds`, `electronegativity`.
6. `octet-exceptions` **Exceptions to the octet rule** (book's header with its three `<h3>` sub-headers; Figure 7.12; Example 7.5 `ex-xenon` with its Check Your Learning). Introduces `octet-rule-exceptions`; uses `lewis-structure`, `octet-rule`.

Key Concepts and Summary to `summary_html`; objectives and glossary to the tables.

## Figures

- `fig-period3-symbols` · Figure 7.9 · `lewis-symbol` · standardisation only: a table of eight symbols, nothing varies that a reader must imagine · kept as the book's image (`photo` row, number 7.9) · none · none · none · 2D.
- `fig-ionic-lewis` · Figure 7.10 · `lewis-symbol`, `ionic-bond` · standardisation only; the red dots are a notation of transfer, and replaying them is the mechanism animation rule 24.9 forbids · kept as the book's image (`photo`, 7.10) · 2D.
- `fig-smalley` · Figure 7.11 · none · a portrait inside the Fullerene note, kept with its credit (`photo`, 7.11).
- `fig-hypervalent` · Figure 7.12 · `octet-rule-exceptions` · standardisation only · kept as the book's image (`photo`, 7.12) · 2D.
- `sim-lewis-steps` · Sim · `lewis-structure`, `octet-rule`, `multiple-bonds` · variation (six molecules and ions) and intuition (one electron ledger through the five steps: the same electrons move from the count into bonds, onto terminal atoms, onto the central atom, and into multiple bonds) · still: the steps are discrete states the reader chooses, there is no clock; parts arriving in a step fade in over the choice's morph · a select of molecule (SiH<sub>4</sub>, CHO<sub>2</sub><sup>−</sup>, NO<sup>+</sup>, OF<sub>2</sub>, HCN, HCCH; the section's four and two of Example 7.4) and a choice of step (1 to 5), untyped · headline states the step's result with its numbers ("CHO₂⁻: 18 valence electrons; the carbon atom has 6 and lacks an octet") · no graph; the readout is the ledger `bonds + lone pairs + still to place = total`, true at every step · 2D (Lewis structures are flat by the book's rules). Labels: the element symbols are the structure itself; the electron count of each atom is on hover, since a count beside every atom would collide with its lone pairs; the atoms lacking an octet are named in the headline.
- Unnumbered images: all twenty-eight in the reading kept as the book's images, `figure` rows with no number and eyebrow "Figure", a one-sentence caption each in the book's voice. They are the worked lines the text argues from (each "as shown here", "as follows", "gives"); redrawing them adds nothing a copy lacks, and the Sim carries the procedure live. The two Check Your Learning answer images and every exercise image are copied as they are into the exercise rows.

No extra Sims beyond `sim-lewis-steps`: a Lewis-symbol picker would show one symbol at a time where Figure 7.9 shows the row at once.

## Exercises

Inline: `cyl1` (Example 7.4, host `ex-titan`) and `cyl2` (Example 7.5, host `ex-xenon`), both keyed with the book's answer images.

## Wanted at chapter level

- `lewis-symbol` evidence: correct as written (Figures 7.9 and 7.10 are kept images).
- `lewis-structure` evidence: add "and a Sim walks the five steps for six molecules and ions" (optional).
- Edge `lewis-symbol` → `valence-and-core-electrons` (6.4) and `lewis-symbol` → `ion-configurations` (6.4).
- Edge `lewis-structure` → `covalent-bond-formation` (7.2).
- Edge `lewis-structure` → `electronegativity` (7.2): the central atom is the least electronegative.
