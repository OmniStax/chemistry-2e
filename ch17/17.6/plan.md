# Plan: 17.6 Corrosion (m68826)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, three numbered figures (17.15 Statue inside the note, 17.16 Rust, 17.17 Protect), no table, no worked example, one boxed note (Chemistry in Everyday Life: Statue of Liberty: Changing Colors), no Link to Learning, six end-of-section items (chapter exercises 37 to 42).

## Sub-concepts and spans

The book prints no header; the page takes three of its own.

| Span | Header | Concepts |
|---|---|---|
| `corrosion` | Corrosion and the patina on copper (ours: the definition and the Statue of Liberty note with Figure 17.15) | introduces `corrosion`, `passivation`; uses `metal`, `galvanic-cell`, `oxidation`, `redox-reaction` |
| `rust` | The rusting of iron (ours: the rust cell, its equations, Figure 17.16) | introduces `rusting-of-iron`; uses `galvanic-cell`, `anode`, `cathode`, `standard-electrode-potential`, `standard-cell-potential`, `cell-notation`, `hydrate` |
| `protection` | Protecting metals from corrosion (ours: paint, alloying, galvanization, cathodic protection, Figure 17.17) | introduces `galvanization`, `cathodic-protection`, `sacrificial-anode`; uses `alloy`, `passivation`, `cathode`, `anode`, `electrode-potential-and-oxidant-strength`, `standard-electrode-potential` |

## Figures

- fig-statue · Figure 17.15 (photo, two panels (a) painting and (b) photograph) · keep: the note's text points at it, and the brown-to-green change of the copper is the story; inside the note, caption as printed.
- sim-corrosion · Figure 17.16 · rusting-of-iron, galvanization · flow by animation and a comparison by choice: the book's still cross section shows the scratched painted iron with arrows; here the same plate is drawn across the whole stage and runs, and one choice swaps the paint for a zinc coat with the same scratch and the same two drops, so the reader sees the dissolving metal change from iron to zinc while the cathodic site stays where it was (the book says this of a breached zinc layer in prose only) · arrows: kinematic (electrons through the iron from the anodic site to the scratch, O₂ into the upper drop and out as two H₂O, Fe²⁺ out of the pit to the rust, O₂ into the lower drop to the rust, Zn²⁺ off the zinc) · moving, on a 6 s clock that holds 1.2 s: the particles travel while the pit deepens and rust gathers (paint) or the zinc coat thins (zinc) · choice coating (segmented: paint, zinc; default paint, the book's figure) · no headline: each site's name and half-reaction stand beside its drop · graph none · 2D, a cross section · colour: iron, zinc, O₂, H₂O and the ions through `F.el`, rust brown as the fact (`#7b3f1d`), paint and water in ink · labels: cathodic site and anodic site with their half-reactions, water, the coat, iron, rust; Fe²⁺ and Zn²⁺ carry their formula on the ball; a key for the electron, O₂ and H₂O; hover names on every part and particle · readout $E^\circ_{\text{cell}} = E^\circ_{\text{O}_2/\text{H}_2\text{O}} - E^\circ_{\text{anode metal}}$: +1.23 V − (−0.44 V) = +1.67 V (the book's line) and +1.23 V − (−0.7618 V) = +1.99 V (Table 17.1); the note gives the reason the anode is that metal · draws `potential`
  works: parts: an iron plate in section running off both edges, a coat on both faces; a drop of water over a scratch in the top coat, bare iron at its floor (the cathodic site); a drop under the lower face, where under paint a breach in the paint opens into a pit in the iron (the anodic site) and rust sits under the paint at the drop's right edge, and where under zinc the unbroken zinc coat is wet and thins · flow: electrons through the iron from the anodic site to the bare iron at the scratch; O₂ from the air into the upper drop to the bare iron, leaving as two H₂O; under paint Fe²⁺ from the pit through the breach into the lower drop and on to the rust, O₂ from outside the lower drop to the rust; under zinc Zn²⁺ off the coat into the lower drop · must hold: (1) the cathodic site is the bare iron under the upper drop in both states; (2) electrons run from the anodic site to the cathodic site, never back; (3) the pit and the rust appear only under paint, and the iron stays whole under zinc while the zinc thins; (4) each O₂ leaves as two H₂O; (5) E°cell reads +1.67 V under paint (the book's) and +1.99 V under zinc · read off the image: "Water", "Paint layer", "iron", "Cathodic site" at the scratch at upper left with O₂ → H₂O, "Anodic site" at the pit behind a gap in the lower paint at right, e⁻ running from it to the cathodic site, Fe²⁺ out of the pit into the lower drop and on to a lump of rust under the paint at the drop's right edge, O₂ from outside the lower drop to the rust. The book's two drops do not touch, so its ionic circuit is open; the drawing keeps the book's layout.
- sim-protection · Figure 17.17 · cathodic-protection, sacrificial-anode, electrode-potential-and-oxidant-strength · a comparison by choice and flow by animation: the book draws one case, magnesium wired to the tank; here the reader changes the wired metal, and with magnesium or zinc the block dissolves and feeds the tank electrons, while with copper (exercise 40's case) the current reverses and the tank pits and rusts, so "a more active metal" becomes something seen; an E° scale beside the scene shows why, the chosen metal's rung standing below or above iron's · arrows: kinematic (electrons along the wire from the anode to the cathode, the anode's ions into the soil, O₂ to the cathode's surface and away as two H₂O); the E°cell arrow on the scale is symbolic · moving, on a 6 s clock that holds 1.2 s: the block shrinks inside its dashed first outline (Mg, Zn) or the tank's pits and rust grow (Cu) · choice metal wired to the tank (segmented: magnesium, zinc, copper; default magnesium, the book's figure) · no headline · graph beside: a vertical E° scale with five rungs · 2D, apparatus read from the side · colour: metals, ions, O₂, H₂O and electrons through `F.el`, rust as the fact, E° values and the E°cell arrow in `potential`, soil, wire and ground in ink · labels: each metal with its part in the cell and its half-reaction, moist soil, the rungs with their values; the ions carry their formula; a key for the electron, O₂ and H₂O; hover names · readout the E°cell chain with the anode's couple: +3.60 V (Mg), +1.99 V (Zn), +1.67 V (Cu, where iron is the anode); the note says which side of iron the metal's E° lies · draws `potential`
  works: parts: the ground line with moist soil under it; a cast block of the chosen metal on the left with a neck where the wire is fastened; the wire up from the neck, across and down to a lug on top of the tank; the tank, an iron cylinder on its side with its near end cap · flow: with Mg or Zn, electrons from the block up the wire to the tank and through it to its underside, where O₂ from the soil is reduced to H₂O, and the block's ions into the soil; with Cu, electrons from the tank's underside up through the lug and along the wire to the copper, O₂ reduced on the copper's side, Fe²⁺ from the tank into the soil · must hold: (1) the wire joins the block's neck to the tank; (2) electrons leave the metal with the lower E° and arrive at the other; (3) only the anode loses metal: the block shrinks for Mg and Zn and the tank is untouched, the tank pits and rusts for Cu and the copper is untouched; (4) O₂ is reduced on the cathode's surface, two H₂O for each O₂; (5) on the scale the E°cell arrow starts at the anode's rung (Mg, Zn, or Fe for copper) and ends at O₂/H₂O; (6) E°cell reads +3.60 V, +1.99 V, +1.67 V · read off the image: "Sacrificial anode", a bottle-shaped block marked Mg → Mg²⁺, at left; a wire from its neck up, right and down to a lug on the tank, 2e⁻ with an arrow to the right along it; the tank, a cylinder on its side, "Object to be protected (cathode)", 2e⁻ running down it to its underside where "2H⁺ + O₂ → 2H₂O" is written; grass above, soil with stones all round. The image's 2H⁺ + O₂ → 2H₂O is not balanced; the labels use the text's O₂ + 4H⁺ + 4e⁻ → 2H₂O. E° values: −2.372 V, −0.7618 V, +0.34 V (Table 17.1), −0.44 V and +1.23 V (this section's equations).
  Second pass 2026-11-16: the fold of 17.16 + 17.17 was undone. As one figure it stood before the text on protection, drew the tank as the same thin plate, and was small in a blank stage. Each figure now stands with the passage that cites it; 17.17 is the book's tank and block, with the choice of metal the exercises ask about.

Extra simulations: none.

## Types bound

`potential` (every E°, the readout, "reduction potential" in prose as `standard-electrode-potential`, values in prose and exercise answers marked `data-type="potential"` where they stand in prose). Coefficients, the x of the hydrate and charges stay ink.

## Referents

None: the anodic and cathodic sites are named by their labels, and the metals are elements.

## Exercises

- 37 `fs-idp66944528` unkeyed choice (which of each pair corrodes): kept open with its options and a suggested approach marked as OmniStax's own, never graded.
- 38 `fs-idm150150768` keyed, open: "Mg and Zn".
- 39 `fs-idm127027504` unkeyed conceptual: suggested approach (the −2.07 V and −0.477 V kept as printed).
- 40 `fs-idp47040832` keyed, open, the book's explanation.
- 41 `fs-idp44419248` unkeyed conceptual: suggested approach.
- 42 `fs-idm80636048` keyed, open, the book's explanation (the missing question mark kept).
- No Check Your Learning; nothing left out; no moves; no `simulation-exercise`.

## Left out

Learning objectives, the summary (to `summary_html`) and the glossary go to the tables. Errata kept as printed: "as illustrated in Figure 17.15" for the rust cell; "a passivating an oxide layer"; "because as they get used up"; the cathode's subscript "O₂/O²"; Fe²⁺/Fe at −0.44 V; the summary's "Corrosion process involve"; exercise 39's −2.07 V and −0.477 V; exercise 42's missing question mark.

## Wanted at chapter level

- variables `17.6/E_std` → 17.6-rust
- variables `17.6/E°_cell` → 17.6-rust

Applied by the chapter pass (2026-10-05):

- Both rows anchored as listed. The text's "as illustrated in Figure 17.15", which means the rust cell of Figure 17.16, is kept as printed and recorded among the errata in `exploration.md`.
