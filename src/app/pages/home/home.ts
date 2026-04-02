import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';


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
    private projectService: ProjectService,
    private router: Router
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
    this.router.navigate(['/edit-project', project.id]);
  }
}
