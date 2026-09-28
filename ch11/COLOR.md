# Chapter 11 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue or coerces a quantity into a neighbouring type.

## What the chapter binds

| Section | Binds | What wears it |
|---|---|---|
| `intro` | nothing | one photograph |
| 11.1 | `energy` if the three steps of 11.4 are drawn as an energy ladder; `temperature` if the cold pack's readout is live; otherwise nothing | the energy of each step and the overall heat of solution; the mixing bulbs of 11.3 carry no quantity, only atoms |
| 11.2 | nothing | ions and water in the element palette; charges as ink marks; the bulb's glow is a physical fact, not a type |
| 11.3 | `concentration`, `pressure`, `temperature` | C<sub>g</sub> and the solubility axis of 11.8, P<sub>g</sub> on a gas-pressure slider, the temperature axis of 11.8 and 11.16; 11.16's solubility in g per 100 g of water is a mass ratio and stays ink |
| 11.4 | `concentration`, `pressure`, `temperature`; `amount` and `mass` where a readout states them; `time` where a clock runs | molality m, molarity M, the solute slider; every vapor pressure, ΔP and Π, the osmotic column's height read as Π; T, ΔT<sub>b</sub>, ΔT<sub>f</sub> and the phase diagram's temperature axis |
| 11.5 | nothing | particles, soap and oil in the element palette or `F.cat`; the scattered beam as a physical colour |

## Atoms, ions, parts and solutions

- **Atoms and ions** take `F.el` everywhere, in the colours the library gives K, Cl, Na, Mg, Ca, Fe, He, Ar and the rest. The book's 11.24 and 11.25 draw solvent yellow and solute blue with no identity; give them one (water and sucrose, or water and NaCl) and draw them by element, per the book's test for one figure.
- **Solute and solvent roles**, when a figure must tell two anonymous species apart (the three step boxes of 11.4 if drawn without molecules), take `F.cat(0)` for the solute and `F.cat(1)` for the solvent, the same pair across the chapter.
- **The two ends of an amphiphile** (11.31–11.33): the book colours the hydrocarbon end blue and the ionic end red; a view that draws atoms uses `F.el`, and a schematic view that draws the ends as regions uses `F.cat(2)` for the nonpolar tail and `F.cat(3)` for the ionic head, never a type hue.
- **Categorical series**: the five gases of 11.8 and the eight solids of 11.16 take `F.cat(i)` per curve, skipping any index the section already binds to a role; the curve is never coloured by the type of its axis.
- **Physical colours**: potassium dichromate's orange (11.2), bromine's deep orange (11.15), red iron(III) hydroxide sol, the gold sol, the scattered searchlight beam and a solution's own colour in a photograph stay as fact, each a named constant as the book's `RULES.md` allows.
- **Solvent and solution curves** on one graph (11.23) are told apart by stroke, solid for the solvent and dashed for the solution, as the book draws them; both wear `pressure` against `temperature` axes, and the regions are named in ink, never shaded by type.

## What stays in ink

Mole fractions, K<sub>b</sub>, K<sub>f</sub>, the Henry's law constant k, the van't Hoff factor i, R, densities, percent by mass, g per 100 g of water, counts of particles, charges on ions, the attractions between particles, the membrane, every axis rule and label that is not one of the bound types. No `\k` macro appears except for the bound types: `\kCg`, `\kPg`, `\kmolal`, `\kM`, `\kPA`, `\kPAstar`, `\kPcomp`, `\kPcompstar`, `\kPsoln`, `\kPsolvstar`, `\kdPvp`, `\kosm`, `\kT`, `\kdTb`, `\kdTf`, `\kn`, `\km`, `\kt`, `\kdH` or `\kq` in 11.1.

## As built (chapter pass, 2026-09-28)

| Section | Binds |
|---|---|
| `intro` | nothing |
| 11.1 | `energy` only, on the three ΔH steps and ΔH of solution in Figure 11.4; the cold pack stays a photograph, so `temperature` is not bound; helium and argon take `F.el` (the palette now grades the noble gases by period) |
| 11.2 | nothing; the bulb's glow is the named physical colour `BULB_LIGHT` |
| 11.3 | `concentration` (C<sub>g</sub>, the solubility axes), `pressure` (P<sub>g</sub>), `temperature` (T and the axes of 11.8 and 11.16) |
| 11.4 | `concentration` (m, M), `pressure` (P<sub>solution</sub>, P*, Π and the pressure bars), `temperature` (T, ΔT<sub>f</sub>, the phase diagram's axis); `amount`, `mass` and `time` are not bound, since no readout states them and no clock is drawn as a quantity; the red cell is the named physical colour `CELL_RED` |
| 11.5 | nothing; butterfat and mud particles `F.cat(0)`, the laser beam `LASER_GREEN` and the oil `OIL_AMBER` as physical colours |
