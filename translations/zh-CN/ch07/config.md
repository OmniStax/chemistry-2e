# Config: 化学（第2版）, Chapter 7 (translation)

The translation pass of `Chemistry 2e` chapter 7 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch07, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; the terms of this chapter are in `glossary-ch07.json` |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `translation-notes.md` carries the same
entry.

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
| ch07/7.1/figures.js | sim-nacl-lattice, views `face`, `corner` | written 正面, 顶角 | view names, the shortest standard form |
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
| ch07/7.3/text.html, ch07/7.4/text.html | "Nitric oxide" (7.3), "Nitrous oxide" (7.4, Example 7.8 and its figures) | written 一氧化氮 and 一氧化二氮, the 化学名词 names and the ch18 shard's targets; the ch02 shard's 氧化氮 / 氧化亚氮 apply only to the 2.7 passage that contrasts common and systematic names | two shards, two targets for the same source; this chapter follows ch18 and no ch07 row is added (review pass) |
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
| ch07/7.6/text.html | bond-angles, "A bond distance (or bond length)" (two `bond-length` spans) | written 键长（或核间距）, the first span on 键长 and the second on 核间距 | the glossary renders both as 键长, so "键长（或键长）" would be meaningless; the alias 核间距 is the shard's own (collision, translate.md 4.5, as 指数记数法 in ch01) |
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
