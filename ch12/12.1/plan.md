# Plan: 12.1 Chemical Reaction Rates (m68786)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied as proposed, without check-ins).

Three objectives, four numbered figures (12.2 a data table printed as an image, 12.3 its graph, 12.4 a photograph inside the test-strip note, 12.5), two worked examples (12.1, 12.2) with a Check Your Learning each, one boxed note, six end-of-section items.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `rate` | Reaction rates | introduces `reaction-rate`; uses `concentration` |
| `expression` | Rate expressions (Figure 12.2 + 12.3) | introduces `rate-expression`; uses `reaction-rate`, `molarity` |
| `average` | Average, instantaneous, and initial rates (the test-strip note with Figure 12.4) | introduces `rate-from-concentration-data`, `average-rate`, `instantaneous-rate`, `initial-rate`, `average-instantaneous-initial-rate` |
| `relative` | Relative rates of reaction (the book's header; Figure 12.5, Examples 12.1 and 12.2) | introduces `relative-reaction-rates`, `write-relative-rate-expressions`; uses `rate-expression`, `instantaneous-rate`, `balanced-equation` |

## Figures

- sim-h2o2-rate · Figure 12.2 + 12.3 · rate-expression, rate-from-concentration-data, average-rate, instantaneous-rate, initial-rate · variation by slider: the book prints the table and the curve apart and draws tangents at two fixed times; here the table sits beside the curve, the secant from t₁ to t₂ is drawn with its Δ[H₂O₂] and Δt legs, the table's interval row lights when the secant is one of its four, and the tangent at t₁ stands beside the secant, so the reader sees an average rate close in on the instantaneous rate as t₂ comes to t₁ · arrows: none (the tangents, secant and triangle legs are notation) · still, the idea is a slope at a chosen instant and the time axis already lays the reaction out, so no clock · t₁ (time, 0 to 24.00 h, default 0.00, detents at the table's 0, 6, 12, 18, 24) and t₂ (time, 0 to 24.00 h, default 6.00, the same detents, dashed circle at t₁ labelled "t₁"; t₂ is held at or after t₁) · headline "Bring t₂ to t₁ and the secant turns into the tangent at t₁." until they meet, then "At t₂ = t₁ the secant has become the tangent, and its slope gives the instantaneous rate." · graph with the table beside it · 2D, a graph and a table (book rule) · curve [H₂O₂] = 1.000 M × 2^(−t/6.00 h), which passes through every row of the table and gives Example 12.2's 3.20 × 10⁻² mol L⁻¹ h⁻¹ at 11.1 h; one curve, so it wears `concentration`; secant dashed and tangent solid, both `rate`; legs in `concentration` and `time`; a legend names tangent and secant; the table as printed (0.062 and 0.010 kept) · readout rate = −([H₂O₂]_{t₂} − [H₂O₂]_{t₁})/(t₂ − t₁) with the live numbers, morphing to rate = −Δ[H₂O₂]/Δt of the tangent when t₂ = t₁; note the instantaneous rate at t₁ while they differ, "the initial rate" at t₁ = 0
- fig-urine-strips · Figure 12.4 · kept photograph inside the note, the text points at it · photo
- sim-nh3-rates · Figure 12.5 · relative-reaction-rates, instantaneous-rate · variation by slider: the book fixes the tangents at 500 s; here the reader moves the time and the three tangents flatten together while their slopes keep the ratio 2 : 1 : 3 the coefficients set · arrows: none (tangents are notation) · still, the time is a place on the axis the reader picks, no clock · t (time, 0 to 2000 s, default 500, the book's time) · headline "The three tangents at t flatten together and keep the ratio 2 : 1 : 3 of the coefficients." · graph alone, the graph is the idea · 2D, a graph (book rule) · curves fitted so that [NH₃]₀ = 2.80 × 10⁻³ M and the tangent slopes at 500 s are the book's 1.94 × 10⁻⁶, 9.70 × 10⁻⁷ and 2.91 × 10⁻⁶ M/s (first order, k = 1.384 × 10⁻³ s⁻¹; N₂ reaches 1.31 × 10⁻³ M and H₂ 3.94 × 10⁻³ M at 2000 s, as the book draws); one curve per species, so each wears its referent's colour and its tangent the same; curve names once each beside the still curves · readout rate = −½ Δ[NH₃]/Δt = Δ[N₂]/Δt = ⅓ Δ[H₂]/Δt = the live rate; note the three tangent slopes

Extra simulations: none. The concentration curves are read at a chosen time, so neither needs a clock; the collision Sim of the chapter belongs to 12.2 or 12.5.

## Tables

None numbered. Figure 12.2 is a data table printed as an image and is drawn live inside the fold. The Key Equations table is not printed; its relation is the form `eq-relative-rates`.

## Types bound

`concentration` (the curves of one species, Δ[H₂O₂] legs, [H₂O₂] axis, the table's concentration columns), `time` (t₁, t₂, t, Δt, the time axes), `rate` (secant, tangents, the rates in the table and readouts). `temperature` only as values in prose (40 °C, 1100 °C, 1150 K). Coefficients stay ink.

## Referents

`nh3`, `n2`, `h2`: the three species of Figure 12.5, one curve and tangent each, marked in the caption and in the paragraph that cites the figure.

## Exercises

Two Check Your Learning items inline, hosts `ex-relative` (Example 12.1, open with the book's answer) and `ex-h2o2-rates` (Example 12.2, two numbers). Six end-of-section items: three keyed kept (fs-idp53700320 open, fs-idm82430624 open with its key's "CIF₃" as printed, fs-idm57147216 multi with tolerance on the graph estimates), one unkeyed conceptual with an AI-marked approach (fs-idp77962352), two unkeyed numerical left out and named (fs-idp24119136, fs-idm40595504). No PhET item. Nothing moves between sections.

## Left out

The learning objectives, summary, key equations and glossary go to the tables. Errata kept as printed: the "t₂** − t₁" markup slip written plainly as t₂ − t₁; the relative-rate equation's ΔA and ΔB without brackets; the key's "CIF₃".

## Wanted at chapter level

- variables `rate` → 12.1-relative
- variables `[A]` → 12.1-relative
- variables `[B]` → 12.1-relative
- variables `Δ[A]` → 12.1-relative
- variables `Δ[B]` → 12.1-relative
- variables `Δt` → 12.1-expression
- forms `eq-relative-rates` → 12.1-relative

Applied by the chapter pass (2026-10-05): all seven anchors set as listed.
