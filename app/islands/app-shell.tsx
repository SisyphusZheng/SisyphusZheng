import { defineIslandConfig } from '@openelement/router';
import { computed, element, OpenElement, property } from '@openelement/element';
import { appShellStyles } from '../components/app-shell-styles.ts';

// The convention shell: `app/islands/app-shell.tsx` is auto-registered by the
// router under the tag `app-shell` and wrapped around every page. The markup is
// the retired shell component's body; its `language` prop is gone (the
// convention shell receives no per-page props from the site), so the language is
// derived from the router-injected `currentPath` instead, and the retired
// `surface` prop is replaced by the `surface` computed below — the retired
// shell's host belonged to the page ('paper' on reading pages), the convention
// shell cannot set its own host attributes, so the same two groups are keyed on
// `<header data-surface="home|paper">` instead. The retired render()'s
// `nav.map(...)` is now a list Region over a computed array: a compiled
// render() is one static return, so every language-dependent value is a
// computed field read through a Part or Region.
export const openElement = defineIslandConfig({ hydrate: 'load', ssr: true, dsd: true });

interface ShellLink {
  key: string;
  label: string;
  href: string;
}

@element('app-shell', { root: 'shadow-open' })
export default class AppShell extends OpenElement {
  static override styles = appShellStyles;

  // Injected by the router on every page (`currentPath: routePath`, e.g.
  // '/zh/blog'). Attribute-backed, so SSR writes the host attribute
  // `current-path` and the client claim rebuilds the property from it.
  @property({ reflect: false })
  currentPath = '/';

  // Injected by the router as `home: isHome || undefined`, where the router's
  // SSG render runtime computes `isHome` from `routePath === '/'`. Attribute-
  // backed, so that value survives SSR as a host attribute on the root page and
  // the client claim rebuilds the property from it. The router only marks the
  // default-locale root, so the zh root ('/zh') is recognized by path instead
  // (see `surface`).
  @property({ reflect: false })
  home = '';

  // A home path gets the cinematic header (fixed, transparent, white over the
  // full-viewport hero); every other path is a reading page and gets the
  // sticky paper header. The router's `home` prop only covers '/', so the zh
  // root is matched explicitly by path.
  @property({ reflect: false, attribute: false })
  surface: string = computed(() =>
    this.home || this.currentPath === '/' || this.currentPath === '/zh' ? 'home' : 'paper'
  ) as unknown as string;

  // Language is derived from an exact path segment: '/zh' and '/zh/...' are
  // Chinese, everything else (including a hypothetical '/zhfoo') is English.
  @property({ reflect: false, attribute: false })
  language: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? 'zh' : 'en'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  homeHref: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '/zh' : '/'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  navLabel: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '主导航' : 'Primary'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  nav: ShellLink[] = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/')
      ? [
        { key: 'blog', label: '写作', href: '/zh/blog' },
        { key: 'projects', label: '项目', href: '/zh/projects' },
        { key: 'topics', label: '主题', href: '/zh/topics' },
        { key: 'about', label: '关于', href: '/zh/about' },
      ]
      : [
        { key: 'blog', label: 'Writing', href: '/blog' },
        { key: 'projects', label: 'Projects', href: '/projects' },
        { key: 'topics', label: 'Topics', href: '/topics' },
        { key: 'about', label: 'About', href: '/about' },
      ]
  ) as unknown as ShellLink[];

  @property({ reflect: false, attribute: false })
  searchHref: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '/zh/search' : '/search'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  searchLabel: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '搜索' : 'Search notes'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  langHref: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '/' : '/zh'
  ) as unknown as string;

  // Link text stays the compact locale glyph; the title spells the target
  // language out (retired shell: text `{isZh ? 'EN' : '中'}`, title
  // `{isZh ? 'English' : '中文'}`).
  @property({ reflect: false, attribute: false })
  langLabel: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? 'EN' : '中'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  langTitle: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? 'English' : '中文'
  ) as unknown as string;

  @property({ reflect: false, attribute: false })
  toggleLabel: string = computed(() =>
    this.currentPath === '/zh' || this.currentPath.startsWith('/zh/') ? '切换主题' : 'Toggle theme'
  ) as unknown as string;

  render() {
    return (
      <div class='shell'>
        <header data-surface={this.surface}>
          <a class='brand' href={this.homeHref}>
            <span class='mark' aria-hidden='true'>
              <svg viewBox='0 0 64 64' fill='none'>
                <path
                  d='M14 46 30 10h6L20 46h24'
                  stroke='currentColor'
                  stroke-width='5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M31 46 47 10h5L37 46h13'
                  stroke='currentColor'
                  stroke-width='5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  opacity='0.72'
                />
                <path
                  d='M13 50h39'
                  stroke='var(--brass)'
                  stroke-width='4'
                  stroke-linecap='round'
                />
              </svg>
            </span>
            <span>Field Notes</span>
          </a>
          <nav aria-label={this.navLabel}>
            {this.nav.map((link) => <a href={link.href} key={link.key}>{link.label}</a>)}
          </nav>
          <span class='tools'>
            <a
              class='icon-link'
              href={this.searchHref}
              aria-label={this.searchLabel}
              title={this.searchLabel}
            >
              <svg viewBox='0 0 24 24' width='18' height='18' fill='none' aria-hidden='true'>
                <path
                  d='m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z'
                  stroke='currentColor'
                  stroke-width='1.8'
                  stroke-linecap='round'
                />
              </svg>
            </a>
            <a class='lang' href={this.langHref} title={this.langTitle}>{this.langLabel}</a>
            <theme-toggle label={this.toggleLabel}></theme-toggle>
          </span>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <div class='footer-inner'>
            <span>© 2026 Zheng Zhi. Built with local LessJS.</span>
            {this.language === 'zh'
              ? <a href='/zh/projects'>项目实验室</a>
              : <a href='/projects'>Project Lab</a>}
          </div>
        </footer>
      </div>
    );
  }
}
