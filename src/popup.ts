import { LitElement, html, css, unsafeCSS, CSSResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { style } from './popup.style';

@customElement('pop-up')
class Popup extends LitElement {
  /*
    static styles = css`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    `;
    */
  static styles: CSSResult = css`
    ${unsafeCSS(style)}
  `;
  static readonly DEFAULT_NAME = 'there';

  @state()
  private _visible: boolean = false;
  @state()
  private _name: string = Popup.DEFAULT_NAME;

  constructor() {
    super();
    chrome.storage.sync.get('username', ({ username }) =>
      this.onNameChange(username)
    );
    chrome.storage.onChanged.addListener((changes) =>
      this.onNameChange(changes?.username?.newValue)
    );
    chrome.runtime.onMessage.addListener(
      ({ type, payload }, sender, sendResponse) => {
        this._visible = type === 'IDLE';
        sendResponse({});
        return true;
      }
    );
  }

  onNameChange(name: string | undefined): void {
    this._name = name ?? Popup.DEFAULT_NAME;
  }

  render() {
    const styles = { visibility: this._visible ? 'visible' : 'hidden' };
    return html`
            <div style=${styleMap(
              styles
            )} class="w-48 absolute right-0 bottom-0 z-50 max-w-lg p-5 rounded-xl shadow-lg bg-white ">
                <div class="text-center p-5 flex-auto justify-center">
                    <h2 class="text-xl font-bold py-4 ">Are you lost, ${
                      this._name
                    }?</h3>
                </div>
                <div class="p-3  mt-2 text-center space-x-4 md:block">
                    <button
                        @click="${this.accept}"
                        class="mb-2 md:mb-0 bg-green-500 border border-green-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
                    >Yes</button>
                    <button
                        @click="${this.decline}"
                        class="mb-2 md:mb-0 bg-red-500 border border-red-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                        No
                    </button>
                </div>
            </div>
    `;
  }

  accept(): void {
    this._visible = false;
    chrome.runtime.sendMessage(
      { type: 'LEAVE', url: 'http://help.nickelled.com' },
      (_) => _
    );
  }

  decline(): void {
    this._visible = false;
    chrome.runtime.sendMessage({ type: 'ACTIVE' }, (_) => _);
  }
}
document.body.appendChild(document.createElement('pop-up'));
