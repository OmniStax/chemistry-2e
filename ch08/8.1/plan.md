# Plan: 8.1 Valence Bond Theory (m68744)

Source: `source.md`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left here for review after.

## Sub-concepts

| Span | Header | Concepts introduced |
|---|---|---|
| `valence-bond` | Bonds from overlapping orbitals | valence-bond-theory |
| `bond-distance` | Bond distance and bond energy | bond-distance-and-bond-energy |
| `sigma-pi` | Sigma and pi bonds | sigma-and-pi-bonds |
| `multiple-bonds` | Single, double, and triple bonds | multiple-bond-composition |
| `ex-butadiene` | Example 8.1 · Counting σ and π Bonds | count-sigma-and-pi-bonds |

The two opening paragraphs (why VSEPR theory is not enough) sit at the head of `valence-bond`. Objectives, summary (to `summary_html`) and the five glossary entries go to the tables.

## Figures

- `sim-morse` · Figure 8.2 · bond-distance-and-bond-energy, valence-bond-theory · variation by slider: the reader moves the two atoms and reads the energy the book draws only at three distances · still, the energy answers the distance and nothing has a clock · slider r (internuclear distance, untyped, 30 to 300 pm, default 74 with a dashed circle at the bond length) · headline names which of the book's three stages the pair is in (no interaction, beginning to interact, the bond length) with the live energy · the pair of atoms above, graph below · 2D (an energy curve is flat by the book's rules). Energy axis, curve and readout in `energy`; distance ink.
- `sim-overlap` · Figure 8.3 + 8.4 + 8.5 · sigma-and-pi-bonds, valence-bond-theory, orbital-overlap · standardisation + shape in 3D: σ density on the axis, π above and below a node · still, a pair change morphs · choice of the five pairs and F.choice view (2D, 3D), 2D default (book RULES) · one-line headline per pair, clear of the lobes · no graph · flat panels with nuclei dots; 3D via F.view3d + F.mesh.lobe, pitch bound ±60°, spin off, atom and axis names by labeller or hover; fold kept. Rebuilt 2026-10-05: 2D labels atoms under their nuclei, the axis and the π node by the labeller; 3D names every body by hover, headline on a strip above the scene.
- `fig-bond-types` · unnumbered image (Lewis structures of HCl, O₂, N₂ with their σ and π counts) · multiple-bond-composition · faithful still copy, standardisation only · no controls · 2D, ink.
- `fig-butadiene` · unnumbered image in Example 8.1 · count-sigma-and-pi-bonds · faithful still copy of the Lewis structure of butadiene · 2D, ink.
- Check Your Learning image (`CNX_Chem_08_01_Exover_img.jpg`) goes on the card as its `figure`; answer images of fs-idp84623072 and fs-idp108425904 go inline in their solutions.

Table 8.1 stays in the text as `div.book-table` with its spanned title written as the caption. No photographs. No extra Sims.

## Exercises

- `cyl1` (Check Your Learning of Example 8.1): a σ or π for three overlaps, open with the book's answer, the image on the card.
- End of section, eight items: four keyed (fs-idp92773152, fs-idm21893728, fs-idp84623072, fs-idp108425904) with the book's answers, open; three unkeyed conceptual (fs-idp92050208, fs-idp78672368, fs-idp42077552) kept with an AI-marked suggested approach; fs-idp204835968 (the H–Cl energy, unkeyed numerical) left out and named in `exercise_notes`.

## Binds

`energy` only (Figure 8.2).

## Wanted at chapter level

- anchor `E` (8.1 variable) → 8.1-bond-distance
- anchor `r_bond` (8.1 variable) → 8.1-bond-distance
- edge valence-bond-theory → the 6.3 atomic-orbital-shapes concept (as the chapter notes list)
- edge bond-distance-and-bond-energy → the 7.5 bond-energy concept (as the chapter notes list)

Applied by the chapter pass: `E` and `r_bond` anchored to 8.1-bond-distance; edges valence-bond-theory → angular-momentum-quantum-number (the 6.3 concept of orbital shapes) and bond-distance-and-bond-energy → bond-energy (7.5) merged.
