import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';

@Component({
  selector: 'senph-valid',
  templateUrl: './valid.component.html',
  styleUrls: ['./valid.component.scss']
})
export class ValidComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() control: FormControl;
  @Input() id: String;
  @Input() label: String;
  @Input() formErrors;

  tempValue: String;
  checkboxState = false;

  constructor() { }

  ngOnInit() {
  }
}