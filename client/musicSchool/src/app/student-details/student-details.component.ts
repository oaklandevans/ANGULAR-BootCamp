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
    this.organizationService.currentGroupId = parseInt(localStorage.getItem("GroupId"));
    this.organizationService.currentMemberId = parseInt(localStorage.getItem("StudentId"));
    this.currentGroupId = this.organizationService.currentGroupId;
    this.currentMemberId = this.organizationService.currentMemberId;
    this.initializeForm();
    this.initializeComponent();
    window.scrollTo(0,0);
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
    if (window.confirm('Are you sure you want to save current student details?')) {
      this.organizationService.updateMemberOfGroup(student).subscribe(() => {
        alert('Student Updated Successfully.');
      }, err => {
        this.errorMessage = err;
        console.log(this.errorMessage = err.message);
        alert('Sorry, Bad Request. Student not updated.');
      }, () => {
        this.location.back();
      });
    }
    
  }

  deleteCurrentStudent(): void {
    if (window.confirm('Are you sure you want to delete this student?')) {
      this.organizationService.deleteCurrentStudent().subscribe(() => {
        alert('Student Deleted Successfully.');
      }, err => {
        this.errorMessage = err;
        console.log(this.errorMessage = err.message);
        alert('Sorry, Bad Request. Student not deleted.');
      }, () => {
        this.location.back();
      });
    }
  }

}
