import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicClass } from '../models/music-class';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {

  groupsUrl = 'http://localhost:8082/api/groups';
  groupsByOrganizationUrl = 'http://localhost:8082/api/groups/byorganization';

  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  errorMessage: string;
  currentGroupId: number;
  currentMemberId: number;

  constructor( private http: HttpClient ) { }


  // get groups by organization id
  getGroupsByOrganizationId(OrgId: string): Observable<MusicClass[]> {
    const results: Observable<MusicClass[]> = this.http.get<MusicClass[]>(`${this.groupsByOrganizationUrl}/${OrgId}`);
    console.log(`getGroupsByOrganizationId(${OrgId}) returned ${results}`);
    return results;
  }

  getGroupByCurrentId(): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.get<MusicClass>(`${this.groupsUrl}/${this.currentGroupId}`);
    console.log(`getGroupsByCurrentId() returned ${results}`);
    return results;
  }

  addGroup(musicClass: MusicClass): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.post<MusicClass>(
      this.groupsUrl,
      musicClass,
      this.jsonContentTypeHeaders
      );
    console.log(`addNewClass(${musicClass}) returned ${results}`);
    return results;
  }

  updateGroup(musicClass: MusicClass): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.put<MusicClass>(
      this.groupsUrl,
      musicClass,
      this.jsonContentTypeHeaders
    );
    console.log(`updateGroup(${musicClass}) returned ${results}`);
    return results;
  }

  deleteCurrentGroup(): Observable<MusicClass> {
    const results: Observable<MusicClass> = this.http.delete<MusicClass>(
      `${this.groupsUrl}/${this.currentGroupId}`,
      this.jsonContentTypeHeaders
    );
    console.log(`deleteCurrentGroup(${this.currentGroupId}) returned ${results}`);
    return results;
  }

  addMember(student: Student): Observable<Student> {
    const results: Observable<Student> = this.http.post<Student>(
      `${this.groupsUrl}/${this.currentGroupId}/members`,
      student,
      this.jsonContentTypeHeaders);
    console.log(`addStudent(${student}) returned ${results}`);
    return results;
  }

  getMemberOfGroup(groupId: number, memberId: number): Observable<Student> {
    const results: Observable<Student> = this.http.get<Student>(
      `${this.groupsUrl}/${groupId}/members/${memberId}`
    );
    console.log(`getMemberOfGroup(${groupId}, ${memberId}) returned ${results}`);
    return results;
  }

}
