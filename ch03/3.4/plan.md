# Plan: 3.4 Other Units for Solution Concentrations

Written 2026-09-28 before the build and left for review, as `ch03/config.md` records.

## Sub-concepts

| Span | Header | Introduces |
|---|---|---|
| `other-units` | Concentration beyond molarity | (uses molarity) |
| `mass-percentage` | Mass percentage | mass-percentage; Examples 3.22 (`ex-mass-percent`), 3.23 (`ex-hcl-mass`, introduces concentration-unit-conversions) |
| `volume-percentage` | Volume percentage | volume-percentage; Example 3.24 (`ex-volume-percent`) |
| `mass-volume-percent` | Mass-volume percentage | mass-volume-percent |
| `ppm-ppb` | Parts per million and parts per billion | ppm-and-ppb; Example 3.25 (`ex-ppb`) |

## Figures

- sim-ppm · Sim, replaces nothing · ppm-and-ppb, mass-percentage · variation by slider: one mass ratio written in three units at once, and the stretch of ratios over which each unit gives an easy number, which the text gives only as "very low concentrations … appropriately small units" · arrows: none · still, a ratio has no clock · select solution (the section's five: lead in tap water at 15 ppb, fluoride in tap water at 4 ppm, glucose in spinal fluid 0.075%, liquid bleach 7.4%, concentrated HCl 37.2%, plus "another solution"; a dropdown, six long options), slider m_solution (mass, 1 g to 1000 g, logarithmic track), slider m_solute (mass, 100 ng to 1000 g, logarithmic track, held at or below the solution's mass; dashed circles at the masses that make 1 ppb, 1 ppm and 1% of the solution chosen, moving with the other slider) · no headline (it repeated the readout and sat on the axis labels) · none (the rows are the graph) · 2D, a relation between numbers. Opens on Example 3.25: 4.5 µg of lead in 300 g of water, 15 ppb. The mercury wastewater and tile cleanser stay out of the choices since they would show Check Your Learning answers.
  works: read off the text (no book image: the Sim replaces nothing. Example 3.25: 15 ppb = 0.015 ppm, 300 mL at 1.00 g/mL = 300 g, 4.5 × 10⁻⁶ g = 4.5 µg of lead. Fluoride limit 4 ppm, set in the same 300 g glass, 1.2 mg. Example 3.22: 3.75 mg (0.00375 g) of glucose in 5.0 g of spinal fluid, 0.075%. Figure 3.17 and its paragraph: 7.4 g NaOCl in 100.0 g of bleach, 7.4%. Example 3.23: 500 mL × 1.19 g/mL = 595 g of solution, 37.2%, 221 g HCl; the figure holds the unrounded 221.34 g so the ratio reads 37.2%. Definitions: × 100%, × 10⁶ ppm, × 10⁹ ppb.) · parts (a logarithmic line of mass fraction, 10⁻¹⁰ to 1, a tick a decade, with the five solutions as named rings on it; under it a row for each unit, shaded and numbered only where that unit reads 0.1 to 1000; a marker at the chosen ratio crossing all three rows with its reading on each, heavy where the number lies in the shaded stretch) · must hold (the three readings are one ratio: ppm = 10⁴ × percent and ppb = 10³ × ppm at every setting; the marker stands on the chosen solution's ring; 1% lies under 10⁻², 1 ppm under 10⁻⁶ and 1 ppb under 10⁻⁹; the readout's two masses are the value boxes' masses, both in grams, and their quotient is the three readings; changing the solution's mass alone moves the marker the other way; the solute never outweighs the solution; no reading or name is clipped at either end of the line)
  Rebuilt 2026-11-14 in the figure re-examination. The first build drew three full scales with ticks such as "10⁻⁶ %" and "1000000000 ppb", left the five solutions as unnamed dots, set a headline over the axis numbers, and labelled as m_solute a slider that set the ratio, so the solution's mass moved nothing on the stage.
- fig-hcl-route · unnumbered image in Example 3.23 · faithful copy kept as a `figure` row with its image in its markup (standardisation only).
- fig-bleach · Figure 3.17 · photo kept: the text points at the label's 7.4%.
- fig-saline · Figure 3.18 · photo kept: the text points at it for saline and blood glucose.
- fig-faucet · Figure 3.19 · photo kept: the text points at it for trace contaminants and filters.

Considered and dropped: a Sim for Example 3.23's volume → mass → mass chain (the flowchart and the arithmetic already carry it; a slider would only scale three numbers).

## Binds

`mass` only (the two sliders, the marker and the masses in the readout). Volume appears only in prose and the kept flowchart image; percent, ppm, ppb, density are ink.

## Exercises

Four Check Your Learning inline (hosts after each example). End of chapter: 69, 71, 73, 75, 77, 79 keyed and kept (69 as a number answer with the book's outline in its solution); 70, 72, 74, 76, 78, 80 unkeyed numerical, left out and named in `exercise_notes`.

## Wanted at chapter level

- eq-mass-percentage → 3.4-mass-percentage
- eq-volume-percentage → 3.4-volume-percentage
- eq-ppm → 3.4-ppm-ppb
- eq-ppb → 3.4-ppm-ppb
- glossary 3.4/mass percentage → 3.4-mass-percentage
- glossary 3.4/volume percentage → 3.4-volume-percentage
- glossary 3.4/mass-volume percent → 3.4-mass-volume-percent
- glossary 3.4/parts per million (ppm) → 3.4-ppm-ppb
- glossary 3.4/parts per billion (ppb) → 3.4-ppm-ppb
- concept edge concentration-unit-conversions → mass-percentage (prereq), if not present
- concept edge ppm-and-ppb → mass-percentage (prereq), if not present

### Applied by the chapter pass

The four equation anchors set as asked. The glossary anchors are not set: a glossary row carries no anchor field, and the app finds a term in the prose by its words. Both edges into mass-percentage were already rows.
