# Plan: 12.6 Reaction Mechanisms (m68794)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied without check-ins on Chen's instruction).

Four objectives, two numbered figures (12.17, 12.18), one unnumbered image (the cyclobutane equation), no table, one worked example (12.14) with one Check Your Learning, no boxed note, no Link to Learning, nine end-of-section items.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `mechanisms` | Reaction mechanisms and intermediates (the section's opening: the two steps of ozone's decomposition, their sum, the oxygen atom as an intermediate) | introduces `reaction-mechanism`, `elementary-reaction`, `reaction-intermediate`; uses `rate-law`, `rate-laws-are-experimental` |
| `unimolecular` | Unimolecular elementary reactions (the book's header; the cyclobutane figure) | introduces `molecularity`, `unimolecular-reaction`, `elementary-rate-laws`; uses `rate-law`, `rate-constant`, `concentration`, `reaction-rate` |
| `bimolecular` | Bimolecular elementary reactions (the book's header; Figure 12.17) | introduces `bimolecular-reaction`; uses `elementary-rate-laws`, `molecularity` |
| `termolecular` | Termolecular elementary reactions (the book's header) | introduces `termolecular-reaction`; uses `molecularity`, `elementary-rate-laws` |
| `rate-determining` | Relating reaction mechanisms to rate laws (the book's header; Figure 12.18, the NO<sub>2</sub> + CO mechanisms, the Sim) | introduces `rate-determining-step`, `mechanism-consistent-with-rate-law`; uses `rate-law`, `reaction-intermediate`, `elementary-rate-laws`, `temperature` |
| `fast-equilibrium` | A fast, reversible step before the slow one (the reversible dimerization of NO, Example 12.14 `ex-mechanism`) | introduces `rate-law-from-mechanism`; uses `dynamic-equilibrium`, `reaction-intermediate`, `rate-determining-step` |

## Figures

- fig-cyclobutane · unnumbered image (CyclobD_img) · the book's image, kept (a `figure` row with no number, eyebrow "Figure", like 9.1's `fig-manometer-ex3`); reverted on 2026-11-14. The 2D view copied the book's structural formulas and the 3D view turned a molecule the passage only names: the lesson here is that one molecule is the only reactant, which the formula already shows (book rule: where the passage only counts molecules or compares formulas, the image is kept). Judged again 2026-11-16: the image stays. It is an equation written in structural formulas; first-order decay is drawn in 12.4, and nothing here moves or varies.
- sim-no2-co · Figure 12.17 · the book's image, kept (a `photo`); reverted on 2026-11-14. The stage choice showed the book's three frames one at a time, so the reader lost the side-by-side comparison the book gives at a glance, and the 3D view of five spheres on a line added nothing. The book's alt text describes two HI molecules; the kept image carries an alt written from the picture (NO₂ + CO, transition state, NO + CO₂). Judged again 2026-11-16: the image stays. A collision through a transition state already runs in 12.5 (Figure 12.13 + 12.14) and the rate's dependence on both concentrations in 12.2's collision box, so a moving version here would only replay the book's three frames (root rule 24.9).
- fig-cattle · Figure 12.18 · rate-determining-step · kept photograph: the text points at it as its picture of a rate-determining step; nothing in it moves or varies that a slider could carry · photo
- sim-slow-step · Sim · rate-determining-step, reaction-intermediate, mechanism-consistent-with-rate-law · variation by slider and a comparison: the text says the low-temperature rate law rate = k[NO₂]² is consistent with the two-step mechanism because step 1 is slow, and shows a slow step only with a cattle chute; here the book's mechanism runs on a concentration–time graph beside the CO₂ curve that the rate law alone gives (dashed), so the reader sees the real CO₂ lie on the dashed curve while step 1 is slow, sees that raising [CO] then changes nothing (the rate law has no [CO] in it) and that raising k₂ changes nothing either, and sees NO₃ pile up and CO₂ fall below the dashed curve once step 2 is the slow one · arrows: none · still, the graph carries the time course and a time slider marks the moment read; the curves answer the sliders with no clock of their own · k₁ (rate-constant, 0.1 to 2 L mol⁻¹ s⁻¹ in 1-1.5-2-3-5-7 steps, default 0.5), k₂ (rate-constant, 0.1 to 50 L mol⁻¹ s⁻¹ in the same steps, default 50), [CO]₀ (concentration, 0.100 to 0.300 M, default 0.100 M; never below [NO₂]₀, so CO does not run out), t (time, 0 to 100 s, default 30 s); [NO₂]₀ = 0.100 M; the rate constants are chosen for illustration, since the book gives none, and the caption says so · headline "Step 1 is the slow step: NO₃ is used as fast as it forms, so CO₂ follows rate = k₁[NO₂]² and extra CO changes nothing." or its two other cases (step 2 slow; neither much slower), chosen by k₂[CO]₀ / k₁[NO₂]₀ (20 or more, 0.5 or less, between) · graph alone, the graph is the idea: [NO₂], [NO₃] and [CO₂] against t, concentration 0 to 0.100 M and time 0 to 100 s fixed ([CO] is not drawn; every drawn curve stays under 0.100 M) · 2D, a graph (book rule) · curves in `F.cat(0)`, `F.cat(1)`, `F.cat(2)`, each named once at its right end, the names stepped apart where the ends meet; the rate law's CO₂ dashed in ink over them, named in a key above the graph; the two step equations above the graph, each marked slow or fast from the sliders; dots on the curves at t, a dashed drop line · readout, two formulas on two lines: rate₁ = k₁[NO₂]² and rate₂ = k₂[NO₃][CO] with the live numbers
  works: read off the text: step 1 NO₂ + NO₂ ⟶ NO₃ + NO (slow), step 2 NO₃ + CO ⟶ NO₂ + CO₂ (fast), rate = k[NO₂]² below 225 °C; no numbers, no image. must hold: (1) [NO₂] = 0.100 − 2x + y, [NO₃] = x − y, [CO] = [CO]₀ − y, [CO₂] = y at every t (x, y the extents of steps 1 and 2); (2) the dashed curve is [CO₂] = C₀ − C₀/(1 + k₁C₀t), the integral of rate = k₁[NO₂]² with NO₃ used as fast as it forms (NO₂ then falls at rate₁, not 2 rate₁, since step 2 gives one back); (3) at the opening (k₁ 0.5, k₂ 50) the solid CO₂ lies on the dashed curve, NO₃ stays near zero and the two readout rates agree (8.0 and 8.1 × 10⁻⁴ M/s at 30 s, where [NO₂] = 0.040 M); (4) with step 1 slow, [CO]₀ from 0.100 to 0.300 M leaves the CO₂ curve where it is; (5) with k₁ 2 and k₂ 0.1, NO₃ piles up to about 0.04 M, CO₂ runs far under the dashed curve, and raising [CO]₀ lifts it; (6) the readout's numbers multiply to its results. Rebuilt 2026-11-16 (second pass): the first build fixed both reactants at 0.100 M and showed only the three curves, so nothing on it tied the mechanism to the rate law; the [CO]₀ slider and the dashed rate-law curve do, the k sliders now reach a hundredfold ratio either way, the two rates stand as two whole lines, and the opening time moved from 20 s (where the NO₂ and CO₂ dots sat on each other) to 30 s.

Extra simulations: none. The molecularity of a step is carried by the cyclobutane figure (one molecule), Figure 12.17 (two) and the text's termolecular equations; a termolecular collision drawn on its own would show nothing the bimolecular frames do not.

## Types bound

`rate` (rate, rate₁, rate₂, the readouts), `rate-constant` (k, k₁, k₂, k₋₁, typed in `book.json` and `ch12/COLOR.md`, which overrule the chapter notes' "never a typed k"), `concentration` ([A], [B], the concentration axis), `time` (t and Δt, the time axis and slider). A named species' bracket ([NO₂], [NOCl₂]) has no symbol row and stays in ink in the prose; the Sim's readout colours it with `C('concentration')`. Energy is not drawn: no reaction diagram is printed in this section.

## Referents

None. `ch12/COLOR.md` planned the steps of a mechanism as referents where the text names step 1 and step 2; the only steps the text names are those of Example 12.14, which no figure draws, and the Sim's mechanism is named by its slow and fast steps, so step 1 and step 2 stay in ink and the curves take `F.cat`.

## Exercises

One Check Your Learning inline after Example 12.14 (`ex-mechanism`), keyed, an open answer compared with the key. Nine end-of-section items, all kept: four keyed (fs-idp146992064, fs-idm4441216, fs-idp199466816 open with the key; fs-idm20987200, the AP item, multi with its numbers (c) and (d) checked and its key printed whole), five unkeyed conceptual or symbolic with an AI-marked suggested approach (fs-idm14620304, fs-idp48807664, fs-idp38703248 with its five options kept as an open item, fs-idp63617152, fs-idp225129424). None left out, none moved.

## Left out

Nothing of the prose. Errata kept as printed: "the butadiene reaction" for the cyclobutane decomposition; the AP key's k in mol² L⁻² min⁻¹ and its "Step II" for the book's Step 2; "a *single* reactant entities". The book's alt text for Figure 12.17 describes two HI molecules; the image and the caption show NO₂ and CO, and the figure follows them.

## Wanted at chapter level

- variables `k_m1` → 12.6-fast-equilibrium
- variables rows in 12.6 for `rate`, `k`, `[A]`, `[B]`, `k_1`, `k_2`, `Δt` (the meanings of 12.1, 12.3 and 12.5) if the chapter pass wants them per section; the page writes `\krate`, `\kk`, `\kconcA`, `\kconcB`, `\kkone`, `\kktwo`, `\kkmone`, `\kdt`
- `ch12/COLOR.md` and the chapter notes disagree on k: the tables type it `rate-constant` (`\kk`), and the page follows them
- `ch12/config.md`: the cyclobutane equation of 12.6 is an unnumbered image redrawn as a figure row with no number

Applied by the chapter pass (2026-10-05): the k₋₁ anchor set; no per-section rows for the reused symbols, whose cards fall back to the chapter's meanings; k stays typed (`COLOR.md`, `config.md`); `config.md` names the cyclobutane figure row.

## Derivations

- A fast, reversible step before the slow one, [N₂O₂] from the NO dimerization equilibrium · score 1 · built as drv-n2o2-equilibrium (a thin printed block, two moves)
- Example 12.14, the rate law of a mechanism with a fast equilibrium before the slow step · score 2 · built as drv-mechanism-rate-law
