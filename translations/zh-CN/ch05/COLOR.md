# Chapter 5 colour plan

Prepared 2026-09-28 with `config.md`, brought under root item 7 on 2026-10-04. It refines the book's `COLOR.md` (root items 7 and 22) for what this chapter draws and invents no hue.

## What the chapter colours

Categories are coloured on every page; the chapter's quantities are `energy`, `temperature`, `mass` and `heat-capacity`, with `amount`, `volume`, `concentration`, `density`, `length`, `area` and one `time` where an example names a particular one. A word or phrase wears its category where it names a particular one: a pan's 18,140 J and 50.0 °C, a sample's grams, a metal's specific heat, a reaction's moles and kilojoules. A category named in general (the definition of heat capacity, "the heat absorbed" in a rule, the standard state's 1 bar and 298.15 K) stays ink.

| Page | Categories in the text | Referents | Facts and conventions |
|---|---|---|---|
| `intro` | none | none | the match photograph |
| 5.1 | the two pans' heats, masses, temperature changes and heat capacities; the masses, temperatures and heats of Examples 5.1 and 5.2; the specific heats of water and of the unknown metal | samples H and L (`sim-heat-flow`), the small and the large frying pan (`sim-heating`) | water molecules in the element palette |
| 5.2 | the masses, volumes, temperatures, specific heats and heats of every example; the density of water; the bomb's heat capacity | the hot metal M (the rebar of Example 5.3 on load), the cool water W, the solution of Examples 5.5 and 5.6 and the coffee cup calorimeter (`sim-calorimeter`) | the metal's element colour |
| 5.3 | the moles, grams, litres and kilojoules of each thermochemical example; the enthalpies the text quotes; the altitude of Kilimanjaro and the algae's 39,000 km² | none | none |

## Rules for this chapter

- Heat, work, internal energy and enthalpy are one category and share the energy hue (the book's `COLOR.md`); q and w are told apart by label and by arrow style, heat as a plain arrow and work as a dashed one, never by hue. ΔH°, ΔH<sub>f</sub>° and ΔH<sub>c</sub>° are told by their marks.
- Specific heat c and heat capacity C are one category, `heat-capacity`, the specific heat its per-gram variant. The molar heat capacity, Calories per gram, a percent and the stoichiometric coefficient n stay in ink.
- T<sub>initial</sub> and T<sub>final</sub> share the temperature hue with ΔT; heat gained and heat lost differ by the arrow's direction and sign, not by colour.
- A symbol whose subscript names a referent is split: C<sub>small pan</sub> and C<sub>large pan</sub> in 5.1, q<sub>substance M</sub>, q<sub>substance W</sub> and q<sub>solution</sub> in 5.2. A subscript that names a thing no figure draws (q<sub>rebar</sub>, q<sub>bomb</sub>, the water of Examples 5.4 and 5.7) stays with its symbol.
- Particles keep their element colours, which outrank referents: a referent of this chapter is a sample, a pan, a vessel or a liquid the text names, drawn with `F.ref` on its outline, label and graph curve, never on a molecule. The water molecules of 5.1 are oxygen red and hydrogen white through `F.el`, their speed the only sign of temperature; the metal of 5.2 is filled in its element's colour and outlined in its referent's.
- A metal or a solution in a calorimeter is not tinted by its temperature; a temperature is told by the temperature hue on the thermometer, the slider and the symbol.
- Nothing is coerced into a neighbouring category: a specific heat is not an energy, and a density is not a mass.

## As built

- `intro`: the match photograph only.
- 5.1: `sim-heat-flow` draws temperature and energy, the two boxes, their labels and their temperature curves in the referent colours of samples H and L; `sim-heating` draws energy, temperature, mass and heat capacity, the two pans as dashed lines in their referent colours.
- 5.2: `sim-calorimeter` draws energy, temperature, mass and heat capacity; the metal, the water or solution and the calorimeter's cups and cover carry their referent colours, and the graph's curves take the colours of the metal and of the water or solution.
- 5.3: `sim-first-law` and `sim-hess` draw energy only.
- `sim-heat-flow` is the chapter's one three-dimensional figure, physical 3D by the book's rule for a particle picture; every other figure is flat.
