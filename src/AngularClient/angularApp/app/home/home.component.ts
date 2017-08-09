import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {

    message: string;
    name = 'none';
    email = 'none';
    userDataSubscription: Subscription;
    userData: any;
    isAuthorizedSubscription: Subscription;
    isAuthorized: boolean;

    constructor(public oidcSecurityService: OidcSecurityService) {
        this.message = 'HomeComponent constructor';
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
            });

        this.userDataSubscription = this.oidcSecurityService.getUserData().subscribe(
            (userData: any) => {

                this.userData = userData;
                if (userData != '') {
                    this.name = userData.name;
                    this.email = userData.email;
                    console.log(userData);
                }

                console.log('userData got data');
            });
    }

    ngOnDestroy(): void {
        this.userDataSubscription.unsubscribe();
        this.isAuthorizedSubscription.unsubscribe();
    }
}
