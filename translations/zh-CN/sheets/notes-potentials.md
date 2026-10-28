# Notes: sheets potentials, half-lives, ksp

| Sheet | Cell | What was done | Why |
|---|---|---|---|
| half-lives | the units in the half-life cells (`5730 y`, `9.97 m`, `15.00 h`, `4.1 × 10<sup>−22</sup> s`, `5.01 d`) | kept as printed; the footnote key is written 年, 天, 小时, 分钟, 秒 | the cells are number and unit tokens kept byte for byte; JJF 1001 would write a, min for year and minute, and the book's `m` for minute is ambiguous with metre, but the key explains it; owner to decide whether the cell units are changed |
| half-lives | `(αorβ<sup>−</sup>)`, `(βorE.C.)`, `(αorE.C.)`, `(αorS.F.)` (7 cells) | "or" written ` 或 ` with spaces: `(α 或 β<sup>−</sup>)` | the source has the English word with no spaces; the Greek letter and Latin abbreviation take a space against CJK |
| half-lives | footnote 2 `<em>E.C.</em>`, `<em>S.F.</em>` | abbreviations kept, explained as 电子俘获 (glossary electron capture) and 自发裂变 | the cells use the abbreviations, so they stay Latin |
| half-lives | `(p)`, `(α)`, `(β<sup>−</sup>)` | kept | symbols |
| half-lives | column `half-life-2` has kind `text`, the first has `formula` | kept | column kind is not translated |
| half-lives | rows 94 Pu (239 twice, 2.407 × 10<sup>4</sup> y and 6.54 × 10<sup>3</sup> y), `<sub>26</sub><sup>49</sup>Fe` (the book prints 49 for 26Fe) | kept as the source prints them | the book's errors stay |
| ksp | `<em>ca</em> 1 × 10<sup>−5</sup>` (MgCO3·3H2O) | written `约 1 × 10<sup>−5</sup>` | Latin "ca" (circa) has the Chinese 约; the `<em>` is dropped with the word |
| ksp | group-header rows (aluminum … zinc) | the element name in the first column, the glossary target, bare name | the second cell stays empty |
| ksp | `CaSO4·2H<sub>2</sub>O` (no subscript on 4), `<sub>2</sub><sup>1</sup>Ag<sub>2</sub>O(Ag<sup>+</sup>+OH<sup>−</sup>)` | kept as printed | formulas are kept byte for byte, the source's own markup flaws included |
| ksp | column label `<em>K</em><sub>sp</sub> at 25 °C` | `25 °C 时的 <em>K</em><sub>sp</sub>` | English postposed "at"; Chinese puts the condition first |
| potentials | `Ce<sup>3</sup>`, `Cr<sup>3</sup>`, `Pu<sup>3</sup>`, `Zr<sup>4</sup>`, `[Zn(OH)<sub>4</sub>]<sup>2</sup>`, `2mol//H<sub>2</sub>SO<sub>4</sub>` | kept | formula cells, the source's missing charge signs left as printed |
| potentials | every row | only the title, table title and column label `Half-Reaction` (半反应) were translated; column `E°` and unit V kept | all other cells are formulas and numbers |
| ksp | the check warning "is not a number" for the MgCO3·3H2O cell | left | the English source gets the same warning for `ca 1 × 10−5`; the cell is a number with an approximation prefix |
