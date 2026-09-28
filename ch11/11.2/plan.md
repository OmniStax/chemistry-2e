# Plan: 11.2 Electrolytes (m68781)

Written 2026-09-28 before the build and left for review, as `ch11/config.md` records ("applied as proposed on 2026-09-28, on Chen's instruction to finish the book without check-ins").

Three objectives, two numbered figures (11.6 and 11.7), one unnumbered image (the reaction of HCl with water in Lewis structures), no table, no worked example and no Check Your Learning, seven end-of-section exercises.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `electrolytes` | Electrolytes and conductivity (Figure 11.6) | introduces `electrolytes-and-nonelectrolytes`, `classify-electrolyte-strength` |
| `ionic` | Ionic Electrolytes (the book's header, Figure 11.7) | introduces `ion-dipole-attraction`, `dissociation-of-ionic-compounds` |
| `covalent` | Covalent Electrolytes (the book's header) | introduces `covalent-electrolytes`, uses `classify-electrolyte-strength` |

## Figures

- sim-conductivity · Figure 11.6 · electrolytes-and-nonelectrolytes, classify-electrolyte-strength · flow by animation and choice: the book draws three beakers with arrows on the ions; here one bench holds the circuit and the reader picks the solute, the ions drift toward the electrode of opposite charge while the molecules only jostle, and the bulb glows in proportion to the ions that carry charge · moving, the ions travel continuously toward the electrodes (conduction has a clock), the transport runs it · choice of solute (ethanol, KCl, acetic acid; default KCl, the book's middle beaker), no slider · headline "Potassium chloride dissociates completely, so all 12 of its ions carry charge and the bulb glows brightly" · strip beneath with the count of ions against the count of dissolved particles, and the bulb's brightness · physical 3D, an apparatus (book rule): beaker, two electrodes marked + and −, wires, bulb and power supply on a bench, pitch held between 2° and 70° above level so the bench is never seen from beneath, spin off since the particles already move, views front and above · the bulb's warm light is the physical fact, a named constant BULB_LIGHT; atoms and ions by `F.el` (ethanol and acetic acid drawn as their heavy atoms C, C, O and C, C, O, O; H<sub>3</sub>O<sup>+</sup> as O and H); + and − as ink labels on one representative of each ion kind, hover names on every particle
- sim-hydration · Figure 11.7 · ion-dipole-attraction, dissociation-of-ionic-compounds · flow by animation and shape in 3D: the book's still shows ions already hydrated; here water molecules turn their oxygen ends toward K<sup>+</sup> and their hydrogen ends toward Cl<sup>−</sup>, pull the surface ions off a KCl crystal one pair at a time and carry them into the solution · moving, the crystal dissolves over a 12 s clock (dissolution has a time), the transport runs and scrubs it · no slider or choice: nothing in the idea varies that the section teaches · headline "Water has carried 3 potassium ions and 3 chloride ions away from the crystal" · strip beneath with the ions in the crystal and in solution, `F.el('K')` and `F.el('Cl')` bars · physical 3D, a particle picture (book rule): a box of solution the reader turns, free orbit about the vertical with pitch held between −30° and 80°, views front and above; the water orientation around each ion is the lesson and is an arrangement in space · labels K<sup>+</sup>, Cl<sup>−</sup>, O and H once each on one representative, hover names on every particle

## Kept image

- fig-hcl-water · unnumbered image `CNX_Chem_11_02_H3O_CL_img.jpg` · keep: it is the equation the sentence before it introduces, drawn in Lewis structures; a faithful copy, since nothing in it moves or varies (rule 24.9, a mechanism replay would add nothing) · a `figure` row with no number, eyebrow "Figure"

## Tables

None.

## Types bound

Nothing, as `ch11/COLOR.md` says: atoms and ions in the element palette, charges as ink marks, the bulb's glow a physical colour. The readouts write chemical equations, not typed quantities.

## Exercises

Seven end-of-section items, all kind `exercise`, all open. Four keyed (fs-idp1366224, fs-idp608736 with its image copied as `CNX_Chem_11_02_Fe_NO3_3_img.jpg`, fs-idp40604768, fs-idm39772000). Three unkeyed conceptual kept with an AI-marked approach (fs-idm26375616, fs-idm785520, fs-idm22188736). No numerical item is left out.

## Left out

Nothing. The section prints no Link to Learning note. The markup slip in the book's H<sub><sub>3</sub></sub>O<sup>+</sup> is written H<sub>3</sub>O<sup>+</sup>.

## Wanted at chapter level

- none: the section has no variables or equations, and its five concepts and six glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): nothing wanted; the page is rebuilt with its last fixes, the Figure 11.6 bench is drawn in `PAL.muted` so it shows in light, and Figure 11.7's camera is pulled back (distance 8.4) so the box edge stays in frame.
