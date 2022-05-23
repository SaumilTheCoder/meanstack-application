import { Component, OnInit } from '@angular/core';
import { ComponentCanDeactivate } from 'src/app/component-can-deactivate';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit,ComponentCanDeactivate {

  canDeactivate():  boolean{
    return !this.isDirty;
  }
  isDirty = false;
  constructor() { }

  ngOnInit() {
  }

}
