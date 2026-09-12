# Chapter 6 colour plan

Prepared 2026-09-12, and applied with `config.md`. It refines the book's
`COLOR.md` for the quantities this chapter actually draws; root rule 7 and
root rule 22 hold, and nothing here invents a hue. The app dresses the book's
fourteen declared types from its own palette in declaration order, and a page
colours only the types its figures draw, its sliders carry or its readouts
state. Every other symbol on that page renders in ink.

Only 6.2 is built in this pass, so this file says what 6.2 binds and leaves
the other four sections for the pass that builds them.

## What 6.2 binds

Two of the book's fourteen types.

| Type | Where it is bound | What wears it |
|---|---|---|
| `energy` | the folded Figure 6.14 + 6.15, and the orbit-and-rung Sim | the rungs of the energy ladder, the arrow drawn between two rungs, the E<sub>n</sub> and ΔE of every readout, the energy axis the ladder is laid along, and the ionization limit at the top of it |
| `wavelength` | the folded Figure 6.14 + 6.15, and the series Sim | the wavelength strip beneath the ladder, its axis and its ticks, the λ of the readout, and each line the figure lays on the strip |

Nothing else is bound. `frequency` was considered as a third, since the
section writes ΔE = hν, and it is left unbound: the equation names ν once and
no figure of the section gives a frequency a reading, an axis or a slider, and
a symbol that is only written is not a quantity a page draws. A later section
that plots a frequency binds it then.

Two families of colour meet on this section's canvas, and neither is the
element palette. The type hues of `energy` and `wavelength` are the page's
own statement about two quantities, and the colours of the visible band are
a physical fact. The electron and the nucleus are the one place a reader
might expect a third, and they do not take it: the Bohr atom is a hydrogen
atom, but the section never draws it as an element among others, and the
disc that moves between the rungs is a particle with no element colour to
carry, since the element palette colours atoms and not the electron that
belongs to one. So the electron stays in ink, and the figure passes the
test of rule 7 by the other route: everything in it with an identity that
the section gives a colour to, the photon and the energy, is coloured, and
what remains is the frame and the particle whose energy is being stated.

## What stays in ink

The principal quantum number n and the two values of it a transition runs
between, the nuclear charge Z, the orbit radius r and the Bohr radius a₀,
Planck's constant h, the speed of light c, the Rydberg constant R<sub>∞</sub>
and the constant k that stands for the fundamental constants together, the
nucleus and the electron drawn on the canvas, and every label, tick, bracket
and rule that is not a quantity of a bound type.

Two of these are worth naming, because each looks like a typed symbol and is
not:

- **n is not an amount of substance.** The book's `n` carries the macro `\kn`
  and the type `amount`, and the n of this section is a quantum number, a
  label on an allowed orbit with no dimension at all. It has its own row in
  `book.json` under the key `n_quantum`, with its LaTeX and no macro, and it
  is never written with `\kn`.
- **r is not a volume and not a wavelength.** It is a length, which the book
  leaves untyped, and it is drawn as the radius of a circle in ink even when
  it sits beside the energy ladder whose rungs are coloured.

Nothing in this section is coerced into a neighbouring type to save a colour.
A quantum number is not an amount, a radius is not a wavelength, and a
constant is not a quantity.

## The colours of the spectrum are not a type

The wavelength strip beneath the Bohr ladder, and the axis of the series Sim,
paint the visible band in the colours of visible light: a line at 656 nm is
red because light of that wavelength is red. The book's `RULES.md` keeps this
as a convention of the book's own, like the atom palette of its molecular
drawings, and a figure that redraws a spectrum keeps those colours as a
physical fact rather than as a signal the app adds. They do not switch off
with colour coding and they do not appear in the colour menu.

The families are kept apart by what each colour is on. The spectrum's
colours are on the band and on the lines lying in it, and nowhere else; the
wavelength hue is on the axis, the ticks and the λ of the readout, which are
the page's statement about a quantity rather than a picture of light. A line
in the ultraviolet or the infrared falls outside the painted band and is drawn
in the wavelength hue, which is the honest way to say that it has a wavelength
and no colour.

## How the ladder and the strip are tied together

The figure's whole argument is that one difference of energies makes one line
of light, so the two hues have to meet:

- **Energy is the ladder.** The rungs, the arrow that runs between two of
  them, the shaded height of the jump and the E<sub>n</sub> and ΔE of the
  readout are all the energy hue, and nothing else on the canvas is.
- **Wavelength is the strip.** The axis beneath, its ticks and its numbers,
  and the λ of the readout are all the wavelength hue.
- **The readout binds them.** λ = hc ÷ |ΔE| is written with the ΔE in the
  energy hue, the λ in the wavelength hue, and h, c and the quotient in ink,
  so the reader's eye goes from the arrow to the ΔE and from the line on the
  strip to the λ without a legend.
- **The electron is ink.** The disc that travels between the rungs is not an
  energy; it is the thing whose energy the rung states, and drawing it in the
  energy hue would say that the particle is the quantity. It is not an
  element either, so it takes nothing from the element palette: the figure's
  colours are the photon's own colour on the strip and the energy hue on the
  ladder, and the electron is the ink between them. The nucleus is ink for
  the same reason: it is drawn as a point the orbits are measured from, not
  as an atom of hydrogen among other atoms.

## The other four sections

6.1 will bind `wavelength`, `frequency` and `energy` for its waves, its
blackbody curves and its photon energies; 6.3 will bind `energy` and
`wavelength` for the electron waves and the orbital diagrams; 6.4 will bind
`energy` for the filling order; and 6.5 will bind `energy` for the ionization
energies and leave the radii in ink, a radius being a length. None of this is
settled here, and the pass that builds those pages settles it.
