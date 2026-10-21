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

# Brand integrations must be backed by existing assets or an identified source.
portfolio=(root/'realisations.html').read_text()
assert 'v3-zmi-stage' in portfolio and 'assets/zmi-official-mark.svg' in portfolio
assert 'v3-declic-stage' in portfolio and 'v3-declic-symbol' in portfolio
assert '<div class="project-media zmi"><div class="ui-shot">' not in portfolio
assert '<div class="project-media declic"><div class="ui-shot">' not in portfolio
assert (root/'assets/zmi-official-mark.svg').is_file()
for path, mark in [('realisation-zmi.html','v3-case-zmi'),('realisation-declic.html','v3-case-declic')]:
    detail=(root/path).read_text()
    assert mark in detail and 'portfolio-v3.css?v=brand-20261022' in detail
print('Portfolio identity checks passed: 2 brand compositions on grid and detail pages')
