# Config: 化学（第2版）, Chapter 17 (translation)

The translation pass of `Chemistry 2e` chapter 17 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch17, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added to `glossary-ch17.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `notes-ch17.md` carries the same entry.

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
| ch17/17.1/text.html | #ex-acidic step 4, #ex-basic step 4 | written 配平每个半反应中的 H，方法是加入 H⁺ (in #ex-acidic the `em` ends before `<sup>+</sup>`, in the others after it, as in the source) | Chinese word order puts the object (H) before the added ion; the source's tags keep their places |
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
| ch17/17.2/text.html | `cell-notation` spans on 图式, 电池图式 ("cell schematic", "cell diagram") | the spans wrap 图式 and 电池图式 where the glossary has 电池表示式 | the source lists "cell notation", "cell schematic" and "cell diagram" as synonyms; the first is 电池表示式, the other two are 电池图式 and its short form 图式 so that the three words stay apart |
| ch17/17.2/text.html | `redox-reaction` and `system` spans ("this redox system") | written 氧化还原体系, with 氧化还原 and 体系 as two adjacent spans | Chinese says 氧化还原体系; the span on 氧化还原 is shorter than the glossary row 氧化还原反应 because the source's "redox" is the adjective |
| ch17/17.2/text.html | `inert-electrode` span on "inert" ("the inert platinum electrode") | the span wraps 惰性 only | the source wraps one English word; 惰性 stands before 铂电极 and the span stays in its block |
| ch17/17.2/text.html | spans `nitrate` on 硝酸银 (transfer, galvanic, notation), 硝酸铜 and 硝酸铜(II), 硝酸银(I) | the span wraps the whole Chinese compound name; the concept word is 硝酸盐 | Chinese names the compound in one word; the source wraps only "nitrate" of "silver nitrate" (translate.md 3.3; same as the ch01 compound-name row) |
| ch17/17.2/text.html | galvanic, "an aqueous silver nitrate solution" (span `mixtures` on "solution") | written 硝酸银水<span>溶液</span>; the span wraps 溶液, the 水 stays outside | Chinese says 水溶液 for "aqueous solution"; the span keeps the concept word 溶液 and stays in its block |
| ch17/17.2/text.html, ch17/17.2/section.json | `\text{overall reaction:}`, `\text{net cell reaction:}`, `\text{oxidation half-reaction:}`, `\text{anode (oxidation):}` | the words are translated, the punctuation inside `\text{}` is full-width (总反应：, 阳极（氧化）：), the one convention of the chapter (all seven pages; review pass) | a Chinese label inside `\text{}` is prose, so it takes the Chinese punctuation; the TeX outside the label stays ASCII (translate.md 3.5); the same holds for `\text{（碱性溶液）}` (17.2) and `\text{（绿色）}`, `\text{（蓝色）}` (17.6) |
| ch17/17.2/text.html | notation, guidelines, "vertical parallel lines" | translated as 竖直的平行线 as the source says | the source's wording is kept although the schematics use single and double bars; nothing corrected |
| ch17/17.2/figures.js | sim-galvanic-cell, `legend` row `'Fe³⁺ in, Fe²⁺ out'` | written `'Fe³⁺ 进，Fe²⁺ 出'` | a legend slot is 270 px wide at size 26; the short form keeps the line inside it (translate.md 4.7) |
| ch17/17.2/figures.js | sim-galvanic-cell, hover names (`name:` of `kinds`) | "a copper(II) ion, Cu²⁺, entering…" written with the noun first and no article (铜(II)离子 Cu²⁺，从阳极进入溶液); a/an dropped everywhere | English article grammar collapses to one Chinese form (translate.md 4.1) |
| ch17/17.2/figures.js | sim-galvanic-cell, `views` labels | `front` and `above` written 正视 and 俯视 | view buttons are reader-visible words (translate.md 5, figures.js item 1) |

### ch17/17.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.3/text.html | `standard-hydrogen-electrode` spans on `SHE` (8 places) | the span wraps SHE, the abbreviation, and the spans on the full name wrap 标准氢电极; `SHE` is kept in Latin letters | the source wraps the acronym itself, which is also what the Chinese text prints (标准氢电极（SHE）); an acronym is kept (translate.md 5) |
| ch17/17.3/text.html, ch17/17.6/text.html, ch17/17.7/text.html | `standard-electrode-potential` spans on "standard", "standard reduction potentials", "reduction potential", "standard electrode (reduction) potentials" | the spans wrap 标准 (17.7 alone), 标准还原电势, 还原电势, 标准电极（还原）电势, where the glossary has 标准电极电势 | the source wraps the shorter or longer English variant; Chinese keeps the variant words (还原) inside the span and the span stays in its block (translate.md 3.3) |
| ch17/17.3/text.html | `spontaneous-process` spans on 自发性 and 非自发 ("spontaneity", "nonspontaneous") | the span wraps 自发性 and 非自发 where the glossary has 自发过程 | the English wraps the abstract noun and the adjective; Chinese forms the noun with 性 and the negation with 非 (translate.md 3.3) |
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

### ch17/17.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch17/17.6/text.html | #corrosion note, `oxide` spans in "copper(I) oxide (Cu₂O)" and "copper(II) oxide"; #rust "iron(III) oxide hydrate"; #protection `steel` span in "stainless steel" | the `oxide` spans wrap the whole compound name 氧化铜(I), 氧化铜(II), 氧化铁(III); the `steel` span wraps 不锈钢; the `hydrate` span wraps 水合物 after 氧化铁(III) | Chinese names the compound in one word (ch01 precedent); the span stays in its block |
| ch17/17.6/text.html, ch17/17.6/section.json | `stoichiometry` span, "The stoichiometry of the hydrate varies" | written 化学计量关系在该水合物中是可变的; the span wraps 化学计量 (ch09 row), not the discipline 化学计量学 | "stoichiometry" here is the quantitative ratio, and the sentence keeps the span order (stoichiometry, hydrate, compound) |
| ch17/17.6/text.html | #rust, "the formation of rust does not create a protective layer and so corrosion of the iron continues as the rust flakes off and exposes fresh iron to the atmosphere" | the clause order is turned: 所以铁的腐蚀会继续进行，因为铁锈会剥落并使新鲜的铁暴露于大气之中 | keeps the `corrosion` span before the `atmosphere` span, as in the source |
| ch17/17.6/text.html | #protection, "alloying the iron with other metals" | written 使铁与其他金属形成合金 | English derives a verb from "alloy"; Chinese says 形成合金, with the `metal` span on 金属 |
| ch17/17.6/text.html | #protection, "forms a passivating an oxide layer" (source slip) | written 形成起钝化作用的氧化物层; the doubled article is not carried | a grammar slip of English articles (4.1); the slip is recorded in section.json `notes` |
| ch17/17.6/text.html | #protection, "because as they get used up as they corrode (oxidize) at the anode" (source slip) | written 因为它们在阳极处腐蚀（氧化）而被消耗掉 | the doubled "as" has no Chinese form (4.1); recorded in section.json `notes` |
| ch17/17.6/text.html | #protection, "Iron and other metals may also be protected from corrosion by galvanization" | written 也可以免受腐蚀，所用的方法是镀锌 | keeps the span order metal, corrosion, galvanization (镀锌 would otherwise come before 腐蚀) |
| ch17/17.6/text.html | #corrosion, "half a trillion dollars" | written 五千亿美元 | Chinese counts in 万 and 亿 (4.4) |
| ch17/17.6/text.html | #corrosion note, "Copper metal" (`metal` span) | written 金属铜, the span on 金属 | Chinese word order of the apposition |
| ch17/17.6/text.html, ch17/17.6/section.json | "tarnish on silver", "tarnishing of silver" | written 银失去光泽 / 银的失去光泽 (glossary 失去光泽) | a noun-verb phrase of the glossary row |
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
| ch17/17.7/text.html | #aqueous-nacl, "the electrolysis of either water species (H₂O, H⁺, OH⁻) or solute species" | written 水物种的电解（H₂O、H⁺、OH⁻）或溶质物种…, the `electrolysis-of-aqueous-solutions` span on 水物种的电解 | the English “either … or” shares the word electrolysis between both halves; Chinese says it once, in the first half, where the span stays |
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
