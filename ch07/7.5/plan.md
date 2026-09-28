# Plan: 7.5 Strengths of Ionic and Covalent Bonds

Written 2026-09-28 before the build and left for review, as `../config.md` records (applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins).

## Sub-concepts

| Span | Header | Concepts |
|---|---|---|
| `bond-strength` | Bond strength: covalent bonds (the section's opening paragraph, D<sub>X–Y</sub>, D<sub>H–H</sub>, the four C–H bonds of CH<sub>4</sub>) | introduces `bond-energy` |
| `strength-length` | Bond strength and bond length (Tables 7.2 and 7.3) | introduces `bond-strength-and-length`, uses `bond-energy` |
| `enthalpy` | Enthalpies of reaction from bond energies (the H<sub>2</sub> + Cl<sub>2</sub> sum, Example 7.9 `ex-methanol`) | introduces `enthalpy-from-bond-energies`, uses `bond-energy` |
| `lattice` | Ionic bond strength and lattice energy | introduces `lattice-energy` |
| `lattice-trends` | Lattice energy, ionic charge, and ionic size (the Coulomb relation, Example 7.10 `ex-lattice`) | introduces `lattice-energy-trends`, uses `lattice-energy` |
| `born-haber` | The Born-Haber cycle (Figure 7.13, Table 7.4, the closing comparison) | introduces `born-haber-cycle`, uses `lattice-energy`, `bond-energy` |

All six concepts merged in the prep are used; every one has book exercises.

## Figures

- `sim-length` · Sim · `bond-strength-and-length` · intuition: Table 7.3's nine bonds plotted as bond energy against bond length, each pair of atoms joined single to double to triple, so the reader sees stronger and shorter go together, which the table leaves to the eye · still, a table has no clock · no controls; hover names each point · headline states the trend · graph alone · 2D. Binds `energy` (the energy axis and points); the three atom pairs told apart by `F.cat(0..2)` and named in a legend; length is ink.
- `sim-enthalpy` · Sim · `enthalpy-from-bond-energies`, `bond-energy` · intuition and variation by choice: the bonds broken stacked as energy in, the bonds formed stacked as energy out, and the difference drawn as ΔH, for the reaction the reader picks (H<sub>2</sub> + Cl<sub>2</sub> → 2HCl, the default, or CO + 2H<sub>2</sub> → CH<sub>3</sub>OH of Example 7.9) · still, a choice of reaction has no clock · one `F.choice` (reaction) · headline states the two sums and ΔH · bars alone · 2D. Binds `energy` (bars and readout). The exercises' reactions and the Check Your Learning reaction are left out so the figure never answers them.
- `sim-lattice` · Sim · `lattice-energy-trends`, `lattice-energy` · variation by choice and slider: a cation and an anion touching with R<sub>o</sub> bracketed, and a bar of ΔH<sub>lattice</sub> = C(Z<sup>+</sup>)(Z<sup>−</sup>)/R<sub>o</sub> against LiF's 1023 kJ/mol marked, so doubling both charges visibly quadruples the bar · still, the relation has no clock · `F.choice` Z<sup>+</sup> (1, 2, 3) and Z<sup>−</sup> (1, 2, 3), untyped; slider R<sub>o</sub> (length, ink) 150 to 400 pm, default 201 pm, detent at 205 pm (MgO) · C fixed at 1023 × 201 kJ·pm/mol so that the default reproduces LiF, stated in the readout note; at Z = 2, 2 and 205 pm it gives about 4010 kJ/mol, the book's comparison of LiF and MgO · headline names the charges, R<sub>o</sub> and ΔH<sub>lattice</sub> · bar below the ions · 2D, a relation. Ions are generic M and X in the panel grey with their letters (the chapter's rule for a generic atom); the bar is `energy`.
- `sim-born-haber` · Figure 7.13 · `born-haber-cycle`, `lattice-energy` · standardisation and a story: the book's energy ladder for CsF built one step at a time on a story slider (sublimation, ionization, half the F–F bond, electron affinity, the negative of the lattice energy), each arrow growing from its level, the running Hess sum in the readout, the overall ΔH<sub>f</sub>° arrow arriving with the last step · story time only (F.story, stops 0 to 5), because the book's text walks the cycle in order; no physical clock · no reader sliders · headline names the current step and its ΔH · ladder alone · 2D, an energy ladder by the book's rule. Binds `energy`: arrows in the energy hue, up or down by sign; levels labelled species in ink. The book's image in `originals`, its caption swapped.
- `fig-ch4` · unnumbered image, kept (the displayed reaction CH<sub>4</sub> → C + 4H with ΔH° = 1660 kJ that the next sentence divides by four); `figure` row, no number.
- `fig-methanol` · unnumbered image, kept inside Example 7.9 (the Lewis structures the solution counts bonds from); `figure` row, no number.
- Images in exercises copied as they are: Ethanol (Check Your Learning prompt), Hydroxya, C6H8Lew and C6H8ans.

## Tables

Tables 7.2 "Bond Energies (kJ/mol)" (spanned header written by hand), 7.3 "Average Bond Lengths and Bond Energies for Some Common Bonds" and 7.4 (untitled in the book; the CsF steps, printed as the table prints them, not as its CNXML summary for NaCl) as `div.book-table`. The unnumbered ionization energy table goes inside the AP item's prompt.

## Exercises

- Check Your Learning: `cyl1` after `ex-methanol` (−35 kJ), `cyl2` after `ex-lattice` (ZnO), both keyed.
- End of chapter, 17 of 21. Keyed: `fs-idp16780032`, `fs-idp28520976`, `fs-idp19159472`, `fs-idp19660960`, `fs-idm22310960`, `fs-idp12625232` (AP, footnote and table in the prompt), `fs-idp236067168`, `fs-idp55219680`, `fs-idp29388832`, `fs-idp56209472`. Unkeyed conceptual with a suggested approach: `fs-idp18527664`, `fs-idp20766256`, `fs-idm39061296`, `fs-idm27862256`. Unkeyed choice items kept open with their options: `fs-idp46666496`, `fs-idp51586816`, `fs-idp15208208`. Left out as unkeyed computational: `fs-idp57429280`, `fs-idp65498352`, `fs-idm2894352`, `fs-idp57420000`.

## Binds

`energy` only, per `../COLOR.md`.

## Wanted at chapter level

- eq-bond-energy → 7.5-bond-strength
- eq-enthalpy-bond-energies → 7.5-enthalpy
- eq-lattice-energy-definition → 7.5-lattice
- eq-lattice-energy-coulomb → 7.5-lattice-trends
- eq-born-haber → 7.5-born-haber
