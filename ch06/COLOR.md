# Chapter 6 colour plan

Prepared 2026-09-12 for 6.2 and extended on 2026-09-28 to the whole
chapter, and applied with `config.md`. It refines the book's `COLOR.md` for
the quantities this chapter actually draws; root rule 7 and root rule 22
hold, and nothing here invents a hue. The app dresses the book's fourteen
declared types from its own palette in declaration order, and a page
colours only the types its figures draw, its sliders carry or its readouts
state. Every other symbol on that page renders in ink. The chapter declares
no new type.

## The chapter at a glance

| Section | Types it may bind | Other families |
|---|---|---|
| Intro | none | the photograph |
| 6.1 | `wavelength`, `frequency`, `energy`, `temperature` | the colours of visible light on spectra, fringes and blackbody bands |
| 6.2 | `energy`, `wavelength` (as built) | the colours of visible light on the strip |
| 6.3 | `wavelength`, `mass`, `energy` | `F.cat` for the two signs of a wavefunction's lobes; `F.el` for any named atom |
| 6.4 | `energy` | `F.el` for every atom and ion; `F.cat` for the s, p, d and f blocks |
| 6.5 | `energy` | `F.el` for every atom and ion |

A section binds a type only where a figure draws it, a slider carries it or
a readout states it; the list is a ceiling, and the section's plan says
what it actually binds.

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

## 6.1 Electromagnetic Energy

- **`wavelength`** on every λ: the bracket between two peaks of the wave,
  the wavelength axis of the spectrum and of the blackbody curves, λ_max
  (`\klammax`, a variant with the same hue, drawn as the marker at the peak
  of each curve), and the λ of each readout.
- **`frequency`** on ν: the frequency slider of the wave, the frequency
  scale of the spectrum and the threshold frequency of the photoelectric
  effect.
- **`energy`** on E = hν = hc/λ: the photon energy in readouts, the photon
  that strikes the metal and the energy scale beside the spectrum.
- **`temperature`** on the blackbody slider and its T.
- Ink: c, h, n, the amplitude, the intensity axis, the kinetic energy of an
  ejected electron only where no readout states it as an energy (if one
  does, it is `energy`), the Balmer and Rydberg constants and n₁, n₂.
- Physical fact: the visible band on the spectrum, the fringes, the band
  under the blackbody curve and the lines of a spectrum wear the colours of
  visible light, as on 6.2's strip; a line or a curve outside the visible is
  drawn in the wavelength hue. A metal is an element and takes `F.el`.

## 6.3 Development of Quantum Theory

- **`wavelength`** on the de Broglie λ, on the electron wave about the
  orbit and on its readout.
- **`mass`** on the m of λ = h/mv where a slider carries it (an electron to a
  softball).
- **`energy`** on the shells and subshell ladder (6.19, 6.22) where a figure
  draws energies, and on ΔE of the hydrogen transition.
- Ink: v and p (velocity and momentum are not book types), Δx and Δp, ħ, ψ
  and |ψ|², the quantum numbers n, l, m_l and m_s, r, the radial-distance
  axis and the probability-density axis, Δt (written once, not drawn).
- Categorical: the two signs of an orbital's lobes (the book's red and blue)
  take `F.cat(0)` and `F.cat(1)`, never a bound hue; spin up and spin down
  are arrows in ink.

## 6.4 Electronic Structure of Atoms

- **`energy`** on the orbital energy axis and its subshell rungs (6.24) where
  a figure draws them.
- `F.el` for every named atom and ion; the element of an orbital diagram is
  named in its label, its symbol coloured by `F.el`.
- Categorical: the s, p, d and f blocks of the periodic table (6.26, 6.27,
  6.29) take `F.cat(0..3)`, one per block, never a bound hue.
- Ink: the boxes and arrows of orbital diagrams, the configuration text,
  Z and every quantum number.

## 6.5 Periodic Variations in Element Properties

- **`energy`** on IE (`\kIE`, with IE₁, IE₂ as decoration) and EA (`\kEA`):
  the ionization and electron-affinity axes, bars and readouts.
- `F.el` for every atom and ion drawn (6.30, 6.32).
- Ink: every radius (a length, untyped), Z and Z_eff, the atomic-number
  axis.
- No coercion: a radius is not a wavelength, an ionization energy in kJ/mol
  is an energy (per-mole by its unit), not an amount.

## As built, 2026-09-28

- 6.1 binds `wavelength`, `frequency`, `energy` and `temperature` on its
  canvases, the colours of visible light as fact, and a metal through `F.el`.
- 6.3 binds `wavelength` and `energy` on its canvases and `mass` in the de
  Broglie readouts only, through `\km`; the lobe signs take `F.cat`, and the
  electron of the orbit wave and the double slit takes the electron's entry
  of `F.el`.
- 6.4 binds `energy` on the subshell ladder of the Aufbau figure, the blocks
  through `F.cat`, and its atoms through `F.el`.
- 6.5 binds `energy` on IE and EA, and every atom and ion through `F.el`;
  the radii stay in ink.
