import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from './app.constants';
import { OidcSecurityService, AuthConfiguration } from 'angular-auth-oidc-client';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import './app.component.css';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

    constructor(
        public securityService: OidcSecurityService,
        private http: Http,
        private authConfiguration: AuthConfiguration) {
    }

    ngOnInit() {
        if (window.location.hash) {
            this.securityService.authorizedCallback();
        }
    }

    login() {
        this.securityService.authorize();
        //// https://rp.certification.openid.net:8080/damienbod.id_token-token/rp-response_type-id_token+token/registration
        //console.log('start login');
        //this.registerClient()
        //    .subscribe((data: any) => {
        //        this.authConfiguration.client_id = data.client_id;
        //        console.log(data);
        //        this.securityService.authorize();
        //    });
    }

    refreshSession() {
        console.log('start refreshSession');
        this.securityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.securityService.logoff();
    }

    //private registerClient = (): Observable<any> => {

    //    let headers = new Headers();
    //    headers.append('Content-Type', 'application/json');
    //    headers.append('Accept', 'application/json');
    //    headers.append('access-control-allow-origin', '*');

    //    let url = 'https://rp.certification.openid.net:8080/damienbod.id_token-token/rp-response_type-id_token+token/registration'; // this.testurl + '/registration';
    //    let jsonbody = '{ "application_type": "web", "redirect_uris": [ "https://localhost:44386" ], "response_types": [ "id_token", "id_token token" ]}';
    //    console.log(url);
    //    console.log(jsonbody);

    //    return this.http.post(url, {
    //        headers: headers,
    //        body: jsonbody
    //    }).map((res: any) => res.json());
    //}
}