"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .then(function (success) { return console.log('App bootstrapped'); })
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map