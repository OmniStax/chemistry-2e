# Config: 化学（第2版）, Chapter 3 (translation)

The translation pass of `Chemistry 2e` chapter 3 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch03, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added as pending |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` carries the same
entry.

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
| ch03/3.1/section.json | exercise e27 (and glossary row diamond) | 库里南钻石 for "the Cullinan diamond" (天然钻石), 金刚石 stays the mineral/allotrope term elsewhere | the gem's established Chinese name; glossary-ch03 row `Cullinan diamond` is a proper name, not the `diamond` row (review pass) |
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
| ch03/3.3/section.json | molarity exercise (c), "the concentration of isopropyl alcohol in rubbing alcohol" | written 外用消毒酒精 | follows the ch11 shard row `rubbing alcohol` (merge decision) |
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
| ch03/3.4/text.html | `Rubbing <span data-concept="alcohol">alcohol</span>` (Example 3.24) | written 外用消毒<span>酒精</span>（异丙醇），the span on 酒精 only | the glossary row alcohol is 酒精 and the ch11 shard fixes rubbing alcohol as 外用消毒酒精; the span stays on the concept word |
