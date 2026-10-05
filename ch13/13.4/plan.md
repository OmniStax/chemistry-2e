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

- sim-small-x · Sim · equilibrium-from-initial-concentrations, small-x-approximation · variation by slider: the book solves two decompositions of the form A ⇌ B + C, one by the quadratic formula (PCl₅, K_c = 0.0211, 1.00 M) and one with the approximation c₀ − x ≈ c₀ (HCN, K_c = 4.9 × 10⁻¹⁰, 0.15 M), and asks the reader to judge when x is negligible; here both are one relation, K_c = x²/(c₀ − x), and the reader moves K_c and the initial concentration and watches the exact x and the approximate x = √(K_c c₀) separate or coincide, the ICE table above filling with the live numbers, so the judgment “x ≪ c₀” is seen rather than imagined · arrows: none · still: an equilibrium calculation has no clock, and the sliders are the lesson · choice reaction (PCl₅ ⇌ PCl₃ + Cl₂ · HCN ⇌ H⁺ + CN⁻, default HCN, the example the Sim sits in), which sets the two sliders to its example's numbers; slider K_c (`equilibrium-constant`, a logarithmic track from 10⁻¹⁰ to 10, value box in scientific notation); slider initial concentration [A]ᵢ (`concentration`, 0.01 to 2.00 M, relabelled [PCl₅]ᵢ or [HCN]ᵢ) · topline “x is 0.0057% of [HCN]ᵢ, and the approximation 0.15 − x ≈ 0.15 puts x 0.0029% too high.” with the live numbers · graph below the ICE table, the graph is the idea · 2D, a graph and a table (book rule) · graph: log–log, x from 10⁻⁸ to 10 M (ink, x is untyped), Q_c from 10⁻¹² to 10² (`equilibrium-constant`), fixed; every state the sliders reach lies inside, so nothing is pinned. Q_c of the mixture after a change x, x²/(c₀ − x), solid in `equilibrium-constant`, rising to the dashed vertical at x = c₀ (`concentration`, labelled [HCN]ᵢ) which x can never reach; the approximation x²/c₀ dashed muted ink, one straight line; the K_c level dashed in `equilibrium-constant`; the exact crossing a filled ink dot, the approximate crossing a hollow one, each with a drop line; labels: the two curves and the vertical named once at their upper ends, the K_c level at its left end (four labels, none on a moving body), the two crossings by hover · ICE table: the book's three rows (Initial, Change, Equilibrium, in M) and three species, its cells live: c₀, 0, 0; −x, +x, +x with the value; c₀ − x, x, x with the value, numbers in `concentration`; the species written in ink, the reaction arrow and plus between the headers as the book's tables draw them · readout K_c = (x)(x)/(c₀ − x) = (8.57 × 10⁻⁶)(8.57 × 10⁻⁶)/(0.15 − 8.57 × 10⁻⁶) = 4.90 × 10⁻¹⁰, x the positive root of the book's quadratic, numbers highlighted as they change · note “If x ≪ 0.15, then x ≈ √(K_c × 0.15) = 8.57 × 10⁻⁶ M.”, the approximate root the hollow dot marks, which neither the headline nor the readout gives · draws `equilibrium-constant`, `concentration`; no conventions, no facts

The four ICE tables of Examples 13.7, 13.9 and 13.10 (`ICETable1`, `ICETable2`, `ICETable3`, `ICETable30`) are tables, so they are written in the text as unnumbered `div.book-table`, each where the book prints it, read from the images (the alt texts of `ICETable1` and `ICETable30` misdescribe them); no image is copied. The exercise image `CNX_Chem_13_05_Butane_img.jpg` belongs to fs-idp307489856, which is left out, and is not copied.

Extra simulations: none. The change terms of Example 13.6 are a rule of stoichiometry the tables already show, and Example 13.8 is one substitution; a figure for either would repeat the text.

## Tables

The four ICE tables above, and none numbered. The change rows of Example 13.6, its Check Your Learning and Exercises 13.60 and 13.61 are the book's math arrays, kept as math.

## Types bound

`equilibrium-constant` (K_c, K_P and the given values; the Sim's slider, level and Q_c curve), `concentration` (the given and calculated concentrations, the ICE tables' numbers, the Sim's initial-concentration slider and vertical). x stays ink (chapter `COLOR.md`); `pressure` only as values in prose where an exercise prints atm; `temperature` as values in prose (2000 °C).

## Referents

None. The chapter `COLOR.md` plans the species of each ICE table as referents; no figure here draws a species apart from another (the Sim's table names them in ink and plots x only), so the tables stay in ink and nothing is marked.

## Exercises

Six Check Your Learning items inline: cyl1 (Example 13.6, host `ex-changes`, open), cyl2 (13.7, `ex-calc-k`, number), cyl3 (13.8, `ex-missing`, number), cyl4 (13.9, `ex-pcl5`, multi), cyl5 (13.9, `ex-pcl5-2` on the second Check Your Learning header, multi), cyl6 (13.10, `ex-hcn`, multi).

Forty end-of-section items, Exercises 13.50 to 13.89, ids e50 to e89: twenty keyed kept (e50, e52, e54, e56, e58, e60, e62, e64, e66, e68, e70, e72, e74, e76, e78, e79, e81, e84, e86, e88); four unkeyed conceptual kept with an AI-marked approach (e61 fs-idp155255936, e63 fs-idp76682304, e73 fs-idp359131456, e87 fs-idp222775760); sixteen unkeyed numerical left out and named in `exercise_notes` (fs-idp235853120, fs-idp220009680, fs-idp99340080, fs-idp95397216, fs-idp165909856, fs-idp120770528, fs-idp193760224, fs-idp277387888, fs-idp97213088, fs-idp145400352, fs-idp124881392, fs-idp307489856, fs-idp186517200, fs-idp301926064, fs-idp157265136, fs-idp303786512). Nothing moves between sections. Errata kept as printed: fs-idp151659712 writes NaSO₄ for Na₂SO₄; fs-idm19235840's key writes its pressures in square brackets. The key of fs-idp149802032 gives 1.90 atm for all three pressures; it is kept as printed and graded on those numbers.

## Left out

Objectives and summary go to the tables. Nothing of the narrative is left out; no Link to Learning, no boxed note.

## Wanted at chapter level

- variables `x_ice` → 13.4-changes
- `ch13/COLOR.md`: 13.4 plans the species of each ICE table as referents; the built page marks none, since no figure draws a species apart (see Referents)
- `ch13/exploration.md`: the key of fs-idp149802032 is listed as an erratum, but its 1.90 atm for all three pressures is what the data give (x = 1.90 atm from 3.80 atm of N₂O₃); the page names no erratum for it
