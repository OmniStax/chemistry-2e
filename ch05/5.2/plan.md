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

- sim-calorimeter · Figure 5.11 + 5.12 + 5.14 · system-and-surroundings, calorimetry-heat-balance, heat-of-reaction-by-calorimetry · value add: one coffee cup calorimeter (5.12's nested cups, cover, thermometer and stirrer) in which the book's before-and-after prints (5.11 a and b, 5.14 a and b) run as one clock; the reader watches the two temperatures meet and two heat bars stay equal and opposite at every moment, and the sliders reach states the book did not print · moving: heat flows and the temperatures relax to the final one over a 5 s loop, the stirrer strokes, the heat arrows fade as the flow stops · choice process (hot metal · exothermic reaction · endothermic reaction; the states of 5.14 and 5.11 a, b), `F.select` metal (iron, copper, lead, gold, aluminum from Table 5.1; metal only), sliders m metal (mass, 10–500 g) and T initial metal (temperature, 30–300 °C) for the metal, |q reaction| (energy, 0.10–3.00 kJ) for a reaction, m water or solution (mass, 50–500 g, relabelled) and T initial water or solution (temperature, 15.0–30.0 °C) shared; each state loads its book example (5.3 rebar as iron, 5.5, 5.6) · headline states the live temperatures and which way heat flows, then the final temperature · graph beside the cup (temperature against time, both bodies in the temperature hue told by label and dash, the final temperature a dashed level), heat-balance bars beneath the graph in the energy hue · 2D, class physical apparatus flattened: the book's rule would make a calorimeter a bench, but the lesson here is the temperature trace and the balance of the two heats, which read flat; a turning cup adds no relation · readout q_metal = −q_water (or q_reaction = −q_solution) with the book's numbers · a metal above 100 °C final says in the note that the water would boil.
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
- elements.ts: `Pb` and `Al` have no entry and fall to the `other` swatch; the calorimeter draws lead and aluminum blocks through `F.el`.
- edge coffee-cup-calorimetry → molarity (from the notes; Example 5.5 and its CYL).

Applied by the chapter pass: the three equations anchored as asked; edge coffee-cup-calorimetry → molarity merged. `Pb` and `Al` in `elements.ts` left for Chen, since that file is outside the chapter.
