#!/usr/bin/env python3
"""Write the data appendices of Chemistry 2e as `table` sheets under sheets/.

    python3 tools/appendices.py              every data appendix the SHEETS table names
    python3 tools/appendices.py D L          only those appendices
    python3 tools/appendices.py --out DIR    the same files under DIR instead of sheets/

Run from the book's folder. The tables are read straight out of the module's
CNXML with ElementTree rather than out of the markdown the section converter
writes, because a sheet wants what the markdown flattens: the header rows, the
spanning title row, the footnotes, and the subscripts and superscripts of every
formula. A cell is written as the same HTML the prose carries, so the app's
formula hover marks a formula in a cell exactly as it marks one in a paragraph.

Appendix A is the elements sheet, written by tools/elements.py, and Appendix B
is prose and becomes a page; neither is written here. Every file this tool
writes is marked "generated_by": "tool" with the module it was read from: the
values are the book's own data, not values anybody typed.
"""
import json, os, re, sys
import xml.etree.ElementTree as ET

BOOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# the bundle the modules are read from; a test points it at a fixture instead
BUNDLE = os.environ.get("OMNISTAX_BUNDLE") or os.path.join(BOOK, "source", "osbooks-chemistry-bundle", "modules")
C = "{http://cnx.rice.edu/cnxml}"
M = "{http://www.w3.org/1998/Math/MathML}"

# The sheet each data appendix becomes: its id and the title the book prints,
# in the book's own order. Appendix A is the elements sheet and B is a page.
SHEETS = [
    ("C", "units", "Units and Conversion Factors"),
    ("D", "constants", "Fundamental Physical Constants"),
    ("E", "water", "Water Properties"),
    ("F", "acids-bases-commercial", "Composition of Commercial Acids and Bases"),
    ("G", "thermo", "Standard Thermodynamic Properties for Selected Substances"),
    ("H", "ka", "Ionization Constants of Weak Acids"),
    ("I", "kb", "Ionization Constants of Weak Bases"),
    ("J", "ksp", "Solubility Products"),
    ("K", "kf", "Formation Constants for Complex Ions"),
    ("L", "potentials", "Standard Electrode (Half-Cell) Potentials"),
    ("M", "half-lives", "Half-Lives for Several Radioactive Isotopes"),
]

WARNINGS = []

def warn(msg):
    WARNINGS.append(msg)
    print(f"  ! {msg}", file=sys.stderr)

def tag(e):
    return e.tag.split("}")[-1]

# ---------- text ----------
ESCAPES = (("&", "&amp;"), ("<", "&lt;"), (">", "&gt;"))

def esc(s):
    for a, b in ESCAPES:
        s = s.replace(a, b)
    # the bundle prints the masculine ordinal where the book means a degree sign
    return s.replace("º", "°").replace("​", "")

def clean(html):
    """One line of HTML: no source line breaks, no doubled spaces, no space before a script."""
    html = re.sub(r"\s+", " ", html)
    html = re.sub(r"\s+(<(?:sub|sup)>)", r"\1", html)
    return html.strip()

# ---------- MathML -> the HTML the prose uses ----------
def mml(e):
    """A formula as <sub>/<sup> HTML. The appendices' MathML is chemistry rather
    than algebra: isotopes, ions, half-reactions and powers of ten."""
    t = tag(e)
    kids = list(e)
    if t in ("math", "mrow", "mstyle", "semantics"):
        return "".join(mml(k) for k in kids)
    if t in ("mi", "mn", "mo", "mtext"):
        return esc((e.text or "").replace("\n", " "))
    if t == "mspace":
        return ""
    if t == "msub":
        return mml(kids[0]) + "<sub>" + mml(kids[1]) + "</sub>"
    if t == "msup":
        return mml(kids[0]) + "<sup>" + mml(kids[1]) + "</sup>"
    if t == "msubsup":
        # an empty base is an isotope's prescripts: the mass number over the atomic number
        base = mml(kids[0])
        scripts = "<sub>" + mml(kids[1]) + "</sub><sup>" + mml(kids[2]) + "</sup>"
        return base + scripts
    if t == "mfrac":
        return mml(kids[0]) + "/" + mml(kids[1])
    if t in ("mover", "munder", "munderover"):
        return mml(kids[0])
    if t == "mmultiscripts":
        return "".join(mml(k) for k in kids)
    warn(f"MathML <{t}> kept as its text")
    return esc("".join(e.itertext()))

# ---------- a cell ----------
def inline(e, notes):
    """The element's mixed content as HTML: text, subscripts, superscripts,
    emphasis, MathML as formulas, and a footnote as a marker into `notes`."""
    out = [esc(e.text or "")]
    for k in e:
        t = tag(k)
        if k.tag == M + "math":
            out.append(mml(k))
        elif t in ("sub", "sup"):
            out.append(f"<{t}>" + inline(k, notes) + f"</{t}>")
        elif t == "emphasis":
            mark = "strong" if k.get("effect") == "bold" else "em"
            out.append(f"<{mark}>" + inline(k, notes).strip() + f"</{mark}>")
        elif t == "footnote":
            text = clean(inline(k, notes))
            if text not in notes:
                notes.append(text)
            out.append(f'<sup class="fn">{notes.index(text) + 1}</sup>')
        elif t == "media":
            # a Lewis structure drawn as a picture: a sheet carries data, not the book's images
            warn(f"dropped the image {k.get('id', '')} in a cell ({k.get('alt', '')[:40]})")
        elif t == "newline":
            out.append("<br>")
        elif t in ("para", "list", "item", "link", "term", "span", "quote"):
            out.append(inline(k, notes))
        else:
            warn(f"<{t}> in a cell kept as its text")
            out.append(esc("".join(k.itertext())))
        out.append(esc(k.tail or ""))
    return "".join(out)

def cell(entry, notes):
    return clean(inline(entry, notes))

# ---------- a number ----------
NUMBER = re.compile(r"^([+-]?(?:\d+\.?\d*|\.\d+))$")
POWER = re.compile(r"^([+-]?(?:\d+\.?\d*|\.\d+))\s*[×x*]\s*10\s*\^\s*([+-]?\d+)\^?$", re.I)

def number(cell_html):
    """The value a cell holds, or None: a plain decimal, or a coefficient times a
    power of ten with the exponent in a <sup>. The app's cellNumber is this rule."""
    text = re.sub(r"<[^>]*>", lambda m: "^" if re.match(r"</?sup\b", m.group(0), re.I) else " ", cell_html)
    text = text.replace("&minus;", "-").replace("−", "-").replace("–", "-").replace("&nbsp;", " ").replace(" ", " ").strip()
    m = POWER.match(text)
    if m:
        return float(m.group(1)) * (10 ** int(m.group(2)))
    m = NUMBER.match(text.replace(",", ""))
    return float(m.group(1)) if m else None

def slug(text, fallback):
    # a footnote marker is not part of a name: "Value<sup class="fn">1</sup>" is value
    s = re.sub(r'<sup class="fn">\d+</sup>', "", text)
    s = re.sub(r"<[^>]*>", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s or fallback

# ---------- one table ----------
def column_kind(label, cells):
    """What a column holds, decided by what is in it: a column of numbers the page
    may sort by, a column of formulas the hover marks, or text."""
    # a cell with no digit in it is the book's em dash for a value nobody has
    # measured, and it says nothing about what the column holds
    filled = [c for c in cells if c and re.search(r"\d", re.sub(r"<[^>]*>", "", c))]
    if not filled:
        return "text"
    if sum(1 for c in filled if number(c) is not None) >= 0.6 * len(filled):
        return "number"
    if sum(1 for c in filled if "<sub>" in c or "<sup>" in c) >= 0.4 * len(filled):
        return "formula"
    return "text"

UNIT = re.compile(r"^(?P<name>.*?)\s*\((?P<unit>[^()]*(?:[/°]|mol|kJ|J |V|g|L|torr|Pa|K\b)[^()]*)\)\s*$")

def split_unit(label):
    """A heading that names its unit in brackets, "Density (g/mL)", as the name and the unit."""
    m = UNIT.match(label)
    return (m.group("name").strip(), m.group("unit").strip()) if m else (label, None)

def read_table(el, index, used):
    tg = el.find(C + "tgroup")
    if tg is None:
        return None
    colnames = [c.get("colname") for c in tg.findall(C + "colspec")]
    thead, tbody = tg.find(C + "thead"), tg.find(C + "tbody")
    head_rows = thead.findall(C + "row") if thead is not None else []
    body_rows = tbody.findall(C + "row") if tbody is not None else []
    # the bundle's cols attribute is wrong here and there (Appendix E says four
    # and prints three), so the colspecs and the widest row decide
    widest = max([len(r.findall(C + "entry")) for r in head_rows + body_rows] or [1])
    ncols = max(len(colnames) or int(tg.get("cols", "1") or 1), widest)
    notes = []

    def span(entry):
        a, b = entry.get("namest"), entry.get("nameend")
        return colnames.index(b) - colnames.index(a) + 1 if a and b and a in colnames and b in colnames else 1

    title_el = el.find(C + "title")
    title = clean(inline(title_el, notes)) if title_el is not None else ""
    # the book's own title is the first header row, one entry across every column
    if head_rows:
        first = head_rows[0].findall(C + "entry")
        if len(first) == 1:
            title = title or cell(first[0], notes)
            head_rows = head_rows[1:]
    labels = [cell(e, notes) for e in head_rows[0].findall(C + "entry")] if head_rows else []
    if len(head_rows) > 1:
        warn(f"{title or el.get('id')}: {len(head_rows)} header rows; the rest are read as body rows")
        body_rows = [r for r in head_rows[1:]] + body_rows
    labels = (labels + [""] * ncols)[:ncols]

    rows = []
    for r in body_rows:
        cells, at = [""] * ncols, 0
        for en in r.findall(C + "entry"):
            if at >= ncols:
                break
            cells[at] = cell(en, notes)
            at += max(1, span(en))
        rows.append(cells)

    # a column the book fills with a picture — the Lewis structures of H and I —
    # is empty once the images are dropped, and an empty column is not data
    empty = [i for i in range(ncols) if not any(row[i] for row in rows) and not labels[i].strip()
             or (not any(row[i] for row in rows) and rows)]
    if empty:
        warn(f"{title or el.get('id')}: dropped the empty column(s) {', '.join(labels[i] or str(i + 1) for i in empty)}")
        keep = [i for i in range(ncols) if i not in empty]
        labels = [labels[i] for i in keep]
        rows = [[row[i] for i in keep] for row in rows]

    columns = []
    for i, label in enumerate(labels):
        name, unit = split_unit(label)
        kind = column_kind(name, [row[i] for row in rows])
        cid = slug(name, f"col{i + 1}")
        # two columns of one name — the vapour pressure in torr and in Pa, the two
        # halves of the half-life table — are told apart by their unit, then by number
        if cid in [c["id"] for c in columns] and unit:
            cid = slug(f"{name} {unit}", cid)
        n = 2
        while cid in [c["id"] for c in columns]:
            cid, n = f"{slug(name, f'col{i + 1}')}-{n}", n + 1
        col = {"id": cid, "label": name, "kind": kind}
        if unit:
            col["unit"] = unit
        columns.append(col)

    tid = slug(title, f"table{index + 1}")
    while tid in used:
        tid += "-"
    used.add(tid)
    out = {"id": tid, "title": re.sub(r"<[^>]*>", "", title), "columns": columns, "rows": rows}
    if notes:
        out["notes"] = notes
    return out

# ---------- one appendix ----------
def sheet(letter, sheet_id, title, appendix):
    module = appendix["module"]
    root = ET.parse(os.path.join(BUNDLE, module, "index.cnxml")).getroot()
    content = root.find(C + "content")
    used = set()
    tables = [t for t in (read_table(el, i, used) for i, el in enumerate(content.findall(".//" + C + "table"))) if t]
    return {
        "id": sheet_id,
        "title": title,
        "kind": "table",
        "source": {"module": module, "appendix": letter},
        "generated_by": "tool",
        "tables": tables,
    }

def main(argv):
    if argv and argv[0] in ("-h", "--help"):
        print(__doc__)
        return
    out_dir = os.path.join(BOOK, "sheets")
    if "--out" in argv:
        i = argv.index("--out")
        out_dir = os.path.abspath(argv[i + 1])
        del argv[i:i + 2]
    wanted = [a.upper() for a in argv]
    book = json.load(open(os.path.join(BOOK, "modules.json")))
    by_letter = {a["id"]: a for a in book["appendices"]}
    os.makedirs(out_dir, exist_ok=True)
    for letter, sheet_id, title in SHEETS:
        if wanted and letter not in wanted:
            continue
        print(f"Appendix {letter} -> sheets/{sheet_id}.json")
        data = sheet(letter, sheet_id, title, by_letter[letter])
        with open(os.path.join(out_dir, f"{sheet_id}.json"), "w") as f:
            json.dump(data, f, indent=1, ensure_ascii=False)
            f.write("\n")
        for t in data["tables"]:
            print(f"    {t['id']}: {len(t['rows'])} rows, {len(t['columns'])} columns")
    if WARNINGS:
        print(f"{len(WARNINGS)} warnings", file=sys.stderr)

if __name__ == "__main__":
    main(sys.argv[1:])
