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

- sim-force-area · Figure 9.2 · gas-pressure · variation by slider: the same force over a smaller area gives a larger pressure, the book's 14.7 lb on 1 in² as the default · still, a relation answers its sliders · force F (untyped, lb) and area A (untyped, in²), detents at the book's thumbnail, skate blade and foot · headline states P · none · 2D, a relation between quantities
- fig-elephant-skater · Figure 9.3 · photo, kept: the text's worked comparison points at it
- sim-barometer · Figure 9.4 · atmospheric-pressure-and-barometer, hydrostatic-pressure · variation by slider: an atmospheric pressure slider raises a mercury and a water column together on one scale, the water column 13.6 times as tall · still, the columns stand at equilibrium · p_atm (pressure, kPa, 60–110, 101.3 default, detent at 101.325) and a liquid choice is not needed since both stand side by side · headline gives both heights · none · 2D side elevation, the book's own view: the lesson is two heights on one scale, which a turn would only foreshorten, so the book `RULES.md` apparatus 3D default is argued down to a flat section
- sim-manometer · Figure 9.5 (the example images drawn as fixed states beside their examples, below) · manometer-pressure · variation by slider and choice: the three cases of the book become one tube the reader drives, the level difference swapping sides as the gas pressure passes the atmosphere · still · choice end (closed, open), P_gas (pressure, torr, 0–1200, default 897 from Example 9.4), P_atm (pressure, torr, 600–800, default 760, disabled for the closed end), a dashed special on P_gas at P_atm where h = 0 · headline gives h and the side · none · 2D, same argument as the barometer
- fig-manometer-ex3, fig-manometer-cyl3, fig-manometer-ex4, fig-manometer-cyl4 · unnumbered images inside Examples 9.3 and 9.4 and their Check Your Learning, kind `figure`, faithful still copies drawn with the manometer's painter: 26.4 cm closed, 6.0 in closed, 13.7 cm open (gas side low), 4.63 in open (gas side high); no sliders, ink and mercury only
- fig-sphygmomanometer · Figure 9.6 · photo kept in its note, which describes the cuff and gauge
- fig-weather-map · Figure 9.7 · photo kept in its note, which points at it
- fig-atmosphere · Figure 9.8 · the book's drawing of the layers kept as a faithful copy (photo row); no quantity varies

Colours: binds `pressure` only (P, p, P_gas, P_atm, the pressure bar, the atmospheric slider). Force, area, h, ρ, g ink. Mercury in `F.el('Hg')`; water in ink at fixed opacity. No hex.

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
