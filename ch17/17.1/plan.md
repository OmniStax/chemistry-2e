# Plan: 17.1 Review of Redox Chemistry (m68821)

Written 2026-10-05 before the build and left for review, as `ch17/config.md` records (applied as proposed on Chen's instruction to finish the book without check-ins).

Three objectives, no numbered figure, no table, two worked examples (17.1, 17.2) with their Check Your Learning items, no boxed note, no Link to Learning, ten end-of-section items (chapter exercises 1 to 10). The module's glossary ("electrode potential", "half cell") belongs to 17.3's `electrode-potential` and 17.2's `half-cell`, and is not this page's.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `review` | Redox chemistry and electrochemistry (our own, for the untitled opening) | uses `redox-reaction` |
| `oxidation-numbers` | Oxidation Numbers (the book's header; Sim) | introduces `oxidation-number-covalent-limit`; uses `oxidation-number`, `oxidation-numbers`, `redox-reaction` |
| `balancing` | Balancing Redox Equations (the book's header; Examples 17.1, 17.2) | introduces `balance-redox-basic-solution`; uses `half-reaction-method`, `half-reaction`, `oxidation`, `reduction`, `redox-reaction`, `oxidizing-agent`, `reducing-agent` |

Examples are `div.example` with ids `ex-acidic` (Example 17.1) and `ex-basic` (Example 17.2), each ending in its Check Your Learning host.

## Figures

- sim-polarization · Sim · oxidation-number-covalent-limit, oxidation-number · variation by slider: the text asks the reader to "imagine that the polarization of shared electrons within the O−H bonds of water were 100% complete"; here the reader drags that polarization from equal sharing to complete transfer and sees each bonding pair slide onto the more electronegative atom while the charge each atom counts grows into its oxidation number, the sum always the charge on the molecule · arrows: none (the shift of a bonding pair is the reader's imagined bookkeeping, not a motion in time) · still: the scene answers the slider and the choice, nothing has a clock, no transport · slider polarization (untyped, a percent, 0 to 100 %, default 100 %, the book's "100% complete", a dashed special circle there labelled complete transfer, where the charges become whole-number oxidation numbers and nitrate's two kinds of oxygen bend together in the readout into the book's (3 O)(−2)); choice H₂O / CCl₄ / NO₃⁻, the three covalent species the text works through, H₂O the default · headline "The bonding pairs lean toward O; at 100% polarization each one belongs to O." naming Cl for CCl₄, "Every bonding pair now belongs to O, and each charge is an oxidation number." at the circle and "Each bonding pair is shared equally, as between two atoms of the same element." at 0 % · no graph · 2D: a Lewis-type drawing of bonding and lone pairs (book rule: Lewis structures are flat); the lesson is who owns which electrons, not a shape in space · atoms as `F.el` discs (O, H, C, Cl, N), electrons as `F.el('e-')` dots, bonding pairs on the bond, lone pairs fixed beside their atom; each atom labelled beside it with its symbol and the charge it counts, in ink (at most five labels, none on a moving dot); a legend names the electron once; hover names every atom and every pair · the charge model is the bookkeeping the text describes: at equal sharing each atom counts its formal charge (0 in water and CCl₄; +1 on N and −1 on two O in the nitrate structure with one double bond), and each bond moves one electron's worth of charge per pair to the more electronegative atom as the polarization reaches 100 % · readout the book's sum for the molecule, $(1\;\text{O})(-1.20)+(2\;\text{H})(+0.60)=-1.20+1.20=0$ at 60 %, $(1\;\text{N})(+5)+(3\;\text{O})(-2)=+5-6=-1$ for nitrate at 100 %, true in every state; no note (the readout says it all)

Extra simulations considered and not built: a stepper through the eight steps of the half-reaction method on Example 17.1 or 17.2, which would replay the worked examples line by line and add no view the text lacks (the same call 4.2 made for Example 4.7).

## Tables

None.

## Types bound

None: oxidation numbers, charges on ions and coefficients stay ink (`ch17/COLOR.md`); the polarization is a percent. Atoms and electrons by `F.el`.

## Referents

None.

## Exercises

Check Your Learning after Example 17.1 (host `ex-acidic`, source `fs-idm248400096`) and after Example 17.2 (host `ex-basic`, source `fs-idm246102992`), open answers from the book.

Ten end-of-section items, eight kept:
- keyed: fs-idp27088224 (1), fs-idp6773632 (3), fs-idp35560976 (5, restating the three reactions of fs-idp25311568), fs-idp52202560 (7, restating the four reactions of fs-idp171005680), fs-idm101720816 (9);
- unkeyed choice kept open with its options and an AI-marked approach: fs-idp124081968 (2);
- unkeyed conceptual kept with an AI-marked approach: fs-idp176626064 (8), fs-idp22326976 (10);
- left out, the answer would be a balanced equation computed by us: fs-idp25311568 (4), fs-idp171005680 (6).

Nothing moved.

## Left out

Nothing of the prose; objectives, summary and the glossary go to the tables. Errata kept as printed: "the oxidations numbers"; step 8's "add OH⁻ ions the equation obtained" (in the list and in both examples); Example 17.2's problem missing the full stop before "The reaction takes place".

## Wanted at chapter level

- none: the section has no variables rows or forms to anchor, and no concept, edge or symbol fix.
