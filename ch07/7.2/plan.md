# Plan: 7.2 Covalent Bonding

Written 2026-09-28 before the build and left for review, as `../config.md` records (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts

| Span | Header | Concepts |
|---|---|---|
| `covalent` | Covalent bonds: a shared pair of electrons | introduces `covalent-bond-formation` |
| `formation` | Formation of covalent bonds | reinforces `covalent-bond-formation` (Figure 7.4, the 436 kJ of H<sub>2</sub>) |
| `pure-polar` | Pure vs. polar covalent bonds | introduces `bond-polarity` |
| `electronegativity` | Electronegativity (with `###` Electronegativity versus Electron Affinity as `<h3>`, and the Pauling note) | introduces `electronegativity`, uses `bond-polarity` |
| `bond-type` | Electronegativity and bond type (with Example 7.3, `ex-polarity`) | introduces `bond-type-from-electronegativity`, uses `electronegativity`, `bond-polarity` |

The concepts are the four merged in the prep (`covalent-bond-formation`, `bond-polarity`, `electronegativity`, `bond-type-from-electronegativity`); every one has book exercises.

## Figures

- `sim-bond` · Figure 7.4 · `covalent-bond-formation` · variation by slider: the reader moves the two atoms and watches the point ride the curve and the spheres overlap, where the still shows four fixed pairs · still, the energy answers the distance and nothing has a clock · slider internuclear distance r (length, untyped, ink) 30 to 400 pm, default 74 pm with a special circle at the bond length · headline states r and the energy of the pair · graph below the row of atoms (a horizontal scene) · 2D, a graph. The curve is a Morse function with the book's depth −7.24 × 10<sup>−19</sup> J at 74 pm; the readout is `\kE` for one molecule and, at the minimum, the 436 kJ per mole of the displayed equation (7.24 × 10<sup>−19</sup> J × 6.022 × 10<sup>23</sup> mol<sup>−1</sup>). Binds `energy`. Labels: the two H atoms named once, axis titles, the minimum labelled; no entity labels beyond four.
- `sim-polarity` · "Figure 7.5 + 7.8" · `bond-polarity`, `electronegativity`, `bond-type-from-electronegativity` · variation by choice: the reader picks the two bonded atoms and sees the shared electron density shift toward the more electronegative one, the δ+ and δ− signs change sides, and ΔEN move along the book's scale of Figure 7.8 with its 0.4 and 1.8 boundaries · still, a choice of pair has no clock · two `F.select` dropdowns (atom A, atom B) of the elements the section and its exercises name (H, Li, Na, K, Mg, Ca, B, C, N, O, F, Si, P, S, Cl, Br, I, Mn, Cs), default H and Cl (Figure 7.5) · headline names the bond, ΔEN and the bond type · the bond above, the ΔEN scale below · 2D. Element palette for the atoms (F.el), everything else ink (EN untyped); electron density a shaded cloud in ink alpha, shifted by ΔEN; δ+/δ− ink labels; bond type bands on the scale in ink shades, not hues. At a pair of the same element the cloud is centred and the headline says pure covalent. Readout `\Delta\text{EN} = |\text{EN}_B - \text{EN}_A|` with the numbers. Placed in `bond-type`, since it needs both electronegativity and the scale; the earlier citations of Figure 7.5 name it.
- `fig-en` · Figure 7.6 · `electronegativity` · standardisation only: a faithful copy of Pauling's table drawn in the figure layer so it reads in both themes, the book's values, arrows "Increasing electronegativity" and "Decreasing electronegativity" · still, no controls · no graph · 2D. Cells in the panel colour with ink; the book tints metals, metalloids and nonmetals, carried with `F.cat(0..2)` at low alpha and a small legend, since those are categories with no type. Hover names give each element's name.
- `fig-pauling` · Figure 7.7 · photo kept (Portrait of a Chemist box, root rule and book rule).

No Sim beyond these: the example's bonds are all reachable on `sim-polarity`.

## Tables

Table 7.1 "Bond Polarity and Electronegativity Difference" inside Example 7.3 as `div.book-table`. The Check Your Learning's unnumbered answer table goes into the answer's solution as HTML.

## Exercises

- Check Your Learning of Example 7.3: inline after `ex-polarity`, open with the book's table as its solution.
- End of chapter (11 here, 1 moved): keyed `fs-idp119456432`, `fs-idm121789856`, `fs-idm28148800`, `fs-idp31566784`, `fs-idp173506592` (open with the book's key). Unkeyed conceptual, kept with a suggested approach marked as OmniStax's own: `fs-idm13014880`, `fs-idp18335616`, `fs-idp43172032`, `fs-idp49532528`, `fs-idp51035456`; the unkeyed choice item `fs-idp9464672` kept as an open item with its options listed. `fs-idp49074848` (a molecule of solid NaCl) moves to 7.1 with `source_section` "7.2"; both notes say so.

## Binds

`energy` (Figure 7.4's energy axis, point and readout). Everything else ink or element palette, per `../COLOR.md`.

## Wanted at chapter level

- none of the symbol, concept or edge rows needs a fix; `electronegativity` → 6.5 electron affinity and the others are listed in the chapter notes already.
