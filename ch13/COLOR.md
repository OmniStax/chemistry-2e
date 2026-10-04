# Chapter 13 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue or coerces a quantity into a neighbouring type. The chapter's central quantities, K and Q, are untyped by the book's decision: they are ratios built from concentrations or pressures that already carry their hue, so a figure colours the concentrations and draws K and Q in ink.

## What the chapter colours

| Section | Colours | What wears it |
|---|---|---|
| `intro` | nothing | one drawing |
| 13.1 | `concentration`, `time`, `rate` | the concentration axis and each species' concentration readout, the clock and time axis, rate_f and rate_r on the rate axis and in the readout |
| 13.2 | `concentration`, `time`; `pressure` and `temperature` where a K_P figure draws them | the concentration axes and bars of 13.5 and 13.6, [A] to [D] in readouts, the time axis of 13.5; a partial pressure or a T slider in a K_P-to-K_c figure; Q_c, K_c, K_P and Δn in ink |
| 13.3 | `concentration`, `volume`, `temperature`, `energy`; `rate` where the box reads rate_f and rate_r; `pressure` where it reads partial pressures | the concentrations of the Le Châtelier box, its piston's volume, its temperature slider, ΔH, the energy axis and E_a brackets of Figure 13.8 |
| 13.4 | `concentration`; `pressure` for a K_P item drawn | the I, C and E rows' concentration bars and values; x in ink, since it stands for a concentration or a pressure by case |

## Atoms, curves and bars

- **Molecules** take `F.el` everywhere: N₂O₄ and NO₂ (13.2), Br₂ (13.4's bromine, if drawn), SO₂, O₂, SO₃ (13.5), CO, H₂O, CO₂, H₂ (13.6), H₂, I₂, HI and NO₂, NO, O₂ (13.3), PCl₅, PCl₃, Cl₂ and I₂, I⁻, I₃⁻ (13.4). An ion keeps its element colour with its charge as a mark.
- **Several species on one graph or bar chart** take `F.cat(i)` per curve or bar, never the concentration hue that their shared axis carries, as Chapter 12 decided; within a figure the same species keeps the same index across its panels.
- **Two paths on one diagram** (13.8, uncatalyzed and catalyzed): `F.cat(0)` and `F.cat(1)`, the same pair as 12.19, with the E_a brackets in `energy`.
- **Physical colours**: brown NO₂ darkening the sealed tube of 13.2 and the orange-brown bromine vapour are real colours; drawn at all, they are a named constant for NO₂'s brown, named in the plan line, and never a stand-in for a concentration.

## What stays in ink

K, K_c, K_P, K_c', K_c1, K_c2, Q, Q_c, Q_P, k_f, k_r, R, Δn, x, the stoichiometric coefficients and exponents, the extent-of-reaction axis of 13.8, every axis rule and label that is not one of the coloured types. No `\k` macro appears except for the coloured types: `\kconcA`, `\kconcB`, `\kconcC`, `\kconcD`, `\kM`, `\kt`, `\kratef`, `\krater`, `\krate`, `\kP`, `\kPA`, `\kPB`, `\kPC`, `\kPD`, `\kT`, `\kV`, `\kdH`, `\kEa`.
