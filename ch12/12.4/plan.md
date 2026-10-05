# Plan: 12.4 Integrated Rate Laws (m68791)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied as proposed, without check-ins).

Four objectives, four numbered figures (12.9 inside Example 12.7, 12.10 inside Example 12.9, 12.11 after Example 12.10, 12.12 inside Example 12.11), one numbered table (12.2), seven worked examples (12.6 to 12.12) with a Check Your Learning each, two of them answered by images, eighteen end-of-section items.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `integrated` | Integrated rate laws (the section's own introduction) | introduces `integrated-rate-laws`; uses `rate-law` |
| `first-order` | First-order reactions (the book's header; Examples 12.6, 12.7, Figure 12.9 + 12.10 + 12.11) | introduces `first-order-integrated-rate-law`, `integrated-rate-law-calculations`, `order-from-linear-plots`; uses `rate-constant`, `reaction-order` |
| `second-order` | Second-order reactions (the book's header; Examples 12.8, 12.9) | introduces `second-order-integrated-rate-law`; uses `order-from-linear-plots`, `integrated-rate-law-calculations` |
| `zero-order` | Zero-order reactions (the book's header; Example 12.10) | introduces `zero-order-integrated-rate-law`; uses `order-from-linear-plots`, `rate-constant` |
| `half-life` | The half-life of a reaction (the book's header, with h3 ids `half-life-first`, `half-life-second`, `half-life-zero`; Example 12.11 with Figure 12.12, Table 12.2, Example 12.12) | introduces `half-life`, `half-life-by-order`; uses the three integrated rate laws, `integrated-rate-law-calculations` |

## Figures

- sim-order-plots · Figure 12.9 + 12.10 + 12.11 · order-from-linear-plots, first-order-integrated-rate-law, second-order-integrated-rate-law, zero-order-integrated-rate-law · standardisation and variation by choice: the book plots each data set only the way that comes out straight (12.10 two ways); here each data set is plotted all three ways side by side, [A], ln[A] and 1/[A] against t, each with the chord from its first point to its last, so the reader sees the points lie on the chord in one panel and bow away from it in the other two; the straight panel's chord is solid in `rate-constant`, its slope read as k as the book reads it · arrows: none · still, the data are measured at fixed times and the lesson is the shape of a plot, so no clock · choice data set (H₂O₂, C₄H₆, NH₃), default H₂O₂ (Example 12.7); a change fades the old points and axes out and the new in, the three frames staying · headline "Only ln[H₂O₂] against t is a straight line, so the decomposition is first order." (one per data set) · graph alone, three panels in a row, the graph is the idea · 2D, graphs (book rule) · readout the book's two-point slope: k = −slope = −(−2.772 − 0.000)/(24.00 h − 0.00 h) = 0.116 h⁻¹, and Examples 12.9 and 12.10 for the others; no note · a single series wears `concentration` in the [A] panel and ink in the ln[A] and 1/[A] panels (chapter `COLOR.md`); the tungsten and quartz series wear their referents' colours in every panel, named once beside their last point in the [A] panel; dashed chords in muted ink; hover names every point with its time and value · ammonia read off Figure 12.11 and set on the lines the text names: on tungsten from 2.80 × 10⁻³ M at 1.3 × 10⁻⁶ M s⁻¹ (Example 12.10), on quartz first order with k = 1.384 × 10⁻³ s⁻¹, the value 12.1's Figure 12.5 uses, through the book's points within the drawing · axes per data set from the data with headroom: H₂O₂ 0 to 24 h, [A] 0 to 1.2 M, ln −3.5 to 0.5, 1/[A] 0 to 20 M⁻¹; C₄H₆ 0 to 6400 s, [A] 0 to 12 × 10⁻³ M, ln −7 to −4, 1/[A] 0 to 600 M⁻¹; NH₃ 0 to 1000 s, [A] 0 to 3.5 × 10⁻³ M, ln −8 to −5, 1/[A] 0 to 1600 M⁻¹
- sim-half-lives · Figure 12.12 · half-life, half-life-by-order, first-order-integrated-rate-law · flow by animation and variation by choice: the book prints five beakers 6 h apart; here one sample is watched at those five times as a clock runs to 24 h, every beaker fading together until each is left behind at its own time, the concentration curve drawing out below with a bracket for each half-life as it completes; a choice of order with the same first half-life (6.00 h from 1.000 M) shows the half-lives staying at 6.00 h (first order), stretching to 12.0 h (second order) or shrinking to 3.00, 1.50 and 0.75 h (zero order), Table 12.2's half-life row seen · arrows: none (the book draws none) · moving, the idea is a concentration falling through time; the transport runs the 24 h in 6 s and holds · choice order (zero, first, second), default first; a change restarts the clock · headline "The concentration halves every 6.00 h, however much is left." (one per order) · scene above graph, the beakers a horizontal row · 2D, the flasks of 12.12 flat (chapter `COLOR.md` and exploration) · readout the integrated rate law of the order with the live t and [A]_t (a clock drives it, so it never highlights): [A]_t = [A]_0 e^(−kt) with k = 3.21 × 10⁻⁵ s⁻¹ (Example 12.11); 1/[A]_t = kt + 1/[A]_0 with k = 4.63 × 10⁻⁵ M⁻¹ s⁻¹; [A]_t = −kt + [A]_0 with k = 2.31 × 10⁻⁵ M s⁻¹, written [A]_t = 0 once the reactant is gone at 4.32 × 10⁴ s; no note · the tint is an opacity of the `concentration` hue (chapter `COLOR.md`: H₂O₂ is colourless and the book's green is no fact); each beaker carries the book's three lines beneath it, its concentration live until its time and its times fixed, nothing on a moving thing; brackets in `time` labelled with their lengths where wide enough, the rest by hover · axes 0 to 24 h and 0 to 1.2 M, fixed

Photographs and unnumbered images: none in the text. The two Check Your Learning answers that are images (`CYL1_img`, `CYL2_img`) stay images in their answers; the exercise images `Exercise02_img`, `Exercise04_img_new` (keys) and `Cycloprop_img` (a prompt) are kept in their cards. `ExSolutio2_img` belongs to fs-idm43018880, which is left out, and is not copied.

Extra simulations: none. The fold carries the order test, the half-life figure carries the half-lives by order; a third figure would repeat one of them.

## Tables

Table 12.2 in the text as `div.book-table`. The example data tables (Examples 12.7 and 12.9) stay unnumbered in the text; those of the Check Your Learning items and the exercises go into their prompts. The Key Equations table is not printed; its six relations are forms.

## Types bound

`concentration` ([A], [A]₀, [A]_t, the beaker tint, the [A] axes and values), `time` (t, t₁/₂, the time axes, the half-life brackets), `rate-constant` (k, the chord read as k, the k values in examples). ln[A] and 1/[A] and their axes stay ink; `rate` only as the symbol in the rate laws; `temperature` only as values in prose (500 °C, 40 °C, 499 °C).

## Referents

`tungsten`, `quartz`: the two ammonia series of Figure 12.11, drawn in sim-order-plots and marked in its caption and in the zero-order text and Example 12.10 that name them.

## Exercises

Seven Check Your Learning items inline, hosts `ex-first-order`, `ex-plot-first` (open, the book's answer with its image), `ex-second-order`, `ex-plot-second` (open, with its image), `ex-zero-order`, `ex-half-life-first`, `ex-half-life-others`. Eighteen end-of-section items: nine keyed kept (fs-idp145037952, fs-idp27819360 with their key images; fs-idm81821952, fs-idm86787888, fs-idm110943344, fs-idp55838576, fs-idm84405632, fs-idp89138768, fs-idp157675232 with its key table), one unkeyed conceptual with an AI-marked approach (fs-idp11885680), eight unkeyed numerical left out and named (fs-idm81797520, fs-idp123052496, fs-idm71090800, fs-idm82644240, fs-idm22532944, fs-idm45932336, fs-idp120051200, fs-idm43018880). No PhET item. Nothing moves between sections.

## Left out

Objectives, summary, key equations and glossary go to the tables. Errata kept as printed: Example 12.8's "1/0.200 mol⁻¹" for 1/(0.200 mol L⁻¹); the glossary's "t_l/2" is the chapter's row "half-life of a reaction".

## Wanted at chapter level

- variables `[A]_0` → 12.4-first-order
- variables `[A]_t` → 12.4-first-order
- variables `t` → 12.4-first-order
- variables `t_half` → 12.4-half-life
- forms `eq-first-order-exponential` → 12.4-first-order
- forms `eq-first-order-integrated` → 12.4-first-order
- forms `eq-second-order-integrated` → 12.4-second-order
- forms `eq-zero-order-integrated` → 12.4-zero-order
- forms `eq-half-life-first` → 12.4-half-life-first
- forms `eq-half-life-second` → 12.4-half-life-second
- forms `eq-half-life-zero` → 12.4-half-life-zero
