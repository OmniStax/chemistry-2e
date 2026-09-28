# Chapter 12 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue or coerces a quantity into a neighbouring type. A rate is its own type, never a concentration, and an activation energy is an energy.

## What the chapter binds

| Section | Binds | What wears it |
|---|---|---|
| `intro` | nothing | one photograph |
| 12.1 | `concentration`, `time`, `rate` | the concentration axis and each species' [A] readout, the time axis and Δt, every tangent or secant slope read as a rate and the rate readout |
| 12.2 | `temperature`, `concentration`, `rate` where a Sim draws them; otherwise nothing | a temperature slider and an amount-per-volume slider of a collision box, the rate it reads; the photographs bind nothing |
| 12.3 | `concentration`, `rate` | the concentration sliders of an initial-rates bench, the rate readout; k and the orders stay ink |
| 12.4 | `concentration`, `time` | [A], [A]₀, [A]ₜ, the concentration axis and the flasks' reading, t and t₁/₂; ln[A] and 1/[A] axes are functions of a concentration and stay ink, their tick labels too |
| 12.5 | `energy`, `temperature` | E_a, ΔH, every reaction-diagram energy axis and the energy axis of the distribution, the threshold line; T, T₁, T₂ and a temperature slider; ln k and 1/T axes stay ink |
| 12.6 | `energy` where a mechanism's reaction diagram is drawn; otherwise nothing | the energy of each step's barrier |
| 12.7 | `energy` | E_a of each path and ΔH on the reaction diagrams |

## Atoms, curves and paths

- **Atoms and molecules** take `F.el` everywhere: CO, O₂, CO₂ (12.13), NO₂, NO, CO, CO₂ (12.17), H₂, C₂H₄, C₂H₆ and the nickel surface (12.23), O₃ and Cl in any ozone cycle. The PhET-style A + BC gets an identity, the O + CO of `fs-idm66513728` or NO + O₃, and is drawn by element.
- **Several species on one graph** (12.5's NH₃, N₂, H₂; 12.11's tungsten and quartz) take `F.cat(i)` per curve, never the concentration hue that their shared axis carries; the tangent's rate label wears `rate`.
- **Two paths on one diagram** (12.19 uncatalyzed and catalyzed, 12.15(b)'s two temperatures, 12.15(a)'s two activation energies): the book draws red and blue; the page uses `F.cat(0)` and `F.cat(1)`, the same pair across the chapter (uncatalyzed `F.cat(0)`, catalyzed `F.cat(1)`), with the E_a brackets in `energy`.
- **Physical colours**: 12.12's flask shading is the book's symbol of concentration, not a real colour (H₂O₂ is colourless), so it takes the `concentration` hue as an opacity, never a hex; iodine's brown on a test strip, if drawn, is a named constant.
- **Enzyme and substrate** (12.25) are schematic shapes with no element and no quantity: `F.cat(2)` for the enzyme and `F.cat(3)` for the substrate.

## What stays in ink

k, k₁, k₂, k₋₁, the orders m and n, the frequency factor A, R, ln k, ln[A], 1/[A], 1/T, percent decomposed, counts of collisions, the stoichiometric coefficients, every axis rule and label that is not one of the bound types. No `\k` macro appears except for the bound types: `\krate`, `\kconcA`, `\kconcAz`, `\kconcAt`, `\kconcB`, `\kdconcA`, `\kdconcB`, `\kt`, `\kdt`, `\kthalf`, `\kEa`, `\kdH`, `\kT`, `\kTone`, `\kTtwo`.
