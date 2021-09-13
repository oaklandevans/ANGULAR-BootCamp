import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicClass } from '../models/music-class';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

  groupsByOrganizationUrl = 'http://localhost:8082/api/groups/byorganization';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  errorMessage: string;

  constructor( private http: HttpClient ) { }


  // get groups by organization id
  getGroupsByOrganizationId(OrgId: string): Observable<MusicClass[]> {
    const results: Observable<MusicClass[]> = this.http.get<MusicClass[]>(`${this.groupsByOrganizationUrl}/${OrgId}`);
    console.log(`getGroupsByOrganizationId(${OrgId}) returned ${results}`);
    return results;
  }
}
