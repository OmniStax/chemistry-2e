# Config: 化学（第2版）, Chapter 1 (translation)

The translation pass of `Chemistry 2e` chapter 1 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch01, every page it lists |
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

### Every page

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.2/text.html, ch01/1.3/text.html, ch01/1.4/text.html, ch01/1.6/text.html | spans on 天然气 (`gas`, wraps 气), 室温 (`temperature`), 棱长 (`length`), 体温 (`temperature`), 温标 (`temperature`, 12 spans, 1.6) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 气体, 温度, 长度 | the source wraps one English word of "natural gas", "room temperature", "edge length", "body temperature", "temperature scale"; Chinese names each in one word (translate.md 3.3, the span stays in its block) |
| every text.html | figure and sim eyebrows | `Figure N.M`, `Sim` and the bare `Figure` of 1.5 kept | the checker matches the eyebrow against its row exactly; the app localises it (translate.md 4.6) |
| every text.html | figure citations in the prose | written 图 N.M, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| every text.html | table eyebrows `Table 1.1` to `Table 1.6` | written 表 1.1 to 表 1.6 | translate.md 5 lists a table's eyebrow as translated; `ost check` and `translation_parity.py` read only the Figure and Sim eyebrows, so nothing depends on the English; the pages first disagreed (表 on 1.2 and 1.6, Table on 1.4 and 1.5) |

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
| ch01/1.2/text.html | atoms-molecules, spider-web paragraph | "a dime" written 一角硬币, "a football field" 足球场 | cultural reference, translated for meaning (4.4) |
| ch01/1.2/text.html | atoms-molecules, lead atoms paragraph | "300 trillion" written 300 万亿 (the Chinese number word for 3 × 10^14); 3 × 10^14 kept | Chinese counts in 万 and 亿 (4.4) |
| ch01/1.2/section.json | e17 prompt and solution | "one pound" written 一磅 (the unit has no symbol in the source); "350 °F" kept | unit without a symbol takes the target name (4.4) |
| ch01/1.2/text.html | pure-substances, conservation, everyday-life | a `data-concept` span for a compound-name term (oxide, acid, sulfate) wraps the whole Chinese compound name (氧化汞(II), 氧化铅, 硫酸, 硫酸铅, 氧化铟锡, 聚环氧乙烷) | Chinese names the compound in one word; the span cannot wrap only "oxide" (3) |
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

### ch01/1.4

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.4/text.html | #si-units, #prefixes table rows (femto … tera) | prefix names written with the English in parentheses in the table (飞（femto）…); in the prose 词头<em>千</em>（kilo） | the passage is about the prefix names themselves, which are given as English words (4.3) |
| ch01/1.4/text.html | #temperature, "kelvin (all lowercase)" | rendered 开尔文（kelvin，全部小写） | a sentence about English spelling and case (4.3) |
| ch01/1.4/text.html | #volume, "The abbreviation cc (for cubic centimeter)" | rendered 缩写 cc（来自英文 cubic centimeter，即立方厘米），the strong letters c kept | a sentence about the letters of an English abbreviation (4.3) |
| ch01/1.4/text.html, ch01/1.4/section.json, ch01/1.4/figures.js | dime (Figure 1.25 sim-head, original_caption, sim-volume label '1.8 cm dime') | rendered 10 美分硬币 | a US coin with no Chinese equivalent, named by its value (4.4) |
| ch01/1.4/text.html, ch01/1.4/section.json | inches, feet, yards, miles, pounds, gallons, quarts, pints in prose and exercise e1 | named 英寸、英尺、码、英里、磅、加仑、夸脱、品脱; symbols (in., yd, ft, yr) kept as printed | units with no SI equivalent keep their symbol and take the Chinese name in prose (4.4) |
| ch01/1.4/text.html | #si-units, "from the French, Le Système International d’Unités" | rendered 源自法语 and the French title kept in <em> | the French phrase is the origin of the abbreviation SI; no Chinese equivalent (4.3) |
| ch01/1.4/text.html | Example 1.2 solution, the simulator button “turn fluid into water” | rendered “将流体变为水”, and the material “iron” as “铁” | the PhET interface is translated for the reader as the instruction reads (no equivalent label fixed) |
| ch01/1.4/figures.js | sim-density MATS names, REF keys, `name === '金'`; sim-displacement MATS names and the `who` map keys | the display names of the materials are translated in place, and the object keys / comparison that look the name up (REF { 铅, 金 }, { 铁, 木 }, name === '金') follow them | the display name is also the lookup key in the code; the logic is unchanged |
| ch01/1.4/figures.js | sim-density headline, hover names; sim-displacement headline, hover names, block labels | operand order changed ('A cube of NAME A cm on an edge' to '棱长为 A cm 的NAME立方体'; 'the NAME block' to NAME块; the leading 'a cube of' dropped from the hover name); the leading articles dropped | Chinese word order; English articles have no Chinese form (4.1) |
| ch01/1.4/figures.js | sim-density `other` sentence | 'times as dense as gold' / 'times as dense' rendered 的密度是金的 N 倍 / 的密度是它的 N 倍 | Chinese word order |
| ch01/1.4/text.html | #three-parts, "Scientific notation is also known as exponential notation" | 科学记数法也称指数记数法; the alias 指数记数法 appears only in this sentence, everywhere else the book's "exponential notation" is 科学记数法 (glossary row exponential notation) | a sentence that names the same thing twice would read "科学记数法也称科学记数法"; the alias is the literal rendering (translate.md 4.5) |

### ch01/1.5

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch01/1.5/text.html | `uncertainty` section, "called <strong>significant figures</strong> or <strong>significant digits</strong>" | The two synonyms collapse to one term, one `<strong><span data-concept="significant-figures">有效数字</span></strong>`; the second strong and span are not written | The glossary renders both `significant figures` and `significant digits` as 有效数字, so "有效数字或有效数字" would be meaningless (collision, translate.md 4.5) |
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
