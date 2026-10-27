# Config: 化学（第2版）, Chapter 10 (translation)

The translation pass of `Chemistry 2e` chapter 10 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch10, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added to `glossary-ch10.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `notes-ch10.md` carries the same
entries.

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
| ch10/10.1/text.html | "attractive forces", "Intramolecular forces", "London forces" with the `force` span | the span wraps 力 in 吸引力 and 伦敦力, and 作用力 in 分子内作用力 / 分子间作用力 (with the em on 内 / 间) | the glossary renders force as 力 and intermolecular force as 分子间作用力; the English adjective is a separate word, the Chinese a suffix |
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
| ch10/10.1/figures.js | 3D view labels `side`, `end on`, `down a bond` (besides `front`, `corner`) | 侧视, 端视, 沿键方向 | interface words for camera views, as for 正面 and 斜视 |

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
| ch10/10.2/section.json | e4 answer, "so the less viscous the liquid" | kept as the book prints it: 因此液体的黏度越小 (the book means more viscous); no footnote added | the book's slip stays (root item 13); the source carries no footnote for it, and a footnote id the source lacks fails the id parity of translate.md 1.6, so the slip is listed under "Other things for the owner" in notes-ch10.md |
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
| ch10/10.3/text.html | "London forces", "attractive forces", "intermolecular attractive forces" with the `force` span | the span wraps 力 in 伦敦力 and 吸引力 | the English adjective is a separate word, Chinese a prefix of 力 (as recorded for 10.1) |
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
| ch10/10.1/figures.js, ch10/10.3/figures.js, ch10/10.5/figures.js, ch10/10.6/figures.js | 3D view buttons `front`, `corner` | one label per English word: 正面, 斜视 | the Chinese for a view from a corner; no standard word; the pages had 斜角 / 斜视 and 正视 / 正面 |
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
| ch10/10.5/figures.js | graphene 3D view labels `face on`, `edge on` | 面视, 侧视 | one English word per label (正面 stays for `front`, 侧视 for `side`/`edge on`) |

### ch10/10.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch10/10.6/text.html | `length` spans on 棱长 (10: simple cubic, Example 10.14 to 10.15 and 10.18, ionic cells, ionic radii) | the span wraps 棱长, the compound that holds 长度's word; where the source says "lengths of three axes" and "length of the diagonal" the span wraps 长度 | the source wraps one English word of "edge length"; Chinese names it in one word (ch01 decision, translate.md 3.3) |
| ch10/10.6/text.html | `temperature` span in "Fe at room temperature" | the span wraps 室温 | ch01 decision (the source wraps one word of "room temperature") |
| ch10/10.6/text.html | `tetrahedral-geometry` (12) and `octahedral-geometry` (9) spans before `crystal-hole` | the spans wrap 四面体 and 八面体, the span of `crystal-hole` wraps 空隙: 四面体空隙, 八面体空隙; "tetrahedral or octahedral holes" written 四面体或八面体空隙 with the three spans on 四面体, 八面体 and 空隙 | the glossary targets of the concepts are 四面体形 and 八面体形 (molecular geometry), but the hole is 四面体空隙 and 八面体空隙 (shard rows); 四面体形空隙 is not Chinese; the source's three spans are kept |
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
