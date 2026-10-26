# Chapter 13 colour plan

Prepared 2026-09-28 with `config.md` and brought under root `RULES.md` item 7
on 2026-10-04, when only the introduction was built. Colour reaches these pages
in item 7's four ways, fact, convention, referent and category, and where two
apply the earlier wins. This file records what is particular to the chapter;
it invents no hue. The chapter pass of 2026-10-05 brought it to the pages as
built.

## Categories

| Quantity | Type | Treatment |
|---|---|---|
| [A] to [D], an initial or equilibrium concentration, a change in concentration | `concentration` | The axes and bars of 13.5 and 13.6, the I, C and E rows |
| K, K_c, K_P, K_c', K_c1, K_c2, Q, Q_c, Q_P | `equilibrium-constant` | Typed in the tables and written through their macros (`\kK`, `\kKc`, `\kKP`, `\kQrxn`, `\kQc`, `\kQP`, …), as every section was built; Q is its variant away from equilibrium, drawn dashed or hollow beside K |
| k_f, k_r | `rate-constant` | 13.1's sliders and rate laws, 13.3's rate laws (`\kkf`, `\kkr`) |
| rate_f, rate_r | `rate` | 13.1's rate axis and readout, 13.3's rate laws |
| t | `time` | 13.1, the time axis of 13.5 |
| A partial pressure P_A to P_D | `pressure` | A K_P item and the Le Châtelier box |
| T | `temperature` | |
| V and n in the ideal gas equation (13.2, 13.3) | `volume`, `amount` | |
| ΔH, E_a, q, the energy axis of 13.8 | `energy` | |

These stay in ink: R, Δn, x (a concentration or a pressure by case), the
stoichiometric coefficients and exponents, the extent-of-reaction axis of 13.8.

A word or phrase wears a category whenever it names a concept of that
category, in general as well as in particular, as root rule 7 asks: "an
equilibrium constant", "the concentrations of reactants and products" and "the
K_c of 50.0 at 400 °C for H₂ + I₂" all wear it, each marked
`<span data-concept="…">`. A word in another sense names no concept and stays
ink.

## Facts and conventions

`F.el` for every molecule drawn: N₂O₄ and NO₂ in Figure 13.2; H₂, I₂, HI,
N₂O₄ and NO₂ in the Le Châtelier Sim; N₂, H₂, NH₃ and water in Figure 13.9.
Through `F.fact`: NO₂'s brown (`#8b4a1c`) darkening the box of Figure 13.2 in
proportion to [NO₂], never a stand-in for a concentration elsewhere. Bromine's
vapour is the photograph of Figure 13.4 and is not drawn.

## Referents

As built:

- **13.1.** `n2o4` and `no2`, one concentration curve each in Figure 13.2;
  `forward` and `reverse`, one rate curve each, with rate_f and rate_r split,
  the f and r in their colours.
- **13.2.** `so2`, `o2`, `so3` (Figure 13.5), `co`, `h2o`, `co2`, `h2`
  (Figure 13.6) and `no2`, `n2o4` (the Sim of the magnitude of K), one curve,
  bar or segment each. K_c1 and K_c2 are not split, since no figure draws the
  coupled reactions.
- **13.3.** None. The species of the Le Châtelier Sim are `F.cat(0..2)`, and
  the uncatalyzed and catalyzed paths of Figure 13.8 are `F.cat(0)` and
  `F.cat(1)`, as 12.19 draws them, with the E_a brackets in `energy`.
- **13.4.** None. The ICE tables are written in ink, since no figure draws one
  species apart from another; the Sim plots x only.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
