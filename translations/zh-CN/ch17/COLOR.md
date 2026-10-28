# Chapter 17 colour plan

Prepared 2026-10-05 with `config.md`. Colour reaches these pages in root
`RULES.md` item 7's four ways, fact, convention, referent and category, and
where two apply the earlier wins. This file records what is particular to the
chapter; it invents no hue: the type `current` is declared here and took its
colour when the book's type colours were refitted.

## Categories

| Quantity | Type | Sections | Treatment |
|---|---|---|---|
| E (potential), E_cell, E°_cell, E_cathode, E_anode, E°_cathode, E°_anode, E_X, E°_X, E_SHE, E°, a voltmeter reading, an applied voltage | `potential` | 17.3, 17.4, 17.5, 17.6, 17.7 | The chapter's own hue: every potential axis, ladder rung, voltmeter and readout wears it; standard values are told by their ° mark. A potential is never written with `\kE`, which is energy |
| ΔG, ΔG°, w_max, w_elec | `energy` | 17.4 | The ΔG° vertex of Figure 17.7 and every free energy in a readout |
| K, Q (reaction quotient) | `equilibrium-constant` | 17.4, 17.5 | The K vertex of 17.7 and the Nernst axis; Q here is `\kQrxn` |
| n (moles of electrons) | `amount` | 17.4, 17.7 | The book writes n as moles of electrons, so it wears amount even where it reads as a count |
| F, Q (charge, 17.7) | `charge` | 17.4, 17.7 | Faraday's constant is a charge per mole, a per-mole variant of charge; Q in Q = It = nF is `\kQ` |
| I | `current` | 17.7 | The new type: the current slider of the electrolysis figure and the I of Q = It |
| t | `time` | 17.7, and any figure with a clock | — |
| T | `temperature` | 17.3 (298 K), 17.4 | Never a warm-to-cold tint on a body |
| [Cu²⁺], [Ag⁺], [Zn²⁺], 1 M | `concentration` | 17.2, 17.3, 17.4 | Where a readout states one; the concentration cell's two half-cells split by referent |
| mass of a deposit or electrode | `mass` | 17.2, 17.7 | Where a readout states one |
| gas volumes of H₂ and O₂ | `volume` | 17.7 | Where a readout states one |
| P of H₂ at the SHE | `pressure` | 17.3 | Where a readout states one |

These stay in ink: oxidation numbers and charges on ions, stoichiometric
coefficients, the x of Li₁₋ₓCoO₂ and of Fe₂O₃·xH₂O, R, the 0.0592 V/n and
0.0257 V/n factors as a whole, a percent efficiency, ln K and log Q as terms.

A word or phrase wears a category when it names a typed concept: "cell
potential", "the standard electrode potential of copper", "potential",
"voltage", "Faraday's constant", "current". A law, a device or a skill (the
Nernst equation, a galvanic cell, a battery, the half-reaction method)
stays ink, and so do anode, cathode, salt bridge and every word about
spontaneity.

## Facts and conventions

`F.el` for every atom and ion drawn: the copper and silver of 17.2 and 17.3,
Mg, Fe and Pt of 17.4, the hydrogen of the SHE, zinc and manganese dioxide,
lithium in its layers (17.12), iron, oxygen and water in 17.16, Na and Cl
in 17.18. Electrons are `F.el('e-')`. An ion keeps its element colour and
carries its charge as a mark.

Facts, drawn as the thing looks: the blue of Cu²⁺(aq) deepening in 17.2 and
17.3, the gray fluffy silver, the yellow-green of chlorine gas, the brown of
rust and the blue-green of the patina (17.15 is a photograph). The
voltmeter's red and black inputs in 17.6 are the instrument's own colours and
stay as the book draws them.

## Referents

As built (chapter pass, 2026-10-05):

- **17.1, 17.2, 17.5, 17.6, 17.7.** None. The two half-cells of 17.2 differ by
  element and take `F.el`; the protecting metals of 17.6 are elements; the
  gases of 17.19 are told apart by element and by volume.
- **17.3.** `cathode-half-cell` and `anode-half-cell`, the two rungs chosen on
  the E° ladder (`sim-ladder`); E°_cathode and E°_anode carry them as `ref`.
- **17.4.** The same two ids for the dilute anode and the concentrated cathode
  of the concentration cell (`sim-concentration-cell`), one curve each on its
  graph; E°_cathode, E°_anode, E_cathode and E_anode carry them as `ref`.

Types as bound: 17.2 concentration; 17.3 potential; 17.4 potential, energy,
equilibrium-constant, amount, charge, concentration and time; 17.5 potential;
17.6 potential through its readout's macros; 17.7 potential, charge, current,
time, amount and mass. Temperature, pressure and volume are written in ink or
in prose where a figure states them. `current` took its hue in the refit of
the book's type colours.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
