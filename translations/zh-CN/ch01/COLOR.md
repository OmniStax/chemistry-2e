# Chapter 1 colour plan

Prepared 2026-09-12 and restated under root `RULES.md` item 7 on 2026-10-04.
It refines the book's `COLOR.md` for what this chapter draws and names; item
7 and root rule 22 hold, and nothing here invents a hue. Colour reaches the
chapter in item 7's four ways, and where two apply the earlier wins: fact,
convention, referent, category.

## Facts and conventions

The one fact colour of the chapter is the NFPA hazard diamond of 1.3: its red,
blue, yellow and white are the sign's own and go through `F.fact`, with the
sign's black numerals beside them, so the reader's Facts and conventions
switch reaches them. With that switch off the quadrants are drawn as empty
panels outlined in ink.

Every atom and molecule takes its element's colour through `F.el`: the water
of 1.1 and 1.6, the hydrogen and oxygen over the electrodes of 1.15, the
molecules of 1.14 and the fuel cell of 1.16. The phase of a sample is told by
how its molecules pack, never by a tint. No particle in this chapter stands for
matter in general: each picture names what it draws, and what it draws has an
element.

## Referents

A referent is a vessel, a sample or an object that a figure draws and the text
names; each figure's referents take the referent hues in table order, clear of
the categories that figure draws.

| Section | Figure | Referents |
|---|---|---|
| 1.1 | Figure 1.5 | the beaker of water |
| 1.2 | Figure 1.6 | the narrow and the wide container that hold one sample |
| 1.2 | Figure 1.8 | the sealed bottle of beer precursor and the lead-acid battery |
| 1.2 | Figure 1.15 | the hydrogen tube and the oxygen tube |
| 1.3 | the extensive-against-intensive Sim | the jug of milk |
| 1.4 | the density Sim | the cube of lead of Example 1.1 and the cube of gold beside it; the other five solids of Table 1.4 take the referent palette by index, since the text never names them one by one |
| 1.4 | the displacement Sim | the iron block and the wood block of Example 1.2; the foam, unknown and other samples that only the exercises name are drawn in ink |
| 1.5 | the rebar and gold-piece figures of Example 1.7 | the piece of rebar, and the piece of yellowish material |
| 1.5 | Figure 1.27 | the four archers, (a), (b), (c) and the fourth corner |

A referent's outline, label and hover name wear its hue; a quantity drawn on
it keeps its category's. The balances, cylinders and thermometers are
apparatus and stay in ink. The three thermometers of Figure 1.28 are not
referents: they read one temperature on three scales, and three hues would
say they were three things.

Where a figure offers a material (gold, lead, water, ethanol) the block is a
sample, not an atom: it is drawn in a neutral fill or in its referent hue,
never in an element colour.

## Categories

Every category the book declares is coloured on every page. A symbol wears
its category through its macro and its section's variables row; a word wears
it where it names a particular one the reader can point at on the page, a
value given in the text, a reading or a drawn quantity, and stays ink where it
names the kind in general, a unit, a definition or a generic case.

| Category | Where it is coloured |
|---|---|
| `temperature` | the slider and thermometer columns of 1.1, 1.3 and 1.6, the reference temperatures and readings the text gives in 1.1, 1.3, 1.4 and 1.6 |
| `mass` | the balance readings and mass bars of 1.2, 1.3, 1.4 and 1.5, the m of the density readouts, and the masses the text gives in examples |
| `volume` | the sample and its levels in 1.2, 1.3, 1.4 and 1.5, the gas collected over the electrodes, the V of the readouts, the volumes of the examples and of Table 1.5's dispensers |
| `density` | the density slider and readout results of 1.4, the density bar of 1.3, the d of 1.3's readout, and the densities the text names in 1.3 to 1.6 |
| `length` | the bar of Figure 1.23, the edge of the cubes in 1.4, the offset and spread of Figure 1.27, the diameters of 1.2, the bathtub's sides in 1.5 and the distances of 1.6 |
| `time`, `velocity` | the sprinter of 1.6, in words only |

The chapter's text writes `\kV`, `\kviron`, `\kT`, `\km` and `\kTC`, `\kTF`,
`\kTK` in maths. `v_iron` of Example 1.2 is the chapter's own symbol: its v
wears volume and its subscript the iron block's referent hue.

## How density's mass and volume are told apart

Density is coloured, and its figures keep its parts apart by what each colour
is on:

- **Mass is the balance.** The display, the number it reads and the m of the
  readout wear the mass hue.
- **Volume is the water and the reading.** The water level, the bracket that
  measures the rise, the volume slider and the V of the readout wear the
  volume hue.
- **Density is the result.** The density slider, the quotient of the readout
  and the density bar wear the density hue; the word density in the book's
  own `\text{density} = \text{mass}/\text{volume}` stays as the book writes it.
- **A sample doubled keeps its hues.** In 1.3 the mass and the volume bars
  climb with the sample while the density and the temperature bars stand
  still; the contrast is carried by what moves.

The cubes of 1.4 go through the drawing layer's locked view, their faces the
page colour under the share of ink each one's angle to the lamp earns it; the
edge written beside a cube is a length and wears it.

## The temperature scales of 1.6

Celsius, Fahrenheit and kelvin are one category and take one hue. They are
variants of `temperature`: the book's own argument in 1.6 is that the three
scales differ in where their zero sits and how large their degree is, which
is a fact about the scales and not about the quantity. Figure 1.28 paints all
three columns, ticks and readings in the temperature hue and tells the scales
apart as the book's figure does: by the label at the head of each column, by
decoration (the Celsius column filled, the other two hollow), and by the
freezing and boiling temperatures of water drawn across all three in ink.
`T_C`, `T_F` and `T_K` carry `\kTC`, `\kTF` and `\kTK`, so the conversion
equations wear the one hue on both sides.

## What stays in ink

A count, a percent (of composition or by mass), a significant figure and the
digits that are dropped, an accuracy and a precision, a conversion factor and
the units that cancel inside one, the numbers of the significant-figure
exercises of 1.5 (they are numbers being rounded, not readings), the names of
the elements and of the states of matter, the outlines of the apparatus, and
every label, bracket, axis rule and arrow that is not a quantity.

Three symbols look like typed ones and are written without a `\k` macro:

- **the l, w and d of 1.5's bathtub**, `V = l × w × d`: they are lengths and
  their words wear length, but no length symbol of the book has a macro for
  them, so the letters stay plain; the d is a depth, not a density;
- **the m and b of 1.6's derivation**, `y = mx + b`, a slope and an
  intercept;
- **the W and g of Table 1.6's footnote**, `W = mg`, where only the m is the
  book's mass symbol and wears it.

Nothing in this chapter is coerced into a neighbouring category to save a
colour: a length is not a volume, and a temperature scale is not a category.
