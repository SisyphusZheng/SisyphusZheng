import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';
import '../islands/theme-toggle.tsx';

export const tagName = 'site-shell';

const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    min-height: 100dvh;
    background:
      radial-gradient(circle at 15% 0%, color-mix(in srgb, var(--brass), transparent 86%), transparent 28rem),
      var(--paper);
    color: var(--ink);
  }

  header {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 22px clamp(18px, 4vw, 56px);
    color: var(--header-color, white);
    pointer-events: none;
  }

  .brand,
  nav,
  .tools {
    pointer-events: auto;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    color: inherit;
    text-decoration: none;
    font-weight: 800;
  }

  .mark,
  .icon-link,
  .lang,
  theme-toggle button {
    width: 42px;
    height: 42px;
    display: inline-grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    color: inherit;
    background: rgba(17, 17, 17, 0.34);
    text-decoration: none;
    backdrop-filter: blur(16px);
  }

  .mark {
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.18);
  }

  .mark svg {
    width: 27px;
    height: 27px;
  }

  nav {
    display: inline-flex;
    align-items: center;
    gap: clamp(14px, 3vw, 30px);
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(17, 17, 17, 0.24);
    backdrop-filter: blur(18px);
  }

  nav a {
    color: inherit;
    text-decoration: none;
    font-size: 0.88rem;
    font-weight: 760;
    opacity: 0.86;
  }

  nav a:hover,
  .icon-link:hover,
  .lang:hover {
    opacity: 1;
    color: var(--brass);
  }

  .tools {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .lang {
    font-family: var(--font-mono);
    font-size: 0.74rem;
    font-weight: 800;
  }

  theme-toggle {
    display: inline-flex;
  }

  theme-toggle button {
    cursor: pointer;
  }

  theme-toggle button:hover {
    border-color: rgba(255, 255, 255, 0.46);
    transform: translateY(-1px);
  }

  theme-toggle svg {
    width: 18px;
    height: 18px;
  }

  main {
    min-height: calc(100dvh - 112px);
  }

  footer {
    border-top: 1px solid var(--line);
    margin-top: 76px;
  }

  .footer-inner {
    width: min(1120px, calc(100% - 36px));
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin: 0 auto;
    color: var(--muted);
    font-size: 0.94rem;
  }

  .footer-inner a {
    color: var(--rust);
    text-underline-offset: 4px;
  }

  :host([surface="paper"]) {
    --header-color: var(--ink);
  }

  :host([surface="paper"]) header {
    position: sticky;
    background: color-mix(in srgb, var(--paper), transparent 12%);
    border-bottom: 1px solid var(--line);
    backdrop-filter: blur(18px);
  }

  :host([surface="paper"]) nav,
  :host([surface="paper"]) .mark,
  :host([surface="paper"]) .icon-link,
  :host([surface="paper"]) .lang,
  :host([surface="paper"]) theme-toggle button {
    border-color: var(--line);
    background: var(--panel);
    color: var(--ink);
  }

  @media (max-width: 760px) {
    header {
      position: sticky;
      color: var(--ink);
      background: color-mix(in srgb, var(--paper), transparent 8%);
      border-bottom: 1px solid var(--line);
      backdrop-filter: blur(16px);
      padding: 14px 16px;
      flex-wrap: wrap;
    }

    nav {
      order: 3;
      width: 100%;
      justify-content: space-between;
      border-color: var(--line);
      background: var(--panel);
      color: var(--ink);
      padding: 10px 12px;
    }

    .mark,
    .icon-link,
    .lang,
    theme-toggle button {
      border-color: var(--line);
      background: var(--panel);
      color: var(--ink);
    }

    footer {
      margin-top: 48px;
    }

    .footer-inner {
      min-height: 130px;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      padding: 24px 0;
    }
  }
`);

export default class SiteShell extends DsdElement {
  static override styles = styles;
  surface = '';
  language = 'en';

  override render() {
    const isZh = this.language === 'zh';
    const nav = isZh
      ? [
        ['写作', '/zh/blog'],
        ['项目', '/zh/projects'],
        ['主题', '/zh/topics'],
        ['关于', '/zh/about'],
      ]
      : [
        ['Writing', '/blog'],
        ['Projects', '/projects'],
        ['Topics', '/topics'],
        ['About', '/about'],
      ];

    return (
      <>
        <header>
          <a class='brand' href={isZh ? '/zh' : '/'}>
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
          <nav aria-label={isZh ? '主导航' : 'Primary'}>
            {nav.map(([label, href]) => <a href={href}>{label}</a>)}
          </nav>
          <span class='tools'>
            <a
              class='icon-link'
              href={isZh ? '/zh/search' : '/search'}
              aria-label={isZh ? '搜索' : 'Search notes'}
              title={isZh ? '搜索' : 'Search notes'}
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
            <a class='lang' href={isZh ? '/' : '/zh'} title={isZh ? 'English' : '中文'}>
              {isZh ? 'EN' : '中'}
            </a>
            <theme-toggle>
              <button
                type='button'
                aria-label={isZh ? '切换主题' : 'Toggle theme'}
                title={isZh ? '切换主题' : 'Toggle theme'}
              >
                <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path
                    d='M21 12.6A8.6 8.6 0 0 1 11.4 3a7.5 7.5 0 1 0 9.6 9.6Z'
                    stroke='currentColor'
                    stroke-width='1.8'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </button>
            </theme-toggle>
          </span>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <div class='footer-inner'>
            <span>© 2026 Zheng Zhi. Built with local LessJS.</span>
            <a href={isZh ? '/zh/projects' : '/projects'}>{isZh ? '项目实验室' : 'Project Lab'}</a>
          </div>
        </footer>
      </>
    );
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, SiteShell);
}
