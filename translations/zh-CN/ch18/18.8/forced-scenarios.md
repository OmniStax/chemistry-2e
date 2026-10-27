| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.8/text.html | #oxides: `phosphorus(III) <span data-concept="oxide">oxide</span>`, `phosphorus(V) <span ...>oxide</span>` (6 spans) | each span wraps the whole compound name 氧化磷(III) / 氧化磷(V), not 氧化物 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as 氧化汞(II) in ch01) |
| ch18/18.8/text.html | `phosphorous <span data-concept="acid">acid</span>`, `phosphoric acid`, `orthophosphoric acid` (5 spans) | span wraps 亚磷酸, 磷酸, 正磷酸 | Chinese names the acid in one word (as 硫酸 in ch01) |
| ch18/18.8/text.html | `<span data-concept="halide">halide</span> <span data-concept="ion">ions</span>` | written 卤化物 + 离子, both spans kept side by side | Chinese compound 卤离子 would split the halide span mid-word |
| ch18/18.8/text.html | `<span data-concept="solid">solid</span> phosphorus pentachloride` | span wraps 固态 (state adjective) | Chinese says 固态五氯化磷 (as in ch01 1.2) |
| ch18/18.8/text.html | `<span data-concept="standard-enthalpy-of-formation">enthalpy of formation</span>` | span wraps 生成焓 | the source phrase has no "standard"; 标准生成焓 would add a word |
| ch18/18.8/text.html | `<span data-concept="x-ray-crystallography">X-ray studies</span>` | span wraps X 射线研究 | Chinese word order and the concept name X 射线晶体学 is longer than the phrase |
| ch18/18.8/text.html, section.json | "tons" (exercise 73 prompt, hint, solution) | written 短吨（美吨）, number kept | the book's US short ton; plain 吨 is the metric tonne (as ch01 1.6, translate.md 4.4) |
| ch18/18.8/text.html, section.json | "strike-anywhere matches" | written 擦燃火柴 | idiom/product term with no single standard Chinese equivalent (translate.md 4.4) |
| ch18/18.8/section.json | exercise 71 prompt "dissolving 2.00 g of PCl3 is an excess of water" | written 将 2.00 g PCl3 溶于过量水中; the printed typo "is" for "in" cannot be carried into Chinese; `notes` keeps the English quotation of the typo | an English slip of one word has no Chinese counterpart (translate.md 4.3) |
| ch18/18.8/figures.js | `NAMES` hover names | `phosphorus (P)` etc. written 磷 (P) etc.; atom-symbol labels kept | the symbol in parentheses is the book's pattern |
| ch18/18.8/figures.js | state `head` sentences ("In P₄S₃ a sulfur atom sits in three of the six edges…", "a trigonal pyramid: three chlorine atoms below…") | recast in Chinese word order, same content and slots; "a/an" and plurals collapse | English article and plural grammar (translate.md 4.1) |
