# Plan: 17.6 Corrosion (m68826)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, three numbered figures (17.15 Statue inside the note, 17.16 Rust, 17.17 Protect), no table, no worked example, one boxed note (Chemistry in Everyday Life: Statue of Liberty: Changing Colors), no Link to Learning, six end-of-section items (chapter exercises 37 to 42).

## Sub-concepts and spans

The book prints no header; the page takes three of its own.

| Span | Header | Concepts |
|---|---|---|
| `corrosion` | Corrosion and the patina on copper (ours: the definition and the Statue of Liberty note with Figure 17.15) | introduces `corrosion`, `passivation`; uses `metal`, `galvanic-cell`, `oxidation`, `redox-reaction` |
| `rust` | The rusting of iron (ours: the rust cell, its equations, Figure 17.16 + 17.17) | introduces `rusting-of-iron`; uses `galvanic-cell`, `anode`, `cathode`, `standard-electrode-potential`, `standard-cell-potential`, `cell-notation`, `hydrate` |
| `protection` | Protecting metals from corrosion (ours: paint, alloying, galvanization, cathodic protection) | introduces `galvanization`, `cathodic-protection`, `sacrificial-anode`; uses `alloy`, `passivation`, `cathode`, `anode`, `electrode-potential-and-oxidant-strength`, `standard-electrode-potential` |

## Figures

- fig-statue · Figure 17.15 (photo, two panels (a) painting and (b) photograph) · keep: the note's text points at it, and the brown-to-green change of the copper is the story; inside the note, caption as printed.
- sim-corrosion · Figure 17.16 + 17.17 · rusting-of-iron, galvanization, cathodic-protection, sacrificial-anode · flow by animation and variation by choice: the book draws the scratched painted iron (17.16) and the buried tank wired to magnesium (17.17) as two unrelated pictures, and says in prose only that a breached zinc layer protects the iron; here one cross section of an iron plate takes each protection in turn, so the reader watches which metal dissolves and sees the iron become the cathode once a more active metal is present · arrows: kinematic (the electrons running through the metal from anodic to cathodic site, Fe²⁺ leaving the pit for the drop and on to the rust, O₂ entering the drops and becoming water, Zn²⁺ and Mg²⁺ leaving their metal); the half-reaction arrows are notation and stay in the labels · moving, on a 6 s clock that holds 1.2 s: electrons, ions and O₂ travel while the anode is used up (the pit in the iron deepens and rust gathers, or the zinc coat thins, or the magnesium block shrinks) · choice protection (segmented: scratched paint, zinc coating, magnesium anode; default scratched paint, the book's Figure 17.16) · headline e.g. "Iron dissolves at the anodic site, and its electrons reduce oxygen at the scratch." · graph none · 2D, a cross section (chapter config: the rust and protection cross sections are flat; nothing about it is an arrangement in space) · morph: the coating crossfades from paint to zinc and fades out for the magnesium anode, the drops give way to moist soil, the magnesium block and its wire arrive; the iron plate is the part that stays · colour: iron, zinc, magnesium, O₂, H₂O and the ions through `F.el` (Fe, Zn, Mg, O, H, e-), rust brown as the fact (`#7b3f1d`), paint, water and soil in ink at low opacity · labels (six at most): water or moist soil, the coating or the anode, iron, the cathodic site with its half-reaction, the anodic site with its half-reaction, rust; a legend of the particles under the plate; hover names on every part and particle · readout $E^\circ_{\text{cell}} = E^\circ_{\text{O}_2/\text{H}_2\text{O}} - E^\circ_{\text{anode metal}}$ through `\kEocell` and `\kEo` with couple subscripts written plain: +1.23 V − (−0.44 V) = +1.67 V (the book's), +1.23 V − (−0.7618 V) = +1.99 V, +1.23 V − (−2.372 V) = +3.60 V (Table 17.1), morphing by meaning on the choice · note for the zinc and magnesium states only: the anode metal's E° lies below iron's −0.44 V, so it is oxidized in the iron's place; the paint state's note says where the rust gathers · draws `potential`

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
