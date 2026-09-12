# Chapter 7 colour plan

Prepared 2026-09-12, and applied with `config.md`. It refines the book's
`COLOR.md` for the quantities this chapter actually draws; root rule 7 and
root rule 22 hold, and nothing here invents a hue. Only 7.6 is built in this
pass, so only 7.6 is settled below.

## What the chapter binds

None of the book's fourteen types. Section 7.6 is a section about shape, and
a shape is not a quantity with a dimension. Its figures draw molecules, the
regions of electron density around a central atom, the angles between them and
the vectors that stand for their bond moments, and not one of those is a time,
an amount, a mass, a volume, a concentration, a pressure, a temperature, an
energy, an entropy, a rate, a wavelength, a frequency, a potential or a
charge. The book's own `COLOR.md` anticipates this case and says what to do
with it: a figure of molecules alone draws in the element palette and in ink,
and binds nothing.

| Section | Binds |
|---|---|
| 7.6 | nothing from the scheme; the element palette and ink |
| 7.1 to 7.5 | not built in this pass |

## The three quantities that look typed and are not

**The partial charges of a bond, δ+ and δ−, are not bound as `charge`.** The
book's `COLOR.md` types the charge of Millikan's drops and of the electrons
counted in electrolysis, both of which a figure gives a reading in coulombs.
A partial charge is not measured that way here: the section writes it as δ
with a sign, never as a number with a unit, and what the figures actually draw
is the electronegativity difference that sets it. Electronegativity is in ink
by the book's own list. Binding `charge` to colour a symbol the page never
gives a value to would make the page wallpaper and would tie the partial
charge of a C–H bond to the coulombs of Faraday's law, which is exactly the
coercion root rule 7 forbids. The δ+ and δ− of every figure are ink.

**The bond dipole moment μ is not a type and has none.** It is the product of
a charge and a distance and the book declares no type for it, so the μ of
μ = Qr, the vectors that represent it and the molecular dipole that sums them
are all drawn in ink, told apart by what they are drawn as: a bond moment is
an arrow along its bond with a plus sign at its tail, and the molecular dipole
is a single heavier arrow from the centre of the molecule.

**A bond length and a bond angle are in ink.** The book's `COLOR.md` puts
length and radius in ink and names the bond length of 7.2 as the case, and an
angle in degrees is a geometric measurement rather than a quantity of the
book's. The bracket that measures 1.21 Å across a C=O bond in Figure 7.14 and
the arc that measures 118° between two C–H bonds are both ink, as are their
readouts.

## How the figures stay legible without the scheme

The element palette carries what the scheme would otherwise carry. An atom is
always a filled disc in its element colour, from the fixed map the book's
`COLOR.md` describes (carbon black, hydrogen white, oxygen red, nitrogen blue,
chlorine green, sulfur yellow, fluorine and xenon from the rest of the CPK
table), reached through `F.el(symbol)` and never as a hex literal; until
`figlib` has that map, the atoms are drawn in ink and told apart by size and
by fill, hollow for the lighter atom and filled for the heavier, with the
element's symbol set beside each, and the section plan says so. They do not
switch off with colour coding, because they are the book's own drawing
convention rather than a signal the app adds.

Everything that is not an atom is ink, and the drawings separate by weight and
by shape rather than by hue:

- **A bonding region is a line and a lone pair is a cloud.** A bond is drawn
  as a rule from the central atom to a terminal atom; a lone pair is drawn as
  a filled lobe with no atom at its end, larger than a bond's region, as the
  section's own size order requires. The contrast the section is teaching, the
  one between electron-pair geometry and molecular structure, is carried by
  which regions have an atom on them and which do not.
- **A measured angle is an arc and a measured distance is a bracket.** Both in
  ink, both labelled beside the mark and inside the canvas.
- **A bond moment is an arrow and its length is its magnitude.** The length of
  the arrow follows the electronegativity difference, as the book's Figure
  7.26 draws it, and a small plus sign marks the partially positive end.
- **A face of a projected solid is shaded, not coloured.** `figlib`'s `face()`
  fills with the panel colour and lays ink over it for the shading, so the
  tetrahedron and the octahedron read as solids in both themes without any
  hue at all.
- **The two projection sliders are ink.** A yaw and a pitch are a viewpoint,
  not a quantity of the book's, and a slider with no type carries no hue.

## What stays in ink

Every region of electron density, every bond and every lone pair; a bond
length, a bond angle and every arc, bracket or rule that measures one; a
partial charge, a bond moment, a molecular dipole and the electronegativity
difference that sets them; the plates and the field lines of Figure 7.28; the
names of the five electron-pair geometries and of the molecular structures
that follow from them; the yaw and the pitch of the projection; and every
label, axis rule and arrow that is not an atom.

Nothing in this chapter is coerced into a neighbouring type to save a colour.
A shape is not a quantity, a partial charge is not the charge of Faraday's
law, and a bond angle is not a type.
