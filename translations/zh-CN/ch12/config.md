# Config: 化学（第2版）, Chapter 12 (translation)

The translation pass of `Chemistry 2e` chapter 12 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch12, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added to the chapter shard `glossary-ch12.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `notes-ch12.md` carries the same entry. The page
agents' `forced-scenarios.md` files were folded in here by the chapter merge; the rows that
only repeated a book-wide rule (the figure and sim eyebrows, the figure citations, the credits)
became one row each under "Every page".

### Every page

| File | Span or line | What was done | Why |
|---|---|---|---|
| every text.html | figure and sim eyebrows; table eyebrows `Table 12.1` to `Table 12.3` | `Figure N.M`, `Figure N.M + N.M`, `Sim` and the bare `Figure` kept; the table eyebrows written 表 12.1 to 表 12.3 | the checker matches the eyebrow against its row exactly and the app localises it (translate.md 4.6); table eyebrows are translated as in ch01 |
| every text.html, every section.json | figure citations in the prose and in `original_caption` | written 图 N.M, 图 12.15（<em>a</em>）, plain text until the app's figure link pattern reads 图 | the app links only `Figure N.M` (translate.md 4.6); recorded once per book |
| ch12/12.1/text.html, ch12/12.1/section.json, ch12/12.2/text.html, ch12/12.3/text.html, ch12/12.6/text.html, ch12/12.7/text.html | photo credits (Iqbal Osman; James P Fisher III; modification of work by NASA; Loren Kerns; credit a Mario Molina, credit b NASA) | （来源：Iqbal Osman）, （来源：James P Fisher III）, （来源：改编自 NASA 的作品）, （来源：Loren Kerns）, （来源 a：马里奥·莫利纳提供；b：改编自 NASA 的作品）; names kept as printed except Molina (chapter shard row) | the one credit formula of ch01 (review pass 5) |
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
| ch12/12.1/text.html | `data-concept="stoichiometry"` spans (8) | the span wraps 化学计量关系, where the glossary row stoichiometry is 化学计量学 | "the reaction stoichiometry" is the relation of amounts in one reaction, not the discipline; chapter shard row reaction stoichiometry |
| ch12/12.1/text.html | rate-of-decomposition equation, first cell `\text{rate of decomposition of}\;H2O2` | written `{\text{H}}_{2}{\text{O}}_{2}\;\text{的分解速率}`, the formula before the \text phrase | Chinese puts the possessor before 的分解速率; the TeX is otherwise unchanged |
| ch12/12.1/text.html | glucose test equations, `\text{catalyst}` over the arrows (2) | written `\text{催化剂}` | words in \text{} are translated (translate.md 5) |
| ch12/12.1/text.html | "the symbol delta (Δ) indicates “change in.”" | 符号 Δ（德尔塔）表示“……的变化” | the Greek letter's name is given in Chinese; the sentence is about a symbol, not English |
| ch12/12.1/text.html | `sim-head` of 12.5, "ammonia ... decomposes at 1100 °C" and prose "Figure 12.5 illustrates the change in concentrations ... for the decomposition of ammonia into nitrogen and hydrogen at 1100 °C" | clause order changed (各浓度随时间的变化，对应于氨在 1100 °C 下分解为氮和氢的过程); every span kept in the same block | Chinese word order |
| ch12/12.1/text.html | "three moles of H2 are produced for each mole of N2 produced" | 生成 3 摩尔 H₂ 的同时生成 1 摩尔 N₂ | Chinese has no "for each" with the same word order; both mole spans kept in source order |
| ch12/12.1/text.html | "approximately 30 seconds" (spans `time` > `second`) | 大约 30 秒, the `second` span on 秒 inside the `time` span | nested spans kept |
| ch12/12.1/section.json | e5 `answer.parts[].part` (English labels such as "(a) average rate, 0 to 10 s") and cyl2 parts | kept English byte for byte | translate.md 5 keeps `part`; the same open question as ch01/1.4 and 1.6 (owner to decide) |
| ch12/12.1/section.json | e5 prompt "a graph of time versus [A]" | 由时间对 [A] 的图, as printed (time on the horizontal axis) | the book's own wording, not improved |
| ch12/12.1/section.json | e2 solution: "the minus sign makes its term a positive rate", "oxygen appears 3/2 times as fast" | translated with 速度 for "as fast" (所以氧出现的速度是臭氧消失速度的 3/2 倍) | ordinary adverb of speed, not the quantity rate |
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
| ch12/12.2/text.html, section.json | `data-concept="area"` spans, "surface area" (states, Figure 12.6 caption, summary) | the span wraps 表面积 (chapter shard row surface area) and not 面积 alone | Chinese names the quantity in one word |
| ch12/12.2/text.html | states: `solid` and `liquid` spans in "(solid, liquid, gaseous, dissolved)" and "a solid phase and either a liquid or gaseous phase" | spans wrap 固态, 液态 in the list and 固相, 液相 in the phase sentence; 固体 is kept for "large solid particles" | the list names states (ch01 precedent); "solid phase" is 固相 in Chinese |
| ch12/12.2/figures.js | `topline`, `hits + (hits === 1 ? ' collision' : ' collisions')` | collapsed to ` 次碰撞` | English plural branch (4.1) |
| ch12/12.2/text.html | temperature: "doubled when the temperature is raised by 10 °C" | order changed to 反应速率在温度升高 10 °C 时大约增加一倍; the span stays on the same words | Chinese word order |

### ch12/12.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.3/text.html | `data-concept="peroxide"` span, "hydrogen peroxide" | the span wraps the whole compound name 过氧化氢 | Chinese names the compound in one word; the span cannot wrap only "peroxide" (as ch12/12.1) |
| ch12/12.3/text.html | `data-concept="oxide"` span, "nitric oxide, NO" (Example 12.4) | the span wraps 一氧化氮 | same: one Chinese compound word; "nitrogen oxides" keeps the span on 氧化物 in 氮氧化物 |
| ch12/12.3/text.html | `data-concept="stoichiometry"` span, "reaction stoichiometry" | the span wraps 化学计量关系, where the glossary row stoichiometry is 化学计量学 | the relation of amounts in one reaction, not the discipline (as ch12/12.1; chapter shard row reaction stoichiometry) |
| ch12/12.3/text.html | `data-concept="ozone"` span, "ozone hole" | span on 臭氧, 空洞 follows outside | glossary row ozone hole 臭氧空洞; the source spans only "ozone" |
| ch12/12.3/text.html | `data-concept="coefficient"` span, "stoichiometric coefficients" | written 化学计量<span>系数</span> | chapter shard row stoichiometric coefficient 化学计量系数 (12.1); the span keeps the word 系数 |
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
| ch12/12.3/section.json | cyl2 prompt, "an alcohol" (transesterification) vs e10 "Alcohol is removed from the bloodstream" | 醇 (the compound class) in cyl2, 酒精 (glossary alcohol) in e10 | two senses of the English word; chapter shard row alcohol (compound class) |
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
| ch12/12.4/text.html | "pseudo-zero-order" | 准零级 | the prefix pseudo- has Chinese form 准 (chapter shard row) |
| ch12/12.4/text.html | `data-original-caption`, "Figure 12.9 ... Figure 12.11", prose citations "Figure 12.2" | （图 12.9）…; 图 12.2 plain text; eyebrows `Figure 12.9 + 12.10 + 12.11`, `Figure 12.12` and table eyebrow 表 12.2 | recorded once per book (translate.md 4.6) and the table-eyebrow decision of ch01 |
| ch12/12.4/text.html, section.json | `\text{slope}`, `\text{or}`, `\text{change in}\;y` | `\text{斜率}`, `\text{或}`, `y\;\text{的变化量}` | words in \text{} are translated; "change in y" reordered because Chinese puts the quantity before 的变化量 |
| ch12/12.4/text.html | "(one near each end of the line is preferable)" | 最好在直线两端附近各取一个 | ordinary sentence, Chinese word order |
| ch12/12.4/text.html | table head "plot needed for linear fit of rate data", "$[A]$ vs. $t$" | 对速率数据作线性拟合所需的图; `$[A]$ 对 $t$` | "A vs. t" is written 对 in Chinese (as ch01) |
| ch12/12.4/text.html, section.json | "hours" in "from 0.00 hours to 6.00 hours" | 小时 | a unit word in prose without symbol |
| ch12/12.4/section.json | `answer.parts[].part` of e2, e3, e11, e13 (English labels "order", "k", "order in penicillin", "half-life", "cyclopropane remaining") | kept English byte for byte | translate.md 5 keeps `part`; the same open question as ch01/1.4 and ch12/12.1, 12.3 (owner to decide) |
| ch12/12.4/section.json | cyl3, cyl5, cyl7, e7, e17 solutions (`0.0195 mol/L`, `35 min`, `18 min`, `8.3 × 10<sup>7</sup> s`, the k table) | left as printed | pure numbers, units and symbols; translation_parity reports them as untranslated |
| ch12/12.4/section.json | e5 prompt, `day<sup>−1</sup>` | written 天<sup>−1</sup>; `answer.unit` `d` kept | unit without a symbol takes the target name in prose (4.4), as ch12/12.3 e8 |
| ch12/12.4/section.json | e11 prompt, "molecular weight of 3 × 10⁴ g/mol" | 分子量 … g/mol as printed | the book gives a molar-mass unit with the word weight; kept as printed (chapter shard row molecular weight) |
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
| ch12/12.5/text.html | "postulates 2 and 3" | 假设 2 和假设 3; heading "Postulates of collision theory" 碰撞理论的基本假设 | Chinese renders postulate as 假设; no glossary row (chapter shard) |
| ch12/12.5/text.html | `data-original-caption`, "Figure 12.13 ... 12.14", prose citations "Figure 12.13/12.14/12.15(a)/(b)/12.16" | （图 12.13）…; 图 12.13 etc. plain text; 图 12.15（<em>a</em>）and （<em>b</em>）; eyebrows `Figure 12.13 + 12.14`, `Figure 12.15`, `Figure 12.16` kept | recorded once per book (translate.md 4.6); part labels written full-width in prose |
| ch12/12.5/text.html | display equation `\text{reaction rate}`, `\text{collisions}`, `\text{time}`; `\text{Slope}`, `\text{or}`, `\text{slope}` | 反应速率, 碰撞次数, 时间; 斜率, 或 | words in \text{} are translated (translate.md 5); `\text{ln}` kept as a function name |
| ch12/12.5/text.html | "Alternative approach" | `<em>另一种方法</em>` | label word translated, the em kept |
| ch12/12.5/text.html | "(see chapter on thermochemistry)", "(see chapter on gases)" | （见热化学一章）, （见气体一章）; the spans on 热化学 and 气体 | the book's cross-reference to a chapter, spans kept |
| ch12/12.5/text.html | "activation barriers" | 活化能垒 | no glossary row; the usual textbook rendering (chapter shard row) |
| ch12/12.5/text.html | "muzzle flash", "gunpowder" | 枪口火焰, 火药 | everyday terms, no glossary row (chapter shard) |
| ch12/12.5/section.json | e7 prompt, solution and answer.parts[].unit "times" | prompt "How much faster … at 45 °C than at 25 °C?" written 速率是 25 °C 时的多少倍？; solution "(a) 4-times faster (b) 128-times faster" written （a）是 25 °C 时的 4 倍 （b）是 25 °C 时的 128 倍; the `unit` value "times" kept as printed | 快 4 倍 reads in Chinese as 5 times the rate, so the key (2² = 4, 2⁷ = 128) is written as a ratio; `answer.parts[].unit` is not translated (translate.md 5) (review pass) |
| ch12/12.5/section.json | e9 prompt, "p-nitrophenyl phosphate (PNPP)", "p-nitrophenoxide ion (PNP)" | 磷酸对硝基苯酯（PNPP）, 对硝基苯酚根离子（PNP）; "ALP–catalyzed" ALP 催化的 | the abbreviations are kept; the Chinese names are the systematic ones (chapter shard rows) |
| ch12/12.5/section.json | exercise_notes, "PhET" and the fs- ids | PhET and the ids kept | proper name and ids |
| ch12/12.5/section.json | derivation `src` "Example 12.13", "Appendix B", `source` | 例 12.13, 附录 B, 化学（第2版），12.5 碰撞理论，例 12.13 | src words are translated (translate.md 5) |
| ch12/12.5/figures.js | `NAMES` hover names ("an oxygen atom from the carbon monoxide molecule" ...) | 一氧化碳分子中的氧原子, 一氧化碳分子中的碳原子, 氧分子中的氧原子 | English article and "from" frame collapse to one Chinese form (4.1) |
| ch12/12.5/figures.js | sim-collision `side` choice | label `\text{先碰撞的一端}`, options 氧端先碰, 碳端先碰, headline 氧撞击氧： | "strikes" and "oxygen end first" have no single Chinese word; the headline "Oxygen strikes oxygen" keeps the two nouns |
| ch12/12.5/figures.js | sim-collision headline, "with at least $\kEa$" / "with less than $\kEa$" | 以至少 $\kEa$ 的能量撞击 / 以小于 $\kEa$ 的能量撞击 | Chinese needs 的能量 after the quantity |
| ch12/12.5/figures.js | sim-collision `views` labels 'side', 'above' | 侧面, 上方 | 'side' is 侧面 (正面 is 'front'; review pass) |
| ch12/12.5/figures.js | sim-distribution headline template | rewritten in Chinese word order with the same slots (在 … 时，有 …% 的分子达到 …，而在 … 时为 …%) | English frame "X% reach …, against Y% at …" cannot keep slot order |
| ch12/12.5/figures.js | sim-arrhenius-plot headline template and `points` options | 在 … K 与 … K 之间，…：斜率为 … K。 and `… K 和 … K` | English "Between … and …, … over …: a slope of" cannot keep slot order |

### ch12/12.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch12/12.6/text.html | `data-concept="oxide"` spans, "nitric oxide" (termolecular, 2 places) | the span wraps the whole compound name 一氧化氮 | Chinese names the compound in one word; the span cannot wrap only "oxide" (as ch01/1.2) |
| ch12/12.6/text.html | `data-concept="termolecular-reaction"` span, "An elementary **termolecular reaction** involves …" | written 基元的<strong><span>三分子反应</span></strong>涉及…, the span on the whole concept name | the source's span wraps both words of the concept; the word order of "elementary termolecular reaction" becomes 基元的三分子反应 |
| ch12/12.6/text.html | `data-concept="temperature"` span, "at high temperatures" | 在高<span>温度</span>下, the span on 温度 | Chinese says 高温度 only as 高温; the span keeps the glossary word and its place |
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
| ch12/12.6/figures.js | `views` labels 'front', 'edge on', 'above' | 正面, 侧向, 上方 | 'front' as ch12/12.2 and ch12/12.3, 'above' as ch12/12.5 |
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
| ch12/12.7/text.html | "Mario J. Molina, Paul J. Crutzen, F. Sherwood Rowland", "Mexican", "MIT" | 马里奥·J·莫利纳, 保罗·J·克鲁岑, F·舍伍德·罗兰; MIT written 麻省理工学院（MIT） in the first sentence of the box and MIT after | person names without a fixed rendering (chapter shard rows); the acronym is kept after its Chinese name (shared glossary row Massachusetts Institute of Technology) |
| ch12/12.7/text.html | alt of Figure 12.22 "N A D P superscript plus", "N A P D H", "G S S G", "A T P" | translated around the letters; the spaced letters and the source's "N A P D H" typo kept as printed, "superscript plus" written 上标加号 | the alt spells the labels of the figure letter by letter; the source's error stays |
| ch12/12.7/text.html | Table 12.3 cells "group elimination to form double bonds", "bond formation with ATP hydrolysis" | 基团消除以形成双键; 伴随 ATP 水解的键的形成 | the class names are rows pending at the chapter shard (氧化还原酶 … 连接酶) |
| ch12/12.7/figures.js | `\text{cat}` and `\text{uncat}` in the subscripts of E_a and k (slider label, readout, 3 constants) | 催化 and 未催化 | words in `\text{}` are translated; a subscript wants the shortest form of "catalyzed" and "uncatalyzed" |
| ch12/12.7/figures.js | hover names 'first'/'second' transition state of the catalyzed path | the ternary keeps both branches: 催化路径的第二个 / 催化路径的第一个 + 过渡态 | the ordinal word is part of the string; the code around it stays |
| ch12/12.7/section.json | `notes` | rewritten for the Chinese text; the English words "two transitions states" quoted with （原文如此） | the note quotes an error of the source's figure caption, which the translation cannot carry |
| ch12/12.7/section.json | cyl1 and e7 `answer.parts[].part` and `unit` | `part` ("$\kEa$ of the first step, diagram (a)", "(a)") and `unit` kept as printed | not in the translated list of translate.md 5 (owner note, as ch12/12.6 and ch01) |
| ch12/12.7/section.json | `figures[].original_caption`, `referents[].label`, exercise prompts and solutions: "(a)", "(b)" part labels | full-width （a）（b） in prose, ASCII inside `$…$` and `\text{}` | chapter 1 decision |
| ch12/12.7/section.json | e3 prompt math `\text{sunlight}` | 日光 | words in `\text{}` are translated; as ch12/12.6 |
| ch12/12.7/section.json | e8 prompt "Exercise 12.81", e9 prompt "Exercise 12.82" | 习题 12.81, 习题 12.82 | the numbers are kept; "Exercise" is a label of the book's apparatus, written 习题 as the exercise kind |
| ch12/12.7/section.json | footnote c-nitric-oxide | translated with the equation kept; "nitric oxide" 一氧化氮 | correction note of the preparation, translated whole |
