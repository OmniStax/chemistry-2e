# Plan: 15.3 Coupled Equilibria (m68814)

Written 2026-10-05 before the build and left for review, as `ch15/config.md` records (applied as proposed, without check-ins).

Two objectives, three numbered figures (15.7 CoralReef, 15.8 Apatite, 15.9 Toothpaste in the fluoride note), two unnumbered images (the Al(OH)₄⁻ Lewis structure, Example 15.16's thiosulfate equation), two worked examples (15.15, 15.16) with their Check Your Learning items, twenty-two end-of-section items (exercises 85 to 106), of which nine stay, five move out, eight unkeyed numerical ones are left out, and two come in from 15.2.

## Sub-concepts and spans

The book prints no headers in this section; the page takes its own.

| Span | Header | Concepts |
|---|---|---|
| `coupled` | Coupled equilibria (the opening paragraph) | reinforces `coupled-equilibrium`; uses `coupled-equilibria` |
| `reefs` | Coral reefs and ocean acidification (the CaCO₃ and carbonic acid equations, the net K = 180, Figure 15.7) | introduces `solubility-in-acid`; uses `solubility-product`, `acid-ionization-constant`, `coupled-equilibria` |
| `enamel` | Tooth enamel (hydroxyapatite, Figure 15.8, the phosphate and hydroxide equations, fluoride, the note with Figure 15.9) | reinforces `solubility-in-acid`; uses `polyprotic-acids` |
| `complex` | Solubility coupled with complex formation (Al(OH)₃ in base, the Al(OH)₄⁻ figure, the net K = 22, the Sim) | introduces `dissolution-by-complex-formation`; uses `complex-ion`, `formation-constant`, `coupled-equilibria` |
| `calculations` | Calculating solubilities in coupled systems (Examples 15.15 and 15.16 with their Check Your Learning items) | introduces `coupled-equilibrium-calculations`; uses `henderson-hasselbalch`, `molar-solubility-from-ksp`, `complex-ion-calculations`; reinforces `solubility-in-acid`, `dissolution-by-complex-formation` |

## Figures

- sim-solubility-ph · Sim · solubility-in-acid, dissolution-by-complex-formation, coupled-equilibrium-calculations · variation by slider: the book computes the solubility of Al(OH)₃ at two points (pure water and the pH 4.74 acetate buffer of Example 15.15) and states the net K = 22 for its dissolution in base; here the reader drags the pH of a buffered solution from 3 to 13 and watches one curve of molar solubility fall steeply out of acid, bottom out, and climb again in base, the sum of a line for Al³⁺ (the acid coupling, K_sp/[OH⁻]³) and a line for Al(OH)₄⁻ (the complex coupling, K[OH⁻]), so that both couplings of the section are one picture, which no single worked example shows · arrows: none · still: an equilibrium solubility at a set pH has no clock; the slider is the lesson · slider pH (`concentration`, the `\kpH` variant, 3.00 to 13.00, step 0.01, default 4.74 from Example 15.15, with a soft detent at 4.74 labelled acetate buffer) · topline "At pH 4.74, Al(OH)₃ dissolves to 1.2 × 10⁻⁴ M, nearly all of it as Al³⁺." with the live pH, solubility and share of the dominant ion · graph alone, the graph is the idea · 2D, a graph (book rule: graphs are flat) · graph: pH on x, fixed 2 to 14 (the slider's 3 to 13 with a unit of headroom each side); log concentration on y, fixed 10⁻¹² to 10² M: the solubility reaches 20 M at pH 3 and 2.2 M at pH 13 and falls to 2.4 × 10⁻⁷ M at its lowest, so nothing the slider reaches leaves the box, and the bottom decades keep both ion lines in view across most of the range; the two ion lines in `F.ref('al-ion')` and `F.ref('aluminate')`, clipped to the box; the molar solubility, their sum, in `concentration`, thick; a point on it at the slider's pH through `pinned()`, with dashed drop lines to both axes and its value written at the left axis · labels: the three curve names, fixed where each line runs alone ([Al³⁺] right of its lower arm near pH 6.6, [Al(OH)₄⁻] under its lower arm near pH 4.3, molar solubility above the curve's rising arm near pH 10.5), three in all and none on the moving point; hover names each line and the point with its value · readout [Al³⁺] + [Al(OH)₄⁻] = K_sp/[OH⁻]³ + K[OH⁻] with the live numbers, [OH⁻] from pOH = 14.00 − pH as Example 15.15 does, each term to two significant figures and the sum the sum of the two terms shown · note: each unit of pH multiplies [OH⁻] by 10, dividing [Al³⁺] by 1000 and multiplying [Al(OH)₄⁻] by 10, the fact the two lines' slopes make visible and that neither the headline nor the readout says · draws `concentration`, `equilibrium-constant`; referents `al-ion`, `aluminate`; no conventions, no facts
- fig-aloh4 · replaces the unnumbered image `CNX_Chem_15_02_AlOH4_img.jpg` (figure row, no number, eyebrow "Figure") · complex-ion, dissolution-by-complex-formation · standardisation and depth: a structure the text names, built both ways as the book's rules ask: the book's Lewis structure redrawn flat (default), and in 3D the four oxygen atoms at the corners of a tetrahedron round the aluminum atom, which the flat cross of the Lewis drawing hides · arrows: none · still: a structure has no clock · choice view (2D · 3D, default 2D, the stage mounted on the first switch) · no headline: the caption already says what each view shows · graph none · 3D physical (a coordination geometry): Al–O 1.77 Å, O–H 0.96 Å, Al–O–H 115°, atoms through `F.el`; no ground, so yaw is free and the idle spin is on; pitch bounded to ±1.2 rad so the view never turns over a pole; snap views front and above; without WebGL the flat drawing stays · labels: the ion's name under it in `F.ref('aluminate')` (one); the atoms by hover · readout the formation equation Al³⁺ + 4OH⁻ ⇌ Al(OH)₄⁻ with K_f = 1.1 × 10³³, as the section prints it · draws `equilibrium-constant`; conventions Al, O, H; referent `aluminate`
- fig-coral · Figure 15.7 (a)(b), photo, kept: the text points at it and the two reefs are the consequence the passage describes · one image, one row
- fig-apatite · Figure 15.8, photo, kept: the text points at it for hydroxyapatite
- fig-toothpaste · Figure 15.9, photo, kept inside the fluoride note: the note points at it; the bundle's alt is a placeholder, so the alt is written new
- fig-thiosulfate · unnumbered image `CNX_Chem_15_03_AgBr_img.jpg` (Example 15.16), kept as printed as a figure row with no number: a still Lewis equation of the complex the example forms, notation with nothing to vary or move

Extra simulations: none. A thiosulfate slider for Example 15.16 would show the same complex coupling the Sim already shows on its base side.

## Types bound

`concentration` ([OH⁻], [H₃O⁺], pH and pOH through their macros; the particular concentrations of the examples marked `data-type`), `equilibrium-constant` (K_sp, K_a1, K_a2, K_f, K and pK_a through `\kKsp`, `\kKaone`, `\kKatwo`, `\kKfform`, `\kK`, `\kpKa`, following the book's tables and the chapter's `COLOR.md`), `mass` (the grams of Example 15.16), `volume` (its 1.00 L). Specific ions ([Al³⁺], [Br⁻], [S₂O₃²⁻]) have no symbol rows and stay in ink. The kind in general stays ink.

## Referents

- `al-ion` · the aluminum ion, Al³⁺ · sim-solubility-ph
- `aluminate` · the complex ion Al(OH)₄⁻ · fig-aloh4, sim-solubility-ph

The `complex` block marks the prose that names the complex ion, and the Sim's caption marks both.

## Exercises

Inline: Check Your Learning of Example 15.15 (source fs-idm596544, host `ex-acid-buffer`, number 0.1 M, tol 0.3 since the key keeps one figure) and of Example 15.16 (source fs-idp14732576, host `ex-thiosulfate`, number 5.0 g NH₃).

End of section, eleven: 93 (fs-idp14750992, multi [OH⁻] and [Al³⁺]), 95 (fs-idp11209952, number 2.2 × 10⁻⁹ M), 97 (fs-idp510128, multi), 99 (fs-idm235264, pH 7.66), 103 (fs-idp12972608, open, the book's key), 105 (fs-idp12990000, open, the key as printed); unkeyed conceptual kept with an AI suggested approach: 102 (fs-idp12964976), 104 (fs-idp12981920), 106 (fs-idp12998992); moved in from 15.2 with `source_section` "15.2": 63 (fs-idm65484352) and 65 (fs-idm98555648), both unkeyed conceptual with a suggested approach. Moved out: 85 (fs-idm301808) and 101 (fs-idp11595856) to 15.1; 86 (fs-idm299312), 88 (fs-idp457072), 90 (fs-idp135248) to 15.2. Left out as unkeyed numerical: 87, 89, 91, 92, 94, 96, 98, 100 (fs-idp12915808, fs-idm356832, fs-idp103984, fs-idm455072, fs-idp11095024, fs-idp65312, fs-idm397184, fs-idp12821792).

## Errata carried as printed

The dissolution equation's CO₃^{−2}; Example 15.15's "solublities"; Example 15.16's Ag(S₂O₂)₂³⁻ once; the key of exercise 105 heading its third column [OH⁻] for [HPO₄²⁻]; the key of exercise 95 running its two equations together. Exercise 98's K_sp of CoS with a positive exponent is left out with the item.

## Left out

Objectives, summary and glossary go to the tables; the Link to Learning on ocean acidification is dropped and named in `notes`.

## Wanted at chapter level

- forms `eq-k-acid-coupled` → 15.3-reefs
- forms `eq-k-complex-coupled` → 15.3-complex
- variables `K` → 15.3-reefs
- variables `K_a2` → 15.3-reefs
- variables rows for 15.3, each reusing its earlier meaning: `K_sp` (15.1), `K_f_form` (15.2), `K_a1` (14.5), `pK_a` (14.6), `[OH-]`, `[H3O+]`, `pH`, `pOH` (14.1, 14.2), since the page's text and Sim write them through their macros
- `ch15/COLOR.md`: 15.3 builds `al-ion` and `aluminate` as planned; the two coupled reactions of a net equilibrium are not split into referents, since the page's K's are written once each in the book's equations
- `ch15/config.md`: 15.3 replaces the Al(OH)₄⁻ image with a two-view Figure and keeps Example 15.16's thiosulfate equation as a figure row with no number

Applied by the chapter pass (2026-10-05): all four anchors as asked; rows added for `K_sp` and `K_a1` at 15.3-reefs, `K_f_form` at 15.3-complex, and `pK_a`, `pH`, `pOH`, `[OH-]` at 15.3-calculations, each reusing its earlier meaning; `[H3O+]` gets no row, since the page never writes it through its macro. `ch15/COLOR.md` lists `al-ion` and `aluminate` and the unsplit coupled reactions; `ch15/config.md` records the two-view Al(OH)₄⁻ Figure and the thiosulfate equation kept as a figure row with no number.
