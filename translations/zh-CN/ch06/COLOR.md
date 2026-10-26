# Chapter 6 colour plan

Prepared 2026-09-12 for 6.2, extended on 2026-09-28 to the whole chapter, and
brought under root `RULES.md` item 7 on 2026-10-04. It refines the book's
`COLOR.md` for what this chapter draws; nothing here invents a hue. A category
is coloured on every page, so the lists below say what each section's figures
draw and which words its text marks, not a ceiling on the page.

## The chapter at a glance, by item 7's four ways

| Section | Categories its figures draw | Referents | Facts and conventions |
|---|---|---|---|
| Intro | none | none | the photograph |
| 6.1 | `wavelength`, `frequency`, `energy`, `temperature`, `velocity`, `length` (in the text) | the rope and its marked crest (6.2), the signal and the carrier (6.5), the string (6.7), the metal (6.11) | the colours of visible light through `F.fact`; the ejected electron through `F.el('e-')` |
| 6.2 | `energy`, `wavelength`, `length`, `velocity` (the c of a readout) | none | the colours of visible light through `F.fact`; the electron through `F.el('e-')` |
| 6.3 | `wavelength`, `mass`, `velocity`, `length`, `energy`, `momentum` (in the text) | the orbit (6.17); the source, the barrier and the screen (6.18) | the electron through `F.el('e-')`; `F.cat` for the two signs of a wavefunction |
| 6.4 | `energy` | the s, p, d and f blocks (6.27 + 6.29) | `F.el` for every atom; `F.cat` for the blocks of the filling-order diagram (6.26), which the text never names one by one |
| 6.5 | `energy`, `length` | none | `F.el` for every atom and ion |

## What stays in ink

The quantum numbers n, l, m_l and m_s and the values a transition runs
between, the nuclear charge Z and the effective nuclear charge Z_eff, Planck's
constant h and ħ, the Rydberg constant R∞, the Balmer constant k of 6.1, the
amplitude of a wave, the intensity and probability-density axes, the nucleus,
and every label, tick and rule that is not a quantity of a category.

The speed of light c, the Bohr radius a₀ and Bohr's k of 6.2 are constants that
are values of a category, and wear it: c is a velocity, a₀ a length, Bohr's k
an energy.

**n is not an amount of substance.** The book's `n` carries the macro `\kn`
and the type `amount`; the n of this chapter is a quantum number, a label on
an allowed orbit or a count of half-wavelengths with no dimension. It has its
own row under the key `n_quantum`, with no macro, and is never written with
`\kn`.

## The colours of the spectrum are a fact

The visible band on the spectrum, the wavelength strip beneath the Bohr
ladder, the blackbody curves and the photons of the photoelectric effect are
painted in the colours of visible light through `F.fact`: a line at 656 nm is
red because light of that wavelength is red. A line in the ultraviolet or the
infrared falls outside the painted band and is drawn in the wavelength hue,
which says that it has a wavelength and no colour. The spectrum's colours are
on the band and the lines lying in it; the wavelength hue is on the axis, the
ticks and the λ of the readout.

## How the ladder and the strip are tied together (6.2)

- **Energy is the ladder.** The rungs, the arrow between two of them, the
  bracket of the jump and the Eₙ, ΔE and k of the readout wear the energy hue.
- **Wavelength is the strip.** The axis beneath, its ticks and numbers, and
  the λ of the readout wear the wavelength hue.
- **The readout colours them.** λ = hc ÷ |ΔE| is written with ΔE in the energy
  hue, λ in the wavelength hue, c in the velocity hue and h in ink.
- **The electron is a particle with an identity** and takes `F.el('e-')`; it
  is the thing whose energy the rung states, not the energy itself. The
  nucleus of a one-electron atom or ion is drawn in ink with its charge
  written beside it.
- **The orbit radius is a length.** In the orbit-and-rung Sim the radius line
  and its r label wear the length hue.

## Referents

- **6.1.** The rope and the marked crest of the travelling wave, the signal
  and the carrier of AM and FM (one curve each), the vibrating string of
  Figure 6.7, and the metal slab of the photoelectric effect. The waves drawn
  on them keep their category hues: the wavelength bracket on the rope, the
  half-wavelength bracket under the string.
- **6.3.** The orbit the electron wave runs around, drawn dashed and again
  unrolled; the electron wave on it keeps the wavelength hue. The source, the
  barrier with its two slits, and the screen of the double-slit Sim, the
  screen in both its edge-on and face-on views.
- **6.4.** The four blocks of the periodic table in the folded Figure 6.27 +
  6.29, which the caption and the list of element classes name one by one.

Particles keep their element colours whatever the text calls them: an atom,
an ion, an electron or a proton is never a referent.

## What the text marks

Words that name a particular wavelength, frequency, energy, temperature,
speed, length, mass or momentum the reader can point at (a value, a drawn
scale, a plotted curve, an example's unknown) wear their category through
`<span data-type>`; a law, a definition or a trend true of every atom stays in
ink. In 6.5 the radii a sentence quotes are lengths, and the ionization
energies and electron affinities it quotes are energies; IE₁ and its kin are
written with `\kIE` and EA with `\kEA` where the text uses them as symbols.
