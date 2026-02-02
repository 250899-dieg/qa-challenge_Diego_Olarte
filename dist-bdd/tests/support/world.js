"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
class CustomWorld extends cucumber_1.World {
    browser;
    context;
    page;
    constructor(options) {
        super(options);
    }
    async init() {
        this.browser = await playwright_1.chromium.launch({
            headless: false
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }
    async cleanup() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}
exports.CustomWorld = CustomWorld;
(0, cucumber_1.setWorldConstructor)(CustomWorld);
