"use strict";
var router_1 = require("@angular/router");
var about1_component_1 = require("./about1.component");
var about2_component_1 = require("./about2.component");
var index_component_1 = require("./index.component");
var contact_component_1 = require("./contact.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent, data: { title: 'Home' } },
    { path: 'about1', component: about1_component_1.About1Component, data: { title: 'About1' } },
    { path: 'about2', component: about2_component_1.About2Component, data: { title: 'About2' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [about1_component_1.About1Component, about2_component_1.About2Component, index_component_1.IndexComponent, contact_component_1.ContactComponent];
//# sourceMappingURL=app.routing.js.map