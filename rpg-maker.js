/**
 * Copyright 2025 Landon-McSweeney
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character";

/**
 * `rpg-maker`
 * 
 * @demo index.html
 * @element rpg-maker
 */
export class RpgMaker extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-maker";
  }

  constructor() {
    super();
    this.title = "GitHub Contributors";
    this.contributors = []; // Store contributors here
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title", // Default translation key
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-maker.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"], // Supported languages
    });

    this.fetchContributors();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      contributors: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
          background-color: var(--rpg-maker-background-color, #f4f4f4); /* Default background color */
          border-radius: var(--rpg-maker-border-radius, 8px); /* Rounded corners */
        }
        h3 {
          font-size: var(--rpg-maker-header-font-size, var(--ddd-font-size-m));
          font-weight: bold;
          color: var(--rpg-maker-header-color, #333); /* Default color for headers */
        }
        h3 span {
          font-size: var(--rpg-maker-label-font-size, var(--ddd-font-size-s));
          color: var(--rpg-maker-label-color, #777); /* Default color for the label */
        }
        .slot-content {
          margin-top: var(--ddd-spacing-3);
        }
        .contributor-card {
          margin-bottom: 16px;
        }
      `
    ];
  }

  // Fetch contributors from GitHub API
  async fetchContributors() {
    const response = await fetch(`https://api.github.com/repos/haxtheweb/webcomponents/contributors`);
    const data = await response.json();
    this.contributors = data.slice(0, 5); // Limit to 5 contributors for now
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.title}</h3>
        <div class="contributors-list">
          ${this.contributors.map(contributor => html`
            <div class="contributor-card">
              <haxtheweb-rpg-character
                name="${contributor.login}"
                seed="${contributor.login}"
                class="character-card"
              >
                <div class="contributor-info">
                  <p>Username: ${contributor.login}</p>
                  <p>Contributions: ${contributor.contributions}</p>
                  <a href="${contributor.html_url}" target="_blank">GitHub Profile</a>
                </div>
              </haxtheweb-rpg-character>
            </div>
          `)}
        </div>
        <slot></slot>
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgMaker.tag, RpgMaker);
