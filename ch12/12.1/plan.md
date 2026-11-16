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

- sim-h2o2-rate · Figure 12.2 + 12.3 · rate-expression, rate-from-concentration-data, average-rate, instantaneous-rate, initial-rate · variation by slider: the book prints the table and the curve apart and draws tangents at two fixed times; here the table stands beside the curve, the secant from t₁ to t₂ is drawn with its Δ[H₂O₂] and Δt legs, the table's interval row lights when the secant is one of its four, and the tangent at t₁ stands beside the secant, so the reader sees an average rate close in on the instantaneous rate as t₂ comes to t₁ · arrows: none (the tangent, secant and triangle legs are notation) · still, the idea is a slope at a chosen instant and the time axis already lays the reaction out, so no clock · t₁ (time, 0 to 24.00 h, default 0.00, detents at the table's 0, 6, 12, 18, 24, a dashed circle at 11.1 h, the instant of Example 12.2, where the readout gives its 0.0320 mol L⁻¹ h⁻¹) and t₂ (time, 0 to 24.00 h, default 6.00, the same detents, dashed circle at t₁; t₂ is held at or after t₁); both points are also dragged along the curve (F.drag) · no headline (the caption says what to do, the readout carries both rates) · graph with the table beside it · 2D, a graph and a table (book rule) · curve [H₂O₂] = 1.000 M × 2^(−t/6.00 h), which passes through every row of the table; one curve, so it wears `concentration`; secant dashed and tangent solid, both `rate`, keyed by F.legend; the two points named t₁ and t₂ beside them; the slope triangle stands above the curve (Δt along t₁'s level, Δ[H₂O₂] down to the curve at t₂); the table as printed (0.062 and 0.010 kept) with the book's units (mol L⁻¹, mol L⁻¹ h⁻¹), its lit row's rate in the rate colour; y axis to 1.200 so the triangle's Δt keeps room at t₁ = 0 · readout two lines: the average rate as one chain with units on every substituted number, and the tangent's rate named as the text names it (initial rate at 0.00 h, instantaneous rate at t₁ otherwise); at t₂ = t₁ only the second. Second pass 2026-11-16: judged afresh and kept, since the idea and the numbers were right; the points are now dragged on the curve and named, the table's type is larger and in the book's units, Example 12.2's instant is marked, and the readout's differences are spaced.
  works: read off the image: Figure 12.2's table: times 0.00, 6.00, 12.00, 18.00, 24.00 h; [H₂O₂] 1.000, 0.500, 0.250, 0.125, 0.0625 mol L⁻¹; Δ[H₂O₂] −0.500, −0.250, −0.125, −0.062; Δt 6.00 each; rates 0.0833, 0.0417, 0.0208, 0.010 mol L⁻¹ h⁻¹, zigzag lines joining each pair of rows to its interval. Figure 12.3: curve from 1.000 at 0 h through 0.500 at 6, 0.250 at 12, to about 0.06 at 24; y axis 0.000 to 1.000 by 0.200, x 0.00 to 24.00 by 6.00; tangent at 0 h meeting 0.600 near 3.5 h (slope about −0.115 M/h; model initial rate 0.116), tangent at 12 h drawn from about 0.42 at 6 h to 0.07 at 18 h (slope about −0.029 M/h; model 0.0289; an earlier note here said 0.0578, which is the model's rate at 6 h); slope triangles dashed. Example 12.2: 3.20 × 10⁻² mol L⁻¹ h⁻¹ at 11.1 h (model 0.0320). must hold: (1) the curve passes through every table row; (2) the highlighted row is the secant's interval exactly; (3) the average rate in the readout equals the table's rate on each of its intervals (0.0833, 0.0417, 0.0208, 0.0104 printed by the book as 0.010); (4) at t₂ = t₁ the secant and its triangle vanish and only the tangent's rate is left; (5) labels Δt and Δ[H₂O₂] never on the axis, the legend or the table; (6) at t₁ = 11.1 h the readout reads 0.0320.
- fig-urine-strips · Figure 12.4 · kept photograph inside the note, the text points at it · photo
- sim-nh3-rates · Figure 12.5 · relative-reaction-rates, instantaneous-rate · variation by slider, and the comparison the book leaves to three printed numbers: the three tangent slopes stand as bars beside the curves, each bar cut into as many blocks as its species' coefficient in 2NH₃ ⟶ N₂ + 3H₂ (two down for NH₃, one up for N₂, three up for H₂), and one block is the rate; as t moves every bar shrinks and the blocks stay equal, so the reader sees that dividing each slope by its coefficient gives one number at every time, not only at 500 s · arrows: none (tangents are notation) · still, the time is a place on the axis the reader picks, no clock · t (time, 0 to 2000 s, default 500, the book's time, a detent there); the three points on the dashed line are dragged along their curves · no headline · graph with the bars beside it · 2D, a graph (book rule) · curves fitted so that [NH₃]₀ = 2.80 × 10⁻³ M and the tangent slopes at 500 s are the book's 1.94 × 10⁻⁶, 9.70 × 10⁻⁷ and 2.91 × 10⁻⁶ M/s (first order, k = 1.384 × 10⁻³ s⁻¹; N₂ reaches 1.31 × 10⁻³ M and H₂ 3.94 × 10⁻³ M at 2000 s, as the book draws); graph y axis 0 to 4.4 × 10⁻³ M with ticks on whole units, as the book's; bars on a fixed axis of −4 to 8 × 10⁻⁶ M/s (the slopes at t = 0 are −3.88, 1.94 and 5.81), each bar's slope written at its end as the book writes it; one curve, tangent and bar per species in its referent's colour; hover names on the three points give each tangent's slope · readout three lines, one per species: rate = (1/coefficient) × Δ[species]/Δt with the live slope substituted, each ending in the same rate. Second pass 2026-11-16: rebuilt. The first pass kept a graph with one long chain under it that wrapped mid-formula, and the 2 : 1 : 3 was only in the numbers; the bars put the ratio in the picture.
  works: read off the image: y 0 to 4.0 × 10⁻³ M by 1.0, x 0 to 2000 s by 500; [NH₃] from 2.8 × 10⁻³ falling to about 0.15 × 10⁻³ at 2000 s, 1.4 × 10⁻³ at 500 s; [H₂] rising to about 3.9 × 10⁻³, [N₂] to about 1.3 × 10⁻³; tangents at 500 s with slopes 2.91 × 10⁻⁶ ([H₂]), −1.94 × 10⁻⁶ ([NH₃], printed as −slope = 1.94 × 10⁻⁶) and 9.70 × 10⁻⁷ M/s ([N₂]); a dashed vertical at 500 s. The text's check: 2.91 × 10⁻⁶ / 9.70 × 10⁻⁷ ≈ 3. must hold: (1) on load the three slopes read −1.94 × 10⁻⁶, 9.70 × 10⁻⁷ and 2.91 × 10⁻⁶ M/s on the bars and in the readout; (2) at every t the NH₃ bar is two blocks down, N₂ one up, H₂ three up, all blocks one height; (3) each readout line ends in the same rate; (4) the tangents touch their curves at the points on the dashed line; (5) no bar or its number leaves the bar axis at t = 0, and the numbers do not run into each other at t = 2000 s.

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

## Derivations

- Relative rates of reaction, rate = −(1/a) Δ[A]/Δt = (1/b) Δ[B]/Δt · score 1 · not built: two moves told in prose, under the hidden bar
