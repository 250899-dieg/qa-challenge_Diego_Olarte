"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const cucumber_2 = require("@cucumber/cucumber");
(0, cucumber_2.setDefaultTimeout)(60 * 1000); // 60s
(0, cucumber_1.Before)(async function () {
    await this.init();
});
(0, cucumber_1.After)(async function () {
    await this.cleanup();
});
