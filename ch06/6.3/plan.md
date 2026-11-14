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
2. `sim-orbit-wave` · Figure 6.17 · de-broglie-wavelength · variation by slider: the reader drags λ and sees the wave fail to close on itself except at whole numbers, which the still cannot show · arrows: the radius arrow, symbolic · still (answers its slider, no clock) · λ slider (wavelength), 90 to 660 pm, default 104.7 pm (six waves, as the book draws), dashed specials at 2πr/n for n = 1 to 6 with a slight snap · headline says how many wavelengths fit and whether the wave closes · readout n = 2πr/λ as one chain with the live numbers · no graph: the circle with the wave and a faint second lap that lies on the first only at a whole number, and the same lap unrolled beside it, where the wave's end is seen to meet or miss its start · 2D.
   works: parts: a nucleus at the centre; a dashed circular orbit of radius r about it; a wave drawn about the orbit as its midline, running once round; a radius arrow from the nucleus to the orbit; one wavelength marked · flow: none, the wave stands · must hold: (1) the wave's midline is the orbit; (2) at the opening the wave shows six whole wavelengths and joins its own start; (3) the second lap lies exactly on the first at every dashed circle of the slider and nowhere else; (4) the unrolled wave is the same wave, one circumference long, and its end sits on the midline exactly when the circle's wave closes; (5) n in the readout equals 2πr/λ · read off the image: six wavelengths round the orbit, "Radius r" on a dashed arrow from the nucleus, "Wavelength λ" marked between two neighbouring crests; the image gives no numbers, so r = 100 pm is ours and stated on the figure.
3. `sim-double-slit` · Figure 6.18 · de-broglie-wavelength, wave-particle-duality · flow by animation: the electron wave passes both slits and the electrons land one at a time until the bands emerge, which is the whole lesson of part (b); and variation: the speed sets λ, and the spacing of the wavefronts and of the bands follows · arrows: the book's two gold arrows show the electrons leaving the source, kinematic, drawn here as the moving wavefronts · moving: a clock runs the arrivals, 7 s then a hold, registers a cycle and has the transport · v slider (velocity), 4 to 10 × 10⁶ m/s, default 10 (Example 6.6's electron) · headline counts the electrons arrived and says what they show so far · graph beside: the hits counted along the screen with the |ψ|² curve they approach · flat: an apparatus is flat unless turning shows something (book rule), and here the lesson is the pattern on the screen · the band pattern is computed from the drawn geometry (path difference from the two drawn slits to each height of the drawn screen, over the drawn wavelength), so the fronts and the bands agree; the apparatus is not to scale, stated in the caption · readout λ = h/mv as one chain.
   works: parts: an electron source on the left with its mouth toward the barrier; a barrier with two narrow slits, one above the other; a screen beyond it, drawn edge on in the apparatus and again face on beside it, joined by guide lines; the counts at each height of the screen beside the face-on view · flow: the electron wave leaves the source, reaches the barrier, passes through both slits and spreads from each toward the screen; each electron is recorded on the screen as one dot · must hold: (1) wavefronts spread from the source's mouth and stop at the barrier, and new fronts start only at the two slits; (2) the fronts are one wavelength apart and their spacing grows as v falls; (3) the bands on the screen are horizontal, like the slits, brightest opposite the midpoint between the slits, and their spacing grows with the wavelength; (4) each electron is one dot, the first few look scattered and the bands show only as the count grows; (5) the bars count exactly the dots at their height, and the curve is the one the dots were drawn from; (6) no electron is drawn in flight through one slit · read off the image: (a) "Electron source", circular fronts from the source to a grey barrier with two horizontal slits, fronts from each slit overlapping on the way to a black screen with eight to nine horizontal bands; (b) the same source and barrier, three black screens left to right under an arrow "Time" with few scattered dots, more dots in rows, and dots in clear horizontal bands. The image names no speed or wavelength; the opening speed is Example 6.6's.
4. `sim-de-broglie` · Sim · de-broglie-wavelength · variation by choice and slider: the book's electron and softball on one logarithmic scale of lengths beside the size of an atom and of a nucleus, so the reader sees why only one of them shows wave behaviour · arrows: none · still · particle choice (electron, proton, softball) and v slider (velocity) whose range follows the choice · headline compares λ with the size of an atom · the axis is the scene · 2D. Defaults reproduce Example 6.6; the softball at 35 m/s reproduces its Check Your Learning.
   works: read off the image: no image. Example 6.6: m = 9.109 × 10⁻³¹ kg, v = 1.000 × 10⁷ m/s, λ = 7.27 × 10⁻¹¹ m, "the same order of magnitude as the size of an atom"; Check Your Learning: 100 g at 35 m/s, 1.9 × 10⁻³⁴ m. The atom at 10⁻¹⁰ m and the nucleus at 10⁻¹⁵ m are the book's (Chapter 2).
5. `fig-shells` · Figure 6.19 · principal-quantum-number-shells · kept as the book's drawing (photo). Reverted on 2026-11-14: the still redraw was the same picture restyled, with the energy arrow moved, and showed nothing the image does not.
6. `sim-radial` · Figure 6.20 · angular-momentum-quantum-number, wavefunction-probability · shape in 3D and variation by choice: the orbital as a lit solid with a quarter cut away, as the book draws it, the two cut faces painted with the sign of ψ and the density, radial nodes ringed, above the radial graph; extended from the book's 1s, 2s, 3s to 2p, 3p and 3d so that n − l − 1 is seen with l ≠ 0 · arrows: none · still (answers its choice, the orbitals crossfade) · orbital choice (1s 2s 3s 2p 3p 3d), opening on 3s, the book's orbital with the most nodes · no headline: the readout is the count · graph below: radial probability against distance, 0 to 1500 pm fixed for every orbital so the growth with n is read on it, the y axis unnumbered as the book's and each curve drawn to its own peak, nodes as dashed lines with their distances · mathematical 3D (F.view3d, no ground), each orbital scaled to fill the stage with a ruler in pm under it; the orbit is bounded to the views that look into the cut (yaw −0.95 to −0.2, pitch −0.5 to 0.7); no spin and no view buttons, since the cut faces are the lesson. The body is the contour of |ψ| at 0.18 of its outermost peak.
   works: parts: the nucleus; the orbital about it as nested shells or lobes, of which the quarter toward the reader is cut away; the two flat cut faces, which meet along the orbital's axis through the nucleus, coloured by the sign of ψ and deeper where the density is greater; a dashed ring on each face at each radial node; a ruler from under the nucleus outward along one face; below, the graph of probability against distance from the nucleus · flow: none · must hold: (1) 1s shows no ring, 2s one, 3s two, 2p none, 3p one, 3d none, the same as n − l − 1 in the readout; (2) the colour changes across every ring and nowhere else along a radius, and the lit surface has the colour of the face it bounds; (3) each ring's radius on the ruler is the distance of the matching dashed line on the graph, where the curve touches zero; (4) the s orbitals are round, 2p and 3p have two lobes along one axis; (5) the graph's largest hump is the outermost one, and it lies farther out as n grows · read off the image: three cut-away spheres, 1s small and one colour, 2s with a core of the other colour inside a shell, 3s with a core, a shell and an outer shell alternating; below each a graph, y axis "probability density", x axis "distance from nucleus", no numbers, with one, two and three humps touching zero between them, the outermost the tallest and widest, labelled 1s, 2s, 3s. Distances in pm are hydrogen's: nodes at 106 pm (2s), 101 and 376 pm (3s), 318 pm (3p).
7. `sim-orbital-shapes` · Figure 6.21 · magnetic-quantum-number, angular-momentum-quantum-number · shape in 3D: lobes the reader turns, which the book's perspective drawings ask the reader to imagine · arrows: the axes, symbolic · still, a change of orbital bends the surface into the next · subshell choice (s p d f) and an orbital choice whose buttons are the 2l + 1 orbitals of that subshell · no headline: the pressed buttons name the orbital · readout 2l + 1 with the count, and the values of mₗ · none · mathematical 3D, free orbit, idle spin since a path round the lobes shows their arrangement better than any one view, no view buttons; axes drawn and named at their tips, outside the lobes; lobe signs F.cat(0) and F.cat(1). The surface is one contour of |ψ| for the angular function with a hydrogen-like radial factor, which gives closed, rounded lobes as the book draws them.
   works: parts: the x, y and z axes through the nucleus, z up, each named at its positive end; the orbital's lobes about the nucleus, in two colours for the two signs of ψ · flow: none · must hold: (1) s is a sphere; (2) each p orbital is two lobes along the axis in its name; (3) d_xy, d_xz, d_yz have four lobes between the two axes named, d_x²−y² four lobes along x and y, d_z² two lobes along z and a ring in the xy plane; (4) neighbouring lobes have opposite colours; (5) the orbital row holds 1, 3, 5, 7 buttons, the 2l + 1 of the readout; (6) no axis name sits on a lobe · read off the image: sixteen drawings on x, y, z axes with z up: s; p_x, p_z, p_y; d_xy, d_xz, d_z², d_yz, d_x²−y²; f_x(x²−3y²), f_y(x²−z²), f_xz², f_z³, f_yz², f_xyz, f_y(3x²−y²). The image's f_y(x²−z²) is a combination of two others of its own seven; the figure draws f_z(x²−y²) in its place, so that the seven are independent.
8. `sim-subshell-energies` · Figure 6.22 · magnetic-quantum-number (degeneracy), principal-quantum-number-shells · variation by choice: hydrogen against a multi-electron atom, the subshells sliding together or apart, which print can only state · arrows: the energy axis, symbolic · still, the choice morphs · atom choice · headline states which orbitals share an energy · readout the order of the energies as one chain · none; energy axis unnumbered as the book's · 2D. The many-electron state is the book's layout.
   works: read off the image: an arrow E up the left; one line per orbital with the name under each group: 1s (1 line) lowest, 2s (1), 2p (3) a little above 2s, 3s (1), 3p (3), 3d (5), 4s (1) a little below 3d, 4p (3) highest; heights as fractions of the 1s to 4p span: 2s 0.43, 2p 0.49, 3s 0.79, 3p 0.84, 4s 0.94, 3d 0.98. Hydrogen's heights are (1 − 1/n²)/(1 − 1/16).
9. `fig-spin` · Figure 6.23 · spin-quantum-number · kept as the book's drawing (photo). Reverted on 2026-11-14: the still redraw thinned the book's bold moment arrows, drew the sense of spin less clearly, and added an energy ladder the text already states in words; it was not better than the image.

Unnumbered images: the orbital outline of fs-idm139949520 is on its card
(`figure`), and the key image of fs-idm153995968 is in its solution. The
tables of Example 6.9 are unnumbered `div.book-table`; the key table of
fs-idm24126560 is in its solution.

Judged and not built: an uncertainty Sim (Δx against Δp), since the section
states one estimate and the relation is a product the readout would only
restate; a 3D bench for 6.18, since the screen is the lesson.

Re-examined on 2026-11-14 against the book's images: 6.19 and 6.23 went back
to the book's drawings, 6.18 and 6.20 were rebuilt, and 6.17, 6.21, 6.22 and
the de Broglie Sim were kept and repaired.

## Colour

Binds `wavelength` (6.17, 6.18, the Sim), `mass` (the particle's m in the
readouts of 6.18 and the Sim), `velocity` (the v sliders of 6.18 and the Sim),
`length` (the radius and circumference of 6.17, the distance axis of 6.20, the
atom and nucleus of the Sim), `energy` (6.22's axis and levels). Ink: p, Δx,
Δp, ħ, ψ, the quantum numbers. `F.cat(0)`/`F.cat(1)` for the two signs of ψ;
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

## Derivations

- `de-broglie`, Bohr's quantization from the de Broglie standing wave · score 3 · not built: three moves, and the angular-momentum postulate it explains is never printed in 6.2.
- Example 6.8, n² orbitals and 2n² electrons in shell n · score 3 · not built: three moves, and the sum of the first n odd numbers is never stated in the book.
