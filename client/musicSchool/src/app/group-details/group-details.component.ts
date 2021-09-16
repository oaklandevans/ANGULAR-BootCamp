import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private location: Location
  ) { }

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
          console.log(`GroupId: ${this.organizationService.currentGroupId}`)
          console.log(`Current Group Id In LocalStorage In Group Details: ${localStorage.getItem("GroupId")}`);
          this.populateFormWithData(this.musicGroup);
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
  }

  populateFormWithData(group): void {
    this.groupForm.patchValue(group);
    console.log(this.musicGroup?.GroupId);
  }

  onSaveForm(musicClass): void {
    if (window.confirm('Are you sure you want to save current class details?')) {
      this.organizationService.updateGroup(musicClass).subscribe();
    }
    this.location.back();
  }

  saveMemberId(studentId: number): void {
    this.organizationService.currentMemberId = studentId;
    console.log(`Current Member Id: ${this.organizationService.currentMemberId}`);
  }

  deleteCurrentGroup(): void {
    if (window.confirm('Are you sure you want to delete this class?'))
    {
      this.organizationService.deleteCurrentGroup().subscribe();
      this.location.back();
    }
  }

}
