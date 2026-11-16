# Plan: 18.10 Occurrence, Preparation, and Properties of Sulfur (m68838)

Written 2026-10-05 before the build and left for review, as `ch18/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

One objective, two numbered figures (18.58 Volcano, 18.59 FrachMine), one equation, no worked example, no note, no Link to Learning, no table, ten end-of-section items (chapter exercises 90 to 99). No Check Your Learning, so no inline host.

## Sub-concepts and spans

The book prints no header in this section; the two spans take headers of their own, after the section's title.

| Span | Header | Concepts |
|---|---|---|
| `occurrence` | Occurrence and preparation of sulfur (Figures 18.58, 18.59) | introduces `frasch-process`; uses `sulfate`, `melting`, `melting-point`, `temperature`, `gas-pressure` |
| `properties` | Properties of sulfur | introduces `sulfur-chemistry`; uses `sulfur-allotropes`, `chalcogen`, `nonmetal`, `oxidizing-agent`, `binary-compound`, `oxidation-number`, `electronegativity`, `redox-reaction`, `sulfate` |

## Figures

- fig-volcano · Figure 18.58 · frasch-process (occurrence) · kept photograph: the text points at it (hydrogen sulfide in volcanic gases) · arrows: none · photo row with its number and the book's credit
- sim-frasch · Figure 18.59 · frasch-process, melting-point · value add: the book's still cutaway says what each pipe carries; here the well runs, so the reader sees what each of the two things sent down does by taking it away. The water's temperature on a slider shows why the water is superheated (below 113 °C, the melting point of rhombic sulfur stated in 18.4, nothing melts and the air lifts only water), and the compressed air on a switch shows why the third pipe is there (the sulfur melts and pools, but the column stands partway up the middle pipe and the vat stays empty). The settling vat of the passage is drawn, so the product is seen arriving · arrows: kinematic (the book's arrows are the flows of water down the outer pipe, air down the inner pipe and the mixture up the middle pipe and out) · moving: a 6 s clock and a 1.2 s hold; water runs down the outermost pipe throughout; above 113 °C the pool of liquid sulfur grows round the foot from t = 0, reaches the mouth of the middle pipe at 0.4 s, and the sulfur front then rises with the bubbles, through the chamber and the outlet pipe into the vat (about 3.3 s), where sulfur settles under the water to the end of the clock; with the air off the front creeps up only to the standing level · controls: the water's temperature $\kT$ (`temperature`, 100 to 180 °C so the water stays liquid at 10 atm, default 170 °C, the book's; a dashed special circle at 113 °C) and a choice, compressed air off | on (default on) · fluids drawn as fluids, not molecules (a mine pipe is no place for a particle picture): water blue, liquid sulfur straw, air as bubbles that grow as they rise, small chevrons moving with the water and the air; the pool's size and the sulfur reaching the vat grow with the excess of $\kT$ over 113 °C, a picture of the heat the water brings, not a model of a rate · headline, four cases: "Water at 170 °C melts the sulfur, and the air bubbles lift it to the surface."; "The sulfur melts, but liquid sulfur is denser than water and stops partway up without air."; "Water at 105 °C leaves the sulfur solid, so the air lifts only water." (without the last clause when the air is off); "At 113 °C the water only reaches the melting point of sulfur, so none melts." · readout $\kT = 170\ ^\circ\text{C} > 113\ ^\circ\text{C}$, the melting point of sulfur, the relation sign morphing at the special value · no graph · 2D: a section through three concentric pipes; turning it would show nothing more (rule 28.5) · facts: solid sulfur `#e5c444`, molten sulfur's straw `#d9a63a` (chapter `COLOR.md`), water `#8fc6e8` and the soil's brown `#b79a80` (the book's image); no element colours, since no atom is drawn · labels: compressed air, superheated water with the live temperature and 10 atm in their hues, sulfur, water, and air (water and air until the sulfur arrives; none with the air off), settling vat, soil, solid sulfur deposit, liquid sulfur (fading in with the pool, on a leader); hover names on the pipes, the bubbles, the water drops, the vat's two layers (the sulfur's with the text's 99.5% to 99.9%) and the water inlet (10 atm keeps it liquid above 100 °C)
  works: parts: three concentric pipes reaching through the soil into the deposit, the casing starting above the ground; compressed air enters a pipe at the top right that bends down into the innermost pipe, which passes through the outlet chamber and ends above the foot of the middle pipe; superheated water enters the outermost annulus from the right, below the chamber, and leaves at its open foot, the lowest; the middle annulus opens at the foot and rises to the chamber, which empties to the left; (added from the passage) the outlet pipe bends down into an open settling vat on the ground · flow: water down the outermost annulus and out round the foot, where it melts the sulfur; air down the innermost pipe, out of its end and up the middle annulus as bubbles; liquid sulfur, water and air up the middle annulus, through the chamber and out at the top left to the vat · must hold: (1) the air pipe passes through the chamber without opening into it; (2) water enters only the outermost annulus; (3) at or below 113 °C there is no pool and no sulfur in the middle pipe or the vat; (4) with the air off nothing reaches the chamber, the outlet or the vat, at any temperature; (5) sulfur reaches the vat only above 113 °C with the air on, and after water does; (6) the three feet step down from the innermost to the outermost as in the image · read off the image: "Compressed air" top right, "Superheated water" right, "Sulfur, water, and air" top left, "Soil", "Solid sulfur deposit", "Liquid sulfur"; the text's 170 °C and 10 atm, the vats and the 99.5% to 99.9%. Not in the book: that liquid sulfur is denser than water (about 1.8 g/cm³), which is why the column stops without air; the headline of that case says so.
  Second pass (2026-11-16): rebuilt. The first build was right against the image but small in its stage, drew the fluids as a few spaced molecules, and its one slider only switched the sulfur off; the air's part could not be tested and the product was never seen.

Extra simulations: none. The S₈ ring and the allotropes are 18.4's figures; the oxidation of sulfur by nitric acid is a named reaction with nothing to vary.

## Types bound

`temperature` (170 °C in the text, the figure's slider and readout, 113 °C as the melting point; a new variables row `18.10/T`, unit °C, concept `temperature`), `pressure` (10 atm, `data-type` in the text and the inlet's label in the figure). The 99.5% to 99.9% purity, oxidation states (2−), coefficients and group 16 stay ink. No atoms are drawn (second pass), so no `F.el`. No referents.

## Exercises

Ten items (90 to 99), nine kept. Five keyed: fs-idm213191488 (91), fs-idm129605056 (93), fs-idm135267520 (95), fs-idm104555280 (97), all open from the key; fs-idm172430496 (99, 5.1 × 10⁴ g, a number with a 2% tolerance). Two unkeyed choice items kept open with their options and a suggested approach: fs-idm200394080 (92, NaHSO₃ or NaHSO₄), fs-idm130857952 (94, sulfurous or sulfuric acid). Two unkeyed conceptual items with an AI-marked suggested approach: fs-idm5069504 (90), fs-idm217260912 (98). Left out and named: fs-idp17880736 (96, Lewis structures, unkeyed, the answer would be drawn). Items 92, 94 and 98 use 18.9's sulfurous and sulfuric acids and stay here as the book prints them.

## Left out

No Link to Learning. Errata kept as printed: the summary's "has as oxidation state of 2−"; key fs-idm213191488 "SO₂, sp² 4+" without its comma; the caption of Figure 18.59 is printed as the book gives it, and the file name `FrachMine` is the bundle's.

## Wanted at chapter level

- `18.10/T` → 18.10-occurrence (the variables row added for the figure's readout)

Applied by the chapter pass (2026-10-05):

- Anchor: 18.10/T → 18.10-occurrence.
