#!/usr/bin/env python3
"""Generate static portfolio HTML from research/catalog.json."""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / "research" / "catalog.json").read_text(encoding="utf-8"))

SPOTIFY = CATALOG["spotify"]
SERIES = CATALOG["books"]["series"]

EMAIL = "anujbudhwar455@gmail.com"
LINKEDIN = "https://www.linkedin.com/in/anuj-budhwar-377601404"
BASE = ""  # relative paths

def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def esc_text(s: str) -> str:
    return html.escape(s or "", quote=False)


def depth_prefix(depth: int) -> str:
    return "../" * depth


def nav(depth: int = 0, active: str = "") -> str:
    p = depth_prefix(depth)
    items = [
        ("index.html", "Home"),
        ("about.html", "About"),
        ("books.html", "Books"),
        ("songs.html", "Music"),
        ("apps.html", "Apps"),
        ("contact.html", "Contact"),
    ]
    links = []
    for href, label in items:
        cur = ' aria-current="page"' if active == href else ""
        links.append(f'<li><a href="{p}{href}"{cur}>{label}</a></li>')
    return f'''  <nav class="site-nav" aria-label="Primary">
    <a class="logo" href="{p}index.html">Anuj <span>Budhwar</span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-label="Menu">Menu</button>
    <ul class="nav-links">
      {''.join(links)}
    </ul>
  </nav>'''


def footer(depth: int = 0) -> str:
    p = depth_prefix(depth)
    return f'''  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">Anuj <span>Budhwar</span></div>
      <div class="footer-links">
        <a href="{p}about.html">About</a>
        <a href="{p}books.html">Books</a>
        <a href="{p}songs.html">Music</a>
        <a href="{p}apps.html">Apps</a>
        <a href="{p}contact.html">Contact</a>
        <a href="mailto:{EMAIL}">Email</a>
      </div>
      <p class="footer-copy">© 2026 Anuj Budhwar · Desrein Studios · Rohtak, Haryana · GitHub Pages</p>
    </div>
  </footer>
  <script src="{p}js/main.js"></script>'''


def head(title: str, description: str, depth: int = 0, extra: str = "") -> str:
    p = depth_prefix(depth)
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}" />
  <meta property="og:title" content="{esc(title)}" />
  <meta property="og:description" content="{esc(description)}" />
  <link rel="stylesheet" href="{p}css/styles.css" />
  <link rel="icon" href="{p}assets/favicon.svg" type="image/svg+xml" />
  {extra}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
'''


def series_display_name(s: dict) -> str:
    return s.get("name") or s["id"]


def series_cover(s: dict) -> str:
    if s.get("coverFile"):
        return s["coverFile"]
    vols = s.get("volumes") or []
    if vols:
        return vols[0].get("coverFile") or vols[0].get("coverUrl") or ""
    return ""


def track_id_from_url(url: str) -> str:
    m = re.search(r"track/([A-Za-z0-9]+)", url or "")
    return m.group(1) if m else ""


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print("wrote", path.relative_to(ROOT))


def build_index() -> None:
    # pick covers for 3D scene — series vol1 + a few music
    book_covers = []
    for s in SERIES:
        c = series_cover(s)
        if c:
            book_covers.append(c)
        if len(book_covers) >= 8:
            break
    music_covers = []
    for t in SPOTIFY["tracks"]:
        c = t.get("coverFile") or t.get("coverUrl")
        if c:
            music_covers.append(c)
        if len(music_covers) >= 6:
            break

    covers_js = (
        "<script>\n"
        f"window.__PORTFOLIO_BOOK_COVERS__ = {json.dumps(book_covers)};\n"
        f"window.__PORTFOLIO_MUSIC_COVERS__ = {json.dumps(music_covers)};\n"
        "</script>\n"
        '<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>\n'
        '<script src="js/three-scene.js" defer></script>'
    )

    vol_total = sum(len(s.get("volumes") or []) for s in SERIES)
    track_n = len(SPOTIFY["tracks"])

    body = f'''{head(
        "Anuj Budhwar — Author, Musician & App Builder",
        "Fantasy author, Spotify artist, Pharm.D intern from Rohtak, Haryana — and builder at Desrein Studios.",
        0,
        covers_js,
    )}
{nav(0, "index.html")}

  <header class="hero-3d" id="main">
    <canvas id="three-canvas" aria-hidden="true"></canvas>
    <div class="hero-overlay">
      <div class="section-inner">
        <div class="glass-panel" data-reveal>
          <p class="eyebrow">Rohtak, Haryana · India</p>
          <h1>Stories. Songs.<br /><span class="gold">Software.</span></h1>
          <p class="lead">
            Fantasy author of dark cultivation sagas, Spotify artist, B.Pharm graduate and Pharm.D intern,
            and indie app builder at Desrein Studios.
          </p>
          <div class="cta-row">
            <a class="btn btn-primary" href="books.html">Explore books</a>
            <a class="btn btn-ghost" href="songs.html">Listen on Spotify</a>
            <a class="btn btn-gold" href="contact.html">Say hello</a>
          </div>
          <div class="pill-row">
            <span class="pill">Amazon KDP</span>
            <span class="pill">Spotify Artist</span>
            <span class="pill">Pharm.D Intern</span>
            <span class="pill">Desrein Studios</span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <section class="section alt">
    <div class="section-inner">
      <div class="section-head" data-reveal>
        <h2>Three paths, one craft</h2>
        <p>Weak-to-strong fantasy on the page, melodies after midnight, and practical tools on your phone.</p>
      </div>
      <div class="grid-3">
        <article class="card" data-reveal>
          <p class="meta">Writing</p>
          <h3>Dark cultivation fantasy</h3>
          <p>{vol_total} volumes across {len(SERIES)} series and standalones — revenge, rebirth, and power reclaimed.</p>
          <a class="card-link" href="books.html">Series library →</a>
        </article>
        <article class="card" data-reveal>
          <p class="meta">Music</p>
          <h3>{track_n} tracks on Spotify</h3>
          <p>~{SPOTIFY.get("monthlyListeners", 17)} monthly listeners. Original singles — dark, intimate, late-night energy.</p>
          <a class="card-link" href="songs.html">Discography →</a>
        </article>
        <article class="card" data-reveal>
          <p class="meta">Apps</p>
          <h3>Desrein Studios</h3>
          <p>PDF Merger in closed testing. Loreloom in development. Built with honest shipping status.</p>
          <a class="card-link" href="apps.html">See apps →</a>
        </article>
      </div>
      <div class="stats-row" data-reveal>
        <div class="stat"><strong>{len(SERIES)}</strong><span>Book series</span></div>
        <div class="stat"><strong>{vol_total}</strong><span>Volumes</span></div>
        <div class="stat"><strong>{track_n}</strong><span>Spotify tracks</span></div>
        <div class="stat"><strong>2</strong><span>Active apps</span></div>
      </div>
    </div>
  </section>

{footer(0)}
</body>
</html>
'''
    write(ROOT / "index.html", body)


def build_about() -> None:
    body = f'''{head(
        "About — Anuj Budhwar",
        "Rohtak story, pharmacy education, fantasy author path, Spotify music, and Desrein Studios.",
    )}
{nav(0, "about.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="index.html">Home</a> / About</p>
      <h1>From Rohtak — stories, songs, and software</h1>
      <p class="lead" style="max-width:54ch;color:var(--text-muted);margin-top:.75rem">
        Pharmacy student by training, dark fantasy architect by craft — building worlds, melodies, and tools from Rohtak, Haryana.
      </p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner about-grid">
      <div class="glass-panel" data-reveal>
        <div class="prose">
          <p><strong>Anuj Budhwar</strong> is from <strong>Rohtak, Haryana</strong>, India. He graduated with a <strong>B.Pharm</strong> from <strong>Baba Mastnath University</strong> (Rohtak) and is pursuing a <strong>Pharm.D (Post Baccalaureate)</strong> at <strong>NIMS University</strong>, currently working as a <strong>Pharm.D Intern</strong>.</p>
          <p>Alongside pharmacy, he writes dark cultivation and progression fantasy on <strong>Amazon KDP</strong>, releases original music on <strong>Spotify</strong>, and builds indie Android apps under <strong>Desrein Studios</strong>.</p>
          <p>This site is text-forward by design — no personal photo gallery. The work is the portrait: covers on the shelf, tracks in the queue, and tools that ship honestly.</p>
        </div>
      </div>
      <div data-reveal>
        <h2 style="font-family:var(--display);font-size:1.6rem;margin:0 0 1rem">Path</h2>
        <ul class="timeline">
          <li><strong>Rohtak, Haryana</strong><span>Home base — where the stories and songs start.</span></li>
          <li><strong>B.Pharm · Baba Mastnath University</strong><span>Foundation in pharmacy sciences.</span></li>
          <li><strong>Pharm.D (PB) · NIMS University</strong><span>Post-baccalaureate Pharm.D; currently interning.</span></li>
          <li><strong>Amazon KDP fantasy</strong><span>Serial dark cultivation epics and standalones.</span></li>
          <li><strong>Spotify artist</strong><span>Original singles — ~{SPOTIFY.get("monthlyListeners", 17)} monthly listeners.</span></li>
          <li><strong>Desrein Studios</strong><span>PDF Merger (closed testing) and Loreloom (in development).</span></li>
        </ul>
      </div>
    </div>
  </section>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "about.html", body)


def build_books_index() -> None:
    cards = []
    for s in SERIES:
        cover = series_cover(s)
        cover_html = f'<img class="cover-thumb" src="{esc(cover)}" alt="Cover for {esc(series_display_name(s))}" loading="lazy" />' if cover else ""
        n = len(s.get("volumes") or [])
        label = "Standalone" if s.get("standalone") or n == 1 and "science" in s["id"] else f"{n} volumes"
        if s.get("standalone"):
            label = "Standalone"
        cards.append(f'''        <a class="card" href="books/{esc(s["id"])}.html" data-reveal>
          {cover_html}
          <p class="meta">{esc(label)}</p>
          <h3>{esc_text(series_display_name(s))}</h3>
          <p>{esc_text((s.get("blurb") or "")[:140])}{"…" if len(s.get("blurb") or "") > 140 else ""}</p>
          <span class="card-link">Open series →</span>
        </a>''')

    body = f'''{head(
        "Books — Anuj Budhwar",
        f"All {len(SERIES)} series and standalones — {sum(len(s.get('volumes') or []) for s in SERIES)} volumes on Amazon KDP.",
    )}
{nav(0, "books.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="index.html">Home</a> / Books</p>
      <h1>Series library</h1>
      <p class="lead" style="max-width:52ch;color:var(--text-muted);margin-top:.75rem">
        Dark cultivation, regression, and progression fantasy — plus one clear-thinking nonfiction title. Every volume links to Amazon.
      </p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner">
      <div class="grid-books">
{chr(10).join(cards)}
      </div>
    </div>
  </section>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "books.html", body)


def build_series_pages() -> None:
    # clear old mismatched pages
    books_dir = ROOT / "books"
    books_dir.mkdir(exist_ok=True)
    for old in books_dir.glob("*.html"):
        old.unlink()

    for s in SERIES:
        vols = s.get("volumes") or []
        cover = series_cover(s)
        blurb = (s.get("blurb") or "").strip() or "Dark cultivation / progression fantasy by Anuj Budhwar — see Amazon for full synopsis."
        vol_cards = []
        for v in vols:
            c = v.get("coverFile") or v.get("coverUrl") or ""
            img = f'<img class="cover-thumb" src="../{esc(c)}" alt="{esc(v.get("title",""))}" loading="lazy" />' if c else ""
            vol_cards.append(f'''          <article class="card vol-card" data-reveal>
            {img}
            <h4>{esc_text(v.get("title", f"Volume {v.get('num')}"))}</h4>
            <a class="amazon" href="{esc(v.get("url",""))}" target="_blank" rel="noopener">Amazon →</a>
          </article>''')

        label = "Standalone" if s.get("standalone") else f"{len(vols)} volumes"
        hero_img = f'<img class="cover-thumb" style="max-width:220px;margin:1.25rem 0 0" src="../{esc(cover)}" alt="" />' if cover else ""

        body = f'''{head(
            f"{series_display_name(s)} — Anuj Budhwar",
            blurb[:160],
            depth=1,
        )}
{nav(1, "books.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="../index.html">Home</a> / <a href="../books.html">Books</a> / {esc_text(series_display_name(s))}</p>
      <p class="eyebrow">{esc(label)}</p>
      <h1>{esc_text(series_display_name(s))}</h1>
      {hero_img}
    </div>
  </header>
  <section class="section">
    <div class="section-inner">
      <div class="blurb-box" data-reveal>{esc_text(blurb)}</div>
      <h2 style="font-family:var(--display);font-size:1.8rem;margin:0 0 1rem">All volumes</h2>
      <div class="grid-vols">
{chr(10).join(vol_cards)}
      </div>
      <div class="cta-row" style="margin-top:2rem">
        <a class="btn btn-ghost" href="../books.html">← All series</a>
        <a class="btn btn-primary" href="{esc(vols[0].get('url','')) if vols else '#'}" target="_blank" rel="noopener">Amazon (Vol 1)</a>
      </div>
    </div>
  </section>
{footer(1)}
</body>
</html>
'''
        write(books_dir / f"{s['id']}.html", body)


def build_songs() -> None:
    rows = []
    for t in SPOTIFY["tracks"]:
        cover = t.get("coverFile") or t.get("coverUrl") or ""
        rows.append(f'''        <article class="track-row" data-reveal>
          <img src="{esc(cover)}" alt="Cover art for {esc(t.get("title",""))}" width="72" height="72" loading="lazy" />
          <div class="track-meta">
            <h3>{esc_text(t.get("title",""))}</h3>
            <p>{esc(t.get("type","single")).title()} · {esc(str(t.get("year","")))} · {esc(t.get("duration",""))}</p>
          </div>
          <div class="track-actions">
            <a class="btn btn-spotify" href="{esc(t.get("url",""))}" target="_blank" rel="noopener">Play on Spotify</a>
          </div>
        </article>''')

    # featured embeds — first 3 tracks
    embeds = []
    for t in SPOTIFY["tracks"][:3]:
        tid = track_id_from_url(t.get("url", ""))
        if not tid:
            continue
        embeds.append(
            f'<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/{tid}?utm_source=generator" '
            f'width="100%" height="152" frameBorder="0" allowfullscreen="" '
            f'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" '
            f'title="Spotify embed: {esc(t.get("title",""))}"></iframe>'
        )

    body = f'''{head(
        "Music — Anuj Budhwar on Spotify",
        f"All {len(SPOTIFY['tracks'])} tracks — listen on Spotify. Artist page linked.",
    )}
{nav(0, "songs.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="index.html">Home</a> / Music</p>
      <h1>Spotify discography</h1>
      <p class="lead" style="max-width:52ch;color:var(--text-muted);margin-top:.75rem">
        {len(SPOTIFY["tracks"])} original tracks · ~{SPOTIFY.get("monthlyListeners", 17)} monthly listeners.
      </p>
      <div class="cta-row" style="margin-top:1rem">
        <a class="btn btn-spotify" href="{esc(SPOTIFY.get("artistUrl",""))}" target="_blank" rel="noopener">Open artist on Spotify</a>
      </div>
    </div>
  </header>
  <section class="section">
    <div class="section-inner">
      <div class="grid-tracks">
{chr(10).join(rows)}
      </div>
      <div class="embeds" data-reveal>
        <h2 style="font-family:var(--display);font-size:1.6rem;margin:0 0 .5rem">Featured embeds</h2>
        <p style="color:var(--text-muted);margin:0 0 1rem">Official Spotify embeds for a few tracks.</p>
        {chr(10).join(embeds)}
      </div>
    </div>
  </section>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "songs.html", body)


def build_apps() -> None:
    body = f'''{head(
        "Apps — Desrein Studios",
        "PDF Merger (closed testing) and Loreloom (in development) by Anuj Budhwar / Desrein Studios.",
    )}
{nav(0, "apps.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="index.html">Home</a> / Apps</p>
      <h1>Desrein Studios</h1>
      <p class="lead" style="max-width:52ch;color:var(--text-muted);margin-top:.75rem">
        Practical Android tools and creative apps — privacy-minded where it matters, honest about shipping status. No fake production Play listings.
      </p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner">
      <div class="grid-2">
        <a class="card" href="apps/pdf-merger.html" data-reveal>
          <p class="meta"><span class="badge badge-test">Closed testing</span></p>
          <h3>PDF Merger</h3>
          <p>Merge &amp; split PDFs on-device. Package <code style="color:var(--gold);font-size:.85em">com.aistudio.pdfmerger.ajxbv</code>. AdMob + Premium. Legal site live.</p>
          <span class="card-link">Details →</span>
        </a>
        <a class="card" href="apps/loreloom.html" data-reveal>
          <p class="meta"><span class="badge badge-dev">In development</span></p>
          <h3>Loreloom</h3>
          <p>AI-assisted writing studio and story bible — built for authors who juggle worlds, arcs, and continuity. Not a public store release yet.</p>
          <span class="card-link">Details →</span>
        </a>
      </div>
    </div>
  </section>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "apps.html", body)

    pdf = f'''{head(
        "PDF Merger — Desrein Studios",
        "On-device PDF merge and split by Anuj Budhwar. Closed testing on Google Play.",
        depth=1,
    )}
{nav(1, "apps.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="../index.html">Home</a> / <a href="../apps.html">Apps</a> / PDF Merger</p>
      <p class="eyebrow">Desrein Studios</p>
      <h1>PDF Merger</h1>
      <p style="margin-top:.5rem"><span class="badge badge-test">Closed testing</span></p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner" style="max-width:720px">
      <div class="glass-panel" data-reveal>
        <div class="prose">
          <p><strong>PDF Merger</strong> lets you merge and split PDF files <strong>on your device</strong> — built for people who want a straightforward tool without uploading documents to a random server.</p>
          <p>Package ID: <strong>com.aistudio.pdfmerger.ajxbv</strong>. Monetization includes AdMob with an optional Premium path.</p>
          <p>Status: available for <strong>closed testing</strong> on Google Play. There is no production Play Store listing claimed here — join testing if you have access, or use the legal / product site for policies and info.</p>
        </div>
        <div class="cta-row" style="margin-top:1.5rem">
          <a class="btn btn-primary" href="https://anujbudhwar455-png.github.io/PDFMerger/" target="_blank" rel="noopener">Product &amp; legal site</a>
          <a class="btn btn-ghost" href="https://play.google.com/apps/testing/com.aistudio.pdfmerger.ajxbv" target="_blank" rel="noopener">Closed testing</a>
          <a class="btn btn-ghost" href="../apps.html">All apps</a>
        </div>
      </div>
    </div>
  </section>
{footer(1)}
</body>
</html>
'''
    write(ROOT / "apps" / "pdf-merger.html", pdf)

    lore = f'''{head(
        "Loreloom — Desrein Studios",
        "AI-assisted writing studio and story bible app — in development.",
        depth=1,
    )}
{nav(1, "apps.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="../index.html">Home</a> / <a href="../apps.html">Apps</a> / Loreloom</p>
      <p class="eyebrow">Desrein Studios</p>
      <h1>Loreloom</h1>
      <p style="margin-top:.5rem"><span class="badge badge-dev">In development</span></p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner" style="max-width:720px">
      <div class="glass-panel" data-reveal>
        <div class="prose">
          <p><strong>Loreloom</strong> is an AI-assisted writing studio and story bible — aimed at authors juggling characters, timelines, magic systems, and multi-volume continuity.</p>
          <p>It’s being built from the same pain points that show up while serializing cultivation fantasy: keeping lore coherent while still moving the draft forward.</p>
          <p><strong>Honest status:</strong> in progress — not a public store release yet.</p>
        </div>
        <div class="cta-row" style="margin-top:1.5rem">
          <a class="btn btn-ghost" href="../apps.html">All apps</a>
          <a class="btn btn-primary" href="../contact.html">Ask about early access</a>
        </div>
      </div>
    </div>
  </section>
{footer(1)}
</body>
</html>
'''
    write(ROOT / "apps" / "loreloom.html", lore)


def build_contact() -> None:
    body = f'''{head(
        "Contact — Anuj Budhwar",
        "Email, LinkedIn, Spotify, and Amazon for Anuj Budhwar.",
    )}
{nav(0, "contact.html")}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <p class="breadcrumb"><a href="index.html">Home</a> / Contact</p>
      <h1>Say hello</h1>
      <p class="lead" style="max-width:48ch;color:var(--text-muted);margin-top:.75rem">
        Collaborations, reader notes, music, pharmacy questions, or app feedback — drop a line.
      </p>
    </div>
  </header>
  <section class="section">
    <div class="section-inner">
      <div class="glass-panel contact-card" data-reveal>
        <ul class="contact-list">
          <li><span>Email</span><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li><span>LinkedIn</span><a href="{LINKEDIN}" target="_blank" rel="noopener">anuj-budhwar-377601404</a></li>
          <li><span>Spotify</span><a href="{esc(SPOTIFY.get("artistUrl",""))}" target="_blank" rel="noopener">Artist page</a></li>
          <li><span>Location</span><span style="color:var(--text-muted)">Rohtak, Haryana, India</span></li>
        </ul>
        <div class="cta-row" style="margin-top:1.5rem">
          <a class="btn btn-gold" href="mailto:{EMAIL}">Write an email</a>
          <a class="btn btn-ghost" href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </div>
  </section>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "contact.html", body)


def build_404() -> None:
    body = f'''{head("Page not found — Anuj Budhwar", "The page you requested does not exist.")}
{nav(0)}
  <header class="page-hero" id="main">
    <div class="section-inner">
      <h1>404</h1>
      <p class="lead" style="color:var(--text-muted);margin-top:.75rem">That page drifted into the void. Try the library instead.</p>
      <div class="cta-row" style="margin-top:1.25rem">
        <a class="btn btn-primary" href="index.html">Home</a>
        <a class="btn btn-ghost" href="books.html">Books</a>
      </div>
    </div>
  </header>
{footer(0)}
</body>
</html>
'''
    write(ROOT / "404.html", body)


def build_readme() -> None:
    text = """# Anuj Budhwar — Portfolio

Static GitHub Pages site for Anuj Budhwar (Rohtak, Haryana).

- Live: https://anujbudhwar455-png.github.io/anuj-budhwar/
- Data: `research/catalog.json`
- Regenerate pages: `python3 scripts/generate_site.py`

No personal photos or AI portraits in the UI. Home uses Three.js (r160) for an immersive 3D scene.
"""
    write(ROOT / "README.md", text)


def main() -> None:
    build_index()
    build_about()
    build_books_index()
    build_series_pages()
    build_songs()
    build_apps()
    build_contact()
    build_404()
    build_readme()
    print("Series:", len(SERIES))
    print("Volumes:", sum(len(s.get("volumes") or []) for s in SERIES))
    print("Tracks:", len(SPOTIFY["tracks"]))


if __name__ == "__main__":
    main()
