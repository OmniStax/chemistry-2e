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

- sim-decay · Figure 16.2 · spontaneity-and-rate · rebuilt 2026-11-14: variation by slider. The book's still graph shows one week, where U-238 looks as if it never decays; the reader stretches the time shown from an hour to ten billion years and watches each isotope fall in its turn, Tc-99m within hours and U-238 only over billions of years, so both decays are spontaneous and only their rates differ (the paragraph's point) · arrows: none · still: the slider is the span of time shown, a zoom, and no clock runs · slider time shown (`time`, logarithmic, 1 hour to 11 billion years; detent at 1 week, the book's caption, the opening value; dashed circles at the two half-lives, 6.01 h and 4.47 billion years) · headline "After 7.0 days, 3.8 × 10⁻⁷ % of the Tc-99m and 100 % of the U-238 remain." with the two percentages in the isotopes' referent colours · the graph is the figure: percent remaining 0 to 100, time 0 to the span in hours, days or years as the span needs (a named zoom: the axis follows the slider, `nice` ticks); a half-life inside the span is marked on its curve, a hollow dot at 50 % and a dashed drop · 2D, a graph (book rule) · the two curves in their referent colours, a key above the frame (the book's) · readout one line per isotope, fraction remaining = (½)^(t/t½) with the live span and half-life · replaces the faithful copy of 2026-10-05, which drew the week in days and added nothing but the corrected axis
  works: read off the image: y axis "Amount of isotope remaining (%)" 0 to 100 by 10; x axis "Time (hours)" 0 to 7; U-238 a flat line at 100; Tc-99m falling from 100 through about 47 at 1 and 20 at 2 to about 1 at 6; key at the upper right, U-238 then Tc-99m. The image's curve has a half-life near 0.9 on its axis, which matches neither its "hours" (the text's six hours) nor the caption's week (`c-fig-days`); the figure draws both curves from the half-lives the text gives, 6.01 h for Tc-99m (the text's "about six hours") and 4.47 × 10⁹ years for U-238 ("more than four billion years") · must hold: (1) both curves start at 100 % at time 0; (2) each curve reads 50 % at its own half-life, and the hollow dot sits on the curve there; (3) at the one-week detent Tc-99m is below 1 % after about two days and U-238 reads 100 %, as the caption says; (4) U-238 stays at 100 % to the stroke's width for every span under about ten million years; (5) the readout's fractions are the curves' end values divided by 100; (6) the time axis title names the unit its ticks are in
- fig-carbon · Figure 16.3 · spontaneity-and-rate · kept photograph with its two structure drawings: the text points at it and the lesson is the slowness of the change, not the lattices (taught in 10.5 and 18.4), so a 3D redraw adds no view the passage needs · photo
- sim-gas-flasks · Figure 16.4 · dispersal-of-matter-and-energy, expansion-work, first-law-of-thermodynamics · rebuilt flat 2026-11-14: flow by animation. The book shows the closed and the open state; here the atoms wander through the open valve until each flask holds about half, and a trace of the right flask's count shows them settle round fifteen and never all return · arrows: kinematic (the gas crossing), so moving · moving: the atoms run straight and leave the glass in a random direction on the clock; no hold, no end · choice valve (closed, open; closing puts all thirty atoms back in the left flask, opening lets them spread; opens on open with the gas just released) · headline "12 of the 30 atoms are in the right flask." · graph below: atoms in the right flask (0 to 30, ink) against time (unnumbered: the seconds are the drawing's), a dashed level at the even split · 2D (book rule, root 28.5): the 3D flasks were small, their labels and view buttons sat on the glass and the atoms hid one another; a section through two round flasks shows every atom · argon by `F.el('Ar')`, thirty atoms as the book draws; "left flask" and "right flask" with their counts under each flask, "valve" once; hover names on atoms, flasks and valve · readout $w = -P\Delta V = 0$ and $\Delta U = q + w = 0 + 0 = 0$ on two lines, the text's own two equations; no note
  works: parts: two round glass flasks of one size side by side, joined at their equators by a short straight tube; a stopcock (valve) in the middle of the tube, its plug across the tube, a knob on top; thirty identical gas atoms · flow: with the valve closed the atoms move only inside the left flask (and the tube up to the plug); with it open they pass through the tube in both directions, one at a time, and spread through both flasks · must hold: (1) the tube joins the two flasks at their centres' height and opens into both; (2) a closed plug blocks the tube, an open one leaves its bore in line with the tube; (3) all thirty atoms start in the left flask and the right one is empty; (4) every atom stays inside the glass; (5) after the valve opens the counts drift to about fifteen each and fluctuate there, and the right flask's count never returns to zero; (6) the counts under the flasks add to thirty and match the trace · read off the image: two panels joined by "Spontaneous" (right) and "Nonspontaneous" (left) arrows; left panel thirty spheres in the left flask, the right flask empty, the stopcock with a round knob; right panel the stopcock handle turned flat, fourteen spheres in the left flask and fourteen in the right with two in the tube. The caption and text say "evenly distributed"; no numbers. The alt text says nothing different.
- sim-heat-flow · Figure 16.5 · dispersal-of-matter-and-energy, heat-flow · kept and fixed 2026-11-14: flow by animation and variation by slider. The reader sets the two starting temperatures; the objects stand apart, are pushed into contact, and heat crosses from the hotter to the colder while the two temperatures close on one value · arrows: kinematic (heat flowing from X to Y), so moving · moving: one minute apart, then ten minutes in contact (about 7 s of model time), then holds · sliders T_X (300 to 400 K, default 350 K) and T_Y (250 to 350 K, default 290 K); a dashed circle on each at the other's value, where no heat flows; set the other way round, heat flows from Y to X · headline names the stage: apart, heat flowing (which way), or equal temperatures · graph below: T_X and T_Y against time, one curve per object in its referent colour, contact a dashed vertical, the shared final temperature a dashed level · 2D, two blocks with no shape to turn · objects X and Y are referents (bodies and curves in referent colours, never a warm-to-cold tint, book `COLOR.md`); the heat arrow over the contact in `energy`, its length the temperature difference, gone when they match; packets of heat cross the contact at a rate falling with the difference · readout $q_X = …$ kJ and $q_Y = -q_X = …$ kJ on two lines, each object's heat capacity 1.00 kJ/K, which the caption states; clock-driven, so never highlighted; no note
  works: parts: two blocks of one size, X on the left and Y on the right; apart first, then face to face; one heat arrow over the face they share · flow: heat passes from the hotter block into the colder through the shared face; nothing else moves · must hold: (1) the blocks are alike and drawn the same size; (2) apart at first, with T_X > T_Y written for the defaults, as the left panel; (3) in contact, the arrow points from the hotter block to the colder and shrinks as the difference closes; (4) T_X falls and T_Y rises to the same final value, their mean for alike blocks; (5) q_X = −q_Y at every moment, and q_X is negative while X is the hotter; (6) equal temperatures give no arrow and no change · read off the image: left panel, a red square "X" and a blue square "Y" apart over "T_X > T_Y"; right panel, the squares touching with a red-to-blue gradient, "Heat" and a white arrow pointing from X into Y, "X and Y in contact". No numbers; the figure's temperatures and heat capacities are its own, as the caption says.
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

Applied by the chapter pass (2026-10-05): the nine anchors as listed; the `ref` already set on T_X, T_Y, q_X and q_Y kept. “spontaneous change” added to the terms of `spontaneous-process` through `ch11/book-rows.json` and `ost merge chemistry-2e 11`.
