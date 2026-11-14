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

- sim-conductivity · Figure 11.6 · electrolytes-and-nonelectrolytes, classify-electrolyte-strength · flow by animation and choice: the book draws three beakers with arrows on the ions; here one apparatus holds the circuit and the reader picks the solute, the ions drift toward the plate of opposite charge while the molecules only jostle, and the bulb glows with the number of ions · arrows: kinematic in the book (the ions' drift); here the ions themselves move · moving, the ions travel continuously (conduction has a clock), the transport runs it · choice solute (ethanol, KCl, acetic acid; default KCl, the book's middle beaker) · headline "KCl dissociates completely: all 12 particles are ions, and the bulb glows brightly." · 2D, rebuilt flat on 2026-11-14 from the book's image: the 3D bench was small, its view buttons added nothing, and its electrodes were marked the wrong way round (+ left). The bulb's warm light is the physical fact BULB_LIGHT; atoms and ions by `F.el` with every hydrogen drawn; the sign of each ion on it as the book marks it; a key of the particles present. Readout: the dissolving or ionization equation of the chosen solute.
  works: parts: a beaker of solution; two plate electrodes standing in it, − on the left and + on the right; a power supply wired to the − plate, and through a light bulb in its socket to the + plate · flow: cations drift left to the − plate, anions right to the + plate; one arriving is replaced at the far plate, so the current is steady; molecules wander without drift · must hold: (1) the circuit is one loop, supply − → − plate, solution, + plate → bulb → supply +; (2) K⁺ and H₃O⁺ move toward −, Cl⁻ and acetate toward +; (3) the bulb dark for ethanol, bright for KCl, dim for acetic acid; (4) particles stay between the plates, under the surface · read off the image: three beakers, "ethanol / No conductivity" (4 molecules), "KCl / High conductivity" (3 + and 3 − ions with arrows to the plates), "acetic acid solution / Low conductivity" (2 molecules, 1 + and 1 − ion); − plate left, + plate right; a wall plug and a bulb on two wires. We draw 6 ethanol, 6 K⁺ + 6 Cl⁻, and 5 acetic acid with 1 H₃O⁺ and 1 acetate (the real share ionized near 0.1 M is about 1 %, too few to draw); a power supply box stands for the plug.
- sim-hydration · Figure 11.7 · ion-dipole-attraction, dissociation-of-ionic-compounds · flow by animation: the book's still shows ions already hydrated; here water molecules turn as they close in, oxygen toward K⁺ and a hydrogen toward Cl⁻, lift the surface ions off a KCl crystal one at a time and carry them into the solution · arrows: none · moving, the crystal dissolves over a 12.5 s clock (dissolution has a time), the transport runs and scrubs it · no slider or choice: nothing in the idea varies that the section teaches · headline "Water has carried 2 K⁺ ions and 2 Cl⁻ ions into the solution." · 2D, rebuilt flat on 2026-11-14: the 3D box showed small spheres far off and the book's own drawing is a flat slice; the orientation of each water reads in the plane · a key names K⁺, Cl⁻, O and H once; hover names on every particle.
  works: parts: a crystal of 4 × 5 ions, K⁺ and Cl⁻ alternating; water molecules (O with two H at 104.5°) · flow: four waters per leaving ion close in from the solution, turning as they come; the ion lifts off the surface; the cluster moves to a resting place in the solution · must hold: (1) K⁺ and Cl⁻ alternate in the crystal; (2) at a K⁺ every water points its oxygen at the ion; (3) at a Cl⁻ every water points one hydrogen at the ion; (4) only surface ions leave, each from an exposed side; (5) Cl⁻ drawn larger than K⁺ (181 and 138 pm) · read off the image: K⁺ purple and larger than the book's waters, Cl⁻ green; a crystal of about 20 ions; hydrated ions with 3 or 4 waters; "H" and "O" pointed out on one water. The book's K⁺ and Cl⁻ are drawn the same size; we keep the true ratio.

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
