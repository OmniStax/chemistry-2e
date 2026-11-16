# Plan: 13.2 Equilibrium Constants (m68798)

Written 2026-10-05 before the build and left for review, as `ch13/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Three objectives, two numbered figures (13.5, 13.6), one unnumbered table (Example 13.3), five worked examples (13.1 to 13.5) with a Check Your Learning each, no boxed note, no Link to Learning, twenty-five end-of-section items (chapter exercises 6 to 30), one of which moves to 13.1, five glossary terms.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `quotient` | The reaction quotient (Example 13.1) | introduces `reaction-quotient`, `write-reaction-quotient`; uses `reversible-reaction`, `balanced-equation`, `molarity`, `partial-pressure` |
| `constant` | The equilibrium constant (Figure 13.5, Example 13.2, the Sim) | introduces `equilibrium-constant`, `law-of-mass-action`, `magnitude-of-k`; uses `reaction-quotient`, `chemical-equilibrium` |
| `direction` | Predicting the direction of reaction (Figure 13.6, Example 13.3 with its table) | introduces `predict-direction-q-versus-k`; uses `reaction-quotient`, `equilibrium-constant` |
| `homogeneous` | Homogeneous equilibria (the book's header; Example 13.4) | introduces `homogeneous-equilibrium`, `kp-kc-relation`; uses `ideal-gas-law`, `partial-pressure`, `molarity`, `write-reaction-quotient` |
| `heterogeneous` | Heterogeneous equilibria (the book's header) | introduces `heterogeneous-equilibrium`, `homogeneous-and-heterogeneous-equilibria`; uses `write-reaction-quotient` |
| `coupled` | Coupled equilibria (the book's header; Example 13.5) | introduces `coupled-equilibrium`, `coupled-equilibria`; uses `equilibrium-constant`, `balanced-equation` |

The book prints no header before "Homogeneous Equilibria"; its long opening falls into the first three spans at the points where one idea stops and the next begins.

## Figures

- sim-quotient · Figure 13.5 · reaction-quotient, equilibrium-constant, law-of-mass-action · flow by animation and variation by choice: the book's four panels are two runs drawn apart; here one run is drawn as it happens, its three concentrations above its Q_c on one clock, the readout writing Q_c from the live concentrations, with the Q_c paths of the other starts kept faint on the same axes so every path is seen to end on the one K_c line; a third start the book does not draw (all three gases, O₂ in excess) ends at other concentrations and the same K_c, which is the law of mass action the paragraph under the figure states · arrows: none (the book's pointer to K is notation; the rest are graphs) · moving: a run of a reaction in time, the curves drawn as the clock advances, 5 s a run with a 1.2 s hold · choice start (reactants only · product only · all three gases, default reactants only, the book's panel a) · headline "Starting from reactants only, $\kQc$ climbs from 0 toward $\kKc$." and, once there, "$\kQc$ has reached $\kKc$, and the concentrations no longer change." (for the third start "This mixture settles at other concentrations, and $\kQc$ still stops at $\kKc$.") · graph alone, the concentrations above $\kQc$ on a shared time axis (the graph is the idea) · 2D, graphs (book rule) · model: 2SO₂ + O₂ ⇌ 2SO₃ from [SO₂]₀ = 1.00 M and [O₂]₀ = 0.50 M, or from [SO₃]₀ = 1.00 M, the same atoms written two ways, so both runs end at the same concentrations as the book draws them; or from 0.30 M SO₂, 0.90 M O₂ and 0.30 M SO₃ (Q_c = 1.1 at the start, 0.150, 0.825 and 0.450 M at equilibrium); K_c = 11, read off the heights the book's image draws (the book prints none; 8.0 at first, 10 from 2026-11-14 to 2026-11-16), giving [SO₃] = 0.598 M, [SO₂] = 0.402 M, [O₂] = 0.201 M at equilibrium; net rate k_f[SO₂]²[O₂] − k_r[SO₃]² integrated in steps, the time axis unnumbered as the book's · axes fixed: concentration 0 to 1.00 M, Q_c 0 to 20 (K_c a little over half way up, where the book draws it; Q_c above 20 leaves through the top edge, the product-only run's opening ∞ included) · three species curves in their referent colours (`so2`, `o2`, `so3`), named once each in an `F.legend` above the graph (labels at the curves would sit on moving ends); the run's Q_c curve in `equilibrium-constant` with a dot at its end, the other starts' Q_c curves faint in the same hue and named on hover, the K_c level dashed and labelled; a dashed "equilibrium is reached" line across both graphs once Q_c is within 1 % of K_c · readout Q_c = [SO₃]²/([SO₂]²[O₂]) with the live numbers, written "→ ∞" at the product-only start and "= K_c" once reached, without units, as the book's Example 13.2 says and writes ("disregard any concentration or pressure units"); driven by the clock, so never highlighted; no note
  works: read off the image (measured on the pixels, 2026-11-16): the concentration axis of panel (a) is at y = 362; [SO₂] starts 280 px above it and [O₂] 140 px, [SO₃] at 0; the plateaus stand 167, 112.5 and 56.5 px up, [SO₃] above [SO₂] above [O₂], that is 0.596, 0.402 and 0.202 of [SO₂]'s start, and 0.596²/(0.402² × 0.202) = 10.9; K_c = 11 gives 0.598, 0.402, 0.201 (167.4, 112.6, 56.3 px), where K_c = 10 gives 0.589, 0.411, 0.206 (2 px off on two curves); (b) [SO₃] starts 279 px up and falls, [SO₂] and [O₂] rise from 0 to the same plateaus as (a); Q rises from 0 in an S to the dashed K level in (a), falls from off the top in (b), the K level 56 % of the way up the axis (here 11 of 20); "Equilibrium is reached" dashed lines; axes "Concentration", "Reaction quotient", "Time", unnumbered; the arrow naming K is notation, here the K_c level's label · must hold: both of the book's starts end at the same three concentrations and the third at others; every Q_c path ends on the K_c line; the readout's three numbers give the Q_c it prints at every instant, and 11 at the end of each run. Rebuilt 2026-11-16: K_c 10 to 11 on a pixel reading, the third start, every start's Q_c path on the Q graph, the Q graph taller with K_c on a readable scale, caption cut to one line.
- sim-mixtures · Figure 13.6 · predict-direction-q-versus-k, equilibrium-constant · variation by slider and choice: the book shows the three mixtures before reaction and at equilibrium, with Q written over each bar; here the three stay side by side, one row each, the row's composition as a bar and beside it its Q_c on a log track the rows share, and one slider carries all three from the book's first panel to its second, so the reader sees mixtures 1 and 3 come to the K_c line from the left and mixture 2 from the right, and three different compositions end with the same Q_c · arrows: symbolic (a faint arrow in each row from Q_c to K_c, the way Q_c has to move; not animated) · still: the progress is a point on the reaction's path that the reader picks, and the book gives no times · slider progress (untyped, 0 to 100 %, default 0, the book's "before reaction"; dashed circle at 100 % labelled "equilibrium", the book's "at equilibrium"), choice mixture (1 · 2 · 3, default 1: the row the readout and headline write out, marked by a band and its name in ink) · headline "Mixture 1 starts with $\kQc$ below $\kKc$, so it reacts in the forward direction." (reverse for mixture 2), "Mixture 1 reacts in the forward direction, and its $\kQc$ rises toward $\kKc$." on the way, and "At equilibrium the three mixtures differ in composition, and each has $\kQc$ equal to $\kKc$." on the circle · bars beside a Q track · 2D, bars and a scale (book rule) · each bar stacks [CO], [H₂O], [CO₂] and [H₂] in the book's order on its 0 to 0.10 M scale, laid on its side so a row reads across from composition to Q_c, each concentration moving in a straight line from the book's starting value to its equilibrium value (the stoichiometric path); the Q track is logarithmic from 10⁻⁴ to 10⁴ with K_c = 0.640 a dashed line through all three rows and its two sides named, Q_c = 0 and ∞ past its ends across a break; in each row the starting Q_c is a hollow dot, the current one filled with its value under it, the path between them drawn · segments tinted in their referent colours (`co`, `h2o`, `co2`, `h2`) and outlined in them, each value written in ink inside its segment as the book writes it, or over the bar on a leader where the segment is too thin (the book's 0.00175 and 0.00160); the species keyed by an `F.legend` of swatches, as the book keys them; hover names every segment and dot · readout Q_c = [CO₂][H₂]/([CO][H₂O]) with the chosen mixture's live numbers, then its comparison with K_c = 0.640, without units as the book writes Q; no note
  works: read off the image: before reaction, mixture 1 [CO] 0.0243 and [H₂O] 0.0243 (Q = 0.000); mixture 2 [CO₂] 0.0468 and [H₂] 0.0468 (Q → ∞); mixture 3 [CO] 0.0330, [H₂O] 0.0190, [CO₂] 0.00175, [H₂] 0.00160 (Q = 0.00446); at equilibrium mixture 1 0.0135, 0.0135, 0.0108, 0.0108; mixture 2 0.0260, 0.0260, 0.0208, 0.0208; mixture 3 0.0231, 0.00909, 0.0115, 0.0117 (Q = K = 0.640 over each); stack order CO, H₂O, CO₂, H₂; scale 0.00 to 0.10 M by 0.02. All match the code's table (the alt text's "0.190" for mixture 3's water is the image's 0.0190). Two of the image's Q values are rounded differently from its own numbers: 0.00175 × 0.00160 / (0.0330 × 0.0190) = 0.004466, shown as 0.00447 where the image prints 0.00446, and mixture 3's equilibrium values give 0.641, shown as "0.641 ≈ K_c = 0.640" · must hold: at 0 % and at 100 % every segment carries the image's number; mixtures 1 and 3 start left of the K_c line and mixture 2 right of it; all three dots stand on the K_c line at 100 %; the readout's four numbers give the Q_c it prints. Rebuilt 2026-11-16: the first two builds drew one mixture at a time in a half-empty chart, which lost the comparison the book's figure makes; now the three rows are always there and their Q_c meet on one line.
- sim-magnitude-k · Sim · magnitude-of-k, equilibrium-constant · variation by slider: the text asks the reader to imagine the equilibrium mixture for a large and for a small K; here Example 13.2's flask, 0.10 M NO₂ at the start, comes to equilibrium at any K_c from 10⁻² to 10⁴: on the left its gas as 40 molecules, pairs of NO₂ drawn joined into N₂O₄ as K_c grows, and on the right both equilibrium concentrations against K_c, so the whole range is seen at once (almost all NO₂ at the left end, almost all N₂O₄ at the right, [N₂O₄] levelling at half the starting [NO₂]) · arrows: none · still: the magnitude of K says nothing about speed, as the text says, so there is no clock to give · slider K_c on a log track (`equilibrium-constant`, 10⁻² to 10⁴, its value shown as K_c itself, 1.6 × 10², not its logarithm; default and a dashed circle at 160, Example 13.2; detents at the whole powers); the point on the [NO₂] curve is the slider's and can be dragged · headline "At $\kKc$ = 1.6 × 10², 84% of the NO₂ has become N₂O₄." with the live numbers · particle picture beside a graph · 2D: a flat particle picture with every molecule visible (book rule, nothing gained by a turn) and a graph · the molecules: 20 sites of two NO₂, each site drawn joined as one N₂O₄ once the converted fraction passes it, so round(20 × fraction) are joined (6 NO₂ and 17 N₂O₄ at Example 13.2's K_c, which is 0.015 M and 0.0425 M at 0.0025 M a molecule); atoms in the book's palette through `F.el` (N blue, O red), the two molecules keyed by an `F.legend` and named on hover, the count under the box with its two numbers in the referent colours · the graph: [NO₂] and [N₂O₄] at equilibrium on a fixed 0 to 0.10 M axis (the starting [NO₂]) against K_c from 10⁻² to 10⁴ on a log axis, curves in their referent colours (`no2`, `n2o4`) named at their right ends with the slider's value under each name, a dashed line at the slider's K_c with a dot on each curve, a dotted level at half the starting [NO₂] · readout K_c = [N₂O₄]/[NO₂]² with the live numbers (three significant figures for the concentrations), without units as Example 13.2 writes it; no note
  works: read off the text: Example 13.2, 0.10 mol NO₂ in 1.0 L, K_c = 1.6 × 10², equilibrium [NO₂] = 0.016 M and [N₂O₄] = 0.042 M (model 0.0162 and 0.0419, and 0.0419/0.0162² = 160) · must hold: the molecules drawn are always 40 NO₂'s worth (NO₂ + 2 N₂O₄ = 40); the two concentrations satisfy [NO₂] + 2[N₂O₄] = 0.10 M and give the K_c the slider shows; the figure opens on Example 13.2's numbers. Rebuilt 2026-11-16: two bars in the middle of a blank stage showed one K_c at a time; the molecules make "most of the reactant has been converted" something seen, and the curves put the small-K and large-K ends in one view.

Photographs and unnumbered images: none in the section.

Extra simulations considered and not built: the K_P and K_c relation, the phases of a heterogeneous equilibrium and the three manipulations of coupled equilibria are an algebraic rearrangement, a classification and a bookkeeping rule; none has a motion, a variation or a depth the reader must imagine (root rule 24.3), and the book's displayed equations already set them out.

## Tables

Example 13.3's unnumbered table of initial concentrations stays in the example as `div.book-table` with no eyebrow, its printed 0.020 M followed. The Key Equations table is not printed; its relations are the forms of the chapter.

## Types bound

`equilibrium-constant` (Q, Q_c, Q_P, K, K_c, K_P, K_c′, K_c1, K_c2: symbols, readouts, the Q and K lines of the figures, the slider of the Sim), `concentration` ([A] to [D], the species curves' axis and the bars' axis, the concentrations in the readouts), `pressure` (P, P_A to P_D), `temperature` (T, and the temperatures printed beside the constants), `volume` (V) and `amount` (n) in the ideal gas equation, `time` (the time axis of Figure 13.5). R, Δn and the coefficients stay ink.

## Referents

`so2`, `o2`, `so3` (Figure 13.5, its caption and the paragraph that cites it); `co`, `h2o`, `co2`, `h2` (Figure 13.6, its caption and the paragraph that cites it); `no2`, `n2o4` (the Sim and its caption).

## Exercises

Five Check Your Learning items inline, hosts `ex-quotient-expressions` (open), `ex-evaluate-q` (number 4.3), `ex-direction` (three numbers, the directions in the solution), `ex-kp` (number 160 for part (d), the expressions in the solution), `ex-coupled` (number 0.14).

End of section, chapter numbers 6 to 30: twelve keyed, of which eleven stay (e9, e11 a choice, e13 a choice, e15, e17, e19, e21, e23, e25 multi, e27 number, e29) and one, fs-idp194491952 (7), moves to 13.1 with `source_section` "13.2"; nine unkeyed conceptual or expression-writing items kept with an AI-marked approach (e6, e8, e10, e12, e14, e16, e22, e24, e28); four unkeyed numerical items left out and named (fs-idp100224800, fs-idp163618080, fs-idp94819040, fs-idp72435440).

## Left out

The learning objectives, summary, key equations and glossary go to the tables. Errata kept as printed: the key to fs-idp110211104 labels (e) Q_P and (f) Q_c the other way round from the constants the item gives; Example 13.5's Check Your Learning labels both given constants K_c1; Example 13.3's table is followed (0.020 M) where its summary says 0.0203 M. The book's Q_p and K_p are written Q_P and K_P, through the symbols' macros.

## Wanted at chapter level

- forms `eq-reaction-quotient` → 13.2-quotient
- forms `eq-reaction-quotient-p` → 13.2-quotient
- forms `eq-k-equals-q` → 13.2-constant
- forms `eq-p-mrt` → 13.2-homogeneous
- forms `eq-kp-kc` → 13.2-homogeneous
- forms `eq-delta-n` → 13.2-homogeneous
- forms `eq-reversed-k` → 13.2-coupled
- forms `eq-scaled-k` → 13.2-coupled
- forms `eq-coupled-k` → 13.2-coupled
- variables `Q_c` → 13.2-quotient
- variables `Q_conc` → 13.2-quotient
- variables `Q_P` → 13.2-quotient
- variables `[A]` → 13.2-quotient
- variables `[B]` → 13.2-quotient
- variables `[C]` → 13.2-quotient
- variables `[D]` → 13.2-quotient
- variables `P_A` → 13.2-quotient
- variables `P_B` → 13.2-quotient
- variables `P_C` → 13.2-quotient
- variables `P_D` → 13.2-quotient
- variables `K` → 13.2-constant
- variables `K_c` → 13.2-constant
- variables `K_P` → 13.2-homogeneous
- variables `P` → 13.2-homogeneous
- variables `M` → 13.2-homogeneous
- variables `R` → 13.2-homogeneous
- variables `T` → 13.2-homogeneous
- variables `Δn_gas` → 13.2-homogeneous
- variables `K_c_prime` → 13.2-coupled
- variables `K_c1` → 13.2-coupled
- variables `K_c2` → 13.2-coupled
- variables rows 13.2 · `V` and `n` (reuse Chapter 9's meanings) for the ideal gas equation in `homogeneous`, which writes them through `\kV` and `\kn`
- ch13/COLOR.md: K and Q are `equilibrium-constant` in the tables (`\kK`, `\kKc`, `\kQc`, `\kQrxn`, …), where the chapter notes call them untyped; the page follows the tables

Applied by the chapter pass (2026-10-05): every form and variables row above anchored as listed, and `eq-p-mrt` (a form of `ideal-gas-law`, staged in Chapter 9) at 13.2-homogeneous; `V` and `n` added at 13.2-homogeneous with Chapter 9's meanings; the forms' `ktex` now write K and Q through their macros. `ch13/COLOR.md` keeps K and Q typed, as the tables and the page have them, and its wording is fixed; `config.md`'s "every K and Q in ink" is corrected.

## Derivations

- Homogeneous equilibria, the relation between KP and Kc · score 3 · built as drv-kp-kc
- Coupled equilibria, the constants of a reversed and of a scaled equation · score 1 · built as drv-coupled-equilibria, nodes 1 and 2 (thin printed blocks, folded with the sum: one list, one law of mass action)
- Coupled equilibria, the constant of a sum of equations · score 1 · built as drv-coupled-equilibria, node 3
