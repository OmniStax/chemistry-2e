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

- sim-order-plots · Figure 12.9 + 12.10 + 12.11 · order-from-linear-plots, first-order-integrated-rate-law, second-order-integrated-rate-law, zero-order-integrated-rate-law · standardisation and variation by choice: the book plots each data set only the way that comes out straight (12.10 two ways); here each data set is plotted all three ways side by side, [A], ln[A] and 1/[A] against t, each panel headed by the order it tests and the answer ("first order?  a straight line", "zero order?  curved"); through the points runs the curve of the reaction's own rate law, as the book draws a curve through the points of 12.10 and 12.11, and a chord from the first point to the last, so in two panels the curve bows away from the dashed chord and in one the points lie on it; that chord is solid in `rate-constant`, its slope read as k as the book reads it · arrows: none · still, the data are measured at fixed times and the lesson is the shape of a plot, so no clock · choice data set (H₂O₂, C₄H₆, NH₃), default H₂O₂ (Example 12.7); a change fades the old points and axes out and the new in, the three frames staying · headline "Only ln[H₂O₂] against t is a straight line, so the decomposition is first order." (one per data set) · graph alone, three panels in a row, the graph is the idea · 2D, graphs (book rule) · readout the book's two-point slope: k = −slope = −(−2.772 − 0.000)/(24.00 h − 0.00 h) = 0.116 h⁻¹, and Examples 12.9 and 12.10 for the others; for ammonia a second line reads k on quartz from the ln plot the same way (1.38 × 10⁻³ s⁻¹), so both straight panels carry their k; no note · a single series wears `concentration` in the [A] panel and ink in the ln[A] and 1/[A] panels (chapter `COLOR.md`); the tungsten and quartz series wear their referents' colours in every panel, named once beside their last point in the [A] panel; dashed chords in muted ink; hover names every point with its time and value, and each chord · ammonia read off Figure 12.11 and set on the lines the text names: on tungsten from 2.80 × 10⁻³ M at 1.3 × 10⁻⁶ M s⁻¹ (Example 12.10), on quartz first order with k = 1.384 × 10⁻³ s⁻¹, the value 12.1's Figure 12.5 uses, through the book's points within the drawing · axes per data set from the data: H₂O₂ 0 to 24 h, [A] 0 to 1 M, ln −3 to 0, 1/[A] 0 to 20 M⁻¹; C₄H₆ 0 to 6400 s, [A] 0 to 10 × 10⁻³ M, ln −6.5 to −4.5 (the book's range), 1/[A] 0 to 500 M⁻¹; NH₃ 0 to 1000 s, [A] 0 to 3 × 10⁻³ M (the book's axis), ln −7.5 to −5.5, 1/[A] 0 to 1600 M⁻¹; the small concentrations are written in 10⁻³ M
  works: read off the images: 12.9 ln[H₂O₂] 0 to −2.77 over 0 to 24 h by 6, five points on one line; 12.10 ln[C₄H₆] −4.605, −5.289, −5.692, −5.978, −6.175 on a curve that bows below its chord (axis −4 to −6.5), 1/[C₄H₆] 100, 198, 296, 395, 481 M⁻¹ on a line (axis 100 to 500), times 0, 1600, 3200, 4800, 6200 s; 12.11 [NH₃] from about 2.75 × 10⁻³ M (the text's 0.0028), on W points at 0, 200, 400, 600, about 820 and 1000 s falling straight to 1.5 × 10⁻³, on SiO₂ points at 0, 100, 200, 300, 400, 500, about 720 and 1000 s curving to about 0.72 × 10⁻³ (model 0.70), labels "Decomposition on W", "Decomposition on SiO₂". must hold: (1) in each data set exactly the book's straight panel has its points on the solid chord, and its heading says so; (2) every drawn curve passes through its points; (3) the readout's numbers are the examples'. Reviewed 2026-11-14: kept; caption cut; quartz's k added to the readout. Second pass 2026-11-16: the panels' order names were small grey words under the axes and nothing said which test a panel made, so each panel is now headed by its question and answer; the rate-law curves are drawn so the bow away from the chord is seen, not inferred from five dots; axes tightened to the data and the small concentrations written in 10⁻³ M. The fold stays: the three book figures are one test met three times, and the choice sets the three outcomes side by side.
- sim-half-lives · Figure 12.12 · half-life, half-life-by-order, first-order-integrated-rate-law · flow by animation and variation by choice: the book prints five beakers, each half as concentrated as the one before, with the times beneath; here one sample is followed from half to half as a clock runs: the beaker under way holds the live sample and its live concentration, and when the sample reaches half the beaker is left as it is and its time is written under it, so the times are what the reader waits for; the concentration curve draws out below with a bracket over each half-life. A choice of order with the same first half-life (6.00 h from 1.000 M) leaves the five concentrations as they are and changes the times: 6, 12, 18, 24 h (first order, the book's figure), 6, 18, 42, 90 h (second order, half-lives 6, 12, 24, 48 h), 6, 9, 10.5, 11.25 h (zero order, half-lives 6, 3, 1.5, 0.75 h): Table 12.2's half-life row seen · arrows: none (the book draws none) · moving, the idea is a concentration falling through time; the transport crosses the order's time axis in 6 s and holds · choice order (zero, first, second), default first; a change restarts the clock · headline "Every half-life lasts 6.00 h, however much H₂O₂ is left." (one per order) · scene above graph, the beakers a horizontal row · 2D, the beakers of 12.12 flat (chapter `COLOR.md` and exploration) · readout Table 12.2's half-life for the half-life under way, [A]₀ the concentration it starts from (a clock drives it, so it never highlights): t₁/₂ = 0.693/k = 0.693/(3.21 × 10⁻⁵ s⁻¹) = 2.16 × 10⁴ s, the same all the way (Example 12.11 read the other way); t₁/₂ = 1/(k[A]₀) with k = 4.63 × 10⁻⁵ M⁻¹ s⁻¹; t₁/₂ = [A]₀/2k with k = 2.315 × 10⁻⁵ M s⁻¹ (four figures, so that every half-life worked out from the numbers shown is the one drawn); no note · the tint is an opacity of the `concentration` hue (chapter `COLOR.md`: H₂O₂ is colourless and the book's green is no fact); each stamped beaker carries the book's three lines beneath it, the beaker under way only its live concentration, the ones not yet begun stand empty and faint with a hover name; brackets in `time` labelled with their lengths · time axis fixed per order to hold four half-lives, 0 to 24 h, 0 to 96 h, 0 to 12 h; [A] 0 to 1.25 M; the axis is [H₂O₂] for the first-order run and [A] for the other two, which are no reaction of H₂O₂
  works: parts: five beakers in a row (straight walls, rounded foot, flared rim with a spout), the liquid's tint the concentration · flow: none in the book; here the clock carries the sample from each half to the next · read off the image: 1.000 M, 0 s (0 h); 0.500 M, 2.16 × 10⁴ s (6 h); 0.250 M, 4.32 × 10⁴ s (12 h); 0.125 M, 6.48 × 10⁴ s (18 h); 0.0625 M, 8.64 × 10⁴ s (24 h); the book's green is a stand-in (H₂O₂ is colorless). must hold: (1) every number under a beaker is true of what is drawn in it, and a time appears only once the sample has reached that half; (2) at the end of a first-order run the five beakers and their labels are the book's; (3) each bracket spans exactly from one half to the next (6, 6, 6, 6 h; 6, 12, 24, 48 h; 6, 3, 1.5, 0.75 h) and its end sits over the hollow point on the curve; (4) the readout's result is the length of the half-life under way. Second pass 2026-11-16, rebuilt: the beakers stood at the book's five times in every order, so a second- or zero-order run showed arbitrary concentrations (0.333 M, 0.200 M, three empty beakers) and only two half-lives fitted the 24 h axis; the readout was the integrated rate law, which says nothing of a half-life. Now the beakers are the five halvings in every order and the times beneath them are what changes, each order's axis holds four half-lives, and the readout is the half-life itself.

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

Applied by the chapter pass (2026-10-05): all eleven anchors set as listed, and the forms' k written `\kk`.

## Derivations

- First-order reactions, the integrated rate law · score 9 · not built: the integration of d[A]/[A] rests on calculus the book never states
- Second-order reactions, the integrated rate law · score 7 · not built: stated, and its integration rests on calculus the book never states
- Zero-order reactions, the integrated rate law · score 6 · not built: stated, and its integration rests on calculus the book never states
- The half-life of a reaction, first-order reactions · score 1 · built as drv-half-life-first-order
- The half-life of a reaction, second-order reactions · score 0 · built as drv-half-life-second-order
- The half-life of a reaction, zero-order reactions · score 0 · built as drv-half-life-zero-order
