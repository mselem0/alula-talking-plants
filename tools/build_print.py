#!/usr/bin/env python3
"""Build the print center: print.html, qr/<id>.svg, qr/entrance.svg, sign-rosemary.html (redirect).

QR codes are generated at build time (no runtime QR library) and inlined as SVG.
Requires:  pip install segno      (build-time only)
Usage (from site/):  python3 tools/build_print.py
"""
import io, json, re
from pathlib import Path
from html import escape
import segno

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://mselem0.github.io/alula-talking-plants/"
ENTRANCE_URL = BASE + "?scan=1"
DARK = "#14332D"
LIGHT = "#F8F4EF"
ENTRANCE_CHARS = ["date-palm", "rosemary", "henna", "tomato"]


def plant_url(pid):
    return f"{BASE}plant.html?p={pid}"


def make_qr(url):
    return segno.make(url, error="q", micro=False)


def inline_svg(url, label):
    """Inline SVG with a white 4-module quiet zone, scalable by CSS."""
    buf = io.BytesIO()
    make_qr(url).save(buf, kind="svg", dark=DARK, light=LIGHT, border=4, scale=1,
                      xmldecl=False, svgns=True, nl=False, omitsize=True, svgclass="qr",
                      lineclass=None, svgid=None)
    return buf.getvalue().decode().replace("<svg ", f'<svg role="img" aria-label="{escape(label)}" ', 1)


def file_svg(url, path):
    """Standalone downloadable SVG: white background, explicit width/height."""
    make_qr(url).save(str(path), kind="svg", dark=DARK, light=LIGHT, border=4, scale=12,
                      xmldecl=True, svgns=True, nl=True)


def load_plants():
    s = (ROOT / "data/plants.js").read_text(encoding="utf-8")
    m = re.search(r"window\.PLANTS\s*=\s*(\[.*?\n\]);", s, re.S)
    return sorted(json.loads(m.group(1)), key=lambda p: p["n"])


FOOT = ('<div class="foot"><img src="img/rcu-logo-gold.svg" alt="الهيئة الملكية لمحافظة العلا"></div>')
BAND = '<div class="band" aria-hidden="true"></div>'


def plant_item(p):
    pid, name = p["id"], escape(p["name"])
    qr = inline_svg(plant_url(pid), f"رمز QR لصفحة {p['name']}")
    sci = f'<div class="sci">{escape(p["sci"])}</div>' if p.get("sci") else ""
    sheet = f'''<article class="sheet" aria-label="لافتة {name}">{BAND}
<div class="top"><div class="proj">حكايات الواحة</div><div class="tag">لكل نبتة في العلا حكاية… امسح واستمع</div></div>
<div class="body"><div class="char"><img src="img/{pid}.webp" alt="شخصية نبتة {name}"></div>
<div class="txt"><h1>{name}</h1>{sci}<div class="cta">امسحني واستمع لحكايتي</div></div></div>
<div class="mid"><div class="qrwrap">{qr}<p class="qrcap">وجّه كاميرا هاتفك نحو الرمز</p></div></div>
{FOOT}{BAND}</article>'''
    stk = f'''<div class="stk" aria-label="ملصق {name}"><div class="sband" aria-hidden="true"></div>
<div class="smid"><div class="sqr">{qr}</div><div class="sname">{name}</div></div>
<div class="sproj">حكايات الواحة &middot; مشتل العلا</div><div class="sband" aria-hidden="true"></div></div>'''
    return f'<div data-id="{pid}" data-name="{name}">{sheet}{stk}</div>'


def entrance_item():
    qr = inline_svg(ENTRANCE_URL, "رمز QR لبدء الجولة في حكايات الواحة")
    chars = "".join(f'<div class="char"><img src="img/{c}.webp" alt=""></div>' for c in ENTRANCE_CHARS)
    sheet = f'''<article class="sheet ent" aria-label="لافتة المدخل العام">{BAND}
<div class="top"><div class="proj">حكايات الواحة</div><div class="tag">لكل نبتة في العلا حكاية… امسح واستمع</div></div>
<div class="chars" aria-hidden="true">{chars}</div>
<div class="entcta">امسح الرمز وابدأ الجولة</div>
<div class="mid" style="padding-top:0"><div class="qrwrap">{qr}<p class="qrcap">وجّه كاميرا هاتفك نحو الرمز</p></div></div>
{FOOT}{BAND}</article>'''
    stk = f'''<div class="stk" aria-label="ملصق المدخل العام"><div class="sband" aria-hidden="true"></div>
<div class="smid"><div class="sqr">{qr}</div><div class="sname sm">امسح وابدأ الجولة</div></div>
<div class="sproj">حكايات الواحة &middot; مشتل العلا</div><div class="sband" aria-hidden="true"></div></div>'''
    return f'<div data-id="entrance" data-name="المدخل العام">{sheet}{stk}</div>'


def list_item(pid, name, extra="", thumb=None):
    th = thumb or f'<img src="img/{pid}.webp" alt="" width="30" height="42" loading="lazy">'
    return (f'      <li><label class="pick"><input type="checkbox" value="{pid}" checked>{th}'
            f'<span class="nm">{name}{extra}</span></label>'
            f'<a class="dl" href="qr/{pid}.svg" download="alula-qr-{pid}.svg" aria-label="تحميل رمز {name} بصيغة SVG">'
            '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>'
            'تحميل الرمز SVG</a></li>')


def main():
    plants = load_plants()
    (ROOT / "qr").mkdir(exist_ok=True)
    file_svg(ENTRANCE_URL, ROOT / "qr/entrance.svg")
    for p in plants:
        file_svg(plant_url(p["id"]), ROOT / f"qr/{p['id']}.svg")

    ent_thumb = ('<span class="ent"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'
                 '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>'
                 '<path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg></span>')
    rows = [list_item("entrance", "لافتة المدخل العام", thumb=ent_thumb)]
    for p in plants:
        rows.append(list_item(p["id"], escape(p["name"])))
    store = "\n".join([entrance_item()] + [plant_item(p) for p in plants])

    tpl = (ROOT / "tools/print_template.html").read_text(encoding="utf-8")
    (ROOT / "print.html").write_text(tpl.replace("{{LIST_ITEMS}}", "\n".join(rows)).replace("{{STORE}}", store), encoding="utf-8")

    redirect = '''<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=print.html?only=rosemary&amp;fmt=a5">
<title>لافتة الروزماري - حكايات الواحة</title>
<link rel="canonical" href="print.html?only=rosemary&amp;fmt=a5">
<script>location.replace('print.html?only=rosemary&fmt=a5');</script>
</head>
<body><p><a href="print.html?only=rosemary&amp;fmt=a5">افتح مركز الطباعة للافتة الروزماري</a></p></body>
</html>
'''
    (ROOT / "sign-rosemary.html").write_text(redirect, encoding="utf-8")
    print(f"built print.html, {len(plants) + 1} QR svgs in qr/, sign-rosemary.html redirect")


if __name__ == "__main__":
    main()
