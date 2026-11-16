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

- sim-solubility-ph · Sim · solubility-in-acid, dissolution-by-complex-formation, coupled-equilibrium-calculations · variation by slider: the book computes the solubility of Al(OH)₃ at one buffered pH (4.74, Example 15.15) and states the net K = 22 for its dissolution in base; here the reader drags the pH of a buffered solution and sees a sample of the solid dissolve at both ends of the scale, as Al³⁺ in acid and as Al(OH)₄⁻ in base, while the point runs along one curve of molar solubility, the sum of a line for each ion, so both couplings of the section are one picture · arrows: none · still: an equilibrium solubility at a set pH has no clock · slider pH (`concentration`, the `\kpH` variant, 3.50 to 12.50, step 0.01, default 4.74 from Example 15.15; detents at 4.74 "Example 15.15" and 5.86 "lowest") · topline "At pH 4.74, Al(OH)₃ dissolves to 1.2 × 10⁻⁴ M, nearly all of it as Al³⁺."; "… the least at any pH." at 5.86; "At pH 4.20, as much as 4.9 × 10⁻³ M of Al(OH)₃ can dissolve, nearly all of it as Al³⁺, so the whole sample does." once the solubility passes the sample · graph at the left, beaker beside it at the right · 2D (a graph and a beaker; turning shows nothing) · graph: pH on x, fixed 3 to 13; log concentration on y, fixed 10⁻¹⁰ to 1 M (the slider's ends give 0.61 M and 0.70 M, so the point never leaves the box); the two ion lines thin in `F.ref('al-ion')` and `F.ref('aluminate')`; the molar solubility, their sum, thick in `concentration`, with a point at the slider's pH and dashed drop lines to both axes; a hollow dot at the lowest point (pH 5.86, 2.1 × 10⁻⁷ M); a dashed ink level at 1.0 × 10⁻³ M, the whole sample · beaker: 1.0 × 10⁻³ mol of Al(OH)₃ in 1.00 L (the sample is this figure's, the book gives none; chosen so that Example 15.15's buffer dissolves a visible 12 percent of it), drawn as 20 marks of 5 × 10⁻⁵ mol each: white lumps settled on the bottom for the solid (`F.fact('#f4f4f2')`, the white of the precipitate, as 15.2 draws AgCl), dots in the solution for what has dissolved, in the referent colour of the ion that carries it; a key under it with the moles of each · labels: the three curve names and the level's, fixed; hover names the lines, the level, the lowest point, the moving point, the dots and the solid · readout, three formulas on three lines, the steps of Example 15.15 (b): [OH⁻] = 10^−pOH = 10^−(14.00 − pH); [Al³⁺] = K_sp/[OH⁻]³; [Al(OH)₄⁻] = K[OH⁻], each with its live numbers, substituted as the book writes them (no units inside the K expressions) · note: each unit of pH multiplies [OH⁻] by 10, dividing [Al³⁺] by 1000 and multiplying [Al(OH)₄⁻] by 10, the two slopes · draws `concentration`, `equilibrium-constant`; referents `al-ion`, `aluminate`; facts `#f4f4f2`; no conventions. Rebuilt 2026-11-16 (second pass): the graph stood alone on axes running to 10² M and 10⁻¹², so the V sat small and nothing showed a solid dissolving; the sample in the beaker, the marked lowest point and the tighter frame are new, and the readout is three whole formulas in place of one chain broken across two lines.
  works: parts: a beaker of buffered solution holding the sample (solid on the bottom, ions in the solution) · the graph's point and the beaker show the same pH · flow: none (still) · must hold: (1) the [Al³⁺] line falls 3 decades per pH unit and the [Al(OH)₄⁻] line rises 1; (2) the thick curve is their sum and lies on the higher line away from the crossing; (3) on load the point, the headline and the readout give the book's 1.2 × 10⁻⁴ M at pH 4.74 with [OH⁻] = 5.5 × 10⁻¹⁰ M; (4) the headline's solubility is the sum of the readout's two results; (5) the solid's marks plus the dissolved dots are always 20, the solid is gone exactly when the point is on or above the dashed level, and the moles in the key add to 1.0 × 10⁻³; (6) the dots wear the colour of the line the point rides on · read off the text (the Sim replaces no image): K_sp = 2 × 10⁻³², K_f = 1.1 × 10³³, net K = 22; Example 15.15 (b) pH 4.74, pOH 9.26, [OH⁻] = 5.5 × 10⁻¹⁰ M, molar solubility 1.2 × 10⁻⁴ M; its Check Your Learning (formate buffer, pH 3.75) gives 0.1 M, which the slider reaches. The book's pure-water value, 5 × 10⁻⁹ M from (K_sp/27)^¼, is not a point on this curve (it lets the dissolution set [OH⁻] and ignores the complex), so it is not marked.
- fig-aloh4 · the unnumbered image `CNX_Chem_15_02_AlOH4_img.jpg` · the book's image, kept, kind `figure`, eyebrow "Figure", with a one-line caption. It had been a two-view Figure (the Lewis structure redrawn flat, a turning tetrahedral ion behind a 2D/3D choice); reverted on 2026-11-14: the flat view was a restyled copy of the book's drawing, and the passage only names the complex ion as the product of Al(OH)₃ dissolving in base, so its shape in space is not the lesson here (root rule 24.9, a molecule viewer for a molecule merely named). Its referent mark in the caption went with it; `aluminate` stays for the Sim. Judged again 2026-11-16 and left as the book's image: a Lewis structure of an ion the passage only names, with nothing to vary or move, and the book's drawing is clear.
- fig-coral · Figure 15.7 (a)(b), photo, kept: the text points at it and the two reefs are the consequence the passage describes · one image, one row
- fig-apatite · Figure 15.8, photo, kept: the text points at it for hydroxyapatite
- fig-toothpaste · Figure 15.9, photo, kept inside the fluoride note: the note points at it; the bundle's alt is a placeholder, so the alt is written new
- fig-thiosulfate · unnumbered image `CNX_Chem_15_03_AgBr_img.jpg` (Example 15.16), kept as printed as a figure row with no number: a still Lewis equation of the complex the example forms, notation with nothing to vary or move

Extra simulations: none. A thiosulfate slider for Example 15.16 would show the same complex coupling the Sim already shows on its base side.

## Types bound

`concentration` ([OH⁻], [H₃O⁺], pH and pOH through their macros; the particular concentrations of the examples marked `data-type`), `equilibrium-constant` (K_sp, K_a1, K_a2, K_f, K and pK_a through `\kKsp`, `\kKaone`, `\kKatwo`, `\kKfform`, `\kK`, `\kpKa`, following the book's tables and the chapter's `COLOR.md`), `mass` (the grams of Example 15.16), `volume` (its 1.00 L). Specific ions ([Al³⁺], [Br⁻], [S₂O₃²⁻]) have no symbol rows and stay in ink. The kind in general stays ink.

## Referents

- `al-ion` · the aluminum ion, Al³⁺ · sim-solubility-ph
- `aluminate` · the complex ion Al(OH)₄⁻ · sim-solubility-ph

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

## Derivations

- Coral reefs and ocean acidification, K for CaCO₃ dissolving in acid (and Al(OH)₃ + OH⁻ with K = Ksp Kf) · score 4 · not built: three moves, under the hidden bar
- Example 15.15, the solubility of Al(OH)₃ in water and in an acetate buffer · score 7 · not built: a worked example of the section's own method of coupled equilibria, with numbers throughout
- Example 15.16, the mass of thiosulfate that dissolves AgBr · score 5 · not built: a worked example of the section's own method of coupled equilibria, with numbers throughout
