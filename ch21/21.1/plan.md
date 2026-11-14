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

- sim-band-stability · Figure 21.2 · band-of-stability, radioactivity · variation by slider (rebuilt 2026-11-14): the book's chart on its own equal scale (Z 0 to 120 across, n 0 to 180 up, one unit the same length on both axes, so the band's climb away from n = Z reads as the book draws it), the 252 stable nuclides one point each where the book draws a zigzag line, the known radioactive nuclides a shaded band in ink, the line n = Z; a slider on Z picks one element, its column of known nuclides is marked, and its stable nuclide (the text's nitrogen-14, iron-56 and lead-207 at Z = 7, 26 and 82, else the most abundant) is joined to the origin by a dashed line whose slope is its n:p ratio; beside the chart the n:p ratio of every stable nuclide against Z, flat at 1 for the light nuclides and climbing to about 1.5 at lead, the chosen one marked. The still chart shows the band; the slider makes the text's point, that heavier stable nuclei carry more neutrons per proton, a number that changes under the reader's hand, and past Z = 83 it finds no stable point at all · arrows: none · still, the chart answers the slider · Z (ink, 1 to 118, soft detents at the text's 7, 26, 82; opens on 26, iron-56, the text's middle example) · headline "Iron-56 has 30 neutrons for its 26 protons, an n:p ratio of 1.15."; past 83 "… has no stable nuclide" · graph beside: the ratio n/Z of the stable nuclides (0.4 to 1.6, hydrogen-1's 0 pinned at the floor) against Z on the same 0 to 120 · 2D, two charts (book rule) · stable and radioactive told by fill and a legend, never by the book's blue and green; the chosen nuclide in its referent colour where the text names it, else ink; one label per chart, on the chosen nuclide; every stable point named by hover
  works: parts: a chart of neutrons (up) against protons (across) on equal scales; a shaded band of known nuclides; points of the stable nuclides inside it; the straight line n = Z from the origin to (120, 120) · flow: none · must hold: (1) the two axes have the same scale, 0 to 120 and 0 to 180 with ticks every 20; (2) the stable points end at Z = 83 (bismuth-209) and none stand at Z = 43 or 61; (3) the band reaches Z ≈ 118, n ≈ 178 and lies above n = Z everywhere past Z ≈ 50; (4) nitrogen-14 sits on n = Z (7, 7), iron-56 at (26, 30) with n:p 1.15, lead-207 at (82, 125) with n:p 1.52, as the text gives them; (5) the dashed line from the origin passes through the chosen point; (6) the ratio graph's points equal n/Z of the chart's points · read off the image: axes "Number of protons (Z)" 0 to 120 by 10 and "Number of neutrons (n)" 0 to 180 by 10, a square grid; the green band from the origin to about (118, 178), about 30 neutrons wide among the heavy elements; the blue stable zigzag ending near (83, 127); the black line n = Z to (120, 120); key "Nonradioactive", "Radioactive". The alt text swaps the axes (neutrons across); the image is the book.
- sim-binding-curve · Figure 21.3 · binding-energy-per-nucleon, mass-defect, mass-energy-equivalence, nuclear-binding-energy, binding-energy-calculation · kept and fixed 2026-11-14 (nucleus enlarged to fill its square, a legend that counts the protons and neutrons, the readout's two formulas on two lines, the headline clear of the axis title) · variation by choice: the book's curve with its fusion and fission arrows, the points 33 stable nuclides from hydrogen-2 to uranium-238 whose binding energy per nucleon is found from their atomic masses exactly as Examples 21.2 and 21.3 find it (the book's 1.0073, 1.0087 and 0.00055 amu, 1.6605 × 10⁻²⁷ kg per amu, 2.998 × 10⁸ m/s, 1.602 × 10⁻¹³ J per MeV), so the reader sees Example 21.3's arithmetic place any nuclide on the curve, which the still curve cannot; beside the graph the chosen nucleus as a flat packing of its Z proton and N neutron discs, growing from helium-4 to uranium-238 · arrows: symbolic (the fusion and fission arrows) · still · one choice, a dropdown of fifteen nuclides from helium-4 to uranium-238 (fluorine-19 and sodium-23 left out, being the answers of Check Your Learning and an exercise), default iron-56, Example 21.3's nuclide; helium-4 reproduces Example 21.2 · headline "Iron-56 is 0.5302 amu lighter than its 26 protons, 30 neutrons and 26 electrons." · graph beside the nucleus · 2D · readout E = mc² with the mass in kg and the result in MeV, then E/A on its own line
  works: read off the image: axes "Mass number" 0 to 260 by 20 and "Binding energy per nucleon (MeV)" 0 to 10 by 1; a red curve rising steeply from 0, near 8.8 by A ≈ 40, flat at about 8.8 to 8.9 from 50 to 100 and falling to about 7.5 at 250; an upward "Fusion" arrow at A ≈ 20 from 2 to 5.3 MeV; a leftward "Fission" arrow from about A = 200, 7.2 MeV toward A = 145, 7.6 MeV. The book's blue points are scattered (8, 5.5; 70, 9.0 …) and do not match real nuclides; the figure's points are computed. Example 21.3: iron-56, 0.5302 amu, 7.913 × 10⁻¹¹ J, 493.9 MeV, 8.820 MeV per nucleon; Example 21.2: helium-4, 0.0305 amu, 28.4 MeV (7.10 per nucleon).

Photographs and unnumbered images: none in the section.

Extra simulations: none; the mass-defect Sim the exploration offered is folded into Figure 21.3's nucleus and readout.

## Tables

Table 21.1 Stable Nuclear Isotopes as `div.book-table`. The Key Equations table is not printed.

## Referents

`nitrogen-14`, `iron-56`, `lead-207`: one point each on Figure 21.2, marked in the stability paragraph that names them.

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
