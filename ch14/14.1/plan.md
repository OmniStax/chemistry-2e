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

- fig-water-ammonia · unnumbered image (`conjugate_img`) · **the book's image, kept** (kind `figure`, no number, the image in its own markup). Reverted 2026-11-14: the flat redraw drew the space-filling models as flat discs with hydrogens pasted over the oxygen, lost the book's bracket lines joining each acid to its conjugate base under the equation, and wrote a one-way arrow; its direction choice only relabelled what the text's last sentence already says, and its 2D/3D view turned shapes the passage does not teach. The bundle sets the hydrogen fluoride image's alt text on this image, so the kept image carries a description written from the picture.
- fig-hf-water · unnumbered image (`HF_img`) · **the book's image, kept**. Reverted 2026-11-14: a still restyling of the book's Lewis structures that showed nothing more (it also drew the transferred hydrogen in ink where the book draws it in the acid's red). Its alt text is the one the bundle sets on the previous image.
- fig-pyridine-water · unnumbered image (`NH3_img`) · **the book's image, kept**. Reverted 2026-11-14 for the same reason. Its alt text is the one the bundle sets on the hydrogen fluoride image (pyridine's, without the equilibrium expression).
  With all three reverted, the referents `pair-acid` and `pair-base` existed only for them and are gone; the words they marked stay.
- fig-water-water · unnumbered image (`Water_img`) · autoionization, amphiprotic-species · kept 2026-11-14 as a faithful copy because it corrects the image: the book prints the hydroxide ion as [:O–H⁻]⁻, a minus on the hydrogen that reads as a hydride, and the copy sets the one charge on the bracket. Otherwise it is the book's drawing in the referent colours the caption uses. Caption cut to the two roles and what the longer reverse arrow means · arrows: symbolic (the equilibrium arrow) · still · 2D
  works: parts (water, plus, water, equilibrium arrow, bracketed hydronium ion with + outside, plus, bracketed hydroxide ion with − outside; the same equation in formulas beneath, each with its role) · must hold (the first water and the hydroxide ion in the acid's colour, the second water and the hydronium ion in the base's; the hydrogen that moved sits on the hydronium ion in the acid's colour, on its left, as the book draws it; the reverse half of the arrow longer than the forward half in both rows; lone pairs: two on each water's oxygen (left, below), one on the hydronium oxygen (below), three on the hydroxide oxygen) · read off the image (labels Acid, Base, Acid, Base under H₂O, H₂O, H₃O⁺, OH⁻; the alt text's "Acid₁, Base₂" subscripts and purple and green are not in the image, which prints plain Acid and Base in red and blue)
- sim-kw · Sim · ion-product-constant-for-water, water-autoionization, kw-ion-concentrations · variation by slider and choice: the text gives K_w as one number at 25 °C and says it grows with temperature; dragging [H₃O⁺] slides a point along the line [H₃O⁺][OH⁻] = K_w on logarithmic axes, so a tenfold rise in one is a tenfold fall in the other, and a warmer temperature lifts the whole line and pure water with it · arrows: none · still · [H₃O⁺] (concentration, 10⁻¹² to 10⁻² M on a log track, the value shown as the concentration itself, default 1.0 × 10⁻⁷ M, Example 14.1; detent at 2.0 × 10⁻⁶ M, Example 14.2; a dashed circle at pure water, √K_w, recomputed from the temperature) and temperature (choice of the book's five values: 25 °C 1.0 × 10⁻¹⁴ and 100 °C 5.6 × 10⁻¹³ from the text, 80 °C 2.4 × 10⁻¹³ from the Check Your Learning, 40 °C 2.9 × 10⁻¹⁴ and 60 °C 9.3 × 10⁻¹⁴ from exercise 14; a reader on the pure-water circle stays on it when the temperature changes) · headline: pure water's equal concentrations, or how many times as much of one ion as the other · graph alone: [OH⁻] against [H₃O⁺], both 10⁻¹⁴ to 1 M, so the point stays in the frame at every temperature; the K_w line labelled with its value on the half of the line the point is not on; above 25 °C the 25 °C line stays dashed with a key above the frame; the diagonal [OH⁻] = [H₃O⁺] dashed ink; pure water a hollow dot; the point's two values on its drop lines, beside the point where it nears an edge; hover names on the two dots · 2D · readout [OH⁻] = K_w/[H₃O⁺] with the live numbers (Example 14.2's form), on the circle [H₃O⁺] = [OH⁻] = √K_w (Example 14.1's form)
  works: read off the text (Example 14.1: 1.0 × 10⁻⁷ M each at 25 °C; Check Your Learning: 4.9 × 10⁻⁷ M at 80 °C; Example 14.2: [H₃O⁺] 2.0 × 10⁻⁶ M gives [OH⁻] 5.0 × 10⁻⁹ M) · must hold (the product of the two values shown equals the K_w shown at every setting; on the circle the two values are equal and the readout takes Example 14.1's form; at 80 °C pure water reads 4.9 × 10⁻⁷ M; the point never leaves the frame; no label covers the point or another label)
  Kept 2026-11-14: the slider had read the logarithm (−7.00) rather than the concentration, the 100 °C point left the frame and was pinned, the 25 °C label and the value labels collided with the point at the slider's ends, and the caption ran to five sentences.

No photograph in the module. Extra simulations: none.

## Referents

- `pair-acid` and `pair-base` · removed 2026-11-14 with the three figures that drew them
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
