import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_ENDPOINTS } from '../constants/api.constants';
import { environment } from '../../environments/environment';
import { projectBuilding } from '../models/projectList.model';
import { FlatList } from '../models/flatList.model';
import { Flat } from '../models/flat.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }



  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}${API_ENDPOINTS.PROJECTS.GET_ALL}`);

  }

  getProjectById(id: number): Observable<projectBuilding> {
    return this.http.get<projectBuilding>(`${this.apiUrl}${API_ENDPOINTS.PROJECTS.GET_BY_ID.replace('{id}', id.toString())}`);
  }

  updateProject(id: number, project: projectBuilding): Observable<projectBuilding> {
    return this.http.put<projectBuilding>(`${this.apiUrl}${API_ENDPOINTS.PROJECTS.UPDATE(id)}`, project);
  }

  getFlatsByBuildingId(buildingId: number): Observable<FlatList[]> {
    return this.http.get<FlatList[]>(`${this.apiUrl}${API_ENDPOINTS.FLATS.GET_BY_BUILDING_ID(buildingId)}`);
  }

  createFlat(flat: Flat): Observable<Flat> {
    return this.http.post<Flat>(`${this.apiUrl}${API_ENDPOINTS.FLATS.CREATE}`, flat);
  }

  updateFlat(id: number, flat: Flat): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${API_ENDPOINTS.FLATS.UPDATE}?id=${id}`, flat);
  }

  getFlatById(id: number): Observable<Flat> {
    return this.http.get<Flat>(`${this.apiUrl}${API_ENDPOINTS.FLATS.GET_BY_ID(id)}`);
  }

  getMasterData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${API_ENDPOINTS.GRAPHQL.GET_MASTER_DATA}`);
  }
}
