# Chapter 20 colour plan

Prepared 2026-10-05 with `config.md`. Colour reaches these pages in root
`RULES.md` item 7's four ways, fact, convention, referent and category, and
where two apply the earlier wins. This file records what is particular to the
chapter; it invents no hue and declares no type. A chapter of structures, it
is coloured mostly by convention: every atom in `F.el`, as the book's own
ball-and-stick and space-filling models already draw them.

## Categories

| Quantity | Type | Sections | Treatment |
|---|---|---|---|
| a melting or boiling point (Table 20.1's –187.7 °C to 316.1 °C), an oil heated to 425 °C, 140 °C for diethyl ether, 0 °C at STP, –196 °C of liquid nitrogen | `temperature` | 20.1, 20.2, 20.4 | `data-type` on the value; the axis and readout of a boiling-point Sim, the tray temperatures of the distillation column |
| 1 atm at STP | `pressure` | 20.1 | `data-type` on the value (Table 20.1's footnote) |
| a mass of an exercise (25.5 g, 0.2352 g, 1.000 × 10³ kg, 1000 kg, 13.0 g) | `mass` | 20.1, 20.2, 20.3 | `data-type` where a prompt or key states one |
| a volume of methanol (4.593 × 10² L) | `volume` | 20.2 | in one key |
| the density of methanol (0.7915 g/mL) | `density` | 20.2 | in one prompt |
| a percent of yield or ionization (100%, 1%, 37%, 3.3%) | none | — | ink, a rating |

These stay in ink: the number of carbon atoms n and the C<sub>n</sub>H<sub>2n+2</sub>
and C<sub>m</sub>(H<sub>2</sub>O)<sub>n</sub> subscripts, locants in names (2-methyl,
3,4-dichloro), numbers of structural isomers, oxidation numbers (−4 to +4),
bond angles as the book states them in prose (109.5°, 120°, 180°, which no
figure varies; a figure that does vary one colours it `angle`), hybridizations,
partial charges δ+ and δ− (as 7.2 writes them), recycling codes, and counts
of molecules (10 million, 10<sup>60</sup>, 350 volatile molecules).

A word or phrase wears a category only where it names a typed concept:
"melting point" and "boiling point" where the text means the temperature,
"vapor pressure" in 20.3. Compound classes, functional groups, reactions,
names, isomers and biomolecules are not quantities and stay ink.

## Facts and conventions

`F.el` for every atom drawn, in the book's own molecule palette (carbon
black, hydrogen white, oxygen red, nitrogen blue, chlorine green, and the
palette's own colours for bromine, iodine and fluorine); a generic R group
takes the palette's `other` fallback through `F.el('R')` with its label,
never a type hue. An ion keeps its element colour and carries its charge as
a mark.

The book's red marking of a functional group, a substituent or the atoms
that change in a reaction, and the purple and green hydrogens of propane and
2-methylpropane, are emphasis, not facts: a redrawn figure marks them by
outline, weight or a highlight in ink, or as referents where the text names
them ("the two purple hydrogen atoms"), never in a type hue. The blue-to-red
arrow beside the distillation column (small molecules to large) is the
book's gradient of volatility, drawn on the `temperature` hue's scale when a
figure shows the column's temperatures, never as a warm-to-cold tint on the
column.

Facts, drawn as the thing looks: the photographs; the colourless gases and
liquids of the alkanes; crude oil's dark fractions if drawn; the red of the
strawberry and the poppies stay in their photographs.

## Referents

Each section lists its own when it is built. Planned:

- **20.1.** The hydrogen environments of propane and 2-methylpropane where a
  figure tells them apart (the text's black, purple and green hydrogens);
  the three drawings of n-butane if a figure names them one by one; the
  fractions of the column (refinery gas to residue) where one curve or tray
  each is drawn.
- **20.2.** None by default.
- **20.3.** The five carbons of Example 20.10's ladder if one bar each is
  drawn; the marked carbons of its Check Your Learning.
- **20.4.** None by default.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.

## As built

- `temperature`: 20.1 Table 20.1's melting and boiling points and its footnote's 0 °C, the 425 °C of the furnace, the curves and readout of the carbon-count Sim and the temperature bar beside the distillation tower, which carries no tray temperatures since the book gives none; 20.2 the 140 °C of the ether synthesis; 20.4 the –196 °C of liquid nitrogen. "Melting point" and "boiling point" are marked where they name the temperature.
- `pressure`: 20.1, the footnote's 1 atm. `mass`: 20.1's exercises, and 20.2's 1000 kg of MTBE. `volume` and `density`: 20.2's methanol item. 20.3 binds no type, since its items with masses are left out unkeyed; "vapor pressure" is its one typed word.
- Conventions: `F.el` for every atom in all twelve live figures; R groups through `F.el('R')`. The book's red, purple and green emphasis is drawn as weight or an ink ring.
- Referents: none in any section. The propane image is kept as printed, its purple and green hydrogen atoms named by the text.
