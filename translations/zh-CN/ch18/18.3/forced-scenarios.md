# Forced scenarios, ch18/18.3

| File | Span or line | What was done | Why |
|---|---|---|---|
| text.html | `room temperature` (boron paragraph), `high temperatures` (silicon tetrachloride, zone refining, silicon with halogens): spans on 室温 and 高温 (3 spans) | the `temperature` span wraps the whole compound 室温 or 高温, whose concept word is 温度; other `temperature` spans wrap 温度 | the source wraps one English word of "room temperature", "high temperatures"; Chinese names each in one word (as in ch01) |
| text.html | zone refining, "a heat source" (2 spans) | the `heat-flow` span wraps 热源, the compound that contains 热 | Chinese says 热源 for "heat source"; the glossary 热量 would not fit (4.5, as 加热 in 1.2) |
| text.html | "hydrogen gas" (silicon + hydroxide) | the `gas` span wraps 氢气 | 氢气 is one word; the span cannot wrap only 气 |
| text.html | `liquid silicon`, `Solid carbon dioxide`, `solid B(OH)3` | the `liquid` and `solid` spans wrap 液态 and 固态 (the state used as an adjective); the noun spans stay 液体 and 固体 | Chinese says 液态硅, 固态二氧化碳 (as in ch01 1.2) |
| text.html | boric acid, hydrochloric acid, hydrofluoric acid, fluoroboric acid, metaboric acid, tetraboric acid, orthosilicic acid; "nitric or sulfuric acid"; boric oxide, magnesium oxide (`acid` and `oxide` spans) | each span wraps the whole Chinese compound name (硼酸, 盐酸, 氢氟酸, 氟硼酸, 偏硼酸, 四硼酸, 原硅酸, 硝酸或硫酸, 氧化硼, 氧化镁); `concentrated` wraps 浓 and the `acid` span wraps 硝酸或硫酸 | Chinese names the compound in one word; the span cannot wrap only "acid" or "oxide" (as in ch01) |
| text.html | "reacts rapidly with hydroxide groups" (`hydroxide` span) | the span wraps 羟基 | the group is 羟基 in Chinese; 氢氧化物 names the compound class |
| text.html | "Silicon dioxide, silica, occurs in …" | written 二氧化硅（又称硅石）; "also called silica" (glass) written 也称为二氧化硅; "glassy silica" 玻璃态二氧化硅; "silica glass" 石英玻璃 | an appositive synonym; the glossary row silica is 二氧化硅 and 硅石 is its alias in Chinese; 石英玻璃 is the glossary row for silica glass |
| text.html | "The name silicon is derived from the Latin word for flint, silex." | written silicon（硅）这一名称源自拉丁语中表示燧石的词 silex, the English name kept in Latin letters | a sentence about the origin of an English word (4.3) |
| text.html | Searles Lake, CorningWare, Pyrex, Kimax, Wikimedia Commons | kept in Latin letters (加利福尼亚州的 Searles 湖) | a name or brand without a standard Chinese rendering (2.7) |
| text.html, section.json | credit lines (Figure 18.15, Figure 18.18 caption and original_caption) | （来源：“Tweenk”/Wikimedia Commons）, （来源 a：改编自 Erica Gerdes 的作品；b：改编自 Didier Descouens 的作品） | the ch01 credit formula |
| text.html | figure citations in the prose (图 18.12 to 图 18.18) | written 图 N.M | recorded once per book (translate.md 4.6) |
| text.html | "silicon is<em>sp</em><sup>3</sup><em>d</em><sup>2</sup> hybridized" | written 硅以 … 杂化 with a space between the Chinese and the Latin | the source's missing space is an English typesetting error (listed in section.json notes); the space between CJK and Latin is the book's rule |
| text.html | "colorless gasses", "due the formation", "The volatility of dry ice reflect" | translated for their meaning (无色气体, 是由于形成了…, 干冰的挥发性反映了…) | English spelling and grammar errors have no Chinese counterpart |
| text.html | the antimony paragraph printed twice | both printed, the second without "Sb₂S₅" (硫化锑(V)) | as in the source |
| text.html | "the boron hydrides" | written 硼氢化物 | as the book words it; 硼烷 is the usual name, see glossary-pending.json |
| text.html | "the structures of arsenic and antimony are similar to … graphite" | 起伏的 for "puckered" | no standard term (glossary-pending.json) |
| text.html | "Silicon … tetrahedron … regular tetrahedron" | 正四面体 / 四面体, the `tetrahedral-geometry` span wrapping 四面体 in "regular tetrahedron" and 四面体形 elsewhere | glossary: tetrahedron 四面体, tetrahedral 四面体形 |
| text.html | Figure 18.17 alt "B subscript 2 O subscript 4 superscript 2 negative sign unit" | B 下标 2 O 下标 4 上标 2 负号 单元 | a spoken description of a formula, translated word by word |
| section.json | notes | the three English-language typos named in the source note are no longer "kept as printed"; the note says they could not be kept and how they were translated | same reason as the text.html rows above |
| section.json | e41 `answer.parts[].part` | `(a) ΔH°` … kept in English labels | the part label is kept (translate.md 5) |
| section.json | e31 solution `1s²2s²2p⁶3s²3p²3d⁰.` | unchanged | pure notation |
| figures.js | INFO names `a boron atom, B`, `an arsenic atom, As`, … and NM `a carbon atom, C` … | articles dropped, written 硼原子，B, 砷原子，As … | English article grammar collapses to one Chinese form (4.1) |
| figures.js | `view3d` views `side`, `top`, `along an axis`, `along a diagonal` | 侧视, 俯视, 沿轴向, 沿对角线 | button labels, translated |
| figures.js | sim-zone-refining readouts `impure end cut off: N of N impurity atoms removed, 0 left …` and `zone at P% of the rod: m of N impurity atoms in the melt, …` | `不纯端已切掉: 已除去 N 个杂质原子(共 N 个), 纯硅中剩余 0 个` and `熔融区位于棒的 P% 处: 熔体中有 m 个杂质原子(共 N 个), 纯硅中剩余 0 个`; the slots keep their order, the Chinese measure word 个 follows each number | the English "m of N" cannot carry both slots in the same order in Chinese; ASCII comma, colon and parentheses inside `\text{}` (4.1, math punctuation) |
| figures.js | sim-co2-sio2 readouts `2 O per C`, `2 O per Si` | `每个 C 对应 2 个 O`, `每个 Si 对应 2 个 O` | English "per" phrase |
