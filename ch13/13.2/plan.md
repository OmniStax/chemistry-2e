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

- sim-quotient · Figure 13.5 · reaction-quotient, equilibrium-constant, law-of-mass-action · flow by animation and variation by choice: the book's four panels are two runs drawn apart; here one run is drawn as it happens, its three concentrations and its Q_c on one clock over one time axis, the readout writing Q_c from the live concentrations, so the reader watches Q_c climb from 0 or fall from ∞ as the concentrations change and stop at the same K_c from either start, the other start's Q_c curve kept faint for comparison · arrows: none (the book's pointer to K is notation; the rest are graphs) · moving: a run of a reaction in time, the curves drawn as the clock advances, 5 s a run with a 1.2 s hold · choice start (reactants only · product only, default reactants only, the book's panel a) · headline "Starting from reactants only, $\kQc$ climbs from 0 toward $\kKc$." and, once there, "$\kQc$ has reached $\kKc$, and the concentrations no longer change." · graph alone, the concentrations above $\kQc$ on a shared time axis (the graph is the idea) · 2D, graphs (book rule) · model: 2SO₂ + O₂ ⇌ 2SO₃ from [SO₂]₀ = 1.00 M and [O₂]₀ = 0.50 M, or from [SO₃]₀ = 1.00 M, the same mixture written two ways, so both runs end at the same concentrations as the book draws them; K_c = 8.0, a model value since the book prints none, giving [SO₃] = 0.568 M, [SO₂] = 0.432 M, [O₂] = 0.216 M at equilibrium, near the book's proportions; net rate k_f[SO₂]²[O₂] − k_r[SO₃]² integrated in steps, the time axis unnumbered as the book's · axes fixed: concentration 0 to 1.00 M, Q_c 0 to 14 (K_c at 8.0 with headroom; Q_c above 14 leaves through the top edge, the product-only run's opening ∞ included) · three species curves in their referent colours (`so2`, `o2`, `so3`), named once each in a legend beside the graph (labels at the curves would sit on moving ends); one Q_c curve in `equilibrium-constant`, the K_c level dashed in the same hue, the current Q_c a hollow dot; a dashed "equilibrium is reached" line across both graphs once Q_c is within 1 % of K_c · readout Q_c = [SO₃]²/([SO₂]²[O₂]) with the live numbers, written "→ ∞" at the product-only start and "= K_c" once reached; driven by the clock, so never highlighted; no note
- sim-mixtures · Figure 13.6 · predict-direction-q-versus-k, equilibrium-constant · variation by choice and slider, and standardisation: the book shows the three mixtures only before reaction and at equilibrium; here the reader picks a mixture and carries it from its starting composition to equilibrium, and its Q_c travels along a Q scale to K_c, from below for mixtures 1 and 3 and from above for mixture 2, so the direction of reaction is read off the side of K_c the mixture starts on · arrows: none · still: the progress is a point on the reaction's path that the reader picks, and the book gives no times · choice mixture (1 · 2 · 3, default 1), slider progress (untyped, 0 to 100 %, default 0, the book's "before reaction"; dashed circle at 100 % labelled "equilibrium", the book's "at equilibrium") · headline "Mixture 1 starts with $\kQc$ below $\kKc$, so it reacts in the forward direction." (reverse for mixture 2), turning to "Mixture 1 has reached equilibrium, where $\kQc$ equals $\kKc$." on the circle · stacked bar beside a Q scale · 2D, bars and a scale (book rule) · the bar stacks [CO], [H₂O], [CO₂] and [H₂] as the book does, on its 0 to 0.10 M axis, each concentration moving in a straight line from the book's starting value to its equilibrium value (the stoichiometric path), the starting stack drawn dashed behind; the Q scale is logarithmic from 10⁻³ to 10³ with K_c = 0.640 marked and its two sides named, Q_c = 0 and ∞ pinned at its ends, the starting Q_c a hollow dot and the current one filled · segments in their referent colours (`co`, `h2o`, `co2`, `h2`), each named with its value beside the bar (four labels, stacked upward with leaders where a segment is too thin to hold its own) · readout Q_c = [CO₂][H₂]/([CO][H₂O]) with the live numbers, then its comparison with K_c = 0.640; no note
- sim-magnitude-k · Sim · magnitude-of-k, equilibrium-constant · variation by slider: the text asks the reader to imagine the equilibrium mixture for a large and for a small K; here Example 13.2's flask, 0.10 M NO₂ at the start, comes to equilibrium at any K_c from 10⁻² to 10⁴, and two bars show how little or how much of the NO₂ has become N₂O₄ · arrows: none · still: the magnitude of K says nothing about speed, as the text says, so there is no clock to give · log K_c (`equilibrium-constant`, −2.00 to 4.00, default 2.21, which is K_c = 1.6 × 10² of Example 13.2; detents at the whole numbers) · headline "At $\kKc$ = 1.6 × 10², 84% of the NO₂ has become N₂O₄." with the live numbers · bars alone · 2D, bars (book rule) · [NO₂] and [N₂O₄] at equilibrium on a fixed 0 to 0.12 M axis (headroom over the starting 0.10 M), the starting [NO₂] dashed behind its bar; bars in their referent colours (`no2`, `n2o4`), named under each bar · readout K_c = [N₂O₄]/[NO₂]² with the live numbers (three significant figures for the concentrations); no note

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
