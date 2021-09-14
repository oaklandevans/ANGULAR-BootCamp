import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicClass } from '../models/music-class';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

  GroupsUrl = 'http://localhost:8082/api/groups';
  addGroupUrl = 'http://localhost:8082/api/groups';
  groupsByOrganizationUrl = 'http://localhost:8082/api/groups/byorganization';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  errorMessage: string;
  currentGroupId: number;

  constructor( private http: HttpClient ) { }


  // get groups by organization id
  getGroupsByOrganizationId(OrgId: string): Observable<MusicClass[]> {
    const results: Observable<MusicClass[]> = this.http.get<MusicClass[]>(`${this.groupsByOrganizationUrl}/${OrgId}`);
    console.log(`getGroupsByOrganizationId(${OrgId}) returned ${results}`);
    return results;
  }

  addGroup(musicClass: MusicClass): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.post<MusicClass>(this.addGroupUrl, musicClass, this.jsonContentTypeHeaders);
    console.log(`addNewClass(${musicClass}) returned ${results}`);
    // console.log(typeof musicClass.GroupId);
    return results;
  }

  getGroupByCurrentId(): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.get<MusicClass>(`${this.GroupsUrl}/${this.currentGroupId}`);
    console.log(`getGroupsByCurrentId() returned ${results}`);
    return results;
  }

}
