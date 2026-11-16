# Plan: 10.1 Intermolecular Forces (m68761)

Source: `source.md`, converted with `python3 tools/convert.py 10.1`. Status: built 2026-09-28 without a review stop; `config.md` records that the plan file replaces the stop, applied as proposed on Chen's instruction to finish the book without check-ins.

Three learning objectives, thirteen numbered figures (10.2 to 10.14), one table (10.1), three worked examples with a Check Your Learning each, one unnumbered image in Example 10.1, two Link to Learning notes (dropped), two boxed notes (Geckos and Intermolecular Forces; Hydrogen Bonding and DNA), twenty-one end-of-section exercises of which eleven are keyed, two images inside exercises, eight glossary terms. One page.

## Sub-concepts (page headers)

1. `kmt` **Attraction against kinetic energy** (the opening, Figures 10.2 to 10.4). Introduces `phase-from-imf-and-kinetic-energy`; uses `kinetic-molecular-theory`.
2. `forces` **Forces between molecules** (book's header, Figure 10.5). Introduces `intermolecular-versus-intramolecular-forces`.
3. `dispersion` **Dispersion forces** (book's header, Figure 10.6, Table 10.1). Introduces `dispersion-forces`.
4. `polarizability` **Polarizability and the size of a molecule** (the paragraph after Table 10.1 and Example 10.1). Introduces `polarizability-and-dispersion-strength`, `rank-by-intermolecular-forces`.
5. `shape` **Molecular shape and contact area** (Figure 10.7). Introduces `shape-and-dispersion-strength`.
6. `geckos` **Geckos and intermolecular forces** (the note, Figure 10.8). Uses `dispersion-forces`.
7. `dipole` **Dipole-dipole attractions** (book's header, Figure 10.9, Example 10.2). Introduces `dipole-dipole-attraction`; uses `molecular-polarity`, `rank-by-intermolecular-forces`.
8. `hbond` **Hydrogen bonding** (book's header, Figure 10.10). Introduces `hydrogen-bonding`; uses `electronegativity`.
9. `hydrides` **Hydrogen bonds and boiling points** (Figures 10.11 and 10.12, Example 10.3). Reinforces `hydrogen-bonding`; uses `rank-by-intermolecular-forces`.
10. `dna` **Hydrogen bonding and DNA** (the note, Figures 10.13 and 10.14). Uses `hydrogen-bonding`.

## Figures

- sim-phases · Figure 10.2 · phase-from-imf-and-kinetic-energy, dispersion-forces · flow by animation, variation by slider and choice · arrows: none (the book's motion dashes become short trails behind the moving molecules) · moving: the molecules vibrate about the places of a crystal, slide over one another in a pool or fly across the flask, since the idea is motion against attraction · T slider (temperature, 10 to 650 K, opens at 298 K, dashed circles at room temperature and the halogen's melting and boiling points) and a halogen choice F₂, Cl₂, Br₂, I₂, At₂ (Table 10.1, opens on Br₂) · headline: "At 298 K bromine is a liquid: …" · graph beside: each halogen's solid, liquid and gas ranges on one temperature axis (0 to 700 K), the set temperature and room temperature as levels across all five, so at room temperature F₂ and Cl₂ read as gases, Br₂ a liquid, I₂ and At₂ solids, as the text says · 2D (rebuilt 2026-11-14 from a small 3D box with view buttons: every molecule must be seen and turning the flask shows nothing; book rule for particle pictures). Readout: melting point < T < boiling point with the live numbers. Phases told by packing and grey levels, never hue.
  works: parts (a stoppered Erlenmeyer flask, 34 diatomic molecules in the element palette; beside it five columns, one per halogen, on a temperature axis) · flow (the molecules move faster as T rises; at the melting point the crystal on the floor loosens into a pool, at the boiling point the pool flies apart to fill the flask up to the stopper) · must hold (a solid is a packed crystal on the floor of the flask, a liquid a pool on the floor with every molecule in contact, a gas fills the whole flask; the phase drawn, the headline, the readout and the chosen column agree at every T; molecules never leave the glass) · read off the image (three stoppered flasks, crystalline solid, liquid, gas; "Increasing KE (temperature)" becomes the temperature axis and "Increasing IMF" the halogens ordered by size under "larger molecules, stronger dispersion forces"; the numbers are Table 10.1's: F₂ 53/85 K, Cl₂ 172/238 K, Br₂ 266/332 K, I₂ 387/457 K, At₂ 575/610 K).
- fig-water-photo · Figure 10.3 · photograph kept: the text points at it.
- fig-butane-photo · Figure 10.4 · photograph kept: the text points at it.
- sim-intra-inter · Figure 10.5 · reverted 2026-11-14 to the book's image: a still redraw of two HCl molecules with a 2D/3D choice; turning a linear molecule teaches nothing and the book's space-filling drawing is clearer. The 17 kJ against 430 kJ comparison stays in the text.
- sim-dispersion · Figure 10.6 · dispersion-forces, polarizability-and-dispersion-strength · flow by animation, variation by choice · arrows: none · moving: the electron cloud of the left molecule shifts on a clock and the right one's follows at once, a little weaker, since the book calls the dipoles "rapidly fluctuating" · choice F₂, Cl₂, Br₂, I₂, At₂ (one scale, 0.85 units per pm of Table 10.1's atomic radius; the shift grows with size) · no headline (the labels and readout carry it) · none · 2D: the charge moves along one axis and the book draws a flat cloud. Ends δ+ `F.cat(0)`, δ− `F.cat(1)` with a legend. Readout: atomic radius, then the boiling point in the temperature hue, on two lines.
  works: parts (two diatomic molecules side by side, each two atoms in one outline with two nuclei; a dotted attraction between them; a bracket under each) · flow (electron density sloshes from end to end in the left molecule; the right molecule's follows) · must hold (whenever the clouds are shifted the facing ends carry opposite charges, δ− facing δ+; the dots are strongest when both dipoles are; the induced dipole is never stronger than the one that induces it) · read off the image (labels "Unequal distribution of electrons", "Attractive force", "Temporary dipoles", δ+ and δ− at the ends).
- sim-pentanes · Figure 10.7 · reverted 2026-11-14 to the book's image: the choice showed one isomer at a time, which hides the side-by-side comparison that is the whole point, and the flat space-filling drawing was weaker than the book's.
- fig-geckos · Figure 10.8 · photograph kept (in the note, the text points at it).
- fig-dipoles · Figure 10.9 · reverted 2026-11-14 to the book's image: a still redraw no clearer than the book's.
- sim-hbond · Figure 10.10 · reverted 2026-11-14 to the book's image: the flat drawing was a tangle, and the 3D tetrahedral cluster taught an arrangement this passage does not teach (ice comes in 10.5).
- sim-hydrides · Figure 10.11 + 10.12 · hydrogen-bonding, rank-by-intermolecular-forces · morph, variation by choice · arrows: none · still: a choice between the trend and the measurement moves the three period-2 points from where the heavier hydrides predict them to where they are measured, and the lines bend · choice "predicted from the trend" / "measured" · headline states the three period-2 boiling points of the state shown · graph alone · 2D. Families `F.ref` per group, with the carbon family of Example 10.1 as the family with no hydrogen bonding (named on CH₄ and by hover; its other labels would crowd the book's). Legend inside, bottom right, as the book. Readout: water's boiling point against the trend.
  works: read off the image (periods 2 to 5, −200 to 150 °C by 50; measured, Figure 10.12: NH₃ −33, PH₃ −88, AsH₃ −62, SbH₃ −17; H₂O 100, H₂S −60, H₂Se −41, H₂Te −2; HF 20, HCl −85, HBr −67, HI −35; carbon family from Example 10.1's graph: CH₄ −160, SiH₄ −120, GeH₄ −90, SnH₄ −52; predictions: the text's −120 (NH₃), −80 (H₂O), −110 (HF) °C, where Figure 10.11 draws its "?" points at −130 (NH₃) and −120 (HF): the text is used, since it states the numbers and is closer to the trends' extrapolation; dashed lines to the predictions as in 10.11).
- fig-carbon-family · unnumbered image in Example 10.1 · kept as the book's image (`figure` row with no number, as config says for unnumbered images kept).
- fig-dna, fig-dna-pairs · Figures 10.13, 10.14 · kept as the book's images (exploration: the helix and the Lewis structure are the note's subject; a redraw adds nothing).

Exercise images: `CNX_Chem_10_01_AceticAcid_img.jpg` and `CNX_Chem_10_01_Aminacidch_img.jpg` go into their exercise cards.

## Tables

Table 10.1 Melting and Boiling Points of the Halogens, in the text as `div.book-table`.

## Binds

`temperature` only (the slider and axis of 10.2, the readout of 10.6 and the axis of 10.11 + 10.12). Energy is not drawn as a quantity. Element palette for every atom; `F.cat(0)`/`F.cat(1)` for the δ+ and δ− ends of 10.6; `F.ref` for the four hydride families of 10.11 + 10.12.

## Exercises

Three Check Your Learning inline after Examples 10.1, 10.2, 10.3, keyed. Twenty end items: eleven keyed (the melting-point item fs-idp12526608 as a choice, the rest open with the book's solution), nine unkeyed conceptual kept with an AI-marked approach. The PhET item fs-idm78391360 is held: the phases Sim does not carry its interaction-potential part.

## Wanted at chapter level

- nothing: every concept, symbol and glossary row this page uses is already merged; no equation anchors (the chapter has no 10.1 equation).

Applied by the chapter pass (2026-09-28): nothing wanted.
