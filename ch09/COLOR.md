# Chapter 9 colour plan

Prepared 2026-09-12, and applied with `config.md`. It refines the book's
`COLOR.md` for the quantities this chapter actually draws; root rule 7 and root
rule 22 hold, and nothing here invents a hue. The app dresses the book's
fourteen declared types from its own palette in declaration order, and a page
colours only the types its figures draw, its sliders carry or its readouts
state. Every other symbol on that page renders in ink, and every particle
of gas on it renders in the element colours of the gas it is, which is the
book's own convention and not a binding.

Only 9.2 is built in this pass, so this file says what 9.2 binds and leaves the
chapter's other five sections to the pass that builds them.

## What the chapter binds

Four of the book's fourteen types, and the book's own `COLOR.md` predicted
exactly this page: "a Chapter 9 page binds amount, volume, pressure and
temperature, all four, and the reader sees the whole gas law in colour."

| Type | Where it is bound | What wears it |
|---|---|---|
| `pressure` | 9.2 | the gauge face and its needle, the pressure axis of the P–T and P–V graphs, the P of every readout and of PV = nRT, the 1/P axis of the linearized graph |
| `volume` | 9.2 | the body of the gas in the cylinder and the syringe, the piston's travel, the volume axis of the V–T and P–V graphs, the balloon outlines of Figure 9.18, the V of every readout |
| `temperature` | 9.2 | the temperature slider, the bath and the hot plate's heat, the temperature axis of the P–T and V–T graphs, the T of every readout |
| `amount` | 9.2 | the amount slider, the count of moles in the readout, the n of PV = nRT |

`time` is not bound. Two figures of the section move, but neither gives a time a
reading of its own: the gas box's particles travel so that the gauge has
something to read, and the breathing figure's cycle is a breath rather than a
measured interval. A clock that is not read is not a quantity the page draws.
`concentration`, `mass`, `energy`, `entropy`, `rate`, `wavelength`, `frequency`,
`potential` and `charge` are untouched; the section neither draws nor states
them. The masses the book writes in Example 9.9 and in several exercises (655 g
of methane, 77.8 g of nitrogen) are converted to moles in the prose and never
drawn, so `mass` stays unbound and those numbers are ink.

Section by section, for the one section built:

| Section | Binds |
|---|---|
| 9.2 | `pressure`, `volume`, `temperature`, `amount` |

## How the four are told apart

Four hues on one canvas is the most this book asks of a page, and the whole
point of the section is that the reader should see the four quantities as four
distinct things that one equation ties together. They are told apart by what
each colour is on, not by decoration:

- **Pressure is the gauge.** The dial face, the needle, the tick marks it swings
  across, the pressure axis of a graph and the P of a readout are the pressure
  hue, and nothing else on the canvas is.
- **Volume is the space the gas fills.** The shaded body of gas between the
  piston and the closed end, the piston's travel, the syringe barrel's fill, a
  balloon's outline, the volume axis and the V of a readout are the volume hue.
  The walls of the vessel are ink: a wall is a boundary, not a volume.
- **Temperature is the heat under the vessel.** The slider, the hot plate's
  glow, the bath, the temperature axis and the T of a readout are the
  temperature hue.
- **Amount is the count of moles.** The slider, the number of moles in the
  readout and the n of the equation are the amount hue. The particles drawn
  inside the box are **not** in the amount hue: a particle is a thing, not a
  quantity, and colouring the discs in the amount hue would say that a drawn
  particle is a mole. Nor are they ink. The gas box draws the gas the reader
  picks, from a named control in ink over He, N₂, O₂, Ar and CO₂, and every
  particle is that gas drawn in its element's colours through `F.el`: a
  single disc for helium and argon, two blue discs for nitrogen, two red for
  oxygen, a black carbon between two red oxygens for carbon dioxide. The
  reader ties the discs to n by watching the count change with the slider,
  which is what the figure is for, and ties them to a substance by their
  colour. The sealed sphere of Figure 9.10 draws its particles the same way,
  as the nitrogen and oxygen of the air the book fills it with.
- **The equation binds all four.** PV = nRT is written with each symbol in the
  hue of its type and R and the equals sign in ink, and the live numbers each in
  the hue of the quantity they belong to, so the reader's eye goes from the
  gauge to the P, from the gas body to the V, from the slider to the T and from
  the count to the n without a legend.

## Initial and final states

Where a graph of the section lays more than one gas on one pair of axes, as
the tables the book prints beside Figures 9.11 and 9.12 invite and as a Sim
that compares the gases of the box would, the lines are told apart by the
categorical palette, `F.cat(i)` in the order the gases are listed, and never
by a hue the page has bound to `pressure`, `volume`, `temperature` or
`amount`; the axes keep their type hues, and the legend names each gas in
ink beside its colour. Nothing in 9.2 draws such a graph yet, and the
statement is here so that the one that does draws it this way.

Every law of the section is stated twice: once as a proportionality and once as
an equality between two states, P₁/T₁ = P₂/T₂ and its three companions. The two
states are variants of one type, not two types, and the book's own `COLOR.md`
says how a variant is marked: same hue, told apart by decoration.

So on a canvas that draws both states — the syringe at its first volume and at
its second, the sphere before and after it is warmed — the initial state is
drawn **hollow or dashed** and the final state **filled**, both in the hue of
their type, and the subscripts 1 and 2 are set in ink beside the symbol. The
eight symbols `P_1`, `P_2`, `V_1`, `V_2`, `T_1`, `T_2`, `n_1` and `n_2` have
rows in `book.json` carrying the type of the quantity they are a state of, and
the macros `\kPone`, `\kPtwo`, `\kVone`, `\kVtwo`, `\kTone`, `\kTtwo`, `\knone`
and `\kntwo`, so both sides of every two-state equation wear one hue and the
reader sees at a glance that an equation relates one quantity to itself.

## What stays in ink

The ideal gas constant R, which is a constant of proportionality and not a
quantity the reader varies; the proportionality constant k the book writes in
each of the four laws, for the same reason; a molar mass and every mass in a
prompt; a count of particles, though never the discs that draw them; a unit name, whether
kPa, torr, psi, atm, bar or L; the subscripts 1 and 2; the names of the four
laws and of the chemists they are named for; the walls of a vessel, a piston
rod, a syringe plunger, a balloon's string; and every axis rule, tick, bracket,
arrow and label that is not a quantity of a bound type.

Two lines on the graphs deserve naming. The **dashed extrapolation to absolute
zero** on Figures 9.11 and 9.12 is drawn in the hue of the quantity its axis
carries, since it is the same line continued beyond the data; and the **marker
at absolute zero itself** is drawn in ink, since a named point on an axis is a
label rather than a reading. The book's own data points are drawn in the hue of
the quantity on the vertical axis, and the fitted line with them.

The element palette reaches every figure of this section that draws a
particle, since root rule 7 gives every particle with an identity its element
colour and gives a generic one an identity so that it can have one. Figure
9.18's three balloons hold whichever gases the reader chooses, and the
figure's whole argument is that the gas does not matter, so the three balloons
themselves are drawn alike in the volume hue, named in ink, and the one thing
that differs between them, the mass on the label, is ink as well. The
molecules drawn inside them are each in their element's colours through
`F.el(symbol)`, hydrogen as a light fill with an ink outline, so that a
balloon of helium and a balloon of ammonia hold visibly different molecules
in visibly the same volume, which is the book's own drawing convention and
not a signal about any quantity. The gas box and the sealed sphere draw their
particles the same way, as said above, and no figure of the section draws a
grey particle: each figure is either coloured throughout, its quantities in
their type hues and its particles in their element colours, or it is ink
throughout, and the test of rule 7 is met on every canvas.

Nothing in this section is coerced into a neighbouring type to save a colour. A
pressure is not a force, an amount is not a mass, a volume is not a length, and
the two states of one quantity are one type.
