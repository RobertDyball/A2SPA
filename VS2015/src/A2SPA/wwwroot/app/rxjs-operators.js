// NOTE: use this option to add ALL RxJS statics & operators to Observable (upside: simple, downside: larger, slower to load)
// import 'rxjs/Rx';
"use strict";
// NOTE: Use this option below to import just the rxjs statics and operators needed for this app.
// Observable class extensions
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
//# sourceMappingURL=rxjs-operators.js.map