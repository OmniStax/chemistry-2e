# Translation notes: 化学（第2版）

Every forced scenario of the translation of `Chemistry 2e` into zh-CN
(`docs/prompts/translate.md` item 4), and anything else the owner should see: one entry per
place, with the file, the span or line, what was done and why.

| File | Span or line | What was done | Why |
|---|---|---|---|
| book.json | `title` | 化学（第2版） | No official Chinese edition of OpenStax Chemistry 2e is known. 化学 is how Chinese names the subject and its textbooks; the edition is marked （第2版）, the Chinese convention, not `2e`. Owner to confirm. |
| book.json | `concepts` | all 1,174 translated | The table is copied whole so every id matches the source. Chapter 1's 84 concepts were translated in the pilot; chapters 2-21 translated theirs with their pages (through `ost set`, staged in each chapter's `book-rows.json`). pH and pOH keep their symbols as names. |
| glossary.zh-CN.json | every row with `"confirm": "termonline"` | term taken from the named published authority | 2,784 of the 5,765 rows are still flagged (chapter 1: 111; chapters 2-21: the rest; many were not looked up, the others were looked up and not found under the English term); each is to be confirmed at termonline.cn and its entry URL added. 332 rows carry `"confirm": "owner"` (the book's own apparatus and heading wording, no authority covers them). |
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

- **Concepts.** All 1,174 concepts of `book.json` now have a Chinese `name`, `terms` and `statement` (the other chapters' passes translated theirs; the 2026-10-27 global merge swept five statements to the merged terms). The checker's "waits on section" notes are gone.
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

## Chapter 2 sections

The merge dropped the rows that were no forced scenario (a page with no `figures.js`, pure-formula solutions, the missing comma of Table 2.8, the household words of Table 2.8, the book's own inconsistency of "mass-to-charge" and "charge-to-mass", an exercise answer that prints a capital I, citations of "Table 2.5", the page-level photo-credit, eyebrow and table-eyebrow rows) and moved the cross-page ones into "Every page". Dropped rows that still matter are in "Other things for the owner" below.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.4/text.html, ch02/2.6/text.html, ch02/2.7/text.html, ch02/2.3/text.html, ch02/2.5/text.html | spans on 乙酸 (`acid`, 7 in 2.4), 食盐 (`salt`, 2.4, 2.6), 氯气 and 天然气 (`gas`, 2.6, 2.7), 质谱仪 and 质谱 (`mass`, 2.3), 核裂变 (`fission`, 2.3, wraps 裂变), 硝酸根/硫酸根/碳酸根 (`nitrate`, `sulfate`, `carbonate`, 2.6), 硫酸/碳酸 inside 硫酸铜(II)/十水合碳酸钠 (2.7), 氧化 inside 氧化氮, 氧化亚氮, 氧化碳 (`oxide`, 2.7), 过氧化氢 (`peroxide`), 氧 + 离子 (`oxide` + `ion`, 2.6), 固态 (`solid`), 原子论 (`scientific-theory`, 2.4), 团块 (`mass`, 2.2), 阴极 (`cathode`, 2.2), 电子层 (`shell`, 2.5) | the span wraps the whole Chinese compound or only the word that carries the concept; the glossary targets are 酸, 盐, 气体, 质量, 裂变, 硝酸盐/硫酸盐/碳酸盐, 氧化物, 过氧化物, 固体, 理论, 阴极射线 | the source wraps one English word of "acetic acid", "table salt", "chlorine gas", "mass spectrometer", "nuclear fission" and so on; Chinese names each in one word (translate.md 3.3, the span stays in its block, as in ch01); the spans keep their blocks and their order |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure 2.9 + 2.10` and `Sim` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6), as in ch01 |
| every text.html, section.json | figure citations in the prose | written 图 N.M, plain text | the app links only `Figure N.M` (translate.md 4.6); recorded once for the book in ch01 |
| ch02/2.1/text.html, ch02/2.3/text.html, ch02/2.6/text.html, ch02/2.7/text.html | table eyebrows `Table 2.1` to `Table 2.13` (13 tables) | written 表 2.1 to 表 2.13 | translate.md 5 lists a table's eyebrow as translated; same as ch01 |
| ch02/intro, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 text.html, 2.1, 2.2, 2.4 section.json | photo credits (23 occurrences, counting the copies in `data-original-caption` and `original_caption`) | （来源：X）, （来源：改编自 X 的作品）, lettered or positional （来源 a：…；b：…）, （来源 左下：…；右下：…）, （来源 中：…；右：…）, （来源 铜：…）; names, organisations and the URL kept as printed; a space before the opening quote of a quoted name (改编自 “Kurzon”) | the book-wide credit formula of ch01; "credit" is translated, the names are not (translate.md 5) |

### ch02/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/intro/text.html | `<span data-concept="molecule">molecule</span>’s identity` (2nd paragraph) | span wraps 分子 in 分子的特性; "identity" written 特性 | Chinese word order and no plural/possessive form; span stays in its block |
| ch02/intro/text.html | "the amounts and identities of certain molecules" | written 某些分子的含量和种类 | "identities" has no plural in Chinese; 种类 carries the sense |
| ch02/intro/text.html | "concept of molecular identity" | written 分子特性这一概念 (no span in the source) | Chinese word order |

### ch02/2.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.1/figures.js | sim-isooctane, `headline` template `(at ? 'Sample ' + at[0] + ', ' : 'A sample of ') + m + ' g of isooctane holds …'` | rewritten with both branches carrying the mass and 异辛烷: `(at ? '样品 A，17.60 g 异辛烷' : '一份 17.60 g 的异辛烷样品') + '含有 … g 碳和 … g 氢，即每 1.00 g 氢对应 5.33 g 碳。'` | English sentence frame (`A sample of` / `Sample A,` + verb `holds`) cannot take the slots in the same order (4.1) |
| ch02/2.1/figures.js | sim-isooctane, strip label `'per 1.00 g'` / `'of hydrogen'` on two lines | written `每 1.00 g` / `氢` | the English phrase breaks after the quantity; Chinese 每 1.00 g 氢 keeps the two-line layout |
| ch02/2.1/figures.js | sim-copper-oxygen, hover name `'oxygen atom of an O₂ molecule'`; sim-copper-chlorides `NAME[q.s] + ' atom'` | `'O₂ 分子中的氧原子'`; `NAME[q.s] + '原子'` | English "X of Y" and the space before `atom` have no Chinese form (4.1) |
| ch02/2.1/section.json | e1 solution "postulate that that atoms are not created" | "that that" written once: 即原子在化学变化中不会被创造 | a doubled "that" in the source is a typo with no Chinese counterpart (4.1) |
| ch02/2.1/text.html | "the earliest …" sentence on atomos | the Greek word kept as `<em>atomos</em>` with the source's gloss "不可分割" | a sentence about the Greek word itself (4.3), the word is kept as printed |
| ch02/2.1/text.html, section.json | "penny" (Figure 2.2 caption and alt) | 1 美分硬币 | US coin with no Chinese equivalent (4.4); same method as ch01's 10 美分硬币 |

### ch02/2.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.2/text.html | #cathode-ray, "the cathode ray" / "a cathode ray tube" (`cathode` spans) | the span wraps 阴极 and 射线 / 射线管 follow outside it (`<span data-concept="cathode">阴极</span>射线`) | the source wraps the word "cathode" of the compound; the glossary has 阴极射线 as a whole, the span keeps the concept word (translate.md 3.3) |
| ch02/2.2/text.html | #atom-models, "a positively charged mass" (`mass` span) | written 一个带正电的<span data-concept="mass">团块</span> | the book's "mass" here means a lump, not the quantity; 质量 would be wrong, the span stays in its block |
| ch02/2.2/text.html | #atom-models, "a Saturn-like atom" | written 一种类似土星的<span>原子</span> | the glossary row 土星模型 names the model; the sentence postulates an atom and its `atom` span must stay |
| ch02/2.2/text.html | #gold-foil, `<strong>alpha particles (α particles)</strong>` | written `<strong><span>α 粒子</span>（alpha particles）</strong>` | both English names are 'α 粒子' in Chinese, so 'α 粒子（α 粒子）' would define nothing; the English alias is kept in the parentheses, both strong and span stay (collision, translate.md 4.5) |
| ch02/2.2/text.html | #cathode-ray, "The term “electron” was coined in 1891 … from “electric ion.”" | “电子”一词（英文 electron）…取自“<em>electr</em>ic i<em>on</em>”, the English etymon kept with the source's em marks | a sentence about the origin of an English word (translate.md 4.3) |
| ch02/2.2/text.html, section.json | “plums” (Figure 2.8 caption) | 葡萄干（英文称“plums”） | the caption turns on the English word for raisins (translate.md 4.2/4.3) |
| ch02/2.2/text.html | "a 15-inch shell" (Rutherford's quotation) | 15 英寸的炮弹 | unit with no SI symbol in the source takes the target name (4.4) |
| ch02/2.2/text.html | footnote 1 (Rutherford 1938) | the title “The Development of the Theory of Atomic Structure” translated, the book title *Background to Modern Science* and the editors Ratcliffe and Pagel kept in Latin letters, Needham written 李约瑟（Joseph Needham）, publisher 剑桥大学出版社, “Accessed …” 2014 年 9 月 22 日访问 | a bibliographic reference: the cited work's own title and names stay as printed, the apparatus words are translated |
| ch02/2.2/text.html, section.json | "plum pudding atom" / "Rutherford atom" (sim-head, exercises) | 葡萄干布丁原子 / 卢瑟福原子; in "the plum pudding model atom" written “葡萄干布丁”模型原子 | one short form of 'the atom of the model' in prose and labels |
| ch02/2.2/figures.js | sim-oil-drop, topline `['', 'once', 'twice', 'three times', 'four times'][k]`, `fate`, hover name `'… extra electron' + (n() > 1 ? 's' : '')` | the ordinal words become `['', '1 倍', '2 倍', '3 倍', '4 倍']`; the sentence frame is rewritten in Chinese order with the same slots (油滴 A 带电 … C，是 1.6 × 10⁻¹⁹ C 的 3 倍；在 … kN/C 时它下落。); `fate` values 悬停/下落/上升 and the comparison in the readout follow; the hover name is 油滴 A，多出 n 个电子 with the plural branch dropped | English word-built phrases and plural branch in figure code (4.1) |
| ch02/2.2/figures.js | sim-gold-foil, topline `words[…]`, `pass(es)`, `is/are`, `bounce(s)` | `words` becomes ['没有', '1 个', …, '9 个'] and the sentence '在 9 个 α 粒子中，' + words + '径直穿过，' … '被弹回。' | English subject-verb agreement and number words in figure code (4.1) |
| ch02/2.2/figures.js | sim-gold-foil, readout `'The ' + nm + ' nucleus carries …'`, `'… the whole ' + nm + ' atom'`, the tally sentence | rewritten in Chinese word order with the same slots (nm + '原子核把全部这些正电荷集中在极小的体积内。'; '到目前已发射的 N 个 α 粒子中，…') | English sentence frame cannot take the slots in the same order (4.1) |
| ch02/2.2/figures.js | sim-gold-foil, hover name `'thin ' + name + ' foil'` and labels `name + ' foil'`, `name + ' nucleus'` | 薄 + name + 箔; name + 箔; name + 原子核 | operand order and article of the English noun phrase (4.1) |
| ch02/2.2/figures.js | sim-cathode-ray, plate options `'+ top'` / `'+ bottom'` | `'+ 在上'` / `'+ 在下'` | the English adverbial phrase has no shorter Chinese form that keeps the + (4.7) |
| ch02/2.2/text.html | #cathode-ray, spans `radiation-detectors` on "Geiger counter" | the span wraps 盖革计数器 | the concept (Chapter 21) is the class "radiation detectors"; the source tags the instrument, and the glossary row Geiger counter has no concept target to contain (translate.md 3.3) |

### ch02/2.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.3/text.html | #ions, "the ion", #atomic-mass: spans on `salt`, `mass` of "mass spectrometer" and "mass spectrum", `fission` of "nuclear fission", `gas` | the span wraps the whole Chinese compound or the word that carries the concept: 质谱仪 (`mass`), <em>质谱</em> (`mass`), 食<span>盐</span> and 加碘<span>盐</span> (`salt`, only 盐), 核<span>裂变</span> (`fission`) | the source wraps one English word of "mass spectrometer", "mass spectrum", "table salt", "iodized salt"; Chinese names each in one word (translate.md 3.3, the span stays in its block, as in ch01) |
| ch02/2.3/text.html | #chemical-symbols, "unnilhexium (Unh)", "unnilseptium (Uns)", "unniloctium (Uno)" | kept in Latin letters as printed, the sentence translated around them | provisional systematic names with no standard Chinese rendering (translate.md 4.3, a sentence about the English-coined names) |
| ch02/2.3/text.html | #chemical-symbols, Table 2.3 "(from <em>ferrum</em>)" etc. | written （拉丁名 <em>ferrum</em>）, the Latin word kept in `<em>` | the glossary row 拉丁名; "from" has no shorter Chinese frame (translate.md 4.3) |
| ch02/2.3/text.html | #isotopes, "read as “magnesium 24,” … written as “magnesium-24” or “Mg-24.”" | “镁 24”, “镁-24”, “Mg-24” | the sentence is about how a symbol is read aloud; the Chinese reading uses the element name (translate.md 4.3) |
| ch02/2.3/text.html | #units, "football stadium", "American football stadium" (alt), #inside-the-atom | 足球场 in the text, 美式橄榄球场 in the alt of Figure 2.11 | cultural reference translated for meaning (4.4); the alt describes the American football the photograph shows |
| ch02/2.3/text.html | Table 2.2 header "Unit Charge", Table 2.4 header "% Natural Abundance" | 单位电荷, 天然丰度（%） | the % moves into the parentheses as a unit, as Chinese tables write it (4.1) |
| ch02/2.3/text.html | Table 2.4 "(protium)", "(deuterium)", "(tritium)" | （氕）（氘）（氚）; the symbols D and T kept in the prose | the three isotope names have one-character Chinese names (4.3) |
| ch02/2.3/figures.js | sim-atom-symbol, `kind + ', ' + (stable ? 'a stable isotope' : 'an unstable isotope')`; headline templates `A neutral atom of ${name}-${A} has …` / `An ion of … has a charge of …` | articles dropped (稳定同位素 / 不稳定同位素); the headline frames rewritten in Chinese order with the same slots (`中性的${name}-${A} 原子有 …`, `有 … 的${name}-${A} 离子，电荷为 …`) | English article grammar and sentence frame (4.1) |
| ch02/2.3/figures.js | sim-average-mass, headline `The average mass of ${name} in this mix …`, `Every atom in this mix is ${name}-${A} …`, and the select/choice options | element names come from a new constant `ZH` ({boron: '硼', …}) added after the ELEMENTS table, because the options and the headline used the English key as the name | the element keys are English identifiers (code kept); the displayed name must be Chinese (4.1) |
| ch02/2.3/figures.js | sim-mass-spec, same `ZH` map for the choice options; headline list joined with '、' instead of ', ' | element names in Chinese, list separator full-width | the English key doubles as the displayed name; list punctuation in prose is Chinese (3.5) |
| ch02/2.3/section.json | s1 solution "if a different element of isotope is chosen" | written 如果选择不同的元素或同位素 | the source's "of" is a typo for "or"; translated for the evident meaning (4.1) |
| ch02/2.3/section.json, text.html | "football field/stadium", "Turkey", "United States" | 足球场, 土耳其, 美国 | cultural references and place names, translated for meaning (4.4) |
| ch02/2.3/text.html | #units, "<span data-concept="fundamental-charge">fundamental unit of charge</span> (also called the elementary charge)" | written 元电荷（也称基本电荷）; the span wraps 元电荷 and 基本电荷 is the plain alias | 物理学名词 lists 元电荷 for "elementary charge" and the book names the one quantity twice; "元电荷（也称元电荷）" would define nothing, so the second name takes the textbook alias 基本电荷 (collision, translate.md 4.5); flagged for the owner |

### ch02/2.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.4/text.html | `acetic <span data-concept="acid">acid</span>` (7 spans: empirical-from-molecular 2, isomers 4, spatial-isomers 1) | the span wraps the whole compound name 乙酸 | the source wraps one English word of "acetic acid"; Chinese names the compound in one word (translate.md 3.3, the span stays in its block) |
| ch02/2.4/text.html | `table <span data-concept="salt">salt</span>` (#empirical-formula) | the span wraps 食盐, the whole compound | the source wraps "salt" in "table salt"; Chinese names it in one word, glossary row table salt |
| ch02/2.4/text.html | `atomic <span data-concept="scientific-theory">theory</span>` (Portrait of a Chemist) | the span wraps 原子论 (glossary row atomic theory), as now in 2.1 (6 spans) and 2.3 (4 spans) | Chinese says 原子论, and the concept's word 理论 is not a separate word there |
| ch02/2.4/text.html | `This <span data-concept="precision">precision</span> approach` (Portrait of a Chemist) | written 这种高<span>精密度</span>的方法 | the book means a precise approach, the concept's word is 精密度 and 精密的 would leave the span without its term |
| ch02/2.4/figures.js | hover names `NAME[a[0]] + ' atom'`, `NAME[s] + ' atom'` (sims fig-methane, fig-sulfur, fig-benzene, fig-acetic, fig-empirical, fig-acetic-formate) | written `NAME[..] + '原子'` | the English space before `atom` has no Chinese form (4.1) |
| ch02/2.4/figures.js | `NAME[a[0]] + ' atom of ' + which + (…', the ring carbon atom whose four bonds point differently in the two isomers')` (Figure 2.24 hover names) | becomes `NAME[a[0]] + '原子，属于 ' + which + (…'；它是环上的碳原子，四个键在两种异构体中的指向不同')`; `NAME[x] + ' atom'` elsewhere becomes `NAME[x] + '原子'` | English "atom of …" built by concatenation, Chinese needs the noun before the qualifier (as in 1.1 and 1.2) |
| ch02/2.4/figures.js | `represent()` readout, the `small` line `The molecular formula ${m.uni} counts ${m.count}; the ${MODEL_WORD[…]} adds …` | template rewritten in Chinese word order with the same slots: `分子式 ${m.uni} 表示有${m.count}；${MODEL_WORD[…]}则补充了…` | English sentence frame cannot carry the slots in the same order |
| ch02/2.4/figures.js | sim-empirical headline and the `small` line of the readout (`divides into … identical groups of …`, `The ratio of atoms … divided by …`) | rewritten in Chinese word order with the same slots (`${c.uni} 分成 ${g} 个相同的组，每组为 …`; `原子数之比 … ，除以 ${g} 后得到最简整数比 …`) | English sentence frame and its `has no common factor` / `divided by` branches (4.1) |
| ch02/2.4/figures.js | `MOL[…].count` strings and `UNITWORD` | the English articles and plurals (`one carbon atom and four hydrogen atoms`, `one H atom`) written as the Chinese counts 一个碳原子和四个氢原子, 一个 H 原子 | English article and plural grammar collapses to one Chinese form (4.1) |
| ch02/2.4/text.html, ch02/2.7/text.html | `<span data-concept="mixtures">solution</span>` (2.4 isomers, 2.7 #binary-acids) | the span wraps 溶液; the concept row (ch01, "homogeneous and heterogeneous mixtures") is not in it | the source tags the word "solution" with the mixtures concept; Chinese 溶液 names that solution, and the concept's long heading cannot sit in the span (translate.md 3.3) |
| ch02/2.4/text.html | Portrait of a Chemist and #isomers, span `molecular-structure` on "molecular structures" | written 分子结构 (span wraps it), not the book-wide 分子构型 | 分子构型 is the 3-D shape (VSEPR, ch07) and would define isomers as stereo-isomers only; the book means structure in general, connectivity included (review pass 2026-10-27) |
| ch02/2.4/text.html | #subscripts, "distinctly different species" | written 截然不同的物种 | Resolved in the global merge (2026-10-27): the bare source "species" is 物种 in every chapter (化学物种 is for the explicit "chemical species"); the review had written 化学物种 |
| ch02/2.4/text.html, ch02/2.7/figures.js | 3D view presets labelled "above" | 俯视 (as in 2.2 and ch9 row `above`) | one form for the same view preset in the chapter (review pass 2026-10-27) |
| ch02/2.4/figures.js, ch02/2.7/figures.js | 3D view presets 'front', 'side' | 正视, 侧视 (glossary rows `front`, `side`; ch9 has `front` 正视) | one series 正视 / 侧视 / 俯视 for the camera words (review pass 2, 2026-10-27) |

### ch02/2.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.5/text.html | #modern-table, "called <strong>periods</strong> or <strong>series</strong>" | written 称为<strong>周期</strong>（也称 <strong>series</strong>），both spans kept, the second wraps the English word | the glossary merges series into 周期 (Chinese has no second word); the span must stay in its block |
| ch02/2.5/text.html | #element-families, "(or <strong>representative elements</strong>)" | written （也称 <strong>representative elements</strong>），the span wraps the English alias | glossary gives 主族元素 for both main-group and representative elements; a second Chinese word would be invented |
| ch02/2.5/text.html | #element-families, "oxygen group or oxygen family" | written 氧族或氧元素族; the `group` span wraps 族 of 氧族 | the English names the chalcogens by their first element in two ways; Chinese has 氧族 and a plain 氧元素族 |
| ch02/2.5/text.html | #bracketed-masses, "the atomic mass number" | written 原子质量数, span on 原子质量 | Chinese has no word for the "atomic mass number" apart from 质量数; the span stays on the glossary words |
| ch02/2.5/text.html | #bracketed-masses, "in the nuclear chemistry chapter" | clause reordered: （关于放射性，你将在核化学一章中学到更多） | keeps both spans and their order in a Chinese sentence |
| ch02/2.5/text.html | #element-families, "their outer shell" | 最外电子层, span on 电子层 | Chinese names the shell as 电子层 (as in chapters 3 to 6) |
| ch02/2.5/section.json | e1 prompt, "representative" | written 主族（representative）元素, the English alias in parentheses | the exercise names the English alias, which the passage (#element-families) also keeps; the glossary gives 主族元素 for both main-group and representative |
| ch02/2.5/section.json | notes, `“George Hitchens”` | kept in Latin letters inside the quote | the note remarks on the book's misspelling of the name (Hitchings), which a Chinese rendering would hide; the text itself uses the glossary 乔治·希钦斯 |
| ch02/2.5/section.json | summary_html, "or as a main-group elements" | written 也可以分为主族元素、过渡金属和内过渡金属 | the source's article/plural slip ("a main-group elements") collapses in Chinese |
| ch02/2.5/text.html | #metals-nonmetals, "malleable … and ductile" and the metal definition | written 有展性 … 延性, 没有展性和延性 (glossary rows `malleable`, `ductile`) | 延展性 is the joint term (malleability + ductility), so 延展性和延性 would name ductility twice. Resolved in the global merge (2026-10-27): ch10, ch06 and the concept statements, which wrote 延展性 / 有延展性 for the single source malleable / malleability, were swept to 展性 / 有展性 |
| ch02/2.5/text.html | #metals-nonmetals and the opening paragraph, "conduct heat and electricity", "good/poor conductors of heat and electricity" (spans `heat-flow`) | 导热和导电 with the span on 热; 热和电的良导体 with the span on 热 | 热量 is the quantity, not the thing conducted (glossary row `heat`: the adjective in 导热 is not a span of 热量); the span is kept and shortened to 热 (review pass 2026-10-27) |

### ch02/2.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.6/text.html | Table 2.5 name column ("ammonium", "hydronium", "peroxide", "hydroxide", "acetate", … "permanganate") | each ion written with 离子 (铵根离子, 水合氢离子, 过氧根离子, 氢氧根离子, 乙酸根离子 …); the glossary targets of the "… ion" rows are used | the table names ions; Chinese names an ion 酸根离子 and the bare "-ate" has no word of its own (glossary row -ate) |
| ch02/2.6/text.html | Table 2.5 related-acid column | acid names written 乙酸, 氢氰酸, 叠氮酸, 碳酸, 硝酸, 亚硝酸, 硫酸, 亚硫酸, 磷酸, 高氯酸, 氯酸, 亚氯酸, 次氯酸, 铬酸, 重铬酸, 高锰酸 | English "-ic/-ous acid" collapse into the Chinese acid names (glossary rows -ic, -ous) |
| ch02/2.6/text.html | #polyatomic-ions, "-ate and -ite are suffixes … Per- (short for “hyper”) and hypo- (meaning “under”)" | the English affixes stay in Latin letters inside `<em>`, with the Chinese counterpart in parentheses (“酸根”, “亚…酸根”, “高”, “次”); “hyper” and “under” kept in Latin letters | sentence about the parts of English words (translate.md 4.3); the counterparts are the targets of the rows -ate, -ite, per-, hypo- |
| ch02/2.6/text.html | #polyatomic-ions, "nitrate is NO₃⁻ while sulfate is SO₄²⁻" (spans `nitrate`, `sulfate`) | spans wrap 硝酸根 and 硫酸根, 离子 follows outside the span | the glossary rows are 硝酸盐 and 硫酸盐 (the salt); the sentence names the ion, which Chinese calls 酸根 |
| ch02/2.6/text.html | #polyatomic-ions, "perchlorate is …, chlorate is …" | written 高氯酸根离子是 …，氯酸根离子是 … with the glossary "… ion" targets; `\text{,}` kept as printed | no span in the source; the glossary has the "… ion" forms |
| ch02/2.6/text.html | Example 2.10, "three oxide ions" (spans `oxide`, `ion`) | `<span data-concept="oxide">氧</span><span data-concept="ion">离子</span>` | Chinese names the ion 氧离子 in one word; the two spans stay in their order and the oxide span wraps 氧 |
| ch02/2.6/text.html | Example 2.12 (b), "hydrogen peroxide" (span `peroxide`) | the span wraps 过氧化氢 | Chinese names the compound in one word; the span cannot wrap only "peroxide" (same as ch01 compound names) |
| ch02/2.6/text.html | Example 2.12 (d), "carbonate is a polyatomic ion" (span `carbonate`) | the span wraps 碳酸根; 碳酸盐 is the glossary row | the sentence names the ion, which Chinese calls 碳酸根 |
| ch02/2.6/text.html | Example 2.12 (a), "table salt" (span `salt`) | the span wraps the whole word 食盐 | the source wraps "salt" of "table salt"; Chinese names it in one word (shared glossary Table salt => 食盐) |
| ch02/2.6/text.html | #ionic-compounds, "chlorine gas" (span `gas`) | the span wraps 氯气 | the source wraps "gas"; Chinese says 氯气 (same as 天然气 in ch01) |
| ch02/2.6/text.html | #ionic-compounds, "In solid form" (span `solid`) | the span wraps 固态 | the state of matter is 态, as in ch01 1.2 and 1.3 |
| ch02/2.6/text.html | #ionic-compounds, "the compound is … in the ratio of one Na⁺ ion for each Cl⁻ ion"; "positive and negative ions" | the clause is reordered and "positive and negative ions" written 正、负离子 with one `ion` span | English "positive and negative" shares one noun; Chinese shares 离子 (the single span of the source) |
| ch02/2.6/text.html | #ions, "forms a cation with a 1+ charge" and the other charge spans | the `charge` span wraps 带 1+ 电荷 (the verb phrase with the charge), the cation span follows | English article and preposition ("a … charge") collapse; the span keeps the same words as the source |
| ch02/2.6/text.html | #ions, "The name of a metal ion is the same as the name of the metal atom" | written 金属离子的名称与形成它的金属原子的名称相同; the element name is the name of the atom | the sentence is about naming; Chinese element names are the names of the atoms and ions alike (钙原子, 钙离子) |
| ch02/2.6/text.html | #ions, "(A discussion of the theory … is provided in a later chapter)" | clause rewritten with the same content in Chinese order | long English passive with a modifier chain |
| ch02/2.6/text.html | Figure 2.29 alt text | "superscript plus", "superscript 2 plus", "subscript 2" written 上标加号, 上标 2 加号, 下标 2; group numbers 第一族 … 第十族 for the spelled-out numbers, 第 11 族 … for the digits; "a substances" slip of the Figure 2.30 alt written 某种物质 | alt text reads the symbols aloud; kept as the source reads them |
| ch02/2.6/text.html | #bonds, "forces" (span `force`) | the span wraps 力 in 吸引力, 静电吸引力 | the glossary row is 力; Chinese says 吸引力 |
| ch02/2.6/text.html | #molecular-compounds, "low-boiling liquids, and low-melting solids" | written 低沸点的液体和低熔点的固体 | English compound adjectives become 低沸点的 / 低熔点的 |
| ch02/2.6/section.json | exercise cyl3 prompt, "the sulfide anion, S²⁻" | written 硫离子 S²⁻ | the glossary row is "sulfide ion" => 硫离子, which is the anion; no separate word for the anion form |
| ch02/2.6/section.json | exercise cyl2 solution, "a carbide ion" | written 碳离子 (glossary row) | the shared glossary has only 碳化物 for the compound; the ion follows 氮离子, 硫离子 |
| ch02/2.6/figures.js | sim-na-cation, `ELEMENTS` keys and the select `value: 'sodium'` | the keys `sodium` … `bromine` become the quoted Chinese names `'钠'` … `'溴'`, the initial value `'钠'` | the key is the dropdown label (`label: k`) the reader sees; the code shape is otherwise unchanged |
| ch02/2.6/figures.js | sim-na-cation, headline | `A ${name} atom loses/gains ${WORDS[n]} electron${s} to form …` rewritten as `${name}原子失去/得到${WORDS[n]}个电子，形成 …，它有 … 个电子，与${noble}原子的电子数相同。` with the same slots; the plural branch `${n > 1 ? 's' : ''}` is dropped | English plural and article grammar collapses to one Chinese form (4.1); word order differs |
| ch02/2.6/figures.js | sim-na-cation, readout small line | `The ${E.ion} is a cation / an anion; its nucleus is unchanged, so it is still ${name}.` written `${E.ion}是阳离子/阴离子；…所以它仍然是${name}。` | articles dropped (4.1) |
| ch02/2.6/figures.js | sim-ionic-formula, headline | the capitalisation `w(np)[0].toUpperCase() + …` is dropped and the sentence written `${w(np)}个 … 离子${ionW(np)}和${w(nn)}个 … 离子${ionW(nn)}带有${w(tot)}个正电荷和${w(tot)}个负电荷，所以化学式是 ${formula}。`; `ionW` collapsed to `''` in both branches and the `charge${tot > 1 ? 's' : ''}` plural branch dropped | English plural branches in figure code (4.1), as in ch01 1.2 |
| ch02/2.6/figures.js | `WORDS` | `['zero', … 'six']` written `['零', '一', '两', '三', '四', '五', '六']`; 2 is written 两 in 两个 | Chinese counts two things as 两个 |
| ch02/2.6/figures.js | sim-ionic-formula, count labels | `${tot} positive`, `${tot} negative` written `${tot} 个正电荷`, `${tot} 个负电荷` | the noun "charge" is added in Chinese because 个 needs a noun; the headline of the same figure carries it |

### ch02/2.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.7/text.html, section.json | rule sentences on the order of a name: #nomenclature, "cation … followed by … anion", "the more metallic element … is first, followed by …"; summary_html "name of the metal is written first, followed by the name of the nonmetal" | translated as the source states them (金属在前、非金属在后; 阳离子的名称后接阴离子的名称); the names in tables and examples follow the Chinese order (氯化钠, 六氟化硫) | the rules describe how an English name is built; a Chinese name puts the nonmetal first, so the rule and its examples cannot agree word for word (4.3) |
| ch02/2.7/text.html, section.json | "–ide suffix", "-ic", "–ate/–ite/–ous", "hydro-" (binary acid and oxyacid lists, summary) | the English affix stays in Latin letters inside `<em>` with the Chinese counterpart in parentheses: –<em>ide</em>（“化”）, –<em>ic</em>（“酸”）, –<em>ate</em>（“酸根”）, –<em>ite</em>（“亚…酸根”）, –<em>ous</em>（“亚…酸”）, <em>hydro-</em>（“氢”）; extra `em` tags in the blocks | a sentence about the parts of English words (translate.md 4.3); the counterparts are the targets of the rows -ide, -ate, -ite, -ic, -ous, hydro- |
| ch02/2.7/text.html | Table 2.10 | the prefixes written 一（mono-）… 十（deca-）, the number column kept; headings 数 / 词头; the table eyebrow 表 2.10 | the table is about the Greek prefixes themselves; Chinese writes the numbers 一, 二, 三… and the English prefix is kept in parentheses (glossary row Greek prefix) |
| ch02/2.7/text.html | #hydrates, "adding a term to the name for the anhydrous compound … begins with a Greek prefix … and ends with “hydrate”" | written 在…名称前加上一个词语 … 以希腊数字词头开头 … 以“水合”结尾; "anhydrous" kept in `<em>` with 无水 | Chinese puts the term (五水合) before the compound name (五水合硫酸铜(II)); the word anhydrous is cited as an English word (4.3) |
| ch02/2.7/text.html | #hydrates, "copper(II) sulfate", "sodium carbonate" (spans `sulfate`, `carbonate`) | the spans wrap 硫酸 and 碳酸 inside 硫酸铜(II), 十水合碳酸钠 | the glossary rows are 硫酸盐 and 碳酸盐; Chinese names the compound 硫酸铜, not 铜硫酸盐 (as in 2.6 and ch01) |
| ch02/2.7/text.html | #hydrates, "a hydrate of sodium carbonate" (spans `hydrate`, `carbonate`) | the order of the two spans in the block is `carbonate` then `hydrate` (碳酸钠水合物) | Chinese word order |
| ch02/2.7/text.html | #variable-charge, "The simplest name, “iron chloride,”" | written “氯化铁” | the Chinese name of FeCl₃ is already 氯化铁; here it stands for the unnumbered name, following the Stock rows 氯化铁(II), 氯化铁(III) |
| ch02/2.7/text.html | #variable-charge, "Out-of-date nomenclature used the suffixes –ic and –ous … ferric chloride … ferrous chloride … stannous fluoride … stannic fluoride" | the English old names kept in `<em>` with the Chinese old names in parentheses (氯化铁, 氯化亚铁, 氟化亚锡, 氟化锡); no explanatory clause is added (review pass 2026-10-27: translate.md 3.2) | the passage is about the English suffixes; the Chinese old names are 亚-marked for the lower charge only (glossary row -ous / -ic (metal)) |
| ch02/2.7/text.html | #molecular-compounds, "(they cannot both be called carbon oxide)" (span `oxide`) | written “氧化碳”, the span on 氧化 | the ambiguous name in Chinese order (nonmetal first); the span cannot wrap only "oxide" |
| ch02/2.7/text.html | #molecular-compounds, "the prefix mono- is usually deleted"; "CO is named carbon monoxide, and CO₂ is called carbon dioxide" | 词头 <em>mono</em>-（一）; 一氧化碳（carbon monoxide）, 二氧化碳（carbon dioxide） | the Chinese names with the English kept in parentheses where the passage turns on the English spelling (4.3) |
| ch02/2.7/text.html | #molecular-compounds, "the ending vowel in the Greek prefix is sometimes omitted … monooxide … monoxide" | the two English words kept in `<em>`; the sentence translated for meaning | a sentence about English spelling (4.3) |
| ch02/2.7/text.html | #molecular-compounds, "Some examples demonstrating this Some other examples are shown in Table 2.11." | written 一些说明这一点的例子 其他一些例子见表 2.11。 | the garbled sentence of the book stays garbled (3.2) |
| ch02/2.7/text.html | #molecular-compounds, "nitric oxide", "nitrogen monoxide", "nitrous oxide", "dinitrogen monoxide", "dihydrogen monoxide" (two `oxide` spans) | the common names written 氧化氮 and 氧化亚氮 with the English in `<em>`, the systematic names 一氧化氮, 一氧化二氮, 一氧化二氢 with the English in parentheses; the spans wrap 氧化 | the shared rows give 一氧化氮 for both nitric oxide and nitrogen monoxide, which would erase the contrast the passage draws (4.5); glossary rows record the traditional common names |
| ch02/2.7/text.html | #binary-acids, "hydrogen chloride … hydrochloric acid" (span `acid` inside `<em>`) | the span wraps 酸 in 盐酸; Table 2.12 names written 氢氟酸, 盐酸, 氢溴酸, 氢碘酸, 氢硫酸 | Chinese names the acid in one word; hydrochloric acid is 盐酸 (glossary row hydro-) |
| ch02/2.7/text.html | #binary-acids, "–ic" and "hydro-" list; "the word “hydrogen” is changed to the prefix hydro-" | written 将“氢”一词改为词头 <em>hydro-</em>（“氢”）; 后缀 -<em>ic</em>（“酸”） | the English rule has no Chinese counterpart (4.3), see the affix row |
| ch02/2.7/text.html | #binary-acids, "dissolved in water" (span `dissolved`) | the span wraps 溶解 in 溶解在水中 | the glossary row is 溶解的 (adjective); the verb is used |
| ch02/2.7/text.html | #oxyacids, "the –ate of carbonate is replace with –ic" | written 将碳酸根的 –<em>ate</em>（“酸根”）换成 –<em>ic</em>（“酸”）; the span `carbonate` wraps 碳酸根 | the typo "replace" cannot be kept in translation; the span wraps the ion name (2.6) |
| ch02/2.7/text.html | #oxyacids, "sulfuric acid, not sulfic acid, … sulfurous, not sulfous, acid" (three `acid` spans) | 硫酸（<em>sulfuric acid</em>）、<em>sulfic acid</em>、亚硫酸（<em>sulfurous acid</em>）、<em>sulfous acid</em>; the spans wrap 酸 of 硫酸 and 亚硫酸 and the word acid of the English <em>sulfic acid</em> | the exception is about English forms; Chinese has no 硫 versus 亚硫 ambiguity |
| ch02/2.7/text.html | #oxyacids, "hydrogen carbonate" (span `hydrogen-carbonate`) | the span wraps 碳酸氢 (the binary-style name hydrogen + carbonate, as in 氯化氢), not the glossary 碳酸氢盐 | 碳酸氢盐 is the class of bicarbonate salts; the book's point is the acid named like a binary compound (review pass 2026-10-27) |
| ch02/2.7/text.html | #oxyacids and #nomenclature, "the principle element" | written 主要<span>元素</span> | the book's misspelling of "principal" cannot be kept in Chinese; recorded in notes |
| ch02/2.7/text.html | #binary-acids, "The chemistry of these compounds" (spans `chemistry`, `compound`) | the order of the two spans in the block is `compound` then `chemistry` (这些化合物的化学) | Chinese word order |
| ch02/2.7/text.html | Table 2.13, anion column | each anion written with 离子 (乙酸根离子 … 磷酸根离子) | the glossary rows of the "… ion" forms; same as Table 2.5 of 2.6 |
| ch02/2.7/text.html | the Erin Brockovich note, "the film Erin Brockovich … Oscar" | written <em>《永不妥协》</em>（<em>Erin Brockovich</em>，朱莉娅·罗伯茨凭借该片获得奥斯卡奖）; "Pacific Gas & Electric (PG&E)" written 太平洋煤气电力公司（Pacific Gas &amp; Electric，PG&amp;E）; "Environmental Working Group" written 环境工作组织（Environmental Working Group） | the Chinese title of the film is 永不妥协; organisation names have the English kept once in parentheses (glossary rows); Edward Masry kept in the original |
| ch02/2.7/text.html | the Erin Brockovich note, "&#36;333 million" | written 3.33 亿美元 | Chinese counts in 亿 (4.4); the amount is written with the currency word, as ch17 17.6 (五千亿美元), not with the symbol (review pass 2, 2026-10-27) |
| ch02/2.7/text.html | the Erin Brockovich note, "to fight corrosion in a nearby natural gas pipeline" (spans `corrosion`, `gas`) | written 为防治附近一条<span>天然气</span>管道的<span>腐蚀</span>, the span on 天然气 | the order of the two spans in the block is `gas` then `corrosion`; the span wraps the whole compound word as in ch01 |
| ch02/2.7/text.html | "parts per billion", "soluble" | 十亿分率 (span wraps it); 不易<span>溶</span>于水, 较易<span>溶</span>于水 (the span wraps 溶 only) | 在水中不太可溶 is a calque; the span stays on the word 溶 of the row 可溶的 and ch18 row (review pass 2026-10-27) |
| ch02/2.7/text.html | #ionic-compounds, "the positive ions must be …" (span `ion`) | the span wraps 离子 of 正离子 | Chinese 正离子 |
| ch02/2.7/section.json | exercises e5 (f), "sodium bisulfate (the common name for sodium hydrogen sulfate)" | written 酸式硫酸钠（硫酸氢钠的俗名） | the common name 酸式硫酸钠 is the traditional Chinese word for a bisulfate |
| ch02/2.7/section.json | exercise e6 prompt, "mercurous", "ferric", "cupric" | written 氯化亚汞, 硝酸铁, 溴化铜; the answers the Stock names with numerals | the old –ous/–ic names are 亚-marked for the lower charge only in Chinese; the prompt asks for the IUPAC name |
| ch02/2.7/figures.js | `NAME[a[0]] + ' atom'` (hover names, 2 places) | becomes `NAME[a[0]] + '原子'`; `NAME` is 铬, 氧 | English article-free noun phrase; the Chinese noun follows |
| ch02/2.7/figures.js | readout small line, "The formula … counts …, which together carry a charge of 2−; the structural formula adds how they are connected" | rewritten as `化学式 ${m.uni} 含有${m.count}，它们合起来带有 2− 的电荷；…` with the same two branches | English word order; the `count` phrases lose their articles and take numerals with 个 (一个铬原子和四个氧原子) |
| ch02/2.7/figures.js | the choice `label`s and options | `\text{离子}`, `\text{模型}`, 铬酸根离子, 重铬酸根离子, 结构式, 球棍模型; the view presets 'front', 'above' written 正视, 俯视 | reader-visible strings; the `value` keys unchanged |
| ch02/2.7/text.html | #hydrates, `<span data-concept="hydrate">hydrate</span>` in "ends with “hydrate”" | the span wraps 水合 (以“水合”结尾), where the glossary has 水合物 | the rule describes the English name ending; the Chinese name begins with the prefixed 五水合, so only the stem 水合 is quoted |
| ch02/2.7/text.html | #molecular-compounds, `acidic-solution` span on "acidic properties" | the span wraps the adjective 酸性, where the glossary has 酸性溶液 | the source tags the adjective "acidic"; Chinese 具有酸性 has no noun to carry 溶液 |
| ch02/2.7/text.html | #variable-charge, "some main group <span data-concept="representative-metal">metals</span>" | the span wraps 主族金属, not 金属 alone | the source wraps "metals" after "main group"; the glossary target is the compound 主族金属 |

### Chapter 2: Other things for the owner

| File | Span or line | What was done | Why |
|---|---|---|---|
| `glossary.zh-CN.json` | every row with `"confirm": "termonline"` (179) or `"confirm": "owner"` (2) | term taken from the named published authority or the best textbook usage | 569 rows in all (431 seeded by the scaffold, 138 from the pages). `termonline.py lookup` was run on 24 English terms in the merge (the paleoclimatology lookup failed): confirmed and the url added for ascorbic acid, chemical engineering, vitamin C, nuclear fission, leukemia, detector, tracer, nanoparticle, elementary charge; not listed for percent composition, parts per billion, mass defect, coordination compound, Geiger counter, mesothorium, electron beam, trace, purine, metaldehyde, caraway, spearmint, antiperspirant, antidepressant (their notes say so). The rest are still to be looked up. |
| ch02/2.3/figures.js, ch02/2.3/text.html, ch02/2.4/text.html | detector, tracer, nanoparticle | 探测器 (物理学名词), 示踪物 (物理学名词), 纳米粒子 (化学名词) | the pages first wrote 检测器, 示踪剂 and 纳米颗粒, the familiar forms; termonline lists the three above, so the merge followed the authority (translate.md 2.2, 2.3). 检测器 and 示踪剂 are the usual words in an analytical or isotope laboratory; the owner may prefer them |
| ch02/2.3/text.html | elementary charge | 元电荷（也称基本电荷） | 物理学名词 lists 元电荷 for "elementary charge" and the book gives two English names for one quantity; the second takes the alias 基本电荷 (scenario row). Owner to confirm |
| `glossary.zh-CN.json` | `vitamin C` | 维生素 C | the authority writes 维生素C; the space follows the book-wide rule between CJK and Latin letters |
| `glossary.zh-CN.json` | 10 pending rows (product, radioactive decay, protium, ice core, chloroform, anesthetic, bleach, disinfectant, nitrogen monoxide, manganese(IV) oxide) | not added | the same source and target are already rows of the ch07, ch09, ch12, ch17 and ch18; the owner's merge keeps one. Two further pending rows (molecular mass, lithium carbonate) were unused in the translation and dropped; "table salt (data-concept salt)" and "electrostatic attraction (force)" were folded into the rows table salt 食盐 and electrostatic attraction 静电吸引 (2.6 writes 静电吸引 and puts the span on 力) |
| ch02/2.6/text.html | "when molten" (2 places) | 熔融时 | ch18 row molten is the adjective 熔融的; the stem 熔融 with 时 is the same word, so no ch02 row was added |
| `glossary.zh-CN.json` | rows ch17 and ch09 cite ("Stock form as for the ch02 rows", "ch02 already writes 产物") | kept | the Stock-name rows (氧化铜(II), 氯化铁(III) …) and the compound rows of 2.6 and 2.7 are in this chapter glossary |
| ch02/2.2/text.html, section.json | Figure 2.6 caption "mass-to-charge ratio" against the text "charge-to-mass ratio" | 质荷比 in the caption, 荷质比 in the text, as printed | the book is inconsistent; both are standard names for the quantity, and the section.json notes say so |
| ch02/2.7/text.html | "the principle element" (twice) | 主要元素 | the book prints "principle" for "principal"; Chinese cannot keep the slip; the section.json notes quote it |
| ch02/2.7/text.html | "Some examples demonstrating this Some other examples are shown in Table 2.11." | 一些说明这一点的例子 其他一些例子见表 2.11。 | the garbled sentence of the book stays garbled (translate.md 3.2); listed in the 2.7 section.json notes |
| ch02/2.7/section.json | exercise e3 (e) solution "AIF₃·3H₂O" | unchanged | the book's key prints a capital I for aluminum fluoride trihydrate; the question and the row use AlF₃ |
| ch02/2.7/text.html | Table 2.8 "CaCO₃ calcium carbonate" | 碳酸钙, no comma | the missing comma of the source stays |
| ch02/2.3/section.json, ch02/2.6/section.json, ch02/2.5/section.json | s1 solution "of isotope", "a substances" (Figure 2.30 alt), "a main-group elements" | written for the evident meaning (或同位素; 某种物质; 主族元素、过渡金属和内过渡金属) | typos in the source |
| ch02/intro/text.html and every page | names kept in Latin letters: Sangeeta Bhatia, Laura López-Sánchez, Paula Hammond, Mildred Cohn, Edward Masry, J. A. Ratcliffe, Walter Pagel, Eugen Nesper, and the names inside credits | not translated | no standard Chinese rendering known; rows in the chapter glossary (translate.md 2.7) |
| every text.html | English kept: `atomos`, `ferrum` … `stannum`, `electr`ic i`on`, the affixes -ate -ite -ide -ic -ous per- hypo- hydro- mono- and Greek prefixes (mono- … deca-) in Table 2.10, `unnilhexium (Unh)`, `unnilseptium (Uns)`, `unniloctium (Uno)`, `plums`, `anhydrous`, `sulfic acid`, `sulfous acid`, `ferric chloride`, `ferrous chloride`, `stannous fluoride`, `stannic fluoride`, `nitric oxide`, `nitrous oxide`, `Erin Brockovich`, `Pacific Gas & Electric`, `Environmental Working Group`, `Background to Modern Science`, the archive.org URL, IUPAC, DNA, PG&E, amu, Da, u | kept in Latin letters, mostly inside `<em>` with the Chinese beside them | sentences about English words, affixes and names, acronyms and unit symbols (translate.md 4.3, 5); each is a scenario row above or an acronym |
| ch02/2.7/text.html | Figure 2.32 caption and `data-original-caption` | `PG&amp;E` kept with the entity; `3.33 亿美元` | the entities are markup of the source |
| ch02/*/text.html | figure citations written 图 N.M | plain text | the app links only `Figure N.M` until its figure link pattern reads 图 (recorded once per book in ch01) |
| ch02/2.5/section.json, ch02/2.2/section.json, ch02/2.7/section.json | notes, exercise_notes mention exercise source ids (`fs-id…`) and the English quotes | kept | identifiers and quoted source text |
| ch02/intro, ch02/2.5 | no `figures.js` | none to translate | the figures of the intro and 2.5 are the book's images |
| sheets/*.json | the 12 sheet files | still English | the same as the chapter 1 note; the book lists them in Chinese |
| ch02/chapter.json, ch02/book-rows.json, book.json | concept names, terms, statements and variable meanings of chapter 2 | already Chinese when the pages were translated (82 concepts); spans checked against the glossary; no edit | the chapter agents do not edit book.json |

## Chapter 3 sections

### ch03/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch03/intro/text.html | `<span data-concept="ion">ion</span>` (1st paragraph, "calcium ion, Ca2+") | span wraps 离子 inside 钙离子 (the sentence is written 钙离子 Ca2+) | Chinese writes 钙离子 as one word; the span wraps the concept word only |
| ch03/intro/text.html | `<span data-concept="cation">cations</span>` ("calcium cations") | span wraps 阳离子 inside 钙阳离子 | same; English plural collapses to one Chinese form (4.1) |

### ch03/3.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch03/3.1/text.html, ch03/3.1/section.json | `Avogadro’s number (N_A) or the Avogadro constant` (mole section) | written 称为<strong><span>阿伏加德罗常数</span>（N_A）</strong>; the alias "or the Avogadro constant" is not written | both English names have the one target 阿伏加德罗常数 (glossary rows `Avogadro’s number`, `Avogadro constant`), so the sentence would read "阿伏加德罗常数或阿伏加德罗常数"; the strong and the span stay (translate.md 4.5) |
| ch03/3.1/text.html | mole section, "One Latin connotation for the word “mole” is “large mass” or “bulk”" | written 摩尔（mole）一词在拉丁语中的含义之一是“大质量”或“大块”; the Latin word kept in Latin letters in parentheses, the span on 摩尔 | a sentence about the origin of an English/Latin word (translate.md 4.3); "bulk" is rendered 大块 |
| ch03/3.1/text.html | `hydrogen <span peroxide>peroxide</span>` (mole section) | the span wraps the whole compound name 过氧化氢 | Chinese names the compound in one word; the span cannot wrap only "peroxide" (3.3, as 氧化汞(II) in ch01) |
| ch03/3.1/text.html | `Aluminum <span sulfate>sulfate</span>` (Example 3.2), `table <span salt>salt</span>` (ionic) | the spans wrap 硫酸铝 and 食盐 | Chinese names each in one word |
| ch03/3.1/text.html | `amino <span acid>acids</span>` (Example 3.6) | the span wraps 酸 inside 氨基酸 | the glossary row acid is 酸; 氨基酸 is one word, the span stays on the last character |
| ch03/3.1/text.html | `neutral sodium and chlorine <span atom>atoms</span>`, `hydrogen and oxygen <span atom>atoms</span>` | written 钠和氯<span>原子</span>, 氢和氧<span>原子</span>: one span on the shared noun | Chinese does not repeat the noun after each element in a coordinated pair; the span count of the source is kept |
| ch03/3.1/text.html | "moles" / "the number of moles" as a quantity (Examples 3.3 to 3.8) | written 以<span mole>摩尔</span>计的物质的量; 多少<span mole>摩尔</span>…; the span wraps 摩尔 | 物质的量 is the quantity and 摩尔 its unit (chapter 1 decision); the source's span on "moles" stays on the unit word |
| ch03/3.1/text.html | `<div class="tcap"><span class="eyebrow">Table</span></div>` (molar-mass table, no number) | written 表 | table eyebrows are translated (ch01 decision); the source gives no number |
| ch03/3.1/text.html | "100 billion", "roughly seven billion people" (molar mass, Figure 3.7) | written 1000 多亿, 70 亿, and 1000 亿倍 in the caption | Chinese counts in 万 and 亿 (4.4); numbers as printed otherwise |
| ch03/3.1/text.html, ch03/3.1/section.json | "(0.0400-g)", "40.0-mg (0.0400-g) sample" | written 40.0 mg（0.0400 g）, hyphen dropped | Chinese has no hyphenated measure phrases (as ch01/1.6) |
| ch03/3.1/text.html, ch03/3.1/section.json | `weighs` / `weighing` (12C atom, 12C mole, water drop, brain, beryllium window, Cullinan diamond) | written 重 / 重约, never 质量为 | follows the source verb; the checker keeps the `mass` spans on the numbers |
| ch03/3.1/text.html | "Tylenol", "Advil and Motrin" | brand names kept in Latin letters | trademarks without a standard rendering (translate.md 2.7) |
| ch03/3.1/text.html | footnote 1 (reference to Omiatek et al.) | authors and journal kept in Latin letters, the article title translated, "accessed January 14, 2015" written 2015 年 1 月 14 日访问 | same treatment as the Rutherford reference of ch01/2.2; the source's "Scientific Report" (the journal is Scientific Reports) kept as the book prints it |
| ch03/3.1/text.html | display math `\text{glycine}`, `\text{vitamin C}`, `\text{Cu atoms}`, `\text{C atoms}`, `\text{… molecules}`, `\text{… molecule}` | words in `\text{}` translated: 甘氨酸, 维生素 C, `Cu 原子`, `C 原子`, `…分子` | English plural collapses to one Chinese form (4.1); `\text{}` words are translated (translate.md 5) |
| ch03/3.1/section.json | exercises e5 and e6, `alt` of the drawn structures | the spelled-out letters of the English alt kept spelled out (S i, C l, C H subscript 2 → C H 下标 2) | the alt is a read-aloud description of a figure that prints English labels |
| ch03/3.1/section.json | exercise e27 (and glossary row diamond) | 库里南钻石 for "the Cullinan diamond" (天然钻石), 金刚石 stays the mineral/allotrope term elsewhere | the gem's established Chinese name; glossary row `Cullinan diamond` is a proper name, not the `diamond` row (review pass) |
| ch03/3.1/section.json | exercise cyl1, cyl2, cyl3, cyl6 `answer.solution` ("151.16 amu", "310.18 amu", "0.360 mol", "0.073 mol") | kept as printed | pure number and unit symbol, nothing to translate |
| ch03/3.1/section.json | `answer.parts[].part` of cyl8 and e23 ("molecules", "hydrogen atoms", "zirconium atoms" …) | kept in English | translate.md 5 keeps `answer.parts[].part`; a ch01 note for the owner |
| ch03/3.1/figures.js | NEW helper `const SP = (t) => (/[A-Za-z0-9]$/.test(t) ? t + ' ' : t);` in sim-mole-chain, used in the box names (`${SP(e.sym)}的质量`, `${SP(e.sym)}的物质的量`, `${SP(e.sym)}${e.unit}`) | one line of code added; the box names of the English `mass of ${e.sym}`, `moles of ${e.sym}`, `${e.sym} ${e.unit}` | Chinese puts the noun before its qualifier and needs a space only after a Latin-letter symbol (钾 is written K, 甘氨酸 is a Chinese word); the chain's logic is unchanged (grammar built from English, 4.1) |
| ch03/3.1/figures.js | `EX[*].unit` `'atoms'`, `'molecules'` | 原子, 分子 | English plural collapses to one Chinese form (4.1) |
| ch03/3.1/figures.js | `head` templates of the six examples, the compound `head` strings | operand order and articles changed: "A sample of 4.7 g of potassium is 0.12 mol of K atoms." → "4.7 g 钾相当于 0.12 mol K 原子。"; "An aspirin molecule, …, has a molecular mass of …" → "一个阿司匹林分子 … 的分子质量为 …"; "Sodium chloride, NaCl, has …" without an article | English article and genitive grammar (4.1); the slots are unchanged |
| ch03/3.1/figures.js | sim-formula-mass table header "Average atomic" / "mass (amu)" | 平均原子 / 质量（amu） | the two-line English header split in the same place on the Chinese term 平均原子质量 |
| ch03/3.1/figures.js | `view` buttons `front`, `top` | 正视, 俯视 | labels of the 3D view bar |
| ch03/3.1/section.json | exercises e5, e8, e12, e24, e25, e26, e27 `answer.unit` ("Au atoms", "C atoms", "H atoms", "atoms", "molecules", "servings") | kept as printed | `answer.unit` is a kept field (translate.md 5); the English word is data for the answer checker, not prose |
| ch03/3.1/text.html, ch03/3.1/section.json | "active ingredient" (pain medicines) | written 有效成分; the page first had 活性成分 | one target for 3.1 and 3.3 (merge decision, glossary row `active ingredient`) |

### ch03/3.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch03/3.2/text.html | `ammonium <span nitrate>nitrate</span>` (from-formula) | the span wraps the whole compound name 硝酸铵 | Chinese names the compound in one word; the span cannot wrap only "nitrate" (3.3, as 硫酸铝 in 3.1) |
| ch03/3.2/text.html | Example 3.9, `a <span liquid>liquid</span> compound` | the span wraps 液态 (the state, as an adjective), where the glossary has 液体 | Chinese says 液态化合物; same choice as ch01 1.2 and 1.3 |
| ch03/3.2/text.html | "moles" as a quantity (percent, empirical, Example 3.11) | written 以<span mole>摩尔</span>计的物质的量; the span wraps 摩尔 | 物质的量 is the quantity and 摩尔 its unit (chapter 1 decision, as 3.1) |
| ch03/3.2/text.html | "10.0-g", "12.04-g", "100-g" sample (several places) | written 10.0 g, 12.04 g, 100 g, hyphen dropped | Chinese has no hyphenated measure phrases (as ch01/1.6 and 3.1) |
| ch03/3.2/text.html | `weighing` (N atom, H atoms, 100 g sample) | written 重 / 总重, never 质量为 | follows the source verb and the 3.1 rule; the `mass` spans stay on the numbers |
| ch03/3.2/text.html | Example 3.12, "the definition of the “percentage” unit, whose name is derived from the Latin phrase <em>per centum</em> meaning “by the hundred.”" | written “百分数”（percentage）这一单位的定义，它的名称源自拉丁语短语 <em>per centum</em>，意思是“每一百” | a sentence about the origin of an English word (translate.md 4.3); the English word and the Latin phrase kept |
| ch03/3.2/text.html | Example 3.11, `A sample of the black mineral hematite (Figure 3.12), an oxide of iron …` | the apposition becomes its own clause: 黑色矿物赤铁矿（图 3.12）是存在于许多铁矿石中的一种铁的氧化物，其一份样品含有 … | Chinese cannot hang the relative clause on "sample" without implying the sample is the oxide; the `hematite` ref span stays on 一份样品 (review pass) |
| ch03/3.2/text.html | Example 3.13, "Assuming a convenient, a 100-g sample of nicotine" (the book's stumbled wording) | written 为方便起见，假设取 100 g 尼古丁样品 | the doubled article has no Chinese form; meaning kept (review pass) |
| ch03/3.2/text.html | display math `\text{mass H}`, `\text{mass compound}`, `\text{molar mass C}`, `\text{g compound}`, `\text{g nicotine}`, `\text{mol nicotine}`, `\text{formula unit}` and the rest | words in `\text{}` translated (H 的质量, 化合物的质量, C 的摩尔质量, g 化合物, g 尼古丁, mol 尼古丁, 化学式单元, 化学式单元/分子); unit symbols and element symbols kept | `\text{}` words are translated (translate.md 5); English plural `formula units` collapses to one form (4.1) |
| ch03/3.2/text.html | Figure 3.11 sim-head, Example 3.11 caption, Figure 3.12 and 3.13 captions | citations written 图 3.11 to 图 3.13, credits （来源：Mauro Cateb）, （来源：“Dual Freq”/Wikimedia Commons） | recorded once per book (ch01 config) |
| ch03/3.2/figures.js | sim-empirical, box names `mass of ${sym} atoms`, `moles of ${sym} atoms`, `${A} to ${X} mole ratio`, the step words, the headline and the readout small line | word order changed (`${sym} 原子的质量`, `${sym} 原子的物质的量`, `${A} : ${X} 物质的量之比`, `用 … mol 去除两个物质的量，得到 … 比 …`); the ratio box name shortened to fit the 200 px box | Chinese puts the possessor before the noun and the verb phrase after its object (3); layout width (4.7) |
| ch03/3.2/figures.js | sim-empirical, `SAMPLES[].name` and `label` | `name` equal to the referent labels of section.json (赤铁矿样品, 碳和氢的样品, 氯和氧的样品, 发酵产生的气体); the `label` of the select is the short form (赤铁矿, 碳和氢, 氯和氧, 发酵产生的气体) | the hover name is the referent; the dropdown wants the short form |
| ch03/3.2/section.json | exercise e2, "the percent of calcium ion" and “hypo” | written Ca<sub>3</sub>(PO<sub>4</sub>)<sub>2</sub> 中钙离子的百分数; 照相定影液（“海波”）, 海波 being the Chinese trade name of Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub> | “hypo” is the English photographic nickname of sodium thiosulfate; the Chinese nickname is 海波 (pending term) |
| ch03/3.2/section.json | exercise e6, "chrysotile asbestos" | written 温石棉 | 温石棉 already names chrysotile asbestos; 石棉 is not repeated (pending term) |
| ch03/3.2/section.json | exercises e2 and e4 solutions, part labels `(a)`, `(b)`, `(c)` | written （a）（b）（c） with ； and ， in the solution strings | full-width part labels in prose (chapter 1 decision, as 3.1); `parts[].part` keys kept as printed |
| ch03/3.2/figures.js | sim-empirical readout `w ? ', and multiplying by ${w.k} gives whole numbers' : ''` | written `，再乘以 ${w.k} 得到整数`, same slot and condition | the clause is appended to a Chinese sentence whose verb phrase follows its object (grammar built from English, 4.1) |
| ch03/3.2/section.json | exercises cyl3, cyl4, cyl5, e3, e5, e7 `answer.solution` (`N<sub>2</sub>O<sub>5</sub>`, `CH<sub>2</sub>O`, `C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>`, `% NH<sub>3</sub> = 38.2%`, `C<sub>6</sub>H<sub>6</sub>`, `C<sub>15</sub>H<sub>15</sub>N<sub>3</sub>`) | kept as printed | formulas, symbols and numbers only; nothing to translate (the parity tool lists them as untranslated) |

### ch03/3.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch03/3.3/text.html | `acetic <span data-concept="acid">acid</span>` (Examples 3.16 and 3.18, 3 spans) | the span wraps the whole compound name 乙酸 | Chinese names the compound in one word; the span cannot wrap only "acid" (translate.md 3.3, as the ch01 compound names) |
| ch03/3.3/text.html | `copper <span data-concept="nitrate">nitrate</span>` (Example 3.19) | the span wraps 硝酸铜 | same: one Chinese word for the compound |
| ch03/3.3/text.html | `the molar <span data-concept="concentration">concentration</span>` (Example 3.14) | the span wraps the whole glossary term 物质的量浓度 | the glossary row molar concentration is one word; "molar" cannot stay outside the span |
| ch03/3.3/text.html | `<span data-concept="dissolved">dissolved</span>` (solutions), `<span data-concept="concentrated">concentrated</span>` x2 (dilution) | span wraps 溶解 and 浓 (the verb and the adjective stem) where the glossary has 溶解的 and 浓的 | the Chinese sentence says 分散或溶解 and 比…要浓得多; the span stays in its block |
| ch03/3.3/text.html | sim-head and Example 3.19 to 3.21: "the stock" / "stock solution" | 储备液 where the source has a bare "stock" (inside `data-ref="stock"`), 储备<span data-concept="mixtures">溶液</span> where the span wraps "solution" | glossary stock solution is 储备液; a span on 溶液 inside it would split the word |
| ch03/3.3/text.html | `\text{mol solute}`, `\text{L solution}`, `\text{g solute}`, `\text{mol sugar}` (math) | words translated, unit symbols kept: `\text{mol 溶质}`, `\text{L 溶液}`, `\text{g 溶质}`, `\text{mol 糖}` | translate.md 5: words inside `\text{}` are translated, unit symbols kept |
| ch03/3.3/text.html | Example 3.18, "What volume of vinegar contains 75.6 g of acetic acid?" | written 含有 75.6 g 乙酸的食醋体积是多少？ so the `volume` span and the `acid` span keep their blocks | Chinese relative-clause order |
| ch03/3.3/text.html | alt of Figure 3.15 (the label printed in English on the photograph) | the quoted words of the label are translated (“蒸馏白醋”, “用水稀释至 5% 酸度”) | alt text describes the picture for a Chinese reader |
| ch03/3.3/figures.js | sim-molarity `topline`, hover names and legend; sim-dilution `topline`, hover names, cylinder names | `X g of NAME` becomes `X g NAME`, `V L of C M copper nitrate` becomes `V L C M 硝酸铜`, `evaporated` / `diluted` become 蒸发 / 稀释 inside a rewritten Chinese sentence frame with the same slots; `the stock solution`, `after dilution` become 储备液, 稀释后 | English "of" phrases and the sentence frame cannot carry the slots in the same order (grammar built from English, translate.md 4.1) |
| ch03/3.3/text.html | "number of moles" (the definition of molarity, the dilution summary) | written 物质的量（以摩尔计） with the span on 摩尔 | 物质的量 is the quantity, 摩尔 its unit, and GB 3102.8 does not call it 摩尔数 (ch01 decision; review pass replaced 摩尔数) |
| ch03/3.3/text.html | `<span data-concept="melting">` on "melting" (solutions and dilution paragraphs, iced tea / melting ice, 2 places) | written 熔化, the glossary target | the page first had 融化; the span text now contains the target (merge sweep) |
| ch03/3.3/section.json | molarity exercise (c), "the concentration of isopropyl alcohol in rubbing alcohol" | written 外用消毒酒精 | follows ch11 row `rubbing alcohol` (merge decision) |
| ch03/3.3/section.json | exercises cyl4, cyl6 `answer.solution` (`5.55 g CaCl<sub>2</sub>`, `0.102 <em>M</em> CH<sub>3</sub>OH`) | kept as printed | number, unit symbol and formula only; nothing to translate |

### ch03/3.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch03/3.4/text.html | `<span data-concept="acid">acid</span>` in "hydrochloric acid" (Example 3.23); `<span data-concept="alcohol">alcohol</span>` in "isopropyl alcohol" (Example 3.24, 2 spans); `<span data-concept="mixtures">solution</span>` in "physiological saline solution" (#mass-volume-percent) | the span wraps the whole compound word 盐酸, 异丙醇, 生理盐水 | Chinese names each in one word; the span cannot wrap only "acid", "alcohol" or "solution" (translate.md 3.3, as ch03/3.3 and the ch01 compound names) |
| ch03/3.4/text.html | `<span data-concept="concentrated">Concentrated</span>` (Example 3.23) | the span wraps 浓 where the glossary has 浓的 | the Chinese sentence says “浓”盐酸; the span stays in its block (as ch03/3.3) |
| ch03/3.4/text.html | `<span data-concept="dissolved">dissolved</span>` (Example 3.25) | the span wraps 溶解 where the glossary has 溶解的 | 溶解物质 takes the verb stem as an attribute (as ch03/3.3) |
| ch03/3.4/text.html | `<span data-concept="mass">Mass</span> percentages` (#mass-percentage, bleach paragraph), `percent <span>mass</span>`, `%<span>mass</span>`, `<span>mass</span> percentages` | the span wraps 质量 and 分数 / 百分数 follows outside it (质量分数, 质量百分数) | the source spans the word "mass" inside a longer name; the glossary rows 质量分数 and 质量百分数 are one word each but the span stays on the concept word 质量 |
| ch03/3.4/text.html | "%mass, %weight, and (w/w)%" (#mass-percentage) | written %质量、%重量和 (w/w)%; (w/w)% and %vol / (v/v)% kept as the symbols print them | the passage lists names and symbols of the unit; the words after % are translated, the letter symbols of the notation kept (4.3) |
| ch03/3.4/text.html | Example 3.22 "3.75 mg glucose", "5.0 g spinal fluid" (math) | `\text{3.75\;mg 葡萄糖}`, `\text{5.0\;g 脑脊液}` | words in `\text{}` are translated, unit symbols kept (translate.md 5) |
| ch03/3.4/text.html | `\text{mass percentage}`, `\text{mass of component}`, `\text{mass of solution}`, `\text{volume percentage}`, `\text{volume solute}`, `\text{volume solution}`, `\text{mass solute}`, `\text{mass solution}`, `\text{500 mL solution}` ... (math) | written 质量分数, 组分的质量, 溶液的质量, 体积分数, 溶质的体积, 溶液的体积, 溶质的质量, 500 mL 溶液 ...; "of" phrases take Chinese order | words in `\text{}` are translated and the English “mass solute” has no Chinese form in that order (translate.md 5, 4.1); same forms as the book.json equations |
| ch03/3.4/text.html | Example 3.23 question, Example 3.24 question, Example 3.25 question and solution (various spans) | spans inside a phrase swap places in their block (e.g. “the density of isopropyl alcohol” → 异丙醇的密度; “mass of lead” → 铅的质量; "solute mass" → 溶质质量) | Chinese puts the possessor before the noun; every span stays in its block (translate.md 3.3) |
| ch03/3.4/text.html | Example 3.24 solution (math) and p. above: “isopropyl alchol” (book's misspelling) | written 异丙醇 | a misspelling of an English word cannot be kept in Chinese; recorded in section.json notes |
| ch03/3.4/text.html | alts of Figure 3.17, the flowchart and Figure 3.19: label words printed in English on the picture | the quoted words translated (“漂白剂”, “含有：次氯酸钠 7.4 %”, “溶液的体积 (mL)”, “过滤水分配器”) | alt text describes the picture for a Chinese reader (as ch03/3.3 Figure 3.15) |
| ch03/3.4/text.html | alts of Figures 3.18 and 3.19, "labeled a and b", "Picture a" | written 标为 a 和 b, 图片 a | panel letters kept; 图片 avoids a clash with 图 N.M |
| ch03/3.4/text.html | photo credits Figure 3.18 and 3.19 | （来源 a：改编自 X 的作品；b：改编自 Y 的作品） | the book-wide formula (translation-notes, every page) |
| ch03/3.4/text.html | Figure 3.17 caption "7.4% NaOCl by mass" | written 这一品牌的漂白剂中，NaOCl 的浓度按质量分数计为 7.4% | Chinese says the mass fraction of NaOCl is 7.4%; the spans `concentration` and `mass` stay (review pass) |
| ch03/3.4/text.html | #ppm-ppb "percentage (“part per hundred”) units" | written 百分数（“每百份中的份数”）单位 | the English gloss “part per hundred” has no short Chinese form |
| ch03/3.4/text.html | Example 3.25, "1 ppm = 10^3 ppb" prose “ppm is 1000 times greater than ppb” | written ppm 是 ppb 的 1000 倍 | Chinese says “is 1000 times” for “1000 times greater”; the equality 1 ppm = 10<sup>3</sup> ppb follows |
| ch03/3.4/text.html, ch03/3.4/section.json | “fluoride ion” (span ion) | written 氟<span>离子</span> (the span wraps 离子 as the source wraps "ion"); “fluoride” alone is 氟化物 | glossary rows fluoride ion 氟离子 and fluoride 氟化物 (the plain-word reading of the sim) |
| ch03/3.4/figures.js | sim-ppm SAMPLES names/SHORT labels, hover `name: s[0] + ', ' + s[1]` | names rewritten with the qualifier before the noun (处于铅行动水平的自来水, 自来水中的铅 ...); the ', ' separator becomes '，' | Chinese word order for 'X at the Y level' / 'lead in tap water' (4.1) |
| ch03/3.4/figures.js | sim-ppm headline `'In ' + g + ' g of ' + who + ', ' + mass + ' of ' + what + ' is ' + pct + '% of the mass, or ' + ppm + ' ppm, or ' + ppb + ' ppb.'` | rewritten as `'在 ' + g + ' g ' + who + '中，' + mass + ' ' + what + '占质量的 ' + pct + '%，即 ' + ppm + ' ppm，即 ' + ppb + ' ppb。'`, with who '溶液' / what '溶质' for the "another solution" case; the same slots in the same order | English "of" phrases and the article of 'the solution' cannot carry the slots as built (grammar built from English, 4.1) |
| ch03/3.4/figures.js | sim-ppm `names` and `\km_{\text{solute}}` readout subscripts | words in `\text{}` translated (\text{溶质}, \text{溶液}); the ÷ label written 溶质的质量 ÷ 溶液的质量 | subscripts and labels want the shortest form (4.7) |
| ch03/3.4/section.json | exercise e1 solution | `\text{mass}` → `\text{质量}` and "mass<sub>1</sub>" → 质量<sub>1</sub> inside the dilution equation; the LaTeX otherwise kept | words in `\text{}` are translated (translate.md 5) |
| ch03/3.4/section.json | exercise cyl4, e3, e5 solutions | `9.6 ppm, 9600 ppb`, `1.75 × 10^-3 M`, `2.38 × 10^-4 mol` kept | numbers, units and symbols only; nothing to translate |
| ch03/3.4/section.json | exercise e3 "(by mass) ... which is equivalent to milligrams of CaCO3 per liter" | written 百万分率（按质量）... 每升水中所含 CaCO<sub>3</sub> 的毫克数 | Chinese word order |
| ch03/3.4/section.json | exercises cyl3/e5/e3/e6 "moles of" | 多少摩尔乙醇, 多少摩尔 CuI, 换算成物质的量 | 摩尔 is the unit in "how many moles"; the quantity is 物质的量 (GB 3102.8; as ch03/3.3 and ch01 decisions; review pass replaced 摩尔数) |
| ch03/3.4/section.json | `notes` | the English note's “alchol” is quoted as “alchol” and said to be written 异丙醇 | the note speaks about an English misspelling (4.3) |
| ch03/3.4/text.html | `Rubbing <span data-concept="alcohol">alcohol</span>` (Example 3.24) | written 外用消毒<span>酒精</span>（异丙醇），the span on 酒精 only | the glossary row alcohol is 酒精 and ch11 fixes rubbing alcohol as 外用消毒酒精; the span stays on the concept word |

### Chapter 3: Doubtful choices for the owner

- Cullinan diamond: 库里南钻石, the established name of the gem, in 3.1 exercise e27 (review pass; 金刚石 stays the term for the mineral).
- Alias dropped: "Avogadro’s number (N_A) or the Avogadro constant" is written once, 阿伏加德罗常数（N_A）, because both names have the one target (3.1). A review suggestion to add 阿伏加德罗数 as the alias was declined: the glossary rows fix 阿伏加德罗常数 as the one target of Avogadro’s number.
- Moles as a count: the book's "number of moles" is written 以摩尔计的物质的量 / 物质的量（以摩尔计）, the span on 摩尔; 摩尔数 is not used (GB 3102.8; review pass).
- Iron sulfate (FeSO4) is 硫酸亚铁, cobalt chloride 氯化钴 without an oxidation number as the book prints it (3.3).
- Rubbing alcohol is 外用消毒酒精 (ch11's target), the span on 酒精; isopropanol 异丙醇 (3.3, 3.4).
- The book's "alchol" misspelling (3.4) is written 异丙醇 and the note in section.json says so.
- active ingredient is 有效成分 on 3.1 and 3.3 (3.1 first had 活性成分).
- melting is 熔化 (the glossary target) in the iced-tea paragraph, where 融化 is the everyday word.
- Hyphenated measure phrases (10.0-g sample) are written without the hyphen (10.0 g).
- Counting words: 100 billion = 1000 多亿, 7 billion = 70 亿.

### Chapter 3: Kept in English

- Brand names Tylenol, Advil, Motrin; authors and journal of footnote 1 of 3.1 (the book's "Scientific Report" as printed); BRAIN 计划 acronym; names in photo credits.
- Figure and Sim eyebrows, `answer.unit` and `answer.parts[].part` fields, unit and element symbols, formulas.
- Latin and Greek origins: <em>per centum</em>, mole / bulk (3.1, 3.2).

### Chapter 3: Unverified terms (confirm: termonline)

- Dilution equation -> 稀释公式 (book, 3.3)
- electrochemical cytometry -> 电化学细胞术 (book, 3.1, footnote 1)
- Formula mass -> 式量 (cnterm-chemistry, 3.1)
- active ingredient -> 有效成分 (book, 3.1, 3.3)
- aerobic life -> 需氧生命 (book, 3.3)
- alkaloid -> 生物碱 (cnterm-chemistry, 3.2)
- aluminum sulfate -> 硫酸铝 (cnterm-chemistry, 3.1)
- ammonium nitrate -> 硝酸铵 (cnterm-chemistry, 3.2)
- aspirin -> 阿司匹林 (termonline, 3.1)
- blood sugar -> 血糖 (termonline, 3.4)
- central nervous system -> 中枢神经系统 (termonline, 3.1)
- chloroform -> 氯仿 (cnterm-chemistry, 3.1)
- cholesterol -> 胆固醇 (cnterm-chemistry, 3.3)
- chrysotile asbestos -> 温石棉 (cnterm-chemistry, 3.2)
- cobalt chloride -> 氯化钴 (cnterm-chemistry, 3.3)
- concentrated sulfuric acid -> 浓硫酸 (cnterm-chemistry, 3.3)
- contaminant -> 污染物 (termonline, 3.4)
- copper nitrate -> 硝酸铜 (cnterm-chemistry, 3.3)
- dilution -> 稀释 (cnterm-chemistry, 3.3)
- discrete entity -> 分立的基本单元 (book, 3.1)
- distilled white vinegar -> 蒸馏白醋 (book, 3.3)
- dopamine -> 多巴胺 (termonline, 3.1)
- estimated average requirement -> 平均需要量 (termonline, 3.1)
- exocytosis -> 胞吐 (termonline, 3.1)
- formula mass -> 式量 (cnterm-chemistry, 3.1)
- general chemistry laboratory -> 普通化学实验室 (book, 3.3)
- glycine -> 甘氨酸 (cnterm-chemistry, 3.1)
- guard digit -> 保护位 (book, 3.3)
- hematite -> 赤铁矿 (cnterm-chemistry, 3.2)
- hypo (photographic fixer) -> 海波 (termonline, 3.2)
- ibuprofen -> 布洛芬 (termonline, 3.1)
- inline water filter -> 管路式滤水器 (book, 3.4)
- intravenous injection -> 静脉注射 (book, 3.3)
- iron sulfate -> 硫酸亚铁 (cnterm-chemistry, 3.3)
- isopropanol -> 异丙醇 (cnterm-chemistry, 3.4)
- isopropyl alcohol -> 异丙醇 (cnterm-chemistry, 3.4)
- lead action level -> 铅行动水平 (book, 3.4)
- mass-volume percent -> 质量体积百分数 (book, 3.4)
- mass-volume percentage -> 质量体积百分数 (book, 3.4)
- neuron -> 神经元 (termonline, 3.1)
- neurotransmitter -> 神经递质 (termonline, 3.1)
- nicotine -> 尼古丁 (termonline, 3.2)
- nightshade family -> 茄科 (cnterm-chemistry, 3.2)
- pharmacological effect -> 药理作用 (book, 3.3)
- photographic fixer solution -> 照相定影液 (termonline, 3.2)
- physiological saline -> 生理盐水 (termonline, 3.4)
- rubbing alcohol -> 外用消毒酒精 (book, 3.4)
- saccharin -> 糖精 (cnterm-chemistry, 3.1)
- sodium cyanide -> 氰化钠 (cnterm-chemistry, 3.3)
- spinal fluid -> 脑脊液 (termonline, 3.4)
- stock solution -> 储备液 (cnterm-chemistry, 3.3)
- sweetener -> 甜味剂 (termonline, 3.1)
- synapse -> 突触 (termonline, 3.1)
- table sugar -> 食糖 (book, 3.3)
- tissue sample -> 组织样品 (book, 3.3)
- vesicle -> 囊泡 (termonline, 3.1)
- vitamin C -> 维生素 C (termonline, 3.1)

## Chapter 4 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.1/text.html, ch04/4.2/text.html, ch04/4.3/text.html, ch04/4.4/text.html, ch04/4.5/text.html | `data-concept` spans on the name of a compound or an acid: sodium hydroxide, magnesium hydroxide, barium hydroxide, aluminum hydroxide (氢氧化钠, 氢氧化镁, 氢氧化钡, 氢氧化铝), sodium carbonate, ammonium carbonate, calcium carbonate, potassium carbonate (碳酸钠, 碳酸铵, 碳酸钙, 碳酸钾), hydrogen peroxide (过氧化氢), silver, lead, barium nitrate (硝酸银, 硝酸铅, 硝酸钡, 硝酸铅(II)), potassium sulfate and copper sulfate (硫酸钾, 硫酸铜), and the acids stomach acid, acetic, nitric, lactic, carbonic acid (胃酸, 乙酸, 硝酸, 乳酸, 碳酸) | the span wraps the whole Chinese compound name, not the half that carries the concept word; the text of the span contains the glossary target (氢氧化物, 碳酸盐, 过氧化物, 硝酸盐, 硫酸盐, 酸) | the source wraps one English word of a two-word name; Chinese names a compound in one word (the ch01 compound-name row, translate.md 3.3). The pages first disagreed (4.1 and 4.3 wrapped 氢氧化, 碳酸 and 过氧化 and left 钠, 氢 outside; 4.2 wrapped 酸 only): one form, merge sweep |
| ch04/4.1/text.html, ch04/4.3/text.html, ch04/4.5/text.html | `molecular hydrogen <span data-concept="gas">gas</span>`, `oxygen gas` (4.3 Example 4.11, 4.5 combustion), `nitrogen gas` (4.3 airbag note) | the span wraps the whole 氢气, 氧气, 氮气 | the source wraps the English word "gas"; Chinese names the substance in one word and the span cannot wrap only 气 (the ch01 天然气 row) |
| ch04/intro/text.html, ch04/4.1/text.html | `<span data-concept="solid">solid</span> mixtures` (intro), `solid sodium`, `liquid water`, `solid AgCl`, `solid silver chloride`, `liquid water` (Example 4.2) | the spans wrap 固态 / 液态 (the state, as adjective), where the glossary has the nouns 固体 / 液体; the noun uses keep 固体 / 液体 | Chinese says 固态钠, 液态水; 固体钠 and 液体水 are not said (the ch01 solid/liquid row) |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure 4.2 + 4.3` (4.1, the source's combined eyebrow), the bare `Figure` and `Sim` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, every section.json | figure citations in the prose and in captions (`(Figure 4.1)`, `Figure 4.10`, ...) | written 图 N.M (（图 4.1）) as plain text | the app links only `Figure N.M` (translate.md 4.6); recorded once per book (ch01) |
| ch04/4.2/text.html | table eyebrows `Table 4.1`, `Table 4.2` | written 表 4.1, 表 4.2 | as in ch01 (translate.md 5) |
| ch04/intro/text.html, ch04/4.2/text.html, ch04/4.3/text.html, ch04/4.4/text.html, ch04/4.5/text.html | photo credits (9: intro 1, 4.2 4, 4.3 2, 4.4 1, 4.5 1) | （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：改编自 X 的作品；b：改编自 Y 的作品）; names and organisations kept as printed (NASA, Wikimedia Commons, National Resources Conservation Service) | the one credit formula of ch01 (translate.md 5) |
| ch04/4.2/text.html, ch04/4.2/section.json | part labels `(a)`, `(b)` ... in prose, prompts and solutions | written （a）（b）; inside `$...$`, in code and in `answer.parts[].part` they stay ASCII | the full-width label of ch01; the `part` field is a kept field (translate.md 5) |
| every text.html and section.json | sentence punctuation (`,` `.`) that the source wrote inside a `$…$` span and that now ends or separates a Chinese clause, e.g. 4.2 `${\text{NO}}_{3}{}^{-},$ Na+`, 4.3 `…{2 mol Al}}.$ 碘的物质的量` | kept ASCII inside the math, byte for byte | translate.md 5: math is kept as printed; the comma or period inside it is part of the math (review pass) |

### ch04/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/intro/text.html | `<span data-concept="gas">gases</span>`, `<span data-concept="product">products</span>` | English plurals collapse to 气体, 产物; "gaseous products" written 气态产物 with the span on 产物 | plural grammar (4.1); 气态 is an adjective of the product, the span stays on the concept word |
| ch04/intro/text.html | `<em><span data-concept="stoichiometry">stoichiometry</span></em>` | span wraps 化学计量 (the concept term), not the concept name 化学计量关系 | the term listed in book.json concept terms |

### ch04/4.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.1/text.html | `aqueous Ca(NO₃)₂` ; `aqueous sodium carbonate` | written Ca(NO₃)₂（水溶液） and 碳酸钠水溶液 | "aqueous" is an adjective of state with no single-word Chinese equivalent before a formula; no span is on it in the source |
| ch04/4.1/text.html | `delta` ("uppercase Greek letter delta (Δ)") | 大写希腊字母德尔塔（Δ） | the name of a letter is rendered with its Chinese reading, symbol kept (pending row delta) |
| ch04/4.1/text.html | math `\text{2 O atoms}`, `\text{1 O atom}`, `\text{4 O atoms}`, `\text{molecule}`, `\text{H₂O molecules}` | `\text{2 个 O 原子}`, `\text{1 个 O 原子}`, `\text{4 个 O 原子}`, `\text{分子}`, `\text{H₂O 分子}`; the singular/plural pair collapses to one form and the measure word 个 is added to counts | English singular and plural collapse to one Chinese form (translate.md 4.1); Chinese counts need a measure word |
| ch04/4.1/text.html | `\text{(unbalanced)}`, `\text{(balanced)}` | `\text{(未配平)}`, `\text{(已配平)}`, ASCII parentheses kept inside math | math keeps ASCII punctuation (translate.md 3.5) |
| ch04/4.1/text.html, section.json | `section 4.1` | written 4.1 节 | the cross-reference word is translated, number kept |
| ch04/4.1/figures.js | `tally()` : `n + ' ' + NAME[s]` ("4 hydrogen") | becomes `n + ' 个' + NAME[s] + '原子'` ("4 个氢原子") | the English elides "atoms" under the tally; Chinese "4 氢" is unreadable, so the noun and measure word are written |
| figures.js (ch04/4.1) | `MOL[].of` and the hover `NAME[s] + ' atom of ' + m.of` | `of` becomes the bare noun phrase ('甲烷分子 CH₄', article dropped) and the hover name `NAME[s] + '原子，属于' + m.of` | English genitive phrase and article; Chinese needs the noun before the qualifier (precedent ch01/1.1) |
| ch04/4.1/figures.js | `mol(k, one, many)` and the headline `mol(n, 'methane molecule', 'methane molecules') + ' and ' + 2 * n + ' oxygen molecules react to yield …'` | the one/many pair collapses to `mol = (k, name) => k + ' 个' + name`; headline reads `n 个甲烷分子和 2n 个氧分子反应，生成 n 个二氧化碳分子和 2n 个水分子。` | English plural branch collapses to one Chinese form (4.1) |
| ch04/4.1/figures.js | `ctl` aria `'coefficient of ' + f` and `relabel(s.t, 'coefficient of ' + f)` | `f + ' 的系数'` | Chinese puts the possessor before the noun, so the prefix becomes a suffix |
| ch04/4.1/figures.js | hover names `l + ' ' + NAME[e] + ' atoms on the reactant side'` and the product twin | `'反应物一侧有 ' + l + ' 个' + NAME[e] + '原子'`, `'产物一侧有 ' + n + ' 个' + NAME[e] + '原子'` | Chinese word order; plural collapses |
| ch04/4.1/figures.js | `atoms(k)` : `k + (k === 1 ? ' atom' : ' atoms')` | `k + ' 个原子'` | English plural branch collapses (4.1) |
| ch04/4.1/figures.js | the balance headline: `cap(list(…)) + (ok.length > 1 ? ' balance' : ' balances') + ', but ' …` and `list()` ('and' / ', ' joins) | verb branch dropped (`已配平，但`), `list` joins with 和 / 、 ; the sentence reads `氢已配平，但氧在反应物一侧有 1 个原子，在产物一侧有 2 个。` | English subject-verb agreement collapses; Chinese conjunctions and word order |
| ch04/4.1/figures.js | readout `small`: `cap(NAME) + ': ' + sum(e,0) + ' reactant and ' + sum(e,1) + ' product atoms.'` joined with a space | `NAME + '：反应物原子 ' + sum(e,0) + '，产物原子 ' + sum(e,1) + '。'`, rows joined with no space | the English elides "atoms" after "reactant"; Chinese repeats the noun once per side and uses full-width punctuation |
| ch04/4.1/figures.js | `RX[].name` ('Water', 'Dinitrogen pentoxide', 'Ethane', 'Ammonia'), `NAME` ('hydrogen' …) | 水, 五氧化二氮, 乙烷, 氨; 氢, 碳, 氮, 氧; `cap()` kept and is a no-op on Chinese | display names are translated in place; the code is unchanged |

### ch04/4.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.2/text.html | compound-name spans: `silver <span data-concept="nitrate">nitrate</span>`, `lead <span data-concept="nitrate">nitrate</span>`, `barium <span data-concept="nitrate">nitrate</span>`, `lead (II) <span data-concept="nitrate">nitrate</span>`, `potassium <span data-concept="sulfate">sulfate</span>`, `ammonium <span data-concept="carbonate">carbonate</span>`, `calcium <span data-concept="carbonate">carbonate</span>`, and the `hydroxide` spans of sodium, barium, magnesium and aluminum hydroxide | the span wraps the whole Chinese compound name: 硝酸银, 硝酸铅, 硝酸钡, 硝酸铅(II), 硫酸钾, 碳酸铵, 碳酸钙, 氢氧化钠, 氢氧化钡, 氢氧化镁, 氢氧化铝 | Chinese names the compound in one word and puts the anion first; the span cannot wrap only "nitrate" (precedent ch01 氧化汞(II), 硫酸铅; ch04/4.1 wraps only the anion part, to be reconciled in the chapter) |
| ch04/4.2/text.html | `hydroxide <span data-concept="ion">ions</span>`, `hypochlorite <span ...>ion</span>`, `dichromate <span ...>ion</span>` | the two spans split one compound: `<span hydroxide>氢氧根</span><span ion>离子</span>`, 次氯酸根 + 离子, 重铬酸根 + 离子 | glossary 氢氧根离子 is one word; the spans stay in their block with no space between them |
| ch04/4.2/text.html | `stomach <span data-concept="acid">acid</span>`, `acetic`, `nitric`, `lactic`, `carbonic` + `acid`; `acid-base <span data-concept="chemistry">chemistry</span>` | the acid span wraps the whole name: 胃酸, 乙酸, 硝酸, 乳酸, 碳酸 (the compound-name row of every page); the `chemistry` span wraps 化学 only: 酸碱化学 | Chinese names each acid in one word, as 硫酸 and 硝酸 in ch01; "acid-base" is not spanned in the source, so 酸碱 stays outside the span |
| ch04/4.2/text.html | `the <span data-concept="solubility">solubility</span> guidelines` (about 10 places), `sparingly <span data-concept="soluble">soluble</span> base`, `reasonably <span data-concept="concentrated">concentrated</span> solutions`, `<span data-concept="acidic-solution">acidic</span>`, `<span data-concept="basic-solution">basic</span>` | spans wrap 溶解性 (in 溶解性规则), 微溶的, 浓的 (较浓的), 酸性的 / 酸性, 碱性的 / 碱性 | the glossary row 溶解性规则 contains 溶解性 and not 溶解度; 微溶的 is the ch11 row sparingly soluble; the attributive forms drop 的 where Chinese joins the adjective to the noun |
| ch04/4.2/text.html | `groups 1 and 2`, `group I cations`, `group 2 metal cations`, `group 1 cations` | written 第 1 族和第 2 族 (span wraps the whole phrase), 第 I 族阳离子, 第 2 族金属阳离子, 第 1 族阳离子 | the glossary writes a group as 第 N 族; the Roman numeral of the table row is kept as printed |
| ch04/4.2/text.html | `sometimes referred to as <em>double displacement</em>, <em>double replacement</em>, or <em>metathesis</em> reactions` | written 有时也称为复分解反应（<em>double displacement</em>、<em>double replacement</em> 或 <em>metathesis</em> 反应） | three English names for one reaction type (glossary: all three are 复分解反应); the English kept in parentheses where the sentence turns on it, with their three `<em>` (translate.md 4.2) |
| ch04/4.2/text.html | `<strong>reducing agent (reductant)</strong>`, `<strong>oxidizing agent (oxidant)</strong>`, `Single-displacement (replacement) reactions` | written 还原剂, 氧化剂, 置换反应; the second name of each pair is not written | Chinese has one word for each pair (还原剂 for both, 氧化剂 for both; 置换反应 for displacement and replacement), so the parenthesis would repeat the word; the bold and the span stay |
| ch04/4.2/text.html, section.json | `oxidation-reduction (redox) reactions`, `Oxidation-reduction (redox) reactions`, `oxidation-reduction (redox)` in summary_html | written 氧化还原（redox）反应 with the English abbreviation kept in parentheses | the sentence names "redox" as the short form of the English term (translate.md 4.3) |
| ch04/4.2/text.html | Example 4.7 steps 3 and 4: `<em>Balance oxygen <span>atoms</span> by adding</em> H₂O<em><span>molecules</span></em>` | written `<em>配平氧<span>原子</span>，方法是添加</em> H₂O<em> <span>分子</span></em>` (and the same for H⁺ and ions) | Chinese puts the verb before the object; the two `<em>` keep their spans in the same order |
| ch04/4.2/text.html | `100 million metric tons` (ammonia) | written 1 亿吨 | Chinese counts in 万 and 亿 (4.4, precedent ch01 300 万亿) |
| ch04/4.2/text.html | "this module", "the previous module", "the last module of this chapter", "a later chapter" | written 本节, 上一节, 本章最后一节, 后面的章节 | the book's "module" is a section of the page structure; 节 is the section word used in 4.1 |
| ch04/4.2/text.html | "guideline 3", "guideline 4" (Example 4.5) | written 规则 3, 规则 4 | the oxidation-number list is a set of rules, as 溶解性规则 (pending row guidelines for oxidation numbers) |
| ch04/4.2/text.html | math `\text{charge on}\;{\text{H}}_{2}\text{S}`, `\text{charge on}\;{\text{SO}}_{3}{}^{\text{2−}}`, `\text{charge on}\;{\text{SO}}_{4}{}^{2−}` | `\text{电荷}\;{\text{H}}_{2}\text{S}` (电荷 H₂S = 0 = …) | English "charge on X" is "X 的电荷"; moving the formula before the word would change the TeX outside `\text{}`, so the word stays in its place |
| ch04/4.2/text.html | math `\text{(molecular)}`, `\text{(net ionic)}`, `\text{acid}`/`\text{base}`/`\text{salt}`/`\text{water}`, `\text{oxidation}`…, `\text{reducing agent}`… | `\text{(分子方程式)}`, `\text{(净离子方程式)}`, `\text{酸}`…, `\text{氧化}`…; ASCII parentheses kept inside math | words in `\text{}` are translated, math keeps ASCII punctuation (3.5); "(molecular)" labels an equation, so 分子方程式 |
| ch04/4.2/text.html | "(While the vast majority … a few interesting exceptions to this rule do exist Example 4.6.)" | written … 确实存在几个有趣的例外 例 4.6。） | the source has no "see" before Example 4.6; the missing word is not added (an error of the book stays) |
| ch04/4.2/text.html | alt of Figure 4.6 (bottle labelled “Balsamic Vinegar”) and Figure 4.7 (tank labelled “Caution Ammonia”) | the printed label text kept in English inside Chinese quotation marks | words printed on the object in the photograph (names of things, translate.md 2.7) |
| ch04/4.2/text.html | alt of Figure 4.8 (the equation read aloud) | "C H subscript 3 … superscript negative sign" written C H 下标 3 … 上标负号, "plus sign" 加号, "arrow" 箭头; the compound names acetic acid, putrescine, acetate ion, putrescinium ion written 乙酸, 腐胺, 乙酸根离子, 腐胺鎓离子 | the alt text spells the equation letter by letter; the letters stay, the reading words are translated (pending rows putrescine, putrescinium ion) |
| ch04/4.2/section.json | e1 answer "oxidation-reduction (addition)" | written 氧化还原（化合）| "addition" here is the combination of Ca and Br₂ into CaBr₂; 加成 is the organic addition (pending row addition (reaction type)) |
| ch04/4.2/section.json | cyl5 prompt "Cl⁻. and chlorate ions" | written Cl⁻。和氯酸根离子 | the stray full stop of the source is kept as a full-width one (an error of the book stays) |
| ch04/4.2/section.json | e9 "Great Lakes Chemical Company" | kept in English, 公司 added: Great Lakes Chemical 公司 (review pass: "Company 公司" said it twice) | a company name without a standard Chinese rendering (2.7) |
| ch04/4.2/section.json | e6, e13 to e15 prompts and solutions `(in acid)`, `(in base)`, `(in acidic solution)` | （在酸性介质中）, （在碱性介质中）, （在酸性溶液中）; inside math as `\text{(在酸性介质中)}` | words in `\text{}`; "in acid" is the short form of "in acidic medium" |
| ch04/4.2/section.json | cyl2, cyl5, e5 to e11, e13 to e15 solutions | the labels and joining words translated; the equations are pure math and stay | pure-math solutions |
| ch04/4.2/figures.js | sim-precipitation `judge()` `why` lines (6 arrays) | rewritten in Chinese and re-wrapped into 2 to 3 lines: ['含第 1 族阳离子和 NH₄⁺', '的化合物都是可溶的。'] etc.; `a.u + '⁻ compounds are soluble,'` becomes `'含 ' + a.u + '⁻ 的化合物都是可溶的，'` | English sentence frames cannot carry the slots in the same order; line breaks follow the stage width |
| ch04/4.2/figures.js | `list(xs)` ('and' / ', ' joins) | joins with ' 和 ' / '、' | English conjunction; Chinese conjunctions (4.1, precedent ch04/4.1) |
| ch04/4.2/figures.js | beaker hover `s[0] + '(aq), a solution of ' + … + ' ions'` | `s[0] + '(aq)，' + … + ' 离子的溶液'` | English genitive; Chinese needs the noun last |
| ch04/4.2/figures.js | hover `'a precipitate of ' + X + '(s)'` and topline `'… gives a precipitate of ' + X + '.'` | `X + '(s) 沉淀'` and `'将 A 和 B 混合，得到 X 沉淀。'`; the 'and' join of the ions becomes ' 和 ' | English frame "a precipitate of X"; Chinese puts the noun after X (the slots keep their order); article dropped |
| ch04/4.2/figures.js | topline `'Mixing A and B gives no precipitate, since every pairing …'` | `'将 A 和 B 混合，得不到沉淀，因为…'` | Chinese word order, same slots |
| ch04/4.2/figures.js | sim-hcl topline: `nR + (nR === 1 ? ' has' : ' have') + ' given …'`, `' taken …'` | plural branch dropped: `'12 个 HCl 分子中已有 ' + nIn + ' 个溶解，其中 ' + nR + ' 个把一个氢离子交给了水分子。'` | English verb agreement collapses to one Chinese form; measure word 个 added to counts (4.1) |
| ch04/4.2/figures.js | `NAME` hover names ('a water molecule, H₂O' …), `', a gas'` / `', dissolved'` | articles dropped (水分子 H₂O, 水合氢离子 H₃O⁺ …); `', a gas'` written '，气态' | English article grammar collapses to one Chinese form (4.1, precedent ch01/1.1) |
| ch04/4.2/figures.js | `select`/`choice` labels `'\\text{first solution}'`, `'\\text{second solution}'`, `'\\text{gas}'` | `'\\text{第一种溶液}'`, `'\\text{第二种溶液}'`, `'\\text{气体}'` | words in `\text{}`; the referent labels in section.json carry the same words |
| ch04/4.2/text.html | oxidation-number guideline 3 (oxygen), `(so-called peroxides, $O_2^{2−}),$` and `(so-called superoxides, $O_2^{−}),$` | the opening bracket is written as ASCII ` (` (with a space after −1 and after the math) so that it pairs with the `)` kept inside the math | a full-width （ cannot be closed by the ASCII `)` that the kept math carries (review pass) |
| ch04/4.2/text.html | Example 4.4 (b), the anion `$({\text{NO}}_{3}{}^{-}).$` | the sentence is reordered so that the math ends it: 这种盐的组成为…（Ba²⁺）和…阴离子 $(…).$, with no 组成。 after the math | the period inside the kept math would otherwise sit in the middle of the Chinese sentence (review pass) |

### ch04/4.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.3/text.html | Greek origin: `<em>stoicheion</em> (meaning “element”) and <em>metron</em> (meaning “measure”)` | the two Greek words stay in Latin letters inside `<em>`, the meanings are translated: `<em>stoicheion</em>（意为“元素”）和 <em>metron</em>（意为“度量”）` | sentence about the origin of an English word (translate.md 4.3) |
| ch04/4.3/text.html | pancake equation and the egg line: `1 cup mix`, `3/4 cup milk`, `1 egg`, `8 pancakes`, `24 pancakes`, `3 eggs` (math `\text{}`) | written `杯煎饼粉`, `杯牛奶`, `个鸡蛋`, `块薄煎饼`; singular and plural collapse; the measure words 杯, 个, 块 are added | Chinese counts need a measure word and have no plural (translate.md 4.1); "cup" is named in Chinese (precedent ch01/1.3 一杯) |
| ch04/4.3/text.html | `two dozen pancakes`, `2 doz`, `3 doz` (math `\text{}`) | `两打薄煎饼`, `2 打`, `3 打` | "doz" has no symbol of its own; the unit takes the glossary row 打 (4.4 unit with a target name) |
| ch04/4.3/text.html | math `\text{molecules}` after a formula (`2 NH₃ molecules`, `CO₂ molecules`) and `\text{or}` | `\text{分子}` and `\text{或}`; no measure word | English plural collapses to one Chinese form (4.1) |
| ch04/4.3/text.html | Example 4.8 question: `How many moles of I₂ are required to react with 0.429 mol of Al according to the following equation …?` | clause order turned: `需要多少摩尔 I₂，才能与 0.429 mol Al 按下列方程式（见图 4.10）反应？`; spans kept | Chinese word order |
| ch04/4.3/text.html | Example 4.9 question: `How many … molecules are produced when 0.75 mol of propane is combusted …?` | `按此方程式燃烧 0.75 mol 丙烷时，生成多少个二氧化碳分子？` (the condition first) | Chinese word order |
| ch04/4.3/text.html | Example 4.9, `the number of moles of molecules` | `以摩尔计的分子数` (spans mole, molecule kept in the source order) | English "moles of molecules" has no Chinese form with two nouns; 摩尔 is the unit, the quantity is the number of molecules |
| ch04/4.3/text.html | Example 4.8 solution and figure captions, `the molar amount of …`, `the moles of …` (data-type amount spans) | written 物质的量 (`碘的物质的量`, `铝的物质的量`); the sim-head spans 摩尔 only where the source has the `mole` concept span | 物质的量 is the glossary word for the amount n in mol; the source's "moles" as a quantity and "molar amount" are one idea |
| ch04/4.3/text.html | `a small <span data-concept="mass">mass</span> (~100 g)` (airbag note) | `较小<span>质量</span>（~100 g）的 NaN₃` | "a small mass" has no direct Chinese noun phrase; the span stays on 质量 inside the type span |
| ch04/4.3/text.html | `the amount of sodium azide used` and `amounts of substances` | `所用叠氮化钠的量`, `各物质的数量` | "amount of substance" proper is 物质的量 (mol) only; here the book means a plain quantity (chapter-1 decision), so 数量 / 量 |
| ch04/4.3/text.html | `[magnesium hydroxide, Mg(OH)₂]` | written with full-width brackets ［氢氧化镁，Mg(OH)₂］ | punctuation follows the target language in prose |
| ch04/4.3/text.html | `miles per gallon`, `gallon`, `liters` (section.json e7) | 英里, 加仑, 升 written in prose | unit with a target name (4.4); no symbol in the source |
| ch04/4.3/figures.js | route boxes `moles of X`, `mass of X`, `molecules of CO₂` and the `via` labels | `X 的物质的量`, `X 的质量`, `CO_{2} 的分子数`; labels 化学计量因子, 摩尔质量, 阿伏加德罗常数 | Chinese puts the qualifier before the noun |
| ch04/4.3/figures.js | sim-ammonia `word()`: `` `${k} ${f} molecule${k === 1 ? '' : 's'}` `` | `` `${k} 个 ${f} 分子` ``, the plural branch dropped; `${k} doz ${f}` becomes `${k} 打 ${f}` | English plural branch in figure code (4.1) |
| ch04/4.3/figures.js | sim-ammonia headline `… react with … to give ….` | `… 与 … 反应，生成 ….` | English sentence frame; Chinese word order and full-width punctuation; the `.replace(/^./, …)` capital is kept (a no-op on a digit) |
| ch04/4.3/figures.js | sim-ammonia readout `\text{dozens of NH}_{3}` | `\text{NH}_{3}\ \text{的打数}` | English "dozens of X" has no Chinese phrase with the unit first |
| ch04/4.3/figures.js | sim-ammonia hover names `'N₂, nitrogen'`, `'H₂, hydrogen'`, `'NH₃, ammonia'` | `'N₂，氮'`, `'H₂，氢'`, `'NH₃，氨'` | full-width comma in prose strings |
| ch04/4.3/figures.js | sim-flowchart `EX[].verb` (`reacts with`, `produces`, `is produced from`, `consumes`) and the headline ternary | replaced by `say: (G, W) => …` templates (`G 与 W 反应。`, `G 生成 W。`, `G 由 W 制得。`, `G 消耗 W。`) and `headline(ctx, e.say(giveTxt, wantTxt))` | English verb phrases cannot carry the two slots in the same shape; the Chinese sentence frames keep G before W, the order of the source |
| ch04/4.3/figures.js | sim-flowchart `SP[].unit` (`atoms`, `molecules`, `formula units`) and `giveTxt`/`wantTxt`: `… of ` + name | `unit` becomes the noun 原子 / 分子 / 化学式单元; the box name is `X 的原子数` etc. and the headline `4.50 × 10²³ 个 Al 原子`; a plain quantity is `0.429 mol Al` | English "N atoms of Al" / "m of Al" is a noun-of-noun frame; Chinese puts the formula before the noun |
| ch04/4.3/figures.js | sim-flowchart `` `${e.cB} mol ${b.txt} per` `` over `` `${e.cA} mol ${a.txt}` `` | `${e.cB} mol ${b.txt}` over `每 ${e.cA} mol ${a.txt}` | "per" is a preposition after the first line in English; Chinese puts 每 before the divisor |
| ch04/4.3/figures.js | sim-flowchart `nm`: `volume of pure X`, `volume of X solution`, `mass of X`, `moles of X` | `纯 X 的体积`, `X 溶液的体积`, `X 的质量`, `X 的物质的量` | Chinese word order |
| ch04/4.3/figures.js | sim-flowchart `F.ref` labels `'substance A: '`, `'substance B: '` | `'物质 A：'`, `'物质 B：'` | the referent text translated with a full-width colon |
| ch04/4.3/figures.js | particle slider aria `particles of A in units of ten to the twenty-third` | `A 的粒子数，单位为 10 的 23 次方`; the unit `× 10²³` kept | the unit symbol stays, the words are translated |
| ch04/4.3/section.json | e1 and e2 solutions, `(a) … , … ; (b) …` | labels `（a）`, commas `，` and semicolons `；` full-width; numbers and formulas as printed | prose punctuation; the solutions are otherwise pure numbers and formulas |
| ch04/4.3/section.json | `answer.parts[].part` (`(a) moles Cl₂` …) and `answer.unit` (`NH₃ molecules`, `molecules`) | kept as printed | translate.md 5 lists `answer.parts[].{part}` and `answer.unit` as kept; a reader who sees them gets English words, for the owner to decide |
| ch04/4.3/section.json | e1 figure alt, product `1,2-dibromoethane` | written `1,2-二溴乙烷` (new pending row); `Br2`, `H2O` in the alts kept as the plain-text source prints them | the alt is plain text without subscripts |
| ch04/4.3/section.json | e5 `Carborundum is silicon carbide` | `金刚砂是碳化硅 SiC` | the ch10 row 金刚砂 for carborundum is reused |
| ch04/4.3/figures.js | sim-ammonia headline | a variable space `sp` (empty for molecules, one space for 打 and mol forms) is written between the item and 与 / 反应 | no space between 分子 and 与 / 反应, while a Latin symbol still gets its space (review pass) |

### ch04/4.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.4/figures.js | sim-sandwich, `s + (s === 1 ? ' sandwich' : ' sandwiches')` (the count line and the topline) and the `left` string with `(lb === 1 ? ' slice' : ' slices')` | branches collapsed to one form: `s + ' 份三明治'`; the left-over string is rewritten as `'剩下 ' + lb + ' 片面包'` / `'剩下 ' + lc + ' 片奶酪'` / `'没有剩下'` | English plural branches in figure code (translate.md 4.1); Chinese word order puts the verb before the count |
| ch04/4.4/figures.js | sim-hcl-limiting, `count = (n, f) => n + ' ' + f…` | now `n + ' 个 ' + f + ' 分子'`; the joins `' and '`, `' give '`, `' and leave '` become `'和 '`, `'生成 '`, `'，并剩下 '` | a bare English count "6 H₂" needs the measure word 个 and the noun 分子 in Chinese; the English connectives cannot keep their slots |
| ch04/4.4/figures.js | sim-hcl-limiting, hover names `MOLS[f].name` | `'a hydrogen molecule, H₂'` etc. written `'氢分子 H₂'`, `'氯分子 Cl₂'`, `'氯化氢分子 HCl'` | article dropped (translate.md 4.1; one form with ch01) |
| ch04/4.4/figures.js | sim-silicon-nitride, bar title `sig(r.p, 3) + ' mol Si₃N₄ from ' + r.name` | written `… mol Si₃N₄（来自硅）` | English "from X" phrase; Chinese needs the qualifier after the amount in parentheses |
| ch04/4.4/text.html | Example 4.13, "zinc metal", "copper metal" (`metal` spans) | written 金属锌, 金属铜 with the span on 金属 | Chinese puts 金属 before the element name; the span stays in its block |
| ch04/4.4/text.html | limiting-reactant, "bread and cheese slices in a 2:1 ratio" (`data-ref="bread"` on "bread") | the span wraps 面包片 and 奶酪片 | Chinese says 面包片 where English splits "bread" from "slices"; the spans stay in their block |
| ch04/4.4/text.html | percent-yield, "weak acids and bases" (`weak-acid`, `base` spans) | written 弱酸和弱<span base>碱</span>, the `base` span on 碱 | Chinese shares the word 弱 across the pair; the two spans stay |
| ch04/4.4/text.html | `\text{mol HCl produced}`, `\text{mol}\;{\text{Si}}_{3}{\text{N}}_{4}\;\text{produced}` | written `\text{生成的 mol HCl}`, `\text{生成的 mol}\;{\text{Si}}_{3}{\text{N}}_{4}`; the unit symbol mol and the formula kept | the label "mol X produced" qualifies a unit symbol; only the word is translated |
| ch04/4.4/text.html, section.json | Figure 4.15 alt and exercise e9 alt | spelled-out letters of the structure ("H F", "( C H subscript 3 C O ) subscript 2 O", "H subscript 2, Raney N i", "C O, [ P d ]") written as formulas HF, (CH₃CO)₂O, H₂ 雷尼镍（Raney Ni）, CO，[Pd] | the English letter-by-letter reading for a screen reader is a sentence about English spelling (translate.md 4.3); Chinese reads the formula |
| ch04/4.4/section.json, text.html | e10: "1 trillion (1,000,000,000,000)", "1 troy ounce" | written 1 万亿（1,000,000,000,000）, `\text{1 金衡盎司}`; the numeral and ＄5 kept | Chinese counts in 万 and 亿 (translate.md 4.4, as 300 万亿 in ch01); the troy ounce has no symbol in the book |
| ch04/4.4/text.html, section.json | "BHC Company (now BASF Corporation)" | 公司 names kept in Latin letters: BHC 公司（现为 BASF 公司） | company names with no standard rendering in the book (2.7) |
| ch04/4.4/text.html | Sim head after Example 4.13, `the 1:1 mole ratio` | kept 1:1 的摩尔比 with the `mole` span on 摩尔; not changed to 物质的量之比 (the review's proposal) | the source has a `mole` span in this phrase and the span multiset must equal the source's; 物质的量 is not the term of the `mole` concept; 摩尔比 is the common textbook form (review pass, declined) |
| ch04/4.4/text.html | `the Environmental Protection Agency's Greener Synthetic Pathways Award` | written 美国环境保护署的更绿色合成路线奖; 美国 is added | the body is the U.S. EPA and 美国环境保护署 is its official Chinese name (cf. ch01 美国消防协会); owner may prefer 环境保护署 (review pass) |

### ch04/4.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch04/4.5/text.html | quantitative, "the compound primarily responsible for the odor and taste of vinegar" | the apposition becomes a new clause: 与乙酸 CH₃CO₂H 发生了反应，这种化合物主要决定了食醋的气味和味道 (`acid` span once, `compound` span kept) | the apposition "acetic acid, CH₃CO₂H, the compound …" would repeat 乙酸 and add an `acid` span the source does not have |
| ch04/4.5/text.html | quantitative, "the more `concentrated` the vinegar" | the span wraps 浓 in 食醋就越浓 | the glossary row concentrated is 浓的; Chinese uses the bare adjective 浓 after 越 |
| ch04/4.5/text.html | quantitative, "the strength (actually the concentration) of vinegar" | written 强度（实际上是浓度） | the book's own loose word "strength" (new pending row) is kept and corrected in the parenthesis, as the source does |
| ch04/4.5/text.html | quantitative, "the effervescence" | written 冒泡现象 | no glossary row; plain description (new pending row) |
| ch04/4.5/text.html | Example 4.14 first sentence, "The end point in a titration of a 50.00-mL sample … was reached by addition of …" | clause order turned: 在对 50.00 mL HCl 水溶液样品的滴定中，加入 35.23 mL 0.250 M NaOH 滴定剂时达到滴定终点; the `end-point` span follows the volume, sample, concentration and titrant spans | Chinese word order puts the condition before the result |
| ch04/4.5/text.html | Example 4.14, the note "the number of `milli`moles of solute per `milli`liter of solution" | written 每<em>毫</em>升溶液中所含溶质的<em>毫</em>摩尔数; the span order is liter, mixtures, solute, mole (source: mixtures, molarity, mole, solute, liter, mixtures) | the Chinese relative clause puts the divisor first; all spans and both `<em>` stay in the block |
| ch04/4.5/text.html | Example 4.14, fig-map7 sim-head "its molar concentration" (`data-type="concentration"`) | written 其物质的量浓度 (the glossary word for molarity) | "molar concentration" is the book's other name for molarity |
| ch04/4.5/text.html | Example 4.14 and Example 4.15 math, `\text{L solution}`, `\text{mol solute}`, `\text{mmol solute}`, `\text{mL solution}` | the English word after the unit symbol translated: `\text{L 溶液}`, `\text{mol 溶质}`, `\text{mmol 溶质}`, `\text{mL 溶液}` | the label is a word attached to a unit symbol (translate.md 5, words in `\text{}`; the ch04/4.4 `\text{生成的 mol}` row) |
| ch04/4.5/text.html | Example 4.15 percent line, `{\text{percent MgSO}}_{4}`, `{\text{mass MgSO}}_{4}`, `\text{mass sample}` | written `{\text{MgSO}}_{4}\text{ 的质量分数}`, `{\text{MgSO}}_{4}\text{ 的质量}`, `\text{样品的质量}`; the LaTeX around them is unchanged | Chinese puts the formula before 的质量; a prefix word cannot sit in front of a formula carrying a subscript |
| ch04/4.5/text.html | Example 4.16 equation, `{\text{excess O}}_{2}` | written `{\text{过量 O}}_{2}` | a word attached to a formula inside `\text{}` |
| ch04/4.5/text.html | gravimetric, "the moisture (water) content of a sample" | written 样品的含水量; the gloss "(water)" is not written | the glossary row moisture content is 含水量, which already says water; the gloss would read 含水量（水）(collision, translate.md 4.5; ch01 燃烧 row) |
| ch04/4.5/text.html | Example 4.15, "is `dissolved` in water" | the span wraps 溶解 (the verb) and not the glossary row 溶解的 | Chinese says 溶解于水 where English uses the participle |
| ch04/4.5/text.html | Example 4.15 question, "(`mass` percent)" | the span wraps 质量 in 质量分数 | the glossary row mass percent is 质量分数, one word; the concept word 质量 is its first half |
| ch04/4.5/text.html | Example 4.15 solution, "the `mole`s of BaSO₄ and MgSO₄" (`data-type="amount"` with a `mole` span) | written BaSO₄ 与 MgSO₄ 的<span mole>摩尔</span>数 | the `mole` span needs the word 摩尔; elsewhere on the page "the moles of X" is 物质的量 (ch04/4.3 row) |
| ch04/4.5/text.html | Example 4.15, "The mass of MgSO₄ that would yield the provided precipitate mass is" | written 能产生所给沉淀质量的 MgSO₄ 的质量为; the `precipitate` and inner `mass` spans come before the MgSO₄ mass span | the relative clause precedes its noun in Chinese |
| ch04/4.5/text.html | combustion, "The `mass` increase of each device" | written 每个装置的质量增加量; the `data-ref` span comes before the `data-type` span | Chinese possessive order |
| ch04/4.5/text.html | sim-combustion sim-head, "a sample heated in a furnace" | written 在加热炉中加热的样品; the `furnace` span comes before the `combustion-sample` span; "read beneath it the moles … that the gain stands for" written 并在它下方读出该增加量所对应的氢或碳的物质的量 | Chinese puts the relative clause before its noun |
| ch04/4.5/text.html | Example 4.16 solution, "The H-to-C molar ratio is" … "and the empirical formula … is CH₂." | written H 与 C 的物质的量之比为 … 而聚乙烯的实验式为 CH₂。 | the glossary row mole ratio is 物质的量之比; "H-to-C" becomes "H 与 C 的" |
| ch04/4.5/section.json | e4 prompt and e9 prompt, "~28 amu", "~400 °C" | the tilde is kept as printed | numbers and symbols as printed |
| ch04/4.5/section.json | e7 prompt, "What is the molarity?" | written 物质的量浓度是多少？ with no subject | the Chinese question needs no added noun; nothing is added |
| ch04/4.5/figures.js | sim-titration, `fmt(V, 2) + ' mL delivered'`, the stage label | written `fmt(V, 2) + ' mL 已加入'` | English participle after the unit; Chinese puts 已加入 after the count; the code shape is kept |
| ch04/4.5/figures.js | sim-titration, hover names `'buret of ' + … + ' M NaOH, ' + … + ' mL delivered'`, `'flask of HCl sample, ' + …` | written `'盛有 ' + … + ' M NaOH 的滴定管，已加入 ' + … + ' mL'`, `'盛有 HCl 样品的烧瓶，含 ' + … + ' mmol HCl'` | English "X of Y" built by concatenation (4.1); Chinese word order |
| ch04/4.5/figures.js | sim-titration, headline (three branches) | the sentences keep the operand order of the code (V, M, n, nA); the three English frames are rewritten with Chinese connectives: 加入 … mL … M NaOH（即 … mmol）后指示剂变色，所以 … mL HCl 样品为 … M。 | the English frame cannot carry the slots in the same order |
| ch04/4.5/figures.js | sim-titration, axis labels and the graph line `'mmol NaOH delivered'` | written `'已加入的 NaOH（mL）'`, `'物质的量（mmol）'`, `'已加入 NaOH 的 mmol 数'` | the unit stays in parentheses (full-width, as ch01/1.6 and ch02/2.3) |
| ch04/4.5/figures.js | routeFigure box labels | the labels carry their own `\n` (`'NaOH 的\n物质的量'`, `'C 与 H 的\n物质的量之比'`); the code `b.t.replace(' of ', ' of\n')` is untouched and no longer matches anything | English splits its two-line labels at " of "; Chinese puts the possessor first and the noun on the second line |
| ch04/4.5/figures.js | sim-combustion, absorber captions `head: 'H₂O absorber', sub: 'such as Mg(ClO₄)₂'` and hover names `a.head + ' ' + a.sub + ', gaining … mg of ' + a.what` | written `'H₂O 吸收器'`, `'如 Mg(ClO₄)₂'` and `a.head + '（' + a.sub + '），增加 … mg ' + a.what`; `'gains ' + … + ' mg ' + a.what` written `'增加 ' + …` | English "such as" and "gaining … of" frames |
| ch04/4.5/figures.js | sim-combustion, headline `… so the sample held R mol H for every mol C` + three endings | written 所以样品中每 mol C 含 R mol H followed by ，比任何烃所含的都多，因为 CH₄ 中是 4。 / ，其实验式为 NAME。 / ，这个比值不能用较小的整数表示。 | English clause frames; the ternary shape is kept |
| ch04/4.5/figures.js | sim-combustion, small line "Each mole of water carries two moles of hydrogen, and each mole of carbon dioxide one mole of carbon." | 每摩尔水含两摩尔氢，每摩尔二氧化碳含一摩尔碳。 | English plural "moles" collapses to 摩尔 (4.1) |
| ch04/4.5/figures.js | sim-titration, `\kV_{\text{sample}}` in the slider label and in the readout fraction | `\text{sample}` becomes `\text{样品}` in both | a word inside `\text{}` is reader-visible (translate.md 5); the `\k` macro covers the letter only (review pass) |
| ch04/4.5/figures.js | sim-titration graph label `'X mmol HCl in the sample'` | written `'样品中含 ' + X + ' mmol HCl'` (the slot keeps its place in the string) | the English frame puts the slot first; Chinese puts the location first (review pass) |

### Chapter 4: Owner notes

| File | Span or line | What was done | Why |
|---|---|---|---|
| glossary.zh-CN.json | row `analyte` | ch04 had 待测物 (4.5); the ch14 rows had 被滴定物 | Resolved in the global merge (2026-10-27): one target for the source, 待测物 (4.5 uses analyte for the species of interest in titration, gravimetric and combustion analysis; 被滴定物 fits only a titration and no ch14 page used it). |
| `glossary.zh-CN.json` | rows `dozen` 打, `molar amount` 物质的量 | same source and target as in ch3 (and ch13 for molar amount); kept in this chapter glossary because they carry the ch04 concept ids | no conflict; the duplicate is harmless |
| `glossary.zh-CN.json` | pending rows `Bloom level`, `hydrochloric acid`, `flow chart` | not added | the shared glossary has Bloom level 布鲁姆层级 (4.3 had written 布鲁姆认知层级 in exercise_notes; now 布鲁姆层级 as on the other pages), ch18 has 盐酸 and ch3 has 流程图 with the same targets |
| `glossary.zh-CN.json` | 108 rows `confirm: "termonline"`, 37 rows `confirm: "owner"` | not looked up / book's own wording | `termonline.py lookup` was not run in this pass. The owner rows are the 4 concept names that are headings of the book (化学反应的分类 ...), the US states (伊利诺伊州, 阿肯色州), the kitchen words of 4.2 (酪乳, 酸奶油, 面糊, 腌制, 黄瓜, 柠檬汁, 沙子), 德尔塔, 通电, 规则, 带塞烧瓶, 更绿色合成路线奖, BHC 公司 / BASF 公司 (巴斯夫公司 is the alternative) and the concept names. |
| `glossary.zh-CN.json` | row `putrescinium ion` 腐胺鎓离子 | kept, doubt recorded | 鎓 is the systematic ending for a protonated cation (as 铵); textbooks may write 腐胺阳离子. Alt text of Figure 4.8 only. |
| ch04/4.2/text.html | 溶解性规则: `solubility` spans wrap 溶解性 (10 places) | glossary row 溶解性规则 contains 溶解性, the glossary row solubility is 溶解度 | the compound term of the book is one word; the span text contains 溶解性, not the target 溶解度 (shorter wrap recorded in config) |
| ch04/4.2/text.html, ch04/4.2/section.json | "a few interesting exceptions to this rule do exist Example 4.6" and "Cl⁻. and chlorate ions" (cyl5) | the missing "see" and the stray full stop of the source are kept | errors of the book are not corrected in the translation (translate.md 3); owner may correct both upstream |
| ch04/4.3/section.json, ch04/4.4/section.json, ch04/4.5/section.json | `answer.parts[].part`, `answer.unit` (`NH₃ molecules`, `molecules`) | kept in English as printed | kept fields (translate.md 5); a reader sees English words there, owner to decide whether the app should localise them |
| every section.json | `ai.text`, `ai.figures`, figure `ai[].part` (`built`, `readout note ... dropped`, ...) | English maker notes of earlier passes kept, `翻译` added by this pass | as in ch01; the part written in the book's language is the translation pass's own |
| ch04/4.2/section.json | e9 `Great Lakes Chemical 公司`; ch04/4.4 `BHC 公司（现为 BASF 公司）` | company names kept in Latin letters with 公司 | no standard Chinese rendering (2.7); 巴斯夫 for BASF is the owner's choice |
| ch04/4.2/text.html | alt of Figure 4.6 (“Balsamic Vinegar”) and Figure 4.7 (“Caution Ammonia”) | printed label text kept in English inside Chinese quotation marks | words printed on the objects in the photographs |
| ch04/4.4/text.html | Figure 4.15 alt and exercise e9 alt | letter-by-letter readings replaced by the formulas (HF, (CH₃CO)₂O, H₂ 雷尼镍（Raney Ni）, CO，[Pd]) | the spelled-out English letters are a sentence about English spelling |
| ch04/4.5/text.html | "strength (actually the concentration) of vinegar" | 强度（实际上是浓度） | the book's own loose word kept and corrected in the parenthesis, as the source does |
| ch04/4.3/text.html, ch04/4.5/text.html | "moles of X" | 物质的量 (n in mol, 4.3 and the 4.5 sim-head) but 摩尔数 where the source has the `mole` span and counts moles as a number (4.5 Example 4.15) | the chapter-1 decision (物质的量 only for the SI quantity); the `mole` concept span needs the word 摩尔 |
| every text.html | `data-original-caption` and `alt` | translated, the Figure eyebrows kept | as in ch01 |

## Chapter 5 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Sim` and the combined eyebrows `Figure 5.4 + 5.6` (5.1) and `Figure 5.11 + 5.12 + 5.14` (5.2) kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, every section.json | figure citations in the prose, captions and exercises (`Figure 5.3`, ..., `Figure 5.24`, `Table 5.1`, `Table 5.2`) | written 图 N.M and 表 N.M, plain text | the app links only `Figure N.M` (translate.md 4.6); recorded once per book (ch01) |
| ch05/5.1/text.html, ch05/5.3/text.html | table eyebrows `Table 5.1`, `Table 5.2` | written 表 5.1, 表 5.2 | as in ch01 (translate.md 5) |
| ch05/intro/text.html, ch05/5.1/text.html, ch05/5.2/text.html, ch05/5.3/text.html | photo credits (13: intro 1, 5.1 6, 5.2 3, 5.3 3) | （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：改编自 X 的作品；b：改编自 Y 的作品）; names and organisations kept as printed (Wikimedia commons, Flickr, YouTube, USFWS Pacific Southwest Region) | the one credit formula of ch01 (review pass 5); credit words are translated, names are not (translate.md 5) |
| ch05/5.1/section.json, ch05/5.2/section.json, ch05/5.3/section.json (and text.html where parts occur) | part labels `(a)`, `(b)` ... in prose, prompts, solutions and `exercise_notes` | written （a）（b）; inside `$...$`, in code and in `answer.parts[].part` they stay ASCII | the full-width label of ch01; the `part` field is a kept field (translate.md 5) |
| ch05/5.1/text.html, ch05/5.2/text.html, ch05/5.3/text.html | `data-concept` spans on a Chinese compound that holds the concept word: 天然气, 能源, 电能, 硝酸铵, 苯甲酸, 氢气, 氧气, 液态, 传热, 储热, 热传递, 比热容, 反应热, 燃烧热, 燃烧焓, 生成热, 生成焓, 陆地面积 | the span wraps the whole Chinese compound; the text contains the glossary target of the row named in the page tables below, not always the concept word (气体, 能量, 硝酸盐, 液体, 热量, 热能, 标准燃烧焓, 标准生成焓, 质量) | the source wraps one English word or a different English phrase; Chinese names each in one word (translate.md 3.3, the span stays in its block); each place is a row of its page below |
| every text.html and section.json | sentence punctuation (`,` `.` `;`) that the source wrote inside a `$…$` span and that now ends a Chinese clause or sentence, e.g. 5.2 `…Fe}_{2}{\text{O}}_{3}(s).$ 暖手袋`, 5.3 `\text{+286 kJ.}$ 这个比值`, `\text{O;}$ 而` | kept ASCII inside the math, byte for byte; where the math had its comma in the middle of a clause (5.3 Examples 5.11, 5.13 and 5.14, the summary) the Chinese is reordered so the math ends the clause | translate.md 5: math is kept as printed; the comma or period inside it is part of the math (the same row as ch04); the three clause-final cases above end a clause or sentence already (review pass) |

### ch05/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch05/intro/text.html | footnote 1, titles of two EIA publications | titles kept in English italics, agency name translated with the English in brackets | titles of works as printed; the URL needs the English title to be found |
| ch05/intro/text.html | "about 85% of US energy consumption" (span `energy-and-work`) | written 美国约 85% 的能源消费, the span on 能源 | Chinese statistics speak of 能源消费; the span wraps the word that carries the concept, as for 可再生能源 in 5.1 (review pass) |

### ch05/5.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch05/5.1/text.html | #thermochemistry, `natural <span data-concept="gas">gas</span>` and `The oil, <span data-concept="gas">gas</span>, and transportation industries` | the span wraps 天然气 in both places (石油、天然气和交通运输行业) | Chinese names natural gas in one word; the span cannot wrap only 气 (same as the 1.2 precedent, translate.md 3.3) |
| ch05/5.1/text.html | #thermochemistry, `renewable <span data-concept="energy-and-work">energy</span> providers` | span wraps 能源 (可再生能源供应商) | 可再生能源 is the fixed Chinese compound; 可再生能量 is not said |
| ch05/5.1/text.html | #energy Figure 5.3 caption and #conservation, `electrical <span data-concept="energy-and-work">energy</span>` (2 spans) | span wraps 电能 | Chinese names electrical energy in one word; the span cannot wrap only 能 |
| ch05/5.1/text.html | #conservation, `the <span data-concept="scientific-law">law</span> of conservation of <span data-concept="energy-and-work">energy</span>` and `the <span data-concept="scientific-law">laws</span> of conservation of <span>matter</span> and <span>energy</span>` | written <span>能量</span>守恒<span>定律</span> and <span>物质</span>和<span>能量</span>守恒<span>定律</span>; both spans stay in their block | Chinese word order puts the law after the conserved quantities |
| ch05/5.1/text.html | #conservation, `matter-energy conversions` (no span) | written 物质与能量之间的转换 | a hyphenated English compound has no Chinese form |
| ch05/5.1/text.html | #thermal, #heat, #exo-endo, `kinetic energy (KE)` | the abbreviation KE kept in Latin letters after the term (平均动能（KE）) and alone afterwards (平均 KE) | the book defines KE as an abbreviation of the English words and uses it as a symbol afterwards (translate.md 4.3) |
| ch05/5.1/text.html | #thermal, `such as <span data-concept="melting">melting</span> or vaporizing` | 熔化 keeps its span; the unspanned vaporizing is written 汽化 | the source spans only the first of the two words |
| ch05/5.1/text.html | #heat, `Suppose we initially have a <span data-type="temperature">high <span data-concept="temperature">temperature</span></span> ... substance (H)` | written 一个<span data-type="temperature"><span data-concept="temperature">温度</span>高</span>的…物质（H） | Chinese says 温度高 where English says high temperature; both spans stay in their block |
| ch05/5.1/text.html | #heat, `Heat flow (a redundant term ...)` | written 热量流动; the span `heat-flow` wraps 热量 only | glossary row heat flow 热量流动; the source spans the word Heat only |
| ch05/5.1/text.html | #units, `The <span data-concept="calorie">Calorie</span> (with a capital C), or large <span data-concept="calorie">calorie</span>` | written 大卡（Calorie，首字母 C 大写；也称 large calorie）; the first span wraps 大卡, the second wraps the English word calorie inside the parenthesis | a sentence about how the English word is spelt (translate.md 4.3); both `calorie` spans are kept |
| ch05/5.1/text.html | #units, `after ammonium <span data-concept="nitrate">nitrate</span>` (#exo-endo) | span wraps 硝酸铵 | Chinese names the compound in one word (as in 1.2) |
| ch05/5.1/text.html | #capacity, "commonly called its “specific heat,”" | written 通常简称“<span>比热</span>” (the span on `specific-heat-capacity` wraps the short name 比热) | the sentence glosses the short name of the quantity, and 比热容 twice would be a tautology; the glossary rows keep 比热容 everywhere else and the note of the row specific heat allows 比热 here only (review pass) |
| ch05/5.1/text.html | #capacity, "than that of the small pan" | the type span `that` wraps 热容 (小锅的热容的五倍) | Chinese repeats the noun where English uses the pronoun that |
| ch05/5.1/text.html | #capacity, "A body of <span data-concept="matter">matter</span>" | written 一块物质 | Chinese measure word for a body of matter |
| ch05/5.1/text.html | #capacity, the equation `\text{iron}` subscripts | written `\text{铁}` | words inside \text{} are translated (translate.md 5) |
| ch05/5.1/text.html | #capacity, "which is read “delta T”" | the English reading kept: 读作“delta T” | the spoken name of a symbol, kept in Latin letters (translate.md 4.3) |
| ch05/5.1/text.html | #capacity, Table 5.1 | the nitrogen, oxygen, helium, argon rows written 氮气, 氧气, 氦气, 氩气; the value cell `2.093 (at −10 °C)` written 2.093（−10 °C 时） | the rows name the gas, not the element (glossary rows nitrogen gas, oxygen gas, helium gas, argon gas) |
| ch05/5.1/text.html | #solar, `<span data-concept="heat-flow">heat</span> transfer fluid` | written <span>传热</span>流体（HTF）; the span wraps 传热 | the glossary row heat transfer fluid 传热流体; the span cannot wrap only 热 of the compound |
| ch05/5.1/text.html | #solar, `thermal energy storage system` (span `thermal-energy`) | written <span>储热</span>系统 (glossary row thermal energy storage system 储热系统); the span wraps 储热 | the glossary target contains no 热能 to wrap |
| ch05/5.1/text.html | #solar, `heat of <span data-concept="vaporization">vaporization</span>` | written <span>汽化</span>热 (glossary 汽化热) | the span wraps 汽化 and 热 follows outside it |
| ch05/5.1/text.html, section.json | `1 oz`, `1.00 pound`, `4000 acres`, `1 degree C` | 1 盎司, 1.00 磅, 4000 英亩, 1 °C; the symbols (kWh, J, g) kept | a unit with no SI symbol takes the Chinese name in prose (translate.md 4.4) |
| ch05/5.1/section.json | e4, e5, e7, e8 `answer.parts[].part` labels (`(a) in J/°C`, `in joules`, `energy`) | kept in English as printed | translate.md 5 keeps `answer.parts[].part` byte for byte (only the part hint is translated); the prompt carries the full-width （a）（b） labels |
| ch05/5.1/section.json | e2 answer, the solution table | table, headers and cells translated, tags kept; battery written 电池 (glossary), starter motor 启动电机 | AI-written solution, translated as any solution |
| ch05/5.1/section.json | `exercise_notes` and `notes` | "Link to Learning" 学习链接, "Check Your Learning" 学习检测, "answer key" 书后答案, Bloom level 布鲁姆层级 as the glossary rows | the notes name the book's own apparatus |
| ch05/5.1/figures.js | sim-heat-flow hover names `water()` | `of` = '样品 ' + who + ' 中水分子'; hover names of + '的氧原子', of + '的氢原子' (样品 H 中水分子的氧原子); the `a`/`of` article dropped | English "a ... of sample H" built by concatenation; the code shape is kept (4.1) |
| ch05/5.1/figures.js | sim-heat-flow headline `H` | 'H is at … and L at …' written H 为 …，L 为 … with the same slots; the flowing branch '热量从 ${hot} 流向 ${cold}：…' | Chinese word order, same slots |
| ch05/5.1/figures.js | sim-heating `SUBS` names | helium, nitrogen, oxygen, argon written 氦气, 氮气, 氧气, 氩气 as in Table 5.1 | the names stand for the gas (Table 5.1 row) |
| ch05/5.1/figures.js | sim-heating `name:` strings and the topline | 'N g of NAME' written 'N g NAME'; 'q = … J at ΔT = …' written 'q = … J（ΔT = … °C 时）'; the topline 'Heating … by … takes …' written 将 … g NAME加热 … °C 需要 … kJ；其热容为 … | English "of"/"at"/"by" phrases have no Chinese counterpart; the concatenation slots are unchanged |
| ch05/5.1/figures.js | sim-heating hover `a gas in a sealed vessel`, `a liquid in a beaker` | articles dropped: 密封容器中的气体, 烧杯中的液体 | English article grammar collapses to one form (4.1) |
| ch05/5.1/text.html | #solar, "a mixture of salts, which functions as a thermal energy storage system" | written 一种由多种盐组成的混合物，这种混合物起着储热系统的作用; the second 混合物 has no span | the source has one `mixture` span and one `salt` span; the added noun that replaces the ambiguous 它 stays plain text (review pass) |
| ch05/5.1/text.html | #energy-units, "1 newton–meter" | written 1 牛顿·米, the span on 米 | the product of two units takes the middle dot (GB 3102); the span stays on the word 米 (review pass) |

### ch05/5.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch05/5.2/text.html, ch05/5.2/section.json | `heat transfer` (`<span data-concept="heat-flow">heat</span> transfer`, #system, #heat-balance, Example 5.3, Example 5.4, Example 5.6 solution; cyl5 solution has no span) | the span wraps 热传递 whole | the glossary target 热传递 is one compound that contains 热; the span cannot wrap only 热 (as 热源 in ch18) |
| ch05/5.2/text.html | #system, `the specific <span data-concept="heat-flow">heat</span>` (inside `data-type="heat-capacity"`) | the span wraps 比热容 whole, `<span data-type="heat-capacity"><span data-concept="heat-flow">比热容</span></span>` | the source spans only "heat" of "specific heat"; Chinese names it in one word 比热容 |
| ch05/5.2/text.html | Example 5.6 `solid ammonium <span data-concept="nitrate">nitrate</span>`; #bomb `benzoic <span data-concept="acid">acid</span>` | the spans wrap 硝酸铵 and 苯甲酸 whole | the Chinese compound names contain the concept word as part of one word (translate.md 3.3, same as 硫酸 in ch01) |
| ch05/5.2/text.html | Example 5.6 `with “rxn” and “soln” used as shorthand for “reaction” and “solution,”` and the math `\text{rxn}`, `\text{soln}` of Examples 5.6 and 5.7; section.json e4 `q<sub>rxn</sub>`, cyl6 `q<sub>rx</sub>` | rendered 其中“rxn”和“soln”分别是“反应”和“溶液”的简写; the abbreviations stay in Latin letters in the equations and subscripts | a sentence about the letters of English abbreviations (4.3); translating them in the equations would leave the sentence explaining nothing |
| ch05/5.2/text.html | #nutrition `nutritional calorie (Calorie)`, `Calories`, `calories`; #calories-note `Calories, or nutritional calories`, `calorie (cal)`, `Calorie (note the capitalization)` | 大卡（Cal）, 大卡, 卡, 以大卡（即营养学大卡）, 卡（cal）, 大卡（Cal）（注意首字母大写）; units in the math `\text{Calories/g}`, `\text{Calories}` written 大卡/g, 大卡 | Chinese has one word 大卡 for "Calorie" and "nutritional calorie" (glossary), and the capital C is English orthography, so the Latin symbol Cal is kept beside it (4.3) |
| ch05/5.2/section.json | exercises e14, e15, e16 `Calories`, `Calories/g`; `answer.unit` "Calories" of e16 | prose written 大卡, 大卡/g; `answer.unit` kept as printed | `answer.unit` is kept byte for byte (translate.md 5) |
| ch05/5.2/text.html, ch05/5.2/section.json | `360.0-g`, `228-g`, `500-mL`, `2-L`, `248-g`, `92.9-g`, `45-g`, `0.740-g`, `6-oz` | the hyphenated compound modifiers written without the hyphen (360.0 g 的钢筋, 6 盎司的无糖汽水) | Chinese has no hyphenated measure phrases (as in ch01 1.6) |
| ch05/5.2/section.json | exercise e7 `gallon`, `°F`; e15 `6-oz` | 加仑; the symbol °F kept, oz written 盎司 (as 5.1 writes 1 盎司) | a unit with no SI equivalent keeps its symbol and takes the Chinese name in prose (4.4) |
| ch05/5.2/text.html | Example 5.3 `piece of rebar`, sim-head `the steel rebar` | written 钢筋 / 一根钢筋, with the span on 钢 for "a steel rod" in the parentheses | Chinese 钢筋 already names the steel bar (glossary rebar); no separate word for "steel" is added |
| ch05/5.2/text.html | #hand-warmers `metal disc`, `the disk`; Figure 5.15 caption | both written 圆片 (金属圆片 at first) | English uses disc and disk for one object; Chinese has one word |
| ch05/5.2/text.html | footnote 1, Reardon et al. | "et al." written 等, the paper's title translated (重访、重新设计并升级的 Snellen 人体量热计：设计与性能特征), journal name, volume, pages and URL kept; the calorimeter span kept on 量热计 | the source spans "calorimeter" inside the title, so the title must be translated for the span to stay in its block |
| ch05/5.2/text.html | Figure 5.16 alt text, the words printed on the pack ("ammonium nitrate", "Instant Cold Pack", "single use only") | rendered 硝酸铵, 速冷袋, 仅限一次性使用 | the alt text describes the label for a reader of Chinese |
| ch05/5.2/text.html | #heat-balance `no heat gained or lost by either its external environment` | written 其外部环境既没有得到也没有失去热量 | the English "either … or" with one noun is ungrammatical in Chinese; the meaning is kept |
| ch05/5.2/section.json | e6 prompt `she got an answer of 88 °C` | written 一位学生第一次解这道题时得到的答案是 88 °C | English third-person pronoun; Chinese needs no gendered pronoun here |
| ch05/5.2/section.json | e2, e4 `options` greater / lesser / remain the same | 更大, 更小, 保持不变 (the same three words in the prompt) | the options repeat the prompt's three words |
| ch05/5.2/figures.js | `switchTo()`: `const liquid = metal ? 'water' : 'solution'` used both as the `ref=` id and as the displayed word | a second constant `zh = metal ? '水' : '溶液'` added for the displayed `\text{}` and the aria; `liquid` stays for the ref id | the source uses the English word as both the referent id (kept) and the label (translated) |
| ch05/5.2/figures.js | `METALS[].name` (iron, copper, lead, gold, aluminum) and the hit name `'a piece of ' + S.m.name + ', the system'` | names 铁 铜 铅 金 铝; hit name written `S.m.name + '块，即体系'` | the display name is a metal name and Chinese puts the classifier after it; the lookup keys (Fe, Cu, Pb, Au, Al) are unchanged |
| ch05/5.2/figures.js | the `topline` sentences `'The ' + nm + ' and the water …'`, `'Heat flows from the …'`, `'The reaction has released …'` etc. | operand order changed (`nm + '和水…'`; `'热量从 X °C 的' + nm + '流向 Y °C 的水。'`); the `'Heat flows from the ' + (cond ? a : b)` nesting rewritten as `cond ? … : …` with the full sentence in each branch; articles dropped | Chinese word order; English articles have no Chinese form (4.1) |
| ch05/5.2/figures.js | graph label `'T_{final} = '` | written `'T_{f} = '` | the subscript is the English word "final"; the text of 5.2 says 令 f 表示终态 and the controls use i, so the label uses f (review pass; it first read T_{终}) |
| ch05/5.2/section.json | `exercise_notes`, "(a)" and "(b)" of exercise fs-idm5511248 | written （a）（b） with no space before it | the full-width part label of ch01 (review pass 5 of ch01); found in the chapter sweep and corrected |
| ch05/5.2/text.html | opening, "the precise heats of various fluorine compounds" (span `heat-flow`) | written 各种氟化合物的精确热效应, the span on 热效应 | the chemists' word for the heat of a reaction; 精确热量 does not read; glossary row heat effect (review pass) |
| ch05/5.2/section.json | exercise e18, trinitrotoluene (TNT), `C₇H₅N₂O₆` | formula kept as printed | an error of the book kept (translate.md 3.2): TNT is C₇H₅N₃O₆; the answer 11.7 kJ does not use the formula; owner may correct upstream (review pass) |

### ch05/5.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch05/5.3/text.html | spans on 氢气 (`gas`, 2 in the enthalpy-change bullet, 2 in the physical-state bullet: 氢气 and 氧气 each twice) | the span wraps the whole Chinese compound 氢气 / 氧气; the concept word is 气体 | the source wraps the one English word "gas" of "hydrogen gas" / "oxygen gas"; Chinese names each in one word (translate.md 3.3, the span stays in its block); same decision as ch01 天然气 |
| ch05/5.3/text.html | `heat-flow` span in "the heat of reaction under conditions of constant pressure" | the span wraps 反应热 (glossary: heat of reaction); the concept word is 热量 | "heat of reaction" is one glossary term whose Chinese form 反应热 has no 热量 inside |
| ch05/5.3/text.html | `standard-enthalpy-of-combustion` spans on "Enthalpies" / "Enthalpy" (combustion paragraph, Table 5.2 caption and head) | the span wraps 燃烧焓 whole (the caption reads 标准摩尔燃烧焓 with the span on 燃烧焓) | the source wraps the single word "Enthalpies" of "Enthalpies of combustion"; Chinese forms the term 燃烧焓 in one word |
| ch05/5.3/text.html | `mass` span in "about 0.4% of the land mass of the US" (algae box) | the span wraps 陆地面积 (glossary pending: land mass); the concept word is 质量 | "land mass" means the land area; Chinese has no word for mass here, so the span stays on the phrase that translates it |
| ch05/5.3/text.html | "gallons", "acre", "lbs" (algae box; "per gallon" in the cost sentence), "hectare" | written 加仑, 英亩, 磅, 公顷 | units with no symbol in the source take the Chinese name in prose (translate.md 4.4); the symbol kJ/gal in Exercise e25 stays |
| ch05/5.3/text.html | alt of Figure 5.20, Figure 5.22, Figure 5.23: the words quoted from the pictures ("base", "Summit", "From Field to Fleet", "Grow", "Harvest", "Extract", "Process and purify", "Jet fuel gasoline diesel") | the quoted words kept in English inside Chinese quotation marks, the rest translated | the alt describes text printed in the photo or diagram, which stays English because the picture is the source's |
| ch05/5.3/text.html | `data-original-caption` of Figure 5.19: "qin", "won", "qout", "wby" | written q入, w入, q出, w出 | the source's subscripts are lost in plain text and the subscript words ("in", "on", "out", "by") are English prepositions without a one-word Chinese pair; 入 and 出 mark the direction |
| ch05/5.3/text.html | `\text{rxn}` in the Example 5.15 sum (`_{\text{rxn}}`) | written `\text{反应}`, the same as `\text{reaction}` of the same example | `rxn` is an abbreviation by English letters; Chinese has no abbreviation, and the two subscripts of the source name the same reaction, so both collapse to 反应 |
| ch05/5.3/text.html | "perchlorate" in Example 5.9 (`高氯酸盐`), "in Table 5.2 the table" in Exercise e10 (`表 5.2 该表中`), "HCL" in the Exercise e1 key | the book's errors kept in Chinese; the correction stays in footnote c-chlorate | an error of the book stays (translate.md 3.2) |
| ch05/5.3/text.html, section.json | `$\text{C}(s,\;\text{graphite})$` and `diamond` in Examples 5.12 and Exercises cyl5, e14 | the word inside `\text{}` written 石墨, 金刚石 | words inside `\text{}` are translated (translate.md 5) |
| ch05/5.3/section.json | exercise e11 prompt | the question mark that stood inside the math (`...(g)?$`) is written as full-width ？ in the prose after 是否不同 | the Chinese sentence puts the reaction in the middle, so the closing mark cannot stay inside the formula |
| ch05/5.3/figures.js | `topline` of Figure 5.19 (`'The system ' + qs + ' and ' + ws + ', so ' + us + '.'`) | the clauses kept (qs, ws, us) with Chinese connectives `'体系' + qs + '，并' + ws + '，因此其' + us + '。'`; the passive "has 15 kJ of work done on it" is written 被做了 15 kJ 的功 | English clause grammar (subject, "and", "so") has to be rebuilt in Chinese order; the code around the strings stays |
| ch05/5.3/figures.js | `topline` of Figure 5.24 (`'Step 1 (' ... 'exothermic.' : 'endothermic.'`) | rebuilt as `步骤 1（… kJ）与步骤 2（… kJ）之和为 … kJ，与一步完成的总反应相同，该反应是放热的。/吸热的。` | the English "add up to ... the same as the overall reaction in one step, which is exothermic" is rebuilt for Chinese grammar; the figure code has no plural branches |
| ch05/5.3/figures.js | readout `_{\text{overall}}` of Figure 5.24 | `\text{总}` | a word inside `\text{}`; the English "overall" has the one-character Chinese form 总 as a subscript, matching 总反应 in the label |
| ch05/5.3/text.html | `liquid` spans on "1 mole of liquid water" (2 places in the enthalpy-change bullets, 1 mole of liquid water) | the span wraps 液态 (the state as an adjective: 液态水); the glossary target of the concept is the noun 液体 | Chinese 液态水 names the state of the water; the span stays in its block (same decision as 固态/液态 in ch01 and ch04) |
| ch05/5.3/text.html, ch05/5.3/section.json | `standard-enthalpy-of-combustion` span on "heat of combustion" (1) and `standard-enthalpy-of-formation` spans on the book's unqualified "enthalpy of formation" (6 in text.html, 1 in section.json) and on "heat of formation" (Example 5.12, 1) | the span wraps the glossary rows 燃烧热, 生成焓 and 生成热 (heat of combustion, enthalpy of formation, heat of formation); the concept targets are 标准燃烧焓 and 标准生成焓 | the book spans its own shorter synonyms, which have their own glossary rows; a span of 标准 plus the word would add a word the source does not have (shorter wraps recorded, translate.md 3.3) |
| ch05/5.3/text.html, ch05/5.3/section.json, chapter.json, book-rows.json | "free elements in their most stable states" and "elements" in the formation definition, the zero rule, the Hess procedure and the derivation (text.html lines 154, 160, 166, 180, 262, 274; summary_html; derivation; exercise e17 solution; variable ΔH_f°; concepts standard-enthalpy-of-formation and reaction-enthalpy-from-formation) | written 单质; the `element` span wraps 单质; 元素 stays in Figure 5.19 caption and the aluminium chloride exercise, where the book speaks of the elements as constituents | Chinese textbooks define the standard formation enthalpy from 单质 (the ch16 row elemental substances, the ch18 row elemental); the span wraps the word that carries the concept (review pass) |
| ch05/5.3/text.html, ch05/5.3/section.json | Example 5.13 (`ΔH°f,` before the colon and before 为), Example 5.14 (`½,` before 来得到), Example 5.11 (`(286 kJ/2 mol O₃),` before 可以), the summary (`ΔH°f,` before 是) | written 所用数据是…, 记作 $…,$ 其值为, 做法是把…乘以 $½,$ 这, 记作 $…,$ 是, and 这个比值可以用作换算因子 $…,$ 求出; the math is unchanged | the comma inside the kept math cannot move, so the Chinese is built so that the math ends a clause; 记作 and 所用数据是 are the words the order needs (review pass; 4.1) |
| ch05/5.3/text.html, ch05/5.3/section.json | #standard-state, "1 bar" and "(1 bar = 0.987 atm)"; summary_html "1 bar" | written 1 bar, the span `bar-unit` wraps bar | the unit symbol after a numeral stays as printed (ch09 row bar: 巴, symbol bar kept; 5.1 Table 5.1 writes 1 bar); it first read 1 巴 (review pass) |
| ch05/5.3/text.html | #algae box, "under $5 per gallon" | written 总成本为每加仑不到 &#36;5 | the currency sign stays as printed, with the entity the source uses, as in ch01 1.6 (每加仑 &#36;3.80); 5 美元 would change the printed sign |
| ch05/5.3/text.html | #first-law, "when it absorbs heat" and "work done on or by the system" | written 当体系从环境吸收热量; 外界对体系做功或体系对外做功; the second 体系 and the second 功 have no span | the source has one `system` span and one `work` span; Chinese needs the noun where English has "it" and "on or by"; the added words stay plain text (review pass) |

### Chapter 5: Owner notes

| File | Span or line | What was done | Why |
|---|---|---|---|
| `glossary.zh-CN.json` | 66 rows `confirm: "termonline"`, 13 rows `confirm: "owner"` | not looked up / book's own wording | `termonline.py lookup` was not run in this pass. The owner rows are Atwater system 阿特沃特系统, Calorie / nutritional calorie / nutritional calorie (Calorie) 大卡, coffee cup calorimeter 咖啡杯量热计, cold pack / instant ice pack 速冷袋, hand warmer 暖手袋 (the same targets as ch11), Energy Basics 能量基础 (the title of 5.1), lighter fluid 打火机燃料油, oxyacetylene torch 氧乙炔焊炬 (the caption says it cuts metal, so 氧乙炔割炬 is the alternative), whole-body and whole-room calorimeter 全身量热计 and 全室量热计. |
| `glossary.zh-CN.json` | 167 rows: 109 from the prep pass, 52 folded from the four page agents' pending files, 6 added by the review pass (nickel fuse wire, final temperature, initial temperature, elements (uncombined, in formation reactions), general equation, heat effect; the targets of fuse wire, macaroni and cheese and National Bureau of Standards changed) | merged; one duplicate | `acre` was pending on 5.1 (authority book) and on 5.3 (authority gb3100) with the same target 英亩; one row remains, authority book, section 5.1, note naming 5.3. No source in the pending files was already in the shared glossary or another chapter glossary, and no two pages chose different targets for one source (`frying pan` and `skillet` share 煎锅 on purpose). 27 prep rows have the same source and target as a row of another chapter glossary (ch07, ch09, ch10, ch11, ch12, ch13, ch16, ch17, ch18); no target differs. |
| ch05/5.1/text.html | "amount of substance being heated (… 8.0 × 10² g)" and "its value is proportional to the amount of the substance" (extensive property) | changed in the chapter sweep from 物质的量 to 物质的多少 | the quantity is the everyday amount of matter (here a mass in grams), not the SI amount of substance n (mol); ch01 decision (glossary rows `amount of matter`, `amount of substance`). 物质的量 stays in 5.3 where the source means moles ("two-fold increase in amounts", "proportional to the amounts of substances involved"). |
| ch05/5.1/text.html, ch05/5.2/text.html, ch05/5.3/text.html | Calorie, calorie, kilocalorie | 大卡 for the capital-C Calorie (also the nutrition label unit), 卡 for the calorie, 千卡 for the kilocalorie | Chinese nutrition texts use 大卡 for 1 kcal; the book says 1 Calorie = 1000 cal = 1 kcal, so 大卡 and 千卡 name the same amount and the text keeps the book's two spellings apart. Owner to confirm (rows `Calorie`, `nutritional calorie` carry `confirm: owner`). |
| ch05/5.2/text.html | "Calories" in `answer.unit` of exercise e16 and the units `大卡/g` in the math | `answer.unit` kept as printed; prose written 大卡 | `answer.unit` is a kept field (translate.md 5); owner to decide whether the app should localise it |
| ch05/5.1/section.json, ch05/5.2/section.json, ch05/5.3/section.json | `answer.parts[].part` (English, e.g. `(a) in J/°C`, `in joules`, `energy`) and `answer.unit` | kept in English as printed | kept fields (translate.md 5); a reader sees English words there, owner to decide whether the app should localise them |
| ch05/5.3/text.html | perchlorate (Example 5.9), "in Table 5.2 the table" (Exercise e10), "HCL" (Exercise e1 key) | errors of the source kept | errors of the book are not corrected in the translation (translate.md 3); owner may correct them upstream |
| ch05/5.1/text.html, ch05/5.2/text.html, ch05/5.3/text.html | kept in English (outside formulas and unit symbols) | the abbreviations KE, HTF, NASA, Cal, cal, kcal; the unit words bar and atm; "delta T" (the reading of Δ T); rxn and soln (in the sentence that explains them); the words quoted from photos and diagrams in the alt texts of Figures 5.20, 5.22 and 5.23; names of people, agencies and photo sources (James Prescott Joule is written 詹姆斯·普雷斯科特·焦耳, the one name with a standard Chinese rendering; Reatha Clark King and Carla Prado stay in Latin letters, so the split is a choice, not an oversight); the journal name and URL of the Reardon et al. footnote and the titles of the two EIA publications (the paper's own title and the agency name are translated); "OmniStax" in `exercise_notes` | acronyms, symbols, names of works and printed words are not translated (translate.md 4.3, 5) |
| every section.json | `ai.text`, `ai.figures`, figure `ai[].part` and other maker notes | English notes of earlier passes kept, `翻译` entries of this pass present on the pages that translated `figures.js` | as in ch01; the part written in the book's language stays what it was |
| `glossary.zh-CN.json` | rows with authority `book` (79 rows), e.g. 阿特沃特系统, 储热系统, 太阳能热发电站, 咖啡杯量热计, 全身量热计 | the translator's own wording in usual Chinese textbook and trade usage | no authority entry was consulted for these rows; owner to confirm (the ones that matter carry `confirm: owner`) |

## Chapter 6 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch06/6.3/text.html, ch06/6.5/text.html | table eyebrows `Table 6.1` to `Table 6.3` | written 表 6.1 to 表 6.3 | one form for all tables of the book (chapter 1) |
| ch06/intro/text.html, 6.1/text.html and section.json, 6.3/text.html and section.json | photo credits | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X"; names and organisations kept as printed | the book-level formula of chapter 1 |
| ch06/6.1/figures.js, ch06/6.3/figures.js, ch06/6.4/figures.js, ch06/6.5/figures.js | plural branches, articles and sentence frames of hover names, headlines and readouts | rewritten in Chinese word order with the same slots; the singular/plural branches collapse to one form | English grammar built by concatenation (4.1); the pages list each place below |
| ch06/6.1/section.json to 6.5/section.json | exercises whose `answer.solution` is only a number with its unit, or a formula | kept as printed (`translation_parity.py` lists them as "untranslated?") | nothing to translate; the same as chapter 1 |

### ch06/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/intro/text.html | Figure 6.1 caption, `(credit: modification of work by NASA and ESA)` | written （来源：改编自 NASA 和欧洲空间局（ESA）的作品）; ESA expanded, NASA expanded earlier in the same caption | one credit formula for the book (chapter 1 precedent); acronyms glossed once |
| ch06/intro/text.html | figure citation `Figure 6.1` in the prose | written 图 6.1 | recorded once per book (translate.md 4.6) |

### ch06/6.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.1/text.html | `#standing-waves`, "(also known as **stationary waves**)" | written （也称为 **stationary waves**），the English kept in the `<strong>` with the `wave` span on "waves" | the passage names the second English term of the same concept; Chinese has 驻波 for both, so the sentence would read 驻波（也称为驻波）(translate.md 4.3) |
| ch06/6.1/text.html | `#waves`, `#standing-waves`, `#em-spectrum` and others: spans on 波 in 电磁波, 声波, 行波, 谐波, 基波, 载波 | the `wave` span wraps 波 inside the compound | Chinese names these in one word, the span stays in its block (glossary note of `wave`) |
| ch06/6.1/text.html | `#photoelectric` Example 6.2, excited neon <span data-concept="atom">atoms</span>; `#waves` radiant `heat` | span wraps 氖原子 whole; span wraps 辐射热 whole | the span wraps the whole Chinese compound that contains the concept word (chapter 1 precedent) |
| ch06/6.1/text.html | `#blackbody`, "room <span temperature>temperature</span>" | span wraps 室温 | Chinese names it in one word (chapter 1 precedent) |
| ch06/6.1/text.html | `#waves`, "the speed of light", `a constant speed of 2.998 x 10^8 m/s` | 光速 for the type-velocity span on "the speed of light"; 恒定的速率 for "constant speed" | 光速 is the standing word; the glossary row speed is 速率 |
| ch06/6.1/text.html | `#rydberg`, "Neils Bohr" | written 尼尔斯·玻尔 (the glossary rendering of Niels Bohr); the misspelling is kept only in section.json `notes`, quoted | a misspelling of a Latin-letter name has no Chinese form |
| ch06/6.1/text.html, section.json | `#light`, "units": miles, "several miles" | written 英里 | unit with no SI symbol in the book takes the Chinese name (translate.md 4.4) |
| ch06/6.1/text.html | Figure 6.3 `data-original-caption`, eight credits | written （来源“X”：改编自 Y 的作品；…）with the image labels translated (宇宙射线, PET 扫描, X 射线, 牙科固化, 夜视, 遥控器, 手机, 微波炉, 调幅广播) and the names of people and agencies kept as printed | one credit formula for the book; the source's eight labelled credits are joined as a list |
| ch06/6.1/text.html | Figure 6.9 caption credit | written （来源：改编自 American Society for Testing and Materials (ASTM) Terrestrial Reference Spectra for Photovoltaic Performance Evaluation 的作品） | the credit names a work by its English title, kept |
| ch06/6.1/text.html | figure citations in the prose (图 6.2 to 图 6.13) | written 图 N.M | recorded once per book (translate.md 4.6) |
| ch06/6.2/text.html (Rydberg constant, Example 6.5 solution), 6.3/text.html (spin paragraph, ħ and ±½ sentences), 6.5/text.html (Example 6.13 solution) | sentence-final punctuation that the source sets inside `$…$` | taken out of the math and set where the Chinese word order puts it (`$R_{\infty}$ 的理论值`, `$\kdE=\frac{h\kc}{\klam}$ 求得`, `$-\frac{1}{2}$ 时则向下`, `$\hbar=\frac{h}{2\pi}$，即`, `$\left(\pm\frac{1}{2}\right)$，所以`); in Example 6.13 the label `\text{Al:}\hspace{2em}(…)` became 从 Al 中电离出第三个电子 | in English the full stop or comma closes the sentence after the formula; in Chinese the formula sits mid-clause, so the mark moves with the word order (review pass) |
| ch06/6.1/text.html, #hodgkin box ("determination of molecular structure") | the span `molecular-structure` wraps 分子结构 | the ch07 row `molecular structure` → 分子构型 is the VSEPR geometry sense; X-ray diffraction determines the full structure of a molecule, so 分子结构 (review pass #8) |
| ch06/6.1 to 6.5 section.json | `exercise_notes` apparatus words | one wording on every page: 书后答案, 没有答案的题, 建议思路, 标明为 OmniStax 自拟的, 注释 | the shared rows `answer key` and `suggested approach`, glossary rows `unkeyed item` and `note`; 提示 would read as "hint" (review pass #4) |
| ch06/6.1/section.json | exercises e3 to e6 `answer.parts[].part` ("energy in joules", "(a) wavelength", ...) | kept in English | the table of translate.md 5 lists `answer.parts[].{part,value,unit,tol}` as kept; the labels are left for the owner to decide. The same for 6.2 e1 ("energy", "wavelength"), review pass #30 |
| ch06/6.1/section.json | exercises `answer.solution` that is pure math with units (cyl2, cyl3, e3, e6) | kept as printed | a number with its unit and no words to translate |
| ch06/6.1/figures.js | `REGIONS` names and the `reg.name === 'visible'` / `'radio'` tests in sim-spectrum | names written in Chinese; the tests compare with 可见光, and the 'radio' branch (`'a radio wave'`) is dropped because 无线电波 is already the region name | the code tests the displayed name; the English article branch collapses (translate.md 4.1) |
| ch06/6.1/figures.js | sim-spectrum `topline` | `'Radiation of wavelength ' + … + ' is ' + (…)` becomes `'波长为 ' + … + ' 的辐射是' + (…)` with the same slots | English sentence frame cannot carry the slots in the same order |
| ch06/6.1/figures.js | sim-string `topline`, `(n === 1 ? ' half-wavelength' : ' half-wavelengths')` and `(n - 1 === 1 ? ' node' : ' nodes')` | collapsed to ` 个半波长` and ` 个节点` | English plural branch in figure code (4.1) |
| ch06/6.1/figures.js | sim-photoelectric `unit: 'photons/s'`, `\\text{threshold}` subscripts | written `光子/s` and `\\text{阈}` | unit word in the language; a subscript wants the shortest form (4.7) |
| ch06/6.1/figures.js | sim-blackbody TeX `\\text{nm at}\\ \\kT` | written `\\text{nm，}\\kT` | "at" has no Chinese word that fits a TeX readout; the full-width comma separates the two quantities |
| ch06/6.1/text.html | #light (discharge tube), "low-pressure hydrogen gas" (span `gas`) | the span wraps 气 in 氢<span>气</span>, the element name staying outside | Chinese names hydrogen gas in one word 氢气; the span sits on the concept's own character as for 天然气 in chapter 1 (translate.md 3.3, the span stays in its block) |
| ch06/6.1/text.html | #rydberg, "an <span data-concept="empirical-formula-of-a-compound">empirical formula</span>" (Balmer series fit) | the span wraps 经验公式, while the glossary row of the concept is 实验式 | the source's span tags the chemistry concept, but the text means a formula fitted to data; 实验式 would mean the simplest formula of a compound (compound-formula sense), 经验公式 is the physics word |
| ch06/6.1/text.html | #standing-waves, spans `end-point` on "endpoints" of a string | the span wraps 端点, while the shared row end point is 滴定终点 | the source's span is the chemistry concept; the book means the two ends of a vibrating string, and 滴定终点 would be wrong |
| ch06/6.1/figures.js | sim-photoelectric hit-name, `'a photon of ' + nm + ' nm'` | becomes `nm + ' nm 的光子'` | English article and "of" phrase, Chinese word order (4.1) |

### ch06/6.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.2/text.html | #planetary-model, "The electrostatic <span data-concept="force">force</span>" | the span wraps 静电力 whole | the glossary row (ch21) is 静电力, and the Chinese compound contains the concept word 力 (translate.md 3.3, the span stays in its block) |
| ch06/6.2/text.html | #energy-ladder "The lowest few <span>energy</span> levels", "from one <span>energy</span> level to another", the list item "(<span>energy</span> levels)", #features last paragraph "quantized <span>energy</span> levels" | the span wraps 能级 whole (energy level, glossary row of ch7) where the source wraps only "energy" | Chinese names an energy level in one word, 能级; the span cannot wrap only 能 |
| ch06/6.2/text.html | #energy-ladder, "<span>law</span> of conservation of <span>energy</span>" | written <span>能量</span><span>守恒定律</span>, the two spans in the other order | Chinese word order: 能量守恒定律; both spans stay in their block |
| ch06/6.2/text.html | #stationary-states, "the initial and final orbital <span>energies</span>" | one span on 能量 after 初始轨道和最终轨道的 | "initial and final orbital energies" is one noun phrase in Chinese, and the source has one span |
| ch06/6.2/text.html | #worked-examples, Example 6.5 solution, "The <span>wavelength</span> of a <span>photon</span> with <span>this energy</span>" | written 具有<span>这一能量</span>的<span>光子的波长</span> (the two type spans in the other order, the concept spans inside them kept) | Chinese puts the modifier "with this energy" before the noun phrase |
| ch06/6.2/text.html | #worked-examples, Example 6.5 solution, "in Electromagnetic Energy" | the title of section 6.1 written “电磁能”, with quotation marks | a reference to another section by its title; 电磁能 is the translated section title and a bare title reads as part of the sentence |
| ch06/6.2/text.html | #energy-ladder and #orbit-radius, citations "Figure 6.14", "Figure 6.15" | written 图 6.14, 图 6.15 | recorded once per book (translate.md 4.6) |
| ch06/6.2/text.html, ch06/6.2/section.json | data-original-caption, original_caption (Figure 6.14 + 6.15) | the markers "(Figure 6.14)" and "(Figure 6.15)" written （图 6.14）and （图 6.15） | the marker is a citation of a figure in prose (translate.md 4.6) |
| ch06/6.2/figures.js | `const pad = …` (new line before `IONS`) and the calls `pad(ion)` in the three headlines and the label 'the orbits n = 1 to 6 of ' + ion | a one-line helper adds the space between Chinese and a Latin ion name (He⁺, Li²⁺) and adds none before 氢 | the ion name is a string that is either a Chinese word (氢) or a Latin formula, and the space between CJK and Latin is the chapter-1 rule; the English sentence frame has no such need |
| ch06/6.2/figures.js | `IONS[0].name` | 'hydrogen' written '氢' | the name stands for the atom in headlines (在氢中) |
| ch06/6.2/figures.js | all headlines of sim-bohr-ladder, sim-orbit-rung, sim-series; the note of sim-bohr-ladder | the English frames "In ION the …", "A photon of X, which is …, is absorbed and the electron rises …" rewritten in Chinese word order with the same slots (在ION中，…; 一个波长为 X 的光子（属于…）被吸收，电子…) | English sentence frame cannot carry the slots in the same order |
| ch06/6.2/figures.js | `region(nm)` | 'violet light' … 'red light' written 紫光 … 红光 (the colour word plus 光 is built as `colour + '光'`), 'ultraviolet light' and 'infrared light' written 紫外光 and 红外光 | English "X light" built by concatenation; Chinese names these as 紫光, 紫外光 |
| ch06/6.2/figures.js | sim-series readout `small` line, `(cond ? 'The four visible lines … ; the' : 'The') + ' quotient …'` | the 'The' / 'the' branch ends become `cond ? '四条可见谱线，…；' : ''` followed by '商 … 是里德伯常量' | the English article collapses (translate.md 4.1) |
| ch06/6.2/figures.js | sim-series `where`, `nVis + ' in the visible'` … | written `nVis + ' 条在可见光区'`, 条在紫外线区, 条在红外线区 | English plural-free count phrase needs the measure word 条 |
| ch06/6.2/section.json | exercises e3 prompt, "a potential of 1 volt" | written 1 伏特的电势作用下 | unit named in Chinese in prose, symbol V is not printed in the source (translate.md 4.4) |
| ch06/6.2/figures.js | sim-series note, `'each line is one transition from the orbit n₂ written above it down to n₁ = ' + n1` | becomes `'每条谱线是从其上方标出的轨道 n₂ 落到 n₁ = ' + n1 + ' 的一次跃迁'` | the sentence frame carries the slot n1 in the middle; Chinese needs a closing phrase after it (4.1) |

### ch06/6.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.3/text.html | #de-broglie, #electron-interference, #uncertainty, "wave–particle duality" (span `wave` on "wave", 5 places) | the span wraps the whole compound 波粒二象性, where the source wraps only "wave" | Chinese names wave-particle duality in one word whose first character is 波; the span cannot wrap only 波 (translate.md 3.3, the span stays in its block) |
| ch06/6.3/text.html | #quantum-model, "three-dimensional stationary waves" (span `wave`) | the span wraps 驻波 | stationary wave is one Chinese word, 驻波 (shared with standing wave) |
| ch06/6.3/text.html | #quantum-model, "complex probability <span amplitude>amplitudes</span>" | written 复<span>概率幅</span>, the span wraps 概率幅 | the Chinese term for a probability amplitude is 概率幅; 振幅 (the shared row amplitude) would be a different quantity |
| ch06/6.3/text.html | #uncertainty, "Heisenberg’s <span uncertainty>uncertainty</span> principle", "…principle can be shown…" | the span wraps 不确定性 in 不确定性原理, while the quantities of the same span elsewhere are 不确定度 | the glossary fixes 海森伯不确定性原理 (不确定性) and the shared row uncertainty is 不确定度 |
| ch06/6.3/text.html | #shells, #subshells, #orientation, the `energy` spans on "energy levels" ("discrete <span>energy</span> levels", "from one <span>energy</span> level to another", "the <span>energy</span> levels for the same principal quantum number") | the span wraps 能级 whole | Chinese names an energy level in one word, 能级 (as in 6.2); the span cannot wrap only 能 |
| ch06/6.3/text.html | #subshells, #orientation, #spin, #pauli, `quantum-number` spans in 角量子数, 磁量子数, 主量子数, 自旋量子数 | the span wraps 量子数 only, after the qualifier 角, 磁, 主, 自旋 (one span, as in the source); in the bold name 角<span>量子数</span>（副量子数、角动量量子数） | the book's two names secondary and angular momentum are one Chinese term 角量子数, so the parenthesis carries the aliases (see the glossary row) |
| ch06/6.3/text.html | #electron-interference, sim-head 6.18 and #de-broglie sim-head 6.17: `data-ref` spans "the source", "the screen", "it" | written 电子源, 屏, 它 (the span wraps the noun phrase the Chinese needs: 电子源 for "the source") | Chinese cannot name "the source" or "the screen" by one bare word in the same place; 电子源 is the referent label |
| ch06/6.3/text.html | #electron-interference, Example 6.6 and #uncertainty, "a mass of 9.109 × 10^-28 g", "an uncertainty with a value of at least" | the type spans keep their place but the concept span moves with the Chinese word order (质量为 9.109 × 10⁻²⁸ g; 不确定度的值必须至少为) | Chinese word order |
| ch06/6.3/text.html | #worked-examples, Example 6.8 array `\text{orbital labeled}`, `\text{orbitals total}` | written `\text{个标记为}\;5s\;\text{的轨道}` and `25\;\text{个轨道（合计）}` | the English frame "N orbitals labeled X" has the label at the end; Chinese wraps it (个标记为 X 的轨道), the words inside \text{} are translated |
| ch06/6.3/text.html, ch06/6.3/section.json | #quantum-model "special distribution"; Example 6.7 "m can have values"; e3 key "m₁"; e14 ν for the velocity | the slips are kept as the book prints them: 特殊分布 (the book's "special" for spatial), `<em>m</em>`, `<em>m</em><sub>1</sub>`, ν; section notes translated, quoting the English words | an error of the book stays and its correction stays a correction (root item 13, translate.md 3.2) |
| ch06/6.3/text.html, ch06/6.3/section.json | "secondary (angular momentum) quantum number", "angular momentum or azimuthal quantum number" | written 角量子数（副量子数、角动量量子数） in the prose and the summary, and 角量子数（角动量量子数或方位量子数） in Table 6.1; later mentions 角量子数 alone | the two English names are one Chinese term (glossary row); the aliases are given once at the definition |
| ch06/6.3/text.html | #subshells, "followed by the f-, g-, and h- orbitals for l = 3, 4, and 5" | written 接下来是 f、g 和 h 轨道，分别对应 l = 3, 4, 5, the first two letters in one `<em>f、g</em>` | the English hyphen-suffix list "f-, g-, and h-orbitals" has no Chinese form; the emphasis count of the block is kept |
| ch06/6.3/text.html | #quantum-model, "represented by the Greek letter psi, ψ" | written 用希腊字母 psi（ψ）表示 | the name of the Greek letter is a sentence about letters; the Latin name kept in the sentence (4.3) |
| ch06/6.3/text.html | figure citations in the prose, table eyebrow, "(a)", "(b)" part labels | 图 6.16 to 图 6.23, 表 6.1, （a）（b）（c）; "in Electromagnetic Energy" written “电磁能”一节 | recorded once per book (4.6) |
| ch06/6.3/text.html, ch06/6.3/section.json | Figure 6.16 credit | （来源：改编自 Sukanto Debnath 的作品） | one credit formula for the book (chapter 1) |
| ch06/6.3/figures.js | sim-orbit-wave topline | `${cap(WORDS[k])} wavelength${k > 1 ? 's' : ''} of L pm fit the C pm orbit exactly…` rewritten `C pm 的轨道恰好容纳${WORDS[k]}个 L pm 的波长，…`; the non-whole branch likewise; `WORDS` becomes 零 to 八 and `cap` is no longer called | English plural branch and sentence frame (4.1), Chinese word order |
| ch06/6.3/figures.js | sim-double-slit topline | `${N} electron${N === 1 ? ' has' : 's have'} arrived.` becomes `已有 ${N} 个电子到达。` | English plural branch collapses (4.1) |
| ch06/6.3/figures.js | sim-de-broglie topline | the `q.name === 'electron' ? 'An' : 'A'` branch removed; the sentence reads `以 ${vs} 运动的${q.name}，其德布罗意波长为 …，${cmp}。`; `cmp` strings 约为原子大小的 N 倍 / 与原子的大小相当 / 比原子小约 N 倍; label `λ of the ${q.name}` becomes `${q.name}的 λ` | English article branch collapses (4.1); Chinese word order |
| ch06/6.3/figures.js | sim-radial topline | `radial node${nodes === 1 ? '' : 's'}` collapsed; ", at X and Y from the nucleus." becomes ，位于距原子核 X 和 Y 处。 | English plural branch and word order (4.1) |
| ch06/6.3/figures.js | sim-orbital-shapes readout and headline | `\\text{orbital${l ? 's' : ''}}` becomes `\\text{个轨道}`; "one of the ${WORDS[2l+1]} p orbitals" becomes `${name} 轨道，${WORDS[2 * l + 1]}个 ${sub.value} 轨道之一` | English plural branch collapses (4.1), Chinese word order |
| ch06/6.3/figures.js | sim-orbital-shapes, the orbital choice `aria` | `'the orbital of the ' + l + ' subshell'` becomes `l + ' 亚层的轨道'` | Chinese word order; the code shape differs (translation_parity reports it) |
| ch06/6.3/figures.js | sim-de-broglie `P` names | the particle names 'electron', 'proton', 'softball' written 电子, 质子, 垒球 and the comparison with 'electron' is dropped with the article branch | the display name is also the topline noun; the logic is unchanged |
| ch06/6.3/figures.js | sim-radial and sim-orbital-shapes `views` | 'side', 'above', 'along x/y/z' written 侧视, 俯视, 沿 x 轴, 沿 y 轴, 沿 z 轴 | the view buttons are reader-visible labels |
| ch06/6.3/text.html | #electron-interference, display equation `\kE_{\text{final}}-\kE_{\text{initial}}` | the subscripts written `\text{f}` and `\text{i}` | a subscript wants the shortest form (4.7); `f` and `i` agree with the `n_{\text{f}}`, `n_{\text{i}}` of the same equation and with the `\kEf`, `\kEi` of 6.2 (review pass; 末/初 was dropped) |

### ch06/6.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.4/text.html | #notation, "(read “two–p–four”)" and "(read “three–d–eight”)" | rendered （读作“二–p–四”） and （读作“三–d–八”） | the spoken English reading of the notation 2p⁴ and 3d⁸ is a sentence about how the symbol is read aloud; the Chinese reading names the number and the letter in Chinese (translate.md 4.3) |
| ch06/6.4/text.html | #aufbau, "from the German word <em>Aufbau</em> (“to build up”)" | rendered 源自德语单词 <em>Aufbau</em>（“逐步构建”）, the wording the page's Figure 6.27 caption uses for "building up"; the German word stays in Latin letters in the `<em>` | a sentence about the origin of a German word, with no Chinese equivalent (translate.md 4.3); the term itself is 构造原理 |
| ch06/6.4/text.html | #hunds-rule, "the next <span energy>energy</span> level"; #after-argon, Example 6.10 "order of filling of the <span energy>energy</span> levels"; #periodic-table, "highest <span energy>energy</span> level orbitals" | the `energy-and-work` span wraps 能级 whole (下一个<span>能级</span>, 各<span>能级</span>, 最高<span>能级</span>的轨道) | Chinese names an energy level in one word, 能级, as in 6.2 and 6.3; the span cannot wrap only 能 |
| ch06/6.4/text.html | #periodic-table, "Main group elements (sometimes called representative elements)" | written 主族元素（有时也称为典型元素）; the span `main-group-element` sits on 典型元素 | the shared glossary renders main group elements and representative elements both as 主族元素, so 主族元素（有时也称为主族元素）would say nothing; the alias 典型元素 is the usual second name (collision, translate.md 4.5; pending row) |
| ch06/6.4/text.html | #notation list item 1, "the principal quantum shell, <em>n</em>" | written 主量子<span shell>电子层</span>的序号 <em>n</em> | Chinese has no word for the "principal quantum shell"; 电子层 is the shell and 主量子数 n numbers it (pending row) |
| ch06/6.4/text.html | #orbital-energies, "penetrating" and #after-argon "less penetrating" | written 钻穿能力较弱/减弱 with no span | the chemistry term for orbital penetration is 钻穿 (钻穿效应); the shared row penetration (穿透) belongs to radiation in chapter 21 (pending row) |
| ch06/6.4/text.html | #ions, Example 6.11 (e) | the book's stray "(e)." is kept as （e）. | an error of the book stays (translate.md 3.2) |
| ch06/6.4/text.html, ch06/6.4/section.json | figure citations in the prose, "(a)" to "(f)" part labels, sim-head eyebrows | 图 6.24 to 图 6.29, （a）…（f）; `Figure 6.24`, `Sim`, `Figure` eyebrows kept | recorded once per book (translate.md 4.6) |
| ch06/6.4/section.json | exercise e18 prompt, "the Agatha Christie mystery story “The Pale Horse.”" | written 阿加莎·克里斯蒂的推理小说《灰马酒店》 | a book title with a standard Chinese title (names of people and works keep the standard rendering, translate.md 2.7) |
| ch06/6.4/section.json | exercise e20 prompt, "Cobalt–60 and iodine–131" | written 钴–60 和碘–131, the en dash kept | the isotope names are written element-name plus mass number, as printed |
| ch06/6.4/section.json | exercises e14 options "Both Mg and S", "Both Si and S." | written Mg 和 S 都是, Si 和 S 都是。 | the English "Both … and …" has no Chinese frame without a predicate; the stray final full stop of the last option is kept as 。 |
| ch06/6.4/figures.js | sim-aufbau `un` (the unpaired-electron phrase) | `u === 0 ? 'no unpaired electrons' : u === 1 ? 'one unpaired electron' : u + ' unpaired electrons'` becomes `u === 0 ? '没有未成对电子' : '有 ' + u + ' 个未成对电子'`; the same `un` serves the readout (`'实测基态' + un + '。'`) | English singular/plural branch collapses to one Chinese form (4.1) |
| ch06/6.4/figures.js | sim-aufbau exception headline | `(cnt === 1 ? 'one electron goes' : cnt + ' electrons go')` becomes `'有 ' + cnt + ' 个电子进入'`; ` and ` in `dst.join` and `src.join` becomes ` 和 `; the sentence is rewritten in Chinese order with the same slots (`abbr(Z, pred)`, `dst`, `src`, `abbr(Z, obs)`) | English plural branch and sentence frame (4.1) |
| ch06/6.4/figures.js | sim-periodic `where`, `kind`, `rule`, topline | `'period ' + p + ', group ' + g` becomes `'第 ' + p + ' 周期、第 ' + g + ' 族'`; the three `kind` strings (`a main group element` …) become 主族元素, 过渡元素, 内过渡元素 and the two comparisons `kind === …` that look them up follow them; the topline reads `<name>位于<where>，属于 s 区，是<kind>。`; the `rule` sentences are rewritten in Chinese order | the `kind` string is also the lookup key in the code (as in 1.4); English "stands in … and is a …" and the articles have no Chinese frame (4.1) |
| ch06/6.4/figures.js | ELS, the 118 element names | the English names become the Chinese element names of 化学元素名称 (氢 … 鿫); `NAME` is only displayed (hover name, headline, chosen square) | element names are the authority's (translate.md 2.7) |
| ch06/6.4/text.html | #periodic-table, spans `f-block-element` on 内过渡元素 | the span wraps 内过渡元素, while the book concept `f-block-element` has no glossary row of its own | the row inner transition elements is 内过渡元素; the concept name is still untranslated in the shared tables (ch7 note) |

### ch06/6.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch06/6.5/text.html | #ionization-energy, "than <span data-type="energy">that</span> of beryllium"; #ie-exceptions, "than <span data-type="energy">that</span> for nitrogen" | the pronoun span is written on a repeated noun: 铍的<span>电离能</span> (#ionization-energy) and 氮的<span>第一电离能</span> (#ie-exceptions) | Chinese has no pronoun for "that of", it repeats the noun (or drops it); the span stays in its block and keeps its `energy` type |
| ch06/6.5/text.html | #ionic-radii, "the sulfide anion"; #electron-affinity, "a fluoride anion (F–)"; #reactivity, "fluorine anions" | the `anion` span wraps the whole compound: <span>硫离子</span>, <span>氟离子</span>, <span>氟离子</span> | Chinese names the anion in one word (硫离子, 氟离子, shared row sulfide ion); the span cannot wrap only "anion" (translate.md 3.3, as ch01 wraps whole compound names) |
| ch06/6.5/text.html | #periodic-properties, #covalent-radius, #effective-nuclear-charge, #ionic-radii, #electron-affinity, "principal <span data-concept="quantum-number">quantum number</span>" | written 主<span>量子数</span> | the span keeps the same words as the source (quantum number); 主 is the English "principal" and stays outside |
| ch06/6.5/text.html | #effective-nuclear-charge, display equation `Z_{\text{eff}}=Z-\text{shielding}` | `\text{shielding}` becomes `\text{屏蔽}`; the subscript `\text{eff}` is kept as the abbreviation the prose also keeps (<em>Z</em><sub>eff</sub>) | an abbreviation of a symbol, not a word of the sentence |
| ch06/6.5/text.html | #effective-nuclear-charge, Example 6.12, "(Note: Fl is the symbol for flerovium, element 114, NOT fluorine)" | written （注：Fl 是𫓧的元素符号，𫓧是第 114 号元素，并非氟）; capitals of NOT become 并非 | Chinese has no capitals for emphasis; 𫓧 is the shared glossary row flerovium (ch18) |
| ch06/6.5/text.html, ch06/6.5/section.json | figure citations in the prose, （a）（b） part labels and （图 6.31）-style labels in the original captions; table eyebrows | 图 6.30 to 图 6.35; （a）（b）; （图 6.31）; 表 6.2, 表 6.3; the `Figure 6.30`, `Figure 6.31 + 6.33`, `Sim`, `Figure` eyebrows kept | recorded once per book (translate.md 4.6) |
| ch06/6.5/figures.js | sim-successive `WORD`, `ORD` and the headline, `n > 1 ? 's' : ''` | `WORD = ['', '一', '两', '三', '四', '五']`, `ORD = ['', '第一', …, '第五']`; the plural branch is dropped; the headline reads `钾有一个价电子，所以它的电离能在第一次电离之后跃升：$\kIE_{2}$ 是 $\kIE_{1}$ 的 7.29 倍。` | English plural branch and ordinal words (4.1); the sentence is in Chinese word order with the same slots (`BY[s].name`, `WORD[n]`, `ORD[n]`, n + 1, n, ratio) |
| ch06/6.5/figures.js | sim-successive hover name, `ORD[i + 1] \|\| (i + 1) + 'th'` | `${name}的${ORD[i + 1] \|\| '第 ' + (i + 1) + ' '}电离能，…` (钾的第一电离能 … 钾的第 6 电离能) | the English ordinal suffix `th` has no Chinese form; the fallback keeps the number (4.1) |
| ch06/6.5/figures.js | sim-halogen-radii headline and hover names | `The ${s}–${s} distance is … so the covalent radius of ${name} is … pm.` written `${s}–${s} 距离为 … pm，所以${name}的共价半径为 … pm。`; `a ${name} atom` becomes `${name}原子` | Chinese word order; English article dropped (4.1) |
| ch06/6.5/figures.js | sim-trends-graph headline, `verb`, `cut` | `falls`/`rises` become 减小/增大 and the sentence is `在第 N 周期中，从 X 到 Y，…，半径由 a pm减小到 b pm。`; `cut` becomes `，此处半径曲线止于 Z = N` | Chinese word order of the same slots (4.1) |
| ch06/6.5/figures.js | sim-ions hover name | `an atom of ${word}` / `the aluminum ion` / `the sulfide ion` become `${word}原子` / `铝离子` / `硫离子` | English "an atom of", the articles and the genitive have no Chinese form (4.1); 铝离子, 硫离子 are shared rows (ch02) |
| ch06/6.5/figures.js | sim-ions protons and electrons line | `${Zp} protons, ${e} electrons` becomes `${Zp} 个质子，${e} 个电子` | plural nouns collapse to one Chinese form with the measure word 个 (4.1) |
| ch06/6.5/figures.js | `ELEMENTS`, the 88 element names | the English names become the Chinese element names of 化学元素名称 (氢 … 镭); the hover names, the halogen choice and the headline use them, `.toLowerCase()` stays in the code and changes nothing | element names are the authority's (translate.md 2.7) |

### Chapter 6: Other things for the owner

- **Glossary chapter glossary.** `glossary.zh-CN.json` has 266 rows: 202 from the scaffold (the chapter's concept names, section and sim-head headings, people and obvious terms) and 64 new from the pages. 73 rows carry `"confirm": "termonline"` (the 54 that the pages or the scaffold marked, 19 more that came as `cnterm-physics` or `cnterm-chemistry` without a lookup or URL); none was looked up at termonline.cn in this pass.
- **Rows that reuse another chapter glossary.** terahertz is 太赫兹波 (ch21; the spectrum sim's region label is written 太赫兹波, as 微波 and 无线电波 beside it); ultraviolet 紫外线 (chapter 18) and Nobel Prize in Physics 诺贝尔物理学奖 (chapter 10) are the same targets and were not repeated; half-filled orbital is 半充满轨道 (ch8), swept into 6.5 (it read 半充满的轨道); the half-filled subshell stays 半充满的亚层.
- **Terms worth a second look.** 悖论 for the atomic paradox (物理学名词 has 佯谬 for apparent paradoxes); 钻穿能力 (6.4) against 钻穿效应 (6.5) for orbital penetration, one notion, two rows; 第一电离势 beside 第一电离能 (the book says "ionization potential" once); 能量势垒; 特设假设; 光以太; 典型元素 as the alias of 主族元素 (the shared glossary gives both English names the same target); 简并 against 简并度; 屏 for the screen of the double-slit sim; 概率幅 against 振幅; 元素页.
- **Errors of the book kept.** "Neils Bohr" (6.1 section.json `notes`, quoted), "special distribution" for spatial (6.3), the unlabelled `m` in Example 6.7 and the key `m₁`, ν for a velocity in 6.3 e14, the stray "(e)." in Example 6.11 (6.4). The corrections are in the section `notes`.
- **English kept in the pages.** `answer.parts[].part` labels of 6.1 (e3 to e6: "(a) wavelength", "energy in joules" …) as translate.md 5 lists them as kept, left to the owner as in chapter 1; the Greek letter name psi (6.3) and the German word Aufbau (6.4) inside sentences about the word; the eyebrows `Figure N.M`, `Sim`, `Figure`; acronyms and names in credits (NASA, ESA, PASCO, ASTM, Wi-Fi, GPS, IUPAC), and the pure-math `answer.solution` strings.
- **Judgement calls.** the 6.3 subscripts of the energy-difference equation \text{final}/\text{initial} became \text{末}/\text{初}; the electron-transition vocabulary follows 物理学名词 (跃迁, 线系, 定态); 能级 is the span wrap wherever the source wraps "energy" of "energy level"; 角量子数 carries 副量子数、角动量量子数 once at the definition. The 6.1 hydrogen tube keeps the span on 气 of 氢气.
- **Spacing.** CJK and Latin/digit were separated in the text of the six pages and the strings of the figures (15 places in 6.1, 6.4 and 6.5 were fixed in the merge); `铁(II)`-style compound names and the title 化学（第2版），6.2 … are written as chapter 1 does.
- **Humanizer review and `npm run dev` read-through** are outstanding for the owner.

## Chapter 7 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Sim`, the bare `Figure` of the photographs of 7.3 to 7.6 and the composite `Figure 7.16 + 7.19 + 7.20` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, section.json | figure citations in the prose and in the notes | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book in ch01 |
| ch07/7.2/text.html, ch07/7.5/text.html | table eyebrows `Table 7.1` to `Table 7.4` | written 表 7.1 to 表 7.4 (7.5's `Table 7.4` was first left in English and was changed by the merge) | translate.md 5 lists a table's eyebrow as translated; the ch01 rule |
| ch07/intro/text.html, ch07/7.1/text.html, ch07/7.3/text.html | photo credits (3) | （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X", lettered or positional credits （来源 a：…） and （来源 中：…；右：…）; names and organisations kept as printed (Wikimedia Commons, United States Department of Energy) | the ch01 credit formula |
| ch07/7.1/text.html, ch07/7.2/text.html, ch07/7.3/text.html, ch07/7.4/text.html, ch07/7.5/text.html, ch07/7.6/text.html | spans on compound names (氧化铝, 一氧化氮, 一氧化二氮, 硝酸钾, 硝酸铵, 硫酸铵, 氨基酸, 天然气, 食盐, 笑气 …) | each span wraps the whole Chinese compound that contains the concept's word (氧化物, 硝酸盐, 硫酸盐, 酸, 气体, 盐); one row per page below | Chinese names the compound in one word; the span cannot wrap only the English-style part (ch01 rule, translate.md 3.3) |

### ch07/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/intro/text.html | Figure 7.1 caption, "(credit middle: …; credit right: …)" | written （来源 中：改编自 … 的作品；右：改编自 … 的作品）; names kept | one credit formula for the book (ch01 precedent); lettered/positional labels translated |
| ch07/intro/text.html | `Figure 7.1` eyebrow | kept in English | the checker matches the eyebrow; the app localises it (translate.md 4.6) |
| ch07/intro/text.html | "Nicknamed “buckyballs,”" | sentence reordered: the subject 巴克敏斯特富勒烯分子 first, then 绰号“巴基球” | Chinese word order; sentence content and order of clauses kept |
| ch07/intro/text.html | Figure 7.1 caption, "soccer ball" (alt text and caption) | written 足球 | the Chinese name of the object (translate.md 4.4) |

### ch07/7.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.1/text.html | formation, "aluminum oxide" (span `oxide`) | the span wraps the whole compound name 氧化铝 | Chinese names the compound in one word; the span cannot wrap only "oxide" (3), as in ch01 |
| ch07/7.1/text.html | formation, "three oxide anions"; anions, "the oxide ion" (spans `oxide` + `anion`/`ion`) | written 氧 + 阴离子 and 氧 + 离子, the `oxide` span on 氧 | the Chinese names are 氧阴离子 and 氧离子 (glossary ch02 oxide ion 氧离子), 氧化物阴离子 does not exist; the span keeps its block |
| ch07/7.1/text.html | ionic-compounds, "high melting and boiling points" (span `melting`) | the span wraps 熔点 | Chinese says 熔点 and 沸点 where English says "melting and boiling points" |
| ch07/7.1/text.html | ionic-compounds, "in the solid state" (span `solid`) | the span wraps 固态 | the state used as a noun takes 态 (as in ch01) |
| ch07/7.1/text.html | ionic-compounds, "conductors of electricity and heat" (span `heat-flow`) | written 电和热的良导体, the span on 热 | the fixed phrase 导热 / 热的良导体 uses the short 热, not 热量 |
| ch07/7.1/text.html | ionic-compounds, "table salt" (span `salt`) | the span wraps 盐 inside 食盐 | Chinese names table salt in one word 食盐 |
| ch07/7.1/text.html | ionic-compounds, "chlorine gas" (span `gas`) | the span wraps 气 of 氯气 | Chinese names the substance in one word (as in ch01 天然气) |
| ch07/7.1/text.html | cations, "group 1 (the alkali metals) and 2 (the alkaline earth metals)" | written 第 1 和第 2 族（即碱金属和碱土金属）, one `group` span | the Chinese form states the group numbers once before 族; the three concept spans stay in order |
| ch07/7.1/text.html | cations, "the group numbers … and, consequently, to the charges" | the second "equal to the group number" written 也与此相等, without a second `group` span | the source repeats no span here; the Chinese pronoun replaces the repeated noun |
| ch07/7.1/text.html | cations, "next-to-outermost shell" (span `shell`) | written 次外电子层, the span on 电子层 | Chinese 次外 + 层 qualifies the shell in one compound |
| ch07/7.1/text.html | cations, "Transition and inner transition metal elements" | written 过渡金属和内过渡金属元素, only 内过渡金属 and 元素 in spans | follows the source, whose first "Transition" carries no span |
| ch07/7.1/text.html | cations, "isoelectronic with the noble gas Ar" | written 与稀有气体 Ar 是等电子的 | the glossary term is the adjective 等电子的 |
| ch07/7.1/text.html | ionic-compounds, "Neutral atoms and their associated ions" | `neutral` written 电中性的 (span on 电中性) | the glossary concept is 电中性; 中性 alone means pH-neutral |
| ch07/7.1/text.html | formation, Figure 7.2 caption `credit a` | （来源 a：改编自 “Jurii”/Wikimedia Commons 的作品） | the book-wide credit formula; the name kept as printed |
| ch07/7.1/text.html | formation, "…the formula for an ionic compound … (thus, (2 × +3) + (3 × –2) = 0)" | square brackets `[thus, …]` written as full-width ［因此，…］ | the brackets enclose Chinese prose |
| ch07/7.1/figures.js | sim-charge-balance, `count` helper and `topline` | `One/Two/Three` + `n === 1 ? one : many` collapsed to 一/两/三 + 个 + noun; the sentence rewritten with the same slots: `一个铝离子带 3 个正电荷，三个氧离子带同样多的负电荷。` | English plural and verb agreement (`carries` / `carry`, `charge` / `charges`) collapse to one Chinese form (4.1) |
| ch07/7.1/figures.js | sim-charge-balance, `CATIONS` / `ANIONS` `name` and the hover name `a cation, the sodium ion (Na⁺)` | names reduced to the element root (钠, 氯, 氧, 硫, 氮, 铁(III)), the hover name becomes `阳离子，钠离子 (Na⁺)` | Chinese names the ion 钠离子, 氯离子, 氧离子; the English "chloride/oxide/sulfide/nitride" are not separate Chinese words (4.1); the article `a`/`an`/`the` is dropped |
| ch07/7.1/figures.js | sim-nacl-lattice, readout `6 Cl⁻ around each Na⁺ …` | `\text{每个 Na}^{+}\text{ 周围有 }6\ \text{个 Cl}^{-}` and the mirror, the TeX around kept | English word order (number before the noun, "around each") cannot be kept; the Chinese puts the location first |
| ch07/7.1/figures.js | sim-nacl-lattice, views `face`, `corner` | written 正视, 斜视 | view names, the shortest standard form |
| ch07/7.1/text.html | ionic-compounds, "once dissolved or melted" (span `dissolved`) | the span wraps 溶解, not the glossary row 溶解的 | Chinese uses the verb 溶解 here, the adjective "dissolved" has no separate form (added by the merge) |

### ch07/7.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.2/text.html | `<span data-concept="nitrate">nitrate</span>` in "potassium nitrate" (2 spans, last paragraph before Example 7.3) | the span wraps the compound name 硝酸钾 | the source wraps one English word of "potassium nitrate"; Chinese names the salt in one word (concept 硝酸盐 sits inside 硝酸钾) |
| ch07/7.2/text.html | `<span data-concept="melting">melting</span>` and `<span data-concept="boiling-point">boiling points</span>` (2nd paragraph) | spans wrap 熔点 and 沸点 | English shares "points" over two words; Chinese has one compound each (concept words 熔化, 沸点) |
| ch07/7.2/text.html | `<span data-concept="mass">mass</span>` in "weapons of mass destruction" | span wraps 大规模 | the Chinese term 大规模杀伤性武器 has no word for mass (质量); the span is kept on the corresponding word (translate.md 3.3) |
| ch07/7.2/text.html | `<span data-concept="solid">solid</span>` in "solid states" | span wraps 固态 | Chinese names the state in one word; concept word is 固体 |
| ch07/7.2/text.html | `<span data-concept="dissolved">dissolved</span>`, `<span data-concept="insoluble">insoluble</span>` | spans wrap 溶解 and 不溶 (before 于水) | Chinese places the verb stem before 于水 |
| ch07/7.2/text.html | spans on "metallic and nonmetallic atoms", "the nitrogen and oxygen atoms", "a partial positive charge on one atom and ... on the other", "oppositely charged ions", "which are electrically neutral" (molecule/ion/atom) | one span kept per source span; the Chinese coordinate phrase (金属与非金属原子, 氮与氧原子) has one 原子 | English coordinates two adjectives or nouns over one noun; Chinese does the same, so only one word remains to wrap; the second noun in 另一个原子 and the plural 这些离子 stay plain because the source has no span there |
| ch07/7.2/text.html | figure citations and table eyebrow | 图 N.M in prose, 表 7.1 for the table eyebrow, `Figure …` eyebrows kept | as the book-level rows of ch01 config.md |
| ch07/7.2/text.html, ch07/7.2/section.json | "the only person to have received two unshared (individual) Nobel Prizes" | 唯一两次独享（个人）诺贝尔奖的人 | 独享 is the usual Chinese for a prize not shared with others (review pass; was 非共享（个人）诺贝尔奖) |
| ch07/7.2/figures.js | `text(ctx, 'Decreasing' / 'electro-' / 'negativity', ...)` (3 lines of the hyphenated English label) | 电负性 / 减小 / '' (third line left empty) | the English splits the label over three lines by hyphenation; Chinese needs two lines, so the third text call stays and is empty |
| ch07/7.2/figures.js | headline of sim-polarity: `'The ' + bond + ' bond has ...'` | `'该 ' + bond + ' 键的 ΔEN = ' ...` | the parity check reads a leading string literal; 该 renders "The" |
| ch07/7.2/figures.js | headline `'The two ' + NAMES[a] + ' atoms ...'`, `NAMES[..] + ' carries ...'` | element name + 原子 | English uses the bare element name as a count noun and subject; Chinese needs 原子 after the element name |
| ch07/7.2/text.html | molecular-compounds, "covalent compounds" (3 spans, concept `molecular-compounds`) | the spans wrap 共价化合物 | the source span text is "covalent compounds"; 共价化合物 is its literal rendering and is listed among the concept's terms in `book.json`, so the spans wrap the whole word (review pass corrected the earlier note, which read the source as "molecular compounds") |
| ch07/7.2/text.html | covalent-compounds, "at room temperature" (span `temperature`) | the span wraps 室温 | the ch01 rule (室温, 温度) (added by the merge) |
| ch07/7.2/text.html | Example 7.3 prompt, "amino [acids]" (span `acid`) | the span wraps the whole compound name 氨基酸 | as 7.6 Example 7.16 and the compound-name rule above (review pass; was 氨基<span>酸</span>) |

### ch07/7.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.3/text.html | octet-rule, writing-lewis, octet-exceptions and XeF₂/XeF₆, "lone pairs of electrons" (spans `lone-pair`, `electron`, 5 places) | the `electron` span is nested in the `lone-pair` span: `<span lone-pair>孤<span electron>电子</span>对</span>` (有三对孤电子对, 另一个孤电子对, 含有带有孤电子对的原子, 放三对孤电子对 ×2) | 孤电子对 is one word that cannot be cut into two adjacent spans; both spans stay, in the source order; the same method as 7.6 (review pass; was 三对以孤电子对形式存在的电子) |
| ch07/7.3/text.html | multiple-bonds, "the carbon and oxygen atoms" (one `atom` span) | written 碳和氧原子, the span on 原子 | English coordinates two nouns over one plural noun; Chinese does the same, so one span remains |
| ch07/7.3/text.html | octet-exceptions, "Nitric oxide" (span `oxide`) | the span wraps the whole compound name 一氧化氮 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as in ch01 and 7.1) |
| ch07/7.3/text.html | octet-exceptions, "at high temperatures" (span `temperature`) | the span wraps 高温 | Chinese says 高温 where English says "high temperatures" (as 室温 in ch01) |
| ch07/7.3/text.html | octet-rule and octet-exceptions, "group 14 / 15 / 16 element", "groups 2 and 13" (span `group-of-the-periodic-table`) | written 第 14 族元素, 第 15 族元素, 第 16 族, 来自第 2 和第 13 族, one `group` span each | the Chinese form states the number before 族, as in 7.1 |
| ch07/7.3/text.html | writing-lewis, the five-step list item 1 "Determine the total number of valence (outer shell) electrons" | written 价（最外电子层）电子, the `shell` span on 电子层 | Chinese 最外电子层 qualifies the shell in one compound (as 次外电子层 in 7.1) |
| ch07/7.3/text.html | writing-lewis, "Since OF₂ is a neutral molecule" (span `electrically-neutral`) | written 是电中性的分子, the span on 电中性 | the glossary concept is 电中性; 中性 alone means pH-neutral (as in 7.1) |
| ch07/7.3/text.html | writing-lewis, the four `\text{…}` lines of the valence-electron sums | "valence electrons/atom", "atom(s)", "additional electron", "electron (positive charge)" written 个价电子/原子, 个原子, 个额外电子, 个电子（正电荷）, with the number before 个 | English singular and plural (`atom`/`atoms`, `electron`/`electrons`) collapse to one Chinese form (4.1); the TeX around the words is kept |
| ch07/7.3/text.html | writing-lewis, table sum "Si: 4 valence electrons/atom" and the colons inside `\text{}` | the colon written full-width inside \text{} (Si：) | the colon belongs to the Chinese words of \text{} |
| ch07/7.3/text.html | fullerene, "since prehistoric times, ." and "C₆₀." | kept as 自史前时代起就为人所知，。; the period inside the subscript is not kept: C<sub>60</sub> 为基础 | the book's stray comma-period is visible in English too and is kept (see section.json notes); the period inside the subscript is invisible in English but would become a stray "." in the middle of the Chinese sentence (review pass) |
| ch07/7.3/text.html | fullerene, names of people | 理查德·斯莫利, 罗伯特·柯尔, 哈罗德·克罗托, 大泽映二 written in Chinese; Elena Galpern, James Heath, Sean O’Brien, Yuan Liu kept in Latin letters | standard rendering where one exists, the original otherwise (translate.md 2.7) |
| ch07/7.3/text.html | fullerene, Figure 7.11 caption "(credit: United States Department of Energy)" | （来源：United States Department of Energy） | the book-wide credit formula, the organisation kept as printed |
| ch07/7.3/text.html | fullerene, "Upon his death in 2005, the US Senate honored him as the “Father of Nanotechnology.”" | written 2005 年他去世后，美国参议院称他为“纳米技术之父”。 | the English has the Senate honor him upon his death; Chinese states the title in one clause |
| ch07/7.3/text.html | Example 7.4, "NASA’s Cassini-Huygens mission … Titan, one of Saturn’s moons" | 美国国家航空航天局（NASA）的卡西尼-惠更斯号任务, 土卫六 | NASA expanded once, as FDA in ch01; Titan is called 土卫六 (泰坦) in Chinese astronomy, and the English possessive is dropped |
| ch07/7.3/text.html | octet-exceptions, "Hypervalent" paragraph, `SF<sub>6.</sub>` | written SF<sub>6</sub> followed by 的路易斯结构式 | the book's period inside the subscript is not kept; the sentence continues in Chinese (review pass) |
| ch07/7.3/text.html, ch07/7.4/text.html | "Nitric oxide" (7.3), "Nitrous oxide" (7.4, Example 7.8 and its figures) | written 一氧化氮 and 一氧化二氮, the 化学名词 names and ch18's targets; ch2's 氧化氮 / 氧化亚氮 apply only to the 2.7 passage that contrasts common and systematic names | two chapter glossaries, two targets for the same source; this chapter follows ch18 and no ch07 row is added (review pass) |
| ch07/7.3/text.html | Example 7.4 and 7.5 headings | 例 7.4 · 书写路易斯结构式, 例 7.5 · 书写路易斯结构式：违反八隅体规则的情形 | "Octet Rule Violations" needs 的情形 to read as a noun phrase |
| ch07/7.3/section.json | e1 to e17, part labels `(a)`, `(b)` … and `(a) eight electrons:` | full-width （a）（b）, 八个电子：, 没有电子 | the book-wide formula for part labels in prose |
| ch07/7.3/section.json | e9 solution `${\text{SeCl}}_{3}{}^{\text{+}}\text{:}$` | kept | the colon sits inside \text{} in the source's TeX; the other items' colons are written ： |
| ch07/7.3/section.json | e3, e7, e9, e17 solutions with no words, images with alt | only the image `alt` translated, `src` kept | translate.md 5 |
| ch07/7.3/section.json | e12 prompt "(a cyclic molecule with a ring of eight Se atoms)" | （一种环状分子，由八个 Se 原子组成一个环） | English "ring of eight Se atoms" needs 组成 in Chinese |
| ch07/7.3/section.json | e13 alt, "the number one point five … a number two … the number three" | written 数字一点五, 数字二, 数字三 | the alt text reads the coefficients aloud, all spelled in words as in the source (review pass; 2 and 3 were digits) |
| ch07/7.3/section.json | e2, e4, e6, e8, e10, e12, e14, e16 solutions (AI-written, `generated_by: ai`) | translated as the other solutions; "brackets" written 方括号 | square brackets of a Lewis structure; 括号 alone would read as parentheses |
| ch07/7.3/figures.js | sim-lewis-steps, `WORD` array `['no','one','two','three','four','five','six']` and `BONDNAME` | `['无','一','两','三','四','五','六']` and `['','单','双','三']` | display arrays of words (translate.md 5); 两 for 2 before a measure word |
| ch07/7.3/figures.js | sim-lewis-steps, `words()` case 2 and 5, `WORD[nb][0].toUpperCase() + …`, `nb > 1 ? 's' : ''`, `use${nb > 1 ? '' : 's'}`, `moved > 1 ? 's move' : ' moves'` | collapsed: `${WORD[nb]}个单键用去 … 个电子，还剩 … 个。`, `${WORD[moved]}对孤电子对移入键中，形成 N–O 双键。` | English capitalised number word, plural and verb agreement collapse to one Chinese form (4.1) |
| ch07/7.3/figures.js | sim-lewis-steps, `words()` case 4 and `note()`, `atom${…}`, `have`/`has`, `lack octets`/`lacks an octet` | collapsed to one form: `其余 N 个电子作为孤电子对放在中心原子上。`, `碳和氮原子有 5 和 7 个电子，未达到八隅体。` | English plural and agreement (4.1); the names are joined with 和 |
| ch07/7.3/figures.js | sim-lewis-steps, `words()` case 1 and 5 templates | rewritten in Chinese word order with the same slots (`${m.name} 有 ${T} 个价电子需要放置…`, `第 ${s} 步：…`, `形成 A–B 双键`) | English sentence frames cannot carry the slots in the same order; the article `a` before the bond is dropped |
| ch07/7.3/figures.js | sim-lewis-steps, `NAMES` and the hover name `hydrogen (H): 2 electrons` | `NAMES` holds the element root (氢, 碳, 氮, 氧, 氟, 硅); the hover name becomes `氢原子 (H)：2 个电子` | Chinese names the atom by 元素名 + 原子 (as in 7.1, 7.2); the same array feeds the note, where 原子 follows the joined names |
| ch07/7.3/figures.js | sim-lewis-steps, readout `\text{valence electrons in }${m.tex} = …` | `${m.tex}\text{ 的价电子数} = …` | the English "in X" puts the formula after the words; Chinese puts it before; the TeX is otherwise kept |
| ch07/7.3/figures.js | sim-lewis-steps, readout underbraces `\text{in bonds}`, `\text{in lone pairs}`, `\text{still to place}` | `\text{键中}`, `\text{孤电子对中}`, `\text{待放置}` | the shortest standard forms, so the labels fit under the braces (4.7) |

### ch07/7.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.4/text.html | ex-n2o, "Nitrous <span oxide>oxide</span>, N₂O" (twice) | the span wraps the whole compound name 一氧化二氮 | Chinese names the compound in one word; the span cannot wrap only "oxide" (the ch01 compound-name rule, translate.md 3) |
| ch07/7.4/text.html | ex-n2o, "commonly known as laughing <span gas>gas</span>" | written 俗称笑气, the span wraps the whole name 笑气 | 笑气 is one word; the span cannot wrap 气 alone (same rule as 天然气 in ch01) |
| ch07/7.4/text.html | resonance, "carbonate anion" and "carbonate ion" (spans `carbonate`, `anion`/`ion`) | written 碳酸根阴离子 and 碳酸根离子, the `carbonate` span wraps 碳酸根 and not the glossary row 碳酸盐 | the ion is named 碳酸根 in Chinese (as 碳酸根离子 in the shared glossary), 碳酸盐 is the salt |
| ch07/7.4/text.html | calculating-formal-charge, the formal-charge equation | `\text{# valence shell electrons (free atom)}`, `\text{# lone pair electrons}`, `\text{# bonding electrons}` written `\text{价层电子数(自由原子)}`, `\text{孤电子对的电子数}`, `\text{成键电子数}` | Chinese says 数 for "number of", so the symbol `#` is not written; the TeX outside `\text{}` is unchanged |
| ch07/7.4/text.html | resonance, "the more likely structure for the nitrite anion in Example 7.8" | kept as the book writes it (亚硝酸根阴离子, 例 7.8) | the book's own slip: Example 7.8 treats nitrous oxide, N₂O, not nitrite (root item 13); not corrected |
| ch07/7.4/text.html | resonance, Wheland's analogy (rhinoceros, dragon, unicorn) | translated for meaning (犀牛, 龙, 独角兽); "George Wheland" written 乔治·惠兰（George Wheland）, the Chinese rendering with the English in parentheses | the name has no standard rendering known; a transliteration is given and the original kept (translate.md 2.7), owner to confirm |
| ch07/7.4/section.json | e20 prompt | "About 90 billion pounds" written 约 900 亿磅 | Chinese counts in 亿 (4.4); pound has no symbol in the source, so it takes the target name 磅 (as in ch01) |
| ch07/7.4/section.json | e1, e2, e4, e12 etc. answer figure alts | spoken-form labels in the alt text (“open parenthesis, 0, close parenthesis”, “positive 1”, “N O subscript two superscript negative sign”) written 左括号、右括号、正 1、负 1、“用于 N O 下标二上标负号” | the alt text is read aloud; the words are translated, the numbers kept |
| ch07/7.4/figures.js | sim-formal-charge, readout small line and hover | `the charge of ${S.charge ? 'the ion' : 'the molecule'}` written 等于${S.charge ? '该离子' : '该分子'}的电荷 | English article and the ion/molecule branch; the branch stays (两个不同的名词), the article collapses (4.1) |
| ch07/7.4/figures.js | sim-resonance-hybrid, hover names | `oxygen (O): ½ of the negative charge` written 氧（O）：负电荷的 ½ | English "of" phrase reordered for Chinese; the code shape is kept |

### ch07/7.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.5/text.html, section.json (lead, summary_html) | `bond <dissociation> <energy>` (the `dissociation-of-ionic-compounds` and `energy-and-work` spans, 5 places) | written 键<span>解离</span><span>能</span>: the energy span wraps 能 alone | glossary 键解离能 is one word whose last character is the concept word 能量; the two spans keep their places (translate.md 3.3) |
| ch07/7.5/text.html | `aluminum <oxide>oxide</oxide>` (Example 7.10) | the span wraps 氧化铝 | the compound's Chinese name contains the concept word 氧化物 as 氧化, so the span wraps the whole compound (same method as ch01's 天然气) |
| ch07/7.5/text.html | `<enthalpy>enthalpies</enthalpy> of formation`, `<enthalpy>enthalpy</enthalpy> of formation` (6 places) | the span wraps 生成焓 | 生成焓 is one word in Chinese, and the glossary has 标准生成焓 whole; 焓 alone would split it |
| ch07/7.5/text.html | `Table 7.4` first row, `Enthalpy of sublimation of Cs(s)` | written Cs(s) 的升华<span>焓</span> | the source wraps only `Enthalpy`; the Chinese word 升华焓 takes the one span on 焓 and 升华 stays outside it, as the source |
| ch07/7.5/text.html | `Coulomb’s <law>law</law>` | written 库仑<span>定律</span> | the source wraps `law` only, Chinese 库仑定律 keeps the span on 定律 |
| ch07/7.5/text.html | `(the …) one mole`, `two moles`, `four moles`, `half a mole`, `a mole of methane molecules` | numbers written 1 摩尔, 2 摩尔, 4 摩尔 (半摩尔 in prose of the figure code); `mole`/`moles` collapse to 摩尔 | English plural branch with spelled numbers; Chinese keeps the quantity in digits next to the unit word (4.1) |
| ch07/7.5/text.html | `the same two atoms` (Bond strength and bond length, 1st paragraph) | the sentence order "triple bonds are stronger and shorter than double bonds between the same two atoms" is kept in its order: 三键比同样两个原子之间的双键更强、更短 | the `atom` span stays in its block, the Chinese attributive 同样两个原子之间的 precedes 双键 |
| ch07/7.5/figures.js | sim-length, `ORDER = ['single','double','triple']` and hover name `a ${ORDER[k]} bond` | `['单键','双键','三键']`, name `${n}，${ORDER[k]}：…`; the article `a` and the noun `bond` dropped | English article and noun grammar built by concatenation (4.1) |
| ch07/7.5/figures.js | sim-length legend `${p.name} bonds` | `${p.name} 键` | English plural (4.1) |
| ch07/7.5/figures.js | sim-enthalpy hover name `${n} bond ${kind}` with `kind` = 'broken' / 'formed' | `${n} 键${kind}`, `kind` = '断开' / '形成' (review pass; 被形成 is not idiomatic) | English word order `H–H bond broken` has no Chinese counterpart; a verb phrase follows the noun (4.1) |
| ch07/7.5/figures.js | sim-enthalpy headline `… the reaction is ${dH < 0 ? 'exothermic' : 'endothermic'}.` | `…反应是${dH < 0 ? '放热' : '吸热'}的。`; 'Breaking the bonds takes … and forming the new bonds releases …' written with the same four slots in the same order | the adjective needs 的 in Chinese; the branch is a word choice, not grammar (4.1) |
| ch07/7.5/figures.js | sim-enthalpy readout `\text{broken}` / `\text{formed}` subscripts | `\text{断开}` / `\text{形成}` | a subscript wants the shortest form (4.7, as ch01's 前/后) |
| ch07/7.5/figures.js | symbol labels `ΔH_{lattice}`, `ΔH_{s}°`, `ΔH_{f}°`, `R_{o}`, `IE`, `EA`, `½D` | kept as printed | they are the book's symbols (the same as the `\kdHlat`, `\kdHs`, `\kdHf`, `\kRo` macros of text.html, which book.json symbols keep), not words |
| ch07/7.5/section.json | exercise e8 footnote 1 | "the Chemistry Advanced Placement Examination" written 化学大学先修课程（Advanced Placement）考试, "Educational Testing Service" 教育考试服务中心（Educational Testing Service） | names of an examination and an organisation with no official Chinese name; the English name is kept in parentheses (2.7) |
| ch07/7.5/section.json | exercise cyl1 prompt "Ethyl alcohol … is the alcohol contained in alcoholic beverages" | 乙醇 … 酒精饮料中所含的酒精 | Chinese distinguishes the compound name 乙醇 from the everyday word 酒精; the sentence is not changed |
| ch07/7.5/text.html | enthalpy-from-bond-energies and Born-Haber cycle, "solid" / "gaseous" states (spans `solid`, `gas`) | the spans wrap 固态 and 气态 where the glossary has 固体 and 气体 | the state of the sample, as in ch01 (固态蜡, 液态水) (added by the merge) |

### ch07/7.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch07/7.6/text.html | bond-angles, "A bond distance (or bond length)" (two `bond-length` spans) | written 键长（或核间距）, the first span on 键长 and the second on 核间距 | the glossary renders both as 键长, so "键长（或键长）" would be meaningless; the alias 核间距 is the chapter's own (collision, translate.md 4.5, as 指数记数法 in ch01) |
| ch07/7.6/text.html | vsepr, structure-versus-geometry, repulsion-order, predicting, ex-co2-bcl3, "lone pairs of electrons" (a `lone-pair` span and an `electron` span, 5 places) | the `electron` span is nested in the `lone-pair` span: `<span lone-pair>孤<span electron>电子</span>对</span>` | 孤电子对 is one word that cannot be cut into two adjacent spans; both spans stay, in the source order (3) |
| ch07/7.6/text.html | vsepr "lone electron pairs", structure-versus-geometry "lone electron pairs", axial-equatorial "two lone electron pairs", and "electron pair geometry" (5 places) | the `electron` span wraps 电子 inside 孤电子对, 电子对, 成键电子对 and 电子对构型 (孤<span>电子</span>对, <span>电子</span>对构型) | the source spans the single word "electron" of a longer term whose glossary target is one word (3) |
| ch07/7.6/text.html | ex-ammonium, "ammonium nitrate and ammonium sulfate" (spans `nitrate`, `sulfate`) | the spans wrap the whole compound names 硝酸铵 and 硫酸铵; "the ammonium ion" is 铵根<span ion>离子</span> | Chinese names the salt in one word; the span cannot wrap only "nitrate" or "sulfate" (3, as in ch01) |
| ch07/7.6/text.html | ex-glycine, "amino acid" (span `acid`) | the span wraps 氨基酸 | Chinese names the amino acid in one word; the span cannot wrap only "acid" (3) |
| ch07/7.6/text.html | structure-versus-geometry, "natural gas" (span `gas`) | the span wraps 天然气 | as in ch01: the Chinese compound contains 气 inside it (3) |
| ch07/7.6/text.html | bond-dipole, "the Greek letter mu ($\kmu$)" | written 希腊字母 mu（$\kmu$）, "mu" kept in Latin letters | a sentence about the name of a symbol; the Chinese name 缪 is not used in textbooks (translate.md 4.3) |
| ch07/7.6/text.html | ex-shape-simulator and ex-polarity-simulator, the PhET interface words “Options”, “Name”, “electron geometry”, “molecular shape”, “Three Atoms”, “Electric Field” | rendered “选项”, “名称”, “电子几何构型”, “分子形状”, “三个原子”, “电场” | the reader is told which control to use; no official Chinese labels were fixed, so the plain words are used, as in ch01 1.4 (“将流体变为水”) |
| ch07/7.6/text.html | polar-properties, "the negative plate", "the positive plate", "two plates" (spans `ref`) | written 负极板, 正极板, 两块极板, with the referent labels 电场的负极板 / 电场的正极板 in section.json | Chinese names the plates of an electric field 极板 |
| ch07/7.6/section.json | cyl7 solution and e7 solution, "electron-group geometry", "electron geometry" | rendered 电子基团几何构型 and 电子几何构型, not 电子对构型 | the answer key uses these variants of the book's own term; they are kept literal and recorded as pending terms |
| ch07/7.6/figures.js | sim-vsepr, `lp` and the `F.morph` equation: `'one lone pair' : lone + ' lone pairs'`, `bond${bonds === 1 ? '' : 's'}`, `lone pair${lone === 1 ? '' : 's'}` | the branches collapse to one form: `'无孤电子对' : lone + ' 对孤电子对'`, `\text{个键}`, `\text{对孤电子对}` (1 and 2 or more are written as digits) | English plural grammar built in code (4.1) |
| ch07/7.6/figures.js | sim-vsepr topline | 'With N regions of electron density and LP, the electron-pair geometry is G and the molecular structure is S, as in E.' written '有 N 个电子密度区域、LP时，电子对构型为G，分子构型为S，例如 E。' | Chinese word order of the same sentence; the code around it is unchanged (4.1) |
| ch07/7.6/figures.js | sim-domains topline, `found` | 'G electron-pair geometry, S molecular structure' / 'a G arrangement' written '电子对构型为G、分子构型为S' / '排成G', the sentence '这 N 个区域已稳定下来，' + found + '，…' | Chinese word order; the article "a" has no Chinese form (4.1) |
| ch07/7.6/figures.js | sim-bond-moments topline | 'In the X molecule/bond …' and 'X is S, so its N bond moments …' written '在 X 分子/键中，…' and 'X 的分子构型是 S，所以它的 N 个键矩…', with a space after 是 when S starts with a Latin letter (V 形) | Chinese word order; the space follows the CJK–Latin spacing rule |
| ch07/7.6/figures.js | sim-bond-moments `MOLS[].structure` | 'bent, 104.5°' etc. written 'V 形,104.5°' with the ASCII comma kept | the code splits the string at ',' and shows only the part before it, so the separator is code, not prose |
| ch07/7.6/figures.js | `NAMES`, `nameOf`, sim-field hover names | `'a lone pair'` 孤电子对, `'hydrogen (H)'` 氢（H）, `a hydrogen atom, the δ+ end` 氢原子，δ+ 端; the articles are dropped | English articles have no Chinese form (4.1) |
| ch07/7.6/figures.js | sim-bond-moments row text | '`C–H: 2.5 and 2.1, a difference of 0.4`' written 'C–H：2.5 和 2.1，差值为 0.4' | Chinese word order (4.1) |
| ch07/7.6/figures.js | sim-polarity, `topline` of the diatomic branch | `'the ' + mol.name + ' molecule'` / `' bond'` rewritten `mol.name + (mol.whole ? ' 分子' : ' 键')`; the `a long / a moderate / a short` articles dropped (长 / 中等长度 / 短); `mol.structure` gets a space only before a Latin initial | English article grammar collapses to one Chinese form (4.1); space between CJK and Latin |
| ch07/7.6/figures.js | sim-polarity, readout `\text{bond}` subscript | written `\text{键}` | a subscript wants the shortest form (ch01 rule 4.7) |
| ch07/7.6/figures.js | sim-polarity-field, controls `\text{molecule}` / `\text{molecules}` | `\text{分子}` and `\text{分子数}` | English singular/plural pair of labels; the count control takes 分子数 |

### Chapter 7: Other things for the owner

- **Terms.** `glossary.zh-CN.json` has 239 rows: 150 the concept and heading rows the scaffold of the chapter already held, and 89 merged from the seven pages' pending files (91 pending rows; Titan was already a row, and the list of unglossed names "Elena Galpern, James Heath, Sean O’Brien, Yuan Liu" is not a term). None of the 239 sources is in the shared glossary or in another chapter's chapter glossary, except that the ch02 and ch18 disagree on `nitrous oxide` / `nitric oxide` and ch07 follows ch18 without a row (see the forced-scenario row of 7.3; review pass). The review pass then changed `silicone` and `geodesic dome` (checked on termonline) and added `resonance structure`, `unkeyed (exercise)` and `George Wheland` (chapter glossary now 240 rows). 155 rows carry `"confirm": "termonline"` (not looked up), 14 carry `"confirm": "owner"` (the chapter title and the six section titles, `electron geometry`, `electron-group geometry`, `electron group`, `bench`, `Advanced Placement`, `Educational Testing Service`). The pages' authority `textbook` was written `book`, the id of `authorities`.
- **Rows worth a second look.** 电子对构型 for electron-pair geometry (textbook usage is 价层电子对构型 or 电子对空间构型; the short form is kept), with the answer-key variants 电子几何构型 and 电子基团几何构型 kept literal; 键长（或核间距）, the alias 核间距 being the chapter's own; 共价化合物 for the span text "covalent compounds" (the earlier note read the source as "molecular compounds"; corrected in the review pass); 短程线穹顶 (geodesic dome; also 测地线穹顶); 电离势 (the book's word, 化学名词 has 电离能); 楔形线与虚线表示法 (no standard name); 跷跷板形 (变形四面体 is the alternative); 乔治·惠兰（George Wheland）, a transliteration with no standard rendering; 烟炱 for soot.
- **Slips of the book kept as printed** (root item 13): Example 7.8 is introduced as the "more likely structure for the nitrite anion", but it treats nitrous oxide, N₂O, so the text keeps 亚硝酸根阴离子 / 例 7.8; Table 7.4 of 7.5 is the Born-Haber table for CsF, while the book's description names NaCl (noted in the `notes` of 7.5); Example 7.5 speaks of "the six steps discussed previously" after a five-step procedure; the fullerene box prints "since prehistoric times, ." (kept) and `C₆₀.` / `SF₆.` with the period inside the subscript (not kept in the Chinese, where the period would land mid-sentence; review pass); the 7.3 `notes` field records the fullerene and "six steps" slips, the 7.5 `notes` field the CsF table.
- **Kept in English.** `Figure N.M`, `Sim` and the bare `Figure` eyebrows (translate.md 4.6; the prose citations are plain 图 N.M until the app links them); the names in credits (Wikimedia Commons, “Jurii”, “Petey21”, Bill Morrow, United States Department of Energy); the names Elena Galpern, James Heath, Sean O’Brien and Yuan Liu (7.3), which have no standard Chinese rendering; the English in parentheses after 乔治·惠兰, 教育考试服务中心 and 化学大学先修课程; the book label "Chemistry 2e" in `referents`; Buckminster Fuller is written 巴克敏斯特·富勒（R. Buckminster Fuller） (review pass); formulas and bond strings (`Hg-Hg`, `N-O`) as printed; and the formula-only solutions that `translation_parity.py` lists as `untranslated?` (7.1 cyl1 and cyl2, 7.4 cyl3 and e14, 7.5 e5), because they hold no word.
- **Kept literal from the PhET and the interactives.** The interface words of the PhET molecule-shape and molecular-polarity simulations (选项, 名称, 电子几何构型, 分子形状, 三个原子, 电场) have no official Chinese labels. In this chapter the two PhET "Link to Learning" boxes of 7.6 are replaced by the interactive figures 7.16 and 7.26/7.28, and the page calls them 演示台 (`bench`, owner-confirm row).
- **Merge edits to the pages.** `路易斯结构` without 式 (62 places, 7.3 text.html 22 and section.json 40, mostly in alt texts and solutions) became 路易斯结构式, the glossary form; `\text{bonds broken}` and `\text{bonds formed}` in three display equations of 7.5 text.html became `\text{断开的键}` and `\text{形成的键}`; the `Table 7.4` eyebrow of 7.5 became 表 7.4; the half-width letters (b)、(d)… in a 7.2 solution became full-width; the spoken `delta H` of a 7.5 alt text became 德尔塔 H.
- **Pending and scenario files** of the seven pages are deleted (the second merge, 2026-10-27, folded the files that the page agents had left again: 2 glossary rows were already in other chapter glossaries and are reused, the soccer-ball row and 3 figures.js rows of 7.6 were added); the rows are in `glossary.zh-CN.json` and `config.md`.
- **Humanizer review and `npm run dev` read-through** (translate.md 8.4) are outstanding for the owner.

- **Review pass (2026-10-27).** 33 findings applied except as the log records. Punctuation that the book printed inside `$…$` at the end of a formula (`,` `.` `:`, 16 places) is now written outside the math in Chinese (or dropped), which withdraws the former forced-scenario rows for `$…,$` and `.$`; group numbers are 第 N 族 on every page (the 7.5 row 16 族 / 2 族 is withdrawn); the amount is `1 摩尔` in prose and in the variable meanings; the exercise-notes wording is 标明为 OmniStax 自拟.

## Chapter 8 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/intro/text.html, ch08/8.1/text.html, ch08/8.2/text.html, ch08/8.3/text.html, ch08/8.4/text.html | figure and sim eyebrows | `Figure N.M`, `Sim`, the bare `Figure` of the photographs and the composite `Figure 8.3 + 8.4 + 8.5` style eyebrows (7 composites in 8.1 to 8.4) kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, section.json | figure citations in the prose, in the captions and in the notes | written 图 N.M, （图 8.22） | the app links only `Figure N.M` (translate.md 4.6); recorded once per book in ch01 |
| ch08/8.1/text.html, ch08/8.4/text.html | table eyebrows `Table 8.1` to `Table 8.3` | written 表 8.1 to 表 8.3; the box eyebrows `Portrait of a Chemist` and `How Sciences Interconnect` written 化学家小传 and 各门科学如何相互联系 | translate.md 5 lists a table's eyebrow as translated; the ch01 rule |
| ch08/intro/text.html, ch08/8.4/text.html | photo credits (2) | （来源：改编自 Jefferson Lab 的作品）, （来源：Walter Kohn 提供的图片）; names kept as printed | the ch01 credit formula ("modification of work by X" and a plain credit; "image courtesy of X" is a plain credit) |
| ch08/8.2/text.html, ch08/8.3/text.html, ch08/8.4/text.html | spans on compound names (硫酸铵, 硫酸根, 酸雨, 硫酸, 液氧) | each span wraps the whole Chinese compound that contains the concept's word (硫酸盐 / 硫酸, 酸, 液体); one row per page below | Chinese names the compound in one word; the span cannot wrap only the English-style part (ch01 rule, translate.md 3.3) |

### ch08/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/intro/text.html | `<span data-concept="valence-shell">valence shell</span> <span data-concept="electron">electron</span> pair repulsion (VSEPR) <span data-concept="scientific-theory">theory</span>` | written 价层电子对互斥理论（VSEPR） with the spans on 价层, 电子, 理论 (the form of the ch07 row `valence shell electron-pair repulsion theory (VSEPR)`); 对互斥 and （VSEPR） stay outside | Chinese puts the acronym after the whole term; the span words are split by the fixed term 价层电子对互斥理论 (review pass: 理论 moved before the acronym) |
| ch08/intro/text.html | `<span data-concept="liquid">liquid</span> nitrogen` and `liquid oxygen` | written `<span data-concept="liquid">液氮</span>` and `<span data-concept="liquid">液氧</span>`, the span on the whole compound | the span wraps the whole Chinese compound containing the concept word (same rule as the compound-name row above, and as 液氧 in 8.4 #paramagnetism); 液体氮 / 液体氧 was dropped in the review pass because the ch08 rows `liquid nitrogen` and `liquid oxygen` are 液氮 and 液氧 and the captions say so |
| ch08/intro/text.html | `orbital <span data-concept="hybridization">hybridization</span>` | written 轨道杂化 with the span on 杂化 | glossary term of the concept is 杂化 |
| ch08/intro/text.html | `<em>s, p,</em> and <em>d</em>` | written `<em>s、p</em> 和 <em>d</em>` | Chinese list punctuation |
| ch08/intro/figures.js | `N₂`, `O₂` labels | unchanged | formulas, nothing to translate |

### ch08/8.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.1/text.html (#sigma-pi), section.json (sim-overlap original_caption) | `<strong><span data-concept="sigma-bond">sigma bonds</span> (σ bonds)</strong>`, `<span data-concept="pi-bond">pi bond (π bond)</span>`, "Sigma (σ) bonds", "Pi (π) bonds" | written `<strong><span data-concept="sigma-bond">σ 键</span>（英文 sigma bonds）</strong>`, `<span data-concept="pi-bond">π 键（英文 pi bond）</span>`, and in the sim-overlap original_caption plain `σ 键`, `π 键` (review pass: the English letter name is kept only in the two bold definitions); the strong and the span stay where the source has them | the source spells the English name of the Greek letter and then gives the symbol; the glossary renders both as σ 键 / π 键, so "σ 键（σ 键）" would say nothing; the English name is kept in parentheses (translate.md 4.3, 4.5; same device as ch01/1.5 significant figures) |
| ch08/8.1/text.html (#bond-distance, #valence-bond, #sigma-pi) | spans on "the energy of the system", "the sum of the energies", "the bond distance of 74 pm", "a force we define as a covalent bond", "the attractive and repulsive forces" | the inner spans change order or sit on the head word: `<span>体系</span>的<span>能量</span>`, `吸引和排斥的<span>力</span>`, `吸引<span>力</span>` | Chinese puts the possessor before the noun; "attractive and repulsive forces" is one span in the source and 吸引力和排斥力 would put the span on a bound 力 (word order, translate.md 3.3); spans stay in their blocks |
| ch08/8.1/text.html (#valence-bond) | `<span data-concept="hybridization">hybridization</span>` | span wraps 杂化 (glossary row hybridization, ch18 杂化轨道) | the concept name is 原子轨道的杂化; the prose word is 杂化 |
| ch08/8.1/text.html (#valence-bond, #sigma-pi) | "VSEPR theory" (span `scientific-theory` on "theory") | 价层电子对互斥<span>理论</span>, the span on 理论 only | the span wraps the word that names the concept; the glossary row VSEPR theory is the whole compound |
| ch08/8.1/text.html (#bond-distance) | Table 8.1 head "Length (pm)" and "Energy (kJ/mol)"; "A comparison of some bond lengths and energies" | 键长 and 能量 (not 键能): the spans are `bond-length` and `energy-and-work`, kept as the source tags them | the spans name the concepts of the source; 键能 would be the `bond-energy` span; the unit in a table head or axis label is in full-width parentheses 键长（pm）, 能量（kJ/mol）, 核间距（pm）, 能量（10⁻¹⁹ J）, as the heads of ch01 to ch07 (review pass) |
| ch08/8.1/figures.js | `f.orb`, hover names `the nucleus of a ${NAME[who]} atom` | `${NAME[who]}原子的 … 轨道`, `${NAME[t.who]}原子的原子核`; `NAME` values 氢, 氯, 碳; articles dropped | English "the … orbital of a … atom" built by concatenation; Chinese word order and no article (translate.md 4.1) |
| ch08/8.1/figures.js | sim-morse hover name, headline strings | `'a hydrogen atom, its nucleus the dot'` as `氢原子，圆点为其原子核`; `'At ' + r + ' pm …'` as `'在 ' + r + ' pm 处，…'` with the same slots | English sentence frames rewritten in Chinese word order, code shape and slots kept (translate.md 4.1) |
| ch08/8.1/figures.js | `STATES[].label` 'p + p end to end', 'p + p at an angle', 'p + p side by side' | `p + p 头碰头`, `p + p 成一定角度`, `p + p 肩并肩`; `\text{one }\sigma\text{ bond}` as `\text{一个 }\sigma\text{ 键}` | words of option labels and `\text{}` are translated; "one" carries the article of the source |
| ch08/8.1/text.html (#sigma-pi, sim-overlap head), 8.1/figures.js, 8.4/text.html (sim-mo-shapes head) | "Along the axis itself, there is a node, that is, a plane with no probability of finding an electron"; figures.js "the node, a plane through the internuclear axis"; "the faint planes are nodes" | 沿轴本身有一个<strong><span data-concept="node">节面</span></strong>，即电子出现概率为零的平面; 节面，一个通过核间轴的平面; 淡色的平面是节面 | where the source calls the node a plane the word is 节面 (the ch08 row `nodal plane`), since 节点 is a point in Chinese; the `node` span therefore holds 节面 (recorded exception to the span-holds-target rule); elsewhere the source word node stays 节点 (review pass) |

### ch08/8.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.2/text.html (#sp, #sp3, #sp3d) | `<span data-concept="lone-pair">lone pairs</span> of <span data-concept="electron">electrons</span>` (4 places) | written `<span data-concept="lone-pair">孤<span data-concept="electron">电子</span>对</span>`, the electron span nested inside the lone-pair span | 孤电子对 already contains 电子, so the two spans cannot sit side by side; same device as ch07 |
| ch08/8.2/text.html (#sp, section.json sim-sp original_caption) | `To accommodate these two <span data-concept="electron">electron</span> domains`, "consistent with the geometry for two domains" | written 这两个<span data-concept="electron">电子</span>域, 两个电子域 | the span wraps 电子 of 电子域 (pending term); the source's "domain" is the region of electron density, 电子密度区域, elsewhere on the page |
| ch08/8.2/text.html (#sp2) | `orbital <span data-concept="energy-and-work">energy</span> level diagram` | written 表示轨道<span data-concept="energy-and-work">能量</span>的能级图 | 能级图 is one word, so the span cannot wrap its 能; the span moves to the 能量 of the clause, in the same block |
| ch08/8.2/text.html (#examples, #sp3d) | `<span data-concept="sulfate">sulfate</span>` in "Ammonium sulfate" and "the sulfate ion" | span wraps 硫酸铵 and 硫酸根 (followed by the `ion` span on 离子) | Chinese names the compound in one word and the anion 硫酸根; the span cannot wrap only "sulfate" (as in ch01) |
| ch08/8.2/text.html (#sp3d) | `${\text{ClF}}_{4}{}^{\text{+}}.$`, `${\text{PCl}}_{6}{}^{\text{−}},$`, `${\text{IF}}_{6}{}^{\text{+}},$`, `${\text{ICl}}_{4}{}^{\text{−}},$` | the sentence punctuation inside the `$…$` is moved out: `${\text{ClF}}_{4}{}^{\text{+}}$ 中`, `${\text{IF}}_{6}{}^{\text{+}}$、IF₅、…` | the comma or period belongs to the English sentence; inside the TeX it would print after the ion in the Chinese sentence |
| ch08/8.2/text.html (#sp3), section.json summary_html | "a sigma (σ) bond", "sigma (σ) bonds", "Pi (π) bonds" | written σ 键, π 键 without the English letter name | the English name of the Greek letter is kept only in the two bold definitions of 8.1 #sigma-pi; in running sentences σ 键 / π 键 stands alone as in Chinese textbooks (review pass; translate.md 4.3) |
| ch08/8.2/text.html, section.json | "the" in `<span data-type="angle">the <span data-concept="bond-angle">bond angle</span></span>`; articles before spans | dropped; the spans wrap 键角 alone | English article, no Chinese form (translate.md 4.1) |
| ch08/8.2/text.html (#water-problem) | `linear combination of atomic orbitals, LCAO, (a technique that we will encounter again later)` | written 通过<em>原子轨道线性组合</em>（LCAO，我们以后还会遇到的一种方法）来实现, the parenthesis moved after the term | Chinese word order of "is mathematically accomplished by …"; the em and span stay on the term |
| ch08/8.2/figures.js | `WORDS = { 2: 'Two', … }` and the three templates that use it (sim-sp3d headline, `${m.name}: … regions of electron density`, sim-hybrid-sets headline) | `WORDS` holds 两/三/四/五/六 and each template carries 个: `${WORDS[i]}个电子密度区域：…`; the headlines are rewritten in Chinese word order with the same slots | English "Three regions of electron density: a trigonal planar arrangement of sp² hybrid orbitals, 120° apart." cannot keep its slot order; numeral and measure word (4.1) |
| ch08/8.2/figures.js | `NAMES` values and `NAMES[m.c].split(' ')[0]` | values written 氢（H）, 氯（Cl） … with full-width parentheses as in ch07; the code `.split(' ')[0]` becomes `.split('（')[0]` to take the element name | the hover names follow ch07's form; the one-token code change keeps the "of phosphorus" slot working |
| ch08/8.2/figures.js | hover names `an ${HYB_NAME[n]} hybrid orbital`, `the valence s orbital`, `a valence p orbital (p${AXN[i]})`, `an sp³ orbital of carbon …`, `an ${hy} hybrid orbital of ${…}` (9 places) | articles dropped: `${HYB_NAME[n]} 杂化轨道`, `价层 p 轨道（p${AXN[i]}）`, `${元素}的 ${hy} 杂化轨道` | English article and "of" genitive built by concatenation (4.1) |
| ch08/8.2/figures.js | `ANGLES[5]` `'90° and 120°'`, `ARRANGE` | written `90° 和 120°`; `ARRANGE` holds the shape names (直线形 … 八面体形) and the templates add 呈…排列 | the array feeds "a ${ARRANGE[i]} arrangement" in the headline and `\text{${ARRANGE[i]}}` in the readout (4.1) |
| ch08/8.2/section.json | e5 answer.solution | the book's unclosed parenthesis kept: `T 形（A 上有两对孤电子对 …，或（A 上有三对孤电子对）…` | exercise_notes says the key keeps it; "nothing improved" (translate.md 3.2) |
| ch08/8.2/text.html, section.json, figures.js | valence orbital (rows `valence orbital`, ch18 价轨道) | written 价轨道; the pending row 价层轨道 of the page agent was not used. The modifier forms stay 价层 s 轨道 and 价层 p 轨道 ("the valence s orbital", figures.js hover names) | one target for one source across the book: ch18 already holds 价轨道 (化学名词) and `book-rows.json` writes the hybridization statement with it; 价层 is the shared row valence shell |
| ch08/8.2/section.json | exercise e11 (the strike-anywhere match) | written 擦燃火柴 (the page agent had 随处可擦火柴) | reuse of ch18 row `strike-anywhere match` |

### ch08/8.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.3/text.html | #resonance-hybridization, "lone pairs of electrons" and #resonance-hybridization Example 8.4, "one lone pair of electrons" (spans `lone-pair` and `electron`) | written 孤<span electron>电子</span>对 inside the `lone-pair` span (nested spans, as in ch01 to ch07) | 孤电子对 is one word that holds 电子; the source has a span on "lone pairs" and another on "electrons" (translate.md 3.3) |
| ch08/8.3/text.html | #hybrids-and-p, sim-multiple-bonds sim-head, "cosine of <span data-type="angle">the twist</span>" | span wraps 扭转角 | "the twist" is the twist angle; Chinese needs 角 to carry a cosine (扭转的余弦 does not read) |
| ch08/8.3/text.html | #hybrids-and-p, the first paragraph, "single <span covalent-bond>covalent bonds</span>" and "double and <span triple-bond>triple bonds</span>" | 单<span>共价键</span>; 双键和<span>三键</span> | 单 and 双 are bound to the word they qualify; the span stays on the glossary word |
| ch08/8.3/text.html | #resonance-hybridization, "(See the next module.)" | written （参见下一节。） | "module" is the book's word for a section (module m68747 is 8.4) |
| ch08/8.3/text.html | Example 8.4, "Some <span acid>acid</span> rain" and "sulfuric <span acid>acid</span>" | span wraps 酸雨 and 硫酸 | Chinese names each in one word (same as ch01 1.3 and ch14) |
| ch08/8.3/section.json | e8 solution (b) "as in Example 8.4" | written 如例 8.4 所示 | cross reference to the example heading, which is 例 8.4 |
| ch08/8.3/figures.js | sim-hybrid-levels, `WORD`, topline | `WORD = ['', 'one', 'two', 'three']` becomes `['', '一', '两', '三']`; `unhybridized p orbital${st.hyb === 3 ? '' : 's'}` collapses to one form; template rewritten with measure word 个: `在 ${st.name} 杂化的碳原子中，${WORD[st.hyb]}个 ${st.name} 杂化轨道和${WORD[4 - st.hyb]}个未杂化的 p 轨道各容纳一个电子。` | English plural branch and number words in figure code (4.1); Chinese needs the measure word 个 |
| ch08/8.3/figures.js | sim-hybrid-levels, label `Orbitals in the ${s.name} hybridized C atom in ${s.mol}` | `${s.mol} 中 ${s.name} 杂化 C 原子的轨道` (the two slots swap places) | English "in the X hybridized C atom in M" cannot keep the slot order in Chinese |
| ch08/8.3/figures.js | sim-multiple-bonds, pickable names `'one π bond'`, `'the second π bond'`, `'the π bond, above the plane'` | 一个 π 键, 第二个 π 键, π 键，位于平面上方 (articles dropped) | English article grammar collapses to one Chinese form (4.1) |
| ch08/8.3/figures.js | sim-multiple-bonds, `'unhybridized 2p orbital, one phase'` / `'the other phase'`, legend `p orbital, one phase` | 一个相位 / 另一个相位 | "phase" of a wave is 相位 (the glossary 相 is the phase of matter); the article is dropped |
| ch08/8.3/figures.js | sim-multiple-bonds, `aria: 'twist of one CH2 group about the C–C axis'` | 一个 CH2 基团绕 C–C 轴的扭转 | the noun twist is 扭转; no angle is added in the aria |
| ch08/8.3/section.json | exercises[cyl1].answer.solution | `<em>sp</em><sup>2</sup>` as printed | a pure formula answer with no prose; `translation_parity.py` lists it as untranslated, nothing to translate (as the pure-math solutions of ch01 1.5 and 1.6) |

### ch08/8.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch08/8.4/text.html | #paramagnetism, "pour <span liquid>liquid</span> oxygen" | span wraps 液氧 | 液氧 is one word that holds 液; the source spans the adjective liquid (same pattern as 天然气 in ch01) |
| ch08/8.4/text.html | #mo-diagram, "The relative <span energy>energy</span> levels of atomic and ..."; #allowed levels in the Band Theory box ("The allowed <span energy>energy</span> levels"); Example 8.6 "a molecular orbital <span energy>energy</span> diagram"; #diatomic "a <span MO>molecular orbital</span> <span energy>energy</span> diagram" | span wraps 能级 (and 分子轨道<span>能级</span>图 in the two diagram phrases) | Chinese names energy level and energy-level diagram with 能级, which does not contain the glossary word 能量 (translate.md 3.3, the span stays in its block) |
| ch08/8.4/text.html | #diatomic, the equations `{\text{bond order in H}}_{2}` and `{\text{bond order in He}}_{2}` | written `{\text{H}}_{2}\text{ 的键级}` and `{\text{He}}_{2}\text{ 的键级}` | Chinese puts the formula before 的键级; the LaTeX outside \text{} is unchanged |
| ch08/8.4/text.html | #mo-diagram, "(such as ${\text{Be}}_{2}{}^{\text{+}})$" | the opening bracket written as ASCII `(` (not full-width) | the closing bracket is inside the math and cannot move; a full-width opening bracket would not match it |
| ch08/8.4/text.html | Example 8.7, "Give the molecular orbital configuration for the valence electrons in ${\text{C}}_{2}{}^{\text{2−}}.$ Will this ion be stable?" | written 给出 ${\text{C}}_{2}{}^{\text{2−}}$ 中价电子的分子轨道构型。这个离子会稳定吗？ | the sentence mark is moved out of the math and written in Chinese, the chapter rule below (review pass) |
| ch08/8.4/text.html, section.json | `(read as "sigma-s")`, `"sigma-s-star"`, `"sigma-p-x"`, `"sigma-p-x star"`; "Sigma (σ) and sigma-star (σ*)" in the Figure 8.29 caption | 读作“西格玛-s”, “西格玛-s-星”, “西格玛-p-x”, “西格玛-p-x 星”; 西格玛（σ）和西格玛星（σ*） | the English spoken names of the symbols; the Greek letter name is rendered 西格玛 and the sentence kept (translate.md 4.3) |
| ch08/8.4/text.html | Portrait of a Chemist, "the Kindertransport program" and "Polaroid" | written “儿童撤离行动”（Kindertransport）项目 and 宝丽来（Polaroid） with the original in full-width brackets | German word and a company name for which the Chinese is a description or transliteration; the original is kept so the reader can find it (translate.md 4.3) |
| ch08/8.4/text.html | "Walter Kohn", "John Pople", "Kohn" | names kept in Latin letters | no standard rendering looked up (translate.md 2.7) |
| ch08/8.4/text.html | "period 2" (#second-period), "first- and second-row" (objective 4 of section.json) | 第 2 周期; 第一周期和第二周期 | the book's "row" is the period; 周期 is the glossary word and carries the span |
| ch08/8.4/figures.js | sim-mo-fill `hits` names: `'the ' + l.id + ' atomic orbital' + (l.deg > 1 ? 's' : '') + ' of one ' + X + ' atom'` and the "other" twin | `'一个 ' + X + ' 原子的 ' + l.id + ' 原子轨道'` and `'另一个 ' + X + ' 原子的 ' + l.id + ' 原子轨道'` | plural branch and articles collapse to one form (4.1); the Chinese puts the atom before the orbital, the code shape is kept |
| ch08/8.4/figures.js | sim-mo-fill `hits` name `'the ' + name + ' ' + (anti ? 'antibonding' : 'bonding') + ' molecular orbital'` | `name + ' ' + (anti ? '反键' : '成键') + '分子轨道'` | article dropped (4.1) |
| ch08/8.4/figures.js | sim-period2 `hits` name `'the ' + nm + ' orbital' + (deg > 1 ? 's' : '') + ' of ' + X + '₂'` | `X + '₂ 的 ' + nm + ' 轨道'` | plural branch collapses; the owner phrase goes first in Chinese (4.1) |
| ch08/8.4/figures.js | sim-mo-shapes `nm = 'the ' + name + ' molecular orbital'` and its `', one phase'`, `', the other phase'`, `', an outer lobe'` etc. | `name + ' 分子轨道'`, `'，一种相位'`, `'，另一种相位'`, `'，一个外侧的瓣'` | articles dropped (4.1); "phase" of a wave is 相位 (the glossary 相 is the phase of matter), as in 8.3 |
| ch08/8.4/figures.js | sim-mo-shapes `'The orbital has ' + I.nodes + '.'` | `'该轨道' + I.nodes + '。'` with the nodes phrases written to follow 该轨道 (在两核之间没有节点, 有一个包含核间轴的节点 ...) | English "no node / one node" noun phrases need a Chinese verb phrase after the subject |
| ch08/8.4/figures.js | sim-mo-fill readout `\text{bond order of } \text{X}_2^q = ...` | `\text{X}_2^q\text{ 的键级} = ...` | the formula goes before 的键级 in Chinese |
| ch08/8.4/figures.js | sim-mo-fill readout small line (`All the valence electrons are paired, so ` ... ` is paramagnetic` ... `, and with a bond order of zero it is not stable.`) | `所有价电子都已成对，所以 ` + name + ` 是顺磁性的` ... `，且键级为零，所以它不稳定。`; the three branches (zero, one, n unpaired) are kept and the n branch is written `'有 ' + unp + ' 个电子未成对，所以 '` | English subject-verb agreement is not needed; the measure word 个 is |
| ch08/8.4/figures.js | sim-mo-fill headline `name + ' has the valence configuration ' + conf + '.'` | `name + ' 的价电子构型为 ' + conf + '。'` | word order |
| ch08/8.4/figures.js | sim-bands `NAME = { ins: 'an insulator', semi: 'a semiconductor', cond: 'a conductor' }` | `绝缘体`, `半导体`, `导体` | English articles collapse (4.1) |
| ch08/8.4/figures.js | sim-bands headline `'In ' + NAME + ' the band gap is ' + ...` | `'在' + NAME + '中，带隙' + (大 / 适中 / 很小) + '。'` | word order |
| ch08/8.4/figures.js | sim-bands readout `N/2 \text{bonding (filled)}`, `N/2 \text{antibonding (empty)}` | `N/2 \text{个成键轨道（填满）}`, `N/2 \text{个反键轨道（空）}` | the Chinese measure word 个 and the noun 轨道 are needed after a number; the source leaves the noun implicit |
| ch08/8.4/figures.js | sim-waves headline third branch `'At a phase difference of ' + P.v + '°, the sum has ' + a + ' times the amplitude of either wave.'` | `'相位差为 ' + P.v + '° 时，和的振幅是任一波振幅的 ' + a + ' 倍。'` | word order |
| ch08/8.4/figures.js | sim-gouy `options` labels `'off'`, `'on'` | `'关'`, `'开'` | one-character state words for the electromagnet toggle |
| ch08/8.4/figures.js | sim-mo-fill / sim-spmix canvas labels `3p_{x} and 3p_{y}`, `(a)`, `σp meets πp` | `3p_{x} 与 3p_{y}`, `（a）`, `σp 与 πp 相遇` | full-width part labels as in prose |
| ch08/8.4/section.json | e9 solution, "Each ion has twice the valence electrons of one atom less two for the 2+ charge" | written 每个离子的价电子数是一个原子价电子数的两倍，再减去 2+ 电荷所对应的两个电子 | the source clause has no verb in English "less two"; Chinese needs the object stated |
| ch08/8.4/section.json | e14 solution, "so atoms in the 2s orbital are closer to the nucleus" | 2s 轨道中的原子, as printed | an error of the book (it means electrons) is kept (translate.md 3.2) |
| ch08/8.4/text.html | #second-period, `<span data-concept="electrically-neutral">neutral</span> <span data-concept="molecule">molecule</span>` (Example 8.6 step) | the span wraps 中性 of 中性分子, not the concept's 电中性 | Chinese says 中性分子 where English says "the neutral molecule"; 电中性分子 would put an added 电 into the sentence (translate.md 3.3, the span stays in its block) |
| ch08/8.3/text.html, 8.3/section.json, 8.4/text.html, 8.4/section.json | a sentence mark (comma, period) printed inside `$…$` before the next Chinese words | the mark is moved out of the math and written in Chinese (，、。), as 8.2 does: `$\text{H−C≡C−H}$ 中`, `${\sigma}_{px}^{*}$、π…`, `…^{1}$。通常…` | one chapter rule for the 12 places found in the review pass; formulas ending a list inside a solution formula line (8.2 e14) are left as printed |
| ch08/8.2/section.json | e12 answer image alt, "a chlorate atom single bonded to two oxygen atoms" | 一个氯原子与两个氧原子 | a slip of the source alt text ("chlorate atom" is not an entity; it describes the Cl of ClO₃⁻) corrected in the alt text only (review pass) |
| ch08/8.4/text.html | #mo-theory, `<span data-concept="molecular-structure">molecular structure</span>` | 分子构型 kept | the shared ch07 row `Molecular structure` = 分子构型 binds; the review proposal 分子结构 for this sentence was declined (review pass) |

### Chapter 8: Owner notes

| File | Item | Note |
|---|---|---|
| `glossary.zh-CN.json` | unverified terms | 101 of the 114 rows carry `"confirm": "termonline"` (84, not looked up at termonline.cn) or `"confirm": "owner"` (17, the chapter and section titles and book-worded rows); 13 have none. 硼烷, 自由原子, 波峰 and 波谷 are reused from the ch18, ch07 and ch6 and are not repeated here. |
| `glossary.zh-CN.json` | `valence orbital` | not a row of this chapter glossary: the page agent's 价层轨道 was replaced by ch18's 价轨道 (化学名词) on 8.2 and 8.4 (about 12 places); the modifier forms 价层 s 轨道 / 价层 p 轨道 stay. If ch18 later changes the term, ch08 follows it. |
| `glossary.zh-CN.json` | `strike-anywhere match` | ch18's 擦燃火柴 replaced the 8.2 agent's 随处可擦火柴 (exercise e11); no standard entry was found for either; owner to confirm. |
| `glossary.zh-CN.json` | `electron domain` | 电子域 (the book's own word "domain" in two captions) next to 电子密度区域 for "region of electron density"; the two are one idea in the source and both are kept as the source words them. |
| `glossary.zh-CN.json` | `trough (of a wave)` | 波谷 as in ch6; the shared row `trough` is 水槽 (a film-balance trough); the two are different sources. |
| ch08/8.1/text.html | σ 键（英文 sigma bonds）, π 键（英文 pi bond） | the English name of the Greek letter is kept in a Chinese parenthesis only at the two bold definitions; elsewhere σ 键 / π 键 (review pass). |
| ch08/8.1/text.html | node in the sigma-bond paragraph | 节面 where the sentence says "a plane" (review pass); the rest of the chapter keeps 节点. |
| ch08/8.2/section.json | e5 answer.solution | the key's unclosed parenthesis is kept. |
| ch08/8.3/section.json | exercises[cyl1].answer.solution | pure formula, no translation; `translation_parity.py` lists it. |
| ch08/8.4/section.json | e14 solution | "atoms in the 2s orbital are closer to the nucleus" is the book's slip for electrons; kept. |
| ch08/8.4/text.html | 西格玛 readings | the spoken names 西格玛-s, 西格玛-p-x 星 are given as the source spells them; owner may prefer to drop them. |
| ch08/8.4/text.html | Portrait of a Chemist | the German word Kindertransport and the company name Polaroid are kept in full-width brackets beside the Chinese; names Walter Kohn and John Pople in Latin letters. |
| ch08/8.4/figures.js | `parity` lines | six `translation_parity.py` lines list the figure code whose English concatenations were rewritten in Chinese word order (recorded rows above). |
| ch08/8.4/text.html | English left on purpose | the eyebrows `Figure N.M` and `Sim`, the acronyms VSEPR, LCAO, the formulas and units, the names above. |

## Chapter 9 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows (`Figure 9.1` to `Figure 9.36`, `Sim`) | kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, ch09/9.4/section.json, ch09/9.5/section.json | figure citations in the prose and in `original_caption` | written 图 N.M, （图 N.M） | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch09/9.1/text.html, ch09/9.3/text.html, ch09/9.6/text.html | table eyebrows `Table 9.1`, `Table 9.2`, `Table 9.3` and their citations | written 表 9.1, 表 9.2, 表 9.3 | the ch01 decision (translate.md 5 lists a table's eyebrow as translated) |
| ch09/9.1/text.html, ch09/9.2/text.html, ch09/9.3/text.html, ch09/9.4/text.html, ch09/9.4/section.json | photo credits (5: Master Sgt. Jeffrey Allen with lettered parts, Mark Goodchild, Mark Ott, National Oceanic and Atmospheric Administration, Paul Flowers) | （来源 a：改编自 Master Sgt. Jeffrey Allen 的作品）, （来源：改编自 Mark Goodchild 的作品）, （来源：改编自 Mark Ott 的作品）, （来源：National Oceanic and Atmospheric Administration） (9.4 section.json) and （来源：改编自 National Oceanic and Atmospheric Administration 的作品） (9.1 Figure 9.7, a modification of work), （来源：改编自 Paul Flowers 的作品）; names kept | the book's credit formula of ch01 (names and organisations as printed) |
| ch09/9.1/text.html, 9.2, 9.3, 9.5, 9.6 (inline math) | an inline `$…$` span that ends in `,` or `.` and runs into a Chinese clause (9.1 #pressure; 9.2 #amontons, #charles; 9.3 Example 9.13, #avogadro-revisited; 9.5 section.json exercise; 9.6 #van-der-waals) | the LaTeX is kept byte for byte, punctuation inside the `$…$` included | the source prints that punctuation inside the math; moving it out would change the LaTeX (translate.md 5), so it stays (review pass, finding 29) |
| ch09/9.1/text.html, 9.2, 9.3, 9.4, 9.6 | first mention of a person in the prose: Torricelli, Amontons, Gay-Lussac, Charles, Boyle, Avogadro, Lavoisier, Lagrange, Marie-Anne Paulze Lavoisier, Susan Solomon, Graham, van der Waals | the standard Chinese rendering with the original once in parentheses at the first mention in the chapter | the ch01 formula for names (约翰·道尔顿（John Dalton）); the later mentions stay Chinese only |

### ch09/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/intro/text.html | `buoyant <span data-concept="force">force</span>` (figure 9.1 caption) | 浮<span data-concept="force">力</span>: the span wraps 力 only, after 浮 | Chinese names "buoyant force" as one word 浮力; the span stays on the concept's word 力 (glossary 力) |
| ch09/intro/text.html | `<span data-concept="gas">gas</span> <span data-concept="temperature">temperature</span>` (3rd paragraph) | 气体温度 written as adjacent spans 气体 and 温度 | Chinese compound of the two concept words, each span kept |
| ch09/intro/text.html | `amount` (3rd paragraph) | written 物质的量 | amount of substance in mol (ch01 decision), the source word carries no span |
| ch09/intro/text.html | `Figure 9.1` in the prose | written 图 9.1 | per-book scenario (translate.md 4.6) |

### ch09/9.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.1/text.html | #blood-pressure, `blood <span gas-pressure>pressure</span>`, `systolic <span>pressure</span>`, `diastolic <span>pressure</span>` (and Figure 9.6 caption) | the span wraps the whole compound 血压, 收缩压, 舒张压 | Chinese names each in one word; the span cannot wrap only the 压 (translate.md 3) |
| ch09/9.1/text.html | #atmosphere, Figure 9.7 caption, `high (H) and low (L) <span>pressure</span>` | written 高压（H）区和<span>低压</span>（L）区, the one span on the whole word 低压 | the meteorological names 高压 and 低压 (glossary rows `high pressure`, `low pressure`); the span cannot wrap only 压 of a bound word, and the span count stays one |
| ch09/9.1/text.html, ch09/9.1/section.json | part lists `(a) torr … (c) kPa`, `(a) torr … (c) bar` (Examples 9.1 and 9.3, exercises 3 and 13), the relation `1 bar = 100,000 Pa` | the unit symbols torr and bar kept inside the concept spans (`torr`, `bar-unit`), beside Pa, atm, kPa | a symbol is printed as in the source; the name 托 / 巴 stays in running prose (review pass) |
| ch09/9.1/section.json | exercises[14] solution, `P<sub>gas</sub> = P<sub>atm</sub> + P<sub>vol liquid</sub>`; ch09/9.3/text.html #dalton, `P<sub>Total</sub>`, `n<sub>Total</sub>` | written P<sub>气体</sub>, P<sub>易挥发液体</sub> (P<sub>atm</sub> kept), P<sub>总</sub>, n<sub>总</sub> | an English word inside a subscript is reader-visible (as `\kMM_{\text{未知}}` in 9.4); atm is a unit symbol (review pass) |
| ch09/9.1/text.html | #pressure, sim-head of Figure 9.2, "lowers it" | the second `pressure` span of "raises the pressure, … lowers it" is not repeated: 则会使其降低 | the source has one span for the two clauses; Chinese needs no second noun |
| ch09/9.1/text.html | #pressure, "7 tons" | written 7 短吨 | the text works it out as 14,000 lb; ch01's short ton (4.4) |
| ch09/9.1/text.html | #pressure, "1.5 ft", "120 lbs", "14.7 pounds", "30 feet" (caption), "10 meters" | written 1.5 英尺, 120 磅, 14.7 磅, 30 英尺, 10 米 | unit without a symbol in prose takes the target name (4.4); lb/in², in², ft in formulas kept |
| ch09/9.1/text.html | #pressure, the three equations | the count nouns in `\text{}` (elephant, foot, feet, skater, blade) written 头象, 只脚, 名运动员, 把冰刀 with their measure words | Chinese counts need a measure word (4.1) |
| ch09/9.1/text.html | #barometer, `ρ (lowercase Greek letter rho)` | written ρ（小写希腊字母 rho）, the letter's English name kept | a sentence about the name of a letter (4.3) |
| ch09/9.1/text.html | #blood-pressure, `Greek <em>sphygmos</em> = “pulse”` | written 希腊语 <em>sphygmos</em> = “脉搏”, the Greek word kept in Latin letters | origin of a word (4.3) |
| ch09/9.1/text.html | #barometer, Figure 9.4 sim-head, "13.6 times as short" | written 汞柱的高度只有水柱的 1/13.6 | "N times as short" is not Chinese; same meaning (4.1) |
| ch09/9.1/text.html | #units, last sentence of the opening paragraph | the source has no final full stop; 。 added | a Chinese sentence needs its closing mark |
| ch09/9.1/text.html, ch09/9.1/section.json | `to the right` in Examples 9.3 and 9.4 | written 如右图所示 | translated for meaning |
| ch09/9.1/figures.js | Figure 9.2, `topline` | `'A load of ' + f + ' lb on a ' + a + ' in² ' + NAME + ' presses with …'` becomes `f + ' lb 的载荷压在 ' + a + ' in² 的' + NAME + '上，压强 …'`, the same slots in the same order | English frame cannot carry the slots (4.1) |
| ch09/9.1/figures.js | Figure 9.4, `topline` | `'An atmospheric pressure of ' + p + ' kPa holds up …'` becomes `p + ' kPa 的大气压强可支撑 …'`, same slots | same |
| ch09/9.1/figures.js | Figure 9.5, `topline`, third branch | `'The mercury stands ' + h + ' mm higher in ' + side + ', so the gas is ' + h + ' torr ' + above/below + ' the atmosphere.'` becomes `'汞在' + side + '中高出 ' + h + ' mm，所以气体比大气' + 高/低 + ' ' + h + ' torr。'`; the two `h` slots swap places | Chinese word order differs; the branch `above/below` kept as 高/低 (4.1) |
| ch09/9.1/figures.js | Figure 9.5, `side` | 'the far arm' / 'the gas arm' written 远端一臂 / 气体一臂 | articles dropped (4.1) |
| ch09/9.1/figures.js | Figure 9.2, detent and hover names | 'thumbnail', 'bare foot', 'skater', 'air', 'ice' written 拇指指甲盖, 光脚, 运动员 / 滑冰运动员, 空气, 冰面 | articles and plural grammar collapse (4.1) |
| ch09/9.1/section.json | exercises e2, e8 solutions (`generated_by: ai`) | translated with the LaTeX macros kept | AI-written solutions are translated like the rest (5) |
| ch09/9.1/section.json | exercises cyl1, e4, e5 `answer.solution` | `0.974 atm; 740 mm Hg; 98.7 kPa; 0.987 bar`, `0.809 atm; 82.0 kPa`, `2.2 $\times$ 10<sup>2</sup> kPa` kept | pure numbers and unit symbols; no word to translate |
| ch09/9.1/text.html | #manometer, `the <span liquid>liquid</span> levels in the two arms` (2 places) | the span wraps 液面 in 管子两臂中液面之间的距离 | Chinese names the liquid level in one word; the span cannot wrap only 液 (translate.md 3.3) |

### ch09/9.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.2/text.html | #amontons, `a <span gas-pressure>pressure</span> gauge`; sim-boyle sim-head, `a <span gas-pressure>pressure</span> gauge` | the span wraps the whole compound 压力计 | Chinese names the instrument in one word (glossary 压力计); the span cannot wrap only 压力 (translate.md 3) |
| ch09/9.2/text.html | #boyle, `room <span temperature>temperature</span>`; #combined-gas-law Example 9.10, `body <span temperature>temperature</span>` | the span wraps the whole compound 室温 and 体温 | same as the book-wide rule for 室温, 体温 (ch01); the span cannot wrap only 温 |
| ch09/9.2/text.html | Example 9.7, `boiling <span liquid>liquid</span> ammonia` (2 places) | the span wraps 液氨 | glossary 液氨 is one word; the span cannot wrap only 液 |
| ch09/9.2/text.html | #amontons, #avogadro, #ideal-gas-law, #combined-gas-law, `number of <span mole>moles</span> of <span gas>gas</span>`, `<span volume>volume</span> and <span mole>moles</span> of gas` | written 气体的物质的量 with 以<span>摩尔</span>计 beside it; where the sentence is already in a bracket the inner bracket is dropped (以<span>摩尔</span>计的气体的物质的量; 物质的量，以<span>摩尔</span>计), the `mole` span on 摩尔 (review pass 3) | the quantity is 物质的量 and the unit 摩尔 (glossary 'number of moles'; chapter.json variable n); the book's 'number of moles' is the amount in mol |
| ch09/9.2/text.html | #stp, `number of molecules (<span mole>moles</span>)` and the Figure 9.18 sim-head `moles they hold` | written （摩尔数）, 所含摩尔数 | here the book counts in the unit itself (a number of moles); the span stays on 摩尔 |
| ch09/9.2/text.html | #diving, `“<span atmosphere-unit>atmospheres</span> absolute” or ATA` | written 绝对<span>大气压</span>, the span on 大气压 only; the earlier `atmospheres` written 标准大气压 | 绝对大气压 is the diving term for ATA and cannot carry 标准; the glossary row 标准大气压 (atm) is kept elsewhere |
| ch09/9.2/text.html | #diving, `33 feet`, Example 9.10 `70 feet`, Example 9.9 `1 gal`, `269 gal` | written 33 英尺, 70 英尺, 1 加仑, 269 加仑 | unit without a symbol in prose takes the target name (4.4); `120 °F`, psi, atm, ATA kept |
| ch09/9.2/text.html | Examples 9.6 and 9.9, `750 <span torr>torr</span>`, `745 <span torr>torr</span>` | the span wraps 托; the symbol torr is kept in the equations and wherever no span names the concept | glossary 托, symbol torr kept in formulas (same as 9.1) |
| ch09/9.2/text.html | #ideal-gas-law, bold `ideal gas constant` | the span wraps 理想气体 inside 理想气体常数 | the source wraps `ideal gas` only |
| ch09/9.2/text.html | #history, `relates gas quantities for gases` | written 把气体的各个量联系起来，适用于各种气体, both `gas` spans kept | the two spans need two nouns; Chinese adds 适用于 to carry the second |
| ch09/9.2/text.html | #ideal-gas-law, sim-gas-box sim-head, `the molecules speed up with the temperature` (span `speed`) | written 分子的速率随温度增大, the span on the noun 速率 | the span names the concept speed; English uses it as a verb |
| ch09/9.2/text.html | Example 9.7, `hydrogen gas thermometer` | written 氢气体温度计, the span on 气体 | 氢气 would put the span on a bound 气 (as in ch01 1.2, fuel cell box) |
| ch09/9.2/text.html | Breathing and Boyle's Law, `get rid of waste <span gas>gas</span>` | written 排出<span>废气</span>（二氧化碳）, the span wraps the whole word 废气 | 废气 is the Chinese word (cf. 燃气, 天然气); the span cannot wrap only 气 of a bound word (review pass) |
| ch09/9.2/text.html | every equation | numbers, unit symbols and `\text{torr}`, `\text{atm}`, `\text{K}` kept; only the connecting words `or`, `which means that`, `constant` written 或, 即, 常数 | translate.md 5: words inside `\text{}` are translated, unit symbols are not |
| ch09/9.2/section.json | exercise e28 prompt | `Mount Crumpit` written Crumpit 山 | a place name with no standard rendering kept in Latin letters (2.7); pending row `mount crumpit` |
| ch09/9.2/section.json | exercises e16, e18, e26 `answer.parts[].part` | `moles`, `grams`, `(a)`, `(b)`, `(c)` kept | the English part keys are kept (translate.md 5); not translated in ch01 either |
| ch09/9.2/section.json | exercise e1, e3, e5, e7, e25, e29 `answer.solution` (`generated_by: ai`) | translated with the LaTeX macros (`\kPone`, `\kTtwo` …) and the units in `\text{}` kept | AI-written solutions are translated like the rest (5) |
| ch09/9.2/section.json | exercise e8, e14 hints | `L atm mol⁻¹ K⁻¹` and `P₁/T₁ = P₂/T₂` kept | symbols |
| ch09/9.2/figures.js | `WORD`, `molName` | `WORD` holds the gas names (氦气, 氢气, 氮气, 氧气, 氨, 甲烷, 二氧化碳, 氩气); the hover name `'a ' + WORD + ' atom, ' + f` / `' molecule, '` becomes `WORD.replace(/气$/, '') + '原子，' / '分子，' + f` (氦原子，He; 氨分子，NH₃) | English "a … atom/molecule" built by concatenation; Chinese names the atom or molecule without 气 (4.1) |
| ch09/9.2/figures.js | `PICTURE`, `OVERPLATE` view presets | `front`, `corner`, `above` written 正视, 斜视, 俯视 | button words, not grammar; listed for the owner |
| ch09/9.2/figures.js | Figure 9.10, `topline` and readout note | `'At t K the gauge reads …; the ratio P/T stays at … for this filling of the sphere.'` becomes `'在 t K 时压力计读数为 …；对于球的这一次充气，比值 P/T 保持为 …。'`, same slots in the same order; `'The molecules move X times as fast as at 298 K.'` becomes `'分子运动的速率是 298 K 时的 X 倍。'` | English frame cannot carry the slots (4.1) |
| ch09/9.2/figures.js | Figure 9.10, strip text | `'about ' + n + ' strikes on the wall each second'` becomes `'每秒约撞击器壁 ' + n + ' 次'`; `'n = x mol of air, N molecules drawn'` becomes `'n = x mol 空气，画出 N 个分子'` | English word order (4.1) |
| ch09/9.2/figures.js | Figures 9.11 and 9.12, `topline`, readout notes and the `P_`/`V_` lines | `'At t1 K the line gives … and at t2 K …; P/T is … at both.'` becomes `'在 t1 K 时直线给出 …，在 t2 K 时给出 …；两处的 P/T 均为 …。'`; "the kelvin temperature is X times as great …, and so is the pressure" becomes "开尔文温度是 … 的 X 倍，压强也是 X 倍", so the factor slot is written twice | English frame cannot carry the slots (4.1) |
| ch09/9.2/figures.js | Figure 9.13 + 9.14, `topline` | `(compressing / expanding) + ' the gas from v1 mL by the factor f has ' + (raised / lowered) + ' the pressure by the same factor'` becomes `'把气体从 v1 mL ' + (压缩 / 膨胀) + '，体积变化的倍数为 f，压强' + (升高 / 降低) + '了相同的倍数'` | "by the factor f" after a verb has no Chinese counterpart; the two branches kept (4.1) |
| ch09/9.2/figures.js | Figure 9.15, `topline` (3 branches), labels | the sentences keep their slots (`$\kV = …$`); `P_{lungs} = 1–3 torr lower / higher` becomes `P_{肺} 低 / 高 1–3 torr`, `P_{lungs} = P_{outside}` becomes `P_{肺} = P_{外界}`; the readout subscript `\text{lungs}` becomes `\text{肺}`; `swelling drawn X×` becomes `膨胀画成 X×` | word order and the shortest subscript form (4.1, 4.7) |
| ch09/9.2/figures.js | sim-gas-box, `LAWS` and the strip line | `LAWS` becomes `['自由', '阿蒙顿: V 和 n 固定', …]` (the ASCII colon the code splits on is kept); `'Under ' + name + '’s law, ' + rest.replace(' held', ' are held') + '.'` becomes `'在' + name + '定律下，' + rest + '。'`; the label of the law choice `law held` is written 所选定律 | English possessive and the `held`/`are held` plural branch (4.1); `free` is the no-law button, written 自由 |
| ch09/9.2/figures.js | sim-gas-box, `topline` | `'A sample of n mol of GAS at T K in V L presses at P atm' + …` becomes `'一份 n mol GAS 的样品，在 T K 下、体积为 V L 时，压强为 P atm' + …` | English frame (4.1) |
| ch09/9.2/figures.js | sim-balloons, `head()` | `'Three balloons of X'` / `'Balloons of X, Y, Z'` + `', n mol each at STP: …, and every balloon holds V L.'` becomes `'三个 X 气球'` / `'X、Y、Z 气球'` + `'，STP 下每个 n mol：…，每个气球都装有 V L。'`; the lists are joined with 、 | English frame and list punctuation (4.1) |
| ch09/9.2/figures.js | sim-balloons, hover names | `'a balloon of ' + WORD + ', n mol'` becomes `'装有' + WORD + '的气球，n mol'` | article dropped, genitive turned (4.1) |
| ch09/9.2/text.html | `high <span temperature>temperature</span>`, `low temperature` (3 places) | written 高温, 低温; the `temperature` span wraps the whole word | Chinese says 低温, 高温 for "low/high temperature"; the span cannot wrap only 温 (translate.md 3.3, same rule as 室温, 体温) |
| ch09/9.2/text.html (#history, #real-gases, #ideal-assumption), ch09/9.6/text.html (#when-ideal), ch09/9.6/section.json (summary_html) | `low <span gas-pressure>pressure</span>`, `high pressure` beside low/high temperature | written 低压, 高压; the `gas-pressure` span wraps the whole word 低压/高压; the plain text of the 9.6 exercises (prompt, solutions) reads 低压, 高压 | pairs with 低温/高温 (glossary rows `low pressure`, `high pressure`); the span cannot wrap only 压, same rule as the row above and the 9.1 Figure 9.7 scenario (review pass 3) |

### ch09/9.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.3/text.html | #intro, Example 9.12 solution, Example 9.19 solution and the Dalton, stoichiometry and avogadro-revisited paragraphs: `number of <span mole>moles</span>` (and "moles of hydrogen produced", `number of moles of gas A`) | written 物质的量（以<span>摩尔</span>计）, the `mole` span on 摩尔; the same count of spans as the source | the quantity is 物质的量 and the unit 摩尔 (same as 9.2) |
| ch09/9.3/text.html | #intro, "typically measured in <span mole>moles</span> (n)" | written 通常以<span>摩尔</span>度量（n）, the span on 摩尔 | 摩尔 is the unit; the amount is named just before it |
| ch09/9.3/text.html | #intro, #stoichiometry, "chemical <span stoichiometry>stoichiometry</span>" (also the intro "stoichiometry of pure gases") | the span wraps 化学计量 in "化学<span>计量</span>" only where the source has "Chemical" before it (intro, first sentence), and wraps 化学计量 elsewhere | the glossary row stoichiometry is 化学计量 and already contains 化学; "chemical" is absorbed |
| ch09/9.3/text.html | Example 9.11 and #avogadro-revisited: `nitrogen gas`, `ammonia gas`, `hydrogen gas`, `nitrogen and hydrogen <span gas>gases</span>` | the span wraps the whole compound 氮气, 氨气, 氢气; "nitrogen and hydrogen gases … ammonia gas" written 氮和氢两种<span>气体</span>…<span>氨气</span> | Chinese names each gas in one word; the span cannot wrap only 气 (ch01 天然气); "molecular nitrogen gas" written 分子态氮气 |
| ch09/9.3/text.html | Example 9.17, `<span gas>gas</span> grills` | the span wraps 燃气 in 燃气烤架 | 燃气 is the Chinese word for the fuel gas of a grill; the span cannot wrap only 气 |
| ch09/9.3/text.html | #dalton, #over-water, Examples 9.14 to 9.16, `total <span gas-pressure>pressure</span>` (10 places) | the span wraps the whole 总压 | the glossary row total pressure is 总压; the span cannot wrap only 压 |
| ch09/9.3/text.html | #over-water, `liquid water` (3 places, span `liquid`) | the span wraps 液态 in 液态水 | state of matter as adjective (ch01) |
| ch09/9.3/text.html | Example 9.15, `nitrous <span oxide>oxide</span>` | the span wraps 一氧化二氮 | Chinese names the compound in one word (ch01 氧化汞(II)) |
| ch09/9.3/text.html | Example 9.19, `hydrochloric <span acid>acid</span>` | the span wraps 盐酸 | same (ch01 硫酸) |
| ch09/9.3/text.html | Example 9.18, `an edge <span length>length</span>` | the span wraps 棱长 | ch01 rule for 棱长 |
| ch09/9.3/text.html | Figure 9.19 caption, `room <span temperature>temperature</span>` | the span wraps 室温 | ch01 rule for 室温 |
| ch09/9.3/text.html | Example 9.18, "683 billion cubic feet", "billion ft³", `\text{billion}` in the equation | written 683 十亿立方英尺, 683 十亿 ft³ and `\text{十亿}`; the number 1.02 × 10^3 and the symbol ft kept | the printed digits 683 and 1020 are kept (translate.md 3.4); 6830 亿 and 1.02 万亿 would be the natural Chinese counts but change the printed numbers, so 十亿 is written as a unit word after the digits (the earlier reason, that no counting word gives the number, was wrong); cubic feet named in prose |
| ch09/9.3/text.html | Example 9.18, "1.9 miles" | written 1.9 英里 | unit without a symbol takes the target name (4.4) |
| ch09/9.3/text.html | #over-water, `“dry” <span gas-pressure>gas pressure</span>` | written “干”<span>气体压强</span>, the span on 气体压强 | the source's span wraps "gas pressure" |
| ch09/9.3/text.html | #dalton, "exerts the same pressure that it would exert if … alone" | the second 压强 is written without a span: 所产生的<span>压强</span>，与它单独存在于容器中时所产生的压强相同 | the source has one `gas-pressure` span in the sentence; the Chinese needs the noun twice |
| ch09/9.3/text.html | #dalton, `<span mole>mole</span> fraction` | written <span>摩尔</span>分数; the later "a unit of concentration" subject 摩尔分数 carries no span | the source has the span only on the term in bold |
| ch09/9.3/text.html | Figure 9.20 sim-head, `hydrogen, helium and neon` (refs), `all three` | the refs wrap 氢气, 氦气, 氖气 and 这三种气体 | the ref names the cylinder; the word carried is the gas |
| ch09/9.3/text.html | Example 9.14 (b), "in atmospheres" (span `atmosphere-unit`) | written 以<span>标准大气压</span>计 | the glossary row atmosphere (atm) is 标准大气压 |
| ch09/9.3/text.html | Example 9.19, `the provided mass of the limiting reactant, Ga` | written 所给<span>限量反应物</span> Ga 的<span>质量</span>, Ga inside the `mass` type span | Chinese word order puts the element after 限量反应物 |
| ch09/9.3/text.html | #over-water, `a bottle` / `the bottle` (refs `collection-flask`) | written 一个瓶子 / 瓶子 / 瓶 | the source says bottle where the referent label says flask (收集瓶, one form in the caption, the sim-head, the referent label and the figure); the bare word is kept |
| ch09/9.3/text.html | Example 9.12 solution | "Determine the number of moles of carbon and hydrogen in the 100-g sample" and the following sentences keep all four `mole` spans: 碳和氢各有多少<span>摩尔</span>, 较小的<span>摩尔</span>数, 碳的<span>摩尔</span>数与氢的<span>摩尔</span>数之比 (the repeated bracket was removed; 摩尔数 is the chapter's form at 9.2 #stp) | same count of spans as the source |
| ch09/9.2/text.html (Figure 9.9 caption), ch09/9.3/text.html (#greenhouse, Figure 9.25 caption) | "400,000 people", "800,000 years", "700,000 years", "20 million years" | written 400,000 人, 800,000 年, 700,000 年 (the printed digits kept, as 683 below) and 2000 万年 (the ch01 precedent 300 trillion = 300 万亿) | one rule: a number printed in digits stays in digits; a number printed with the word million is regrouped in 万 (review pass 3, finding 2; before, 40 万, 80 万 and 70 万 changed the printed digits) |
| ch09/9.3/text.html | #solomon, "continues to work at NOAA" | written NOAA alone, as printed | the source gives the acronym only; the earlier Chinese expansion was an addition (review pass 3) |
| ch09/9.3/text.html | Example 9.12: "occupies a volume of 1.00 L at 0.984 atm and 50 °C" | the conditions are written first (在 0.984 atm 和 50 °C 下，1.56 g 环丙烷占有 1.00 L 的体积); all spans kept | Chinese word order |
| ch09/9.3/text.html | #solomon, "(the National Medal of Science and the Grande Medaille, respectively)" | （分别是国家科学奖章和大奖章 Grande Medaille） | the French medal's printed name has no standard Chinese rendering beyond 大奖章 |
| ch09/9.3/text.html | #solomon, `The Coldest March` | kept in Latin letters inside the `<em>` | title of a book with no Chinese edition known |
| ch09/9.3/text.html | Figure 9.24 alt, "C O subscript 2, C H subscript 3, and N subscript 2 O" | kept as the spoken formulas, with 下标 for "subscript" | the alt text reads the formulas aloud, the CH₃ is the book's |
| ch09/9.3/text.html | Figure 9.24 / 9.25 alt, `p p m` | written ppm; "years B C" written 公元前 | the alt spells the letters apart for a screen reader; Chinese reads ppm as is |
| ch09/9.3/text.html | #greenhouse, eyebrow `How Sciences Interconnect` | written 各门科学如何相互联系 (glossary row How Sciences Interrelate) | the book's box label; one word differs |
| ch09/9.3/text.html | Examples 9.17 equation, `\text{1 volume}+\text{5 volumes}…` | written `\text{1 体积}+\text{5 体积}` … | words inside `\text{}` are translated (5) |
| ch09/9.3/figures.js | `WORD`, `molName` | gas names written 氢气, 氦气 … 氟利昂-12; `molName` builds 氢原子，H / 氢分子，H₂ from WORD without its 气, with no article | English "a … atom"/"a molecule of …" built by concatenation (4.1); same as 9.2 |
| ch09/9.3/figures.js | sim-gas-density `topline` | `'At p atm and t K, a liter of ' + WORD + ' has a mass of …'` becomes `'在 p atm、t K 下，1 L ' + WORD + '的质量为 …'` | English frame cannot carry the slots in this order (4.1) |
| ch09/9.3/figures.js | sim-dalton, hover names and bar labels | `'a cylinder of ' + WORD + ' alone'` becomes `'只装' + WORD + '的气瓶'`; `WORD + ' alone, ' + NAME` becomes `'只有' + WORD + '，' + NAME`; `WHO` (['hydrogen', 'helium', 'neon']) kept | `WHO` is only the id passed to `F.ref`; the articles and "alone" take the Chinese form |
| ch09/9.3/figures.js | sim-dalton `topline` | the slots `p[0] kPa of hydrogen …` become `p[0] + ' kPa 的氢气、…'` and "press at" 产生的压强为 | Chinese word order (4.1) |
| ch09/9.3/figures.js | sim-over-water `topline` | `'At t °C the trapped gas is par torr of argon and pw torr of water vapor, PT torr in all.'` becomes `'在 t °C 时，被收集的气体含 par torr 的氩气和 pw torr 的水蒸气，共 PT torr。'` | English frame cannot carry the slots (4.1) |
| ch09/9.3/figures.js | sim-combining-volumes `head` | `part` joins with ' 和 ' and each term is `fmt + ' L ' + f`; the sentence becomes `'在相同的温度和压强下，' + left + ' 反应生成 ' + right + '。'` | Chinese word order puts the condition first (4.1) |
| ch09/9.3/figures.js | `view3d` view labels | 'front', 'above', 'corner' written 正视, 俯视, 斜视 | as in 9.2 |
| ch09/9.3/section.json | e7 prompt, "At 25 degrees C" | written 25 摄氏度 | the source spells the unit out, so the target name is used |
| ch09/9.3/section.json | e17 prompt, "1.000 metric ton (1000 kg)"; e12, e13 "1 ton (1.000 × 10³ kg)" | written 1.000 公吨（1000 kg）and 1 吨（1.000 × 10<sup>3</sup> kg） | the kilogram figure fixes the metric tonne |
| ch09/9.3/section.json | cyl7 answer, `3.34 tanks (2.34 × 10<sup>4</sup> L)` | written 3.34 个气瓶（…） | measure word for the count of tanks (4.1) |
| ch09/9.3/section.json | exercises cyl3, cyl4, cyl5, cyl9, e1, e4, e10, e16, e17, e18 `answer.solution` | kept | pure numbers, unit symbols and formulas; no word to translate |
| ch09/9.3/section.json | derivations `source` | 化学（第2版），9.3 气态物质、混合物与反应的化学计量 | the book's title and section title as in ch01 |

### ch09/9.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.4/text.html | #mean-free-path, "At room temperature" (span `temperature`) | the span wraps the whole compound 室温 | the source wraps one English word; Chinese names it in one word (translate.md 3.3, as in ch01) |
| ch09/9.4/text.html | #mean-free-path, "hundreds of times the diameter of the molecule" (no full stop in the source) | 。 added | a Chinese sentence needs its closing mark, as in 9.1 #units (review pass) |
| ch09/9.4/text.html | #diffusion, "the amount of surface area available" (span `area`) | the span wraps the whole compound 表面积 | the source wraps one English word of "surface area"; Chinese names it in one word (ch01 precedent) |
| ch09/9.4/text.html | #uranium, "fissile" and "nuclear fission chain reaction" (spans `fissile-material`, `nuclear-fission`, `chain-reaction`) | the `fissile-material` span wraps 易裂变的 (adjective with its 的); 核<span>裂变</span> wraps 裂变 only, as ch02/2.3 | the quoted adjective is one Chinese phrase; 核裂变 follows the ch02 precedent |
| ch09/9.4/text.html | #diffusion, "both bulbs", "the bulbs" and sim-head (referent spans) | "the bulbs" written 两个玻璃泡; "the lighter/heavier gas" 较轻/较重的气体; the span order of "It takes 243 s for 4.46 × 10⁻⁵ mol Xe" (Example 9.21) and "Hydrogen effuses…" follows the Chinese word order | Chinese word order differs; every span stays in its block |
| ch09/9.4/text.html | #diffusion, "no net transfer of molecules occurs" | written （分子没有<em>净</em>转移） | Chinese word order; the `<em>` stays on 净 |
| ch09/9.4/text.html | #graham, "a mixture of gases" (spans `mixture`, `gas`) | written 气体混合物, the `gas` span before the `mixture` span | Chinese puts the modifier first; both spans stay in the block |
| ch09/9.4/text.html | #graham-calc, Example 9.22 formula `{\text{rate of effusion of CO}}_{2}` | written `{\text{CO}}_{2}\text{ 的泻流速率}` | the English phrase ends in the formula with its subscript; Chinese puts the formula before 的泻流速率, so the `\text{}` is split around the subscript |
| ch09/9.4/text.html | #graham, #graham-calc, display formulas "rate of effusion of A/Xe/…" | `\text{A 的泻流速率}`, `\text{Xe 所用时间}`, `\text{转移的 Xe 的物质的量}` | "X of Y" phrases reorder to Y 的 X; the words inside `\text{}` only |
| ch09/9.4/text.html | #diffusion, rate-of-diffusion formula "amount of gas passing through an area" | written 通过某一面积的气体的物质的量 | the glossary row 'amount of gas' is 气体的物质的量 (the amount in mol); the source's generic "amount" is read as the amount in mol, as in Example 9.21 (mol) |
| ch09/9.4/text.html, ch09/9.4/section.json | #uranium, "molecular weights" (the broken sentence "The small difference in molecular weights … only about 0.4% enrichment, is achieved in one diffuser") and the caption of Figure 9.30 with its missing period | the broken grammar is kept as printed: 分子量的微小差异，仅约 0.4% 的浓缩，在一个扩散器中实现; the caption runs "…部分分离 UF6 必须通过…" with no sentence stop | the book's errors stay (translate.md 3.2) |
| ch09/9.4/text.html | #mean-free-path, last sentence | no final full stop, as printed | the source paragraph ends without a period |
| ch09/9.4/text.html | #graham, Figure 9.29 caption "(blue).The right-side photograph" | the missing space of the source is not carried; the two sentences are separated by 。 | a missing space after a period has no Chinese equivalent |
| ch09/9.4/text.html | #uranium, "Check Your Learning" and the eyebrow "How Sciences Interconnect" | 学习检测 and 各门科学如何相互联系 | the shared glossary and the ch01 precedent |
| ch09/9.4/section.json | exercise e1 solution "4.2 hours"; e4 and e5 solutions | "hours" written 小时 (the answer value and the unit field untouched); the formula list F₂, Ne, … written with 、 | unit without a symbol in the answer takes the target name (4.4); full-width punctuation in prose |
| ch09/9.4/section.json | exercise cyl3 solution `162 g/mol`, cyl1 `52 mL/s`, cyl2 `32 h`, e5 `1.4; 1.2`, e6 `51.7 cm` | kept as printed | numbers and unit symbols only (parity tool lists cyl3 as untranslated) |
| ch09/9.4/figures.js | `molName` | `'an atom of ' + word + ', ' + f` / `'a molecule of ' + word + ', ' + f` become `word + '原子，' + f` / `word + '分子，' + f` (氖原子，Ne; 氢分子，H₂) | English "a/an … of …" built by concatenation (4.1), as in ch01/1.2 |
| ch09/9.4/figures.js | `topline`, the two counts "So far N molecule(s) of …" | `(crossedA === 1 ? ' molecule of ' : ' molecules of ')` removed; sentences written `'到目前为止，已有 ' + crossedA + ' 个 ' + a + ' 分子…'` | English plural branch in figure code (4.1) |
| ch09/9.4/figures.js | readouts of sim-bulbs and sim-diffuser | `\text{rate of effusion of }${TEXF[a]}` becomes `${TEXF[a]}\text{ 的泻流速率}`, and `\text{rate of diffusion of }{}^{235}\text{UF}_6` becomes `{}^{235}\text{UF}_6\text{ 的扩散速率}` | Chinese puts the formula before 的…速率; the TeX around the `\text{}` is kept |
| ch09/9.4/figures.js | `text(ctx, 'molecules drawn: …')`, hover names, `'higher speed ²³⁵UF_{6} diffuses …'` | written in Chinese word order with the same slots (所画分子数：每种气体 ' + N + ' 个；…) | English sentence frame (4.1) |
| ch09/9.4/figures.js | `F.view3d` views `front`, `above` | 正视, 俯视 | one set of view labels in the chapter (正视, 俯视, 斜视; glossary rows front, above, corner) |
| ch09/9.4/text.html | Example of effusion (Graham's law), the subscript `\kMM_{Unknown}` and `\text{rate of effusion of Unknown}` (3 places) | written `\kMM_{\text{未知}}`; the `\text{}` words translated | a word inside a subscript is reader-visible; the macro and the rest of the formula are unchanged |

### ch09/9.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.5/text.html | #postulates, "the gas laws"; "gas laws" elsewhere (spans `gas`, `scientific-law`) | 气体定律 written <span gas>气体</span><span scientific-law>定律</span>, as in the source order | the glossary row 气体定律 is two concept words in the source; the spans stay in their block |
| ch09/9.5/text.html | #postulates, postulate 1, "Gases are composed of molecules … travelling in straight lines" | the second "molecules" (as subject of "travelling") is dropped: 气体由连续运动的分子组成，沿直线运动 | Chinese has no repeated subject; the three `molecule` spans of the block are kept on 分子 (the third is "other molecules") |
| ch09/9.5/text.html | #postulates, postulate 4, "attractive or repulsive forces" (span `force`) | written 吸引或排斥的<span>力</span> | Chinese puts 力 once after the pair |
| ch09/9.5/text.html | #kmt-part-1, Amontons bullet, "the increased speed of the gas molecules" | `speed` span wraps 速率 in 气体分子速率的增大 | word order |
| ch09/9.5/text.html | #kmt-part-1, Charles bullet, "collision forces" (span `force`) | the span wraps 力 in 碰撞力 | the source wraps one English word; Chinese names it in one compound (ch01 precedent) |
| ch09/9.5/text.html | #kmt-part-1, Dalton bullet, "the (partial) pressures" | written （分）压强; the `gas-pressure` span wraps 压强 | the glossary row partial pressure is 分压; the parenthesis of the source is kept |
| ch09/9.5/text.html | #kmt-part-1, Boyle bullet, "the gas volume of a given amount of gas at a given temperature" | written 一定量的气体在一定温度下的气体体积 with the `gas` and `volume` spans on 气体 and 体积 as in the source | Chinese keeps both words of the source's "gas volume" |
| ch09/9.5/text.html | #kmt-part-1 sim-head, #speeds sim-head (Figure 9.31, Sim) | "the changed sample" written 变化后的样品; "two cylinders of nitrogen" 两个盛有氮气的气缸; "the baseline" 基准气缸; "amount of gas" 气体的物质的量; the `data-ref`/`data-type` spans wrap the same words | word order and glossary rows (气体的物质的量, 气缸 pending) |
| ch09/9.5/text.html | #speeds, "the root mean square speed of a particle, u_rms" (strong spans) | `<strong><span>方均根速率</span></strong><strong><em>u</em><sub>rms</sub></strong>` with the comma of the source dropped | Chinese needs no apposition comma between the two names |
| ch09/9.5/text.html | #speeds, "The kinetic energy (KE) of a particle of mass (m) and speed (u) is given by" | written 动能（KE）由粒子的质量（m）和速率（u）按下式给出 | the English "particle of mass (m) and speed (u)" cannot keep its order with the three spans (`kinetic-energy`, `mass`, `speed`) in Chinese |
| ch09/9.5/text.html | #speeds, "the gas constant" (span `gas`) | written 理想<span>气体</span>常数 | the glossary row gas constant is 理想气体常数; the span wraps 气体 of the compound (ch01 precedent) |
| ch09/9.5/text.html | #speeds, "for nitrogen gas in Figure 9.33" (span `gas`) | written <span>气体</span>氮的这种行为 | 氮气 would put the span on a bound 气 (as in ch01/1.2) |
| ch09/9.5/text.html | #speeds, Example 9.23 first paragraph "Calculate the root-mean-square speed for a nitrogen molecule at 30 °C" | the temperature in a parenthesis after the object: 计算氮分子的方均根速率（30 °C 时）; both `data-type` spans kept | Chinese word order |
| ch09/9.5/text.html | #speeds, `$$\text{effusion rate}\;\propto\;\kurms$$` (#kmt-part-2) | the words in `\text{}` written `\text{泻流速率}` | words in `\text{}` are translated (translate.md 5) |
| ch09/9.5/text.html | #kmt-part-2, "diffuse at relatively fast rates" | written 以相对较快的速率扩散; the sentence "According to Graham’s law, …" kept as printed (the book's error, footnote c-grahams-law) | the book's error stays (translate.md 3.2) |
| ch09/9.5/text.html, ch09/9.5/section.json | `data-original-caption`, figure `original_caption` | "(Figure 9.32) … (Figure 9.33) … (Figure 9.34) molecular speed …" written （图 9.32）…（图 9.33）…（图 9.34）分子速率…; νp, urms, N2 kept as printed | citations of a figure are written 图 N.M (translate.md 4.6) |
| ch09/9.5/text.html | h4 "Check Your Learning", "Solution"; Example 9.23 heading | 学习检测, 解, 例 9.23 · u_rms 的计算 | the shared glossary rows Check Your Learning, Solution, Example |
| ch09/9.5/figures.js | `molName` | `'an atom of ' + word + ', ' + f` / `'a molecule of ' + word + ', ' + f` become `word + '原子，' + f` / `word + '分子，' + f` (氦原子，He; 氧分子，O₂); `MOLS[].word` is the element name 氧, 氮, 氦, 氖, 氩, 氙 | English "a/an … of …" built by concatenation (4.1), as in ch09/9.4 |
| ch09/9.5/figures.js | sim-speeds headline `'For ' + word + ' at ' + T + ' K the most probable speed is … and the root mean square speed is …'` | rewritten `'在 ' + T + ' K 时，' + word + '气的最概然速率为 … m/s，方均根速率为 … m/s。'`; the slot order T before gas changes | the English sentence frame cannot carry the slots in the same order (4.1); `word + '气'` makes 氧气, 氮气, 氦气, 氖气, 氩气, 氙气 |
| ch09/9.5/figures.js | sim-gasbox headline `total + ' speeds of ' + word + ' at ' + T + ' K counted so far; …'` | rewritten `'在 ' + T + ' K 时，已统计' + word + '气的 ' + total + ' 个速率；其方均根值为 … m/s，而 √(3RT/ℳ) 给出 … m/s。'` | same as above; the slot order T, total, gas changes |
| ch09/9.5/figures.js | sim-speeds legend `g + ' at ' + c.name` and `c.name + ' at ' + T + ' K'` | written `g + '，' + c.name` and `c.name + '，' + T + ' K'` (O₂，100 K; Xe，300 K) | "X at T" has no one Chinese preposition that fits a legend line; the full-width comma is the plain form |
| ch09/9.5/figures.js | sim-kmt labels `'heated'`, `'volume decreased'`, `'increased gas'`, `'baseline'` and the bench/gas/piston hover names | 加热后, 体积减小后, 气体增加后, 基准; 工作台, 气体，1.00 L, 活塞 | English participles and article phrases collapse to one Chinese form (4.1) |
| ch09/9.5/figures.js | sim-kmt law options, `view3d` view labels | 阿蒙顿定律, 玻意耳定律, 阿伏加德罗定律; `front`, `above`, `corner` written 正视, 俯视, 斜视 | the glossary targets for the laws; the view labels are the chapter's one set (as in 9.2) |
| ch09/9.5/figures.js | readout `\text{for every gas}` (sim-speeds) | `\text{对每种气体都相同}` | the words of `\text{}` are translated (translate.md 5) |
| ch09/9.5/section.json | notes: the image label “Charles’s Law” on panel (a) of Figure 9.31 | kept in English inside quotes, as the notes name the label printed on the source image | the label belongs to the source image (translate.md 4.3) |
| ch09/9.5/section.json | exercise e6 (f) "the weight of the balloon and its rigging is 500 pounds", "384 lb"; "60 feet", "1.1 × 10⁵ ft³", "40.0 gallons" | written 500 磅, 384 磅, 60 英尺, 40.0 加仑; the symbols ft³, °F, `g L<sup>−1</sup>` kept as printed | units with no SI equivalent take the Chinese name in prose, the symbol is kept in formulas (4.4, ch01 precedent); 重量 for the balloon's weight (glossary weight) |
| ch09/9.5/section.json | exercises e6 solution, e3/e7 solutions | (a) equal; (b) less than written 相等；小于; the numbers and unit symbols (29.48 g mol⁻¹ …) as printed | numbers and units kept (translate.md 3.4) |
| ch09/9.5/section.json | exercises cyl1 and e7 solutions with numbers only, e.g. `441 m/s` | kept as printed | numbers and unit symbols only (parity tool may list them) |
| ch09/9.5/section.json | derivations `source` | `Chemistry 2e, 9.5 The Kinetic-Molecular Theory` written 化学（第2版），9.5 分子运动论 | the book's title and section title are translated (as 9.3) |
| ch09/9.5/text.html | #kmt-part-1, Charles's law, "increased wall surface area" | written 器壁的<span>表面积</span>; the `area` span wraps the whole word 表面积 | 表面积 is one Chinese term; the span cannot wrap only 积 (translate.md 3.3, same rule as 室温) (review pass 3) |

### ch09/9.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch09/9.6/text.html | `<span data-concept="force">attractive forces</span>` and "the force of attraction" (causes, van-der-waals, Figure 9.36 sim-head) | the span wraps the whole compound 吸引力; a lone "the force" / "this force" / "force of collisions" keeps the span on 力 | Chinese names the attractive force in one word 吸引力 that contains the concept's word 力 (translate.md 3.3, span stays in its block) |
| ch09/9.6/text.html | causes, "lower KE relative to the attractive forces" | written 动能较低; the abbreviation KE is not kept | a sentence unit about English letters; 动能 carries the meaning (4.3) |
| ch09/9.6/text.html | compressibility, "plots of Z over a large pressure range" and the displayed formula `\text{molar volume of gas at same}\;\kT\;\text{and}\;\kP` | `\text{相同}\;\kT\;\text{和}\;\kP\;\text{下气体的摩尔体积}`; the prose "at the same temperature and pressure" keeps both spans (温度, 压强) | Chinese word order puts the condition before 下 and the noun after it; the `\text` pieces split around the macros |
| ch09/9.6/text.html | Example 9.24, "(a) from the ideal gas law" | written （a）由理想气体状态方程求得 | verb needed in Chinese to close the phrase; the source's bare "from" |
| ch09/9.6/text.html | compressibility, "reaction stoichiometry" (span `stoichiometry`) | written 反应的<span>化学计量</span>, the span wraps 化学计量 (glossary row `gas stoichiometry` and the ch17 row `stoichiometry`) | 化学计量学 is the discipline; the stoichiometry of a reaction is 化学计量 (review pass) |
| ch09/9.6/section.json | objectives, `Define compressibility (Z)`; text.html #van-der-waals, `compressibility curves` | written 压缩因子（Z）and 压缩因子曲线 | the quantity Z is the compressibility factor (压缩因子, 化学名词); the book's shorter name is expanded by the Chinese term |
| ch09/9.6/figures.js | sim-real-boxes, `name` | `(q.atoms.length === 1 ? 'an atom of ' : 'a molecule of ') + q.word + ', ' + q.f` becomes `'一个' + q.word + (q.atoms.length === 1 ? '原子' : '分子') + '，' + q.f`; `q.word` is 氦, 氮, 氧, 二氧化碳 (no articles) | English article and "of" phrase built by concatenation (4.1); the noun comes after the substance in Chinese |
| ch09/9.6/figures.js | sim-real-boxes, the two `topline` sentences | the `less`/`more` branches kept as 低/高 and 小/大 and the numbers in the same slots, in Chinese word order (`比理想气体低 x atm`) | English comparative frame cannot carry the slots in order |
| ch09/9.6/figures.js | sim-real-boxes, `'an ideal particle standing for ' + name` | `'一个理想粒子，代表' + name` | English article dropped, same structure |
| ch09/9.6/figures.js | sim-real-boxes, view3d `views` labels | `front`/`corner` written 正视/斜视 | UI label, translated for meaning; one set of labels in the chapter |
| ch09/9.6/text.html, ch09/9.6/section.json | `low <span temperature>temperature</span>`, `high temperature` (3 places) | written 低温, 高温; the `temperature` span wraps the whole word | same as the 9.2 row: Chinese names low and high temperature in one word, the span stays in its block |

### Chapter 9: Choices open to doubt

| Item | What was done | Why it is open |
|---|---|---|
| 阿蒙顿定律, 查理定律, 盖-吕萨克定律 (9.2) | the book's attributions are kept: Amontons = P-T, Charles = V-T, Gay-Lussac as the second name of Amontons's law | Chinese textbooks call V-T 盖-吕萨克定律 and P-T 查理定律; the pages follow the English book, so a Chinese teacher will notice the swap. Owner to decide whether to follow the Chinese convention |
| 耳膜 (9.2) | plain word of a diving text | 鼓膜 is the anatomical term |
| 化学计量 (9.3) | the calculation heading is 化学计量 | Resolved in the global merge (2026-10-27): no page of any chapter uses 化学计量学 (ch17 was swept to 化学计量), so the one target is 化学计量 |
| 分子量 (9.4, `molecular weight`) | 化学名词 分子量 (termonline 2026-10-27) | Resolved in the global merge (2026-10-27): ch09 and ch10 wrote 相对分子质量 (3 places), ch12 分子量; one target 分子量, in step with atomic weight 原子量 and formula weight 式量 |
| 分子质量 (9.4, `molecular mass`) | mass of one molecule, distinct from the molecular weight 分子量 | same target as ch03 (reused) |
| 分子运动论 (9.5) | `kinetic-molecular theory` | 气体分子运动论 is the gas-specific form; 分子运动论 is kept so later chapters can reuse it |
| 物质的量 for `number of moles` (9.2, 9.3, 9.5) | 物质的量（以<span>摩尔</span>计）, as in the ch01 decision (物质的量 only for the amount of substance in mol) | the reviewer proposed 摩尔数 (the book's own count); declined because the ch01 decision and GB 3102 fix 物质的量 and the `mole` span count per sentence must stay; 摩尔数 is kept only where the source counts moles itself (9.2 #stp). Owner to decide |
| 物种 for `species` (9.4, 9.5) | 物种 (化学名词), the ch14 target | the reviewer proposed 粒子 or 物质; declined because ch14 already carries 物种 for the same source. Owner to decide |
| 分子运动论 (9.5) | kept | 物理学名词 lists 分子动理论 and 气体动理论; 分子运动论 is the older name that chemistry textbooks still use. Owner to confirm at termonline |
| 绝对大气压（ATA）, 浮力调节器（BCD）, 百万分率（ppm） | acronyms kept in Latin letters after the Chinese name | acronyms are not translated (translate.md 5) |

### Chapter 9: Kept in English

Names of people without a standard Chinese rendering that the glossary does not carry, photo-credit names and organisations, unit symbols, acronyms (ATA, BCD, ppm, atm, psi, torr), chemical formulas, figure and sim eyebrows, Greek words cited for their origin (<em>sphygmos</em> and the like), and the letter names in sentences about a letter (ρ, rho).

### Chapter 9: Terms not yet confirmed

`glossary.zh-CN.json` has 332 rows; 34 carry `"confirm": "termonline"` (taken from the named published authority or from standard textbook usage, not looked up at termonline.cn) and 8 carry `"confirm": "owner"` (the doubts above and the diving terms). Each is to be confirmed there and its entry URL added.

## Chapter 10 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.2/text.html, ch10/10.3/text.html, ch10/10.5/text.html, ch10/10.6/text.html | spans on 室温 (`temperature`), 体温 (10.3), 棱长 (`length`, 10.6), 熔点 and 熔融 (`melting`), 氧化镍 and 氧化铝 (`oxide`), 比热容 (`heat-flow`, 10.3), 气相 / 液相 / 固相 (`gas`, `liquid`, `solid`) and 固态 / 液态 (state adjectives) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 温度, 长度, 熔化, 氧化物, 热量, 气体, 液体, 固体 | the source wraps one English word of "room temperature", "edge length", "melting point", "nickel oxide", "specific heat capacity", "gas phase", "solid state"; Chinese names each in one word (translate.md 3.3, the span stays in its block, the ch01 rows apply) |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M …`, the bare `Figure` and `Sim` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| every text.html | table eyebrows `Table 10.1` to `Table 10.4` | written 表 N.M (10.1 first kept `Table 10.1`; changed in the merge) | translate.md 5 lists a table's eyebrow as translated; the ch01 rule 表 N.M |
| every text.html, 10.2 section.json | photo credits (18 in the text.html files, 1 in 10.2 section.json) | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X", lettered credits （来源 a：…；b：…）; names, organisations and handles (Flickr, YouTube, NASA, the Centers for Disease Control and Prevention, United States Geological Survey, National Institutes of Health) kept as printed | the ch01 credit formula; "credit" is translated, the names are not (translate.md 5) |
| every text.html, section.json | part labels (a)–(e) in prose | full-width （a）（b） | binding decision of chapter 1 |
| every text.html, section.json | IMF, KE, DNA, RNA, VSEPR, BCC, FCC, CCP, HCP, STP, SAE, ABAB / ABCABC | the acronyms kept in Latin letters (IMF and KE are glossed in Chinese where the source defines them) | the book's own acronyms, used throughout as printed (translate.md 4.3) |

### ch10/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/intro/text.html | `esters`, `physical properties`, `intermolecular forces` (spans) | plural collapsed: 酯, 物理性质, 分子间作用力 | Chinese has no plural form |
| ch10/intro/text.html | `Alice Ball` | rendered 爱丽丝·鲍尔（Alice Ball） | Chinese readers need the transliteration; the printed name kept in parentheses |

### ch10/10.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.1/figures.js | `nm` in sim-phases (`'a ' + s.name + ' molecule, '` / `' atom, '`); sim-dispersion hover names (`'a ' + h.name + ' atom, '`); `NAME`, sim-intra-inter, sim-hbond and sim-pentanes `name` strings ('a chlorine atom, Cl', 'an oxygen atom of a water molecule', 'a carbon atom of …') | the English articles `a`/`an` dropped; the name now reads `氖原子，Ne` / `氟分子，F₂` / `氯原子，Cl` / `水分子的氧原子`; the code around it is unchanged | English articles have no Chinese form (translate.md 4.1) |
| ch10/10.1/figures.js | sim-pentanes `atomName` (`(i < 5 ? 'a carbon atom of ' : 'a hydrogen atom of ') + m`) | rewritten `m + (i < 5 ? '的碳原子' : '的氢原子')` (the molecule name first, then 的碳原子 / 的氢原子) | Chinese puts the possessor before the noun, so the English prefix cannot stay a prefix (grammar built from English, 4.1) |
| ch10/10.1/figures.js | sim-phases headline `'At ' + T0 + ' K ' + s.name + ' is ' + WHAT[ph] + '.'` and the `WHAT` phrases | written `'在 ' + T0 + ' K 时，' + s.name + '处于' + WHAT[ph] + '。'`; WHAT = '固态：…', '液态：…', '气态：…' without 'a solid/a liquid/a gas' | Chinese word order; English articles collapse (4.1) |
| ch10/10.1/figures.js | sim-dispersion headline `'Two ' + h.name + ' molecules, ' + h.f + ': …'` | written `'两个' + h.name + '分子，' + h.f + '：…'` | Chinese word order and measure word (4.1) |
| ch10/10.1/figures.js | sim-pentanes headline `iso.name + ': ' + iso.head + ', boiling point ' + … + ' °C.'` and the sentence-case branch `/^n-/.test(head) ? head : head.charAt(0).toUpperCase() + head.slice(1)` (3D `two.v.headline`, 2D `topline`) | the branch removed and `head` passed as it is; the sentence is `iso.name + '：' + iso.head + '，沸点 ' + … + ' °C。'`; the `iso.name.replace('n-', '\\textit{n}-')` in the readout is left in the code and no longer matches (the name is 正戊烷) | capitalising the first English letter and italicising the English prefix n- have no Chinese form (4.1) |
| ch10/10.1/figures.js | sim-hydrides hover name `', predicted about '` / `', boils at '` | written `'，预测约为 '` / `'，沸点为 '` after the formula | Chinese word order |
| ch10/10.1/text.html | spans on 固态 / 液态 / 液相 / 室温 / 熔点 (`solid`, `liquid`, `temperature`, `melting` in "solid, liquid, and gaseous matter", "in the liquid phase", "room temperature", "melting and boiling points") | the span wraps the whole Chinese compound that contains the concept's word (固态 for 固体, 液态 for 液体, 液相, 室温 for 温度, 熔点 for 熔化) | the source wraps one English word of "solid state", "liquid phase", "room temperature", "melting point"; Chinese names each in one word (translate.md 3.3; the span stays in its block, as recorded in ch01) |
| ch10/10.1/text.html | "attractive forces", "Intramolecular forces", "London forces" with the `force` span | the span wraps 力 in 吸引力 and 伦敦色散力, and 作用力 in 分子内作用力 / 分子间作用力 (with the em on 内 / 间) | the glossary renders force as 力 and intermolecular force as 分子间作用力; the English adjective is a separate word, the Chinese a suffix |
| ch10/10.1/text.html | `<em>Intra</em>molecular`, `<em>Inter</em>molecular`, `<em>intra</em>molecular`, `<em>inter</em>molecular` (the #forces section, Figure 10.5 sim-head, the hydrogen-bond paragraph) | the em wraps 内 / 间 in 分子<em>内</em>…, 分子<em>间</em>…; "<em>within</em> the molecule" is 分子<em>内部</em>, "<em>between</em> molecules" is 分子<em>之间</em> | the source stresses the English prefixes intra- and inter-; Chinese has the single characters 内 and 间 |
| ch10/10.1/text.html | `<em>n</em>-pentane`, `<em>n</em>-butane` (section.json e12) | rendered <em>正</em>戊烷, <em>正</em>丁烷 | the italic letter n- is the prefix 正 in Chinese; the em stays on it |
| ch10/10.1/text.html | "Figure 10.14" closing the DNA sentence | the bare "Figure 10.14" at the end of "similar shape and structure Figure 10.14." written 如图 10.14 所示 | the source sentence has no verb for the citation; Chinese needs 如…所示 to read |
| ch10/10.1/text.html | credit of Figure 10.8 ("credit photo: …") | written （来源：改编自“JC*+A!”/Flickr 的作品） | the other credits of the book are （来源：…）; the word "photo" is not repeated (the credit already sits under a photo) |
| ch10/10.1/text.html | `data-concept="weight"`: "the gecko's weight" | written 壁虎自身<span>重量</span> (the glossary's 重量, not 体重) | 体重 is the book's rendering for a person's body weight; the span is on the concept word 重量 |
| ch10/10.1/text.html | "the chapter on chemical bonding and molecular geometry" ×2 and "a later module of this chapter", "this module" | 化学键与分子几何构型一章; 本章后面的一节; 本节 | the source speaks of OpenStax modules; the translation names the chapter and calls the module a section |
| ch10/10.1/text.html | `acid` span in 脱氧核糖核酸 (deoxyribonucleic acid) | the span wraps 酸 only, the rest of the name stays outside | Chinese names deoxyribonucleic acid in one word; the span stays in its block |
| ch10/10.1/text.html, ch10/10.1/section.json | `group-of-the-periodic-table` spans (8) and `period-of-the-periodic-table` (1) | the span wraps 族 and 周期 and the number stays outside: 第 15 族 | Chinese puts the number before 族 and 周期 |
| ch10/10.1/figures.js | sim-hydrides readout `\text{boiling point of H}_2\text{O}` | written `\text{H}_2\text{O 的沸点}` | Chinese word order inside `\text{}` |
| ch10/10.1/figures.js | sim-intra-inter readout `(\text{about 25 times more})` | written `(\text{约为 25 倍})` | Chinese phrasing for "about 25 times more" |
| ch10/10.1/figures.js | 3D view labels `side`, `end on`, `down a bond` (besides `front`, `corner`) | 侧视, 端视, 沿键方向 | interface words for camera views, as for 正视 and 斜视 |

### ch10/10.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.2/figures.js | sim-caprise headline `const Name = q.name[0].toUpperCase() + q.name.slice(1)` and the two headline templates (`${Name} rises … in the tube … mm across and … in the tube twice as wide.`, `${Name} stands … below the surface in the tube … mm across and … below it in the tube twice as wide.`) | `Name` is `q.name` (no capitalising); the templates are `${Name}在直径为 … mm 的管中上升 …，在宽度为其两倍的管中上升 ….` and `…比液面低 …`, same slots | capitalising the first English letter has no Chinese form; Chinese word order differs (4.1) |
| ch10/10.2/figures.js | the `wets` strings `adhesion to the glass outweighs cohesion: …` / `cohesion outweighs adhesion to the glass: …` | written 与玻璃的黏附作用胜过内聚作用 / 内聚作用胜过与玻璃的黏附作用 (黏附 and 内聚 the processes) | the figure names the processes, not the forces (glossary rows adhesion, cohesion) |
| ch10/10.2/text.html | "IMFs" (viscosity, adhesion, ex. e1 to e5 in section.json) | written IMF (the abbreviation kept, plural collapsed), as in 10.1 | the English abbreviation of "intermolecular forces"; 10.1 introduces 分子间作用力（IMF） and uses IMF afterwards; plural has no Chinese form (4.1) |
| ch10/10.2/text.html | `data-concept="area"` on "surface area" (×6) | written 表<span>面积</span>; the span wraps 面积, 表 stays outside | glossary 表面积 is one word; the concept word is 面积 |
| ch10/10.2/text.html | "Attractive forces" (Figure 10.16 caption) with the `force` span | span wraps 力 in 吸引力 and 吸引 stays outside | as recorded for 10.1: the English adjective is a separate word, Chinese a prefix of 力 |
| ch10/10.2/text.html | `data-concept="dissolved"` "dissolved nutrients" | written 溶解的养分, span on 溶解的 | glossary row dissolved is 溶解的 |
| ch10/10.2/text.html | "Pockels' work" in the Langmuir and Blodgett sentence | "built on Pockels' work in their own trough and important advances in surface chemistry" written 在波克尔斯工作的基础上，用他们自己的水槽取得了表面化学方面的重要进展 | the English clause is loosely joined (built on … in their own trough and important advances); Chinese needs one verb for both objects, meaning unchanged |
| ch10/10.2/section.json | "slower than molasses in winter" (e4 prompt) | translated for meaning: “比冬天的糖蜜还慢” | English idiom, rendered as a Chinese saying that keeps "slower than" (4.4) |
| ch10/10.2/section.json | e4 answer, "so the less viscous the liquid" | kept as the book prints it: 因此液体的黏度越小 (the book means more viscous); no footnote added | the book's slip stays (root item 13); the source carries no footnote for it, and a footnote id the source lacks fails the id parity of translate.md 1.6, so the slip is listed under "Other things for the owner" in `translation-notes.md` |
| ch10/10.2/text.html | sim-head "one of diameter d and one twice as wide" | 一根的直径为 d，另一根的宽度为其两倍; narrow and wide tube 细管 and 粗管 | Chinese counts tubes by thickness; the spans stay on the same referents |
| ch10/10.2/text.html | credits of Figures 10.15, 10.16, 10.18, 10.19, 10.21, exercise e2 | （来源 a：改编自 Scott Bauer 的作品；b：…）, （来源：改编自 … 的作品）, （来源：Mark Ott）, （来源：Cory Zanker）; "credit photo" written 来源 without 'photo'; organisation names (Centers for Disease Control and Prevention) kept in English | the book's one credit formula (ch01 records) |
| ch10/10.2/text.html | table headers "Substance", "Formula" and the cells "variable" | 物质, 化学式, 不定 | the cells say the viscosity varies with the sample; 不定 is the plain form |
| ch10/10.2/figures.js | `LIQ[].name` ('water', 'ethanol', 'ethylene glycol', 'mercury') | written 水, 乙醇, 乙二醇, 汞; the keys stay code | display names only |
| ch10/10.2/text.html | `\khcap` and the other macro equations | LaTeX untouched, no `\text{}` words to translate | kept byte for byte (translate.md 5) |
| ch10/10.2/section.json | exercise e7 solution `1.7 $\times$ 10<sup>−4</sup> m` | kept | pure math and a unit, nothing to translate |

### ch10/10.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.3/text.html | `gas` span in "gas molecules", "gas phase molecules", "from the gas phase", "gas-phase molecules" (vaporization, vapor-imf) | the span wraps 气相 (the whole compound), 气相分子 | Chinese says 气相 where English says "gas phase"; the concept word 气体 is not in it (compound word, as 天然气 in ch01) |
| ch10/10.3/text.html | `gas` span in "the gas constant" (clausius) | written 理想<span>气体</span>常数, the span on 气体 | the glossary row gas constant is 理想气体常数 |
| ch10/10.3/text.html | `solid` and `liquid` spans: "solid and liquid phases", "liquid state", "solid state", "solid ice and liquid water" | the spans wrap 固相 / 液相 (phases) and 固态 / 液态 (states) where the glossary has 固体 / 液体 | Chinese says 固态冰, 液态, 固相; the phase or state takes 相 / 态 (as in ch01 1.2) |
| ch10/10.3/text.html | `temperature` span in "room temperature", "normal body temperature" | the span wraps 室温 and 体温 (the whole compound); the concept word is 温度 | compound word, as in ch01 (translate.md 3.3) |
| ch10/10.3/text.html | `heat-flow` span in "its specific heat" (heating-curves) | the span wraps 比热容 (the whole compound) | the Chinese compound has no separate word 热量; the span stays in its block |
| ch10/10.3/text.html | `melting` span in "low melting points" | the span wraps 熔点 (the whole compound) | the Chinese compound 熔点 contains 熔 and not the glossary word 熔化 |
| ch10/10.3/text.html | "Fusion (melting) is an endothermic process" (melting) | written 熔化（熔融）是吸热过程, both words in a `melting` span | the English gives two words for one process; Chinese has 熔化 for both, 熔融 is its other standard name |
| ch10/10.3/text.html | "enthalpy of vaporization", "enthalpy of fusion", "enthalpy of sublimation" with `enthalpy` + `vaporization` / `melting` / `sublimation` spans | written 汽化焓, 熔化焓, 升华焓 with the two spans adjacent (汽化 then 焓); in Figure 10.28 the span wraps 焓 only (熔化焓, 汽化焓, 升华焓) | the English order "enthalpy of X" is X + 焓 in Chinese; the spans stay in their block |
| ch10/10.3/text.html | "the enthalpies of fusion and vaporization", "the sum of its enthalpies of fusion and vaporization", "the enthalpies of all phase changes" | written 熔化焓和汽化焓, 其熔化焓与汽化焓之和, 所有相变的焓; the one `enthalpy` span of the source stands on the second 焓, and the `melting` span on 熔化 beside the unspanned first 焓 | the Chinese names each enthalpy in full, and the span count of the source (one `enthalpy`, one `melting`, one `vaporization`) is kept, so only one 焓 carries the span (4.1) |
| ch10/10.3/text.html | "IMFs", "average KE" | written IMF (abbreviation kept, plural collapsed) as in 10.1 and 10.2; 平均动能（KE） | the abbreviations stand for the terms the book abbreviates; English plural has no Chinese form (4.1) |
| ch10/10.3/text.html | "London forces", "attractive forces", "intermolecular attractive forces" with the `force` span | the span wraps 力 in 伦敦色散力 and 吸引力 | the English adjective is a separate word, Chinese a prefix of 力 (as recorded for 10.1) |
| ch10/10.3/text.html | Example 10.6 solution, "The graph of the vapor pressure of water versus temperature in Figure 10.24" | written 图 10.24 中水的蒸气压–温度曲线, the `water` ref span wrapping 水的蒸气压–温度曲线 and the `temperature` span inside it | "versus" has no Chinese preposition; the Chinese names a curve by "Y–X 曲线" (as 压强–温度平衡曲线 in 10.4); the same two spans |
| ch10/10.3/text.html | Example 10.8, "What is the boiling point of benzene in Denver, where atmospheric pressure = 83.4 kPa?" | written 在大气压强 = 83.4 kPa 的丹佛，苯的沸点是多少？ (the pressure span before the boiling-point span) | the relative clause "where …" becomes a modifier of Denver in Chinese; both spans stay in the block |
| ch10/10.3/text.html | Example 10.5 first sentence | the `structural-formula` span before the `ref` span (已知这四种化合物的结构式) | the possessive order of the Chinese phrase; spans stay in the block |
| ch10/10.3/text.html | `\text{or}` in the display of Example 10.8 | written `\text{346.9 K 或}` | word in `\text{}` (translate.md 5) |
| ch10/10.3/text.html, ch10/10.3/section.json | feet, "10,200 feet", "5000 feet" | 英尺 | unit with no SI symbol takes the Chinese name in prose (4.4) |
| ch10/10.3/text.html | "10 minutes", "Thirty minutes later" | 10 分钟, 三十分钟后 | unit word with no symbol in the source (4.4) |
| ch10/10.3/text.html | "octane-rating system for gasoline" (Example 10.7) | written 汽油辛烷值评定体系 | the Chinese says the system of evaluating 辛烷值 |
| ch10/10.3/text.html | thermos bottle, mothballs, base camp, Ft. Davis, Texas, Boston, Mount Everest | 保温瓶, 樟脑丸, 大本营, 得克萨斯州戴维斯堡, 波士顿, 珠穆朗玛峰 | cultural and place names translated for meaning (4.4); the rows are in glossary-pending.json |
| ch10/10.3/text.html | alt of Figure 10.26 "negative 12.0 degrees C", "degrees C" | 零下 12.0 摄氏度, 0.0 摄氏度 | spoken form in the alt text, with the glossary 摄氏度 |
| ch10/10.3/text.html | alt of fig-structures, `labeled “ethylene glycol,` (opening quote never closed) | written with both quotes: 标为“乙二醇” | the unbalanced quote has no Chinese form to carry |
| ch10/10.3/text.html, ch10/10.3/section.json | photo credits (Figures 10.25, 10.26, 10.27) | （来源：“Kullez”/Flickr）, （来源：改编自 Mark Ott 的作品） | the book's one credit formula (ch01 records) |
| ch10/10.3/text.html, ch10/10.3/section.json | every figure citation in prose ("Figure 10.24") and the part labels (a)–(e) | 图 10.24; full-width （a）…（e） | recorded once per book (translate.md 4.6) |
| ch10/10.3/section.json | e1 / e2 solution "The solution remains at 0 °C" | written 溶液, as the book words it | the book's own wording (an ice and water mixture called a solution) stays |
| ch10/10.3/section.json | cyl1 and e21 subscripts `P<sub>methanol</sub>` … `P<sub>butanol</sub>`, `Δ<em>H</em><sub>fusion</sub>`, `Δ<em>H</em><sub>vaporization</sub>` | P<sub>甲醇</sub> … P<sub>丁醇</sub>, Δ<em>H</em><sub>熔化</sub>, Δ<em>H</em><sub>汽化</sub>; `ΔH<sub>vap</sub>` in the hint of cyl3 kept | the subscript is an English word of the exercise (labels), the abbreviation vap is a symbol |
| ch10/10.3/section.json | derivation clausius-clapeyron-two-point, step 0 text "the power to which e must be raised to equal it" | written 使 e 的幂等于该数所需的指数 | the English idiom of a logarithm rebuilt for Chinese |
| ch10/10.3/section.json | derivation `src` values "Appendix B", "5.3, Hess’s law" | 附录 B, 5.3，盖斯定律; numbers such as "10.3" kept | words of a source label (translate.md 5) |
| ch10/10.3/figures.js | `LIQ` names, `cap(q.name)` | the four names written 乙醚, 乙醇, 水, 乙二醇; `cap` kept (the first letter of a Chinese name has no case) | the code looks the name up only for display; `ref` ids unchanged |
| ch10/10.3/figures.js | sim-vapor hover name `'a ' + nm`, `nm = name + ' molecule, ' + formula` | `nm = name + '分子，' + formula`, hover is `nm` without the article | English "a/an" article has no Chinese form (4.1) |
| ch10/10.3/figures.js | sim-vapor topline templates and readout (`${name} at 20 °C has…`, `${name}: molecules leave…`) | rebuilt in Chinese word order with the same slots (`${name}在 20 °C 时的蒸气压只有…`, `${name}：…`) | English sentence frame (4.1) |
| ch10/10.3/figures.js | sim-ke topline `At ${tk} K, … times the fraction at 300 K.` | written `在 ${tk} K 时，… 是 300 K 时该比例的 … 倍。` | Chinese word order, same slots |
| ch10/10.3/figures.js | sim-ke readout `\text{fraction with } KE \ge … :\ X\ \text{at}\ T = …,\ Y\ \text{at}\ 300 K` | written `\text{具有 } KE \ge … \text{ 的分子所占比例：} X (T = …), Y (300 K)`; "at" becomes the parenthesis | the English "at" has no neutral Chinese particle inside a formula line |
| ch10/10.3/figures.js | sim-bp topline `${q.name} boils at …, off the right of the graph` | `${q.name}在 … °C 沸腾，位于图的右侧之外` | Chinese word order, same slots |
| ch10/10.3/figures.js | sim-ladder `[[ys,'solid'],[yl,'liquid'],[yg,'gas']]` | 固态, 液态, 气态 (states) where the glossary has 固体, 液体, 气体 | the labels name the state of the substance on the energy ladder (as sim-states of ch01 1.2); `fusion, ΔH_{fus}` is written 熔化，ΔH_{fus} |
| ch10/10.3/figures.js | sim-heat `WORD`, `verb = up ? 'added' : 'removed'`, `kinds`, topline templates | `NAME[ph]正在升温/降温`, `verb` 加入/移出 inside `共${verb}热量 … kJ：…` and `已${verb}热量 … kJ，共 … kJ：…`; `kinds` built from 加热/冷却 + NAME with the separator `', '` written `'、'` | English participle phrases and "All X kJ added" cannot carry the slots in the same order (4.1) |
| ch10/10.3/figures.js | sim-heat readout `\text{total}` subscript | `\text{总}` | a subscript wants the shortest form (4.7) |
| ch10/10.3/text.html | display math of Example 10.10 and the phase-change equations: `{\kq}_{\text{total}}`, `_{\text{ice}}`, `_{\text{water}}`, `_{\text{steam}}`, `\kdH_{\text{con}}`, `_{\text{frz}}`, `_{\text{dep}}` | the words inside `\text{}` written `_{\text{总}}`, `_{\text{冰}}`, `_{\text{水}}`, `_{\text{水蒸气}}`, `_{\text{凝结}}`, `_{\text{凝固}}`, `_{\text{凝华}}`; `\text{mol}`, `\text{g}`, `\text{ln}` and the macros stay | the subscripts are English words a reader sees (4.7), as the figure readout writes `\text{总}` |
| ch10/10.1/figures.js, ch10/10.3/figures.js, ch10/10.5/figures.js, ch10/10.6/figures.js | 3D view buttons `front`, `corner` | one label per English word: 正视, 斜视 | the Chinese for a view from a corner; no standard word; the pages had 斜角 / 斜视 and 正视 / 正面; the global merge made the series 正视 / 俯视 / 侧视 / 斜视 book-wide |
| ch10/10.3/text.html | `ref` spans on pronouns and demonstratives (它, 它的, 这种分子, 其, 这四种物质, 每种液体 …) | the span wraps the Chinese words that carry the same reference, which differ in length from the English ("this molecule", "each of the four") | Chinese word order and article-free grammar |
| ch10/10.3/text.html, ch10/10.3/section.json | `force`, `type`, `energy`, `temperature` and `pressure` spans around phrases | the span wraps the translated phrase that carries the same meaning, in Chinese order | translate.md 3.3 |
| ch10/10.3/figures.js | sim-sublimation labels `solid`, `liquid`, `gas` | written 固态, 液态, 气态 | the energy levels name the state of the sample, as in ch01 sim-states |
| ch10/10.3/section.json | derivation enthalpy-of-sublimation, `tex` `\text{solid}`, `\text{liquid}`, `\text{gas}` | written `\text{固态}`, `\text{液态}`, `\text{气态}` | words inside `\text{}` are translated (5); the subscript names the state |
| ch10/10.3/section.json | exercise cyl4 solution `30.1 kPa` | kept | pure math and a unit, nothing to translate |

### ch10/10.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.4/text.html | `temperature` and `gas-pressure` spans in "critical temperature", "critical pressure", "Critical Temperature (°C)" | the span wraps 温度 and 压强 inside 临界温度 and 临界压强 | the English adjective is a separate word, the Chinese a prefix of the compound; the span stays in its block (translate.md 3.3) |
| ch10/10.4/text.html | `melting` and `freezing` spans in "melting (or freezing) point", "melting points, sublimation points", "sublimation, or deposition, points" | written 熔点（或凝固点）, 熔点, 升华点, 升华点或凝华点, the spans on 熔点, 凝固点, 升华, 凝华 | the span wraps the whole Chinese compound (熔点 for melting, 凝固点 for freezing), as in 10.3 and 10.5; 熔化点 is not a standard term |
| ch10/10.4/text.html | `solid` span in "solid carbon dioxide" (carbon-dioxide paragraph) | written 固体二氧化碳 with the span on 固体 | the span needs the glossary word 固体; elsewhere (figures.js) the state is written 固态二氧化碳 |
| ch10/10.4/text.html | `liquid` span in "liquid and vapor phases", "liquid state", "liquid water", "liquid CO2" | written 液相, 液态, 液态水, 液态 CO2 with the span on the whole compound (液相, 液态) | the standard words; as in ch10/10.3, which wraps 液相 and 液态 |
| ch10/10.4/text.html | Figure 10.32, 10.33, 10.35 credits | （来源：ʺlwaoʺ/Flickr）, （来源：NASA）, （来源：改编自“mrmrobin”/YouTube 的作品）; the printed quote marks of ʺlwaoʺ kept | one formula for credits (ch01 decision); names kept as printed |
| ch10/10.4/text.html | Figure 10.33 caption, "Perito Moreno glacier" | 佩里托·莫雷诺冰川（Perito Moreno） | name of a place without a fixed Latin form for the reader; Latin kept once |
| ch10/10.4/text.html | `data-ref` spans on "The curve BC in Figure 10.31", "The solid-vapor curve, labeled AB in Figure 10.31" | written 图 10.31 中的曲线 BC, 图 10.31 中标为 AB 的固–蒸气曲线, the span around the whole phrase as in the source | Chinese puts the location before the noun; the span stays in its block |
| ch10/10.4/text.html | "ice" and "water" region labels, "freeze-drying" | “冰”, “水” in Chinese quotes, 冷冻干燥 in quotes | the labels name regions of Figure 10.31, which the app draws in Chinese |
| ch10/10.4/text.html | "vaporization-condensation equilibrium" | written 汽化–凝结平衡, the `chemical-equilibrium` span on 平衡 | Chinese order; glossary rows 汽化 and 凝结 |
| ch10/10.4/text.html | "(Figure 10.35)" and "(c and d)" | 图 10.35 and （c 和 d） | 图 N.M for figure citations (ch01); full-width part labels |
| ch10/10.4/text.html | caption of Figure 10.36 and the decaffeination box | "decaffeinate" and "decaffeinated" written 脱除咖啡因, 脱除咖啡因的咖啡 | no single Chinese verb; glossary row decaffeination 咖啡因脱除 is the noun |
| ch10/10.4/text.html, ch10/10.4/section.json, ch10/10.4/figures.js | English plurals "temperatures", "pressures", "densities", "solvents", "compounds" | one Chinese form | English plural has no Chinese form (4.1) |
| ch10/10.4/text.html | CH<sub>2</sub>Cl<sub>2</sub> and CH<sub>3</sub>CO<sub>2</sub>C<sub>2</sub>H<sub>5</sub> after the names | written in parentheses after 二氯甲烷 and 乙酸乙酯 with a space inside the half-width brackets, as printed | the formulas stay as in the source |
| ch10/10.4/text.html | image alt text of Figure 10.36 "supercritical CO2" | CO2 kept as the alt prints it (no subscript, plain text attribute) | alt text is plain text |
| ch10/10.4/figures.js | `NAMES`, melting/freezing, vaporization/condensation, sublimation/deposition | written 熔化/凝固, 汽化/凝结, 升华/凝华; only the first of each pair is shown on the figure | glossary rows; the English "vaporization" is 汽化, not 沸腾 |
| ch10/10.4/figures.js | `S.*.s`, `.l`, `.g`, `.name` | 冰, 液态水, 水蒸气; 固态二氧化碳, 液态二氧化碳, 气态二氧化碳; names 水, 二氧化碳; the English articles and "gaseous" dropped | English article grammar collapses to one Chinese form (4.1); a state of a sample takes 态, as in ch01 1.2 |
| ch10/10.4/figures.js | `H` headline templates | rebuilt in Chinese order with the same slots (`在 ${Tw} 和 ${Pw} 时，…`); "is a solid/liquid/gas" → 是固体/液体/气体; "is deposited" → 凝华; "boils or condenses" → 沸腾或凝结 | English sentence frame cannot carry the slots in the same order; "deposited" is the glossary 凝华 |
| ch10/10.4/figures.js | `bandName`, `.join(' over ')` | `.join('，其下为')`, giving 气体，其下为液体，其下为固体 | "gas over liquid over solid" has no Chinese preposition with the same shape for a list; the order top to bottom is kept |
| ch10/10.4/figures.js | `PH.triple`, `\text{solid},\ \text{liquid},\ \text{gas}` | `\text{固体、液体、气体}` | the ASCII comma and the thin spaces are replaced by the Chinese enumeration comma, inside `\text{}` |
| ch10/10.4/figures.js | `text(ctx, s.mol + ' molecules in the sample', …)` | `'样品中的 ' + s.mol + ' 分子'` | the English prepositional phrase becomes a modifier before the noun; code shape kept |
| ch10/10.4/figures.js | `heat` templates "Heated at ${Pw}, below the triple-point pressure, …" | `在 ${Pw} 下加热，该压强低于三相点压强，…`, with the same slots | the apposition becomes a clause in Chinese |
| ch10/10.4/figures.js | `cap(heat)` | untouched | capitalising the first letter has no effect on Chinese and the call stays valid |
| ch10/10.4/section.json | e1 solution, "(a) liquid; (b) solid; …" | 液体, 固体, 气体 in prose; "(a)" labels full-width | the words name states in the answer |
| ch10/10.4/section.json | cyl1, cyl2 and e4 solutions: "s ⟶ g", "l ⟶ g", "torr" | kept | state symbols and the unit symbol torr are kept as printed (glossary note torr) |
| ch10/10.4/section.json | `notes` and `exercise_notes`: "Link to Learning", "Bloom levels", "Check Your Learning" | 学习链接, 布鲁姆层级, 学习检测 | the apparatus wording of translation-notes (布鲁姆层级, 书后答案, 建议思路, OmniStax 自拟, 容差) |
| ch10/10.4/figures.js | region labels, the `WORD` map and the `PH` readout (solid, liquid, gas) | 固态 / 液态 / 气态, the same as 10.1 and 10.3; the headline predicates stay 是固体 / 液体 / 气体 | chapter-1 decision: a state takes 态 as a label; the predicates are nouns |

### ch10/10.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.5/text.html | span `temperature` on 室温 (Mercury is a liquid at room temperature) | the span wraps 室温, the compound that contains 温度's word | the source wraps one English word of "room temperature"; Chinese names it in one word (translate.md 3.3) |
| ch10/10.5/text.html | spans `melting` on 熔点 (ionic solids, metallic solids, covalent network solids, molecular solids; 6 spans) | the span wraps 熔点, the word whose first character is the concept's 熔 | the source wraps "melting" in "melting points"; Chinese has 熔点, not 熔化 + 点 |
| ch10/10.5/text.html | span `oxide` on 氧化镍 (nickel oxide) | the span wraps 氧化镍 | Chinese names the compound in one word; the source wraps "oxide" |
| ch10/10.5/text.html | span `molecular-compounds` on 共价化合物 (covalent compounds) | the span wraps the whole compound 共价化合物 | the source wraps "covalent compounds"; kept as the book's span |
| ch10/10.5/text.html | span `dissolved` on 溶解 (conduct when molten or dissolved) | the span wraps 溶解 | the glossary target 溶解的 (adjective) does not fit the Chinese phrase 熔融或溶解时 |
| ch10/10.5/text.html | spans `heat-flow` on 热 (conducts heat and electricity; conductor of electricity and heat) | 热 used (导热、导电性能好; 电和热的良导体; 能导热、导电) so the span sits on 热, not on 热量, which is the heat quantity | the glossary binds a heat quantity to 热量 (chapter-1 decision), and the book speaks of conduction, not of a quantity; 传导热量 is unidiomatic |
| ch10/10.5/text.html | figure 10.43 photo credit | `（来源：左图：改编自 … 的作品；中图：改编自 … 的作品）`, names kept | lettered credit formula of chapter 1 adapted to the book's "left photo / middle photo" |
| ch10/10.5/text.html, ch10/10.5/section.json | "(much)", "Covalent Network Solid"/"Molecular Solid" singular headers | no change to sentence; notes translated as the source's | none |
| ch10/10.5/figures.js | `a`/`an` articles in hover names and select labels (`a sodium ion, Na⁺` and 7 more) | collapsed to one form 名称，符号 (钠离子，Na⁺, 氧原子，O ...), the format of 10.1 and 10.6 | English article grammar (translate.md 4.1) |
| ch10/10.5/figures.js | plural/`of N links broken` readouts; `... away` in the graphene readout | `n of N links broken` became "N 个键中断开 n 个"; ` away` dropped into 相距约 X | Chinese word order (4.1) |
| ch10/10.5/figures.js | `ro` strings with `melts at`, `melts above` | the unit part kept in math, the words moved around it: `在 X 熔化` | Chinese word order (4.1) |
| ch10/10.5/figures.js | graphene 3D view labels `face on`, `edge on` | 面视, 侧视 | one English word per label (正视 stays for `front`, 侧视 for `side`/`edge on`) |

### ch10/10.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.6/text.html | `length` spans on 棱长 (10: simple cubic, Example 10.14 to 10.15 and 10.18, ionic cells, ionic radii) | the span wraps 棱长, the compound that holds 长度's word; where the source says "lengths of three axes" and "length of the diagonal" the span wraps 长度 | the source wraps one English word of "edge length"; Chinese names it in one word (ch01 decision, translate.md 3.3) |
| ch10/10.6/text.html | `temperature` span in "Fe at room temperature" | the span wraps 室温 | ch01 decision (the source wraps one word of "room temperature") |
| ch10/10.6/text.html | `tetrahedral-geometry` (12) and `octahedral-geometry` (9) spans before `crystal-hole` | the spans wrap 四面体 and 八面体, the span of `crystal-hole` wraps 空隙: 四面体空隙, 八面体空隙; "tetrahedral or octahedral holes" written 四面体或八面体空隙 with the three spans on 四面体, 八面体 and 空隙 | the glossary targets of the concepts are 四面体形 and 八面体形 (molecular geometry), but the hole is 四面体空隙 and 八面体空隙 (glossary rows); 四面体形空隙 is not Chinese; the source's three spans are kept |
| ch10/10.6/text.html | `oxide` spans: "aluminum oxide" (3), "oxide ions" (2, Example 10.17) | the span wraps the compound name 氧化铝; in 氧离子 the `oxide` span wraps 氧 and the `ion` span wraps 离子, side by side | Chinese names the compound and the ion in one word each (ch01 decision for oxide compound names); the glossary row oxide ion is 氧离子 |
| ch10/10.6/text.html | `stoichiometry` spans (3) | the span wraps 化学计量; "their stoichiometries" and "1:1 stoichiometry" take the singular noun | English plural collapses (4.1); 化学计量 is the ch09 row, the concept name is still English in book.json |
| ch10/10.6/text.html | `isomorphous` span, "Isomorphous metals with a BCC structure" | written 具有 BCC 结构的同晶型的金属, the span on 同晶型的 | the glossary target is the adjective 同晶型的 |
| ch10/10.6/text.html | `wave` spans (7) | the span wraps 波 inside 电磁波, 散射波 and 衍射波 | Chinese compounds the noun with its modifier; the concept name is still English in book.json |
| ch10/10.6/text.html | `ion` spans on 离子 in 氯离子, 硫离子, 钠离子 ... and `cation:anion` ratio | the span wraps 离子 only; the ratio written 阳离子:阴离子 | Chinese names the ion in one word (ch01 compound rule); the ratio colon is kept ASCII as in a ratio |
| ch10/10.6/text.html | `unit-cell` span in "primitive cubic unit cell" | written 素立方晶胞 with the span on 晶胞 only | the glossary row for the primitive cell is 素立方晶胞 (concept 简单立方晶胞) |
| ch10/10.6/text.html | Example 10.14 and 10.15, "the density of $\text{Po}=…$" and "$\text{Ca}\;=…$" | written 密度 $\text{Po}=…$ and 密度 $\text{Ca}\;=…$, the math unchanged | the source puts the symbol Po (Ca) inside the math, LaTeX outside \text{} is kept |
| ch10/10.6/text.html | math in Examples 10.14, 10.15, 10.18: `\text{1 Po unit cell}`, `\text{1 Po atom}`, `\text{Po atoms}`, `\text{4 Ca atoms}`, `{\text{for a Cl}}^{\text{−}}\;\text{radius}`, `\text{197.6 pm for a Ca radius}` | written `\text{1 个 Po 晶胞}`, `\text{个 Po 原子}`, `{\text{为 Cl}}^{\text{−}}\;\text{的半径}`, `\text{197.6 pm 为 Ca 的半径}` | Chinese needs the measure word 个 and puts 的半径 after the ion; the math outside \text{} and the unit symbols are as printed |
| ch10/10.6/text.html | "W. H. Bragg" | written W. H. 布拉格 | the initials have no Chinese rendering; the surname follows the glossary (布拉格方程, 威廉·亨利·布拉格) |
| ch10/10.6/text.html, ch10/10.6/section.json | "(8 × 1/8 = 1 atom from the corners)", "(6 × 1/2 = 3 atoms from the faces)" with the ASCII "(" inside the math (4 in text.html, 2 in e7 answer) | the "(" of the math dropped: （顶角上共有 $8\;\times\;\frac{1}{8}\;=1$ 个原子） | the full-width （ now opens the parenthesis (3.5), and the ASCII "(" inside the math would be left unmatched |
| ch10/10.6/text.html | Examples 10.14 and 10.15 (b), "Density is given by $\text{density}=\frac{\text{mass}}{\text{volume}}.$" | the sentence-final "." inside the math dropped: …{\text{体积}}$ 给出。 | the Chinese verb 给出 now follows the formula, so the stop would stand before it |
| ch10/10.6/text.html | alt of fig-diffractometer: "X dash ray source", "X dash ray beam" | written X 射线源, X 射线束 | the source spells the hyphen of X-ray as "dash" in the alt text (a speech-reader artifact); Chinese 射线 needs no hyphen |
| ch10/10.6/text.html | figure 10.66 photo credit | `（来源：National Institutes of Health）`, name kept | ch01 credit formula; the organisation is not translated (translate.md 5) |
| ch10/10.6/text.html | "module" ("In this module, we will explore…") | written 在本节中 | the book's "module" is the section |
| ch10/10.6/section.json | notes | the four English quotations ("19.26 g/cm", "What it the formula", "the formula for thallium is TlI", "occupied the same cites") kept in English inside the Chinese sentence, and the sentence ends "以上四处在英文原书中均照原样印出" | the note is about the English source's misprints; the two wording slips (What it, cites) cannot be reproduced in Chinese, the exercises translate their meaning (cyl3 硒化锂的化学式是什么, e18 相同的位置), while "g/cm" (footnote c-e7-cm3), TI⁺ (c-e21-tl) and the wrong "formula for thallium is TlI" (e14) are kept as the book has them |
| ch10/10.6/section.json | e14 solution: "can be occupied be a cation" | written 可被阳离子占据 | the English slip "be" for "by" has no Chinese form |
| ch10/10.6/section.json | e16 prompt: "percent by mass" | written 质量分数 | GB 3102.8 name of the quantity; the English `answer.parts[].part` labels stay as printed (ch01 owner note) |
| ch10/10.6/section.json | referents, original_caption | the original captions are the same strings as the `data-original-caption` of text.html, and "(Figure 10.46)" becomes （图 10.46） | one translation of each caption in both places |
| ch10/10.6/figures.js | CELLS `touch` strings and the `cubicFigure` headline | the `touch` strings are whole predicates (沿晶胞的每条棱相互接触 …) and the three headline templates are rewritten in Chinese word order with the same slots (`q.cn`, `q.n`, `q.name`, `q.metalName`) | English phrase "the atoms touch ${touch}" cannot carry the Chinese order (4.1) |
| ch10/10.6/figures.js | `${q.n} ${q.n === 1 ? 'atom' : 'atoms'}` | collapsed to ` 个原子`; the three `\text{atom}` / `\text{atoms}` of the readouts to `\text{个原子}` | English plural branch (4.1) |
| ch10/10.6/figures.js | topline of sim-density: `m.name[0].toUpperCase() + m.name.slice(1)` and `q.touch.split(',')[0]` | the capitalisation dropped (`${m.name}`) and the split made on the full-width comma `q.touch.split('，')[0]` | English capitalisation has no Chinese form; the touch strings use the Chinese comma (4.1) |
| ch10/10.6/figures.js | sim-lattices: `nameOf`, `kind`, new `SYSN` table, `cap(sys)` in the readout | the system names (cubic, tetragonal, …) are shown through a new map `SYSN` (立方, 四方, 正交, 单斜, 三斜, 六方, 菱方); the centering goes before the system (体心立方, not "cubic, body-centered"); the readout `\text{${SYSN[sys]}晶系：}` replaces `\text{${cap(sys)}:}` | the keys are English identifiers used by the code; Chinese order and no capitalisation (4.1) |
| ch10/10.6/figures.js | sim-packing: `'layer ' + x` and `an atom of layer ${…}` | written `x + ' 层'` and `${…} 层的一个原子` | Chinese word order and the article (4.1) |
| ch10/10.6/figures.js | sim-holes headline: `The ${cat} sits in ${a/an} ${hole} hole, among ${n} ${an}s at the corners of ${a/an} ${shape}.` | `${cat}位于${hole}空隙中，处在${shape}顶角上的 ${n} 个${an}之间。` | article and plural grammar built by rule, Chinese word order (4.1) |
| ch10/10.6/figures.js | sim-ionic: `${ION[ion][1]}, ${share(f)}` and the four `say` sentences | the separator is the Chinese comma; each `say` sentence in Chinese order | Chinese punctuation and word order (4.1) |
| ch10/10.6/figures.js | sim-bragg topline: `The lower ray travels X wavelengths farther, ${verdict}.` | `下方射线多走 X 个波长，${verdict}。` with each verdict a full clause (这是整数个波长，所以…) | the English appositive phrase cannot be kept as a phrase (4.1) |
| ch10/10.6/text.html | sentence-final `.` and `,` inside the math of Examples 10.14 to 10.18 (`=\text{168 pm}.$`, `\text{O}.$`, `\times \;2,$ 即`) and the `\text{… 为 Ca 的半径}` tails | the `.` / `,` taken out of the math and 。 / ， put after the closing `$` (the display equation of Example 10.18 ends without a stop); `\text{197.6 pm，即 Ca 的半径}`, `{\text{，即 Cl}}^{−}\;\text{的半径}`; the same in the e16 and e18 answers of section.json | the ASCII stop inside the math would end a Chinese sentence (translate.md 3.5); 为 after an equals sign reads as a second predicate |
| ch10/10.6/text.html | Bragg paragraph, "shows diffraction and a different angle that does not satisfy the Bragg condition" (the book's "and" is a slip for "at") | written 下图则表示以不满足布拉格条件的另一角度发生的衍射 | the slip is rendered by its meaning, as the "be" of e14 is; the `diffraction` and `angle` spans are kept |
| ch10/10.6/text.html | Examples 10.14 and 10.15, "Therefore, the density of Po = …" | kept as 因此，密度 $\text{Po}=…$ | moving Po out of the math would edit math outside `\text{}` (translate.md 3.5); the reviewer's 因此，Po 的密度 = … is left for the owner |

### Chapter 10: Other things for the owner

| Item | What | Owner action |
|---|---|---|
| `glossary.zh-CN.json` | 332 rows, 116 with `"confirm": "termonline"` (not looked up at termonline.cn) and 25 with `"confirm": "owner"` (people, institutions, a place, a brand and a few literal renderings: 水槽, 凹处, the four element-family labels) | confirm at termonline.cn and add the entry URLs; people's names have no standard rendering |
| `glossary.zh-CN.json` | 10 pending rows were not added: 7 already exist with the same target in other chapters' chapter glossaries (purine, amino acid, titanium tetrachloride, system, ethyl acetate, ball-and-stick model, pigment), beaker is in the shared glossary, London forces and chaulmoogra oil were given by two pages or already in the chapter glossary | none; if another chapter glossary's row is changed, change ch10's pages too |
| 10.1 | London forces is 伦敦色散力 (the book's short form, the Example 10.1 title included), the same target as London dispersion forces | Resolved in the global merge (2026-10-27): ch10 wrote 伦敦力 for the short form; ch18 wrote 伦敦色散力 for both; one target, swept (the span of 10.1 reads 伦敦色散<span>力</span>) |
| 10.1 section.json | the book's own slips are kept: Example 10.3 gives the boiling point of ethanol as 78.4 °C in the problem and 78.5 °C in the solution; the answers to the dispersion, dipole and hydrogen-bond exercises write ICl as "ICI" | correct upstream if wanted |
| intro section.json | the unclosed parenthesis before "反复酸化" in the intro is kept as the book prints it | none |
| 10.1 section.json | the PhET states-of-matter simulation and the gecko video "Link to Learning" boxes are dropped; the simulation exercise fs-idm78391360 is deferred | none |
| 10.2 section.json | the surface tension, density and contact angle of mercury and the densities of ethanol and ethylene glycol used in the interactive figure are handbook values the book does not give; exercise fs-idp26872272 has no answer and is dropped | check the handbook values |
| 10.3 section.json | Example 10.5's Check Your Learning table is printed with the 20 °C of its cells although the book's summary says 25 °C; the answer of Example 10.7 is printed as the book gives it (41.4 kJ/mol**); the normal boiling points of ether, ethanol and ethylene glycol and the vaporization enthalpies of ether and glycol in Figures 10.22 and 10.24 are handbook values; three unanswered numerical exercises (38, 42, 52) are dropped | check the handbook values |
| 10.4 section.json | Figures 10.30, 10.31 and 10.34 are one scaled phase diagram drawn from measured vapor pressures, so the temperatures along the paths of the first two Check Your Learning questions differ from the book's answers, which are printed as the book gives them; the critical-point table cells are in °C and kPa although the book's description gives K and atm; the carbon exercise's answer figure labels the regions "water", as the book does | none |
| 10.5 | the singular headings "Covalent Network Solid" and "Molecular Solid" are plural (共价网状固体, 分子固体); the melting point of crystalline SiO₂ (1713 °C) and the softening of fused silica (about 1100 °C) are handbook values | none |
| 10.2 section.json | the answer of exercise e4 ends "so the less viscous the liquid" in the book (it means more viscous); kept as 黏度越小, with no footnote because the source has none and a new footnote id fails the id parity | correct upstream if wanted |
| 10.6 section.json | the book's English slips are kept: the answer for tungsten "19.26 g/cm", the Check Your Learning "What it the formula", exercise 91's "the formula for thallium is TlI", exercise 95's "occupied the same cites"; seven numerical exercises (82, 84, 86, 98, 100, 102, 104) have no answer and are dropped | correct upstream if wanted |
| every page | English kept: names of people in credits and captions that have no standard rendering (Alex Greaney, Congcong Hu), organisations in credits, handles (Flickr, YouTube), the acronyms IMF, KE, DNA, RNA, VSEPR, BCC, FCC, CCP, HCP, the brand VELCRO (as VELCRO 牌尼龙搭扣), the `PH` of the phosphine formula (`ph` span kept on the source's two letters), eyebrows `Figure` and `Sim`; the figure citations 图 N.M are not yet links | none |
| Figure eyebrows | the English `Figure N.M` and `Sim` are kept because the checker matches them | the app localises them |

## Chapter 11 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows (`Figure 11.1` to `Figure 11.37`, `Figure 11.24 + 11.25`, `Figure 11.31 + 11.32`, `Sim`, the bare `Figure`) | kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch11/11.1/text.html, ch11/11.4/text.html, ch11/11.5/text.html | table eyebrows (4: Table 11.1 to 11.4) | written 表 11.1 to 表 11.4 | translate.md 5 lists a table's eyebrow as translated; `ost check` and `translation_parity.py` read only the Figure and Sim eyebrows (as ch01) |
| every text.html, ch11/11.4/section.json | photo credits (18 in the text.html files, 1 more inside a figure's `original_caption`) | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X", lettered （来源 a：…；b：…） and （来源 a/b/c：…）; names and organisations kept as printed (Wikimedia Commons, USFWS, NASA in English); a name in quotation marks follows 改编自 without a space (改编自“Velela”/Wikimedia Commons 的作品), a name without quotes with one | the ch01 formula (translate.md 5); the pages first wrote a space before some opening quotation marks (11.5, intro), swept in the merge |

### ch11/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/intro/text.html | `less <span data-concept="soluble">soluble</span>`, `coral polyps are <span data-concept="soluble">soluble</span> in` | span wraps 可溶 (concept term is 可溶的) | 氧变得不那么可溶 / 可溶于 cannot carry the particle 的; span kept in its block |
| ch11/intro/text.html | `<span data-concept="acidic-solution">acidic</span>` | span wraps 酸性 (glossary 酸性的) | 酸性溶液 is a compound; 的 does not occur |
| ch11/intro/text.html | `the atmosphere` inside data-type="concentration" | span wraps 大气 (concept name 地球大气, term 大气) | Chinese "大气中" |

### ch11/11.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.1/text.html | `<span data-concept="solid">solid</span> <span data-concept="mixtures">solutions</span>` (alloys paragraph) | written 固态溶液, the two spans on 固态 and 溶液, instead of the row 固溶体 | the source wraps "solid" and "solutions" in two spans; 固溶体 cannot be split over two concepts (translate.md 3.3, no span dropped or moved) |
| ch11/11.1/text.html | `<span data-concept="liquid">liquid</span> <span data-concept="mixtures">solutions</span>` | the liquid span wraps 液态 (not 液体) | the row liquid solution is 液态溶液; 液体溶液 is not the Chinese form |
| ch11/11.1/text.html | `<span data-concept="carbonate">carbonate</span>` in "Calcium carbonate"; `<span data-concept="hydroxide">hydroxide</span>` in "sodium hydroxide"; `<span data-concept="nitrate">nitrate</span>` in "Ammonium nitrate" | the span wraps the whole compound name 碳酸钙, 氢氧化钠, 硝酸铵 | Chinese names each compound in one word whose parts cannot be separated (same as the chapter 1 compound-name spans, translate.md 3.3) |
| ch11/11.1/text.html | span `data-concept="alcohol"` | "alcohol (a liquid)" is 酒精 (everyday word of the shared row alcohol); "the alcohols methanol and ethanol" is 醇 (class, glossary row alcohols of ch10/ch12) | one concept id, two senses in the source that Chinese names differently |
| ch11/11.1/text.html | `<span data-concept="hydrocarbon">hydrocarbons</span>`, `<span data-concept="alcohol">alcohols</span>` | the plural noun phrase "the alcohols methanol and ethanol" is written 甲醇和乙醇这两种醇 (the class word after the examples) | Chinese does not put a class name before its members as an apposition; the span stays on 醇 and 烃 |
| ch11/11.1/text.html | `<span data-type="volume">a <span data-concept="volume">volume</span> twice as large as that which each occupied before mixing</span>` | the type span wraps 是混合前各自所占体积的两倍, the volume span 体积 inside it | the Chinese predicate puts the number of times last; the type span stays on the same clause |
| ch11/11.1/text.html | "intermolecular forces of attraction" (ideal paragraph, twice) | 吸引性分子间作用力, the span on 分子间作用力 | the span `intermolecular-force` wraps "intermolecular forces" only, and "of attraction" has no span; Chinese says the same as an attributive 吸引性 |
| ch11/11.1/figures.js | `topline(ctx, cock.value === 'closed' ? … : he + ' of 30 helium atoms and ' + ar + ' …')` (sim-he-ar) | the second branch now begins with a string, `'30 个氦原子中有 ' + he + ' 个、30 个氩原子中有 ' + ar + ' 个已进入另一个玻璃泡。'` | the Chinese sentence puts the counts after the numerals "30 个氦原子中有"; same values, different order (translate.md 4.1) |
| ch11/11.1/figures.js | `hits.push({ …, name: 'a ' + kind + ' particle' })` (sim-steps) | `name: kind === 'solute' ? '溶质粒子' : '溶剂粒子'` | the English name is built from the internal key `kind` ('solute'/'solvent'), which cannot be concatenated into Chinese; the key is still used for colours (translate.md 4.1) |
| ch11/11.1/figures.js | `GAS[f].word + ', ' + l + ' left and ' + r + ' right'` | `GAS[f].word + '：左 ' + l + ' 个，右 ' + r + ' 个'` | English "N left and M right" has no plural branch; the Chinese measure word 个 is one form (4.1) |
| ch11/11.1/figures.js | `\kdH_{\text{soln}}` in the sim-steps readout | `soln` kept | the subscript is a symbol abbreviation of the book (ΔH_soln), as the symbol table's own subscripts (sub, fus, vap) are kept in Latin |
| ch11/11.1/text.html | `$\text{Cr}_{2}\text{O}_{7}{}^{2-}.$` | the math kept with its full stop; the sentence is rebuilt so the formula ends it ("其组成为……离子 Cr2O7 2−。") and the next sentence follows | the source puts a full stop inside the math (ASCII inside math); a Chinese clause cannot carry on after it, so the sentence order is the source's with 其组成为 for "composed of" |

### ch11/11.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.2/text.html | covalent, `<span data-concept="hydroxide">hydroxide</span> <span data-concept="ion">ions</span>` | written `<span hydroxide>氢氧根</span><span ion>离子</span>` (glossary row hydroxide (ion) 氢氧根), not the concept name 氢氧化物 | Chinese names the ion 氢氧根离子; the concept word 氢氧化物 would name the compound class |
| ch11/11.2/text.html | covalent, `<span data-concept="molecular-compounds">covalent compounds</span>` | span wraps 共价化合物 (glossary row covalent compound), where the concept name is 分子化合物 | the source says "covalent compounds"; 分子化合物 would change the word |
| ch11/11.2/text.html | ionic, "Even sparingly, soluble ionic compounds" | <span soluble>可溶</span>性很小的离子化合物 | the source wraps "soluble" in "sparingly, soluble ionic compounds"; the span stays on 可溶 in its block, and 可溶性很小 renders "sparingly soluble" (the glossary row 微溶的 would read 微溶的可溶) |
| ch11/11.2/figures.js | MOL names, NAME, 'a water molecule … turned toward …' | articles dropped; the water-molecule name reordered to 水分子 H<sub>2</sub>O，以氧端朝向钾离子 / 以氢端朝向氯离子 | English article grammar and word order (4.1) |
| ch11/11.2/figures.js | topline of sim-hydration: `outK === 1 ? ' potassium ion' : ' potassium ions'` and the chloride twin | both branches collapsed to ' 个钾离子' / ' 个氯离子' and the sentence reordered (水已把 N 个钾离子和 M 个氯离子从晶体带入溶液) | English plural branch (4.1) |
| ch11/11.2/figures.js | sim-conductivity `s.ions + ' carry charge'` | ' 个带电荷' | Chinese measure word; sentence frame kept |
| ch11/11.2/figures.js | sim-conductivity pickable names 'the positive electrode' / 'the negative electrode' | 正极 / 负极 (glossary rows positive/negative electrode) | standard Chinese terms for the electrodes of the bench |
| ch11/11.2/figures.js | sim-conductivity bulb state 'bright' / 'dim' / 'dark' | 很亮 / 微亮 / 不亮 | adjectives of the bulb need a degree word in Chinese |

### ch11/11.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.3/text.html, ch11/11.3/section.json summary_html | spans on 吸引力 (`force`, 4 spans), 溶解氧 (`dissolved`), 硫酸 (`acid`, wraps 酸), 互溶度 (`solubility`, 4 spans: the lead sentence of Solutions of liquids in liquids, the immiscible paragraph twice and the summary), 硫酸铈 (`sulfate`, wraps 硫酸) | the span wraps the whole Chinese compound that contains the concept's word (or, for 硫酸铈, its sulfate part 硫酸), the concept words being 力, 溶解的, 酸, 溶解度 and 硫酸盐 | the source wraps one English word of "attractive forces", "dissolved oxygen", "sulfuric acid", "mutual solubility", "cerium sulfate"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| ch11/11.3/text.html, Example 11.2 | span `scientific-law` in "the Henry's law constant" | written 亨利定律常数 with the span on 定律, not the glossary's 亨利常数 | the source wraps only "law" inside the name, so 亨利常数 would leave the span without a word |
| ch11/11.3/text.html | "go flat" / "gone flat" | 跑气 | idiom of the soda with no Chinese equivalent word for word (translate.md 4.4) |
| ch11/11.3/text.html | Figure 11.12 caption, "A CO<sub>2</sub> vent" | written CO<sub>2</sub> 排气管, not the glossary's 二氧化碳排气管 | the source's `<sub>` must stay in the block; the glossary row is for the plain-text term |
| ch11/11.3/section.json | summary_html, "while those for most, but not all, solid solutes increase" | the pronoun "those" (= solubilities) is written 溶解度 again, without a `solubility` span | the source has five `solubility` spans there and "those" carries none; Chinese repeats the noun, the span count stays five (the first draft had six) |
| ch11/11.3/text.html | `hydroxide` span before `ion` | span wraps 氢氧根 (glossary row hydroxide (ion)), not the concept word 氢氧化物 | Chinese names the ion 氢氧根; 氢氧化物 would name the compound class (same as ch11/11.2 and 11.5) |

### ch11/11.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.4/text.html | spans on 体温 (`temperature`, Example 11.10), 岩盐 (`salt`, wraps 盐), 反渗透 (`osmosis`, wraps 渗透), 固相 (`solid`, wraps 固), 稀溶液 and 稀释 (`dilute`, wraps 稀 and 稀释), 浓盐溶液 and 较浓的溶液 (`concentrated`, wraps 浓), 普适气体常数 (`gas`, wraps 气体), 第 2 族 (`group-of-the-periodic-table`, wraps 族), 酸性 (`acidic-solution`), the `mole` spans in 摩尔分数 (wrap 摩尔), the `concentration` spans in 质量摩尔浓度 and 物质的量浓度 spelled out as 质量摩尔/物质的量 + 浓度 | the span wraps the Chinese word that carries the concept's word, or the whole compound that contains it (体温), not always the glossary row's full target (稀 and 稀释 for 稀的, 浓 for 浓的, 固 for 固体, 酸性 for 酸性的) | the source wraps one English word of "body temperature", "rock salt", "reverse osmosis", "solid and gaseous phases", "dilute", "concentrated", "universal gas constant", "group 2", "more acidic", "mole fraction", "molal concentration"; Chinese names each in one word or a compound (translate.md 3.3, the span stays in its block) |
| ch11/11.4/text.html | "a less concentrated solution", "from a less concentrated solution to a more concentrated solution", "(more pure)" in the Reverse Osmosis note and the hypotonic sentence | written 不太浓的溶液, with the `concentrated` span on 浓 | the source wraps "concentrated" in both comparatives; Chinese says 稀 for "less concentrated", which would leave the span without its word |
| ch11/11.4/text.html | Table 11.2 title: `<span boiling-point-elevation>Boiling Point Elevation</span> and <span freezing-point-depression-constant>Freezing Point Depression Constants</span>` | written 几种溶剂的<span>沸点升高</span>常数和<span>凝固点降低常数</span> | Chinese shares 常数 between the two terms, so the first span stays on 沸点升高 and 常数 follows it |
| ch11/11.4/text.html | Table 11.2, the row "hydrogen acetate (glacial acetic acid)" | written 乙酸（冰醋酸） | the name "hydrogen acetate" has no Chinese counterpart; the compound is 乙酸, glossary 冰醋酸 for glacial acetic acid (pending row) |
| ch11/11.4/text.html, ch11/11.4/section.json notes | the misspellings "electroyte" (the sentence on electrolytes) and "Predicated" (Table 11.3 title) | translated as 电解质 and 预测值; the page's `notes` names both words in English | a spelling error of English cannot be carried into Chinese (translate.md 4.3) |
| ch11/11.4/text.html, ch11/11.4/section.json, ch11/11.4/figures.js | "shrivel", "shrivels", "shriveled cell" in the paragraph before Figure 11.27, its sim-head and caption, and the cell label of sim-red-cells | written 干瘪, not 皱缩; 皱缩 stays for "crenation" | collision: 皱缩 is the glossary target of crenation, which the same sentence names after "shrivel" (translate.md 4.5) |
| ch11/11.4/text.html, ch11/11.4/section.json | "torr" in `<span data-concept="torr">torr</span>` (Example 11.12) and in exercises (cyl4, cyl10, e24) | the symbol kept in Latin letters, the span wraps it | unit symbol kept as printed, the same as ch09, while the glossary 托 is the name; the span needs a word in its block |
| ch11/11.4/text.html | Example 11.11 step 2 and Example 11.8 step 1: the `<em>` pieces around `$K_f$` and "using the molar mass of I₂ in the unit conversion factor" | the clauses are reordered (确定质量摩尔浓度，依据 $K_f$（…）和 $ΔT_f$; 把 I₂ 由克换算为摩尔，用 I₂ 的摩尔质量作为单位换算因子) with the same three `<em>` runs and the same spans | the Chinese verb-last order cannot keep "from K_f, …, and ΔT_f" and the preposition chain in the same order; the emphasis runs stay at the same counts |
| ch11/11.4/figures.js | sim-phase-diagram `topline`: `'A ' + fmt(m, 2) + ' m solution of ' + NAME[sol.value] + ' freezes at ' + fz + ' °C and boils at ' + bp + ' °C.'` | becomes `fmt(m, 2) + ' m ' + NAME[sol.value] + '溶液在 ' + fz + ' °C 凝固，在 ' + bp + ' °C 沸腾。'`, the same four slots; `NAME` holds 蔗糖、氯化钠、氯化钙 without an article | English article and word order (4.1) |
| ch11/11.4/figures.js | sim-ion-pairs `topline`: `np === 1 ? 'one of the eight formula units is an ion pair' : [...'two','three','four'][np] + ' of the eight formula units are ion pairs'` | the branch collapses to one form with the array `['', '一', '两', '三', '四'][np]` + `个形成离子对` | English singular/plural branch in figure code (4.1) |
| ch11/11.4/figures.js | sim-vapor-lowering `unit: 'of 75'` of the urea slider | written `个，共 75 个` | the English unit words "of 75" follow the value; Chinese needs the measure word and the total |
| ch11/11.4/figures.js | sim-phase-diagram readout small, `\text{at } … \text{: }` | written `\text{在 } … \text{ 时：}` | Chinese puts 时 after the condition (4.1) |
| ch11/11.4/section.json | derivation `vapor-pressure-of-solution`, `source` and `src` | `source` written 化学（第2版），11.4 依数性质; the `src` "9.3, Dalton’s law" and "11.4, Raoult’s law" written 9.3，道尔顿定律 and 11.4，拉乌尔定律 | the same form as ch01 to ch09 (derivation `source` and `src` are translated, the section number kept) |
| ch11/11.4/section.json | exercises e19, e27: "weighing 0.210 g", "weighing 9.41 g" | written 重 0.210 g, 重 9.41 g | "weighing" as a verb of mass in casual use; chapter 1 fixes 重量 for weight and 重 is its everyday form |

### ch11/11.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.5/text.html | spans wrapping a compound name: 碳酸钾 (`carbonate`), 氢氧化钠 and 氢氧化铁(III) (`hydroxide`), 硫酸铁(II) (`sulfate`), 硅酸钠 (`silicate`), 盐酸 (`acid`), 硫酸酯基 (`sulfate`, for "a sulfate—OSO3−"), 硅胶 (`gel`, for "Silica gel") | the span wraps the whole Chinese compound or group name, not the concept word | Chinese names the compound in one word; the span cannot wrap only "carbonate", "hydroxide" or "acid" (translate.md 3, the same as ch01 oxide and sulfate) |
| ch11/11.5/text.html | spans on 酸 in 脂肪酸, 硬脂酸 (`acid`), 氢氧根 (`hydroxide`, before 离子 `ion`), 碱性 (`basic-solution`, before 溶液 `mixtures`), 液相 and 固相 (`liquid`, `solid`, wrapping 液 and 固), 液态 and 固态 (`liquid`, `solid`), 浓 and 稀 (`concentrated`, `dilute`), 凝聚 (`condensation`, in 凝聚法) | the span wraps the shorter or inflected morpheme that carries the concept; 凝聚 is the glossary 凝聚法 (condensation method) where the shared glossary 凝结 is the physical condensation | the glossary targets 酸, 氢氧化物, 碱性溶液, 固体, 液体, 凝结 cannot be wrapped whole in these compounds; the spans stay in their blocks |
| ch11/11.5/text.html | "The term “colloid”—from the Greek words kolla … and eidos …" (dispersed) | written “胶体”（colloid）一词源自希腊语 <em>kolla</em>（意为“胶”）和 <em>eidos</em>（意为“似”）; the Greek words stay in Latin letters inside `<em>` | a sentence about the origin of an English word; Chinese 胶体 does not come from the Greek (translate.md 4.3) |
| ch11/11.5/text.html | Deepwater Horizon note: "4.9 million barrels (210 million gallons)", "1.84 million gallons", "5000 feet" | written 490 万桶（2.1 亿加仑）, 184 万加仑, 5000 英尺; no conversion | Chinese counts in 万 and 亿; barrel, gallon and foot take the Chinese names in prose (4.4) |
| ch11/11.5/text.html | "Canned Heat is a flammable gel" | written 固体酒精是一种可燃的凝胶 | the glossary row canned heat is 固体酒精: a US product name with no Chinese equivalent, named by what it is (4.4) |
| ch11/11.5/text.html | "Pioneers", "Jell-O", "Born in Oakland, CA", "Oakland High School", `&#36;1200` | 拓荒者; Jell-O kept as a brand name; 加利福尼亚州奥克兰; `&#36;1200` kept as printed | cultural reference (4.4); product name kept (2.7) |
| ch11/11.5/text.html | "floating soaps", "floating soap" (Table 11.4, exercise e1) | written 浮水肥皂 | English "floating" as an adjective of soap; Chinese says 浮水 (4.4) |
| ch11/11.5/figures.js | sim-tyndall `NAMES`, hover names, legend lines | the articles "a sodium ion", "a chloride ion", "a droplet of butterfat", "a grain of mud", "a green laser", "a card …" dropped: 钠离子 Na⁺, 氯离子 Cl⁻, 乳脂液滴, 泥粒, 绿色激光器, 卡片 | English article grammar collapses to one Chinese form (4.1) |
| ch11/11.5/figures.js | sim-amphiphile `WORD` and `NAME` | `'a carbon atom, C'` … written 碳原子 C, 氢原子 H, 氧原子 O, 硫原子 S, 钠离子 Na⁺; "the carbon atom of the carboxylate group, CO2−" written 羧酸根基团 CO₂⁻ 的碳原子 and the other group names the same way | English "a/an … of …" built from fixed strings (4.1); the genitive moves before the noun in Chinese |
| ch11/11.5/figures.js | sim-amphiphile `HEAD` | "Sodium stearate, … has a nonpolar hydrocarbon end of 17 carbon atoms and an ionic carboxylate end." written 硬脂酸钠 … 有一个由 17 个碳原子组成的非极性烃基端和一个离子型羧酸根端。 | English word order cannot carry the same clause shape (4.1) |
| ch11/11.5/figures.js | sim-emulsion `topline` | `done + ' of 32 soap anions have settled …'` becomes `'32 个肥皂阴离子中已有 ' + done + ' 个在油滴表面就位，…'` | English "N of 32" frame; Chinese puts the total first, the same one slot `done` (4.1) |
| ch11/11.5/figures.js | sim-precipitator `topline` | `'… ' + got + ' of the last ' + n + ' soot particles have been removed …'` becomes `'…最近的 ' + n + ' 个烟炱粒子中有 ' + got + ' 个已从烟气中除去。'`, and the same for `(n - got)` | English "got of the last n" frame; the same slots in Chinese order (4.1) |
| ch11/11.5/figures.js | sim-precipitator readout | `\text{removed}` written `\text{除去}` | readout subscript wants the shortest form (4.7) |

### Chapter 11: Doubtful choices

- **固态溶液 (11.1, alloys paragraph).** The source wraps "solid" and "solutions" in two spans (concepts `solid`, `mixtures`), so the shared glossary row solid solution 固溶体 cannot carry both. Written 固态 + 溶液, parallel to 气态溶液 and 液态溶液; glossary row `solid solution (two spans)`, confirm: owner. 固溶体 is the metallurgy term.
- **混乱度 for "disorder" (11.1).** The page first wrote 无序度; ch16 row is 混乱度, so the one text place of 11.1 was changed and the row follows ch16.
- **跑气 (11.3).** The soda that has lost its fizz; ch13 has the same target (row `flat (of a carbonated drink)`).
- **干瘪 vs 皱缩 (11.4).** "shrivel" is 干瘪 so that 皱缩 stays the target of "crenation".
- **torr kept as the symbol (11.4).** The glossary 托 is the unit name; the span in Example 11.12 and the exercises wraps the symbol `torr`, as ch09 does.
- **Misspellings of the source (11.4).** "electroyte" and "Predicated" cannot be carried into Chinese; the page's `notes` names both words in English.
- **溶解度 for "those" (11.3 summary_html).** The first draft wrapped a sixth 溶解度 for the pronoun "those"; the span was removed so the `solubility` span count equals the source's five.
- **亨利定律常数 (Example 11.2).** The source wraps only "law"; the glossary 亨利常数 would leave the span without its word.
- **Compound-name spans.** 碳酸钙, 氢氧化钠, 硝酸铵, 碳酸钾, 氢氧化铁(III), 硫酸铁(II), 硅酸钠, 盐酸, 硅胶, 固体酒精 and others wrap the whole Chinese compound name; see the rows above.
- **Names without a standard rendering.** Cottrell is 弗雷德里克·科特雷尔 in the short form (the shared row Frederick Gardner Cottrell is the long name); Peter Debye, Erich Hückel and van 't Hoff are written with the Chinese transliteration and the Latin name in parentheses (彼得·德拜（Peter Debye）, 埃里希·休克尔（Erich Hückel）); Thomas Graham, Frederick Cottrell, Wilhelm Ostwald and Ingrid Eftedal follow the same rule (review pass); owner to confirm the transliterations, 英格丽德·埃夫特达尔 above all.
- **Units.** Barrels, gallons, feet and torr: 桶、加仑、英尺 in prose (no conversion), the symbols kept.

### Chapter 11: Kept in English (translate.md 5)

- `answer.parts[].part` of 11.4: cyl1 "mole fraction of NH3" and "molality", e4, e5, e8, e24 ("(a) Na2CO3" and the like). A reader sees them; owner to decide whether they become translatable (as ch01).
- `bloom` values (Analyze, Apply, Understand, Evaluate) in `exercises[].bloom`, as ch01.
- Figure and Sim eyebrows, 图 N.M citations as plain text (book-level rows above).
- Photo-credit names and organisations (Wikimedia Commons, USFWS, NASA, Flickr), brand Jell-O, the Greek words kolla and eidos (11.5).
- 11.3 and 11.4 pure-math exercise solutions (`2.9 atm`, `102 L HCl`, `23.4 torr`, `5.3 atm`, `1.8 × 10^2 g/mol`, `144 g mol^-1`, `S8`, ...): `translation_parity.py` lists them as "untranslated?", they are numbers with unit symbols and formulas.

### Chapter 11: Terms to confirm

The chapter glossary `glossary.zh-CN.json` has 281 rows (234 from the chapter scaffold, 46 folded in from the page agents' `glossary-pending.json`; none of the 46 existed in the shared glossary or another chapter glossary, one, disorder, existed in ch16 and took its target). 95 rows carry `confirm: termonline` (not looked up at termonline.cn, or no exact entry), 24 carry `confirm: owner`; the others are everyday words, element or compound names built from shared rows.

The page agents' rows to confirm at termonline (28):

- disorder (11.1) → 混乱度
- halocarbon (11.2) → 卤代烃
- ecosystem (11.3) → 生态系统
- white blood cell (11.3) → 白细胞
- barophysiologist (11.3) → 高气压生理学家
- outgas (a lake) (11.3) → 脱气
- tetrahydropyridine (11.4) → 四氢吡啶
- activity (of an ion) (11.4) → 活度
- osmotic membrane (11.4) → 渗透膜
- colligative effect (11.4) → 依数效应
- naphtha (11.4) → 石脑油
- refinery gas (11.4) → 炼厂气
- fuel oil (11.4) → 燃料油
- distillate (11.4) → 馏出液
- still pot (11.4) → 蒸馏瓶
- still head (11.4) → 蒸馏头
- still receiver (11.4) → 接收器
- receiving flask (11.4) → 接收瓶
- boiling chips (11.4) → 沸石
- heating bath (11.4) → 加热浴
- cooling bath (11.4) → 冷却浴
- stirrer/heat plate (11.4) → 搅拌器/加热板
- aerosol (11.5) → 气溶胶
- polyester (11.5) → 多元酯
- carbohydrate (11.5) → 碳水化合物
- coagulate (11.5) → 聚沉; coagulate (of gelatin, sets) (11.5) → 胶凝
- laser (11.5) → 激光器
- 2-butoxyethanol (11.5) → 2-丁氧基乙醇

Owner (page agents' rows):

- solid solution (written 'solid' + 'solution' in two spans) (11.1) → 固态溶液

#### Review pass (2026-10-27)

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.3/text.html | spans `dilute` and `concentrated` in "is called dilute ... called concentrated" | written 称为稀溶液 / 称为浓溶液, the spans on 稀 and 浓 | the source wraps the adjective; 称为稀的 is not textbook Chinese, and 11.4 already wraps 稀 and 浓 |
| ch11/11.4/text.html | "Our military forces have a variety of generator-operated RO units" | written 美国军队 | the book is American; to a zh-CN reader 我们的军队 would name the PLA (translate.md 4.4) |
| ch11/11.3/text.html, 11.4/text.html, 11.5/text.html | names of persons at their first mention on a page: Ingrid Eftedal, Jacobus Henricus van't Hoff, Peter Debye, Erich Hückel, Thomas Graham, Frederick Cottrell, Wilhelm Ostwald | the Chinese rendering with the Latin name in parentheses | one rule for the chapter (translate.md 2.7); 英格丽德·埃夫特达尔 has no standard rendering, owner to confirm |
| ch11/11.5/text.html | "heated ... coagulates as it cools" (Gels) | 胶凝, not the glossary's 聚沉 | a sol turning into one viscous gel is 胶凝; 聚沉 stays for exercise e5 (new row `coagulate (of gelatin, sets)`) |

## Chapter 12 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows; table eyebrows `Table 12.1` to `Table 12.3` | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept; the table eyebrows written 表 12.1 to 表 12.3 | the checker matches the eyebrow against its row exactly and the app localises it (translate.md 4.6); table eyebrows are translated as in ch01 |
| every text.html, every section.json | figure citations in the prose and in `original_caption` | written 图 N.M, 图 12.15（<em>a</em>）, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch12/12.1/text.html, ch12/12.1/section.json, ch12/12.2/text.html, ch12/12.3/text.html, ch12/12.6/text.html, ch12/12.7/text.html | photo credits (Iqbal Osman; James P Fisher III; modification of work by NASA; Loren Kerns; credit a Mario Molina, credit b NASA) | （来源：Iqbal Osman）, （来源：James P Fisher III）, （来源：改编自 NASA 的作品）, （来源：Loren Kerns）, （来源 a：马里奥·莫利纳提供；b：改编自 NASA 的作品）; names kept as printed except Molina (chapter glossary row) | the one credit formula of ch01 (review pass 5) |
| ch12/12.1/text.html, ch12/12.2/text.html, ch12/12.4/text.html | `data-concept="mixtures"` spans on "solution" (chemical solution) | the span wraps 溶液 | the shared glossary row solution is 解 (the label of a worked solution, ch01); the span names the mixture, whose Chinese is 溶液; the rows 解 and 溶液 are different senses and are not merged |
| ch12/12.1/section.json, ch12/12.5/section.json, ch12/12.6/section.json | pure-math or number-only `answer.solution` (12.1 cyl1; 12.5 e8, e9, e11; 12.6 cyl1; 12.3 and 12.4 as listed below) | left as printed | no word to translate; `translation_parity.py` reports them as untranslated |
| ch12/chapter.json | `variables[].unit` ("none", "depends on the order", "J/mol or kJ/mol", "the units of k", "depends on the overall order, …") | kept English byte for byte (the first pass had translated them to 无, 取决于级数 and so on; restored in the review pass) | translate.md 5 lists `variables[].unit` as kept; ch01 and ch03 keep the English |
| every text.html, every section.json, ch12/12.1 to 12.6 figures.js | table heads and axis labels that start with a Chinese word and carry a unit or symbol in parentheses (时间（s）, 速率（mol L⁻¹ h⁻¹）, 总反应级数（<em>x</em>）, 浓度（M）, 能量（kJ/mol）) | full-width parentheses; heads that start with a formula ([NO] (mol/L)) and the coordinates in alt text keep ASCII | as ch01 (摄氏温度（°C）); review pass |
| every section.json, ch12/12.7/text.html | part labels of the prose (a)(b)(c)(d) | full-width （a）（b） with no space on either side (对（b）南极; 图（b）; （a）和（b）) | as 12.1, 12.3 and 12.4; review pass |

### ch12/12.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.1/text.html | `data-concept="reaction-rate"` span, "the rate of a chemical reaction" | the span wraps 化学反应的速率, which contains 速率 and not the concept term 反应速率 | the source's span covers the whole phrase "rate of a chemical reaction"; Chinese puts 的 between the possessor and 速率, so the term 反应速率 cannot be formed inside the span |
| ch12/12.1/text.html | `rate`, first paragraph: "Speed is a familiar rate" (and the car analogy: speedometer, instantaneous speed, average speed) | speed written 速度 (车速表, 瞬时速度, 平均速度) where the glossary row speed is 速率 | 速率 is also the target of rate; "速率是一种常见的速率" would collapse the comparison the sentence makes (collision, translate.md 4.5) |
| ch12/12.1/text.html | `data-concept="peroxide"` spans (hydrogen peroxide, 12 places) | the span wraps the whole compound name 过氧化氢 | Chinese names the compound in one word; the span cannot wrap only "peroxide" (as ch01 compound names) |
| ch12/12.1/text.html | `data-concept="ion"` span, "iodide ion" (2 places); `data-concept="acid"` span, "nitric acid" | spans wrap 碘离子 and 硝酸 | same: one Chinese compound word |
| ch12/12.1/text.html | `data-concept="stoichiometry"` spans (8) | the span wraps 化学计量关系, where the glossary row stoichiometry is 化学计量学 | "the reaction stoichiometry" is the relation of amounts in one reaction, not the discipline; chapter glossary row reaction stoichiometry |
| ch12/12.1/text.html | rate-of-decomposition equation, first cell `\text{rate of decomposition of}\;H2O2` | written `{\text{H}}_{2}{\text{O}}_{2}\;\text{的分解速率}`, the formula before the \text phrase | Chinese puts the possessor before 的分解速率; the TeX is otherwise unchanged |
| ch12/12.1/text.html | glucose test equations, `\text{catalyst}` over the arrows (2) | written `\text{催化剂}` | words in \text{} are translated (translate.md 5) |
| ch12/12.1/text.html | "the symbol delta (Δ) indicates “change in.”" | 符号 Δ（德尔塔）表示“……的变化” | the Greek letter's name is given in Chinese; the sentence is about a symbol, not English |
| ch12/12.1/text.html | `sim-head` of 12.5, "ammonia ... decomposes at 1100 °C" and prose "Figure 12.5 illustrates the change in concentrations ... for the decomposition of ammonia into nitrogen and hydrogen at 1100 °C" | clause order changed (各浓度随时间的变化，对应于氨在 1100 °C 下分解为氮和氢的过程); every span kept in the same block | Chinese word order |
| ch12/12.1/text.html | "three moles of H2 are produced for each mole of N2 produced" | 生成 3 摩尔 H₂ 的同时生成 1 摩尔 N₂ | Chinese has no "for each" with the same word order; both mole spans kept in source order |
| ch12/12.1/text.html | "approximately 30 seconds" (spans `time` > `second`) | 大约 30 秒, the `second` span on 秒 inside the `time` span | nested spans kept |
| ch12/12.1/section.json | e5 `answer.parts[].part` (English labels such as "(a) average rate, 0 to 10 s") and cyl2 parts | kept English byte for byte | translate.md 5 keeps `part`; the same open question as ch01/1.4 and 1.6 (owner to decide) |
| ch12/12.1/section.json | e5 prompt "a graph of time versus [A]" | 由时间对 [A] 的图, as printed (time on the horizontal axis) | the book's own wording, not improved |
| ch12/12.1/section.json | e2 solution: "the minus sign makes its term a positive rate", "oxygen appears 3/2 times as fast" | translated with 速度 for "as fast" (所以氧气出现的速度是臭氧消失速度的 3/2 倍) | ordinary adverb of speed, not the quantity rate |
| ch12/12.1/figures.js | table head `'rate'` | 速率 | the word in a column head; the unit string stays |
| ch12/12.1/figures.js | legend and topline sentences with `$\\kt_{2}$`, `$\\kt_{1}$` | the sentences are rewritten in Chinese word order with the same slots and TeX | English sentence frame (4.1) |
| ch12/12.1/section.json | e3 solution `\text{rate}` | written `\text{速率}` | word in \text{} is translated; the rest of the TeX (incl. the key's CIF₃) kept as printed |

### ch12/12.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.2/text.html | `data-concept="acidic-solution"` and `dilute` spans ("acidic", "dilute") | the spans wrap 酸性 and 稀, where the glossary rows are 酸性的 and 稀的 | the attributive adjective loses 的 before its noun (酸性溶液, 稀溶液); the 的 would sit outside the compound |
| ch12/12.2/text.html | `data-concept="gas"` spans, "hydrogen gas" (nature), "oxygen gas" (catalyst, 2 places) | the span wraps 氢气, 氧气 | Chinese names the gas in one word; the span cannot wrap only "gas" (as ch01 compound names) |
| ch12/12.2/text.html | `data-concept="gas"` span, "Gas burners" (temperature) | span wraps 燃气 in 燃气灯 | the English "gas" in "gas burner" is the fuel; Chinese 燃气灯 has no separate 气体 |
| ch12/12.2/text.html | `data-concept="carbonate"` spans (calcium carbonate, 3 places); `data-concept="acid"` spans (sulfurous acid, 2 places); `data-concept="peroxide"` spans (hydrogen peroxide, 2 places) | the span wraps the whole compound name 碳酸钙, 亚硫酸, 过氧化氢 | Chinese names the compound in one word |
| ch12/12.2/text.html, section.json | `data-concept="area"` spans, "surface area" (states, Figure 12.6 caption, summary) | the span wraps 表面积 (chapter glossary row surface area) and not 面积 alone | Chinese names the quantity in one word |
| ch12/12.2/text.html | states: `solid` and `liquid` spans in "(solid, liquid, gaseous, dissolved)" and "a solid phase and either a liquid or gaseous phase" | spans wrap 固态, 液态 in the list and 固相, 液相 in the phase sentence; 固体 is kept for "large solid particles" | the list names states (ch01 precedent); "solid phase" is 固相 in Chinese |
| ch12/12.2/figures.js | `topline`, `hits + (hits === 1 ? ' collision' : ' collisions')` | collapsed to ` 次碰撞` | English plural branch (4.1) |
| ch12/12.2/text.html | temperature: "doubled when the temperature is raised by 10 °C" | order changed to 反应速率在温度升高 10 °C 时大约增加一倍; the span stays on the same words | Chinese word order |

### ch12/12.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.3/text.html | `data-concept="peroxide"` span, "hydrogen peroxide" | the span wraps the whole compound name 过氧化氢 | Chinese names the compound in one word; the span cannot wrap only "peroxide" (as ch12/12.1) |
| ch12/12.3/text.html | `data-concept="oxide"` span, "nitric oxide, NO" (Example 12.4) | the span wraps 一氧化氮 | same: one Chinese compound word; "nitrogen oxides" keeps the span on 氧化物 in 氮氧化物 |
| ch12/12.3/text.html | `data-concept="stoichiometry"` span, "reaction stoichiometry" | the span wraps 化学计量关系, where the glossary row stoichiometry is 化学计量学 | the relation of amounts in one reaction, not the discipline (as ch12/12.1; chapter glossary row reaction stoichiometry) |
| ch12/12.3/text.html | `data-concept="ozone"` span, "ozone hole" | span on 臭氧, 空洞 follows outside | glossary row ozone hole 臭氧空洞; the source spans only "ozone" |
| ch12/12.3/text.html | `data-concept="coefficient"` span, "stoichiometric coefficients" | written 化学计量<span>系数</span> | chapter glossary row stoichiometric coefficient 化学计量系数 (12.1); the span keeps the word 系数 |
| ch12/12.3/text.html | `data-concept="reaction-rate"` spans on "rate" and "rates", "initial rates method" | span wraps 速率 (glossary rate) where the source wraps "rate"; "rate of a reaction", "reaction rate" are 反应速率; "initial rates method" 初始速率法 with the span on 速率 | the concept name is 反应速率 but the source word is the bare "rate" in a context that already names the reaction |
| ch12/12.3/text.html | "Dobsone units" in the Figure 12.8 alt | written 多布森单位 | the source misspells Dobson; the unit is named by its person name in Chinese |
| ch12/12.3/text.html | table eyebrow `Table 12.1`, column heads "Trial" | 表 12.1; Trial written 实验 (numbered 实验 1 in prose and in the sim text) | book decision for table eyebrows; "trial" is one experimental run |
| ch12/12.3/text.html | Example 12.4 step 2, "the rate increases also triples" and "is equal to 1.The rate law" | written 速率增加，也变为三倍 (the redundant "also" kept) and 等于 1。速率定律于是为 | the missing space after the full stop of the source has no Chinese counterpart; the typo cannot be carried over |
| ch12/12.3/text.html | orders "0 (zero), 1 (first), 2 (second), 3 (third)" in Table 12.1 | 0（零级）, 1（一级）, 2（二级）, 3（三级） | Chinese counts orders as 级 |
| ch12/12.3/text.html | Example 12.3 "a number raised to the zero power" | 一个数的零次幂 | Chinese word order of the power phrase |
| ch12/12.3/text.html | "m order with respect to A", "first order in A and second order in B" | 对 A 为 m 级, 对 A 为一级，对 B 为二级 | English "order in/with respect to" has no preposition pattern in Chinese |
| ch12/12.3/text.html, section.json | `\text{rate 3}`, `\text{rate}`, `\text{initial}` | `\text{速率 3}`, `\text{速率}`, `\text{初始}` | words in \text{} are translated (translate.md 5) |
| ch12/12.3/figures.js | `lab.add('trial ' + n)`, hover `trial ${n} of Example 12.5` | '实验 ' + n, `例 12.5 的实验 ${n}：…` | English genitive phrase; code shape kept |
| ch12/12.3/figures.js | topline `The rate law with ${ords} passes through all three trials.` / `misses trial${…'s'} …` | `${ords} 时的速率定律通过全部三次实验的点。` / `${ords} 时的速率定律未通过实验 ${missed.join(' 和 ')} 的点。`; the plural branch is dropped, `and` becomes 和 | English plural branch in figure code (4.1); the slot ords carries `$m = 2$，$n = 1$` |
| ch12/12.3/figures.js | `at [B] = … M`, `at [A] = … M` | `[B] = … M 时`, `[A] = … M 时` | Chinese puts 时 after the condition |
| ch12/12.3/figures.js | readout `\text{overall order: }` | `\text{总级数: }` | word in \text{} translated; ASCII colon and space inside math, as ch12/12.6 and ch12/12.7 (review pass) |
| ch12/12.3/text.html | display equation `\text{products}` after the rate-law paragraph | `\text{产物}` | words in `\text{}` are translated (translate.md 5); the first pass had left it English (review pass) |
| ch12/12.1/section.json, ch12/12.3/text.html, ch12/12.3/section.json, ch12/12.4/text.html, ch12/12.6/section.json | sentence-final `.` or `,` the source keeps inside `$…$` (e3 and e4 of 12.1; the three units sentences of 12.3 and its e6, e12; 12.4 intercept sentence; 12.6 e1) | the mark is taken out of the math and written full-width after it (`$。`, `$，`), or dropped where the Chinese sentence continues (由反应 $…$ 制得); 12.6 e4 `\text{products?}` written `\text{产物}` | the Chinese sentence takes Chinese punctuation (translate.md 3.5); a `.` left inside the math rendered mid-sentence (review pass) |
| ch12/12.3/section.json | notes | the clause "and Example 12.4 keeps … “is equal to 1.The rate law” as printed" is reduced to the redundant "also" that survives (速率增加，也变为三倍) | the spacing glitch does not exist in the Chinese (see text.html row) |
| ch12/12.3/section.json | `answer.parts[].part` of cyl1 to e20 (English labels such as "order in NO", "(a) order") | kept English byte for byte | translate.md 5 keeps `part`; the same open question as ch01/1.4 and ch12/12.1 (owner to decide) |
| ch12/12.3/section.json | e4 prompt, `$\text{rate}=k{[{\text{NO}}_{2}]}^{2}?$` | the question mark leaves the math: `…^{2},$ 则…变化？` and the sentence is reordered (对于过程 …，若该反应的速率定律为 … 则…将如何变化？) | the English question ends inside the math; a Chinese question mark inside TeX would be half-width |
| ch12/12.3/section.json | e8 prompt and solution, `year⁻¹`, `mol/L/year` | written 年<sup>−1</sup> in the prompt and `mol/L/年` in the solution; `answer.unit` stays `mol/L/year` | unit without a symbol takes the target name in prose (4.4); `answer.unit` is kept byte for byte |
| ch12/12.3/section.json | cyl2 prompt, "an alcohol" (transesterification) vs e10 "Alcohol is removed from the bloodstream" | 醇 (the compound class) in cyl2, 酒精 (glossary alcohol) in e10 | two senses of the English word; chapter glossary row alcohol (compound class) |
| ch12/12.3/section.json | e18 solution "(a) 2.5 × 10⁻⁴ mol/L/min" | 开头的 “(a)” kept as printed, full-width （a） | the key's stray label, as exercise_notes says |
| ch12/12.3/section.json | e20 solution "L mol <sup>−1</sup>" | the stray space before `<sup>` kept | printed so in the source |
| ch12/12.3/section.json | e8 and cyl3 solution `rate`, e16 `The rate law is second order in A` | 速率; 速率定律对 A 为二级 | ordinary prose |
| ch12/12.3/section.json | cyl4, e4, e16 and e20 solutions are pure math/numbers apart from labels | e6 solution `4.3 × 10⁻⁵ mol/L/s` kept as is | pure number and unit; translation_parity reports it as untranslated |

### ch12/12.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.4/text.html | `data-concept="gas"` spans, "butadiene gas", "C₈H₁₂ gas" | 丁二烯<span>气体</span>, C₈H₁₂ <span>气体</span> | the span wraps the noun 气体 (glossary gas) |
| ch12/12.4/text.html | `data-concept="length"` and `time` spans, "the length of time" | written 多长时间, the `length` span on 长 and the `time` span on 时间 (the two spans swap order) | 时间的长度 is not Chinese usage (review pass) |
| ch12/12.4/text.html | `data-concept="time"` spans on "times" (sim-head), "at several times" | 时刻 for the plural "times" (moments), where the glossary row time is 时间 | the plural counts moments of measurement; Chinese has no plural of 时间 |
| ch12/12.4/text.html | `data-concept="mixtures"` span, "reactant solution" (Example 12.12) | span on 溶液 | glossary row mixtures 溶液 (as ch12/12.1) |
| ch12/12.4/text.html | `data-concept="radioactive-half-life"` spans on "half-life" | span wraps 半衰期 | the source puts the radioactive-half-life concept on the bare word half-life of a reaction; one Chinese word |
| ch12/12.4/text.html | "first-, second-, and zero-order reactions" and the English "first order / second order / zero order" | 一级、二级和零级反应; 一级, 二级, 零级 | Chinese counts orders as 级 (as ch12/12.3) |
| ch12/12.4/text.html | "pseudo-zero-order" | 准零级 | the prefix pseudo- has Chinese form 准 (chapter glossary row) |
| ch12/12.4/text.html | `data-original-caption`, "Figure 12.9 ... Figure 12.11", prose citations "Figure 12.2" | （图 12.9）…; 图 12.2 plain text; eyebrows `Figure 12.9 + 12.10 + 12.11`, `Figure 12.12` and table eyebrow 表 12.2 | recorded once per book (translate.md 4.6) and the table-eyebrow decision of ch01 |
| ch12/12.4/text.html, section.json | `\text{slope}`, `\text{or}`, `\text{change in}\;y` | `\text{斜率}`, `\text{或}`, `y\;\text{的变化量}` | words in \text{} are translated; "change in y" reordered because Chinese puts the quantity before 的变化量 |
| ch12/12.4/text.html | "(one near each end of the line is preferable)" | 最好在直线两端附近各取一个 | ordinary sentence, Chinese word order |
| ch12/12.4/text.html | table head "plot needed for linear fit of rate data", "$[A]$ vs. $t$" | 对速率数据作线性拟合所需的图; `$[A]$ 对 $t$` | "A vs. t" is written 对 in Chinese (as ch01) |
| ch12/12.4/text.html, section.json | "hours" in "from 0.00 hours to 6.00 hours" | 小时 | a unit word in prose without symbol |
| ch12/12.4/section.json | `answer.parts[].part` of e2, e3, e11, e13 (English labels "order", "k", "order in penicillin", "half-life", "cyclopropane remaining") | kept English byte for byte | translate.md 5 keeps `part`; the same open question as ch01/1.4 and ch12/12.1, 12.3 (owner to decide) |
| ch12/12.4/section.json | cyl3, cyl5, cyl7, e7, e17 solutions (`0.0195 mol/L`, `35 min`, `18 min`, `8.3 × 10<sup>7</sup> s`, the k table) | left as printed | pure numbers, units and symbols; translation_parity reports them as untranslated |
| ch12/12.4/section.json | e5 prompt, `day<sup>−1</sup>` | written 天<sup>−1</sup>; `answer.unit` `d` kept | unit without a symbol takes the target name in prose (4.4), as ch12/12.3 e8 |
| ch12/12.4/section.json | e11 prompt, "molecular weight of 3 × 10⁴ g/mol" | 分子量 … g/mol as printed | the book gives a molar-mass unit with the word weight; kept as printed (chapter glossary row molecular weight) |
| ch12/12.4/figures.js | `ORDER`, `options[].label`, `\text{reaction}`, `\text{order}` | 零级/一级/二级, `\text{反应}`, `\text{级数}` | display words |
| ch12/12.4/figures.js | hover names `NH₃ on W at 200 s: …`, `the sample at ${ti} h: …`, `half-life ${i + 1}: …` | `NH₃ 在 W 上，200 s 时：…`, `${ti} h 时的样品：…`, `第 ${i + 1} 个半衰期：…` | English prepositional frame; code shape kept |
| ch12/12.4/figures.js | readout `\text{, all of A used up at } t = …` | `\text{，A 在 } t = … \text{ 时全部用完}` | Chinese puts 时 after the condition |
| ch12/12.4/figures.js | 'slope = k', 'slope = −k' | '斜率 = k', '斜率 = −k' | label words |

### ch12/12.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.5/text.html | `data-concept="reaction-rate"` spans, "rate of a reaction", "reaction rates" | the span wraps 反应速率 as a whole (concept name) | the span cannot wrap only "rate"; glossary row reaction rate |
| ch12/12.5/text.html | `data-concept="kelvin"` span, "temperature on the Kelvin scale" | 以<span>开尔文</span>温标表示的温度, the span on 开尔文 and 温标 outside it | as ch01/1.6; the glossary target names the unit, the scale needs 温标 |
| ch12/12.5/text.html | `data-concept="joule"` and `mole` spans, "joules per mole" | 焦耳每摩尔, a span on each of 焦耳 and 摩尔 | Chinese says 每 between the two units; the spans keep their source order |
| ch12/12.5/text.html | `data-concept="kinetic-energy"` span, "kinetic energy" | span wraps 动能 | one Chinese word, glossary row kinetic energy |
| ch12/12.5/text.html | `data-concept="valence-shell"`, "hydrocarbon" spans | span wraps 价层 and 烃 (written 烃类燃料) | glossary rows valence shell, hydrocarbon |
| ch12/12.5/text.html | `data-concept="enthalpy"` span inside `<em>`, "the enthalpy ... system enthalpy" | 焓 in `<em>`, and 体系的焓 | glossary rows enthalpy, system |
| ch12/12.5/text.html | `data-concept="temperature"` and `activation-energy` spans in the sim-heads ("the temperature", "the second temperature", "the activation energy") | the span wraps 温度, 活化能 and the Chinese has no article: 第二个<span>温度</span> | English articles have no Chinese form (4.1) |
| ch12/12.5/text.html | `data-type="energy"` span "the energy the collision brings" (sim-head 12.13) | 碰撞所带的能量 | literal; the span keeps its place |
| ch12/12.5/text.html | `data-type="energy"` span "the activation energy for the reaction" (Example 12.13) | span wraps 该反应的活化能, with the inner `activation-energy` span on 活化能; the question word follows outside (是多少) | Chinese word order of "What is X?" |
| ch12/12.5/text.html | "postulates 2 and 3" | 假设 2 和假设 3; heading "Postulates of collision theory" 碰撞理论的基本假设 | Chinese renders postulate as 假设; no glossary row (chapter chapter glossary) |
| ch12/12.5/text.html | `data-original-caption`, "Figure 12.13 ... 12.14", prose citations "Figure 12.13/12.14/12.15(a)/(b)/12.16" | （图 12.13）…; 图 12.13 etc. plain text; 图 12.15（<em>a</em>）and （<em>b</em>）; eyebrows `Figure 12.13 + 12.14`, `Figure 12.15`, `Figure 12.16` kept | recorded once per book (translate.md 4.6); part labels written full-width in prose |
| ch12/12.5/text.html | display equation `\text{reaction rate}`, `\text{collisions}`, `\text{time}`; `\text{Slope}`, `\text{or}`, `\text{slope}` | 反应速率, `\#\;\text{次碰撞}` (reads "n collisions"; `\#` stays outside `\text{}`), 时间; 斜率, 或 | words in \text{} are translated (translate.md 5); `\text{ln}` kept as a function name |
| ch12/12.5/text.html | "Alternative approach" | `<em>另一种方法</em>` | label word translated, the em kept |
| ch12/12.5/text.html | "(see chapter on thermochemistry)", "(see chapter on gases)" | （见热化学一章）, （见气体一章）; the spans on 热化学 and 气体 | the book's cross-reference to a chapter, spans kept |
| ch12/12.5/text.html | "activation barriers" | 活化能垒 | no glossary row; the usual textbook rendering (chapter glossary row) |
| ch12/12.5/text.html | "muzzle flash", "gunpowder" | 枪口火焰, 火药 | everyday terms, no glossary row (chapter chapter glossary) |
| ch12/12.5/section.json | e7 prompt, solution and answer.parts[].unit "times" | prompt "How much faster … at 45 °C than at 25 °C?" written 速率是 25 °C 时的多少倍？; solution "(a) 4-times faster (b) 128-times faster" written （a）是 25 °C 时的 4 倍 （b）是 25 °C 时的 128 倍; the `unit` value "times" kept as printed | 快 4 倍 reads in Chinese as 5 times the rate, so the key (2² = 4, 2⁷ = 128) is written as a ratio; `answer.parts[].unit` is not translated (translate.md 5) (review pass) |
| ch12/12.5/section.json | e9 prompt, "p-nitrophenyl phosphate (PNPP)", "p-nitrophenoxide ion (PNP)" | 磷酸对硝基苯酯（PNPP）, 对硝基苯氧负离子（PNP）; "ALP–catalyzed" ALP 催化的 | the abbreviations are kept; the Chinese names are the systematic ones (chapter glossary rows) |
| ch12/12.5/section.json | exercise_notes, "PhET" and the fs- ids | PhET and the ids kept | proper name and ids |
| ch12/12.5/section.json | derivation `src` "Example 12.13", "Appendix B", `source` | 例 12.13, 附录 B, 化学（第2版），12.5 碰撞理论，例 12.13 | src words are translated (translate.md 5) |
| ch12/12.5/figures.js | `NAMES` hover names ("an oxygen atom from the carbon monoxide molecule" ...) | 一氧化碳分子中的氧原子, 一氧化碳分子中的碳原子, 氧分子中的氧原子 | English article and "from" frame collapse to one Chinese form (4.1) |
| ch12/12.5/figures.js | sim-collision `side` choice | label `\text{先碰撞的一端}`, options 氧端先碰, 碳端先碰, headline 氧撞击氧： | "strikes" and "oxygen end first" have no single Chinese word; the headline "Oxygen strikes oxygen" keeps the two nouns |
| ch12/12.5/figures.js | sim-collision headline, "with at least $\kEa$" / "with less than $\kEa$" | 以至少 $\kEa$ 的能量撞击 / 以小于 $\kEa$ 的能量撞击 | Chinese needs 的能量 after the quantity |
| ch12/12.5/figures.js | sim-collision `views` labels 'side', 'above' | 侧视, 俯视 | 'side' is 侧视 (正视 is 'front'; review pass) |
| ch12/12.5/figures.js | sim-distribution headline template | rewritten in Chinese word order with the same slots (在 … 时，有 …% 的分子达到 …，而在 … 时为 …%) | English frame "X% reach …, against Y% at …" cannot keep slot order |
| ch12/12.5/figures.js | sim-arrhenius-plot headline template and `points` options | 在 … K 与 … K 之间，…：斜率为 … K。 and `… K 和 … K` | English "Between … and …, … over …: a slope of" cannot keep slot order |

### ch12/12.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.6/text.html | `data-concept="oxide"` spans, "nitric oxide" (termolecular, 2 places) | the span wraps the whole compound name 一氧化氮 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as ch01/1.2) |
| ch12/12.6/text.html | `data-concept="termolecular-reaction"` span, "An elementary **termolecular reaction** involves …" | written 基元的<strong><span>三分子反应</span></strong>涉及…, the span on the whole concept name | the source's span wraps both words of the concept; the word order of "elementary termolecular reaction" becomes 基元的三分子反应 |
| ch12/12.6/text.html | `data-concept="temperature"` span, "at high temperatures" | 在较高<span>温度</span>下, the span on 温度 | Chinese says 高温度 only as 高温; the span keeps the glossary word and its place; the 12.5 sentence "at high temperature and pressure" is written 温度和压强都很高的条件下 for the same reason |
| ch12/12.6/text.html | `data-concept="reaction-rate"` spans, "limit the rate", "the rates of the forward and reverse processes" | the span wraps 速率 (glossary row rate); the summary's "rate of a reaction" wraps 反应速率 | the source spans one word "rate" |
| ch12/12.6/text.html | `data-concept="rate-determining-step"` spans, "rate-limiting step (or rate-determining step)" | the two spans wrap 限速步骤 and 速率控制步骤 (the two glossary rows) | both rows exist; the book uses the two words as aliases |
| ch12/12.6/text.html | `data-concept="reaction-intermediate"` span with "intermediate species" | 中间体 in the span, "species" not written (the noun 中间体 already names the species); "an intermediate species concentration" written 中间体的浓度 | Chinese has no word for "intermediate species" apart from 中间体; articles collapse (4.1) |
| ch12/12.6/text.html | `reactant entities` ("a **single** reactant entities") | written 仅有<em>单个</em>反应物粒子 | the source's number disagreement ("a single … entities") cannot be carried in Chinese; the error is noted in section.json `notes` |
| ch12/12.6/text.html | display equations `\text{products}`, `\text{and}`, `\text{slow}`, `\text{fast}`, `\text{Step 1:}`, `\text{Step 2:}` | 产物, 和, 慢, 快, 步骤 1:, 步骤 2: (ASCII colon inside math) | words in `\text{}` are translated (translate.md 5) |
| ch12/12.6/text.html | "first order", "second order", "second-order overall" | 一级, 二级, （总体为二级） | glossary rows first order / second order; the "overall" is written 总体 in prose, no new term |
| ch12/12.6/text.html | `data-type="temperature"` span, "temperatures above 225 °C" / "below 225 °C" | 温度高于 225 °C / 温度低于 225 °C inside the span, with 当…时 outside | Chinese word order of the conditional clause |
| ch12/12.6/section.json | `notes` | rewritten for the Chinese text: the "butadiene reaction" wording kept, the grammar slip of "a single reactant entities" described, not reproduced | the note quotes English words that the translation cannot carry |
| ch12/12.6/section.json | e8 `answer.parts[].part` and `unit` | `part` ("(c) the rate constant k", "(d) [NO] remaining in experiment 2") and `unit` kept as printed | not in the translated list of translate.md 5 (owner note, as ch01) |
| ch12/12.6/section.json | e8 prompt, "Advanced Placement" and "Educational Testing Service" | 化学大学先修课程（Advanced Placement）, 教育测试服务中心（Educational Testing Service） | names of an exam and an organisation with no standard rendering; English kept in parentheses (2.7) |
| ch12/12.6/section.json | e8 solution "Step II" | 步骤 II | the key prints "Step II" for the mechanism's step 2; the Roman numeral is kept as printed |
| ch12/12.6/section.json | e5, e6, e9 prompt and solution math `\text{rate}`, `\text{products}`, `\text{sunlight}`, `\text{fast}`, `\text{slow}` | 速率, 产物, 日光, 快, 慢 | words in `\text{}` are translated |
| ch12/12.6/section.json | derivations `\text{forward}`, `\text{reverse}`, `\text{overall}` | 正向, 逆向, 总 as subscripts | a subscript wants the shortest form (4.7); as ch01/1.2 |
| ch12/12.6/figures.js | `NAME[sym] + ' of ' + who` hover names (cyclobutane, 3D molecule) | `${who}中的${NAME[sym]}` (环丁烷中的氢原子) | English "X of Y" phrase by concatenation (4.1) |
| ch12/12.6/figures.js | `NAME` and `WHO` arrays ("the oxygen atom that stays on nitrogen", "the oxygen atom that passes from nitrogen to carbon", "the oxygen atom of carbon monoxide") | articles dropped: 氢原子 …, 留在氮上的氧原子, 从氮转移到碳的氧原子, 一氧化碳中的氧原子 | English article grammar collapses (4.1) |
| ch12/12.6/figures.js | sim-slow-step `(slow)` / `(fast)` tags and the comparison `tag === '(slow)'` | the tags and the comparison written （慢） / （快） / '（慢）' | the string is both shown and compared; both sides changed together |
| ch12/12.6/figures.js | sim-slow-step hover name "the concentration of NO₂ at 20 s" | `${name} 在 ${fmt(t, 0)} s 时的浓度` | Chinese word order with the same two slots |
| ch12/12.6/figures.js | `views` labels 'front', 'edge on', 'above' | 正视, 侧向, 俯视 | 'front' as ch12/12.2 and ch12/12.3, 'above' as ch12/12.5 |
| ch12/12.6/figures.js | sim-slow-step axis label 'concentration (M)' and 't (s)' | 浓度 (M); 't (s)' kept | the symbol t and the unit stay |
| ch12/12.6/text.html, ch12/12.6/section.json, ch12/12.7/text.html | `data-concept="reaction-mechanism"` spans on the bare word "mechanism" (12.6 section.json 1, 12.7 text.html 9) | the span wraps 机理, where the glossary row reaction mechanism is 反应机理 | the source wraps the one word "mechanism" in a context that already names the reaction; 机理 is the same Chinese word without the 反应 prefix, and 反应 is not repeated |

### ch12/12.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.7/text.html | `data-concept="gas"` and `data-concept="liquid"` spans, "Gas and liquid phase reactions … within the gas or liquid phase" | the spans wrap the whole compounds 气相 and 液相 (气相和液相反应, 气相或液相之内); the concept words are 气体 and 液体 | the source wraps one English word of "gas phase" and "liquid phase"; Chinese names each phase in one word (as ch01/1.2 天然气) |
| ch12/12.7/text.html | `data-concept="oxide"` spans, "nitric oxide–catalyzed decomposition", "conversion of nitric oxide" | the span wraps the whole compound name 一氧化氮 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as ch12/12.6) |
| ch12/12.7/text.html | `data-concept="acid"` spans, "nitric acid", "sulfuric acid" | the spans wrap the whole names 硝酸 and 硫酸 | the source wraps one English word of "nitric acid"; Chinese names each acid in one word |
| ch12/12.7/text.html | `data-concept="activated-complex"` spans, "transition state(s)" | the span wraps 过渡态 (glossary row transition state); the concept name is 活化络合物 | the book uses both words for one concept; the glossary row for the English word on the page is used |
| ch12/12.7/text.html | `data-concept="catalyst"`, `reactant` etc. spans in plurals ("catalysts", "reactants", "activation energies") | the span wraps the one Chinese form (催化剂, 反应物, 活化能) | English plural and article grammar collapses to one Chinese form (translate.md 4.1) |
| ch12/12.7/text.html | "the two diagrams", "both curves", "the uncatalyzed reaction", "the catalyzed reaction" (`data-ref` spans) | 这两幅图, 两条曲线, 未催化的反应, 催化的反应 inside the same spans | the referent labels of section.json are translated with the same words |
| ch12/12.7/text.html | `<em>a notably lesser <span activation-energy>activation energy</span></em>` | written 且<em><span>活化能</span>明显更低</em>, the em wrapping subject and predicate | Chinese has no attributive "notably lesser X" for this clause; the emphasis stays on the same idea |
| ch12/12.7/text.html | display equations `\text{diagram (a):}`, `\text{diagram (b):}`, `\text{other products}`, `\text{overall Reaction:}` | 图 (a):, 图 (b):, 其他产物, 总反应: (ASCII colon, ASCII parentheses inside math) | words in `\text{}` are translated (translate.md 5), ASCII punctuation in math |
| ch12/12.7/text.html | figure citations "Figure 12.19" … "Figure 12.25" in the prose, "Example 12.15" | 图 12.19 … 图 12.25; 例 12.15 | recorded once per book (translate.md 4.6); the example heading as ch12/12.6 |
| ch12/12.7/text.html | eyebrows `Figure 12.19` … `Figure 12.25`, the bare `Figure` of the example figure | kept; the table eyebrow written 表 12.3 | the checker matches the eyebrow against its row exactly (translate.md 4.6); table eyebrows are translated (as ch01) |
| ch12/12.7/text.html | photo credit of Figure 12.20 "(credit a: courtesy of Mario Molina; credit b: modification of work by NASA)" | （来源 a：马里奥·莫利纳提供；b：改编自 NASA 的作品） | the credit formula of chapter 1 for lettered credits |
| ch12/12.7/text.html | "the journal *Nature*" | 《自然》（*Nature*）杂志 | a journal title with a standard Chinese name; English kept in parentheses (translate.md 2.7, 4.3) |
| ch12/12.7/text.html | footnote 1 "The Nobel Prize in Chemistry 1995," Nobel Prize.org, accessed February 18, 2015, URL | the title kept in English with the translation in parentheses after it (“…”（1995 年诺贝尔化学奖）), the site name and URL kept, the date written 2015 年 2 月 18 日访问 | a bibliographic citation of an English web page: the title is the page's own name and must stay findable |
| ch12/12.7/text.html | "Mario J. Molina, Paul J. Crutzen, F. Sherwood Rowland", "Mexican", "MIT" | 马里奥·J·莫利纳, 保罗·J·克鲁岑, F·舍伍德·罗兰; MIT written 麻省理工学院（MIT） in the first sentence of the box and MIT after | person names without a fixed rendering (chapter glossary rows); the acronym is kept after its Chinese name (shared glossary row Massachusetts Institute of Technology) |
| ch12/12.7/text.html | alt of Figure 12.22 "N A D P superscript plus", "N A P D H", "G S S G", "A T P" | translated around the letters; the spaced letters and the source's "N A P D H" typo kept as printed, "superscript plus" written 上标加号 | the alt spells the labels of the figure letter by letter; the source's error stays |
| ch12/12.7/text.html | Table 12.3 cells "group elimination to form double bonds", "bond formation with ATP hydrolysis" | 基团消除以形成双键; 伴随 ATP 水解的键的形成 | the class names are rows pending at the chapter (氧化还原酶 … 连接酶) |
| ch12/12.7/figures.js | `\text{cat}` and `\text{uncat}` in the subscripts of E_a and k (slider label, readout, 3 constants) | 催化 and 未催化 | words in `\text{}` are translated; a subscript wants the shortest form of "catalyzed" and "uncatalyzed" |
| ch12/12.7/figures.js | hover names 'first'/'second' transition state of the catalyzed path | the ternary keeps both branches: 催化路径的第二个 / 催化路径的第一个 + 过渡态 | the ordinal word is part of the string; the code around it stays |
| ch12/12.7/section.json | `notes` | rewritten for the Chinese text; the English words "two transitions states" quoted with （原文如此） | the note quotes an error of the source's figure caption, which the translation cannot carry |
| ch12/12.7/section.json | cyl1 and e7 `answer.parts[].part` and `unit` | `part` ("$\kEa$ of the first step, diagram (a)", "(a)") and `unit` kept as printed | not in the translated list of translate.md 5 (owner note, as ch12/12.6 and ch01) |
| ch12/12.7/section.json | `figures[].original_caption`, `referents[].label`, exercise prompts and solutions: "(a)", "(b)" part labels | full-width （a）（b） in prose, ASCII inside `$…$` and `\text{}` | chapter 1 decision |
| ch12/12.7/section.json | e3 prompt math `\text{sunlight}` | 日光 | words in `\text{}` are translated; as ch12/12.6 |
| ch12/12.7/section.json | e8 prompt "Exercise 12.81", e9 prompt "Exercise 12.82" | 习题 12.81, 习题 12.82 | the numbers are kept; "Exercise" is a label of the book's apparatus, written 习题 as the exercise kind |
| ch12/12.7/section.json | footnote c-nitric-oxide | translated with the equation kept; "nitric oxide" 一氧化氮 | correction note of the preparation, translated whole |
| ch12/12.7/text.html | alt of Figure 12.22, "N A P D H" | 标注为“N A P D H” | the source spells NADPH with spaces in the alt; kept as printed, not corrected |
| ch12/12.7/section.json | exercises[5] prompt alt (5a), "about 2J" | 约 2 J | the book's own slip in the alt (the unit is spaced differently from the rest of the alt); kept as printed |

### Chapter 12: Doubtful choices and open questions

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.1/section.json, ch12/12.3/section.json, ch12/12.4/section.json, ch12/12.6/section.json, ch12/12.7/section.json | `answer.parts[].part` and `.unit` | kept English byte for byte ("order in NO", "(a) order", "half-life"); `answer.unit` `mol/L/year`, `d`, `times` kept | translate.md 5 does not list `part` as translated; the same open question as ch01/1.4 and 1.6; owner to decide whether these labels are translated |
| ch12/12.1/text.html, ch12/12.1/section.json | speed written 速度 (车速表, 瞬时速度, 平均速度, 氧出现的速度) | the shared row speed is 速率, the target of rate | collision recorded in config; owner may prefer 速率 for rate and 速度 for speed throughout |
| `glossary.zh-CN.json` | rows `rate-determining step` 速率控制步骤 and `rate-limiting step` 限速步骤 | both kept | the book uses the two English words for one idea; both Chinese forms are in use; the spans of 12.6 follow the source word |
| `glossary.zh-CN.json` | rows `activated complex` 活化络合物 and `transition state` 过渡态 | both kept; 12.7 spans on 过渡态 sit on the concept `activated-complex` | the book uses both words for one concept |
| glossary.zh-CN.json | row `molecular weight` 分子量 | kept as the book words it, with g/mol | Resolved in the global merge (2026-10-27): 化学名词 lists 分子量 (termonline 2026-10-27); ch09 and ch10 were swept from 相对分子质量 to it |
| `glossary.zh-CN.json` | row `extent of reaction` 反应进程 | the x axis of a reaction diagram | not the quantity 反应进度 (ξ) |
| ch12/12.3/section.json | e20 solution "L mol <sup>−1</sup>", e18 solution "(a) 2.5 × 10⁻⁴ …" | stray space and stray label kept | printed so in the source |
| ch12/12.6/text.html, ch12/12.6/section.json | "a single reactant entities" | 仅有单个反应物粒子; the grammar slip is described in `notes`, not reproduced | Chinese cannot carry the number disagreement |
| ch12/12.7/section.json, ch12/12.7/text.html | "two transitions states" (Figure 12.19 caption), NO against NO₂ in the converter box, "N A P D H" in the alt of Figure 12.22 | kept as printed; `notes` quotes the first with （原文如此） | errors of the source stay (translate.md 3.2) |
| ch12/12.3/text.html | "Dobsone units" in the alt of Figure 12.8 | 多布森单位 | the source misspells Dobson; the unit is named by its person name |
| ch12/12.6/section.json | e8 footnote, "Advanced Placement" | 化学大学先修课程（Advanced Placement）, 教育测试服务中心（Educational Testing Service） | the chapter merge did not add a row `Advanced Placement`: ch07 has it (大学先修课程, confirm owner) and the footnote adds 化学 for the subject; owner to confirm the exam name |
| ch12/12.2/section.json, ch12/12.7/section.json | exercises and "Link to Learning" boxes left out by the page agents (see each page's `notes` and `exercise_notes`) | unchanged | decided when the pages were built; listed here so the owner can see them |
| `glossary.zh-CN.json` | rows `reaction diagram` 反应图, `cattle chute` 牛通道, `frequency factor` 频率因子 | kept; the row notes now name the alternatives (反应能量图, 赶牛通道 / 牛栏通道, 指前因子 as the 化学名词 规范名 of A) | the reviewer was unsure of all three and the page spans follow the rows; owner to confirm, a change is a sweep of 12.5, 12.6, 12.7, chapter.json and the 12.5 exercise 8 |
| `glossary.zh-CN.json` | row `How Sciences Interconnect` 各门科学如何相互联系 (new) | same target as the shared row `How Sciences Interrelate`; the source eyebrow reads "Interconnect" | translate.md 2.6 asks one row per apparatus label; owner to confirm |
| ch12/intro/text.html | Figure 12.1 caption, "agama lizard" | 岩蜥 (was 岩鬣蜥, the name of the West Indian rock iguana *Cyclura*) | Agama is sold and described as 岩蜥 (Agamidae); medium confidence, owner to confirm |
| `glossary.zh-CN.json` | rows `supersonic aircraft` 超声速飞机, `p-nitrophenoxide ion` 对硝基苯氧负离子, `chlorocarbon` 氯代烃, `monatomic chlorine` 氯原子 | changed in the second review pass | 超声速 is the 物理学名词 form; 苯氧负离子 and 氯代烃 follow the reviewer and the row note; termonline lookups of the three returned no listed entry, so all three keep confirm termonline; 氯原子 is what the prose already said |
| ch12/12.5/text.html, ch12/12.5/section.json | 势垒 and 能垒 | 能垒 throughout, new glossary row `barrier`; 活化能垒 kept for "activation barrier" | 势垒 is the physics potential barrier |

### Chapter 12: English kept on purpose

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.7/text.html | footnote 1, the title "The Nobel Prize in Chemistry 1995", the site name and URL | English title kept with the Chinese in parentheses, URL kept, 2015 年 2 月 18 日访问 | a bibliographic citation of an English web page, findable by its title |
| ch12/12.7/text.html | journal *Nature* | 《自然》（*Nature*）杂志 | standard Chinese journal title |
| ch12/12.6/section.json | Advanced Placement, Educational Testing Service | English in parentheses | names of an exam and an organisation with no standard rendering |
| ch12/12.5/section.json | PNPP, PNP, ALP, PhET | abbreviations and the proper name kept | abbreviations of the source; PhET is a project name |
| ch12/12.7/text.html | NADPH, ATP, ClONO₂, MIT (after 麻省理工学院（MIT）), NASA | kept | formulas, acronyms and names |
| ch12/12.2, 12.3, 12.6 | Fisher III, NASA, Loren Kerns | credit names kept | names (translate.md 5) |

### Chapter 12: Unverified terms

`glossary.zh-CN.json` has 188 rows (184 from the merge, 2 added in the review pass: `How Sciences Interconnect` with confirm owner and `barrier`; and 2 added when the last pending file of 12.7 was folded: `photolysis` and `three-way reduction catalyst`). None carries a termonline entry URL: the page agents and the chapter glossary author did not look the terms up, so every row has `"confirm": "termonline"` (the 30 rows that arrived without a `confirm` got it in the merge). Of the 184 merge rows 143 are authority 化学名词, 5 are 物理学名词 and 36 are `book` (everyday words, apparatus and person names); person names (马里奥·J·莫利纳, 保罗·J·克鲁岑, F·舍伍德·罗兰) have no fixed rendering. Rows whose note says "not looked up" or names a variant (活化能垒 / 活化势垒, 催化转化器 / 三元催化器, 含氯烃 / 氯代烃, 牛通道 / 牛栏通道, 枪口火焰 / 枪口焰, 车速表 / 速度表) are the ones most worth a lookup. Six pending terms were not added (and the row ozone hole was dropped because ch09 has it with the same target) because another chapter's chapter glossary already has the same source and target (nitrosyl chloride, anesthetic, postulate, phosgene, ball-and-stick model) or a base form of it (Advanced Placement, ch07).

## Chapter 13 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M` and `Sim` kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose (图 13.1 to 图 13.9, 12 places) | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch13/13.1/text.html, ch13/13.3/text.html | photo credits (Figure 13.4 of 13.1, Figure 13.8 of 13.3) | （来源：http://images-of-elements.com/bromine.php）, （来源：改编自 “D Coetzee”/Flickr 的作品） | the credit formula of chapter 1; the URL and the names stay as printed (translate.md 5) |
| ch13/13.2/section.json, ch13/13.4/section.json | `answer.parts[].part` (13.2 cyl3 and e25, "(a) Q…"; 13.4 cyl4–cyl6, e74, e76, e78, e84, e88, "pressure of H₂S", "pressure of NO" …) | kept as printed | translate.md 5 keeps `answer.parts[].part` byte for byte; owner to decide whether it becomes translatable (as ch01 1.4 and 1.6) |
| ch13/13.4/section.json | exercise e86 prompt (d), "28 torr" | unit kept as `torr` | unit symbol kept as printed (translate.md 5) |

### ch13/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/intro/text.html | `the forward and reverse <span data-concept="reaction-rate">reaction rates</span>` | written 正反应和逆<span>反应速率</span>; the span wraps 反应速率 only | Chinese shares 反应速率 across 正 and 逆 (正反应和逆反应速率); the concept word stays in one span |

### ch13/13.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.1/figures.js | `topline` of Figure 13.2: `pl(nS, 'N_{2}O_{4} has', 'N_{2}O_{4} have')`, `pl(nJ, 'pair', 'pairs')`, `nJ === 1 ? 'has' : 'have'` | collapsed to one Chinese form: `nS + ' 个 N_{2}O_{4} 已分裂，' + nJ + ' 对 NO_{2} 已结合'`; the helper `pl` stays in the code, unused | English singular/plural and has/have agreement (4.1) |
| ch13/13.1/text.html | sim-head of Figure 13.2: spans `forward` and `reverse` in "the rates of the forward and reverse reactions" | the spans wrap 正 and 逆 in "正、逆反应的速率" | Chinese shares 反应 between the two adjectives; the span stays in its block (3.3) |
| ch13/13.1/text.html | spans `its` (`n2o4`, `no2`) in "its concentration" | spans wrap 其 | the pronoun is kept as a span on the referent |
| ch13/13.1/text.html | Figure 13.3 alt "juggling pins" and caption "clubs" | both written 杂耍球棒 | Chinese uses one word for juggling pins and clubs |
| ch13/13.1/text.html | Figure 13.4 caption `(credit: http://images-of-elements.com/bromine.php)` | （来源：http://images-of-elements.com/bromine.php） | credit formula of chapter 1; URL kept |
| ch13/13.1/text.html | Figure 13.2 and the liquid-bromine paragraph, span `liquid` | the span wraps 液态 | the state of the sample, as in ch01/1.2 and the 13.2 row; the glossary row liquid is the body of matter 液体 |

### ch13/13.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.2/text.html | #coupled, "two or more *coupled* equilibrium reactions" (span `coupled-equilibrium`) | written 涉及两个或多个相互关联的平衡反应: the span wraps 相互关联的 and the next span `chemical-equilibrium` wraps 平衡: `<em><span>相互关联的</span></em><span>平衡</span>反应` | a single reaction is not 多重, so the adjective "coupled" is rendered 相互关联的 (the noun 多重平衡 stays the glossary term); the source wraps "coupled" and "equilibrium" in two spans, both kept in place (3.3); review pass |
| ch13/13.2/text.html | #quotient, "stoichiometry of the balanced equation" (spans `stoichiometry`, `balanced-equation`) and #coupled, "stoichiometric coefficients" (span `coefficient`) | 化学计量 wrapped and 关系 left outside the span; 系数 wrapped inside 化学计量系数 | the glossary has 化学计量关系 and 化学计量系数 as compounds; the source spans wrap only "stoichiometry" and "coefficients" (3.3) |
| ch13/13.2/text.html | #homogeneous, "either liquid or gaseous phases" (span `liquid`) and "R is the gas constant" (span `gas`) | the span wraps 液态 in 液态或气态的相, and 气体 inside 理想气体常数 | Chinese says 液态 for the state of a body of matter (as in ch01/1.2) and 理想气体常数 is one compound (glossary row gas constant); the span stays in its block |
| ch13/13.2/text.html, ch13/13.2/section.json | Example 13.5 equations, Check Your Learning e25 (a) to (d): `0.50\;\text{at}\;400 °C` and the three like it | `\text{at}` written `\text{（}400\;^\circ\text{C}\;\text{时）}`, read `K_c1 = 0.50（400 °C 时）` (e25: `K_c = 0.50（400 °C 时）`); the same form on 13.3 and 13.4; the first record said `\text{，温度}`, which is not what the text had; review pass | "K = 0.50 at 400 °C" cannot be put word for word into Chinese; the numbers, the TeX around the `\text{}` and the unit stay as printed (3.5, 4.4) |
| ch13/13.2/figures.js | Figure 13.6 `topline`: `Mixture ${m} starts with $\kQc$ ${dir} $\kKc$, so it reacts in the ${way} direction.` with `dir` 'below'/'above', `way` 'forward'/'reverse' | template rewritten in Chinese word order with the same slots: `混合物 ${m} 起初的 $\kQc$ ${dir} $\kKc$，所以它沿${way}反应。`, `dir` 小于/大于, `way` 正向/逆向 | English sentence frame with adverb slots cannot carry the same order in Chinese (4.1) |
| ch13/13.2/figures.js | Figure 13.6 `${fmt(pr.v, 0)}% of the way` | written `已完成 ${fmt(pr.v, 0)}%` | idiom "of the way" translated for meaning (4.4) |
| ch13/13.2/figures.js | sim-magnitude-k `topline`: `${pct}% of the NO_{2} has become N_{2}O_{4}.` | `$K_c = …$ 时，${pct}% 的 NO_{2} 已变成 N_{2}O_{4}。`, the clause moved after the K slot | English "At K = …, x% of the … has become …" cannot keep its order in Chinese (4.1) |
| ch13/13.2/section.json | e21 solution: "homogenous" | written 均相 | the book misspells "homogeneous" in this answer; the misspelling has no Chinese counterpart (4.3), the answer is otherwise as printed |
| ch13/13.2/section.json | e9, e10, e12 prompts: the full stop inside `$…(aq).$` before "Is" / "KI<sub>3</sub> is composed of …" | the stop inside the math is dropped where the Chinese sentence goes on (`$…(aq)$ 表示的反应的平衡常数表达式`) and written 。 at the end of the Chinese sentence | the stop is English sentence punctuation placed inside the TeX; the TeX itself is unchanged (3.5) |

### ch13/13.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.3/figures.js | sim-le-chatelier, `phrase` (`${word} is added/removed`, `the volume is cut to a third`, `the mixture is heated/cooled to … °C`) | rebuilt in Chinese word order with the same slots: `加入/移出 ${word}`, `体积缩小为原来的三分之一`, `混合物被加热/冷却至 … °C`; the `n > 0 ? … : …` and `st.T > R.T ? … : …` branches kept | English passive "is added / is removed / is heated / is cooled" is built by concatenation (4.1) |
| ch13/13.3/figures.js | sim-le-chatelier, headline `Adding/Removing ${word} makes …` and `shifts right/left` | `${n > 0 ? '加入' : '移出'} ${word} 使 … ，平衡向${right ? '右' : '左'}移动。` | English gerund subject and adverb "right/left" become Chinese verb and direction word (4.1) |
| ch13/13.3/figures.js | sim-le-chatelier, final headline: `list(a)` ("A and B", "A, B and C"), `more X`, `less Y`, `a larger/smaller/the same K` | `list` joins with 、 and 和; `more X` becomes `X 更多`, `less Y` `Y 更少`, joined with ，; `kk` becomes `$K$ 变大 / 变小 / 不变`; the sentence is reordered to `平衡重新建立后，与之前相比，… ；$K$ …。` | English "and", comparatives and article phrases built by concatenation (4.1) |
| ch13/13.3/text.html | Equation `K_c = 50.0 at 400 °C`, `\text{at}` | `\text{（}400\;^\circ\text{C}\;\text{时）}`, read `K_c = 50.0（400 °C 时）` like 13.2 and 13.4 (review pass; was `\text{在}…\text{时}`) | Chinese says 在 … 时 around the condition; the addition is the other half of the preposition "at" |
| ch13/13.3/text.html | rate laws `forward\;…` and `reverse\;…` (display math, the words are outside `\text{}`) | kept as printed | translate.md 5 keeps all LaTeX outside `\text{}`; the two English words stay visible in the equation (owner to decide whether to wrap them in `\text{正向}` / `\text{逆向}`) |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, spans `carbonate` (calcium carbonate), `acid` (sulfuric acid), `hydrogen-carbonate` (hydrogen carbonate), `ion` (hydrogen ions) | the span wraps 碳酸 inside 碳酸钙, 酸 inside 硫酸, 碳酸 (the glossary target of hydrogen carbonate), and 离子 inside 氢离子 | the glossary names the compounds as single words (碳酸钙, 硫酸, 氢离子) while the source wraps one English word of each; the span stays in its block (3.3) |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, 2nd paragraph: "reacting to produce **hydrogen carbonate**, a weak acid" (span `hydrogen-carbonate`) | written 生成<span>碳酸</span>，这是一种弱酸; the ion that follows is 碳酸氢根离子 (intro alt too) | the book calls H₂CO₃ "hydrogen carbonate", a misnomer with no Chinese counterpart; the compound is written by its name 碳酸 (a departure from translate.md 3.2, recorded here), the anion HCO₃⁻ 碳酸氢根离子. The span's concept `hydrogen-carbonate` is 碳酸氢盐 in 18.6, so its hover opens a different term; the span stays in place (3.3); review pass |
| ch13/13.3/text.html | #haber, "at low temperatures" (three places) and span `temperature` | written 在低温下 / 低温有利于 / 低温下的; the span wraps the whole 低温 | Chinese says 低温, not 低温度; the span stays in its block, as 高温 in 13.4 (3.3); review pass |
| ch13/13.3/text.html | #temperature, spans `temperature` ("temperature-dependence") and `exothermic-and-endothermic` ("endothermic", "exothermic") | the span wraps 温度 in 温度依赖关系 and 吸热的 / 放热的 (with 的) | the Chinese compound and the glossary adjective forms |
| ch13/13.3/text.html | Equilibrium and Soft Drinks, "flat" | written “跑气” | idiom for a drink that has lost its carbonation, translated for meaning (4.4) |
| ch13/13.3/text.html | #haber, "two billion pounds" | 二十亿磅 | Chinese counts in 亿; the unit has no symbol in the source, so it takes its name 磅 (glossary row pound; 4.4) |
| ch13/13.3/section.json | notes: the sentence about "Le Chatelier’s principle" written once without its accent | the English form kept in quotation marks inside the Chinese sentence | a sentence about English spelling (4.3) |
| ch13/13.3/text.html | spans `reaction-rate` ("rates", "rate", "rate of the forward reaction", "rate of this reaction") and `partial-pressure` ("pressures", "pressure") | the spans wrap 速率, 正反应的速率, 逆反应的速率, 这个反应的速率 and 压强; the glossary targets are 反应速率 and 分压 | the source wraps the bare word "rate" or "pressure" in these places, and the Chinese keeps the word the sentence uses (速率 alone, 压强 alone); the span stays in its block, the concept word is inside it (3.3) |
| ch13/13.3/text.html | spans `dissolved` ("dissolved carbon dioxide", "dissolved CO₂") | the span wraps 溶解的 | glossary row dissolved is 溶解的; recorded because the verb row dissolution is 溶解 and the lone 溶解 appears in the displayed equation |

### ch13/13.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch13/13.4/text.html | Example 13.8, "at high temperatures" (span `temperature`) | the span wraps 高温 in 在高温下 | Chinese says 高温 where English says "high temperatures"; the compound holds the concept's word, as 室温 and 体温 in chapter 1 (3.3) |
| ch13/13.4/text.html | Example 13.8, "Nitrogen oxides" (span `oxide`) | the span wraps the whole compound name 氮氧化物 | Chinese names the compound in one word; the span cannot wrap only "oxides" (3.3; as 氧化汞(II) in chapter 1) |
| ch13/13.4/text.html | Example 13.7, "iodide ions", "triiodide ions" (span `ion`) | the span wraps 离子 inside 碘离子 and 三碘离子 | glossary names the ions as single words (碘离子, 三碘离子) while the source wraps the one word "ions" (3.3) |
| ch13/13.4/text.html | Example 13.8 prompt, `${\text{N}}_{2}(g)+{\text{O}}_{2}(g)\rightleftharpoons 2\text{NO}(g),$` | the comma inside the TeX is dropped; the Chinese sentence goes on with 的 | the comma is English sentence punctuation placed inside the math, as the full stops of chapter 13.2 e9, e10, e12 (3.5) |
| ch13/13.4/section.json | `\text{at}` in `K_c = 0.50 at 400 °C` (e64), `K_c = 4.90 × 10^2 at 550 °C` (e68), `K_P = 4.08 × 10^−25 at 25 °C` (e70), `K_c = 50.2 at 448 °C` (e79) | `\text{at}` written `\text{（}T\;\text{°C}\;\text{时）}` (or the `{}^{\circ}` form), read `K_c = 0.50（400 °C 时）`, the numbers and the TeX around it as printed; review pass (the first record said `\text{，温度}`) | "K = 0.50 at 400 °C" cannot be put word for word into Chinese; the same solution as ch13/13.2 (3.5, 4.4) |
| ch13/13.4/text.html | Example 13.10, `\text{3 sig. figs.}`, `\text{2 sig. figs.}` | `\text{3 位有效数字}`, `\text{2 位有效数字}` | the English abbreviation "sig. figs." inside `\text{}` is spelled out in Chinese (4.3) |
| ch13/13.4/figures.js | sim-small-x, topline | `$x$ is P% of [A]i, and the approximation … puts $x$ Q% too high.` rebuilt as `$x$ 是 [A]i 的 P%，近似 … 使 $x$ 偏高 Q%。` with the same slots | English "X is P% of Y … puts x Q% too high" cannot keep its word order in Chinese (4.1) |
| ch13/13.4/figures.js | sim-small-x, hover names `x = … M, the positive root of the quadratic`, `x cannot exceed … = … M` | `x = … M，一元二次方程的正根`, `x 不能超过 … = … M` | English clause order; the slots stay (4.1) |
| ch13/13.4/figures.js | sim-small-x, readout small line `If $x \ll c$, then $x \approx …$ = … M.` | `若 $x \ll c$，则 $x \approx …$ = … M。` | if/then clause (4.1) |
| ch13/13.4/text.html | spans inside one block (#changes, #calc-k, #missing, #initial, Examples 13.7–13.10, sim-head) | a few spans stand in a different order from the source inside their paragraph (e.g. 反应物和产物的平衡浓度 for "equilibrium concentrations of the reactants and products") | Chinese word order; no span leaves its block, and the id and concept multisets are equal (3.3) |

### Chapter 13: Other things for the owner

- **New glossary rows.** `glossary.zh-CN.json` has 170 rows: the 150 rows of the chapter staging (concept names, section titles, terms of the pages) and 20 new rows from the page agents (pending rows folded in: intro 5, 13.2 4, 13.3 3, 13.4 8; 13.1 had none; the sixth intro row, hydrolysis, was already a row). 107 rows carry `"confirm": "termonline"` and 51 `"confirm": "owner"`; the rows without `confirm` are either plain words or were found at termonline by the page agent (dioxane, ethyl acetate); no lookup was repeated in the merge. Doubtful new rows: 辛烷值助剂 (octane enhancer; found in termonline 石油名词 in the review pass, replacing 辛烷值增强剂), 完整的化学方程式 (the book's "complete chemical equation"; ch4 has 分子方程式 for the same idea), 夹套 (jacket of the catalyst chamber, engineering word, no authority), 血浆 (blood plasma; the shared plasma is 等离子体, so not reused), 氯仿 (化学名词 may prefer 三氯甲烷), 十水合硫酸钠, 氧合血红蛋白.
- **Targets made identical to the other chapters' chapter glossaries in the merge.** acid ionization is 酸电离 (chapter 14 row; the intro first had 酸的电离, changed in the Figure 13.1 caption); Joseph Priestley is 约瑟夫·普利斯特里 (chapter 9 row; 13.3 first had 约瑟夫·普里斯特利, changed in the text, 2 places). hydrolysis 水解, carbonic acid 碳酸, red blood cell 红细胞, ethyl acetate 乙酸乙酯, chloroform 氯仿, oxyhemoglobin 氧合血红蛋白, ammonium chloride 氯化铵 and total ionic equation 完全离子方程式 already agree with the chapter glossaries of chapters 2, 3, 4, 9, 12, 14 and 18.
- **Rows that differ from a neighbouring chapter glossary, kept on purpose.** `hydrogen carbonate` is 碳酸 here (the source calls H₂CO₃, a weak acid, "hydrogen carbonate"; chapter 18's row is the salt 碳酸氢盐), `bicarbonate` is 碳酸氢根 (the anion HCO₃⁻; chapter 18's row is the salt 碳酸氢盐). Both rows say so in their note and are marked for the owner.
- **Display math keeps `forward` and `reverse`.** The rate-law equations of 13.3 contain the English words outside `\text{}`; translate.md 5 keeps them byte for byte. The owner can decide whether they become `\text{正向}` / `\text{逆向}`.
- **English in the chapter files that is kept.** `Figure 13.N` and `Sim` eyebrows; `answer.parts[].part` fields; the English `unit` strings of `chapter.json` variables ("depends on the order of the forward reaction", "none") and the `dimension` "none" of the type `equilibrium-constant` in `book-rows.json` are the staging's and untouched (the type `equilibrium-constant` was to be set to 无 with this chapter, see the chapter 1 notes); the web address in the credit of 13.1; the OmniStax name in the exercise notes; `torr`.
- **Spans that are shorter than the glossary target.** Recorded in the scenario rows: 速率 and 压强 (13.3), 多重 + 平衡 (13.2), 化学计量, 系数, 液态, 高温, 离子, 碳酸 in 碳酸钙, 酸 in 硫酸, 温度 in 温度依赖关系, 其, 低温 (13.3 #haber, three places: the span wraps the whole 低温, as 高温 in 13.4). The data-concept spans of the five pages were checked one by one against the glossary targets; the remaining shorter wraps are the same kind.
- **Page-agent dissent about one source.** None: the pages agreed on every term; the two differences with other chapters' chapter glossaries were reconciled above.
- **Humanizer review and `npm run dev` read-through** are outstanding for the owner.

## Chapter 14 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); same as ch01 |
| ch14/14.2/text.html, ch14/14.7/text.html | table eyebrows `Table 14.1`, `Table 14.2` | written 表 14.1 and 表 14.2 | translate.md 5 lists a table's eyebrow as translated; same as ch01 |
| ch14/intro, 14.2, 14.3, 14.6/text.html | photo credits (9 in the text.html files) | （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：…；b：…）; names kept as printed ("HomeSpot HQ"/Flickr, John Tann, Mark Ott …) | the chapter-1 credit formula |
| every text.html, section.json | `data-concept` spans on Chinese compounds, adjectives and ion names | the span wraps the Chinese word that carries the concept: the whole compound for `acid` / `hydroxide` / `nitrate` (硝酸, 氢氧化钾, 硝酸铝, 碳酸 …), 氢氧根 beside 离子 for `hydroxide` + `ion` (the concept row 氢氧化物 is the compound class, the ion is 氢氧根离子), 碳酸根 for `carbonate`, 酸性 / 碱性 / 中性 (with or without 的) for `acidic-solution` / `basic-solution` / `neutral-solution`, 缓冲 beside 溶液 for `buffer-composition`, 极性 for `bond-polarity`, 大气 for `earth-atmosphere`, 酸碱反应 for `bronsted-lowry-acids-bases`, 体温 for `temperature`, 液态 for `liquid`, 计 for `meter` | Chinese names each in one word and the English concept word is only a part of it, or the book's concept term is longer than the word the source wraps (shorter or compound wraps, as ch01 天然气, 室温); found in the chapter sweep |
| every text.html, section.json | concentration modifiers written with a hyphen in the source (`0.125-M solution`, `0.0125-<em>M</em>`, `0.10-M NaOH`, also in `data-original-caption`) | written 0.125 <em>M</em> 的…溶液 (hyphen dropped, `M` kept as a separate word) | the English compound-modifier hyphen has no Chinese counterpart (as ch01/1.6); one form on every page (review pass) |
| ch14/14.3/text.html | `<span data-concept="ph">PH</span><sub>3</sub>` in "SiH4 < PH3 < H2S < HCl" | kept as printed: the `ph` span stays on `PH` of PH₃ | the book's mis-tagged span in a formula; the formula stays byte for byte (translate.md 5), not a pH concept |
| ch14/14.2/text.html, ch14/14.3/text.html | alt attributes: the screen-reader spelling `p H`, `p Hydrion` | written pH, pHydrion (the spaced letters of formulas such as `H C l` are kept) | one rule for the chapter: Chinese alt text reads better with pH, as 14.6 and 14.7 already had it (review pass) |

### ch14/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/intro/text.html | `<span data-concept="liquid">Liquid</span> water` | span wraps 液态 (of 液态水) | Chinese says 液态水 for liquid water; the concept word 液体 would read as a noun (translate.md 3.3) |
| ch14/intro/text.html | `<span data-concept="system">systems</span>`, `<span data-concept="chemical-equilibrium">equilibrium</span>` | wrap 体系 and 平衡 (English plural collapses) | concept names `system` and `chemical-equilibrium` are still English in book.json; 体系 and 平衡 follow the glossary compounds 缓冲体系, 酸碱平衡 |
| ch14/intro/text.html | `H+` in the paragraph | kept as printed, written H+ without superscript | the book prints it so (recorded in section.json notes) |

### ch14/14.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.1/text.html | #definitions, "alkali (<span base>base</span>) <span mixtures>solutions</span>" | written 与碱溶液接触后, the span on 碱, the parenthetical gloss "(base)" not written | alkali and base are both 碱 in the glossary, so the gloss would read 碱（碱）(translate.md 4.5) |
| ch14/14.1/text.html | #definitions, "The significance of hydrogen was reemphasized in 1884 when Arrhenius defined …" | written 1884 年，当…将酸定义为…时，氢的重要性再次得到强调 | the Chinese order puts the clause with 当…时 before the main clause; the two ideas stay in one sentence |
| ch14/14.1/text.html, ch14/14.1/section.json | `hydroxide` spans in "hydroxide ion", "hydroxide anions", "hydroxide" (conjugate-pairs, ionization, autoionization, Examples 14.1 and 14.2) | the span wraps 氢氧根, and the neighbouring `ion` / `anion` span wraps 离子 / 阴离子 (氢氧根离子, 氢氧根阴离子) | the concept row is 氢氧化物 (the compound class) but Chinese names the ion 氢氧根; the span cannot wrap only "hydroxide" as a word (3) |
| ch14/14.1/text.html | #conjugate-pairs, "conjugate pairs" in `<em><span conjugate-acid-base-pairs>` | written 共轭酸碱对 | the concept name and glossary row; 共轭对 alone is not the chemistry term |
| ch14/14.1/text.html | #autoionization, "an amphiprotic substance" (span `amphiprotic-species`) | the span wraps 质子两性 and the noun 物质 stays outside | the glossary row is the adjective 质子两性的 / the noun 质子两性物种; the book says "substance" here, so the span wraps the adjective part only (3) |
| ch14/14.1/text.html | #autoionization, "Liquid water undergoes autoionization" (spans `liquid`, `water-autoionization`) | written 液态水的自电离, `液态` on liquid and `水的自电离` on the concept | state of matter takes 态 (as in ch01 1.2); the concept row is 水的自电离 (see ch01 liquid/solid spans) |
| ch14/14.1/text.html | #autoionization, "approximately two out of every billion" | written 每十亿个水分子中约有两个 | Chinese counts a billion as 十亿; number unchanged (4.4) |
| ch14/14.1/text.html | Example 14.2, "from the stress of increased hydronium ion concentration" | written 水合氢离子浓度增大这一扰动 | Chinese equilibrium shifts are caused by 扰动, not 压力; same meaning |
| ch14/14.1/text.html, ch14/14.1/section.json | "hydronium ion", "hydroxide ion", "ammonium ion" … with `ion` span | span wraps 离子 only, preceded by 水合氢 / 氢氧根 / 铵根 / 氟 / 吡啶鎓 | Chinese names the ion in one word; the span stays in its block |
| ch14/14.1/text.html | Example 14.1 and 14.2, h4 "Solution" and "Check Your Learning" | 解 and 学习检测, the ch01 forms | same as ch01 |
| ch14/14.1/text.html, ch14/14.1/section.json | `\text{at}` in the Kw display (summary_html) | `\text{at}\;25\;{}^{\circ}\text{C}` becomes `\text{（在}\;25\;{}^{\circ}\text{C}\text{时）}` | the English preposition precedes the value, Chinese brackets it with 在 … 时 (4.1); TeX outside \text{} unchanged |
| ch14/14.1/section.json | e9, e10 solutions, labels `BA`, `CB`, `BB`, `CA` | the letters kept; the key sentence written 标记为：布朗斯特–劳里酸 = BA；其共轭碱 = CB；… | abbreviations of the English names, printed after the formulas (4.3) |
| ch14/14.1/section.json | e9 solution (e) "OH⁻(CB and CA)" | written OH⁻(CB 和 CA) | the English "and" inside the label |
| ch14/14.1/figures.js | fig-water-ammonia, hover names `` `${NAME[s]} of the ${who}` `` (2d `hits` and 3d `pickable`) | become `` `${who}中的${NAME[s]}` `` (水分子中的氧原子); `MOL[*].name` and `NAME` carry the nouns without articles | English genitive "X of the Y" (4.1) |
| ch14/14.1/figures.js | fig-water-ammonia, `ROLE` and `STEP` labels `H_{2}O (acid)`, `Remove H⁺`, `Add H⁺` | written `H_{2}O（酸）`, `移去 H⁺`, `加上 H⁺` | full-width brackets in Chinese text; the verbs 移去 / 加上 name the step |
| ch14/14.1/figures.js | sim-kw, `headline` "there is N times as much hydronium ion as hydroxide ion" | written 水合氢离子是氢氧根离子的 N 倍 (both branches) | English "times as much … as" has the Chinese form …是…的 N 倍; the slots keep their branch (4.1) |

### ch14/14.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.2/text.html | How Sciences Interconnect, `temperature` span on "high temperatures" | written 那里的<span>高温</span>使…; the span wraps the compound 高温 | the source wraps one word; Chinese names it in the compound 高温 (review pass) |
| ch14/14.2/text.html | `hydroxide` spans in "hydroxide ions" and "hydroxide" (acidic-basic, p-functions, neutral-ph); `ion` spans after hydronium | the `hydroxide` span wraps 氢氧根 and the neighbouring `ion` span wraps 离子; "hydronium ion" has the `ion` span on 离子 only, preceded by unspanned 水合氢 (a "hydronium and hydroxide ions" pair keeps one `ion` span) | the concept row is 氢氧化物 (the compound class) but Chinese names the ion in one word; same as 14.1 |
| ch14/14.2/text.html | "potassium hydroxide" (Example 14.6, two spans `hydroxide`); "carbonic acid", "sulfuric acid", "nitric acid", "Acid rain" (`acid` spans) | the span wraps the whole compound word 氢氧化钾, 碳酸, 硫酸, 硝酸, 酸雨 (and 酸 in 酸损害) | Chinese names each compound in one word; the span stays in its block (as 1.2/1.3 ch01) |
| ch14/14.2/text.html | `meter` span in "pH meter" | the span wraps 计 only: `pH` `<span>计</span>` | the concept meter is the unit 米; here the instrument suffix 计 is the nearest word |
| ch14/14.2/text.html | acidic-basic, "A solution is neutral if … acidic if … basic if …" | the adjectives carry the spans as 中性的, 酸性的, 碱性的; the sentence is reordered as 溶液如果含有…，就是中性的 | Chinese conditional order; the three strong and span wraps stay |
| ch14/14.2/text.html | neutral-ph, "acidic solutions are those with … molarities" | written 酸性溶液是指…的溶液, the plural "those" becomes 溶液 | English pronoun "those" |
| ch14/14.2/text.html | neutral-ph, "references to pH values" | written 提到 pH 时均默认指 25 °C 时的 pH | "values" collapses; English plural has no Chinese form (4.1) |
| ch14/14.2/text.html | Example 14.4, "What is the pH of stomach acid, a solution of HCl …" | written 胃酸是 HCl 的溶液，其…浓度为…，胃酸的 pH 是多少？ with the span `ph` on 胃酸的 pH | the apposition "stomach acid, a solution of …" precedes the question in Chinese; sentence kept as one |
| ch14/14.2/text.html | Example 14.5 display `\text{antilog of }-7.3` | written `-7.3\text{ 的反对数}` (and `\text{or}` → `\text{或}`) | Chinese puts the operand before 的反对数; TeX outside \text{} unchanged |
| ch14/14.2/text.html, ch14/14.2/section.json | Figure 14.3 caption "It also is corrodes statues" | written 它还会腐蚀…雕像; the typo of the source cannot be reproduced in Chinese; section.json `notes` keeps the English quotation | a grammatical slip in English only (root item 13); no Chinese equivalent |
| ch14/14.2/text.html | credits "modification of work by" | （来源 a：改编自 X 的作品；b：改编自“Eden, Janine and Jim”/Flickr 的作品）, （来源 b：…）, （来源：…） | chapter-1 formula |
| ch14/14.2/text.html | alt of Figure 14.3 "revolutionary war era"; alt of Figure 14.5 "subscript" and the spaced letters `H C l` | 美国独立战争时期; 下标; the spaced letters of formulas kept as printed | cultural reference translated for meaning (4.4): 革命战争 would read as China's; the alt's letter-by-letter spelling of formulas is kept (the spaced `p H` is written pH, see Every page) |
| ch14/14.2/text.html, ch14/14.2/section.json | "autoionization constant" (span), "ion product of water" (span), exercise e17 "ionization constant for water" | written 自电离常数, 水的离子积常数, 水的离子积常数 | the book names K_w three ways; the glossary has 水的离子积常数, and 水的电离常数 is a different quantity in Chinese |
| ch14/14.2/section.json | derivation `pkw` node 2, `\text{at}\ 25\ {}^{\circ}\text{C}` | becomes `\text{（在}\ 25\ {}^{\circ}\text{C}\text{时）}` | the English preposition precedes the value; Chinese brackets it with 在 … 时 (4.1), as in 14.1 |
| ch14/14.2/section.json | e19 solution "(a) …; (b) …" | labels written （a）…（d） and the semicolons ； | prose punctuation (3.5) |
| ch14/14.2/figures.js | sim-ph-scale `kind` ('neutral' / 'acidic' / 'basic') and `rel` branch tests | the code values become 中性 / 酸性 / 碱性 (the labels of Table 14.1), the topline reads 呈${kind}, and the `rel` comparisons follow them (kind === '中性' …) | the string is both the reader-visible word and the lookup in `rel`; logic unchanged |
| ch14/14.2/figures.js | sim-ph-scale hover name `${name}: pH about ${pv} at 25 °C` | written `${name}：25 °C 时 pH 约为 ${pv}` | Chinese word order |
| ch14/14.2/figures.js | topline `At ${T} °C, pH ${p} is ${kind}: … ${rel} …` | written `在 ${T} °C 时，pH ${p} 是${kind}：… ${rel} …。` with rel 等于 / 大于 / 小于 | Chinese word order; the slots keep their branches |
| ch14/14.2/figures.js | sim-ph-scale `power` ('10^0 or 1') | written `$10^{0}$ 或 1` | English "or" between the two names of the same number; the TeX run is unchanged (4.1) |
| ch14/14.2/figures.js | sim-ph-scale column heading "Sample Solution" | written 示例溶液 (row `Sample Solution`) | the column lists example substances (gastric juice, wine, blood), so 示例溶液; 样品溶液 would be the analytical sample being measured (review pass) |

### ch14/14.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.3/text.html | spans on named acids and hydroxides: `acid` on 硝酸, 高氯酸, 亚硝酸, 乙酸, 甲酸, 硫酸, 亚硫酸 (source "nitric <span>acid</span>" etc.), `hydroxide` on 氢氧化铝, 氢氧化钙, 氢氧化钾 | the span wraps the whole Chinese compound that contains the concept's word, as in ch01 (天然气) | the source wraps one English word of "nitric acid", "aluminum hydroxide"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.3/text.html | `hydroxide` span in "hydroxide ion" (lines of the conjugate and structure sections, Example 14.13) | the span wraps 氢氧根, the ion's word, beside `ion` on 离子; the concept's name is 氢氧化物 | the source wraps "hydroxide" of "hydroxide ion"; Chinese names the ion 氢氧根离子 (glossary), not 氢氧化物 |
| ch14/14.3/text.html | `base` spans on "bases" after "weak acids and" / "strong acids and" (first paragraph) | the span wraps 弱碱 and 强碱 | the source wraps "bases" alone; Chinese forms 弱碱 and 强碱 as one word, each containing the concept's word 碱 |
| ch14/14.3/text.html | "wheres" (conjugate section, "wheres those above hydronium ion") and "much lesser than" (Example 14.12) | written 而 and 远小于; section.json `notes` keeps the two English quotations as the note's subject | misspellings of English words cannot be carried into Chinese (translate.md 4.3); the note no longer holds for the Chinese text of these two places |
| ch14/14.3/text.html | percent ionization formulas: the base display `\text{\% ionization}` and the acid display `\%\;\text{ionization}`; the strong-acid/conjugate-base array `\text{strong}\;\text{acid}`, `\text{conjugate}\;\text{base}` | written `\text{电离百分数}` (the `\%\;` outside `\text{}` dropped), `\text{强酸}` and `\text{共轭碱}` (the `\;` dropped) | 电离百分数 (glossary) already carries the percent and has no word-for-word Chinese form; 强酸 and 共轭碱 are one word each, so the thin space between the two source words goes (review pass) |
| ch14/14.3/text.html | Example 14.12, `(1.8\%\;\text{of 0.534})` | written `(1.8\%\;\text{，占 0.534 的比例})` | English "1.8% of 0.534" puts the base after the percent; the math stays in its order and the Chinese text carries the relation |
| ch14/14.3/text.html | Example 14.12 sentence "permits the simplifying assumption that x will be much lesser than 0.534" | rendered 远小于 | see "much lesser than" above |
| ch14/14.3/text.html | sentence with the soluble ion `[Al(H2O)2(OH)4]⁻` in the aluminum hydroxide paragraph | "by reaction with hydroxide ion" moved before the formula (通过与氢氧根离子反应，转化为可溶离子 …：) | the math run ends with its comma and the sentence needs the verb phrase before the object in Chinese |
| ch14/14.3/figures.js | sim-acid-water, topline (`one`, `who`, the plural branches `'has' : 'have'`, `'their protons' : 'its proton'`) | the line is rewritten in Chinese word order with the same slots: `在 ${cs} M 的${A.name}溶液中，${who}已把质子转移给水，pH 为 ${ph}。`; `who` is `每个${A.unit}都`, `每 100 个${A.unit}中不到 1 个` or `每 100 个${A.unit}中有 ${s.n} 个`; the `one = A.unit.slice(0, -1)` singular is dropped and the `unit` words are 分子 / 离子 | English plural, singular and agreement branches (4.1) and an English sentence frame that cannot carry the slots in order |
| ch14/14.3/figures.js | sim-acid-water, hover names `an`/`bn` (`'a molecule of hydrogen chloride, HCl'`, `'a chloride ion, Cl⁻'` …) | become `氯化氢分子，HCl`, `氯离子，Cl⁻` …; the articles `a`/`an` are dropped | English article grammar collapses to one Chinese form (4.1), as in ch01 |
| ch14/14.3/figures.js | sim-conjugate-ladder, `cap = (s) => s[0].toUpperCase() + s.slice(1)` used in `headline` | `cap` is the identity function | English sentence-initial capital (4.1); the call sites stay |
| ch14/14.3/figures.js | sim-conjugate-ladder, `headline` sentences and `ka`/`kb` hover words (`'a strong acid'`, `'not an acid in water'` …) | written in Chinese word order, e.g. `${p.an}是强酸，其共轭碱${p.bn}的强度可以忽略不计。` | English sentence frames with the name in the nominative cannot carry the slots in order (4.1) |
| ch14/14.3/figures.js | sim-conjugate-ladder, row `P('H2', …, 'hydrogen', 'H⁻', 'hydride ion')` | the acid's name is 氢气 | the glossary row 氢 is the element; the substance H₂ is 氢气 (pending row) |
| ch14/14.3/section.json | exercise e58, hint of part (e) "phenylamine (aniline)" | written 苯胺 once | both English names are 苯胺 in Chinese (glossary row aniline); the alias cannot be shown (4.3) |
| ch14/14.3/section.json | exercise e43, solution (a) "polyoxy acids" | written 含氧酸 | no standard Chinese term for "polyoxy acid"; the glossary row oxyacid is used (pending row, doubt) |
| ch14/14.3/section.json | exercise e56 prompt | `确定下面这种离子的 K_a：硫酸氢根离子 ${…}.$ 在 0.10 M 溶液中，该酸电离了 29%。` | the math run `HSO₄⁻.` carries its own full stop; the sentence was reordered so that the run ends its clause (review pass), the run itself is byte for byte |
| ch14/14.3/section.json | `answer.parts[].part` of cyl7 ("percent ionization") | kept in English | translate.md 5 keeps `answer.parts[].part` byte for byte (the owner decides, translation-notes.md) |
| ch14/14.3/text.html, ch14/14.3/section.json | math runs that carry their own closing `,` `.` `?` (Example 14.8, exercises e15, e18, e33, Example 14.14 and the like) | reordered so that each run ends its clause: Example 14.8 `已知亚硝酸根离子 ${NO₂⁻},$ 利用它的 K_b 计算…`; e15 `其共轭酸为弱酸 ${CH₃NH₃⁺},$ 求该弱酸在 25 °C 时的电离常数。`; e18 `哪一个是较强的碱：(CH₃)₃N 还是 ${H₂BO₃⁻?}$`; e33 see its row; Example 14.14 `…的 pH 是多少，若溶质为 ${HSO₄⁻?}$` (one interrogative sentence); the acid-strength and base-strength sentences | the punctuation is part of the source's `$…$` run, which is kept byte for byte (translate.md 5); only a run whose clause cannot be reordered stays as printed, e.g. e22 `BrO₂⁻,$` (review pass) |
| ch14/14.3/section.json | exercises e4 and e38 prompts, `NH<sub>3,</sub>` | the comma inside `<sub>` is dropped: `NH<sub>3</sub> 溶液` | the comma sits inside the HTML `<sub>`, not in a math run; the book's slip, not carried (review pass) |
| ch14/14.3/text.html | "general molecular formula" and "relatively insoluble" (Ternary acids, amphoterism) | the `molecular-formula` span wraps 通式 and the `insoluble` span wraps 难溶 | the Chinese words are 通式 and 难溶; the glossary words 分子式 and 不溶 do not fit (4.5, review pass) |

### ch14/14.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.4/text.html, ch14/14.4/section.json | spans on named acids: `acid` on 盐酸 (Example 14.15 ×2, first section), 乙酸 (Examples 14.16 and the basic-ions section), 多元酸 (metal-ions section) | the span wraps the whole Chinese compound that contains the concept's word | the source wraps one English word of "hydrochloric acid", "acetic acid", "polyprotic acid"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.4/text.html | `nitrate` span in "aluminum nitrate" (metal-ions section) | the span wraps 硝酸铝, the whole compound name | the source wraps "nitrate" alone; Chinese names the compound in one word (as for `acid` above) |
| ch14/14.4/text.html | "acid or base ionization" (first section, basic-ions section) | written 酸电离或碱电离, the span `acid-ionization` on 酸电离 and `base-ionization` on 碱电离 | the source's elliptical "acid or base ionization" wraps "acid" and "base ionization"; Chinese cannot leave 酸 bare of 电离, and the glossary term is 酸电离 |
| ch14/14.4/text.html | "Aqueous salt solutions" (first section) | written 盐的水溶液 with the `mixtures` span on 溶液 only (盐的水<span>溶液</span>) | the source wraps "solutions" alone; 水 stays outside the span to keep its extent |
| ch14/14.4/text.html | "weak acid cations" (conclusion of the acidic-ions section), "weak base anions" (basic-ions section) | written 弱酸性阳离子, 弱碱性阴离子 with the span on 弱酸 / 弱碱 and 性 outside | English noun-modifier stack; Chinese needs 性 to attach 弱酸 to 阳离子 |
| ch14/14.4/text.html | "the base ammonia" (acidic-ions section) | written 氨这种碱（NH₃）, the `base` span on 碱 | the source says "the base ammonia", not "weak base"; the apposition is turned into 氨这种碱 so no word is added, the span stays on 碱 |
| ch14/14.4/text.html | `group` span in "group 1 and 2", "(group 1)", "(group 2)" | written 第 1 和第 2 族 (span on the shared 族), 第 1 族, 第 2 族 | Chinese gives the ordinal before 族; "1 and 2" shares one 族 |
| ch14/14.4/text.html | "both acidic and basic ions" (both-ions section) | `acidic-solution` span on 酸性 and `base` span on 碱 in 碱性 (碱<span>性) | the source wraps "acidic" with the acidic-solution concept and "basic" with `base`; the spans keep their concepts |
| ch14/14.4/text.html | "the bonded water molecules’ O–H bonds are more polar than in nonbonded water molecules" | written 键合水分子的 O–H 键比未键合水分子中的极性更强, the `polar` span on 极性 | English comparative "more polar"; Chinese says 极性更强 |
| ch14/14.4/text.html | Example 14.17 (b), "4.7 × 10^−11,and its" | written ，且其 | the source runs the comma and "and" together without a space; Chinese has no such space, so the misprint cannot be carried (the section.json `notes` says so) |
| ch14/14.4/text.html | Example 14.17 (c), the paragraph break before "and its" | the first paragraph ends ，and the second begins 且其 | the source splits the sentence at the comma; kept |
| ch14/14.4/text.html | Example 14.16 and the `\text{for}` inside `\kKbion\;(\text{for}\;…)` and `\kKa\;(\text{for}\;…)` | written `\text{对于}` | a word in `\text{}` in math is translated (translate.md 5) |
| ch14/14.4/text.html | Example 14.18 display `(\text{an acidic solution})` | written `(\text{酸性溶液})` | the article dropped (4.1) |
| ch14/14.4/text.html | "when dissolved" in the preamble of the metal-ions section; "dissolution of aluminum nitrate" | 溶解 for "dissolved" (span `dissolved` on 溶解) and the noun "dissolution" written 溶解 | one Chinese word for the adjective-participle and the noun |
| ch14/14.4/text.html | "the sequential or step-wise transfer of protons" | written 质子可以依次或逐级转移 | "sequential" and "step-wise" are two English words for one idea; both kept (依次, 逐级) |
| ch14/14.4/text.html | "the bonded water molecules" / "nonbonded" / "the free water molecule" | written 键合水分子, 未键合水分子, 游离水分子 (pending rows) | the book has no Chinese equivalent of "bonded water" as a term |
| ch14/14.4/figures.js | sim-salt-ions, `verdict` | each sentence rewritten in Chinese word order with the same slots: `${s.name} 中，${a.s} 是弱酸，${b.s} 不与水反应，所以溶液呈酸性。`; the comparison is `${a.s} 的 $\kKa$ 大于/小于 ${b.s} 的 $\kKbion$`; the articles (`a weak acid`, `a weak base`) dropped | English frame "$\kKa$ of ${a.s}" cannot carry the slots in order, and English articles collapse (4.1) |
| ch14/14.4/figures.js | sim-salt-ions, `inert:` line | written `不水解：` with the ions joined by `、` instead of `, ` | the separator of a Chinese list in prose |
| ch14/14.4/figures.js | fig-hydrated-al, hover names (`the aluminum atom, Al`, `an oxygen atom of a bonded water molecule` …) | written 铝原子，Al, 键合水分子的氧原子 …; the articles `the`/`a`/`an` dropped | English article grammar collapses to one Chinese form (4.1) |
| ch14/14.4/section.json | exercise cyl1 prompt | split after the question: 在 … 溶液中，水合氢离子浓度是多少？硝酸铵是一种盐，其组成离子为 ${…}$ 和 ${…}.$ 哪一种酸更强，${…}$ 还是 ${…}?$ | the source's apposition "a salt composed of the ions X and Y." ends with a full stop inside the math run and the last math run ends with "?"; neither can be moved, so the apposition becomes its own clause and no closing 。or ？ is added |
| ch14/14.4/section.json | `notes` | the English quotation “,and” kept as a quotation in the note; the note says that the Chinese text cannot show it | see Example 14.17 (b) above |
| ch14/14.4/section.json | `exercise_notes`, "novocaine" | written 普鲁卡因 (pending row) | the trade name novocaine is procaine in Chinese |
| ch14/14.4/text.html | the basic-ions sentence `(CH₃CO₂⁻),$` and the `\text{,}` of the acetate equilibrium | left as printed, the comma inside the math run; Example 14.15 intro and the basic-ions sentence were reordered (`它被分离为氯化苯铵 ${…Cl},$ 这是一种…`; `所得溶液含有不水解的阳离子（Na⁺）和弱碱性阴离子 ${…},$ 因而是碱性溶液。`) so that each run ends its clause | the punctuation is part of the source's `$…$` run (translate.md 5, review pass) |
| ch14/14.4/text.html | Example 14.15 first sentence ends "…solution of anilinium chloride" with no question mark | written with ？ | the book dropped the question mark; the Chinese question needs one (review pass) |
| ch14/14.4/text.html | "(or acid hydrolysis)" and "(or base hydrolysis)", the book's glosses of acid and base ionization of an ion | written 酸水解 and 碱水解, the `acid` / `base` spans on 酸 / 碱 (rows `acid hydrolysis`, `base hydrolysis`) | no standard term; built on 水解 (ch18) and 酸电离 / 碱电离; doubt, to confirm at termonline |
| ch14/14.4/figures.js | sim-salt-ions, `inert` label | written 不水解：, row `not hydrolyzed (inert ion)` | the ions that do not react with water; follows 水解 and the row `inert` |

### ch14/14.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.5/text.html | spans on named acids: `acid` on 乙酸, 硫酸, 碳酸 (×3), 磷酸 | the span wraps the whole Chinese compound that contains the concept's word | the source wraps the word "acid" in "acetic acid", "sulfuric acid", "carbonic acid", "phosphoric acid"; Chinese names each acid in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.5/text.html | `carbonate` + `ion` spans in "carbonate ions" (×3) | written 碳酸根离子 with the `carbonate` span on 碳酸根 and the `ion` span on 离子 | the glossary's carbonate ion is 碳酸根离子; the two source spans keep their order |
| ch14/14.5/text.html | `ion` span in "hydronium ions", "bicarbonate ion" | spans wrap 离子 only, after 水合氢 and 碳酸氢根 | the source wraps "ions" alone |
| ch14/14.5/text.html | `saturated` span, Example 14.19 | the span wraps 饱和 and 溶液 follows (饱和溶液) | the source wraps "saturated" alone |
| ch14/14.5/text.html | `acidic` span, Example 14.19 "The solution is acidic" | written 呈酸性, the span on 酸性 (glossary acidic solution 酸性溶液 → 酸性) | Chinese says 呈酸性 where English says "is acidic" |
| ch14/14.5/text.html | `\text{First ionization:}`, `\text{Second ionization:}`, `\text{Third ionization:}`, `\text{more than}`, `\text{; complete dissociation}` | written 第一步电离：, 第二步电离：, 第三步电离：, 大于, ；完全解离 inside `\text{}` | words in `\text{}` are translated (translate.md 5); the ordinal "First/Second/Third" has no English-only grammar here |
| ch14/14.5/text.html | "is larger than ... by a factor of 10^4" (diprotic); "larger than the second by a factor of at least 20" | written "是 … 的 10^4 倍"; "至少是第二电离常数的 20 倍" | Chinese states a multiple as 是…的 N 倍, not 大 N 倍 (review pass) |
| ch14/14.5/text.html | "palatable amount of dissolved carbon dioxide" | written 适口量的溶解的二氧化碳 | no one-word Chinese equivalent of "palatable" |
| ch14/14.5/text.html, ch14/14.5/section.json | "Carbonated water" | written “碳酸水”, quotation marks kept | everyday name of the drink; no glossary row, recorded as pending |
| ch14/14.5/figures.js | sim-stepwise topline `${sp[1]} lies ${rel(...)} ${sp[0]}, and …` and `rel` | `rel(hi, lo, ref)` returns 约为 ref 的 1/N (below) or 是 ref 的 N 倍 (above) and the sentence is rewritten as `${sp[1]} 约为 ${sp[0]} 的 1/N，${sp[2]} …` (Chinese does not state a reduction as 低 N 倍) | English "N times below/above" frame cannot carry the slots in the same order |
| ch14/14.5/figures.js | readout `small` line "= X M at every starting concentration, since …" | rewritten as `= X M，在每个起始浓度下都是如此，因为 …` | Chinese word order |
| ch14/14.5/section.json | exercise answer `parts[].part` labels (`(a) <em>K</em><sub>a</sub>`, `[H₃O⁺] = [HS⁻]` …) | kept as printed; only the solution text of e76 has （a）（b）（c） | `answer.parts[].part` is a kept field (translate.md 5) |
| ch14/14.5/text.html, ch14/14.5/section.json | Example 14.19 `$\kconcHyd,$ $[HCO₃⁻],$ 和 …` and exercise e2 `[H₃O⁺],$ [OH⁻]、…` | left as printed, the comma inside the math run | the punctuation is part of the source's `$…$` run (translate.md 5, review pass) |

### ch14/14.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.6/text.html | Medicine: The Buffer System in Blood, `buffer-composition` span on "buffer" in "the capacity of the buffer" | written 超出<span>缓冲</span>容量 (row `buffer capacity`) | 缓冲容量 is the term; the source's span stays on the word "buffer", which is 缓冲 here (review pass) |
| ch14/14.6/text.html | `buffer` + `mixtures` spans in "buffer solution(s)" (many) | `buffer-composition` span on 缓冲 and `mixtures` span on 溶液, side by side | the glossary's buffer is 缓冲溶液, which already contains 溶液; the source wraps "buffer" and "solution" separately, so the two spans keep their order inside the one Chinese term |
| ch14/14.6/text.html | first paragraph "a buffer solution, or a buffer" | written "缓冲溶液，或称为缓冲液", the `strong` and span on 缓冲液 | buffer and buffer solution are both 缓冲溶液 in the glossary; the short form 缓冲液 keeps the two names of the sentence apart (recorded as pending) |
| ch14/14.6/text.html | spans on named acids: `acid` on 乙酸 (×9), 碳酸 (×4), 乳酸 (×2) | the span wraps the whole Chinese compound that contains the concept's word | the source wraps the word "acid" in "acetic acid", "carbonic acid", "lactic acid"; Chinese names each acid in one word (translate.md 3.3, the span stays in its block) |
| ch14/14.6/text.html | `acid-ionization` span in "acetic acid ionization equilibrium" | written 乙酸电离 with the span on the whole of it, 平衡 in its own `chemical-equilibrium` span | the glossary's acid ionization is 酸电离; the source wraps "acid ionization" after "acetic", Chinese says 乙酸电离 |
| ch14/14.6/text.html | `hydroxide` + `ion` spans in "hydroxide ion"; `hydroxide` alone in "the added hydroxide", "an excess of hydroxide", "hydroxide molarity" | 氢氧根 (`hydroxide`) + 离子 (`ion`); where the source has `hydroxide` alone the span wraps 氢氧根离子 | the glossary's hydroxide ion is 氢氧根离子; Chinese has no bare "hydroxide" for the ion |
| ch14/14.6/text.html | `ion` span in "hydronium ion", "acetate ion", "bicarbonate ion", "hydrogen carbonate ion" | spans wrap 离子 only, after 水合氢, 乙酸根, 碳酸氢根 | the source wraps "ion" alone |
| ch14/14.6/text.html | `temperature` span in "body temperature" | the span wraps 体温 | the source wraps "temperature" alone; Chinese names it in one word (recorded for ch01 too) |
| ch14/14.6/text.html | `acidic-solution` span, "most of the by-products ... are acidic" | written 呈酸性, the span on 酸性 | Chinese says 呈酸性 where English says "are acidic" |
| ch14/14.6/text.html | `dissolved` span, "the dissolved carbon dioxide" | the span wraps 溶解的 | the source wraps "dissolved" alone |
| ch14/14.6/text.html | Example 14.20 (c) "a solution of an unbuffered solution with a pH of 4.74" | written "的溶液，即 pH 为 4.74 的非缓冲溶液"; the `unbuffered` ref span wraps "pH 为 4.74 的非缓冲溶液" and keeps its inner `mixtures` and `ph` spans | the source's redundant "solution of an unbuffered solution" cannot be written word for word in Chinese; 即 joins the two |
| ch14/14.6/text.html | "Figure 14.16 ... has little affect" (misspelling) | written 几乎没有影响 | the book's spelling error cannot be carried into Chinese; section.json notes quotes the English misspelling |
| ch14/14.6/text.html | "the buffer pairs pKa" (missing apostrophe) | written 由该缓冲对的 $\kpKa$ 所决定的值 (the span wraps 缓冲 and 对 stands outside it, as 缓冲对 is the standard term) | the missing apostrophe is an English-only error; the symbol is kept |
| ch14/14.6/text.html | "1 pH unit" and "A change of 1 pH unit occurs when ..." | written "…时，pH 发生 1 个单位的变化" | Chinese word order puts the condition first |
| ch14/14.6/text.html | Example 14.20 table heads "Initial concentration (M)" etc. | 初始浓度（M）, 变化（M）, 平衡浓度（M） without `concentration` spans | the source has no span in these cells |
| ch14/14.6/text.html | `\text{base}`, `\text{acid}` in the blood equation | 碱, 酸 inside `\text{}` | words in `\text{}` are translated (translate.md 5) |
| ch14/14.6/text.html | alt of fig-compare: image labels "Unbuffered", "p H equals 8.0 buffer" | rendered 非缓冲 and “pH 等于 8.0 的缓冲溶液” | the alt describes the labels; the image itself keeps English |
| ch14/14.6/text.html | photo credit "(credit: modification of work by Mark Ott)" | （来源：改编自 Mark Ott 的作品） | ch01 credit decision |
| ch14/14.6/text.html | Portrait of a Chemist: names, institutions | 劳伦斯·约瑟夫·亨德森, 卡尔·阿尔贝特·哈塞尔巴尔赫, 克里斯蒂安·玻尔, 索伦森, 哈佛大学, 斯特拉斯堡, 哈佛商学院; English given in parentheses at first mention of Henderson, Hasselbalch, Bohr, Sørensen | standard renderings of names; recorded as pending |
| ch14/14.6/section.json | `notes` quoted "1.0 mL of 0.10 NaOH", "has little affect", "buffer pairs pKa" | the English quoted inside “ ” | the notes describe the book's printed errors, which only exist in English |
| ch14/14.6/section.json | derivations `src` "Appendix B" | 附录 B | words of a `src` are translated (translate.md 5) |
| ch14/14.6/section.json | cyl1 solution "moles/L", "moles" | 摩尔/升, 摩尔 | unit words of the book's answer; the symbols mol, L elsewhere stay |
| ch14/14.6/figures.js | ctl labels `\\text{add}` and `\\text{buffer}` | \\text{加入}, \\text{缓冲溶液} | translated slider names; 缓冲溶液 is longer than "buffer" and may need the track's own line (translate.md 4.7) |
| ch14/14.6/figures.js | topline "Adding X mmol of NaOH moves the buffer from pH 4.74 to Y and the unbuffered solution from pH 4.74 to Z." | 加入 X mmol NaOH，使缓冲溶液的 pH 从 4.74 变为 Y，使非缓冲溶液的 pH 从 4.74 变为 Z。 | Chinese word order; slots keep their order |
| ch14/14.6/figures.js | note "All N mmol of CH₃CO₂H is used up; ..." | 全部 N mmol 的 CH₃CO₂H 已耗尽；… | Chinese word order |
| ch14/14.6/figures.js | `lab.add('buffer'|'unbuffered', …)` curve labels | 缓冲溶液, 非缓冲溶液 | translated figure labels |

### ch14/14.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch14/14.7/text.html | #titration-curves sim head, `equivalence-point` span on "equivalence point" in "halfway to the equivalence point" | written 在<span>半化学计量点</span>处; the span wraps 半化学计量点 | Chinese names the half-equivalence point in one word (row `half-equivalence point`); the span keeps its concept (review pass) |
| ch14/14.7/text.html | `concentrated` span in "equally concentrated" (Examples 14.21 (b), 14.22 (b), the stage list) | written 浓度相同, the span wrapping 浓度相同 | the glossary's concentrated is 浓的; Chinese says the two samples have the same concentration (浓度) and not that they are equally "concentrated" |
| ch14/14.7/text.html | `dilute` span in "dilute solution" | the span wraps 稀 (glossary 稀的) in 稀溶液, with `mixtures` on 溶液 | Chinese says 稀溶液; the adjective takes no 的 here |
| ch14/14.7/text.html | `acidic-solution`, `neutral-solution`, `basic-solution` spans (the stage list, Example 14.21 (c), "In more basic solutions") | the spans wrap 酸性, 中性, 碱性, without the 的 of the glossary forms 酸性的, 中性的, 碱性的; "In more basic solutions" written 碱性更强的溶液 with the span on 碱性 only | Chinese uses the bare adjective after 呈 and 由…转变为; the span stays in its block |
| ch14/14.7/text.html | `end-point` span in "titration end points" and "titration's end point" | the span wraps 滴定终点 (glossary), "titration" not written separately | the glossary's end point is 滴定终点, which already contains "titration" |
| ch14/14.7/text.html | `acid` span in "acetic acid" (Example 14.22, 乙酸 ×4) | the span wraps 乙酸 (ch14/14.6 precedent) | Chinese names the acid in one word |
| ch14/14.7/text.html | `hydroxide` and `ion` spans in "hydroxide ion" | `hydroxide` on 氢氧根, `ion` on 离子 (ch14/14.6 precedent) | the glossary's hydroxide ion is 氢氧根离子 |
| ch14/14.7/text.html | `ion` span in "hydronium ion", "acetate ion" | the span wraps 离子 only, after 水合氢, 乙酸根 | the source wraps "ion" alone |
| ch14/14.7/text.html | Example 14.21 (b) "intial" (misspelling) | written 初始 | the book's spelling error cannot be carried into Chinese; section.json notes quotes the English |
| ch14/14.7/text.html | `\text{, and }` in Example 14.22 (d) | written `\text{, 且 }`, the comma ASCII | words in `\text{}` are translated, ASCII punctuation inside math |
| ch14/14.7/text.html | `\text{red}`, `\text{yellow}`, `\text{Base}`, `\text{Acid}` in the indicator and Henderson-Hasselbalch equations | 红色, 黄色, 碱, 酸 inside `\text{}` | words in `\text{}` are translated (translate.md 5) |
| ch14/14.7/text.html | Example 14.22 first sentence "the titration of 25.00 mL of CH3CO2H with 0.100 M NaOH" | written 对 25.00 mL 0.100 M CH3CO2H 的滴定，所用 NaOH 为 0.100 M; the `weak-titration` ref span wraps 对…的滴定 | Chinese word order puts the object before 的滴定 |
| ch14/14.7/text.html | #titration-curves, "these two curves", "the strong and weak acid titrations" | written 强酸和弱酸滴定 with the `weak-acid` span on 弱酸 only | the source's span wraps "weak acid" inside the shared phrase "strong and weak acid" |
| ch14/14.7/text.html | #indicators, "pH 5.0 × 10⁻⁹ M ... In more basic solutions where" | the relative clause moved before the noun: 在水合氢离子浓度小于…（pH > 8.3）、碱性更强的溶液中 | Chinese puts the modifier before the noun |
| ch14/14.7/text.html | #titration-curves, "conjugate acid-base partners" | written 这对共轭酸碱 | glossary has 共轭酸碱对; Chinese does not need "partners" |
| ch14/14.7/text.html | #indicators, "both conjugate partners" | written 这对共轭酸碱的两个成员 | same |
| ch14/14.7/text.html | figure alt of fig-indicators | indicator names given as the Chinese name with the English label in parentheses (结晶紫（Crystal violet）); "p H" written pH; "2 comma 4 dash Dinitrophenol", "m dash Nitrophenol", "o dash Cresolphthalein" written 2,4-二硝基酚（2,4-Dinitrophenol）, 间硝基酚（m-Nitrophenol）, 邻甲酚酞（o-Cresolphthalein）; "Eriochrome * Black T" kept in parentheses as printed | the image labels stay English; the alt describes them for a reader of Chinese; the spelled-out punctuation of the English alt is a screen-reader transcription |
| ch14/14.7/text.html, ch14/14.7/section.json | "(Figure 14.18)", "(Figure 14.20)" in data-original-caption and original_caption; part labels (a), (b) | written （图 14.18）, （图 14.20）, （a）, （b） | figure citations in prose are translated (translate.md 4.6); full-width labels (ch01) |
| ch14/14.7/text.html | table 14.2 heads "Moles of NaOH Added" | written 加入 NaOH 的物质的量; no unit added | 物质的量 is the quantity (mol) of the SI, not "amount of matter"; the source has no unit in the head |
| ch14/14.7/section.json | notes | the printed "intial" quoted in 例 14.21; the roman "pKa" of the indicator equation written pK<sub>a</sub> | the notes describe the book's printed errors, which only exist in English |
| ch14/14.7/section.json | referents labels "the titration of 0.100 M HCl", "the titration of 0.100 M acetic acid" | 0.100 M HCl 的滴定, 0.100 M 乙酸的滴定 | Chinese word order |
| ch14/14.7/section.json | cyl1, cyl2, e94 `answer.solution` ("0.00: 1.000; …", "0.00 mL: 2.37; …", "(a) pH = 2.50; …") | kept | values and unit symbols only, no sentence (pure-math solution) |
| ch14/14.7/figures.js | `${s.name} range` (sim band label, its `F.measure` twin, ×3 places) | written `${s.name}变色区间` | the band is the indicator's color-change interval (变色区间) |
| ch14/14.7/figures.js | readout `small` line "X changes from red to yellow between a and b mL of NaOH." | written `${ic.name}在加入 a 至 b mL NaOH 之间由红色变为黄色。`; the capitalisation code `ic.name[0].toUpperCase() + ic.name.slice(1)` dropped | Chinese has no capital; English sentence frame cannot carry the slots in the same order (4.1) |
| ch14/14.7/figures.js | topline "At v mL of NaOH, stage, the HCl solution is at pH p and X is colour." | written `加入 v mL NaOH，stage，sample溶液的 pH 为 p，X呈颜色。`; `sample` (HCl / acetic acid / weak acid) replaced by `sample` = 'HCl ' / 乙酸 / 弱酸 (trailing space after the Latin name only) | word order of Chinese; the space between Latin letters and CJK |
| ch14/14.7/figures.js | `stage` strings "the initial state", "halfway to the equivalence point", "before the equivalence point", "the equivalence point", "past the equivalence point" | 初始状态, 半化学计量点, 化学计量点之前, 化学计量点, 化学计量点之后 | articles dropped; "halfway to the equivalence point" is the half-equivalence point (glossary 半化学计量点) |
| ch14/14.7/figures.js | hover names (flask, buret, solution, equivalence point, half-equivalence point, color-change bar) | English genitive/"of the" phrases rewritten in Chinese word order with the same slots, e.g. `${key === 'weak' ? '弱酸' : '强酸'}滴定的化学计量点，pH …`; `a`/`the` dropped | English article and genitive grammar (4.1) |
| ch14/14.7/figures.js | sim-titration `sample` string `'HCl '` | carries a trailing space before 溶液 | the Latin formula and the CJK noun are joined by one space (CJK/Latin spacing) |

### Chapter 14: Other things for the owner

- **Merge fix.** 14.7 text.html, the indicator form of the Henderson-Hasselbalch equation, had `[\text{Base}]/[\text{Acid}]` untranslated while the page's other displays used 碱 and 酸; it now reads `[\text{碱}]/[\text{酸}]`.
- **酸式硫酸钠 for sodium bisulfate.** Example 14.14 (14.3) said 硫酸氢钠, the 化学名词 form; chapter 2's chapter glossary already has the row `sodium bisulfate` 酸式硫酸钠, so the page now reuses it. Owner to decide whether the book uses 硫酸氢钠 throughout. Review pass: the reviewer asked for 硫酸氢钠 (chapter 2's chapter glossary and pages would also change); not applied, because another chapter's files are not edited from this pass and the row is chapter 2's decision. Open for the chapter 2 owner.
- **水的离子积常数 and ch17.** The source names K_w three ways ("ion-product constant for water", "ion product of water", "autoionization constant", "ionization constant for water"). Chapter 14 writes the first two and the exercise forms 水的离子积常数 (the row `ion-product constant for water`), the third 自电离常数 (span in 14.2). The 14.1 exercise "ion product of water at 80 °C" said 水的离子积 and was changed to 水的离子积常数. Chapter 17's chapter glossary has the unqualified 水的离子积 for the same source (its exercise e8); its own note says to unify. Resolved in the global merge (2026-10-27): ch17 e8 now reads 水的离子积常数.
- **乙酸根 for the acetate ion.** The glossary row acetate is 乙酸盐 (the salt); the pages write the anion 乙酸根 and 乙酸根离子 (ion). Row `acetate (the anion)`, to be confirmed.
- **缓冲液 once.** In the definition "buffer solution, or a buffer" (14.6) the short form is 缓冲液, everywhere else 缓冲溶液. The span on 缓冲液 does not contain the concept's term 缓冲溶液 (recorded).
- **氢氧根 and 氢氧化物.** The concept `hydroxide` has the term 氢氧化物 (the compound class); the pages wrap 氢氧根 (the ion) in its spans, since Chinese names the ion 氢氧根离子. If the concept is meant for the ion, its term should be 氢氧根.
- **Page rows already in a glossary, not repeated in the chapter glossary (16 pending rows).** ammonium ion, Robert Boyle, aqueous solution, product (from 14.2 and 14.7), fossil fuel, exothermic, equilibrium, methylamine, octahedron, aluminum chloride, ammonium nitrate, copper(II) oxide (all with the same target in the shared glossary or another chapter's chapter glossary), sodium bisulfate (see above), a composite row "carbonic acid, sulfuric acid, nitric acid, acid rain (acid spans)" whose members have rows, and the second "ion product of water" row (same as 14.1's). 14.1's row `ion product of water` is kept once.
- **Terms with a doubt.** 含氧酸 for "polyoxy acids" (14.3 e43; the 'poly' is not rendered); 索伦森 for Sørensen (also 瑟伦森); 玻尔效应 (Bohr effect); 酚羟基 and 芳环 (14.3 e45); 键合水分子 and 游离水分子 (14.4, no standard term); 非缓冲溶液 (14.6); 一元的 for the adjective monoprotic; the 14.7 indicator dye names (结晶紫, 甲酚红, 百里酚蓝, 赤藓红 B, 铬黑 T, 溴酚蓝, 溴甲酚绿, 甲基红, 溴甲酚紫, 茜素, 酚红, 间硝基酚, 邻甲酚酞, 百里酚酞, 茜素黄 R, 2,4-二硝基酚), each with the English name in parentheses in the alt text of Figure 14.19 for the screen reader.
- **Unverified termonline rows.** 179 of the 246 rows of `glossary.zh-CN.json` carry `"confirm": "termonline"` (the chapter scaffold rows and the 64 added by this merge); none of the 64 was looked up at termonline.cn in this pass.
- **Kept in English.** Names of photographers and organisations in credits (Chris M Morris, Eden, Janine and Jim/Flickr, Jacopo Werther, Sahar Atwa, HomeSpot HQ/Flickr, John Tann, Mark Ott, Emil Kehnel); the English given names in parentheses after the Chinese names of Henderson, Hasselbalch, Bohr and Sørensen (14.6); the English dye labels in parentheses (14.7 alt); `answer.parts[].part` labels in English and in half-width (a) on 14.2, 14.3, 14.5, 14.6 and 14.7 (translate.md 5 keeps them byte for byte; as in chapter 1, owner to decide); the pure-math `answer.solution` fields flagged by `translation_parity.py`; the figure images' own English labels.
- **Source misprints not carried.** "It also is corrodes" (14.2), "wheres" and "much lesser than" (14.3), ",and" (14.4), "has little affect" and the missing apostrophe in "pairs pKa" (14.6), the comma inside `NH<sub>3,</sub>` (14.3 e4, e38), the missing question mark of Example 14.15 (14.4), "intial" (14.7): each written correctly in Chinese, the English quoted in `notes`.
- **Review pass, declined: shared row `acidity`.** The reviewer proposed a note on the shared row (酸度 when the book means the measured degree). The shared glossary is read-only for this pass, so no note was added; 酸度 in 14.2 (Measuring pH), the 14.3 Figure 14.9 alt and 14.6 (Portrait ¶2) stays, and the owner may add the note.
- **Review pass, terms changed.** 化学计量点 / 半化学计量点 for equivalence point (the 1984 legal units dropped 当量); no coined noun for conjugate partner (共轭酸, 共轭碱, 共轭酸碱对 by context); 缓冲对 (new row); 不水解 / 不与水反应 for the book's "inert" ions (row `inert`).
- **Humanizer review and `npm run dev` read-through** are outstanding for the owner.

## Chapter 15 sections

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

### Chapter 15: Doubtful choices

- 15.1, 15.2, 15.3: the source slips are kept as printed and recorded in each page's `notes`: "Le ChÂtelier" (written 勒夏特列原理), the unclosed "(b" of 15.1 e2, "potassium cyanide ion" (氰化钾离子, 15.2 e72), "0.100 NH₃(aq)" without a unit (15.2 e64), "each moles of Br" (15.1 Example 15.3), "solublities" and "productions" (15.3). The owner may decide to correct them upstream.
- 羟基磷灰石 is the one target for both source spellings `hydroxyapatite` and `hydroxylapatite`; 15.3 "calcium hydroxyapatite" is written 羟基磷灰石 because the Chinese name holds the calcium.
- 漱口水 is the target of both `mouthwash` and `mouth rinse`. 配合物形成 is the target of both `complex formation` and `complexation`.
- 卤离子 (halide ion) and 龋齿 (tooth decay) are the same targets as ch18.
- 溶解平衡 (not 溶解度平衡) for solubility equilibrium; 溶度积 for solubility product; 以克计的溶解度 for gram solubility; 摩尔溶解度 for molar solubility.
- 15.1 `slider` (sim control word), 15.1 "Equilibria of Other Reaction Classes" and "Precipitation and Dissolution" (chapter and section titles) carry `confirm: owner`.
- 15.1 e101 "Chemistry Advanced Placement Examination" is written 化学大学先修课程考试; US agencies are written 美国环境保护署 and 美国公共卫生署.

### Chapter 15: Kept in English on purpose

Names of people and photographers in credits (G. N. Lewis is written G. N. 路易斯 in prose), NOAA Photo Library, Wikimedia Commons, Flickr, the user names of credits ("eutrophication&hypoxia", "prilfish"), the ICE table label (ICE 法), the quoted slang “gyp”, the figure and sim eyebrows, units (M, ppm, mm, g) and all formulas, charges, states and LaTeX.

### Chapter 15: Terms not verified at termonline.cn

Every row of `glossary.zh-CN.json` with `"confirm": "termonline"` (about 30) is taken from standard textbook usage and still has to be confirmed there; rows with `"confirm": "owner"` need an owner decision.

## Chapter 16 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.1/text.html, ch16/16.2/text.html, ch16/16.3/text.html, ch16/16.4/text.html | spans on 室温, 高温, 低温 (`temperature`; 16.1, 16.2 Example 16.3, 16.3 third law, 16.4 Examples 16.7 and 16.8 and list items 1 and 2) | the span wraps the whole Chinese compound that contains the concept's word, 温度 | the source wraps one English word of "room temperature", "high temperatures", "low temperatures"; Chinese names each in one word (recorded in ch01, translate.md 3.3); the row room temperature is 室温 |
| ch16/intro/text.html, ch16/16.1/text.html to ch16/16.4/text.html | figure and sim eyebrows (`Figure 16.1` to `Figure 16.14`, `Figure 16.10 + 16.11`, `Figure 16.12 + 16.13`, `Sim`, the bare `Figure` of 16.2) | kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch16/16.3/text.html, ch16/16.4/text.html | table eyebrows `Table 16.1` to `Table 16.4` | written 表 16.1 to 表 16.4 | as ch01: the eyebrow is translated, `ost check` reads only Figure and Sim |
| ch16/intro/text.html, ch16/16.1/text.html | photo credits (3) | （来源：改编自 Yellowstone National Park 的作品）, （来源：“金刚石”照片：改编自 “Fancy Diamonds”/Flickr 的作品；“石墨”照片：改编自 images-of-elements.com/carbon.php 的作品）, （来源 a：…；b：…；c：…） | the credit formula of ch01; names and organisations kept as printed (the intro first had the park as 黄石国家公园) |
| ch16/16.1/text.html to ch16/16.4/text.html | `\text{…}` in math ("or", "and", "products", "reactants", "gas", "liquid", "fusion", "yellow", "at equilibrium", "progress", example labels) | translated: 或, 和, 产物, 反应物, 气态, 液态, 熔化, 黄色, 处于平衡, 进程 | translate.md 5: words inside `\text{…}` are translated |

### ch16/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/intro/text.html | `<span data-concept="physical-change">physical changes</span>` (last sentence), preceded by "chemical or" | span wraps 物理变化; "chemical or physical changes" is written 化学变化或物理变化, the chemical-change part has no span | Chinese shares 变化 across the pair; the source span covers only "physical changes" |

### ch16/16.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.1/text.html | `(\kP=\text{0 in a vacuum})` display math | written `(\text{在真空中 }\kP=0)`, the 0 moved out of `\text{}` | the Chinese phrase 在真空中 precedes its quantity; keeping "P = 在真空中为 0" would not read |
| ch16/16.1/figures.js | `` `${r} of the 30 atoms have crossed…` `` | word order changed to 30 个原子中有 ${r} 个 | Chinese quantifier order; no plural branch existed |
| ch16/16.1/text.html | Figure 16.3 credits | `（来源：“金刚石”照片：改编自 … 的作品；“石墨”照片：…）` | credit formula of ch01, two named credits |
| ch16/16.1/text.html | "ice will spontaneously melt, but water will not spontaneously freeze" | 水不会自发凝固 (the first draft had 结冰) | the shared glossary has freezing 凝固 and the chapter glossary freezing of water 水的凝固; one word for the process across the chapter (row freeze of the chapter glossary) |
| ch16/16.1/text.html | `spontaneous change` / `spontaneous changes` (span `spontaneous-process`; 16.1 and 16.3) | the span wraps 自发变化, the literal rendering, not 自发过程 | the source says "change" here and the row spontaneous change records it; the concept row spontaneous process is 自发过程 |
| ch16/16.1/text.html | `dispersal-of-matter-and-energy` spans ("a greater and more uniform dispersal of matter", "more uniform dispersal of energy") | the span wraps the whole Chinese phrase 物质的更大、更均匀的分散 / 能量更均匀的分散 | the source wraps the noun phrase; the rows are 物质的分散 and 能量的分散, which the phrases contain only when the modifier is moved out, and Chinese keeps it inside (3) |

### ch16/16.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.2/text.html | `steam <span data-concept="heat-flow">heat</span> engines` | written 蒸汽<span>热机</span>, the span wraps 热机 | the concept word 热 is inside the standard compound 热机 (glossary row heat engine); Chinese names it in one word (recorded in ch01 for compounds) |
| ch16/16.2/text.html | `<em>reversible</em> <span data-concept="heat-flow">heat</span>` | written `<em>可逆</em><span data-concept="heat-flow">热</span>`, the span wraps 热 only | the standard term is 可逆热 (glossary row reversible heat); the em and the span keep their words, the span cannot wrap 热量 inside the compound |
| ch16/16.2/text.html | `<span data-concept="kelvin">kelvin</span> <span data-concept="temperature">temperature</span>` | written 开尔文温度 as two adjacent spans, 开尔文 and 温度 | the row kelvin temperature is one word; the two spans keep their blocks |
| ch16/16.2/text.html | Figure 16.7 caption and text: "Nicholas" and "Nicolas" Léonard Sadi Carnot | both written 尼古拉·莱昂纳尔·萨迪·卡诺 | the two English spellings of one name have one Chinese rendering (glossary rows); the book's inconsistency is named in section.json notes |
| ch16/16.2/text.html | "In the <span solid>solid</span> phase", "In the <span liquid>liquid</span> phase", "the gaseous phase" | written 在固态下, 在液态下, 气态; the span wraps 固态 and 液态 | the word "phase" is carried by 态, as for the state adjectives recorded in ch01 |
| ch16/16.2/text.html | "quantized translational <span data-concept="energy-and-work">energy</span> levels" | written 量子化的平动<span>能级</span>, the span wraps 能级 | 能级 is one word (ch07 row energy level) |
| ch16/16.2/text.html | "The hot object", "hot and cold objects" (spans `hot-object`, `cold-object`) | written 较热的物体, 较冷的物体; "hot and cold objects" 较热和较冷的物体, spans on 较热 and 较冷的物体 | the rows hotter object and colder object; Chinese cannot say 较热的和较冷的物体 shorter |
| ch16/16.2/text.html | "one of the other two distribution" | written 另外两种分布之一 | English singular for plural slip: Chinese has no plural, so the slip disappears; named in section.json notes |
| ch16/16.2/figures.js | `const word = { 2: 'Both', 4: 'All four', 6: 'All six' }` and the topline `${word[n]} particles sit in one box in 2 of the ${total} microstates …` | `word` becomes 两个/四个/六个 and the sentence is rebuilt as `在 ${total} 种微观状态中，有 2 种使${word[n]}粒子全部位于一个盒子里，概率为 1/${total / 2}。`; the four slots kept | English quantifier sentence frame cannot carry the slots in the same order (4.1) |
| ch16/16.2/figures.js | sim-energy-microstates topline: `rises` / `falls` / `stays` and `from X to Y` / `at X` branches | rebuilt as `由 X 增加/减少到 Y` and `保持为 X`, probability `由 a/10 变为 b/10` / `保持为 a/10`; the conditions kept | English verb-plus-preposition grammar built by concatenation (4.1) |
| ch16/16.2/figures.js | hover name `particle ${p} of the ${hot/cold} object, ${no unit/one unit/two units} of energy` | `${较热/较冷}的物体的粒子 ${p}，${没有/有一个/有两个}能量单位` | Chinese word order; the three counts become 没有/有一个/有两个 (4.1) |
| ch16/16.2/figures.js | hover name `particle ${i + 1}, in the ${right/left} box` (3 places) | `粒子 ${i + 1}，在${右/左}边的盒子里` | Chinese word order (4.1) |
| ch16/16.2/figures.js | `views` labels `front`, `corner` | written 正视, 斜视 | one word for "front" in the chapter (正视 pairs with 俯视 of 16.1); the corner view is the oblique view of the box; no fixed term |
| ch16/16.2/figures.js | `solid`, `liquid`, `gas` column names in the S against T graph | written 固态, 液态, 气态 | the names label the phase of the sample (as in ch01 sim-states) |
| ch16/16.2/text.html | `average-kinetic-energy-and-temperature` span | the span wraps 其粒子的平均动能 | the source wraps "the average kinetic energy of its particles"; the span stays on the same phrase (3) |

### ch16/16.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.3/text.html | third-law, `absolute <span data-concept="entropy">entropy</span> values` | written `<span data-concept="entropy">绝对熵</span>值` (span wraps the whole glossary compound 绝对熵) | the row absolute entropy is one word; the span cannot wrap 熵 alone inside it |
| ch16/16.3/text.html | second-law, Example 16.4: "The <span entropy>entropy</span> change for the process [equation] is 22.1 J/K" | written `下列过程的<span data-concept="entropy">熵变</span>` before the equation and `为 22.1 J/K，…` after it; 下列 is added | Chinese cannot carry the subject across the display equation without a head word before it; the span stays in the same block as in the source |
| ch16/16.3/text.html | Table 16.2, `C(s, graphite)`, `C(s, diamond)`; section.json e29 `\text{C}(s\text{, graphite})` | the words graphite and diamond written 石墨 and 金刚石 inside the formula label, the comma kept ASCII | the label is an English word inside a formula (section 5: words in `\text{}` are translated) |
| ch16/16.3/text.html, ch16/16.3/section.json | `\text{(products)}`, `\text{(reactants)}`, `\text{and}`, subscript `\text{fusion}` in the equations | written `\text{(产物)}`, `\text{(反应物)}`, `\text{且}`, `\text{熔化}` | words inside `\text{}` in math are translated (section 5) |
| ch16/16.3/section.json | cyl1 `answer.parts[].part` ("ΔS_univ at −10.00 °C", "at +10.00 °C") | kept in English | the table of translate.md section 5 lists `parts[].part` as kept byte for byte; the parity tool checks it; the label is visible to the reader and flagged for the owner |
| ch16/16.3/section.json | cyl1 solution `ΔS_freezing = −ΔS_melting` | subscripts written 凝固 and 熔化 | the subscripts are words (state changes), not letters |
| ch16/16.3/figures.js | sim-ice-universe headline, `const at = \`At ${t} K (${cs} °C)\`` and the four sentences that follow `${at}` | `at` becomes `在 ${t} K（${cs} °C）时` and each sentence is `${at}，…`; the four slots and the branches kept | English prefix phrase glued to a clause; Chinese keeps the same slot order (4.1) |
| ch16/16.3/figures.js | `PROC` options `melting`, `freezing` | labels written 熔化 and 凝固, values (`'melting'`, `'freezing'`) kept | the value is the code key; only the label is read by the reader |
| ch16/16.3/text.html, ch16/16.4/text.html | spans on 宇宙的熵变, 环境的熵变 (`entropy-change-of-universe`, `entropy-change-of-surroundings`) | the span wraps the whole glossary compound (glossary rows entropy change of the universe, of the surroundings) | the source wraps the English phrase; the Chinese compound is one term |

### ch16/16.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.4/text.html | "The free energy change, as defined by" / the display equation / "may be interpreted as representing the difference …" (blocks around `ΔG = ΔH − TΔS` in #free-work) | the `free energy change` span now sits in the sentence before the equation, 自由能变的定义为, and the next block starts 可以解释为 | Chinese cannot start the sentence after the equation with the topic 自由能变; the span stays in the same block order and count |
| ch16/16.4/text.html | `\text{...}` in math: `\text{gas}`, `\text{liquid}` (subscripts of ΔG_f°), `\text{or}`, `\text{yellow}`, `\text{products}`, `\text{reactants}`, the three labels of Example 16.9, `\text{at equilibrium}` (derivations) | words in `\text{}` translated: 气态, 液态, 或, 黄色, 产物, 反应物, 硫化锌的分解：, 硫化氢的生成：, 耦合反应：, 处于平衡 | translate.md 5 (words inside `\text{…}`); 气态/液态 are the state adjectives of ch01 |
| ch16/16.4/figures.js | `CASES[].words` of the Figure 16.12 table, `CASES[].name`, region words | the two stacked English lines ('spontaneous at' / 'high temperature') become '在高温下' / '是自发的'; region words 'nonspontaneous' / 'spontaneous' become 非自发 / 自发 | Chinese puts the temperature phrase before the verb, so the two-line split is reproduced as a split of the sentence |
| ch16/16.4/figures.js | topline, readout notes and hover names with `${g < 0 ? 'spontaneous' : 'nonspontaneous'}`, `${q < k ? 'forward' : 'in reverse'}`, `${h > 0 ? 'above' : 'below'}`, `'negative' : 'positive'` | the branches keep both words (自发/非自发, 正向/逆向, 高于/低于, 负/正) inside the Chinese sentence `该过程是…的`; English "at T K," moved to the front (在 … K 下) | Chinese word order; no plural or article branch |
| ch16/16.4/figures.js | `label: '\\text{progress}'` | `\\text{进程}` for the slider of 反应进程 | the short form fits the track (translate.md 4.7) |
| ch16/16.4/section.json | exercises, `answer.parts[].part` and `answer.part` | English words kept ('(a) from free energies of formation', '(b) from enthalpies of formation and entropies', 'temperature above which it becomes spontaneous', 'standard free energy change', '(b) <em>K<sub>P</sub></em>'); the same case as ch01 | translate.md 5 keeps `part` byte for byte; owner to decide (translation-notes.md) |
| ch16/16.4/text.html | `<span data-concept="bar-unit">` in "pressure other than 1 bar"; `<span data-concept="mole">` after a numeral (16.2, 16.3, 16.4) | the span wraps the unit symbol as printed (`bar`, `mol`), not 巴 or 摩尔 | translate.md 3.4: a unit symbol is kept; with a numeral the symbol is written (1 mol, 7.5 mol), the unit name 摩尔 stays in running text |
| ch16/16.4/text.html | "free energy changes for physical and chemical reactions" | written 物理变化和化学反应的自由能变 | a physical process is not a reaction in Chinese; the reading improves the book (translate.md 3.2) |
| ch16/16.4/section.json | derivations[].source | `化学（第2版），16.4 自由能` | as ch01/1.6 |
| ch16/16.4/section.json | exercise e55 answer, footnote c-e55-unit and e41 (e) | the book's errors kept as the source has them (−0.16 kJ, SnCl₄(l) on both sides) with the footnotes translated | root item 13 |
| ch16/16.4/text.html | `gibbs-free-energy` spans ("Gibbs free energy", "free energy", "free energy change", 32 spans) | the span wraps 自由能 / 自由能变 / 吉布斯自由能 as the source wraps "free energy", "free energy change" and "Gibbs free energy" | three shared or glossary rows (free energy 自由能, free energy change 自由能变, Gibbs free energy 吉布斯自由能) feed one concept; each span wraps the term the sentence uses |
| ch16/16.4/text.html | `<span data-concept="reversible-process">thermodynamically reversible</span>` | span wraps 热力学可逆 | glossary row thermodynamically reversible; the concept row reversible process is 可逆过程 and the source has the adjective phrase |
| ch16/16.4/text.html | `exothermic-and-endothermic` spans | the span wraps 放热 / 吸热, not the ch13 and ch18 rows 放热的 / 吸热的 | Chinese drops 的 before 反应 and after the verb 放热 (4.1); the span stays on the concept word |

### Chapter 16: For the owner

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.3/section.json, ch16/16.4/section.json | `answer.parts[].part` and `answer.part`: "(a)" … "(g)" labels (16.3 e21, e25, e29; 16.4 e33 to e56), cyl1 of 16.3 ("ΔS_univ at −10.00 °C"), and the English labels of 16.4 cyl2, e31, e45, e49, e60 | kept in English | translate.md 5 keeps `part` byte for byte and the parity tool checks it; the label is visible to the reader (same open item as ch01) |
| ch16/16.4/section.json | exercise e23 prompt, "77.1 kJ/mole and −39.5 kJ/mole" | the unit word "mole" kept as printed | a unit as printed (translate.md 5); the neighbouring answers use kJ/mol |
| ch16/16.4/section.json | exercise e55 answer (−0.16 kJ) and e41 (e) (SnCl₄(l) on both sides) | the book's errors kept, footnotes translated | root item 13 |
| ch16/16.1/section.json, ch16/16.2/section.json | `notes` | name the book's slips that were kept: "(P = 0). (Figure 16.4)." stray full stop, Carnot spelled Nicholas / Nicolas, "one of the other two distribution", W_c/W_a for W_f/W_i in Example 16.2, Fe₂O₂(s) in a prompt | fidelity (translate.md 3) |
| `glossary.zh-CN.json` | 9 rows with `"confirm": "termonline"` | not looked up at termonline.cn | 混乱度, 食用色素, 片层, 微观状态, 微观状态数, 逆过程, 可逆热, 热力学可逆, 能量单位; to be confirmed and given a URL |
| `glossary.zh-CN.json` | `solubility product` (16.4) | not added to the chapter glossary | ch15 already has the row (溶度积); the 16.4 text uses the same target |
| `glossary.zh-CN.json` | `freeze` | one target, 凝固 | the pending row offered "结冰 / 凝固"; the one 结冰 in 16.1 was changed to 凝固 |
| ch16/16.1/text.html, ch16/16.2/text.html | nuclide names and particle letters before a Chinese word | a space was added where a `</span>` or `</strong></span>` met a Chinese character (锝-99m 是, 铀-238 是, B 组成, D 组成) | CJK/Latin spacing rule |
| `glossary.zh-CN.json` | ch16 rows that overlap with other chapter glossaries (disorder, expansion work, first law of thermodynamics, heat flow, pressure-volume work, state function, thermal energy) | same targets as ch05 and ch11 | checked identical, nothing to reconcile |

## Chapter 17 sections

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every ch17 text.html | figure and sim eyebrows (`Figure 17.1` to `Figure 17.20`, `Figure 17.3 + 17.4`, `Sim`), and ch17/17.7/section.json e48 `figure.caption` | kept in English | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every ch17 text.html and section.json | figure citations in the prose and in `original_caption` (图 17.1 to 图 17.20) | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch17/17.3/text.html, ch17/17.4/text.html | table eyebrows `Table 17.1`, `Table 17.2` | written 表 17.1, 表 17.2 | translate.md 5 lists a table's eyebrow as translated; same as ch01 |
| ch17/intro/text.html | photo credit "(credit: modification of work by Robert Couse-Baker)" | written （来源：改编自 Robert Couse-Baker 的作品） | one credit formula for the book (ch01); the name is kept |
| ch17/intro/text.html | "reduction-oxidation (redox) reactions" | written 氧化还原反应, the "(redox)" alias not repeated | Chinese has the one word for both; the abbreviation has no Chinese counterpart (4.1; review pass) |

### ch17/17.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/intro/text.html, ch17/17.1/text.html | `oxidation-number` spans on 氧化态 ("oxidation state") | the spans wrap 氧化态, in （或<em>氧化态</em>）, where the glossary has 氧化数 | the source gives "oxidation state" as the alias of "oxidation number"; 氧化态 is the usual Chinese alias, and a sentence naming both cannot read 氧化数（或氧化数） (translate.md 4.5) |
| ch17/17.1/text.html | `molecular-compounds` spans on 共价化合物 ("covalent compounds") | the spans wrap 共价化合物 where the glossary has 分子化合物 | the source wraps the words "covalent compounds" with the `molecular-compounds` concept; the Chinese for them is 共价化合物 |
| ch17/17.1/text.html | #oxidation-numbers, "the nitrate ion", span `nitrate` | the span wraps 硝酸根 and the next span `ion` wraps 离子 (硝酸根离子) | the glossary row nitrate is 硝酸盐 (the salt); the source's "nitrate ion" is the anion, and Chinese names it 硝酸根离子 (ch02 row nitrate ion), so the two English spans split the one Chinese word (translate.md 3.3) |
| ch17/17.1/text.html | #oxidation-numbers, "the oxidation number of an atom in an element is equal to zero" | written 元素单质中原子的氧化数等于零, spans on 元素, 原子, 氧化数 | "in an element" means in the free element; Chinese says 单质 (the substance) and the span keeps 元素 |
| ch17/17.1/text.html | #ex-acidic, #ex-basic, "nitric acid", "chromium(III) hydroxide", "manganese(IV) oxide" | the spans `acid`, `hydroxide`, `oxide` wrap the whole Chinese compound name (硝酸, 氢氧化铬(III), 氧化锰(IV)) | Chinese names the compound in one word; the span cannot wrap only "acid" (as in ch01 1.2/1.3) |
| ch17/17.1/text.html | #ex-acidic, #ex-basic, "acidic solution", "basic solution", "basic medium" | the spans `acidic-solution` and `basic-solution` wrap 酸性 / 碱性, and `mixtures` wraps 溶液, in the same order as the source's two words | the source wraps "acidic" and "solution" separately; 酸性溶液 is one glossary word, split as the source splits it |
| ch17/17.1/text.html | #balancing, display equations, the bare words `unbalanced` and `balanced` after `\hspace{5em}` | written `\text{未配平}` and `\text{已配平}` | the source sets these words in math italic with no `\text{}`; a reader sees them, so they are translated, and Chinese needs `\text{}` |
| ch17/17.1/text.html | display equations, `\text{oxidation:}`, `\text{reduction:}`, `\text{oxidation (×3):}`, `\text{reduction (×2):}` | written `\text{氧化：}`, `\text{还原：}`, `\text{氧化（×3）：}`, `\text{还原（×2）：}` | full-width colon and brackets inside `\text{}` for the Chinese label (translate.md 3.5) |
| ch17/17.1/text.html | the nitrate-ion equation `(1 N atom)(+5/N atom)+(3 O atoms)(−2/O atom)` | `\text{atom}` and `\text{atoms}` both written `\text{原子}` | English plural collapses to one Chinese form (4.1) |
| ch17/17.1/text.html | #ex-acidic step 4, #ex-basic step 4 | written 对每个半反应，加 H⁺ 以配平 H, the form of list item 4 (in #ex-acidic the `em` ends before `<sup>+</sup>`, in the others after it, as in the source) | the same English sentence has the same Chinese in the list and in both examples; the source's tags keep their places (review pass) |
| ch17/17.1/text.html, ch17/17.1/section.json | "add OH⁻ ions the equation obtained in step 7" (list item 8 and the example steps 8), "oxidations numbers" (#oxidation-numbers, water paragraph) | translated as the grammatical sentence 在第 7 步得到的方程式中加入 OH⁻ 离子 and 氧化数 | the book's slips (missing "to", plural "oxidations") are English grammar and cannot be carried into Chinese; the 17.1 `notes` field says so |
| ch17/17.1/text.html | Example 17.2 problem, "…CrO₄²⁻ The reaction takes place in a basic solution." | the missing full stop after the chromate formula is kept: …铬酸根离子 CrO₄²⁻ 该反应在碱性溶液中进行。 | the book's omission is kept as printed (as the 17.1 `notes` says) |
| ch17/17.1/text.html | Example 17.2 problem | "chromium(III) hydroxide, Cr(OH)₃, … manganese(IV) oxide, MnO₂," written without the commas: 氢氧化铬(III) Cr(OH)₃ … 氧化锰(IV) MnO₂ | an English appositive comma becomes a space between the Chinese name and the formula |
| ch17/17.1/text.html | #balancing, list item 6 and the steps 6 | "the number of electrons consumed in one is equal to the number produced in the other" written 使其中一个消耗的电子数等于另一个产生的电子数, with the `electron` span on the first 电子 only | one span in the source, so one in the translation |
| ch17/17.1/text.html | #balancing, list item 1 and the steps 1 | "the oxidation and reduction half-reactions" written 氧化和还原半反应, `half-reaction` span on 半反应 only | the Chinese shares 半反应 between 氧化 and 还原; the source has one `half-reaction` span |
| ch17/17.1/text.html | #oxidation-numbers, "ionic and covalent" compounds | written 离子型和共价型这两类化合物 with a `compound` span on 化合物 | one span as in the source |
| ch17/17.1/section.json | e1 to e10 prompts and solutions | part labels `(a)`…`(d)` written （a）…（d）; "Oxidized: … reduced: … oxidizing agent: … reducing agent:" written 被氧化 … 被还原 … 氧化剂 … 还原剂 | full-width labels in prose (ch01 precedent); the answer words are the glossary's |
| ch17/17.1/section.json | e5, e7 solutions | the `;` after the math in `${…};$` kept inside the math, the list separator of the prose written ； | ASCII inside math, full-width in prose |
| ch17/17.1/figures.js | `NAME`, hover names `'an oxygen atom, O'` … `'the nitrogen atom, N'` | written 氧原子 O, 氢原子 H, 碳原子 C, 氯原子 Cl, 氮原子 N | English articles ("an", "a", "the") collapse (4.1) |
| ch17/17.1/figures.js | `pair(...)` names `'two bonding pairs of electrons' : 'a bonding pair of electrons'`, `'a lone pair of electrons'` | written 两个成键电子对 : 成键电子对, 孤电子对 | article and "of electrons" collapse; the pair already means electron pair (4.1) |
| ch17/17.1/figures.js | `topline` sentences with `${X}` | rewritten in Chinese word order with the same slot: 成键电子对偏向电负性更大的原子 ${X}；到 100% 时，每一对都属于 ${X}。 | the English apposition "${X}, the more electronegative atom" cannot keep its order in Chinese |

### ch17/17.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.2/text.html | `galvanic-cell` span on 伏打电池 ("voltaic cell") | written （或<strong>伏打电池</strong>）, the span on 伏打电池 | the source gives "voltaic cell" as the alias of "galvanic cell"; 伏打电池 is its Chinese name and the glossary 原电池 is the first term (translate.md 4.5) |
| ch17/17.2/text.html | `cell-notation` spans on 图式, 电池图式 ("cell schematic", "schematic") | the spans wrap 图式 and 电池图式 where the glossary has 电池表示式 | the source lists "cell notations" and "cell schematic(s)" as synonyms and uses the bare "schematic"; the first is 电池表示式, "cell schematic" is 电池图式 and the bare "schematic" is its short form 图式 so that the words stay apart |
| ch17/17.2/text.html | `redox-reaction` and `system` spans ("this redox system") | written 氧化还原体系, with 氧化还原 and 体系 as two adjacent spans | Chinese says 氧化还原体系; the span on 氧化还原 is shorter than the glossary row 氧化还原反应 because the source's "redox" is the adjective |
| ch17/17.2/text.html | `inert-electrode` span on "inert" ("the inert platinum electrode") | the span wraps 惰性 only | the source wraps one English word; 惰性 stands before 铂电极 and the span stays in its block |
| ch17/17.2/text.html | spans `nitrate` on 硝酸银 (transfer, galvanic, notation), 硝酸铜 and 硝酸铜(II), 硝酸银(I) | the span wraps the whole Chinese compound name; the concept word is 硝酸盐 | Chinese names the compound in one word; the source wraps only "nitrate" of "silver nitrate" (translate.md 3.3; same as the ch01 compound-name row) |
| ch17/17.2/text.html | galvanic, "an aqueous silver nitrate solution" (span `mixtures` on "solution") | written 硝酸银水<span>溶液</span>; the span wraps 溶液, the 水 stays outside | Chinese says 水溶液 for "aqueous solution"; the span keeps the concept word 溶液 and stays in its block |
| ch17/17.2/text.html, ch17/17.2/section.json | `\text{overall reaction:}`, `\text{net cell reaction:}`, `\text{oxidation half-reaction:}`, `\text{anode (oxidation):}` | the words are translated, the punctuation inside `\text{}` is full-width (总反应：, 阳极（氧化）：), the one convention of the chapter (all seven pages; review pass) | a Chinese label inside `\text{}` is prose, so it takes the Chinese punctuation; the TeX outside the label stays ASCII (translate.md 3.5); the same holds for `\text{（碱性溶液）}` (17.2) and `\text{（绿色）}`, `\text{（蓝色）}` (17.6) |
| ch17/17.2/text.html | notation, guidelines, "vertical parallel lines" | translated as 竖直的平行线 as the source says | the source's wording is kept although the schematics use single and double bars; nothing corrected |
| ch17/17.2/figures.js | sim-galvanic-cell, `legend` row `'Fe³⁺ in, Fe²⁺ out'` | written `'Fe³⁺ 进，Fe²⁺ 出'` | a legend slot is 270 px wide at size 26; the short form keeps the line inside it (translate.md 4.7) |
| ch17/17.2/figures.js | sim-galvanic-cell, hover names (`name:` of `kinds`) | "a copper(II) ion, Cu²⁺, entering…" written with the noun first and the article as 一个 (一个铜(II)离子 Cu²⁺，从阳极进入溶液; 导线中的一个电子 e⁻); the same rule as 17.3 to 17.6 (review pass, round 2) | English articles have no Chinese form; a single particle is named with 一个 across the chapter (translate.md 4.1) |
| ch17/17.2/figures.js | sim-galvanic-cell, `views` labels | `front` and `above` written 正视 and 俯视 | view buttons are reader-visible words (translate.md 5, figures.js item 1) |

### ch17/17.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.3/text.html | `standard-hydrogen-electrode` spans on `SHE` (6 places) | the span wraps SHE, the abbreviation, and the spans on the full name wrap 标准氢电极; `SHE` is kept in Latin letters | the source wraps the acronym itself, which is also what the Chinese text prints (标准氢电极（SHE）); an acronym is kept (translate.md 5) |
| ch17/17.3/text.html, ch17/17.4/section.json | subscript words in math and prose, `\kEo{}_{\text{正向}}` (17.3, 2 equations), `[Zn²⁺]<sub>阴极</sub> = [Zn²⁺]<sub>阳极</sub>` (17.4 cyl3 solution) | translated (正向, 阴极, 阳极) wherever the page writes the subscript itself | translate.md 5 translates words in `\text{}` and `<sub>`; the macros `\kEcathode`, `\kEanode`, `\kEocell` and the `E_cell` of the solutions print their English subscripts (cathode, anode, cell) and cannot be translated from here, so those stay (review pass, round 2) |
| ch17/17.3/text.html, ch17/17.6/text.html, ch17/17.7/text.html | `standard-electrode-potential` spans on "standard", "standard reduction potentials", "reduction potential", "standard electrode (reduction) potentials" | the spans wrap 标准 (17.7 alone), 标准还原电势, 还原电势, 标准电极（还原）电势, where the glossary has 标准电极电势 | the source wraps the shorter or longer English variant; Chinese keeps the variant words (还原) inside the span and the span stays in its block (translate.md 3.3) |
| ch17/17.3/text.html, ch17/17.4/text.html, ch17/17.7/text.html | `spontaneous-process` spans on 自发性 and 非自发 ("spontaneity", "nonspontaneous") | the span wraps 自发性 and 非自发 where the glossary has 自发过程 | the English wraps the abstract noun and the adjective; Chinese forms the noun with 性 and the negation with 非 (translate.md 3.3) |
| ch17/17.3/text.html | Example 17.5, "Supporting this predication by calculating" | written 来佐证这一预测; the section.json `notes` records the slip as “predication” with prediction（预测） in parentheses | the book misspells "prediction"; a misspelling of an English word cannot be carried into Chinese (translate.md 4.3) |
| ch17/17.3/text.html | span on 电压 (`electrical-potential`, source "voltage") | the span wraps 电压, the word for voltage; the concept's name is 电势 | the source wraps the English synonym "voltage" of "potential"; Chinese keeps the two words apart (translate.md 3.3, the span stays in its block) |
| ch17/17.3/text.html | spans on `unit` ("volt unit"), `bar-unit` ("1 bar pressures") | 单位 wraps "unit" in 伏特为单位; `bar` stays the unit symbol inside the `bar-unit` span and 压强 wraps `gas-pressure`, written 1 bar 压强 (review pass; 巴 was changed back) | Chinese says "measured in the volt unit" as 以伏特为单位; the number with bar is the unit symbol, which translate.md 3.4 keeps |
| ch17/17.3/text.html | "the anode’s rung", "the cathode half-cell" (`data-ref` spans), sim-head | 阳极的那一档, 阴极半电池 | the Chinese noun phrase takes the place of the English possessive and article; the span wraps the whole phrase as the source does |
| ch17/17.3/text.html, ch17/17.3/section.json | Sim-head "1 bar", `figures.js` "H₂ inlet, 1 bar" | `bar` kept as the unit symbol, and the prose spans on `bar-unit` now also wrap the symbol `bar` (1 bar 压强) | translate.md 3.4 and 5 keep unit symbols |
| ch17/17.3/section.json | `summary_html`, "the difference in between its cathode and anode" | written 阴极与阳极之间的差 | the book leaves out "potential" after "difference in"; the Chinese keeps the gap as the source has it |

### ch17/17.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.4/text.html | #dg, "the number of <span data-concept="mole">moles</span> of electrons transferred" and the sim-relations sim-head "the number of moles of electrons" | the `mole` span wraps 物质的量 (转移电子的物质的量, 电子的物质的量) where the glossary row mole has 摩尔; in "one mole of electrons" it wraps 摩尔 | Chinese counts an amount of substance in 物质的量 (glossary moles of electrons => 电子的物质的量), and the span stays in its block (translate.md 3.3) |
| ch17/17.4/text.html | #concentration-cell example 17.8 solution and sim-concentration-cell sim-head: `<span data-ref="cathode-half-cell">the <span data-concept="cathode">cathode</span></span>` (4 places), "the dilute half-cell", "the concentrated one" | the article dropped: the `data-ref` span wraps 阴极 / 阳极 (and 稀溶液半电池 / 浓溶液半电池), the inner `cathode`/`anode` span is kept; "the concentrated one" written 浓溶液半电池 | English article has no Chinese form (4.1); "one" stands for the half-cell and is repeated |
| ch17/17.4/text.html | #nernst, "standard <span data-concept="temperature">temperature</span> (298) K)" | the stray parenthesis printed in the source kept: 标准温度 (298) K) | source typo kept as printed (section.json notes) |
| ch17/17.4/text.html, ch17/17.4/section.json | Table 17.2 last column, "spontaneous" / "non-spontaneous", "Products more abundant" | 自发的 / 非自发的; 产物更多 | glossary 自发的 / 非自发的; the plain comparative |
| ch17/17.4/text.html | math `\text{anode (oxidation):}`, `\text{Anode:}` etc. | words inside `\text{}` translated (阳极（氧化）：, 阴极（还原）：, 总反应：); the TeX outside kept | translate.md 5 |
| ch17/17.4/section.json | exercise e31 prompt, `\text{at 377 K}`, `\text{at 25}\;{}^{\circ}\text{C}` | written `\text{在 377 K 时}` and `\text{在 25}\;{}^{\circ}\text{C 时}` | the English "at" sits inside `\text{}` and the Chinese needs 时 after the value |
| ch17/17.4/section.json | derivations | `source` written 化学（第2版），17.4 电势、自由能与平衡 (as 10.3); `src` "Appendix B" written 附录 B; `tex` and `\mk` keys kept | translate.md 5 |
| ch17/17.4/figures.js | sim-nernst headline `the reaction is ${Ec > 0 ? 'spontaneous' : 'nonspontaneous'} in this mixture` | rewritten in Chinese word order with the same slots: 当 … 时，… V：该混合物中的反应是${Ec > 0 ? '自发的' : '非自发的'} | English sentence frame cannot carry the slots in the same order |
| ch17/17.4/figures.js | hover names `K = … at E°cell = … V, n = …`, `E°cell = … V, where Q = 1`, `Q = K = …, where E_cell = 0`, `the mixture: Q = …`, and the labels with articles ('a zinc ion, Zn²⁺, …', 'an electron, e⁻, in the wire', 'the salt bridge', 'a porous plug') | operand order changed to Chinese (E°cell = … V、n = … 时，K = …; …，此处 …); the leading articles dropped | Chinese word order; English articles have no Chinese form (4.1) |
| ch17/17.4/figures.js | sim-concentration-cell readout note "one Zn²⁺ ion … and one plates onto the cathode as zinc" | 一个 Zn²⁺ 离子 … 同时有一个在阴极上析出为锌 | English singular/plural and article grammar collapses to one Chinese form (4.1) |
| ch17/17.4/figures.js | labels 'spontaneous' / 'nonspontaneous' on the K and E axes | 自发 / 非自发 | the axis labels name the region of the graph, no particle 的 |

### ch17/17.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.5/text.html, ch17/17.5/section.json | `fuel-cell` spans on 液流电池 ("flow battery") | the span wraps 液流电池 where the glossary has 燃料电池 | the source says a fuel cell is "sometimes called a flow battery" and wraps that alias with the `fuel-cell` span; Chinese gives the alias as it is named |
| ch17/17.5/text.html | `cell-potential` spans on 电压 ("voltage"), 8 places | the span wraps 电压 where the glossary has 电池电势 | the source wraps the English synonym "voltage" of the cell potential; Chinese keeps 电压 for the quantity of a battery (as 17.3 does for `electrical-potential`) |
| ch17/17.5/text.html | `reversible-reaction` span on 逆转 ("reversed") | the span wraps 逆转 in 便于逆转的电池反应 | the source wraps the verb "reversed"; the Chinese verb 逆转 is the shorter wrap of the glossary row 可逆反应 |
| ch17/17.5/text.html | `combustion-reaction` span on 燃烧 ("combusted") | the span wraps 燃烧 | the source wraps the verb form; 燃烧 is the verb and the glossary row 燃烧反应 the reaction |
| ch17/17.5/text.html, ch17/17.7/text.html | `secondary-cell` spans on 电池 ("secondary cells", "secondary battery", "a battery" in 17.7) | the spans wrap 二次电池 in 17.5 where the source says "secondary cells"/"secondary battery", and 电池 in 17.7 ("recharging a battery") | in 17.7 the source wraps the plain word "battery" with the `secondary-cell` span; the span stays in its block |
| ch17/17.5/text.html | photo alt of the Daniell cell, label "Element Daniell" | kept in Latin letters inside quotes: 标有“Element Daniell”的电化学池 | the words are printed on the photographed apparatus; a label in the image is not translated (translate.md 4.3) |
| ch17/17.5/text.html | #batteries, "in a way that best suits its intended use a source of electrical power" | written 其方式最适合它的预期用途：为特定应用提供电源 | the source lacks the word "as" (kept as printed in section.json notes); Chinese cannot carry the gap without a break, so a colon stands where the English omits the link |
| ch17/17.5/text.html | #lithium, "they can provide a large amount current" | written 它们能提供大量电流 | the missing "of" has no Chinese form (4.1) |
| ch17/17.5/text.html | #fuel-cells, "via a catalyzed electrochemical that is significantly more efficient" | written 经由催化的、效率明显更高的电化学 (no noun added) | the source omits the noun after "electrochemical"; the Chinese stops in the same place |
| ch17/17.5/text.html | #single-use, `oxide` span in "manganese(IV) oxide" and `electrolyte` span in "electrolyte paste" | the `oxide` span wraps the whole compound name 氧化锰(IV); in 电解质糊 the `electrolyte` span wraps 电解质 and 糊 stays outside | Chinese names the compound in one word (ch01 precedent); the span stays in its block |
| ch17/17.5/text.html | #batteries (Daniell caption, reversible), #single-use (voltage paragraph), #fuel-cells (efficiency sentence) | a few spans change their order within the block: 半电池 … 盐桥 … 半电池 kept in order, but 它依赖铜(II)离子使锌发生自发氧化 puts `ion` before `oxidation`, and 燃料电池的能量效率 puts `fuel-cell` before `energy` | Chinese word order of 铜(II)离子使锌发生氧化 and 燃料电池的能量效率; the spans stay in their block |
| ch17/17.5/text.html | #rechargeable, "Nickel-cadmium, or NiCd, batteries" | written 镍镉电池，或称 NiCd 电池; the two `nickel-cadmium-battery` spans wrap 镍镉电池 and NiCd 电池 | the English wraps "Nickel-cadmium" and "batteries" separately; Chinese names the battery in one word |
| ch17/17.5/text.html | #rechargeable, "heavy metal", #fuel-cells "catalyzed" | the `metal` span wraps 金属 in 重金属; the `catalyst` span wraps 催化的 (glossary row 催化的) | compound word and adjective form of the glossary |
| ch17/17.5/text.html | alt of the Daniell, dry cell, alkaline, NiCd and lead acid photos | spelled-out symbols ("Z n", "S O subscript 4 superscript 2 negative", "M n O subscript 2") written as formulas Zn, SO₄²⁻, MnO₂; the source slip "At the back right corner" for the negative terminal kept | the spelling is a screen-reader device of the English alt; the symbols are the formulas |
| ch17/17.5/text.html | alt of the lead acid photo, label "Postive electrode" | the typo is not carried; written 正极（二氧化铅） | a misspelling of an English label (4.3) |
| ch17/17.5/text.html | math `\text{anode reaction:}`, `\text{cathode:}`, `\text{cell:}`, `{\text{cathode: PbO}}_{2}` | words inside `\text{}` translated (阳极：, 阴极：, 电池反应：, 阴极：PbO); TeX outside kept (review pass: 电池： became 电池反应：, as 17.3 writes "cell reaction:") | translate.md 5 |
| ch17/17.5/text.html, ch17/17.5/section.json | "cell" as one battery of a stack ("Each cell produces 2 V", "six cells") | written 单体电池 | the glossary has 电池 for battery; Chinese needs 单体 for one cell of a battery (pending term) |
| ch17/17.5/text.html | sim-head 17.12 and data-original-caption | "The positive electrode is the cathode while the battery discharges and the anode while it is charged" written 电池放电时，正极是阴极，充电时是阳极 | Chinese word order |
| ch17/17.5/section.json | e33 solution `(a)`, `; (b)`, `; (c)` | written （a）, ；（b）, ；（c）; the semicolon inside the math stays | prose labels and separators are full-width, math is kept |
| ch17/17.5/section.json | e35 solution, "rise in the numerator … falls in the denominator" | written 位于商的分子项 … 位于分母项 | 分子 alone also means molecule |
| ch17/17.5/section.json | notes | the quotes of the source slips ("Its intended use a source", "a large amount current", "via a catalyzed electrochemical that is") kept in English inside the Chinese sentence | they quote the English text and cannot be translated without changing what they point at (4.3) |
| ch17/17.5/figures.js | sim-li-ion `mode` choice | label `\text{process}` written `\text{过程}`; options 放电 / 充电; aria translated | translate.md 5 item 1 |
| ch17/17.5/figures.js | hover names with articles ('a cobalt atom of a CoO₂ layer', 'an electron, e⁻, in the external circuit', 'a lithium atom held between graphite layers, as LiC₆', …) | articles dropped; qualifier placed before the noun (CoO₂ 层中的一个钴原子; 外电路中的一个电子 e⁻; 以 LiC₆ 形式保持在石墨层之间的一个锂原子) | English article and genitive grammar (4.1) |
| ch17/17.5/figures.js | sim-fuel-cell readout small line | `So far ${2 * done} H₂ and ${done} O₂ have reacted, giving ${2 * done} H₂O …` written with 个 and the same four slots | English plural-free frame in Chinese word order |
| ch17/17.5/figures.js | sim-fuel-cell labels 'fuel in' / 'air in' | written 燃料进入 / 空气进入 | Chinese has no bare "in" label |
| ch17/17.5/text.html | "a potassium hydroxide electrode" (nickel-cadmium paragraph) | translated as printed: 氢氧化钾电极, the `hydroxide` span on 氢氧化钾, the footnote marker kept | source error kept as printed; its correction is the footnote c-nicd-electrolyte |

### ch17/17.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.6/text.html | #corrosion note, `oxide` spans in "copper(I) oxide (Cu₂O)" and "copper(II) oxide"; #rust "iron(III) oxide hydrate"; #protection `steel` span in "stainless steel" | the `oxide` spans wrap the whole compound name 氧化铜(I), 氧化铜(II), 氧化铁(III); the `steel` span wraps 不锈钢; the `hydrate` span wraps 水合物 after 氧化铁(III) | Chinese names the compound in one word (ch01 precedent); the span stays in its block |
| ch17/17.6/text.html, ch17/17.6/section.json | `stoichiometry` span, "The stoichiometry of the hydrate varies" | written 该水合物的化学计量关系是可变的; the span wraps 化学计量 (ch09 row), not the discipline 化学计量学 | "stoichiometry" here is the quantitative ratio; the `hydrate` span now precedes the `stoichiometry` span, which translate.md 3.3 allows inside one block (review pass, round 2) |
| ch17/17.6/text.html | #rust, "the formation of rust does not create a protective layer and so corrosion of the iron continues as the rust flakes off and exposes fresh iron to the atmosphere" | written 随着铁锈剥落、新鲜的铁暴露于大气之中，铁的腐蚀会持续进行 | one cause-and-effect chain; the `atmosphere` span now precedes the `corrosion` span, which translate.md 3.3 allows inside one block (review pass, round 2) |
| ch17/17.6/text.html | #protection, "alloying the iron with other metals" | written 使铁与其他金属形成合金 | English derives a verb from "alloy"; Chinese says 形成合金, with the `metal` span on 金属 |
| ch17/17.6/text.html | #protection, "forms a passivating an oxide layer" (source slip) | written 形成起钝化作用的氧化物层; the doubled article is not carried | a grammar slip of English articles (4.1); the slip is recorded in section.json `notes` |
| ch17/17.6/text.html | #protection, "because as they get used up as they corrode (oxidize) at the anode" (source slip) | written 因为它们在阳极处腐蚀（氧化）而被消耗掉 | the doubled "as" has no Chinese form (4.1); recorded in section.json `notes` |
| ch17/17.6/text.html | #protection, "Iron and other metals may also be protected from corrosion by galvanization" | written 也可以免受腐蚀，所用的方法是镀锌 | keeps the span order metal, corrosion, galvanization (镀锌 would otherwise come before 腐蚀) |
| ch17/17.6/text.html | #corrosion, "half a trillion dollars" | written 五千亿美元 | Chinese counts in 万 and 亿 (4.4) |
| ch17/17.6/text.html | #corrosion note, "Copper metal" (`metal` span) | written 金属铜, the span on 金属 | Chinese word order of the apposition |
| ch17/17.6/text.html, ch17/17.6/section.json | "tarnish on silver", "tarnishing of silver" | written 银失去光泽 in the text and 铁生锈和银失去光泽 in the summary (glossary 失去光泽) | the glossary row is a verb phrase, so both sit as clauses (review pass, round 2) |
| ch17/17.6/text.html | #rust, `\text{anode:}`, `\text{cathode:}`, `\text{overall:}`, `\text{(red)}` etc. in math | words inside `\text{}` translated (阳极：, 阴极：, 总反应：, 红色, 黑色, 绿色, 蓝色); TeX outside kept | translate.md 5 |
| ch17/17.6/text.html, ch17/17.6/section.json | "Figure 17.15" and "Figure 17.17" in prose and in the footnote | written 图 17.15, 图 17.17; the book's slip "as illustrated in Figure 17.15" (rust cell, should be 17.16) kept | per-book rule 4.6; the slip is a source error and stays |
| ch17/17.6/section.json | notes | the quotes of the source slips (“as illustrated in Figure 17.15”, “a passivating an oxide layer”, “because as they get used up”, “Corrosion process involve”) kept in English inside the Chinese sentence | they quote the English text and cannot be translated without changing what they point at (4.3) |
| ch17/17.6/section.json | summary_html, “Corrosion process involve” (source slip) | written 腐蚀过程涉及 | the subject-verb slip has no Chinese form (4.1); recorded in notes |
| ch17/17.6/section.json | e42 prompt | written without a question mark: 为什么用金属锂制成的牺牲阳极是一个糟糕的选择 | the source's missing question mark is kept as printed |
| ch17/17.6/section.json | e37 prompt and solution, e41 solution | “(a)” labels written （a）…; "B &lt; A &lt; C" kept | prose labels are full-width; the entity is markup |
| ch17/17.6/figures.js | hover names with articles ('an electron, e⁻', 'an oxygen molecule, O₂', 'a water molecule, H₂O', 'an iron(II) ion, Fe²⁺', 'a zinc ion, Zn²⁺', 'a magnesium ion, Mg²⁺', 'a drop of water') | articles written as 一个 / 一滴; the symbol follows the noun (一个氧分子 O₂) | English article grammar (4.1) |
| ch17/17.6/figures.js | legend item `${o.ion} ion` | written `${o.ion} 离子` | same slot, Chinese noun after the formula |
| ch17/17.6/figures.js | cathodic/anodic site labels `cathodic site:  …`, `anodic site:  …` | written 阴极部位：…, 阳极部位：… (full-width colon in place of the double space) | the label separator is punctuation (3.5) |
| ch17/17.6/figures.js | `OPT` notes “Zinc’s … lies below …”, “Magnesium’s … lies below …” | written 锌的 … 低于 …, 镁的 … 低于 … | English possessive and "lies below" collapse to one Chinese form (4.1) |
| ch17/17.6/section.json | e42 solution, "this high potential is also indicative of how reactive lithium is" | written 但这样高的电势也表明锂的反应性有多强, the book's "high" kept | the book means the magnitude of lithium's large negative potential; the word is kept as printed (3.2), not corrected (review pass) |
| ch17/17.6/text.html | #rust, "as indicated by the use of x in the compound formula" | written 如该<span>化合物</span>的化学式中的 x 所示, the `compound` span on 化合物 | 化合物式 is not a Chinese term; the span stays on the word it wraps in the source (review pass) |

### ch17/17.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.7/text.html | `liquid` span on 液态 ("liquid NaCl") | the span wraps 液态 | the state adjective, as in ch01 (固态/液态) |
| ch17/17.7/text.html | `average-atomic-mass` span on 原子质量 ("atomic mass") | the span wraps 原子质量 where the glossary has 平均原子质量 | the source wraps "atomic mass", the shorter English form |
| ch17/17.7/text.html | #electrolytic, "various products (e.g., jewelry, utensils, auto parts)", span `product` | the span wraps 产品 (goods), where the glossary has 产物 (reaction product) | the source's `product` here means commercial goods, and Chinese has two words for the two senses (translate.md 3.3) |
| ch17/17.7/text.html | #molten-nacl, "chlorine gas"; #aqueous-nacl, "chlorine gas" (the `gas` spans) | the spans wrap 氯气 | Chinese names the gas in one word (氯气); 氯气体 does not exist and the span cannot wrap only "gas" (ch01 precedent for 天然气) |
| ch17/17.7/text.html | #aqueous-nacl, "sodium hydroxide (lye)", span `hydroxide` | the span wraps the whole compound name 氢氧化钠 | Chinese names the compound in one word; the span cannot wrap only "hydroxide" (ch01 precedent) |
| ch17/17.7/text.html | #aqueous-nacl, "silver nitrate" (2 spans in the electroplating note and Example 17.9), span `nitrate` | the span wraps the whole compound name 硝酸银 | Chinese names the compound in one word (as in ch17 17.2) |
| ch17/17.7/text.html | #aqueous-nacl, "the electrolysis of either water species (H₂O, H⁺, OH⁻) or solute species" | written 水物种的电解（H₂O、H⁺、OH⁻）或溶质物种的电解（…）, the `electrolysis-of-aqueous-solutions` span on the first 水物种的电解 only | the English “either … or” shares the word electrolysis between both halves; Chinese says it in both halves so that the second half reads as electrolysis of the solute species, and the span stays where the source puts it (review pass, round 2) |
| ch17/17.7/text.html | #aqueous-nacl, "water may be oxidized at a less negative/more positive potential (–1.229 V) than chloride ion (–1.358 V)" | written 水被氧化所需的电势（–1.229 V）比氯离子（–1.358 V）的更不负／更正, spans and numbers in the source order | the English comparative frame “at … than” needs the Chinese 比 construction; the order water, potential, chloride ion is kept |
| ch17/17.7/text.html | #aqueous-nacl, "a neutral aqueous sodium chloride solution", spans `neutral-solution` and `mixtures` | written 中性的氯化钠水溶液, the spans on 中性 and 溶液 | the source wraps “neutral” and “solution” separately; 水溶液 contains the `mixtures` word 溶液 |
| ch17/17.7/text.html | #quantitative, "composite unit" | written 复合单位 | the book's phrase for a unit made of others; no standard Chinese term is implied |
| ch17/17.7/text.html, ch17/17.7/section.json | Example 17.10 problem, “from a solution of containing chromium(III) ions” (source slip, a word missing) | written 由含有铬(III)离子的溶液 | the missing word is English grammar and cannot be carried into Chinese (4.1); the section.json `notes` say so |
| ch17/17.7/text.html, ch17/17.7/section.json | Example 17.9, "How many moles of electrons passed through the cell?" | written 电子的物质的量是多少, the `mole` span on 物质的量 | the glossary row moles of electrons is 电子的物质的量; the other “n mole of electrons”, “1 mole of electrons” are counts and are written 摩尔 |
| ch17/17.7/text.html | #electroplating note, "(Figure 17.20)." after a full stop | written ……这一过程。（图 17.20）。 | the book's stray bracketed citation after a sentence is kept as printed |
| ch17/17.7/text.html | display equations, `\text{anode:}`, `\text{cathode:}`, `\text{cell:}`, `\text{cell: 2}`, `\text{anode: Ag}`, `\text{cathode: Ag}`, `\text{volume}`, `\text{mass}`, `\text{density}`, `\text{mass Ag}` | written `\text{阳极：}`, `\text{阴极：}`, `\text{总反应：}`, `\text{总反应：2}` (review pass; 电池 means a battery to a Chinese reader, and these are electrolytic cells), `\text{阳极：Ag}`, `\text{阴极：Ag}`, `\text{体积}`, `\text{质量}`, `\text{密度}`, `\text{Ag 的质量}` | full-width colon inside `\text{}` for the Chinese label (translate.md 3.5); “mass Ag” takes the Chinese order |
| ch17/17.7/text.html | Example 17.10, "the molar amount of chromium" | written 所需铬的物质的量 | “molar amount” is the amount of substance (mol), so 物质的量 (ch01 decision) |
| ch17/17.7/text.html | sim-head Figure 17.20, "moles of electrons passed count up with the time" | written 通过的电子的物质的量随时间累计增加 | glossary row moles of electrons |
| ch17/17.7/text.html, ch17/17.7/section.json | "1 hour", "15.0 minutes", "35 minutes", "45 minutes" in prose | written 1 小时, 15.0 分钟, 45 分钟; the symbols `hr` and `min` inside math kept | a unit without a symbol in the source's prose takes the target name (4.4) |
| ch17/17.7/text.html | Example 17.9 problem, "In one process used for electroplating silver" | written 在一种电镀银的工艺中, the `electroplating` span on 电镀 | “electroplating silver” is the verb with its object; Chinese says 电镀银 |
| ch17/17.7/section.json | e46 prompt, "(a) CaCl₂, (b) LiH …" | part labels written （a）…（d） | full-width labels in prose (ch01 precedent) |
| ch17/17.7/figures.js | views `label: 'front'` and `'above'` | written 正视 and 俯视 | the labels of the view buttons, as in the ch17 17.2 figures |
| ch17/17.7/figures.js | `who === 'anode' ? … : …` in Figure 17.19 | the compared words are written 阳极 and 阴极 in the array and the test | code compares the displayed word; both sides changed together, the logic is the same |
| ch17/17.7/figures.js | legend names `'electron, e⁻'` | written `'电子 e⁻'` | the symbol is kept and the noun precedes it in Chinese |
| ch17/17.7/figures.js | Figure 17.20 hover names `a silver ion, Ag⁺, moving from the anode to the spoon` | the article dropped: 银离子 Ag⁺，从阳极移向汤匙 | English article grammar collapses to one Chinese form (4.1) |
| ch17/17.7/text.html, ch17/17.7/section.json | "cell" for an electrolysis apparatus (Figure 17.18 caption and sim-head, #water, Example 17.9, e48 prompt) | written 电解槽 for the Downs cell (the ch18 row 唐斯电解槽) and 电解池 for the other electrolytic cells | 电池 means a battery or a galvanic cell to a Chinese reader; the glossary rows electrolytic cell 电解池 and Downs cell 唐斯电解槽 name these (review pass) |
| ch17/17.7/section.json | e48 `figure.alt`, spelled-out formulas ("H subscript 2 O plus H subscript 2 S O subscript 4", "O subscript 2 ( g )") | written H₂O + H₂SO₄, O₂(g), H₂(g) | the spelling is a screen-reader device of the English alt (the 17.5 decision; review pass) |
| ch17/17.7/text.html | `mixtures` span on "solution" (silver nitrate solution, "aqueous sodium chloride solution", "a solution of chromium(III) ions") | the span wraps 溶液, kept where the source tags it | the source tags "solution" with `mixtures`; Chinese has the one word 溶液 |
| ch17/17.7/figures.js | hover names and labels built with an article ('a drop of liquid sodium', 'a chlorine bubble', 'the beaker') | the article of a single particle written as 一个 (一个电子 e⁻，被电源推动着通过导线; 一个银离子 Ag⁺，从阳极移向汤匙; 一滴液态钠 Na(l)); other leading articles dropped | English article and plural grammar collapses to one Chinese form (4.1); the rule is the chapter's 一个 for a single particle (review pass, round 2) |
| ch17/17.7/figures.js | sim-water-electrolysis headline, the three branches 'Above / At / Below 1.229 V' | each branch a full Chinese sentence with 1.229 V in the same place (高于 / 在 / 低于 1.229 V 时，…) | English word order and clause structure |
| ch17/17.7/figures.js | readout note of sim-silver-plating, "each mole of electrons plates one mole of silver" | written 每摩尔电子使一摩尔银镀到汤匙上，所以汤匙增加了 …; the slot `${...}` stays | Chinese word order |
| ch17/17.7/text.html | `standard-cell-potential` span on 电池电势 (Figure 17.18 sim-head, "the negative cell potential") | the span wraps 电池电势 where the glossary has 标准电池电势 | the source wraps the words "cell potential" only, the symbol that follows is the standard one; the span stays in its block (translate.md 3.3) |

### Chapter 17: Other things for the owner

- **English kept in `answer.part` / `answer.parts[].part`.** ch17/17.3 cyl2 ("<em>E</em>°<sub>cell</sub> for the oxidation of Br<sup>−</sup> by I<sub>2</sub>", "… of I<sup>−</sup> by Br<sub>2</sub>"), ch17/17.4 cyl1 ("standard free energy change, Δ<em>G</em>°", "equilibrium constant, <em>K</em>"), cyl3 ("[Zn<sup>2+</sup>] in each half-cell") and the "(a)" labels of e27 and e31; ch17/17.7 cyl1 ("mass of aluminum metal recovered"), cyl2 ("mass of zinc", "time") and e46 ("(a) mass Ca", "(a) mass Cl<sub>2</sub>" and so on) keep the English label because `part` is a kept field (translate.md 5) and `translation_parity.py` flags a change; the reader sees an English label.
- **Source slips kept or smoothed.** 17.1 (missing "to", "oxidations numbers", missing full stop after CrO₄²⁻), 17.3 ("predication"), 17.4 ("(298) K)", the run-together "TFaraday's constant … he relation", "−0.1 7 V" in Example 17.7), 17.5 ("Its intended use a source", "a large amount current", "via a catalyzed electrochemical that is", "Postive electrode"), 17.6 ("as illustrated in Figure 17.15" for the rust cell, "a passivating an oxide layer", "because as they get used up", "Corrosion process involve", e42 without question mark), 17.7 ("from a solution of containing"). Each section.json `notes` field says how it was handled; English-grammar slips are not carried into Chinese and the numeric or citation slips are kept as printed.
- **Terms not looked up at termonline.cn.** Rows of `glossary.zh-CN.json` with `"confirm": "termonline"` (and `"owner"` for 未配平) are still to be confirmed; the unverified ones that matter most: 活性电极, 供体/受体 (donor, recipient of electrons), 通用参比, 推动力, 氧化能力, 观察法, 水的离子积, 唐斯法, 大宗化学品, 蚀坑, 熔体, 环境 (surroundings).
- **Merge decisions.** `stoichiometry` is 化学计量 (the ch09 row), not 化学计量学: 17.1 (2 spans) and 17.5 (1 span) were changed; `balanced equation` is 配平的化学方程式 (the ch09 row; 17.1 text.html 4 and section.json 1 changed); `melt` (noun, the liquid in the Downs cell) is a separate row `melt (noun)` 熔体 beside ch10's verb 熔化; `product` of a commercial process is `product (goods)` 产品 beside 产物. `reactant`, `product`, `aqueous solution`, `internal combustion engine` and `storage tank` were reused from ch09/ch12 and added to no chapter glossary.
- **Part labels.** Two ASCII `(a)` label sets that survived in prose were set full-width in the merge: 17.4 e31 prompt and answer, 17.5 exercise 1 answer (b).
- **氧化铅.** The ch01 note on `lead oxide` does not arise here: the lead acid battery of 17.5 names 二氧化铅 and PbO₂.
- **Figure and sim eyebrows stay English, 图 N.M citations are unlinked plain text** until the app localises them (same as ch01).
- **Humanizer review** and the `npm run dev` read-through are outstanding.
- **Review pass, round 2, declined or left to the owner.** (1) `lye` 碱液 (17.7, 氢氧化钠（碱液）) follows the ch02 row; 烧碱 is the common name of NaOH, but the term is another chapter's and the shared row is not edited here, so the owner decides it across chapters. (2) The 17.5 phrase "a catalyzed electrochemical that is significantly more efficient" stays as 但经由催化的、效率明显更高的电化学: adding 途径 would add a word the book lacks (translate.md 3.2). (3) The missing full stop in Example 17.2 (17.1) and the missing question mark of the 17.6 sacrificial-lithium exercise stay as printed: an error of the book stays (translate.md 3.2). (4) `flow battery` 液流电池 is the book's alias of the fuel cell and is kept as printed; in Chinese 液流电池 names a different device (氧化还原液流电池), so a Chinese reader may take the book's claim for an error. (5) Subscript words and hover-name articles: see the rows of 17.3 and 17.2.

## Chapter 18 sections

The merge dropped the rows that are book-level (figure and sim eyebrows, figure and table citations, photo credits) and moved them into "Every page", kept the compound-name and state-word rows on their pages, and added the rows its own sweeps needed (shorter wraps such as 发射光谱, 过渡元素, 依数性, 还原, 氧化还原, 弱的酸, 减压 and the Geim/Fuller names).

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.1/text.html, ch18/18.2/text.html, ch18/18.3/text.html, ch18/18.4/text.html, ch18/18.5/text.html, ch18/18.7/text.html, ch18/18.9/text.html, ch18/18.10/text.html, ch18/18.11/text.html, ch18/18.12/text.html | spans on 氢气, 氯气, 氟气, 氙气, 氧气, 氮气, 天然气, 笑气 (`gas`), 室温, 常温, 低温, 高温 (`temperature`), 常压, 高压, 低压 (`gas-pressure`), 液氨, 液氧, 液氦, 液氮 (`liquid`) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 气体, 温度, 压强, 液体 | the source wraps one English word of "hydrogen gas", "natural gas", "room temperature", "high temperatures", "liquid nitrogen"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent, the span stays in its block) |
| ch18/18.1/text.html, ch18/18.3/text.html, ch18/18.5/text.html, ch18/18.7/text.html, ch18/18.8/text.html, ch18/18.9/text.html, ch18/18.10/text.html, ch18/18.12/text.html | `liquid` / `solid` spans before a substance ("liquid sulfur", "solid xenon trioxide", "Liquid hydrogen") | the spans wrap 液态 / 固态 (the state of the sample); 液体 / 固体 stay where a body of matter is meant ("a blue liquid", "a white solid") | Chinese says 液态硫, 固态三氧化氙 (Chapter 1, 1.2) |
| every text.html and section.json of chapter 18 | spans on compound names: `oxide` (氧化铝, 氧化硼, 氧化汞(II), 二氧化氮, 氧化磷(V) ...), `hydroxide` (氢氧化钠, 氢氧化钙 ...), `peroxide` (过氧化氢, 过氧化钠), `acid` (盐酸, 硝酸, 硫酸, 磷酸, 亚磷酸, 正磷酸, 氢卤酸 ...), `carbonate` / `hydrogen-carbonate` (碳酸钠, 碳酸钙, 碳酸氢钙 ...), `nitrate` (硝酸铵, 硝酸钾), `sulfate` / `sulfite` (硫酸钙, 硫酸钡, 亚硫酸氢钠) | the span wraps the whole Chinese compound name; the stock numeral stays inside or outside as the page records (氧化汞(II): the numeral outside the span except in 氧化磷(V), where the page keeps it inside) | Chinese names each compound in one word, so the span cannot wrap only "oxide" or "acid" (Chapter 1 precedent, 氧化汞(II) in 1.2) |
| ch18/18.6/text.html, ch18/18.8/text.html, ch18/18.9/text.html, ch18/18.11/text.html, ch18/18.4/text.html | `<span data-concept="oxide">oxide</span> <span data-concept="ion">ions</span>`, `hydroxide ions`, `peroxide ions`, `superoxide ions`, `carbonate ions`, `halide ions`, `nitride ion`, `selenide ion`, `hydride ion` | the two spans sit side by side on the two morphemes: 氧 + 离子, 氢氧根 + 离子, 过氧根 + 离子, 超氧根 + 离子, 碳酸根 + 离子, 卤 + 离子, 氮 + 离子, 硒 + 离子, 氢负 + 离子 | Chinese names the ions 氧离子, 氢氧根离子, 氮离子 (ch02 and ch14 rows), not by the compound-class word; 卤离子 is the word chapter.json already uses |
| ch18/18.1/text.html, ch18/18.4/text.html, ch18/18.5/text.html, ch18/18.6/text.html, ch18/18.9/text.html, ch18/18.11/text.html | `acidic` / `basic` / `concentrated` / `dilute` / `soluble` / `insoluble` spans (酸性, 碱性, 碱式, 浓, 稀, 可溶, 微溶, 易溶, 不溶) | the span wraps the Chinese adjective stem without 的, or the degree word that replaces it | the glossary rows are 酸性的, 碱性的, 浓的, 稀的, 可溶的, 不溶的; Chinese drops 的 before a noun, and 微溶, 易溶 carry the degree |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M`, the bare `Figure` and `Sim` kept (Figure 18.1 to 18.63) | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6), as in ch01 |
| every text.html, section.json | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch18/18.5/text.html, ch18/18.9/text.html, ch18/18.11/text.html | table eyebrows `Table 18.1`, `Table 18.2`, `Table 18.3` | written 表 18.1, 表 18.2, 表 18.3; the table citation in the prose written 表 18.3 | translate.md 5 lists a table's eyebrow as translated; the ch01 decision |
| every text.html, section.json | photo credits (intro 1, 18.1 3, 18.3 2, 18.4 2, 18.5 2, 18.6 2, 18.7 2, 18.9 3, 18.10 1, 18.11 3; section.json 18.3 and 18.4) | one formula: （来源：X） for a plain credit, （来源：改编自 X 的作品） for "modification of work by X", lettered or labelled credits （来源 a：…；b：…） and （来源 “根”：…；“根瘤”：…）; names, URLs and quoted user names kept as printed, a quoted name in curly quotes after a space; "United States Department of Agriculture" kept in English as printed (as USGS and NIST in ch01) | the ch01 and ch02 credit formulas; "credit" is translated, the names are not (translate.md 5); an agency with a standard Chinese name is translated, a person is not |
| every text.html, section.json | figures.js and prose: "a / an / the" before names, plural branches | dropped or collapsed to one Chinese form | English articles and plurals have no Chinese form (translate.md 4.1) |

### ch18/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/intro/text.html | `mid-1800s` | written 19 世纪中叶 | Chinese century form; same meaning |
| ch18/intro/text.html | `<span data-concept="representative-metal">representative metals</span>` etc. (plural spans) | English plural collapses to one Chinese form | no plural in Chinese (translate.md 4.1) |

### ch18/18.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.1/text.html | spans on 高温 (`temperature`, magnesium paragraph), 室温 (`temperature`, alkaline earth paragraph), 低温 (`temperature`, tin allotropes), 氢气 (`gas`, 9 spans) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 温度, 气体 | the source wraps one English word of "high temperatures", "room temperature", "low temperatures", "hydrogen gas"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent) |
| ch18/18.1/text.html | alkali paragraph, "very basic (alkaline) solutions" | written 强碱性（alkaline）溶液, span `basic-solution` on 碱性 | "basic" and "alkaline" are both 碱性 in Chinese; the sentence explains the English name "alkaline", so the English word is kept in parentheses (translate.md 4.3) |
| ch18/18.1/text.html | alkaline earth paragraph, "The name alkaline metal comes from" | written 碱性金属这一名称来自, as printed | the source's slip for "alkaline earth metal" (section notes) is kept, not corrected |
| ch18/18.1/text.html | group 14 paragraph, "semimetals or metalloids" | collapsed to 硅和锗是半金属的例子, span `metalloid` on 半金属 | the glossary gives 半金属 for both metalloid and semimetal (collision, translate.md 4.5); the two synonyms cannot be told apart in Chinese |
| ch18/18.1/text.html | group 14 paragraph, "grey (brittle) tin" and "gray tin" | both 灰锡 | the English spelling variants grey/gray have no Chinese counterpart (translate.md 4.3) |
| ch18/18.1/text.html | group 14 last paragraph, "tin plate-sheet iron, which constitutes the tin in tin cans" | 镀锡薄铁板，它就是“锡罐”（tin cans）中的“锡” | the passage turns on the English word "tin" naming both the metal and the can (translate.md 4.2) |
| ch18/18.1/text.html | group 12 and group 13 paragraphs, "2+-oxidation state", "3+-oxidation state", "4+-oxidation state" | written 2+ 氧化态, 3+ 氧化态, 4+ 氧化态 | the English hyphenated compound modifier has no Chinese form (translate.md 4.1) |
| ch18/18.1/section.json summary_html | the sentence on mercury 1+ | reordered to （不过汞也表现出 1+ 氧化态，其化合物中含有 ${\text{Hg}}_{2}{}^{2+}).$ ） so that the printed math run ends the sentence | the printed `${\text{Hg}}_{2}{}^{2+}).$` carries the closing parenthesis and full stop inside the math; kept byte for byte, so the Chinese clause is ordered to end there and its own 。 is not written |
| ch18/18.1/text.html | amalgam note, "Food and Drug Administration (FDA)", "Environmental Protection Agency (EPA)", "Centers for Disease Control (CDC)" | 美国食品药品监督管理局（FDA）, 美国环境保护署（EPA）, 美国疾病控制与预防中心（CDC） | the Chinese names of these organisations carry 美国, which the English names leave to the context (translate.md 4.4) |
| ch18/18.1/text.html | zinc paragraph, "basic carbonate" | `basic-solution` span on 碱式, `carbonate` span on 碳酸盐 | the English words "basic" and "carbonate" are two spans; Chinese 碱式碳酸盐 is one word, split at the same point |
| ch18/18.1/figures.js | `STATE` and `CLASS` names, hover `nameOf` | the strings are written as 固体, 液体, 气体 and Chinese class names, joined with full-width （ ） ： ， | reader-visible hover text; no plural or article branch exists in this figure's code |
| ch18/18.1/text.html | `<span data-concept="line-spectra">emission spectrum</span>` (2 places) | span wraps 发射光谱 (glossary row emission spectrum, 物理学名词), not 线状光谱 | the source words the concept as "emission spectrum"; 发射光谱 is the standard Chinese for it and does not contain the concept row 线状光谱 |
| ch18/18.1/text.html | `<span data-concept="transition-metal">transition elements</span>` (several spans) | span wraps 过渡元素 | the source says "transition elements"; 过渡元素 is the standard Chinese for it and the glossary 过渡金属 is not contained |
| ch18/18.1/text.html | aluminum "an excellent conductor of <span heat-flow>heat</span>" | written 铝是热的良导体, span on 热 | 热量 would not fit "conductor of heat"; the span stays in its block (as ch02 2.3) |
| ch18/18.1/section.json | exercise on fish "30 parts per million" (prompt and hint) | written 汞的含量按重量计为 30 ppm（百万分之三十） and 在汞含量为 30 ppm 时 | 30 百万分率 is not idiomatic Chinese (review pass); the unit ppm is kept as printed and glossed once in the prompt; the row `parts per million` stays 百万分率 |

### ch18/18.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.2/text.html | spans on compound names: oxide (氧化物锡石, 氧化铝, 氧化锌, 氧化镁, 氧化锡(IV)), hydroxide (氢氧化钠, 氢氧化铝, 氢氧化钙, 氢氧化镁), acid (盐酸), gas (氯气) | the span wraps the whole Chinese compound name; in 不纯的羟基氧化铝 the hydroxide span wraps 羟基 and the oxide span 氧化铝 | Chinese names these compounds in one word, the concept word cannot be separated (same as ch01) |
| ch18/18.2/text.html | `<span data-concept="energy-and-work">energy</span>` in "electrical energy" | span wraps 电能 | Chinese 电能 is one word; 能量 cannot stand alone in it |
| ch18/18.2/text.html | "Ions of metals in of groups 1 and 2" | written 第 1、2 族金属的离子, the doubled preposition "in of" has no counterpart | typo of the source with no Chinese form (4.1); the English stays in section.json notes |
| ch18/18.2/text.html | "The principle tin ore", "the principle lead and thallium ores" | written 主要的 | misspelling of "principal" has no Chinese form |
| ch18/18.2/text.html | "In honor to the two inventors" | written 为纪念这两位发明者 | grammatical slip of the source has no Chinese form |
| ch18/18.2/text.html | "Charles M. Hall", "Paul L. T. Héroult", "Oberlin College in Ohio" | 查尔斯·M·霍尔, 保罗·L·T·埃鲁, 俄亥俄州奥伯林学院; initials kept | person and place names rendered by their standard Chinese forms (2.7) |
| ch18/18.2/text.html | "the chapter on fundamental equilibrium concepts" | 见<span data-concept="chemical-equilibrium">平衡</span>的基本概念一章, the span on 平衡 as in the source's "equilibrium" | the title of ch13 is 平衡的基本概念 (row `Fundamental Equilibrium Concepts` of ch13); the merge swept 基本平衡概念 to it |
| ch18/18.2/text.html | math `\begin{array}…` lines `\text{at the cathode:}` etc. | `\text{阴极:}`, `\text{阳极:}`, `\text{总变化:}` with ASCII colon | ASCII inside math (3.5) |
| ch18/18.2/section.json | e1 solution `\text{countercurrent} \\ \text{fractionating} \\ \text{tower}` | `\text{逆流} \\ \text{分馏} \\ \text{塔}`, three rows kept | the array structure is TeX outside `\text{}` and stays byte for byte; Chinese breaks the word 分馏塔 over the three rows |
| ch18/18.2/section.json | e9 prompt "a type of metal (an alloy …)" | written 某种金属（…的合金） | translated as printed (the source's "type metal" is not corrected) |
| ch18/18.2/section.json | e6 solution "much as the oxycarbonate layer does on magnesium" | 碱式碳酸镁层 | "oxycarbonate" is rendered by the usual name of the passivating layer, 碱式碳酸镁, as in 18.1 (review pass); glossary rows `oxycarbonate`, `magnesium oxycarbonate` |
| ch18/18.2/figures.js | view labels `front`, `above`; pickable names and `v.label`s | 正视, 俯视 and Chinese names; "a sodium ion, Na⁺" etc. written 钠离子 Na⁺ (the English article and "a … of" frames collapse) | English `a`/`an` have no Chinese form (4.1) |
| ch18/18.2/figures.js | select label `molten NaCl` / `aqueous NaCl` and the matching `lab` text | 熔融 NaCl / NaCl 水溶液 | Chinese word order |
| ch18/18.2/text.html | `<span data-concept="colligative-properties">colligative effect</span>` | written （一种依数性效应）, span on 依数性 | the source says "colligative effect"; 依数性 is the standard short form of the ch11 row 依数性质, and 依数性质效应 would read as two nouns |
| ch18/18.2/text.html | `<span data-concept="electric-current">direct current</span>` | span wraps 直流电 | Chinese names direct current in one word; 电流 alone would lose "direct" |

### ch18/18.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.3/text.html | `room temperature` (boron paragraph), `high temperatures` (silicon tetrachloride, zone refining, silicon with halogens): spans on 室温 and 高温 (3 spans) | the `temperature` span wraps the whole compound 室温 or 高温, whose concept word is 温度; other `temperature` spans wrap 温度 | the source wraps one English word of "room temperature", "high temperatures"; Chinese names each in one word (as in ch01) |
| ch18/18.3/text.html | zone refining, "a heat source" (2 spans) | the `heat-flow` span wraps 热源, the compound that contains 热 | Chinese says 热源 for "heat source"; the glossary 热量 would not fit (4.5, as 加热 in 1.2) |
| ch18/18.3/text.html | "hydrogen gas" (silicon + hydroxide) | the `gas` span wraps 氢气 | 氢气 is one word; the span cannot wrap only 气 |
| ch18/18.3/text.html | `liquid silicon`, `Solid carbon dioxide`, `solid B(OH)3` | the `liquid` and `solid` spans wrap 液态 and 固态 (the state used as an adjective); the noun spans stay 液体 and 固体 | Chinese says 液态硅, 固态二氧化碳 (as in ch01 1.2) |
| ch18/18.3/text.html | boric acid, hydrochloric acid, hydrofluoric acid, fluoroboric acid, metaboric acid, tetraboric acid, orthosilicic acid; "nitric or sulfuric acid"; boric oxide, magnesium oxide (`acid` and `oxide` spans) | each span wraps the whole Chinese compound name (硼酸, 盐酸, 氢氟酸, 氟硼酸, 偏硼酸, 四硼酸, 原硅酸, 硝酸或硫酸, 氧化硼, 氧化镁); `concentrated` wraps 浓 and the `acid` span wraps 硝酸或硫酸 | Chinese names the compound in one word; the span cannot wrap only "acid" or "oxide" (as in ch01) |
| ch18/18.3/text.html | "reacts rapidly with hydroxide groups" (`hydroxide` span) | the span wraps 羟基 | the group is 羟基 in Chinese; 氢氧化物 names the compound class |
| ch18/18.3/text.html | "Silicon dioxide, silica, occurs in …" | written 二氧化硅（又称硅石）; "also called silica" (glass) written 也称为二氧化硅; "glassy silica" 玻璃态二氧化硅; "silica glass" 石英玻璃 | an appositive synonym; the glossary row silica is 二氧化硅 and 硅石 is its alias in Chinese; 石英玻璃 is the glossary row for silica glass |
| ch18/18.3/text.html | "The name silicon is derived from the Latin word for flint, silex." | written silicon（硅）这一名称源自拉丁语中表示燧石的词 silex, the English name kept in Latin letters | a sentence about the origin of an English word (4.3) |
| ch18/18.3/text.html | Searles Lake, CorningWare, Pyrex, Kimax, Wikimedia Commons | kept in Latin letters (加利福尼亚州的 Searles 湖) | a name or brand without a standard Chinese rendering (2.7) |
| ch18/18.3/text.html | "silicon is<em>sp</em><sup>3</sup><em>d</em><sup>2</sup> hybridized" | written 硅以 … 杂化 with a space between the Chinese and the Latin | the source's missing space is an English typesetting error (listed in section.json notes); the space between CJK and Latin is the book's rule |
| ch18/18.3/text.html | "colorless gasses", "due the formation", "The volatility of dry ice reflect" | translated for their meaning (无色气体, 是由于形成了…, 干冰的挥发性反映了…) | English spelling and grammar errors have no Chinese counterpart |
| ch18/18.3/text.html | the antimony paragraph printed twice | both printed, the second without "Sb₂S₅" (硫化锑(V)) | as in the source |
| ch18/18.3/text.html | "the boron hydrides" | written 硼氢化物 | as the book words it; 硼烷 is the usual name, see `glossary.zh-CN.json` |
| ch18/18.3/text.html | "the structures of arsenic and antimony are similar to … graphite" | 起伏的 for "puckered" | no standard term (`glossary.zh-CN.json`) |
| ch18/18.3/text.html | "Silicon … tetrahedron … regular tetrahedron" | 正四面体 / 四面体, the `tetrahedral-geometry` span wrapping 四面体 in "regular tetrahedron" and 四面体形 elsewhere | glossary: tetrahedron 四面体, tetrahedral 四面体形 |
| ch18/18.3/text.html | Figure 18.17 alt "B subscript 2 O subscript 4 superscript 2 negative sign unit" | B 下标 2 O 下标 4 上标 2 负号 单元 | a spoken description of a formula, translated word by word |
| ch18/18.3/section.json | notes | the three English-language typos named in the source note are no longer "kept as printed"; the note says they could not be kept and how they were translated | same reason as the text.html rows above |
| ch18/18.3/section.json | e41 `answer.parts[].part` | `(a) ΔH°` … kept in English labels | the part label is kept (translate.md 5) |
| ch18/18.3/section.json | e31 solution `1s²2s²2p⁶3s²3p²3d⁰.` | unchanged | pure notation |
| ch18/18.3/figures.js | INFO names `a boron atom, B`, `an arsenic atom, As`, … and NM `a carbon atom, C` … | articles dropped, written 硼原子，B, 砷原子，As … | English article grammar collapses to one Chinese form (4.1) |
| ch18/18.3/figures.js | `view3d` views `side`, `top`, `along an axis`, `along a diagonal` | 侧视, 俯视, 沿轴向, 沿对角线 | button labels, translated |
| ch18/18.3/figures.js | sim-zone-refining readouts `impure end cut off: N of N impurity atoms removed, 0 left …` and `zone at P% of the rod: m of N impurity atoms in the melt, …` | `不纯端已切掉: 已除去 N 个杂质原子(共 N 个), 纯硅中剩余 0 个` and `熔融区位于棒的 P% 处: 熔体中有 m 个杂质原子(共 N 个), 纯硅中剩余 0 个`; the slots keep their order, the Chinese measure word 个 follows each number | the English "m of N" cannot carry both slots in the same order in Chinese; ASCII comma, colon and parentheses inside `\text{}` (4.1, math punctuation) |
| ch18/18.3/figures.js | sim-co2-sio2 readouts `2 O per C`, `2 O per Si` | `每个 C 对应 2 个 O`, `每个 Si 对应 2 个 O` | English "per" phrase |
| ch18/18.3/text.html | `<span data-concept="chemical-reduction">Reduction</span>` / `reduction` (2 spans) | span wraps 还原 | the source word is the bare "reduction"; 化学还原 would add 化学 |
| ch18/18.3/text.html | `amorphous`, `crystalline` as adjectives (spans `amorphous-solid`, `crystalline-solid`, 7 spans) | spans wrap 无定形 and 晶态 and the noun follows (无定形的 / 晶态) | Chinese puts the adjective before the noun and drops 的; the span cannot carry the full term 无定形固体 / 晶态固体 of the glossary |

### ch18/18.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.4/text.html | spans on 天然气 (`gas`, carbon black sentence), 室温 (`temperature`, 3 spans), 常压 (`gas-pressure`), 一氧化二氮 and 一氧化氮 (`oxide`) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 气体, 温度, 压强, 氧化物 | the source wraps one English word of "natural gas", "room temperature", "pressure" (in "room temperature and pressure") and "nitrous oxide", "nitric oxide"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent) |
| ch18/18.4/text.html | white phosphorus paragraph, "insoluble" and "very soluble" (spans `insoluble`, `soluble`) | the spans wrap 不溶 and 溶 of 极易溶于; the glossary terms are 不溶的 and 可溶的 | Chinese says 不溶于水 and 极易溶于二硫化碳; the adjective form of the term cannot carry the sentence |
| ch18/18.4/text.html | sulfur paragraph, "The allotropy of sulfur" (span `allotropes`) | written 硫的同素异形体种类之多、情况之复杂, span on 同素异形体 | Chinese has no noun for "allotropy" in the glossary; the span stays in its block |
| ch18/18.4/text.html | first-member and structures paragraphs, "NF<sub>3,</sub>" and "H<sub>2,</sub>" and "H<sub>2</sub>S<sub>,</sub>" | the commas set as subscripts kept as printed, with no full-width comma written after them | the source's typesetting slip (section notes) is kept; the printed comma already ends the clause |
| ch18/18.4/text.html | sulfur paragraph, "the electron required necessary" | written 所需必要的电子, the doubled adjective kept | the source's slip is kept, not corrected (section notes) |
| ch18/18.4/text.html | phosphorus paragraph, "The name <em>phosphorus</em> comes from the Greek words meaning <em>light bringing.</em>" | written 磷这个名称（<em>phosphorus</em>）来自希腊语，意为<em>带来光者。</em>; the English name kept in parentheses | a sentence about the origin of an English word (translate.md 4.3) |
| ch18/18.4/text.html | "ionic" in "many different ionic and covalent compounds" (span `ionic-compounds`) | span wraps 离子化合物 | the source wraps the adjective alone; Chinese needs the noun 离子化合物 for the glossary term |
| ch18/18.4/text.html | graphene paragraph, "conductor of heat and electricity" (span `heat-flow`) | written 热量和电的高效导体, span on 热量 | Chinese 热量 is the glossary word for heat; the span stays in its block |
| ch18/18.4/section.json exercise_notes | the key to fs-idm146332464 writes “an σ bond” as printed | written “an σ bond”（译文中英文冠词归并为“一个 σ 键”）; the exercise solution says 一个 σ 键 | English article grammar collapses to one Chinese form (translate.md 4.1) |
| ch18/18.4/section.json notes | “the electron required necessary” | given as “所需必要的电子”（原文为“the electron required necessary”） | names the English slip the text keeps |
| ch18/18.4/figures.js | `oxidation state` axis label, `COLS[].name` and the hover templates | the names of the elements written in Chinese, the template `${c.name}: ${st(s)}, one of its states from … to …` rewritten `${c.name}：${st(s)}，是其从 … 到 … 的氧化态之一`, same slots | English word order of the hover sentence cannot carry the slots (4.1) |
| ch18/18.4/figures.js | view buttons `face on`, `edge on`, `front`, `above` | written 正视, 侧视, 正视, 俯视 | the short labels of the 3D view buttons used by other chapters (正视, 俯视) |
| ch18/18.4/figures.js | `sim-sulfur` headlines `At ${T} °C …` (4 templates) | rewritten `在 ${T} °C 时，…` with the same slot | English sentence frame (4.1) |
| ch18/18.4/text.html | Andre Geim, Kostya Novoselov (University of Manchester), Buckminster Fuller, Richard Smalley | 写作 安德烈·海姆（Andre Geim）, 康斯坦丁·诺沃肖洛夫（Kostya Novoselov）, 巴克敏斯特·富勒（Buckminster Fuller）, 理查德·斯莫利（Richard Smalley）; the Latin spelling in parentheses at the mention | person names with a standard transliteration, the original added once at the mention as in ch07 (translate.md 2.7); the rows of Geim and Fuller are in the ch10 and ch7 without the parentheses |
| ch18/18.4/text.html | `<em>sp</em><sup>2</sup> hybridized` etc. (spans `sp2-hybrid-orbital`, `sp3-hybrid-orbital`) | span wraps sp² 杂化 (and sp² 杂化轨道 where the source has "orbitals"), the figures kept as in the source | the source says "hybridized" and "hybrid orbitals"; the Chinese verb phrase is 杂化, shorter than the glossary 杂化轨道 |

### ch18/18.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.5/text.html | `gas` spans on 天然气 (2), 氢气 (3), 火山气体 (气体), `temperature` spans on 室温, 低温, 高温 | the span wraps the whole Chinese compound that contains the concept's word (氢气, 室温, 低温, 高温); in 火山气体 only 气体 | the source wraps one English word of "natural gas", "hydrogen gas", "room temperature", "low temperature", "high temperatures"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent) |
| ch18/18.5/text.html | hydrogen paragraph, preparation, reactions: `liquid` spans on "liquid hydrogen" (2), "Liquid hydrogen" | span wraps 液态 and the substance follows (液态氢); 液氨 for "liquid ammonia" is wrapped whole | Chinese says 液态氢 where the state of matter is meant (as in 1.2 and 1.3), 液氨 is the glossary row |
| ch18/18.5/text.html | reactions, "the high heat of combustion of hydrogen" (span `heat-flow`) | span wraps 燃烧热 | Chinese names the heat of combustion in one word (燃烧热), so the span cannot wrap only "heat" |
| ch18/18.5/text.html | HCl paragraph, "Heat easily decomposes phosphine" (span `heat-flow`) | span wraps the verb 加热 and not 热量 | Chinese says 加热 where English says "Heat decomposes" (Chapter 1 precedent, 1.2 "broken down by heat") |
| ch18/18.5/text.html | "a chloride salt" (span `salt`) | written 氯化物盐, span on 盐 | the source wraps "salt" of a "chloride salt"; Chinese has no shorter standard compound with the same span |
| ch18/18.5/text.html | "an acid such as phosphoric acid", "hydrochloric acid", "nitric acid", "sulfuric acid", "hydrofluoric acid", "hydrohalic acids", "hydrosulfuric acid", "hydrobromic acid", "hydroiodic acid", "sodium hydroxide", "nitrate ion" (spans `acid`, `hydroxide`, `nitrate`) | the span wraps the whole Chinese compound name (盐酸, 硝酸, 硫酸, 氢氟酸, 氢卤酸, 氢硫酸, 氢溴酸, 氢碘酸, 磷酸, 氢氧化钠); for the nitrate ion 硝酸根 + 离子 | Chinese names the acid or compound in one word; the span cannot wrap only "acid" (translate.md 3; Chapter 1 precedent for compound names) |
| ch18/18.5/text.html | "Metals with lower reduction potentials" (span `standard-electrode-potential`) | span wraps 还原电势 | the concept's glossary words are 标准电极电势 and 标准还原电势, the source says only "reduction potentials"; 还原电势 is the same stem (ch18.1 pending row) |
| ch18/18.5/text.html | #compounds, ammonia, "amides (salts of NH₂⁻), imides (salts of NH²⁻), or nitrides (salts of N³⁻)" | the first item is written with half-width parentheses and a colon, `氨基化物(盐：NH₂⁻),`, the others with full-width parentheses and 的盐 | the source's math run `${\text{NH}}_{2}{}^{\text{−}}),$` contains its own closing parenthesis and comma, which are kept byte for byte, so the opening parenthesis must be ASCII and the formula must follow 盐 (translate.md 5, LaTeX outside \text kept) |
| ch18/18.5/text.html | #compounds, "nitrite ion, NO₂⁻, to yield" | `${\text{NO}}_{2}{}^{\text{−}},$` kept with its comma, followed by a space | the comma is inside the source's math run |
| ch18/18.5/text.html | #compounds, phosphine, "Heat easily decomposes phosphine $(…),$" | the math run with its parentheses and comma kept; Chinese continues after a space | parentheses and comma are inside the source's math run |
| ch18/18.5/text.html, ch18/18.5/section.json notes | #preparation "Water gas is as an industrial fuel"; #compounds "Inorganic derivations include"; #compounds "In which case, the sulfide may oxidize" | written 水煤气是作为工业燃料, 无机衍生物包括, 在这种情况下，硫化物可能氧化为 | the source's slips (a stray "as", "derivations" for derivatives, a sentence fragment) have no Chinese counterpart; the meaning and the sentence shape are kept and the section note says so |
| ch18/18.5/text.html | #hydrogen, "(or “D”)", "(or “T”)" and the names protium, deuterium, tritium | 氕, 氘, 氚 with the symbols in Latin letters | the English names have standard Chinese single-character names; the symbols are kept |
| ch18/18.5/text.html | #reactions, "Table 18.1" first row `\text{MH or MH}`, `\text{MOH or M}` | `\text{MH 或 MH}`, `\text{MOH 或 M}`; `\text{(no reaction)}` as `\text{(无反应)}`; `\text{electrical energy}` as `\text{电能}`; `\text{catalyst}` as `\text{催化剂}`; `\text{water gas}` as `\text{水煤气}` | words inside `\text{}` are translated (translate.md 5), ASCII parentheses kept inside math |
| ch18/18.5/text.html | #compounds, ammonia, "at STP" | written 在 STP 下 | the acronym STP is kept as printed; the book spells it out in a different chapter |
| ch18/18.5/text.html | #reactions, "per mole of water formed" (span `mole`) | written 每生成一摩尔水, span on 摩尔 | the unit word "mole" in prose takes the target name 摩尔 (translate.md 4.4), as 1.3 writes 一加仑 |
| ch18/18.5/text.html | #reactions, Figure 18.28 caption, "Before the fleet’s retirement in 2011" | 2011 年航天飞机机队退役之前 | word order |
| ch18/18.5/text.html, ch18/18.5/section.json | `alt` of fig-iron-hcl: “H C l ( a q )” | kept as printed | the alt spells the label letter by letter for a screen reader |
| ch18/18.5/figures.js | GAS `name` strings, the pickable names (`the bench`, `the battery`, `water held up in the tube`, `the test tube collecting hydrogen/oxygen`), the legend names | articles dropped (`a hydrogen molecule, H₂, rising from the cathode` written 从阴极升起的氢分子 H₂; `the battery` 电池) | English articles have no Chinese form (4.1); the genitive/participial phrase is put before the noun |
| ch18/18.5/figures.js | `tag('cathode (−)', …)`, `tag('anode (+)', …)`, `v.headline('… (−) … (+)')` | the parentheses written full-width, 阴极（−）, 阳极（+）, the signs kept | label and headline are prose, the signs are as printed |
| ch18/18.5/text.html | `<span data-concept="nitrate">nitrate</span> ion` | span wraps 硝酸根, 离子 follows in the `ion` span | Chinese names the ion 硝酸根离子, not 硝酸盐离子 |
| ch18/18.5/text.html | `<span data-concept="bronsted-lowry-base">Brønsted base</span>` (2 places) | written 布朗斯特–劳里碱 with the glossary dash | the merge swept 布朗斯特碱 to the glossary target |

### ch18/18.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.6/text.html | `carbonate` spans on 碳酸钠, 碳酸钙, 碳酸镁 and 碳酸氢钙 (`hydrogen-carbonate`) | the span wraps the whole Chinese compound name | the source wraps the word "carbonate" of "sodium carbonate", "calcium carbonate", "magnesium carbonate", "calcium hydrogen carbonate"; Chinese names each in one word (translate.md 3.3, Chapter 1 precedent) |
| ch18/18.6/text.html | `carbonate`, `hydrogen-carbonate`, `hydroxide`, `oxide` spans on 碳酸根, 碳酸氢根, 氢氧根, 氧 followed by an `ion` / `anion` span on 离子 / 阴离子 | the span wraps the stem that Chinese uses for the ion (碳酸根离子, 碳酸氢根阴离子, 氢氧根离子, 氧离子) | the source wraps "carbonate", "hydroxide", "oxide" (the glossary rows carbonate ion, hydroxide ion, oxide ion); Chinese names the ion by the -根 stem, not by 碳酸盐 / 氢氧化物 / 氧化物 |
| ch18/18.6/text.html | `hydrogen carbonate <span salt>salts</span>` (caves) | written 碳酸氢盐 with `hydrogen-carbonate` on 碳酸氢 and `salt` on 盐 | 盐 is the last character of 碳酸氢盐; both spans stay in the block |
| ch18/18.6/text.html | `hydrochloric <span acid>acid</span>`, `stomach <span acid>acid</span>` | the span wraps 盐酸 and 胃酸 whole | glossary words 盐酸, 胃酸 are single words containing the concept's word |
| ch18/18.6/text.html | `<span hydrogen-carbonate>hydrogen carbonate</span> ... also known as the <strong>bicarbonate anion</strong>` | the strong wraps 碳酸氢根（bicarbonate anion） | glossary gives 碳酸氢根 for both "bicarbonate anion" and (in 碳酸氢根阴离子) "hydrogen carbonate anion", so Chinese has no second name; the English synonym is kept in parentheses (translate.md 4.2) |
| ch18/18.6/text.html | `Baking soda (bicarbonate of soda or sodium bicarbonate) is sodium hydrogen carbonate` | 小苏打（bicarbonate of soda 或碳酸氢钠）是碳酸氢钠 | the synonyms "bicarbonate of soda" and "sodium bicarbonate" both go to glossary 小苏打 / 碳酸氢钠, so the English phrase is kept in parentheses (translate.md 4.2) |
| ch18/18.6/text.html | "(cream of tartar)" | （塔塔粉） | idiom/trade name with a Chinese equivalent (translate.md 4.4) |
| ch18/18.6/text.html | `<span group>groups</span> 1 and 2` and `<span group>groups</span>` / `<span group>group</span>` | written 第 1、2 族, 第 12 族, 第 1 族; the span wraps 族 | Chinese puts the number before 族 and writes one 族 for two groups |
| ch18/18.6/text.html | `<span soluble>soluble</span>` in "are not soluble" | 不<span>可溶</span> and 可溶的 in other places | glossary soluble is 可溶的 (adjective); the negation 不 stays outside the span |
| ch18/18.6/text.html | the formulas ${\text{CO}}_{3}{}^{2−}.$ and ${\text{HCO}}_{3}{}^{\text{−}}\text{,}$ at the end of the first paragraph | the math is kept byte for byte, with its trailing ASCII "." and "," inside the formula; the Chinese sentence continues with 的化合物 after it | LaTeX outside `\text{}` is not translated (translate.md 5); the sentence order changes because Chinese puts the relative clause before 化合物 |
| ch18/18.6/text.html | "Al<sup>3+</sup> or Sn<sup>4+</sup>", "lead(II)", "Tin(II)" | kept as printed; 铅(II), 锡(II) | numbers and charges as printed; precedent 氟化锡(II) |
| ch18/18.6/text.html, ch18/18.6/section.json | "The carbonates of the alkaline earth metals of group 12 and lead(II) are not soluble" and "behave differently" | translated as printed (第 12 族的碱土金属和铅(II)的碳酸盐不可溶) | the book's own wording is kept (translate.md 3.2); section.json notes records it |

### ch18/18.7

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.7/text.html | spans on 室温 (`temperature`, 4 spans), 氮气 and 氧气 (`gas`, 3 spans), 笑气 (`gas`) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 温度, 气体 | the source wraps one English word of "room temperature", "nitrogen gas", "oxygen gas", "laughing gas"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent) |
| ch18/18.7/text.html | occurrence, "fractional distillation" (span `distillation`) | the span wraps 分馏 (glossary row fractional distillation) | Chinese names fractional distillation in one word; 蒸馏 alone would drop 分 |
| ch18/18.7/text.html | spans on 沸腾 (`boiling-point`) and 凝固 (`melting-point`), "It boils at 77 K and freezes at 63 K" | the two verbs are translated as verbs, and the spans wrap them | the source puts the concept spans on the verbs "boils" and "freezes" |
| ch18/18.7/text.html | spans on 液态 / 固态 (`liquid`, `solid`) in "liquid air", "Liquid nitrogen", "Liquid and solid NO", "the liquid and solid states" | the spans wrap 液态 / 固态 where the glossary has 液体 / 固体; 液体 / 固体 stay for "a blue liquid" and "a white solid" | Chinese says 液态空气, 液态氮, 固态 NO for the state of matter (Chapter 1 precedent) |
| ch18/18.7/text.html | nitrous oxide, nitric oxide, "dinitrogen oxide" (`oxide` spans) | the span wraps the whole compound name (一氧化二氮, 一氧化氮, 氧化亚氮); "nitrous oxide (dinitrogen oxide)" is written 一氧化二氮（氧化亚氮） | Chinese names the compound in one word, so the span cannot wrap only "oxide" (Chapter 1 precedent); the two English names of N₂O become the systematic and the traditional Chinese name |
| ch18/18.7/text.html | nitric acid, nitrous acid, ammonium nitrate, "nitrate ion", "ammonium ion" (`acid`, `nitrate`, `ion` spans) | the span wraps 硝酸, 亚硝酸, 硝酸铵; 硝酸根 and 铵根 carry the `nitrate` span and 离子 the `ion` span | the compound or ion name is one Chinese word (Chapter 1 precedent) |
| ch18/18.7/text.html | "nitrogen(III) oxide", "oxides of nitrogen(III), nitrogen(IV), and nitrogen(V)", "phosphorus(V) oxide" | written 氮(III)氧化物, 氮(III)、氮(IV)和氮(V)的氧化物, 氧化磷(V); `oxide` span on 氧化物 for nitrogen, on the whole 氧化磷(V) for phosphorus | stock-number names; for nitrogen the span keeps its place on the word for oxide (氧化氮 is the common name of NO, ch02, so 氧化氮(III) would mislead); for phosphorus the name is one word as in 18.8 (the merge swept 磷(V)氧化物 to 氧化磷(V)) |
| ch18/18.7/text.html | "more than 20 million tons ... every square mile" (span `mass`) | written 超过 2000 万短吨 and 每平方英里 | Chinese counts in 万; ton is the US short ton and mile has no SI symbol here (Chapter 1: 短吨, 英里, 4.4) |
| ch18/18.7/text.html | "At low pressures or at high temperatures", "At low temperatures" | written 在压强低或温度高时, 在温度低时; spans on 压强 and 温度 | Chinese puts the adjective after the noun, and the `gas-pressure` and `temperature` spans stay on the nouns |
| ch18/18.7/text.html | "supports combustion" (span `combustion-reaction`) | written 支持燃烧, the span on 燃烧 | the glossary word is 燃烧; English "supports combustion" has no shorter Chinese form |
| ch18/18.7/text.html | "molecular (left) and resonance (right) structures" (Figures 18.33 and 18.35) | written 分子结构（左）和共振结构（右）, span on 共振 | the span wraps the word "resonance" only, as in the source |
| ch18/18.7/text.html | Figure 18.38 caption, `N<sub>2</sub>O<sub>5.</sub>` | the stray full stop inside the subscript is kept, and the sentence is ordered to end on the formula (…，该分子为 N₂O₅.) with no 。 added | the source prints the full stop inside the subscript (section notes); kept as printed |
| ch18/18.7/text.html | `\text{oxidizing agent:}`, `\text{reducing agent:}` | `\text{氧化剂:}`, `\text{还原剂:}` | words inside `\text{}` are translated; the colon stays ASCII inside math (translate.md 3.5) |
| ch18/18.7/text.html | headings "Occurrence and properties of nitrogen", "Reactions of the nitrogen oxides" | 氮的存在与性质, 氮的氧化物的反应 | the two headings match no concept name; built from the glossary words, the others are the concept names 氮的氧化物 and 二氧化氮与四氧化二氮 |
| ch18/18.7/text.html | "Atmospheric nitrogen consists of N2 molecules ... due to the strong nitrogen-nitrogen triple bond" | 氮氮三键 | the hyphenated compound modifier has no Chinese form (4.1) |
| ch18/18.7/text.html | sim-head "N₂O₄ units" | written N₂O₄ 单元 | "units" here is the formula unit counted in mol |
| ch18/18.7/figures.js | `views` labels `front`, `above` | 前视, 俯视 | view-button names; shortest forms |
| ch18/18.7/figures.js | `topline` sentence | `在 ${s.t} K 时，${share}% 的分子是棕色的 NO_{2}，${100 - share}% 是无色的 N_{2}O_{4}。` | English "X% of the molecules are A and Y% B" reordered with the same two slots; `NO_{2}` keeps its macro run |
| ch18/18.7/figures.js | `MOLS[].name`, `pickable` names (sealed vessel, piston, piston rod) | 四氧化二氮，N₂O₄ / 二氧化氮，NO₂ (the same labels as the referents), 密闭容器中的气体, 活塞, 活塞杆 | hover names; the leading article "the" has no Chinese form (4.1) |
| ch18/18.7/section.json | exercises e63 prompt, "the chapters on chemical bonding and advanced theories of covalent bonding" | 化学键与分子几何构型以及共价键的高级理论这两章 | the two chapter titles in the book's Chinese titles; the second (ch08, 共价键的高级理论) is a row of ch8 |
| ch18/18.7/section.json | exercise e63 (c) solution alt text | "negative sign" kept although the ion is NO₂⁺ | the alt text describes NO₂⁺ with a negative sign in the source; the book's slip is kept |
| ch18/18.7/text.html | `<span data-concept="redox-reaction">oxidation-reduction</span> behavior` | span wraps 氧化还原 (the noun reaction is not in the source phrase) | the source phrase has no "reaction"; 氧化还原反应 would add a word |
| ch18/18.7/text.html | `<span data-concept="free-radical">molecule with an unpaired electron</span>` | span wraps 含有未成对电子的分子 | the source describes the radical in words; the glossary word 自由基 is not in the sentence |

### ch18/18.8

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.8/text.html | #oxides: `phosphorus(III) <span data-concept="oxide">oxide</span>`, `phosphorus(V) <span ...>oxide</span>` (6 spans) | each span wraps the whole compound name 氧化磷(III) / 氧化磷(V), not 氧化物 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as 氧化汞(II) in ch01) |
| ch18/18.8/text.html | `phosphorous <span data-concept="acid">acid</span>`, `phosphoric acid`, `orthophosphoric acid` (5 spans) | span wraps 亚磷酸, 磷酸, 正磷酸 | Chinese names the acid in one word (as 硫酸 in ch01) |
| ch18/18.8/text.html | `<span data-concept="halide">halide</span> <span data-concept="ion">ions</span>` | written 卤 + 离子 (卤离子, the row `halide ion`), the halide span on 卤 and the ion span on 离子 side by side, as in 18.11 | review pass; the Chinese ion name is 卤离子 and the concept span cannot wrap the whole of it |
| ch18/18.8/text.html | `<span data-concept="solid">solid</span> phosphorus pentachloride` | span wraps 固态 (state adjective) | Chinese says 固态五氯化磷 (as in ch01 1.2) |
| ch18/18.8/text.html | `<span data-concept="standard-enthalpy-of-formation">enthalpy of formation</span>` | span wraps 生成焓 | the source phrase has no "standard"; 标准生成焓 would add a word |
| ch18/18.8/text.html | `<span data-concept="x-ray-crystallography">X-ray studies</span>` | span wraps X 射线研究 | Chinese word order and the concept name X 射线晶体学 is longer than the phrase |
| ch18/18.8/text.html, ch18/18.8/section.json | "tons" (exercise 73 prompt, hint, solution) | written 短吨（美吨）, number kept | the book's US short ton; plain 吨 is the metric tonne (as ch01 1.6, translate.md 4.4) |
| ch18/18.8/text.html, ch18/18.8/section.json | "strike-anywhere matches" | written 擦燃火柴 | idiom/product term with no single standard Chinese equivalent (translate.md 4.4) |
| ch18/18.8/section.json | exercise 71 prompt "dissolving 2.00 g of PCl3 is an excess of water" | written 将 2.00 g PCl3 溶于过量水中; the printed typo "is" for "in" cannot be carried into Chinese; `notes` keeps the English quotation of the typo | an English slip of one word has no Chinese counterpart (translate.md 4.3) |
| ch18/18.8/figures.js | `NAMES` hover names | `phosphorus (P)` etc. written 磷 (P) etc.; atom-symbol labels kept | the symbol in parentheses is the book's pattern |
| ch18/18.8/figures.js | state `head` sentences ("In P₄S₃ a sulfur atom sits in three of the six edges…", "a trigonal pyramid: three chlorine atoms below…") | recast in Chinese word order, same content and slots; "a/an" and plurals collapse | English article and plural grammar (translate.md 4.1) |

### ch18/18.9

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.9/text.html, ch18/18.9/section.json | compound-name spans: `<span data-concept="oxide">oxide</span>` in mercury(II) oxide, magnesium/calcium/aluminum/zinc/thallium(I) oxide, dichlorine oxide, nitric oxide; `hydroxide` in calcium/magnesium/sodium hydroxide; `peroxide` in hydrogen/sodium peroxide; `acid` in nitric/nitrous/phosphoric/phosphorous/sulfuric/sulfurous/hydrochloric/chlorous/hypofluorous acid; `sulfate` in calcium/barium sulfate | each span wraps the whole Chinese compound name (氧化汞, 氧化镁, 氢氧化钙, 过氧化氢, 硝酸, 硫酸钙 ...); the stock numeral stays outside the span: 氧化汞(II) | Chinese names the compound in one word; the span cannot wrap only "oxide" or "acid" (as 氧化汞(II) in ch01) |
| ch18/18.9/text.html | `oxide <span ion>ions</span>`, `peroxide ions`, `superoxide ions`, `hydroxide ions` (also chloride/sodium ions plain) | written 氧 + 离子, 过氧根 + 离子, 超氧根 + 离子, 氢氧根 + 离子, with the concept span on 氧 / 过氧根 / 超氧根 / 氢氧根 and a second span on 离子, side by side | the Chinese ion names are 氧离子, 过氧根离子 ...; the span of the radical cannot wrap 氧化物 (as 卤化物 + 离子 in 18.8) |
| ch18/18.9/text.html | `nitrate <span salt>salts</span>`, `sulfite salts`, `hydrogen sulfite salts`, `nitrate salt`, `Epsom salts` | the two spans sit side by side on the two morphemes: 硝酸 + 盐, 亚硫酸 + 盐, 亚硫酸氢 + 盐 (nitrate/sulfite span on the first part, salt span on 盐); 泻 + 盐 | Chinese names the salt in one word (硝酸盐, 亚硫酸盐); both spans of the source are kept, so they cannot both wrap the word |
| ch18/18.9/text.html | `room <span temperature>temperature</span>`, `elevated temperatures`, `high temperatures`, `slightly soluble`, `hydrogen gas` | the span wraps the whole Chinese word 室温, 高温, 微溶, 易溶, 氢气, 氟气 and not only the concept's morpheme | the Chinese compound has no separate word for "temperature" or "gas" (as 室温 in ch01); 可溶 / 易溶 / 微溶 carry the degree word |
| ch18/18.9/text.html | `<span energy-and-work>energy</span> of light`, `<span nitrate>nitrates</span>` etc. | 光的能量 with the span on 能量 | word order only |
| ch18/18.9/text.html | `the <span concentrated>concentrated</span> sulfuric acid`, `<span dilute>dilute</span> acid`, `<span strong-acid>strong acid</span>` | span wraps 浓 / 稀 (the glossary 浓的 / 稀的 as a modifier) and 强酸 / 弱酸 as the book's concept words | Chinese attributive adjective drops 的 before a noun |
| ch18/18.9/text.html | `<span exothermic-and-endothermic>endothermic</span>`, `exothermic` | span wraps 吸热 / 放热 inside 吸热反应 / 放热的 | the glossary has 吸热的 / 放热的; the noun phrase takes the bare stem |
| ch18/18.9/text.html | `<span oxidation-number>oxidation state</span>` and `oxidation state of 2−` | written 氧化态 (glossary row oxidation state); the sentence about "the 2+-oxidation state" is 氧的氧化态为 2+ | the hyphenated English modifier has no Chinese counterpart |
| ch18/18.9/text.html | the photosynthesis equation, array rows `carbon` / `dioxide` | the two-row label becomes 二氧化碳 in the first row, the second row is left empty (`& & & &`) | Chinese names carbon dioxide in one word, the second row of the English label has no text |
| ch18/18.9/text.html | `\text{(2 mol K per mol O₂)}` and `\text{(1 mol K per mol O₂)}` | written `(\text{每 mol } O₂ \text{ 对应 } 2 \text{ mol K})` | the English "per" phrase needs the Chinese word order 每…对应…; unit symbols kept |
| ch18/18.9/text.html | "in the limelight" (calcium oxide paragraph) | `英语短语“in the limelight”（意为“备受瞩目”）就是由此而来` | the sentence is about the origin of an English idiom (translate.md 4.2/4.3), kept in English with its meaning |
| ch18/18.9/text.html | `aqua fortis (meaning "strong water")`, `aqua regia, which means royal water`, `hydrogen hypofluorite` | the Latin terms stay in `<em>`: 称之为 *aqua fortis*（意为“强水”）, *aqua regia*，意为王水; 次氟酸氢（hydrogen hypofluorite） | sentences about the names themselves (translate.md 4.3); the English kept next to the Chinese |
| ch18/18.9/text.html | Table 18.2 first column, `paraperhalic` | written 仲高卤酸 (paraperiodic = 仲高碘酸) | no standard Chinese for the generic "paraperhalic"; built from 仲高碘酸 and 高卤酸 |
| ch18/18.9/text.html | `Clorox` | kept in Latin letters | brand name (translate.md 2.7) |
| ch18/18.9/text.html | `the FDA` | written 美国食品药品监督管理局（FDA） | acronym glossed once, as in ch01 1.1 |
| ch18/18.9/text.html | "40 grams ... 60 grams", "10 to 50 kilometers", "STP" | 40 克, 60 克 in the `data-type="mass"` span; 10 到 50 千米; STP kept as 在 STP 下 | units written out in prose take the Chinese name (translate.md 4.4); STP as in other chapters |
| ch18/18.9/text.html, ch18/18.9/section.json | the typo "hydrogen phosphate ion, HPO₃²⁻" (hydrogen phosphite) and the unbalanced Na₂O equation | carried as printed (磷酸氢根离子; the Na₂O equation) and corrected only by the two footnotes | an error of the book stays and its correction stays a correction (translate.md 3.2); notes lists the English quotations of the other printed slips |
| ch18/18.9/section.json | notes | the English quotations of the printed slips ("2HCL", "peroxides ions", "Most metals oxides" ...) are kept in English inside the Chinese sentence | they are quotations of the English book's typos, which have no Chinese form |
| ch18/18.9/figures.js | `COUNT[n] + ' oxygen atom' + (n > 1 ? 's' : '')` in the readout note | the plural branch collapses; the count words 'one', 'two', 'three', 'four' become 一, 两, 三, 四 and the note reads `${COUNT[n]}个氧原子的氧化态为 2−，离子的电荷为 1−，所以氯的氧化态为 ${ox}+。` | English plural grammar (translate.md 4.1); 两 is the counting form of 2 |
| ch18/18.9/figures.js | `HEAD` sentences ("In ClO⁻, one of chlorine's four electron pairs bonds an oxygen atom and three are lone pairs.") | recast as 在 ClO⁻ 中，氯的四对电子中有一对与氧原子成键，三对是孤电子对 (same four sentences) | Chinese word order; same content and the $...$ runs |
| ch18/18.9/figures.js | `ctl` label `\text{ion}` | written `\text{离子}` although the options are anions | the shortest standard word (translate.md 4.7); the options are labelled with their formulas |
| ch18/18.9/text.html | `<span data-concept="weak-acid">weak acids</span>` in "are all very weak acids" | written 都是很弱的酸, span on 弱的酸 | the intensifier 很 sits inside the phrase; 弱酸 cannot take 很 before 弱 without the span splitting |
| ch18/18.9/text.html | `under reduced <span data-concept="gas-pressure">pressure</span>` | written 在减压下, span on 压 | Chinese compound 减压; 压强 cannot stand in it |
| ch18/18.9/text.html | `soluble`, `insoluble`, `slightly soluble` spans (可溶, 可溶性, 不溶, 不溶性, 微溶, 易溶, about 20 spans in 18.9) | the span wraps the Chinese word that carries the degree or noun form | the glossary words are the adjectives 可溶的 and 不溶的; Chinese drops 的 or adds 性 or the degree word (see "Every page") |

### ch18/18.10

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.10/text.html | `natural <span gas>gas</span>` (3 places), `volcanic <span gas>gases</span>` | the span wraps the whole 天然气 (as in ch01); 火山气体 keeps the span on 气体 | Chinese names natural gas in one word, so the span cannot wrap only "gas" |
| ch18/18.10/text.html | `room <span temperature>temperature</span>` | span wraps 室温 | the Chinese compound has no separate word for "temperature" (as in ch01) |
| ch18/18.10/text.html | `<span liquid>liquid</span> sulfur` (2), `<span solid>solid</span> sulfur` | spans wrap 液态 and 固态 (the state words of ch01, 固态/液态), not the glossary 液体/固体 | the adjective before 硫 names the state of the sample, not a body of matter (4.1) |
| ch18/18.10/text.html | `concentrated nitric <span acid>acid</span>` | span wraps 硝酸 (the whole compound), 浓 carries the concentrated span | Chinese names nitric acid in one word (as in 18.9) |
| ch18/18.10/text.html | `nitrogen(IV) <span oxide>oxide</span>` | written 氮(IV)氧化物, the span on 氧化物 | the stock-number rule of 18.7 (review pass); 二氧化氮 is the common name |
| ch18/18.10/text.html | `The <span chemistry>chemistry</span> of sulfur` | span wraps 化学行为 (硫的化学行为 is the chapter's concept name) | Chinese needs 化学行为/化学性质 for this sense of "chemistry" |
| ch18/18.10/text.html | `<span chalcogen>group 16</span>` | written 第 16 族, span on the whole phrase | one form with the concept statement of chalcogen |
| ch18/18.10/text.html | `<span gas-pressure>pressure</span>` in "(170 °C and 10 atm pressure)" | written （170 °C，10 atm 的压强），the span on 压强 after the 10 atm span | Chinese word order for the measured quantity |
| ch18/18.10/text.html | `Drag the water’s temperature below 113 °C, the melting point …, and the deposit stays solid.` | the apposition is moved before the verb: 把水的温度拖动到低于 113 °C（斜方硫的熔点），矿床就保持固态 | Chinese word order; same content and both spans in the same block |
| ch18/18.10/section.json | summary_html "has as oxidation state of 2−", e91 key "SO₂, sp² 4+" | the summary's typo has no Chinese form (氧化态为 2−); the key keeps its missing comma (SO₂，sp² 4+；SO₃，sp²，6+) ; notes quotes the English typo | an error of the book stays (translate.md 3.2) |
| ch18/18.10/section.json | e90 prompt "lower molecular mass" | 分子质量更小 | glossary row molecular mass 分子质量; the solution gives molar masses in g/mol |
| ch18/18.10/section.json | e97 solution "There are many possible answers including: … and …" | 答案有很多，包括：… 和 … | the equations stay in TeX; only the connecting words are translated |
| ch18/18.10/figures.js | KIND names `'a water molecule, H₂O'`, `'a nitrogen molecule of the air, N₂'`, `'an oxygen molecule of the air, O₂'` | articles dropped: 水分子 H₂O, 空气中的氮分子 N₂, 空气中的氧分子 O₂ | English article grammar collapses to one Chinese form (4.1) |
| ch18/18.10/figures.js | `topline` sentences, third one "Water cooler than the melting point of sulfur leaves the deposit solid, so only water and air rise." | recast 温度低于硫熔点的水使矿床保持固态，所以只有水和空气上升 | English comparative frame needs Chinese word order |
| ch18/18.10/figures.js | readout `\text{, the melting point of sulfur}` | `\text{，硫的熔点}` | full-width comma inside the translated \text |
| ch18/18.10/text.html | `<span data-concept="oxidizing-agent">oxidizes</span>` (verb) | span wraps 氧化 | the source wraps the verb; 氧化剂 is a noun |

### ch18/18.11

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.11/text.html | spans on 氟气 (`gas`, two spans: "fluorine gas" in the preparation and in the properties paragraphs) | the span wraps the whole Chinese compound 氟气; the concept word is 气体 | the source wraps one English word of "fluorine gas"; Chinese names it in one word (translate.md 3.3; Chapter 1 precedent) |
| ch18/18.11/text.html | spans on 微溶 (`soluble`, "only slightly soluble" of bromine) | the span wraps 微溶 | the concept word is 可溶的; 微溶 is the standard word for "slightly soluble" and does not contain it |
| ch18/18.11/text.html | spans on 亚硫酸氢钠 (`sulfite`, "sodium hydrogen sulfite") | the span wraps the whole compound name | the source wraps "hydrogen sulfite" inside "sodium hydrogen sulfite"; Chinese names the salt in one word |
| ch18/18.11/text.html | spans on 盐酸, 胃酸, 碘酸 and 次氯酸 (`acid`, "hydrochloric acid", "stomach acid", "iodic acid", "hypochlorous acid molecules") | the span wraps the whole compound 盐酸, 胃酸, 碘酸, 次氯酸 | the source wraps the word "acid"; in Chinese 酸 is bound in each name |
| ch18/18.11/text.html | "halide ions" / "halide ion" (`halide` + `ion`, 7 places) | written 卤 + 离子 with the two spans on 卤 and 离子 | Chinese 卤离子 is one word; the two source spans each keep a word (chapter.json already writes 卤离子) |
| ch18/18.11/text.html | "hydroxide or oxide ions" (`hydroxide`, `oxide`, `ion`) | written 氢氧根或氧离子, spans on 氢氧根, 氧 and 离子 | Chinese names the ions 氢氧根 and 氧离子, not 氢氧化物离子 / 氧化物离子 |
| ch18/18.11/text.html | "phosphorus(V) chloride" | written 五氯化磷 | Chinese names the compound by prefix (glossary 五氯化磷); the Stock numeral has no use in the name |
| ch18/18.11/text.html | "tin(II) chloride", "tin(IV) chloride" | written 氯化锡(II), 氯化锡(IV) | Stock numerals kept as printed, as ch11 writes 氯化锡(II) |
| ch18/18.11/text.html, ch18/18.11/section.json notes | the source's English slips: "makes the reaction between them to be imperceptibly slow", "The direct reaction of a metal and a halogen produce", "IF₅is" (Figure 18.63 caption and data-original-caption), "such basic anions, such as" (summary) | translated for meaning with correct Chinese; the notes list the English wording | English agreement, spacing and repetition slips cannot be carried into Chinese |
| ch18/18.11/text.html, ch18/18.11/section.json | "HlO₃" (lowercase l), "NaIO₃," (comma in the subscript), "Ca(PO₄)₃F", "tetrachloride (CCl₄)" | kept as printed: HlO<sub>3</sub>, NaIO<sub>3,</sub>, 四氯化物（CCl<sub>4</sub>） | errors of the book stay (translate.md 3.2) |
| ch18/18.11/text.html | "responsible for the solubility of iodine" | written 决定了碘在含有碘离子的水溶液中的溶解度 | "responsible for" has no one-word Chinese equivalent that keeps 溶解度 as the span; 决定了 carries the meaning |
| ch18/18.11/text.html | the sentence "...it was important in the production of photographic film and iodoform, CHI₃, is an antiseptic" | translated as two clauses, 它曾在照相胶片的生产中很重要，碘仿 CHI₃ 是一种消毒剂 | the source's run-on is kept in sense; 消毒剂 is the glossary row for antiseptic (review pass; 防腐剂 means preservative) |
| ch18/18.11/text.html | chapter references "the chapter on the stoichiometry of chemical reactions", "the chapter on chemical bonding and molecular geometry" | written “化学反应的化学计量”一章, 化学键与分子几何构型的一章 | the Chinese chapter titles of ch04 and ch07 (stoichiometry span on 化学计量) |
| ch18/18.11/text.html | equation of the photochemical decomposition, `\text{sunlight}` | written `\text{日光}` | the word in `\text{}` is translated (translate.md 5) |
| ch18/18.11/figures.js | sim-halogen-ladder, `cap(NAME[x])` in the story headlines and `ION` | the capitalising call kept (no effect on Chinese); `NAME` and `ION` hold 氟/氯/溴/碘 and 氟离子/氯离子/溴离子/碘离子, and the headlines are written 氯把溴离子氧化成溴 with `ION` already carrying 离子 | English "ion" after `ION[y]` collapses; the sentence frame is rewritten with the same slots |
| ch18/18.11/figures.js | sim-halogen-ladder, labels `${q}_{2} added`, `${q}⁻ in solution` | written 加入 Cl_{2}, 溶液中有 Cl⁻ | English word order and the article of the hover names cannot be kept |
| ch18/18.11/figures.js | sim-interhalogens, `COUNT`, `PAIRS`, the `head` template | `COUNT` holds 一/三/五/七, `PAIRS` holds 一个孤电子对 … 三个孤电子对, and the template is rewritten in Chinese word order with the same slots | English numeral words, plural and "is … about …" frame |
| ch18/18.11/figures.js | sim-interhalogens, readout `bond${B.n > 1 ? 's' : ''}` and `lone pair${lone === 1 ? '' : 's'}` | the plural branches collapse: `\text{个键}`, `\text{个孤电子对}`, `\text{个电子对}` | English plural branch in figure code (translate.md 4.1) |
| ch18/18.11/figures.js | sim-interhalogens, view buttons `side`, `down the axis` | written 侧视, 沿轴向下 | button labels are reader-visible |
| ch18/18.11/text.html | `<span data-concept="miscible">miscible</span>` | span wraps 互溶 | the glossary adjective 互溶的 loses 的 before the noun |

### ch18/18.12

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.12/text.html | spans on 天然气, 室温, 氙气, 氟气 (`gas` x4, `temperature` x2) | the span wraps the whole Chinese compound; the concept words are 气体 and 温度 | the source wraps one English word of "natural gas", "room temperature", "xenon gas", "fluorine gas"; Chinese names each in one word (translate.md 3.3; Chapter 1 and 18.11 precedent) |
| ch18/18.12/text.html | spans on 液态 (`liquid`, "liquid air", "remains liquid") and 固态 ("solid xenon trioxide") | the span wraps 液态 / 固态 | the state used as an adjective takes 态 (Chapter 1 precedent) |
| ch18/18.12/text.html | spans on 液氦 and 液氮 (`liquid`, "Liquid helium", "liquid nitrogen") | the span wraps the whole compound | Chinese names each in one word; 液 is bound in the name |
| ch18/18.12/text.html | span `distillation` on 分馏 ("fractional distillation") | the span wraps 分馏 | the glossary row fractional distillation is 分馏, which does not contain 蒸馏 |
| ch18/18.12/text.html | span `heat-flow` ("lower heat conductivity") | the span wraps 导热性, not 热量 | Chinese says 导热性 for heat conductivity; the span stays in its block |
| ch18/18.12/text.html | "noble" ("They earned the name “noble”") | written 得名“稀有”（英文 noble，意为“高贵”） | the sentence explains the English word noble, which the Chinese name 稀有气体 does not carry (translate.md 4.3) |
| ch18/18.12/text.html | "lighter-than-air craft", "rapture of the deep", "nitrogen narcosis" | 比空气轻的飞行器, “深海狂喜”, 氮麻醉 | no single Chinese word for the craft; the nickname and term translated for meaning |
| ch18/18.12/text.html | Dr. Neil Bartlett | written 尼尔·巴特利特（Neil Bartlett）博士 | a person with a standard Chinese rendering, name kept in Latin letters once (translate.md 2.7) |
| ch18/18.12/text.html | "salts of the perxenate ion, XeO₆⁴⁻," | written 高氙酸根离子 ${XeO₆⁴⁻}, 的盐; the comma inside the math stays as printed | the source's comma is inside the math; the Chinese word order puts the formula before 的盐 |
| ch18/18.12/text.html | "the xenon remains in the 6+-oxidation state", "maximum oxidation sate of 8+" | written 6+ 氧化态 and 最高氧化态 8+; the slip "sate" is not carried | an English spelling slip cannot be carried into Chinese (recorded in section.json notes) |
| ch18/18.12/text.html | "$\frac{1}{50,000}$ of a second" | written $\frac{1}{50,000}$ 秒 | the math is kept as printed; "of a" collapses to the unit 秒 (English article and preposition) |
| ch18/18.12/text.html | "6+-oxidation state", "(s)", "(aq)" in the equation | kept as printed | formulas and states are not translated |
| ch18/18.12/text.html | "Both XeF6 and XeO3 disproportionate" | 发生歧化 with the span on 歧化 | the glossary row disproportionation is 歧化; the verb takes 发生 |
| ch18/18.12/text.html, ch18/18.12/section.json | chapter references "the chapter on the advanced theories of covalent bonding", "the chapter on chemical bonding and molecular geometry" | written 共价键的高级理论一章, 化学键与分子几何构型一章 | the Chinese title of ch07 is 化学键与分子几何构型; ch08 is 共价键的高级理论 (ch8 row) |
| ch18/18.12/section.json | exercise e1 and e2 part labels | (a)–(e) written （a）–（e） | Chapter 1 convention |
| ch18/18.12/section.json | e3 prompt "at STP" | kept STP | the glossary (ch09) writes 标准温度和压强（STP）; the abbreviation is kept as printed |
| ch18/18.12/section.json | notes | the English misprint "sate" quoted and explained | the Chinese cannot carry the misspelling |

### Review pass additions

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.1/text.html, ch18/18.1/figures.js | flerovium, livermorium | written 𫓧 (fū, U+2B4E7) and 𫟷 (lì, U+2B7F7), the GB simplified forms of the 2012 element names | 鈇 and 鉝 are the traditional-character forms; the rows `flerovium`, `livermorium` changed |
| ch18/18.3/section.json | summary_html, "called metalloids or sometimes semimetals" | collapsed to 这些元素称为半金属，兼有… (准金属 dropped) | the glossary gives 半金属 for both metalloid and semimetal (collision, translate.md 4.5), as in 18.1 |
| ch18/18.3/text.html, ch18/18.5/text.html | "a very weak acid", "very, very weak acids" (span `weak-acid`) | written 很弱的酸, 极弱的酸, the span on 弱的酸 | the 18.9 precedent: the intensifier sits outside the span, 弱酸 cannot take 很 before 弱 |
| ch18/18.9/text.html | "HSO₄⁻ is a moderately strong acid", "Sulfurous acid is a moderately strong acid" (span `strong-acid`) | written 中强酸, the span on 强酸 | 中强酸 is one word; the span stays on the concept's own word |
| ch18/18.9/text.html | "Dichlorine oxide, formally called dichlorine monoxide, and chlorine dioxide" | the name in parentheses: 氧化二氯（正式名称为一氧化二氯）和二氧化氯 | the Chinese needs the parenthesis to keep the two compounds apart |
| ch18/18.7/text.html | "it reverts to a mixture of NO and NO₂" | written 又分解为 | 还原 is "reduce" in Chinese; the change is a dissociation |
| ch18/18.11/text.html | "essentially all domestic bromine" | written 美国国内几乎所有溴的生产 | the book is American; 国内 alone would mean China (translate.md 4.4) |
| ch18/18.5/text.html, ch18/18.11/text.html | "quite soluble", "very soluble" (span `soluble`) | written 易溶, 极易溶, the span on 易溶 | the degree word carries the sense, as in 18.4 and 18.9 |
| ch18/18.2/text.html, ch18/18.5/text.html, ch18/18.12/text.html | "high temperatures", "low temperature", "high pressure", "low pressure" | spans on 高温, 低温, 高压, 低压 (the whole word) | Chinese says 高温, 高压; 高温度 and 高压强 are not words (as 室温, 常压) |
| ch18/18.2/text.html | "overall cell reaction" | written 电解总反应 | the Chinese reads as one term; 电解池 and 电解槽 stay as the glossary rows (the span is the concept's own word 电解池) |
| ch18/18.5/text.html, ch18/18.8/text.html | "halide ions" | spans on 卤 and 离子 | see the 18.8 row above |
| ch18/18.7/section.json | "Brønsted base" (3 places) | written 布朗斯特–劳里碱 | one form for the chapter; the concept term of ch14 is 布朗斯特–劳里碱 and the span must contain it |

### Chapter 18: Other things for the owner

#### Terms to confirm

- `glossary.zh-CN.json` has 698 rows (492 seeded by the scaffold, 206 added by the merge); 461 carry `"confirm": "termonline"` (term taken from 化学名词 or textbook usage, not looked up at termonline.cn) and 23 carry `"confirm": "owner"` (the book's own words: 擦燃火柴, 农药, 集气罩, 碱式碳酸盐, 深海狂喜, 糖浆状磷酸, 孟加拉硝石, 展性 and others). No `termonline.py lookup` was run in this merge.
- Rows whose page agents wrote `textbook` as the authority became `cnterm-chemistry` with `confirm: termonline`, except everyday words, trade names, places and organisations, which became `book` (pearl, dough, Teflon, Dead Sea, FDA, EPA, CDC, Io, Oberlin College ...). The one earth-science term (火山气体) is `book` with `confirm: owner`.

#### Where chapter 18 and another chapter glossary disagree on purpose

| Source | Chapter 18 | Other chapter glossary | Why it stays |
|---|---|---|---|
| nitric oxide, nitrous oxide | 一氧化氮, 一氧化二氮 (systematic names, 化学名词) | ch02: 氧化氮, 氧化亚氮 (common names) | Resolved in the global merge (2026-10-27): the glossary rows are 一氧化氮 and 一氧化二氮; the traditional pair is two rows of its own that apply only to the 2.7 passage contrasting common and proper names; 18.7 writes 一氧化二氮（氧化亚氮） and 氧化亚氮 for "dinitrogen oxide" |
| bicarbonate, hydrogen carbonate | 碳酸氢盐 (the salt) | ch13: 碳酸氢根 and 碳酸 | Resolved in the global merge (2026-10-27): bicarbonate is the ion 碳酸氢根 (the book uses it for HCO₃⁻ in 13.3, 14.x, 15.x), hydrogen carbonate is 碳酸氢盐; ch13's 碳酸 for the book's "hydrogen carbonate = H₂CO₃" is a row of its own (13.3 only) |
| London forces | 伦敦色散力 (so that the span contains the concept row) | ch10: 伦敦力 | Resolved in the global merge (2026-10-27): ch10 and the two concept statements swept to 伦敦色散力 |
| colligative property | span 依数性 (18.2 "colligative effect") | ch11: 依数性质 | the ch11 row itself calls 依数性 the standard short form; scenario row in 18.2 |
| Andre Geim, Buckminster Fuller | 安德烈·海姆（Andre Geim）, 巴克敏斯特·富勒（Buckminster Fuller） at the mention | ch10 and ch07 rows without the parentheses | the original is added once at the mention as ch07 does for Smalley |
| malleable, ductile | 展性, 延性 (written 有展性 / 有延性) | the ch18 seed rows had 有延展性的 / 有延性的 | swept to ch02's rows (延展性 is the joint term); `malleable` carries `confirm: owner` as in ch02. Resolved in the global merge (2026-10-27): ch10 and ch06 (延展性) swept to 展性 as well, one target |

#### Reused from other chapter glossaries (the pages first chose differently)

The merge swept these pages to the existing target: parts per million 百万分率 (ch03; 18.1 had 百万分之), Fundamental Equilibrium Concepts 平衡的基本概念 (ch13; 18.2 had 基本平衡概念), nitride ion 氮离子 and selenide ion 硒离子 (ch02; 18.4, 18.5 had 氮化物离子, 硒化物离子), hydride ion 氢负离子 (ch14; 18.5 had 氢化物离子, the anion H⁻ of the ionic hydrides stays 氢化物阴离子), species 化学物种 (ch02; five pages had 物种; reversed in the global merge: the bare source species is 物种 everywhere, 化学物种 only for "chemical species"), silicon wafer 硅片 (the chapter glossary; the intro had 硅晶圆), lead storage battery 铅酸电池 (the shared lead-acid battery row; 18.9 had 铅蓄电池), phosphorus(V) oxide 氧化磷(V) (ch02 pattern; 18.7 had 磷(V)氧化物), Brønsted base 布朗斯特–劳里碱 (shared glossary; 18.5 had 布朗斯特碱). 68 pending sources were already rows of other chapter glossaries with the same target (the element names of ch21, product, aqueous solution, shell, subshell, organic compound, protein, polymer and so on) and were not added again.

#### Chapter titles and cross-references that wait for other chapters

18.2 writes 见平衡的基本概念一章 (ch13 title), 18.7 and 18.8 化学键与分子几何构型 (ch07) and 共价键的高级理论 (ch8), 18.11 “化学反应的化学计量” (ch04). If a chapter title changes, these sentences change with it.

#### Source slips the translation keeps, corrects or names

The rows of 18.1 (alkaline for alkaline earth), 18.2, 18.3 (three English typos named in the section note), 18.4 (commas set as subscripts), 18.5, 18.8, 18.9 (HPO₃²⁻ printed as hydrogen phosphate, corrected only by the book's own footnotes; the unbalanced Na₂O equation), 18.10 (summary typo; missing comma in the e91 key), 18.11 (HlO₃, NaIO₃, a comma in a subscript, "IF₅is") and 18.12 ("sate") say what was kept and what was translated for meaning. The English quotations of printed slips inside Chinese `notes` of 18.2, 18.3, 18.8, 18.9, 18.10, 18.11 and 18.12 are deliberate.

#### English that stays

Names and brands in Latin letters (Searles, CorningWare, Pyrex, Kimax, Clorox, Tums, Wikimedia Commons, Flickr, Intel Free Press and the other credit names), the Latin and Greek words the text discusses (*silex*, *aqua fortis*, *aqua regia*, *phosphorus*, noble, hydrogen hypofluorite, alkaline, tin cans, bicarbonate of soda, anion in 碳酸氢根（bicarbonate anion）, "in the limelight"), the acronyms FDA, EPA, CDC, STP, PVC, CFC, VLSI, DNA, RNA, unit symbols, formulas and states. `bloom` values, the Figure and Sim eyebrows, the half-width `answer.parts[].part` labels of 18.3 e41 ((a) ΔH° ... kept by translate.md 5) stay English.

#### Sweep changes the merge made

Part labels: the exercise prompts and solutions of 18.3, 18.4, 18.8 and 18.9 had half-width (a) (b) labels in prose; written （a）（b） now, with the ASCII `;` between solution parts written `；`. `19世纪中叶` became `19 世纪中叶`. Credits: `"osseous"` in 18.9 and the label quotes in 18.7 follow the form 改编自 “X” / 来源 “根”：; the stray 。 inside the closing bracket of the 18.6 credit was taken out. 18.4 and 18.5 `data-concept` spans were not changed except the two noted (氮离子, 布朗斯特–劳里碱 in 18.5 and 氮离子 and 硒离子 in 18.4).

#### Not done

The `termonline` confirmation of the 461 rows, the `npm run dev` read-through and the humanizer review (translate.md 8.4) are outstanding. The 12 `sheets` files are English in `book.json` until the owner decides (see the shared notes).

## Chapter 19 sections

The merge moved the cross-page rows (compound-name spans, 主族, oxidation state, shorter wraps, eyebrows, figure citations, table eyebrows, credits, units) into "Every page" and left the `answer.part` row to "Other things for the owner" below.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch19/intro/text.html, ch19/19.1/text.html, ch19/19.1/section.json, ch19/19.2/text.html | compound-name spans: nitrate 硝酸银, silicate 硅酸锆, 硅酸钙, oxide (氧化钙, 氧化铜(I), 氧化铁(II), 氧化钴(II), 氧化钪(III), 氧化钒(V), 氧化铬(VI), 氧化锰(VII)), carbonate (碳酸钙, 碳酸钠, 碳酸镍), nitrate (硝酸镍, 硝酸根), sulfate (硫酸钴), hydroxide (氢氧化钠, 氢氧化钴(II), 氢氧根), acid (氢卤酸, 氢溴酸, 硝酸, 盐酸, 硫酸, 二巯基丁二酸), 氢气 and 液氦/液氮 (`gas`, `liquid`) | the span wraps the whole Chinese compound name or word | the source wraps one English word of "calcium oxide", "sodium hydroxide", "hydrochloric acid", "hydrogen gas", "liquid helium"; Chinese names each in one word, as in ch01/1.2 and 1.3 (translate.md 3.3, the span stays in its block) |
| ch19/intro/text.html, ch19/19.2/text.html | `main <span group>group</span> <span metal>metals</span>`, "main group atoms", "main group elements" (spans `group-of-the-periodic-table`) | written 主<span>族</span><span>金属</span>, 主<span>族</span><span>原子</span>: the span wraps 族 only and the neighbouring noun keeps its own span | 主族 is one word that holds the concept word 族 |
| ch19/19.1/text.html, ch19/19.1/section.json, ch19/19.2/text.html, ch19/19.2/section.json, ch19/19.3/text.html, ch19/19.3/section.json, ch19/intro/text.html | `oxidation state` spans (`oxidation-number`, 46 spans, 氧化态) | the span wraps 氧化态, where the glossary row of the concept is 氧化数; 氧化数 is kept where the source says "oxidation number" (19.1 text.html and exercise e-solution, 19.3 exercise prompt) | the book uses both words for one concept; ch18 has both rows (oxidation state 氧化态) and Chinese uses 氧化态 for the state of an element in a compound |
| ch19/19.1/text.html, ch19/19.3/text.html | `mixtures` spans on 溶液 (19.1: 14, 19.3: 2); `acidic-solution` and `basic-solution` spans on 酸性的 and 碱性的 (19.1: 2 and 1) | the span wraps 溶液 and the adjective 酸性/碱性 (with 的) instead of the full glossary target | the source wraps "solution" and "acidic" separately; same shorter wraps as ch02 (溶液, 酸性) |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Figure N.M + N.M` and `Sim` kept; the bare `Figure` of 19.3 too | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html, section.json | figure citations in the prose, "(Figure 19.14)" in `data-original-caption` and `original_caption` | written 图 N.M, plain text | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch19/19.2/text.html | table eyebrows `Table 19.1` to `Table 19.5` | written 表 19.1 to 表 19.5 | translate.md 5 lists a table's eyebrow as translated; same as ch01 |
| every text.html, ch19/19.1/section.json | photo credits (URLs in the Figure 19.5 credits) | （来源：X）, （来源：改编自 X 的作品）, lettered or positional （来源 a：…；b：…）, （来源 左：…；中：…；右：…）, （来源：X 提供的图片）; names, quoted names (改编自 “X”, a space before the opening quote), organisations and URLs kept as printed | the book-wide credit formula of ch01; "credit" is translated, the names are not (translate.md 5) |
| ch19/19.1/text.html, ch19/19.1/section.json, ch19/19.2/text.html | feet, tons, miles (blast furnace 80–100 feet and 25 feet, "several hundred tons", "hundreds of miles", "230,000,000 tons of sulfuric acid") | written 英尺, 数百短吨, 数百英里, 230,000,000 短吨; symbols and numbers as printed | units with no SI equivalent take the Chinese name in prose; the US ton is the short ton, as in ch01/1.6 (translate.md 4.4) |

### ch19/intro

No page-specific scenario; the rows under "Every page" apply.

### ch19/19.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch19/19.1/text.html | #transition, "lanthanide series (or lanthanoid series)" and "actinide series (or actinoid series)" | each pair is written with its two Chinese forms: 镧系（或称镧系元素）, 锕系（或称锕系元素）; every strong and `data-concept` span kept; elsewhere "lanthanide series" is 镧系 and "lanthanide(s)/elements" 镧系元素 | The glossary renders lanthanide and lanthanoid (actinide and actinoid) by one target, so the literal 镧系元素（或镧系元素） would be meaningless (collision, translate.md 4.5) |
| ch19/19.1/text.html | `period-of-the-periodic-table` spans on "series" (#transition example 19.1, #properties, #compounds "transition series") | the span wraps 系 (the series of a transition row); "the period just below" keeps 周期 | The span names the word "series", which Chinese says 系; the concept's own word is 周期 (translate.md 3.3, the span stays in its block) |
| ch19/19.1/text.html | #compounds Carbonates, "a soluble carbonate salt" (spans soluble, carbonate, salt) | written 可溶的碳酸盐 with the spans on 可溶的, 碳酸 and 盐 | the source has separate `carbonate` and `salt` spans, Chinese has the one word 碳酸盐; the two spans are kept by splitting it |
| ch19/19.1/text.html | #compounds, "salts of the oxyanions VO4 3-, CrO4 2-, and MnO4-." | written 生成盐，其含氧酸根为 ${…},$ ${…},$ 和 ${…}.$ | the formula run ends with the comma and period that stay inside the LaTeX; the order is changed so that the run closes the sentence (the same at "oxyanions such as … and ….", #properties, and the ion formula of #silver, where the run's comma is followed by 典型的方程式为) |
| ch19/19.1/text.html, ch19/19.1/section.json | #silver "Hydrology involves the separation of a metal …" | written 水文学涉及…, the book's misprint for hydrometallurgy kept; "it often useful to employ" (missing "is") written as a plain sentence 往往是有用的; "dicyanoargentate(I)" and the Example 19.3 misprint "dicyanoargenate(I)" both 二氰合银(I)酸根离子; "Bismouth" written 铋 | a misprint of English spelling or grammar has no Chinese form; the one that has a Chinese form (Hydrology) is kept; the `notes` field quotes the English misprints in Latin letters inside quotation marks |
| ch19/19.1/section.json | e11 prompt, `2.5000-g` (span `mass`) | written `2.5000 g`, hyphen dropped | Chinese has no hyphenated measure phrase, as in ch01/1.6 |
| ch19/19.1/text.html | Figure 19.11 caption, "magnetic levitation train (or maglev)" | written 磁悬浮列车（简称磁浮列车） | "maglev" is the English short form; Chinese has its own short form (translate.md 4.3) |
| ch19/19.1/figures.js | `WORD` | 'zero' to 'twelve' written 零, 一, 两, 三 … 十二 and used as `全部${WORD[n]}个`; the two sentences of the sim-oxidation-states `topline` rewritten with the same slots (name, state, counts) in Chinese order; `m.name.toLowerCase()` dropped | number words and English capitalisation grammar built into the code (4.1) |
| ch19/19.1/figures.js | sim-oxidation-states, electron hover `name` | `'lost in Ti 4+, removed first: a 4s electron, spin up'` becomes `在 Ti 4+ 中失去，第一个被移去：一个 4s 电子，自旋向上`; the ordinal array 'first' … 'seventh' is 一 … 七 with 第 and 个 around it | English sentence frame and ordinal words built by rule; Chinese needs the ordinal as 第N个 (4.1) |
| ch19/19.1/figures.js | sim-superconductor `topline` | `m.plural ? 'conduct' : 'conducts'`, `'have' : 'has'`, `'they become' : 'it becomes'` collapse to one form (传导电流时没有电阻, 仍有电阻, 才变为超导的); `plural: true` stays in `MAT` unused | English plural branch (4.1) |
| ch19/19.1/figures.js | sim-transition-series `ro` readouts, `\text{:}` | written `\text{：}` where the readout follows Chinese words; `\text{to}`, `\text{and}`, `elements, filling the … subshell` are 至, 和, 种元素，填充 … 亚层; the sim-oxidation-states readout `\text{:}` after the symbol is kept | a colon in a prose readout is Chinese punctuation, the one after a chemical symbol is part of the formula |
| ch19/19.1/figures.js | sim-transition-series `pick` options, `[['first','first'], …]` | option labels 第一, 第二, 第三, 第四, 镧系, 锕系 under the control label 系 | the labels are short forms of 第一过渡系 etc. for a control that already says 系 |
| ch19/19.1/figures.js | hover name `NAME[Z - 1] + ', Z = ' + Z` | 钪，Z = 21 (full-width comma); the `NAME` array of 118 element names is the glossary's, including 𬬻 𬭊 𬭳 𬭛 𬭶 鿏 𫟼 𬬭 鿔 鿭 𫓧 镆 𫟷 鿬 鿫 | element names are the authority's; the comma between name and Z is Chinese punctuation |
| ch19/19.1/text.html | Example 19.1, "the transition and inner transition metals" (span `transition-metal` on "transition") | written 对于<span transition-metal>过渡</span>金属和<span inner-transition-metal>内过渡金属</span>; the first span wraps 过渡 only | the source puts the span on "transition" of a coordinated pair; Chinese shares 金属 between the two terms, so the first span cannot wrap 过渡金属 without crossing the 和 |
| ch19/19.1/text.html | #properties, "low-melting metals such as tin" (span `melting`) | the span wraps 熔点 in 熔点低的金属 | the glossary row melting is 熔化 (the process); the Chinese for the property of a metal is 熔点, and 熔化低 does not exist |
| ch19/19.1/text.html | #compounds Halides, "bond polarity is a continuous spectrum" (span `continuous-spectrum`) | written 键的极性是连续变化的，一端是…; the span wraps 连续变化, and the row `continuous spectrum` (ch06, 连续光谱) is not used | "continuous spectrum" here means a continuum of values, not a spectrum of light; 连续光谱 is a light term and makes no sense for bond polarity; the span names a word used outside the concept's sense (review pass) |

### ch19/19.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch19/19.2/text.html, ch19/19.2/section.json | #naming rules 1 to 3, Tables 19.1 to 19.4, Example 19.4, exercises e27 and e31, cyl1, cyl2, Example 19.5 | every compound name is written as a Chinese name (三氯化六氨合钴(III), 四氯·二氨合铂(IV), 六氯合铂(IV)酸钠, 硫酸三(乙二胺)合钴(III)): ligand names are the bare stems of the ch19 rows (氨, 氯, 水 …) joined by · and followed by 合 and the metal; bis- is 双, tris- 三 before a bracketed ligand name; an anionic complex ends in 酸 and a salt names its anion first | the book teaches the English rules; the Chinese system differs only in form, and the examples must read as Chinese names |
| ch19/19.2/text.html | #naming rule 1 | "in accordance with the usual nomenclature" written 按照英文名称通常的命名法; the order "cation first, anion second" is kept | the order is that of English names; the Chinese examples (三氯化六氨合钴(III), 六氯合铂(IV)酸钠) name the anion first, so the sentence says whose order it describes |
| ch19/19.2/text.html | #naming rule 2, "Name the ligands alphabetically", "adding -o to the stem name" | written 按英文名称的字母顺序命名, 由基团的词干名加 -<em>o</em> 构成; the Chinese example names (四氯·二氨合铂(IV), 二氯·双(乙二胺)合镍(II), 二氯·四氨合铂(IV)离子) put the anionic ligands before the neutral ones, as the Chinese standard (中国化学会《无机化学命名原则》) requires, so they differ from the English alphabetical order of the source (chloro before ammine); the rule sentence reads 按英文名称的字母顺序命名（中文名称则把阴离子配体排在中性配体之前） | the rule is about English spelling (translate.md 4.3), but a Chinese name with the neutral ligand first is wrong in a Chinese textbook; reversed in the review pass (the first pass kept the source order) |
| ch19/19.2/text.html | #naming rule 2, the four exceptions | <em>aqua</em>（水，H₂O）, <em>ammine</em>（氨，NH₃）, <em>carbonyl</em>（羰基，CO）, <em>nitrosyl</em>（亚硝酰，NO）: the English words kept in <em>, the Chinese ligand name added in parentheses | the sentence lists the four English ligand names that break the rule (4.3); Chinese does not treat them as exceptions |
| ch19/19.2/text.html | #naming rule 3, prefixes, "-ate", "ferrate / plumbate / stannate" | the prefixes <em>di</em>- … <em>hexa</em>-, <em>bis</em>-, <em>tris</em>-, <em>tetrakis</em>- kept in <em> with 表示二 … added; 双(联吡啶)合锇(II) followed by the English bis(bipyridyl)osmium(II) in parentheses; "-ate" kept with 中文名称中作“酸”; "ferrate, plumbate, stannate" kept in <em> with the metal (铁, 铅, 锡) put before; in Example 19.4 the English potassium trisoxalatoferrate(III) follows 三草酸根合铁(III)酸钾 with the tris/tri note | sentences about the letters and endings of English names (4.3) |
| ch19/19.2/figures.js | `LIG` hover names, `LIGNAME`, headlines: "ammine ligand", "chloride ligand", "oxo ligand" … | ligand nouns written 氨配体, 水配体, 氯离子配体, 氟离子配体, 氧配体, 羰基配体, 氰根配体 (rows of `glossary.zh-CN.json`) | the Chinese ligand name inside a complex name is the bare stem (氨, 氯); a ligand named on its own takes the ion or group word |
| ch19/19.2/section.json | e31 solution, exercise_notes | "tetraamine", "diaminedibromo", "diaminedichloro", "tetraamineplatinum" (misprints of ammine) and "dicyanoargenate(I)" in cyl1 are written 氨 and 二氰合银(I)酸钾; the `notes` and `exercise_notes` quote the printed English misprints in quotation marks | a misprint of English spelling has no Chinese form (as in ch19/19.1) |
| ch19/19.2/text.html | #coordination, "pronounced “KEY-late”" | written（英文读作“KEY-late”）; the Greek meanings “one toothed” and “claw” are translated (“一个齿”, “爪”) | a sentence about the sound of an English word (4.3); the Greek meaning is the book's own gloss |
| ch19/19.2/text.html | #coordination, "Most often, this involves a donor atom with a lone pair of electrons" (spans `lone-pair` and `electron`) | written 带有<span lone-pair>孤电子对</span>，这对<span electron>电子</span>可以与金属形成配位键 | 孤电子对 contains the word 电子, so the two spans could not stand side by side; the electron span moves to a relative clause |
| ch19/19.2/text.html | #coordination, "the anion of the acid glycine" (spans `acid`, `anion`) | written 甘氨酸这种<span acid>酸</span>的<span anion>阴离子</span> | the acid is part of the Chinese name 甘氨酸; the added 这种 keeps the span on 酸 |
| ch19/19.2/text.html, ch19/19.2/figures.js | #isomerism "bond dipoles", "polar", "nonpolar"; cis-trans sim readout | written 键偶极矩, 极性分子 (span `polar-molecule`), 非极性的 / 无极性 | the glossary row is Bond dipole moment = 键偶极矩 (row bond dipole of `glossary.zh-CN.json`); Chinese says 有极性 and 无极性 of an ion |
| ch19/19.2/text.html | #structures sim-head and Example 19.5 "In the Figure 19.20" | written 在图 19.20 中 | the missing article of the source has no Chinese form |
| ch19/19.2/text.html | every `alt` and `data-original-caption`, section.json figure `alt` of exercises | the spelled-out symbols and subscripts of the English alt text ("C l", "H subscript 2 O", "P t") are written as symbols (Cl, H₂O, Pt) | the spaced letters are for English screen readers; the chemistry is the same |
| ch19/19.2/text.html, ch19/19.2/section.json | `data-original-caption` and figure `original_caption`: "(Figure 19.14)" … "(Figure 19.24)" | written （图 19.14） … （图 19.24） | citation of a figure number (4.6) |
| ch19/19.2/section.json | cyl3 prompt, footnote 1 reference | the bibliographic entry "National Council against Health Fraud, NCAHF Policy Statement on Chelation Therapy, (Peabody, MA, 2002)." kept as printed | a citation of an English publication (title and publisher) with no Chinese edition |
| ch19/19.2/section.json | e29 prompt (f) | "(note that ${\text{C}}_{2}{\text{O}}_{4}{}^{2−}$ is the bidentate oxalate ion, $-{\text{O}}_{2}{\text{CCO}}_{2}{}^{\text{−}})$" written with ASCII parentheses around 注意 … and the LaTeX byte for byte | the source's closing parenthesis stands inside the last LaTeX run, so a full-width pair would not match |
| ch19/19.2/section.json | e27 (f), (g) | "hexaamminecobalt(III) hexacyanochromate(III)" and "dibromobis(ethylenediamine) cobalt(III) nitrate" written with the anion first: 六氰合铬(III)酸六氨合钴(III), 硝酸二溴·双(乙二胺)合钴(III); the space of the printed "bis(ethylenediamine) cobalt(III)" has no Chinese form | the order of a Chinese salt name |
| ch19/19.2/figures.js | sim-complex-geometry, `NUM` and `head`/`what`/`shape` | `NUM` is 一 … 八; a new `CNT(n)` writes 二 as 两 for counts of ligands and atoms (两个氨配体) while the coordination number stays 二; the headline template `In ${label} ${what} ${shape}: the coordination number is …` becomes `在 ${label} 中，${what}${shape}：配位数为…` with `what` ending in 将…置于 and `shape` in 的顶点上; `LIGNAME` gives the noun before 配体 (氯离子, 氨, 水 …) | English plural and sentence frame built by concatenation (4.1); the 二/两 choice is Chinese grammar |
| ch19/19.2/figures.js | `blend` hover `name` ` (${sym})` and `METAL` | written `（${sym}）` after the Chinese metal name (银（Ag）); `M` is 金属离子 | English "a metal ion" article; full-width brackets in prose |
| ch19/19.2/figures.js | sim-cis-trans headline, `colour` | `, which is violet` + swatch becomes `（紫色` + swatch + `）` placed before 中; the headline is `在<i>顺</i>-NAME（紫色）中，两个氯离子配体彼此相邻。` | an English non-restrictive clause; the swatch stays beside the word for the colour |
| ch19/19.2/figures.js | sim-cis-trans readout note | `the ${M === 'Pt' ? 'molecule' : 'ion'} is polar` is `该分子/离子有极性`, `nonpolar` is `无极性` | the choice of noun stays, the article is dropped (4.1) |
| ch19/19.2/figures.js | sim-optical-isomers headline and readout | `Turned to its best fit, the mirror image of X still leaves N atoms where the original has none` is written with the same slots in Chinese order; the readout `\text{atoms of the image without a twin} = N of M` is `\text{像中没有对应原子的原子数} = N （共 M 个原子）` | English sentence frame and "N of M" (4.1) |
| ch19/19.2/text.html | #isomerism, `cis-trans-configuration` span on "cis-diamminedichloroplatinum(II)" | the span wraps the whole Chinese name 顺-二氯·二氨合铂(II) | the source wraps the word cis; Chinese writes 顺- inside the name (translate.md 3.3, the span stays in its block) |

### ch19/19.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch19/19.3/figures.js | `WORDS` ('no', 'one' … 'ten') and the Figure 19.35 headline templates (`${cap(WORDS[n])} $d$ electron${n > 1 ? 's' : ''}`, `unpaired electron${un === 1 ? '' : 's'}`, `${un ? WORDS[un] : 'no'}`) | WORDS become 零, 一, 两 … 十; the plural branches collapse to one form; the three templates are rewritten in Chinese word order with the same slots: `${WORDS[n]}个 $d$ 电子，…：${un ? '有' + WORDS[un] + '个' : '没有'}未成对电子。`; `high`/`low` become 高/低 before 自旋 | English plural and number-word grammar in figure code (translate.md 4.1) |
| ch19/19.3/figures.js | sim-d-orbitals `HEAD` strings | "Six ligands on the axes: the lobes of X point straight at four of them." etc. rewritten in Chinese order (六个配体位于坐标轴上：X 的瓣直指其中四个配体。) | English sentence frame with a template slot; the slots stay |
| ch19/19.3/text.html | `<span data-concept="gas">` in "in the gas phase" | the span wraps 气相 (气 + 相) rather than 气体 | Chinese says 气相; 气体相 does not exist, and the span stays in its block (as 天然气 in ch01) |
| ch19/19.3/text.html | #cft, "aufbau (“filling up”) principle" | written 构造原理（aufbau，意为“逐步填充”）, inside the aufbau-principle span | a sentence about the origin of an English (German) word (translate.md 4.3); the glossary target 构造原理 stays whole |
| ch19/19.3/text.html | #cft, "where oct stands for octahedral" | written 其中 oct 代表八面体形（octahedral）, the span on 八面体形 | the subscript oct is the English abbreviation; its letters are explained (4.3) |
| ch19/19.3/text.html | #cft, "The six 3d electrons of the Fe²⁺ ion pair in the three t2g orbitals" (span `ion-pair`) | written Fe²⁺ <span ion-pair>离子</span>的六个 3d 电子成对地占据三个 t2g 轨道; the span wraps 离子 | the book's span marks "ion pair" where "pair" is a verb; Chinese 离子对 would be wrong, the span stays in its block |
| ch19/19.3/text.html | #cft, "trans ligands" (span `cis-trans-configuration`) | `<em><span>反式</span></em>` | the italic and span of the English word kept on the translated word |
| ch19/19.3/text.html | #cft, the $$ block of the spectrochemical series | `\text{a few ligands of the spectrochemical series, in order of increasing field strength of the ligand}` written 光谱化学序列中的若干配体，按配体场强递增的次序排列; LaTeX otherwise as printed | words in `\text{}` are translated (translate.md 5); translation_parity.py cannot split this block (the `<` signs of the series read as tags), so it reports a block replace/insert/delete here and nothing else |
| ch19/19.3/text.html | Example 19.9, `\text{so}` and `\text{Joules/ion}` in the two $$ lines | written `\text{所以}` and `\text{焦耳/离子}`; `\text{m/s}`, `\text{Hz}`, `\text{J}\text{·}\text{s}` kept | words in `\text{}`; unit symbols kept |
| ch19/19.3/text.html | Example 19.9, "maximum absorbance" | written 最大吸光度, and "absorption maximum" (sim-head) 吸收极大 | the two English phrases of the book; glossary row absorption maximum |
| ch19/19.3/text.html, ch19/19.3/section.json | iron(II), copper(I), copper(II), hexaaquairon(II) sulfate, potassium hexacyanoferrate(II) | written 铁(II), 铜(I), 铜(II), 硫酸六水合铁(II), 六氰合铁(II)酸钾 (the Chinese name order, as in 19.2) | compound names are Chinese names, not word-for-word renderings |
| ch19/19.3/text.html | Figure 19.40 / #colors, “blue, blue-green violet, or yellow” | written 蓝色、蓝绿紫色或黄色, as printed | the section's notes keep the odd phrase as printed; the Chinese keeps it as odd as the English |
| ch19/19.3/text.html | #colors, "the eyes see lemon yellow", "complement" | 柠檬黄色 (glossary lemon yellow = 柠檬黄); "its complement" written 与它互补的颜色 | Chinese has no single noun for the complement apart from 补色; 互补色 is the glossary term |
| ch19/19.3/text.html | #colors, “leaving the complementary colors of blue and green” | written 留下蓝色和绿色这两种互补色 | the plural phrase becomes a Chinese apposition; the span stays on 互补色 |
| ch19/19.3/text.html, ch19/19.3/section.json | “the book writes d_zy …” footnote, Hund's rule | d_zy, “Hund's rule” (straight apostrophe) quoted as printed in `notes` | an error of the book stays (translate.md 3.2) |
| ch19/19.3/section.json | e37 solution, alt of the book's crystal field diagrams | the English spoken-form alt (“F e subscript 2”) is rewritten with 下标/上标/负号 words in the same positions; “capital delta subscript oct” becomes 大写 Δ 下标 oct | the alt is a reader-visible description of a diagram; the structure of the English is kept |
| ch19/19.3/section.json | e42 prompt and solution | "diphosphate" written 二磷酸根 (row of `glossary.zh-CN.json`); "water softener" 水软化剂, "sequesters" 封存 | glossary rows; the book's English name kept as the Chinese name of the same ion |

### Other things for the owner

**Terms to confirm (chapter glossary `glossary.zh-CN.json`, 239 rows: 195 seeded by the scaffold, 44 folded in from the pages).** 141 rows carry `"confirm": "termonline"` (not looked up, or the authority is the textbook's usual name), 2 carry `"confirm": "owner"`: `lump` 料块 (blast-furnace figure, the lump followed down the furnace) and `atom without a twin (optical isomers sim)` 没有对应原子的原子 (the sim's readout, no standard phrase). Folded-in rows with doubt in their note: the mineral names azurite 蓝铜矿, proustite 淡红银矿, covellite 铜蓝, tenorite 黑铜矿; copper hydroxycarbonate 铜的碱式碳酸盐; dicyanoargentate(I) ion; the ore-dressing words panning 淘洗, vein 矿脉, deposit 矿床, tuyere 风口, anode sludge 阳极泥, refractory brick 耐火砖, mixed valence compound 混合价化合物; diphosphate ion 二磷酸根离子 (化学名词 also has 焦磷酸根 for P₂O₇⁴⁻; the source's name is kept); bond dipole, square pyramid, mirror plane, antiseptic compound.

**Changes of the merge to rows.** `dichromate` (page row 重铬酸根, the ion of Cr₂O₇²⁻) is the row `dichromate (the ion)`, because ch2 has `dichromate` 重铬酸盐 for the salt; the shared row dichromate ion is 重铬酸根离子. `lone pair` 孤电子对 was dropped (ch18 has the same source and target). Composite sources were shortened to `lump`, `series (of transition elements)`, `trans- (prefix in a name)`. The page that wrote `series (of the transition elements, as a unit)` 系 and the `period-of-the-periodic-table` spans on 系 are the recorded 19.1 scenario.

**Misprints of the English source kept in the notes.** "Hydrology" for hydrometallurgy (19.1, kept as 水文学), "it often useful", "Bismouth", "dicyanoargentate(I)" and "dicyanoargenate(I)" (both 二氰合银(I)酸根离子), "tetraamine", "diaminedibromo", "diaminedichloro", "tetraamineplatinum" (19.2), "d_zy" and "Hund's rule" with a straight apostrophe (19.3). Each `notes` and `exercise_notes` string quotes the English in Latin letters inside quotation marks.

**Chinese coordination-compound names.** The pages write every complex name as a Chinese name (三氯化六氨合钴(III), 六氯合铂(IV)酸钠, 硫酸三(乙二胺)合钴(III), anion first for a salt), where the book teaches the English rules. The Chinese standard puts anionic ligands before neutral ones and orders by that rule; the page examples follow it too (四氯·二氨合铂(IV), anion before neutral ligand), since the review pass reversed the first pass's choice of keeping the English alphabetical order of the source (氨 before 氯); the rule sentence says so. The rule sentences about English spelling (-o endings, -ate, di-/bis-/tetrakis-, ferrate/plumbate/stannate, aqua/ammine/carbonyl/nitrosyl as exceptions) are kept in Latin letters in `<em>` with the Chinese form beside them. A Chinese chemist may want to review this section (19.2 #naming) as a whole.

**English kept on purpose.** `answer.part` and `answer.parts[].part` of cyl2, e39 and e41 in 19.3 (translate.md 5 lists them as kept fields and `translation_parity.py` requires it); the bibliographic entry of cyl3 in 19.2 (National Council against Health Fraud, NCAHF Policy Statement on Chelation Therapy, 2002); personal and photo-credit names; Greek and German origins (*aufbau*, the Greek meanings of "chelate" translated and the English pronunciation "KEY-late" kept).

**Choices that may read oddly.** 氧化态 on the oxidation-number spans (46 spans) where the glossary row is 氧化数; the span on 过渡 in 过渡金属和内过渡金属 (Example 19.1); 吸收极大 for absorption maximum next to 最大吸光度 for the book's "maximum absorbance" (Example 19.9); the "blue, blue-green violet, or yellow" phrase of Figure 19.40 kept as printed; 磁悬浮列车（简称磁浮列车）; 阳极泥 and 淘洗 for the silver and copper refining words; the Figure 19.35 and 19.1 sim headlines rewritten in Chinese order.

**Spacing and credit edits of the merge.** A space was put before `<strong>` and the `109.5°` span where a Latin or digit run followed a Chinese character (称为 e<sub>g</sub>, 形成 109.5°); `改编自“X”` became `改编自 “X”` in 19.2 (two places), as ch02 did.

The humanizer review and the `npm run dev` read-through (translate.md 8.4) are outstanding for the owner.

## Chapter 20 sections

The merge dropped the rows that were no forced scenario (a bibliographic footnote kept as printed, source slips kept in alt text, the part labels and a pending-term row of 20.4; they are owner notes below) and added the cross-page rows: the compound wraps of concept spans, the spans shorter than their glossary row, the class words 醇 and 酰胺, the 共振式 sweep, the eyebrows, the figure citations, the table eyebrow and the credits.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.1/text.html, ch20/20.3/text.html, ch20/20.4/text.html (and the spans inside section.json strings) | spans on 天然气 and 室温 (20.1), 体重 (20.2), 硝酸纤维素 (`nitrate`, 20.3), 溶液 (`mixtures`, 20.3), 铵盐 (`salt`) and 液氮 (`liquid`) (20.4), 乙酸, 甲酸, 棕榈酸, 硬脂酸, 油酸 and 氨基酸, 脱氧核糖核酸 (`acid`) | the span wraps the whole Chinese compound or the word that carries the concept; the glossary targets are 气体, 温度, 重量, 硝酸盐, 均匀混合物与非均匀混合物, 盐, 液体, 酸 | the source wraps one English word of "natural gas", "room temperature", "body weight", "cellulose nitrate", "ammonium salt", "liquid nitrogen", "acetic acid" and so on; Chinese names each in one word (translate.md 3.3, the span stays in its block, as in ch01); the page rows below give the cases that need more than the wrap |
| ch20/20.1/text.html, ch20/20.2/text.html, ch20/20.4/text.html | spans on 沸点 (`boiling-point`), 熔点 (`melting-point`), 放热 (`exothermic-process`), 命名 (`nomenclature`), 频率 (`frequency`), 结构简式 (`structural-formula`), `sp` 杂化 (`sp2-hybrid-orbital`, `sp` before 杂化 without 轨道), 燃烧 and 热 (`combustion-reaction`, `heat-flow`) | the span text is shorter than the glossary row (沸点与正常沸点, 熔点与凝固点, 放热过程, 命名法, 频率（ν）, 结构式, sp² 杂化轨道, 燃烧反应, 热量) or has another word for the same idea (结构简式 for the condensed formula, where the concept `structural-formula` is 结构式) | the row is the concept's name or carries a symbol; the span wraps the term as the sentence says it, and the span stays on the word the source wraps (translate.md 3.3). 结构简式 (condensed structural formula) is a ch20 row of its own; the source wraps "structural formula" inside it |
| ch20/20.2/text.html, ch20/20.3/text.html, ch20/20.4/text.html | every `alcohol` span (醇, 16 + 10 + 1) and the `amide` spans (酰胺, 20.4) | the spans wrap 醇 and 酰胺, the chemical classes; the shared rows are alcohol 酒精 (the drink, ch01) and amide 氨基化物 (the metal amide NaNH2, ch18) | the shared rows name other things (their notes say the class waits for Chapter 20); ch20 has the rows alcohol (compound class) 醇 and amide (compound class) 酰胺 with the concept link |
| ch20/20.1/text.html, section.json, figures.js, ch20/20.3/section.json, ch20/20.4/text.html, section.json | `resonance structures`, `resonance-forms` spans | written 共振式 on every page: 20.1 (text.html 4, section.json 1, figures.js 4), 20.3 (the exercise prompt "two-resonance structures for the acetate ion") and 20.4 (the Figure 20.17 caption span, the exercise note) | the pages first disagreed (共振式 on 20.1, 共振结构 on 20.3 and 20.4); the concept's term is 共振式, and a span cannot read otherwise (chapter sweep) |
| every text.html | figure and sim eyebrows | `Figure 20.N`, `Figure 20.2 + 20.7 + 20.10`, the bare `Figure` and `Sim` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6), as in ch01 |
| every text.html, section.json | figure citations in the prose and the captions | written 图 20.N, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book in ch01 |
| ch20/20.1/text.html | table eyebrow `Table 20.1` | written 表 20.1 | translate.md 5 lists a table's eyebrow as translated; the checker reads only the Figure and Sim eyebrows (as ch01) |
| ch20/intro/text.html, ch20/20.1/text.html, ch20/20.1/section.json, ch20/20.2/text.html, ch20/20.3/text.html, ch20/20.4/text.html | photo credits (8) | one formula: （来源：X） for a plain credit (Karen Roe, Rebecca Siegel, "Blausen Medical Communications"/Wikimedia Commons), （来源：改编自 X 的作品） for "modification of work by X"; lettered or positional credits （来源 a：…；b：…；c：…） and （来源 左：…；左中：…；右中：…；右：…）; names kept as printed | the ch01 formula; the intro wrote the position words in quotation marks and 20.1 as 左图, now both 左 (chapter sweep) |
| ch20/20.1 to 20.4 text.html, section.json | every `alt` (formulas spelled letter by letter in the source) | two styles, recorded as a deliberate split: 20.1 writes the formulas (CH₃, Cl, Br, 2-甲基丙烷, O=O); 20.2, 20.3 and 20.4 keep the spoken form (C H 下标 3, N a O H, O H 基团, H 上标加号). Compound names are written as names on every page (1,2-乙二醇, not 逗号/短横). The 20.4 alt texts write O H 基团 beside C H 下标 3 | the 20.1 pages were translated first with the formula style; ch18 and ch19 also write formulas in alt text; converting the 20.1 alt texts and answer images to spoken letters was not done; review pass 1 (finding 3) asks for one decision and a record |

### ch20/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/intro/text.html | `Friedrich Wohler` | written 弗里德里希·维勒（Friedrich Wohler）; the Latin name kept in brackets as printed | name of a person with a standard Chinese rendering; the bracket keeps the book's spelling (translate.md 2.7, as FDA in ch01/1.1) |
| ch20/intro/text.html | `carbon-based` in quotation marks | “碳基”生命这一称谓 | English attributive epithet restructured; glossary 碳基生命 |
| ch20/intro/text.html | `carbonates and cyanides, and simple oxides, such as CO and CO<sub>2</sub>` | the oxide span wraps 氧化物 and “simple” becomes 简单的; the same sentence order | Chinese plural marking collapses to one form (4.1) |

### ch20/20.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.1/text.html, section.json | ethene / ethylene, propene / propylene, ethyne / acetylene: "Each carbon atom in ethene, commonly called ethylene", "propene (propylene)", "Ethylene (the common industrial name for ethene)", "ethyne, C2H2, commonly called acetylene", the captions and alt texts of Figure 20.7 and the ethyne figure | each pair is one Chinese name: 乙烯, 丙烯, 乙炔; the parenthetical second name is not written ("Ethylene (the common industrial name for ethene) is a basic raw material" → 乙烯是…基本原料) | glossary: ethene and ethylene are both 乙烯, propene and propylene both 丙烯, ethyne and acetylene both 乙炔; a second name would read 乙烯（乙烯） (translate.md 4.5) |
| ch20/20.1/text.html | #naming rule 2 and the paragraph after Figure 20.3 ("-ide" → "-o", "di-", "tri-", "tetra-", "difluoro-", "chloride"), #alkyl ("-ane" → "-yl"), Example 20.4 ("eth-", "-yl"), #alkene-names ("-ane" → "-ene"), #alkynes ("-yne") | the English affixes are kept in `<em>` and the Chinese counterpart follows in full-width parentheses: `<em>-ane</em>（烷）`, `<em>di-</em>（二）`, `chloride（氯离子）`; "These prefixes can be seen in the names" written 这些前缀 | sentences about English word-formation (translate.md 4.3); Chinese names are built with 烷 烯 炔 基 and the numerals 二 三 四 |
| ch20/20.1/text.html | #naming rule 2 "placed in alphabetical order", the paragraph after Figure 20.3 "listed alphabetically", Example 20.3 "bromo- comes before chloro- alphabetically" | written 按其英文名称的字母顺序 ("in the alphabetical order of their English names"); in Example 20.3 the English prefixes bromo- and chloro- are kept | the current Chinese rule orders substituents by the English names; 溴 and 氯 would otherwise be ordered by their pinyin and the sentence would be false (glossary note on 1-bromo-3-chlorohexane) |
| ch20/20.1/text.html, figures.js, section.json | `<em>n</em>-butane`, "the prefix <em>n</em>", "We use the term <em>normal</em>", "the <em>normal isomer</em>", `$n$-butane` (figures.js heads) | 正丁烷 with the `<em>` on 正 (`<em>正</em>丁烷`); "We use the term normal, or the prefix n" written 我们用<em>正</em>一词，或前缀 <em>n</em>; "normal isomer" 正异构体; in figures.js the `$…$` run of `$n$-butane`, `$cis$-2-butene`, `$trans$-2-butene` is dropped (正丁烷, 顺-2-丁烯, 反-2-丁烯) | the Latin prefix n has the Chinese counterpart 正 (shared row n-butane); the one sentence that talks about the prefix itself keeps the Latin n (4.3); an italic maths run cannot carry a Chinese character |
| ch20/20.1/text.html, section.json | `<em>cis</em>`, `<em>trans</em>`, `<em>cis-</em>isomer` and the names cis-2-pentene, cis-3-hexene, trans-1-chloropropene | `<em>顺</em>`, `<em>反</em>`; `<em>顺</em>式异构体`, `<em>顺</em>-2-戊烯` | glossary cis 顺, trans 反; the `<em>` wraps the translated prefix |
| ch20/20.1/text.html | #isomers, "(the term constitutional <span data-concept="isomers">isomers</span> is also commonly used)" | written 构造异构体（也常用“结构异构体”这一术语）, the second term 结构异构体 and the later "Constitutional isomers" 构造异构体 with the `isomers` span on 异构体 | glossary note on constitutional isomer: the second word is the older 结构异构体 |
| ch20/20.1/text.html | #fuels, `fractional <span data-concept="distillation">distillation</span>` (three places, one in the Figure 20.6 sim-head) | the span wraps 分馏 | 分馏 is one word; the concept word is 蒸馏 |
| ch20/20.1/text.html | #alkynes, `high <span data-concept="heat-flow">heat</span> of <span data-concept="combustion-reaction">combustion</span>` | written 高<span combustion-reaction>燃烧</span><span heat-flow>热</span>, the two spans on the two syllables of 燃烧热 | glossary heat of combustion is the single word 燃烧热; both spans and their order are kept |
| ch20/20.1/text.html | #organic and #recycling, `Polymers (from Greek words <em>poly</em> meaning “many” and <em>mer</em> meaning “parts”)` | written 聚合物（英文 polymer，源自希腊语 <em>poly</em>，意为“许多”，和 <em>mer</em>，意为“部分”）; the Greek stems stay in `<em>` | origin of an English word (4.3) |
| ch20/20.1/text.html | #recycling, "[like polyethylene, polyvinyl chloride (PVC), and polystyrene]" | square brackets written full-width ［　］ | full-width punctuation in Chinese prose (3.5) |
| ch20/20.1/text.html | #alkenes, `Over <span data-type="mass">135 million tons</span>` | written 超过 <span data-type="mass">1.35 亿短吨</span> | Chinese counts in 万 and 亿; the book's ton is the US short ton (chapter 1 decision 短吨) |
| ch20/20.1/text.html | #recycling, "Many areas of the country" | written 该国许多地区 | the book means the United States; the country is not named in the source |
| ch20/20.1/text.html, section.json | every `alt` and the answer images' `alt` (e.g. “C H subscript 3”, “C l”, “B r”, “2 dash methylpropane”) | the letters spelled out for a screen reader are written as the formulas: CH₃, Cl, Br, 2-甲基丙烷; “dash” written as the hyphen; “red/purple/green/blue” translated | the English spells formulas letter by letter ("C H subscript 3") for a speech reader; Chinese reads CH₃ directly |
| ch20/20.1/text.html | Table 20.1, column "Phase at STP", cells gas / liquid / solid | written 气态, 液态, 固态 | the column names the state of the sample (same choice as ch01 1.2 sim-states, 固态/液态/气态) |
| ch20/20.1/text.html | #fuels, `<span data-concept="liquid">liquid</span> <span data-concept="mixture">mixture</span>`, "liquid alkane fuels" | the `liquid` spans wrap 液态 | same as the book's recorded rows for solid and liquid (state used as an adjective) |
| ch20/20.1/text.html | #fuels, "continuous- and branched-chain alkanes" | written 直链烷烃和支链烷烃, the `alkane` span on the second 烷烃 only | the English hyphenated pair shares one noun and one span; Chinese repeats the noun (glossary: straight chain 直链) |
| ch20/20.1/text.html | #alkene-names, `<strong> The location of the <span>double bond</span></strong>` | the `strong` wraps 双键的位置, the leading space dropped | the source's stray bold is kept (section.json notes) |
| ch20/20.1/text.html | #aromatic, `resonance structures` (spans `resonance-forms`) and the 20.11 figure | written 共振式 everywhere, and the three 共振结构 of 20.3 (exercise prompt) and 20.4 (Figure 20.17 caption, exercise note) were changed to 共振式 in the chapter sweep | the concept's name is 共振式 (book concepts, ch07 row Resonance forms); the shared ch07 row resonance structure 共振结构 is the same thing and is not used in this chapter, so that the spans, the figure label and the prose agree |
| ch20/20.1/figures.js | `fig 20.2` MOL display names, `T` rows of the alkane trend sim, PARENT and GROUP names, FR names | display names written in Chinese (甲烷 … 十八烷, 正丙基, 叔丁基, 炼厂气, 残渣); the object keys and the `phase` values `'gas'`, `'liquid'`, `'solid'` used in comparisons are kept | the display name is the visible string, the keys are code |
| ch20/20.1/figures.js | hover names `carbon atom of NAME`, `carbon atom N of NAME`, `boiling point of NAME`, `a molecule of the NAME`, `NAME of the X group`, `the pipe that draws off the NAME` | operand order changed: `${NAME}的碳原子`, `${NAME}的第 N 个碳原子`, `${NAME}的沸点`, `${NAME}的一个分子`, `${gr.name}的 X`, `引出${NAME}的管道` | Chinese puts the possessor before the noun (4.1, grammar built from English) |
| ch20/20.1/figures.js | sim-alkane-trend headline: `${name[0].toUpperCase() + name.slice(1)} ${verb}.` with verbs `boils at …`, `melts at … and boils at …`, `melts at …` | rewritten `${name}${verb}。` with verbs `的沸点为 …，低于 0 °C，所以它在 STP 下为气态`, `的熔点为 …，沸点为 …，分居 0 °C 两侧，…`, `的熔点为 …，高于 0 °C，…`; the capitalisation call is dropped | the English frame (capitalised name, finite verb) cannot carry the slots in Chinese (4.1) |
| ch20/20.1/figures.js | sim-alkyl-groups `WORD`, `NUM` and the headline | `WORD` written as predicates (`与另一个碳原子相连`, `不与其他碳原子相连`), `NUM` as 零 … 九, the two headline sentences rewritten around them; the English "its central carbon atom, bonded to …" becomes a parenthesis | English plural and article agreement collapses to one form and the relative clause needs a Chinese order (4.1) |
| ch20/20.1/figures.js | view-switch labels `front`, `end on`, `face on`, `edge on` | 正视, 端面, 正对环面, 侧对环缘 | labels of camera views, no standard term |
| ch20/20.1/figures.js | hover name `name: \`carbon atom ${i < 6 ? \`${i + 1} of the main chain\` : …}\`` (sim-line-structures) | rewritten `${i < 6 ? \`主链的 ${i + 1} 号碳原子\` : i === 6 ? '2 号碳上甲基的碳原子' : '3 号碳上乙基的碳原子'}` | the nested template literal puts the English words between the two backticks that translation_parity.py reads as code, so its report shows one "code replace" line here; the code itself is unchanged |
| ch20/20.1/section.json | `notes`, quoted passages of the book ("2–methylpropane", "(… bonded to three other carbon atoms)", "It may be easier to see the equivalency", "spatial arrangements", "The location of the double bond") | the quotes are the Chinese sentences of text.html: “2–甲基丙烷”, “（……与另外三个碳原子相连）”, “也许更容易看出这种等价性”, “空间排布”, “双键的位置” | the note describes the Chinese text the reader sees |
| ch20/20.1/section.json | figure `sim-fractional-distillation` original_caption "(credit left: modification of work by Luigi Chiesa)" | （来源 左：改编自 Luigi Chiesa 的作品） | the book's credit formula with a position word in place of the letter label |

### ch20/20.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.2/text.html | alcohols, 3rd paragraph: "also called ethyl alcohol" | 乙醇，CH3CH2OH，英文也称 ethyl alcohol (the span stays on the English word `alcohol`) | the glossary maps both ethanol and ethyl alcohol to 乙醇, so a Chinese "also called" would repeat itself; the English synonym is kept (translate.md 4.2/4.3) |
| ch20/20.2/text.html | `<span data-concept="weight">weight</span>` in "normal body weight" | span wraps 体重 | the concept word is 重量; body weight is 体重 (chapter 1 decision) and the span wraps the whole compound |
| ch20/20.2/text.html, section.json e1 | naming alcohols: "the final -e ... replaced by -ol"; Example 20.8 solution "-ol"; e1 solution (hex-, -ane, -ene, -ol) | English affixes kept in `<em>`, each followed by the Chinese ending in quotation marks (“烷”, “醇”, “烯”, “己”) | sentences about English word endings; Chinese names change 烷 to 醇 (translate.md 4.3) |
| ch20/20.2/text.html | footnote 1 (infix, prefix, 2-propanol / propan-2-ol) | 中缀, 前缀; names as 2-丙醇 and 丙-2-醇 | the sentence is about where the locant stands in the name, kept in Chinese with the glossary names |
| ch20/20.2/text.html | MTBE sentence (alphabetical order of the groups) | 甲基叔丁基醚 with the sentence translated; "butyl", "methyl" and "英文俗名" kept in English where the sentence turns on alphabetical order | a sentence about the English ordering of names (translate.md 4.3) |
| ch20/20.2/text.html | "the common name for the compound shown in Example 20.9 is ethylmethyl ether" and "diethyl ether" in Example 20.9 | 甲乙醚 (smaller group first), 乙醚 | glossary rows ethylmethyl ether and diethyl ether; the Chinese order of mixed ethers differs from the book's alphabetical order |
| ch20/20.2/text.html | carbohydrates box: saccharide, "-ose" suffix, fructose, lactose | 糖类（saccharide，源自希腊语中表示糖的词）；后缀 -<em>ose</em>；果糖英文称“fructose”，乳糖英文称 lactose | sentences about English word origins and suffixes (translate.md 4.3) |
| ch20/20.2/section.json | e2 prompt and solution (a)–(e) | common names kept as English in parentheses after the Chinese name: 乙醇（ethyl alcohol，ethanol）, 甲醇（methyl alcohol，methanol）, 乙二醇（ethylene glycol，ethanediol）; isopropyl alcohol 异丙醇 / 2-propanol 2-丙醇; glycerine 甘油 / l,2,3-三羟基丙烷 | the exercise asks for common and IUPAC names, which are the same Chinese word in (a) to (c) (translate.md 4.5) |
| ch20/20.2/section.json | cyl2 and e3 answers; figures.js `m.common`, `noteOf` | mixed ethers named smaller group first: 甲异丙醚, 乙丁醚, 乙丙醚, 甲丙醚; the sim's note "alphabetical order" now says 先小后大 | the glossary decision for 甲乙醚; Chinese does not alphabetise the groups |
| ch20/20.2/figures.js | `ALKANE`, `STEM`, `ALKYL`, `ORD`, `m.name`, `m.parts`, `m.common`, headline `an`/`a` branch | English stems and endings (`${STEM}anol`, `${STEM}an` + `ol`, `di${ALKYL} ether`, sorted alphabetical join) replaced by Chinese stems (甲 乙 丙 丁 戊 己), 醇, 氧基, 二…醚; `parts.base` is the stem and `parts.suf` carries 醇; ordinals 第 N 个; the `an`/`a` branch is gone | grammar built from English (translate.md 4.1); the three code lines reported by translation_parity.py |
| ch20/20.2/figures.js | `groupName`, atom names | plural-free noun phrases rebuilt with 的: `${g} 基团，链的 N 号碳`, `${alk}中的 ${g} 基团` | English "of the" phrases have no Chinese counterpart in this order |

### ch20/20.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.3/text.html | spans on acids: 乙酸, 甲酸, 棕榈酸, 硬脂酸, 油酸, "palmitic and stearic acids" (`acid`) | the span wraps the whole Chinese compound (乙酸 etc.), one span over 棕榈酸和硬脂酸 where the source has one span on "acids"; plain "acids" keep the span on 酸 | the source wraps the word "acid" of "acetic acid", "formic acid", "oleic acid"; Chinese names each acid in one word, and the span stays in its block (chapter 1 precedent) |
| ch20/20.3/text.html | `<span data-concept="nitrate">nitrate</span>` in "cellulose nitrate" | span wraps 硝酸纤维素 | the Chinese name has 硝酸, not 硝酸盐; the span wraps the whole compound |
| ch20/20.3/text.html | `<span data-concept="mixtures">solution</span>` in "undissociated in solution", `unsaturated` span, `dissolved` span | spans wrap 溶液, 不饱和, 溶解的 | glossary targets of the concept terms; "水中溶解的羧酸" carries the participle |
| ch20/20.3/text.html | "the class-identifying suffixes -al and -one, respectively" | English suffixes kept in `<em>`, followed by （对应中文名称中的“醛”和“酮”） | a sentence about English word endings (translate.md 4.3) |
| ch20/20.3/text.html | "Its name comes from the Latin word formicus, which means “ant”" | Latin word kept, meaning translated | origin of a word (translate.md 4.3) |
| ch20/20.3/text.html, section.json footnote | "constitutes 3–6% vinegar" | written 占食醋的 3–6% | the book's slip is kept as printed (section.json notes); 占 is the plain Chinese verb for the share |
| ch20/20.3/text.html | ethanal (acetaldehyde), ethanoic acid (acetic acid), methyl ethanoate (methyl acetate): Figure captions and alt text | one Chinese name, the English synonym kept in parentheses: 乙醛（ethanal，即 acetaldehyde）; 乙酸（ethanoic acid，即 acetic acid）; 乙酸甲酯（methyl ethanoate，即 methyl acetate）; in the image alt 乙酸（ethanoic acid）/ 醋酸（acetic acid）, 乙酸甲酯（methyl ethanoate）/ 醋酸甲酯（methyl acetate） | the glossary maps ethanal/acetaldehyde, ethanoic/acetic acid to the same Chinese word; the figure is about the two names (translate.md 4.5); 醋酸 is only the label inside the alt |
| ch20/20.3/text.html | "Dimethyl ketone … commonly called acetone" | 二甲基酮 … 俗称丙酮 | the glossary rows dimethyl ketone and acetone |
| ch20/20.3/section.json | e4 prompt and solution: part labels | （a）…（e）, 四面体形, 平面三角形 | glossary targets; math `${\text{CH}}_{3}\text{C}\text{O}{\text{CH}}_{3}\text{:}$ kept as printed |
| ch20/20.3/figures.js | `COUNT` (`no`, `one`, `two`…), `bonds(n, w)` plural branch `${w}${n === 1 ? '' : 's'}`, headline template of sim-carbon-oxidation | `COUNT` = 零 一 两 三 四, `bonds(n)` returns `${COUNT[n]}个`, no plural branch; template in Chinese word order with the same slots: `在${t.name} $${t.tex}$ 中，碳有${bonds(ch)} C–H 键，与氧之间有${bonds(co)}键。` | English plural grammar collapses to one Chinese form (translate.md 4.1); English frame cannot carry the slots in the same order |
| ch20/20.3/figures.js | FAM `tex` `\text{aldehyde:}` etc. | `\text{醛：}` with the full-width colon | words inside `\text{}` are translated |

### ch20/20.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.4/text.html | `acid` spans in "amino acids", "deoxyribonucleic acid", "acetic acid" | the span wraps the whole Chinese compound: 氨基酸 (every "amino acid(s)", including the one in "each individual amino acid" and in "the amino acid phenylalanine"), 脱氧核糖核酸, 乙酸 (the esters "of acetic acid"); plain "acids" keep the span on 酸 | Chinese names each acid in one word; the source wraps only "acid" of "amino acid" (chapter 1 precedent) |
| ch20/20.4/text.html | `condensation` span in "condensation reactions" | span wraps 缩合 in 缩合反应 | the concept's term is 凝结 (condensation of a vapour); the organic reaction is 缩合反应 (ch20 row condensation reaction), so the span wraps 缩合, the part that names the concept's word in this sense |
| ch20/20.4/text.html | `dilute` and `acid` spans in "a dilute acid" | 稀酸 written as `<span dilute>稀</span><span acid>酸</span>` | the glossary has 稀的 (adjective); Chinese says 稀酸, the particle 的 is not written |
| ch20/20.4/text.html | `salt` span in "an ammonium salt"; `ether` span in "a methyl ether group"; `alcohol`, `ester` spans | written 铵<span>盐</span>, 甲<span>醚</span>（甲氧基）; 醇 and 酯 as the glossary | Chinese compound names; the span stays on the word that names the concept |
| ch20/20.4/text.html | `liquid` and `temperature` spans in "the temperature of liquid nitrogen" | written 冷却到<span liquid>液氮</span>的<span temperature>温度</span>; the two spans swap order, the first wraps 液氮 | Chinese word order puts the liquid first; the span wraps the compound 液氮 (glossary row liquid nitrogen); both spans stay in the block |
| ch20/20.4/text.html | `hydrogen-bonding` span in "hydrogen bonded together" (Figure 20.18 caption) | 以<span>氢键</span>结合 | the participle becomes a verb phrase around the glossary term |
| ch20/20.4/text.html | "the class-identifying suffix –ine", "the class-specific suffix -amide" | English suffixes kept in `<em>`, followed by （对应中文名称中的“胺”）and （对应中文名称中的“酰胺”） | sentences about English word endings (translate.md 4.3, as in 20.3) |
| ch20/20.4/text.html | "The name alkaloid means “like an alkali.”" | 英文名称 alkaloid（生物碱）的意思是“类似碱的” | the sentence explains the English word alkaloid (alkali + -oid); the English word is kept in parentheses so the explanation still reads (translate.md 4.3) |
| ch20/20.4/text.html | "The sugar is in turn bonded to a phosphate group (−PO₄³⁻) When new DNA is made" | translated without a full stop: …磷酸基团 $(…)$ 相连 新的 DNA 合成时… | the source's missing stop is kept as printed (section.json notes) |
| ch20/20.4/text.html, section.json | "one of which are proteins" | written 其中一种是蛋白质 | the number disagreement of the source cannot be carried in Chinese (4.1); recorded in section.json notes |
| ch20/20.4/text.html | `data-original-caption` and sim-head of Figure 20.20 | "…leads to the formation of water" written 并生成水; "switch the condensation to after" written 把缩合切换到反应后 | the control labels of figures.js (反应前 / 反应后) |
| ch20/20.4/text.html | "(credit a: modification of work by …; b: …; c: …)", "(credit: Karen Roe)" | （来源 a：改编自 … 的作品；b：…；c：…）, （来源：Karen Roe）; names kept | the chapter 1 credit formula |
| ch20/20.4/text.html | Kevlar box, "Stephanie Kwolek" | 凯夫拉 throughout; "Stephanie Kwolek" written 斯蒂芬妮·克沃勒克（Stephanie Kwolek） once at first mention, in the box's first paragraph | glossary rows kevlar and stephanie kwolek; the English name is given once because the Chinese rendering is not standard (doubt) |
| ch20/20.4/text.html | image alt texts | spoken formulas of the source kept in spoken form: "C H subscript 3" written C H 下标 3, "H superscript plus" H 上标加号, "R prime" R′, "3 prime and 5 prime" 3′ 和 5′; "s p superscript 2" s p 上标 2 | alt text is read aloud; the source spells formulas letter by letter (as 20.3) |
| ch20/20.4/text.html | functional-group table alt: "ethanoic or acetic acid", "ethanamide or acetamide", "methyl ethyl ketone" | 乙酸（ethanoic acid）或醋酸（acetic acid）, 乙酰胺（ethanamide 或 acetamide）, 甲乙酮（methyl ethyl ketone） | the glossary gives one Chinese word for both English names; the alt is about the two names (translate.md 4.5, as in 20.3) |
| ch20/20.4/text.html | PASGT | PASGT（地面部队个人护甲系统） | an English acronym with a Chinese expansion |
| ch20/20.4/text.html | "Kevlar based clothing", "Kwolek's work" | 凯夫拉服装, 克沃勒克的工作 | English possessive and compound adjective become a Chinese compound |
| ch20/20.4/figures.js | fig-amines `head()` | templates rewritten in Chinese word order with the same slots: `${a.name}的孤电子对与一个氢离子成键，${a.ion}中氮形成四个键。` and `在${a.name}中，氮与${a.bonds}成键，并保留一对孤电子对。` | English frame cannot carry the slots in the same order (chapter 1 precedent) |
| ch20/20.4/figures.js | fig-amines `AM[...].bonds` | "three hydrogen atoms", "one carbon atom and two hydrogen atoms" … written 三个氢原子, 一个碳原子和两个氢原子 … | English plural and conjunction grammar collapse to the Chinese form (4.1) |
| ch20/20.4/figures.js | fig-amines hover names and 3D view buttons | `'methyl group, CH₃'` 甲基，CH₃; `'carbon atom of a methyl group'` 甲基的碳原子; `'front'`, `'above'` 正视, 俯视 | English genitive phrase; Chinese puts the qualifier first |
| ch20/20.4/figures.js | sim-peptide `NUM`, `head()` | `NUM` = `['', '一', '两', '三', '四']`; the headline `${NUM[n]}个氨基酸通过${NUM[k]}个肽键连接，脱去${NUM[k]}个水分子。`; the plural variable `s` and `.toUpperCase()` capitalisation removed | English plural branch and sentence-initial capital (4.1); the code around stays |
| ch20/20.4/figures.js | sim-peptide `CHAIN`, readout `\text{amino acids}` | `二肽 / 三肽 / 四肽`; `n\ \text{个氨基酸}` (digit before the noun, 个 as measure word) | Chinese counts with a measure word; the digit stays as printed |

### Chapter 20: Owner notes

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch20/20.1/text.html | footnote 2 (Peplow, Mark. “Organic Synthesis: The Robo-Chemist,” <em>Nature</em> 512 (2014): 20–2.) | kept as printed | a bibliographic reference: names of an author, an article and a journal; English by design (translate.md 5) |
| ch20/20.2/text.html | 乙醇，CH3CH2OH，英文也称 ethyl alcohol; MTBE sentence ("butyl", "methyl"); 果糖英文称 “fructose”, 乳糖英文称 lactose; saccharide; `-ose` | English words, suffixes and Greek origins kept in Latin letters inside the Chinese sentence | the sentences are about the English words themselves (translate.md 4.3); each is a recorded scenario above |
| ch20/20.3/text.html, ch20/20.4/text.html | `<em>-al</em>`, `<em>-one</em>`, `<em>–ine</em>`, `<em>-amide</em>`, alkaloid, `formicus`, Stephanie Kwolek (斯蒂芬妮·克沃勒克（Stephanie Kwolek） once), PASGT, the English synonyms in parentheses (ethanal, acetaldehyde, ethanoic acid, methyl ethyl ketone …) | English kept where the sentence or the figure is about the English name | recorded scenarios above; 斯蒂芬妮·克沃勒克 is not a standard rendering (doubt) |
| ch20/20.1/section.json | e11 prompt (d), image alt says "double bonded" while the answer is 1-butyne | alt translated as printed (双键) | a slip of the source alt stays (translate.md 3.2); the owner may want it corrected upstream |
| ch20/20.1/section.json, ch20/20.2/section.json, ch20/20.3/section.json, ch20/20.4/section.json | `notes` | list the source's own slips that the translation keeps: 20.1 en dash in 2–methylpropane, the sentence with no stop, the unclosed parenthesis, "spatial arrangements", the empty superscript after 120°, the stray bold, 6H₂O in the formula of fs-idp68973952; 20.2 "the compound shown in Example 20.9", "–R–O–R– group"; 20.3 "3–6% vinegar", the vapor-pressure comparison, the missing double bond in fs-idp58454944 (e); 20.4 the missing stop after "(−PO₄³⁻)", "one of which are proteins", "bonded to one or more alkyl group", "CH₃CH(Cl)H(Cl)CH₃", "pyridium ion" (written 吡啶鎓离子) | the translation keeps the source as printed (translate.md 3.2); the corrections are for the owner to decide upstream |
| ch20/20.4/text.html | functional-group table alt: "(C₂H₅)₂O which is named ethanal" | written 名为乙醛, as printed | the book's slip (ethoxyethane is diethyl ether) is not corrected in alt text |
| ch20/20.4/section.json | e55, e57, e61, e63 part labels and e57 "electron domain geometries" | （a）（b） in prose; 电子域几何构型 (glossary row electron domain geometry) | the ch01 part-label decision; `answer.parts[].part` keeps the source's English label `(a)` as in ch01 |
| `glossary.zh-CN.json` (20.2 rows) | butyl ethyl ether 乙丁醚, ethyl propyl ether 乙丙醚, methyl propyl ether 甲丙醚, isopropylmethyl ether 甲异丙醚 | mixed ethers named smaller group first, as 甲乙醚 | the book lists the groups alphabetically (English); Chinese practice puts the smaller group first. Doubt, confirm at termonline |
| `glossary.zh-CN.json` | rows with `"confirm": "termonline"` (275 of 355) and `"confirm": "owner"` (46) | targets taken from 《化学名词》 naming rules or standard textbook usage, not looked up at termonline.cn | the systematic names (the 2017 substitutive rules) are built, not looked up; doubtful rows: 乙酸纤维素 (醋酸纤维素 is the everyday word), 甲基苯基缩水甘油酸乙酯, 植物次生化合物 (usual 植物次生代谢产物), 精神活性的, 麻醉药 (麻醉性镇痛药), 低温学, 呼气检测 (owner) |
| ch20/20.4/text.html, section.json | 糖–磷酸骨架 | the en dash of the ch10 row sugar-phosphate backbone, where the page had a hyphen | one target for one source across chapter glossaries (chapter sweep) |
| ch20/20.1 to 20.4 section.json | `exercise_notes`, `notes` apparatus words | 布鲁姆层级, 书后答案, 建议思路, “学习链接”, 由 AI 生成 | the ch01 Pass 4 wording; the pages had Bloom 层级, 答案册, 答案表, 建议解法 and “链接到学习” (chapter sweep) |
| ch20/20.1/text.html | Figure (ethene + Cl₂) alt: "the structural formula of ethane is shown" | written 乙烷, as printed (review pass 1 finding 12; the first pass had silently corrected it to 乙烯) | the book's slip in alt text is kept, like "ethanal" in 20.4 and "double bonded" in e11; listed in 20.1 `notes` |
| ch20/20.2/text.html | Figure 20.12 caption: "fructose, a five-carbon monosaccharide" | written 果糖（一种五碳单糖）, as printed | the book's slip (fructose is C₆); listed in 20.2 `notes` (review pass 1 finding 13) |
| ch20/20.2 to 20.4 | review pass 1 findings declined: #8 (20.3 分子构型 → 分子结构), #19 (octane enhancer 辛烷值助剂 → 辛烷值改进剂), #30 (按重量计 → 质量分数) | kept 分子构型, 辛烷值助剂, 按<span>重量</span>计 | #8: ch7 row Molecular structure is 分子构型 and the `molecular-structure` span in this chapter reuses it; #19: the ch13 row octane enhancer is 辛烷值助剂 (one target per source, a change belongs to ch13's owner); #30: the `weight` concept span must stay and the shared row weight is 重量; "按重量计" is the common wording of a mass percent |

## Chapter 21 sections

The merge dropped the rows that the book-level rows cover (figure and sim eyebrows, figure citations, table eyebrows, photo credits: they are in "Every page") and added the rows for the spans whose text does not contain the glossary target of their concept. The part labels between the equations of the pure-math solutions of 21.2 and 21.3 were half-width in the pages and are now （a）（b）, so those rows say so.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.1/text.html, ch21/21.2/text.html, ch21/21.3/text.html, ch21/21.4/text.html, ch21/21.5/text.html, ch21/21.6/text.html (and the spans inside section.json strings) | spans on 结合能, 摩尔结合能, 比结合能曲线, 能级, 热能 (`energy-and-work`), 氢气, 氡气 (`gas`), 内层电子 (`shell`, `electron`), 衰变 inside 衰变方式, 定律 inside 守恒定律, 电离 (`ion`), 热 (`heat-flow`), 重水, 燃气管道 | the span wraps the whole Chinese compound or only the word that carries the concept; the glossary targets are 能量, 气体, 电子层, 放射性衰变, 离子, 热量 | the source wraps one English word of "binding energy", "hydrogen gas", "modes of decay" and so on; Chinese names each in one word (translate.md 3.3, the span stays in its block, as in ch01); the page rows below give the individual cases |
| every text.html | figure and sim eyebrows | `Figure 21.N`, `Figure 21.14 + 21.15`, `Figure 21.5 + 21.7`, `Sim` kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6), as in ch01 |
| every text.html, section.json | figure citations in the prose and the captions | written 图 21.N, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book in ch01 |
| ch21/21.1/text.html, ch21/21.3/text.html, ch21/21.6/text.html | table eyebrows `Table 21.1` to `Table 21.5` | written 表 21.1 to 表 21.5 | translate.md 5 lists a table's eyebrow as translated; the checker and `translation_parity.py` read only the Figure and Sim eyebrows. 21.6 had left `Table 21.4` and `Table 21.5` in English; the merge changed them |
| every text.html, 21.4 and 21.5 and 21.6 section.json | photo credits (21.3 1, 21.4 4, 21.5 4, 21.6 2 in text.html and 3 in section.json strings) | one formula: （来源：X）, （来源：改编自 X 的作品）, lettered （来源 a：…；b：…）; names and organisations kept as printed (Nuclear Regulatory Commission, Department of Energy, Department of the Navy, US Department of Agriculture, Wikimedia Commons, Flickr in English); a space before an opening quote (改编自 “Mike” Michael L. Baird) | the ch01 formula. "(source: U.S. Nuclear Regulatory Commission)" on Figure 21.37 was 美国核管理委员会 on 21.6 and English on 21.4; the merge made both English (organisations in credits are kept, ch01 USGS, NIH, NIST). The 21.6 table note "Source: US Environmental Protection Agency" follows (来源：US Environmental Protection Agency). Two 21.4 credits had no space before the quote and were changed |
| ch21/21.1/text.html, ch21/21.2/text.html, ch21/21.3/section.json, ch21/21.4/text.html, ch21/21.5/text.html | inline `$…$` that ended with the source's clause punctuation (`${}_{1}^{1}\text{H},$ 除外）`, `${}_{43}^{99}\text{Tc}.$`, `${\text{MoO}}_{4}{}^{2−};$`, the He, O, Ca, Pb list) | the ASCII comma, period or semicolon is taken out of the TeX; the Chinese mark is put outside (`$…$ 除外）`, `$…$ 衰变的速率常数。`, `$…$ 的一部分；`), and the list reads `$…$、$…$、$…$ 和 $…$ 称为` | the word order of Chinese moves the math next to words, so the kept punctuation would sit mid-sentence (translate.md 4.4); the ch04 and ch10 sweeps made the same change. Review pass |
| ch21/21.1/text.html, ch21/21.2/text.html, ch21/21.6/text.html | `\text{with}` (Example 21.1), `\text{radiation}` (21.6), `\text{或 A}` and `\text{且 Z}` (Example 21.4) | `\text{其中}`, `\text{辐射}`, `\text{即 A}`, `\text{即 Z}` | words inside `\text{…}` are translated (translate.md 5); the book's "or A = 28" and "and Z = 13" mean "so", not an alternative. Review pass |
| every text.html and section.json | a span of `gamma-ray`, `alpha-particle`, `alpha-decay` that begins with a Greek letter, after a Chinese character | a space before the span (和 <span>γ 射线</span>, 一种 <span>α 发射体</span>), and before 有 / 中 after `</span>` of a nuclide or `例 21.1` | the space between CJK and Latin or Greek letters and digits holds across a tag boundary (ch01 rule). Review pass |

### ch21/intro

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/intro/text.html | `<em>electronic</em> structure` / `<em>Nuclear</em> structure` | written `<em>电子</em>结构` and `<em>核</em>结构`; the contrast is kept in the em | the Chinese terms are 电子结构 and 核结构, so the emphasised word is the modifier |
| ch21/intro/text.html | `Antoine Becquerel` | rendered 安托万·贝克勒尔（Antoine Becquerel） as the chapter has it | name kept as the book prints it (the physicist was Henri Becquerel); Latin form added once for the reader |

### ch21/21.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.1/text.html, ch21/21.1/section.json | every `energy-and-work` span inside "binding energy" (Example 21.2 and 21.3, #per-nucleon; e.g. `binding <span>energy</span>`) | the span wraps the whole compound 结合能, 摩尔结合能, 比结合能曲线 | the source wraps the one word "energy" of "binding energy", "molar binding energy", "binding energy curve"; Chinese names each in one word that contains 能 and not 能量 (translate.md 3.3, the span stays in its block) |
| ch21/21.1/text.html | #magic, "stable electron shells" (`electron` and `shell` spans) | `<span data-concept="shell"><span data-concept="electron">电子</span>层</span>`, the electron span nested in the shell span | the glossary row for shell is 电子层, which contains the word 电子; two adjacent spans cannot both wrap it (translate.md 4.5) |
| ch21/21.1/text.html | #stability, "(also called the belt, zone, or valley of stability)" | written （也称为稳定地带、稳定区或稳定谷） | the glossary target of band is 稳定带, and 带 also renders belt; belt is written 稳定地带 and the three names are pending terms (translate.md 4.5) |
| ch21/21.1/text.html | #nucleus, "(for example, ${}_{\;6}^{14}\text{C}).$" | the parenthesis is written half-width: `(例如 ${...}\text{C}).$` | the closing parenthesis is inside the math of the source and must stay; the opening one is made to match |
| ch21/21.1/text.html | #strong-force, "The strong force is one of the four fundamental forces" (span `strong-nuclear-force`) | the span wraps 强力 (glossary row for strong force), not 强核力 | the source text says "strong force"; the glossary has separate rows for strong force and strong nuclear force |
| ch21/21.1/text.html, ch21/21.1/section.json | "grams per cubic centimeter", "joules per mole of nuclei", "MeV per nucleus", "MeV/nucleon", "6.022 × 10^23 nuclei" (display math), "4 nucleons" | written 克/立方厘米, 焦耳每摩尔原子核, MeV 每个原子核, MeV/核子, `\text{个原子核}`, `\text{4 个核子}` | unit phrases that carry English words; the unit symbols stay, the nouns take Chinese (4.4). The kept `answer.unit` "MeV/nucleon" of cyl3 and e17 is machine data and stays as printed |
| ch21/21.1/text.html | Example 21.1, "2.4 solar masses", "1 solar mass" (span `mass`) | written 2.4 个太阳质量, 1 个太阳质量, the span on 质量 | the glossary row is 太阳质量; the span wraps the word 质量 inside it |
| ch21/21.1/text.html | Example 21.1 (b) | "a uranium nucleus, which has a diameter of about 15 fm" becomes 直径约为 15 fm 的铀原子核 | the relative clause becomes a pre-modifier, the Chinese order; the spans stay in the block |
| ch21/21.1/text.html | #binding, "calculated and experimentally measured masses" (one `mass` span) | written 计算得到的与实验测得的质量, one 质量 under the span | Chinese does not repeat the noun, and a second span would be added |
| ch21/21.1/text.html, ch21/21.1/section.json | Example 21.3 "the number or nucleons" (book typo) and notes | the typo is not reproduced (核子数); the section note says the book prints "number or nucleons" | a misprint of English letters cannot be carried into Chinese (4.3) |
| ch21/21.1/figures.js | `NAME`, `NUC` names, `CHOICES`, the select value `'铁-56'` | the element names and the nuclide names (`iron-56` etc.) written in Chinese (铁-56), as one string used for the option label, the hover and the headline; the referent ids in `REFS` (`'nitrogen-14'`, `'iron-56'`, `'lead-207'`) stay as ids | the nuclide name is displayed, and the code uses it as the key of `BY`, so the key and the display are changed together |
| ch21/21.1/figures.js | topline `${q.name[0].toUpperCase() + q.name.slice(1)} is … amu lighter than its … protons, … neutrons and … electrons.` | rewritten `${q.name} 比其 ${q.Z} 个质子、${q.N} 个中子和 ${q.Z} 个电子轻 ${q.dm.toFixed(4)} amu。`; the capitalising code is dropped, the slots keep their values | English capitalisation of a name has no Chinese form; Chinese word order for the comparison (4.1) |
| ch21/21.1/figures.js | hover `${NAME[i]}-${A}: ${Z} protons, … neutrons, stable`, `${q.name} nucleus: …`, `MeV per nucleon` | written with the measure word 个 (`${Z} 个质子`), `MeV/核子` | English plural nouns after a number collapse to one Chinese form with a measure word (4.1) |
| ch21/21.1/text.html, ch21/21.1/section.json | spans `atomic-mass-unit` on 原子质量（amu）, `nuclear-binding-energy` on 结合能 (3) | the Chinese span wraps the same extent as the source's "atomic mass (amu)" and "binding energy"; the glossary targets are 原子质量单位 and 核结合能 | the source wraps the short English form, the glossary row binding energy is 结合能 (translate.md 3.3, merge sweep) |
| ch21/21.1/section.json | exercise cyl2 solution `148.4 MeV` | kept as printed | a number and a unit symbol only, no word to translate (translate.md 5; as the number-only solutions of 21.3) |

### ch21/21.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.2/text.html | particles, "the same energy level" (span `energy-and-work`) | the span wraps 能级 (the whole compound), where the concept word is 能量; the "energy state" spans wrap 能量 in 能量状态 | Chinese names an energy level in one word 能级 (glossary ch07); the span cannot wrap only "energy" (translate.md 3.3) |
| ch21/21.2/text.html | particles, "nuclear energy shells" | written 核<span>能量</span><span>壳层</span>; the three energy spans and the shell span kept in the block | all spans of the source sentence kept; 核能量壳层 is the word-for-word form of the book's phrase |
| ch21/21.2/text.html | balancing, "conservation laws" (span `scientific-law`) | the span wraps 定律 inside 守恒定律 | the concept word is 定律; 守恒 stays outside |
| ch21/21.2/text.html, section.json | "alpha (α) particles", "beta (β) particles", "gamma (γ) rays" (summary_html, lead) | written α 粒子, β 粒子, γ 射线 (the English name of the Greek letter is not repeated); "gamma rays (γ)" in the annihilation paragraph written γ 射线（γ） | the Chinese names are the Greek letter plus 粒子/射线 (glossary 21.2); 阿尔法 would not be used |
| ch21/21.2/figures.js | sim-nuclear-balance hover name `${...} protons, ${...} neutrons`, `'a neutron'`, `'a proton'` | written `${n} 个质子，${m} 个中子`; the articles dropped (中子, 质子) | English plural branch and article collapse to one Chinese form (translate.md 4.1) |
| ch21/21.2/figures.js | sim-nuclear-balance, `headlineOf` templates (5 sentences) | rewritten in Chinese order with the same slots (`当 A = ${a}、Z = ${z} 时，…`); "come to" written 之和 | English sentence frames cannot carry the slots in the same order |
| ch21/21.2/figures.js | sim-particles, description lines | the two-line English descriptions re-broken at Chinese phrase boundaries (same number of lines) | line breaks fall where English phrases end |
| ch21/21.2/figures.js | sim-nuclear-balance reaction menu | labels 'Curie, 1898', 'Rutherford, 1919', 'Chadwick, 1932', 'Segre and Perrier, 1937' written 居里，1898 … with the surnames alone | surnames only, as the menu prints them; the full names are in the glossary |
| ch21/21.2/section.json | exercise e3 prompt | "the missing species" written 缺失的粒子 | 'species' here names the missing particle of a nuclear equation; 物种 would read as a biological term |
| ch21/21.2/section.json | exercises cyl1, e3, e4 solutions | the equations kept as printed (pure math); the part labels between them written full-width （a）–（d） | pure-math solutions may remain (translate.md 5); the labels are prose-level text and take （a）（b） like every chapter (merge sweep) |
| ch21/21.2/text.html | spans `balanced-nuclear-equation` on 核反应总是配平的 and `balancing-nuclear-equations` on 配平反应 | the span wraps the clause of the source ("a balanced nuclear reaction equation", "balancing the reaction") | the source's spans wrap a phrase; the glossary targets are 配平的核反应方程 and 补全核反应方程 (merge sweep) |

### ch21/21.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.3/text.html | #types, "Alpha (α) decay", "Beta (β) decay", "Gamma emission (γ emission)" and the same words in summary_html | written α 衰变, β 衰变, γ 发射 (the span wraps the glossary target); the English name of the Greek letter is not repeated | the Chinese names are the Greek letter plus 衰变/发射 (glossary rows alpha (α) decay, beta (β) decay, gamma emission); 阿尔法 would not be used (as in ch21/21.2); "Positron emission (β+ decay)" keeps its parenthesis |
| ch21/21.3/text.html | #types, "inner shell electron" (2 occurrences) | written 内<span shell>层</span><span electron>电子</span>: the `shell` span wraps 层 alone, the `electron` span 电子 | the glossary row inner shell electron is 内层电子, and the shell target 电子层 does not occur in it; the two spans stay adjacent (translate.md 4.5) |
| ch21/21.3/section.json | lead, "modes of decay" (span `radioactive-decay`) | the span wraps 衰变 inside 衰变方式 | the concept word is 衰变; 方式 stays outside (translate.md 3.3) |
| ch21/21.3/text.html, section.json | "the species in one chain", "the species involved" (#series) | written 核素 | species here means the nuclides of the chain; 物种 would read as a biological term (as ch21/21.2 e3) |
| ch21/21.3/text.html | #series, "chains of successive disintegrations, or decays" | written 相继衰变的链 (one word 衰变) | the glossary row disintegration is 衰变, the same word as decay; the doublet collapses |
| ch21/21.3/text.html, section.json | #series, "the actinide series" (span `actinide`), notes, footnote c-actinium-series | the text keeps the book's error: 锕系 (glossary actinide series), the span on 锕系; the footnote names the English in parentheses (actinide series, actinium series 锕铀系) | 锕系 is both the series of elements and, in the short form, the decay series; the footnote has to show which English word the book printed (translate.md 4.2/4.3) |
| ch21/21.3/text.html | #half-lives, "amount of material", "the amount of the substance", "the amount, N" | written 物质的多少, 该物质的多少, 数量 | 物质的量 is reserved for amount of substance (mol); these are quantities of matter (ch01 decision) |
| ch21/21.3/text.html | #half-lives, "$\klamdecay$ = the decay constant for the particular radioisotope" | written $\klamdecay$ = 衰变常数，对应于特定的放射性同位素 | the three spans keep their order (decay rate, decay constant, radioisotope), which the natural order 特定放射性同位素的衰变常数 would reverse |
| ch21/21.3/text.html | #half-lives, "The decay constant, λ, which is the same as a rate constant discussed in the kinetics chapter." | kept a fragment: 衰变常数 $\klamdecay$，也就是动力学一章中讨论的速率常数。 | the source has no main verb and the section note records it as printed |
| ch21/21.3/text.html | #half-lives, Example 21.5 (b), "…is given by $\frac{N_t}{N_0}.$" and the prompt/solution math ending in `.` or `,` (cyl1, e9, e13, #carbon-14 isotopes list, Example 21.5 Co-60 → Ni-60) | the ASCII period or comma stays inside the math (…为 $\;\frac{{N}_{t}}{{N}_{0}}.$ 把一级关系式…); the Chinese sentence continues after a space | punctuation inside math is ASCII and the math is kept byte for byte (translate.md 3.5, 5) |
| ch21/21.3/text.html | display math: `\text{or}` (5 equations), `{\text{Rate}}_{t}` and `{\text{Rate}}_{0}` (Example 21.6), `\text{dis/min/g C}` (Example 21.6) | `\text{或}`, `\text{速率}`, `\text{次衰变/min/g C}` | words inside `\text{}` are translated, unit symbols min and g stay (translate.md 5); dis is an abbreviation of disintegrations, not a unit symbol |
| ch21/21.3/text.html, section.json, figures.js | "disintegrations/min/g of C", "disintegrations per minute per gram of carbon", "dis/min/g", "dis/min/g C" (Example 21.6, cyl2, sim-carbon-dating) | written 每分钟每克碳 N 次衰变 in prose (the `rate` span wraps all of it), 次衰变/min/g C in labels, hover names and the unit | dis is the book's abbreviation of disintegrations; the Chinese counts 次衰变, with min and g kept |
| ch21/21.3/text.html, section.json | "4.5 billion years", "1.25 billion years", "48.8 billion years", "4.4 billion years", "1.7 billion years", "3.8 billion years" (e14 solution); "1 part per trillion", "one in a trillion" | written 45 亿年, 12.5 亿年, 488 亿年, 44 亿年, 17 亿年, 38 亿年; 万亿分之一 | Chinese counts in 万 and 亿 (translate.md 4.4; precedent ch01, ch07, ch09); 万亿 is 10^12; the math 4.5 × 10^9 y and 1.7 × 10^9 y are kept |
| ch21/21.3/text.html | #half-lives, "(Rg for roentgenium)" | written （Rg 代表𬬭） | the glossary row roentgenium is 𬬭; the English sentence names the element by its symbol and name |
| ch21/21.3/text.html | Table 21.2 footnote, "The “m” in Tc-99m stands for “metastable,”" | written Tc-99m 中的“m”代表“亚稳态”（metastable） | the sentence is about the English letter m; the English word is kept in parentheses (translate.md 4.3) |
| ch21/21.3/text.html, section.json | #carbon-14, "as seen is gas samples found trapped in ice" (book misprint) and notes | the misprint is not carried: written 这一点可以从冰中封存的气体样品看出; the section note says the book prints “as seen is gas samples” | a misprint of English letters cannot be carried into Chinese (translate.md 4.3, as ch21/21.1) |
| ch21/21.3/text.html, section.json | "Section 21.5" (footnote c-tc99m-half-life), "Appendix M" | written 21.5 节, 附录 M | the Chinese names the part by its number |
| ch21/21.3/section.json | solutions that are only a number with a unit symbol: cyl3 `3.7 × 10<sup>9</sup> y`, e12 `2 × 10<sup>3</sup> y`, e13 `0.12 h<sup>–1</sup>`, e16 `17.5 MeV`; and the pure-math solutions e9 and e17 (equations with the part labels between them) | kept as printed, the part labels written full-width （a）–（d） | pure math or number and unit symbol only; no word to translate (translate.md 5; as ch21/21.2) |
| ch21/21.3/section.json | e1 solution "η (neutrons)" | η kept, the neutron written 中子; footnote c-e1-n says the key writes η | the answer key is carried as printed |
| ch21/21.3/section.json | e9 prompt, "the formation of Po from U, which proceeds by a series of decay reactions involving the step-wise emission of …" | written 由 U 形成 Po 的每一步…; the two nuclides stand in the Chinese order (U first) | Chinese 由…形成 puts the source first (the formulas are unchanged) |
| ch21/21.3/section.json | e14 prompt, "younger, older, or the same age" | written 更年轻、更古老还是年龄相同 | the English comparison of ages has no one-word Chinese form |
| ch21/21.3/section.json | e11 prompt "What fraction of … will be present in 1000 y?" | written 还剩下多大的比例 | the English question frame is rebuilt in Chinese order |
| ch21/21.3/figures.js | sim-decay-series, `ro.set(...)` note: `(na === 1 ? 'decay' : 'decays')`, `(nb === 1 …)`, `(left === 1 ? ' step remains' : ' steps remain')` | the three plural branches removed: 此步之后：N 次 α 衰变和 N 次 β 衰变；距铅-206 还剩 N 步。 | English plural branches collapse to one Chinese form (translate.md 4.1); the code around them stays |
| ch21/21.3/figures.js | sim-half-life, hover `k + (k === 1 ? ' half-life, ' : ' half-lives, ')` | the branch removed: 经过 k 个半衰期 | English plural branch (translate.md 4.1) |
| ch21/21.3/figures.js | `NUC` and `MODES` element names (`'uranium'` …, 4th field) | written 铀, 钍, 镤, 镭, 氡, 钋, 铅, 铋, 碘, 氙, 钴, 氧, 氮, 钾, 氩, 钍 as one string used by `name()` and `long()` for the hover, the headline and the option text (铀-238) | the nuclide name is displayed and built as element name + "-" + mass number; the elements have Chinese names (as ch21/21.1) |
| ch21/21.3/figures.js | sim-decay-modes, caption of the nucleus: `'parent ' + name(M.P)`, `'daughter ' + name(M.D)` | written 母核铀-238, 子核钍-234 (no space between the Chinese word and the name) | the Chinese label is joined to the nuclide name; 母核/子核 are the glossary targets |
| ch21/21.3/figures.js | sim-rays-field, hover on the plates: `'the plate charged ' + (st === 'up' ? 'positive' : 'negative')`; `dir()` readout `', toward }'` | written 极板带正电/负电; 向上，朝 +/− in `\text{}` | English phrase rebuilt in Chinese order; the `\text{}` words are translated, `hue(...)` kept |
| ch21/21.3/figures.js | all hover names, headlines and notes that mix words and slots (e.g. sim-half-life `topline`, sim-carbon-dating `topline`, readout notes, `'样品：' + left + ' 个…（共 ' + NN + ' 个）'`) | rewritten in Chinese order with the same slots in the same order, articles dropped (一个, 一棵 where the Chinese needs a measure word) | English articles and plural nouns after a number take a measure word or none in Chinese (translate.md 4.1) |
| ch21/21.3/figures.js | sim-carbon-dating, detent label `'King Tut'` | written 图坦卡蒙 | the king's name; the glossary row Tutankhamun |
| ch21/21.3/text.html, ch21/21.3/section.json | spans `first-order-integrated-rate-law` on 一级动力学, `radioactive-decay-rate` on 衰变速率 and 活度, `atomic-number-and-mass-number` on 原子序数, `radiometric-dating` on 测年, `radioactive-decay-series` on 衰变系, `gamma-ray` on γ 辐射 | the Chinese span wraps the same extent as the source's ("first-order kinetics", "rate of decay", "activity", "atomic number", "radiometric dating", "gamma radiation") | the source puts the concept on a related or narrower phrase; the glossary rows are 一级积分速率定律, 放射性衰变速率, 原子序数与质量数, 放射性测年, 放射性衰变系, γ 射线 (merge sweep) |

### ch21/21.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.4/text.html | #nuclear-age to #fusion, bare "chain reaction" (many spans `chain-reaction`) | written 链式反应; the defining strong "nuclear chain reaction" written 核链式反应 (glossary row nuclear chain reaction) | the source says chain reaction in most places and nuclear chain reaction once; the glossary has only the long form, and 链式反应 is the short form of the same term (pending row) |
| ch21/21.4/text.html | #fission, "fissile or fissionable" (strongs and spans `fissile-material`) | written <strong>易裂变</strong>材料或<strong>可裂变</strong>材料, each span on the adjective (易裂变 / 可裂变) and 材料 outside; in the later "fissionable material" the span wraps 可裂变 | the glossary has 易裂变材料 and 可裂变的 as two words, but the span wraps the word that names the property, as the source wraps only "fissionable" (translate.md 3.3) |
| ch21/21.4/text.html | #fission, "binding <span energy>energy</span> graph near 56" | written 结合<span energy>能</span>图; the span wraps 能 alone | 结合能 is one word in Chinese; the span stays in its block (translate.md 3.3) |
| ch21/21.4/text.html | #containment, Three Mile Island paragraph, "radioactive decay <span heat>heat</span>" | written <span radioactive-decay>放射性衰变</span><span heat-flow>热</span> (glossary decay heat 衰变热); the heat span wraps 热 alone | the glossary term is 衰变热, so the heat span cannot carry 热量; the two spans stay adjacent and in order |
| ch21/21.4/text.html | #containment, "hydrogen gas" (3 spans `gas`: Three Mile Island, Fukushima) | the span wraps 氢气 (and in 氢气和空气 the plain word 氢气 stays outside); "radioactive gases" has the span on 气体 | Chinese names hydrogen gas in one word, 氢气; 氢气体 would be wrong (as 天然气 in ch01) |
| ch21/21.4/text.html | #fuels, "gaseous diffusion" and "gas centrifuge" | written 气体扩散 with the `diffusion` span on 扩散 only, and <span gas>气体</span>离心机 (glossary gas centrifuge 气体离心机) | the source spans "diffusion" alone and "gas" alone; Chinese joins 气体 to its noun |
| ch21/21.4/text.html | #synthesis, #fission, "2.5 million times", "over 3 million times"; #fusion | written 250 万倍 and 300 多万倍; 3.6 × 10<sup>11</sup> and other printed numbers kept | Chinese counts in 万 (translate.md 4.4; as "300 trillion" in ch01/1.2) |
| ch21/21.4/text.html, ch21/21.4/figures.js | "17 mile", "12.4 miles", "150 gallons", "several pounds", "a ton"; hover names | written 17 英里, 12.4 英里, 150 加仑, 几磅, 一短吨 (the book's ton is the US short ton, 2000 lb); kilojoules written 千焦, grams 克 | units with no SI equivalent take the Chinese name in prose (translate.md 4.4; ch01 decisions 短吨 and 磅) |
| ch21/21.4/text.html | #nuclear-age, #synthesis, "Chemistry in Everyday Life feature that follows" | written 下面的“日常生活中的化学”专栏 (glossary row Chemistry in Everyday Life) | the book's apparatus label is quoted as a title |
| ch21/21.4/text.html | CERN box, "the CERN (“Conseil Européen pour la Recherche Nucléaire,” or European Council for Nuclear Research) Laboratory" | written CERN（“Conseil Européen pour la Recherche Nucléaire”，即欧洲核子研究委员会）实验室; the French name is kept as printed and the English gloss rendered 欧洲核子研究委员会 (glossary rows CERN, European Council for Nuclear Research); the glossary form 欧洲核子研究中心（CERN） is not used here | the sentence spells out the abbreviation, and the glossary target would repeat the explanation twice (translate.md 4.3) |
| ch21/21.4/text.html | #fission, "Fritz Strassman" | written 弗里茨·施特拉斯曼 (glossary row Fritz Strassman); the notes in section.json keep "Strassman" in Latin letters as the spelling the book prints | a spelling note (translate.md 4.3); the person's name has its standard rendering |
| ch21/21.4/section.json, text.html | sim-fission, sim-chain, sim-reactor `original_caption` and `data-original-caption`: "(Figure 21.14) … (Figure 21.15) …" | the book's two figure labels written （图 21.14）…（图 21.15）… and the part labels （a）（b） | figure citations are translated (translate.md 4.6) |
| ch21/21.4/figures.js | sim-fission, `NUM = ['', 'one', 'two', 'three']`; headline "Uranium-236 splits into … and sets N neutrons free." | `NUM` becomes ['', '一', '两', '三']; the headline is rewritten 铀-236 分裂为 … ，并释放出 N 个中子。 with the same slots in the same order; the plural "neutrons" has one Chinese form | English plural and word order (translate.md 4.1) |
| ch21/21.4/figures.js | hover names of sim-fission, sim-chain, sim-reactor ("a neutron", "a fuel rod …", "the lighter fission fragment, " + …) | articles dropped (一个/一根 kept where Chinese counts the object); the leading "the" of the fragment names written 较轻的/较重的 | English articles have no Chinese form (translate.md 4.1) |
| ch21/21.4/figures.js | sim-reactor, hover name `'the fission rate after ' + fmt(gEnd, 1) + ' generations: ' + (pv < 0.01 ? 'almost nothing' : fmt(pv, 2) + ' times its start')` | written `'经过 ' + fmt(gEnd, 1) + ' 代后的裂变速率：' + (pv < 0.01 ? '几乎为零' : '为初始值的 ' + fmt(pv, 2) + ' 倍')` | Chinese puts the multiple after 为初始值的; the slot order of the else branch changes (the one translation_parity line left) |
| ch21/21.4/figures.js | sim-chain, headline branches ("Each fission sends only … neutrons on to split another nucleus, so the chain dies out: a subcritical mass.") | the three sentences keep their slot (the value of k) and the conclusion after the colon; "another nucleus" / "other nuclei" written 另一个原子核 / 其他原子核, and the plural of "neutrons" has one Chinese form | English singular and plural (translate.md 4.1) |
| ch21/21.4/section.json | e1 solution (a)–(d) | the part labels "(a)" to "(d)" written （a）to（d）; the equations and their `;` inside math kept | part labels in prose are full-width (ch01 decision); the solution is pure math otherwise |
| ch21/21.4/section.json | notes, the quoted spans "any radioactive materials might be released" and "Strassman" | kept in English inside the Chinese note | the note names the source's wording, which the translation does not repeat (translate.md 4.3) |
| ch21/21.4/text.html | spans `hydrogen-isotopes` on 重水, `nuclear-transmutation` on 嬗变, `reaction-rate` on 裂变速率, 裂变反应的速率, 链式反应的速率 | the Chinese span wraps the same extent as the source's ("heavy water", "transmutation", "fission rate", "rate of fission") | the source puts the concept on a related or shorter phrase; the glossary rows are 氢的同位素, 核嬗变, 反应速率 (merge sweep) |

### ch21/21.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.5/text.html | "(or more) atom(s) with radioisotope(s)" | written 一个（或多个）原子 … 放射性同位素, the "(s)" plural marks dropped; spans kept on 原子 and 放射性同位素 | English optional-plural grammar collapses to one Chinese form (translate.md 4.1) |
| ch21/21.5/text.html | `a half-life` (spans on radioactive-half-life, 4 places), `a potential`, `a small electric current`, `a marked drop in the current` | articles dropped, the span wraps 半衰期, 电势, 电流 only | English articles have no Chinese form (4.1) |
| ch21/21.5/text.html | "The α emissions from Am-241 ionize the air" (span alpha-particle on "α emissions") | written Am-241 发射的 α 粒子使 … 空气电离, span on α 粒子 | Chinese names the emitted particles; the span wraps the glossary word for the concept |
| ch21/21.5/text.html | "Radioisotopes have revolutionized medical practice" (span medical-radioisotopes); "Commercial applications of radioactive materials" (span uses-of-radiation) | the spans wrap the whole translated clause/phrase | the source spans wrap a whole clause or phrase; Chinese keeps it in one block |
| ch21/21.5/text.html, section.json | "Over 10 million … procedures and more than 100 million … tests"; "Hundreds of millions of … tests and procedures" | 超过 1000 万次, 超过 1 亿次, 数亿次; procedures written 诊疗操作 (most are diagnostic studies, not treatments; review pass) and tests 检查 | Chinese counts in 万 and 亿 (4.4); 10,000 in the Tc-99 sentence kept as printed |
| ch21/21.5/text.html, section.json | "Grave’s disease" | written 格雷夫斯病 (Graves’ disease, glossary row) | the book's misspelling is not carried into Chinese; section.json notes keep the English misspelling as printed |
| ch21/21.5/text.html, section.json | "Radioimmunossays (RIA)" | written 放射免疫分析（RIA） | the misprint is not carried into Chinese (glossary row) |
| ch21/21.5/text.html | "making her the second woman to be awarded the prize for medicine" | written 成为第二位获得医学奖的女性 | the book says "the prize for medicine" after "a Nobel Prize"; written as printed, not expanded to 生理学或医学奖 |
| ch21/21.5/text.html | sim-head Figure 21.26: "how long each part of the head has spent in the beam" (span time) | span wraps 停留了多长时间 | the Chinese predicate carries the duration; the span stays in its block |
| ch21/21.5/text.html | the Tc-99m half-life of 6.01 hours | kept as printed (6.01 小时), the book's discrepancy with Table 21.2 (8.01 hours) recorded in section.json notes | an error of the book stays (translate.md 3.2) |
| ch21/21.5/figures.js | sim-gantry topline | "Swung through ${arc.v}°, the beam is on the skin … for ${minutes(fin)} min of the target’s ${minutes(TT)} min." written 转过 ${arc.v}° 时，在靶区的 ${minutes(TT)} min 中，射束照射靶区上方皮肤的时间为 ${minutes(fin)} min。 | English word order cannot carry the four slots in order; same slots, Chinese order |
| ch21/21.5/figures.js | sim-gantry, bars `['target', …]`, `['skin', …]`, readout `\text{skin}`, `\text{target}` | 靶区, 皮肤 | display words of the figure; `\text{…}` words translated |
| ch21/21.5/figures.js | sim-smoke hover names `'an α particle'`, `'a smoke particle'`, `'an electron'`, `'a nitrogen ion, N₂⁺'`, `'an oxygen ion, O₂⁺'` | articles dropped: α 粒子, 烟雾颗粒, 电子, 氮离子 N₂⁺, 氧离子 O₂⁺ | English article grammar collapses to one Chinese form (4.1) |
| ch21/21.5/text.html, ch21/21.5/section.json | spans `alpha-decay` on α 发射体, `gamma-emission` and `gamma-ray` on γ 辐射, `medical-radioisotopes` on 放射性同位素, `polyatomic-ions` on 离子 (the pertechnetate ions), `uses-of-radiation` on the whole phrase | the Chinese span wraps the same extent as the source's ("α emitter", "γ radiation", "radioisotopes", "ions") | the source puts the concept on a related or narrower word (merge sweep) |

### ch21/21.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch21/21.6/text.html | #opening, "ionize" / "ionizing" / "ionized" in spans `ion` (about 12 spans, also in sim-heads) | the `ion` span wraps 电离 (the verb), not 离子; "ions" and "ion" stay 离子 | the book spans the verb ionize with the concept ion; the glossary row ionize is 电离 and the concept word 离子 does not occur in it |
| ch21/21.6/text.html | #opening, "electromagnetic waves" (span `electromagnetic-radiation`) | written 电磁波, the span on 电磁波 | the glossary row electromagnetic wave is 电磁波; the concept word 电磁辐射 is used where the source says radiation (Figure 21.31) |
| ch21/21.6/text.html | #opening, "chemical bond energies" (span `bond-energy`); "heat" (span `heat-flow`); "atmosphere" | the spans wrap 化学键能, 热, 大气 | the span keeps the Chinese compound that contains the concept word (as ch01) |
| ch21/21.6/text.html | #radon, "radon gas" (span `gas`, 4 spans) | written 氡<span>气</span>: the span wraps 气 only | the glossary row radon gas is 氡气, and 气体 would read 氡气体; the concept word is 气体 (as ch01 天然气) |
| ch21/21.6/text.html | #measuring, "a material that emits light (luminesces)" | written 发光的材料; the gloss "(luminesces)" is not written | 发光 already means luminesce, so the gloss would read 发光（发光）; the Chinese has no second word (translate.md 4.5) |
| ch21/21.6/text.html | #radon, "water and gas pipes" (Figure 21.34 caption) | written 水管和燃气管道 | gas here is natural gas; 气体管道 would be wrong; no span in the source |
| ch21/21.6/text.html | #measuring, "(also called the Geiger-Müller counter)", "Geiger counters, scintillation counters (scintillators), …" | written with the glossary rows 盖革计数器, 盖革–米勒计数器, 闪烁计数器, 闪烁体 | the span `radiation-detectors` wraps the whole list as in the source |
| ch21/21.6/text.html | #measuring, "Commonly used types are electronic, film badge, thermoluminescent, and quartz fiber dosimeters." | written 电子剂量计、胶片剂量计、热释光剂量计和石英纤维剂量计 | the adjective list shares the noun dosimeter in English; Chinese repeats 剂量计 for each type |
| ch21/21.6/text.html | #measuring, "1 Bq = 1 disintegration per second", "1 Ci = 3.7 × 10^10 disintegrations per second", "1 J of energy absorbed per kilogram of tissue", "0.01 J/kg of tissue" (spans `rate`, `dose`) | written 每秒 1 次衰变, 每秒 3.7 × 10^10 次衰变, 每千克组织吸收 1 J 能量, 每千克组织吸收 0.01 J (the `dose` span in the last sentence wraps 0.01 J only); Table 21.4 "1 Gy = 1 J/kg 组织" | English "per" and "of tissue" rebuilt in Chinese order; the nested spans second, kilogram, energy-and-work keep their order; disintegration is 衰变 (glossary) |
| ch21/21.6/text.html | Table 21.4, "decay/second" in the Description column | written 每秒发生 1 次衰变的样品量, 每秒发生 3.7 × 10^10 次衰变的样品量 | the English "decays/second" fragment is a unit-like phrase with a word; Chinese needs 次 |
| ch21/21.6/text.html | Example 21.8 display math: `\text{atoms}`, `\text{1 decay}`, `\text{1 atom}`, `\text{decay}`, `\text{of Co−60 that decay}` | `\text{个原子}`, `\text{1 次衰变}`, `\text{1 个原子}`, `\text{次衰变}`, `\text{的 Co−60 发生衰变}` | words inside `\text{}` are translated, unit symbols g, y, d, h, s, mol, Bq, Ci stay (translate.md 5) |
| ch21/21.6/text.html | display math `\text{number of rems}=\text{RBE}\times\text{number of rads}` and Table 21.4 "Sv = RBE × Gy", "Rem = RBE × rad" | the display equation `\text{雷姆数}=\text{RBE}\times\text{拉德数}`; the two table cells kept as printed (the section note records "Rem = RBE × rad") | words in `\text{}` translated; the table cells are formulas in symbols |
| ch21/21.6/text.html | Table 21.5, "loss of consciousness;" | written 意识丧失； (the semicolon kept as printed, full width) | the section note records the misplaced semicolon as printed |
| ch21/21.6/text.html, section.json | "feet" ("a few feet of concrete") | written 几英尺 | unit with a target name in prose (translate.md 4.4); no SI conversion |
| ch21/21.6/text.html | #long-term, "tens of rems", "500 rems", "30 days", "2 months", "2–3 weeks", "1–2 weeks" (spans `dose`, `time`) | written 几十雷姆, 500 雷姆, 30 天, 2 个月, 2–3 周, 1–2 周; Table 21.5 "within 2 months" 2 个月内; "hours", "minutes", "hours to days" 数小时, 数分钟, 数小时至数天 | the plural of rem and the time words take the Chinese forms; the unit symbol y in 5.26 y is kept |
| ch21/21.6/text.html | #biological-effects, "see the Chemistry in Everyday Life feature on Radon Exposure" (2 places) | written 见“日常生活中的化学”专栏“氡暴露” | the box title and the heading of the box are cited by their translated names |
| ch21/21.6/text.html | Figure 21.30 and 21.36 alt text, “D N A damage” | written “DNA 损伤” | the spaced letters are the alt-text rendering of an abbreviation read letter by letter; the Chinese keeps DNA |
| ch21/21.6/section.json | exercises cyl1 and e4, `answer.parts[].part` ("(a) in Bq" …) | kept as printed | the English part label is not reader-visible text of the page (ch01 owner note); the full-width （a）（b） labels are in the prompts and solutions |
| ch21/21.6/section.json | exercises e1, e3, e5 prompts and solutions with the book's wording "which one would have greater activity and why?", "about 5.6 times that of bismuth-211" | rebuilt in Chinese order (哪一个的活度更大？为什么？; 约为铋-211 的 5.6 倍) | English comparison frames have no word-for-word Chinese form |
| ch21/21.6/section.json | lead, "tissue damage" (span `dose-equivalent`) | the span wraps 组织损伤 | the glossary row tissue damage |
| ch21/21.6/figures.js | Figure 21.31 `BANDS` names ('radio', 'terahertz', 'γ ray' …) and `COLS` heads; the code tests `b.name === 'visible'` (twice) | the names are the Chinese words (无线电波, 太赫兹波, 可见光, X 射线, γ 射线 …); the two tests now compare with '可见光' | the displayed name is also the key the code tests; only the compared literal changed, no logic |
| ch21/21.6/figures.js | Figure 21.31 `topline`: `At ν = … Hz the radiation is ${band.name === 'γ ray' ? 'a γ ray' : band.name}: ${col.effect}.` | rewritten `在 ν = … Hz 时，辐射是${band.name}：${col.effect}。`; the article branch removed | English article branch collapses to one Chinese form (translate.md 4.1) |
| ch21/21.6/figures.js | Figure 21.33 hover on a particle: `${l.name === 'neutron' ? 'a neutron' : l.name === 'γ ray' ? 'a γ ray' : 'an ' + l.name}` | becomes `l.name` (α 粒子, β 粒子, 中子, γ 射线) | the article branches collapse to one Chinese form (translate.md 4.1) |
| ch21/21.6/figures.js | Figure 21.33 `NAME` items 'a sheet of paper', 'a hand', 'a thin sheet of metal', 'a glass of water', 'a thick block of concrete', 'a thick block of lead' | written 一张纸, 一只手, 一块薄金属板, 一杯水, 一大块混凝土, 一大块铅 | the Chinese needs a measure word where the English has an article |
| ch21/21.6/figures.js | sim-dose `EFFECTS` names with commas ('destruction of intestinal lining, internal bleeding, death') and `reached.name.split(',')[0]` | the names use the enumeration comma 、 and the code splits on '、' | the Chinese list punctuation; same first item taken |
| ch21/21.6/figures.js | sim-dose `topline`, `say`, hover names (`${f.at} rem: …`) | rewritten in Chinese order with the same slots; 'below every exposure of Table 21.5' written 低于表 21.5 中的所有照射量 | English sentence frames cannot carry the slots in the same order |
| ch21/21.6/text.html, ch21/21.6/section.json | spans `alpha-particle` on α and `beta-particle` on β ("α and β particles"), `ionizing-radiation` on 电离 and 非电离 ("ionizing", "nonionizing"), `absorbed-dose` on 剂量, 辐射剂量 and 吸收的能量, `dose-equivalent` on 辐射损伤, 辐射所致组织损伤 and 生物有效剂量, `radioactive-decay-rate` on 活度, `radiation-detectors` on 仪器, `radiation-exposure` on 辐射照射, `product` on 消费品, `electromagnetic-spectrum` on 波谱, and the phrase spans of `penetrating-power`, `photon-energy` and `radiation-damage` | the Chinese span wraps the same extent as the source's | the source puts the concept on a letter, an adjective or a phrase whose Chinese form does not contain the glossary row's target (merge sweep) |

### Chapter 21: Other things for the owner

| File | Span or line | What was done | Why |
|---|---|---|---|
| `glossary.zh-CN.json` | every row with `"confirm": "termonline"` (329) or `"confirm": "owner"` (18) | term taken from the named published authority or the best textbook usage; none was looked up at termonline.cn in the page passes or the merge | 446 rows in all (387 seeded by the scaffold, 59 from the pages). The 18 owner rows are the book's own headings and box labels (Nuclear Stability, Health Effects of Radiation, Units Used for Measuring Radiation …) and the "calculating/predicting …" referent names; no authority covers them |
| `glossary.zh-CN.json` | 7 pending rows not added | Curie 居里 (already a glossary row), lead block 铅块 (ch02), chain reaction 链式反应 (ch09), thermal energy 热能 (ch16), fissile (ch09 has 易裂变的 as the adjective; the pages write the compound 易裂变材料, row fissile material), and the two organisation rows of 21.6 (U.S. Nuclear Regulatory Commission (NRC), US Environmental Protection Agency (EPA)) | the same source and target are already rows of other chapter glossaries; the organisations stay in English in credits (see "Every page"), and the 21.4 row Nuclear Regulatory Commission carries the note |
| ch21/21.1/text.html | #stability, belt / zone / valley of stability | 稳定地带 / 稳定区 / 稳定谷 beside the glossary's 稳定带 (band) | three rows of the chapter glossary; none is a standardized term, only 稳定带 is the usual textbook name |
| ch21/21.3/text.html, section.json | #series, "actinide series" for the actinium series (book error) | 锕系 in the text, the footnote names 锕铀系 | the text keeps the book's slip; owner may prefer to write 锕铀系 in the text and keep the footnote |
| ch21/21.3/text.html, section.json | parent (first member of a decay series) | 母体, where the glossary's parent nuclide is 母核 | the first member of a series; owner to confirm |
| ch21/21.4/glossary rows | grid 格架, containment building 安全壳厂房 against confinement building 封闭厂房, primary coolant loop 一次冷却剂回路, fuel element 燃料元件, pressure vessel 钢制压力容器 | reactor-engineering words chosen as the usual ones, flagged `termonline` | the book uses "containment" and "confinement" for two buildings; two words are kept so the source's two words stay distinct |
| ch21/21.5/glossary rows | target 靶区, arc 弧角 | radiotherapy words for the gantry sim | usual rendering; flagged for confirmation |
| ch21/21.6/glossary rows | the headings, table column heads and bar labels of 21.6 (Radiation and Living Cells 辐射与活细胞, 照射量（rem）, 起病时间（未经治疗）, 核工作人员, 全身 CT, 太赫兹波, 日光浴箱, 取暖灯) | rows with section 21.6 | the heading "Radiation and Living Cells" is OmniStax's own (the book prints no header there) |
| ch21/intro/text.html | "Antoine Becquerel" | 安托万·贝克勒尔（Antoine Becquerel） | the book prints Antoine; the physicist who found radioactivity was Henri Becquerel (his grandfather was Antoine César Becquerel). The name is kept as printed and the slip is recorded for the owner |
| ch21/21.1/section.json, ch21/21.3/text.html | book misprints "the number or nucleons" (21.1), "as seen is gas samples" (21.3), "Grave’s disease", "Radioimmunossays" (21.5) | not carried into Chinese (核子数, 这一点可以从冰中封存的气体样品看出, 格雷夫斯病, 放射免疫分析); the section notes quote the English | a misprint of English letters cannot be carried into Chinese |
| ch21/21.5/text.html, section.json | Tc-99m half-life 6.01 hours (text) against 8.01 hours in Table 21.2 | both kept as printed, the discrepancy in the section notes | an error of the book stays (translate.md 3.2) |
| ch21/21.6/section.json | Example 21.8, 1 Ci = 3.7 × 10¹¹ decays/s against 3.7 × 10¹⁰ in the text | kept as printed, recorded in the section notes | an error of the book stays (translate.md 3.2) |
| ch21/21.6/text.html | table source note "Source: US Environmental Protection Agency" | 来源：US Environmental Protection Agency | organisation name kept as in a credit; the figure label 安全饮用水限值（EPA）keeps the acronym |
| ch21/21.1/figures.js, ch21/21.3/figures.js | element and nuclide names in the sims | 铀-238, 铁-56 … as one display string and lookup key; the referent ids stay English | see the page rows; the key and the display change together |
| ch21/*/text.html | English kept: Antoine Becquerel (Latin form added once), Jens Maus, Christophe Delaere, Michael L. Baird, E. Generalic, Stephan Mosel, the Flickr and Wikimedia Commons user names, CERN's French name, Tc-99m's "metastable", glossary.periodni.com URLs, the acronyms CERN, ITER, LHC, IUPAC, DNA, PET, FDG, RIA, RBE, NRC, EPA, CT, and unit symbols (amu, MeV, eV, fm, Bq, Ci, Gy, Sv, rem, rad, mrem, mCi, pCi) | not translated | names, credits, acronyms and unit symbols (translate.md 5); rem and rad are also written 雷姆 and 拉德 in prose where the source says rems or rads |
| ch21/chapter.json, ch21/book-rows.json | concept names, terms, statements and variable meanings of chapter 21 | already Chinese when the pages were translated; spans checked against the glossary and the recorded shorter wraps; no edit | the chapter agents do not edit book.json |
| ch21 (merge sweep) | edits of the merge | intro 始于 1896 年 (space); 21.2 and 21.3 solutions and 21.2 notes: half-width (a)–(d) became （a）–（d） (all of them); 21.5 and 21.2 prompts: （a） $ became （a）$; 21.6 Figure 21.35 caption （a）（b）（c）; 21.6 Table 21.4 and 21.5 eyebrows 表; 21.6 NRC credit (3 places) and EPA table note in English; 21.4 two credits with a space before the quote | consistency with ch01 and ch02 |
| ch21 | Humanizer review and `npm run dev` read-through | outstanding | translate.md 8.4 |

## Global merge (2026-10-27)

What the book-level merge of chapters 2 to 21 decided, and what it left for the owner. The chapter sections above are the chapter agents' records, folded in unchanged except that file names and "shard" wording now point at `glossary.zh-CN.json` and the rows listed below replace the per-chapter doubts they resolve. `glossary.zh-CN.json` now has 5,765 rows; 2,784 carry `"confirm": "termonline"` and 332 `"confirm": "owner"`.

### Terms decided (one target per source, swept through every page and every concept row)

| Source | The chapters' targets | Decision | Reason | Swept |
|---|---|---|---|---|
| nitric oxide, nitrous oxide | ch02 氧化氮, 氧化亚氮; ch07, ch18 一氧化氮, 一氧化二氮 | 一氧化氮, 一氧化二氮; the traditional names are two rows of their own, used only in the ch02/2.7 contrast passage | 化学名词 gives the systematic forms; the 2.7 passage contrasts a common and a proper name, which one target would erase (translate.md 4.5) | none (2.7 already read so) |
| species | ch02, ch08, ch13, ch18, ch21 化学物种; ch04, ch12, ch14, ch15, ch17 and the concept names 物种 | 物种; 化学物种 only for the explicit "chemical species" | 化学名词 物种; 199 uses against 26; the nuclear chapter keeps 粒子 / 核素 for its own sense | 14 places (2.4, 8.4 text and figure, 13.4 text and section.json, 18.3, 18.4, 18.7, 18.8 text and figure, 21 intro) |
| analyte | ch04 待测物, ch14 被滴定物 (a row no page used) | 待测物 | the species of interest in every kind of analysis; 被滴定物 fits only a titration | row only |
| bench | ch07 演示台, ch09 工作台, ch02/ch11/ch16/ch17/ch18 实验台 | 工作台 | plain wording, as ch01 1.2 already reads (一个电池放在工作台上) | 30 places (演示台 16 in 7.6, 实验台 14 in 11 files) |
| corner | ch09/ch10/ch11/ch16 斜视 (view button), ch10 顶角 (unit-cell corner) | two rows: corner 顶角 (unit cell), corner (3D view button) 斜视 | two senses of one English word | the view-button label 顶角 (1) |
| front, above, side (3D view buttons) | 正视/正面/前视, 俯视/上方, 侧视/侧面, 斜视/斜角 | 正视, 俯视, 侧视, 斜视 | 62 + 43 + 18 + 12 labels in the figures; the series 正视 / 俯视 / 侧视 is the ch02 and ch09 rows | 71 labels in `figures.js` (36 + 19 + 12 + 3 + 1), plus 18.5 (two labels left in English) and 18.7 (前视); ch01 1.1 and 1.2 changed too (8 labels) |
| molecular weight | ch09, ch10 相对分子质量; ch12 分子量 | 分子量 | 化学名词 lists 分子量 (termonline 2026-10-27, entry URL in the row); it parallels atomic weight 原子量 and formula weight 式量; molecular mass stays 分子质量 | 3 places (9.4 text and section.json, 10.3) |
| London forces | ch10 伦敦力; ch18 伦敦色散力 | 伦敦色散力 | the book's short form of London dispersion forces; the spans of the concept dispersion-forces wrap 伦敦色散力; 化学名词 lists neither English term | 5 places in ch10 (10.1 and 10.3, the split span now 伦敦色散<span>力</span>), 2 concept statements |
| bicarbonate, hydrogen carbonate | ch13 碳酸氢根 and 碳酸; ch18 碳酸氢盐 for both | bicarbonate 碳酸氢根 (the book uses it for HCO₃⁻); hydrogen carbonate 碳酸氢盐; the book's H₂CO₃ "hydrogen carbonate" of 13.3 is a row of its own (碳酸) | 化学名词 lists 碳酸氢盐 for bicarbonate (termonline 2026-10-27); the anion needs 根, the class of salts 盐 | none |
| ion product of water | ch14 水的离子积常数; ch17 水的离子积 | 水的离子积常数 | the concept and the span of ch14; ch17 e8 was the only other place | 1 place (17.1) |
| arithmetic sign | ch05 (5.2) and ch17 算术符号; ch05 (5.3), ch16 正负号 | 正负号 | the ch02 review fixed it for the sign of a number | 4 places (5.2 twice, 17.3 twice) and 1 concept statement |
| suggested approach | ch01 建议思路; ch18 建议解法 | 建议思路 (ch01 wording) | the apparatus word of the notes and exercise_notes | 33 places in 19 `section.json` files (ch02, ch03, ch04, ch09, ch18, ch21) |
| malleable, malleability | ch02, ch18 展性; ch06, ch10 延展性 | 展性 (有展性) | 化学名词 pairs 展性 with 延性; 延展性 is the joint term and would name ductility twice | 7 places (6.5, 10.5) and 2 concept statements |
| number of moles | ch03 物质的量（以摩尔计）; ch09, ch11 摩尔数 | 物质的量; 毫摩尔数 stays in 4.5 where the source counts millimoles | the ch01 and ch03 decision | 2 places (9.2 hint, 11.4 aria) |

Kept apart on purpose: Becquerel 贝克勒尔 (the person) and becquerel 贝可勒尔 (the unit, GB 3100); the pairs of case and number variants (Metal / metal, ion / ions) share one target; stoichiometry is 化学计量 on every page (no page uses the discipline name 化学计量学, so the older notes about it are moot). Rows whose `authority` read "plain wording" now read `book`, the id the glossary defines.

### Sweeps, checked

- Page edits: 173 string replacements in 84 files, of which 8 in chapter 1's `figures.js` (the 3D view labels); 5 concept statements through `ost set --chapter` (types-of-crystalline-solids, allotropes, cell-potential-and-spontaneity, nonmetal-structures, carbon-allotropes). No `book.json` or chapter-row hand edit.
- A grep of every page, `figures.js`, `chapter.json` and `book.json` for the superseded forms (实验台, 演示台, 相对分子质量, 伦敦力, 算术符号, 建议解法, 延展性, 被滴定物, and the superseded view labels) finds none.

### For the owner

- The glossary rows flagged `confirm` (termonline 2,784, owner 332); the per-chapter lists above ("Unverified terms", "Owner notes", "Other things for the owner") name the ones that matter.
- Source slips kept as printed, `answer.parts[].part` and `answer.unit` kept in English, and the English given names in the credits are the same open questions as in chapter 1; each chapter's section lists its own.
- Open between chapters: antiseptic and disinfectant share 消毒剂 in ch18 (the book distinguishes them; `confirm: owner`); speed is written 速度 in 12.1 where the glossary row is 速率 (the analogy of a car and a reaction, a recorded scenario); the `answer.parts[].part` question; the humanizer review and the `npm run dev` read-through (translate.md 8.4) of the 128 new pages.
<!-- GLOBAL-DONE -->
