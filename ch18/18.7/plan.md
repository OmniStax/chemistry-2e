# Plan: 18.7 Occurrence, Preparation, and Properties of Nitrogen (m68835)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, seven numbered figures (18.32 to 18.38: the nitrogen cycle inside the note, five molecular and resonance structures, one photograph), nine chemical equations of the book's own (kept in the text), one Everyday Life note (Nitrogen Fixation), no Link to Learning, no table, eight end-of-section items (chapter exercises 59 to 66). No worked example, so no Check Your Learning and no inline host. Key Concepts and Summary to `summary_html`; objective and glossary (one term) to the tables.

## Sub-concepts and spans

The book prints no header in the section; the four blocks take headers of the section's own.

| Span | Header | Concepts |
|---|---|---|
| `occurrence` | Occurrence and properties of nitrogen (Nitrogen Fixation note, Figure 18.32) | introduces `nitrogen-inertness`, `nitrogen-fixation`; uses `distillation`, `triple-bond`, `boiling-point`, `melting-point`, `alkali-metal`, `alkaline-earth-metal`, `oxidation-number`, `redox-reaction` |
| `oxides` | The nitrogen oxides (Figures 18.33 to 18.35) | introduces `nitrogen-oxides`; uses `oxidation-number`, `redox-reaction`, `resonance-forms`, `lewis-structure-diagram`, `free-radical`, `chemical-equilibrium` |
| `dioxide` | Nitrogen dioxide and dinitrogen tetraoxide (Figures 18.36, 18.37, sim-no2-dimer) | introduces `no2-n2o4-equilibrium`; uses `free-radical`, `paramagnetism`, `chemical-equilibrium`, `equilibrium-constant`, `partial-pressure`, `le-chateliers-principle`, `volume-stress`, `temperature-changes-k`, `resonance-forms` |
| `reactions` | Reactions of the nitrogen oxides (Figure 18.38) | introduces `nitrogen-oxides-with-water`; uses `acid-anhydride`, `oxyacid`, `disproportionation-reaction`, `oxidizing-agent`, `reducing-agent`, `combustion-reaction`; reinforces `nitrogen-oxides` |

## Figures

- fig-nitrogen-cycle · Figure 18.32 · nitrogen-fixation · kept: a cycle of photographs, micrographs and space-filling models the note points at; its arrows are symbolic (each turns one compound into the next, the arrows of a reaction scheme, and nothing in it is drawn moving), and redrawing photographs and micrographs adds nothing · arrows: symbolic · still · photo row
- fig-n2o · Figure 18.33 · nitrogen-oxides · faithful copy, the book's image kept: a molecule beside its resonance forms, flat by the book's rule for a structure the text names, and the text teaches no arrangement in space for it, so a view choice would be a molecule viewer for a molecule merely named (root 24.9) · arrows: symbolic (the resonance arrow) · still · photo row
- fig-no-dimer · Figure 18.34 · nitrogen-oxides · faithful copy, image kept: two Lewis structures and the equilibrium arrow, flat by the book's rule · arrows: symbolic · still · photo row
- fig-n2o3 · Figure 18.35 · nitrogen-oxides · faithful copy, image kept, as Figure 18.33 · arrows: symbolic · still · photo row
- fig-copper-nitric · Figure 18.36 · nitrogen-oxides · kept photograph, the text points at it; the brown of NO₂ and the green of the copper solution are the facts it shows · arrows: symbolic (the process arrows between frames) · photo row
- fig-no2-n2o4 · Figure 18.37 · no2-n2o4-equilibrium · faithful copy, image kept: the two molecules and the resonance forms of NO₂, whose unpaired electron the text names as the cause of the dimerization; the Sim beside it draws the same two molecules in a gas · arrows: symbolic · still · photo row
- fig-n2o5 · Figure 18.38 · nitrogen-oxides-with-water · faithful copy, image kept, as Figure 18.33 · arrows: none · still · photo row
- sim-no2-dimer · Sim (no book figure draws the equilibrium; Figure 18.37 stays beside it) · no2-n2o4-equilibrium, temperature-changes-k, volume-stress · variation by slider and 3D: the text states three regimes in words (deep brown at high temperature or low pressure, nearly colorless at low temperature, an equilibrium with K_P = 6.86 at room temperature); here a sealed vessel of the gas is heated or cooled and compressed or expanded, and the reader sees pairs of NO₂ join into N₂O₄ or N₂O₄ split into NO₂, the brown of the gas deepen or fade with [NO₂], and the partial pressures settle where P_N₂O₄/P_NO₂² equals K_P at that temperature · arrows: none (no book figure; the molecules are not drawn moving) · still: an equilibrium state has no time in it; a change of a slider morphs the molecules, the pairs that join gliding together one after another (LaggedStart) over 0.9 s, and no cycle is registered · sliders T (`temperature`, 273 to 373 K, default 298 K, a dashed circle at 298 K labelled room temperature, where K_P = 6.86) and V (`volume`, 0.50 to 2.00 L, default 1.00 L, the vessel's piston) · topline over the strip: "At 298 K, 32% of the molecules are brown NO₂ and 68% colorless N₂O₄." with the live numbers · strip below the scene (book rule: a particle picture's readings on a flat strip beneath): two bars of partial pressure, N₂O₄ and NO₂, on a fixed axis of 0 to 4 atm (the largest, P_NO₂ = 3.0 atm at 373 K and 0.50 L, inside it), each value at its bar's end · physical 3D, a particle picture (book rule): a glass vessel closed by a piston whose height follows V, pitch held between 2° and 70° so its floor is never seen from beneath, yaw free, no idle spin (button off, a still gas has nothing to show turning), views front and above; flat fallback from `F.view3d` · NO₂ and N₂O₄ space-filling as the book draws them, by `F.el` (N, O); the vessel tinted by NO₂'s brown through `F.fact` (#8b4a1c, the same named constant as Figure 13.2) in proportion to 1 − e^(−[NO₂]/0.03 M), clear at 0 °C and deepest at 100 °C and 0.50 L; the reaction 2NO₂ ⇌ N₂O₄ once above the vessel; no entity labels (up to 30 molecules), every molecule, the vessel and the piston named on hover; the bars in the referent colours of `no2` and `n2o4` (one bar per referent, as `ch18/COLOR.md` asks), their names beside them · readout K_P = P_N₂O₄/P_NO₂² with the live partial pressures to four figures and K_P to three, true as written; no note (the strip and the headline carry the rest) · model: the vessel holds 0.03442 mol of N₂O₄ units, so that at 298 K and 1.00 L the total pressure is 1.000 atm; K_P(T) from the book's K_P = 6.86 at 298 K and its ΔH = 57.20 kJ for N₂O₄ ⟶ 2NO₂ (Section 13.3) by the van 't Hoff relation, 56.7 at 273 K and 0.067 at 373 K; sixteen pair slots, the number joined the nearest whole number to 16 × (the share of nitrogen in N₂O₄) · draws `equilibrium-constant`, `pressure`, `temperature`, `volume`; conventions N, O; facts #8b4a1c

Extra simulations (not built, root rule 15): the five nitrogen oxides on one choice in the order of the oxidation state of nitrogen (1+ to 5+), each molecule turning in 3D beside its Lewis structures; it would order the oxides by oxidation state, which the text states in one sentence, but the section teaches no shape of any of them, and the five book figures already draw each.

## Referents

- `n2o4` · dinitrogen tetraoxide, N₂O₄ · sim-no2-dimer (the caption marks it)
- `no2` · nitrogen dioxide, NO₂ · sim-no2-dimer (the caption marks it)

## Types bound

`temperature` (77 K, 63 K, −21 °C; the slider; "temperatures" where the text names them), `mass` (more than 20 million tons of nitrogen), `pressure` ("low pressures"; the bars and the readout), `equilibrium-constant` (K_P = 6.86 in the equation, the readout), `volume` (the slider). The 78% by volume is a percent and stays ink; oxidation states, charges and the one-third and one-fifth oxygen fractions stay ink.

## Variables

Rows added for 18.7 with `ost add` (after `ost meanings`), anchored at `18.7-dioxide`: P (partial-pressure, atm), T (temperature, K), V (volume, L). K_P already has its row.

## Exercises

Eight end-of-section items, chapter exercises 59 to 66. Four keyed kept with the book's answers: fs-idp29787040 (Lewis structures, the key's five images), fs-idp14942656, fs-idp9296992 (the key's three images with the angles and hybridizations as printed), fs-idm46455776. Four left out and named: fs-idm31681344 (hybridization), fs-idp2884576 (oxidation states), fs-idp114788336 and fs-idp88710064 (numerical). No suggested approach, no open choice item, no moves. The key's alt text for NO₂⁺ names a negative sign; kept as printed.

## Left out

Nothing dropped. Errata kept as printed: "tetraphosphorus decoxide"; "the only known kind of biological organisms"; Figure 18.38's caption with its full stop inside the subscript; exercise 59's "NH<sup>2−</sup>".

## Wanted at chapter level

- variables row `18.7/K_P` → `18.7-dioxide` (it has no anchor)
- glossary term "passivation" → concept `passivation` (17.6) and "amorphous" → `amorphous-solid` (10.5), as the chapter notes ask (not this section's)
- 18.6 numbers its exercises 1 to 3 (`e1`…, `source_number` "1"…); chapter-wide they are 56 to 58, as 18.1 counts 1 to 14 and this section 59 to 66

Applied by the chapter pass (2026-10-05):

- Anchor: 18.7/K_P → 18.7-dioxide; P, T and V were already anchored there.
- Glossary terms "passivation" and "amorphous" added on their owners' concepts (see 18.1 and 18.3); 18.6 renumbered 56 and 57 (see 18.6).
- `exploration.md` records that K_P away from 298 K comes from 13.3's ΔH.
