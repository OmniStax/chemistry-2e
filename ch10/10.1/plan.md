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

- sim-phases · Figure 10.2 · phase-from-imf-and-kinetic-energy, dispersion-forces · flow by animation, variation by slider and choice, shape in 3D · moving: the particles vibrate about a lattice, slide past one another in a puddle or fly across the flask, since the idea is motion against attraction · T slider (temperature, 10 to 260 K, dashed circles at the chosen substance's melting and boiling points) and a substance choice Ne, Ar, Kr, F₂, Cl₂ (atoms and diatomics in the element palette; the halogen values are Table 10.1's) · headline on the strip: "At 200 K chlorine is a liquid: …" · flat strip beneath with the temperature scale, the two transition points and the three regions named in ink · physical 3D particle box (book rule: a particle picture is 3D), pitch bounded to 0.02 to 1.2 rad since the flask stands on a floor and is never seen from beneath, yaw free, no idle spin since the particles already move. Readout: melting point < T < boiling point with the live numbers in the temperature hue.
- fig-water-photo · Figure 10.3 · photograph kept: the text points at it.
- fig-butane-photo · Figure 10.4 · photograph kept: the text points at it.
- sim-intra-inter · Figure 10.5 · intermolecular-versus-intramolecular-forces · standardisation, shape in 3D · still: nothing in the idea varies · view choice 2D/3D only (book rule: an intermolecular-force drawing is built both ways, 2D default) · headline names the two forces · none · two HCl molecules, bond sticks in ink, the intermolecular attraction a dotted ink line; 3D free orbit within pitch ±1.2, no ground. Readout: 17 kJ against 430 kJ per mole, in ink (energy is not bound on this page).
- sim-dispersion · Figure 10.6 · dispersion-forces, polarizability-and-dispersion-strength · flow by animation, variation by choice · moving: the electron cloud of the left molecule sloshes on a clock and the right one's follows it, since the book calls the dipoles "rapidly fluctuating" · choice F₂, Cl₂, Br₂, I₂, At₂ (the molecule's size and how far its cloud shifts follow Table 10.1) · headline states the halogen and its boiling point · none · 2D: the charge moves along one axis and the book draws a flat cloud; a 3D stage would show the same thing from elsewhere (manim-style 1). Ends δ+ `F.cat(0)`, δ− `F.cat(1)` with a legend. Readout: the halogen's atomic radius, melting and boiling points, the temperatures in the temperature hue.
- sim-pentanes · Figure 10.7 · shape-and-dispersion-strength · shape in 3D, variation by choice, morph · still: the atoms bend from one isomer into the next when the choice changes · choice n-pentane, isopentane, neopentane and view choice 2D/3D (2D default) · headline states the isomer and its boiling point · none · space-filling molecules in the element palette, a molecule above its mirror image, the contact drawn as the book's jagged ink band whose length is the width of the facing surfaces; 3D free orbit within pitch ±1.2, no ground. Readout: the boiling point in the temperature hue.
- fig-geckos · Figure 10.8 · photograph kept (in the note, the text points at it).
- fig-dipoles · Figure 10.9 · dipole-dipole-attraction · standardisation · still faithful redraw, no controls: two arrangements of HCl dipoles, no variation to show · none · 2D: the book draws charge shapes, not atoms. Ends `F.cat(0)`/`F.cat(1)`, attractions dotted ink.
- sim-hbond · Figure 10.10 · hydrogen-bonding · shape in 3D · still · view choice 2D/3D (2D default) · headline names the hydrogen bonds · none · five water molecules in a tetrahedral cluster as in ice, hydrogen bonds dotted ink; 3D free orbit within pitch ±1.2. Readout: H₂O⋯HOH and the bond counts.
- sim-hydrides · Figure 10.11 + 10.12 · hydrogen-bonding, rank-by-intermolecular-forces · morph, standardisation · still: a choice between the trend and the measurement moves the three period-2 points from where the heavier hydrides predict them to where they are measured, and the lines bend · choice "predicted from the trend" / "measured" · headline states water's predicted and measured boiling points · graph alone · 2D. Families `F.cat(0..3)` (halogen, oxygen, nitrogen, and the carbon family of Example 10.1 as the family with no hydrogen bonding), temperature axis in its hue, every point named on hover. Boiling points: the measured values the book's graphs plot; the predictions are the text's −110, −80, −120 °C.
- fig-carbon-family · unnumbered image in Example 10.1 · kept as the book's image (`figure` row with no number, as config says for unnumbered images kept).
- fig-dna, fig-dna-pairs · Figures 10.13, 10.14 · kept as the book's images (exploration: the helix and the Lewis structure are the note's subject; a redraw adds nothing).

Exercise images: `CNX_Chem_10_01_AceticAcid_img.jpg` and `CNX_Chem_10_01_Aminacidch_img.jpg` go into their exercise cards.

## Tables

Table 10.1 Melting and Boiling Points of the Halogens, in the text as `div.book-table`.

## Binds

`temperature` only (the slider and scale of 10.2, the readouts of 10.6, 10.7 and the axis of 10.11 + 10.12). Energy is not drawn as a quantity. Element palette for every atom; `F.cat(0)`/`F.cat(1)` for the δ+ and δ− ends; `F.cat(0..3)` for the four hydride families (10.11 + 10.12 has no dipole ends, so the pairs do not meet on one figure).

## Exercises

Three Check Your Learning inline after Examples 10.1, 10.2, 10.3, keyed. Twenty end items: eleven keyed (the melting-point item fs-idp12526608 as a choice, the rest open with the book's solution), nine unkeyed conceptual kept with an AI-marked approach. The PhET item fs-idm78391360 is held: the phases Sim does not carry its interaction-potential part.

## Wanted at chapter level

- nothing: every concept, symbol and glossary row this page uses is already merged; no equation anchors (the chapter has no 10.1 equation).

Applied by the chapter pass (2026-09-28): nothing wanted.
