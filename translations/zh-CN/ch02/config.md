# Config: 化学（第2版）, Chapter 2 (translation)

The translation pass of `Chemistry 2e` chapter 2 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch02, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; a new term is added to the chapter shard `ch02/glossary-ch02.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `ch02/notes-ch02.md` carries the same
entry (the shared `translation-notes.md` is the owner's to merge).

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

### ch02/2.6

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch02/2.6/text.html | Table 2.5 name column ("ammonium", "hydronium", "peroxide", "hydroxide", "acetate", … "permanganate") | each ion written with 离子 (铵根离子, 水合氢离子, 过氧根离子, 氢氧根离子, 乙酸根离子 …); the glossary targets of the "… ion" rows are used | the table names ions; Chinese names an ion 酸根离子 and the bare "-ate" has no word of its own (shard row -ate) |
| ch02/2.6/text.html | Table 2.5 related-acid column | acid names written 乙酸, 氢氰酸, 叠氮酸, 碳酸, 硝酸, 亚硝酸, 硫酸, 亚硫酸, 磷酸, 高氯酸, 氯酸, 亚氯酸, 次氯酸, 铬酸, 重铬酸, 高锰酸 | English "-ic/-ous acid" collapse into the Chinese acid names (shard rows -ic, -ous) |
| ch02/2.6/text.html | #polyatomic-ions, "-ate and -ite are suffixes … Per- (short for “hyper”) and hypo- (meaning “under”)" | the English affixes stay in Latin letters inside `<em>`, with the Chinese counterpart in parentheses (“酸根”, “亚…酸根”, “高”, “次”); “hyper” and “under” kept in Latin letters | sentence about the parts of English words (translate.md 4.3); the counterparts are the targets of the shard rows -ate, -ite, per-, hypo- |
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
| ch02/2.6/section.json | exercise cyl2 solution, "a carbide ion" | written 碳离子 (shard row) | the shared glossary has only 碳化物 for the compound; the ion follows 氮离子, 硫离子 |
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
| ch02/2.7/text.html, section.json | "–ide suffix", "-ic", "–ate/–ite/–ous", "hydro-" (binary acid and oxyacid lists, summary) | the English affix stays in Latin letters inside `<em>` with the Chinese counterpart in parentheses: –<em>ide</em>（“化”）, –<em>ic</em>（“酸”）, –<em>ate</em>（“酸根”）, –<em>ite</em>（“亚…酸根”）, –<em>ous</em>（“亚…酸”）, <em>hydro-</em>（“氢”）; extra `em` tags in the blocks | a sentence about the parts of English words (translate.md 4.3); the counterparts are the targets of the shard rows -ide, -ate, -ite, -ic, -ous, hydro- |
| ch02/2.7/text.html | Table 2.10 | the prefixes written 一（mono-）… 十（deca-）, the number column kept; headings 数 / 词头; the table eyebrow 表 2.10 | the table is about the Greek prefixes themselves; Chinese writes the numbers 一, 二, 三… and the English prefix is kept in parentheses (shard row Greek prefix) |
| ch02/2.7/text.html | #hydrates, "adding a term to the name for the anhydrous compound … begins with a Greek prefix … and ends with “hydrate”" | written 在…名称前加上一个词语 … 以希腊数字词头开头 … 以“水合”结尾; "anhydrous" kept in `<em>` with 无水 | Chinese puts the term (五水合) before the compound name (五水合硫酸铜(II)); the word anhydrous is cited as an English word (4.3) |
| ch02/2.7/text.html | #hydrates, "copper(II) sulfate", "sodium carbonate" (spans `sulfate`, `carbonate`) | the spans wrap 硫酸 and 碳酸 inside 硫酸铜(II), 十水合碳酸钠 | the glossary rows are 硫酸盐 and 碳酸盐; Chinese names the compound 硫酸铜, not 铜硫酸盐 (as in 2.6 and ch01) |
| ch02/2.7/text.html | #hydrates, "a hydrate of sodium carbonate" (spans `hydrate`, `carbonate`) | the order of the two spans in the block is `carbonate` then `hydrate` (碳酸钠水合物) | Chinese word order |
| ch02/2.7/text.html | #variable-charge, "The simplest name, “iron chloride,”" | written “氯化铁” | the Chinese name of FeCl₃ is already 氯化铁; here it stands for the unnumbered name, following the Stock rows 氯化铁(II), 氯化铁(III) |
| ch02/2.7/text.html | #variable-charge, "Out-of-date nomenclature used the suffixes –ic and –ous … ferric chloride … ferrous chloride … stannous fluoride … stannic fluoride" | the English old names kept in `<em>` with the Chinese old names in parentheses (氯化铁, 氯化亚铁, 氟化亚锡, 氟化锡); no explanatory clause is added (review pass 2026-10-27: translate.md 3.2) | the passage is about the English suffixes; the Chinese old names are 亚-marked for the lower charge only (shard row -ous / -ic (metal)) |
| ch02/2.7/text.html | #molecular-compounds, "(they cannot both be called carbon oxide)" (span `oxide`) | written “氧化碳”, the span on 氧化 | the ambiguous name in Chinese order (nonmetal first); the span cannot wrap only "oxide" |
| ch02/2.7/text.html | #molecular-compounds, "the prefix mono- is usually deleted"; "CO is named carbon monoxide, and CO₂ is called carbon dioxide" | 词头 <em>mono</em>-（一）; 一氧化碳（carbon monoxide）, 二氧化碳（carbon dioxide） | the Chinese names with the English kept in parentheses where the passage turns on the English spelling (4.3) |
| ch02/2.7/text.html | #molecular-compounds, "the ending vowel in the Greek prefix is sometimes omitted … monooxide … monoxide" | the two English words kept in `<em>`; the sentence translated for meaning | a sentence about English spelling (4.3) |
| ch02/2.7/text.html | #molecular-compounds, "Some examples demonstrating this Some other examples are shown in Table 2.11." | written 一些说明这一点的例子 其他一些例子见表 2.11。 | the garbled sentence of the book stays garbled (3.2) |
| ch02/2.7/text.html | #molecular-compounds, "nitric oxide", "nitrogen monoxide", "nitrous oxide", "dinitrogen monoxide", "dihydrogen monoxide" (two `oxide` spans) | the common names written 氧化氮 and 氧化亚氮 with the English in `<em>`, the systematic names 一氧化氮, 一氧化二氮, 一氧化二氢 with the English in parentheses; the spans wrap 氧化 | the shared rows give 一氧化氮 for both nitric oxide and nitrogen monoxide, which would erase the contrast the passage draws (4.5); shard rows record the traditional common names |
| ch02/2.7/text.html | #binary-acids, "hydrogen chloride … hydrochloric acid" (span `acid` inside `<em>`) | the span wraps 酸 in 盐酸; Table 2.12 names written 氢氟酸, 盐酸, 氢溴酸, 氢碘酸, 氢硫酸 | Chinese names the acid in one word; hydrochloric acid is 盐酸 (shard row hydro-) |
| ch02/2.7/text.html | #binary-acids, "–ic" and "hydro-" list; "the word “hydrogen” is changed to the prefix hydro-" | written 将“氢”一词改为词头 <em>hydro-</em>（“氢”）; 后缀 -<em>ic</em>（“酸”） | the English rule has no Chinese counterpart (4.3), see the affix row |
| ch02/2.7/text.html | #binary-acids, "dissolved in water" (span `dissolved`) | the span wraps 溶解 in 溶解在水中 | the glossary row is 溶解的 (adjective); the verb is used |
| ch02/2.7/text.html | #oxyacids, "the –ate of carbonate is replace with –ic" | written 将碳酸根的 –<em>ate</em>（“酸根”）换成 –<em>ic</em>（“酸”）; the span `carbonate` wraps 碳酸根 | the typo "replace" cannot be kept in translation; the span wraps the ion name (2.6) |
| ch02/2.7/text.html | #oxyacids, "sulfuric acid, not sulfic acid, … sulfurous, not sulfous, acid" (three `acid` spans) | 硫酸（<em>sulfuric acid</em>）、<em>sulfic acid</em>、亚硫酸（<em>sulfurous acid</em>）、<em>sulfous acid</em>; the spans wrap 酸 of 硫酸 and 亚硫酸 and the word acid of the English <em>sulfic acid</em> | the exception is about English forms; Chinese has no 硫 versus 亚硫 ambiguity |
| ch02/2.7/text.html | #oxyacids, "hydrogen carbonate" (span `hydrogen-carbonate`) | the span wraps 碳酸氢 (the binary-style name hydrogen + carbonate, as in 氯化氢), not the glossary 碳酸氢盐 | 碳酸氢盐 is the class of bicarbonate salts; the book's point is the acid named like a binary compound (review pass 2026-10-27) |
| ch02/2.7/text.html | #oxyacids and #nomenclature, "the principle element" | written 主要<span>元素</span> | the book's misspelling of "principal" cannot be kept in Chinese; recorded in notes |
| ch02/2.7/text.html | #binary-acids, "The chemistry of these compounds" (spans `chemistry`, `compound`) | the order of the two spans in the block is `compound` then `chemistry` (这些化合物的化学) | Chinese word order |
| ch02/2.7/text.html | Table 2.13, anion column | each anion written with 离子 (乙酸根离子 … 磷酸根离子) | the glossary rows of the "… ion" forms; same as Table 2.5 of 2.6 |
| ch02/2.7/text.html | the Erin Brockovich note, "the film Erin Brockovich … Oscar" | written <em>《永不妥协》</em>（<em>Erin Brockovich</em>，朱莉娅·罗伯茨凭借该片获得奥斯卡奖）; "Pacific Gas & Electric (PG&E)" written 太平洋煤气电力公司（Pacific Gas &amp; Electric，PG&amp;E）; "Environmental Working Group" written 环境工作组织（Environmental Working Group） | the Chinese title of the film is 永不妥协; organisation names have the English kept once in parentheses (shard rows); Edward Masry kept in the original |
| ch02/2.7/text.html | the Erin Brockovich note, "&#36;333 million" | written 3.33 亿美元 | Chinese counts in 亿 (4.4); the amount is written with the currency word, as ch17 17.6 (五千亿美元), not with the symbol (review pass 2, 2026-10-27) |
| ch02/2.7/text.html | the Erin Brockovich note, "to fight corrosion in a nearby natural gas pipeline" (spans `corrosion`, `gas`) | written 为防治附近一条<span>天然气</span>管道的<span>腐蚀</span>, the span on 天然气 | the order of the two spans in the block is `gas` then `corrosion`; the span wraps the whole compound word as in ch01 |
| ch02/2.7/text.html | "parts per billion", "soluble" | 十亿分率 (span wraps it); 不易<span>溶</span>于水, 较易<span>溶</span>于水 (the span wraps 溶 only) | 在水中不太可溶 is a calque; the span stays on the word 溶 of the shard row 可溶的 and the ch18 shard row (review pass 2026-10-27) |
| ch02/2.7/text.html | #ionic-compounds, "the positive ions must be …" (span `ion`) | the span wraps 离子 of 正离子 | Chinese 正离子 |
| ch02/2.7/section.json | exercises e5 (f), "sodium bisulfate (the common name for sodium hydrogen sulfate)" | written 酸式硫酸钠（硫酸氢钠的俗名） | the common name 酸式硫酸钠 is the traditional Chinese word for a bisulfate |
| ch02/2.7/section.json | exercise e6 prompt, "mercurous", "ferric", "cupric" | written 氯化亚汞, 硝酸铁, 溴化铜; the answers the Stock names with numerals | the old –ous/–ic names are 亚-marked for the lower charge only in Chinese; the prompt asks for the IUPAC name |
| ch02/2.7/figures.js | `NAME[a[0]] + ' atom'` (hover names, 2 places) | becomes `NAME[a[0]] + '原子'`; `NAME` is 铬, 氧 | English article-free noun phrase; the Chinese noun follows |
| ch02/2.7/figures.js | readout small line, "The formula … counts …, which together carry a charge of 2−; the structural formula adds how they are connected" | rewritten as `化学式 ${m.uni} 含有${m.count}，它们合起来带有 2− 的电荷；…` with the same two branches | English word order; the `count` phrases lose their articles and take numerals with 个 (一个铬原子和四个氧原子) |
| ch02/2.7/figures.js | the choice `label`s and options | `\text{离子}`, `\text{模型}`, 铬酸根离子, 重铬酸根离子, 结构式, 球棍模型; the view presets 'front', 'above' written 正视, 俯视 | reader-visible strings; the `value` keys unchanged |
| ch02/2.7/text.html | #hydrates, `<span data-concept="hydrate">hydrate</span>` in "ends with “hydrate”" | the span wraps 水合 (以“水合”结尾), where the glossary has 水合物 | the rule describes the English name ending; the Chinese name begins with the prefixed 五水合, so only the stem 水合 is quoted |
| ch02/2.7/text.html | #molecular-compounds, `acidic-solution` span on "acidic properties" | the span wraps the adjective 酸性, where the glossary has 酸性溶液 | the source tags the adjective "acidic"; Chinese 具有酸性 has no noun to carry 溶液 |
| ch02/2.7/text.html | #variable-charge, "some main group <span data-concept="representative-metal">metals</span>" | the span wraps 主族金属, not 金属 alone | the source wraps "metals" after "main group"; the glossary target is the compound 主族金属 |
| ch02/2.4/text.html | Portrait of a Chemist and #isomers, span `molecular-structure` on "molecular structures" | written 分子结构 (span wraps it), not the book-wide 分子构型 | 分子构型 is the 3-D shape (VSEPR, ch07) and would define isomers as stereo-isomers only; the book means structure in general, connectivity included (review pass 2026-10-27) |
| ch02/2.4/text.html | #subscripts, "distinctly different species" | written 截然不同的化学物种 | 物种 alone reads as a biological species; shard row `species` (review pass 2026-10-27) |
| ch02/2.4/text.html, ch02/2.7/figures.js | 3D view presets labelled "above" | 俯视 (as in 2.2 and the ch09 shard row `above`) | one form for the same view preset in the chapter (review pass 2026-10-27) |
| ch02/2.4/figures.js, ch02/2.7/figures.js | 3D view presets 'front', 'side' | 正视, 侧视 (shard rows `front`, `side`; the ch09 shard has `front` 正视) | one series 正视 / 侧视 / 俯视 for the camera words (review pass 2, 2026-10-27) |
| ch02/2.5/text.html | #metals-nonmetals, "malleable … and ductile" and the metal definition | written 有展性 … 延性, 没有展性和延性 (shard rows `malleable`, `ductile`) | 延展性 is the joint term (malleability + ductility), so 延展性和延性 would name ductility twice; the ch10 and ch18 shards still write 延展性 / 有延展性的 for malleable, left for the owner to reconcile (review pass 2026-10-27) |
| ch02/2.5/text.html | #metals-nonmetals and the opening paragraph, "conduct heat and electricity", "good/poor conductors of heat and electricity" (spans `heat-flow`) | 导热和导电 with the span on 热; 热和电的良导体 with the span on 热 | 热量 is the quantity, not the thing conducted (shard row `heat`: the adjective in 导热 is not a span of 热量); the span is kept and shortened to 热 (review pass 2026-10-27) |
