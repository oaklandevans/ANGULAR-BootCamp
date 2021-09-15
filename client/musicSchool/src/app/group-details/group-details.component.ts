import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicClass } from '../models/music-class';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  groupForm: FormGroup;
  musicGroup: MusicClass;
  currentGroupId: number;
  errorMessage: string;

  constructor( private formBuilder: FormBuilder, private organizationService: OrganizationService ) { }

  ngOnInit(): void {
    this.currentGroupId = this.organizationService.currentGroupId;
    this.initializeComponent();
    this.initializeForm();
  }

  initializeComponent(): void {
    this.organizationService.getGroupByCurrentId()
      .subscribe(
        (res: any) => {
          this.musicGroup = res;
          console.log(this.musicGroup);
        }, err => {
          this.errorMessage = err;
          console.log(this.errorMessage = err.message);
        }
      );
  }

  initializeForm(): void {
    this.groupForm = this.formBuilder.group(
      {
        GroupId: ['', Validators.required],
        GroupName: ['', Validators.required],
        OrganizationName: ['', Validators.required],
        SponsorName: ['', Validators.required],
        SponsorPhone: ['', Validators.required],
        SponsorEmail: ['', Validators.required],
        MaxGroupSize: ['', Validators.required]
      }
    );

    this.groupForm.patchValue(this.musicGroup);
  }

  onSaveForm(musicClass): void {
    this.organizationService.updateGroup(musicClass).subscribe();
  }

}
