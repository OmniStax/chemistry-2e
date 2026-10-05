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

- sim-n2o4-equilibrium · Figure 13.2 · chemical-equilibrium, equilibrium-is-dynamic, reversible-reaction · flow by animation and variation by slider: the book's three tubes, its two graphs and its rates are four stills of one experiment; here one sealed box of N₂O₄ runs on a clock while both graphs draw beneath it, so the reader watches the molecules that split and the pairs that join, sees the forward and reverse rates meet as the concentrations level off, and sees both kinds of event go on after they have levelled, which no still can show; the rate constants move the mixture the rates settle on, from mostly N₂O₄ to mostly NO₂ · arrows: none (the book's zoom arrows from tube to particle view are notation, and nothing in the book figure is drawn moving) · moving: molecules fly, split and join on a clock, a run of 8.0 model seconds played at 1.4 times (5.7 s) that holds 1.2 s and starts again, computed whole when a slider moves so the transport scrubs it exactly; the time is the lesson · sliders k_f (`rate-constant`, 0.10 to 1.20 s⁻¹, default 0.60) and k_r (`rate-constant`, 1.00 to 3.00 M⁻¹ s⁻¹, default 1.41), chosen so that 14 N₂O₄ settle on 6 N₂O₄ and 16 NO₂, the book's 7 → 3 + 8 doubled, and so that every corner reaches equilibrium within the run, from 11 N₂O₄ and 6 NO₂ to about 4 N₂O₄ and 21 NO₂; no choice · topline over the graphs "Pre-equilibrium: 9 N₂O₄ have split and 2 pairs of NO₂ have joined." with the phase (t = 0, pre-equilibrium, at equilibrium, the book's three labels) and the live counts · graphs below the scene, the book's (b) and (c) stacked: [N₂O₄] and [NO₂] against t (0 to 8 s, 0 to 0.30 M, headroom over the 0.28 M all-NO₂ limit) and rate_f, rate_r against t (0 to 8 s, 0 to 0.18 M/s, over the 0.168 M/s largest initial rate), the curves drawn up to the clock with a dot at now, and from the time the two rates agree to the readout's three decimals a shaded band and a dashed line marked "equilibrium achieved", as the book shades it · physical 3D, a particle picture (book rule): a glass box standing for the gas in the sealed tube, no ground, so yaw free and pitch within 70° of level; no idle spin since the molecules already move; views front and corner; flat fallback from `F.view3d`; the box tinted by NO₂'s brown through `F.fact` in proportion to [NO₂], the book's darkening tube · N₂O₄ and NO₂ drawn from their atoms by `F.el` (N, O), a joining pair gliding together over 0.25 s before it becomes one N₂O₄, a splitting N₂O₄ leaving as two NO₂; no entity labels (up to 28 molecules, all moving), each molecule named on hover, the equation N₂O₄ ⇌ 2NO₂ once above the box; the curves named in a legend per graph · colours: concentration curves `F.ref('n2o4')` and `F.ref('no2')`, rate curves `F.ref('forward')` and `F.ref('reverse')` (one curve per referent), axes in `concentration`, `rate`, `time` · readout rate_f = k_f[N₂O₄] = 0.051 M/s > 0.012 M/s = k_r[NO₂]² = rate_r, the relation sign live and "=" once equilibrium holds, never morphing (a clock drives it); note "Each molecule drawn stands for 0.010 M of its gas; in the real gas the reaction runs far faster than drawn." (root rule 28.4) · model: [N₂O₄]₀ = 0.140 M, d[N₂O₄]/dt = −k_f[N₂O₄] + k_r[NO₂]², integrated in steps of 1/60 s; splits and joins are counted from the integrals of rate_f and rate_r, so the box keeps the curves' counts within one molecule and both counts keep climbing at equilibrium; molecules bounce elastically off the walls and each other · draws `concentration`, `rate`, `rate-constant`, `time`; conventions N, O; facts NO₂ brown
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
