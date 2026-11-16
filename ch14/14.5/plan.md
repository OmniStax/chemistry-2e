# Plan: 14.5 Polyprotic Acids (m68807)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

One objective, no numbered figure, two unnumbered images (the acetic acid equation, Example 14.19's ICE table), one worked example (14.19) with its Check Your Learning, five end-of-section items (chapter exercises 72 to 76), and one item moved in from 14.3 (exercise 64).

## Sub-concepts and spans

The book prints no headers in this section; the page takes its own.

| Span | Header | Concepts |
|---|---|---|
| `monoprotic` | Monoprotic acids (the acetic acid image) | introduces `polyprotic-acids`, `monoprotic-acid`; uses `acid-ionization`, `write-ionization-equations` |
| `diprotic` | Diprotic acids and stepwise ionization | introduces `diprotic-acid`, `stepwise-ionization`; uses `acid-ionization-constant`; reinforces `polyprotic-acids` |
| `calculations` | Treating each step separately (Example 14.19 with its ICE table and Check Your Learning) | introduces `stepwise-ionization-calculations`; uses `weak-acid-base-equilibrium-concentrations`, `small-x-approximation` |
| `triprotic` | Triprotic acids (the Sim) | introduces `triprotic-acid`; reinforces `polyprotic-acids`, `stepwise-ionization`, `stepwise-ionization-calculations` |
| `bases` | Polyprotic bases | introduces `polyprotic-bases`, `diprotic-base`; uses `base-ionization-constant` |

## Figures

- sim-stepwise · Sim · polyprotic-acids, stepwise-ionization, stepwise-ionization-calculations, triprotic-acid · variation by slider and choice: the book works the stepwise calculation once, for 0.033 M carbonic acid, and states that each step is less extensive than the last; here each species of the chosen acid is drawn by its atoms, one hydrogen fewer at every step, and stands over its equilibrium concentration on one logarithmic axis, so each proton is seen to leave in turn and each step is a long drop below the one before; moving the initial concentration over three powers of ten moves every level but the second anion's, which stays at K_a2, which a single worked example cannot show · arrows: symbolic (the pair of half arrows between species, each named by its constant) · still: equilibrium concentrations have no clock, and the slider and choice are the lesson; a change of acid eases the columns and levels to their new places · choice acid (H₂CO₃ · H₂S · H₃PO₄, the three the section ionizes, default H₂CO₃), which sets the slider to the acid's own value (0.033 M from Example 14.19, 0.10 M from its Check Your Learning, 0.10 M for phosphoric acid, for which the book gives none); slider initial concentration [H₂CO₃]₀ (`concentration`, a logarithmic track from 0.0010 to 1.0 M, the value taken to two significant figures, relabelled [H₂S]₀ or [H₃PO₄]₀), the example's and the Check Your Learning's values marked on it · topline the share that gives up each proton, "1 in 280 H₂CO₃ molecules gives up its first proton, and 1 in 2.5 × 10⁶ HCO₃⁻ ions the second." (a percentage from 1% up: "24% of H₃PO₄ molecules give up their first proton, …") · molecules above, graph below · 2D: flat ball-and-stick drawings in the element palette (which hydrogen has gone is the point, not the shape in space) over a log ladder (book rule: graphs and ladders are flat) · graph: one column per species (three, or four for phosphoric acid), log concentration from 10⁻²⁰ to 10² M on y, fixed: the controls reach from just under 1.0 M down to 1.0 × 10⁻¹⁹ M (S²⁻), and the decades above 1 M leave room for the value written over the top level; each species a level across its column in `F.cat(i)` with a light fill beneath, the first step from the positive root of K_a1 = x²/(c₀ − x), each later one from K_a[previous]/[H₃O⁺]; [H₃O⁺] a dashed level in `concentration` across the columns, named with its value at its right end · labels: each level's value in `concentration` (three or four), the second anion's followed by "= K_a2", the formula of each species under its drawing in its level's colour, each step's constant with its value in `equilibrium-constant` and "− H⁺" at the half arrows; hover names each atom, each ring where a proton was, each level and the dashed line · readout one line per step, as Example 14.19 writes them: K_a1 = [H₃O⁺][HCO₃⁻]/[H₂CO₃] with the live numbers, then [CO₃²⁻] = K_a2[HCO₃⁻]/[H₃O⁺] with the equal numbers above and below the bar (and [PO₄³⁻] for phosphoric acid); x to four significant figures there, so the numbers written give the K written at every setting · no note · draws `concentration`, `equilibrium-constant`; conventions H, C, O, S, P; no facts
  works: parts (each species a flat ball-and-stick drawing: carbonic acid a carbon with one doubly bonded oxygen and two O–H; hydrogen sulfide a sulfur with two hydrogens; phosphoric acid a phosphorus with one doubly bonded oxygen and three O–H; each ionization removes one hydrogen and leaves a dashed ring in its place; under each drawing its formula, under that its level) · flow (none drawn moving; the half arrows are notation) · must hold (on load the levels read Example 14.19's 0.033 M, 1.2 × 10⁻⁴ M and 4.7 × 10⁻¹¹ M and [H₃O⁺] = 1.2 × 10⁻⁴ M; with H₂S at its mark they read the Check Your Learning's 0.10 M, 9.4 × 10⁻⁵ M and 1.0 × 10⁻¹⁹ M; the first anion's level lies on the dashed [H₃O⁺] at every setting; the second anion stays at K_a2 at every concentration; species i shows i rings and has i fewer hydrogens; every line of the readout is true with the numbers written; where dilute phosphoric acid leaves less H₃PO₄ than H₂PO₄⁻ the first level's value is written under it, clear of the dashed line; nothing leaves the frame) · read off the text (Example 14.19: 0.033 M H₂CO₃, K_a1 4.3 × 10⁻⁷, [H₃O⁺] = [HCO₃⁻] = 1.2 × 10⁻⁴ M, K_a2 4.7 × 10⁻¹¹, [CO₃²⁻] = 4.7 × 10⁻¹¹ M; its Check Your Learning: 0.1 M H₂S, K_a1 8.9 × 10⁻⁸, K_a2 1.0 × 10⁻¹⁹, answer 0.000094 M and 1 × 10⁻¹⁹ M; H₃PO₄ 7.5 × 10⁻³, 6.2 × 10⁻⁸, 4.2 × 10⁻¹³ from the section's equations; no image)
  Rebuilt 2026-11-16 (second pass): the first build was three short bars in a mostly empty log chart with the chain written as text under the axis, so nothing showed a proton leaving and the eye had no lesson to land on; its readout gave only the first step, and its three-figure x did not give the K written at about one setting in sixteen (0.0017 M H₂S gave 9.0 × 10⁻⁸ against 8.9 × 10⁻⁸). Now the species are drawn, the headline counts the share that ionizes at each step, the levels fill their columns and read to the book's two figures, and the readout writes every step.
- fig-acetic · unnumbered image (`CNX_Chem_14_05_acetic_img.jpg`) · monoprotic-acid · kept as printed: its structural formulas show which of acetic acid's four hydrogen atoms is the one that ionizes, which the passage points at; a still drawing of notation, no variation or motion to add · figure row, no number
- Example 14.19's ICE table (`CNX_Chem_14_05_ICETable1_img.jpg`) · written as an HTML table in `div.book-table`, as Chapter 13 wrote its ICE tables; the image is not copied

Extra simulations: none. A distribution diagram of fractions against pH would teach more than the section does; the Sim keeps to the stepwise calculation the book teaches.

## Types bound

`concentration` (the initial concentrations and the equilibrium concentrations of the example and the Sim, [H₃O⁺] through `\kconcHyd`), `equilibrium-constant` (K_a1, K_a2, K_a3, K_b1, K_b2 through their macros). Following the chapter's `COLOR.md`, the kind in general stays ink and a particular concentration of the worked example wears the hue. The book's K with a species subscript (K for H₂CO₃ and for HCO₃⁻) has no symbol row and stays in ink as printed.

## Referents

None. The chapter's `COLOR.md` plans H₂A, HA⁻ and A²⁻ as referents; the Sim's choice swaps the acid, so its species are the steps of whichever acid is chosen rather than one example's things, and the text names each species by its formula. The Sim tells its levels apart with `F.cat` and writes each formula in its level's colour under the drawing of the species.

## Exercises

One Check Your Learning inline after Example 14.19, host `ex-diprotic` (multi: [H₂S], [H₃O⁺] = [HS⁻], [S²⁻]; the one-figure [S²⁻] accepts 10%). End of section: exercise 72 (fs-idp94973072, keyed, open), 74 (fs-idm125378656, keyed, multi of four), 76 (fs-idp153083664, keyed, multi of (a) and (b), the key's (c) in the solution); 73 (fs-idp108710816) and 75 (fs-idp33679104) unkeyed numerical, left out and named. Exercise 64 (fs-idm75310368, nicotine, keyed, multi of five) moved in from 14.3 with `source_section` "14.3". Four items in all.

## Left out

Objectives, summary and glossary go to the tables. The example's summary line prints [H₃O⁺] = 1.2 × 10⁻⁴ without its unit; kept as printed.

## Wanted at chapter level

- variables `K_a1` → 14.5-diprotic
- variables `K_a2` → 14.5-diprotic
- variables `K_a3` → 14.5-triprotic
- variables `K_b1` → 14.5-bases
- variables `K_b2` → 14.5-bases
- `ch14/COLOR.md`: 14.5 plans H₂A, HA⁻ and A²⁻ as referents with K_a1 and K_a2 split; the built page marks none, since the Sim's acid is a choice (see Referents)
- `ch14/config.md`: 14.5 keeps the acetic acid equation image as a figure row with no number and writes Example 14.19's ICE table as a table

Applied by the chapter pass (2026-10-05): the five anchors as asked, and a 14.5 row `[H3O+]` added. `COLOR.md` and `config.md` say that 14.5 marks no referents, keeps the acetic acid equation as a `figure` row and writes Example 14.19's ICE table as a table. The exercise note on `fs-idm75310368` now matches 14.3's wording.

## Derivations

- Example 14.19, the species of a carbonic acid solution one ionization at a time · score 3 · not built: a worked example of the section's method, under the hidden bar
