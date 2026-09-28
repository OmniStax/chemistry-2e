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

- sim-ppm · Sim · ppm-and-ppb, mass-percentage · variation by slider: one mass ratio read on three scales at once, which the text states in words ("part per hundred") but the reader must otherwise picture across nine decades · still, a ratio has no clock · select solution (the section's five: lead at 15 ppb, fluoride at 4 ppm, spinal-fluid glucose 0.075%, bleach 7.4%, concentrated HCl 37.2%, plus "another solution"), slider m_solution (mass, 1–1000 g), slider m_solute (mass; a logarithmic track over the mass fraction 10⁻¹⁰ to 10⁻⁰·³, its value box showing the solute's mass; specials at 1 ppb, 1 ppm, 1%) · headline "In 300 g of tap water at the lead action level, 4.50 µg of lead is 0.0000015% of the mass, or 0.015 ppm, or 15 ppb." · none (the scales are the graph) · 2D, a relation between numbers. The mercury wastewater and tile cleanser are left out of the choices since they would show Check Your Learning answers. Labels: the marker's three readings and the three scale names; the five samples are unlabelled marks on the fraction line named by hover (five names would collide).
- fig-hcl-route · unnumbered image in Example 3.23 · faithful copy kept as a `figure` row with its image in its markup (standardisation only).
- fig-bleach · Figure 3.17 · photo kept: the text points at the label's 7.4%.
- fig-saline · Figure 3.18 · photo kept: the text points at it for saline and blood glucose.
- fig-faucet · Figure 3.19 · photo kept: the text points at it for trace contaminants and filters.

Considered and dropped: a Sim for Example 3.23's volume → mass → mass chain (the flowchart and the arithmetic already carry it; a slider would only scale three numbers).

## Binds

`mass` only (the two sliders and the masses in the readout). Volume appears only in prose and the kept flowchart image; percent, ppm, ppb, density are ink.

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
