# Plan: 14.3 Relative Strengths of Acids and Bases (m68805)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

Three objectives, seven numbered figures (14.6 to 14.12; 14.9 inside Example 14.9, 14.10 inside Example 14.12), five unnumbered images (two pH-paper photographs, four ICE tables, the E–O–H skeleton), eight worked examples (14.7 to 14.14) with a Check Your Learning each, one Link to Learning (dropped), forty-three end-of-section items (chapter exercises 26 to 68), four of which move out, and five glossary terms (already the terms of their concepts, `oxyacid` in 2.7).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `ionization` | Acid and base ionization constants (the book's header; Figure 14.6, Example 14.7, the Sim) | introduces `acid-base-ionization-constants`, `acid-ionization-constant`, `base-ionization-constant`, `percent-ionization`; uses `acid-ionization`, `base-ionization`, `equilibrium-constant`, `ph-calculations` |
| `conjugate` | Relative strengths of conjugate acid-base pairs (the book's header; Figure 14.7 + 14.8, Example 14.8) | introduces `conjugate-pair-strengths`, `leveling-effect`; uses `conjugate-acid-base-pairs`, `water-autoionization`, `coupled-equilibria`; reinforces `acid-ionization-constant`, `base-ionization-constant` |
| `calculations` | Acid-base equilibrium calculations (the book's header; Examples 14.9 to 14.14, Figures 14.9 and 14.10, the ICE tables) | introduces `ka-kb-from-equilibrium-data`, `weak-acid-base-equilibrium-concentrations`; uses `k-from-ice-table`, `equilibrium-from-initial-concentrations`, `small-x-approximation`, `ph-calculations`, `ph-plus-poh`; reinforces `percent-ionization` |
| `structure` | Effect of molecular structure on acid-base strength, with the book's `<h3>` Binary Acids and Bases (Figure 14.11) | introduces `binary-acid-strength`; uses `electronegativity`, `bond-strength-and-length`; reinforces `leveling-effect` |
| `ternary` | Ternary acids and bases (the book's header; the E–O–H image, Figure 14.12) | introduces `oxyacid-strength`; uses `electronegativity`, `oxidation-numbers`, `oxyacid`, `amphoteric` |

## Figures

- fig-strong · Figure 14.6 · acid-base-ionization-constants · kept as printed: a two-column list set as an image, which the text points at; a redraw would vary nothing (rule 24.3) · arrows: none · photo row with its number
- sim-acid-water · Sim (the dropped Link to Learning's simulation of strong and weak acids at the molecular level, the trigger the book's rules name) · acid-base-ionization-constants, percent-ionization, acid-ionization-constant · value add: depth and variation: the reader sees what partial ionization is, a hundred acid molecules of which only one or a few have handed a proton to water while every molecule of a strong acid has, and sees the share grow as the solution is diluted, which the text says ("typically decreasing as concentration increases") but never shows · arrows: none · still: each concentration is an equilibrium mixture and the lesson is its dependence on the acid and the concentration, not a time course (the dynamic exchange is 13.1's figure) · choice of acid (untyped, segmented: HCl, HSO₄⁻, HNO₂, CH₃CO₂H, the strong acid and the text's three weak ones in its order of K_a) and slider [HA]₀ (`concentration`, 0.010 to 1.00 M, step 0.005, default 0.100 M, the acetic acid of the Check Your Learning after Examples 14.7 and 14.12; detents 0.125 (Example 14.7) and 0.50 (Example 14.14)) · headline "In 0.100 M acetic acid, 1 of every 100 molecules has given its proton to water." with the live counts and acid name · strip below: one logarithmic concentration axis, 10⁻⁴ to 1 M (headroom over the extremes, 4.1 × 10⁻⁴ M of acetate at 0.010 M and 1 M of H₃O⁺ from 1 M HCl), with pH 4 to 0 beneath it, [HA]₀ hollow, [HA] and [A⁻] = [H₃O⁺] filled, HCl's [HA] ≈ 0 through `pinned()` · physical 3D, a particle picture (book rule): a box of solution with no ground, so yaw free and pitch within 70° of level, idle spin on (nothing else moves), views front and corner; flat fallback from `F.view3d` · each molecule built from its atoms by `F.el` (H, Cl, S, O, N, C), ions named with their charges on hover, the water not drawn (the caption says so); labels: the acid, its conjugate base and H₃O⁺ once each on a representative (three, under rule 26.7's six) · colours: [HA] marker and its label `F.ref('acid')`, [A⁻] = [H₃O⁺] marker `F.ref('base')`, axis in `concentration` · readout % ionization = [H₃O⁺]_eq / [HA]₀ × 100 with the live numbers; note "Each molecule drawn stands for one hundredth of the acid dissolved." · model: x from x²/([HA]₀ − x) = K_a solved exactly (HCl complete), water's own ionization neglected as the text does; the molecules drawn as ionized are round(100x/[HA]₀) of a fixed shuffled order, so dilution ionizes more of the same box · draws `concentration`; conventions H, Cl, S, O, N, C
- sim-conjugate-ladder · Figure 14.7 + 14.8 · conjugate-pair-strengths, leveling-effect, acid-ionization-constant, base-ionization-constant · value add: standardisation and variation by choice: the book draws the pairs twice, as two schematic K bars spaced by even powers of ten and as a ranked table with no numbers; here one ladder sets every pair of both at its K_a (Appendix H, or K_w/K_b from Appendix I for NH₄⁺; HClO₂, H₃O⁺ and H₂O at Figure 14.7's own 10⁻², 1.0 and 10⁻¹⁴) on a K_a axis and its conjugate base on a mirrored K_b axis, so each pair is one level rung, the six strong acids stack above H₃O⁺ and the five non-acids below H₂O as the bands of complete and of no ionization, and choosing a pair lights its rung and writes K_a × K_b = K_w with its numbers · arrows: symbolic (the book's two increasing-strength arrows, drawn as notation, never animated) · still: a choice of pair, no time in the idea · one dropdown of 26 pairs (`F.select`, a row would wrap), default HNO₂/NO₂⁻ of Example 14.8 · headline "Nitrous acid is a weak acid, and its conjugate base, nitrite ion, is a weak base." for the chosen pair, by band · graph alone (the ladder is the graph) · 2D (book rule: ladders flat) · labels: each species' formula is a row of the ladder's categorical axis, as the book prints them all, so they are frame rather than entity labels; rows in a crowded decade are spread with leaders to their true marks; names on hover · colours: the K axes and their ticks `equilibrium-constant`, the chosen acid `F.ref('acid')` and base `F.ref('base')`, bands, rungs and the arrows in ink, the book's red, blue, pink and beige dropped as decoration · readout $K_a \times K_b = (4.6 \times 10^{-4})(2.2 \times 10^{-11}) = 1.0 \times 10^{-14} = K_w$, the measured constant from the appendix and the other from K_w; for a strong pair or a non-acid the text's K_a ≈ ∞, K_b = K_w/K_a ≈ 0 and its mirror · draws `equilibrium-constant`
- fig-ph-paper-acids · unnumbered image (acetate_img) · acid-base-ionization-constants · kept: a bare image in the text (book rule), a photograph of two solutions with pH paper in them, whose colours are physical fact · figure row, no number
- fig-ph-paper-bases · unnumbered image (ammonia) · the same reason · figure row, no number
- fig-vinegar · Figure 14.9 · ka-kb-from-equilibrium-data · kept photograph, the example points at it · photo
- fig-ant · Figure 14.10 · weak-acid-base-equilibrium-concentrations · kept photograph, the example points at it · photo
- The four ICE tables (Examples 14.11 to 14.14) are written as `div.book-table` HTML tables, as Chapter 13 writes its own, with no number; the empty Change cell of Example 14.12's acid column is kept as printed.
- fig-acidph · Figure 14.11 · binary-acid-strength · kept as printed: a periodic-table grid with four constants and two trend arrows, a picture of a trend with nothing to vary; exercises 40 to 43 lean on it · photo row with its number
- fig-e-o-h · unnumbered image (OHbonds_img) · oxyacid-strength · kept as printed: the E–O–H skeleton with bonds a and b, a Lewis-style drawing (2D by the book's rule) the next paragraphs name · figure row, no number
- fig-oxyacid · Figure 14.12 · oxyacid-strength · kept as printed: four Lewis structures in two pairs, 2D by the book's rule, the text points at it and a live version would only restate it · photo row with its number

Extra simulations: none. The ladder carries the chapter's log axis for K, and the box carries the molecular picture; a third figure for the ICE examples would repeat the box's numbers.

## Tables

None numbered. The Key Equations table is not printed; the four ICE tables are HTML.

## Types bound

`concentration` ([H₃O⁺], [OH⁻], [HA], [A⁻], [B], [HB⁺], [HA]₀, [H₃O⁺]_eq, pH, pOH, the slider and the log axis; particular values in the examples as `data-type`), `equilibrium-constant` (K_a, K_b, K_w and the two K axes, as `COLOR.md` and the concepts' `type` set it; the chapter notes' "never a \k macro on any K" is overruled by `COLOR.md` and the symbol rows `\kKa`, `\kKbion`, `\kKw`). Percent ionization, x and the coefficients stay ink.

## Referents

`acid` (the acid HA) and `base` (its conjugate base A⁻): the Sim's [HA] and [A⁻] markers and labels, and the ladder's chosen pair; marked in both captions.

## Exercises

Eight Check Your Learning items inline after Examples 14.7 to 14.14 (hosts `ex-percent`, `ex-conjugate`, `ex-ka-data`, `ex-kb-data`, `ex-ka-ph`, `ex-weak-acid`, `ex-weak-base`, `ex-quadratic`), each `source_id` its example's id. Thirty-one end-of-section items stay: seventeen keyed, ten unkeyed conceptual with an AI-marked approach (fs-idm97090576, fs-idm81289984, fs-idm98073520, fs-idp121913696, fs-idp82803792, fs-idm157978560, fs-idp33478144, fs-idm79428208, fs-idm81298048, fs-idp58815696), and fs-idp75773712 kept open with its three options and an approach. Eight unkeyed numerical items left out: fs-idm38113296, fs-idm65088304, fs-idp58811168, fs-idm5851168, fs-idm78141920, fs-idm68637072, fs-idp85725440, fs-idm82940432. Moved out with a note: fs-idm94404336, fs-idm94046624, fs-idm8587472 to 14.4; fs-idm75310368 to 14.5. Keys carried as printed: fs-idp38295632's "triethylamine" for trimethylamine, fs-idm79424752's "[H⁺] 0", fs-idp3008704's "[HClO⁻]".

## Left out

The Link to Learning (a simulation of strong and weak acids and bases); its idea is the Sim. Errata kept as printed: "wheres", the Check Your Learning of Example 14.11 ending "NH₃." as a question, Example 14.12's empty Change cell, "much lesser than".

## Wanted at chapter level

- forms `eq-ka` → 14.3-ionization
- forms `eq-kb` → 14.3-ionization
- forms `eq-percent-ionization` → 14.3-ionization
- forms `eq-ka-kb-kw` → 14.3-conjugate
- variables `14.3/K_a` → 14.3-ionization
- variables `14.3/K_b_ion` → 14.3-ionization
- variables `14.3/[HA]` → 14.3-ionization
- variables `14.3/[A-]` → 14.3-ionization
- variables `14.3/[B]` → 14.3-ionization
- variables `14.3/[HB+]` → 14.3-ionization
- variables `14.3/[HA]_0` → 14.3-ionization
- variables `14.3/[H3O+]_eq` → 14.3-ionization
- variables `14.3/x_ice` → 14.3-calculations
- variables `14.3/K_a` ref `acid`, `14.3/K_b_ion` ref `base` (`COLOR.md`: the a and b in the pair's colours)
- concept `acid-ionization-constant`: its `symbol` is `K_a2`; it should be `K_a`
- 14.4 and 14.5 `exercise_notes` to say fs-idm94404336, fs-idm94046624, fs-idm8587472 and fs-idm75310368 are printed in 14.3
