# Plan: 5.2 Calorimetry (m68726)

Written 2026-09-28 before building, left for review (config.md: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts and spans

| Span | `<h2>` | Concepts |
|---|---|---|
| `system` | Calorimetry, the system, and its surroundings | system-and-surroundings (introduces); heat-flow, exothermic-and-endothermic (use) |
| `calorimeters` | Coffee cup and commercial calorimeters | system-and-surroundings (uses) |
| `heat-balance` | Heat exchanged between a hot metal and cool water | calorimetry-heat-balance (introduces); conservation-of-energy, heat-specific-heat-relation, heat-flow (use) |
| `ex-rebar`, `ex-metal` | Examples 5.3 and 5.4 | calorimetry-heat-balance, heat-specific-heat-relation (use) |
| `reaction-heat` | The heat of a reaction in solution | heat-of-reaction-by-calorimetry, coffee-cup-calorimetry (introduce); exothermic-and-endothermic (uses) |
| `ex-exothermic`, `ex-ice-pack` | Examples 5.5 and 5.6 | coffee-cup-calorimetry, heat-of-reaction-by-calorimetry (use) |
| `hand-warmers` | Chemistry in Everyday Life: Thermochemistry of Hand Warmers | exothermic-and-endothermic (uses) |
| `bomb` | Bomb calorimetry | bomb-calorimetry (introduces); heat-capacity-and-specific-heat (uses) |
| `ex-bomb` | Example 5.7 | bomb-calorimetry (uses) |
| `nutrition` | Calorimetry of people and of food; the note Measuring Nutritional Calories inside it | food-calories (introduces); energy-units (uses) |

Example 5.3 has two Check Your Learning items: hosts `ex-rebar` and `ex-rebar-2` (an id on the second `<h4>`).

## Figures

- fig-heat-meas · Figure 5.11 · the book's drawing, a `photo` row, restored on 2026-11-14 where the first paragraph cites it. It had been folded into `sim-calorimeter` as two of three processes, where the reaction was only the word "reaction" in a cup, three sections below the sentence that points at it. The book's four panels (system, surroundings, the way q goes, the thermometer before and after) say it at the place it is needed.
- fig-calorim · Figure 5.12 · the book's cutaway, a `photo` row, restored on 2026-11-14 beside the paragraph on coffee cup calorimeters. The redraw was a trapezoid with a bar for a cover, a stirrer whose ring missed the thermometer and no second cup; the book's drawing names every part and is the better picture of the apparatus.
- sim-calorimeter · Figure 5.14 · calorimetry-heat-balance, system-and-surroundings · value add: motion and variation. The book prints the start and the end; here the hot metal and the cool water run on one clock, their two temperatures meet on a graph, and the heat the metal has lost and the heat the water has gained grow as two bars that are equal and opposite at every moment. Changing the metal, its mass, its temperature or the mass of water moves the meeting temperature, which the still cannot show · arrows: kinematic, q leaving the metal for the water (or entering it when the metal starts colder), sliding the way heat flows and fading as the flow stops · moving: a 5.2 s relaxation to the final temperature, then a hold; the stirrer strokes while heat flows · `F.select` metal (iron, copper, lead, gold, aluminum, specific heats from Table 5.1), sliders m metal (mass, 50 to 400 g), T initial of the metal (temperature, 0 to 300 °C, a dashed circle at the water's 24.0 °C, where no heat flows) and m water (mass, 250 to 500 g); the water starts at 24.0 °C, the book's value. Opens on Example 5.3: 360.0 g of iron at 248 °C in 425.0 g of water, final 42.7 °C. The ranges keep the final temperature under 100 °C (the most, 400 g of aluminum at 300 °C in 250 g of water, is 94.5 °C), so the water never boils. The first build's process choice, |q reaction| and water-temperature sliders are gone: six controls, and the reactions were a second idea · headline says which way heat flows, then that both are at the final temperature · graph beside the cup: temperature against time, each curve in its referent's colour and named at its moving end, the final temperature a dashed level; under it the two heat bars on one scale, −100 to 100 kJ · 2D: the lesson is the two curves and the two bars, which read flat; the calorimeter is drawn as a section so the metal, the bulb and the stirrer's ring are all seen, and a turning cup would show nothing more (brief of 2026-11-14, root rule 28.5) · readout: q_metal = c × m × ΔT with the live numbers and its result on one line, and q_water = −q_metal on the next. The metal's ΔT is taken to the 0.1 °C shown, so the product of the numbers shown is the heat shown; the water's heat is the metal's with its sign changed, which is the section's equation, so the two never differ in a last digit (a second c × m × ΔT for the water would, as the book's own rounded numbers do).
  works: parts: two polystyrene cups, one nested in the other, the inner cup's rim standing above the outer's and its floor above the outer's floor; a cover resting on the inner cup's rim with a lip down its outside; a thermometer through the cover, its bulb in the water beside the metal, its stem graduated and standing above the cover; a stirrer, a rod through the cover ending in a horizontal ring that passes round the thermometer; water in the inner cup; the metal, a cube resting on the cup's floor (5.14's block M) · flow: heat q from the metal into the water while the metal is hotter, the other way when it starts colder; nothing crosses the cups; the stirrer's ring moves up and down in the water · must hold: (1) the thermometer and the stirrer's rod both pass through the cover, and the bulb is under the water at every setting; (2) the ring encircles the thermometer and stays in the water, above the metal, through its stroke; (3) the metal lies wholly under the water, and the water's level stands where the volumes of water and metal put it in this cup, below the cover at every setting; (4) the thermometer's column stands at the water's temperature on its own scale (0 to 100 °C) and its reading agrees with the water's curve; (5) the two bars are equal and opposite at every moment, and the two temperatures end on the same dashed level; (6) on load the numbers are Example 5.3's: 360.0 g, 248 °C, 425.0 g, 24.0 °C, final 42.7 °C, q = −33.2 kJ and +33.2 kJ; (7) the product of the three numbers in the readout rounds to the heat beside them at every setting, and the water's heat is the same number with the other sign; (8) with the metal at the water's temperature no arrow is drawn, the bars are empty and the stirrer rests; (9) the final temperature stays below 100 °C over the whole range · read off the image: 5.14 shows an insulated vessel in section, water W (surroundings), a block M (system) with three arrows q leaving it, a thermometer at the right reading low in (a) and higher in (b); it prints no numbers. 5.12 labels Thermometer, Stirrer, Cover, Reaction mixture, Styrofoam cups, shows the stirrer's ring round the thermometer's bulb and a double arrow beside the rod (not drawn here: the rod itself moves). The alt text of 5.14 calls the block "a square" and brown then purple; the image has a red-brown rectangle that turns purple as it cools, which is not drawn, since the chapter does not tint by temperature (chapter `COLOR.md`). Densities for the cube's size (g/cm³: iron 7.87, copper 8.96, lead 11.3, gold 19.3, aluminum 2.70) are not the book's here and are not shown.
- fig-calorim2 · Figure 5.13 · kept as printed (photo row): the text points at both calorimeters; an apparatus drawing with nothing to vary.
- fig-hand-warmer · Figure 5.15 · photograph kept, the note points at it.
- fig-ice-pack · Figure 5.16 · kept as printed (photo row) inside Example 5.6: the example cites it and nothing in it varies.
- fig-bomb · Figure 5.17 · photograph and cutaway kept: the text walks through the bomb, the water and the thermometer; a 3D bench is optional by the chapter's exploration and would add no quantity the example does not state.
- fig-food-label · Figure 5.18 · photograph and label kept, the note computes from it.

Extra simulations: none; the bomb calorimeter's extra term is one number in Example 5.7.

## Exercises

6 Check Your Learning inline (cyl1, cyl2 after `ex-rebar` and `ex-rebar-2`; cyl3 `ex-metal`; cyl4 `ex-exothermic`; cyl5 `ex-ice-pack`; cyl6 `ex-bomb`). 12 keyed End of Chapter items. Kept with an AI approach: fs-idm40469024, fs-idm15197120, fs-idp3696624 (º written °), and fs-idm5511248 part (b) alone as an open item. Left out, unkeyed numerical: fs-idm75457248, fs-idm5511248 (a), fs-idm57057808, fs-idm66134336, fs-idm54145200, fs-idp17899648, fs-idp26469408, fs-idp47280960, fs-idm30519744, fs-idp47244464. Link to Learning (hand warmer video, bomb calorimeter video and calculations site, USDA database) dropped and named in `notes`. Errata kept as printed: Example 5.4's 4.18 then 4.184; Example 5.5's CYL answer "1.34 × 10³ kJ, or 1.34 kJ"; Example 5.7's −48.8 kJ then 48.7 kJ.

## Binds

energy, temperature, mass. Specific heat and heat capacity in ink.

## Wanted at chapter level

- equations `eq-heat-balance` → 5.2-heat-balance
- equations `eq-heat-reaction` → 5.2-reaction-heat
- equations `eq-bomb` → 5.2-ex-bomb
- elements.ts: `Pb` and `Al` (since added there); the calorimeter draws lead and aluminum blocks through `F.el`.
- edge coffee-cup-calorimetry → molarity (from the notes; Example 5.5 and its CYL).

Applied by the chapter pass: the three equations anchored as asked; edge coffee-cup-calorimetry → molarity merged. `Pb` and `Al` in `elements.ts` left for Chen, since that file is outside the chapter.

## Derivations

- Example 5.3, the initial temperature of the rebar · score 3 · not built: a worked example substituting q = cmΔT into the heat balance.
- Example 5.7, a bomb calorimeter's heat of combustion · score 1 · not built: a worked example, substitution into the section's balance.
