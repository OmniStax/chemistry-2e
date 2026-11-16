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

- sim-conductivity · Figure 11.6 · electrolytes-and-nonelectrolytes, classify-electrolyte-strength · flow by animation and variation by slider: the book's three tests stand side by side, so the three bulbs are compared at a glance as in the image; what the still cannot show is the circuit working, electrons moving in the wires and ions moving between the plates (the text's "mobile, charged entities"), and that dissolving more solute brightens the KCl bulb, barely changes the acetic acid one and never lights the ethanol one · arrows: kinematic in the book (the ions' drift); here the ions themselves move · moving, the charges travel continuously (conduction has a clock), the transport runs it · slider solute dissolved in each beaker, 3 to 8 units, untyped, default 4 (the book's ethanol count) · no headline: the three lines under each beaker carry the name, the live counts and the class · no graph · 2D, an apparatus drawn flat from the book's image (book rule on apparatus). Rebuilt on 2026-11-16: the one-beaker version was a small drawing in a wide blank stage and the comparison needed three clicks. The bulb's warm light is the physical fact BULB_LIGHT; atoms, ions and electrons by `F.el` with every hydrogen drawn; each ion's sign on it as the book marks it; one key row. Readout: the three dissolving equations, one per line, the first two with the live count.
  works: parts: per test, a beaker of solution; two plate electrodes standing in it, − on the left and + on the right; a source of voltage (the book's wall plug, drawn as a battery so that + and − mean something) whose − end is wired to the − plate and whose + end is wired through a light bulb to the + plate · flow: electrons leave the battery's − end and run down to the − plate, and run from the + plate up through the bulb to the battery's + end; in the solution cations drift left to the − plate and anions right to the + plate, and one that arrives is replaced at the far plate, so the current is steady; molecules wander without drift; with no ions the electrons stand still · must hold: (1) each circuit is one loop, battery − → − plate, solution, + plate → bulb → battery +, and nothing joins the plates but the solution; (2) K⁺ and H₃O⁺ move toward −, Cl⁻ and acetate toward +; (3) electrons move away from the battery's − end and toward its + end, and only when the beaker holds ions; (4) bulb dark for ethanol, bright for KCl, dim for acetic acid, at every slider value; (5) particles stay between the plates, under the surface; (6) the counts under each beaker are the particles drawn · read off the image: three beakers, "ethanol / No conductivity" (4 molecules), "KCl / High conductivity" (3 + and 3 − ions with arrows to the plates), "acetic acid solution / Low conductivity" (2 molecules, 1 + and 1 − ion); − plate left, + plate right; a wall plug and a bulb in series on two wires. We open on 4 ethanol, 4 K⁺ + 4 Cl⁻, and 3 acetic acid with 1 H₃O⁺ and 1 acetate (two pairs from 6 units; the real share ionized near 0.1 M is about 1 %, too few to draw). The alt text matches the image.
- sim-hydration · Figure 11.7 · ion-dipole-attraction, dissociation-of-ionic-compounds · flow by animation: the book's still shows ions already hydrated; here water molecules turn as they close in, oxygen toward K⁺ and a hydrogen toward Cl⁻, lift corner ions off a KCl crystal one at a time and carry them into the solution · arrows: none · moving, the crystal dissolves over a 14.6 s clock (dissolution has a time), the transport runs and scrubs it · no slider or choice: nothing in the idea varies that the section teaches · no headline; two hydrated ions at rest from the start carry the lesson in words, "hydrogen ends face Cl⁻" and "oxygen ends face K⁺" · 2D, a flat slice as the book draws it · every ion wears its formula as in the book; a key names oxygen and hydrogen as water's negative and positive ends (the text's words); hover names on every particle. Rebuilt on 2026-11-16: the earlier drawing was a small crystal and two dozen waters in an empty stage, with no ion named.
  works: parts: a crystal slice of 6 × 4 ions, K⁺ and Cl⁻ alternating; water molecules (O with two H at 104.5°) all round it; two ions already hydrated · flow: two waters close in on a corner ion's exposed side, turning as they come; the ion lifts off; two more waters close the shell behind it; the cluster moves to a resting place in the solution · must hold: (1) K⁺ and Cl⁻ alternate in the crystal, unlike ions touching; (2) at a K⁺ every shell water points its oxygen at the ion; (3) at a Cl⁻ every shell water points one hydrogen at the ion; (4) only an ion at a corner of the crystal leaves, by an exposed side; (5) Cl⁻ drawn larger than K⁺ (181 and 138 pm); (6) 3 K⁺ and 3 Cl⁻ leave, so the crystal stays neutral; (7) no cluster comes to rest on another, on a name or on the key · read off the image: K⁺ purple, Cl⁻ green, each ion labelled; a crystal of about 20 ions; hydrated ions with 3 or 4 waters, oxygen toward K⁺ and hydrogen toward Cl⁻; "H" and "O" pointed out on one water. The book's K⁺ and Cl⁻ are drawn the same size; we keep the true ratio.

## Kept image

- fig-hcl-water · unnumbered image `CNX_Chem_11_02_H3O_CL_img.jpg` · keep: it is the equation the sentence before it introduces, drawn in Lewis structures; a faithful copy, since nothing in it moves or varies (rule 24.9, a mechanism replay would add nothing) · a `figure` row with no number, eyebrow "Figure"

## Tables

None.

## Types bound

Nothing, as `ch11/COLOR.md` says: atoms, ions and electrons in the element palette, charges as ink marks, the bulb's glow a physical colour. Referents: `electrodes` and `bulb` (the `power-supply` referent went on 2026-11-16 with the caption words that named it; the battery is drawn in ink). The readouts write chemical equations, not typed quantities.

## Exercises

Seven end-of-section items, all kind `exercise`, all open. Four keyed (fs-idp1366224, fs-idp608736 with its image copied as `CNX_Chem_11_02_Fe_NO3_3_img.jpg`, fs-idp40604768, fs-idm39772000). Three unkeyed conceptual kept with an AI-marked approach (fs-idm26375616, fs-idm785520, fs-idm22188736). No numerical item is left out.

## Left out

Nothing. The section prints no Link to Learning note. The markup slip in the book's H<sub><sub>3</sub></sub>O<sup>+</sup> is written H<sub>3</sub>O<sup>+</sup>.

## Wanted at chapter level

- none: the section has no variables or equations, and its five concepts and six glossary rows were merged by the prep agent.

Applied by the chapter pass (2026-09-28): nothing wanted; the page is rebuilt with its last fixes, the Figure 11.6 bench is drawn in `PAL.muted` so it shows in light, and Figure 11.7's camera is pulled back (distance 8.4) so the box edge stays in frame.
