# Plan: 5.1 Energy Basics

Written 2026-09-28 before building, left for review (config.md: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts and spans

| Span | `<h2>` | Concepts |
|---|---|---|
| `thermochemistry` | Energy in everyday chemistry | energy-and-work (uses) |
| `energy` | Energy | energy-and-work, potential-and-kinetic-energy (introduce) |
| `conservation` | The conservation of energy | conservation-of-energy (introduces) |
| `thermal` | Thermal Energy, Temperature, and Heat | thermal-energy-and-temperature (introduces) |
| `heat` | Heat flows from hot to cold | heat-flow (introduces) |
| `exo-endo` | Exothermic and endothermic processes | exothermic-and-endothermic (introduces) |
| `units` | Units of energy | energy-units (introduces) |
| `capacity` | Heat capacity and specific heat | heat-capacity-and-specific-heat (introduces) |
| `heat-equation` | Calculating heat | heat-specific-heat-relation (introduces) |
| `ex-measuring-heat`, `ex-other-quantities` | Examples 5.1 and 5.2 | heat-specific-heat-relation (uses) |
| `solar` | Chemistry in Everyday Life: Solar Thermal Energy Power Plants | heat-capacity-and-specific-heat (uses) |

## Figures

- sim-heat-flow · Figure 5.4 + 5.6 · thermal-energy-and-temperature, heat-flow · value add: the book's two prints of fast and slow molecules become one clock on which the reader watches the jiggling of the hot sample slow and the cold one quicken while the heat arrow shrinks and the two temperature traces meet · moving: the molecules jiggle at a speed set by their box's temperature; at 1 s the boxes touch and heat flows, both temperatures relaxing to their mean over the 6 s loop · sliders T_H initial and T_L initial (temperature, 0–100 °C, defaults 80 and 10 °C) · headline states the two live temperatures and whether heat is flowing · graph below (temperature against time, both traces in the temperature hue, H solid and L dashed, told by label) · 3D by the book's rule for a particle picture, class physical: two glass boxes of 14 water molecules each drawn through `F.el` (oxygen red, hydrogen white, never tinted by temperature), no ground; orbit bounded to yaw ±0.9 and pitch −0.3 to 1.2 so the two boxes always stand side by side and the contact face stays visible; buttons front and above; no idle spin, since the motion is the clock's; flat strip beneath carries the heat arrow and the graph. Binds temperature and energy (the heat arrow q).
- sim-heating · Sim · heat-capacity-and-specific-heat, heat-specific-heat-relation · value add: q = c × m × ΔT as a line whose slope is the heat capacity C = c × m; the two frying pans of Figure 5.8 are two detents of one mass slider and the reader sees two slopes five-fold apart from one specific heat · still: the relation has no clock · `F.select` substance (the 16 rows of Table 5.1, default iron), sliders m (mass, 100–5000 g, detents 808 g small pan and 4040 g large pan, default 808) and ΔT (temperature, 0–100 °C, default 50.0) · headline "Heating 808 g of iron by 50.0 °C takes 18.1 kJ." · graph beside the sample: q (0–100 kJ, energy) against ΔT (0–100 °C), the current line solid in the energy hue, the two pans' lines faint dashed in ink with their masses as hover names, the point pinned · 2D, a relation between quantities. Binds energy, temperature, mass. Specific heat and heat capacity in ink.

Photographs: Figure 5.2 (cheeseburger, traffic, furnace) dropped, a collage opener of three stock scenes (book RULES, Figures). Kept: 5.3 (the text points at the waterfall and the dam), 5.5 (the text points at both thermometers), 5.7 (the torch and the cold pack the text names), 5.8 (the two pans the text computes), 5.9 and 5.10 (in the note, which points at both).

Table 5.1 as `div.book-table`, silicon last as printed.

## Exercises

2 Check Your Learning inline (cyl1 after `ex-measuring-heat`, cyl2 after `ex-other-quantities`). 7 keyed End of Chapter items; fs-idp25217856 (the automobile energy table) kept with an AI-marked approach; fs-idm38026992, fs-idm26658464, fs-idm42475152, fs-idp43279360, fs-idp36071488 left out as unkeyed numerical. Three Link to Learning notes dropped (PhET temperature, bimetallic demonstration, PhET energy forms), the first and third the trigger for sim-heat-flow.

## Binds

energy, temperature, mass.

## Wanted at chapter level

- none

Applied by the chapter pass: none needed; the 5.1 equations and variables were anchored to `5.1-capacity` and `5.1-heat-equation`.
