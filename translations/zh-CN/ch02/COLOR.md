# Chapter 2 colour plan

Prepared 2026-09-28 and applied with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold, and nothing here invents a hue. Every atom is drawn in its element's colour through `F.el`, the book's convention and not a colouring.

## What the chapter colours

A category is coloured on every page, so the chapter colours whichever of the book's categories its words, symbols and figures name. In practice that is `mass`, `charge`, `temperature` and once `concentration`, with atoms in the element palette and a handful of referents.

| Section | Categories named | Referents |
|---|---|---|
| `intro` | none | none |
| 2.1 | `mass`: the grams of carbon, hydrogen, oxygen, copper and chlorine the text and the two Sims weigh; the mass ratio itself is ink, as a ratio of two masses is not a mass | samples A, B and C of Table 2.1, on the isooctane Sim's notches |
| 2.2 | `charge` for Millikan's drop charges and the electron's charge; `mass` for the electron's mass | the cathode ray tube, its cathode and anode; Millikan's oil drops; the gold foil, the lead block and the luminescent screen |
| 2.3 | `mass` for the masses of the particles and isotopes and every average atomic mass in amu; `charge` for the charges of particles and ions | boron-10 and -11, neon-20, -21 and -22, chlorine-35 and -37 on the average-mass Sim; the sample and the magnetic field of the mass spectrometer |
| 2.4 | none | none: every molecule is in the element palette |
| 2.5 | none | none: the elements page does its own colouring |
| 2.6 | `charge` for the charge of a particular ion; `temperature` for the melting and boiling points of sodium chloride and water | none: ions are in the element palette |
| 2.7 | `charge` for the charges of iron's and the example's ions; `concentration` for the 0.02 ppb health goal for Cr(VI) | none |

Z, A, the numbers of protons, neutrons and electrons, abundances and percents are counts and ratings and stay ink everywhere.

## Rules the sections keep

- A subatomic particle has no element, so it takes the palette's entries for lone particles: protons, neutrons and electrons take `F.el('p+')`, `F.el('n0')` and `F.el('e-')` and are told apart by label and size, a sign drawn on them in ink; they never take the charge hue, since a particle is a body and a body takes no type hue. The charge hue is on the number that states a charge.
- The mass-to-charge ratio of a cathode ray or a mass spectrum axis is a derived quantity with no type in this book; it is ink.
- A percent abundance, a fractional abundance, Z, A, a count of atoms, a subscript and a Roman numeral are ink.
- Isotopes of one element are one element where they are drawn as atoms or ions, in its palette colour. Where a figure draws them as series side by side (bars, peaks), an isotope the text names one by one is a referent through `F.ref` (2.3's average-mass Sim), and one it never names singly keeps `F.cat` (lithium there, every isotope of the mass spectrometer).
- A referent here is a vessel, an apparatus part or a sample the text names (the tube, the foil, the drops, a sample of Table 2.1), never a particle. A referent made of an element (the cathode, the foil) keeps the element colour on its body and wears its referent colour on its outline or name. A compound whose own colour is the fact (2.1's green and brown copper chlorides) is not a referent, since its words would wear a hue that contradicts its name.
- The glow of 2.2's luminescent screen is zinc sulfide's green, drawn through `F.fact`.
- The cathode ray is the book's yellow in Figure 2.6(c), an illustration's choice and not the beam's own colour; a beam of electrons is not a type or a referent, so it is drawn as electrons in `F.el('e-')`.

Nothing is coerced into a neighbouring type to save a colour.

## As built

Rebuilt under item 7's four ways on 2026-10-04: the old per-page gate is gone, every section marks the words that name a particular quantity of a category, and the referents above are listed in each section's `referents` and drawn with `F.ref`. The element palette carries Al, Se, Zr, Pb and Cr, so no atom of the chapter falls back to "other".
