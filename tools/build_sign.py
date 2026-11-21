#!/usr/bin/env python3
"""Generate sign-rosemary.html with an inline-SVG QR code (no runtime QR library).

Requires:  pip install segno      (build-time only)
Usage (from site/):  python3 tools/build_sign.py
"""
import io, sys
from pathlib import Path
import segno

ROOT = Path(__file__).resolve().parent.parent
URL = "https://mselem0.github.io/alula-talking-plants/plant.html?p=rosemary"

def qr_svg(url):
    qr = segno.make(url, error="q", micro=False)
    buf = io.BytesIO()
    qr.save(buf, kind="svg", dark="#104631", light=None, border=0, scale=1,
            xmldecl=False, svgns=True, nl=False, omitsize=True, svgclass="qr", lineclass=None,
            svgid=None)
    return buf.getvalue().decode(), qr.version, qr.symbol_size(border=0)[0]

def main():
    svg, ver, size = qr_svg(URL)
    svg = svg.replace("<svg ", '<svg role="img" aria-label="رمز QR لصفحة الروزماري" ', 1)
    tpl = (ROOT / "tools/sign_template.html").read_text(encoding="utf-8")
    (ROOT / "sign-rosemary.html").write_text(tpl.replace("{{QR_SVG}}", svg).replace("{{QR_URL}}", URL), encoding="utf-8")
    print(f"QR version {ver}, {size} modules, encodes {URL}")

if __name__ == "__main__":
    main()
