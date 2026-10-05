# Plan: 14.1 Brønsted-Lowry Acids and Bases (m68803)

Written 2026-10-05 before the build and left for review, as `ch14/config.md` records (applied as proposed, on Chen's instruction to finish the book without check-ins).

Four objectives, no numbered figure, four unnumbered equation images (`conjugate_img`, `HF_img`, `NH3_img`, `Water_img`), three worked examples (14.1 to 14.3) with a Check Your Learning each, no boxed note, no Link to Learning, fourteen end-of-section items (chapter exercises 1 to 14). Key Concepts and Summary to `summary_html`; the Key Equations table is the chapter's forms table and is not printed; the glossary is the concepts' terms. The module prints no header, so the page takes its own.

## Sub-concepts and spans

| Span | Header | Concepts |
|---|---|---|
| `definitions` | Proton donors and proton acceptors | introduces `bronsted-lowry-acids-bases`, `bronsted-lowry-acid`, `bronsted-lowry-base`; uses `acids-and-bases`, `proton` |
| `conjugate-pairs` | Conjugate acid-base pairs (fig-water-ammonia) | introduces `conjugate-acid-base-pairs`, `conjugate-base`, `conjugate-acid`; uses `reversible-reaction`, `bronsted-lowry-acid`, `bronsted-lowry-base` |
| `ionization` | Acid ionization and base ionization (fig-hf-water, fig-pyridine-water) | introduces `acid-ionization`, `base-ionization`, `write-ionization-equations`; uses `conjugate-base`, `conjugate-acid` |
| `amphiprotic` | Amphiprotic species | introduces `amphiprotic-species`, `amphoteric`; uses `chemical-equilibrium` |
| `autoionization` | The autoionization of water (fig-water-water, sim-kw) | introduces `autoionization`, `ion-product-constant-for-water`, `water-autoionization`; uses `equilibrium-constant`, `temperature-changes-k`, `endothermic-process` |
| `ion-concentrations` | Hydronium and hydroxide ion concentrations (Examples 14.1, 14.2) | introduces `kw-ion-concentrations`; uses `ion-product-constant-for-water`, `molarity`, `le-chateliers-principle` |
| `amphiprotic-reactions` | Writing the reactions of an amphiprotic species (Example 14.3) | reinforces `amphiprotic-species`, `write-ionization-equations` |

Examples: 14.1 `div.example#ex-pure-water` and 14.2 `#ex-inverse` inside `ion-concentrations`, 14.3 `#ex-amphoteric` inside `amphiprotic-reactions`, each closing on its Check Your Learning host.

## Figures

- fig-water-ammonia · unnumbered image (`conjugate_img`) · conjugate-acid-base-pairs, conjugate-base, conjugate-acid · standardisation and variation by choice: the book draws the two pairs only in the forward direction and says the reverse in words; here a direction choice turns both "remove H⁺" and "add H⁺" arrows round and relabels each species, so the reader sees hydroxide become the base and ammonium the acid while the pairs keep their colours, and the readout writes the equation the way it is read · arrows: symbolic (the remove and add arrows and the reaction arrow are notation; the book draws no path of the proton) · still, two directions of one equation are states, not a clock; the choice morphs arrows, labels and the readout's species to their new places · choice direction (forward, reverse; default forward, the book's), choice view (2D, 3D) · headline "Water gives a proton to ammonia: water is the acid and ammonia the base." or "In reverse, ammonium ion gives a proton to hydroxide ion, now the base." · no graph · 2D by default, space-filling discs projected from the same coordinates as the 3D view, in the book's arrangement (two braced pairs side by side); 3D by the book's rule for a molecule inset in a flat figure (physical 3D): space-filling spheres on `F.view3d`, pitch within ±75° and yaw within ±70° so the row is never seen end on, spin off with its button, views front and above; the 3D view shows what the flat one cannot, the pyramid of ammonia closing into the tetrahedron of ammonium · atoms by `F.el` (O, N, H); species names and roles in the pair referents' colours, as the book colours each pair; four species labels and two arrow labels in 2D, hover names alone in 3D, where pinned labels would cross the atoms as the scene turns; hover names on every atom · readout the equation in the chosen direction, H₂O + NH₃ ⟶ OH⁻ + NH₄⁺ or NH₄⁺ + OH⁻ ⟶ NH₃ + H₂O, each species tagged so it slides to its new place · figure row, no number
- fig-hf-water · unnumbered image (`HF_img`) · acid-ionization, write-ionization-equations · faithful copy: standardisation alone (the Lewis structures in the pair colours the text wears, legible in both themes) · arrows: symbolic (the equilibrium arrow) · still, no controls · 2D, Lewis structures (book rule) · ink formulas, roles "Acid" and "Base" in the pair colours, the hydrogen that moves in the acid pair's colour inside H₃O⁺ as the book draws it · figure row, no number; no readout
- fig-pyridine-water · unnumbered image (`NH3_img`, which shows pyridine) · base-ionization, write-ionization-equations · faithful copy, the same reasons · arrows: symbolic · still · 2D · figure row, no number
- fig-water-water · unnumbered image (`Water_img`) · autoionization, amphiprotic-species · faithful copy, the same reasons; the equilibrium arrow drawn with the longer reverse half as printed; the hydroxide ion drawn as O–H⁻ in brackets, which the image mislabels with a minus on the hydrogen · arrows: symbolic · still · 2D · figure row, no number
- sim-kw · Sim · ion-product-constant-for-water, water-autoionization, kw-ion-concentrations · variation by slider and choice: the text states that [OH⁻] is inversely proportional to [H₃O⁺] and that K_w grows with temperature, and gives each as one number; here dragging [H₃O⁺] slides a point along the line [H₃O⁺][OH⁻] = K_w on logarithmic axes, so a tenfold rise in one is a tenfold fall in the other, and choosing a warmer temperature lifts the whole line and pure water's equal concentrations with it · arrows: none · still, the relation answers its controls; no clock · log [H₃O⁺] (concentration, −12 to −2, step 0.01, default −7.00, pure water at 25 °C of Example 14.1; detent at log 2.0 × 10⁻⁶, Example 14.2; a dashed circle at pure water, log √K_w, recomputed from the temperature: landing on it morphs the readout to Example 14.1's form) and temperature (choice of the book's five values with their K_w: 25 °C 1.0 × 10⁻¹⁴ and 100 °C 5.6 × 10⁻¹³ from the text, 80 °C 2.4 × 10⁻¹³ from the Check Your Learning, 40 °C 2.9 × 10⁻¹⁴ and 60 °C 9.3 × 10⁻¹⁴ from exercise 14; no value between them is invented; a reader on the pure-water circle stays on it when the temperature changes, since the circle is the state they chose) · headline "At 25 °C, pure water holds 1.0 × 10⁻⁷ M hydronium ion and 1.0 × 10⁻⁷ M hydroxide ion." or, off the circle, "At 25 °C there is 400 times as much hydronium ion as hydroxide ion." · graph alone, the graph is the idea: [OH⁻] against [H₃O⁺], both 10⁻¹² to 10⁻² M on logarithmic axes, axis titles in `concentration`, the K_w line in `equilibrium-constant` and labelled with its value, the 25 °C line kept faint and dashed when another temperature is chosen, the diagonal [OH⁻] = [H₃O⁺] dashed ink and named "pure water", the point filled in `concentration` with drop lines and its two values on the axes, `pinned()` where the 100 °C line leaves the box · 2D, a graph (book rule) · readout [OH⁻] = K_w/[H₃O⁺] with the live numbers, Example 14.2's form; on the circle [H₃O⁺] = [OH⁻] = √K_w, Example 14.1's form; no note, since the headline says the comparison

No photograph in the module. Extra simulations: none.

## Referents

- `pair-acid` · the acid and its conjugate base · fig-water-ammonia, fig-hf-water, fig-pyridine-water
- `pair-base` · the base and its conjugate acid · the same three figures
- `water-acid` · the water molecule that acts as the acid, and its conjugate base · fig-water-water
- `water-base` · the water molecule that acts as the base, and its conjugate acid · fig-water-water

The book colours every one of its four equations the same way, the acid's pair in one colour and the base's pair in the other; the page keeps that, so a species wears its pair's colour in the prose beside each figure (water, hydroxide, ammonia, ammonium; hydrogen fluoride, fluoride, hydronium; pyridine, pyridinium). The autoionization figure takes a pair of its own: it shares its block with sim-kw, and one group spanning both blocks was dealt two near purples.

## Types bound

`concentration` ([H₃O⁺], [OH⁻], the axes, the slider, the particular concentrations of the examples), `equilibrium-constant` (K_w, its line and its values; the book's tables type it, against the chapter notes' ink), `temperature` (the 25 °C, 80 °C and 100 °C the text names, the temperature choice). Ink: x, the logarithm, the coefficients. Atoms by `F.el`; species names by the pair referents.

## Exercises

Three Check Your Learning items, inline after their examples: `ex-pure-water` (4.9 × 10⁻⁷ M), `ex-inverse` (1 × 10⁻¹¹ M), `ex-amphoteric` (open, the book's two equations).

Fourteen end-of-section items, kind `exercise`:

- Keyed, kept (7): fs-idm60626080, fs-idm113554592, fs-idm62968960, fs-idm53911232, fs-idp110525216, fs-idm62869120, fs-idp125665056 (the key's NH₄OH carried as printed); every one open, the reader comparing equations or labels with the key.
- Unkeyed, kept with an AI-marked suggested approach (7): fs-idm85056096, fs-idm76406352, fs-idm3064240, fs-idm70827280, fs-idp141145072, fs-idp122889456, fs-idp42982384.
- Nothing left out, nothing moved in or out.

## Left out

Nothing of the prose. The bundle gives the HF and pyridine images the same alt text, pyridine's; both are redrawn, and the originals' alt text is not used. The hydroxide ion of `Water_img` carries its minus on the hydrogen; the redraw puts it outside the bracket.

## Wanted at chapter level

- variables `[H3O+]` → 14.1-autoionization
- variables `[OH-]` → 14.1-autoionization
- variables `K_w` → 14.1-autoionization
- variables `x_ice` → 14.1-ex-pure-water
- forms `eq-kw` → 14.1-autoionization
- variables row `T` for 14.1 (temperature, reusing an earlier meaning such as 13.3's or 1.4's), since sim-kw and the prose read K_w against T

Applied by the chapter pass (2026-10-05): every anchor as asked; the 14.1 row `T` added (temperature, "the temperature", anchored at `autoionization`). General mentions of concentration, autoionization and the other concepts the prose names are now marked as root rule 7 asks.
