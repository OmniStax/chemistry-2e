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

- sim-particles · Figure 21.4 · alpha-particle, beta-particle, positron, gamma-ray, proton, neutron · reverted to the book's image on 2026-11-14: the redraw was the same still table with the particles recoloured to the palette, which teaches nothing the book's table does not (rule 24.4, standardisation alone); the id is kept · photo
- sim-nuclear-balance · Sim · balanced-nuclear-equation, balancing-nuclear-equations, nuclear-reaction · intuition and variation by choice: every nuclide drawn as its packing of protons and neutrons, so the reader sees the nucleons rearranged and counted on both sides; the reader picks one of the section's six reactions (Example 21.4 and the five of the history list) and sets A and Z of the product the book solves for, watching the mass-number and charge sums on each side and the element named from Z · arrows: symbolic (the reaction arrow) · still: a balance has no clock; a change of reaction crossfades the scene · reaction (dropdown, six options, default Example 21.4), A of the product (slider 1 to 240, untyped count, dashed circle at the balancing value), Z of the product (slider 1 to 100, untyped count, dashed circle at the balancing value); the book's answers are the defaults, so the page opens on ²⁸₁₃Al · headline "With A = 28 and Z = 13, the mass numbers and the charges both balance: X is aluminum-28." · no graph; the two sums sit under the two sides with = or ≠ between them, the readout the nuclear equation with its arrow struck through while it does not balance (landing on both circles fires the arrow's morph) · kept and fixed 2026-11-14: the nuclei, their symbols, the two sums and the key stand as one block centred under the headline, so no blank band opens between the scene and the sums; caption cut to what to set and what to read · 2D (book rule: symbolic benches are flat; nuclei flat packings, chapter config) · labels: one nuclide notation under each species (at most five, nothing moves), proton and neutron named once in a legend, counts by hover
  works: read off the image: no image (a Sim); the six reactions are the text's: ²⁵₁₂Mg + ⁴₂He → ¹₁H + ²⁸₁₃Al (Example 21.4), ²¹²₈₄Po → ²⁰⁸₈₂Pb + ⁴₂He, ¹⁴₇N + ⁴₂He → ¹⁷₈O + ¹₁H, ⁹₄Be + ⁴₂He → ¹²₆C + ¹₀n, ²₁H + ⁹⁷₄₂Mo → 2¹₀n + ⁹⁷₄₃Tc, ²³⁵₉₂U + ¹₀n → ⁸⁷₃₅Br + ¹⁴⁶₅₇La + 3¹₀n; must hold: (1) each side's mass numbers and charges are summed with coefficients (3 × 1 for the three neutrons); (2) = stands under the arrow only where the sums agree, ≠ otherwise; (3) the arrow is struck through until both agree; (4) X is named from Z only when it balances

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
