# Plan: 13.4 Equilibrium Calculations (m68801)

Written 2026-10-05 before the build and left for review, as `ch13/config.md` records (applied as proposed, without check-ins).

Two objectives, no numbered figure, four unnumbered ICE-table images, no numbered table, five worked examples (13.6 to 13.10) with six Check Your Learning items (two in Example 13.9), forty end-of-section items (Exercises 13.50 to 13.89), no glossary entry, no key equation.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `changes` | Relating changes in concentration (the section's own introduction, the ammonia change terms, Example 13.6) | introduces `ice-change-terms`; uses `stoichiometric-factor`, `relative-reaction-rates`, `concentration` |
| `calc-k` | Calculation of an equilibrium constant (the book's header; Example 13.7 with its two ICE tables) | introduces `k-from-ice-table`; uses `ice-change-terms`, `equilibrium-constant` |
| `missing` | Calculation of a missing equilibrium concentration (the book's header; Example 13.8) | introduces `missing-equilibrium-concentration`; uses `equilibrium-constant`, `write-reaction-quotient` |
| `initial` | Calculation of equilibrium concentrations from initial concentrations (the book's header; the four steps, Examples 13.9 and 13.10, the Sim) | introduces `equilibrium-from-initial-concentrations`, `small-x-approximation`; uses `predict-direction-q-versus-k`, `ice-change-terms`, `magnitude-of-k` |

## Figures

- sim-small-x · Sim · equilibrium-from-initial-concentrations, small-x-approximation · variation by slider: the book solves two decompositions of the form A ⇌ B + C from A alone, one by the quadratic formula (PCl₅, K_c = 0.0211, 1.00 M, Example 13.9) and one with 0.15 − x ≈ 0.15 (HCN, K_c = 4.9 × 10⁻¹⁰, 0.15 M, Example 13.10), and leaves the reader to judge when x is negligible. Both are one relation, K_c = x²/(c₀ − x), and the share that reacts, x/c₀, depends only on K_c/c₀; the graph is that one curve with both examples marked on it, the approximation's √(K_c/c₀) dashed beside it, and the stretch where x is under 5% of c₀ tinted, so the reader sees where each example sits and how far the approximation can be pushed · arrows: none · still: an equilibrium calculation has no clock, and the sliders are the lesson · choice reaction (PCl₅ ⇌ PCl₃ + Cl₂ · HCN ⇌ H⁺ + CN⁻, default HCN, the example the Sim sits in), which sets the two sliders to its example's numbers; slider K_c (`equilibrium-constant`, a logarithmic track from 10⁻¹⁰ to 1, value in scientific notation through `fmt`, a dashed circle at the example's K_c); slider initial concentration (`concentration`, 0.01 to 1.00 M, relabelled [PCl₅]ᵢ or [HCN]ᵢ, a dashed circle at the example's value) · topline “x is 0.0057% of [HCN]ᵢ, so 0.15 − x ≈ 0.15 is justified: it puts x 0.0029% too high.”, or under PCl₅ “x is 13.5% of [PCl₅]ᵢ, too much to neglect: 1.00 − x ≈ 1.00 puts x 7.5% too high.” (the wording turns at 5%) · the book's ICE table above with live numbers (values in `concentration`, symbols in ink), the graph below with a bar beside it on the same percent scale: the bar is all the A put in, its dark slice x (labelled with [B] = [C]), the pale rest the A left, a tick where the approximation puts x · 2D, a table and a graph (book rule) · graph: K_c/[A]ᵢ on a logarithmic axis 10⁻¹⁰ to 10² (exactly what the sliders reach), x as a percent of [A]ᵢ 0 to 100%, fixed; exact curve solid ink (x is untyped), approximation dashed muted, a legend top left; the 5% level dashed across graph and bar; filled dot the exact x, hollow dot the approximate x, hollow at the top edge with its percent written when it passes 100%; rings at the two examples named in place · readout two formulas on two lines: K_c = (x)(x)/(c₀ − x) with the live numbers (the book's step 4 check, written without units as the book writes K_c), and x ≈ √(K_c × c₀) = … M · draws `equilibrium-constant`, `concentration`; no conventions, no facts
  works: read off the text and its tables (no book image is redrawn; the ICE tables of Examples 13.9 and 13.10 were opened and have rows Initial concentration (M), Change (M), Equilibrium concentration (M) with 1.00, −x, 1.00 − x | 0, +x, x | 0, +x, x and the same with 0.15; the HCN image's first row label reads “Initial pressure (M)”, the book's slip, not copied): Example 13.9, K_c = 0.0211, 1.00 M, x = 0.135 M, [PCl₅] = 0.87 M (model 0.135 and 0.865, one more figure than the book keeps); Example 13.10, K_c = 4.9 × 10⁻¹⁰, 0.15 M, x = 8.6 × 10⁻⁶ M by either route (model 8.57 × 10⁻⁶; the book prints 8.56 × 10⁻⁶ for three figures, the root of its own quadratic is 8.573 × 10⁻⁶). The 5% limit is Section 14.3's (“less than 5% of the initial concentration”); 13.4 says only x ≪ 0.15. must hold: (1) on load the table reads 0.15, −8.57 × 10⁻⁶, 0.15 − x = 0.150 and the dot sits in the Example 13.10 ring inside the tinted stretch; (2) PCl₅ gives x = 0.135 M, [PCl₅] = 0.865 M, the dot in the Example 13.9 ring to the right of the 5% boundary, approximate x = 0.145 M, 7.5% too high; (3) the top of the bar's slice, the filled dot and the percent axis agree at every setting, and the hollow dot is never below the filled one; (4) the readout's first line returns the slider's K_c at every setting; (5) moving K_c and the concentration so that K_c/c₀ is unchanged leaves the dot where it is; (6) past K_c/c₀ = 1 the approximate x exceeds the concentration put in and is drawn at the top edge with its percent. Rebuilt 2026-11-16: the first build plotted Q_c against x on log–log axes, where on load the two crossings coincided and at PCl₅ they were a few pixels apart, so the graph never showed when the approximation holds; the new graph is the one curve both examples lie on, with the 5% stretch and both examples marked.

The four ICE tables of Examples 13.7, 13.9 and 13.10 (`ICETable1`, `ICETable2`, `ICETable3`, `ICETable30`) are tables, so they are written in the text as unnumbered `div.book-table`, each where the book prints it, read from the images (the alt texts of `ICETable1` and `ICETable30` misdescribe them); no image is copied. The exercise image `CNX_Chem_13_05_Butane_img.jpg` belongs to fs-idp307489856, which is left out, and is not copied.

Extra simulations: none. The change terms of Example 13.6 are a rule of stoichiometry the tables already show, and Example 13.8 is one substitution; a figure for either would repeat the text.

## Tables

The four ICE tables above, and none numbered. The change rows of Example 13.6, its Check Your Learning and Exercises 13.60 and 13.61 are the book's math arrays, kept as math.

## Types bound

`equilibrium-constant` (K_c, K_P and the given values; the Sim's slider, level and Q_c curve), `concentration` (the given and calculated concentrations, the ICE tables' numbers, the Sim's initial-concentration slider and vertical). x stays ink (chapter `COLOR.md`); `pressure` only as values in prose where an exercise prints atm; `temperature` as values in prose (2000 °C).

## Referents

None. The chapter `COLOR.md` plans the species of each ICE table as referents; no figure here draws a species apart from another (the Sim's table names them in ink and its bar splits A only into what reacted and what is left), so the tables stay in ink and nothing is marked.

## Exercises

Six Check Your Learning items inline: cyl1 (Example 13.6, host `ex-changes`, open), cyl2 (13.7, `ex-calc-k`, number), cyl3 (13.8, `ex-missing`, number), cyl4 (13.9, `ex-pcl5`, multi), cyl5 (13.9, `ex-pcl5-2` on the second Check Your Learning header, multi), cyl6 (13.10, `ex-hcn`, multi).

Forty end-of-section items, Exercises 13.50 to 13.89, ids e50 to e89: twenty keyed kept (e50, e52, e54, e56, e58, e60, e62, e64, e66, e68, e70, e72, e74, e76, e78, e79, e81, e84, e86, e88); four unkeyed conceptual kept with an AI-marked approach (e61 fs-idp155255936, e63 fs-idp76682304, e73 fs-idp359131456, e87 fs-idp222775760); sixteen unkeyed numerical left out and named in `exercise_notes` (fs-idp235853120, fs-idp220009680, fs-idp99340080, fs-idp95397216, fs-idp165909856, fs-idp120770528, fs-idp193760224, fs-idp277387888, fs-idp97213088, fs-idp145400352, fs-idp124881392, fs-idp307489856, fs-idp186517200, fs-idp301926064, fs-idp157265136, fs-idp303786512). Nothing moves between sections. Errata kept as printed: fs-idp151659712 writes NaSO₄ for Na₂SO₄; fs-idm19235840's key writes its pressures in square brackets. The key of fs-idp149802032 gives 1.90 atm for all three pressures; it is kept as printed and graded on those numbers.

## Left out

Objectives and summary go to the tables. Nothing of the narrative is left out; no Link to Learning, no boxed note.

## Wanted at chapter level

- variables `x_ice` → 13.4-changes
- `ch13/COLOR.md`: 13.4 plans the species of each ICE table as referents; the built page marks none, since no figure draws a species apart (see Referents)
- `ch13/exploration.md`: the key of fs-idp149802032 is listed as an erratum, but its 1.90 atm for all three pressures is what the data give (x = 1.90 atm from 3.80 atm of N₂O₃); the page names no erratum for it

Applied by the chapter pass (2026-10-05): `x_ice` anchored at 13.4-changes; `K_c` (13.4-calc-k) and `Q_conc` (13.4-initial) rows added, since the page writes `\kKc` and `\kQc`. `COLOR.md` now says 13.4 has no referents and the ICE tables stay in ink. `exploration.md` no longer lists the key of fs-idp149802032 as an erratum: 3.80 atm of N₂O₃ with K_P = 1.91 gives x = 1.90 atm, so all three pressures are 1.90 atm.

## Derivations

- Example 13.9, the equilibrium concentrations of PCl₅, PCl₃ and Cl₂ by the quadratic formula · score 1 · not built: a worked example of the section's ICE method
- Example 13.10, the small-x approximation for HCN · score 3 · not built: a worked example that teaches the section's own approximation, under the hidden bar
