# Chapter 18 colour plan

Prepared 2026-10-05 with `config.md`. Colour reaches these pages in root
`RULES.md` item 7's four ways, fact, convention, referent and category, and
where two apply the earlier wins. This file records what is particular to the
chapter; it invents no hue and declares no type. A descriptive chapter, it is
coloured mostly by convention and fact: elements in `F.el`, and the colours
the substances really have.

## Categories

| Quantity | Type | Sections | Treatment |
|---|---|---|---|
| ΔH°, ΔG_f°, ΔH of an exercise, kJ of heat released | `energy` | 18.1, 18.3, 18.5, 18.8, 18.9 | Where the text writes one beside an equation; the endothermic formation of ozone and the Haber process's −92 kJ |
| E° of the halogen couples and of Br₂ + HI | `potential` | 18.5, and 18.11 where a figure ranks the halogens | Written `\kEo`, never `\kE` |
| K_P (NO₂/N₂O₄), K_a, K_a1, K_a2, pK_a | `equilibrium-constant` | 18.3, 18.7, 18.9 | The NO₂/N₂O₄ readout and the pK_a column of Table 18.2 |
| a melting, boiling or working temperature (13.2 °C, 44.2 °C, 113 °C, 230 °C, 600 °C, 1000 °C, 77 K, 90 K) | `temperature` | every section | `data-type` on the value; the slider of the molten-sulfur figure and of the NO₂/N₂O₄ box |
| a pressure (10 atm in the Frasch pipes, 1 atm of an exercise) | `pressure` | 18.7, 18.10 | Where a figure varies or states one |
| density of lithium (0.5 g/cm³), hydrazine, NaCl and SrCl₂ | `density` | 18.1, 18.5 | Where the prose states one |
| a mass or mass of product in a prose statement | `mass` | 18.1, 18.2, 18.5 | Where a readout states one |
| a gas volume (twice the H₂ of O₂ in 18.26, 658 L of NH₃, 49 mL of O₂) | `volume` | 18.5, 18.9 | Where a readout or the prose states one |
| concentration (0.54 M chloride in seawater) | `concentration` | 18.11 | Where the prose states one |
| time (a flash of 1/50,000 s) | `time` | 18.12, and any figure with a clock | — |

These stay in ink: oxidation numbers and states, ionic charges, group and
period numbers, atomic numbers, coefficients and subscripts, mass percents
and parts per million, abundance ratios (one deuterium in 7000 H), bond
orders, the 1:1 and 1:2 ratios of Sn to Cl₂, a percent of production, the
coordination number of boron, and every count of atoms in a ring or chain.

A word or phrase wears a category only where it names a typed concept:
"standard reduction potential" in 18.5, "enthalpy of formation" in 18.8,
"equilibrium constant" where the text uses one. Element names, group
names, allotropes, processes (Downs cell, Pidgeon, Haber, Ostwald, Frasch,
chlor-alkali), oxides, acids and salts are not quantities and stay ink, as
do "metallic character", "electronegativity" and "ionization energy" (a
rating and an energy the chapter never states as a number).

## Facts and conventions

`F.el` for every atom and ion drawn, in the book's own molecule palette
(carbon black, hydrogen white, oxygen red, nitrogen blue, chlorine green,
sulfur yellow, phosphorus orange, sodium purple): the metalloid lattices,
the carbon allotropes, P₄ and its oxides and chlorides, S₈, the nitrogen
oxides, the oxyanions, the interhalogens (iodine and fluorine from the
palette, never a type hue), Na⁺ and Cl⁻ in the Downs cell, Al³⁺ in the
Hall–Héroult cell, H₂ and O₂ in the electrolysis of water. A free electron
is `F.el('e-')`. An ion keeps its element colour and carries its charge as a
mark.

Facts, drawn as the thing looks and kept when colour coding is off: the
flame colours of 18.1 (sodium yellow, lithium crimson, the others pale
violet, calcium and strontium red, barium green); the yellow-green of
chlorine, the orange to reddish-brown of bromine and the violet of iodine
vapour (18.11, Figure 18.60 a photograph); the straw-coloured to dark red
molten sulfur (18.4); brown NO₂ against colourless N₂O₄, the blue of liquid
N₂O₃, the pale blue of nitrous acid (18.7, 18.9); the brown of amorphous
boron, the purple of amethyst, the red of ruby (18.3, 18.9); the white
light of limelight and burning magnesium; the deep blue of starch with
iodine; the white precipitate of Zn(OH)₂ and the red-orange HgI₂. The
legend colours of the book's periodic table (Figure 18.2) belong to the
elements sheet and to that figure alone.

## Referents

Each section lists its own when it is built. Planned:

- **18.1.** The groups of the periodic table where a figure plots one trend
  per group on one axis; the elements of a group are elements and take
  `F.el`.
- **18.4.** None by default: the allotropes are told apart by structure and
  by name, not by colour; the four stages of molten sulfur are one liquid at
  four temperatures.
- **18.5.** The three hydrogen isotopes if they are drawn side by side.
- **18.7.** NO₂ and N₂O₄ are molecules in `F.el`; their two partial
  pressures, where plotted as two curves, split by referent.
- **18.9.** The four chlorine oxyanions (or the four halogen oxyacids of a
  strength series) where one bar or point each is plotted.
- **18.11.** The four halogens where their potentials sit on one ladder.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.

As built (chapter pass, 2026-10-05):

- **18.7.** `n2o4` and `no2`, the two gases of `sim-no2-dimer`, one bar each on its strip of partial pressures and marked in the text beside it. No other section has a referent: the groups of 18.1 are lit one at a time by a choice, the hydrogen isotopes of 18.5 are not drawn, the oxyanions of 18.9 are one ion at a time on a strip of pK_a values, and the halogens of 18.11's ladder are elements told apart by name and by the colours of their solutions.

Facts as drawn: the Figure 18.2 legend colours deepened so that a tint reads on a dark panel (#e3c46e representative metals, #7392cb transition metals, #c49ac4 metalloids, #8fb8aa nonmetals); graphite and the molten metals of the Downs and Hall–Héroult cells (#3a3d42, #c9ced6); the orange glow of the molten zone in silicon (#ffb347); molten sulfur from straw through amber to dark red (#e3c75a, #d4892b, #8c1d12) in 18.4, and rhombic sulfur's yellow and molten sulfur's straw (#e5c444, #d9a63a) in the Frasch pipes; the brown of NO₂ (#8b4a1c); chlorine water pale yellow-green, bromine orange and iodine brown in 18.11's test tube (#c9dc6a, #d9822b, #8a4b1f).

Types as bound: 18.1 energy (IE₁ in the figure; "ionization energy" in the prose stays ink, as above); 18.3 length (bond lengths in the structures), temperature; 18.4 temperature; 18.5 volume, energy, density, temperature; 18.7 equilibrium-constant, pressure, temperature, volume; 18.9 equilibrium-constant; 18.10 temperature, pressure; 18.11 potential, length (the covalent radius r), concentration; 18.12 temperature, time. `length` is drawn by 18.3 and 18.11 though the plan above did not list it.
