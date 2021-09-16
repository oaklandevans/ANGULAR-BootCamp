import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  editStudentForm: FormGroup;
  student: Student;
  currentGroupId: number;
  currentMemberId: number;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.currentGroupId = this.organizationService.currentGroupId;
    this.currentMemberId = this.organizationService.currentMemberId;
    this.initializeForm();
    this.initializeComponent();
  }

  initializeComponent(): void {
    this.organizationService.getMemberOfGroup(this.currentGroupId, this.currentMemberId)
      .subscribe(
        (res: any) => {
          this.student = res;
          this.populateFormWithData();
          console.log(this.student);
        }, err => {
          this.errorMessage = err;
          console.log(this.errorMessage = err.message);
        }
      );
  }

  populateFormWithData(): void {
    this.editStudentForm.patchValue(
      this.student
    );
    console.log(this.student?.MemberId);
  }

  initializeForm(): void {
    this.editStudentForm = this.formBuilder.group(
      {
        MemberId: ['', Validators.required],
        MemberName: ['', Validators.required],
        MemberPhone: ['', Validators.required],
        MemberEmail: ['', Validators.required]
      }
    );
  }

  onSaveForm(student: Student): void {
    // this.organizationService.updateGroup(musicClass).subscribe();
    this.location.back();
  }

}
