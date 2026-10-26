| File | Span or line | What was done | Why |
|---|---|---|---|
| text.html | #si-units, #prefixes table rows (femto … tera) | prefix names written with the English in parentheses in the table (飞（femto）…); in the prose 词头<em>千</em>（kilo） | the passage is about the prefix names themselves, which are given as English words (4.3) |
| text.html | #temperature, "kelvin (all lowercase)" | rendered 开尔文（kelvin，全部小写） | a sentence about English spelling and case (4.3) |
| text.html | #volume, "The abbreviation cc (for cubic centimeter)" | rendered 缩写 cc（来自英文 cubic centimeter，即立方厘米），the strong letters c kept | a sentence about the letters of an English abbreviation (4.3) |
| text.html, section.json, figures.js | dime (Figure 1.25 sim-head, original_caption, sim-volume label '1.8 cm dime') | rendered 10 美分硬币 | a US coin with no Chinese equivalent, named by its value (4.4) |
| text.html, section.json | inches, feet, yards, miles, pounds, gallons, quarts, pints in prose and exercise e1 | named 英寸、英尺、码、英里、磅、加仑、夸脱、品脱; symbols (in., yd, ft, yr) kept as printed | units with no SI equivalent keep their symbol and take the Chinese name in prose (4.4) |
| text.html | #si-units, "from the French, Le Système International d’Unités" | rendered 源自法语 and the French title kept in <em> | the French phrase is the origin of the abbreviation SI; no Chinese equivalent (4.3) |
| text.html | Example 1.2 solution, the simulator button “turn fluid into water” | rendered “将流体变为水”, and the material “iron” as “铁” | the PhET interface is translated for the reader as the instruction reads (no equivalent label fixed) |
| figures.js | sim-density MATS names, REF keys, `name === '金'`; sim-displacement MATS names and the `who` map keys | the display names of the materials are translated in place, and the object keys / comparison that look the name up (REF { 铅, 金 }, { 铁, 木 }, name === '金') follow them | the display name is also the lookup key in the code; the logic is unchanged |
| figures.js | sim-density headline, hover names; sim-displacement headline, hover names, block labels | operand order changed ('A cube of NAME A cm on an edge' to '棱长为 A cm 的NAME立方体'; 'the NAME block' to NAME块; the leading 'a cube of' dropped from the hover name); the leading articles dropped | Chinese word order; English articles have no Chinese form (4.1) |
| figures.js | sim-density `other` sentence | 'times as dense as gold' / 'times as dense' rendered 的密度是金的 N 倍 / 的密度是它的 N 倍 | Chinese word order |
| section.json | exercises[s1].answer.parts[].part | '(a) mass', '(a) volume', '(b) density' left in English | translate.md 5 lists answer.parts[].part as kept byte for byte; orchestrator to decide |
| section.json | exercises[cyl2].answer.unit, s1 parts unit (g/mL, mL, g) | unit symbols kept | unit symbols |
