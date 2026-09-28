# Plan: 11.4 Colligative Properties (m68783)

Written 2026-09-28 before the build and left for review, as `ch11/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

Five objectives, eleven numbered figures (11.18 to 11.28, 11.22 inside the de-icing note and 11.26 inside the reverse osmosis note), six unnumbered step diagrams, two tables (11.2, 11.3), eleven worked examples (11.3 to 11.13) with a Check Your Learning each, two boxed notes, forty-five end-of-section items (chapter exercises 26 to 70), one of which moves to 11.3.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `colligative` | Properties that depend on the number of solute particles | introduces `colligative-properties` |
| `molality` | Mole fraction and molality (the book's header; Examples 11.3 to 11.5) | introduces `molality-and-mole-fraction` |
| `vapor` | Vapor pressure lowering (the book's header; Figure 11.18, Example 11.6) | introduces `raoults-law`; uses `colligative-properties`, `molality-and-mole-fraction` |
| `distillation` | Distillation of solutions (the book's header; Figures 11.19, 11.20) | introduces `distillation`; uses `raoults-law` |
| `boiling` | Boiling point elevation (the book's header; Table 11.2, Examples 11.7, 11.8) | introduces `boiling-point-elevation`; uses `molality-and-mole-fraction` |
| `freezing` | Freezing point depression (the book's header; Figure 11.21, Example 11.9, the de-icing note with Figure 11.22) | introduces `freezing-point-depression` |
| `phase` | Phase diagram for a solution (the book's header; Figure 11.23) | uses `raoults-law`, `boiling-point-elevation`, `freezing-point-depression`; reinforces `colligative-properties` |
| `osmosis` | Osmosis and osmotic pressure of solutions (the book's header; Figures 11.24 to 11.27, Example 11.10, the reverse osmosis note) | introduces `osmotic-pressure` |
| `molar-mass` | Determination of molar masses (the book's header; Examples 11.11, 11.12) | introduces `molar-mass-from-colligative-properties`; uses `freezing-point-depression`, `osmotic-pressure` |
| `electrolytes` | Colligative properties of electrolytes (the book's header; Table 11.3, Figure 11.28, Example 11.13) | introduces `vant-hoff-factor`; uses `freezing-point-depression` |

## Figures

- sim-vapor-lowering · Figure 11.18 · raoults-law, colligative-properties · flow by animation and variation by slider: the book shows two frozen beakers with a few arrows; here water molecules leave the surface and return, the vapor above each liquid settles to a steady count, and adding urea to the right-hand beaker takes surface sites away from water and lowers that count in proportion to the mole fraction of water · moving, evaporation and condensation have a clock (continuous, the transport runs it) · solute particles (untyped count, 0 to 30 of 75 sites, default 15, which makes the mole fraction of the solvent 0.800 of Example 11.6) · headline "Water fills 80% of the surface sites of the solution, and 11 molecules are in the vapor above it against 14 above pure water." · strip beneath with the vapor counts of the two beakers as bars in `pressure`, a dashed tick at the count Raoult's law predicts · physical 3D, a particle picture (book rule): two closed tanks of water on a bench, pitch held between 2° and 70° so the bench is never seen from beneath, spin off since the molecules already move, views front and above · water as O and two H by `F.el`, urea CO(NH<sub>2</sub>)<sub>2</sub> as its heavy atoms C, O, N, N by `F.el` (the book's anonymous blue spheres given an identity, urea being the nonvolatile solute of Example 11.6's Check Your Learning); labels "pure water" and "aqueous solution" once per beaker, hover names on every molecule · readout P_solution = X_solvent P*_solvent with 23.7 torr, the value of the Check Your Learning
- fig-lab-distill · Figure 11.19 · distillation · kept photograph and diagram, the text points at it · photo
- fig-refinery · Figure 11.20 · distillation · kept photograph with its column diagram, the text points at it; the column's arrows are labels, not flow · photo
- fig-ex-steps-bp · unnumbered image (Ex02Steps) · boiling-point-elevation · kept as printed, a flow of boxes the steps below it follow (book rule: symbolic diagrams are 2D and a live version adds nothing) · figure row, no number
- fig-ex-steps-iodine · unnumbered image (EX03Steps) · the same reason · figure row, no number
- fig-rocksalt · Figure 11.21 · freezing-point-depression · kept photograph · photo
- fig-ex-steps-fp · unnumbered image (Ex04Steps) · figure row, no number
- fig-deice · Figure 11.22 · freezing-point-depression · kept photograph inside the note · photo
- sim-phase-diagram · Figure 11.23 · raoults-law, boiling-point-elevation, freezing-point-depression, vant-hoff-factor · variation by slider and choice (BE INSPIRING): the book draws one solution with no numbers; here the molality slider and the solute choice move the dashed curves live, the liquid–vapor curve down by Raoult's law and the solid–liquid line left, with ΔT_f, ΔT_b and ΔP bracketed at 1 atm and at 100 °C; choosing NaCl or CaCl<sub>2</sub> at the same molality multiplies every effect by i, the reader seeing that only the number of particles counts · still, the diagram answers its controls · m (concentration, 0 to 3.00 m, default 1.00, detent at 1.00), solute (a choice of sucrose, NaCl, CaCl<sub>2</sub>, i = 1, 2, 3 predicted; sucrose by default) · headline "A 1.00 m solution of sucrose freezes at −1.86 °C and boils at 100.51 °C." · the graph alone: temperature −30 to 110 °C by 20, pressure on a logarithmic axis 0.001 to 2 atm so the triple point and the 1 atm line both show; water's curves by Clausius–Clapeyron with ΔH_vap = 40.7 kJ/mol (which reproduces K_b = 0.512 °C/m) and ΔH_sub = 46.7 kJ/mol; solid for the solvent, dashed for the solution, as the book draws them, both in ink with the axes in `temperature` and `pressure`; regions named solid, liquid, gas in ink · 2D, a graph (book rule) · readout ΔT_f = iK_f m with the live numbers, note line ΔT_b and ΔP
- fig-osmosis · Figure 11.24 + 11.25 · osmotic-pressure · flow by animation and variation by slider: the book draws the start, the end and the reversed case separately; here the solution's column rises as water crosses the membrane until the height difference balances the osmotic pressure, and a pressure applied to a piston over the solution holds it back or, past Π, drives water the other way · moving, the columns move toward equilibrium over time and the water molecules cross the membrane (osmosis has a clock), the transport runs it · M (concentration, 0 to 0.50 M, default 0.30, Example 11.10's glucose), applied pressure (pressure, 0 to 15 atm, default 0, dashed circle at Π labelled "Π") · headline "Water crosses into the 0.30 M glucose solution until its column stands 7.6 atm higher." · strip beneath: the height difference read as pressure against Π, bars in `pressure` · physical 3D, an apparatus (book rule): a U-tube with a membrane at its base on a stand and bench, pitch held between 2° and 70°, spin off, views front and above; the true column for 7.6 atm is about 78 m of water, so the heights are drawn at about 1 cm per atm, about 1000 times shorter, and the readout states the true height and the factor (root rule 28.4) · water as O and two H by `F.el`, glucose as a ring of C and O by `F.el`, hover names; T fixed at 310 K (37 °C) as in Example 11.10; kind `sim` with the number, id `sim-osmosis`
- fig-waterpur · Figure 11.26 · osmotic-pressure · kept photograph inside the note · photo
- sim-red-cells · Figure 11.27 · osmotic-pressure · variation by slider: the book shows three states; here the osmotic pressure of the surrounding solution sweeps through them and the cell swells, holds its shape, or shrivels, with the isotonic value of blood serum, 7.7 atm, marked · still, the cell answers the slider (the equilibrium shape; no clock) · Π outside (pressure, 0 to 16 atm, default 7.7, dashed circle at 7.7 labelled "isotonic") · headline "At 7.7 atm the solution is isotonic with the cell, which keeps its normal volume and shape." · no graph; a strip beneath with the two osmotic pressures · 2D, the book draws the cells flat and their shape in the plane is the lesson · the cell's red is the physical fact, a named constant CELL_RED; the membrane in ink; labels "hypotonic", "isotonic", "hypertonic" on the slider's track as the regions, "water in" or "water out" as ink text, no arrows (flow arrows would be kinematic)
- fig-ex-steps-mm-fp · unnumbered image (Ex07Steps) · figure row, no number
- fig-ex-steps-mm-osm · unnumbered image (Ex08Steps) · figure row, no number
- sim-ion-pairs · Figure 11.28 · vant-hoff-factor · shape in 3D and variation by slider: the book draws one moment of a KCl solution; here the reader dilutes it and sees the hydrated ions spread apart and the ion pairs come apart, with the count of independent particles giving i · still, the box answers its slider (no clock: the idea is a dependence on concentration) · m (concentration, 0.01 to 1.00 m, logarithmic steps by detents at 0.01, 0.05, 0.2, 1.0; default 0.05, the molality of Table 11.3) · headline "At 0.050 m, one of the eight formula units is an ion pair, so the solution holds 15 particles for 8 formula units." · strip beneath: particles against formula units · physical 3D, a particle picture (book rule): a box of solution, free yaw, pitch between −30° and 80°, spin idle, views front and above; the box edge grows as m^(−1/3) so the spacing of the ions is honest to the concentration; the share of pairs is illustrative and set so 0.050 m gives i near 1.9, the measured value Table 11.3 gives NaCl, which the caption says · K and Cl by `F.el`, a shell of four water molecules around each free ion, O toward K<sup>+</sup> and H toward Cl<sup>−</sup>; labels K<sup>+</sup>, Cl<sup>−</sup> and "ion pair" once each, hover names on all · readout i = particles / formula units
- fig-ex-steps-electrolyte · unnumbered image (Ex09Steps) · figure row, no number

Extra simulations: none beyond the above; the folded 11.24 + 11.25 and the live phase diagram carry the chapter's BE INSPIRING line together (one molality, every colligative effect).

## Tables

Table 11.2 (the book's `º` in its headers written `°`) and Table 11.3 (its title's "Predicated" kept as printed) in the text as `div.book-table`. The Key Equations table is not printed.

## Types bound

`concentration` (m, M, the molality and molarity sliders), `pressure` (P_solution, P*, ΔP, Π, the pressure axis and bars), `temperature` (ΔT_b, ΔT_f, T, the temperature axis). Mole fractions, K_b, K_f, i, R, counts stay ink; atoms `F.el`; the red cell is a physical colour. No clock is drawn as a quantity, so `time` is not bound.

## Exercises

Eleven Check Your Learning items inline after Examples 11.3 to 11.13, hosts `ex-mole-fraction`, `ex-convert`, `ex-molarity`, `ex-vapor`, `ex-boiling`, `ex-iodine`, `ex-freezing`, `ex-osmotic`, `ex-mm-freezing`, `ex-mm-osmotic`, `ex-electrolyte`. Forty-five end-of-section items: twenty-one keyed kept here (fs-idp128725184 moves to 11.3 with `source_section: "11.4"`), six unkeyed conceptual with an AI-marked approach (fs-idp102655040, fs-idp134512208, fs-idp135093440, fs-idp189091568, fs-idm56693456, fs-idp128680064), seventeen unkeyed numerical left out and named. fs-idm4591712's key uses K_f = 5.14 against Table 11.2's 5.12, carried as printed.

## Left out

Nothing of the prose. Errata kept as printed: Example 11.3's C<sub>2</sub>H<sub>2</sub>(OH)<sub>2</sub> once for ethylene glycol, "electroyte", Table 11.3's "Predicated", and its HCl row reading H<sub>3</sub>O<sup>+</sup> where its summary reads H<sup>+</sup>.

## Wanted at chapter level

- variables `M` → 11.4-molality
- variables `X_A` → 11.4-molality
- variables `m_molal` → 11.4-molality
- variables `P_A` → 11.4-vapor
- variables `P_A*` → 11.4-vapor
- variables `P_i` → 11.4-vapor
- variables `P_i*` → 11.4-vapor
- variables `X_i` → 11.4-vapor
- variables `P_solution` → 11.4-vapor
- variables `P_solvent*` → 11.4-vapor
- variables `X_solvent` → 11.4-vapor
- variables `ΔP_vp` → 11.4-phase
- variables `ΔT_b` → 11.4-boiling
- variables `K_b` → 11.4-boiling
- variables `ΔT_f` → 11.4-freezing
- variables `K_f` → 11.4-freezing
- variables `Π` → 11.4-osmosis
- variables `R` → 11.4-osmosis
- variables `T` → 11.4-osmosis
- variables `i_vh` → 11.4-electrolytes
- equations `eq-mole-fraction` → 11.4-molality
- equations `eq-molality` → 11.4-molality
- equations `eq-raoults-law` → 11.4-vapor
- equations `eq-raoult-total` → 11.4-vapor
- equations `eq-raoult-nonvolatile` → 11.4-vapor
- equations `eq-boiling-point-elevation` → 11.4-boiling
- equations `eq-freezing-point-depression` → 11.4-freezing
- equations `eq-osmotic-pressure` → 11.4-osmosis
- equations `eq-vant-hoff-factor` → 11.4-electrolytes
- `config.md`: the six unnumbered step diagrams of 11.4's examples are kept as figure rows with no number.

Applied by the chapter pass (2026-09-28): all twenty variables and nine equations anchored as listed, through `ost set`; `config.md` records the six unnumbered step diagrams. The osmosis figure's water and solution labels now stand beside the tubes, and the scene is lowered so the tube tops stay in frame.
