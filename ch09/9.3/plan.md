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

- sim-gas-density · Sim · gas-density, molar-mass-of-a-gas · variation by slider: the one straight line d = ℳP/RT on which every gas sits, its slope the moles in a liter, P/RT, which the single worked number of Example 9.11 cannot show · arrows: none · still, a graph answering its sliders · P (pressure, atm, 0.50 to 2.00, circle at 1 atm), T (temperature, K, 200 to 600, circle at 273 K), gas (a dropdown of six gases; all six are named beside their points, a kind of six being the limit of rule 26.7, and the chosen one also reads its density; argon was dropped because its label sat on carbon dioxide's) · headline states the moles in a liter at the live P and T, the slope every gas shares · graph alone, d (density hue, 0 to 15 g/L) against ℳ (mass hue, 0 to 130 g/mol) · 2D, a relation between quantities (rule 28.1)
  works: read off the image: no image; the molar masses are the book's periodic-table values (H₂ 2.016, CH₄ 16.04, N₂ 28.01, CO₂ 44.01, Cl₂ 70.90, CF₂Cl₂ 120.91 g/mol) and R is 0.08206 L atm mol⁻¹ K⁻¹ as in Example 9.11.
- fig-flask-procedure · Figure 9.19 · molar-mass-of-a-gas · kept photograph inside Example 9.13, the four photographs are the procedure the example lists · photo
- sim-dalton · Figure 9.20 · daltons-law-of-partial-pressures · flow by animation and variation by slider: three equal cylinders of gas A, gas B and gas C alone (the text's names; the book names no substances for this figure) and a fourth of the same size holding all three; each particle of the mixture is the twin of one in its own cylinder and moves exactly as it does there, so each gas visibly presses as if alone, and the four gauges and the stacked bar show the total as the sum · arrows: the arrow between the third and fourth cylinders is symbolic ("combined"), never animated; the particles themselves move · moving: the particles travel and strike the walls, since the pressure is those strikes; the figure runs continuously with the transport and no scrubber · P_A, P_B, P_C (pressure, kPa, 0 to 900 in steps of 50, opening on the image's 300, 600, 450; one particle drawn for each 25 kPa) · no headline: the gauges, the names under the cylinders and the readout say it · one stacked bar beneath on a fixed 0 to 3000 kPa scale, a segment per gas in its colour · 2D (rebuilt flat on 2026-11-14): the lesson is counts and sums, which turning the scene never added to, and the 3D scene's labels covered the cylinders (rules 28.1, 28.5)
  works: parts: four closed gas cylinders of one size standing in a row, each with a collar and a pressure gauge on its top that reads the gas inside it; an arrow from the three single-gas cylinders to the fourth · flow: nothing flows between cylinders; inside each, particles travel in straight lines and bounce off the walls; the fourth holds a copy of every particle of the other three · must hold: (1) the four cylinders are the same size; (2) each gas has one colour, the same on its particles in its own cylinder, on its particles in the mixture, on its name and on its segment of the bar; (3) the mixture shows all three colours, with exactly as many particles of each gas as that gas's own cylinder; (4) the number of particles tracks the pressure (one per 25 kPa: 12, 24, 18 and 54 on opening); (5) each gauge sits on the cylinder it reads and its needle and number agree; (6) the mixture's reading is the sum of the three, and the bar's three segments end at it · read off the image: 300 kPa, 600 kPa, 450 kPa on the three cylinders in that order, then an arrow labelled "Total pressure combined" and 1350 kPa on the fourth; blue, purple and yellow dots, all three colours in the fourth. The alt text gives the order 300, 450, "6000" and the caption 300, 450, 600; the image is the book. The image's dot counts (about 12, 18 and 25) do not track its pressures; the figure's do.
- sim-over-water · Figure 9.21 + 9.22 · gas-collected-over-water · variation by slider: the vapor pressure read off the curve at the water's temperature and taken from the barometer's reading, with the share of water molecules in the trapped gas growing as the water warms · arrows: one, the air pressing on the water in the pan, symbolic · still: the reading is taken once the gas is collected and the levels are made equal, so nothing in it has a clock; the bubbles are drawn in place · T (temperature, °C, 0 to 90, default 26; stopped at 90 °C so that the vapor pressure stays below every total the slider allows), P_T (pressure, torr, 700 to 800, default 750); the opening state is Example 9.16, argon over water at 26 °C and 750 torr, which the book collects "in a system like that shown in Figure 9.21". Oxygen (the example's Check Your Learning) was tried and dropped: red O₂ beside red-centred H₂O hid the one thing to see, water's growing share; argon's teal atoms keep the two apart · headline "At 26 °C water vapor is 3.4% of the gas trapped above the water" · graph beside a vertical scene: the apparatus on the left, the vapor pressure of water (pressure hue, 0 to 800 torr) against temperature (temperature hue, 0 to 100 °C) through the points of Table 9.2 with the book's 760 torr at 100 °C marked, and beside the graph on the same scale a bar of the total split into water vapor and argon · 2D: the book draws the apparatus as a flat section and the lesson is the two levels and the mixture above the water, which no turn adds to (rule 28.5)
  works: parts: an Erlenmeyer reaction flask holding the reacting liquid, closed by a stopper; a glass delivery tube that opens in the gas space above that liquid, passes up through the stopper, bends over, runs down into a pan of water, along under the water and turns up to end inside the mouth of the collection flask; the pan, open to the air; an inverted flask standing mouth-down in the pan, water in its lower part and the collected gas above · flow: gas bubbles up through the reacting liquid into the flask's headspace, is pushed along the tube, leaves its outlet as bubbles and rises through the water in the collection flask into the gas space at its top, where water evaporates into it · must hold: (1) the tube's inlet is in the headspace, below the stopper and above the liquid, never in the liquid and never ending at the stopper; (2) the tube passes through the stopper and is one unbroken tube to its outlet; (3) the outlet is under water and inside the mouth of the collection flask, so every bubble rises into it; (4) the mouth of the collection flask is below the water's surface; (5) the water stands at one level inside the collection flask and outside it (the book's caption makes this the condition for the trapped gas to be at the atmosphere's pressure); (6) the trapped gas is drawn as a mixture, 24 molecules of which water's share is P_H₂O/P_T (at least one); (7) the pressures add: the bar's two parts are P_H₂O from the curve and P_T − P_H₂O, and its top is the dashed total · read off the image: labels "Collection flask", "Collected gas", "Water", "Reaction producing gas"; a stoppered Erlenmeyer with bubbles in its liquid; the tube starting in the headspace; an inverted flask over the tube's upturned end. The image draws the water inside the collection flask higher than outside; the caption's equal levels are drawn instead. Figure 9.22: T from 0 to 100 °C, vapor pressure 0 to 800 torr, "(760) Vapor pressure at (100 °C)".
- sim-combining-volumes · Figure 9.23 · combining-volumes-of-gases, avogadro-law · variation by choice: three reactions of gases (the book's N₂ + 3H₂ → 2NH₃, 2NO + O₂ → 2NO₂ of the exercises, H₂ + Cl₂ → 2HCl), each drawn as one balloon per coefficient, one molecule to a balloon, so the volumes read off as the coefficients · arrows: the reaction arrow, symbolic · still · reaction (three, in a dropdown: the three equations as buttons wrapped onto a second row beside the slider, rule 26.1), V (volume, L, 0.25 to 3.00, default 1.00, the volume of one balloon) · no headline: a bracket under each substance's balloons carries its formula and its total volume, and the readout the ratio · none · 2D only (the 3D view was removed on 2026-11-14: a balloon holding one molecule shows nothing more when turned, rule 28.5)
  works: parts: one balloon for each unit of a coefficient, all the same size, each holding one molecule of its gas; plus signs and the reaction arrow between the groups · flow: none · must hold: (1) the balloons of one frame are all the same size; (2) the number of balloons of each substance is its coefficient; (3) the volume under each group is its coefficient times the volume of one balloon; (4) every molecule is drawn in the element palette with hydrogen visible on both themes · read off the image: a balloon of N₂, plus, three balloons of H₂, an arrow, two balloons of NH₃, one molecule in each; the same molecules below with "N₂ + 3H₂ ⟶ 2NH₃".
- fig-greenhouse · Figure 9.24 · kept as the book's drawing inside its note; a sketch whose arrows are symbolic radiation paths and no quantity the section teaches, so it stays a faithful copy · photo
- fig-co2-record · Figure 9.25 · kept as the book's graph inside its note; data of the past that no slider changes · photo
- fig-solomon · Figure 9.26 · kept, a Portrait of a Chemist · photo

Extra simulations: none beyond the gas-density Sim above, which carries the section's first result where the book prints no figure.

Unnumbered images: none.

## Tables

Table 9.2, Vapor Pressure of Ice and Water in Various Temperatures at Sea Level, in the text as `div.book-table` after the folded figure, its spanned title the caption and the book's three column pairs kept. The Key Equations table is not printed.

## Types bound

`pressure`, `temperature`, `mass`, `density` and `volume` (from the figures' draws). `amount` appears in the text's macros (n, n_A, n_Total) without a figure drawing it. The mole fraction X_A and R are ink. Every particle of a named substance is drawn in `F.el`; gas A, gas B and gas C of Figure 9.20 are no substance, so their particles, names and bar segments wear their referent colours.

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

## Derivations

- `density`, d = ℳP/RT · score 4, a printed block · built as drv-gas-density: the gas law solved for V, then put into d = m/V and the ratio m/n named ℳ. The block's displayed lines and connecting phrases are replaced; its opening sentences on the gas law and on density stay.
- `density`, after Example 9.11, ℳ = mRT/PV · score 3, a printed block · built as drv-gas-molar-mass: the gas law solved for n and put into ℳ = m/n, the two skipped lines inserted. Not folded into drv-gas-density: the book prints the two apart, with Example 9.11 and the gas-density Sim between them, so each stays where the book works it.
- Example 9.12, the molecular formula of cyclopropane · score 4 · not built: a worked example whose two lines are each a substitution into an earlier method (empirical formula, then ℳ = mRT/PV); judged a worked example.
- `dalton`, P_A = X_A P_Total · score 4 · not built: three moves.
- Example 9.19, the volume of hydrogen from gallium · score 3 · not built: a worked example, stoichiometry fed into the gas law in one chain.
