# Plan: 15.1 Precipitation and Dissolution (m68811)

Written 2026-10-05 before the build and left for review, as `ch15/config.md` records (applied as proposed, without check-ins).

Two objectives, five numbered figures (15.2 to 15.6), four unnumbered ICE-table images, no numbered table, thirteen worked examples (15.1 to 15.13) each with one Check Your Learning, sixty end-of-section items (Exercises 15.1 to 15.60), two boxed notes, one Link to Learning, four glossary entries, one key equation.

## Sub-concepts and spans

The book's four headers are kept; the section's own introduction opens the first block.

| Span | Header | Concepts |
|---|---|---|
| `solubility-product` | The Solubility Product (the introduction, the AgCl equilibrium, Figure 15.2, Example 15.1) | introduces `solubility-product`, `write-ksp-expression`; uses `solubility-and-saturation`, `saturated-solution`, `chemical-equilibrium`, `homogeneous-and-heterogeneous-equilibria`, `equilibrium-constant`, `dissociation-of-ionic-compounds` |
| `ksp-solubility` | K_sp and Solubility (Examples 15.2 to 15.6, Figure 15.3, the barium sulfate note with Figure 15.4) | introduces `molar-solubility`, `ksp-from-solubility`, `molar-solubility-from-ksp`; uses `ice-change-terms`, `molarity`, `mass-mole-conversion`; reinforces `solubility-product` |
| `precipitation` | Predicting Precipitation (Examples 15.7 to 15.11, Figure 15.5, selective precipitation, the wastewater note with Figure 15.6, the Sim) | introduces `qsp-versus-ksp`, `precipitation-concentration`, `selective-precipitation`; uses `reaction-quotient`, `predict-direction-q-versus-k`, `dilution-equation`, `ph-calculations`, `supersaturated-solutions` |
| `common-ion` | Common Ion Effect (Examples 15.12 and 15.13) | introduces `common-ion-effect`; uses `le-chateliers-principle`, `concentration-stress`, `small-x-approximation`, `solubility-product` |

## Figures

- sim-agcl · Figure 15.2 · solubility-product, saturated-solution · flow by animation and 3D: the book's two still beakers say in words that the solid dissolves and the ions precipitate "at the same rate"; here ion pairs leave the lattice at a steady rate while dissolved ions return at a rate that grows with their number, until the two rates match and the count in solution holds, which the reader sees rather than reads; the particle picture is 3D by the book's rule · arrows: symbolic (the book's equilibrium arrow between the beakers; no arrow of motion) · moving: a clock of 6 s from freshly added solid to saturation, ions leaving and returning on a deterministic schedule (dissolution at 2.5 pairs per unit time, return at k n² with n settling at 4 pairs), so the timeline scrubs exactly; dissolution and precipitation have a time in them · no sliders or choices: nothing about the salt is variable in the book's figure, and a choice of salt would draw the same picture with other numbers · headline "Ag⁺ and Cl⁻ ions leave the solid faster than they return." until saturation, then "Ions now leave the solid and return to it at the same rate: the solution is saturated." · strip beneath (a flat canvas): the counts of ion pairs dissolved and returned so far against time, two step lines that run parallel once saturated, the bracket between them the pairs in solution, and a legend naming Ag⁺, Cl⁻ and water once each (three entity kinds; no label on a moving ion, hover names each) · readout $\kKsp = [\text{Ag}^{+}][\text{Cl}^{-}] = (1.26 \times 10^{-5})(1.26 \times 10^{-5}) = 1.6 \times 10^{-10}$, the saturated solution's true numbers, not clock-driven; note "A saturated solution holds one Ag⁺ ion for every 4.4 million water molecules; the beaker draws one for every five." (root rule 28.4: the scene exaggerates the dissolved amount and the note gives the factor) · physical 3D: a glass beaker of water on a bench, a rock-salt block of 24 Ag⁺ and 24 Cl⁻ at the bottom (ionic radii 1.15 and 1.81 Å scaled 0.9, edge 5.55 Å), 22 water molecules, pitch 0.05 to 1.2 rad above level so the bench is never seen from beneath, views front and above, spin off since the ions move, zoom by buttons and wheel · draws `equilibrium-constant`, `concentration` (the readout; counts and time on the strip are untyped and unscaled); conventions Ag, Cl, O, H; no facts
- fig-oil-paints · Figure 15.3 · kept photograph; Example 15.5 points at it · photo
- fig-barium-xray · Figure 15.4 · kept photograph; the note and Exercise 15.22 point at it · photo
- fig-blood · Figure 15.5 · kept photograph; Example 15.9 and Exercise 15.48 point at it · photo
- fig-wastewater · Figure 15.6 · kept photograph; the note points at it · photo
- sim-ksp-plane · Sim · qsp-versus-ksp, precipitation-concentration, selective-precipitation, common-ion-effect · variation by slider: the dropped Link to Learning's simulation is the trigger; the book compares Q_sp with K_sp one example at a time, and here every mixture of silver and halide ions is a point on one logarithmic plane where the K_sp line divides clear solution from precipitate, so "precipitation begins", "precipitation continues until Q_sp = K_sp", "the salt that forms at the lower [Ag⁺] precipitates first" and "an increase in one ion's concentration must be balanced by a proportional decrease in the other" are all seen as a point crossing or sliding along a line · arrows: none · still: the comparison of Q_sp with K_sp has no clock; the sliders are the lesson · choice mixture (AgCl · AgCl and AgBr, default AgCl; each sets the sliders to its example's numbers); slider [Ag⁺] (`concentration`, a logarithmic track 10⁻¹² to 10⁻² M, value box in scientific notation, dashed circles where AgCl and, with two salts, AgBr begin to precipitate); slider [Cl⁻] (`concentration`, 10⁻¹⁰ to 10⁰ M, a dashed circle at saturation); slider [Br⁻] (`concentration`, 10⁻¹⁰ to 10⁰ M, a dashed circle at saturation, shown with two salts only) · defaults Example 15.8 after mixing ([Ag⁺] = [Cl⁻] = 1.0 × 10⁻⁴ M) and Example 15.11 ([Ag⁺] = 1.0 × 10⁻⁹ M, [Cl⁻] = 0.10 M, [Br⁻] = 1.0 × 10⁻⁴ M) · topline, one salt: "Q_sp is 63 times K_sp, so AgCl precipitates until [Ag⁺] and [Cl⁻] fall to 1.3 × 10⁻⁵ M." (or "no precipitate forms"); two salts: "AgCl begins to precipitate at [Ag⁺] = 1.6 × 10⁻⁹ M, before AgBr at 5.0 × 10⁻⁹ M." · graph alone, the plane is the idea: x log[Ag⁺] 10⁻¹² to 10⁻² M, y log[X⁻] 10⁻¹² to 10⁰ M, both axes `concentration`, fixed; AgCl line slope −1 at K_sp = 1.6 × 10⁻¹⁰, AgBr line at 5.0 × 10⁻¹³; the region above each line faintly shaded; one salt: the line in `equilibrium-constant`, the mixture a point, hollow above the line with a dashed path along which precipitation removes equal amounts of both ions to the filled equilibrium point on the line; two salts: each line in its referent's colour (referents `agcl`, `agbr`), a point per salt on the vertical through [Ag⁺], filled once its salt precipitates, and a dashed drop from each line at the halide's level to the [Ag⁺] axis where that salt begins; labels: each line named once near its lower right end, stepping clear of the points, the shaded side named once ("precipitate"), points by hover; nothing pinned, every slider state lies inside the box · readout, one salt $\kQsp = [\text{Ag}^{+}][\text{Cl}^{-}] = (a)(b) = q \gtrless \kKsp$, two salts the first salt's threshold $[\text{Ag}^{+}] = \kKsp/[\text{X}^{-}] = \dots$ with the live numbers, highlighted as they change; no note, the headline names the other salt · 2D, a graph (book rule) · draws `concentration`, `equilibrium-constant`; no conventions, no facts

The four ICE tables of Examples 15.3, 15.4, 15.6 and 15.13 (`ICETable1`, `ICETable7`, `ICETable2`, `ICETable3`) are tables, written in the text as unnumbered `div.book-table` where the book prints them, read from the images; no image is copied.

Extra simulations: none. A choice of salt in Figure 15.2 would draw the same lattice with other numbers; the 1:2 salts of Examples 15.4 and 15.6 differ from AgCl only by a slope the readout already writes.

## Tables

The four ICE tables above, none numbered. The answer arrays of Example 15.1 and its Check Your Learning, and of Exercises 15.1 and 15.2, are the book's math arrays, kept as math.

## Types bound

`equilibrium-constant` (K_sp and Q_sp through `\kKsp` and `\kQsp`, the book's tables giving them macros; given and calculated K_sp values; the Sim's one-salt line), `concentration` (ion concentrations and molar solubilities as values, pH and pOH through `\kpH` and `\kpOH`, `[OH⁻]` through `\kconcOH`; the Sim's sliders and axes), `mass` (gram solubilities and grams dissolved), `volume` (the volumes mixed), `temperature` (20 °C). x stays ink, as do specific ions written `[\text{Ag}^{+}]`, which have no symbol rows.

## Referents

`agcl` and `agbr`, the two silver salts of Example 15.11, one line each on the Sim's plane in its two-salt state; the text marks them in Example 15.11 and the Sim's caption. Figure 15.2's ions take the element palette (convention wins), so the salt and its ions are not referents.

## Exercises

Thirteen Check Your Learning items inline, cyl1 to cyl13, one per example, each with its host `data-place` on the example's id.

Forty end-of-section items: thirty keyed of Exercises 15.1 to 15.60 kept (the odd numbers); five unkeyed conceptual kept with an AI-marked approach (Exercises 15.2, 15.4, 15.6, 15.8, 15.18); two unkeyed choice items kept open with their options (15.12, 15.46); twenty-two unkeyed numerical left out and named in `exercise_notes`; Exercise 15.56 (fs-idp2894848), a simulation-exercise on the PhET salts simulation, held, since the Sim draws AgCl and AgBr and not CaF₂ with a choice of soluble salt. Moved in, each with `source_section` and a note in both sections: Exercise 15.62 (fs-idp46388832, keyed, from 15.2), 15.85 (fs-idm301808, unkeyed conceptual, from 15.3), 15.101 (fs-idp11595856, keyed AP MgF₂, from 15.3). Errata kept as printed: the key of Exercise 15.17 writes [Ti⁺] for [Tl⁺] and [C₂)₄²⁻] in (d); Exercise 15.19 asks about Exercise 15.18, which itself refers to 15.17; the key of Exercise 15.59 ends "K_sp value." twice; Exercise 15.2 leaves "(b" unclosed.

## Left out

Objectives, the summary, the key equation and the glossary go to the tables. The Link to Learning (the soluble-salts simulation) and the closing "Visit this website" and "View this site" sentences of the two notes are dropped and named in `notes`. Kept as printed: "Le ChÂtelier’s" (so in the CNXML), Example 15.1 (e) "(PO₄)3OH", Example 15.10 "log(3.3 × 10-4)", the barium note's "10.08 × 10⁻¹⁰", the wastewater note's "Ca₅(PO4)₃OH".

## Wanted at chapter level

- forms `eq-ksp` → 15.1-ksp-solubility
- variables `K_sp`, `[M^m+]`, `[X^n-]`, `p_stoich`, `q_stoich` → 15.1-ksp-solubility; `Q_sp` → 15.1-precipitation; `x_ice` → 15.1-ksp-solubility
- concept `molar-solubility`: give it `"type": "concentration"`, since every molar solubility the section names is a concentration in M (the page marks the values with `data-type="concentration"` meanwhile)
- `ch15/COLOR.md` and `notes/chemistry-2e-ch15.md`: K_sp and Q_sp carry macros (`\kKsp`, `\kQsp`) and their concepts the `equilibrium-constant` type, so the page colours them, against the notes' "no `\k` on any K, Q or x" and config's "every K_sp … in ink"
