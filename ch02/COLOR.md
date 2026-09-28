# Chapter 2 colour plan

Prepared 2026-09-28 and applied with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold, and nothing here invents a hue. A page colours only the types its figures draw, its sliders carry or its readouts state; every other symbol is ink, and every atom is drawn in its element's colour through `F.el`, the book's convention and not a binding.

## What the chapter binds

Two of the book's fourteen types, `mass` and `charge`, far apart in the declared order and so well separated in hue.

| Section | Binds | What wears it |
|---|---|---|
| `intro` | nothing | one photograph |
| 2.1 | `mass`, where a figure weighs the elements of a compound (the grams of carbon and hydrogen of Table 2.1, the grams of chlorine per gram of copper) | the mass readings and bars; the mass ratio itself is ink, as a ratio of two masses is not a mass |
| 2.2 | `charge` for Millikan's drop charges and the plates' signs where a figure states a charge; `mass` only if the electron's mass is read out | the charge readout and its multiples of e; the α particle and the nucleus are drawn as particles in ink or the element palette, never in the charge hue |
| 2.3 | `mass` for isotopic masses and the average atomic mass in amu; `charge` for the charge of an ion in a builder Sim | the mass of each isotope and the average's marker; the net-charge readout. Z, A, the numbers of protons, neutrons and electrons, abundances and percents are counts and stay ink |
| 2.4 | nothing | formulas and molecules in ink and the element palette |
| 2.5 | nothing | the elements page does its own colouring |
| 2.6 | `charge` where a figure states an ion's charge or balances charges into a formula | the charges and their running total; ions themselves in the element palette |
| 2.7 | nothing | names and formulas in ink |

## Rules the sections keep

- A subatomic particle has no element, so the palette does not reach it. Protons, neutrons and electrons are told apart by label, size and a sign drawn on them in ink, with `F.cat` if a figure needs a categorical colour for three kinds; they never take the charge hue, since a particle is a body and a body takes no type hue. The charge hue is on the number that states a charge.
- The mass-to-charge ratio of a cathode ray or a mass spectrum axis is a derived quantity with no type in this book; it is ink.
- A percent abundance, a fractional abundance, Z, A, a count of atoms, a subscript and a Roman numeral are ink.
- Isotopes of one element are one element: drawn in its palette colour and told apart by label (mass number) or by `F.cat` where several isotopes are compared side by side.
- The cathode ray is the book's yellow in Figure 2.6(c); a beam of electrons is not a type, so it is drawn in ink or the accent, and the section plan names the choice.

Nothing is coerced into a neighbouring type to save a colour.

## As built

The bindings are as tabled, with one narrowing: 2.2 binds `charge` alone, since no figure reads out a mass. 2.1 and 2.3 bind `mass`; 2.2, 2.3 and 2.6 bind `charge`. The element palette now carries Al, Se, Zr, Pb and Cr, so no atom of the chapter falls back to "other".
