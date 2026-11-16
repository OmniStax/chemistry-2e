# Plan: 12.3 Rate Laws (m68789)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied without check-ins on Chen's instruction).

Three objectives, one numbered figure (12.8, the ozone map inside Example 12.4), one numbered table (12.1), three worked examples (12.3 to 12.5) with four Check Your Learning items (two in Example 12.3), no boxed note, no Link to Learning, twenty end-of-section items.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `rate-laws` | Rate laws and reaction orders (the section's opening, the three sample rate laws, Example 12.3 `ex-orders`) | introduces `rate-law`, `rate-constant`, `reaction-order`, `overall-reaction-order`; uses `reaction-rate`, `concentration-and-rate`, `molarity` |
| `initial-rates` | The method of initial rates (Examples 12.4 `ex-ozone` with Figure 12.8 and 12.5 `ex-nocl`, the Sim) | introduces `initial-rates-method`, `method-of-initial-rates`, `rate-from-rate-law`; uses `rate-law`, `reaction-order`, `rate-constant`, `initial-rate` |
| `units` | Reaction order and rate constant units (the book's header; Table 12.1) | introduces `rate-laws-are-experimental`, `rate-constant-units`; uses `overall-reaction-order`, `rate-constant` |

## Figures

- fig-ozone-hole · Figure 12.8 · none · kept photograph: Example 12.4 points at it to set the scene of NO + O₃; a satellite map is a fact, nothing to vary · photo, no width in the CNXML
- sim-initial-rates · Sim · rate-law, reaction-order, method-of-initial-rates, rate-constant-units, rate-from-rate-law · variation by slider and choice: the book gives the method of initial rates only as tables and ratios. Here each graph is one step of Example 12.5: one concentration is raised from trial 1's 0.10 M with the other held there, and two brackets from trial 1 say how many times the concentration and the rate have grown, so "1.5 times the NO, 2.25 times the rate" is read straight off the left graph and "1.5 times the Cl₂, 1.5 times the rate" off the right. Through trial 1 run the three rate laws an order of 0, 1 or 2 would give (flat, straight, parabola); the measured second trial sits on one of them, and that is the order · arrows: none · still, the rate law answers its controls and has no clock (initial rates are a dependence on concentration, not a course in time) · sliders [NO] and [Cl₂] (concentration, 0.10 to 0.20 M, each moving only its own graph's dot; detents at the trials' 0.15 M and at the doubled 0.20 M; default 0.15 M, so the dots open inside trials 3 and 2), choices m and n (0, 1, 2; untyped orders, default 2 and 1, the example's result) · headline "With m = 2 and n = 1 the rate law passes through all three trials."; with one order wrong, what that order predicts for its trial against what was measured ("With m = 1 the rate law puts trial 3 at 1.5 times the rate of trial 1, and 2.25 times was measured."); with both wrong, that it misses trials 2 and 3 · two graphs side by side, the graph is the idea (rate 0 to 12 × 10⁻³ mol L⁻¹ s⁻¹, which is 3.00 × 2² at the slider's 0.20 M with order 2; concentration 0 to 0.20 M) · 2D, a graph (book rule) · NO and Cl₂ named as Example 12.5 names them; the trials are the referents `trial-1`, `trial-2`, `trial-3`, hollow rings in `F.ref` colours with their names beside them; the filled dot is the rate the chosen law gives (hover names it); the three candidate laws are named at their right ends (m = 0, m = 1, m = 2), the chosen one heavy · readout, the example's three steps as three formulas: rate/rate₁ = ([NO]/[NO]₁)^m with the live numbers, the same for Cl₂ and n, and k from trial 1 with Table 12.1's unit for the overall order
  works: read off the example's table: trial 1 [NO] 0.10, [Cl₂] 0.10, rate 0.00300; trial 2 0.10, 0.15, 0.00450; trial 3 0.15, 0.10, 0.00675 mol L⁻¹ s⁻¹; ratios rate 3/rate 1 = 2.25 = 1.5², rate 2/rate 1 = 1.5 = 1.5¹; result m = 2, n = 1, k = 3.0 L² mol⁻² s⁻¹. must hold: (1) on load the left brackets read [NO] × 1.5 and rate × 2.25, the right ones [Cl₂] × 1.5 and rate × 1.5, and each dot sits inside its ring; (2) with m = 2, n = 1 the headline says the law passes through all three trials, and any other pair names the trial it misses with the predicted and measured ratios (1.5^order against 2.25 or 1.5); (3) at 0.20 M the brackets read × 2 and rate × 4 (m = 2), × 2 (order 1), × 1 (order 0); (4) k in the readout is trial 1's rate over 0.10^(m+n) with Table 12.1's unit: 3.0 × 10⁻³ mol L⁻¹ s⁻¹, 0.030 s⁻¹, 0.30 L mol⁻¹ s⁻¹, 3.0 L² mol⁻² s⁻¹, 30 L³ mol⁻³ s⁻¹; (5) each slider moves only its own graph, since the other concentration is held at trial 1's 0.10 M. Rebuilt 2026-11-16: the first build drew the fitted curve and a crosshair but never the ratio, so the method (compare two trials, read the order from how many times the rate grew) was not on the page; its sliders also changed the held concentration and faded the trials, which the caption had to explain.

Extra simulations: none. 12.2's collision Sim and 12.4's integrated plots carry the chapter's motion; a reaction-specific bench here would add nothing the trials graph does not.

## Tables

Table 12.1 (Rate Constant Units for Common Reaction Orders) in the `units` span as `div.book-table`. The examples' data tables stay unnumbered inside their examples; Example 12.5's trial numbers are marked as the referents. No Key Equations table is printed.

## Types bound

`rate` (rate, the curves and the rate axis), `concentration` ([A], [B], the sliders and concentration axes), `rate-constant` (k, typed in `book.json` and `ch12/COLOR.md`, which overrule the chapter notes' "never a typed k"). Orders m and n, x and counts stay ink. Time is not drawn.

## Referents

`trial-1`, `trial-2`, `trial-3`: the three trials of Example 12.5, in its table, its solution's words and the Sim. Example 12.4's five trials are not referents (another reaction's trials, named only in passing).

## Exercises

Four Check Your Learning items inline: two after `ex-orders` (multi, orders), one after `ex-ozone` (multi, order and k), one after `ex-nocl` (multi, two orders and k). Twenty end-of-section items: ten keyed kept (fs-idm256410736, fs-idm291799584, fs-idm222164384, fs-idm140350624, fs-idm32841312, fs-idm263803776, fs-idm238094880, fs-idm49483024, fs-idm57376432, fs-idm237267424); one unkeyed conceptual kept with an AI-marked approach (fs-idm181252208); nine unkeyed numerical left out and named (fs-idm211287824, fs-idm207653024, fs-idm53134032, fs-idm147604432, fs-idm233306880, fs-idm146074112, fs-idm168734944, fs-idm140371280, fs-idm152420960). Keys carried as printed: the stray "(a)" of fs-idm57376432's key is dropped from the checked number and kept in the solution text; fs-idm49483024's table cell 4.17 × 10⁻⁴ is printed (its summary's 4.7 × 10⁻⁴ is a slip).

## Left out

Nothing of the prose. Errata kept as printed: 2N₂O₅ ⟶ NO₂ + O₂ in the list of rate laws; Example 12.4's "the rate increases also triples" and "n is equal to 1.The rate law"; fs-idm57376432's key opening with "(a)".

## Wanted at chapter level

- variables `k` → 12.3-rate-laws
- variables `m_rxorder` → 12.3-rate-laws
- variables `n_rxorder` → 12.3-rate-laws
- equations `eq-rate-law` → 12.3-rate-laws
- variables rows in 12.3 for `rate`, `[A]`, `[B]` (the same meanings as 12.1's) if the chapter pass wants them per section; the page writes `\krate`, `\kconcA`, `\kconcB`
- `ch12/COLOR.md` and the chapter notes disagree on k: the tables type it `rate-constant` (`\kk`), and the page follows them

Applied by the chapter pass (2026-10-05): the four anchors set as listed; no per-section rows for rate, [A] and [B], whose cards fall back to 12.1's meanings. k stays typed `rate-constant`; `COLOR.md` and `config.md` now say so, and the chapter's forms write `\kk`.

## Derivations

- Example 12.5, the order of a reaction from the ratio of two initial rates · score 1 · not built: a worked example of the section's own method of initial rates
