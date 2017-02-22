import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { TestData } from '../models/testData';
import { AuthService } from '../security/auth.service';

@Injectable()
export class SampleDataService {

    private url: string = 'api/sampleData';

    constructor(private http: Http, private authService: AuthService) { }

    getSampleData(): Observable<TestData> {
        return this.http.get(this.url)
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    addSampleData(testData: TestData): Observable<TestData> {
        return this.http
            .post(this.url, JSON.stringify(testData), { headers: this.authService.contentHeaders() })
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    // from https://angular.io/docs/ts/latest/guide/server-communication.html
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
