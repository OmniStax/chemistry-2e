# Plan: 2.2 Evolution of Atomic Theory (m68687)

Source: `source.md`, converted with `python3 tools/convert.py 2.2`. Status: applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins (`config.md`); left here for review.

Four learning objectives, five numbered figures (2.6 to 2.10), one display equation (the electron's mass), no worked example and no Check Your Learning, three Link to Learning notes, five end-of-chapter exercises (three keyed), six glossary terms. One page.

## Sub-concepts (page headers)

1. `cathode-ray` **Thomson’s cathode ray and the electron**: the opening question, the cathode ray tube, Figure 2.6, Thomson’s proposal and the word “electron”. Introduces `discovery-of-the-electron`; uses `daltons-atomic-theory`.
2. `oil-drop` **Millikan’s oil drop experiment**: the oil drops, Figure 2.7, the multiples of 1.6 × 10⁻¹⁹ C and the mass of the electron (`eq-electron-mass`). Introduces `fundamental-charge`; uses `discovery-of-the-electron`.
3. `atom-models` **Early models of the atom**: the plum pudding and Saturn models, Figure 2.8. Uses `discovery-of-the-electron`.
4. `gold-foil` **Rutherford’s gold foil experiment**: α particles, the foil, the quotation (its footnote kept at the end of the block), Figure 2.9 + 2.10, the deductions and the two conclusions. Introduces `nuclear-model-of-the-atom`.
5. `nucleus` **The nuclear model of the atom**: the model, the proton. Reinforces `nuclear-model-of-the-atom`.
6. `isotopes` **Isotopes**: mesothorium, Soddy. Introduces `isotopes`; uses `daltons-atomic-theory`.
7. `neutron` **The neutron**: Chadwick and the neutron. Introduces `subatomic-particles`; reinforces `isotopes`, uses `nuclear-model-of-the-atom`.

The three Link to Learning notes (Thomson’s voice, a Rutherford simulation, the PhET Rutherford Scattering simulation) are dropped and named in `notes`; the last is the trigger for the section’s own scattering figure. `{index:…}` markers are plain words. Objectives, summary (to `summary_html`) and glossary go to the tables.

## Figures

1. `sim-cathode-ray` · Figure 2.6 · discovery-of-the-electron · value add: flow by animation (electrons stream from the cathode) and variation (the plates and magnets switched, the cathode metal changed) · moving: the electrons travel down the tube continuously, no scrubber, since the beam is a flow with a clock · three choices: plates (uncharged, positive plate above, positive plate below), magnets (off, on), cathode metal (copper, iron, zinc); no slider, since each is a discrete state (26.1) · headline says where the beam strikes the scale and why · no graph · 2D: a flat side view reads the deflection better than a bench, the tube being a line the beam bends away from. The photographs (a) and (b) are in the original the figure swaps to; the beam is drawn in the electron’s palette colour `F.el('e-')` (the book’s yellow is a drawing convention, and a beam of electrons is electrons); the plates’ signs are in the charge hue; the charge-to-mass ratio is ink. Balanced plates and magnets leave the beam straight, which is how Thomson measured the ratio; the plates’ electric deflection and the magnets’ are drawn equal.
2. `sim-oil-drop` · Figure 2.7 · fundamental-charge · value add: motion (the drop falls, hovers or rises) and variation (the five drops of the book’s table, the field strength) · moving: the drop drifts under gravity and the field for 5 s, then holds and repeats · a choice of drop (A to E, the book’s table), one slider, the field strength between the plates (0 to 40 kN/C, untyped, ink), with a dashed circle at the field that holds the chosen drop still · headline states the drop’s charge as a multiple of 1.6 × 10⁻¹⁹ C and whether it falls, hovers or rises · beside it a number line of charge with a tick at every multiple of e and the five drops marked, in the charge hue · readout $\kQ = n\ke$ with the live numbers · 2D: Millikan’s chamber is a vertical stack read in section, and the motion is one-dimensional. All five drops are drawn with one mass, so the hover field falls as 1/n; the excess electrons are drawn in the drop as `F.el('e-')` dots.
3. `fig-atom-models` · Figure 2.8 · photograph and drawing kept: the book’s analogy (plum pudding, Saturn) is the point of the paragraph and the photographs are what the analogy rests on; the two model drawings are carried live by the scattering figure’s model choice. Caption and credit kept.
4. `sim-gold-foil` · Figure 2.9 + 2.10 · nuclear-model-of-the-atom · value add: shape in 3D (the ring screen around the foil, the source behind its lead block), flow by animation (α particles fly and the screen flashes where they land), variation (atom model, target element, α energy) · moving: continuous; the bench fires about forty α particles a second, the flat panel beneath replays nine particles through a magnified patch of foil on a 5 s loop · three choices: atom (Rutherford atom, plum pudding atom), element (gold, silver, zirconium, calcium: 79, 47, 40, 20 protons, the PhET numbers of the exercises), α energy (lower, higher) · headline on the panel counts how the nine paths end; the readout writes the nucleus’s charge $\kQ = Z\ke$ in the charge hue, and its note tallies the flashes (straight through under 10°, deflected, turned back past 90°) since the run began · archetype 5: 3D bench above, flat panel beneath · physical 3D, a bench with a ground: pitch bounded to 0.15–1.35 rad (never from beneath), yaw free, views “bench” and “above”, spin off since the particles already move, zoom; without WebGL the flat panel carries the figure alone. Scale: the nucleus is drawn and acts hundreds of times larger than it is (its distance of closest approach is 0.028 of the atom’s diameter for gold at the lower energy), stated in the caption per 28.4, so that a backward bounce comes once in a minute or so rather than once in hours; plum pudding atoms spread the same positive charge through the whole atom and deflect by a few degrees at most. Colours: gold foil and nuclei `F.el` of the chosen element, α particles `F.el('He')`, electrons `F.el('e-')`, the screen’s flashes `GLOW`, a physical fact (zinc sulfide glows green) named in a constant; the lead block and bench in ink. Labels: four in the scene (source, beam, foil, screen) and three on the panel (α particles, nucleus or positive sphere, electrons), kinds once each.

Photographs: Figure 2.8 kept (above). Figure 2.6 (a) Thomson and (b) Braun’s tube are reached through the original of `sim-cathode-ray`. No unnumbered image.

Extra simulations, considered and left: a particle table of charge and mass (Table 2.2 is in 2.3); a “build an atom” (2.3 owns it); a Saturn-model atom in the scattering figure (the exercises and the text test only plum pudding against Rutherford, and a ring of electrons deflects α particles no more than the pudding’s).

## Exercises

- `e1` fs-idp107697296 · exercise · Understand · keyed, open · isotopes, daltons-atomic-theory.
- `e2` fs-idm71935680 · exercise · Understand · unkeyed conceptual, kept with an AI-marked approach · subatomic-particles.
- `e3` fs-idm21866144 · exercise · Understand · keyed, open · subatomic-particles.
- `s1` fs-idp23410688 · simulation-exercise · Evaluate · unkeyed, prompt rewritten against `sim-gold-foil` (plum pudding atom, lower then higher energy), AI-marked approach · nuclear-model-of-the-atom.
- `s2` fs-idm61727056 · simulation-exercise · Evaluate · keyed, prompt rewritten against `sim-gold-foil` (Rutherford atom; calcium for 20 protons, zirconium for 40, then silver and gold), the book’s answer · nuclear-model-of-the-atom.

No inline check (the section has no worked example). No exercise moves in or out.

## Colour

Binds `charge` only: the plates’ signs of Figure 2.6, the drop charges and number line of Figure 2.7, the nuclear charge of Figure 2.9 + 2.10. The electron’s mass is not read out by a figure, so `mass` stays unbound here. Particles take the element palette (`e-`, `He`, the target element), never the charge hue.

## Wanted at chapter level

- equations eq-electron-mass → 2.2-oil-drop
- variables e (2.3) is introduced in words here first; its anchor stays with 2.3, as the chapter decides.
- elements.ts has no entry for Zr (zirconium) or Pb (lead); zirconium falls back to “other” in `sim-gold-foil`.

**Applied by the chapter pass (2026-09-28).** `eq-electron-mass` anchored at `2.2-oil-drop`; `e` anchored with 2.3 at `2.3-units`. The element palette now carries Zr and Pb, so zirconium in `sim-gold-foil` takes its own colour and no longer falls back to "other".
