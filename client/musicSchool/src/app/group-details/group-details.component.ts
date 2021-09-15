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
    this.populateFormWithData();
  }

  initializeComponent(): void {
    this.organizationService.getGroupByCurrentId()
      .subscribe(
        (res: any) => {
          this.musicGroup = res;
          this.populateFormWithData();
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

  populateFormWithData(): void {
    this.groupForm.patchValue(
      this.musicGroup
    );
    console.log(this.musicGroup?.GroupId);
  }

  onSaveForm(musicClass): void {
    this.organizationService.updateGroup(musicClass).subscribe();
    this.location.back();
  }

  // saveGroupId(groupId: number): void {
  //   this.organizationService.currentGroupId = groupId;
  //   console.log(`Current Group Id: ${this.organizationService.currentGroupId}`);
  // }

  deleteCurrentGroup(): void {
    if (window.confirm('Are you sure you want to delete this class?'))
    {
      this.organizationService.deleteCurrentGroup().subscribe();
      this.location.back();
    }
  }

}
