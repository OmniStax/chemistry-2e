# Plan: 12.2 Factors Affecting Reaction Rates (m68787)

Written 2026-10-05 before the build and left for review, as `ch12/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

One objective, two numbered figures (12.6, 12.7, both photographs), no example, no table, three Link to Learning notes (dropped), five end-of-section items (chapter exercises 7 to 11), one glossary term (catalyst, already a term of its concept).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `factors` | Five factors that affect reaction rates (the opening paragraph) | uses `reaction-rate` |
| `nature` | The chemical nature of the reacting substances (the book's header) | introduces `chemical-nature-and-rate`; uses `reaction-rate` |
| `states` | The physical states of the reactants (the book's header; Figure 12.6) | introduces `surface-area-and-rate`; uses `area`, `reaction-rate` |
| `temperature` | Temperature of the reactants (the book's header) | introduces `temperature-and-rate`; uses `temperature`, `reaction-rate` |
| `concentration` | Concentrations of the reactants (the book's header; Figure 12.7, the Sim) | introduces `concentration-and-rate`; uses `concentration`, `reaction-rate`; reinforces `temperature-and-rate` |
| `catalyst` | The presence of a catalyst (the book's header) | introduces `catalyst`; uses `reaction-rate` |

## Figures

- sim-collisions · Sim · temperature-and-rate, concentration-and-rate, reaction-rate · the Link to Learning's PhET Reactions & Rates, answered by our own many-collisions box: intuition and variation by slider, the reader sees the two factors the section names at the scale of molecules, more molecules meeting more often and hotter molecules reacting in more of their meetings, and the concentration of ozone falling on a strip beneath, its secant the average rate of 12.1 · arrows: none (the molecules themselves move) · moving: the molecules travel and react on a clock, a run of 5.0 s that holds 1.2 s and starts again; each run is computed whole when a slider moves, so scrubbing is exact in either direction · sliders: T (`temperature`, 200 to 600 K, default 300 K), [NO]₀ (`concentration`, 0.50 to 2.00 M, default 1.00 M), [O₃]₀ (`concentration`, 0.50 to 2.00 M, default 1.00 M); no choice · headline "14 collisions of NO with O₃ so far, and 6 of them reacted." with the live counts · strip beneath: [O₃] against t (0 to 5 s, 0 to 2.0 M, fixed at the slider maximum), the stepped curve in `concentration`, the secant from the start to now dashed in `rate` · 2D, rebuilt flat on 2026-11-14 (book rule for particle pictures): the 3D box was small, carried front/corner view buttons, hid molecules behind one another, and turning it showed nothing; flat, every molecule is seen and the box fills the stage's width · NO, O₃, NO₂ and O₂ drawn from their atoms by `F.el` (N and O) and keyed once in a legend above the box; a reacting collision leaves a fading ring where it happened; hover names every molecule · readout rate = −Δ[O₃]/Δt with the run's numbers and units, note "Each molecule drawn stands for 0.050 M of its gas; real molecules collide billions of times a second." (root rule 28.4: the scale and the slowing stated) · model: one seeded set of starting places, directions and speed draws for molecule i whatever the sliders, so raising T speeds the same molecules up by √(T/300 K) and adding a reactant only adds molecules (the comparison is the factor, not the dice); speeds from the 2D Maxwell-Boltzmann distribution at T with the real molar masses; every pair bounces elastically except NO meeting O₃ with enough energy of approach along the line of centres (a model threshold, unnamed on the page, since activation energy waits for 12.5), which reacts; products fly on with the reactants' velocities
  works: parts: a closed rectangular container; NO (N blue joined to O red), O₃ (three O, bent), NO₂ (N between two O, bent), O₂ (two O) · flow: molecules fly straight, bounce off the walls and off each other; an NO and an O₃ that strike hard enough leave as NO₂ and O₂ · must hold: (1) no molecule outside the walls; (2) the count of O₃ drawn equals [O₃] on the strip ÷ 0.050 M at every frame; (3) the strip's step down comes at the frame of the reacting collision and its ring; (4) the readout's numbers are the strip's (the secant's two ends); (5) at the same concentrations a higher T gives more collisions and a larger fraction reacting; (6) every molecule kind is in the legend. · read off the image: none (the book draws no figure here; the PhET it replaces is a link).
- fig-acid-dissol · Figure 12.6 · surface-area-and-rate · kept photograph pair, the text points at it and it shows the thing the passage is about; the bubbles are a photograph, no arrows · photo; the caption's unbalanced Fe + HCl equation carried as printed
- fig-statue · Figure 12.7 · concentration-and-rate · kept photograph, the text points at it · photo

Extra simulations: none. Surface area is shown by the photograph better than by a drawing; the catalyst is 12.7's to draw, where its reaction diagram is.

## Types bound

`temperature` (T, the 10 °C of the doubling), `concentration` ([NO]₀, [O₃]₀, [O₃]), `rate` (the readout and the secant), `time` (Δt, the strip's axis). `area` is a concept word only (surface area). Collision counts and the percent of oxygen in air stay ink; atoms `F.el`.

## Exercises

No inline item. End of section, chapter numbers 7 to 11:
- e1 fs-idm30837936 (7), keyed, open with the book's answer.
- e2 fs-idm86018304 (8), unkeyed conceptual, AI-marked approach.
- fs-idm66513728 (9), keyed PhET single-collision item on the angle of a shot: held; this page's box has no aimed shot, and the orientation of a collision is 12.5's.
- s4 fs-idm66455280 (10), unkeyed PhET many-collisions item: `simulation-exercise` set against sim-collisions, its prompt rewritten to name the Sim's sliders, AI-marked approach.
- fs-idm49710224 (11), keyed PhET item with 15 A and 10 BC: held; its key describes PhET's reversible A + BC ⇌ AB + C settling into a mixture, which this box (NO + O₃ going to products) does not show, so the key cannot be checked against it.

## Left out

The three Link to Learning notes (the cesium video, the phosphorus video, the PhET Reactions & Rates interactive, which the Sim answers). Errata as printed: Figure 12.6's caption equation Fe(s) + HCl(aq) ⟶ 2FeCl₂(aq) + 3H₂(g).

## Wanted at chapter level

- variables row 12.2 · T (reuse 12.5's meaning) for the Sim's slider and readout, if the chapter pass gives figure-only symbols rows
- variables rows 12.2 · rate and Δt (reuse 12.1's meanings) for the Sim's readout, on the same terms
- ch12/COLOR.md: 12.2 binds `time` too (Δt and the strip's time axis); its line reads "temperature, concentration, rate only if a Sim draws them", and the Sim draws all four
- No anchors (12.2 states no form), no concept, edge or symbol fix.

Applied by the chapter pass (2026-10-05): no figure-only variables rows; the Sim's T, rate and Δt cards fall back to the chapter's one meaning of each (12.5's and 12.1's). `COLOR.md` now binds `time` in 12.2 and names the box as the chapter's many-collisions Sim; `config.md` says so too.
