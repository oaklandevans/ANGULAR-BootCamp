import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicClass } from '../models/music-class';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {

  addClassForm: FormGroup;
  class: MusicClass;

  constructor( private formBuilder: FormBuilder ) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm(): void {
    this.addClassForm = this.formBuilder.group(
      {
        GroupName: ['', Validators.required],
        OrganizationName: ['', Validators.required],
        SponsorName: ['', Validators.required],
        SponsorPhone: ['', Validators.required],
        SponsorEmail: ['', Validators.required],
        MaxGroupSize: ['', Validators.required]
      }
    );
  }

}
