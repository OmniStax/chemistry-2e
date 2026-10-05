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
- sim-initial-rates · Sim · rate-law, reaction-order, overall-reaction-order, method-of-initial-rates, rate-constant-units, rate-from-rate-law · variation by slider and choice: the book gives the method of initial rates only as tables and ratios; here Example 12.5's three trials are measured points on two graphs, rate against [A] with [B] held and rate against [B] with [A] held, and the reader picks the orders m and n and watches the rate law's curve bend from flat (zero order) to straight (first) to a parabola (second) until it passes through the trials; k is found from trial 1 as in step 3 of the example, so its number and unit change with the overall order, as Table 12.1 says · arrows: none · still, the rate law answers its controls and has no clock (initial rates are a dependence on concentration, not a course in time) · [A] and [B] (concentration, 0.02 to 0.15 M, detents at the trial values 0.10 and 0.15, default 0.10 = trial 1), choices m and n (0, 1, 2; untyped orders, default 2 and 1, the example's result) · headline "The rate law with m = 2 and n = 1 passes through all three trials." or which trials it misses · two graphs side by side, the graph is the idea (rate 0 to 16 × 10⁻³ mol L⁻¹ s⁻¹, enough for both concentrations at 0.15 M with both orders 2; concentration 0 to 0.15 M) · 2D, a graph (book rule) · generic A and B, the book's own notation for aA + bB ⟶ products, standing for NO and Cl₂ so that the defaults reproduce Example 12.5 (k = 3.0 L² mol⁻² s⁻¹, rates 0.00300, 0.00450, 0.00675); the trials are referents `trial-1`, `trial-2`, `trial-3` in `F.ref`, labelled "trial 1" and so on (four labels), faded where the held concentration is not the trials' 0.10 M; the moving point is the rate at the chosen concentrations, named by hover; the curve is labelled once · readout rate = k[A]^m[B]^n with the live numbers, small line the overall order m + n, which sets k's unit

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
