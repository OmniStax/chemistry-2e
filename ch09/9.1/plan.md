# Plan: 9.1 Gas Pressure

Written 2026-09-28 before building, left for review as `ch09/config.md` records (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts (spans, `<h2>`)

| Span | Header | Introduces |
|---|---|---|
| `pressure` | Pressure is force per unit area | gas-pressure |
| `units` | Units of pressure | pressure-unit-conversion (Table 9.1, Example 9.1) |
| `barometer` | The barometer and hydrostatic pressure | atmospheric-pressure-and-barometer, hydrostatic-pressure (Example 9.2) |
| `manometer` | Measuring a gas with a manometer | manometer-pressure (Examples 9.3, 9.4) |
| `blood-pressure` | Pressure in medicine: the sphygmomanometer | note, Chemistry in Everyday Life |
| `atmosphere` | Pressure in the atmosphere and the weather | note, How Sciences Interconnect |

Uses: convert-units (units), density (barometer), states-of-matter (pressure).

## Figures

- sim-force-area · Figure 9.2 · gas-pressure · variation by slider: one load on a foot of any size, from the book's air column on a thumbnail to the skater on a blade, the skater barefoot and the elephant of the worked comparison under Figure 9.3 · arrows: symbolic (the weight, the pressure on the ground) · still, the pressure answers the sliders · F (force, lb, 1–3500, logarithmic, opens at 14.7, detents air 14.7, skater 60, elephant 3500) and A (area, in², 0.5–250, logarithmic, opens at 1, detents thumbnail 1, blade 2, bare foot 30, elephant 250) · headline compares the pressure with the atmosphere's 14.7 lb/in² and names the book's case when both sliders rest on one · bar beside, 0 to 100 lb/in² with the atmosphere marked, and the contact area drawn to scale on square inches · 2D: a side view and the contact area from below at one scale; nothing here is an arrangement in space
  works: parts (a load, a block that grows with its weight, stands on a foot whose width is the side of a square of area A; the foot stands on the ground; beside it the same square from below on a 16 in by 16 in grid of 1 in² cells; a bar gauge for P) · flow (nothing moves; the weight F goes down through the foot and reaches the ground as pressure arrows a fixed distance apart, so a wider foot has more and shorter arrows) · must hold (the foot's width in the side view equals the square's side on the grid; a 1 in² foot covers exactly one cell; arrow length and bar height follow P = F/A; the bar pins at 100 and says so; the numbers divided in the readout are the numbers the sliders show) · read off the image and text (14.7 lb on 1 square inch from the image; 60 lb on a 2 in² blade = 30 lb/in², 60 lb on a 30 in² foot = 2 lb/in², 3500 lb on a 250 in² elephant's foot = 14 lb/in² from the text). The book's picture of a hand under a bowling ball is not redrawn: the earlier hand read as a toy and drew the eye from the idea, and the original stays behind the toggle.
- fig-elephant-skater · Figure 9.3 · photo, kept: the text's worked comparison points at it
- sim-barometer · Figure 9.4 · atmospheric-pressure-and-barometer, hydrostatic-pressure · variation by slider: an atmospheric pressure slider raises a mercury and a water column together on one scale, the water column 13.6 times as tall · arrows: symbolic (the atmosphere on each dish) · still, the columns stand at equilibrium · p_atm (pressure, kPa, 60–110, 101.3 default, detent at 101.325); no liquid choice, both stand side by side · headline gives both heights · none · 2D side elevation, the book's own view: the lesson is two heights on one scale, which a turn would only foreshorten
  works: parts (each barometer is a tube sealed at the top, its open foot under the surface of the liquid in an open dish; a vacuum above the column; the atmosphere presses on the liquid in the dish) · flow (nothing moves at rest; a higher atmospheric pressure pushes liquid from the dish up the tube until hρg equals it) · must hold (the tube opens below the dish's surface and has no floor; the column is measured from the dish's surface; the space above it is empty and labelled vacuum; both columns come from the same pressure, so their heights are as 1 : 13.6; at 1 atm they read the image's numbers) · read off the image (760 mm for mercury, 10,330 mm for water, "Vacuum" at both tops, "Atmospheric pressure" with an arrow onto each dish; the alt text agrees). Mercury at 0 °C, 13,595 kg/m³, and standard gravity are used so that 1 atm gives 760 mm and 10.33 m as the image prints; Example 9.2's rounder 13,600 kg/m³ and 9.81 m/s² would give 759 mm.
- sim-manometer · Figure 9.5 · manometer-pressure · variation by slider and choice: the three cases of the book become one tube the reader drives, the level difference swapping sides as the gas pressure passes the atmosphere · arrows: symbolic (the atmosphere on the open end) · still · choice end (closed, open), P_gas (pressure, mm Hg, 0–1200, default 897 from Example 9.4), P_atm (pressure, mm Hg, 600–800, default 760, disabled for the closed end), a dashed special on P_gas at P_atm where h = 0 · headline gives h, the higher arm and what h measures · none · 2D, same argument as the barometer
  works: parts (a glass bulb of gas opens into a horizontal pipe; a stopcock, open, sits on the pipe; the pipe turns down through an elbow into the left arm of a U-tube; mercury fills the bend and part of both arms; the right arm ends sealed over a vacuum, or open to the atmosphere) · flow (nothing moves at rest; the gas presses on the left surface and the vacuum or atmosphere on the right, and mercury shifts from one arm to the other until the two sides balance at the lower level) · must hold (the bulb, pipe, elbow and left arm are one gas space with no wall across it; the mercury never rises into the elbow or leaves an arm at any slider position; one arm falls as far as the other rises; closed end: right arm higher by P_gas; open end, gas below atmosphere: gas arm higher; open end, gas above atmosphere: open arm higher; equal: level; the readout adds or subtracts in one unit) · read off the image (three panels: closed end with "Vacuum", P_gas = hρg, right arm higher; open end, P_gas = P_atm − hρg, left arm higher; open end, P_gas = P_atm + hρg, right arm higher; P_atm with an arrow into the open end; a stopcock between bulb and tube; the alt text agrees). The sliders and readout are in mm Hg, as Example 9.4 writes its sum, so the 137 mm of the column and the 137 mm Hg it adds are seen to be one number.
- fig-manometer-ex3, fig-manometer-cyl3, fig-manometer-ex4, fig-manometer-cyl4 · unnumbered images inside Examples 9.3 and 9.4 and their Check Your Learning · the book's images kept, kind `figure`. They had been redrawn as still copies; reverted on 2026-11-14 because a redraw with no control showed nothing the book's picture does not (root rule 25). Read off the images: 26.4 cm closed, right arm higher; 6.0 in. closed, right arm higher; 13.7 cm open, open arm higher; 4.63 in. open, gas arm higher.
- fig-sphygmomanometer · Figure 9.6 · photo kept in its note, which describes the cuff and gauge
- fig-weather-map · Figure 9.7 · photo kept in its note, which points at it
- fig-atmosphere · Figure 9.8 · the book's drawing of the layers kept as a faithful copy (photo row); no quantity varies

Colours, as `ch09/COLOR.md` lists them: `pressure` (P, p, P_gas, P_atm, the pressure arrows and bar, the atmosphere's arrows), `force` and `area` (the weight arrow, the foot and its square), `length` (h), `density` (ρ) and `acceleration` (g) in the readouts. The two barometers are referents (tube walls and names). Mercury in `F.el('Hg')`; water in ink at fixed opacity. No hex.

## Exercises

Check Your Learning: 4, inline after Examples 9.1–9.4 (hosts `ex-units`, `ex-barometric`, `ex-closed-manometer`, `ex-open-manometer`). End: 17 printed; 9 keyed kept; unkeyed conceptual fs-idp152253216, fs-idp32052448 kept with AI approach; unkeyed numerical fs-idp74012224, fs-idp30544832, fs-idp128422496, fs-idm81032176, fs-idp27847856, fs-idm35876656 left out and named. Manometer5 and Manometer7 images kept inside their prompts.

## Dropped

Link to Learning (the tanker car video and the smaller demonstration), named in `notes`.

## Wanted at chapter level

- eq-pressure → 9.1-pressure
- eq-hydrostatic → 9.1-barometer
- variables P, F_force, A_area → 9.1-pressure; p_hydro, h_col, ρ, g_grav → 9.1-barometer
- symbol rows wanted: `P_gas` (pressure, `\kPgas`, P_{gas}) and `P_atm` (pressure, `\kPatm`, P_{atm}); the page writes `\kP_{\text{gas}}` until they exist

### Applied by the chapter pass

Every item above was applied on 2026-09-28. The two equations and the seven variable rows carry their anchors, `9.1-pressure` and `9.1-barometer`. The symbol rows `P_gas` and `P_atm` are staged in `ch09/book-rows.json` and merged, both typed `pressure` with the macros `\kPgas` and `\kPatm`, and the manometer and barometer figures now write those macros where they wrote `\kP_{\text{gas}}` and `\kP_{\text{atm}}`; the text never wrote either.

## Derivations

- `barometer`, the hydrostatic pressure p = hρg · score 7 · not built: a formula the book states, not derives, and its derivation rests on weight = mg, which the book never states.
