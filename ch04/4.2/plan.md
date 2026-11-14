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

- `sim-precipitation` · Sim · predict-precipitation, precipitation-reaction · variation by choice (the reader mixes any two of twelve soluble salts, sees every ion of both solutions in the mixture, and sees which new pairing Table 4.1 makes insoluble: those ions leave the solution as a solid in the ratio of its formula while the spectator ions stay dissolved, which the text asks the reader to work out one case at a time and Figure 4.4 shows only as a yellow cloud) · arrows: two, each solution poured into the mixture, symbolic and still · still: the ions of the precipitate settle in the choice's own morph after each choice, nothing has a clock · two dropdowns (`F.select`, twelve salts each, among them the text's pairs and all three of Example 4.3), no sliders, untyped · no headline: the name under the mixture ("PbI₂(s) precipitates" or "no precipitate") and the panel of new pairings say it · no graph: the two solutions stacked at the left and poured into a large beaker in the middle, which is what the reader sees first; at the right the two new pairings, each with its verdict and the guideline of Table 4.1 that decides it, and under them a key of the ions · 2D (a particle picture with every ion visible, book rule; nothing gains from a turn). Each solution holds ions worth six charges of each sign (six of a 1+ or 1− ion, three of a 2+ or 2− ion), so any new pairing uses its two ions up exactly. Ions in the element palette (`F.el`), polyatomic ions as small clusters, the charge written beside each ion; hover names every ion. The solid lies under its packed ions in its own colour, the physical fact, named constants `PPT_COLOR` (PbI₂ bright yellow, AgI and Ag₂CO₃ pale yellow) and `WHITE_SOLID` for every other, through `F.fact`; the two beakers and the solutions' names wear the referents first-solution and second-solution. Readout: the net ionic equation and the spectator ions, or "no reaction" when every pairing is soluble. Default KI and Pb(NO₃)₂, the book's own example and Figure 4.4. Rebuilt on 2026-11-14: the first build drew three empty beakers with dots, small in the stage, so the reader never saw the ions the text reasons about.
  works: parts: two beakers of solution, each holding the dissociated ions of one salt in the ratio of its formula; a larger beaker holding the mixture of both; an arrow from each solution to the mixture · flow: on a new choice the ions of an insoluble pairing move from their places in the mixture to the bottom of the beaker and pack there; nothing else moves · must hold: (1) each solution shows only its own two ions, in the ratio of the salt's formula and with equal positive and negative charge; (2) the mixture holds exactly the ions of the two solutions, count for count; (3) the ions of an insoluble pairing, and only those, lie packed on the bottom, all of them, in the ratio of the solid's formula; (4) spectator ions stay spread through the liquid; (5) the solid wears its real colour (PbI₂ bright yellow, as Figure 4.4 shows); (6) the verdicts agree with Table 4.1 for all 144 choices, and two solutions that share an ion or are the same give no reaction; (7) the readout's equation balances · read off the image: no image is redrawn (Figure 4.4, the photograph of yellow PbI₂ in a test tube, is kept beside it); Table 4.1's rows as the text prints them (group 1 and NH₄⁺ soluble without exception; Cl⁻, Br⁻, I⁻ soluble except with Ag⁺, Hg₂²⁺, Pb²⁺; C₂H₃O₂⁻ and NO₃⁻ soluble without exception; SO₄²⁻ soluble except with Ag⁺, Ba²⁺, Ca²⁺, Hg₂²⁺, Pb²⁺, Sr²⁺; CO₃²⁻ insoluble except with group 1 and NH₄⁺); the text's net ionic equation Pb²⁺(aq) + 2I⁻(aq) ⟶ PbI₂(s).
- `fig-lead-iodide` · Figure 4.4 · photo, kept: the text points at it and it shows the yellow precipitate itself.
- `sim-hcl` · Figure 4.5 · acids-and-bases, strong-and-weak-acids-bases · flow by animation (the book's arrow carries HCl molecules down into the water, a kinematic arrow by rule 24.1, and its two panels are two moments of one process) and variation by choice (the Link to Learning on strong and weak acids and bases is the trigger; the choice sets ammonia, the weak base the text names and a gas that dissolves the same way, beside hydrogen chloride, the strong acid, so the reader sees both the extent of the reaction and the direction the hydrogen ion goes) · arrows: the book's arrow from the gas into the water is kinematic and becomes the motion; none is drawn · moving: ten molecules leave the gas above the water one after another and each comes to rest beside a water molecule; every HCl passes its hydrogen ion to that water molecule; of ten NH₃ one takes a hydrogen ion from its water molecule and later gives it back as another takes one, the double arrow of the book's equation; then the flask holds; a clock, so a cycle and the transport · one choice, `HCl` / `NH₃`, untyped · headline "10 of 10 HCl molecules have given a hydrogen ion to water." · no graph; beside the flask a key of the five species that also counts each · 2D: the book draws a flat flask, the lesson is which particle gives a hydrogen ion to which and how many do, a count with every particle visible, and a turning flask would hide it (rule 28.5); the book rule's 2D/3D view choice for an inset is not built for the same reason. Everything in the flask is a molecule or an ion in the element palette (`F.el`), its charge a sign beside it; hover names every particle, and the gas and the water are labelled once at the left as the book labels them. The flask is plain glass in ink with its stopper; the referent `flask` is dropped with the caption that named it. Ammonia's true extent (about 1 in 100) is drawn as one in ten, and the readout says so (rule 28.4). Readout: the book's equation for the chosen gas, arrow or double arrow. Rebuilt on 2026-11-14: the first build drew a small triangular flask with the gas piled inside the stopper's neck and the molecules overlapping in the water, beside a blank band.
  works: parts: an Erlenmeyer flask standing on its base, a stopper wedged in its neck, water filling its lower part, a space of gas between the water's surface and the stopper · flow: gas molecules move down from the gas space through the surface into the water (the book's arrow); in the water a hydrogen ion passes from HCl to a water molecule, giving Cl⁻ and H₃O⁺, or from a water molecule to NH₃, giving NH₄⁺ and OH⁻ · must hold: (1) the stopper closes the neck and no molecule is drawn inside or above it; (2) before it dissolves every gas molecule is above the water's surface and inside the glass, and afterwards below the surface and inside the glass; (3) no two particles overlap at rest; (4) each transfer is one hydrogen atom moving between one solute molecule and one water molecule, and the counts beside the flask change with it; (5) atoms are conserved: for HCl, gas + dissolved + Cl⁻ is ten and H₂O + H₃O⁺ is the water the flask began with; (6) at the end every HCl has reacted (ten H₃O⁺, ten Cl⁻, no HCl), and one NH₃ in ten has (one NH₄⁺, one OH⁻, nine NH₃); (7) H₃O⁺ has three hydrogens, NH₄⁺ four, OH⁻ one · read off the image: two stoppered Erlenmeyer flasks; in (a) four HCl molecules (green Cl, white H) in the gas above the water with an arrow pointing down into it, labels "HCl(g)" and "H₂O(l)" at the left, and under it HCl(g) ⟶ HCl(aq); in (b) Cl⁻ ions each ringed by water, labels "Cl⁻(aq)", "H₂O(l)", "H₃O⁺(aq)" at the right, and under it HCl(aq) + H₂O(l) ⟶ H₃O⁺(aq) + Cl⁻(aq); about twenty water molecules (red O, white H). The alt text agrees with the image.
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

Nothing (chapter `COLOR.md`): both figures draw in the element palette, physical colours, referents and ink.

## Notes

The two Link to Learning notes (the microscopic view of strong and weak acids and bases, whose place Figure 4.5's choice of gas takes; the hybrid rocket video) are left out. Erratum carried as printed: Example 4.7 step 5 writes "(2 × 3+) = 6 +".

## Wanted at chapter level

- anchor: none (the chapter's three equations belong to 4.4 and 4.5).
- edge: oxidation-numbers → ions-and-atomic-charge (the ion charge concept of Chapter 2, if that is its merged id).

Applied by the chapter pass: oxidation-numbers → ions-and-atomic-charge (2.3).

## Derivations

- Example 4.7, the dichromate–iron(II) equation by half-reactions · score 0 · not built: a worked example applying the section's own steps to one reaction.
