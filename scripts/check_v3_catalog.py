#!/usr/bin/env python3
"""No-dependency structural checks for the ZEDESIGN V3 catalogue."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'data/module-status.json').read_text())['records']
assert len(records)>=50 and len({r['id'] for r in records})==len(records)
assert all(r['status']=='non_audite' and r['technical_validation'] is False for r in records)
for name in ('theme-optimized.html','theme-mono-produit.html'):
    txt=(root/name).read_text()
    for fragment in ('id="catalogue-v3"','data-v3-expand','data-v3-collapse','data-v3-share','catalog-v3.css','catalog-v3.js','<details class="v3-module"'):
        assert fragment in txt,(name,fragment)
    assert txt.count('<details class="v3-module"') >= 25
    assert txt.count('<details')==txt.count('</details>'),name
    assert txt.count('<main')==txt.count('</main>')==1
    assert '47 €' in txt
for page in ('index.html','service-shopify.html','theme-pack.html'):
    content=(root/page).read_text()
    assert content.count('v3-commercial-snapshot')==2,(page,'commercial previews')
assert 'data-v3-share' in (root/'theme-pack.html').read_text()
assert 'crft-logo-official.png' in (root/'realisations.html').read_text()
assert (root/'assets/crft-logo-official.png').is_file()
print('ZEDESIGN V3 structural checks passed:',len(records),'matrix entries')


# V3.2 — Prize Reaper preserved and unified cards.
from html.parser import HTMLParser
portfolio=(root/'realisations.html').read_text()
assert portfolio.count('class="project-card identity-card"') == 7
assert portfolio.count('class="identity-card-link"') == 7
assert portfolio.count('class="identity-media') == 6
assert portfolio.count('class="project-media prize-reaper"') == 1
assert 'identity-system.css?v=unified-20261022' in portfolio
assert (root/'assets/prize-reaper-mark.svg').is_file()
for slug in ('zmi','declic','savage-horizon','crft-ai','ddr','syrnax'):
    page=(root/f'realisation-{slug}.html').read_text()
    assert page.count('class="identity-case-stage')==1,slug
    assert '<section class="showcase"' not in page,slug
    assert 'identity-system.css?v=unified-20261022' in page,slug
    assert '<main' in page and '</main>' in page,slug
prize=(root/'realisation-prize-reaper.html').read_text()
assert '<figure class="prize-brand-stage"' in prize
assert 'identity-case-stage' not in prize
print("V3.2 unified portfolio checks passed: six identity panels, seven whole-card links, Prize Reaper intact.")
