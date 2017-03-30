import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class TreeService {
    url = 'http://localhost:3004/db';
    constructor(private http: Http){
    }

    getTrees(){
        return this.http.get(this.url)
        .map(res => res.json());
    }


    sendData(data:any): Observable<Object> {

        let encoded_data = JSON.stringify({ data });
        console.log(encoded_data);
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        let options = new RequestOptions({ headers: headers });

        // return this.http.post(encoded_data, this.url, options).map(
        //     (res: Response) => res.json() || {}
        // );

        return null;
    }
}