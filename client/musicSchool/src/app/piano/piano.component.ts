import { Component, OnInit } from '@angular/core';
import { MusicClass } from '../models/music-class';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {

  OrgId = '1';
  musicClass: MusicClass;
  groups: MusicClass[];
  errorMessage: string;

  constructor( private organizationService: OrganizationService ) { }

  ngOnInit(): void {
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

}
