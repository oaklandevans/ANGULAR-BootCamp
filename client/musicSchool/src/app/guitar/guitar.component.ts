import { Component, OnInit } from '@angular/core';
import { MusicClass } from '../models/music-class';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.css']
})
export class GuitarComponent implements OnInit {

  OrgId = '3';
  musicClass: MusicClass;
  groups: MusicClass[];
  errorMessage: string;

  constructor( private organizationService: OrganizationService ) { }

  ngOnInit(): void {
    this.initializeComponent();
    window.scrollTo(0,0);
  }

  initializeComponent(): void {
    this.organizationService.getGroupsByOrganizationId(this.OrgId)
      .subscribe(
        (res: any) => {
          this.groups = res;
          console.log(this.groups);
        }, err => {
          this.errorMessage = err;
          console.log(this.errorMessage = err.message);
        }
      );
  }

  saveGroupId(groupId: number): void {
    this.organizationService.currentGroupId = groupId;
    localStorage.setItem("GroupId", `${groupId}`);
    console.log(`Current Group Id: ${this.organizationService.currentGroupId}`);
    console.log(`Current Group Id In LocalStorage: ${localStorage.getItem("GroupId")}`);
  }

}
