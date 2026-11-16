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

- sim-polarization · Sim · oxidation-number-covalent-limit, oxidation-number · value add: variation by slider and the bookkeeping the text leaves to the reader. The text asks the reader to "imagine that the polarization of shared electrons within the O−H bonds of water were 100% complete"; here that polarization is a slider, each bonding pair slides from the middle of its bond onto the more electronegative atom, and beside the molecule the count behind every charge is written out, one row per kind of atom: valence electrons in the element − electrons counted in the species = charge (O in water at 100 %: 6 − 8 = −2; H: 1 − 0 = +1). The count is what makes the text's definition ("how the electronic environment of its atoms is different in comparison to atoms of the pure element") something the reader can do, and it is the first thing read beside the molecule · arrows: none (the shift of a bonding pair is the reader's imagined bookkeeping, not a motion in time) · still: the scene answers the slider and the choice, nothing has a clock, no transport · slider polarization (untyped, a percent, 0 to 100 %, default 100 %, the book's "100% complete", so the figure opens on the book's oxidation numbers; a dashed special circle there labelled complete transfer); choice H₂O / CCl₄ / NO₃⁻, the three covalent species the text works through, H₂O the default · headline at 100 % the text's ionic picture, "With every bonding pair given to O, water would be O²⁻ and two H⁺ ions." (C⁴⁺ and four Cl⁻; N⁵⁺ and three O²⁻), at 0 % "Shared equally, each bonding pair counts one electron to each atom it joins.", between "Each bonding pair leans toward O, the more electronegative atom, and O counts more of it." · no graph · 2D: a Lewis-type drawing of bonding and lone pairs (book rule: Lewis structures are flat); the lesson is who counts which electrons, not a shape in space · atoms as `F.el` discs (O, H, C, Cl, N), electrons as `F.el('e-')` dots, bonding pairs on the bond, lone pairs fixed beside their atom; the dashed line a pair slides along fades as the polarization rises and is gone at 100 %, where the atoms stand as separate ions; each atom labelled beside it with its symbol and charge, in ink (at most five labels, none on a moving dot); the count table at the right with a disc of the element beside each row's name; its last column is headed "formal charge" at 0 %, "charge" between and "oxidation number" at 100 %, which ties this page to 7.4's formal charge (equal sharing) as the other end of the same count; a legend names the electron once; hover names every atom and every pair · the model: a bonding pair counts 1 − p electrons to the atom that gives it up and 1 + p to the one that takes it, lone pairs count wholly to their atom; charge = valence − counted, so at 0 % each atom has its formal charge (0 in water and CCl₄; +1 on N, 0 on the double-bonded O and −1 on the two single-bonded O of the nitrate structure) and at 100 % its oxidation number · readout the book's sum for the species, $(1\;\text{O})(-1.20)+(2\;\text{H})(+0.60)=-1.20+1.20=0$ at 60 %, $(1\;\text{N})(+5)+(3\;\text{O})(-2)=+5+(-6)=-1$ for nitrate at 100 % (its two kinds of oxygen bend together into the book's (3 O)(−2) there), true in every state; no note
  works: parts: water, O with two lone pairs joined to two H; CCl₄, C joined to four Cl with three lone pairs each; nitrate, N joined to one O by a double bond (two lone pairs on that O) and to two O by single bonds (three lone pairs each); a table of valence − counted = charge per kind of atom · flow: none in time; with the slider each bonding pair moves along its bond from the midpoint (0 %) to beside the more electronegative atom (100 %) · must hold: (1) electrons drawn: 8 in water, 32 in CCl₄, 24 in nitrate, at every setting; (2) at 100 % every O and Cl has eight dots round it and H, C and N none; (3) each table row's valence − counted equals the charge on the atom's label and in the readout; (4) at 100 % the charges are the text's, −2 and +1, +4 and −1, +5 and −2; at 0 % they are the formal charges; (5) the readout's terms add to the charge on the species (0, 0, −1) at every setting; (6) the pair moves toward O in O−H and N−O and toward Cl in C−Cl; (7) no label covers an electron or an atom, the table clears the molecule · read off the image: no image; the charges are the text's, and the readout writes the text's sum for nitrate. Valence electrons 1 (H), 4 (C), 5 (N), 6 (O), 7 (Cl).
  Re-examined 2026-11-14: kept (larger molecule, legend, tidier sums, shorter caption).
  Rebuilt 2026-11-16 (second pass): the first pass left a small molecule in a wide blank stage that showed charges growing with the slider and nothing of where a charge comes from, and its caption said "drag toward 100%" on a slider that opens at 100 %. The molecule now takes the left of the stage at a size where the eight dots round O can be counted, the right carries the count valence − counted = charge for each kind of atom, the last column's name changes from formal charge to oxidation number across the slider, the bonds' guide lines go at 100 % so the species stands as the ions the text names, and the headline says those ions.

Extra simulations considered and not built: a stepper through the eight steps of the half-reaction method on Example 17.1 or 17.2, which would replay the worked examples line by line and add no view the text lacks (the same call 4.2 made for Example 4.7). Proposed 2026-11-16 and not built until picked: step 6 of the method as a Sim, two multipliers (one per half-reaction of Example 17.1) with the electrons lost by Cu and gained by HNO₃ laid out in two rows, so the reader finds 3 × 2 e⁻ = 2 × 3 e⁻ and sees the leftover electrons at any other pair of multipliers.

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

Applied by the chapter pass (2026-10-05):

- Nothing to apply; the section was read for the pass's checks and nothing changed.
