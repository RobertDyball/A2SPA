# Angular 4 + ASP.Net Core 1.1.1 SPA

A SPA that uses the best of ASP.Net Core 1.1.1 for the backend and Angular 4.0 for the front end.

Part 1: see: https://www.codeproject.com/Articles/1148767/SPA-using-ASP-Net-Core-plus-Angular-part1
covers this technique to integrate ASP.Net Core and Angular 4

Part 2: see: https://www.codeproject.com/Articles/1168647/SPA-using-ASP-Net-Core-plus-Angular-part2
covers use of ASP.Net Core tag helpers with Angular 4 to display data

Part 3: see https://www.codeproject.com/Articles/1171129/SPA-using-ASP-Net-Core-plus-Angular-part3
covers use of ASP.Net Core tag helpers with Angular 4 for data input

Part 4: see https://www.codeproject.com/Articles/1172349/SPA-using-ASP-Net-Core-plus-Angular-part4
*(this part) covers token authentication using JWT and OpenIdDict 


Part 5: (URL to be added; soon to be pubished)

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
