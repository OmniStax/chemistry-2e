# Plan: 17.5 Batteries and Fuel Cells (m68825)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Two objectives, seven numbered figures (17.8 to 17.14), no table, no worked example and no Check Your Learning, no boxed note, seven Link to Learning notes (all dropped), five end-of-section items (chapter exercises 32 to 36).

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `batteries` | Batteries (ours, for the untitled opening; Figure 17.8) | introduces `battery`, `primary-cell`, `secondary-cell`; uses `galvanic-cell`, `oxidation`, `salt-bridge`, `half-cell`, `reversible-reaction` |
| `single-use` | Single-Use Batteries (the book's; Figures 17.9, 17.10) | introduces `dry-cell`, `alkaline-battery`; uses `anode`, `cathode`, `oxidation`, `reduction`, `cell-potential`, `galvanic-cell`, `primary-cell`, `electrolyte` |
| `rechargeable` | Rechargeable (Secondary) Batteries (the book's; Figures 17.11 to 17.13) | introduces `nickel-cadmium-battery`, `lithium-ion-battery`, `lead-acid-battery`; uses `secondary-cell`, `cathode`, `anode`, `cell-potential`, `electrolyte`, `galvanic-cell` |
| `fuel-cells` | Fuel Cells (the book's; Figure 17.14) | introduces `fuel-cell`; uses `galvanic-cell`, `combustion-reaction`, `oxidation`, `half-cell`, `catalyst`, `half-reaction`, `cell-potential`, `anode`, `cathode` |

## Figures

- fig-daniell · Figure 17.8 · battery · kept as printed: the 1904 journal drawing is a historical document, and its simplified cell beside it carries kinematic arrows (electrons through the wire, Zn²⁺ into solution, SO₄²⁻ and Zn²⁺ through the bridge) that the moving Figure 17.3 + 17.4 of 17.2 already runs for the same kind of cell; config keeps it with its schematic · photo
- fig-dry-cell · Figure 17.9 · dry-cell · kept as printed, a labelled cutaway; no arrows, nothing varies, a locked view would only redraw the same labels · photo
- fig-alkaline · Figure 17.10 · alkaline-battery · kept as printed, a labelled cutaway, the same reason · photo
- fig-nicd · Figure 17.11 · nickel-cadmium-battery · kept as printed, a labelled cutaway with a magnified inset; its one arrow points at the inset and is notation · photo
- sim-li-ion · Figure 17.12 · lithium-ion-battery, secondary-cell · flow by animation and variation by choice: the book draws the two directions at once with green and blue arrows on one picture; here one direction runs at a time, the lithium ions leave their sites in one electrode, cross the electrolyte and settle into the other's empty sites, one electron passes through the external circuit for each, and the electrodes' roles (cathode, anode) swap with the direction · arrows: kinematic (Li⁺ moving between the layered oxide and the graphite; electrons through the external circuit, which the book's caption names as charge flowing) · moving, six Li⁺ cross in about 6 s and the loop holds 1.2 s · one choice, process (discharge, the default, the cell reaction as the book writes its cathode and anode; charge), untyped; no slider, since nothing in the text varies continuously and x is what the clock moves · headline "On discharge, lithium ions leave the graphite for the cobalt oxide as electrons run through the device." (on charge, "the charger drives electrons and lithium ions back into the graphite") · no graph; a legend row beneath names each kind of particle · 2D: the lesson is the shuttle between two layered hosts, read side on as the book draws it (exploration § Root rule 28), no orbit · atoms by `F.el` (Li, Co for the book's "Metal" of LiCoO₂, O, C, e⁻); ions carry a + mark · labels: "positive electrode" and "negative electrode" with their role (cathode or anode) on the line beneath, "electrolyte", and the device or charger inside its box (four; nothing on a moving body); every atom, ion and electron on hover · readout the book's cell equation with the live x, Li_{1−x}CoO₂ + x LiC₆ ⇌ LiCoO₂ + x C₆, x = 0.50 to 0.00 (twelve lithium sites in each electrode, so x falls by 1/12 per ion), E_cell ∼ 3.7 V through `\kEcell`; clock-driven, never highlighted · note: one electron through the circuit for each Li⁺ across, which the rhythm of the two shows
- fig-lead-acid · Figure 17.13 · lead-acid-battery · kept as printed, a labelled cutaway, no arrows · photo
- sim-fuel-cell · Figure 17.14 · fuel-cell · flow by animation: the book marks the flows with arrows on a still section; here the fuel and the air flow through their channels, H₂ reaching the anode gives two H⁺ to the electrolyte and two electrons to the external circuit, the electrons run through the load to the cathode, and an O₂ there takes four of each and leaves as two H₂O with the unused gases, while unreacted fuel leaves as excess · arrows: kinematic (fuel in and excess fuel out, air in and unused gases out, H₂ to the anode, O₂ to the cathode, H₂O out, H⁺ across the electrolyte, e⁻ around the circuit) · moving, two turns of the cell reaction (4 H₂, 2 O₂, 4 H₂O, 8 e⁻) in 6 s, the loop holds 1.2 s; the streams of excess fuel and unused air run on the same clock · no controls: the cell has nothing the text varies · headline "Electrons from hydrogen at the anode reach oxygen at the cathode through the external circuit, while H⁺ crosses the electrolyte." · no graph; a legend row beneath names each kind of particle · 2D, the book's section (exploration § Root rule 28) · atoms by `F.el` (H, O, N for the air's nitrogen, e⁻); H⁺ with a + mark · labels: "fuel in", "air in", "anode", "electrolyte", "cathode", "electric current" (six, all on still parts); the outlets ("excess fuel out", "unused gases out") and every molecule, ion and electron on hover · readout the cell reaction 2H₂(g) + O₂(g) ⟶ 2H₂O(g) with E_cell ∼ 1.2 V through `\kEcell` · note: the live tally of the run, H₂ and O₂ consumed, H₂O formed and electrons through the circuit, clock-driven

Extra simulations: none. A discharge-curve Sim comparing the batteries' voltages would need numbers the book does not give.

## Tables

None.

## Types bound

`potential` (E_cell in the displayed reactions through `\kEcell`, the readouts, and the stated voltages in prose marked `data-type="potential"`; "voltage" and "cell potential" as `cell-potential`). Coefficients, x, counts and the 20%–25% and 50%–75% efficiencies stay ink. "Current" stays ink: `electric-current` is introduced in 17.7. Atoms and ions by `F.el`.

## Referents

None: no figure compares the batteries on one axis.

## Exercises

No Check Your Learning. Five end-of-section items (chapter numbers 32 to 36): three keyed kept (fs-idm100291296 with the book's whole key as an open answer, since part (a) is a pair of half-reactions; fs-idm59169968; fs-idm192431088); fs-idp39083136 (unkeyed, explain with the Nernst equation) kept with an AI-marked suggested approach; fs-idm149853488 (unkeyed, parts (a) and (b) would have to be worked out) left out and named. Nothing moved.

## Left out

The seven Link to Learning notes. Errata kept as printed: "its intended use a source", "a potassium hydroxide electrode" for the electrolyte, "a large amount current", "via a catalyzed electrochemical that is"; Figure 17.14 stands before the equations it illustrates, as the book prints it.

## Wanted at chapter level

- No anchors: 17.5 has no forms; its one variables row, `17.5/E_cell`, already names `cell-potential`.
- No concept, edge or symbol fixes.
