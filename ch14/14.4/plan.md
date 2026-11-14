# Plan: 14.4 Hydrolysis of Salts (m68806)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, without check-ins).

Three objectives, one numbered figure (14.13), two unnumbered ICE-table images, four worked examples (14.15 to 14.18) with a Check Your Learning each, no table, no boxed note, no Link to Learning, no glossary term, three end-of-section items (chapter exercises 69 to 71) and three moved in from 14.3.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `acidic-ions` | Salts with acidic ions (the book's header; Example 14.15) | introduces `salt-ion-acidity`, `salt-solution-calculations`; uses `conjugate-pair-strengths`, `dissociation-of-ionic-compounds`, `acid-ionization-constant`, `base-ionization-constant`, `weak-acid-base-equilibrium-concentrations`, `ph` |
| `basic-ions` | Salts with basic ions (the book's header; Example 14.16) | uses `salt-ion-acidity`, `salt-solution-calculations`, `base-ionization-constant` |
| `both-ions` | Salts with acidic and basic ions (the book's header; Example 14.17, the salt Sim) | introduces `predict-salt-solution-ph`; uses `salt-ion-acidity`, `amphiprotic-species`, `acid-ionization-constant`, `base-ionization-constant` |
| `metal-ions` | The ionization of hydrated metal ions (the book's header; Figure 14.13, Example 14.18) | introduces `hydrated-metal-ion-acidity`; uses `bond-polarity`, `salt-solution-calculations`, `acid-ionization-constant`, `ph` |

Example ids: `ex-anilinium` (14.15), `ex-acetate` (14.16), `ex-salt-nature` (14.17), `ex-aluminum` (14.18); each hosts its Check Your Learning.

## Figures

- sim-salt-ions · Sim · salt-ion-acidity, predict-salt-solution-ph · standardisation and variation by choice: the text compares K_a and K_b as numbers ten orders of magnitude apart; here both constants of a salt's ions stand as bars on one logarithmic K axis, so the longer bar decides acidic or basic at a glance, and an inert ion has no bar at all · arrows: none · still, a salt has no clock; the bars bend from one salt's lengths to the next on the choice · one dropdown, salt, the seven salts of the section's text and Example 14.17 (NH₄Cl, [C₆H₅NH₃]Cl, NaCH₃CO₂, KBr, NaHCO₃, Na₂HPO₄, NH₄F; default NH₄F, the one salt whose two ions both react), every constant printed in the section; the Check Your Learning salts left out · headline "In NH₄F, $K_a$ of NH₄⁺ is larger than $K_b$ of F⁻, so the solution is acidic." · no graph beyond the scene: the dissolution equation at the top with the inert ions named under it, two bars (acid ionization, base ionization) on a shared axis 10⁻¹⁴ to 10⁻² (fixed; the largest constant drawn is 2.3 × 10⁻⁵, whose label needs the room to its right, and the smallest 4.2 × 10⁻¹³), each labelled with its ion and value · 2D, a relation between quantities · bars in `equilibrium-constant`; row names and ions in ink · readout K_a(cation or ion) relation K_b(anion or ion) with the book's numbers, "≈ 0" for an inert ion, true in every state; no note
  works: read off the text (NH₄⁺ K_a 5.6 × 10⁻¹⁰ and F⁻ K_b 1.6 × 10⁻¹¹, Example 14.17 d; anilinium K_a 2.3 × 10⁻⁵, Example 14.15; acetate K_b 5.6 × 10⁻¹⁰, Example 14.16; HCO₃⁻ K_a 4.7 × 10⁻¹¹ and K_b 2.3 × 10⁻⁸, HPO₄²⁻ K_a 4.2 × 10⁻¹³ and K_b 1.6 × 10⁻⁷, Example 14.17 b, c) · must hold (each bar ends at its constant on the log axis; an inert ion has no bar and "≈ 0"; the headline's verdict (acidic, basic, neutral) agrees with the longer bar and with the book's answer for every salt; the readout's inequality sign is true)
  Kept 2026-11-14: every value and verdict matches the section; only the four-sentence caption was cut to two.
- fig-hydrated-al · Figure 14.13 · **the book's image, kept** (a `photo` row with its number, the book's alt text and caption). Reverted 2026-11-14: the 3D scene showed one side of the equilibrium at a time behind a choice, so the reactant and product complexes the book sets side by side could no longer be compared; turning the octahedron teaches a geometry this passage does not discuss (its subject is the acidity of the aquo ion); and it carried front and above view buttons, a two-line headline and labels on panels over the atoms.
- fig-ice-anilinium · unnumbered image (`CNX_Chem_14_04_steps1_img.jpg`) · Example 14.15's ICE table, written as an HTML `div.book-table` from the image's description; no figure row
- fig-ice-aluminum · unnumbered image (`CNX_Chem_14_04_ICETable13_img.jpg`) · Example 14.18's ICE table, written as an HTML `div.book-table`; no figure row

Extra simulations: none. An aquo-ion series (Fe³⁺, Cu²⁺, Zn²⁺) would only re-state the three pK_a values printed beside their equations.

## Types bound

`equilibrium-constant` (K_a, K_b, K_w, pK_a, the K axis and bars, per `ch14/COLOR.md` and the symbols table; the chapter notes' "untyped" is overruled), `concentration` ([H₃O⁺], [OH⁻], pH, the concentrations of the worked examples). x, coefficients and counts stay ink; atoms `F.el`.

## Referents

None: the section's species are each named once per example, and no figure draws a particular thing the text marks.

## Exercises

Four Check Your Learning items inline: cyl1 (Example 14.15, number answer 7.5 × 10⁻⁶ M with the stronger acid named in the solution, a multi item), cyl2 (14.16, pH 11.11), cyl3 (14.17, four classifications, open), cyl4 (14.18, 2.1 × 10⁻⁵ M).
End of section:
- e26 fs-idm94404336 (26), from 14.3, unkeyed conceptual, AI-marked approach.
- e27 fs-idm94046624 (27), from 14.3, keyed, open.
- e59 fs-idm8587472 (59), from 14.3, unkeyed, AI-marked approach; names Figure 14.7 in plain text.
- e69 fs-idm95651552 (69), unkeyed classification, AI-marked approach.
- e70 fs-idm161278480 (70), keyed, open.
- fs-idm1823584 (71, novocaine) unkeyed numerical, left out and named.

## Left out

Objectives and summary go to the tables; no glossary or key equations in this module. Nothing of the narrative is left out. Errata kept as printed: Example 14.15's opening question ends without a question mark and its second line writes (x)(x)/0.233 − x) with one parenthesis; the acetate base ionization writes OH− for OH⁻; Example 14.17 (b) runs “,and” together.

## Wanted at chapter level

- variables `K_a` → 14.4-acidic-ions
- variables `K_b_ion` → 14.4-acidic-ions
- variables `K_w` → 14.4-acidic-ions
- variables `[H3O+]` → 14.4-ex-anilinium
- variables `pH` → 14.4-ex-anilinium
- variables `x_ice` → 14.4-ex-anilinium
- variables `[OH-]` → 14.4-ex-acetate
- variables `pK_a` → 14.4-metal-ions
- 14.3 `exercise_notes` to say that fs-idm94404336, fs-idm94046624 and fs-idm8587472 are set in 14.4

Applied by the chapter pass (2026-10-05): the 14.4 rows `K_a`, `K_b_ion`, `K_w` (at `acidic-ions`), `[H3O+]`, `pH`, `x_ice` (at `ex-anilinium`), `[OH-]` (at `ex-acetate`) and `pK_a` (at `metal-ions`) added with their 14.3 meanings. 14.3's `exercise_notes` already named the three items set here.

## Derivations

- Example 14.15, the pH of anilinium chloride · score 4 · not built: a worked example that substitutes into the section's own method (Ka from Kb, then the ICE table)
