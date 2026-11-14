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

- sim-heat-flow · Figure 5.4 + 5.6 · thermal-energy-and-temperature, heat-flow · value add: flow by animation and variation by slider. The book prints motion lines round still spheres and three frozen frames; here the molecules move, faster in the hotter sample, the samples are brought together, and the reader watches H slow and L quicken while the heat arrow shrinks and the two temperature traces meet. Equal starting temperatures (a circle on each slider at the other's value) give no heat at all · arrows: the book's arrow from H to L is kinematic (heat crossing the wall), so the figure moves; it is drawn in the energy hue, its length the temperature difference, and it turns round when L starts hotter · moving: each molecule jiggles about its place at a rate and reach set by its sample's temperature, a short trail behind it standing for the book's motion lines (a longer trail is a faster molecule, so a stopped frame still reads); at 1 s the samples touch and both temperatures relax to their mean over the 7 s loop · sliders T_H and T_L (temperature, 0 to 100 °C, opening on 80 and 10 °C; the book gives no numbers) · headline names the stage in the book's words (different temperatures, contact, thermal equilibrium) and which way heat flows · graph beside the samples: temperature against time, one trace per sample in its referent colour, the moment of contact and the equilibrium level dashed; the time axis has no numbers, since the seconds are the drawing's and not water's · readout T_H > T_L with the live temperatures, T_H = T_L at equilibrium; a note gives the true difference in speed, which the drawing enlarges (root rule 28.4) · 2D, rebuilt flat on 2026-11-14 (root rule 28.5, book RULES): the 3D boxes were small, their labels and view buttons sat on them, the molecules hid one another, and turning two boxes of water showed nothing a section through them does not. Binds temperature and energy.
  works: parts: two equal square containers, H on the left and L on the right, each holding fourteen water molecules spread over the whole box; an arrow from the hotter to the cooler across the shared wall · flow: before contact nothing passes between the boxes; once the walls touch, heat passes from the hotter sample to the cooler through the wall, the molecules themselves never crossing · must hold: (1) the boxes are the same size and each holds fourteen molecules, every one in view; (2) apart at first with a gap, then wall against wall, as panels (a) and (b); (3) the molecules of the hotter sample visibly move faster (longer trails) than those of the cooler; (4) the heat arrow appears only in contact, points from the hotter to the cooler sample, shrinks with the temperature difference and is gone at equilibrium; (5) H cools and L warms to one temperature, the mean of the two for equal samples, and the two boxes then move alike, as panel (c); (6) no molecule leaves its box; (7) with equal starting temperatures nothing changes on contact; (8) molecules keep their element colours and are not tinted by temperature (chapter COLOR.md), where the image goes red and blue to purple · read off the image: Figure 5.4, two boxes of fourteen spheres, "Hot water" with long motion lines and "Cold water" with short ones. Figure 5.6, three pairs of boxes labelled H and L: "Different temperatures" (apart), "Contact" (touching, a black arrow from H into L), "Thermal equilibrium" (touching, alike). The alt text says the cold spheres are "closer together"; in the image both boxes are filled alike, and the figure spaces both alike. No numbers in either image.
- sim-heating · Sim · heat-capacity-and-specific-heat, heat-specific-heat-relation · value add: variation by slider: q = c × m × ΔT as a line through zero whose slope is the heat capacity C. The two frying pans of the text are fixed dashed lines (iron, 808 g and 4040 g), with the book's 18,140 J and 90,700 J at 50.0 °C marked on them; the sample's line lies on a pan's when it is that mass of iron, and choosing water shows 808 g of it out-climbing the 4040 g pan, which the photograph of two pans cannot · arrows: none · still: the relation has no clock · `F.select` substance (the 16 rows of Table 5.1, default iron), sliders m (mass, 100 to 5000 g, detents 808 g small pan and 4040 g large pan, default 808) and ΔT (temperature, 1.0 to 100 °C, default 50.0; it stops at 1 °C so that C = q/ΔT is always a division the reader can do) · no headline: the readout and the legend say it · graph alone, since the graph is the idea: q (0 to 100,000 J, energy, in joules as the text writes the pans' heats) against ΔT (0 to 100 °C), the sample's line solid in the energy hue, the pans' lines dashed in their referent colours, keyed by `F.legend`, the point dropped to both axes so its heat reads on the q axis (its value is in the readout and its hover name) · readout two formulas, q = c × m × ΔT and C = q/ΔT, each with its numbers; on opening they are the book's own lines for the small pan · 2D, a relation between quantities. Binds energy, temperature, mass, heat capacity. Reworked on 2026-11-14: the grey rectangle that stood for the sample said nothing and was removed, and the dashed lines, which had followed the chosen substance (a "pan" of helium), are now the iron pans of the text.
  works: read off the image: no image (Figure 5.8, the photograph of the two pans, is kept above). From the text: small pan 808 g, 18,140 J for 50.0 °C, C = 363 J/°C; large pan 4040 g, 90,700 J, C = 1814 J/°C; c of iron 0.449 J/g °C; the sixteen specific heats of Table 5.1 in its order.

Photographs: Figure 5.2 (cheeseburger, traffic, furnace) dropped, a collage opener of three stock scenes (book RULES, Figures). Kept: 5.3 (the text points at the waterfall and the dam), 5.5 (the text points at both thermometers), 5.7 (the torch and the cold pack the text names), 5.8 (the two pans the text computes), 5.9 and 5.10 (in the note, which points at both).

Table 5.1 as `div.book-table`, silicon last as printed.

## Exercises

2 Check Your Learning inline (cyl1 after `ex-measuring-heat`, cyl2 after `ex-other-quantities`). 7 keyed End of Chapter items; fs-idp25217856 (the automobile energy table) kept with an AI-marked approach; fs-idm38026992, fs-idm26658464, fs-idm42475152, fs-idp43279360, fs-idp36071488 left out as unkeyed numerical. Three Link to Learning notes dropped (PhET temperature, bimetallic demonstration, PhET energy forms), the first and third the trigger for sim-heat-flow.

## Binds

energy, temperature, mass.

## Wanted at chapter level

- none

Applied by the chapter pass: none needed; the 5.1 equations and variables were anchored to `5.1-capacity` and `5.1-heat-equation`.
