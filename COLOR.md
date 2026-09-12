# Chemistry 2e colour plan

Prepared 2026-09-12 in the full-book pass (root rule 22). Root rule 7
holds: a colour belongs to a type, a type is a kind of quantity, the
book declares its types and says nothing about their hues, and a page
colours only the types its figures draw. Rule 7 now names four families
of colour, and chemistry is the book that uses all four: the scheme's
type hues, the chemist's own habit of colouring every atom by element,
the colours that are physical facts, and a small categorical palette for
instances that must be told apart. This plan says what each family is
for in this book and how they are kept apart. A chapter's own `COLOR.md`
refines this one for the quantities it draws; it may bind fewer types,
never invent a hue.

## The four families

**Quantities are coloured by the scheme.** An amount of substance, a
mass, a volume, a concentration, a pressure, a temperature, an energy
and the rest are types in `book.json`, dressed by the app from its
palette in declaration order, and a symbol, a slider and a drawn thing
of that type share the hue: the mole slider, the n in PV = nRT and the
count of particles in the box are one colour, and the pressure gauge,
the P and the pressure axis are another. Colour coding can be switched
off, and then every quantity renders in ink.

**Every atom, ion, molecule and particle with an identity is coloured
by element, always.** The book draws its molecules in one fixed palette,
stated in its captions and alt texts (carbon black, hydrogen white,
oxygen red, nitrogen blue, chlorine green, sulfur yellow, phosphorus
orange, copper brown, sodium purple, titanium gray), which is the
conventional CPK colouring. An element is not a quantity and has no
dimension, so it is not a type and takes nothing from the scheme. The
palette lives in the app as `omnistax-web/src/lib/fig/elements.ts`,
keyed by element symbol, with a light and a dark value for each so that
a white hydrogen reads on a light canvas (a light disc with an ink
outline) and a black carbon reads on a dark one, and a figure reaches it
through `figlib` as `F.el('O')`, never as a hex literal. It is not gated
on the atoms needing to be told apart, and it is not reserved for the
molecular drawings of the later chapters: a particle box draws the gas
the reader chose in that element's colours, never an anonymous grey
dot, and a figure that would otherwise draw a generic particle gives it
an identity so that it can have one. An ion keeps its element colour and
carries its charge as a mark. Element colours do not switch off with
colour coding, since they are the book's own drawing convention rather
than a signal the app adds, and they do not appear in the colour menu.

**Colour that is the physical fact is drawn as the fact.** A line at
656 nm on a spectrum is red because light of that wavelength is red; a
flame test, an indicator at its endpoint, a copper solution, a complex
ion and a hazard diamond are their own colours. These are pictures of
what the reader would see, not statements about a quantity, and they
stay when colour coding is switched off.

**Instances that must be told apart, and carry no type and no element,
take the categorical palette.** Three gases plotted on one graph, four
archers on four targets, three isotopes on one axis, the samples of a
table: the app provides a small ordinal palette as `F.cat(i)`, and a
page never draws it in a hue it has bound to a type on that page. The
periodic table sheet's own shading of metals, metalloids and nonmetals
and its symbol colours for solids, liquids and gases are categorical in
this sense and belong to the sheet alone. Like the element and physical
colours, the categorical palette stays when colour coding is switched
off.

A figure that draws more than one family keeps them apart by what each
colour is on: atoms are always filled discs in element colours;
quantities are always sliders, symbols, arrows, axes and shaded regions
in scheme hues; a physical colour is on the thing that has it and
nowhere else; and a categorical colour is on the line or the marker of
the series it names.

**The test for one figure**: everything in it with an identity is
coloured, or the whole figure is ink. There is no half-coloured figure,
no box of grey particles beside a coloured gauge. A phase is told by
packing, as the book draws it, and not by colour; a temperature is shown
by its type hue on the symbol and the slider, never as a warm-to-cold
tint on a body.

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

Ink is for the frame and for untyped scalars, and for nothing that has
an identity. The frame is the axes, rules, tick marks, brackets, arrows
that measure rather than mean, apparatus outlines (the walls of a vessel,
a piston rod, a balloon's string, the barrel of a syringe) and the
labels. The untyped scalars are the quantities the book leaves without a
type: length and radius (the bond length of 7.2 is measured along an
axis but never coloured as a type), density, a count of atoms or
molecules (the subscripts and coefficients of a formula), a percent
(yield, composition, abundance), a mole ratio and a stoichiometric
factor, an equilibrium constant and a reaction quotient (Q, K, K_a,
K_sp: dimensionless, and derived from concentrations that already carry
the hue), a rate constant, an oxidation number, a quantum number, an
atomic number Z and a mass number A, electronegativity, and a formal
charge. These are labels, ratios and counts, and colouring them would
make a page wallpaper. A figure that plots Q against time colours the
concentrations it is built from and draws Q in ink. An atom, a molecule
or a particle is never in this list: it has an element, and it takes
that element's colour.

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
it draws in the element palette and ink. Binding is a matter of the
scheme alone; the element, physical and categorical colours are not
bound, and a page draws them wherever it draws the things that carry
them. The plan for a section lists
what it binds, and the chapter's `COLOR.md` says which of the fourteen
types its pages reach and confirms that nothing is coerced into a
neighbouring type to save a colour.
