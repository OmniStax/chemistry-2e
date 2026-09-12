# Chapter 1 colour plan

Prepared 2026-09-12, and applied with `config.md`. It refines the book's
`COLOR.md` for the quantities this chapter actually draws; root rule 7 and
root rule 22 hold, and nothing here invents a hue. The app dresses the book's
fourteen declared types from its own palette in declaration order, and a page
colours only the types its figures draw, its sliders carry or its readouts
state. Every other symbol on that page renders in ink.

## What the chapter binds

Four of the book's fourteen types, and they are the first four the book
declares after `amount`, so the hues are well separated.

| Type | Where it is bound | What wears it |
|---|---|---|
| `mass` | 1.4, 1.5 | the balance reading, the m of the density readout, the mass slider of the cube, the mass axis where one is drawn |
| `volume` | 1.2, 1.4, 1.5 | the cube and its edge readout, the water level and the displaced volume in the cylinder, the V of the density readout, the litre and millilitre marks of the nested-volumes figure |
| `temperature` | 1.1, 1.3, 1.6 | the temperature slider of the water beaker, the thermometer columns and their three scales, the T of the conversion readouts, the temperature reading that does not change when the sample is doubled |
| `time` | 1.4 | the second where the base units are shown; bound only if the 1.4 figure gives the second a reading of its own, and left unbound otherwise |

`amount of substance` is not bound anywhere in the chapter: the mole is named
in Table 1.2 as a base unit and nowhere counted, and a unit named in a table
is not a quantity a figure draws. `concentration`, `pressure`, `energy`,
`entropy`, `rate`, `wavelength`, `frequency`, `potential` and `charge` are
untouched; the chapter neither draws nor states them.

Each section binds only its own share, and its plan lists it:

| Section | Binds |
|---|---|
| `intro` | nothing; the introduction page has one photograph and no figure of its own |
| 1.1 | `temperature`, where the water figure is warmed and cooled; nothing else |
| 1.2 | `volume`, for the beaker that keeps or loses its volume; the particle pictures are ink |
| 1.3 | `mass`, `volume` and `temperature`, for the extensive-against-intensive figure |
| 1.4 | `mass`, `volume`, and `time` if the second is given a reading |
| 1.5 | `volume` for the meniscus and the cylinders, `mass` where a mass is weighed beside them |
| 1.6 | `temperature` alone |

## How density's mass and volume are told apart

Density is the chapter's one derived quantity and the reason `mass` and
`volume` are bound together on the same canvas. Density itself stays in ink,
as the book's `COLOR.md` says: it is a ratio, it is the answer the figure
computes rather than a knob the reader turns, and drawing it in a hue of its
own would make a third colour out of two.

The two that are coloured are told apart by what each colour is on, not by
decoration:

- **Mass is the balance.** The pan, the needle, the number it reads and the
  m of the readout are all the mass hue, and nothing else on the canvas is.
- **Volume is the solid and the water.** The cube's edges and its shaded
  faces, the water level in the cylinder, the bracket that measures the rise,
  and the V of the readout are all the volume hue.
- **The readout binds them.** `density = m ÷ V` is written with the m in the
  mass hue, the V in the volume hue, the word density and the quotient in ink,
  and the live numbers each in the hue of the quantity they belong to, so the
  reader's eye goes from the balance to the m and from the water to the V
  without a legend.
- **A sample doubled keeps its hues.** In 1.3's extensive-against-intensive
  figure the mass and the volume readings both climb with the sample and stay
  in their hues, while the density and the temperature readings stand still,
  the one in ink and the other in the temperature hue; the contrast the
  section is teaching is carried by what moves, not by what is coloured.

Where a figure offers a material (gold, lead, water, ethanol) it names it in
ink and draws the block in a neutral fill from `PAL`, not in a hue of the
scheme and not in an element colour: a block of gold is a sample with a
density, not an atom, and the element palette belongs to the molecular
drawings of the later chapters. The chapter's one molecular picture, the
particles in the beaker of 1.1 and 1.2, draws its discs from the element
palette where a water molecule is drawn as one (oxygen red, hydrogen white)
and in ink where the particles stand for matter in general.

## The temperature scales of 1.6

Celsius, Fahrenheit and kelvin are one type and take one hue. They are
variants of `temperature`, not three types: a temperature is a temperature
whatever scale it is read on, and the book's own argument in 1.6 is that the
three scales differ in where their zero sits and how large their degree is,
which is a fact about the scales and not about the quantity. Giving each scale
a hue of its own would say the opposite.

So the thermometer figure paints all three columns, all three sets of tick
marks and all three readings in the temperature hue, and tells the scales
apart the way the book's Figure 1.28 does:

- by **label**: °F, °C and K set at the head of each column in ink;
- by **decoration**: the Celsius column filled, the Fahrenheit and kelvin
  columns hollow or dashed, as the book's `COLOR.md` says a variant is marked;
- by **the marks on each**: the freezing and boiling temperatures of water
  drawn across all three at the same height, in ink, since a reference
  temperature is a line on the drawing rather than a quantity of its own.

The three symbols `T_C`, `T_F` and `T_K` have rows in `book.json` with the
type `temperature` and the macros `\kTC`, `\kTF` and `\kTK`, so the four
conversion equations on the formula sheet wear the one hue across all of
them and the reader sees at a glance that both sides of every conversion are
the same quantity.

## What stays in ink

Length and the edge of a cube, an area, density, a count of anything, a
percent, a significant figure and the digits that are dropped, an accuracy
and a precision, a conversion factor and the units that cancel inside one,
the names of the elements and of the states of matter, and every label,
bracket, axis rule and arrow that is not a quantity of a bound type.

Two symbols of the chapter look like typed ones and are not, and neither may
be written with a `\k` macro:

- **the d of 1.5's bathtub example**, `V = l × w × d`, which is a depth and
  not a density;
- **the m and b of 1.6's derivation**, `y = mx + b`, which are a slope and an
  intercept and not a mass and not anything else the book declares.

Both are plain ink LaTeX, as are the l and w beside the first of them.

Nothing in this chapter is coerced into a neighbouring type to save a colour.
Density is not a mass, a length is not a volume, and a temperature scale is
not a type.
