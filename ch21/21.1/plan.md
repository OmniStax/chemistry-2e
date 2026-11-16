# Plan: 21.1 Nuclear Structure and Stability (m68851)

Written 2026-10-05 before the build and left for review, as `ch21/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Three objectives, two numbered figures (21.2, 21.3), one table (21.1), three worked examples (21.1 to 21.3) with a Check Your Learning each, one Link to Learning note (dropped), ten end-of-section items (chapter exercises 1 to 10) and one moved in from 21.2 (exercise 17).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `nucleus` | The Atomic Nucleus (OmniStax's own; the book prints the opening untitled) | introduces `nuclear-chemistry`, `nuclide`, `nucleon`, `nuclear-density`; uses `nucleus`, `proton`, `neutron`, `atomic-number`, `mass-number`, `isotopes`, `isotope-symbols`, `density` |
| `ex-neutron-star` | Example 21.1 Density of a Neutron Star | uses `density`, `volume`, `mass`, `nuclear-density` |
| `strong-force` | (paragraph after Example 21.1) | introduces `strong-nuclear-force`; uses `nucleon` |
| `binding` | Nuclear Binding Energy (the book's) | introduces `mass-defect`, `nuclear-binding-energy`, `mass-energy-equivalence`, `electron-volt`; uses `atomic-mass-unit`, `mass-spectrometry`, `energy-and-work`, `mass` |
| `ex-binding-energy` | Example 21.2 Calculation of Nuclear Binding Energy | introduces `binding-energy-calculation`; uses `mass-defect`, `mass-energy-equivalence`, `molar-mass`, `avogadro-number`, `joule`, `electron-volt` |
| `stability` | Nuclear Stability (the book's; Figure 21.2) | introduces `band-of-stability`, `radioactivity`; uses `isotopes`, `strong-nuclear-force` |
| `magic` | (paragraph; Table 21.1) | introduces `magic-number`; uses `noble-gas` |
| `per-nucleon` | (paragraph; Figure 21.3) | introduces `binding-energy-per-nucleon`; uses `nuclear-binding-energy` |
| `ex-per-nucleon` | Example 21.3 Calculation of Binding Energy per Nucleon | uses `binding-energy-calculation`, `binding-energy-per-nucleon`, `mass-defect` |

## Figures

- sim-band-stability · Figure 21.2 · band-of-stability, radioactivity, magic-number · variation by slider (rebuilt 2026-11-16, second pass; the first pass's chart was small and its ratio graph a cloud of points): the book's chart on its own equal scale (Z 0 to 120 across, n 0 to 180 up, 4 units a nucleon), the 253 stable nuclides one cell each as the book's zigzag, the known radioactive nuclides a shaded band, the line n = Z; a ray from the origin through the chosen nuclide runs to the frame, where a scale reads its slope as the n:p ratio (0.5 to 1.5 up the right edge, past 1.5 along the top), so the text's 1.00, 1.15 and 1.52 are read off the chart as the ray swings up. Beside it a close-up of the 11 by 11 nuclides round the chosen one, a square each with its mass number, stable filled and radioactive shaded, the squares on n = Z outlined, the magic numbers boxed on both axes: the single nuclides the book's chart cannot resolve, with Table 21.1's even and odd pattern, technetium's empty column and tin's ten stable nuclides there to see · arrows: none · still, the chart answers the sliders · Z (ink, 1 to 118, ticks at the text's 7, 26, 82; opens on 26) and n (ink, the element's known nuclides, dashed circles on its stable ones); a change of Z puts n on the element's most abundant stable nuclide (the text's nitrogen-14, iron-56, lead-207; the longest-lived where none is stable); a tap on a square or on the chart picks that nuclide · headline "Iron-56 has 30 neutrons for its 26 protons, an n:p ratio of 1.15, and is stable."; off the band "… It is radioactive, with more neutrons than any stable nuclide of carbon."; past 83 "… as is every nuclide past bismuth, Z = 83." · graph beside: the close-up · 2D (book rule) · stable and radioactive told by fill and a legend, never by the book's blue and green; the chosen nuclide in its referent colour where the text names it, else one `F.cat` colour; hover names on every square
  works: parts: a chart of neutrons (up) against protons (across) on equal scales; a shaded band of known nuclides; the stable nuclides inside it; the straight line n = Z from the origin to (120, 120); a key · flow: none · must hold: (1) the two axes have the same scale, 0 to 120 and 0 to 180 with ticks every 20; (2) the stable cells end at Z = 83 (bismuth-209) and none stand at Z = 43 or 61; (3) the band reaches Z = 118, n about 177, and lies above n = Z everywhere past Z ≈ 50; (4) nitrogen-14 sits on n = Z (7, 7) with ratio 1.00, iron-56 at (26, 30) with 1.15, lead-207 at (82, 125) with 1.52, as the text gives them; (5) the ray from the origin passes through the chosen nuclide and meets the scale at n/Z; (6) the close-up's squares are the chart's nuclides: the same stable set, the square on the overview marks the same window; (7) every stable nuclide lies inside the band; (8) the counts by even and odd Z and n are near Table 21.1's (the 253 here: 146, 54, 49, 4; the book's 265 counts some long-lived nuclides too) · read off the image: axes "Number of protons (Z)" 0 to 120 by 10 and "Number of neutrons (n)" 0 to 180 by 10, a square grid; the green band from the origin to about (118, 178), about 30 neutrons wide among the heavy elements, its lower edge stepping up near Z = 84; the blue stable zigzag ending near (83, 127); the black line n = Z to (120, 120); key "Nonradioactive", "Radioactive". The alt text swaps the axes (neutrons across); the image is the book. The band's edges are read off the image between Z = 11 and 103 and kept inside the nuclides that have been observed; the ten lightest and the fifteen heaviest elements are set one by one.
- sim-binding-curve · Figure 21.3 · binding-energy-per-nucleon, mass-defect, mass-energy-equivalence, nuclear-binding-energy, binding-energy-calculation · variation by slider (rebuilt 2026-11-16, second pass; the first pass kept a dropdown, a sparse nucleus in a blank band and a readout that began at the mass in kilograms): the book's curve with its fusion and fission arrows, the points 33 stable nuclides from hydrogen-2 to uranium-238 whose binding energy per nucleon is found from their atomic masses exactly as Examples 21.2 and 21.3 find it (the book's 1.0073, 1.0087 and 0.00055 amu, 1.6605 × 10⁻²⁷ kg per amu, 2.998 × 10⁸ m/s, 1.602 × 10⁻¹³ J per MeV), carried to the significant figures of the mass defect, so helium-4 reads 28.4 MeV and 7.10 MeV/nucleon and iron-56 493.9 MeV and 8.820, as the book has them. Beside the graph the chosen nucleus as a close flat packing of its Z proton and N neutron discs on one scale (uranium-238 fills the square), and under it the sum of Example 21.3's first step: protons, neutrons and electrons each times its mass, the particles apart, less the atom, the mass defect in amu and in kilograms. The still curve cannot show where a point comes from; here every step of the example is on the page for any nuclide · arrows: symbolic (the fusion and fission arrows) · still · one slider over the 33 nuclides in order of mass number (ticks at helium-4, Example 21.2, iron-56, Example 21.3, and uranium-238; opens on iron-56); a tap on a point picks it · headline "Breaking iron-56 into its 56 nucleons takes 493.9 MeV, 8.820 MeV for each one." · graph beside the nucleus · 2D · readout E = mc² with the mass in kg and the result in J, then E/A with the conversion to MeV on its own line
  works: read off the image: axes "Mass number" 0 to 260 by 20 and "Binding energy per nucleon (MeV)" 0 to 10 by 1; a red curve rising steeply from 0, near 8.8 by A ≈ 40, flat at about 8.8 to 8.9 from 50 to 100 and falling to about 7.5 at 250; an upward "Fusion" arrow at A ≈ 20 from 2 to 5.3 MeV; a leftward "Fission" arrow from about A = 225, 7.0 MeV toward A = 148, 7.55 MeV. The book's blue points are scattered (8, 5.5; 70, 9.0 …) and do not match real nuclides; the figure's points are computed. Example 21.3: iron-56, 56.4651 amu − 55.9349 amu = 0.5302 amu, 7.913 × 10⁻¹¹ J, 493.9 MeV, 8.820 MeV per nucleon; Example 21.2: helium-4, 4.0331 amu − 4.0026 amu = 0.0305 amu, 28.4 MeV (7.10 per nucleon). must hold: the three products and the atom's mass add up to the mass defect shown, to the last digit; the dot sits on the dashed lines to both axes.

Photographs and unnumbered images: none in the section.

Extra simulations: none; the mass-defect Sim the exploration offered is folded into Figure 21.3's nucleus and readout.

## Tables

Table 21.1 Stable Nuclear Isotopes as `div.book-table`. The Key Equations table is not printed.

## Referents

`nitrogen-14`, `iron-56`, `lead-207`: the chosen nuclide of Figure 21.2 wears the referent's colour when it is one of them; marked in the stability paragraph that names them.

## Types bound

`length` (radii and diameters, 10⁻¹⁵ m, 26 km, 15 fm, 200 m), `density` (1.8 × 10¹⁴ g/cm³, 22.6 g/cm³, the examples' kg/m³ results), `mass` (solar masses, kg, the mass defect in amu, g/mol, kg/mol; m), `volume` (V), `energy` (E, 28.4 MeV, 2.74 TJ/mol, 7.10 MeV/nucleon, the curve and its axis), `velocity` (c). Z, A, n, the n:p ratio, counts of nucleons and stable isotopes stay ink.

## Exercises

Three Check Your Learning items inline after Examples 21.1 to 21.3, hosts `ex-neutron-star`, `ex-binding-energy`, `ex-per-nucleon` (keys read in the CNXML: the density comparison, 148.4 MeV, 7.810 MeV/nucleon). Ten end-of-section items: five keyed kept (1, 3, 5, 7, 9), `fs-idp43351040` (10) kept open with its options and an AI-marked suggested approach, four unkeyed left out and named (`fs-idm1122208`, `fs-idm82455680`, `fs-idm91931648`, `fs-idm82186208`). From 21.2: `fs-idp74968928` (17, binding energy of fluorine-19, keyed 148.8 MeV and 7.808 MeV/nucleon) with `source_section` "21.2". Exercises 9 and 10 carry Figure 21.2 in their card.

## Left out

The Link to Learning note on the four fundamental forces. Kept as printed: "the number or nucleons", Example 21.3's "same process as in Example 21.1" (the density example), the CYL key 148.4 MeV beside exercise 17's 148.8 MeV for the same fluorine-19.

## Wanted at chapter level

- forms `eq-mass-energy-equivalence` → 21.1-binding
- variables `21.1/d` → 21.1-ex-neutron-star
- variables `21.1/m` → 21.1-binding
- variables `21.1/V` → 21.1-ex-neutron-star
- variables `21.1/r` → 21.1-ex-neutron-star
- variables `21.1/E` → 21.1-binding
- variables `21.1/c` → 21.1-binding

Applied by the chapter pass: every anchor above set as listed. The raw ☉ in the solar-mass symbol of Example 21.1 became `\odot`, which KaTeX sets. Both sections' `exercise_notes` now say that `fs-idp74968928` carries `source_section` 21.2. `config.md` and `exploration.md` record that the atomic masses behind Figure 21.3 are OmniStax's own for 31 of its 33 nuclides.

## Derivations

- Example 21.2, the binding energy of helium-4 · score 3 · not built: a worked example that substitutes the mass defect into E = mc² and converts units
