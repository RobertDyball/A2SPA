// NOTE: use this option to add ALL RxJS statics & operators to Observable (upside: simple, downside: larger, slower to load)
// import 'rxjs/Rx';

// NOTE: Use this option below to import just the rxjs statics and operators needed for this app.

 // Observable class extensions
 import 'rxjs/add/observable/of';
 import 'rxjs/add/observable/throw';

 // Observable operators
 import 'rxjs/add/operator/catch';
 import 'rxjs/add/operator/debounceTime';
 import 'rxjs/add/operator/distinctUntilChanged';
 import 'rxjs/add/operator/do';
 import 'rxjs/add/operator/filter';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/switchMap';
