# Chapter 21 colour plan

Prepared 2026-10-05 with `config.md`. Colour reaches these pages in root
`RULES.md` item 7's four ways, fact, convention, referent and category, and
where two apply the earlier wins. This file records what is particular to the
chapter; it invents no hue. It declares one category, `dose`, which the colours
script places in the palette; until it is run the type wears the fallback.

## Categories

| Quantity | Type | Sections | Treatment |
|---|---|---|---|
| a half-life t<sub>1/2</sub> (5.27 y, 5730 y, 4.5 × 10⁹ y, 110. minutes), a time t, an age found by dating | `time` | 21.3, 21.4, 21.5, 21.6 | the time axis of a decay curve and its clock; the half-life a marked interval on it |
| the decay constant λ (0.132 y⁻¹, 1.21 × 10⁻⁴ y⁻¹) | `rate-constant` | 21.3, 21.6 | the book calls it "the same as a rate constant"; `\klamdecay`, never `\klam` |
| a decay rate, the activity (10.8 disintegrations/min/g, Bq, Ci, mCi values) | `rate` | 21.3, 21.5, 21.6 | the activity is a rate stated in decays per second, as the book defines it; Bq and Ci values take `data-type` |
| binding energy, binding energy per nucleon (28.4 MeV, 7.10 MeV/nucleon, 8.820 MeV/nucleon), a photon or decay energy, a fission or fusion energy (1.8 × 10¹⁰ kJ, 3.6 × 10¹¹ kJ), an enthalpy compared | `energy` | 21.1, 21.2, 21.3, 21.4, 21.5, 21.6 | the curve and readout of 21.1; the energy ladder of 21.27; a photon energy on 21.31's slider |
| the mass defect (0.0305 amu, 0.5302 amu), a mass of a particle, a nuclide or a sample (9.58 × 10⁻⁵ g of U-238, 5.00 g of Co-60), a solar mass | `mass` | 21.1, 21.3, 21.4, 21.6 | the mass that goes missing in the binding-energy figure |
| nuclear density (1.8 × 10¹⁴ g/cm³, 5.2 × 10¹⁷ kg/m³), iridium's 22.6 g/cm³ | `density` | 21.1 | `data-type` on values |
| the volume of a sphere in Example 21.1, 0.0001 mL of radon | `volume` | 21.1, 21.3 | in the example and one exercise |
| a radius or diameter (10⁻¹⁵ m, 10⁻¹⁰ m, 26 km, 15 fm), a thickness of shielding (3–20 cm, 1–3 m), a penetration depth | `length` | 21.1, 21.4, 21.6 | the scale of the nucleus; the barriers of 21.33 if drawn to a depth |
| the speed of light c | `velocity` | 21.1 | as Chapter 6 colours it |
| a temperature (15,000,000 K, 2200 °C, 273 K) | `temperature` | 21.2, 21.4 | `data-type` on values |
| a pressure (1 atm) | `pressure` | 21.2 | in one exercise |
| an absorbed dose (Gy, rad) and a dose equivalent (Sv, rem, mrem: 620 mrem, 500 rems, Table 21.5's exposures) | `dose` (new) | 21.4, 21.6 | one hue; Sv and rem the dose equivalent, a variant told by label; the bars of 21.37, Table 21.5's first column, the readout of rem = RBE × rad |
| a frequency or wavelength on the spectrum of 21.31 | `frequency`, `wavelength` | 21.6 | the axis of the ionizing-threshold figure |
| a percent remaining, a fraction N<sub>t</sub>/N<sub>0</sub>, a yield of fission products, an abundance (99%, 1%, 0.7% U-235) | none | — | ink, a rating |

These stay in ink: atomic number Z and mass number A and every sub- and
superscript of nuclide notation, the number of nuclei N (with N<sub>0</sub> and
N<sub>t</sub>), counts of protons, neutrons and nucleons, the n:p ratio, the
magic numbers, the RBE, ln 2 and 0.693, Avogadro's number, the electron volt and
other unit names, and the counts of procedures, tests, deaths and people.

A word or phrase wears a category only where it names a typed concept:
"binding energy", "binding energy per nucleon" and "nuclear binding energy"
(`energy`); "mass defect" (`mass`); "half-life" (`time`); "decay constant"
(`rate-constant`); "activity" and "decay rate" (`rate`); "absorbed dose",
"radiation dose" and "dose" where it means the quantity, and "dose equivalent"
(`dose`); "strong nuclear force" (`force`). Particles, decay modes, nuclides,
reactions, reactor parts, units and instruments are not quantities and stay
ink.

## Facts and conventions

Every particle with an identity is drawn in the element palette, as Chapter 31
of College Physics 2e draws it: the proton `F.el('p+')`, the neutron
`F.el('n0')`, the electron and the β particle `F.el('e-')`, the positron
`F.el('e+')` and the γ photon `F.el('gamma')`. A nucleus is a packing of the two
nucleon colours; an α particle is two protons and two neutrons, never a coloured
dot; a whole atom drawn as one sphere (a CO₂ of 21.11, the H₂O and OH of 21.32)
takes its element's `F.el`. The book's green protons and gray neutrons are its
own drawing and give way to the palette. A nucleus in an excited state (⁶⁰Co*)
is told by an outline or a mark, never a hue. A γ ray and an X-ray are not
visible light and are never painted in a spectral colour; on 21.31's spectrum
only the visible band is drawn in its real colours (fact), and the book's
pink and green ionizing panels are emphasis, drawn in ink. The red and blue
glows of the PET scans, the scans of 21.25 and the map of 21.22 stay in their
photographs. A stable nuclide and an unstable one on the n–Z chart are told by
fill (solid or hollow) or a hover name, never by the book's blue and green; the
band itself is a shaded region in ink.

## Referents

Each section lists its own when it is built. Planned:

- **21.1.** The text's nuclides on the chart or the curve (nitrogen-14,
  iron-56, lead-207, helium-4, fluorine-19) where one point each is drawn.
- **21.3.** The isotopes of Table 21.2 where one curve each is drawn on a
  half-life figure; the parent and daughter of a decay where both are named
  (uranium-238 and thorium-234); carbon-14 and carbon-12 if a ratio figure
  draws both.
- **21.4.** The two fission fragments of 21.14 (barium-141 and krypton-92)
  if the text names them beside a figure that draws them; the subcritical and
  critical spheres of 21.17.
- **21.5, 21.6.** None by default; 21.33's four radiations are kinds
  (`F.cat` with labels) or particles in their palette colours, and 21.37's
  sources are categories of one bar each, so `F.cat`.

The frame of a figure and its labels stay in ink, and with colour coding off
every figure stays legible from its labels.
