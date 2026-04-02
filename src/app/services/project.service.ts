import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../environments/environment';
import { projectBuilding } from '../models/projectList.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}${API_ENDPOINTS.PROJECTS.GET_ALL}`);
        
  }

  getProjetById(id:number): Observable<projectBuilding> {
    return this.http.get<projectBuilding>(`${this.apiUrl}${API_ENDPOINTS.PROJECTS.GET_BY_ID.replace('{id}', id.toString())}`);
  }
}
