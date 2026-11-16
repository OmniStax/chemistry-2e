# Plan: 21.2 Nuclear Equations (m68852)

Written 2026-10-05 before the build and left for review, as `ch21/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Two objectives, one numbered figure (21.4, a table drawn as an image), one worked example (21.4) with a keyed Check Your Learning, no boxed note, no Link to Learning, no table, eight end-of-section items (chapter exercises 11 to 18).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `nuclear-reactions` | Nuclear reactions (OmniStax's header for the book's untitled opening) | introduces `nuclear-reaction`; uses `nuclide`, `mass-number`, `atomic-number` |
| `particles` | Types of Particles in Nuclear Reactions (the book's header; Figure 21.4, antimatter, annihilation, gamma rays) | introduces `beta-particle`, `positron`, `antimatter`, `gamma-ray`; uses `alpha-particle`, `proton`, `neutron`, `electron`, `mass-energy-equivalence`, `electromagnetic-radiation`, `wave-particle-duality`, `excited-state`, `mass`, `energy-and-work` |
| `balancing` | Balancing Nuclear Reactions (the book's header; the history equations and the Sim) | introduces `balanced-nuclear-equation`, `balancing-nuclear-equations`; uses `balanced-equation`, `nucleon`, `mass-number`, `atomic-number` |
| `ex-balancing` | Example 21.4 | uses `balancing-nuclear-equations`, `periodic-table` |

The glossary terms sit on their concepts already (nuclear reaction, beta particle, positron, antimatter, gamma ray); "alpha particle" is 2.2's `alpha-particle`, marked `uses`. The bold terms are the introducing spans.

## Figures

- sim-particles · Figure 21.4 · alpha-particle, beta-particle, positron, gamma-ray, proton, neutron · reverted to the book's image on 2026-11-14: the redraw was the same still table with the particles recoloured to the palette, which teaches nothing the book's table does not (rule 24.4, standardisation alone); the id is kept; judged again 2026-11-16 and left: a reference table of names, symbols and descriptions has nothing to vary or set in motion · photo
- sim-nuclear-balance · Sim · balanced-nuclear-equation, balancing-nuclear-equations, nuclear-reaction · intuition and variation by choice: every nuclide of a reaction drawn as its packing of protons and neutrons at one scale that fills the stage, the product X redrawn nucleon by nucleon as the reader sets its A and Z, so the reader sees that X must take exactly the nucleons and the charge the other species leave; six reactions, Example 21.4 and the five of the history list · arrows: symbolic (the reaction arrow, struck through and marked "not balanced" until both sums agree) · still: a balance has no clock; a change of reaction crossfades the scene · reaction (dropdown, six options, Example 21.4 the default and the others named by their reactants), A of X and Z of X (sliders, untyped counts, from 1 up to the left side's total, since X cannot hold more than the reactants bring; dashed circle at the balancing value); the book's answers are the defaults, so the page opens on ²⁸₁₃Al · headline "With A = 28 and Z = 13, the mass numbers and the charges both balance: X is aluminum-28." · no graph; the readout is the book's two sums on two lines (mass numbers, charges), each side's total under its brace, = or ≠ between · rebuilt 2026-11-16: the earlier passes left small nuclei (7-unit nucleons) in a wide blank stage, with the sums written a third time on the canvas in grey 21-unit type and the equation a fourth time in the readout; now the nuclei are sized per reaction to fill the stage (protons carry their + as the book's Figure 21.4 draws them, where a nucleon is large enough), X stands in a ring sized for the largest nucleus its slider reaches so nothing else moves, the sums moved to the readout, and the sliders run only over what the reactants can supply (1 to 29 and 1 to 14 for Example 21.4 in place of 1 to 240 and 1 to 100) · 2D (book rule: symbolic benches are flat; nuclei flat packings, chapter config) · labels: one nuclide notation under each species, X named at its ring, proton and neutron in an F.legend key, counts by hover
  works: read off the image: no image (a Sim); the six reactions are the text's, checked against text.html: ²⁵₁₂Mg + ⁴₂He → ¹₁H + ²⁸₁₃Al (Example 21.4, whose sums 25 + 4 = A + 1 and 12 + 2 = Z + 1 the readout reproduces), ²¹²₈₄Po → ²⁰⁸₈₂Pb + ⁴₂He, ¹⁴₇N + ⁴₂He → ¹⁷₈O + ¹₁H, ⁹₄Be + ⁴₂He → ¹²₆C + ¹₀n, ²₁H + ⁹⁷₄₂Mo → 2¹₀n + ⁹⁷₄₃Tc, ²³⁵₉₂U + ¹₀n → ⁸⁷₃₅Br + ¹⁴⁶₅₇La + 3¹₀n; must hold: (1) each side's mass numbers and charges are summed with coefficients (3 × 1 for the three neutrons) and the total stands under each side; (2) = stands between the sides only where the totals agree, ≠ otherwise; (3) the arrow is struck through and X's ring dashed until both agree; (4) the headline names X from Z only when it balances; (5) each nucleus shows exactly A discs, Z of them protons; (6) the readout is filled at first paint and nothing but X changes as a slider moves

Extra simulations: none. An annihilation figure (a positron meeting an electron, two γ photons leaving) would only replay the book's equation.

## Tables

None.

## Types bound

`mass` and `energy` in the words of the antimatter paragraph ("their mass is converted into energy"), and E = mc² through `\kE`, `\km`, `\kc` if the section may use 21.1's symbols. Mass numbers, atomic numbers, charges and counts stay ink; particles `F.el`.

## Referents

None.

## Exercises

One Check Your Learning inline, host `ex-balancing`, `source_id` the example's id `fs-idp244468800`. Eight end-of-section items (11 to 18): three keyed kept (fs-idp161987712, fs-idp126933936, fs-idp225643904), one unkeyed conceptual kept with an AI-marked approach (fs-idp158311008), three unkeyed left out and named (fs-idm5988192 equations, fs-idp59747856 equations, fs-idp208355344 numerical), and the keyed fs-idp74968928 (binding energy of ¹⁹F) moved to 21.1 with `source_section` "21.2".

## Left out

Nothing in the text. Errata kept as printed: the key of fs-idp225643904 (b) writing ¹⁴₇C for nitrogen-14.

## Wanted at chapter level

- none

Applied by the chapter pass: variables rows `21.2/E`, `21.2/m` and `21.2/c` added with 21.1's meanings and anchored at `21.2-particles`, since the antimatter paragraph writes E = mc² through the macros; the opening header capitalized as "Nuclear Reactions"; `exercise_notes` aligned with 21.1's on `fs-idp74968928`.
