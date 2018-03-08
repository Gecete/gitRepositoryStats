import {Injectable} from '@angular/core';
import { Http, Response, RequestOptionsArgs,} from "@angular/http";
import {Observable} from "rxjs";


@Injectable()
export class ApiService {


    private headers: Headers = new Headers();
    private requestOptions: RequestOptionsArgs = {};
    private apiServer: string = "https://api.github.com";

    constructor(private http: Http) {

     


       }


  
    get(endPoint: string): Observable<Response> {
      return this.http.get(this.createUrl(endPoint));
  }

    createUrl(endPoint): string {

        let url = this.apiServer + endPoint;
        if (!endPoint.startsWith('/')) {
            url = this.apiServer + '/' + endPoint;
        }


        return url;
    }

  


}