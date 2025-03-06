import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-maker.js";

describe("RpgMaker test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-maker
        title="title"
      ></rpg-maker>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
