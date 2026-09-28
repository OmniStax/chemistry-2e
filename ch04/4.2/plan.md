# Plan: 4.2 Classifying Chemical Reactions

Written 2026-09-28 before the build, left for review as `ch04/config.md` records (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `classes` | Three common types of reactions | none (the opening names the three classes, which the spans below introduce) |
| `precipitation` | Precipitation Reactions and Solubility Rules | precipitation-reaction (introduces); ionic-equations (uses) |
| `predict-precipitation` | Predicting a precipitation reaction, Example 4.3 | predict-precipitation (introduces); precipitation-reaction, write-net-ionic-equation (uses) |
| `acid-base` | Acid-Base Reactions | acids-and-bases (introduces) |
| `strong-weak` | Strong and weak acids and bases | strong-and-weak-acids-bases (introduces); acids-and-bases (uses) |
| `neutralization` | Neutralization reactions, Example 4.4 | neutralization-reaction (introduces); acids-and-bases, balanced-equation (uses) |
| `acids-everyday` | Acids and bases in everyday life (two notes) | neutralization-reaction, acids-and-bases (reinforce) |
| `redox` | Oxidation-Reduction Reactions | redox-reaction (introduces) |
| `oxidation-numbers` | Oxidation numbers, Example 4.5 | oxidation-numbers (introduces) |
| `redox-definition` | Redox reactions defined by oxidation number | redox-reaction (reinforces); oxidation-numbers (uses) |
| `redox-kinds` | Combustion and single-displacement reactions, Example 4.6 | classify-reaction (introduces); redox-reaction, oxidation-numbers (uses) |
| `half-reaction` | Balancing Redox Reactions via the Half-Reaction Method, Example 4.7 | half-reaction-method (introduces); redox-reaction, balanced-equation (uses) |

Examples 4.3 to 4.7 are `div.example` with ids `ex-precipitation`, `ex-acid-base`, `ex-oxidation-numbers`, `ex-redox`, `ex-half-reaction`, each ending in its Check Your Learning host.

## Figures

- `sim-precipitation` · Sim · predict-precipitation, precipitation-reaction · variation by choice (the reader mixes any two of twelve soluble salts and sees which new pairing Table 4.1 makes insoluble, which the text asks the reader to work out one case at a time) · still, the precipitate settles in a short morph after each choice and nothing has a clock · two dropdowns (`F.select`, twelve salts each), no sliders, untyped · headline "Mixing KI and Pb(NO₃)₂ gives a precipitate of PbI₂." · no graph, a bench of two beakers poured into a third with a panel of the two new pairings and the guideline that decides each · 2D (a symbolic bench, book rule). Colours: the precipitate's colour is the physical fact, named constants `PPT_COLOR` (PbI₂ bright yellow, AgI and Ag₂CO₃ pale yellow, every other white); solutions colourless; the rest ink. Readout: the net ionic equation, or "no reaction" when every pairing is soluble. Default KI and Pb(NO₃)₂, the book's own example.
- `fig-lead-iodide` · Figure 4.4 · photo, kept: the text points at it and it shows the yellow precipitate itself.
- `sim-hcl` · Figure 4.5 · acids-and-bases, strong-and-weak-acids-bases · flow by animation (the book's arrow carries HCl molecules down into the water, a kinematic arrow by rule 24.1, and its two panels are two moments of one process) and variation by choice (the Link to Learning on strong and weak acids and bases is the trigger for a Sim; the choice adds ammonia, the weak base the text names, beside hydrogen chloride, the strong acid) · moving: twelve molecules drift from the gas above the water into it one after another, and each hydrogen ion passes to or from a water molecule, then the flask holds; a clock, so a cycle and the transport · one choice, `HCl` / `NH₃`, untyped · headline "7 of 12 HCl molecules have dissolved, and every one has given its hydrogen ion to a water molecule." · no graph; a legend on the right counts each species · 2D: the book draws a flat flask with its molecules as an inset, the lesson is which molecule gives a hydrogen ion to which, and a count, not an arrangement in space; the book rule's second (3D) view for an inset is not built here, since a turning flask would hide the transfer the figure exists to show. Everything in the flask is a molecule or an ion in the element palette (`F.el`), its charge by a sign beside it; hover names every particle. Ammonia's true extent (about 1 in 100) is exaggerated to one in twelve, and the readout says so (rule 28.4). Readout: the book's equation for the chosen gas, arrow or double arrow.
- `fig-citrus` · Figure 4.6 · photo, kept: the text points at it, and the structures printed on it mark the acidic hydrogens.
- `fig-ammonia` · Figure 4.7 · photo, kept: the text points at it.
- `fig-fish-lemon` · Figure 4.8 · photo, kept inside the Culinary note: the text points at it and it carries the acetic acid and putrescine equation.
- `fig-copper-silver` · Figure 4.9 · photo, kept: the text points at it and it shows the silver and the blue of Cu²⁺ as they appear.

Extra simulations considered and not built: a half-reaction story through the seven steps of Example 4.7 (it would replay the worked example line by line and add no view the text lacks); an oxidation-number calculator (a choice among formulas whose output is the arithmetic already printed).

## Tables

Table 4.1 (Solubilities of Common Ionic Compounds in Water, spanned headers written by hand) and Table 4.2 (Common Strong Acids) as `div.book-table`; the unnumbered atom and charge table of Example 4.7 kept as a `div.book-table` without an eyebrow.

## Exercises

Five Check Your Learning items, inline, each after its example. Fifteen keyed End of Chapter exercises (the odd ones, chapter exercises 13 to 41) in the Exercises document: one as a choice (fs-idm49658992), one multi (none; the oxidation-number CYL is the multi), the rest open with the book's key. The fifteen unkeyed exercises are classifications, oxidation states or equations to balance, answers to compute, so all are left out and named in `exercise_notes`. The stray `**` after "Sn(s)" in Example 4.6's key is dropped.

## Binds

Nothing (chapter `COLOR.md`): both figures draw in the element palette, physical colours and ink.

## Notes

The two Link to Learning notes (the microscopic view of strong and weak acids and bases, whose place Figure 4.5's choice of gas takes; the hybrid rocket video) are left out. Erratum carried as printed: Example 4.7 step 5 writes "(2 × 3+) = 6 +".

## Wanted at chapter level

- anchor: none (the chapter's three equations belong to 4.4 and 4.5).
- edge: oxidation-numbers → ions-and-atomic-charge (the ion charge concept of Chapter 2, if that is its merged id).

Applied by the chapter pass: oxidation-numbers → ions-and-atomic-charge (2.3).
