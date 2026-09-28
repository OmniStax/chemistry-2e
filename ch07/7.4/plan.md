# Plan: 7.4 Formal Charges and Resonance (m68740)

Source: `source.md`, converted with `python3 tools/convert.py 7.4`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left for review.

Three learning objectives, no numbered figure, thirteen unnumbered images in the reading (two of them inside Check Your Learning prompts or answers), three worked examples (7.6, 7.7, 7.8) each with a keyed Check Your Learning, no boxed note, no table, one Link to Learning (the resonance and formal-charge quiz, dropped and named in `notes`), one key equation (`eq-formal-charge`), twenty end-of-chapter exercises (ten keyed), a glossary of five terms already in `chapter.json`. The page binds no type (chapter `COLOR.md`): Lewis structures, formal charges and the partial charges of a hybrid are ink.

## Sub-concepts (page headers)

1. `calculating-formal-charge` **Calculating formal charge** (the opening paragraph and the book's header; the formula; Example 7.6 `ex-icl4` and Example 7.7 `ex-brcl3`, each with its Check Your Learning). Introduces `formal-charge`; uses `lewis-structure`.
2. `formal-charge-structure` **Using formal charge to predict molecular structure** (the book's header; the four guidelines, CO<sub>2</sub>, the thiocyanate ion, `sim-formal-charge`, Example 7.8 `ex-n2o` with its Check Your Learning). Introduces `formal-charge-guidelines`; uses `formal-charge`, `electronegativity`, `multiple-bonds`.
3. `resonance` **Resonance** (the book's header; the nitrite ion, Wheland's rhinoceros, the carbonate ion, `sim-resonance-hybrid`). Introduces `resonance`; uses `lewis-structure`, `multiple-bonds`, `formal-charge`.

Key Concepts and Summary to `summary_html`; objectives, key equation and glossary to the tables.

## Figures

- `sim-formal-charge` · Sim · `formal-charge`, `formal-charge-guidelines` · variation (the eight candidate structures the section compares: three for CO<sub>2</sub>, three for the thiocyanate ion, two for N<sub>2</sub>O) and intuition (the bookkeeping of the formula done on the structure itself: the chosen atom's lone pair electrons and its half of each bond are marked, and every atom carries its formal charge beneath it as the book writes them) · still: the structures are discrete states the reader chooses, nothing has a clock; parts that change fade over the choice's morph, and structures are never animated one into another · a select of structure (8 options) and a choice of atom (left, central, right), both untyped · headline states the sum of the formal charges and the guideline that ranks the structure ("The formal charges are 0, 0 and 0, and a structure with only zero formal charges is preferred (Guideline 1).") · no graph; the readout is `formal charge = valence − lone pair electrons − ½ bonding electrons` with the chosen atom's numbers, true in every state · 2D (Lewis structures are flat by the book's rules). Labels: the symbols, lone pairs and the formal charge under each atom are the structure itself (three atoms, never more than six labels); the element names are on hover.
- `sim-resonance-hybrid` · Sim · `resonance` · intuition: the book draws the resonance forms but never the hybrid; here the forms stand in a row and the hybrid is drawn beneath them with every equivalent bond the same, one full bond and one dashed partial bond, and the averaged formal charge on each oxygen atom · still: the text insists that the hybrid never fluctuates between forms, so nothing moves and no form ever turns into another; a change of ion fades the old drawing out and the new one in · a choice of ion (NO<sub>2</sub><sup>−</sup>, CO<sub>3</sub><sup>2−</sup>), untyped · headline states the number of forms and what each bond averages to ("Two resonance forms: each N–O bond is the average of a single and a double bond.") · no graph; the readout is the average number of bonds between the central atom and each oxygen, `(1 + 2) / 2 = 1.5` and `(1 + 1 + 2) / 3 = 1.33`, with the averaged formal charge on the oxygen atoms as its note · 2D. Labels: symbols and the partial charges on the hybrid's oxygen atoms (at most three), element names on hover.
- Unnumbered images: all eleven in the reading kept as the book's images, `figure` rows with no number and eyebrow "Figure", one-sentence caption each in the book's voice (ICl<sub>4</sub><sup>−</sup>, BrCl<sub>3</sub>, the three CO<sub>2</sub> structures, the thiocyanate table, the two N<sub>2</sub>O structures, their formal charges, the chosen NNO, the two nitrite forms, the nitrite forms with their arrow, the carbonate forms). They are the worked lines the text argues from ("shown here", "yields the following"); the Sims add the bookkeeping and the hybrid without replacing them. The CO image and the nitrite pair of the Check Your Learning prompts, the NCl<sub>3</sub> answer image and every exercise image are copied as they are into the exercise rows.

No extra Sims: a formal-charge calculator for any structure would repeat `sim-formal-charge` without the section's comparison.

## Exercises

Inline: `cyl1` (Example 7.6, host `ex-icl4`), `cyl2` (Example 7.7, host `ex-brcl3`), `cyl3` (Example 7.8, host `ex-n2o`), all keyed. End: twenty, ten keyed; the ten unkeyed are conceptual (write resonance forms or Lewis structures, assign formal charges, choose an arrangement) and carry a suggested approach marked as OmniStax's own. None left out.

## Wanted at chapter level

- `eq-formal-charge` anchor → 7.4-calculating-formal-charge
- `formal-charge` evidence: add "and a Sim marks the lone pair and bonding electrons of each atom in the eight candidate structures the section compares" (optional).
- `resonance` evidence: add "and a Sim draws the resonance hybrids of the nitrite and carbonate ions beneath their forms" (optional).
- Edge `resonance` → `multiple-bonds` (7.3); the edges `formal-charge` → `lewis-structure`, `formal-charge-guidelines` → `formal-charge` and → `electronegativity`, and `resonance` → `lewis-structure` are already in `book.json`.
