# Chapter 4 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue.

## What the chapter colours

Four of the book's fourteen types: `amount`, `mass`, `volume` and `concentration`. Nothing is added.

| Section | Colours |
|---|---|
| `intro` | nothing |
| 4.1 | nothing by default. The molecules are in the element palette through `F.el`; coefficients and atom counts are counts and stay ink. If a figure puts the equation on a mole scale with a slider, it colours `amount` |
| 4.2 | nothing by default. Ions and molecules in element colours, an ion carrying its charge as a mark; oxidation numbers are untyped and stay ink; the yellow of PbI2, the blue of Cu²⁺ and an indicator colour are physical facts |
| 4.3 | `amount` and `mass` (the mole and mass boxes of the route), `volume` and `concentration` where the route starts from a solution |
| 4.4 | `amount` (moles of each reactant and of product, leftovers as the same hue hollow), `mass` where the example gives grams; percent yield is untyped and stays ink |
| 4.5 | `volume` (titrant delivered, sample volume), `concentration` (titrant and analyte molarity), `amount` (moles or millimoles at equivalence), `mass` (precipitate, absorbers) |

## Rules for this chapter

- A stoichiometric factor, a coefficient, a subscript, an atom count, a mole ratio and a percent (yield, atom economy, mass percent) are untyped and ink.
- The route boxes of the book are shaded by kind (yellow mass, pink moles, lavender volume); where a figure redraws them, a box takes the type hue of the quantity it holds, which is the book's own idea in the scheme's colours.
- Reactants that must be told apart and have no single element (sandwich ingredients) take `F.cat(i)`; a molecule is always its elements.
- The same type on two substances (moles of H2 and moles of Cl2) keeps one hue; the substances are told apart by label and by their atoms' element colours, never by a second hue.
- Nothing is coerced into a neighbouring type: molarity is not an amount, a mass percent is not a mass.

## As built (chapter pass, 2026-09-28)

- `intro`, 4.1, 4.2: nothing coloured. Molecules and ions in the element palette; the precipitate colours of 4.2 (PbI₂ yellow, AgI and Ag₂CO₃ pale) and the white solids are named in `figures.js` as physical facts.
- 4.3: `amount`, `mass` and `volume` in the route boxes and `sim-flowchart`; `concentration` is not drawn, since no route box of 4.3 holds a molarity that the figures colour.
- 4.4: `amount` and `mass` (the reaction boxes and the two gram-slider Sims); percent yield in ink.
- 4.5: `volume`, `concentration`, `amount`, `mass`; the indicator pink, the two absorber grains and the furnace glow are named as physical facts.
- Every figure is flat; none is three-dimensional.
