# Angular 5 + Bootstrap 4 + ASP.Net Core 2 = ASP.Net Core 2 SPA

NOTE: This branch now supports Angular 5 + .Net Core 2.x using VS2017. 

This branch uses Primefaces PrimeNG for Angular / Bootstrap integration.

There will no longer be active support for VS2015 nor for earlier versions of .Net Core 1.x
VS Code should also work but has not been tested.

This new version of the code is still rough and a work in progress. (todo: code cleanup, debugging, re-addition of NSwag).
OPenIdDict implementation in A2SPA supports login, logout and password. (Still need to complete the addition of 2FA and user maintenance).
Basic data CRUD functions should work (usually).

What is A2SPA?

A SPA or "Single Page Application" framework that uses ASP.Net Core 2 for the backend and Angular 5.0 for the front end.
It differs from many implementations of .Net / Angular SPAs by using .Net Core views (allowing use of server-side code including ViewData, data models and tag helpers) instead of 'flat' HTML.

Following are links to the original article series based on ASP.Net Core 1.1.1 and Angular 4 

Part 1: see: https://www.codeproject.com/Articles/1148767/SPA-using-ASP-Net-Core-plus-Angular-part1
covers this technique to integrate ASP.Net Core and Angular 4

Part 2: see: https://www.codeproject.com/Articles/1168647/SPA-using-ASP-Net-Core-plus-Angular-part2
covers use of ASP.Net Core tag helpers with Angular 4 to display data

Part 3: see https://www.codeproject.com/Articles/1171129/SPA-using-ASP-Net-Core-plus-Angular-part3
covers use of ASP.Net Core tag helpers with Angular 4 for data input

Part 4: see https://www.codeproject.com/Articles/1172349/SPA-using-ASP-Net-Core-plus-Angular-part4
covers token authentication using JWT and OpenIdDict 

Part 5: see https://www.codeproject.com/Articles/1176561/SPA-using-ASP-Net-Core-plus-Angular-part-5
Covers Web API changes; adding create/read/update/delete "CRUD" support, async and model server-side driven data validation

Part 6: see https://www.codeproject.com/Articles/1177725/SPA-using-ASP-Net-Core-plus-Angular-part6
Covers Swagger / NSwag Web API documentation and automated Angular 4 typescript code generation, pubishing to IIS

Part 7: see https://www.codeproject.com/Articles/1179438/SPA-using-ASP-Net-Core-plus-Angular-part7
Covers Publishing to IS using VS2015, conversion from localDB to SQLExpress, conversion from Angular 2.4 to Angular 4

Part 8  see https://www.codeproject.com/Articles/1180361/SPA-2-using-ASP-Net-Core-1-1-plus-Angular-4-0-part8
Covers publishing to IIS using VS2017.

Part 9 see https://www.codeproject.com/Articles/1181665/SPA-using-ASP-Net-Core-plus-Angular-part-9
Covers optimization, automated SQL migrations, and publishing to Azure, external IIS hosts

#### Prerequisites

Download and install ASP.Net Core 2.x - http://dot.net 
Download and install Visual Studio 2017.
Install Typescript and Typings globally.

npm install -g typescript
npm install -g typings 

#### Running

Pull a copy of the repo, load the solution into Visual Studio 2017, click Ctrl-F5 to launch browser and view the site.
(Ctrl-F5 will retrieve missing dependencies, build the app, then run IIS Express and load the default browser).

NOTE: if using VS2017 ensure your NuGet feed sources include this reference:

aspnet-contrib

pointing to:

https://www.myget.org/F/aspnet-contrib/api/v3/index.json
