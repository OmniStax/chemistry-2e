# Plan: 15.2 Lewis Acids and Bases (m68813)

Written 2026-10-05 before the build and left for review, as `ch15/config.md` records (applied as proposed, without check-ins).

Three objectives, no numbered figure, seven unnumbered images (five Lewis equations, the Cu(CN)₂⁻ structure, Example 15.14's ICE table), one worked example (15.14) with its Check Your Learning, twenty-four end-of-section items (chapter exercises 61 to 84), three moved out and three moved in.

## Sub-concepts and spans

The book prints no headers in this section; the page takes its own.

| Span | Header | Concepts |
|---|---|---|
| `lewis-definition` | The Lewis definition (the hydronium and ammonium image) | introduces `coordinate-covalent-bond`, `lewis-acids-and-bases`, `lewis-acid`, `lewis-base`, `lewis-acid-base-adduct`; uses `bronsted-lowry-acids-bases`, `lewis-structure` |
| `other-acids` | Lewis acids other than H⁺ (BF₃, Ag⁺, SO₃ and the two displacements) | reinforces `lewis-acid`, `lewis-base`, `lewis-acid-base-adduct`; uses `octet-rule-exceptions` |
| `complex-ions` | Complex ions and formation constants (the Cu(CN)₂⁻ structure) | introduces `complex-ions-and-ligands`, `complex-ion`, `ligand`, `formation-constant`, `dissociation-constant`; uses `equilibrium-constant`, `coupled-equilibria` |
| `dissolution` | Dissolving a precipitate by forming a complex ion (the Sim, Example 15.14 with its ICE table and Check Your Learning) | introduces `complex-ion-calculations`; uses `solubility-product`, `qsp-versus-ksp`, `small-x-approximation`; reinforces `formation-constant` |

## Figures

- fig-hydronium, fig-bf3, fig-silver-ammonia, fig-oxide, fig-displace, fig-cucn2 · the six unnumbered Lewis-equation and structure images (`CNX_Chem_15_03_hydronium_img.jpg`, `CNX_Chem_15_02_BF3-LA_img.jpg`, `CNX_Chem_15_02_NH3-LBase_img.jpg`, `CNX_Chem_15_02_NonmetalOx_img.jpg`, `CNX_Chem_15_02_Displace_img.jpg`, `CNX_Chem_15_02_CuCN2-_img.jpg`) · the book's images, kept, kind `figure`, eyebrow "Figure", each with a short caption naming the reaction. They had been redrawn as still copies with the Lewis base, the Lewis acid and the displacing species in referent colours; reverted on 2026-11-14 because a restyled still with no control shows nothing the book's drawing does not (root rule 25): the book's lettering and lone pairs are larger and plainer than the redraws', the colours mostly repeated what the role labels under each species already say, and the displacement redraw's colouring of carbonate's oxygens was a guess the book does not make. The referents `base`, `acid` and `displacer`, which existed only for these redraws, are dropped with their text marks (the words stay). The alt of the displacement image keeps the book's text except "4 FC atoms", corrected to "2 C atoms" as the image shows.
- sim-agcl-ammonia · Sim · formation-constant, qsp-versus-ksp, complex-ion-calculations · variation by slider: the text says in words that ammonia lowers [Ag⁺] through the complex, that Q falls below K_sp so more AgCl dissolves, and that enough ammonia dissolves all of it; here the reader adds ammonia and sees the dissolved chloride climb by three powers of ten while free silver ion falls, their product held at K_sp, until the solid in the beaker is gone and the readout turns into the book's Q < K_sp · arrows: none · still: the equilibrium state for each ammonia concentration has no clock · sliders NH₃ added (`concentration`, 0 to 1.00 M, step 0.005, default 0.10 M, so the effect is on screen at once (at 0 the reader sees the book's [Ag⁺] = 1.3 × 10⁻⁵ M in water); a dashed circle where the last of the solid dissolves, computed from the other slider, landing on it morphs the readout's K_sp into Q) and AgCl(s) in 1.00 L (`amount`, 0.001 to 0.040 mol, default 0.010; the book gives no amount) · topline "In 0.50 M ammonia, 2.4 × 10⁻² mol of silver chloride dissolves per liter, 1900 times as much as in pure water." with the live numbers; "In pure water, 1.3 × 10⁻⁵ mol …" at no ammonia; "All 0.010 mol of the silver chloride has dissolved." past the circle · beaker beside the graph (a vertical scene): solid AgCl as a mound whose area is the undissolved amount, white as the fact (`F.fact('#f4f4f2')`, ink outline); graph [Cl⁻] and [Ag⁺] against ammonia added, 0 to 1.0 M on x, 10⁻¹² to 1 M on a logarithmic y, fixed: the extremes are [Cl⁻] = 0.040 M and [Ag⁺] = 1.5 × 10⁻¹⁰ M at the slider maxima, nothing pinned; two curves in `F.cat(0)`, `F.cat(1)` labelled at their right ends, a dot on each at the slider; axis titles in `concentration` · labels: two curve names and "AgCl(s)" beside the beaker (three), none on a moving body; hover names the dots and the solid · readout K_sp = [Ag⁺][Cl⁻] = (a)(s) = 1.6 × 10⁻¹⁰ with the concentrations to three figures so the product rounds to K_sp; past the circle Q = [Ag⁺][Cl⁻] = (a)(s) = q < K_sp, the book's relation · note the share of the dissolved silver held as Ag(NH₃)₂⁺, the gap between the two curves that the headline and readout do not state (the book's "most of the free silver ions … combine with NH₃") · 2D · draws `concentration`, `amount`, `equilibrium-constant`; facts `#f4f4f2` Fixed 2026-11-14: the beaker was an open box of four lines and is now a beaker (rounded foot, flared rim, spout) holding its solution; the Sim opens at 0.10 M ammonia, where 4.7 × 10⁻³ mol dissolves, 370 times as much as in water, rather than on an unchanged state; the headline is a topline; the caption is cut to what to drag and watch.
  works: read off the text (the Sim replaces no image): [Ag⁺] = 1.3 × 10⁻⁵ M in water; K_f = 1.7 × 10⁷; K_sp = 1.6 × 10⁻¹⁰ (Appendix J) · must hold: (1) while solid remains, [Ag⁺][Cl⁻] = K_sp to the readout's figures; (2) at no ammonia [Cl⁻] = [Ag⁺] = 1.3 × 10⁻⁵ M; (3) the dashed circle sits where N = 2n + √((n − a)/(K_f a)), 0.21 M for 0.010 mol, and the solid is gone at and past it; (4) past it the readout is Q < K_sp and [Cl⁻] is flat at n; (5) the solid's area shrinks as it dissolves and is never drawn after it is gone
- Example 15.14's ICE table (`CNX_Chem_15_02_ICETable1_img.jpg`) · written as an HTML table in `div.book-table`, as Chapters 13 and 14 wrote theirs; the image is not copied

The model behind the Sim, K_sp = 1.6 × 10⁻¹⁰ (Appendix J, as 15.1 uses it) and K_f = 1.7 × 10⁷ (the text): saturated, a = K_sp/s, the complex c = s − a, free ammonia f = N − 2c, and N = 2c + √(c/(K_f a)) gives N for each s, solved for s by bisection; unsaturated, s = n and a solved from c = K_f a f². The circle is N at s = n, explicit.

Extra simulations: none. A view of Ag(NH₃)₂⁺ or Cu(CN)₂⁻ in 3D adds nothing to a linear ion.

## Types bound

`concentration` (the [Ag⁺] of a saturated solution in the text, the ICE values of Example 15.14 as particular concentrations, the Sim's axes and values), `equilibrium-constant` (K_f through `\kKfform`, K_d through `\kKd`, K_sp through `\kKsp`, the book's Q through `\kQrxn`), `amount` (the Sim's solid). Specific ion concentrations ([Ag⁺], [NH₃], [Cu⁺]) have no rows and stay ink, as the chapter notes say; x stays ink.

## Referents

None since 2026-11-14. The first build had `base`, `acid` and `displacer` for its six Lewis redraws; they went with the redraws. The Sim tells its two curves apart with `F.cat`.

## Exercises

One Check Your Learning inline after Example 15.14, host `ex-complex` (number, 2.9 × 10⁻²² M, tolerance 5%).

End of section, 17 items: 64 (fs-idm55438304, number), 66 (fs-idm72577424, number, one figure, 10%), 68 (fs-idp18623376, multi of two, the key's ICE table image in the solution), 70 (fs-idm47233344, multi of two), 72 (fs-idm73346208, number), 74 (fs-idm77437136, number), 76 (fs-idm105219776, open, the key's five Lewis-equation images), 78 (fs-idp26968080, open, four images), 80 (fs-idm44455728, number), 82 (fs-idm47551360, open), 84 (fs-idm16601024, open); 75 (fs-idp28555376), 77 (fs-idp56004352), 83 (fs-idp127234208) unkeyed conceptual, kept with an AI-marked suggested approach; 86 (fs-idm299312), 88 (fs-idp457072), 90 (fs-idp135248) moved in from 15.3 with `source_section` "15.3".

Left out as unkeyed numerical: 61 fs-idm212489824, 67 fs-idm50986272, 69 fs-idm19606400, 71 fs-idp18044656, 73 fs-idm65404096, 79 fs-idp26835744, 81 fs-idm23888576. Moved out: 62 fs-idp46388832 to 15.1; 63 fs-idm65484352 and 65 fs-idm98555648 to 15.3.

## Left out and kept as printed

Objectives, summary and glossary go to the tables. Kept as printed: exercise 64's "0.100 NH₃(aq)" without its M, exercise 72's "potassium cyanide ion", the key of exercise 82 writing BF₄ without its charge, and the example's [Ag(NH₃)₂⁺] = 0.099 without a unit.

## Wanted at chapter level

- variables `K_f_form` → 15.2-complex-ions
- variables `K_d` → 15.2-complex-ions
- forms `eq-kf` → 15.2-complex-ions
- forms `eq-kd` → 15.2-complex-ions
- variables rows for 15.2 of `K_sp` (concept `solubility-product`) and `Q_c` (concept `reaction-quotient`, the book's plain Q), both written here through their macros in the text and the Sim
- `ch15/COLOR.md`: 15.2's referents are the Lewis base, the Lewis acid and the displacing species of the redrawn Lewis equations, not the metal ion, ligand and complex it planned (see Referents)
- `ch15/config.md`: 15.2 redraws the five Lewis equations and the Cu(CN)₂⁻ structure as figure rows with no number, builds no 3D complex ion (the ions it draws are linear), and writes Example 15.14's ICE table as a table

Applied by the chapter pass (2026-10-05): all four anchors as asked; rows added for `K_sp` (concept `solubility-product`) and `Q_c` (concept `reaction-quotient`) at 15.2-dissolution. `ch15/COLOR.md` lists `base`, `acid` and `displacer` as built; `ch15/config.md` records the six unnumbered figure rows, no 3D complex ion and the ICE table written as a table. The alt of exercise 76's key image (d) now spells "labeled".
