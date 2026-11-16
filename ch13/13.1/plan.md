# Plan: 13.1 Chemical Equilibria (m68797)

Written 2026-10-05 before the build and left for review, as `ch13/config.md` records (applied as proposed, without check-ins).

Two objectives, three numbered figures (13.2 in three panels, 13.3 and 13.4 photographs), no example, no table, no boxed note, five end-of-section items and two moved in, two glossary terms (already the terms of their concepts).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `reversible` | Reversible reactions and equilibrium | introduces `reversible-reaction`, `chemical-equilibrium`; uses `reaction-rate`, `concentration` |
| `dynamic` | The approach to equilibrium (Figure 13.2, the rate laws, Figure 13.3) | introduces `equilibrium-is-dynamic`; uses `elementary-rate-laws`, `rate-constant`, `concentration`; reinforces `chemical-equilibrium` |
| `phase` | Phase equilibria (Figure 13.4) | uses `vapor-pressure-dynamic-equilibrium`, `vaporization`; reinforces `equilibrium-is-dynamic` |

## Figures

- sim-n2o4-equilibrium · Figure 13.2 · chemical-equilibrium, equilibrium-is-dynamic, reversible-reaction · rebuilt on 2026-11-16. Value add: flow by animation, variation and a comparison of starts. The book's three tubes and two graphs are stills of one experiment; here one sealed tube runs on a clock, its gas magnified to a large circle of molecules, and the lesson the stills cannot give is made the first thing seen: every split is ringed in the forward reaction's colour and every join in the reverse's, and each is ticked at its time on two rows between the graphs, so the reader sees the splits thin out and the joins crowd in until the two rows keep the same spacing, and sees both go on past the dashed line while the concentrations hold. The run can also start from NO₂ alone (0.280 M, the same atoms), where the reverse reaction is seen alone at first, the tube pales instead of darkening, and the mixture settled on is the same · arrows: none (the book's zoom arrows are notation, drawn here as a magnifier) · moving: a run of 8.0 model seconds played at 1.4 times, holding 1.2 s, computed whole when a control moves so the transport scrubs it exactly · controls: start with (choice N₂O₄, NO₂; default N₂O₄, the book's case), k_f (`rate-constant`, 0.30 to 1.20 s⁻¹ by 0.05, default 0.60) and k_r (`rate-constant`, 1.00 to 2.20 M⁻¹ s⁻¹ by 0.05, default 1.40), chosen so that 14 N₂O₄ settle on 6 N₂O₄ and 16 NO₂, the book's 7 → 3 + 8 doubled; the ranges keep every initial rate on the axis and bring every setting to equilibrium before 6.5 s · headline: the book's phase with live counts, "At t = 0 the tube holds only N₂O₄, 14 molecules in the circle.", "Pre-equilibrium: 7 N₂O₄ have split and 1 pair of NO₂ has joined.", "At equilibrium: since t = 3.9 s, 14 N₂O₄ have split and 13 pairs of NO₂ have joined." (the counts since equilibrium, which stay within one of each other) · graphs beside the scene on one time axis, t 0 to 8 s: concentration (0 to 0.30 M) above, the two rows of ticks, rate (0 to 0.18 M/s) below, each drawn up to the clock with a dot at now; from the moment the rates stay within 0.0005 M/s of each other both graphs are shaded and one dashed line runs through all three, marked "equilibrium achieved" once · 2D (book rule for particle pictures; molecules are the book's space-filling N₂O₄ and bent NO₂ and every one is seen) · labels: each curve is named beside its newest point, ahead of the curve, because the two concentration curves are dealt near hues (the first pass's legend left them hard to tell apart); the forward rate is dashed over the reverse so both show where they run together; molecules and the two rings are named in a legend under the circle and molecules on hover; the tube labelled · colours: concentration curves `F.ref('n2o4')`, `F.ref('no2')`; rate curves, rings and ticks `F.ref('forward')`, `F.ref('reverse')`; atoms `F.el`; the tube's gas NO₂'s brown through `F.fact`, in proportion to [NO₂] · readout two lines, rate_f = k_f[N₂O₄] = (0.60 s⁻¹)(0.060 M) = 0.036 M/s and rate_r = k_r[NO₂]² = (1.40 M⁻¹ s⁻¹)(0.160 M)² = 0.036 M/s, clock-driven; past the dashed line both write the mean of the two rates, which differ by less than half a unit of the last place · model: [N₂O₄]₀ = 0.140 M or [NO₂]₀ = 0.280 M, d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]², steps of 1/60 s; a split each time ∫rate_f dt passes a multiple of 0.010 M and a join each time ∫rate_r dt passes a half-multiple, seeded so a setting always plays the same run · draws `concentration`, `rate`, `rate-constant`, `time`; conventions N, O; facts NO₂ brown
  works: parts: a sealed glass tube of the gas, drawn off to a closed tip; a ring on the tube and two lines out to a circle, the magnified gas; in the circle N₂O₄ (two N joined in the middle, two O on each N) and NO₂ (an N between two O, bent), N blue and O red, space-filling as the book draws them; beside, concentration against time, the ticks of the splits and the joins, and rate against time, on one time axis · flow: molecules fly straight and bounce off the circle and each other; an N₂O₄ breaks at its N–N bond into two NO₂ that fly apart, a ring spreading from it; two NO₂ glide together and become one N₂O₄, a ring spreading from it; the tube browns as NO₂ forms and pales as it is used up · must hold: (1) at t = 0 from N₂O₄ only N₂O₄ in the circle (14) and the tube colorless; from NO₂ only NO₂ (28) and the tube at its brownest; (2) the circle's N₂O₄ count within two of the curve at 0.010 M a molecule (a split waits for a whole molecule's worth, a join is made half a molecule early and counts once its pair has met), and exact or one over at equilibrium; (3) [NO₂] changes twice as fast as [N₂O₄], opposite in sign, and from either start the default settles on 0.060 M and 0.160 M, 6 N₂O₄ and 16 NO₂, NO₂ above N₂O₄ as in the book's (b); (4) from N₂O₄ rate_f starts at k_f × 0.140 M and falls, rate_r starts at 0 and rises; from NO₂ the reverse; they meet at the dashed line and run together beyond it; (5) ticks and rings go on after the line, the two rows at the same spacing, and the headline's two counts since equilibrium differ by at most one; (6) the ticks of a row stand closer where its rate curve is higher; (7) the readout's numbers multiply to its results within the rounding of the last place, and the two results are equal past the line; (8) every setting reaches the line before the run ends · read off the image: phases "t = 0", "pre-equilibrium", "at equilibrium"; molecules "N₂O₄", "NO₂"; the tube colorless, then yellow-brown, then darker brown; (b) "Concentration" against "Time", curves NO₂ and N₂O₄, the NO₂ curve ending above; (c) "Rate" against "Time", curves k_f[N₂O₄] falling and k_r[NO₂]² rising to meet; a dashed line and a shaded "Equilibrium achieved" region in both; the book's axes carry no numbers; the at-equilibrium circle holds 3 N₂O₄ and 8 NO₂, here doubled. The start from NO₂ is not in the image; the passage's "may proceed in both forward and reverse directions" is what it shows.
- fig-juggling · Figure 13.3 · equilibrium-is-dynamic · kept photograph, the analogy the passage draws for dynamic equilibrium; config keeps it · photo
- fig-bromine · Figure 13.4 · equilibrium-is-dynamic · kept photograph, the text points at it and exercise 7 asks about the closed vessel it shows · photo

Extra simulations: none. The bromine photograph shows the phase equilibrium the passage describes, and its rates are the vapor-pressure story Chapter 10 already drew; a second box would repeat Figure 13.2.

## Tables

None.

## Types bound

`concentration` ([N₂O₄], [NO₂], the concentration axis), `rate` (rate_f, rate_r, the rate axis), `rate-constant` (k_f, k_r, as the book's tables type them through the concept `rate-constant`; the chapter notes' "untyped" is overruled by `COLOR.md` and the variables rows), `time` (t, the time axis). Coefficients and the exponent 2 stay ink.

## Referents

`n2o4` and `no2`: the two gases in the sealed tube, one concentration curve each in Figure 13.2; `forward` and `reverse`: the forward and reverse reactions of N₂O₄ ⇌ 2NO₂, one rate curve each, with the rings and ticks of the splits and the joins. All four are marked in the caption and in the paragraph that walks through panels (b) and (c).

## Exercises

No inline item. Seven end-of-section items:
- e1 fs-idp156600272 (1), keyed, open.
- e2 fs-idp122639232 (2), unkeyed conceptual, AI-marked approach.
- e3 fs-idp77430432 (3), keyed, open.
- e4 fs-idp13186176 (4), unkeyed conceptual, AI-marked approach.
- e5 fs-idp9783616 (5), keyed, open.
- e7 fs-idp194491952 (7), from 13.2 with `source_section` "13.2", keyed, open: the closed vessel of Figure 13.4.
- e48 fs-idp92538384 (48), from 13.3 with `source_section` "13.3", keyed, open: radioactive Ag⁺ and the dynamic nature of equilibrium.

## Left out

The learning objectives, summary and glossary go to the tables. Nothing of the narrative is left out; no Link to Learning in this module.

## Wanted at chapter level

- forms `eq-equal-rates` → 13.1-reversible
- variables `rate_f` → 13.1-dynamic
- variables `rate_r` → 13.1-dynamic
- variables `k_f` → 13.1-dynamic
- variables `k_r` → 13.1-dynamic
- variables `13.1/rate_f` ref `forward`, `13.1/rate_r` ref `reverse` (COLOR.md: the f and r in the referents' colours)
- 13.2 and 13.3 `exercise_notes` to say that fs-idp194491952 and fs-idp92538384 are set in 13.1

Applied by the chapter pass (2026-10-05): `eq-equal-rates` anchored at 13.1-reversible; `rate_f`, `rate_r`, `k_f` and `k_r` anchored at 13.1-dynamic, with `rate_f` ref `forward` and `rate_r` ref `reverse`; a `t` row added at 13.1-dynamic (12.4's meaning), since the figure's headline now writes $\kt = 0$ through its macro; 13.2's and 13.3's `exercise_notes` already said that fs-idp194491952 and fs-idp92538384 are set here, and all three agree.
