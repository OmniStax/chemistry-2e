# Forced scenarios, 18.11

| File | Span or line | What was done | Why |
|---|---|---|---|
| text.html | spans on 氟气 (`gas`, two spans: "fluorine gas" in the preparation and in the properties paragraphs) | the span wraps the whole Chinese compound 氟气; the concept word is 气体 | the source wraps one English word of "fluorine gas"; Chinese names it in one word (translate.md 3.3; Chapter 1 precedent) |
| text.html | spans on 微溶 (`soluble`, "only slightly soluble" of bromine) | the span wraps 微溶 | the concept word is 可溶的; 微溶 is the standard word for "slightly soluble" and does not contain it |
| text.html | spans on 亚硫酸氢钠 (`sulfite`, "sodium hydrogen sulfite") | the span wraps the whole compound name | the source wraps "hydrogen sulfite" inside "sodium hydrogen sulfite"; Chinese names the salt in one word |
| text.html | spans on 盐酸, 胃酸, 碘酸 and 次氯酸 (`acid`, "hydrochloric acid", "stomach acid", "iodic acid", "hypochlorous acid molecules") | the span wraps the whole compound 盐酸, 胃酸, 碘酸, 次氯酸 | the source wraps the word "acid"; in Chinese 酸 is bound in each name |
| text.html | "halide ions" / "halide ion" (`halide` + `ion`, 7 places) | written 卤 + 离子 with the two spans on 卤 and 离子 | Chinese 卤离子 is one word; the two source spans each keep a word (chapter.json already writes 卤离子) |
| text.html | "hydroxide or oxide ions" (`hydroxide`, `oxide`, `ion`) | written 氢氧根或氧离子, spans on 氢氧根, 氧 and 离子 | Chinese names the ions 氢氧根 and 氧离子, not 氢氧化物离子 / 氧化物离子 |
| text.html | "phosphorus(V) chloride" | written 五氯化磷 | Chinese names the compound by prefix (glossary 五氯化磷); the Stock numeral has no use in the name |
| text.html | "tin(II) chloride", "tin(IV) chloride" | written 氯化锡(II), 氯化锡(IV) | Stock numerals kept as printed, as ch11 writes 氯化锡(II) |
| text.html, section.json notes | the source's English slips: "makes the reaction between them to be imperceptibly slow", "The direct reaction of a metal and a halogen produce", "IF₅is" (Figure 18.63 caption and data-original-caption), "such basic anions, such as" (summary) | translated for meaning with correct Chinese; the notes list the English wording | English agreement, spacing and repetition slips cannot be carried into Chinese |
| text.html, section.json | "HlO₃" (lowercase l), "NaIO₃," (comma in the subscript), "Ca(PO₄)₃F", "tetrachloride (CCl₄)" | kept as printed: HlO<sub>3</sub>, NaIO<sub>3,</sub>, 四氯化物（CCl<sub>4</sub>） | errors of the book stay (translate.md 3.2) |
| text.html | "responsible for the solubility of iodine" | written 决定了碘在含有碘离子的水溶液中的溶解度 | "responsible for" has no one-word Chinese equivalent that keeps 溶解度 as the span; 决定了 carries the meaning |
| text.html | the sentence "...it was important in the production of photographic film and iodoform, CHI₃, is an antiseptic" | translated as two clauses, 它曾在照相胶片的生产中很重要，碘仿 CHI₃ 是一种防腐剂 | the source's run-on is kept in sense; 防腐剂 is the glossary row for antiseptic |
| text.html | chapter references "the chapter on the stoichiometry of chemical reactions", "the chapter on chemical bonding and molecular geometry" | written “化学反应的化学计量”一章, 化学键与分子几何构型的一章 | the Chinese chapter titles of ch04 and ch07 (stoichiometry span on 化学计量) |
| text.html | figure citations 图 18.60 to 18.63, table citation 表 18.3, table eyebrow 表 18.3 | written 图 N.M and 表 18.3 | Chapter 1 precedent (translate.md 4.6), recorded once per book |
| text.html | Figure and Sim eyebrows (`Figure 18.60`–`18.63`, `Sim`) | kept in English | the checker matches the eyebrow against its row (translate.md 4.6) |
| text.html | photo credits (Figures 18.60, 18.61, 18.62) | written （来源：Sahar Atwa）, （来源：Jarek Zok） | Chapter 1 formula for credits |
| text.html | equation of the photochemical decomposition, `\text{sunlight}` | written `\text{日光}` | the word in `\text{}` is translated (translate.md 5) |
| figures.js | sim-halogen-ladder, `cap(NAME[x])` in the story headlines and `ION` | the capitalising call kept (no effect on Chinese); `NAME` and `ION` hold 氟/氯/溴/碘 and 氟离子/氯离子/溴离子/碘离子, and the headlines are written 氯把溴离子氧化成溴 with `ION` already carrying 离子 | English "ion" after `ION[y]` collapses; the sentence frame is rewritten with the same slots |
| figures.js | sim-halogen-ladder, labels `${q}_{2} added`, `${q}⁻ in solution` | written 加入 Cl_{2}, 溶液中有 Cl⁻ | English word order and the article of the hover names cannot be kept |
| figures.js | sim-interhalogens, `COUNT`, `PAIRS`, the `head` template | `COUNT` holds 一/三/五/七, `PAIRS` holds 一个孤电子对 … 三个孤电子对, and the template is rewritten in Chinese word order with the same slots | English numeral words, plural and "is … about …" frame |
| figures.js | sim-interhalogens, readout `bond${B.n > 1 ? 's' : ''}` and `lone pair${lone === 1 ? '' : 's'}` | the plural branches collapse: `\text{个键}`, `\text{个孤电子对}`, `\text{个电子对}` | English plural branch in figure code (translate.md 4.1) |
| figures.js | sim-interhalogens, view buttons `side`, `down the axis` | written 侧视, 沿轴向下 | button labels are reader-visible |
