# Plan: 16.1 Spontaneity (m68816)

Written 2026-10-05 before the build and left for review, as `ch16/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, five numbered figures (16.2 to 16.6, 16.6 inside Example 16.1), no table, one worked example (16.1) with its Check Your Learning, no boxed note, no Link to Learning, five end-of-section items (chapter exercises 1 to 5).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `spontaneity` | Spontaneous and nonspontaneous processes (our own, for the opening; Figures 16.2, 16.3) | introduces `nonspontaneous-process`, `spontaneity-and-rate`; uses `spontaneous-process`, `reaction-rate`, `phase-diagram` |
| `dispersal` | Dispersal of Matter and Energy (the book's header; Figures 16.4, 16.5) | introduces `dispersal-of-matter-and-energy`; uses `spontaneous-process`, `ideal-gas`, `expansion-work`, `first-law-of-thermodynamics`, `internal-energy`, `heat-flow`, `temperature` |
| `ex-redistribution` | Example 16.1 · Redistribution of Matter during a Spontaneous Process (Figure 16.6) | reinforces `dispersal-of-matter-and-energy`; uses `sublimation`, `condensation`, `diffusion` |

## Figures

- sim-decay · Figure 16.2 · spontaneity-and-rate · standardisation only, so a faithful copy: two decay curves on the book's axes, percent remaining (ink, a rating) against time (`time`), one curve per isotope in its referent colour, each named at its end · arrows: none · still, nothing in the text varies; no sliders, no readout, no transport · no controls · no headline (a faithful copy) · the graph is the figure · 2D, a graph (book rule) · time in days, 0 to 7, the week the caption names, and the Tc-99m curve drawn from the 6.0-hour half-life the text gives (the book's axis reads hours, which its own curve and caption contradict; `notes` says so)
- fig-carbon · Figure 16.3 · spontaneity-and-rate · kept photograph with its two structure drawings: the text points at it and the lesson is the slowness of the change, not the lattices (taught in 10.5 and 18.4), so a 3D redraw adds no view the passage needs · photo
- sim-gas-flasks · Figure 16.4 · dispersal-of-matter-and-energy, expansion-work, first-law-of-thermodynamics · flow by animation and depth: the book shows the closed and the open state; here the reader opens the valve and watches the atoms wander through the tube until both flasks hold about half, and never all return · arrows: kinematic (the book's "Spontaneous" and "Nonspontaneous" arrows are notation between states, but what the picture asks the reader to imagine is the gas moving across, so the floor is the moving tier) · moving, the atoms travel continuously on the clock, the transport runs it · valve (a choice, closed or open; closing puts all thirty atoms back in the left flask with the right one empty, opening lets them spread) · headline "12 of the 30 atoms have crossed into the right flask." · strip beneath: the thirty atoms as one bar split into the left and right flasks' counts, an even-split tick · physical 3D, a particle picture (book rule): two round glass flasks joined by a tube and valve on a bench, pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the atoms already move, views front and above · the gas given an identity, argon by `F.el('Ar')` (a monatomic gas close to ideal), thirty atoms as the book draws; "left flask" and "right flask" labelled once each, hover names on atoms, flasks, tube and valve · readout $w = -P\Delta V = 0$ and $\Delta U = q + w = 0 + 0 = 0$, true in every state since the gas expands into a vacuum in an isolated system; no note
- sim-heat-flow · Figure 16.5 · dispersal-of-matter-and-energy, heat-flow · flow by animation and variation by slider: the book shows the two objects apart and then in contact with one heat arrow; here the reader sets the two starting temperatures and watches heat cross the contact while the two temperatures close on one value · arrows: kinematic (heat flowing from X to Y), so moving · moving, heat flows over ten minutes of model time on the clock (about 6 s), then holds · sliders T_X (temperature, 300 to 400 K, default 350 K) and T_Y (temperature, 250 to 350 K, default 290 K); the book prints no numbers, so the defaults only keep T_X > T_Y; set the other way round, the heat flows from Y to X and the readout follows · headline "Heat flows from X to Y: X has cooled to 338 K and Y has warmed to 302 K." · graph below (a horizontal scene): T_X and T_Y against time, one curve per object in its referent colour, a dashed level at the shared final temperature · 2D, a heat-flow strip; the objects are blocks with no shape to turn · objects X and Y are referents (bodies and their curves in referent colours; temperature only on symbols, sliders and the axis, never as a warm-to-cold tint, book `COLOR.md`); the heat arrow above the contact in `energy` and small packets of heat in `energy` crossing the contact at a rate that falls with the temperature difference; X, Y and their temperatures labelled under each block · readout $q_X = …$ kJ, $q_Y = -q_X = …$ kJ, with each object's heat capacity 1.00 kJ/K, which the caption states; clock-driven, so never highlighted; no note
- fig-process · Figure 16.6 · dispersal-of-matter-and-energy · kept photographs (a), (b), (c): the example's three parts point at them · photo

Extra simulations: none. Figure 16.4 and 16.5 are not folded: each sits beside its own paragraph, and a choice between matter and energy would hide one of the two pictures the text compares.

## Tables

None.

## Types bound

`time` (Figure 16.2's axis and Figure 16.5's), `energy` (q, w, ΔU, q_X, q_Y, the heat arrow), `pressure` (P), `volume` (ΔV), `temperature` (T_X, T_Y, the sliders and the axis). Percent remaining and counts of atoms stay ink; argon by `F.el`.

## Referents

`tc-99m` and `u-238` (sim-decay, and the text's two isotopes); `object-x` and `object-y` (sim-heat-flow, the text's objects X and Y; T_X, T_Y, q_X, q_Y take `ref` so their subscripts wear the objects' colours).

## Exercises

Check Your Learning after Example 16.1, host `ex-redistribution`, open answer from the book. Five end-of-section items: three keyed (fs-idp114103472, fs-idp1018800, fs-idm103719792), two unkeyed conceptual kept with an AI-marked suggested approach (fs-idp120021296, fs-idp158359616). Nothing left out, nothing moved.

## Left out

Nothing of the prose. Erratum kept as printed: "(*P* = 0). (Figure 16.4)." with its stray full stop.

## Wanted at chapter level

- variables `16.1/P` → 16.1-dispersal
- variables `16.1/w` → 16.1-dispersal
- variables `16.1/ΔV` → 16.1-dispersal
- variables `16.1/ΔU` → 16.1-dispersal
- variables `16.1/q` → 16.1-dispersal
- variables `16.1/T_X` → 16.1-dispersal
- variables `16.1/T_Y` → 16.1-dispersal
- variables `16.1/q_X` → 16.1-dispersal
- variables `16.1/q_Y` → 16.1-dispersal
- concepts `spontaneous-process`: add the glossary term "spontaneous change" (16.1's glossary; the concept is 11.1's)
