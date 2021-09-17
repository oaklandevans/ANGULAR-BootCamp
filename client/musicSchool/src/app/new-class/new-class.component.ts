import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicClass } from '../models/music-class';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {

  addClassForm: FormGroup;
  class: MusicClass;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private location: Location
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
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

  onSubmit(musicClass): void {
    this.organizationService.addGroup(musicClass).subscribe(() => {
      alert('New Class Added!');
    }, err => {
      this.errorMessage = err;
      console.log(this.errorMessage = err.message);
      alert('Sorry, Bad Request. Group not added.');
    });
    this.location.back();
  }


}

