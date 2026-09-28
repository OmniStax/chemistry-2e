# Chapter 3 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for the quantities this chapter draws; root rules 7 and 22 hold and nothing here invents a hue.

## What the chapter binds

Four of the book's fourteen types, the head of its order, so the hues are the best separated the scheme has.

| Type | Where | What wears it |
|---|---|---|
| `amount` | 3.1, 3.2, 3.3 | the moles in the mass–mole–number chain, the n of every readout, the moles of each element in the empirical-formula figure, the moles of solute in a beaker |
| `mass` | 3.1, 3.2, 3.3, 3.4 | the grams on the balance and the mass slider, the molar mass ℳ as its per-mole variant (same hue, told by its unit and label), the element masses of the empirical-formula figure, the masses of solute and solution in a mass percentage |
| `volume` | 3.3 | the volume of solution, V₁ and V₂ (V₁ hollow or dashed, V₂ filled), L, L₁, L₂ |
| `concentration` | 3.3 | the molarity M, M₁, M₂, C₁, C₂ (the initial dashed or hollow), a concentration axis |

| Section | Binds |
|---|---|
| `intro` | nothing |
| 3.1 | `mass` and `amount`; the formula-mass figure binds nothing of the scheme (amu masses of single atoms are a mass, but the figure's counts and subtotals are read as a sum, so it binds `mass` only if its readout states a mass) |
| 3.2 | `mass` and `amount`; the percentages and the mole ratios stay in ink |
| 3.3 | `amount`, `volume`, `concentration`; `mass` only where a figure weighs the solute |
| 3.4 | `mass` only, as built: the two sliders of the ppm Sim and the masses in its readout; volume is in prose and the kept flowchart; a percentage, ppm and ppb are untyped and ink; a density is ink |

## What stays in ink

A count of atoms or molecules and Avogadro's number (a count per mole), the subscripts of a formula and the formula units per molecule (`n_fu`, never the amount hue), a percent, ppm and ppb, a mole ratio and the "divide by the smallest" step, density, the flowchart boxes and arrows, the apparatus outlines. A mass percentage is a ratio of two masses and is not a mass.

## Element, physical and categorical colours

Every atom and molecule, the models of chloroform, aspirin, NaCl, ibuprofen, glycine, dopamine and saccharin and any solute particle, is drawn through `F.el`; the sodium purple and chlorine green of the book's NaCl model are the element palette. The colour of a solution (the blue of copper nitrate in 3.16, paling as it is diluted) is a physical fact, drawn as the fact in a named constant, and it is never the concentration hue: the concentration hue is on the slider, the symbol and the readout, not tinting the liquid. Samples told apart without a type or an element (the eight samples of Figure 3.5 if a figure draws them together) take `F.cat(i)`.

Nothing is coerced: molar mass is a mass (per mole), not an amount; molarity is a concentration, not an amount; a percent is not a mass.

## As built

3.1 binds `mass` and `amount` in the mass–mole–number Sim; its formula-mass Figure keeps its sums in ink. 3.2 binds `mass` on its sliders and `amount` on the moles. 3.3 binds `mass` on the balance of the molarity Sim, `amount`, `volume` and `concentration`; the copper nitrate blue is the named constant `CU_NITRATE`, its opacity following the concentration, and the water `WATER`. 3.4 binds `mass` only. Every atom and ion is drawn through `F.el`.
