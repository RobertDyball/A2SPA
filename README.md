# Angular 4 + ASP.Net Core 1.1.1 SPA

A SPA that uses the best of ASP.Net Core 1.1.1 for the backend and Angular 4.0 for the front end.

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

Part 9 seehttps://www.codeproject.com/Articles/1181665/SPA-using-ASP-Net-Core-plus-Angular-part-9
Covers optimization, automated SQL migrations, and publishing to Azure, external IIS hosts

#### Prerequisites

Download and install ASP.Net Core here: http://dot.net 
If using Windows, use Visual Studio 2015 Update 3 with the latest ASP.Net core tooling updates. (see ./VS2015 folder)
or use Visual Studio Studio 2017 (see ./VS2015 folder)

Install Typescript and Typings globally, as these will be used by the application.

npm install -g typescript

npm install -g typings 


#### Running

Pull a copy of the repo, load the solution into Visual Studio 2015/2017, click Ctrl-F5 to launch browser and viewthe site.
(Ctrl-F5 which retrieve any missing dependencies, build, load IIS Express and then load the VS 2015 default browser).

NOTE: if using VS2017 (or VS2015) and you have not yet added aspn-net contributions MyGet, to your NuGet feeds, add this reference:

aspnet-contrib

and point it to this feed:

https://www.myget.org/F/aspnet-contrib/api/v3/index.json
