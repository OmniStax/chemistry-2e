# Chapter 10 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue or coerces a quantity into a neighbouring type.

## What the chapter binds

| Section | Binds | What wears it |
|---|---|---|
| `intro` | nothing | one photograph |
| 10.1 | `temperature`; `energy` only if the phases figure draws kinetic energy as a quantity | the boiling and melting points on the axes of 10.11, 10.12 and Example 10.1's graph and on any temperature slider of the phases box; the forces themselves are drawn in ink, partial charges as δ+ and δ− marks in ink |
| 10.2 | `temperature` only if a figure varies it (viscosity or surface tension against temperature); otherwise nothing | the height, surface tension, contact angle, tube radius, density and g of the capillary equation are untyped and stay ink |
| 10.3 | `pressure`, `temperature`, `energy`, `time` where a clock runs, `amount` and `mass` where a heat readout states them | the vapor pressure on the manometer and the pressure axis; the temperature axis and slider; heat added on the heating curve's axis and every ΔH; the clock of a particle box |
| 10.4 | `pressure`, `temperature` | the two axes of every phase diagram, the dragged state point's readouts; the regions of the diagram are named in ink, never shaded by type |
| 10.5 | `temperature` only if a melting-point readout is drawn; otherwise nothing | atoms and ions in the element palette |
| 10.6 | `wavelength` (the X-rays of 10.63 to 10.65); `mass` and `volume` where a density readout is live | the λ of the Bragg readout and the drawn wave; edge length, radius, plane spacing, angle, order and coordination number stay ink |

## Atoms, ions, forces, phases

- **Atoms and ions** take the element palette through `F.el` in every figure, unit cells included: Na purple, Cl green, Cs, Ca, F, Zn, S, Po, Cu and the rest from the library. The book's Figure 10.54 colours its layers A, B, C purple, green and blue by layer, not by element: a layer is an instance to tell apart, so layers take `F.cat(0..2)`, the same three in 10.53, 10.54 and 10.57, and a single-element metal drawn without layer colouring takes its element colour.
- **Partial charges** are ink δ+ and δ− marks. The book's red/blue ends of a dipole in 10.6 and 10.9 become `F.cat(0)` and `F.cat(1)` with a legend naming them as the positive and negative ends, the same pair across 10.1.
- **Intermolecular attractions** (dotted lines, hydrogen bonds) are ink; they are not a quantity.
- **Phases** are told by packing, never by colour; a temperature is its hue on the symbol and slider, never a tint on the substance.
- **Physical colours**: iodine's purple vapor (10.27), the wine in 10.19, and a substance's own colour in a photograph stay as fact; a redrawn liquid in a tube is drawn in ink outline, water and mercury told apart by meniscus and label.

## What stays in ink

Lengths and radii, density, surface tension, viscosity, the contact angle and the Bragg angle, the order n, the coordination number, counts of atoms per cell, the percent of space filled, K and ratios, every axis rule and label that is not one of the bound types, and the region names on phase diagrams. No `\k` macro appears except for the bound types: `\kP`, `\kT`, `\kPone`, `\kPtwo`, `\kTone`, `\kTtwo`, `\kdHvap`, `\kdHfus`, `\kdHsub`, `\kq`, `\km`, `\kn`, `\kdT`, `\klam`, `\kt`.

## As built

10.1 binds temperature alone; 10.2 nothing; 10.3 pressure, temperature, energy, mass and amount (`\kP`, `\kT`, the two-point forms, `\kdHvap`, `\kdHfus`, `\kdHsub`, `\kq`, `\km`, `\kdT`); 10.4 pressure and temperature; 10.5 temperature on its melting-point readout; 10.6 wavelength, mass and volume (`\klam`, `\km`, `\kV`). Layers A, B, C and the dipole ends take the categorical pair and triple as planned.
