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

- fig-water-ammonia · Sim, replaces the unnumbered image `conjugate_img` (kept in `originals`) · conjugate-acid-base-pairs, conjugate-base, conjugate-acid, bronsted-lowry-acid, bronsted-lowry-base, acid-ionization, base-ionization, amphiprotic-species · motion the reader would otherwise imagine: the book's images show each reaction before and after; here the proton leaves the acid, crosses to the base's lone pair and comes back, and the two species become their conjugates where they stand, so a conjugate pair is seen to be one thing with and without the proton. The electrons are kept honest: the acid keeps the bonding pair as a new lone pair, the base's facing lone pair becomes the new bond · arrows: symbolic (the equilibrium arrow; its half now running is the dark one) · moving: the proton, forward then back, on a schematic clock of 7 s (rest, cross, rest, cross back, rest) · choice of reaction, the three the section writes between two different species: H₂O + NH₃ (opens here, the book's image), HF + H₂O, H₂O + C₅NH₅; water is the acid in the first and third and the base in the second · headline: who gives the proton to whom, in the direction now running · no graph; beneath the scene the book's equation in its own order, formulas and roles in the pair colours, each acid joined to its conjugate base by a bracket as `conjugate_img` joins them, the side present now at full strength · 2D (Lewis structures) · readout: the two conjugate pairs as half-equations, acid ⇌ conjugate base + H⁺ and base + H⁺ ⇌ conjugate acid (the image's "Remove H⁺" and "Add H⁺")
  works: parts (the acid: the atom that holds the proton, its other hydrogens and lone pairs; the proton, bonded to the acid on its right side; the base, its lone pair facing the proton; names under each species; the equation row with roles and two brackets) · flow (the proton from the acid's atom to the base's atom and back; the bonding pair stays on the acid as a lone pair; the base's lone pair becomes the bond) · must hold (lone pairs: water 2 → hydroxide 3; HF 3 → fluoride 4; ammonia 1 → ammonium 0; water as base 2 → hydronium 1; pyridine's N 1 → 0; charges appear only once the proton has arrived, − on the acid's ion and + on the base's; the transferred hydrogen keeps the acid's colour on the conjugate acid, as the book draws it; the proton reads H⁺ only while bonded to neither; each bracket joins a species to the one of the same colour; names and headline follow the direction; pyridine's ring is the book's Kekulé structure, N=C at the upper left, double bonds alternating, an H on every carbon) · read off the image (`conjugate_img`: H₂O(l) + NH₃(aq) ⇌ OH⁻(aq) + NH₄⁺(aq), roles Acid, Base, Conjugate base, Conjugate acid, the acid's bracket the shallower, the two crossing; `HF_img`: HF + H₂O ⇌ H₃O⁺ + F⁻, roles Acid, Base, Acid, Base; `NH3_img`: H₂O + C₅NH₅ ⇌ C₅NH₆⁺ + OH⁻, roles Acid, Base, Acid, Base; the last two images print no brackets, added here on the first image's pattern. Differs from the image: hydrogen fluoride is drawn F–H, the hydrogen toward the water, where the book prints H–F; `conjugate_img` draws space-filling models, here Lewis structures as in the other three; fluoride ion carries its charge without brackets, as printed)
  Second pass 2026-11-16: the first build was three still restylings of the book's Lewis structures and was rightly reverted; one moving figure replaces them. The referents `pair-acid` and `pair-base` are back for it.
- fig-hf-water · unnumbered image (`HF_img`) · **the book's image, kept** (kind `figure`, no number, the image in its own markup): the still equation the text introduces here; its motion is the second choice of the Sim above. Its alt text is the one the bundle sets on the previous image.
- fig-pyridine-water · unnumbered image (`NH3_img`) · **the book's image, kept**, for the same reason; the third choice of the Sim above. Its alt text is the one the bundle sets on the hydrogen fluoride image (pyridine's, without the equilibrium expression).
- fig-water-water · Sim, replaces the unnumbered image `Water_img` (kept in `originals`) · autoionization, water-autoionization, amphiprotic-species · the same moving drawing as fig-water-ammonia with two water molecules and no choice: one gives the proton, the other takes it, and the ions give it back · arrows: symbolic (the equilibrium arrow, its reverse half the longer as printed) · moving: the proton, forward and back, the ions lasting a shorter time than the molecules · no controls · headline: who gives the proton to whom · 2D · readout: H₂O ⇌ OH⁻ + H⁺ and H₂O + H⁺ ⇌ H₃O⁺, water in both roles
  works: parts (water, water, the proton between them, names, the equation row with roles and brackets) · flow (as above) · must hold (the first water and the hydroxide ion in the acid's colour, the second water and the hydronium ion in the base's; the hydrogen that moved sits on the hydronium ion's left in the acid's colour, as the book draws it; lone pairs: two on each water (left, below), three on the hydroxide ion, one on the hydronium ion (below); the reverse half of the arrow longer than the forward half) · read off the image (H₂O + H₂O ⇌ H₃O⁺ + OH⁻, labels Acid, Base, Acid, Base; the alt text's "Acid₁, Base₂" subscripts and purple and green are not in the image, which prints plain Acid and Base in red and blue; the image sets the hydroxide ion's minus on its hydrogen, which reads as a hydride, and the figure sets the one charge on the bracket)
  Second pass 2026-11-16: the still copy was small in its stage and showed only the image with its charge moved; it now moves.
- sim-kw · Sim · ion-product-constant-for-water, water-autoionization, kw-ion-concentrations · variation by slider and choice: the text gives K_w as one number at 25 °C and says it grows with temperature; dragging [H₃O⁺] slides a point along the line [H₃O⁺][OH⁻] = K_w on logarithmic axes, so a tenfold rise in one is a tenfold fall in the other, and a warmer temperature lifts the whole line and pure water with it · arrows: none · still · [H₃O⁺] (concentration, 10⁻¹² to 10⁻² M on a log track, the value shown as the concentration itself, default 1.0 × 10⁻⁷ M, Example 14.1; detent at 2.0 × 10⁻⁶ M, Example 14.2; a dashed circle at pure water, √K_w, recomputed from the temperature) and temperature (choice of the book's five values: 25 °C 1.0 × 10⁻¹⁴ and 100 °C 5.6 × 10⁻¹³ from the text, 80 °C 2.4 × 10⁻¹³ from the Check Your Learning, 40 °C 2.9 × 10⁻¹⁴ and 60 °C 9.3 × 10⁻¹⁴ from exercise 14; a reader on the pure-water circle stays on it when the temperature changes) · headline: pure water's equal concentrations, or how many times as much of one ion as the other · graph alone: [OH⁻] against [H₃O⁺], both 10⁻¹⁴ to 1 M, so the point stays in the frame at every temperature; the K_w line labelled with its value on the half of the line the point is not on; above 25 °C the 25 °C line stays dashed with a key above the frame; the diagonal [OH⁻] = [H₃O⁺] dashed ink; pure water a hollow dot; the point's two values on its drop lines, beside the point where it nears an edge; hover names on the two dots · 2D · readout [OH⁻] = K_w/[H₃O⁺] with the live numbers (Example 14.2's form), on the circle [H₃O⁺] = [OH⁻] = √K_w (Example 14.1's form)
  works: read off the text (Example 14.1: 1.0 × 10⁻⁷ M each at 25 °C; Check Your Learning: 4.9 × 10⁻⁷ M at 80 °C; Example 14.2: [H₃O⁺] 2.0 × 10⁻⁶ M gives [OH⁻] 5.0 × 10⁻⁹ M) · must hold (the product of the two values shown equals the K_w shown at every setting; on the circle the two values are equal and the readout takes Example 14.1's form; at 80 °C pure water reads 4.9 × 10⁻⁷ M; the point never leaves the frame; no label covers the point or another label)
  Kept 2026-11-14: the slider had read the logarithm (−7.00) rather than the concentration, the 100 °C point left the frame and was pinned, the 25 °C label and the value labels collided with the point at the slider's ends, and the caption ran to five sentences.
  Second pass 2026-11-16, kept: the graph box was a 308-unit band with 17-unit labels; it is 428 tall with larger labels, the substituted [H₃O⁺] carries its unit in the readout, and the caption is cut to what to drag and watch.

No photograph in the module. Extra simulations: none.

## Referents

- `pair-acid` · the acid and its conjugate base · fig-water-ammonia (marked in the water and ammonia paragraph)
- `pair-base` · the base and its conjugate acid · fig-water-ammonia
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
