"""Cheap structural smoke test for the ZEDESIGN case-study UI; stdlib only."""
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "realisation-prize-reaper.html"


class Tags(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.tabs = []
        self.panels = []
        self.assets = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"])
        if "data-pr-tab" in data:
            self.tabs.append(data)
        if "data-pr-panel" in data:
            self.panels.append(data)
        if data.get("src") and not data["src"].startswith(("https:", "data:")):
            self.assets.append(data["src"].split("?")[0])
        if data.get("href") and data["href"].endswith(".css?v=1"):
            self.assets.append(data["href"].split("?")[0])


def check():
    html = PAGE.read_text(encoding="utf-8")
    parser = Tags()
    parser.feed(html)
    assert len(set(parser.ids)) == len(parser.ids), "Duplicate HTML IDs"
    assert "data-pr-demo" in html
    assert [x["data-pr-tab"] for x in parser.tabs] == ["discovery", "review", "health"]
    assert {x["aria-controls"] for x in parser.tabs} == {x["id"] for x in parser.panels}
    assert [x["data-pr-panel"] for x in parser.panels] == ["discovery", "review", "health"]
    assert sum(x["aria-pressed"] == "true" for x in parser.tabs) == 1
    for asset in parser.assets:
        assert (ROOT / asset).exists(), "Missing local asset: " + asset
    js = (ROOT / "prize-reaper-demo.js").read_text(encoding="utf-8")
    css = (ROOT / "prize-reaper-demo.css").read_text(encoding="utf-8")
    assert "fetch(" not in js and "XMLHttpRequest" not in js
    assert "aria-pressed" in js and "panel.hidden" in js
    assert "prefers-reduced-motion:reduce" in css
    assert "Simulation locale" in html and "sans connexion" in html
    listing = (ROOT / "realisations.html").read_text(encoding="utf-8")
    assert 'href="realisation-prize-reaper.html"' in listing
    assert "realisation-prize-reaper.html" in (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    print("OK: Prize Reaper case-study assets, tabs, accessibility and truthful mock preview")


if __name__ == "__main__":
    check()
