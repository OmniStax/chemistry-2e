# Forced scenarios, 18.1

| File | Span or line | What was done | Why |
|---|---|---|---|
| text.html | spans on 高温 (`temperature`, magnesium paragraph), 室温 (`temperature`, alkaline earth paragraph), 低温 (`temperature`, tin allotropes), 氢气 (`gas`, 9 spans) | the span wraps the whole Chinese compound that contains the concept's word; the concept words are 温度, 气体 | the source wraps one English word of "high temperatures", "room temperature", "low temperatures", "hydrogen gas"; Chinese names each in one word (translate.md 3.3; Chapter 1 precedent) |
| text.html | alkali paragraph, "very basic (alkaline) solutions" | written 强碱性（alkaline）溶液, span `basic-solution` on 碱性 | "basic" and "alkaline" are both 碱性 in Chinese; the sentence explains the English name "alkaline", so the English word is kept in parentheses (translate.md 4.3) |
| text.html | alkaline earth paragraph, "The name alkaline metal comes from" | written 碱性金属这一名称来自, as printed | the source's slip for "alkaline earth metal" (section notes) is kept, not corrected |
| text.html | group 14 paragraph, "semimetals or metalloids" | collapsed to 硅和锗是半金属的例子, span `metalloid` on 半金属 | the glossary gives 半金属 for both metalloid and semimetal (collision, translate.md 4.5); the two synonyms cannot be told apart in Chinese |
| text.html | group 14 paragraph, "grey (brittle) tin" and "gray tin" | both 灰锡 | the English spelling variants grey/gray have no Chinese counterpart (translate.md 4.3) |
| text.html | group 14 last paragraph, "tin plate-sheet iron, which constitutes the tin in tin cans" | 镀锡薄铁板，它就是“锡罐”（tin cans）中的“锡” | the passage turns on the English word "tin" naming both the metal and the can (translate.md 4.2) |
| text.html | group 12 and group 13 paragraphs, "2+-oxidation state", "3+-oxidation state", "4+-oxidation state" | written 2+ 氧化态, 3+ 氧化态, 4+ 氧化态 | the English hyphenated compound modifier has no Chinese form (translate.md 4.1) |
| section.json summary_html | the sentence on mercury 1+ | reordered to （不过汞也表现出 1+ 氧化态，其化合物中含有 ${\text{Hg}}_{2}{}^{2+}).$ ） so that the printed math run ends the sentence | the printed `${\text{Hg}}_{2}{}^{2+}).$` carries the closing parenthesis and full stop inside the math; kept byte for byte, so the Chinese clause is ordered to end there and its own 。 is not written |
| text.html | amalgam note, "Food and Drug Administration (FDA)", "Environmental Protection Agency (EPA)", "Centers for Disease Control (CDC)" | 美国食品药品监督管理局（FDA）, 美国环境保护署（EPA）, 美国疾病控制与预防中心（CDC） | the Chinese names of these organisations carry 美国, which the English names leave to the context (translate.md 4.4) |
| text.html | figure 18.4 caption, 18.6 caption, 18.8 caption | credits written （来源：http://images-of-elements.com/potassium.php）, （来源：改编自 Sahar Atwa 的作品）, （来源：Sahar Atwa） | Chapter 1 credit form |
| text.html | figure and sim eyebrows | `Figure 18.2` to `Figure 18.9` kept | the checker matches the eyebrow against its row; the app localises it (translate.md 4.6) |
| text.html | figure citations in the prose | written 图 18.x, plain text | recorded once per book (translate.md 4.6) |
| text.html | zinc paragraph, "basic carbonate" | `basic-solution` span on 碱式, `carbonate` span on 碳酸盐 | the English words "basic" and "carbonate" are two spans; Chinese 碱式碳酸盐 is one word, split at the same point |
| figures.js | `STATE` and `CLASS` names, hover `nameOf` | the strings are written as 固体, 液体, 气体 and Chinese class names, joined with full-width （ ） ： ， | reader-visible hover text; no plural or article branch exists in this figure's code |
