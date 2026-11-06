# Config: 化学（第2版）, Chapter 16 (translation)

The translation pass of `Chemistry 2e` chapter 16 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch16, every page it lists |
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
| ch16/16.1/text.html, ch16/16.2/text.html, ch16/16.3/text.html, ch16/16.4/text.html | spans on 室温, 高温, 低温 (`temperature`; 16.1, 16.2 Example 16.3, 16.3 third law, 16.4 Examples 16.7 and 16.8 and list items 1 and 2) | the span wraps the whole Chinese compound that contains the concept's word, 温度 | the source wraps one English word of "room temperature", "high temperatures", "low temperatures"; Chinese names each in one word (recorded in ch01, translate.md 3.3); the shard row room temperature is 室温 |
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
| ch16/16.1/text.html | "ice will spontaneously melt, but water will not spontaneously freeze" | 水不会自发凝固 (the first draft had 结冰) | the shared glossary has freezing 凝固 and the shard freezing of water 水的凝固; one word for the process across the chapter (row freeze of the shard) |
| ch16/16.1/text.html | `spontaneous change` / `spontaneous changes` (span `spontaneous-process`; 16.1 and 16.3) | the span wraps 自发变化, the literal rendering, not 自发过程 | the source says "change" here and the shard row spontaneous change records it; the concept row spontaneous process is 自发过程 |
| ch16/16.1/text.html | `dispersal-of-matter-and-energy` spans ("a greater and more uniform dispersal of matter", "more uniform dispersal of energy") | the span wraps the whole Chinese phrase 物质的更大、更均匀的分散 / 能量更均匀的分散 | the source wraps the noun phrase; the shard rows are 物质的分散 and 能量的分散, which the phrases contain only when the modifier is moved out, and Chinese keeps it inside (3) |

### ch16/16.2

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch16/16.2/text.html | `steam <span data-concept="heat-flow">heat</span> engines` | written 蒸汽<span>热机</span>, the span wraps 热机 | the concept word 热 is inside the standard compound 热机 (shard row heat engine); Chinese names it in one word (recorded in ch01 for compounds) |
| ch16/16.2/text.html | `<em>reversible</em> <span data-concept="heat-flow">heat</span>` | written `<em>可逆</em><span data-concept="heat-flow">热</span>`, the span wraps 热 only | the standard term is 可逆热 (shard row reversible heat); the em and the span keep their words, the span cannot wrap 热量 inside the compound |
| ch16/16.2/text.html | `<span data-concept="kelvin">kelvin</span> <span data-concept="temperature">temperature</span>` | written 开尔文温度 as two adjacent spans, 开尔文 and 温度 | the shard row kelvin temperature is one word; the two spans keep their blocks |
| ch16/16.2/text.html | Figure 16.7 caption and text: "Nicholas" and "Nicolas" Léonard Sadi Carnot | both written 尼古拉·莱昂纳尔·萨迪·卡诺 | the two English spellings of one name have one Chinese rendering (glossary rows); the book's inconsistency is named in section.json notes |
| ch16/16.2/text.html | "In the <span solid>solid</span> phase", "In the <span liquid>liquid</span> phase", "the gaseous phase" | written 在固态下, 在液态下, 气态; the span wraps 固态 and 液态 | the word "phase" is carried by 态, as for the state adjectives recorded in ch01 |
| ch16/16.2/text.html | "quantized translational <span data-concept="energy-and-work">energy</span> levels" | written 量子化的平动<span>能级</span>, the span wraps 能级 | 能级 is one word (ch07 row energy level) |
| ch16/16.2/text.html | "The hot object", "hot and cold objects" (spans `hot-object`, `cold-object`) | written 较热的物体, 较冷的物体; "hot and cold objects" 较热和较冷的物体, spans on 较热 and 较冷的物体 | the shard rows hotter object and colder object; Chinese cannot say 较热的和较冷的物体 shorter |
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
| ch16/16.3/text.html | third-law, `absolute <span data-concept="entropy">entropy</span> values` | written `<span data-concept="entropy">绝对熵</span>值` (span wraps the whole glossary compound 绝对熵) | the shard row absolute entropy is one word; the span cannot wrap 熵 alone inside it |
| ch16/16.3/text.html | second-law, Example 16.4: "The <span entropy>entropy</span> change for the process [equation] is 22.1 J/K" | written `下列过程的<span data-concept="entropy">熵变</span>` before the equation and `为 22.1 J/K，…` after it; 下列 is added | Chinese cannot carry the subject across the display equation without a head word before it; the span stays in the same block as in the source |
| ch16/16.3/text.html | Table 16.2, `C(s, graphite)`, `C(s, diamond)`; section.json e29 `\text{C}(s\text{, graphite})` | the words graphite and diamond written 石墨 and 金刚石 inside the formula label, the comma kept ASCII | the label is an English word inside a formula (section 5: words in `\text{}` are translated) |
| ch16/16.3/text.html, ch16/16.3/section.json | `\text{(products)}`, `\text{(reactants)}`, `\text{and}`, subscript `\text{fusion}` in the equations | written `\text{(产物)}`, `\text{(反应物)}`, `\text{且}`, `\text{熔化}` | words inside `\text{}` in math are translated (section 5) |
| ch16/16.3/section.json | cyl1 `answer.parts[].part` ("ΔS_univ at −10.00 °C", "at +10.00 °C") | kept in English | the table of translate.md section 5 lists `parts[].part` as kept byte for byte; the parity tool checks it; the label is visible to the reader and flagged for the owner |
| ch16/16.3/section.json | cyl1 solution `ΔS_freezing = −ΔS_melting` | subscripts written 凝固 and 熔化 | the subscripts are words (state changes), not letters |
| ch16/16.3/figures.js | sim-ice-universe headline, `const at = \`At ${t} K (${cs} °C)\`` and the four sentences that follow `${at}` | `at` becomes `在 ${t} K（${cs} °C）时` and each sentence is `${at}，…`; the four slots and the branches kept | English prefix phrase glued to a clause; Chinese keeps the same slot order (4.1) |
| ch16/16.3/figures.js | `PROC` options `melting`, `freezing` | labels written 熔化 and 凝固, values (`'melting'`, `'freezing'`) kept | the value is the code key; only the label is read by the reader |
| ch16/16.3/text.html, ch16/16.4/text.html | spans on 宇宙的熵变, 环境的熵变 (`entropy-change-of-universe`, `entropy-change-of-surroundings`) | the span wraps the whole glossary compound (shard rows entropy change of the universe, of the surroundings) | the source wraps the English phrase; the Chinese compound is one term |

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
| ch16/16.4/text.html | `gibbs-free-energy` spans ("Gibbs free energy", "free energy", "free energy change", 32 spans) | the span wraps 自由能 / 自由能变 / 吉布斯自由能 as the source wraps "free energy", "free energy change" and "Gibbs free energy" | three shared or shard rows (free energy 自由能, free energy change 自由能变, Gibbs free energy 吉布斯自由能) feed one concept; each span wraps the term the sentence uses |
| ch16/16.4/text.html | `<span data-concept="reversible-process">thermodynamically reversible</span>` | span wraps 热力学可逆 | shard row thermodynamically reversible; the concept row reversible process is 可逆过程 and the source has the adjective phrase |
| ch16/16.4/text.html | `exothermic-and-endothermic` spans | the span wraps 放热 / 吸热, not the ch13 and ch18 rows 放热的 / 吸热的 | Chinese drops 的 before 反应 and after the verb 放热 (4.1); the span stays on the concept word |
