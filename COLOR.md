# Chemistry 2e colour plan

Prepared 2026-09-12 in the full-book pass (root rule 22). Root rule 7
holds: a colour belongs to a type, a type is a kind of quantity, the
book declares its types and says nothing about their hues, and a page
colours only the types its figures draw. Chemistry brings a second
family of colour alongside the scheme, the chemist's own habit of
colouring atoms by element, and this plan says how the two are kept
apart. A chapter's own `COLOR.md` refines this one for the quantities it
draws; it may bind fewer types, never invent a hue.

## The two families

**Quantities are coloured by the scheme.** An amount of substance, a
mass, a volume, a concentration, a pressure, a temperature, an energy
and the rest are types in `book.json`, dressed by the app from its
palette in declaration order, and a symbol, a slider and a drawn thing
of that type share the hue: the mole slider, the n in PV = nRT and the
count of particles in the box are one colour, and the pressure gauge,
the P and the pressure axis are another. Colour coding can be switched
off, and then every quantity renders in ink.

**Atoms are coloured by element.** The book draws its molecules in one
fixed palette, stated in its captions and alt texts (carbon black,
hydrogen white, oxygen red, nitrogen blue, chlorine green, sulfur
yellow, phosphorus orange, copper brown, sodium purple, titanium gray),
which is the conventional CPK colouring. An element is not a quantity
and has no dimension, so it is not a type and takes nothing from the
scheme. Element colours are a second, fixed, non-scheme palette that a
figure draws from directly, the way it draws ink and rules from `PAL`.
They do not switch off with colour coding, since they are the book's
own drawing convention rather than a signal the app adds, and they do
not appear in the colour menu. A figure that draws both families (a
particle box whose molecules are red and white while its pressure and
temperature are scheme hues) keeps them apart by what each colour is on:
atoms are always filled discs in element colours, and quantities are
always sliders, symbols, arrows, axes and shaded regions in scheme hues.

Where the element palette lives is a proposal, not app code written in
this pass: a constant map in `omnistax-web/src/lib/fig/elements.ts`,
keyed by element symbol, with a light and a dark value for each so that
a white hydrogen reads on a light canvas (an outlined disc) and a black
carbon reads on a dark one, exposed through `figlib` as `F.el('O')` and
never as a hex literal in a figure. The map carries the ten elements the
book names and the rest of the CPK table for the molecules the later
chapters draw. The periodic table sheet uses a third set of colours,
the book's own shading of metals, metalloids and nonmetals (yellow,
purple and peach) and its symbol colours for solids, liquids and gases
(black, blue, red), which are categorical and belong to the sheet alone.

## The types, in scheme order

| Order | Type id | The book's quantities | Dimension | Why it is a type |
|---|---|---|---|---|
| 1 | `time` | t, half-life t₁/₂ | s | Every moving figure has a clock, so time leads the list |
| 2 | `amount` | n, moles of anything | mol | The chemist's count; the mole slider is the first slider of Chapter 3 |
| 3 | `mass` | m, molar mass ℳ as its per-mole variant | g | Not a mere parameter here: the mass–mole–volume triangle is the subject of 3.1 and 4.3 and the balance is on every bench |
| 4 | `volume` | V, the volume of a gas or a solution, the titrant delivered | L | A slider in the gas box and the titration, an axis in Boyle's law |
| 5 | `concentration` | M, [X], and their p-functions pH and pOH | M | The quantity of every equilibrium and every rate law; pH is its logarithmic variant |
| 6 | `pressure` | P, partial pressures, vapour pressure | atm | A gauge, an axis, a slider; not a force, since the book never draws the force |
| 7 | `temperature` | T | K | The other slider of every gas and thermodynamics figure |
| 8 | `energy` | E, q, w, ΔH, ΔG, ΔU, bond energy, photon energy, the shaded area under a curve | J, kJ/mol | One type for every energy, with enthalpy and free energy as decorated variants; heat, work and internal energy share the one hue |
| 9 | `entropy` | S, ΔS | J/K | Not an energy; the T·ΔS term takes the energy hue only once it is multiplied by T |
| 10 | `rate` | rate, the slope of a concentration–time curve | M/s | A derived quantity of its own; the rate constant k is untyped, since its unit changes with the order |
| 11 | `wavelength` | λ | nm | The spectra of Chapter 6 are read in wavelength; a length, but the book never draws another |
| 12 | `frequency` | ν | Hz | Not a wavelength and not a time; its own quantity, read off its own axis |
| 13 | `potential` | E_cell, E°, electrode potentials | V | The voltmeter of every cell figure |
| 14 | `charge` | q, e, the coulombs of Faraday's law | C | Millikan's drops in 2.2 and the electrons counted in electrolysis |

Fourteen types, which is the length of palette the app's recommended
palettes provide, so every type gets a hue of its own. The order puts
the quantities every chapter draws first (time, amount, mass, volume,
concentration, pressure, temperature) and the ones a few chapters draw
last, so that a chapter binding only the head of the list gets the most
separated hues.

## What stays in ink

Length and radius (the bond length of 7.2 is measured along an axis but
never coloured as a type), density, a count of atoms or molecules (the
subscripts and coefficients of a formula), a percent (yield, composition,
abundance), a mole ratio and a stoichiometric factor, an equilibrium
constant and a reaction quotient (Q, K, K_a, K_sp: dimensionless, and
derived from concentrations that already carry the hue), a rate constant,
an oxidation number, a quantum number, an atomic number Z and a mass
number A, electronegativity, and a formal charge. These are labels,
ratios and counts, and colouring them would make a page wallpaper. A
figure that plots Q against time colours the concentrations it is built
from and draws Q in ink.

Two decisions worth naming. Mass is typed, though in a book of mechanics
it might pass as a parameter, because chemistry's central skill is turning a mass into an
amount and back, and a slider that is not coloured cannot be tied to
the m in the readout. Charge is typed though only two chapters draw it,
because the electrons crossing a cell's wire are the thing the reader is
meant to watch, and a count of them is a charge.

## Variants and decoration

Initial and final values (subscript i, f, 1, 2) share the hue: hollow or
dashed for the initial, filled for the final, so that [A]₀ and [A]
are one colour told apart by weight. A standard-state value (E°, ΔH°) keeps the hue and is told by
its mark. A partial pressure is a pressure; a molar quantity (kJ/mol) is
the same type as the quantity per sample. An enthalpy, a free energy and
an internal energy are all energies; where a figure draws ΔH and ΔG on
one ladder (16.4), they differ by dashing and label, never by hue.

## How a page binds

A page colours only the types its figures draw, its sliders carry or its
readouts state. A Chapter 1 page binds mass and volume for the density
cube and little else; a Chapter 9 page binds amount, volume, pressure
and temperature, all four, and the reader sees the whole gas law in
colour; a Chapter 17 page binds potential and charge, and its
concentrations only where the Nernst figure has a slider for them. A
figure of molecules alone (a Lewis structure, a geometry) binds nothing:
it draws in the element palette and ink. The plan for a section lists
what it binds, and the chapter's `COLOR.md` says which of the fourteen
types its pages reach and confirms that nothing is coerced into a
neighbouring type to save a colour.
