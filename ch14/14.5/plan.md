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

- sim-stepwise · Sim · polyprotic-acids, stepwise-ionization, stepwise-ionization-calculations, triprotic-acid · variation by slider and choice: the book works the stepwise calculation once, for 0.033 M carbonic acid, and states that each step is less extensive than the last; here the reader picks carbonic acid, hydrogen sulfide or phosphoric acid and moves the initial concentration over three powers of ten, and every species stands at its equilibrium concentration on one logarithmic axis, each step a long drop below the one before, the first anion level with [H₃O⁺] at every concentration and the second anion pinned at K_a2 wherever the slider goes, which a single worked example cannot show · arrows: symbolic (the short step arrows of the ionization chain written under the axis, each named by its constant) · still: equilibrium concentrations have no clock, and the slider and choice are the lesson · choice acid (H₂CO₃ · H₂S · H₃PO₄, the three the section ionizes, default H₂CO₃), which sets the slider to the acid's own value (0.033 M from Example 14.19, 0.1 M from its Check Your Learning, 0.10 M for phosphoric acid, for which the book gives none); slider initial concentration [H₂CO₃]₀ (`concentration`, a logarithmic track from 0.001 to 1.0 M, the value taken to two significant figures, relabelled [H₂S]₀ or [H₃PO₄]₀) · topline "HCO₃⁻ lies 280 times below H₂CO₃, and CO₃²⁻ 2.5 × 10⁶ times below HCO₃⁻." with the live ratios ("above" where dilute phosphoric acid leaves more H₂PO₄⁻ than H₃PO₄) · graph alone, the graph is the idea · 2D, a log ladder (book rule: graphs and ladders are flat) · graph: species columns along x (three, or four for phosphoric acid; column lines only, no x ticks), log concentration from 10⁻²¹ to 10³ M on y, fixed: the extremes the controls reach run from 1.0 M (H₂A at 1.0 M) down to 1.0 × 10⁻¹⁹ M (S²⁻), so nothing is pinned, and the decades above 1 M leave room for the value written over the top level; each species a short level in `F.cat(i)` at its concentration, the first step from the positive root of K_a1 = x²/(c₀ − x), each later one from K_a[previous]/[H₃O⁺]; [H₃O⁺] a dashed level in `concentration` across the columns, named at its right end with its value · labels: each level's value above it in `concentration` (three or four), the [H₃O⁺] level's name and value (one), five at most and none on a moving body; the species names and the step constants (K_a1, K_a2, K_a3 in `equilibrium-constant`) are the axis's frame under it; hover names each level with species and value · readout K_a1 = (x)(x)/(c₀ − x) with the live numbers (x to three significant figures, so the numbers shown give the K shown) · note the second step's result, [A²⁻] = K_a2[HA⁻]/[H₃O⁺] = K_a2 at every starting concentration, the fact the level pinned in place makes visible and that neither the headline nor the readout says · draws `concentration`, `equilibrium-constant`; no conventions, no facts
- fig-acetic · unnumbered image (`CNX_Chem_14_05_acetic_img.jpg`) · monoprotic-acid · kept as printed: its structural formulas show which of acetic acid's four hydrogen atoms is the one that ionizes, which the passage points at; a still drawing of notation, no variation or motion to add · figure row, no number
- Example 14.19's ICE table (`CNX_Chem_14_05_ICETable1_img.jpg`) · written as an HTML table in `div.book-table`, as Chapter 13 wrote its ICE tables; the image is not copied

Extra simulations: none. A distribution diagram of fractions against pH would teach more than the section does; the Sim keeps to the stepwise calculation the book teaches.

## Types bound

`concentration` (the initial concentrations and the equilibrium concentrations of the example and the Sim, [H₃O⁺] through `\kconcHyd`), `equilibrium-constant` (K_a1, K_a2, K_a3, K_b1, K_b2 through their macros). Following the chapter's `COLOR.md`, the kind in general stays ink and a particular concentration of the worked example wears the hue. The book's K with a species subscript (K for H₂CO₃ and for HCO₃⁻) has no symbol row and stays in ink as printed.

## Referents

None. The chapter's `COLOR.md` plans H₂A, HA⁻ and A²⁻ as referents; the Sim's choice swaps the acid, so its species are the steps of whichever acid is chosen rather than one example's things, and the text names each species by its formula. The Sim tells its levels apart with `F.cat` and names them under the axis.

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
