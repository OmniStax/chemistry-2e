# Chapter 14 colour plan

Prepared 2026-09-28 with `config.md` and brought under root `RULES.md` item 7
on 2026-10-04, when only the introduction was built. Colour reaches these pages
in item 7's four ways, fact, convention, referent and category, and where two
apply the earlier wins. This file records what is particular to the chapter;
it invents no hue. The chapter pass of 2026-10-05 brought it to the pages as
built.

## Categories

| Quantity | Type | Treatment |
|---|---|---|
| [H₃O⁺], [OH⁻], [HA], [A⁻], [B], [HB⁺], pH, pOH | `concentration` | pH and pOH are its logarithmic variants, so every pH axis wears it |
| K_w, K_a, K_b, K_a1 to K_a3, K_b1, K_b2, pK_w, pK_a, pK_b | `equilibrium-constant` | Typed in the tables and written through their macros (`\kKw`, `\kKa`, `\kKbion`, `\kKaone` to `\kKathree`, `\kKbone`, `\kKbtwo`, `\kpKw`, `\kpKa`, `\kpKb`), as every section was built; the chapter notes' "untyped" and "never a `\k` macro on any K" are withdrawn. The K axes of 14.3's ladder and 14.4's salt bars, and 14.7's pK_a slider, wear it |
| T | `temperature` | 14.1 and 14.2, where K_w is read at 25 °C against 80 °C |
| Moles of strong acid or base added, moles of titrant | `amount` | 14.6's slider and bars, the amounts in 14.7's examples |
| The titrant volume | `volume` | 14.7's axis and slider |

These stay in ink: the percent ionization, x, the logarithm terms, the
stoichiometric coefficients.

A word or phrase wears a category whenever it names a concept of that
category, in general as well as in particular, as root rule 7 asks: "the pH
of a solution", "the hydronium ion concentration", "an acid ionization
constant" and "the 25.00 mL of 0.100 M HCl" all wear it, each marked
`<span data-concept="…">` (or `data-type` for a bare value no concept names).
A word in another sense names no concept and stays ink, and so do the device
names "pH meter" and "pH paper".

## Facts and conventions

`F.el` for every molecule and ion: H₂O, H₃O⁺, OH⁻, HF, F⁻, NH₃, NH₄⁺,
pyridine, the acid and base of 14.3's Sim, the aquo aluminium ion of 14.13, the
oxyacids of 14.12; an ion keeps its element colour and carries its charge as a
mark. Through `F.fact`: an indicator's acid and base forms (methyl orange,
bromthymol blue, phenolphthalein, universal indicator) wherever a flask, beaker
or interval band is tinted. The book's red-to-blue arrow on Figure 14.2 is
decoration and is drawn in ink in Figure 14.2. As built, `F.fact` paints only
14.7's indicators: methyl orange red `#d9342b` to yellow `#f2c12e`, litmus red
`#c8323c` to blue `#3a56b8`, phenolphthalein colourless to pink `#e0479e`, in
the flask, the bands on the curve and the bar on the volume axis. The
indicator colours of Figures 14.5, 14.14, 14.16 and 14.19 are their
photographs.

## Referents

As built:

- **14.1.** `pair-acid` and `pair-base`, the acid with its conjugate base and
  the base with its conjugate acid, in the three equations that show one
  reaction (water and ammonia, hydrogen fluoride, pyridine), as the book
  colours each pair; `water-acid` and `water-base` in the autoionization
  equation, a group of its own since it shares its block with the K_w Sim.
- **14.3.** `acid` and `base`, the acid HA and its conjugate base A⁻ of the
  acid-in-water Sim and the chosen pair of the Figure 14.7 + 14.8 ladder;
  K_a and K_b are split, the a and b in their colours.
- **14.5.** None. The Sim's acid is a choice of three, so its species are
  `F.cat(i)` levels named under the axis rather than one example's things,
  and K_a1 and K_a2 are not split.
- **14.6.** `buffer` and `unbuffered`, one pH curve each in Figure 14.15 +
  14.17, marked in Example 14.20. Acetic acid and acetate are `F.cat(0)` and
  `F.cat(1)` bars, since the section names the two species everywhere.
- **14.7.** `strong-titration` and `weak-titration`, one curve each in Figure
  14.18 + 14.20; the indicators are facts.
- **14.2, 14.4.** None.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
