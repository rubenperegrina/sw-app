import { Component, OnInit } from '@angular/core';

import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    form: FormGroup;
    user: User;
    isDisabled: boolean;

    constructor(
        private accountService: AccountService,
        private formBuilder: FormBuilder
        ) {
        this.user = this.accountService.userValue;
    }

    ngOnInit() {
        this.isDisabled = false;
        this.form = this.formBuilder.group({
            firstName: [this.user.firstName],
            lastName: [this.user.lastName],
            userName: [this.user.userName],
            password: [this.user.password]
        });
    }
    
    get f() { return this.form.controls; }
}