#!/usr/bin/env python3
"""Convert the modules of Chemistry 2e into source.md files, by chapter or by page.

    python3 tools/convert.py 1            every page of Chapter 1: ch01/intro/source.md, ch01/1.1/source.md, …
    python3 tools/convert.py 1.4          one section: ch01/1.4/source.md
    python3 tools/convert.py preface      the book's own introduction: intro/source.md
    python3 tools/convert.py B            an appendix: appendix/B/source.md
    python3 tools/convert.py 1 --out DIR  the same layout under DIR instead of this folder

Run from the book's folder. The pages come from modules.json, which records
every module of the collection with its chapter, section id and slug, and
the conversion is the shared omnistax-content/tools/cnxml2md.py; this script
only decides which module goes to which folder. A page that already has a
source.md is written again, since the converter is the source of record and
the file is never edited by hand. The converter's warnings are printed as
they come, prefixed by the module path.
"""
import json, os, subprocess, sys

BOOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONVERTER = os.path.join(os.path.dirname(BOOK), "tools", "cnxml2md.py")
BUNDLE = os.path.join(BOOK, "source", "osbooks-chemistry-bundle", "modules")

def pages(book, what):
    """(folder, module) pairs for a chapter number, a section id, 'preface' or an appendix letter."""
    if what == "preface":
        return [("intro", m["module"]) for m in book["front_matter"] if m["slug"] == "preface"]
    if len(what) == 1 and what.isalpha():
        return [(os.path.join("appendix", a["id"]), a["module"]) for a in book["appendices"] if a["id"] == what.upper()]
    number = what.split(".")[0]
    ch = next((c for c in book["chapters"] if str(c["number"]) == number), None)
    if ch is None:
        sys.exit(f"no chapter {number} in modules.json")
    out = []
    if "." not in what and ch.get("intro"):
        out.append((os.path.join(ch["dir"], "intro"), ch["intro"]["module"]))
    for s in ch["sections"]:
        if "." not in what or s["id"] == what:
            out.append((os.path.join(ch["dir"], s["id"]), s["module"]))
    if not out:
        sys.exit(f"no page {what} in modules.json")
    return out

def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__); return
    root = BOOK
    if "--out" in argv:
        i = argv.index("--out"); root = os.path.abspath(argv[i + 1]); del argv[i:i + 2]
    book = json.load(open(os.path.join(BOOK, "modules.json")))
    for what in argv:
        for folder, module in pages(book, what):
            src = os.path.join(BUNDLE, module, "index.cnxml")
            dst = os.path.join(root, folder, "source.md")
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(dst, "w") as f:
                r = subprocess.run([sys.executable, CONVERTER, src], stdout=f, stderr=subprocess.PIPE, text=True)
            sys.stderr.write(r.stderr)
            if r.returncode:
                sys.exit(f"{module}: converter failed")
            print(f"{module} -> {os.path.relpath(dst, root)}")

if __name__ == "__main__":
    main(sys.argv[1:])
