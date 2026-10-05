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

- sim-band-stability · Figure 21.2 · band-of-stability, radioactivity · standardisation: a faithful copy (two end-of-section exercises read it), redrawn on the book's axes (protons Z 0 to 120 across, neutrons n 0 to 180 up) with the 252 stable nuclides plotted one point each from their proton and neutron counts, where the book draws a zigzag line, the known radioactive nuclides as a shaded band in ink with edges taken from the book's figure, and the line n = Z; the text's three examples, nitrogen-14, iron-56 and lead-207, are referents with a labelled point each · arrows: none · still, nothing in the chart has a clock and nothing varies · no sliders or choices · no headline: the chart is the book's and the caption carries it · graph alone · 2D, a chart (book rule) · stable and radioactive told by fill and legend, never by the book's blue and green; hover names on every stable point ("iron-56: 26 protons, 30 neutrons"); three labels, all in the empty triangle above the band, plus "n = Z" on its line
- sim-binding-curve · Figure 21.3 · binding-energy-per-nucleon, mass-defect, mass-energy-equivalence, nuclear-binding-energy, binding-energy-calculation · variation by choice and standardisation: the book's curve with its fusion and fission arrows, the points 33 stable nuclides from hydrogen-2 to uranium-238 whose binding energy per nucleon is found from their atomic masses exactly as Examples 21.2 and 21.3 find it (the book's 1.0073, 1.0087 and 0.00055 amu, 1.6605 × 10⁻²⁷ kg per amu, 2.998 × 10⁸ m/s, 1.602 × 10⁻¹³ J per MeV), so the reader sees Example 21.3's arithmetic place any nuclide on the curve, which the still curve cannot; beside the graph the chosen nucleus as a flat packing of its Z proton and N neutron discs, outer discs fading in or out and colours crossfading as the choice changes · arrows: symbolic (the fusion and fission arrows point the way to more tightly bound nuclei; nothing travels along them) · still, the figure answers its choice and nothing has a clock · one choice, a dropdown of fifteen nuclides from helium-4 to uranium-238 (fluorine-19 and sodium-23 left out, being the answers of Check Your Learning and an exercise), default iron-56, Example 21.3's nuclide; helium-4 reproduces Example 21.2 · headline "Iron-56 is 0.5302 amu lighter than its 26 protons, 30 neutrons and 26 electrons." · graph beside the nucleus (the nucleus is a compact, square scene) · 2D, a graph and a flat packing (config: nuclei as flat packings, counts the lesson) · curve as the semi-empirical fit drawn in `energy`, fixed axes A 0 to 260 and 0 to 10 MeV, the chosen point in `energy` with drop lines; protons `F.el('p+')`, neutrons `F.el('n0')`, named by a legend and a hover on the nucleus · readout E = mc² with Example 21.3's chain (kg, then J, then MeV); note E/A, the height of the point · labels: the axis titles, "fusion" and "fission" beside their arrows; points named by hover

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
