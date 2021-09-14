import { Component, OnInit } from '@angular/core';
import { MusicClass } from '../models/music-class';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  musicGroup: MusicClass;
  currentGroupId: number;
  errorMessage: string;

  constructor( private organizationService: OrganizationService ) { }

  ngOnInit(): void {
    this.currentGroupId = this.organizationService.currentGroupId;
    this.initializeComponent();
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

}
