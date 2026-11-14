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

- sim-vapor-lowering · Figure 11.18 · raoults-law, colligative-properties · flow by animation and variation by slider: the book shows two frozen flasks with a few arrows; here water molecules leave the surface and return, the vapor above each flask settles, and urea taking surface places lowers the solution's in proportion to the mole fraction of water · arrows: kinematic in the book (molecules leaving and returning); here the molecules fly · moving, evaporation and condensation have a clock (continuous, the transport runs it) · slider X_solvent (untyped, 0.500 to 1.000 by 0.025, default 0.800, Example 11.6's Check Your Learning) · headline "Urea holds 20% of the surface, so 20% fewer water molecules escape and the vapor settles 20% lower." · each flask's vapor pressure beside its neck, a key for water and urea · 2D, rebuilt flat on 2026-11-14 from the book's image: the 3D tanks were not the book's flasks, their molecules hid one another, and turning showed nothing (book rule, particle pictures). Water as O and two H by `F.el`, urea CO(NH₂)₂ with every atom (the book's anonymous blue spheres given an identity). Readout P_solution = X_solvent P*_solvent with 23.7 torr.
  works: parts: two stoppered Erlenmeyer flasks side by side, the same depth of liquid in each; (a) pure water, (b) water with urea in the liquid · flow: water molecules leave the surface from places water holds, fly, turn at the glass and the stopper, and return to the liquid at their next strike on its surface · must hold: (1) no molecule leaves the glass or passes the stopper; (2) urea never leaves the liquid; (3) urea holds the same share of every row, so its share of the surface is 1 − X; (4) departures per second in proportion to water's surface places, returns as they come, so the solution's vapor settles at X times the pure water's; (5) the two vapor pressures shown are 23.7 torr and X × 23.7 torr · read off the image: "(a) Pure water", "(b) Aqueous solution"; cork stoppers; in (a) about 14 molecules in the vapor and arrows up and down at the surface, in (b) about 8 and fewer arrows up; solute drawn as large blue spheres among the water in (b).
- fig-lab-distill · Figure 11.19 · distillation · kept photograph and diagram, the text points at it · photo
- fig-refinery · Figure 11.20 · distillation · kept photograph with its column diagram, the text points at it; the column's arrows are labels, not flow · photo
- fig-ex-steps-bp · unnumbered image (Ex02Steps) · boiling-point-elevation · kept as printed, a flow of boxes the steps below it follow (book rule: symbolic diagrams are 2D and a live version adds nothing) · figure row, no number
- fig-ex-steps-iodine · unnumbered image (EX03Steps) · the same reason · figure row, no number
- fig-rocksalt · Figure 11.21 · freezing-point-depression · kept photograph · photo
- fig-ex-steps-fp · unnumbered image (Ex04Steps) · figure row, no number
- fig-deice · Figure 11.22 · freezing-point-depression · kept photograph inside the note · photo
- sim-phase-diagram · Figure 11.23 · raoults-law, boiling-point-elevation, freezing-point-depression, vant-hoff-factor · variation by slider and choice: the book's sketch is one solution; here the molality and the solute set every gap at once · arrows: symbolic (brackets) · still, the diagram answers its controls · m (concentration, 0 to 2.00 m, detent 1.00), solute choice sucrose/NaCl/CaCl₂ (default NaCl, as on the de-icing road of Figure 11.22) · headline "A 1.00 m solution of NaCl freezes at −3.72 °C and boils at 101.02 °C." · the diagram alone · 2D. Rebuilt 2026-11-14 as the book's own sketch: the true-scale log-pressure diagram with an inset left ΔT_f a few pixels wide and read as a different figure from the book's; now linear pressure to 1 atm, no temperature scale (the book has none), the four points marked on the axis with their values, the shifts ΔT_f and ΔT_b drawn to one scale (24 units per °C) so their ratio K_f/K_b = 3.6 stays honest, the solution's liquid–vapor curve below water's everywhere and its triple point on the unmoved solid–gas curve; the band where the solution is still liquid and water is not lightly tinted. Readout ΔT_f = iK_f m and ΔT_b = iK_b m, two lines.
  works: read off the image: regions Solid, Liquid, Gas; "1 atm" the top line; water's curves solid, the solution's dashed; ΔT_f and ΔT_b as arrows on the 1 atm line, ΔP as a vertical arrow between the liquid–vapor curves; four marks under the axis, "Freezing point of solution", "Freezing point of pure solvent", "Boiling point of pure solvent", "Boiling point of solution"; the solution's triple point left of and below the solvent's, on the solid–gas curve; no numbers · must hold: (1) the dashed solid–liquid line meets 1 atm ΔT_f left of water's, the dashed liquid–vapor curve ΔT_b right; (2) ΔT_f/ΔT_b = 1.86/0.512 on the drawing at every setting; (3) the dashed liquid–vapor curve lies below water's at every temperature; (4) the solid–gas curve never moves; (5) the marks show 0 °C, 100 °C and the live values.
- sim-osmosis · Figure 11.24 + 11.25 · osmotic-pressure · flow by animation and variation by slider: the book draws the start, the end and the reversed case separately; here the solution's column rises as water crosses the membrane until the height difference balances the osmotic pressure, and a pressure on a piston over the solution holds it back or, past Π, drives water the other way · arrows: kinematic in the book (molecules crossing the membrane); here water molecules cross, more of them toward the side the water moves to · moving, the columns relax toward equilibrium over a 6 s clock (osmosis has a clock), the transport runs it · M (concentration, 0 to 0.50 M, default 0.30, Example 11.10's glucose), applied pressure (pressure, 0 to 15 atm, default 0, dashed circle at Π labelled "Π") · headline "The flow stops when the solution’s column stands 7.6 atm higher: its osmotic pressure." · 2D, rebuilt flat on 2026-11-14 from the book's image: the 3D U-tube was small, its labels covered it, and turning showed nothing; the true column for 7.6 atm is 78 m of water, so heights are drawn at 8 units per atm, about 1000 times shorter, which the figure states (root rule 28.4). Water as O and two H by `F.el`, glucose as its ring of five C and one O; T fixed at 310 K (37 °C) as in Example 11.10.
  works: parts: a U-tube, pure water in the left arm, the solution in the right, a semipermeable membrane across the bottom of the U; a piston on the solution when a pressure is applied · flow: water molecules cross the membrane both ways; the left column falls as the right one rises by the same amount · must hold: (1) glucose stays right of the membrane; (2) the levels start equal and the difference relaxes to Π − P_applied; (3) the two columns move by equal and opposite amounts; (4) past Π the pure water's column ends higher; (5) more crossings toward the side the water is moving to, equal numbers at rest · read off the image: (a) equal levels, "Pure solvent", "Solution", "Semipermeable membrane" under the bottom, arrows both ways at the membrane, more to the right; (b) the solution's column higher, "Osmotic pressure" between two dashed levels; Figure 11.25: a piston on the solution under "Pressure greater than Π_solution", arrows leftward through the membrane. Solvent small gold spheres, solute large blue ones in the book; ours by element.
- fig-waterpur · Figure 11.26 · osmotic-pressure · kept photograph inside the note · photo
- sim-red-cells · Figure 11.27 · osmotic-pressure · flow by animation and variation by slider: the book shows three end states with arrows for the water; here the reader sets the solution's osmotic pressure and watches the cell take in or lose water until the rates match, or burst · arrows: kinematic in the book (the H₂O arrows); here water molecules travel along the two arrows, more on the faster one · moving: the cell's volume relaxes over a 5 s clock from the moment it is put in · Π_solution (pressure, 0 to 16 atm, default 4.0, dashed circle at 7.7 labelled "isotonic") · headline "In a hypotonic solution more water enters than leaves, and the cell swells." · 2D. Rebuilt 2026-11-14: the still cell showed only an end shape with no water and no time; now the process, with the inside's osmotic pressure and the volume beside the cell. V/V₀ = 0.4 + 0.6 × 7.7/Π_solution (a share of the cell takes no part in osmosis), bursting past 1.6 (Π below 4.6 atm). CELL_RED is a physical fact.
  works: parts: one red cell seen face on, its central dimple; two curved arrows, H₂O in over the top, out underneath · flow: water molecules along the arrows, inward at a rate in proportion to the inside's osmotic pressure, outward to the solution's · must hold: (1) at 7.7 atm the rates are equal from the start and nothing changes; (2) below it the cell swells, losing its dimple, and the inside's pressure falls until it equals the solution's, or the cell bursts past V/V₀ = 1.6; (3) above it the cell shrinks and crumples; (4) the arrow with more molecules is the faster flow · read off the image: (a) a large round cell, a thick arrow in and a thin one out, a cell bursting in the dish below; (b) equal arrows, normal biconcave cells; (c) a crumpled cell, a thick arrow out; the dishes of cells below are not drawn.
- fig-ex-steps-mm-fp · unnumbered image (Ex07Steps) · figure row, no number
- fig-ex-steps-mm-osm · unnumbered image (Ex08Steps) · figure row, no number
- sim-ion-pairs · Figure 11.28 · vant-hoff-factor · reverted on 2026-11-14 to the book's image (a `photo` row with its number, id kept): the 3D box drew ions too small to see under labels that covered them, and its slider ran an invented count of ion pairs against molality (the book gives i only at 0.05 m, Table 11.3); the book's flat drawing already shows the hydrated ions and two labelled ion pairs. The `box` referent went with it.
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

## Derivations

- `vapor`, P_solution = X_solvent P*_solvent · score 1, a printed block · built as drv-vapor-pressure-of-solution: one node, Dalton's law, Raoult's law for each component, the sum split into solvent and solutes (inserted), the solutes' terms dropped. The "Recalling … Dalton's law" paragraph and both displayed lines are replaced; the sentence defining a nonvolatile substance stays before the host.
- `distillation`, the vapor enriched in the more volatile component · score 9 · not built: the book leaves the argument to end-of-chapter Exercise 65, so it is an exercise.
- `boiling`, `freezing`, `osmosis`, the colligative proportionalities · score 0 · not built: stated as empirical laws; their derivation is thermodynamics the book never gives.
- Example 11.5, molality from molarity and density (and Examples 11.11, 11.12) · score 3 · not built: worked examples, every line printed.
