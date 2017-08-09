import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from './app.constants';
import { OidcSecurityService, AuthConfiguration } from 'angular-auth-oidc-client';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { Subscription } from 'rxjs/Subscription';

import './app.component.css';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;

    constructor(
        public securityService: OidcSecurityService,
        private http: Http,
        private authConfiguration: AuthConfiguration) {
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.securityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });

        if (window.location.hash) {
            this.securityService.authorizedCallback();
        }
    }

    ngOnDestroy(): void {
        this.isAuthorizedSubscription.unsubscribe();
    }

    login() {
        this.securityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.securityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.securityService.logoff();
    }
}