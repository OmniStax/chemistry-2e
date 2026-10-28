# Config: 化学（第2版）, Chapter 15 (translation)

The translation pass of `Chemistry 2e` chapter 15 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch15, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added as pending |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` carries the same
entry.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Sim` and the bare `Figure` of 15.2 kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch15/15.1/text.html, ch15/15.3/text.html | photo credits (4 in 15.1, 2 in 15.3: Figures 15.2 to 15.9 as printed) | the chapter 1 formula: （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：…；b：…）; names and organisations (NOAA Photo Library, Wikimedia Commons, Flickr, user names) kept as printed | binding decision of chapter 1 |

### ch15/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch15/intro/text.html | `<span data-concept="ion">ions</span>` (calcium and fluoride ions) | one span on 离子 in 钙和氟离子 (shared by both ions, as in the source) | Chinese coordinates 钙和氟 before the single noun 离子; the span count matches the source |
| ch15/intro/text.html | `<span data-concept="dissolved">dissolved</span>` | span wraps 溶解 (concept term 溶解的) in 溶解在地下水中的 | the participle becomes a verb phrase in Chinese |
| ch15/intro/text.html | `<span data-concept="weak-base">weak base</span>`, `<span data-concept="ion">ion</span>` of "fluoride ion" | spans wrap 弱碱 and 离子 within 氟离子 | English "fluoride ion" is one Chinese compound; the concept word is 离子 |
| ch15/intro/text.html | "(Figure 15.1)" | written 图 15.1 | figure citation formula, plain text (recorded once per book) |

### ch15/15.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch15/15.1/text.html | spans on `carbonate`, `sulfate`, `nitrate`, `hydroxide` inside compound names (calcium carbonate, sodium carbonate, barium sulfate, aluminum sulfate, calcium nitrate, magnesium hydroxide, calcium hydroxide) | the span wraps the whole Chinese compound name (碳酸钙, 碳酸钠, 硫酸钡, 硫酸铝, 硝酸钙, 氢氧化镁, 氢氧化钙); where the English has a separate span for `ion` the anion name is wrapped without 离子 (氢氧根, 碳酸根) and 离子 has its own span | the source wraps one English word of a name that Chinese writes in one word (translate.md 3.3, the span stays in its block) |
| ch15/15.1/text.html | `acid reflux disease` (span `acid`) | the span wraps 胃食管反流病 | the glossary name of the condition does not contain 酸 |
| ch15/15.1/text.html | `sparingly soluble`, `slightly soluble`, `least soluble` (span `soluble`) | the span wraps 微溶的 / 微溶 / 最难溶; both "sparingly" and "slightly" are 微溶的 | the glossary gives 微溶的 for both adverbs; the concept word 可溶的 is inside no Chinese compound here |
| ch15/15.1/text.html | `solubility product`, `solubility products` (span `solubility` alone, or `solubility` and `product` as two spans), `solubility equilibria` / `solubility equilibrium` (span `solubility`, with `equilibrium` a second span in some places) | 溶度积 (or 溶度 + 积 when two spans) and 溶解 + 平衡 (or 溶解 alone) carry the spans; 溶度积常数 in "solubility product constants" (span `solubility`) wraps the whole term | the Chinese terms 溶度积 and 溶解平衡 do not contain 溶解度, and the one English word `solubility` is a span of its own |
| ch15/15.1/text.html | `halide ions` (spans `halide`, `ion`) | 卤 and 离子 each carry one span | 卤离子 is the Chinese compound for the pair of English words |
| ch15/15.1/text.html | Example 15.3, "for each moles of Br dissolved" | rendered 每溶解一摩尔 Br, with the same spans (`dissolved`, three `mole`, `ion`) | the source's "each moles" is a slip that has no Chinese form |
| ch15/15.1/text.html | #ksp-solubility and Example 15.4, "moles of dissolved solute per liter", "moles of calcium ion … moles of compound" (spans `mole`) | 物质的量 (物质的量（以摩尔计） in the first; the two `mole` spans of Example 15.4 wrap 物质的量) | 物质的量 only for amount of substance (chapter 1 decision, no 摩尔数); the concept `mole` has no word 摩尔 in the second sentence, so the span wraps 物质的量 and the span count stays that of the source (review pass) |
| ch15/15.3/text.html | "triprotic phosphate ions", "monoprotic hydroxide ions" | 可结合三个质子的磷酸根离子, 只能结合一个质子的氢氧根离子 | 三元/一元 describe acids (三元酸); these are bases, so the proton count is written out (review pass) |
| ch15/15.1/text.html, ch15/15.1/section.json | "Le ChÂtelier’s principle" (text.html #common-ion; section.json `notes`; exercise answers print "Le Châtelier") | rendered 勒夏特列原理; the misprinted “Â” cannot be carried and `notes` says so | a misspelling of an English name (4.3); the glossary term is 勒夏特列原理 |
| ch15/15.1/text.html, ch15/15.1/section.json | ASCII `,` `.` `;` `?` closing a math run (`${\text{Hg}}_{2}{}^{\text{2+}},$`, `$[{\text{Hg}}_{\text{2}}{}^{\text{2+}}],$`, `${\text{C}}_{2}{\text{O}}_{4}{}^{\text{2−}},$` in text.html; cyl8 and e25 `?$`, e37 `.$`, e15 (5 runs), e45 solution (2 runs), e9 solution (3 runs) in section.json) | the mark is taken out of the `$…$` run and written outside it as full-width punctuation (，。；？) | prose punctuation follows the target language (3.5); left inside the run it would print as ASCII after Chinese text |
| ch15/15.1/text.html, ch15/15.1/section.json | "2.0 × 10<sup>–4</sup>-<em>M</em>", "0.010-<em>M</em>", "0.050-<em>M</em>", "0.50-<em>M</em>", "0.015-<em>M</em>", "3.00 × 10<sup>–3</sup>-<em>M</em>" | written with a space and no hyphen (… <em>M</em> 的溶液) | Chinese has no hyphenated measure phrases (same as ch01/1.6) |
| ch15/15.1/section.json | e8, e9 prompts, "the ionic equation for dissolution" | rendered 溶解的离子方程式 | word order |
| ch15/15.1/section.json | e23 "“gyp” water" | rendered “gyp”水, the quoted English word kept | an American slang name (from gypsum) with no Chinese equivalent (4.4) |
| ch15/15.1/section.json | e2 prompt, "(b" left unclosed | rendered （b with the opening full-width bracket only | the book's slip is kept, not corrected (3.2) |
| ch15/15.1/section.json | e101 "Chemistry Advanced Placement Examination" | rendered 化学大学先修课程考试 (glossary: Advanced Placement = 大学先修课程) | an American exam name with no Chinese equivalent (4.4) |
| ch15/15.1/section.json | e23 prompt, "Public Health Service" | rendered 美国公共卫生署 | an American agency with no Chinese equivalent (4.4) |
| ch15/15.1/section.json | `ai`, `figures[].ai` | the translator appended after the source's makers (translate.md 9.2) | provenance, not a change of content |
| ch15/15.1/figures.js | sim-agcl `NAME` (`a silver ion, Ag⁺`, `a chloride ion, Cl⁻`), the three `a water molecule, H₂O` hover names, `the bench`, `the beaker` | the leading articles dropped: 银离子 Ag⁺, 氯离子 Cl⁻, 水分子 H₂O, 工作台, 烧杯 | English articles have no Chinese form (4.1) |
| ch15/15.1/figures.js | sim-agcl `NOTE`, "one Ag⁺ ion for every 4.4 million water molecules" | rendered 每 440 万个水分子含有一个 Ag⁺ 离子 | Chinese groups numbers by 万 |
| ch15/15.1/figures.js | sim-ksp-plane headline, "Qsp is N times Ksp" and "Qsp is P% of Ksp" | rendered 是 Ksp 的 N 倍 / 为 Ksp 的 P%; the clause "so AgCl precipitates until [Ag⁺] and [Cl⁻] fall to …" keeps its place | Chinese word order of the possessor before the noun; the code around the strings is unchanged |
| ch15/15.1/figures.js | sim-ksp-plane hover name, `${salt} ${on ? 'precipitates' : 'does not precipitate'}` | rendered `${salt} ${on ? '沉淀' : '不沉淀'}`; the singular and plural forms of the English verb are one form | English verb agreement collapses to one Chinese form (4.1) |

### ch15/15.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch15/15.2/text.html | `oxide ions` (spans `oxide`, `ion`, #other-acids) | 氧 and 离子 each carry one span | 氧离子 is the Chinese compound for the pair of English words |
| ch15/15.2/text.html | `neutral molecules` (spans `neutral`, `molecule`) | 电中性 and 分子 each carry one span | the Chinese compound 电中性分子 is the pair of English words |
| ch15/15.2/text.html | "a hydrogen ion", "a water molecule", "an ammonia molecule", "a silver ion", "a fluoride ion", "two ammonia molecules" (`data-ref` spans) | the leading articles and numerals dropped or turned into 一个 / 两个; 一个 stays inside the span | English articles have no Chinese form (4.1) |
| ch15/15.2/text.html | "the complex ion, Ag(NH₃)₂⁺," in #dissolution; "$\text{Ag}(\text{NH}_3)_2{}^{+}.$" in Example 15.14 and "$\text{Ag}(\text{NH}_3)_2{}^{+}.$" after "formation of" | the comma or full stop taken out of the `$…$` run: 配离子 $…$ 可…, … $…$。 (the comma before 可 has no Chinese form and is dropped) | prose punctuation follows the target language (3.5); left inside the run it would print as ASCII after Chinese text (same as 15.1) |
| ch15/15.2/text.html | "$\kKfform$" and "$\kKd$" in parentheses inside the spans `formation-constant` and `dissociation-constant` | parentheses written full-width （$\kKfform$）, （$\kKd$）, still inside the span | prose punctuation follows the target language (3.5) |
| ch15/15.2/text.html | the sentence "For example, the complex ion $Cu(CN)_2^-$ [figure] is produced by the reaction" | 例如，配离子 $…$ [figure] 由下列反应生成 | the subject is carried across the figure as in the source; the verb phrase has no subject of its own in Chinese |
| ch15/15.2/text.html | "Initial concentration (M)", "Change (M)", "Equilibrium concentration (M)" | 初始浓度（M）, 变化（M）, 平衡浓度（M）with full-width brackets | same as 15.1 |
| ch15/15.2/text.html, ch15/15.2/section.json | `-M` after a number: "0.250-M", "0.500-M" (e68, e70) | written with a space and no hyphen (0.250 <em>M</em> 的…溶液) | Chinese has no hyphenated measure phrases (same as ch01/1.6 and 15.1) |
| ch15/15.2/section.json | e66 (3 math runs), e68 and e70 prompts, e80 prompt, e84 solution (a) | the final `.` or `;` inside a `$…$` run taken out and written outside as 。 or ；; in e66 and the others where the Chinese sentence has no mark there it is dropped | prose punctuation follows the target language (3.5) |
| ch15/15.2/section.json | e72 prompt, "potassium cyanide ion" | rendered 氰化钾离子, the slip kept | the book's error stays (3.2); the page's `notes` says so |
| ch15/15.2/section.json | e64 prompt, "0.100 NH₃(aq)" and its footnote | kept without a unit; the footnote 书中给出的氨为 0.100… keeps the correction | the book's error stays (3.2) |
| ch15/15.2/section.json | e74 prompt, "35-mm" | 35 mm | Chinese has no hyphenated measure phrases |
| ch15/15.2/section.json | e76 (d) "(use Al-Cl single bonds)" | （使用 Al-Cl 单键）with the hyphen of the source | the bond label is a formula-like token and is kept as printed |
| ch15/15.2/section.json | e78, e76, e77 solutions: alt texts of the key images | translated; "Ca2+", "PH4+", "B(OH)4−" etc. kept as printed in the English alt text | alt is a reader-visible string (translate.md 5); the formulas in it are not words |
| ch15/15.2/figures.js | `role(...)` labels: `Lewis base`, `Lewis acid`, `Acid-base adduct`, `Base`, `New adduct`, `New base`, `Acid`, `New acid` | 路易斯碱, 路易斯酸, 酸碱加合物, 碱, 新的加合物, 新的碱, 酸, 新的酸 | reader-visible text of the drawing; no grammar involved |
| ch15/15.2/figures.js | sim headline and readout note: `${big(...)} times as much as in pure water`, "Only one dissolved silver ion in N is free Ag⁺; the rest are Ag(NH₃)₂⁺" | 是纯水中的 N 倍; 每 N 个溶解的银离子中，只有一个是游离的 Ag⁺，其余都是 Ag(NH₃)₂⁺; "ammonia" in the headlines and hover name written 氨水 (the sim adds ammonia as a solution) | Chinese word order of the possessor and of the quantity before the noun; the template holes `${…}` keep their place |
| ch15/15.2/figures.js | axis labels `NH_{3} added (M)` and `concentration (M)` | 加入的 NH_{3} (M) and 浓度 (M), the unit bracket ASCII as in 15.1 | the labels are drawn by the axes helper, as in 15.1 |
| ch15/15.2/section.json | `ai`, `ai.figures` | the translator appended after the source's makers; figure rows left as in chapter 1 | provenance, not a change of content (translate.md 9.2) |

### ch15/15.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch15/15.3/text.html | spans on `carbonate` and `hydroxide` inside compound names (calcium carbonate; aluminum hydroxide, sodium hydroxide) | the span wraps the whole Chinese compound name (碳酸钙, 氢氧化铝, 氢氧化钠) | Chinese names the compound in one word; the span cannot wrap only "carbonate" or "hydroxide" (translate.md 3.3) |
| ch15/15.3/text.html | spans on `carbonate`, `hydroxide`, `ion` in "carbonate ion", "hydroxide ion", "bicarbonate ion", "hydroxide" alone | `carbonate` wraps 碳酸根, `hydroxide` wraps 氢氧根, `ion` wraps 离子 (碳酸根 + 离子, 氢氧根 + 离子); in 碳酸氢根离子 only `ion` carries a span | the Chinese names of the anions are 碳酸根 and 氢氧根, not the glossary words 碳酸盐 and 氢氧化物; where the English has no `carbonate` span (bicarbonate) none is added |
| ch15/15.3/text.html | #reefs, #enamel, `sparingly soluble` (span `soluble`) | the span wraps 微溶的 | the glossary gives 微溶的 for sparingly soluble (as in 15.1); 可溶的 is inside no Chinese compound here |
| ch15/15.3/text.html | #enamel, note, "is thus less soluble" (span `soluble`) | written 更难溶解, the span on 溶解 | Chinese says 更难溶解 for "less soluble"; the span stays in its block |
| ch15/15.3/text.html | `solubility equilibria`, `solubility equilibrium` (spans `solubility`, `equilibrium`) | 溶解 + 平衡: the span `solubility` wraps 溶解 and `equilibrium` wraps 平衡 (or 平衡 is bare where the English has no second span) | the glossary name of the pair is 溶解平衡 (15.1); 溶解度平衡 is not Chinese |
| ch15/15.3/text.html | Example 15.15, "from its solubility product expressions" (span `solubility`) | the span wraps 溶度积 in 溶度积表达式 | 溶度积 is the glossary form; the span stays in its block |
| ch15/15.3/text.html | #calculations, "acetic acid" (span `acid`), #enamel "acid waste" (span `acid`), "acid hydrolysis" (span `acid`) | the span wraps 乙酸 (whole compound), 酸 in 酸类废物 and 酸 in 酸水解 | Chinese names acetic acid in one word; the other two keep the bare word 酸 |
| ch15/15.3/text.html | #complex, `<span data-concept="equilibrium-constant">K for the net reaction</span>` | written 净反应的 K, the span on the same words | the source wraps the phrase, not the term; the Chinese keeps the phrase and the symbol |
| ch15/15.3/text.html | #complex, `the complex ion Al(OH)₄⁻` (referent `aluminate`, concept `complex-ion`) | the referent span wraps 配离子 plus the formula (配离子 Al(OH)₄⁻), the inner `complex-ion` span only 配离子; the article "the" is dropped | the referent label of the glossary is 配离子 Al(OH)₄⁻; English article grammar has no Chinese form (4.1) |
| ch15/15.3/text.html | Example 15.16, question "…by the formation of Ag(S₂O₃)₂³⁻?" and section.json cyl2 prompt "…Ag(NH₃)₂⁺?" | the sentence is reordered so that the formula stands inside the clause (…通过形成 $…$ 来溶解 … 的溶液？), and the mark is taken out of the run and written outside it as ？; in section.json cyl2 (two `,$` runs and `?$`) and e93 (`.$`) the mark is written outside the run as ，？。 | prose punctuation follows the target language (3.5), as in 15.1 and 15.2; left inside the run it would print as ASCII after Chinese text (review pass) |
| ch15/15.3/text.html | #enamel, "calcium hydroxyapatite" | written 羟基磷灰石 | the Chinese name already contains the calcium (glossary row hydroxyapatite) |
| ch15/15.3/text.html | #enamel, "This compound dissolved to yield", "the two basic productions"; Example 15.15 "molar solublities" | written 溶解后产生, 碱性产物, 摩尔溶解度 (tense and the source's misspellings collapse) | slips of the source (tense, "productions", "solublities") have no Chinese form; section.json notes says so |
| ch15/15.3/text.html | #enamel, Figure 15.9 alt, the label “Anticavity Fluoride and Antigingivitis Toothpaste” | translated: “防蛀氟化物和抗牙龈炎牙膏” | the label is read in the alt as a product text; no Chinese original is printed on the photograph that the alt could keep |
| ch15/15.3/text.html | #enamel, "4 ppm (4 mg/L)", "2.7 million" | `4 ppm（4 mg/L）` kept; 270 万 | ppm has no Chinese symbol; Chinese counts in 万 (4.4) |
| ch15/15.3/text.html | #enamel, "See the Chemistry in Everyday Life feature…" | the feature is cited as “日常生活中的化学”专栏, the eyebrow of the box | the name of the box is translated (glossary row Chemistry in Everyday Life) |
| ch15/15.3/text.html | Figure 15.7 caption credits | （来源 a：改编自 NOAA Photo Library 的作品；b：改编自 “prilfish”/Flickr 的作品） | the book-wide credit formula of chapter 1 |
| ch15/15.3/text.html | sim-solubility-ph, the sim-head `ref` spans | the spans `al-ion` and `aluminate` wrap only the formulas Al³⁺ and Al(OH)₄⁻, as in the source, not the label words 铝离子 and 配离子 | the source wraps the formulas |
| ch15/15.3/figures.js | sim-solubility-ph, `share` strings and headline | `nearly all of it as Al³⁺`, `N percent of it as Al³⁺` become 其中几乎全部是 Al³⁺ / 其中 N% 是 Al³⁺ in a headline rewritten as 在 pH x 时，Al(OH)₃ 的溶解度为 y M，${share}。 | English word order of the clause and "percent" (grammar built from English, 4.1) |
| ch15/15.3/figures.js | fig-aloh4, `NAME` | `oxygen atom of a hydroxide ion` / `hydrogen atom of a hydroxide ion` become 氢氧根离子中的氧原子 / 氢氧根离子中的氢原子 | English "atom of …" built as a hover name (as in 1.1, 1.2) |
| ch15/15.3/figures.js | sim-solubility-ph, hover names | `[Al³⁺], the line of the acid coupling` written [Al³⁺]，与酸相互关联时的曲线 | English noun phrase "line of the … coupling" needs the Chinese clause order |

