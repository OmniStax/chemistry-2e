# Config: 化学（第2版）, Chapter 18 (translation)

The translation pass of `Chemistry 2e` chapter 18 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch18, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence, and the chapter shard `glossary-ch18.json` (698 rows); a new term is added to the shard |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `notes-ch18.md` carries the same
entries and the owner notes. The merge dropped the rows that are book-level (eyebrows, figure and table citations, photo credits: "Every page") and added the rows its own sweeps needed.

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.1/text.html, ch18/18.2/text.html, ch18/18.3/text.html, ch18/18.4/text.html, ch18/18.5/text.html, ch18/18.7/text.html, ch18/18.9/text.html, ch18/18.10/text.html, ch18/18.11/text.html, ch18/18.12/text.html | spans on 氢气, 氯气, 氟气, 氙气, 氧气, 氮气, 天然气, 笑气 (`gas`), 室温, 常温, 低温, 高温 (`temperature`), 常压, 高压, 低压 (`gas-pressure`), 液氨, 液氧, 液氦, 液氮 (`liquid`) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 气体, 温度, 压强, 液体 | the source wraps one English word of "hydrogen gas", "natural gas", "room temperature", "high temperatures", "liquid nitrogen"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent, the span stays in its block) |
| ch18/18.1/text.html, ch18/18.3/text.html, ch18/18.5/text.html, ch18/18.7/text.html, ch18/18.8/text.html, ch18/18.9/text.html, ch18/18.10/text.html, ch18/18.12/text.html | `liquid` / `solid` spans before a substance ("liquid sulfur", "solid xenon trioxide", "Liquid hydrogen") | the spans wrap 液态 / 固态 (the state of the sample); 液体 / 固体 stay where a body of matter is meant ("a blue liquid", "a white solid") | Chinese says 液态硫, 固态三氧化氙 (Chapter 1, 1.2) |
| every text.html and section.json of chapter 18 | spans on compound names: `oxide` (氧化铝, 氧化硼, 氧化汞(II), 二氧化氮, 氧化磷(V) ...), `hydroxide` (氢氧化钠, 氢氧化钙 ...), `peroxide` (过氧化氢, 过氧化钠), `acid` (盐酸, 硝酸, 硫酸, 磷酸, 亚磷酸, 正磷酸, 氢卤酸 ...), `carbonate` / `hydrogen-carbonate` (碳酸钠, 碳酸钙, 碳酸氢钙 ...), `nitrate` (硝酸铵, 硝酸钾), `sulfate` / `sulfite` (硫酸钙, 硫酸钡, 亚硫酸氢钠) | the span wraps the whole Chinese compound name; the stock numeral stays inside or outside as the page records (氧化汞(II): the numeral outside the span except in 氧化磷(V), where the page keeps it inside) | Chinese names each compound in one word, so the span cannot wrap only "oxide" or "acid" (Chapter 1 precedent, 氧化汞(II) in 1.2) |
| ch18/18.6/text.html, ch18/18.8/text.html, ch18/18.9/text.html, ch18/18.11/text.html, ch18/18.4/text.html | `<span data-concept="oxide">oxide</span> <span data-concept="ion">ions</span>`, `hydroxide ions`, `peroxide ions`, `superoxide ions`, `carbonate ions`, `halide ions`, `nitride ion`, `selenide ion`, `hydride ion` | the two spans sit side by side on the two morphemes: 氧 + 离子, 氢氧根 + 离子, 过氧根 + 离子, 超氧根 + 离子, 碳酸根 + 离子, 卤 + 离子, 氮 + 离子, 硒 + 离子, 氢负 + 离子 | Chinese names the ions 氧离子, 氢氧根离子, 氮离子 (ch02 and ch14 shard rows), not by the compound-class word; 卤离子 is the word chapter.json already uses |
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
| ch18/18.1/section.json | exercise on fish "30 parts per million" (prompt and hint) | written 汞的含量按重量计为 30 ppm（百万分之三十） and 在汞含量为 30 ppm 时 | 30 百万分率 is not idiomatic Chinese (review pass); the unit ppm is kept as printed and glossed once in the prompt; the shard row `parts per million` stays 百万分率 |

### ch18/18.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.2/text.html | spans on compound names: oxide (氧化物锡石, 氧化铝, 氧化锌, 氧化镁, 氧化锡(IV)), hydroxide (氢氧化钠, 氢氧化铝, 氢氧化钙, 氢氧化镁), acid (盐酸), gas (氯气) | the span wraps the whole Chinese compound name; in 不纯的羟基氧化铝 the hydroxide span wraps 羟基 and the oxide span 氧化铝 | Chinese names these compounds in one word, the concept word cannot be separated (same as ch01) |
| ch18/18.2/text.html | `<span data-concept="energy-and-work">energy</span>` in "electrical energy" | span wraps 电能 | Chinese 电能 is one word; 能量 cannot stand alone in it |
| ch18/18.2/text.html | "Ions of metals in of groups 1 and 2" | written 第 1、2 族金属的离子, the doubled preposition "in of" has no counterpart | typo of the source with no Chinese form (4.1); the English stays in section.json notes |
| ch18/18.2/text.html | "The principle tin ore", "the principle lead and thallium ores" | written 主要的 | misspelling of "principal" has no Chinese form |
| ch18/18.2/text.html | "In honor to the two inventors" | written 为纪念这两位发明者 | grammatical slip of the source has no Chinese form |
| ch18/18.2/text.html | "Charles M. Hall", "Paul L. T. Héroult", "Oberlin College in Ohio" | 查尔斯·M·霍尔, 保罗·L·T·埃鲁, 俄亥俄州奥伯林学院; initials kept | person and place names rendered by their standard Chinese forms (2.7) |
| ch18/18.2/text.html | "the chapter on fundamental equilibrium concepts" | 见<span data-concept="chemical-equilibrium">平衡</span>的基本概念一章, the span on 平衡 as in the source's "equilibrium" | the title of ch13 is 平衡的基本概念 (row `Fundamental Equilibrium Concepts` of the ch13 shard); the merge swept 基本平衡概念 to it |
| ch18/18.2/text.html | math `\begin{array}…` lines `\text{at the cathode:}` etc. | `\text{阴极:}`, `\text{阳极:}`, `\text{总变化:}` with ASCII colon | ASCII inside math (3.5) |
| ch18/18.2/section.json | e1 solution `\text{countercurrent} \\ \text{fractionating} \\ \text{tower}` | `\text{逆流} \\ \text{分馏} \\ \text{塔}`, three rows kept | the array structure is TeX outside `\text{}` and stays byte for byte; Chinese breaks the word 分馏塔 over the three rows |
| ch18/18.2/section.json | e9 prompt "a type of metal (an alloy …)" | written 某种金属（…的合金） | translated as printed (the source's "type metal" is not corrected) |
| ch18/18.2/section.json | e6 solution "much as the oxycarbonate layer does on magnesium" | 碱式碳酸镁层 | "oxycarbonate" is rendered by the usual name of the passivating layer, 碱式碳酸镁, as in 18.1 (review pass); shard rows `oxycarbonate`, `magnesium oxycarbonate` |
| ch18/18.2/figures.js | view labels `front`, `above`; pickable names and `v.label`s | 正面, 上方 and Chinese names; "a sodium ion, Na⁺" etc. written 钠离子 Na⁺ (the English article and "a … of" frames collapse) | English `a`/`an` have no Chinese form (4.1) |
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
| ch18/18.3/text.html | "the boron hydrides" | written 硼氢化物 | as the book words it; 硼烷 is the usual name, see glossary-ch18.json |
| ch18/18.3/text.html | "the structures of arsenic and antimony are similar to … graphite" | 起伏的 for "puckered" | no standard term (glossary-ch18.json) |
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
| ch18/18.4/figures.js | view buttons `face on`, `edge on`, `front`, `above` | written 正面, 侧面, 正面, 上方 | the short labels of the 3D view buttons used by other chapters (正面, 上方) |
| ch18/18.4/figures.js | `sim-sulfur` headlines `At ${T} °C …` (4 templates) | rewritten `在 ${T} °C 时，…` with the same slot | English sentence frame (4.1) |
| ch18/18.4/text.html | Andre Geim, Kostya Novoselov (University of Manchester), Buckminster Fuller, Richard Smalley | 写作 安德烈·海姆（Andre Geim）, 康斯坦丁·诺沃肖洛夫（Kostya Novoselov）, 巴克敏斯特·富勒（Buckminster Fuller）, 理查德·斯莫利（Richard Smalley）; the Latin spelling in parentheses at the mention | person names with a standard transliteration, the original added once at the mention as in ch07 (translate.md 2.7); the rows of Geim and Fuller are in the ch10 and ch07 shards without the parentheses |
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
| ch18/18.7/section.json | exercises e63 prompt, "the chapters on chemical bonding and advanced theories of covalent bonding" | 化学键与分子几何构型以及共价键的高级理论这两章 | the two chapter titles in the book's Chinese titles; the second (ch08, 共价键的高级理论) is a row of the ch08 shard |
| ch18/18.7/section.json | exercise e63 (c) solution alt text | "negative sign" kept although the ion is NO₂⁺ | the alt text describes NO₂⁺ with a negative sign in the source; the book's slip is kept |
| ch18/18.7/text.html | `<span data-concept="redox-reaction">oxidation-reduction</span> behavior` | span wraps 氧化还原 (the noun reaction is not in the source phrase) | the source phrase has no "reaction"; 氧化还原反应 would add a word |
| ch18/18.7/text.html | `<span data-concept="free-radical">molecule with an unpaired electron</span>` | span wraps 含有未成对电子的分子 | the source describes the radical in words; the glossary word 自由基 is not in the sentence |

### ch18/18.8

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.8/text.html | #oxides: `phosphorus(III) <span data-concept="oxide">oxide</span>`, `phosphorus(V) <span ...>oxide</span>` (6 spans) | each span wraps the whole compound name 氧化磷(III) / 氧化磷(V), not 氧化物 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as 氧化汞(II) in ch01) |
| ch18/18.8/text.html | `phosphorous <span data-concept="acid">acid</span>`, `phosphoric acid`, `orthophosphoric acid` (5 spans) | span wraps 亚磷酸, 磷酸, 正磷酸 | Chinese names the acid in one word (as 硫酸 in ch01) |
| ch18/18.8/text.html | `<span data-concept="halide">halide</span> <span data-concept="ion">ions</span>` | written 卤 + 离子 (卤离子, the shard row `halide ion`), the halide span on 卤 and the ion span on 离子 side by side, as in 18.11 | review pass; the Chinese ion name is 卤离子 and the concept span cannot wrap the whole of it |
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
| ch18/18.12/text.html, ch18/18.12/section.json | chapter references "the chapter on the advanced theories of covalent bonding", "the chapter on chemical bonding and molecular geometry" | written 共价键的高级理论一章, 化学键与分子几何构型一章 | the Chinese title of ch07 is 化学键与分子几何构型; ch08 is 共价键的高级理论 (ch08 shard row) |
| ch18/18.12/section.json | exercise e1 and e2 part labels | (a)–(e) written （a）–（e） | Chapter 1 convention |
| ch18/18.12/section.json | e3 prompt "at STP" | kept STP | the glossary (ch09) writes 标准温度和压强（STP）; the abbreviation is kept as printed |
| ch18/18.12/section.json | notes | the English misprint "sate" quoted and explained | the Chinese cannot carry the misspelling |

### Review pass additions

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.1/text.html, ch18/18.1/figures.js | flerovium, livermorium | written 𫓧 (fū, U+2B4E7) and 𫟷 (lì, U+2B7F7), the GB simplified forms of the 2012 element names | 鈇 and 鉝 are the traditional-character forms; the shard rows `flerovium`, `livermorium` changed |
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
