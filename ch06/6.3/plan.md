# Plan: 6.3 Development of Quantum Theory (m68733)

Source: `source.md`, converted with `python3 tools/convert.py 6.3`. Status:
applied as proposed on 2026-09-28, on Chen's instruction to finish the book
without check-ins; the plan is left for review after the build.

Three learning objectives, eight numbered figures (6.16 to 6.23, one of them a
photograph), Table 6.1, four worked examples (6.6 to 6.9) each with a Check
Your Learning, three Link to Learning notes, fifteen end-of-chapter
exercises (eight keyed), seventeen glossary terms. One page (root rule 11).

## Sub-concepts (page headers)

The book's own headers are kept where they mark an idea: Behavior in the
Microscopic World, The Quantum–Mechanical Model of an Atom, Understanding
Quantum Theory of Electrons in Atoms and The Pauli Exclusion Principle. The
longer runs between them are divided where the idea changes.

1. `open-questions` **The questions the Bohr model left open** (the opening
   paragraph). Uses `bohr-stationary-states`, `hydrogen-like-ions`.
2. `microscopic-world` **Behavior in the Microscopic World** (the billiard
   ball, the water waves of Figure 6.16). Uses `wave-particle-duality`.
3. `de-broglie` **Matter waves: the de Broglie wavelength** (λ = h/mv, the
   electron as a circular standing wave, Figure 6.17, 2πr = nλ). Introduces
   `de-broglie-wavelength`; uses `wave-particle-duality`, `bohr-stationary-states`.
4. `electron-interference` **Electrons that interfere** (Davisson and Germer,
   Figure 6.18), then Example 6.6 as `ex-particle-wavelength` with its Check
   Your Learning inline and the de Broglie Sim after it. Reinforces
   `de-broglie-wavelength`; uses `wave-particle-duality`.
5. `uncertainty` **The Heisenberg uncertainty principle** (Δx Δp ≥ ħ/2, the
   worked 1 pm estimate, ΔE Δt ≥ ħ/2). Introduces `heisenberg-uncertainty`.
6. `quantum-model` **The Quantum–Mechanical Model of an Atom** (Schrödinger,
   Born, |ψ|², Ĥψ = Eψ, quantum mechanics). Introduces `wavefunction-probability`.
7. `shells` **Understanding Quantum Theory of Electrons in Atoms** (quantized
   levels, n and shells, Figure 6.19, the transition equation). Introduces
   `principal-quantum-number-shells`; uses `photon-emission-absorption`.
8. `subshells` **Orbitals, subshells and radial nodes** (atomic orbital, l,
   s p d f, radial nodes n − l − 1, Figure 6.20, the shapes). Introduces
   `angular-momentum-quantum-number`; uses `wavefunction-probability`,
   `principal-quantum-number-shells`.
9. `orientation` **Orientation and degenerate orbitals** (m_l, 2l + 1,
   Figure 6.21, Figure 6.22 and degeneracy). Introduces `magnetic-quantum-number`;
   uses `angular-momentum-quantum-number`.
10. `spin` **The spin quantum number** (fine structure, m_s = ±½, Figure 6.23).
    Introduces `spin-quantum-number`.
11. `pauli` **The Pauli Exclusion Principle** (the principle, Table 6.1).
    Introduces `pauli-exclusion-principle`; uses the four quantum numbers.
12. `worked-examples` **Working with quantum numbers**: Examples 6.7
    (`ex-shells-subshells`), 6.8 (`ex-max-electrons`), 6.9 (`ex-orbital-table`),
    each with its Check Your Learning inline. Introduces `working-with-quantum-numbers`.

`{index:…}` markers are plain names; `{term:…}` are `<strong>`. The
`[ref:fs-idp30549440](module:m68732)` is "Example 6.5" as plain text. Link to
Learning notes (the double-slit cartoon, the uncertainty article, the
Schrödinger's cat story) are dropped and named in `notes`. Errata kept as
printed and named in `notes`: "special distribution", Example 6.7's "*m* can
have values", the key of fs-idm127368704's m₁, and fs-idm68696640's ν for
velocity; the converter's stray `**` in "2**s" and in fs-idm5890656's key is
dropped.

## Figures

1. `photo-waterw` · Figure 6.16 · wave-particle-duality · kept photograph: the text points at it and it shows the thing (macroscopic interference) · still · none · none · none · 2D.
2. `sim-orbit-wave` · Figure 6.17 · de-broglie-wavelength · variation by slider: the reader drags λ and sees the wave fail to close on itself except at whole numbers, which the still cannot show · still (answers its slider, no clock) · λ slider (wavelength), 90 to 700 pm, default 104.7 pm (six waves, as the book draws), dashed specials at 2πr/n for n = 1 to 6 with a slight snap · headline "Six wavelengths of 104.7 pm fit the 628.3 pm orbit exactly, so the wave closes on itself." · readout 2πr = nλ with live numbers, λ in the wavelength hue, r in ink · no graph: the circle with the wave, a faint second lap that lies on the first only at a whole number · 2D.
3. `sim-double-slit` · Figure 6.18 · de-broglie-wavelength, wave-particle-duality · flow by animation: electrons arrive one at a time and the fringes emerge, which is the whole lesson of part (b) · moving: a clock runs the arrivals, 6 s then a hold, registers a cycle and has the transport · v slider (untyped, ink), 2 to 10 × 10⁶ m/s, default 10 (Example 6.6's electron) · headline counts the electrons arrived · graph beside: the hits counted along the screen with the |ψ|² curve they approach · flat: the lesson is the pattern on the screen, not the bench, so the book's borderline apparatus rule gives way (config) · fringe spacing drawn in proportion to λ, the geometry schematic, stated in the caption · readout λ = h/mv with λ in the wavelength hue and m in the mass hue.
4. `sim-de-broglie` · Sim · de-broglie-wavelength · variation by slider and choice: the book's electron and softball on one logarithmic wavelength axis beside the size of an atom and of a nucleus · still · particle choice (electron, proton, softball; the mass hue in the readout) and v slider (untyped) whose range follows the choice · headline states λ and what it compares with · the axis is the scene · 2D. Defaults reproduce Example 6.6; the softball at 35 m/s reproduces its Check Your Learning.
5. `fig-shells` · Figure 6.19 · principal-quantum-number-shells · faithful copy: standardisation only, nothing varies · still · none · no headline · none · 2D. The nucleus in ink with a plus sign, three shells, the increasing-energy arrow in the energy hue.
6. `sim-radial` · Figure 6.20 · angular-momentum-quantum-number, wavefunction-probability · shape in 3D and variation: a cutaway cloud of |ψ|² signed by colour above the flat radial graph, extended from the book's 1s, 2s, 3s to 2p, 3p and 3d so n − l − 1 is seen in general · still (answers its choice) · orbital choice (1s 2s 3s 2p 3p 3d) · headline states the orbital and its n − l − 1 nodes · graph below, radial probability against distance 0 to 1000 pm fixed, nodes as dashed circles · mathematical 3D (F.view3d, free orbit, idle spin, views "side" and "top", no ground) with a flat fallback of the graph alone.
7. `sim-orbital-shapes` · Figure 6.21 · magnetic-quantum-number, angular-momentum-quantum-number · shape in 3D: lobes the reader turns, which the book's perspective drawings ask the reader to imagine · still, a change of orbital morphs the surface · l choice (s p d f) and an orbital choice within it (one row per l, only the current one shown) · headline names the orbital, l and the 2l + 1 orbitals · none · mathematical 3D, free orbit, idle spin, views along x, y and z, axes drawn and named; lobe signs F.cat(0) and F.cat(1).
8. `sim-subshell-energies` · Figure 6.22 · magnetic-quantum-number (degeneracy), principal-quantum-number-shells · variation: a choice of hydrogen against a many-electron atom, the subshells sliding apart or together, which print can only state · still, the choice morphs · atom choice · headline states which orbitals share an energy · none; energy axis unnumbered as the book's · 2D. The many-electron state is the book's layout.
9. `fig-spin` · Figure 6.23 · spin-quantum-number · faithful copy, locked flat view of the two spinning electrons in the field with the book's labels · still · none · none · 2D. Electrons in `F.el('e-')`.

Unnumbered images: the orbital outline of fs-idm139949520 is on its card
(`figure`), and the key image of fs-idm153995968 is in its solution. The
tables of Example 6.9 are unnumbered `div.book-table`; the key table of
fs-idm24126560 is in its solution.

Judged and not built: an uncertainty Sim (Δx against Δp), since the section
states one estimate and the relation is a product the readout would only
restate; a 3D bench for 6.18, since the screen is the lesson.

## Colour

Binds `wavelength` (6.17, 6.18, the Sim), `mass` (the particle's m in the
readouts of 6.18 and the Sim), `energy` (6.19's arrow, 6.22's axis and levels,
the spin figure's energy note). Ink: v, p, Δx, Δp, ħ, ψ, the quantum numbers,
r and every radius and distance. `F.cat(0)`/`F.cat(1)` for the two signs of ψ;
`F.el('e-')` for electrons.

## Exercises

- Inline: `cyl1` Example 6.6 (softball, 1.9 × 10⁻³⁴ m, number), `cyl2`
  Example 6.7 (3p, 5f, 2s, open), `cyl3` Example 6.8 (n = 4, number), `cyl4`
  Example 6.9 (five 3d orbitals, number 5).
- End, keyed: fs-idp68295120, fs-idm127368704, fs-idm226431552,
  fs-idm5890656, fs-idm153995968 (image solution), fs-idm139949520 (image on
  card), fs-idm130545344 (12, number), fs-idm24126560 (table solution).
- End, unkeyed conceptual, suggested approach marked AI: fs-idm185773696,
  fs-idp16534928, fs-idm65709728, fs-idm109521552, fs-idm109481472,
  fs-idm165892704, fs-idm68696640.
- Nothing moves in or out.

## Wanted at chapter level

- variables `λ` → 6.3-de-broglie
- variables `m` → 6.3-de-broglie
- variables `v` → 6.3-de-broglie
- variables `p_momentum` → 6.3-de-broglie
- variables `r` → 6.3-de-broglie
- variables `Δx` → 6.3-uncertainty
- variables `Δp_x` → 6.3-uncertainty
- variables `hbar` → 6.3-uncertainty
- variables `ψ` → 6.3-quantum-model
- variables `E` → 6.3-quantum-model
- variables `ΔE` → 6.3-shells
- variables `n_quantum` → 6.3-shells
- variables `n_i` → 6.3-shells
- variables `n_f` → 6.3-shells
- variables `l_quantum` → 6.3-subshells
- variables `m_l` → 6.3-orientation
- variables `m_s` → 6.3-spin
- equations `eq-de-broglie` → 6.3-de-broglie
- equations `eq-de-broglie-orbit` → 6.3-de-broglie
- equations `eq-uncertainty` → 6.3-uncertainty
- equations `eq-energy-time-uncertainty` → 6.3-uncertainty
- equations `eq-schrodinger` → 6.3-quantum-model
- equations `eq-hydrogen-transition` → 6.3-shells
- glossary anchors: Heisenberg uncertainty principle → 6.3-uncertainty; wavefunction, quantum mechanics, electron density → 6.3-quantum-model; principal quantum number, shell → 6.3-shells; atomic orbital, secondary (angular momentum) quantum number, subshell, s orbital, p orbital, d orbital, f orbital → 6.3-subshells; magnetic quantum number, degenerate orbitals → 6.3-orientation; spin quantum number → 6.3-spin; Pauli exclusion principle → 6.3-pauli
- concept `working-with-quantum-numbers`: its evidence is Examples 6.7 to 6.9 and exercises fs-idm226431552, fs-idm5890656, fs-idm139949520, fs-idm24126560; no change needed if already so.

### Applied by the chapter pass (2026-09-28)

Every variable and equation anchor above is written. Glossary rows carry no anchor field, so the glossary line is not written; the seven terms that carried HTML are now plain words. The evidence of `working-with-quantum-numbers` already names Examples 6.7 to 6.9 and the four exercises, and is unchanged.
