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

- sim-n2o4-equilibrium · Figure 13.2 · chemical-equilibrium, equilibrium-is-dynamic, reversible-reaction · flow by animation and variation by slider: the book's three tubes and two graphs are stills of one experiment; here one sealed tube runs on a clock, its gas magnified to a circle of molecules, while both graphs draw beside it, so the reader watches N₂O₄ split and NO₂ pair up, sees the two rates meet as the concentrations level off, and sees both kinds of event go on after they have levelled, which no still can show; the rate constants move the mixture the tube settles on · arrows: none (the book's zoom arrows are notation, drawn here as a magnifier) · moving: a run of 8.0 model seconds played at 1.4 times, holding 1.2 s, computed whole when a slider moves so the transport scrubs it exactly · sliders k_f (`rate-constant`, 0.10 to 1.20 s⁻¹, default 0.60) and k_r (`rate-constant`, 1.00 to 3.00 M⁻¹ s⁻¹, default 1.41), chosen so that 14 N₂O₄ settle on 6 N₂O₄ and 16 NO₂, the book's 7 → 3 + 8 doubled · headline: the book's phase (t = 0, pre-equilibrium, at equilibrium) with the live counts, "Pre-equilibrium: 9 N₂O₄ have split and 2 pairs of NO₂ have joined." · graphs beside the scene, the book's (b) and (c) stacked on one time axis, t 0 to 8 s, 0 to 0.30 M and 0 to 0.18 M/s, drawn up to the clock with a dot at now; past the moment the rates agree to three decimals a shaded stretch and a dashed line marked "equilibrium achieved", as the book shades it · 2D, rebuilt flat on 2026-11-14: the 3D glass box was small, carried front/corner view buttons and showed nothing a flat circle does not; molecules are now the book's space-filling N₂O₄ and bent NO₂ and every one is seen · labels: the molecules are named once in a legend under the circle (up to 28, all moving) and on hover; the tube labelled; curves keyed by `F.legend` above each graph · colours: concentration curves `F.ref('n2o4')`, `F.ref('no2')`, rate curves `F.ref('forward')`, `F.ref('reverse')`; atoms `F.el`; the tube's gas NO₂'s brown through `F.fact`, deepening with [NO₂] · readout two lines, rate_f = k_f[N₂O₄] = (0.60 s⁻¹)(0.060 M) = 0.036 M/s and rate_r = k_r[NO₂]² = (1.41 M⁻¹ s⁻¹)(0.160 M)² = 0.036 M/s, clock-driven · model: [N₂O₄]₀ = 0.140 M, d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]², steps of 1/60 s; splits and joins counted from the integrals of rate_f and rate_r · draws `concentration`, `rate`, `rate-constant`, `time`; conventions N, O; facts NO₂ brown
  works: parts: a sealed glass tube of the gas; a ring on the tube and two lines out to a circle, the magnified gas; in the circle N₂O₄ (two N joined in the middle, two O on each N) and NO₂ (an N between two O, bent), N blue and O red, space-filling as the book draws them; beside, concentration against time over rate against time on one time axis · flow: molecules fly straight and bounce off the circle and each other; an N₂O₄ breaks at its N–N bond into two NO₂ that fly apart; two NO₂ glide together and become one N₂O₄; the tube darkens from colorless to brown as NO₂ forms · must hold: (1) at t = 0 only N₂O₄ in the circle (14) and the tube colorless; (2) the circle's counts within one molecule of the curves at 0.010 M a molecule; (3) [N₂O₄] falls from 0.140 M and [NO₂] rises from 0, twice as fast; (4) rate_f starts at k_f × 0.140 M and falls, rate_r starts at 0 and rises, they meet at the dashed line and both run flat beyond it; (5) splits and joins go on after the line; (6) at the defaults 6 N₂O₄ and 16 NO₂, 0.060 M and 0.160 M, NO₂ above N₂O₄ as in the book's (b); (7) the readout's numbers multiply to its results · read off the image: phases "t = 0", "pre-equilibrium", "at equilibrium"; molecules "N₂O₄", "NO₂"; the tube colorless, then yellow-brown, then darker brown; (b) "Concentration" against "Time", curves NO₂ and N₂O₄, the NO₂ curve ending above; (c) "Rate" against "Time", curves k_f[N₂O₄] falling and k_r[NO₂]² rising to meet; a dashed line and a shaded "Equilibrium achieved" region in both; the book's axes carry no numbers; the at-equilibrium circle holds 3 N₂O₄ and 8 NO₂, here doubled.
- fig-juggling · Figure 13.3 · equilibrium-is-dynamic · kept photograph, the analogy the passage draws for dynamic equilibrium; config keeps it · photo
- fig-bromine · Figure 13.4 · equilibrium-is-dynamic · kept photograph, the text points at it and exercise 7 asks about the closed vessel it shows · photo

Extra simulations: none. The bromine photograph shows the phase equilibrium the passage describes, and its rates are the vapor-pressure story Chapter 10 already drew; a second box would repeat Figure 13.2.

## Tables

None.

## Types bound

`concentration` ([N₂O₄], [NO₂], the concentration axis), `rate` (rate_f, rate_r, the rate axis), `rate-constant` (k_f, k_r, as the book's tables type them through the concept `rate-constant`; the chapter notes' "untyped" is overruled by `COLOR.md` and the variables rows), `time` (t, the time axis). Coefficients and the exponent 2 stay ink.

## Referents

`n2o4` and `no2`: the two gases in the sealed tube, one concentration curve each in Figure 13.2; `forward` and `reverse`: the forward and reverse reactions of N₂O₄ ⇌ 2NO₂, one rate curve each. All four are marked in the caption and in the paragraph that walks through panels (b) and (c).

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
