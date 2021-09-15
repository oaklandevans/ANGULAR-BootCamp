import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {

  addStudentForm: FormGroup;
  student: Student;

  constructor(
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addStudentForm = this.formBuilder.group(
      {
        MemberEmail: ['', Validators.required],
        MemberName: ['', Validators.required],
        MemberPhone: ['', Validators.required]
      }
    );
  }

  onSubmit(student): void {
    this.organizationService.addMember(student).subscribe();
    alert('Congratulations! New Student Added!');
    this.location.back();
  }

}
