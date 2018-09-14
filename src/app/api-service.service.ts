import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from './models/API';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { APIDetails } from './models/APIDetails';

interface APIs {
  list: API[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl: string = "https://localhost:9443/api/am/publisher/v0.13/apis/";

  private headers: Headers;

  constructor(private http: HttpClient) {
  }

  getAllAlertDetails(): Observable<API[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
    };

    return this.http.get<APIs>(this.baseUrl, httpOptions)
      .map(res => <API[]>res.list);
  }

  getAPIDetails(id: string): Observable<APIDetails> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      })
    };

    return this.http.get<APIDetails>(this.baseUrl + id, httpOptions)
      .map(res => <APIDetails>res);
  }

  createAPI(api: APIDetails) {

    console.log('Incoming API -- ' + JSON.stringify(api));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      })
    };

    return this.http.post<APIDetails>(this.baseUrl, api, httpOptions).map(res => <APIDetails>res);
    // return this.http.post<APIDetails>("", "api", httpOptions).map(res => <APIDetails>res);
  }

  createAPIWithTemplate(apiTemplate: string) {

    console.log('Incoming API -- ' + apiTemplate);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      })
    };

    return this.http.post<APIDetails>(this.baseUrl, apiTemplate, httpOptions).map(res => <APIDetails>res);
    // return this.http.post<APIDetails>("", apiTemplate, httpOptions).map(res => <APIDetails>res);
  }

  public getJSON(): Observable<string> {
    return this.http.get("./assets/RequestTemplate.json").map(res => JSON.stringify(res));
  }

  public changeAPIStatus(status: string, apiId: string): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      })
    };

    return this.http.post<string>(this.baseUrl + "change-lifecycle?apiId=" + apiId + "&action=" + status, "", httpOptions).map(res => JSON.stringify(res));
  }
}
