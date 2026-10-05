# Chapter 15 colour plan

Prepared 2026-09-28 with `config.md` and brought under root `RULES.md` item 7
on 2026-10-04, when only the introduction was built; brought to the bindings as
built by the chapter pass on 2026-10-05. Colour reaches these pages in item 7's
four ways, fact, convention, referent and category, and where two apply the
earlier wins. This file records what is particular to the chapter; it invents
no hue.

## Categories

| Quantity | Type | Treatment |
|---|---|---|
| An ion concentration, a molar solubility, [Ag⁺], [NH₃], a complex's concentration, pH, pOH | `concentration` | Every log concentration axis wears it. The concept `molar-solubility` takes the type at the chapter pass. [M^m+], [X^n−], [OH⁻], pH and pOH are written through their macros; a specific ion's concentration ([Ag⁺], [Al³⁺]) has no symbol row and is written in ink, its value marked `data-type` |
| K_sp, Q_sp, K_f, K_d, the book's plain Q, the net K of coupled equilibria, K_a1, K_a2, pK_a | `equilibrium-constant` | Written through their macros (`\kKsp`, `\kQsp`, `\kKfform`, `\kKd`, `\kQrxn`, `\kK`, `\kKaone`, `\kKatwo`, `\kpKa`) on every page, as the tables declare them. The K_sp line on a concentration plane is in this hue, its axes in `concentration`; Q_sp is its variant away from equilibrium |
| Grams dissolved, a gram solubility | `mass` | 15.1, where a readout states it |
| A volume of solution mixed | `volume` | Where a precipitation example mixes two, and 15.3's 1.00 L |
| The solid in 15.2's Sim | `amount` | Its slider, in moles |

These stay in ink: x, the exponents p and q, the logarithm terms, the
stoichiometric coefficients.

A word or phrase wears a category when it names a concept of that category,
in general or in particular, as root rule 7 asks: "the solubility product
constant", the molar solubility of CuBr, 7.9 × 10⁻⁵ M, the K_sp of AgI in its
Check Your Learning, the pH at which Mg(OH)₂ begins to precipitate. A unit
stays ink.

## Facts and conventions

`F.el` for every ion and molecule (Ag⁺, Cl⁻, Ca²⁺, F⁻, water, NH₃, the complex
ions), the ion keeping its element colour and a charge mark. Through
`F.fact`: a precipitate's own colour (AgCl white, AgBr cream, PbCrO₄ yellow,
Ag₂CrO₄ red), unchanged in both themes; as built, 15.2's solid AgCl is the one
precipitate drawn, white (`#f4f4f2`). The donated electron pair of a Lewis
equation is an ink arrow.

## Referents

Each section lists its own in `referents`. As built:

- **15.1.** `agcl` and `agbr`, the two silver salts of Example 15.11, one line
  each on the K_sp plane in its two-salt state; with one salt the line wears
  `equilibrium-constant`. Figure 15.2's salt and ions are drawn in the element
  palette (convention wins) and are not referents.
- **15.2.** `base`, `acid` and `displacer`: the Lewis base, the Lewis acid and
  the species that displaces another, in the five redrawn Lewis equations and
  the Cu(CN)₂⁻ structure, each atom in the colour of the species it came from.
  The metal ion is the acid and the ligand the base, so they are not referents
  of their own; the Sim tells its [Cl⁻] and [Ag⁺] curves apart with `F.cat`.
- **15.3.** `al-ion` and `aluminate`, one line each on the solubility-against-pH
  Sim, the aluminate also naming the Al(OH)₄⁻ Figure. The two coupled
  reactions of a net equilibrium are not split into referents, since each K is
  written once in the book's equations.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
