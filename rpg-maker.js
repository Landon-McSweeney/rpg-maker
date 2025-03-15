/**
 * Copyright 2025 Landon-McSweeney
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css, property } from 'lit';
import '@haxtheweb/rpg-character';

class GithubRpgContributors extends LitElement {
  @property({ type: String }) organization = 'haxtheweb';
  @property({ type: String }) repo = 'webcomponents';
  @property({ type: Number }) limit = 5;  // Limit the number of contributors
  @property({ type: Array }) contributors = [];

  async fetchContributors() {
    const response = await fetch(`https://api.github.com/repos/${this.organization}/${this.repo}/contributors`);
    const data = await response.json();
    this.contributors = data.slice(0, this.limit);
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchContributors();
  }

  render() {
    return html`
      <div class="contributors-list">
        ${this.contributors.map(contributor => html`
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
        `)}
      </div>
    `;
  }

  static styles = css`
    .contributors-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      padding: 16px;
    }

    .contributor-info {
      text-align: center;
      color: white;
      background-color: #333;
      padding: 10px;
      border-radius: 8px;
    }

    .character-card {
      max-width: 200px;
      margin: 0 auto;
    }
  `;
}

customElements.define('github-rpg-contributors', GithubRpgContributors);
