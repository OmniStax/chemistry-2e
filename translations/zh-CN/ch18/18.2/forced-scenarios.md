| File | Span or line | What was done | Why |
|---|---|---|---|
| ch18/18.2/text.html | spans on compound names: oxide (氧化物锡石, 氧化铝, 氧化锌, 氧化镁, 氧化锡(IV)), hydroxide (氢氧化钠, 氢氧化铝, 氢氧化钙, 氢氧化镁), acid (盐酸), gas (氯气) | the span wraps the whole Chinese compound name; in 不纯的氢氧化氧化铝 the hydroxide span wraps 氢氧化 and the oxide span 氧化铝 | Chinese names these compounds in one word, the concept word cannot be separated (same as ch01) |
| ch18/18.2/text.html | `<span data-concept="energy-and-work">energy</span>` in "electrical energy" | span wraps 电能 | Chinese 电能 is one word; 能量 cannot stand alone in it |
| ch18/18.2/text.html | "Ions of metals in of groups 1 and 2" | written 第 1、2 族金属的离子, the doubled preposition "in of" has no counterpart | typo of the source with no Chinese form (4.1); the English stays in section.json notes |
| ch18/18.2/text.html | "The principle tin ore", "the principle lead and thallium ores" | written 主要的 | misspelling of "principal" has no Chinese form |
| ch18/18.2/text.html | "In honor to the two inventors" | written 为纪念这两位发明者 | grammatical slip of the source has no Chinese form |
| ch18/18.2/text.html | "Charles M. Hall", "Paul L. T. Héroult", "Oberlin College in Ohio" | 查尔斯·M·霍尔, 保罗·L·T·埃鲁, 俄亥俄州奥伯林学院; initials kept | person and place names rendered by their standard Chinese forms (2.7) |
| ch18/18.2/text.html | "the chapter on fundamental equilibrium concepts" | 基本平衡概念一章, with a 平衡 span as in the source's "equilibrium" | the ch13 title is not yet translated; literal rendering |
| ch18/18.2/text.html | math `\begin{array}…` lines `\text{at the cathode:}` etc. | `\text{阴极:}`, `\text{阳极:}`, `\text{总变化:}` with ASCII colon | ASCII inside math (3.5) |
| ch18/18.2/section.json | e1 solution `\text{countercurrent} \\ \text{fractionating} \\ \text{tower}` | `\text{逆流} \\ \text{分馏} \\ \text{塔}`, three rows kept | the array structure is TeX outside `\text{}` and stays byte for byte; Chinese breaks the word 分馏塔 over the three rows |
| ch18/18.2/section.json | e9 prompt "a type of metal (an alloy …)" | written 某种金属（…的合金） | translated as printed (the source's "type metal" is not corrected) |
| ch18/18.2/section.json | e6 solution "much as the oxycarbonate layer does on magnesium" | 碱式碳酸盐层 | no standard Chinese for "oxycarbonate"; pending term |
| ch18/18.2/figures.js | view labels `front`, `above`; pickable names and `v.label`s | 正面, 上方 and Chinese names; "a sodium ion, Na⁺" etc. written 钠离子 Na⁺ (the English article and "a … of" frames collapse) | English `a`/`an` have no Chinese form (4.1) |
| ch18/18.2/figures.js | select label `molten NaCl` / `aqueous NaCl` and the matching `lab` text | 熔融 NaCl / NaCl 水溶液 | Chinese word order |
