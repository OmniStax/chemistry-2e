# Plan: 4.5 Quantitative Chemical Analysis

Written 2026-09-28 before building, per root rule 5; left for review after, as `ch04/config.md` records.

## Sub-concepts (spans)

| Span | Header | Introduces |
|---|---|---|
| `quantitative` | Quantitative analysis | quantitative-analysis |
| `titration` | Titration | titration |
| `titration-calc` | Calculating a concentration from a titration | titration-calculation (states eq-molarity-mmol and the variable M) |
| `ex-titration` | Example 4.14 · Titration Analysis | (uses) |
| `gravimetric` | Gravimetric Analysis | gravimetric-analysis |
| `ex-gravimetric` | Example 4.15 · Gravimetric Analysis | (uses) |
| `combustion` | Combustion analysis | combustion-analysis |
| `ex-combustion` | Example 4.16 · Combustion Analysis | (uses) |

The book prints two headers (Titration, Gravimetric Analysis); the span `titration-calc` opens before Example 4.14 with its own header in the book's voice, and `combustion` opens at the paragraph that defines combustion analysis. Summary to `summary_html`; objectives and glossary (10 terms) to the tables. No boxed notes and no Link to Learning in this module.

## Figures

- fig-buret · Figure 4.16 · photo · titration · kept: the text points at it for the buret, and panel (b) shows the 0.01 mL reading · none · none · 2D
- sim-titration · Sim · titration, titration-calculation · flow by animation and variation by slider: the reader watches titrant leave the buret until the indicator turns, and sees on the graph that the end point is where the millimoles of NaOH delivered reach the millimoles of HCl in the sample · arrows: none drawn; what moves is the titrant · moving, the titrant runs from the buret at a steady rate and the stopcock is closed at the end point, since a titration has a clock in it · sliders: NaOH molarity (concentration, 0.100 to 0.500 M), sample volume (volume, 10 to 50 mL by 0.5), HCl molarity (concentration, 0.050 to 0.300 M); defaults 0.250 M, 50.00 mL, 0.176 M reproduce Example 4.14 (end point 35.23 mL, 8.81 mmol) · headline states the volume delivered and the two amounts, and at the end point that they are equal · graph beside (the buret is a vertical scene): mmol against mL of NaOH, the NaOH line rising to the dashed level of mmol HCl, fixed axes 0–50 mL and 0–25 mmol · 2D: a bench from the side; a turn would show nothing the scale and the graph do not (root rule 28.5), so the book rule's 3D bench is not used
  works: parts (a stand: a base on the bench and an upright rod; a clamp on the rod that grips the buret; the buret: an open glass tube ruled 0 at the top to 50 mL at the bottom, every milliliter marked and every ten numbered, tapering to a stopcock with a key, and a tip below it; a conical flask standing on the base with the tip just inside its neck, holding the sample and the indicator) · flow (titrant falls as drops from the tip into the flask while the stopcock's key is in line with the tube; the level in the buret falls and the level in the flask rises; at the end point the key is turned across and the drops stop) · must hold (the reading at the meniscus is the volume delivered, read downward from 0; the liquid in the flask stands at the level its volume, sample plus titrant, takes in a cone that holds 125 mL to the neck; the flask is colourless before the end point and pink from it, with pink showing only where the drops land as the end point nears; delivery stops exactly where mmol NaOH = mmol HCl, the point on the graph then on the dashed level; a titration that needs more than 50 mL empties the buret and never turns pink; the readout's numbers give its result) · read off the image and the text (Figure 4.16a: a buret in a clamp on a rod stand with a white base, stopcock near the bottom, a conical flask under the tip on the base; 4.16b: the scale reads downward from 0, each milliliter numbered there and tenths marked. Example 4.14: 50.00 mL of HCl, 35.23 mL of 0.250 M NaOH, 8.81 × 10⁻³ mol HCl, 0.176 M. 35.23 × 0.250 / 50.00 is 0.17615 M, so at the slider's 0.176 M the acid is taken as 0.17615 M and the figure opens on the book's 35.23 mL; the earlier build opened on 35.20 mL and 8.80 mmol.)
  Rebuilt 2026-11-14: the earlier drawing was a bare tube over a wide triangle, with no stand, clamp or stopcock, and its end point missed the book's by 0.03 mL.
- fig-map7 · Figure (unnumbered route of Example 4.14) · reverted to the book's image 2026-11-14: the redraw was the same four boxes restyled and laid in a row, and showed nothing the book's drawing does not; the Sim above carries the calculation.
- fig-filter · Figure 4.17 · photo · gravimetric-analysis · kept: the text points at it for the filtration of a precipitate · none · none · 2D
- fig-map8 · Figure (unnumbered route of Example 4.15) · reverted to the book's image 2026-11-14: a restyling of the book's five boxes that added nothing.
- sim-combustion · Figure 4.18 · combustion-analysis · flow by animation and variation by slider: the reader sees what the book's arrows and the phrase "selectively absorb each product" ask them to imagine, water stopping in the first absorber and carbon dioxide in the second while oxygen passes through, and sets the two gains to read the formula they give · arrows: kinematic in the book (the gas stream), so the gas is drawn moving as molecules; two short arrows outside the glass keep the way in and the way out · moving: the sample burns away, its products are carried along and taken up, 6 s and a hold · sliders: mass of H₂O absorbed and mass of CO₂ absorbed (mass), in the order of the absorbers; defaults 1.61 mg and 3.94 mg, Example 4.16's polyethylene · headline states the H-to-C ratio and the formula · no graph · 2D, flat schematic as the book draws it
  works: parts (an inlet tube for the oxygen; a wide combustion tube inside the furnace, holding the sample in a boat; the furnace, a block round the combustion tube with a glowing lining; a narrow tube to the H₂O absorber, a wide tube of green grains; a narrow tube to the CO₂ absorber, a wide tube of blue grains; an outlet tube; a joint where each part meets the next. The glass is one continuous bore from inlet to outlet) · flow (oxygen enters at the left and passes through everything; as the sample burns, water and carbon dioxide molecules leave it and are carried to the right; each water molecule stops among the grains of the first absorber, each carbon dioxide molecule passes through the first and stops in the second; oxygen and other gases leave at the right) · must hold (the water absorber comes before the carbon dioxide absorber; no tube is drawn through the inside of a wide tube; no water molecule passes the first absorber and no carbon dioxide molecule stops in it; the molecules drawn are one for each 0.01 mmol, so their numbers stand in the ratio of the moles; each absorber's gain climbs with the molecules it has taken up and ends at the slider's mass; mol H = 2 × mol H₂O and mol C = mol CO₂ in the readout; a ratio above 4 is named as no hydrocarbon) · read off the image (left to right: "O₂" and an arrow into a narrow tube; "Furnace" above a block cut away to show a red-orange lining round a wide glass tube; "Sample", a brown solid lying on the floor of that tube; "CO₂, H₂O, O₂, and other gases" pointing at the tube leaving the furnace; "H₂O absorber such as Mg(ClO₄)₂", green grains; "CO₂ absorber such as NaOH", blue grains; "O₂ and other gases" leaving. Rings mark the joints between parts. The alt text agrees. Example 4.16: 0.00126 g sample, 0.00394 g CO₂, 0.00161 g H₂O, 8.95 × 10⁻⁵ mol C, 1.79 × 10⁻⁴ mol H, CH₂.)
  Rebuilt 2026-11-14: the earlier drawing ran the tube's two lines straight through the combustion tube and the sample, drew the sample as an ellipse and the furnace as a square in a square, and its sliders changed only numbers.
- fig-combmap · Figure (unnumbered flow chart of Example 4.16) · reverted to the book's image 2026-11-14: a restyling of the book's flow chart that added nothing; the readout it carried is the book's own next equation.

Colours that are physical facts: the pink of the indicator at the end point (phenolphthalein pink, `INDICATOR_PINK`), the green and blue grains of the two absorbers in Figure 4.18 as the book draws them (`H2O_ABSORBER`, `CO2_ABSORBER`), the furnace's glow (`FURNACE`). The molecules of Figure 4.18 are in the element palette (`F.el`).

Labels (26.7): the titration labels the buret, the stopcock and the sample, and keys the two lines of the graph; the drops, the clamp, the stand and the tip carry hover names. Figure 4.18 labels its parts as the book does and each absorber's gain; the three kinds of molecule are in a key, and the joints, the boat and the combustion tube carry hover names.

## Binds

`volume`, `concentration`, `amount`, `mass`. The sim-titration draws volume, concentration and amount; the combustion figure draws mass and amount.

## Exercises

- Check Your Learning, 3, all keyed, inline after each example with a host: cyl1 (0.2648 M), cyl2 (23.76%), cyl3 (CH, open).
- End of Chapter, 9 keyed kept: fs-idm186096, fs-idp52490448, fs-idm17012464, fs-idp87527952, fs-idp969280, fs-idp26486752, fs-idp97761872, fs-idp204697696, fs-idp13191008.
- Left out, unkeyed and numerical: fs-idm9962448, fs-idm31045184, fs-idp68782720, fs-idp205066064, fs-idm26094912, fs-idp204713328, fs-idp69216752, fs-idp126088400, fs-idm1209456.

## Extra simulations considered

None built beyond the titration Sim. A gravimetric balance Sim was judged against Example 4.15's route and dropped: it would only restate one multiplication chain.

## Wanted at chapter level

- anchor: eq-molarity-mmol → 4.5-titration-calc
- anchor: variables 4.5/M → 4.5-titration-calc
- edge: titration-calculation → molarity (3.3)
- edge: combustion-analysis → empirical-formula (3.2)
- edge: gravimetric-analysis → percent-composition (3.2)

Applied by the chapter pass: eq-molarity-mmol and variable 4.5/M anchored at 4.5-titration-calc; the three edges merged (gravimetric-analysis → percent-composition).

## Derivations

- Example 4.16, the empirical formula of polyethylene from combustion analysis · score 3 · not built: a worked example, every line printed, each line a stoichiometric factor.
