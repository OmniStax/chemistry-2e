# Chapter 7 colour plan

Prepared 2026-09-12 for 7.6, extended on 2026-09-28 to the whole chapter, and
brought under root `RULES.md` item 7 on 2026-10-04. It refines the book's
`COLOR.md` for what this chapter draws; nothing here invents a hue. A category
is coloured on every page, so the lists below say what each section's figures
draw and which words its text marks, not a ceiling on the page.

## The chapter at a glance, by item 7's four ways

| Section | Categories its figures draw | Referents | Facts and conventions |
|---|---|---|---|
| Intro | none | none | the photograph |
| 7.1 | none (`energy` and `amount` in the text) | none | `F.el` for the Na⁺ and Cl⁻ of the lattice and every ion chosen |
| 7.2 | `energy` and `length` (Figure 7.4), `charge` and `dipole-moment` (Figure 7.5 + 7.8) | none | `F.el` for every atom; `F.cat` for the metals, metalloids and nonmetals of Figure 7.6 |
| 7.3 | none | none | Lewis symbols and structures in ink; `F.cat(0)` for the electrons each step places |
| 7.4 | none | none | Lewis structures in ink; `F.cat(0)` for the chosen atom's electrons |
| 7.5 | `energy`, `length` (the bond lengths of Table 7.3 and the R<sub>o</sub> of the lattice) | none | `F.cat` for the C–C, C–N and C–O series of the bond-length graph, which the text never names one by one |
| 7.6 | `angle`, `length` (Figure 7.14), `dipole-moment`, `charge`, `time` (the regions Sim's trace) | the negative and the positive plate (Figure 7.28) | `F.el` for every atom; the generic E and X in the panel grey |

## Energy in 7.2 and 7.5

Every energy of the chapter is one category. A bond energy is an energy per
mole, a variant by its unit; the enthalpy of a reaction, its standard value, an
enthalpy of formation or sublimation, an ionization energy, an electron
affinity and a lattice energy are all energies, told apart by symbol and label
and never by hue. In the Born-Haber ladder the arrows are energy and point up
or down by their sign; the levels are labelled species in ink. The potential
energy axis of Figure 7.4 is energy and its internuclear distance is length,
on the axis and on the slider.

7.5 writes its symbols with their macros, so they wear the hue of the section's
variables rows: ΔH as `\kdH`, ΔH° as `\kdHo`, the bond energy D as `\kDbond`
(D<sub>H–H</sub> as `\kDbond_{\text{H–H}}`), ΔH<sub>lattice</sub> as `\kdHlat`,
ΔH<sub>f</sub>° as `\kdHf`, ΔH<sub>s</sub>° as `\kdHs`, IE and EA as `\kIE` and
`\kEA`, and the interionic distance R<sub>o</sub> as `\kRo`. The ΔH of 7.1 and
7.2 is `\kdH` too, with a variables row in each.

## Lengths, angles and dipole moments in 7.6

- **Angle.** The arcs and the degrees written on them in Figures 7.14, 7.15,
  7.16 + 7.19 + 7.20, 7.18 and 7.21, and the smallest angle the regions Sim
  marks on its sphere and traces against time, wear the angle hue. The ideal
  angles the text quotes (109.5°, 120°, 180°) are marked where they name the
  angle of a molecule on the page.
- **Length.** The bracket of the C=O bond distance in Figure 7.14 and its 1.21 Å.
- **Dipole moment.** Every bond-moment arrow and the molecular dipole of the
  bench of Figure 7.26 + 7.27, the arrows of the OCS and chloromethane sketches,
  and the crossed arrow of Figure 7.5 + 7.8 in 7.2. μ is written `\kmu`; in
  μ = Qr, Q is `\kQpart` (charge) and r is `\krbond` (length).
- **Charge.** The partial charges δ+ and δ− are partial charges, which the
  book's `COLOR.md` types as `charge`: the δ marks of Figure 7.5 + 7.8, of the
  H₂S and NH₃ sketch and of the molecules of Figure 7.28 wear it, and so do the
  words that name the partial charge of a particular atom on the page. The
  δ written in the book's own maths (Table 7.1) has no variables row and stays
  ink.

## What stays in ink, and why

- **Electronegativity and ΔEN.** A rating on Pauling's scale, which the book's
  `COLOR.md` keeps in ink.
- **Ionic and formal charges.** The Z<sup>+</sup> and Z<sup>−</sup> of the
  lattice energy, the 2+ of an ion and the formal charges of 7.4 are counts of
  elementary charges, bookkeeping integers, not coulombs; the lattice Sim's
  charge choices and its ions M and X are ink.
- **The constant C of the lattice energy.** A constant of one law with no kind
  of its own.
- **Counts.** Valence electrons, lone pairs, bonds and regions of electron
  density, and the sliders that set them.

## Referents

- **7.6.** The negative and the positive plate of Figure 7.28, drawn with
  `F.ref` and marked in the paragraph and the caption that name them. The
  partial charges on the molecules between them keep the charge hue.

Particles keep their element colours whatever the text calls them: an atom, an
ion or a molecule is never a referent. Lewis structures are notation: their
symbols, dots, dashes, brackets and charges are ink, and the red mark the book
uses for the electrons of one step is `F.cat(0)`.

## How the figures stay legible

Every atom, ion and molecule with an identity takes its element colour through
`F.el(symbol)` and never as a hex literal; a generic E or X takes the panel's
grey with its letter, as the book's Figure 7.19 draws it. A bond is a line and
a lone pair a cloud; a measured angle an arc and a distance a bracket; a bond
moment an arrow whose length is its magnitude. A solid is lit, not coloured,
and every colour is read from `PAL`, `C` and `F.el()` on each draw. A viewpoint
is not a slider: a 3D scene is turned by dragging and by its buttons.
