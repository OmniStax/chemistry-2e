# Plan: 8.4 Molecular Orbital Theory (m68747)

Source: `source.md`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins; left here for review after.

## Sub-concepts

| Span | Header | Concepts introduced |
|---|---|---|
| `paramagnetism` | The magnetism of oxygen | paramagnetism-and-diamagnetism |
| `mo-theory` | Molecular orbitals from atomic orbitals | molecular-orbital-theory |
| `bonding-antibonding` | Bonding and antibonding orbitals | bonding-and-antibonding-orbitals |
| `sigma-pi-mo` | Sigma and pi molecular orbitals | sigma-and-pi-molecular-orbitals |
| `ex-mo-types` | Example 8.5 · Molecular Orbitals | (uses sigma-and-pi-molecular-orbitals) |
| `mo-diagram` | Molecular orbital energy diagrams (the book's header) | molecular-orbital-diagram |
| `bond-order` | Bond order (the book's header) | bond-order |
| `diatomic` | Bonding in diatomic molecules (the book's header) | (uses bond-order, molecular-orbital-diagram) |
| `second-period` | The diatomic molecules of the second period (the book's header, raised to an `<h2>`) | s-p-mixing, diatomic-molecule-configurations |
| `ex-o2` | Example 8.6 · Molecular Orbital Diagrams, Bond Order, and Number of Unpaired Electrons | (uses) |
| `ex-c2` | Example 8.7 · Ion Predictions with MO Diagrams | (uses) |

The Kohn and Drug Design notes sit after Example 8.5 in `sigma-pi-mo`, where the book prints them; the Band Theory note sits in `second-period` before Example 8.6. Objectives, the summary (to `summary_html`, "is in advantage of" as printed), the key equation and the sixteen glossary entries go to the tables. Three Link to Learning notes dropped and named in `notes`. Converter quirk honoured: `σ*<sub>px</sub>*` is σ with an italic subscript.

## Figures

- `fig-o2-lewis` · unnumbered image (Lewis structure of O₂) · paramagnetism-and-diamagnetism · faithful still copy, standardisation only · no controls · 2D, ink.
- `sim-gouy` · Figure 8.27 · paramagnetism-and-diamagnetism · variation by choice: the reader switches the magnet on and off with a paramagnetic or a diamagnetic sample and sees the beam tip, which the still leaves to the reader · still, the beam answers the choices (a short eased tip on a change) · choices: sample (O₂, N₂), electromagnets (off, on) · headline says whether the sample appears heavier or lighter · no graph · 2D: the lesson is the reading of the balance, not the apparatus's shape, so the book's bench rule gives way to root rule 24.5 (lowest tier). Ink throughout; magnets are drawn things with N/S in ink.
- `sim-waves` · Figure 8.28 · molecular-orbital-theory, bonding-and-antibonding-orbitals · variation by slider: the book draws the two ends (in phase, out of phase); the slider walks between them · still · slider phase difference (angle, untyped, 0 to 180°, default 0, dashed circles at 0 "in phase" and 180 "out of phase") · headline names constructive or destructive interference with the amplitude of the sum · two waves stacked over their sum · 2D. Ink; the two waves are not typed quantities.
- `sim-mo-shapes` · Figure 8.29 + 8.30 + 8.31 · bonding-and-antibonding-orbitals, sigma-and-pi-molecular-orbitals · shape in 3D: the reader turns σ, σ*, π, π* and sees the nodal planes the flat drawings imply · still (idle spin); a change morphs by crossfade · choices: orbitals (two s, two p end to end, two p side by side), combination (in phase, out of phase) · headline names the orbital, its node(s) and where the density lies · no graph · mathematical 3D (root rule 28.3), `F.view3d`, free orbit with the upright pitch bound, views "side on" and "along the axis"; flat fallback the library's stub. Lobes `F.cat(0)`/`F.cat(1)` as the two phases (chapter COLOR.md), nuclei ink dots, nodes faint ink planes. Binds nothing.
- `fig-ao-types` · unnumbered image in Example 8.5 · sigma-and-pi-molecular-orbitals · faithful still copy of the three pairs (a) to (c), lobes in the two phase colours · 2D.
- `fig-kohn` · Figure 8.32 · photo kept (every Portrait of a Chemist keeps its photograph).
- `fig-hiv` · Figure 8.33 · photo kept (the text points at it; a protein is beyond an honest drawing).
- `sim-mo-fill` · Figure 8.34 + 8.35 + 8.36 + 8.40 · molecular-orbital-diagram, bond-order, diatomic-molecule-configurations, paramagnetism-and-diamagnetism · variation by choice: every diagram the book draws (Be₂⁺, H₂, He₂, O₂) is one state; the reader picks any species the section and its examples name and watches the valence electrons fill by the Aufbau principle and Hund's rule · still (the electrons cascade in on a change) · one dropdown, species (H₂, H₂⁺, H₂⁻, He₂, Li₂, Be₂, Be₂⁺, Be₂²⁻, B₂, C₂, C₂²⁻, N₂, N₂⁺, N₂²⁺, O₂, O₂⁺, O₂²⁺, O₂²⁻, F₂, F₂⁺, Ne₂), default Be₂⁺ (Figure 8.34) · headline gives the configuration, the unpaired electrons and the magnetism · diagram alone · 2D. Energy axis in `energy`; lines and half-arrows ink; level energies are the schematic ones of Figure 8.37 (no numbers, as the book prints none), the order with s-p mixing for Li to N and without for O to Ne. Readout: the bond order equation with the live counts.
- `sim-period2` · Figure 8.37 · s-p-mixing, diatomic-molecule-configurations · standardisation with hover names, the eight diagrams side by side as the book draws them · still, the comparison across the period is the picture · no controls · 2D; energy axis in `energy`, levels ink, the σ₂ₚ trace dashed in ink.
- `sim-spmix` · Figure 8.38 · s-p-mixing · variation by slider: the book shows only the two ends; the slider moves σ₂ₛ, σ*₂ₛ, σ₂ₚ, σ*₂ₚ continuously and the reader sees σ₂ₚ cross the π₂ₚ pair · still · slider extent of s-p mixing (untyped, 0 to 1, default 0, dashed circle where σ₂ₚ meets π₂ₚ) · headline names the order · diagram alone · 2D, energy axis in `energy`; the σ levels that move marked by `F.cat(1)`, π levels ink.
- `sim-bands` · Figure 8.39 · (Band Theory note; no concept of its own, serves molecular-orbital-theory) · variation by choice: N orbitals combine into N/2 bonding and N/2 antibonding levels that crowd into bands as N grows; the material sets the band gap · still · choices: number of atoms (2, 6, 20, very many) and solid (insulator, semiconductor, conductor) · headline names the gap · diagram alone · 2D. Valence and conduction bands `F.cat(3)`/`F.cat(4)` (the phase pair stays reserved), the gap bracket in `energy`.
- Check Your Learning of Example 8.5: the book's image `CNX_Chem_08_04_siganti_img.jpg` on the card, the answer image `CNX_Chem_08_04_salabel_img.jpg` inline in the solution.

Tables 8.2 and 8.3 stay in the text as `div.book-table`. No extra Sims.

## Exercises

- Three Check Your Learning items (`cyl1` to `cyl3`), inline after Examples 8.5, 8.6, 8.7, open with the book's answers.
- End of section, sixteen of nineteen: nine keyed with the book's answers (open); six unkeyed conceptual (fs-idp105434592, fs-idm41078784, fs-idm179535904, fs-idm63366704, fs-idp45731680, fs-idm76713856) with an AI-marked suggested approach; fs-idm16460880 (true or false) kept open with its options in the prompt and an AI-marked approach, never graded. Left out, unkeyed numerical: fs-idm138595920, fs-idm131971232, fs-idm79754896. The key's "number of bonding electron" (key equation), "atoms in the 2s orbital" and the glossary's "σ* bonding orbital"/"π* bonding orbital" are carried as printed.

## Binds

`energy` only (the E axes of `sim-mo-fill`, `sim-period2`, `sim-spmix`, the gap of `sim-bands`).

## Wanted at chapter level

- anchor `Ψ` (8.4 variable) → 8.4-mo-theory
- anchor eq-bond-order → 8.4-bond-order
- anchor eq-bond-order-h2 → 8.4-diatomic
- anchor eq-bond-order-he2 → 8.4-diatomic
- anchor eq-bond-order-o2 → 8.4-ex-o2
- edge molecular-orbital-theory → wavefunction-probability (6.3), as the chapter notes list
- edge molecular-orbital-diagram → the 6.4 electron-configuration, Aufbau and Hund's-rule concepts, as the chapter notes list
- edge paramagnetism-and-diamagnetism → the 6.4 unpaired-electrons/orbital-diagram concept, as the chapter notes list
- edge bond-order → the 7.5 bond-energy concept, as the chapter notes list
- edge bonding-and-antibonding-orbitals → the 6.1 wave-interference concept, if staged
