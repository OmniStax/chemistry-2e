# Plan: 9.3 Stoichiometry of Gaseous Substances, Mixtures, and Reactions

Written 2026-09-28 before the build and left for review, as `ch09/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins"). Module m68752.

## Sub-concepts and spans

The book's five headers mark the divisions and the page follows them, with its opening paragraphs as a span of their own and the two boxed notes each a span.

| Span | Header | Concepts |
|---|---|---|
| `intro` | Gases and the question "how much?" | uses `ideal-gas-law` |
| `density` | Gas density and molar mass (Examples 9.11 to 9.13, Figure 9.19) | introduces `gas-density`, `molar-mass-of-a-gas` |
| `dalton` | The pressure of a mixture of gases: Dalton's law (Figure 9.20, Examples 9.14 and 9.15) | introduces `daltons-law-of-partial-pressures`, `mole-fraction-and-partial-pressure` |
| `over-water` | Collection of gases over water (Figures 9.21 + 9.22, Table 9.2, Example 9.16) | introduces `gas-collected-over-water` |
| `stoichiometry` | Chemical stoichiometry and gases | introduces `gas-stoichiometry` |
| `avogadro-revisited` | Avogadro's law revisited (Figure 9.23, Examples 9.17 to 9.19) | introduces `combining-volumes-of-gases`, reinforces `avogadro-law` |
| `greenhouse` | the note Greenhouse Gases and Climate Change (Figures 9.24, 9.25) | uses `daltons-law-of-partial-pressures` |
| `solomon` | the portrait of Susan Solomon (Figure 9.26) | none |

Example ids: `ex-density` (9.11), `ex-cyclopropane` (9.12), `ex-volatile` (9.13), `ex-mixture` (9.14), `ex-anesthesia` (9.15), `ex-over-water` (9.16), `ex-propane` (9.17), `ex-ammonia` (9.18), `ex-gallium` (9.19). Each Check Your Learning is inline after its example, host `data-place` on the example id.

## Figures

- sim-gas-density · Sim · gas-density, molar-mass-of-a-gas · variation by slider: the one straight line d = ℳP/RT on which every gas sits, its slope set by P and T, which the single worked number of Example 9.11 cannot show · still, a graph answering its sliders · P (pressure, atm, 0.50 to 2.00, circle at 1 atm), T (temperature, K, 200 to 600, circle at 273 K), gas (a dropdown of nine gases, the selected one marked and labelled; the rest named on hover) · headline states the chosen gas's density at the live P and T · graph alone, d (ink, 0 to 15 g/L, pinned beyond) against ℳ (mass hue, 0 to 130 g/mol) · 2D, a relation between quantities (rule 28.1)
- fig-flask-procedure · Figure 9.19 · molar-mass-of-a-gas · kept photograph inside Example 9.13, the four photographs are the procedure the example lists · photo
- sim-dalton · Figure 9.20 · daltons-law-of-partial-pressures, mole-fraction-and-partial-pressure · depth and flow: four equal glass cylinders, three holding hydrogen, helium and neon alone (the gases of Example 9.14, standing for the book's blue, purple and yellow circles) and the fourth holding all three, the particles travelling and striking the walls, each gas keeping its own count in the mixture; the strip beneath stacks the three partial pressures in `F.cat(0..2)` to the total and states each mole fraction · moving: the particles travel, as in 9.2's gas box, since the pressure is their strikes on the walls; the figure runs continuously with the transport and no scrubber · P_A, P_B, P_C (pressure, kPa, 0 to 900, defaults 300, 450, 600, the book's numbers; one molecule drawn for each 50 kPa) · headline "300 kPa of hydrogen, 450 kPa of helium and 600 kPa of neon in one cylinder of the same size press at 1350 kPa" · strip beneath · physical 3D, a particle picture (book rule), the cylinders stand on a bench so the pitch is held between 2° and 72° above level; spin off, since the particles already move; views front and above
- sim-over-water · Figure 9.21 + 9.22 · gas-collected-over-water · variation by slider: the vapor pressure read off the curve at the bath's temperature and subtracted from the barometer's reading, with the share of water molecules in the trapped gas growing as the water warms · still, the scene and the graph answer their sliders · T (temperature, °C, 0 to 90, default 26; stopped at 90 °C so that the vapor pressure stays below every total the slider allows), P_T (pressure, torr, 700 to 800, default 750) · headline "At 26 °C the trapped gas is 725 torr of argon and 25.2 torr of water vapor" · graph beside a vertical scene: the generator flask, the delivery tube, the pan and the inverted collection flask on the left, the vapor pressure of water (pressure hue, 0 to 800 torr) against temperature (temperature hue, 0 to 100 °C) on the right, drawn through the points of Table 9.2, with the book's 760 torr at 100 °C marked · 2D: the book draws the apparatus as a flat section and the lesson is the two levels and the mixture above the water, which no turn adds to; the flat graph must sit beside it at one scale (rule 28.5)
- sim-combining-volumes · Figure 9.23 · combining-volumes-of-gases, avogadro-law · variation by choice: three reactions of gases (the book's N₂ + 3H₂ → 2NH₃, 2NO + O₂ → 2NO₂ of the exercises, H₂ + Cl₂ → 2HCl), each drawn as one balloon per coefficient, one molecule to a balloon, so the volumes read off as the coefficients · still · reaction (a choice of three), V (volume, L, 0.25 to 3.00, default 1.00, the volume of one balloon) · headline "1.00 L of N₂ and 3.00 L of H₂ give 2.00 L of NH₃ at the same temperature and pressure" · none · 2D and 3D behind a view choice (book rule for a molecule inset in a flat figure), 2D the default, the 3D scene mounted on the first switch; hanging balloons have no ground, so the orbit is free
- fig-greenhouse · Figure 9.24 · kept as the book's drawing inside its note; a sketch whose arrows are symbolic radiation paths and no quantity the section teaches, so it stays a faithful copy · photo
- fig-co2-record · Figure 9.25 · kept as the book's graph inside its note; data of the past that no slider changes · photo
- fig-solomon · Figure 9.26 · kept, a Portrait of a Chemist · photo

Extra simulations: none beyond the gas-density Sim above, which carries the section's first result where the book prints no figure.

Unnumbered images: none.

## Tables

Table 9.2, Vapor Pressure of Ice and Water in Various Temperatures at Sea Level, in the text as `div.book-table` after the folded figure, its spanned title the caption and the book's three column pairs kept. The Key Equations table is not printed.

## Types bound

`pressure`, `temperature`, `mass` and `volume` (from the figures' draws). `amount` appears in the text's macros (n, n_A, n_Total) without a figure drawing it. Density d, the mole fraction X_A and R are ink. Every particle is drawn in `F.el`; the three gases of a mixture on a strip are told apart by `F.cat(i)`.

## Exercises

9 Check Your Learning inline (all keyed). End of section: 33 items, 16 keyed and set with the key, 2 unkeyed conceptual kept with an AI approach (fs-idp50300640, fs-idp39361600), 15 unkeyed numerical left out and named in `exercise_notes` (fs-idp231956592, fs-idp20795744, fs-idm10841488, fs-idp106657088, fs-idp19919472, fs-idp100299232, fs-idp38931136, fs-idp46179152, fs-idp152416544, fs-idp228232112, fs-idp88428400, fs-idp68901248, fs-idp86448160, fs-idp55931680, fs-idp224745536). Keyed outline items ((a) outline, (b) number) check the number of (b) and give the whole key as the solution.

## Left out

The Link to Learning on greenhouse gases; the Solomon video sentence inside the portrait; the footnote citing the source of Lagrange's quotation.

## Wanted at chapter level

- eq-gas-density → 9.3-density
- eq-gas-molar-mass → 9.3-density
- eq-dalton → 9.3-dalton
- eq-partial-pressure → 9.3-dalton
- eq-mole-fraction → 9.3-dalton
- variable d → 9.3-density
- variable MM → 9.3-density
- variable m → 9.3-density
- variable P_total → 9.3-dalton
- variable P_A → 9.3-dalton
- variable P_B → 9.3-dalton
- variable P_C → 9.3-dalton
- variable X_A → 9.3-dalton
- variable n_A → 9.3-dalton
- variable n_total → 9.3-dalton

### Applied by the chapter pass

Every item above was applied on 2026-09-28: the five equations and the ten variable rows carry the anchors listed. The page binds `pressure`, `volume`, `temperature` and `mass`, as its figures draw them; `amount` is not bound, since no figure draws a count of moles, and `ch09/COLOR.md` now says so. The unit test that a folded figure carries an original for each figure it folds still failed on `sim-over-water`: the text named only the Figure 9.21 image, while the row carried both. Its `data-original` now names `CNX_Chem_09_03_WaterVapor2.jpg` as well, and the test passes.
