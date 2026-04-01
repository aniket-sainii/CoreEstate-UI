import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  projects: Project[] = [];

  constructor(
    private auth: AuthService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }

  editProject(project: Project): void {
    console.log('Editing project:', project.name);
    // In a real app we'd navigate to an edit form or open a dialog
    alert(`Editing project: ${project.name}`);
  }
}
