# Chapter 14 colour plan

Prepared 2026-09-28 with `config.md`. It refines the book's `COLOR.md` for what this chapter draws; root rules 7 and 22 hold and nothing here invents a hue or coerces a quantity into a neighbouring type. The chapter's central quantity is concentration: [H₃O⁺], [OH⁻], pH and pOH are one type, pH and pOH its variants with the p as decoration, so every log concentration axis wears the concentration hue. The ionization constants K_w, K_a, K_b and their p-forms are equilibrium constants, untyped by the book's decision, and are drawn in ink even where they sit on the same log axis.

## What the chapter colours

| Section | Colours | What wears it |
|---|---|---|
| `intro` | nothing | one photograph |
| 14.1 | `concentration`; `temperature` where K_w is read against T | [H₃O⁺] and [OH⁻] in readouts; a temperature choice or slider for K_w |
| 14.2 | `concentration`; `temperature` for the 25 °C / 80 °C choice | the pH and pOH axes, [H₃O⁺] and [OH⁻] columns and readouts |
| 14.3 | `concentration` | [HA], [A⁻], [H₃O⁺], [OH⁻], pH in the acid-in-water Sim and in ICE rows; the conjugate-pair ladder of 14.7 + 14.8 is a K ladder and stays in ink |
| 14.4 | `concentration` | ICE rows and pH readouts; 14.13's structure takes `F.el` only |
| 14.5 | `concentration` | the stepwise species concentrations of Example 14.19 if drawn |
| 14.6 | `concentration`, `amount` | the pH axis, [HA] and [A⁻] in the Henderson-Hasselbalch readout; the moles of strong acid or base added on the slider |
| 14.7 | `concentration`, `volume`; `amount` where moles of titrant are read | the pH axis and readout, the titrant volume axis and slider, Table 14.2's moles column if drawn |

## Atoms, bars and curves

- **Molecules and ions** take `F.el` everywhere: H₂O, H₃O⁺, OH⁻, HF, F⁻, NH₃, NH₄⁺, pyridine (14.1); HA and A⁻ of the chosen acid in the 14.3 Sim; the aquo aluminum ion of 14.13 (Al in its element colour, O red, H white); oxyacids of 14.12. An ion keeps its element colour and carries its charge as a mark.
- **The two conjugate pairs** of an acid-base reaction (14.1's equations): `F.cat(0)` for the acid and its conjugate base, `F.cat(1)` for the base and its conjugate acid, as the book colours each pair; never the concentration hue.
- **Several species on one bar chart or graph** (14.15's acetic acid and acetate, 14.19's stepwise species, the strong and weak acid curves of 14.18): `F.cat(i)` per species or curve, the same index for the same species across a figure's panels; the shared pH or concentration axis carries the concentration hue.
- **Physical colours**: an indicator's acid and base forms (methyl orange red and yellow, bromthymol blue yellow and blue, phenolphthalein colourless and pink, universal indicator's range) are what the reader would see; a figure that tints a flask, a beaker or an interval band draws them as named constants, named in the plan line, unchanged in both themes and with colour coding off. The book's red-to-blue acidic-basic arrow on Figure 14.2 is decoration, not a physical colour; a redraw either uses universal indicator's real colours as a named constant or stays in ink.

## What stays in ink

K_w, K_a, K_b, K_a1 to K_a3, K_b1, K_b2, pK_w, pK_a, pK_b, percent ionization, x, the logarithm terms, every K ladder and axis rule and label that is not one of the coloured types. No `\k` macro appears except for the coloured types: `\kconcHyd`, `\kconcOH`, `\kconcHA`, `\kconcAm`, `\kconcHBp`, `\kconcB`, `\kconcHAz`, `\kconcHydeq`, `\kpH`, `\kpOH`, `\kM`, `\kV`, `\kn`, `\kT`.
