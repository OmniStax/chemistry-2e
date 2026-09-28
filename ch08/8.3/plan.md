# Plan: 8.3 Multiple Bonds

Written 2026-09-28 before building, per `ch08/config.md` (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins); left for review.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `hybrids-and-p` | σ bonds from hybrid orbitals, π bonds from the p orbitals left over | introduces `pi-bonds-from-unhybridized-orbitals`; uses `sigma-and-pi-bonds`, `hybridization`, `sp-sp2-sp3-hybrid-orbitals`, `hybrid-orbital-energy-diagram` |
| `restricted-rotation` | Why a double bond does not turn | introduces `restricted-rotation-about-pi-bonds`; uses `sigma-and-pi-bonds` |
| `triple-bonds` | A triple bond: one σ bond and two π bonds | reinforces `pi-bonds-from-unhybridized-orbitals`; uses `multiple-bond-composition` |
| `resonance-hybridization` | Resonance, hybridization and delocalized electrons | introduces `resonance-and-delocalization`; uses `resonance`, `assign-hybridization` |

Objectives and the Key Concepts and Summary go to the tables (`summary_html`); the section has no key equation and no glossary entry.

## Figures

- `fig-lewis-ethene` · the unnumbered Lewis structure of ethene (`CNX_Chem_08_03_C4H4Lewis_img.jpg`) · `pi-bonds-from-unhybridized-orbitals` · standardisation only, so a faithful copy · still, a drawing with nothing to vary · none · no headline · none · 2D (Lewis structures are flat by the book's rule).
- `sim-hybrid-levels` · Figure 8.22 · `pi-bonds-from-unhybridized-orbitals`, `hybrid-orbital-energy-diagram` · variation by choice: the book draws only the sp² case, and one switch to sp (acetylene, and the carbon of CO₂ in exercise fs-idp47770992) shows the fourth orbital line leaving the hybrid set and rising to join the p set, the hybrid level falling from two thirds of the way up to halfway · still, the choice morphs the lines (no clock) · choice hybridization, `sp²` (C₂H₄, default, the book's state) and `sp` (C₂H₂) · headline names the orbitals and their electrons · none · 2D. Binds `energy`: the E axis and its label. Lines and electron half-arrows ink. Readout `2s + 2(2p) → 3 sp²` morphing by meaning into `2s + 2p → 2 sp`.
- `sim-multiple-bonds` · Figure 8.23 + 8.24 + 8.25 · `pi-bonds-from-unhybridized-orbitals`, `restricted-rotation-about-pi-bonds` · shape in 3D and variation: the reader turns the molecule to see the p lobes above and below the σ framework, and in ethene twists one CH₂ group about the C–C axis and watches the p orbitals turn out of alignment and the π overlap fade to nothing at 90° (the paragraph on restricted rotation), which no still can show · still: the twist is a slider, as `config.md` says, not a cycle · choice molecule, ethene (C₂H₄, default) and acetylene (C₂H₂); slider twist θ, 0° to 90°, untyped angle, a special value at 90° ("perpendicular"); the twist slider fades out for acetylene, whose hydrogen atoms lie on the axis so that a twist changes nothing · headline on a strip under the scene, with a legend of the three lobe kinds · 3D, mathematical (root rule 28.3): free yaw, pitch bounded to ±90° so the scene stays upright, idle spin, snap views "side" (the book's viewpoint) and "along the axis"; flat fallback is the library's stub. Colours: sp²/sp hybrids `F.cat(2)`, the two phases of the p orbitals `F.cat(0)` and `F.cat(1)` (chapter `COLOR.md`), the π clouds `F.cat(0)`/`F.cat(1)` by the phase of the lobes they join, atoms `F.el`. Hover names on every atom and lobe; atom labels C and H once each. Readout `\text{C=C} = 1\,\sigma + 1\,\pi` with the overlap `\cos\theta`; at 90° it morphs to `1\,\sigma + 0\,\pi`; for acetylene `\text{C≡C} = 1\,\sigma + 2\,\pi`. Binds nothing.
- `fig-benzene` · Figure 8.26 · `resonance-and-delocalization` · standardisation only, faithful copy of the two resonance forms joined by a double-headed arrow (Lewis structures are faithful copies by `config.md`) · still · none · none · none · 2D.
- `fig-lewis-so2` · the unnumbered image in Example 8.4 (`CNX_Chem_08_03_SO2_img.jpg`) · `resonance-and-delocalization` · faithful copy of the two resonance structures with formal charges · still · none · none · none · 2D.

Photographs: none in this section. Every book image is copied to `media/ch08/`; the originals of the four numbered figures sit in `originals`.

Extra simulations: none. A benzene figure that morphs between the two resonance forms and a delocalized ring was weighed and dropped, since the delocalized picture belongs to molecular orbital theory, which the page defers to 8.4.

## Exercises

- Check Your Learning after Example 8.4 (source id fs-idp109093216, the para of the example; keyed sp², open), host `data-place="ex-so2"`.
- Nine end-of-section items, kind `exercise`, none moved and none a simulation-exercise. Keyed (5): fs-idp80061792, fs-idp37364832 (answer image `CNX_Chem_08_03_Acetonitri_img.jpg`), fs-idm15473712, fs-idp118104208, fs-idp47770992 (answer image `CNX_Chem_08_02_CO2Diag.jpg`). Unkeyed conceptual (4), kept with an AI-marked suggested approach: fs-idp200563984, fs-idm1022320, fs-idm16504096, fs-idp140570640 (its three Lewis images in the prompt). No unkeyed numerical item.

## Types bound

`energy`, on the E axis of Figure 8.22 only.

## Wanted at chapter level

- anchor: none; the section has no variable, equation or glossary row.
- edge: `resonance-and-delocalization` → `resonance` (7.4), as the chapter notes already list.
