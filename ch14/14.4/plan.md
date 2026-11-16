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

- sim-salt-ions · Sim · salt-ion-acidity, predict-salt-solution-ph · standardisation and variation by choice: the text compares K_a and K_b as two numbers and leaves the reader to recall what each ion does. Here the two reactions with water stand back to back, the acid ionization that makes H₃O⁺ on the left and the base ionization that makes OH⁻ on the right, each with its equation, the parent the ion comes from, and a bar as long as its constant on a logarithmic scale that starts at 10⁻¹⁴ in the middle; the bar that reaches further names the solution, and an inert ion has no bar · arrows: none · still, a salt has no clock; the bars bend from one salt's lengths to the next on the choice · one dropdown, salt, the seven salts of the section's text and Example 14.17 in the section's order (NH₄Cl, [C₆H₅NH₃]Cl, NaCH₃CO₂, KBr, NaHCO₃, Na₂HPO₄, NH₄F; default NH₄F, the one salt whose two ions both react); the Check Your Learning salts left out · headline "NH₄F: $K_a$ of NH₄⁺ is larger than $K_b$ of F⁻, so the solution is acidic." · no graph beyond the scene: each half runs 10⁻¹⁴ to 10⁻⁴ outward (fixed; the largest constant drawn is 2.3 × 10⁻⁵); the longer bar is filled darker, and a dashed line on it marks the shorter bar's length (hover names it) · 2D, a relation between quantities · bars and axis names in `equilibrium-constant`; equations in ink · readout, two formulas on two lines, each ion's constant as the section finds it: K_a(NH₄⁺) = K_w/K_b(NH₃) = 1.0 × 10⁻¹⁴/1.8 × 10⁻⁵ = 5.6 × 10⁻¹⁰ and the same for the basic ion; "≈ 0" for an inert ion, a given constant (K_a of HCO₃⁻ and HPO₄²⁻) stated alone
  works: read off the text (NH₄⁺ K_a 5.6 × 10⁻¹⁰ and F⁻ K_b 1.6 × 10⁻¹¹, Example 14.17 d; anilinium K_a 2.3 × 10⁻⁵ from aniline's K_b 4.3 × 10⁻¹⁰, Example 14.15; acetate K_b 5.6 × 10⁻¹⁰ from acetic acid's K_a 1.8 × 10⁻⁵, Example 14.16; HCO₃⁻ K_a 4.7 × 10⁻¹¹ and K_b 2.3 × 10⁻⁸ from 4.3 × 10⁻⁷, HPO₄²⁻ K_a 4.2 × 10⁻¹³ and K_b 1.6 × 10⁻⁷ from 6.2 × 10⁻⁸, Example 14.17 b, c; the two parents this section leaves to the appendix: K_b of NH₃ 1.8 × 10⁻⁵, printed in 14.3, and K_a of HF 6.4 × 10⁻⁴, printed in 14.3's exercises, each giving the section's value through K_w) · must hold (each bar ends at its constant on its half's axis; an inert ion has no bar and "≈ 0"; the headline's verdict agrees with the longer bar and with the book's answer for every salt: NH₄Cl acidic, anilinium chloride acidic, NaCH₃CO₂ basic, KBr neutral, NaHCO₃ basic, Na₂HPO₄ basic, NH₄F acidic; every quotient in the readout gives the constant written after it; the H₃O⁺ equation is on the K_a side and the OH⁻ equation on the K_b side)
  Rebuilt 2026-11-16: the first build drew two bars and a bare "acid ionization" label, so what each ion does to water, why an ion is inert, and where its constant comes from were not on the page; the first pass only cut the caption.
- fig-hydrated-al · Figure 14.13 · hydrated-metal-ion-acidity · flow by animation and variation by choice: the book's image sets the two sides of the first ionization side by side and leaves the reader to find which hydrogen went and why the charge changed. Here a hydrogen ion leaves a bonded water molecule, crosses the brackets of the complex ion and joins a free water molecule; the charge on the brackets and the formula under them change as it crosses, and the free molecule's name turns to H₃O⁺ when it arrives. The choice repeats the step from a second and a third bonded molecule, the three equations the text prints, so the polyprotic acid is seen losing its charge 3+, 2+, +, none · arrows: the book's is an equilibrium arrow (symbolic); the motion here is the hydrogen ion's · moving: one hydrogen ion per loop, 5 s (0.8 s at rest, the crossing eased, then the products held) · one choice, ionization (first, second, third; default first, the book's figure) · headline "A bonded water molecule gives H⁺ to a free one." · no graph · 2D, drawn flat in the book's view (the top and bottom water molecules upright, the other four in a flattened cross): the passage is about which hydrogen leaves and what charge is left, every atom has to be seen, and turning the octahedron would teach the coordination chapter's subject; the first build's 3D scene with view buttons is not brought back · atoms `F.el` (Al, O, H) with a key and hover names; brackets, charge and formulas in ink · readout the step's equation as the text prints it, and under the first the K_a expression = 1.4 × 10⁻⁵ (the only constant the book gives)
  works: parts (Al at the centre joined to six O, each O joined to two H; three free water molecules in a column to the right, outside the brackets; square brackets round the complex with its charge at the upper right, as the image draws them) · flow (the right-hand H of the right, then the top, then the bottom bonded water molecule goes in a straight line to the free molecule facing it and bonds to its O) · must hold (six O round Al at every moment; each bonded water has two H until it gives one up and one after; before the hydrogen ion crosses the bracket the charge and formula are the reactant's, after it the product's: 3+ [Al(H₂O)₆]³⁺, 2+ [Al(H₂O)₅OH]²⁺, + [Al(H₂O)₄(OH)₂]⁺, none [Al(H₂O)₃(OH)₃]; a free molecule reads H₂O with two H and H₃O⁺ with three; the second and third steps open with the earlier hydrogen ions already gone; the readout's equation is the chosen step's) · read off the image (labels [Al(H₂O)₆]³⁺, H₂O, [Al(H₂O)₅OH]²⁺, H₃O⁺; Al grey, O red, H white; the image draws the free water and hydronium space-filling, here they are ball-and-stick like the complex so the new O–H bond shows; K_a = 1.4 × 10⁻⁵ and the three step equations from the text)
  Rebuilt 2026-11-16. The first pass reverted it to the book's image because the 3D build showed one side at a time; a flat moving figure shows both sides in one loop and adds the second and third steps.
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
