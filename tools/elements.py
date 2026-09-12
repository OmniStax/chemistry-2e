#!/usr/bin/env python3
"""Write sheets/elements.json, the book's periodic table sheet.

The values here are standard reference values, not the book's own text. The
weights are the IUPAC conventional atomic weights to four significant figures,
which is the style Appendix A prints, with the mass number of the longest-lived
isotope in brackets where an element has no stable one; the electronegativities
are Pauling's; the first ionization energies are in kJ/mol; the radii are
covalent radii in pm from one consistent source (Cordero et al., 2008). None of
it was read out of Chemistry 2e, so a later pass may replace any of it with the
book's Appendix A without asking anything here; the file it writes is marked
"generated_by": "tool" so that such a pass knows what it may overwrite.

What is not a reference value is the last field of every element: the sections
of this book that mention the element by name. That is computed by scanning the
pages the book has, a built page by its text.html and an unbuilt one by the
source.md it was converted from, so the list grows as the book is built.

Run from anywhere:  python3 tools/elements.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

BOOK = Path(__file__).resolve().parent.parent
OUT = BOOK / "sheets" / "elements.json"

# ---------------------------------------------------------------- the values

# number symbol name weight electronegativity ionization radius discovered state
# "-" is no value; a year of "-" means the element has been known since antiquity.
TABLE = """
1   H   Hydrogen       1.008   2.20  1312   31  1766  gas
2   He  Helium         4.003   -     2372   28  1868  gas
3   Li  Lithium        6.940   0.98   520  128  1817  solid
4   Be  Beryllium      9.012   1.57   900   96  1798  solid
5   B   Boron         10.81    2.04   801   84  1808  solid
6   C   Carbon        12.01    2.55  1087   76  -     solid
7   N   Nitrogen      14.01    3.04  1402   71  1772  gas
8   O   Oxygen        16.00    3.44  1314   66  1774  gas
9   F   Fluorine      19.00    3.98  1681   57  1886  gas
10  Ne  Neon          20.18    -     2081   58  1898  gas
11  Na  Sodium        22.99    0.93   496  166  1807  solid
12  Mg  Magnesium     24.31    1.31   738  141  1755  solid
13  Al  Aluminum      26.98    1.61   578  121  1825  solid
14  Si  Silicon       28.09    1.90   787  111  1824  solid
15  P   Phosphorus    30.97    2.19  1012  107  1669  solid
16  S   Sulfur        32.06    2.58  1000  105  -     solid
17  Cl  Chlorine      35.45    3.16  1251  102  1774  gas
18  Ar  Argon         39.95    -     1521  106  1894  gas
19  K   Potassium     39.10    0.82   419  203  1807  solid
20  Ca  Calcium       40.08    1.00   590  176  1808  solid
21  Sc  Scandium      44.96    1.36   633  170  1879  solid
22  Ti  Titanium      47.87    1.54   659  160  1791  solid
23  V   Vanadium      50.94    1.63   651  153  1801  solid
24  Cr  Chromium      52.00    1.66   653  139  1797  solid
25  Mn  Manganese     54.94    1.55   717  139  1774  solid
26  Fe  Iron          55.85    1.83   763  132  -     solid
27  Co  Cobalt        58.93    1.88   760  126  1735  solid
28  Ni  Nickel        58.69    1.91   737  124  1751  solid
29  Cu  Copper        63.55    1.90   746  132  -     solid
30  Zn  Zinc          65.38    1.65   906  122  -     solid
31  Ga  Gallium       69.72    1.81   579  122  1875  solid
32  Ge  Germanium     72.63    2.01   762  120  1886  solid
33  As  Arsenic       74.92    2.18   947  119  1250  solid
34  Se  Selenium      78.97    2.55   941  120  1817  solid
35  Br  Bromine       79.90    2.96  1140  120  1826  liquid
36  Kr  Krypton       83.80    3.00  1351  116  1898  gas
37  Rb  Rubidium      85.47    0.82   403  220  1861  solid
38  Sr  Strontium     87.62    0.95   549  195  1790  solid
39  Y   Yttrium       88.91    1.22   600  190  1794  solid
40  Zr  Zirconium     91.22    1.33   640  175  1789  solid
41  Nb  Niobium       92.91    1.60   652  164  1801  solid
42  Mo  Molybdenum    95.95    2.16   684  154  1778  solid
43  Tc  Technetium   [98]      1.90   702  147  1937  solid
44  Ru  Ruthenium    101.1     2.20   710  146  1844  solid
45  Rh  Rhodium      102.9     2.28   720  142  1803  solid
46  Pd  Palladium    106.4     2.20   804  139  1803  solid
47  Ag  Silver       107.9     1.93   731  145  -     solid
48  Cd  Cadmium      112.4     1.69   868  144  1817  solid
49  In  Indium       114.8     1.78   558  142  1863  solid
50  Sn  Tin          118.7     1.96   709  139  -     solid
51  Sb  Antimony     121.8     2.05   834  139  -     solid
52  Te  Tellurium    127.6     2.10   869  138  1782  solid
53  I   Iodine       126.9     2.66  1008  139  1811  solid
54  Xe  Xenon        131.3     2.60  1170  140  1898  gas
55  Cs  Cesium       132.9     0.79   376  244  1860  solid
56  Ba  Barium       137.3     0.89   503  215  1808  solid
57  La  Lanthanum    138.9     1.10   538  207  1839  solid
58  Ce  Cerium       140.1     1.12   534  204  1803  solid
59  Pr  Praseodymium 140.9     1.13   527  203  1885  solid
60  Nd  Neodymium    144.2     1.14   533  201  1885  solid
61  Pm  Promethium   [145]     1.13   540  199  1945  solid
62  Sm  Samarium     150.4     1.17   545  198  1879  solid
63  Eu  Europium     152.0     1.20   547  198  1901  solid
64  Gd  Gadolinium   157.3     1.20   593  196  1880  solid
65  Tb  Terbium      158.9     1.20   566  194  1843  solid
66  Dy  Dysprosium   162.5     1.22   573  192  1886  solid
67  Ho  Holmium      164.9     1.23   581  192  1878  solid
68  Er  Erbium       167.3     1.24   589  189  1843  solid
69  Tm  Thulium      168.9     1.25   597  190  1879  solid
70  Yb  Ytterbium    173.0     1.10   603  187  1878  solid
71  Lu  Lutetium     175.0     1.27   524  187  1907  solid
72  Hf  Hafnium      178.5     1.30   659  175  1923  solid
73  Ta  Tantalum     180.9     1.50   761  170  1802  solid
74  W   Tungsten     183.8     2.36   770  162  1783  solid
75  Re  Rhenium      186.2     1.90   760  151  1925  solid
76  Os  Osmium       190.2     2.20   840  144  1803  solid
77  Ir  Iridium      192.2     2.20   880  141  1803  solid
78  Pt  Platinum     195.1     2.28   870  136  1735  solid
79  Au  Gold         197.0     2.54   890  136  -     solid
80  Hg  Mercury      200.6     2.00  1007  132  -     liquid
81  Tl  Thallium     204.4     1.62   589  145  1861  solid
82  Pb  Lead         207.2     2.33   716  146  -     solid
83  Bi  Bismuth      209.0     2.02   703  148  1753  solid
84  Po  Polonium     [209]     2.00   812  140  1898  solid
85  At  Astatine     [210]     2.20   890  150  1940  solid
86  Rn  Radon        [222]     2.20  1037  150  1900  gas
87  Fr  Francium     [223]     0.70   380  260  1939  solid
88  Ra  Radium       [226]     0.90   509  221  1898  solid
89  Ac  Actinium     [227]     1.10   499  215  1899  solid
90  Th  Thorium      232.0     1.30   587  206  1829  solid
91  Pa  Protactinium 231.0     1.50   568  200  1913  solid
92  U   Uranium      238.0     1.38   598  196  1789  solid
93  Np  Neptunium    [237]     1.36   605  190  1940  solid
94  Pu  Plutonium    [244]     1.28   585  187  1940  solid
95  Am  Americium    [243]     1.13   578  180  1944  solid
96  Cm  Curium       [247]     1.28   581  169  1944  solid
97  Bk  Berkelium    [247]     1.30   601  -     1949  solid
98  Cf  Californium  [251]     1.30   608  -     1950  solid
99  Es  Einsteinium  [252]     1.30   619  -     1952  solid
100 Fm  Fermium      [257]     1.30   627  -     1952  unknown
101 Md  Mendelevium  [258]     1.30   635  -     1955  unknown
102 No  Nobelium     [259]     1.30   642  -     1966  unknown
103 Lr  Lawrencium   [266]     1.30   470  -     1961  unknown
104 Rf  Rutherfordium [267]    -      580  -     1964  unknown
105 Db  Dubnium      [268]     -      665  -     1967  unknown
106 Sg  Seaborgium   [269]     -      757  -     1974  unknown
107 Bh  Bohrium      [270]     -      740  -     1981  unknown
108 Hs  Hassium      [269]     -      730  -     1984  unknown
109 Mt  Meitnerium   [278]     -      800  -     1982  unknown
110 Ds  Darmstadtium [281]     -      960  -     1994  unknown
111 Rg  Roentgenium  [282]     -     1020  -     1994  unknown
112 Cn  Copernicium  [285]     -     1155  -     1996  unknown
113 Nh  Nihonium     [286]     -      707  -     2003  unknown
114 Fl  Flerovium    [289]     -      832  -     1998  unknown
115 Mc  Moscovium    [290]     -      538  -     2003  unknown
116 Lv  Livermorium  [293]     -      663  -     2000  unknown
117 Ts  Tennessine   [294]     -      743  -     2010  unknown
118 Og  Oganesson    [294]     -      860  -     2002  unknown
"""

# The subshells in the order the aufbau principle fills them, each with how many
# electrons it holds. The configurations below are generated from this and then
# corrected by the exceptions, rather than typed out 118 times.
AUFBAU = [
    ("1s", 2), ("2s", 2), ("2p", 6), ("3s", 2), ("3p", 6), ("4s", 2), ("3d", 10),
    ("4p", 6), ("5s", 2), ("4d", 10), ("5p", 6), ("6s", 2), ("4f", 14), ("5d", 10),
    ("6p", 6), ("7s", 2), ("5f", 14), ("6d", 10), ("7p", 6),
]
# Where the ground state is not what filling in order would give: the whole
# configuration after the core, written as the table prints it.
EXCEPTIONS = {
    24: "3d5 4s1", 29: "3d10 4s1", 41: "4d4 5s1", 42: "4d5 5s1", 44: "4d7 5s1",
    45: "4d8 5s1", 46: "4d10", 47: "4d10 5s1", 57: "5d1 6s2", 58: "4f1 5d1 6s2",
    64: "4f7 5d1 6s2", 78: "4f14 5d9 6s1", 79: "4f14 5d10 6s1", 89: "6d1 7s2",
    90: "6d2 7s2", 91: "5f2 6d1 7s2", 92: "5f3 6d1 7s2", 93: "5f4 6d1 7s2",
    96: "5f7 6d1 7s2", 103: "5f14 7s2 7p1",
}
NOBLE = [(2, "He"), (10, "Ne"), (18, "Ar"), (36, "Kr"), (54, "Xe"), (86, "Rn")]

METALLOIDS = {"B", "Si", "Ge", "As", "Sb", "Te", "Po"}
NONMETALS = {"H", "C", "N", "O", "P", "S", "Se"}

# --------------------------------------------------------- derived properties


def period_of(z: int) -> int:
    for period, last in enumerate([2, 10, 18, 36, 54, 86, 118], start=1):
        if z <= last:
            return period
    raise ValueError(z)


def group_of(z: int) -> int | None:
    """The column of the table, or nothing for a lanthanide or actinide, which
    the table prints below. Lanthanum and actinium head group 3."""
    if 58 <= z <= 71 or 90 <= z <= 103:
        return None
    period = period_of(z)
    first = [1, 3, 11, 19, 37, 55, 87][period - 1]
    i = z - first  # how far along the row
    if period == 1:
        return 1 if z == 1 else 18
    if period in (2, 3):
        return i + 1 if i < 2 else i + 11
    if period in (4, 5):
        return i + 1
    return i + 1 if i < 3 else i - 13  # period 6 and 7, the f block taken out


def block_of(z: int, group: int | None) -> str:
    if group is None or 57 <= z <= 71 or 89 <= z <= 103:
        return "f"
    if z == 2 or group in (1, 2):
        return "s"   # helium stands over the noble gases and fills the s shell
    return "d" if group <= 12 else "p"


def category_of(z: int, symbol: str, group: int | None) -> str:
    if 57 <= z <= 71:
        return "lanthanide"
    if 89 <= z <= 103:
        return "actinide"
    if group == 18:
        return "noble gas"
    if group == 17:
        return "halogen"
    if symbol in METALLOIDS:
        return "metalloid"
    if symbol in NONMETALS:
        return "nonmetal"
    if group == 1:
        return "alkali metal"
    if group == 2:
        return "alkaline earth metal"
    if group is not None and 3 <= group <= 12:
        return "transition metal"
    return "post-transition metal"


def classification_of(symbol: str, category: str) -> str:
    """The book's own three-way shading of the table."""
    if symbol in METALLOIDS:
        return "metalloid"
    if category in ("nonmetal", "halogen", "noble gas"):
        return "nonmetal"
    return "metal"


def configuration_of(z: int) -> str:
    """The ground state in noble-gas shorthand, "[Ar]3d6 4s2"."""
    core, core_symbol = 0, ""
    for number, symbol in NOBLE:
        if number < z:
            core, core_symbol = number, symbol
    prefix = f"[{core_symbol}]" if core else ""
    if z in EXCEPTIONS:
        return prefix + EXCEPTIONS[z]
    left, shells = z, []
    for name, room in AUFBAU:
        if left <= 0:
            break
        take = min(room, left)
        shells.append((name, take))
        left -= take
    # everything past the core, written in the order of the shells
    filled, kept = 0, []
    for name, count in shells:
        filled += count
        if filled > core:
            kept.append((name, count if filled - count >= core else filled - core))
    kept.sort(key=lambda s: (int(s[0][0]), "spdf".index(s[0][1])))
    return prefix + " ".join(f"{name}{count}" for name, count in kept)


# ------------------------------------------------- where the book names them

# A page's text, by the section id it belongs to, in reading order: a built page
# by the HTML it serves and an unbuilt one by the source it will be made from.
def pages() -> list[tuple[str, str]]:
    book = json.loads((BOOK / "book.json").read_text(encoding="utf8"))
    out: list[tuple[str, str]] = []
    for chapter_dir in book["chapters"]:
        chapter_file = BOOK / chapter_dir / "chapter.json"
        if not chapter_file.exists():
            continue
        chapter = json.loads(chapter_file.read_text(encoding="utf8"))
        for section in chapter.get("sections", []):
            folder = BOOK / chapter_dir / section["id"]
            for name in ("text.html", "source.md"):
                path = folder / name
                if path.exists():
                    out.append((section["id"], path.read_text(encoding="utf8")))
                    break
    return out


TAGS = re.compile(r"<[^>]+>")


def mentions(texts: list[tuple[str, str]], name: str) -> list[str]:
    """The sections whose prose names the element, whole word, either case."""
    word = re.compile(rf"\b{re.escape(name)}\b", re.IGNORECASE)
    return [section for section, text in texts if word.search(TAGS.sub(" ", text))]


# ------------------------------------------------------------------ the sheet


def elements() -> list[dict]:
    texts = pages()
    rows = []
    for line in TABLE.strip().splitlines():
        z, symbol, name, weight, negativity, ionization, radius, year, state = line.split()
        z = int(z)
        group = group_of(z)
        category = category_of(z, symbol, group)
        number = lambda v, cast=float: None if v == "-" else cast(v)  # noqa: E731
        rows.append({
            "symbol": symbol,
            "name": name,
            "number": z,
            "weight": float(weight.strip("[]")),
            "weight_label": weight,
            "group": group,
            "period": period_of(z),
            "block": block_of(z, group),
            "category": category,
            "classification": classification_of(symbol, category),
            "state": state,
            "configuration": configuration_of(z),
            "electronegativity": number(negativity),
            "ionization": number(ionization),
            "radius": number(radius, int),
            "discovered": number(year, int),
            "sections": mentions(texts, name),
        })
    return rows


def main() -> None:
    rows = elements()
    assert len(rows) == 118, f"{len(rows)} elements, expected 118"
    sheet = {
        "kind": "elements",
        "id": "elements",
        "title": "The Elements",
        "source": "Standard reference values: IUPAC conventional atomic weights, Pauling electronegativities, first ionization energies in kJ/mol and covalent radii in pm; the sections are computed from this book.",
        "generated_by": "tool",
        "elements": rows,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(sheet, indent=2, ensure_ascii=False) + "\n", encoding="utf8")
    named = sum(1 for r in rows if r["sections"])
    print(f"{OUT.relative_to(BOOK)}: {len(rows)} elements, {named} named in the book")


if __name__ == "__main__":
    main()
