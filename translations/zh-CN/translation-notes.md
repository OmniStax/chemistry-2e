# Translation notes: 化学（第2版）

Every forced scenario of the translation of `Chemistry 2e` into zh-CN
(`docs/prompts/translate.md` item 4), and anything else the owner should see: one entry per
place, with the file, the span or line, what was done and why.

| File | Span or line | What was done | Why |
|---|---|---|---|
| book.json | `title` | 化学（第2版） | No official Chinese edition of OpenStax Chemistry 2e is known. 化学 is how Chinese names the subject and its textbooks; the edition is marked （第2版）, the Chinese convention, not `2e`. Owner to confirm. |
| book.json | `concepts` outside chapter 1 | kept in English | The concepts table is copied whole so every id matches the source; only the 84 concepts of chapter 1 are translated in the pilot. |
| glossary.zh-CN.json | every row with `"confirm": "termonline"` | term taken from the named published authority | 174 rows were not found (or not looked up) at termonline.cn; each is to be confirmed there and its entry URL added. |
| glossary.zh-CN.json | row `lead oxide` | 氧化铅 | The book writes "lead oxide" for the battery material PbO₂; 化学名词 would say 二氧化铅 (氧化铅 is PbO). Kept as the book words it; owner to decide whether to correct it upstream. |

## Chapter 1 sections

The forced scenarios the seven page translators recorded (folded in from their `forced-scenarios.md` files in the 2026-10-26 merge), grouped by page; `ch01/config.md` carries the same rows. The merge dropped the rows that were no forced scenario (a figure with no grammar branch, kept unit symbols, the English `answer.parts[].part`, which is an owner note below) and added the cross-page ones (the table eyebrows, the compound words that hold a concept's word, the state adjectives 固态/液态, the scale spans, the Greek word of 1.2, the sentence that names the alias of scientific notation, the verb 加热).

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.2/text.html, ch01/1.3/text.html, ch01/1.4/text.html, ch01/1.6/text.html | spans on 天然气 (`gas`, wraps 气), 室温 (`temperature`), 棱长 (`length`), 体温 (`temperature`), 温标 (`temperature`, 12 spans, 1.6) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 气体, 温度, 长度 | the source wraps one English word of "natural gas", "room temperature", "edge length", "body temperature", "temperature scale"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Sim` and the bare `Figure` of 1.5 kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| every text.html | table eyebrows `Table 1.1` to `Table 1.6` | written 表 1.1 to 表 1.6 | translate.md 5 lists a table's eyebrow as translated; `ost check` and `translation_parity.py` read only the Figure and Sim eyebrows, so nothing depends on the English; the pages first disagreed (表 on 1.2 and 1.6, Table on 1.4 and 1.5) |
| every text.html, 1.1 section.json | photo credits (12 in the text.html files, 1 in 1.1 section.json) | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X", lettered credits （来源 a：…；b：…）; names and organisations kept as printed (USGS, NIH History Office, NIST in English) | The physics edition writes （来源：…） and 改编自 X 的作品; the pages had four formulas (改编自X的作品, 对X作品的修改, 对X作品的改编, 来源：) and two label layouts (review pass 5); "credit" is translated, the names are not (translate.md 5) |

### ch01/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/intro/text.html | `<span data-concept="gas">gas</span> tank` (1st paragraph) | span wraps 汽油 (gasoline) rather than 气体 | English "gas" here means gasoline; Chinese has no single word for both, glossary 气体 would be wrong in 加气体 |

### ch01/1.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.1/text.html | `<em>Macro</em> is a Greek word that means “large.”` and `<em>Micro</em> comes from Greek and means “small.”` | The Greek prefixes stay in Latin letters inside the `<em>`, the meaning is translated: `<em>Macro</em> 是一个希腊词，意思是“大”。` | Sentences about the origin of an English word part (translate.md 4.3); the Chinese terms 宏观/微观 carry the meaning |
| ch01/1.1/text.html | `(credit a: …; b: …)`, `(credit a: …)` | Rendered `（图片来源 a：…；b：…）`; names kept | Photo credit words are translated, names kept (section 5 table) |
| ch01/1.1/text.html / section.json | `14 lb`, `2 lbs`, `1 lb` (exercises q4, q7) | Written `14 磅`, `2 磅`, `1 磅` in prose | Unit with a target name in prose (translate.md 4.4); lb has no SI symbol in the book |
| ch01/1.1/text.html | Figure 1.2 caption: `Alma Levant Hayden`, `FDA`, `Percy Lavon Julian` | Names kept in Latin letters; FDA expanded once as `美国食品药品监督管理局（FDA）` | Names of people without a standard rendering kept (2.7); FDA is an acronym the reader needs glossed in Chinese |
| ch01/1.1/figures.js | `NAME[sym] + ' atom of a water molecule'` (hover names, 5 places) | Becomes `NAME[sym] + '原子，属于水分子'` | English genitive phrase; Chinese needs the noun before the qualifier, code shape kept |
| ch01/1.1/figures.js | `WORD = { s: 'a solid', l: 'a liquid', g: 'a gas' }` | Articles dropped: `固体`, `液体`, `气体` | English article grammar collapses to one Chinese form (4.1) |
| ch01/1.1/figures.js | `headOf` template `At ${t} °C the water … is ${WORD[s]}, H₂O(${s}), and its molecules are ${MICRO[s]}.` | Template rewritten in Chinese word order with the same four slots: `在 ${t} °C 时，烧杯中的水是${WORD[s]}，H₂O(${s})，其分子${MICRO[s]}。` | English sentence frame cannot carry the slots in the same order |
| ch01/1.1/figures.js | Figure 1.4 arrow labels `Results / not consistent with / prediction`, `Results / are consistent with / prediction` | Three lines kept as `结果 / 不符合 / 预测`, `结果 / 符合 / 预测`; middle line bold as in the source | Chinese word order differs (结果与预测不符); the three-line layout of the figure is kept |

### ch01/1.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.2/figures.js | sim-electrolysis, the three count lines | `(12 - n === 1 ? '' : 's')`, `(h2 === 1 ? '' : 's')`, `(o2 === 1 ? '' : 's')` collapsed to `''` in both branches; the nouns written ` 个水分子`, ` 个氢分子`, ` 个氧分子` | English plural branch in figure code (4.1) |
| ch01/1.2/figures.js | `namer`, `water3`, `diatomic3`, `flat`, `build` | the hover name `NAME[sym] + ' atom of ' + of` becomes `NAME[sym] + '原子，属于' + of` (氢原子，属于氢分子 H₂); the `of` strings (`a hydrogen molecule, H₂` …) have their article dropped (氢分子 H₂) | English "a/an … of …" built by concatenation (4.1) |
| ch01/1.2/figures.js | sim-states, `NAMES` | `solid/liquid/gas` written 固态/液态/气态 (states) where the glossary has 固体/液体/气体 (substances); the headline `the water as a ` + state written `水处于` + state | the array names the state of the sample, not a body of matter; Chinese needs 态 for the state (4.1) |
| ch01/1.2/figures.js | sim-conservation, readout | subscripts `\text{before}` and `\text{after}` written `\text{前}` and `\text{后}` | a subscript wants the shortest form (4.7) |
| ch01/1.2/text.html | atoms-molecules, spider-web paragraph | "a dime" written 10 美分硬币 (one form with 1.4), "a football field" 足球场 | cultural reference, translated for meaning (4.4); 一角硬币 reads as a Chinese 1-jiao coin, so the coin is named by its value as in 1.4 and 1.5 (review pass 5) |
| ch01/1.2/text.html | atoms-molecules, lead atoms paragraph | "300 trillion" written 300 万亿 (the Chinese number word for 3 × 10^14); 3 × 10^14 kept | Chinese counts in 万 and 亿 (4.4) |
| ch01/1.2/section.json | e17 prompt and solution | "one pound" written 一磅 (the unit has no symbol in the source); "350 °F" kept | unit without a symbol takes the target name (4.4) |
| ch01/1.2/text.html, ch01/1.3/text.html | pure-substances, conservation, everyday-life | a `data-concept` span for a compound-name term (oxide, acid, sulfate) wraps the whole Chinese compound name (氧化汞(II), 氧化铅, 硫酸, 硫酸铅, 硝酸 (1.3 chemical-change), 氧化铟锡, 聚环氧乙烷) | Chinese names the compound in one word; the span cannot wrap only "oxide" (3) |
| ch01/1.2/text.html | mass-weight, "the force of gravity changes" | `重力<span data-concept="force">作用力</span>`; the span stays in its block | Chinese has no word for "the force" apart from 重力, which is itself the force (3) |
| ch01/1.2/text.html | pure-substances, "Free sodium, an element that is …" | written 游离的钠（一种<span>元素</span>，是…金属固体）和游离的氯（一种<span>元素</span>，是…气体） | keeps both `element` spans and the sentence; the relative clause becomes a parenthesis (3) |
| ch01/1.2/text.html | atomos (the Greek origin of "atom") | kept in Latin letters inside the `<em>`, the meaning translated: 源自希腊语 <em>atomos</em>，意为“不可分的” | a Greek word cited for its origin, with no Chinese equivalent (translate.md 4.3) |
| ch01/1.2/text.html | compounds, "broken down by heat" (span `heat-flow`) | the span wraps the verb 加热 and not the glossary row heat 热量: 可以通过加热分解为元素 | Chinese says 加热 where English says "by heat"; the span stays in its block |
| ch01/1.2/text.html | fuel-cell box, "hydrogen and oxygen gases" (span `gas`) | written 氢和氧两种气体, the span on 气体 | 氢气和氧气体 would put the span on a bound 气; the added 两种 carries the plural |
| ch01/1.2/text.html, ch01/1.3/text.html | `solid` and `liquid` spans: "between solid, liquid, or gas states", "liquid water", "solid wax" | the spans wrap 固态 and 液态 (the state, used as an adjective), where the glossary has 固体 and 液体 (the body of matter) | Chinese says 固态蜡, 液态水 and the state of matter takes 态 (as in the sim-states row of 1.2); the noun stays 固体, 液体 |

### ch01/1.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.3/text.html | extensive: `a gallon`, `a cup` (data-type volume spans, also in the sim-head) | 一加仑、一杯, the unit named in Chinese, no conversion | a unit with no equivalent (4.4) |
| ch01/1.3/figures.js | fig-hazard-diamond `SPECIAL` abbreviations `OX`, `ACID`, `ALK`, `COR`, `W` | letters kept as the sign prints them, only the meanings translated | abbreviations printed on the NFPA sign (4.3) |
| ch01/1.3/text.html | #chemical, "all forms of combustion (burning)" | written 各种形式的燃烧; the gloss "(burning)" is not written | 燃烧 already means burning, so the gloss would read 燃烧（燃烧）; the Chinese has no second word for the plain "burning" (collision, translate.md 4.5) |
| ch01/1.3/text.html, ch01/1.3/section.json | Figure 1.21 caption and sim-head, #hazard: "National Fire Protection Agency (NFPA)" | written 美国消防协会（NFPA）, and "NFPA 704 Hazard Identification System" 美国消防协会（NFPA）704 危险识别系统 | The real name is the National Fire Protection Association (美国消防协会), so this corrects the book's "Agency" and adds 美国; the correction is recorded for the owner (root item 13) |

### ch01/1.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.4/text.html | #si-units, #prefixes table rows (femto … tera) | prefix names written with the English in parentheses in the table (飞（femto）…); in the prose 词头<em>千</em>（kilo） | the passage is about the prefix names themselves, which are given as English words (4.3) |
| ch01/1.4/text.html | #temperature, "kelvin (all lowercase)" | rendered 开尔文（kelvin，全部小写） | a sentence about English spelling and case (4.3) |
| ch01/1.4/text.html | #volume, "The abbreviation cc (for cubic centimeter)" | rendered 缩写 cc（来自英文 cubic centimeter，即立方厘米），the strong letters c kept | a sentence about the letters of an English abbreviation (4.3) |
| ch01/1.2/text.html, ch01/1.4/text.html, ch01/1.4/section.json, ch01/1.4/figures.js | dime (1.2 spider-web paragraph; Figure 1.25 sim-head, original_caption, sim-volume label '1.8 cm dime') | rendered 10 美分硬币 | a US coin with no Chinese equivalent, named by its value (4.4) |
| ch01/1.4/text.html, ch01/1.4/section.json | inches, feet, yards, miles, pounds, gallons, quarts, pints in prose and exercise e1 | named 英寸、英尺、码、英里、磅、加仑、夸脱、品脱; symbols (in., yd, ft, yr) kept as printed | units with no SI equivalent keep their symbol and take the Chinese name in prose (4.4) |
| ch01/1.4/text.html | #si-units, "from the French, Le Système International d’Unités" | rendered 源自法语 and the French title kept in <em> | the French phrase is the origin of the abbreviation SI; no Chinese equivalent (4.3) |
| ch01/1.4/text.html | Example 1.2 solution, the simulator button “turn fluid into water” | rendered “将流体变为水”, and the material “iron” as “铁” | the PhET interface is translated for the reader as the instruction reads (no equivalent label fixed) |
| ch01/1.4/figures.js | sim-density MATS names, REF keys, `name === '金'`; sim-displacement MATS names and the `who` map keys | the display names of the materials are translated in place, and the object keys / comparison that look the name up (REF { 铅, 金 }, { 铁, 木 }, name === '金') follow them | the display name is also the lookup key in the code; the logic is unchanged |
| ch01/1.4/figures.js | sim-density headline, hover names; sim-displacement headline, hover names, block labels | operand order changed ('A cube of NAME A cm on an edge' to '棱长为 A cm 的NAME立方体'; 'the NAME block' to NAME块; the leading 'a cube of' dropped from the hover name); the leading articles dropped | Chinese word order; English articles have no Chinese form (4.1) |
| ch01/1.4/figures.js | sim-density `other` sentence | 'times as dense as gold' / 'times as dense' rendered 的密度是金的 N 倍 / 的密度是它的 N 倍 | Chinese word order |
| ch01/1.4/text.html | #three-parts, "Scientific notation is also known as exponential notation" | 科学记数法也称指数记数法; the alias 指数记数法 appears in this sentence and in ch01/1.6/section.json p15 (用科学（指数）记数法, the source writes "scientific (exponential) notation"); everywhere else the book's "exponential notation" is 科学记数法 (glossary row exponential notation) | a sentence that names the same thing twice would read "科学记数法也称科学记数法"; the alias is the literal rendering (translate.md 4.5) |

### ch01/1.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.5/text.html | `uncertainty` section, "called <strong><span data-concept="significant-figures">significant figures</span></strong> or <strong><span data-concept="significant-figures">significant digits</span></strong>" | written 称为<strong><span data-concept="significant-figures">有效数字</span></strong>（英文 significant figures 或 <strong><span data-concept="significant-figures">significant digits</span></strong>）: the Chinese term carries the first strong and span, the second English synonym is kept in Latin letters inside its own strong and span, so both `strong` and both `significant-figures` spans stay | A sentence about two English synonyms for one term; the glossary renders both as 有效数字, so "有效数字或有效数字" would be meaningless (collision, translate.md 4.5, with the English kept in parentheses as 4.3 allows). The first draft dropped the second strong and span; review pass 5 restored them |
| ch01/1.5/figures.js | `displacement()` : `'volume of the ' + what`, `'mass of the ' + what`, the headline and the readout's `small` line | The concatenation order changes (`what + '的体积'`, `'浸没 … g 的' + what + '时…'`, `what + '的密度是…'`); `what` is now '钢筋' / '物块' | Chinese puts the possessor before the noun and the phrase around `what` cannot stay a prefix; code otherwise unchanged (grammar built from English, 4.1) |
| ch01/1.5/text.html, ch01/1.5/section.json | foot, inch, pound, ounce, gallon, quarter (coin); Kansas City, San Francisco | 英尺, 英寸, 磅, 盎司, 加仑, 25 美分硬币; 堪萨斯城, 旧金山; the symbols `mi/h`, `oz` in the table caption kept | A unit, idiom or place name with no equivalent keeps its symbol and takes the target name in prose (4.4) |
| ch01/1.5/text.html | census sentence "to the <span data-concept="exact-number">exact number</span> of people" | The span wraps 精确 only, in "确定到了精确的人数" | The Chinese phrase has no noun "精确数" there; the span stays in the same place (4.4/word order) |
| ch01/1.5/section.json | exercise e2 (c), "the number of grams in your weight" | 你的体重所含的克数 (体重 for a person's body weight, not the glossary's 重量); glossary row body weight | "your weight" in an exercise on the number of grams in it means the person's body weight, and 重量 would read as an object's weight; flagged for the owner |

### ch01/1.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.6/figures.js | reference-line labels `[100, 'Boiling point', 'of water']`, `[0, 'Freezing point', 'of water']` | the two stacked strings kept as two lines: `'水的'` over `'沸点'` and `'水的'` over `'凝固点'` | Chinese puts the qualifier before the noun, so the two-line split of the English label is reproduced as a split of 水的沸点 |
| ch01/1.6/figures.js | `SCALES[].name`, `specials` labels | `Fahrenheit`, `Celsius`, `Kelvin` set as the glossary targets 华氏度, 摄氏度, 开尔文 (the English names are adjectives of "scale") | the thermometer names stand alone over each tube |
| ch01/1.4/text.html, ch01/1.6/text.html, ch01/1.6/section.json | `Celsius scale`, `Fahrenheit scale`, `kelvin scale` spans | span wraps 摄氏 / 华氏 / 开尔文 and 温标 follows outside it | the glossary targets 摄氏度 / 华氏度 name the unit; the scale needs 温标 |
| ch01/1.6/text.html | `\text{(average) mileage}` | rendered 燃油经济性, like "fuel economy" in the exercise | the Chinese has no single word for miles-per-gallon mileage |
| ch01/1.6/text.html | `50-Trillion Angstrom Run` (section.json p23) | translated as 50 万亿埃跑; "trillion" is 10^12, written 万亿 | Chinese groups by 万 |
| ch01/1.6/section.json | exercise prompts "4.00-qt", "12.0-oz", "150-mL", "12.0-gal", "8.5- × 11-inch" | hyphenated compound modifiers written without the hyphen (4.00 qt 的 …) | Chinese has no hyphenated measure phrases |
| ch01/1.6/section.json | exercises p21 prompt (e), "5.6 × 10<sup>15</sup> tons" | written 5.6 × 10<sup>15</sup> 短吨（美吨）, the number kept | The book means US short tons (2000 lb, about 907 kg; the key is 5.1 × 10^18 kg), and plain 吨 is the metric tonne (1000 kg); the long ton of p19 is 长吨 (unit with no equivalent, translate.md 4.4) |

## Other things for the owner

Pass 2 (glossary and book-level labels), Pass 3 (chapter 1 pages) and Pass 4 (glossary merge), 2026-10-26, claude-sonnet-5-5, medium.

- **Concepts of other chapters stay English.** Only the 84 concepts of chapter 1 have a Chinese `name`, `terms` and `statement`; the other 1,090 concepts of `book.json` are the source's, as `translate.md` item 5 says, and are translated with their chapters. The checker's "waits on section" warnings are those rows.
- **Owner-confirm labels** (`"confirm": "owner"` in the glossary, no authority covers them): the book title 化学（第2版）; the apparatus labels Check Your Learning 学习检测, Link to Learning 学习链接, Chemistry in Everyday Life 日常生活中的化学, Portrait of a Chemist 化学家小传, How Sciences Interrelate 各门科学如何相互联系, Learning Objectives 学习目标, Key Concepts and Summary 关键概念与小结, Key Equations 关键方程式, Chemistry End of Chapter Exercises 化学章末习题, Example 例, Solution 解, Answer 答案, Strategy 思路, Discussion 讨论; the exercise kinds 习题 and 模拟习题; the chapter title 基本概念 and the six section titles; the twelve sheet titles; the page titles 引言 and the chrome words 图, 表, 模拟.
- **termonline was reachable** (headless Chromium through `termonline.py`), but slow (one to three terms a minute), so about 115 terms were looked up and the rest of the 63 rows flagged `"confirm": "termonline"` were not. Of those looked up, a few come back with no exact entry under the English term (gas, mixture, homogeneous and heterogeneous mixture, metal, periodic table, liter, chemistry, chemical property); their targets are the standard textbook terms and stay flagged until someone confirms them on the site.
- **Decisions that differ from, or sit beside, the authority.** `weight` 重量 follows 物理学名词 (the sibling physics book renders the physical quantity as 重力); `states of matter` 物态 (物理学名词) instead of 物质状态; `pressure` 压强 (物理学名词 lists 压强 and 压力, chemistry books write 压力); `metalloid` 半金属 (化学名词, looked up again in review pass 5: 类金属 is the 物理学名词 form, 半金属 there means semimetal; 准金属 is not listed); `conversion factor` 换算因子 (化学名词) against the 换算因数 of GB 3102; `law of conservation of matter` 物质守恒定律 keeps the book's word matter, where termonline lists 质量守恒 (质量守恒定律 is the textbook name); `rounding` 修约 (GB/T 8170), which termonline does not list; `factor-label method` 因子标记法, for which no standard Chinese name was found (a literal rendering); `alchemy` 炼金术, where 化学名词 lists 金丹术; `acidity` 酸性 (property), where 酸度 is the degree of acidity.
- **Collision matter / substance.** Both are 物质 in the authority (物理学名词 lists `substance, matter` under one entry). The book separates them only through `pure substance` 纯净物 (termonline lists 纯物质, 电力名词 only), so the pure substance is the qualified form; the rest is left to context.
- **Collision amount of matter / amount of substance (review pass 5).** 物质的量 is only the SI quantity n (mol, 1.4 Table 1.2). The everyday "amount of matter" (mass as a measure of it, extensive and intensive properties) is 物质的多少 (row amount of matter) in 1.2, 1.3, the concept statements of mass-versus-weight, mass, extensive-property and intensive-property, and the meaning of m in chapter.json.
- **Short ton (review pass 5).** 1.6 exercise p21(e) "5.6 × 10^15 tons" is 短吨（美吨） (row short ton): plain 吨 is the metric tonne and contradicts the keyed 5.1 × 10^18 kg. The long ton of p19 stays 长吨; 1.6 has no metric ton.
- **Factor-label method.** 因子标记法 is kept (no authority); 因子-标签法 is the other common rendering in Chinese translations of US general-chemistry texts. Owner to choose.
- **Section title 1.1** is 情境中的化学 (it read 化学的背景, "background of chemistry"); 化学概览 is the plainer alternative if the owner prefers.
- **Photo credits** use one formula on all pages: （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：…；b：…）.
- **Phase / state.** Section 1.2's title says phases; the text says states. 相 for phase and 物态 for state of matter are kept apart; the term 相 was not found in termonline and is flagged.
- **Type `equilibrium-constant`** has `dimension` "none" (a word), but the type belongs to a later chapter's staging, so `ost` will not write it from chapter 1; it is to be set to 无 with Chapter 13.
- **Decisions of the merge, each with its `note` in the glossary row.** heat is 热量 (the page 1.3 had 热; where the source says "by heat" the span wraps 加热); alcohol is 酒精 (the drink's alcohol, 1.1, 1.2, 1.4) and ethanol 乙醇, the class 醇 waits for Chapter 20; the element name (氧, 氮 …) is the rule, and the element + 气 form (氧气, 氢气, 氮气, 氦气, 氖气, 氡气) only where the source says "gas" or the substance is in the Gases column of Table 1.4; exponential notation is 科学记数法 (the glossary term), except in the one sentence of 1.4 that names both words; "your weight" in the 1.5 exercise is 体重 (a person's body weight), the physical quantity weight stays 重量; uncertainty is 不确定度 everywhere (1.5 had 不确定性 twice). The SI prefixes of 1.4 were checked against GB 3100 (飞 f, 皮 p, 纳 n, 微 μ, 毫 m, 厘 c, 分 d, 千 k, 兆 M, 吉 G, 太 T): no change. 汤姆孙 is the standard name of the physicist the book writes Thompson.
- **Table eyebrows** are written 表 N.M on all six tables; the checker and `translation_parity.py` read only the Figure and Sim eyebrows. If the app ever wants the English `Table N.M`, it is a single replacement.
- **Apparatus wording.** The notes and exercise_notes of the six pages now use one form: 书后答案, 布鲁姆层级, 建议思路, 容差, 由 AI 生成 (1.3 had 布卢姆, 参考答案, AI without spaces; 1.6 had 人工智能; 1.2 had the English (Link to Learning) after 学习链接). The glossary rows answer key, Bloom level and suggested approach are owner-confirm.
- **English `answer.parts[].part`.** translate.md 5 keeps them byte for byte, although a reader sees them: 1.4 exercise s1 ('(a) mass', '(a) volume', '(b) density'), 1.6 (meters, feet; height, weight; thickness, width, length). Owner to decide whether they become translatable.
- **English figure eyebrows and unlinked citations.** `Figure N.M`, `Sim` and the bare `Figure` of 1.5 stay English (translate.md 4.6); the prose citations 图 N.M are plain text until the app's link pattern reads 图.
- **The 12 appendix sheet files** under `sheets/` still carry their English `title` and content; the checker warns that each differs from the book's listed Chinese title. Translating the files is outside this pilot.
- **Unverified termonline rows.** 174 of the 415 glossary rows carry `"confirm": "termonline"` (63 from Pass 2, 110 new in this merge, 1 new in review pass 5: short ton): none of them was looked up at termonline.cn in these passes, and their targets are the standard textbook terms of the named authority. 52 rows carry `"confirm": "owner"`.
- **Rows worth a second look.** 化学符号 (the narrow 元素符号), 晶态固体 (neither it nor 晶体固体 is a termonline entry), 石英玻璃, 聚环氧乙烷 (also 聚氧化乙烯), 泰尔紫, 爆炸 for detonation (爆轰 is the narrow term), 丙三醇 (the common name 甘油), 末尾零 and 中间零 (textbook terms with no standard entry), 重复测量 (JJF 1001), 危险性菱形标志 (the book's own label for the NFPA sign).
- **Names.** A name with a standard Chinese rendering is written in Chinese with the original once in parentheses (约翰·道尔顿（John Dalton）, 留基伯（Leucippus）, 安托万·拉瓦锡（Antoine Lavoisier）); names without one (Alma Levant Hayden, Percy Lavon Julian) and the names in credits stay in Latin letters. Product names (Aventador Roadster, Gatorade) and the symbols tbsp, oz in the 1.6 table stay as printed.
- **Humanizer review and `npm run dev` read-through** are outstanding for the owner.
