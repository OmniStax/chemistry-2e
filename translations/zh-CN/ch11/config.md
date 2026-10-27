# Config: 化学（第2版）, Chapter 11 (translation)

The translation pass of `Chemistry 2e` chapter 11 into zh-CN, under `docs/prompts/translate.md`.
Each line is a setting and its value.

| Setting | Value |
|---|---|
| Source | `Chemistry 2e` ch11, every page it lists |
| Language | zh-CN |
| Translator | claude-sonnet-5-5, medium effort |
| Terminology | `glossary.zh-CN.json`, read before the first sentence; new terms go to `glossary-ch11.json` (shard); the shared glossary is read only |
| Fidelity | the source's tone, sentences and content; nothing added or removed except the forced scenarios below |
| Humanizer review | deferred to the owner |

## Forced scenarios

Every place where a faithful translation was impossible as the source stands
(translate.md item 4), one row each; `notes-ch11.md` carries the same
entry.

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
| ch11/11.1/text.html | `<span data-concept="solid">solid</span> <span data-concept="mixtures">solutions</span>` (alloys paragraph) | written 固态溶液, the two spans on 固态 and 溶液, instead of the shard row 固溶体 | the source wraps "solid" and "solutions" in two spans; 固溶体 cannot be split over two concepts (translate.md 3.3, no span dropped or moved) |
| ch11/11.1/text.html | `<span data-concept="liquid">liquid</span> <span data-concept="mixtures">solutions</span>` | the liquid span wraps 液态 (not 液体) | the shard row liquid solution is 液态溶液; 液体溶液 is not the Chinese form |
| ch11/11.1/text.html | `<span data-concept="carbonate">carbonate</span>` in "Calcium carbonate"; `<span data-concept="hydroxide">hydroxide</span>` in "sodium hydroxide"; `<span data-concept="nitrate">nitrate</span>` in "Ammonium nitrate" | the span wraps the whole compound name 碳酸钙, 氢氧化钠, 硝酸铵 | Chinese names each compound in one word whose parts cannot be separated (same as the chapter 1 compound-name spans, translate.md 3.3) |
| ch11/11.1/text.html | span `data-concept="alcohol"` | "alcohol (a liquid)" is 酒精 (everyday word of the shared row alcohol); "the alcohols methanol and ethanol" is 醇 (class, shard row alcohols of ch10/ch12) | one concept id, two senses in the source that Chinese names differently |
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

### Review pass (2026-10-27)

| File | Span or line | What was done | Why |
|---|---|---|---|
| ch11/11.3/text.html | spans `dilute` and `concentrated` in "is called dilute ... called concentrated" | written 称为稀溶液 / 称为浓溶液, the spans on 稀 and 浓 | the source wraps the adjective; 称为稀的 is not textbook Chinese, and 11.4 already wraps 稀 and 浓 |
| ch11/11.4/text.html | "Our military forces have a variety of generator-operated RO units" | written 美国军队 | the book is American; to a zh-CN reader 我们的军队 would name the PLA (translate.md 4.4) |
| ch11/11.3/text.html, 11.4/text.html, 11.5/text.html | names of persons at their first mention on a page: Ingrid Eftedal, Jacobus Henricus van't Hoff, Peter Debye, Erich Hückel, Thomas Graham, Frederick Cottrell, Wilhelm Ostwald | the Chinese rendering with the Latin name in parentheses | one rule for the chapter (translate.md 2.7); 英格丽德·埃夫特达尔 has no standard rendering, owner to confirm |
| ch11/11.5/text.html | "heated ... coagulates as it cools" (Gels) | 胶凝, not the glossary's 聚沉 | a sol turning into one viscous gel is 胶凝; 聚沉 stays for exercise e5 (new row `coagulate (of gelatin, sets)`) |
