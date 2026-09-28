# Chapter 7 colour plan

Prepared 2026-09-12 for 7.6 and extended 2026-09-28 to the whole chapter. It refines the book's `COLOR.md` for the quantities this chapter actually draws; root rules 7 and 22 hold, and nothing here invents a hue.

## What each section binds

| Section | Binds | Families of rule 7 |
|---|---|---|
| Intro | nothing | a kept photograph |
| 7.1 | nothing | element palette (Na, Cl and the ions of the lattice); a kept photograph |
| 7.2 | `energy` (the potential energy of Figure 7.4 and the 436 kJ of breaking H<sub>2</sub>, where a figure draws or reads it out) | element palette (H, Cl and any pair chosen); ink for electronegativity and ΔEN |
| 7.3 | nothing | element palette for any atom drawn as an atom; Lewis symbols and structures in ink |
| 7.4 | nothing | ink; categorical `F.cat(i)` only if resonance forms must be told apart, never a type hue |
| 7.5 | `energy` (bond energies D, ΔH, ΔH°, ΔH<sub>f</sub>°, ΔH<sub>s</sub>°, IE, EA, ΔH<sub>lattice</sub>, the steps of the Born-Haber ladder) | element palette for ions; ink for charges Z, the distance R<sub>o</sub>, the constant C and bond lengths |
| 7.6 | nothing from the scheme | element palette and ink (as built) |

## Energy in 7.2 and 7.5

Every energy of the chapter is one type. A bond energy is an energy per mole, a variant by its unit; the enthalpy of a reaction, its standard value, an enthalpy of formation or sublimation, an ionization energy, an electron affinity and a lattice energy are all energies, told apart by symbol and label and never by hue. In the Born-Haber ladder the arrows are energy and point up or down by their sign; the levels are labelled species in ink. The potential energy axis of Figure 7.4 and its readout are energy; the internuclear distance is length and stays ink.

## What stays in ink, and why

- **Electronegativity and ΔEN.** A dimensionless relative number, untyped by the book's list.
- **The partial charges δ+ and δ−.** Not bound as `charge`. The book's `COLOR.md` types the charge of Millikan's drops and of the electrons of electrolysis, which a figure reads in coulombs; a partial charge is written as δ with a sign, never as a number with a unit, and what the figures draw is the electronegativity difference that sets it. Binding `charge` would tie the δ of a C–H bond to the coulombs of Faraday's law, the coercion rule 7 forbids. The same holds for the ionic charges Z<sup>+</sup> and Z<sup>−</sup> of 7.5 and the formal charges of 7.4: small integers of bookkeeping, not quantities in coulombs.
- **Bond length, interionic distance, bond angle.** Length is untyped by the book's list, and an angle is geometry. The bracket that measures 1.21 Å across C=O in Figure 7.14 and the arc of 118° are ink.
- **The bond dipole moment μ and the molecular dipole.** The product of a charge and a distance, with no type; drawn as arrows in ink, told apart by weight.
- **A count of valence electrons, lone pairs and bonds.** Counts are untyped.

## How the figures stay legible without the scheme

The element palette carries what the scheme would otherwise carry: every atom, ion and molecule with an identity takes its element colour through `F.el(symbol)` and never as a hex literal (carbon black, hydrogen white with an ink outline, oxygen red, nitrogen blue, chlorine green, sulfur yellow, sodium purple, and the rest of the CPK table). The Na<sup>+</sup> and Cl<sup>−</sup> of Figure 7.3 are sodium and chlorine in their element colours, the smaller sphere the cation as the book draws them. A generic E or X before a molecule is chosen is a sketch of a shape and takes the panel's grey with its letter, as the book's Figure 7.19 draws it. Element colours do not switch off with colour coding.

A Lewis structure is notation, not a picture of atoms: its symbols, dots, dashes, brackets and charges are ink, and the red dots the book uses in Figure 7.10 and in 7.3's inline images to mark transferred or shared electrons are a categorical mark, `F.cat(0)`, not a type. Everything else separates by weight and shape rather than hue: a bond is a line and a lone pair a cloud; a measured angle an arc and a distance a bracket; a bond moment an arrow whose length is its magnitude; a solid is lit, not coloured, with a transparent clear colour so the page shows through in both themes and every colour read from `PAL` and `F.el()` on each draw.

A viewpoint is not a slider: a 3D scene is turned by dragging and by its buttons, and the sliders that remain carry chemical quantities.

Nothing in this chapter is coerced into a neighbouring type to save a colour. A shape is not a quantity, a partial or formal charge is not the charge of Faraday's law, and a bond length is not a type.
