# Chemistry 2e colour plan

The rule is root `RULES.md` item 7. This file records what is particular to
this book: its categories, its variants, and the conventions and facts it
draws. A chapter's `COLOR.md` may refine it, never inventing a hue.

## Categories, in palette order

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
| 10 | `rate` | rate, the slope of a concentration–time curve | M/s | A derived quantity of its own, and not the rate constant, which has its own place |
| 11 | `wavelength` | λ | nm | The spectra of Chapter 6 are read in wavelength; a length, but the book never draws another |
| 12 | `frequency` | ν | Hz | Not a wavelength and not a time; its own quantity, read off its own axis |
| 13 | `potential` | E_cell, E°, electrode potentials | V | The voltmeter of every cell figure |
| 14 | `charge` | q, the coulombs of Faraday's law, a partial charge | C | Millikan's drops in 2.2 and the electrons counted in electrolysis |
| 15 | `density` | d, ρ, of a substance, a gas or a fluid | g/mL | A property of the material, which tells one substance from another |
| 16 | `equilibrium-constant` | K, K_c, K_P, K_w, K_a, K_b, K_sp, K_f, K_d, Henry's k_H, the reaction quotient Q, and their p-functions | none | It differs with the reaction and the temperature, so it is no constant of nature; Q is its variant away from equilibrium |
| 17 | `momentum` | p, Δp | kg·m/s | De Broglie's wavelength and Heisenberg's principle in 6.3 |
| 18 | `wavefunction` | ψ, Ψ | m⁻³ᐟ² | The thing an orbital is drawn from in 6.3 |
| 19 | `dipole-moment` | μ of a bond | C·m | A property of the bond, drawn as the dipole arrow of 7.6 |
| 20 | `velocity` | v, u, u_rms | m/s | The molecular speeds of 9.5 and the electron of 6.3 |
| 21 | `angle` | the contact angle, the Bragg angle | ° | Capillary rise in 10.2 and diffraction in 10.6 |
| 22 | `colligative-constant` | K_b, K_f | °C/m | A property of the solvent, a temperature change per molality |
| 23 | `surface-tension` | T | N/m | A property of the liquid in 10.2 |
| 24 | `rate-constant` | k, k_f, k_r, the frequency factor A as its high-temperature limit | M¹⁻ⁿ/s | One kind though its unit changes with the order: it differs with the reaction and the temperature |
| 25 | `force` | F | N | The force a gas exerts on a wall in 9.1 |
| 26 | `acceleration` | g | m/s² | The barometer and the manometer of 9.1 |
| 27 | `heat-capacity` | C, and the specific heat capacity c as its per-gram variant | J/°C | A property of the calorimeter or the substance in 5.1 |
| 28 | `area` | A | m² | The area a gas presses on in 9.1 |
| 29 | `length` | a bond length, a radius, a unit-cell edge, a plane spacing, a column height, an orbit radius, Δx | m, pm | A distance in the scene; the wavelength keeps its own place |

The first fourteen put the quantities every chapter draws first (time,
amount, mass, volume, concentration, pressure, temperature) and the ones a few
chapters draw last. The fifteen after them were added under the test of root
`RULES.md` item 7 (2026-10-04), in the order that keeps each apart from the
quantities it is drawn beside: every such pair stands 60° or more apart.

These are not categories, and stay in ink: a constant of nature whose kind
nothing else shares (Planck's constant, Avogadro's number, the gas constant,
the Rydberg constant); a constant that is a value of a category wears it, so
the speed of light is a velocity, the elementary charge a charge and the Bohr
radius a length; a count or a label (the
subscripts and coefficients of a formula, a quantum number, an atomic number
Z and a mass number A, an effective nuclear charge, an oxidation number, a
formal charge, a reaction order, a van't Hoff factor, an order of
diffraction); and a rating, one number comparing two quantities of one kind
(a percent of yield, composition or ionization, a mole fraction, a mole ratio,
a compressibility factor, electronegativity on Pauling's scale). A constant
of one law with no kind of its own (the van der Waals a, the lattice-energy
constant, the Clausius–Clapeyron constant) stays in ink too; the van der Waals
b is a molar volume and wears volume.

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

## Conventions

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
carries its charge as a mark. A free
electron is drawn with `F.el('e-')`, the palette's own colour for it; a bare
nucleus drawn without its electrons is not yet an atom of any element, and is
drawn in ink as a filled disc with its charge written beside it. Element
colours follow the reader's Facts and conventions switch, since they are the
book's own drawing convention rather than a signal the app adds, and they do
not appear in the colour menu.

## Facts

**Colour that is the physical fact is drawn as the fact.** A line at
656 nm on a spectrum is red because light of that wavelength is red; a
flame test, an indicator at its endpoint, a copper solution, a complex
ion and a hazard diamond are their own colours. These are pictures of
what the reader would see, not statements about a quantity, and they
stay when colour coding is switched off.

## Referents

Instances that must be told apart and carry no element are referents of
their section: three gases plotted on one graph, four archers on four
targets, three isotopes on one axis, the samples of a table. The periodic
table sheet's own shading of metals, metalloids and nonmetals and its symbol
colours for solids, liquids and gases belong to the sheet alone.

A figure keeps the ways apart by what each colour is on: atoms are filled
discs in element colours; quantities are sliders, symbols, arrows, axes and
shaded regions in category hues; a physical colour is on the thing that has
it and nowhere else; a referent colour is on the thing or the series it
names. A phase is told by packing, as the book draws it, and a temperature by
its hue on the symbol and the slider, never as a warm-to-cold tint on a body.
