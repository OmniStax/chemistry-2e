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

- sim-collisions · Sim · surface-area-and-rate, concentration-and-rate, temperature-and-rate, reaction-rate · rebuilt on 2026-11-16 as the reaction of Figure 12.6, iron in hydrochloric acid, Fe + 2H⁺ ⟶ Fe²⁺ + H₂, so that one picture carries the three factors a picture can teach (subdivision, concentration, temperature; exercise 7 asks for exactly these three of a metal in hydrochloric acid). Value add: comparison, variation and motion. Two vessels side by side: the left never changes (the 144 iron atoms in one piece, 1.0 M, 25 °C), the right holds the same 144 atoms cut into the pieces chosen in acid of the concentration and temperature set, so the factor changed is read against a fixed case; it opens on Figure 12.6's pair, one piece beside 16 pieces. The reader sees why each factor works: only the atoms on the outside of a piece can be struck (exposed atoms drawn solid, those inside pale, and the count of each above the vessel), more acid means more ions striking, and warmer acid means more of the strikes react · arrows: none (the ions themselves move) · moving: hydrogen ions fly and bounce, an ion that reacts stays on the iron as a hydrogen atom, the next on that piece leaves with it as H₂, which rises out, and an iron atom goes into the solution as Fe²⁺; a run of 6.0 s that holds 1.2 s and starts again, computed whole when a control moves, so scrubbing is exact · controls: pieces of iron (choice 1, 4, 16; the atoms slide apart into the new pieces), [HCl] (`concentration`, 0.5 to 2.0 M by 0.5, default 1.0 M), T (`temperature`, 5 to 35 °C by 5, default 25 °C) · headline "After 2.5 s, 19 iron atoms have reacted on the left and 40 on the right." with the live counts · graph beneath: iron atoms left in each vessel against t (0 to 6 s, 0 to 144, the whole of the iron), one stepped curve per vessel in the vessel's colour (`F.cat`) · 2D (book rule for particle pictures) · Fe and H by `F.el`; a legend names exposed Fe, inside Fe, H⁺, H₂ and Fe²⁺ (drawn smaller than the atom, as the ion is); hover names everything, the hydrogen atom held on the iron included · readout: rate = −Δ(iron atoms)/Δt for each vessel with the run's numbers, and a note with what the picture leaves out · model: hydrogen ion j has one seeded stream of draws whatever the settings and in both vessels; ions fly straight at a speed that goes as √T (kelvin), bounce off the walls, each other and the iron; an ion striking an iron atom reacts with a chance of 1 in 2 at 25 °C, doubled with each 10 °C, the section's rule of thumb, so 1 in 8 at 5 °C and every strike at 35 °C (stated in the note; the reason waits for 12.5); acid that reacts is replaced from above, so [HCl] holds through a run (stated in the note); each pair of ions costs a piece one atom, on even pieces with the first ion of the pair and on odd pieces with the second, so that the stoichiometry is kept and the count favours neither few pieces nor many; water and Cl⁻ are not drawn (stated). The seed is chosen so that over every setting more pieces, stronger acid or warmer acid never gives fewer atoms reacted at the end of the run
  works: parts: two vessels open at the top, each a window on the bottom of a tube of acid; the iron, 144 atoms in a 24 by 6 bar or cut into 4 pieces of 6 by 6 or 16 pieces of 3 by 3; H⁺ ions in the acid; H atoms held on the iron; H₂ molecules; Fe²⁺ ions · flow: H⁺ flies to the iron and either bounces or reacts; H₂ rises out of the top; Fe²⁺ drifts off into the acid; fresh H⁺ comes in at the top · must hold: (1) no ion inside a piece of iron or outside the walls; (2) only an exposed atom is ever struck or lost; (3) atoms left on the graph = atoms drawn in the vessel = 144 − Fe²⁺ drawn, at every frame; (4) the left vessel is the same at every setting; (5) with the right vessel set to 1 piece, 1.0 M, 25 °C the two vessels run alike; (6) from the opening state, more pieces, stronger acid and warmer acid each end the run with fewer atoms left, and fewer, weaker, cooler with more; (7) H₂ formed = half the ions that reacted, rounded down per piece; (8) the readout's numbers are the graph's; (9) every kind drawn is in the legend or has a hover name. · read off the image (Figure 12.6): (a) iron powder at the bottom of a tube of acid under a froth of bubbles, (b) one nail standing in acid with few bubbles; the caption names dilute hydrochloric acid and hydrogen gas, and the footnoted correction gives Fe + 2HCl ⟶ FeCl₂ + H₂. The photograph stays as Figure 12.6; the Sim draws its two cases as atoms.
  until 2026-11-16 this was a closed box of NO and O₃ (the many-collisions box answering the PhET link), with sliders for T, [NO]₀ and [O₃]₀. It was replaced because one run at a time gave the reader nothing to compare a setting against, its strip barely moved, and it left out subdivision, the factor the section photographs.
- fig-acid-dissol · Figure 12.6 · surface-area-and-rate · kept photograph pair, the text points at it and it shows the thing the passage is about; the bubbles are a photograph, no arrows · photo; the caption's unbalanced Fe + HCl equation carried as printed
- fig-statue · Figure 12.7 · concentration-and-rate · kept photograph, the text points at it · photo

Extra simulations: none. Surface area is now in the Sim, beside the photograph that shows the real thing; the chemical nature of the reactants would need a made-up barrier for each metal, and the catalyst is 12.7's to draw, where its reaction diagram is.

## Types bound

`temperature` (T, the 10 °C of the doubling), `concentration` ([HCl]), `rate` (the readout), `time` (Δt, the graph's axis). `area` is a concept word only (surface area). Counts of atoms and the percent of oxygen in air stay ink; atoms `F.el` (Fe, H); the two vessels `F.cat`.

## Exercises

No inline item. End of section, chapter numbers 7 to 11:
- e1 fs-idm30837936 (7), keyed, open with the book's answer.
- e2 fs-idm86018304 (8), unkeyed conceptual, AI-marked approach.
- fs-idm66513728 (9), keyed PhET single-collision item on the angle of a shot: held; this page's Sim has no aimed shot, and the orientation of a collision is 12.5's.
- s4 fs-idm66455280 (10), unkeyed PhET many-collisions item: `simulation-exercise` set against sim-collisions, its prompt rewritten to name the Sim's controls (rewritten again on 2026-11-16 for iron in acid), AI-marked approach.
- fs-idm49710224 (11), keyed PhET item with 15 A and 10 BC: held; its key describes PhET's reversible A + BC ⇌ AB + C settling into a mixture, which this Sim (iron going into acid) does not show, so the key cannot be checked against it.

## Left out

The three Link to Learning notes (the cesium video, the phosphorus video, the PhET Reactions & Rates interactive, which the Sim answers). Errata as printed: Figure 12.6's caption equation Fe(s) + HCl(aq) ⟶ 2FeCl₂(aq) + 3H₂(g).

## Wanted at chapter level

- variables row 12.2 · T (reuse 12.5's meaning) for the Sim's slider and readout, if the chapter pass gives figure-only symbols rows
- variables rows 12.2 · rate and Δt (reuse 12.1's meanings) for the Sim's readout, on the same terms
- ch12/COLOR.md: 12.2 binds `time` too (Δt and the strip's time axis); its line reads "temperature, concentration, rate only if a Sim draws them", and the Sim draws all four
- No anchors (12.2 states no form), no concept, edge or symbol fix.

Applied by the chapter pass (2026-10-05): no figure-only variables rows; the Sim's T, rate and Δt cards fall back to the chapter's one meaning of each (12.5's and 12.1's). `COLOR.md` now binds `time` in 12.2 and names the box as the chapter's many-collisions Sim; `config.md` says so too.
