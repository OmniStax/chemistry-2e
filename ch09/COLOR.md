# Chapter 9 colour plan

Prepared 2026-09-12 and brought in line with root `RULES.md` item 7 on
2026-10-04. It refines the book's `COLOR.md` for this chapter; item 7 and root
item 22 hold, and nothing here invents a hue. Colour reaches the chapter in
item 7's four ways, the earlier winning: fact, convention, referent, category.
Every particle of gas renders in the element colours of the gas it is, which
is the book's own convention and outranks a referent: a referent of this
chapter is a vessel, a sample, a curve or a body the text names, never the
molecules inside it.

## What the chapter colours

A category is coloured on every page. A word wears one when it names a
particular one the reader can point at (a value in an example, a reading in a
figure, a slider's quantity); the kind in general, a law, a unit and a
definition stay ink. The figures draw these:

| Category | Where a figure draws it |
|---|---|
| `pressure` | every gauge, the pressure axes, the partial-pressure bars, every P of a readout |
| `volume` | the body of gas in a cylinder, syringe, sphere or balloon, the volume axes, the lungs' fill |
| `temperature` | the temperature sliders and axes, every T of a readout |
| `amount` | the amount sliders and the n of a readout; never the discs |
| `mass` | the molar-mass axis of the density graph, the masses on Figure 9.18's balloons, ℳ in Graham's law and u_rms |
| `density` | the density line of the gas-density Sim, ρ in p = hρg (`\krho`) |
| `length` | the column height h of the barometer and the manometers (`\khcol`) |
| `force`, `area` | the force arrow and the area bracket of Figure 9.2 (`\kforce`, `\karea`) |
| `acceleration` | g in p = hρg (`\kgrav`) |
| `velocity` | the speed axes, v_p and u_rms on the distributions (`\ku`, `\kurms`) |
| `energy` | KE and KE_avg in the readouts of 9.5 |

`time` and `concentration` reach the chapter only in words (the 243 s of
Example 9.21, the CO₂ concentration of the greenhouse note); no figure reads a
clock, since the moving figures run so that a gauge or a count has something
to read. The density symbol d of 9.3 has no macro yet: its symbols row belongs
to Chapter 1, and until that chapter gives it one the d of 9.3's equations is
ink while the density line and the words are coloured.

## Referents, section by section

- **9.1** The mercury barometer and the water barometer of Figure 9.4: the tube
  walls and the name under each. The mercury is `F.el('Hg')` and the water a
  fixed ink opacity, as the substances they are; the column height is
  `length`.
- **9.2** The sealed sphere of Figure 9.10 (its glass and label), the syringe
  of Figure 9.13 (its barrel; the plunger stays ink), and the lungs and the
  diaphragm of Figure 9.15 (the lungs' outline over their volume fill, the
  diaphragm's stroke and label). The three balloons of Figure 9.18 are drawn
  alike in the volume hue, since the figure's argument is that the gas does
  not matter; the gas name is ink and the mass beside it is `mass`.
- **9.3** The cylinders of hydrogen, helium and neon in Figure 9.20: each
  cylinder's glass, its name, its row and its share of the partial-pressure
  bar. The reaction flask and the collection flask of Figure 9.21 (the book's
  "bottle" is the collection flask).
- **9.4** The left and right bulbs of Figure 9.27, and the lighter and heavier
  gas of the pair chosen (their count bars). ²³⁵UF₆ and ²³⁸UF₆ in the diffuser
  are referents: the uranium atom is `F.el('U')` and the ring round it the
  referent hue, since the isotope is the one difference.
- **9.5** The baseline and the changed cylinder of Figure 9.31; the xenon,
  argon, neon and helium curves of the distribution figure; the count of
  speeds in the gas-box Sim. The four temperature curves of one gas are not
  named one by one in the text and are told apart by `F.cat(i)`.
- **9.6** The five Z curves of Figure 9.35 (hydrogen, nitrogen, oxygen,
  methane, carbon dioxide), with the ideal line ink and dashed; the ideal and
  the real gas of Figure 9.36 (their boxes, labels and bar names).

No symbol of the chapter is split: P_A, P_B, ℳ_A and ℳ_B name generic gases
A and B in the text, and P₁, P₂ and their companions name states, not things.

## How the four gas-law quantities are told apart

Most canvases of 9.2 draw all four of pressure, volume, temperature and
amount. They are told apart by what each colour is on:

- **Pressure is the gauge.** The dial face, the needle, its ticks, the
  pressure axis and the P of a readout.
- **Volume is the space the gas fills.** The shaded body of gas, a balloon's
  outline, the volume axis and the V of a readout. A vessel's walls are ink,
  or the vessel's referent hue where the text names it.
- **Temperature is the heat under the vessel.** The slider, the temperature
  axis and the T of a readout; the bath and the plate are apparatus, never
  tinted by the temperature.
- **Amount is the count of moles.** The slider, the moles in the readout and
  the n of the equation. The particles are **not** in the amount hue: a
  particle is a thing, not a quantity. The gas box draws the gas the reader
  picks (He, N₂, O₂, Ar, CO₂) in its element colours, and the sealed sphere
  draws the nitrogen and oxygen of air.
- **The equation colours all four.** PV = nRT with each symbol and each live
  number in its hue, R and the equals sign in ink.

## Initial and final states

Every law of 9.2 is stated twice, as a proportionality and as an equality
between two states, P₁/T₁ = P₂/T₂ and its companions. The two states are
variants of one category: on a canvas that draws both, the initial state is
hollow or dashed and the final filled, both in the hue of their category, and
`\kPone`, `\kPtwo`, `\kVone`, `\kVtwo`, `\kTone`, `\kTtwo`, `\knone` and
`\kntwo` wear the hue of the quantity they are a state of. Where a graph lays
several gases on one pair of axes, each gas's line is a referent of that
figure and its axes keep their category hues.

The dashed extrapolation to absolute zero on Figures 9.11 and 9.12 is in the
hue of the quantity its axis carries; the marker at absolute zero is ink, a
named point being a label rather than a reading. The book's data points and
the fitted line take the hue of the vertical axis.

## What stays in ink

The gas constant R and the proportionality constant k of each law; the
compressibility factor Z and the van der Waals a (b is a molar volume and
wears `volume`); a mole fraction; a rate of effusion, which is not the book's
`rate`; a count of particles, though never the discs that draw them; a unit
name; the names of the laws and of their chemists; a piston rod, a plunger, a
balloon's string, a vessel no text names; and every rule, tick, bracket, arrow
and label that is not a quantity of a category or a referent. Nothing is
coerced into a neighbouring category to save a colour: a pressure is not a
force, an amount is not a mass, a volume is not a length.
