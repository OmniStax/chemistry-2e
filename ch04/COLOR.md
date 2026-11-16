# Chapter 4 colour plan

Prepared 2026-09-28 with `config.md`, brought under root item 7 on 2026-10-04. It refines the book's `COLOR.md` for what this chapter draws; root items 7 and 22 hold and nothing here invents a hue.

## What the chapter colours

Categories are coloured on every page; the chapter's quantities are `amount`, `mass`, `volume` and `concentration`, with one `time` (the airbag's inflation in 4.3). A word or phrase wears its category where it names a particular one: a sample's grams, a reaction's moles, a titrant's volume and molarity. A category named in general (the definition of molarity, "the amount of product" in a rule) stays ink.

| Page | Categories in the text | Referents | Facts and conventions |
|---|---|---|---|
| `intro` | none | none | the rocket photograph |
| 4.1 | the moles in one reading of the methane equation | the mixtures before and after reaction (`sim-methane`) | molecules in the element palette |
| 4.2 | the stomach's 0.03 M acid | the two solutions poured together (`sim-precipitation`) | ions and molecules in the element palette; the colours of the precipitates |
| 4.3 | the moles and masses of each example, the recipe's cups, the airbag's grams, litres and seconds | substances A and B of the general route (`sim-flowchart`) | molecules in the element palette |
| 4.4 | the moles and masses of each example and of ibuprofen | the bread and the cheese (`sim-sandwich`) | molecules in the element palette |
| 4.5 | volumes, molarities, moles and masses of each analysis | the buret and the sample of acid (`sim-titration`); the furnace, the sample burned and the two absorbers (`sim-combustion`) | molecules in the element palette; the indicator's pink, the absorber grains and the furnace glow |

## Rules for this chapter

- A stoichiometric factor, a coefficient, a subscript, an atom count, a mole ratio and a percent (yield, atom economy, mass percent) are untyped and ink.
- The route boxes of the book are shaded by kind (yellow mass, pink moles, lavender volume). The unnumbered route boxes of 4.3 and 4.5 are the book's images and keep that shading; where a figure draws a route of its own (Figure 4.11, the two route Sims of 4.4), a box takes the category hue of the quantity it holds, which is the book's own idea in the scheme's colours.
- Particles keep their element colours, which outrank referents: a referent of this chapter is a container, a sample, a vessel or an ingredient the text names, never a molecule. The sandwich ingredients, which have no element, are the referents bread and cheese, drawn with `F.ref`.
- The same category on two substances (moles of H₂ and moles of Cl₂) keeps one hue; the substances are told apart by label and by their atoms' element colours, never by a second hue.
- Nothing is coerced into a neighbouring category: molarity is not an amount, a mass percent is not a mass, and an ion's charge written as 2+ is a count.

## As built

- `intro`, 4.1, 4.2: molecules and ions in the element palette. The precipitate colours of 4.2 (PbI₂ yellow, AgI and Ag₂CO₃ pale, the white solids) are drawn through `F.fact`.
- 4.3: `amount`, `mass` and `volume` in `sim-flowchart`, `amount` in `sim-ammonia`; the four unnumbered route boxes are the book's images. `concentration` is not drawn, since no box of `sim-flowchart` holds a molarity.
- 4.4: `amount` and `mass` (the reaction boxes and the two gram-slider Sims); percent yield in ink.
- 4.5: `volume`, `concentration`, `amount`, `mass`; the water and carbon dioxide molecules of `sim-combustion` are in the element palette; the indicator pink, the two absorbers' grains and the furnace glow are drawn through `F.fact`. The three unnumbered route boxes are the book's images.
- Every figure is flat; none is three-dimensional.
