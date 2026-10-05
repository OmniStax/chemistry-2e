# Chapter 19 colour plan

Prepared 2026-10-05 with `config.md`. Colour reaches these pages in root
`RULES.md` item 7's four ways, fact, convention, referent and category, and
where two apply the earlier wins. This file records what is particular to the
chapter; it invents no hue and declares no type. Colour is this chapter's
subject in 19.3, so facts matter more here than anywhere since Chapter 6:
the colour a complex shows is drawn as the colour it is.

## Categories

| Quantity | Type | Sections | Treatment |
|---|---|---|---|
| Δ<sub>oct</sub>, Δ<sub>tet</sub>, the pairing energy P, the energy of an absorbed photon E | `energy` | 19.3 | `\kdoct`, `\kdtet`, `\kPpair`, `\kE`; the gap on every splitting diagram is an energy arrow in the energy hue, never `\kP` for P |
| E° of a half-reaction (+1.33 V, +1.51 V, −0.50 V), a cell potential of an exercise | `potential` | 19.1 | `\kEo`; Example 19.2's ladder of three oxidizers if drawn |
| λ of absorbed light (499 nm, 450–600 nm, 620–800 nm), the radii of the colour wheel | `wavelength` | 19.3 | `\klam`; the slider of a colour-wheel Sim |
| ν (6.01 × 10¹⁴ Hz) | `frequency` | 19.3 | `\knu`; the book prints it as v |
| c in Example 19.9 | `velocity` | 19.3 | `\kc` |
| a temperature (23 K, 4 K, 90 K, 92 K, 77 K, 110 K, 0 °C, the blast-furnace zones 230–1510 °C) | `temperature` | 19.1 | `data-type` on the value; the slider of a superconductor Sim and the zone scale of the furnace |
| a mass, volume or concentration of an exercise (2.5000 g, 19.17 mL, 0.0100 M) | `mass`, `volume`, `concentration` | 19.1 | `data-type` where the prose or a prompt states one |
| a furnace height (5–75 ft, 80–100 feet) | `length` | 19.1 | `data-type` where a figure or the prose states one |
| a pressure (760 torr) | `pressure` | 19.1 | in one exercise |
| a bond angle (109.5°, 90°, 180°), the arcs of the geometry and cis–trans Sims | `angle` | 19.2 | `data-type` on the three angles the text states, as 7.6 marks them; added by the build where the plan bound nothing |

These stay in ink: oxidation states and numbers, charges, coordination
numbers, the number of d electrons and of unpaired electrons, the
denticity of a ligand, group and period numbers, atomic numbers, mass
percents and abundances, prices, the 1:2:3 ratio, the 4/9 of Δ<sub>tet</sub>,
Planck's constant h, resistance (19.10, which the book draws without a
number and no other chapter types), and a magnetic moment, which the
chapter names but never states as a number.

A word or phrase wears a category only where it names a typed concept:
"crystal field splitting" and "pairing energy" in 19.3, "reduction
potential" where the text means E°, "wavelength" and "frequency" in
Example 19.9. Element names, series, ligands, complexes, isomers,
geometries, processes (smelting, refining, hydrometallurgy) and the
spectrochemical series are not quantities and stay ink.

## Facts and conventions

`F.el` for every atom and ion drawn, in the book's own molecule palette
(carbon black, hydrogen white, oxygen red, nitrogen blue, chlorine green,
sulfur yellow, phosphorus orange, copper brown, titanium gray), with the
palette's own colours for the metals the chapter draws (Co, Pt, Fe, Cr, Ni,
Zn, Ag, Cu, Mn, Mg, Sc); a generic metal M takes the palette's
`other` fallback through `F.el('M')` with its label, never a type hue. An ion keeps its element colour and
carries its charge as a mark. A free electron in a splitting diagram is a
half arrow in ink, its spin the direction.

Facts, drawn as the thing looks and kept when colour coding is off: the
minerals of Figure 19.1; the six hexaaqua solutions of Figure 19.12
(colourless Sc³⁺ and Zn²⁺, violet Cr³⁺, pink-red Co²⁺, green Ni²⁺, blue
Cu²⁺) and the three of Figure 19.38; violet cis- and green
trans-[Co(NH₃)₄Cl₂]⁺; blue-green [Fe(H₂O)₆]SO₄ against pale yellow
K₄[Fe(CN)₆]; the blue of [Cu(NH₃)₄]²⁺; white CuI and blue
Cu(NO₃)₂·5H₂O; the pink or blue of cobalt(II) hydroxide; the blue of
anhydrous CoCl₂; the red of heme and green of chlorophyll; the glow of
molten iron. The colour wheel and the absorbed and transmitted light of
Figure 19.37 are `"spectrum"`, light in its own colour. A d orbital's two
phases are drawn in two ink tones, never in type hues, as 6.3 drew them.

## Referents

As built (chapter pass, 2026-10-05): none. 19.1's series and metals, 19.2's isomers and 19.3's complexes are told apart by their labels and by a choice, one at a time; no figure sets two of them side by side in their own colours, so the referents planned for Example 19.2's ladder and Figure 19.35's two iron complexes were not needed.

## As built

- 19.1: the blast furnace draws `temperature` on its zone scale and `length` on its heights, with the glow of molten iron and of molten slag as facts and `F.el` for Fe, C, Ca and O; the superconductor Sim draws `temperature`; the series and oxidation-state Sims are ink with a neutral highlight. Resistance stays ink.
- 19.2: `angle` on the geometry and cis–trans Sims' arcs; violet cis- and green trans-[Co(NH₃)₄Cl₂]⁺ as facts; `F.el` for every atom, a generic M through its fallback.
- 19.3: `energy` for Δ<sub>oct</sub>, Δ<sub>tet</sub>, P and the splitting diagrams; the colour wheel draws `wavelength`, `frequency`, `velocity` and `energy` in its readout, with the wheel, the light and the solution as `"spectrum"`; M and L through `F.el`'s fallback.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
