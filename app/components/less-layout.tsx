import { DsdElement } from '@lessjs/core';
import { StyleSheet } from '@lessjs/style-sheet';

export const tagName = 'less-layout';

const styles = new StyleSheet();
styles.replaceSync(`
  :host {
    display: block;
    min-height: 100dvh;
  }
`);

export default class LessLayout extends DsdElement {
  static override styles = styles;

  override render() {
    return <slot></slot>;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get(tagName)) {
  customElements.define(tagName, LessLayout);
}
