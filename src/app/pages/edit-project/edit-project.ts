import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { projectBuilding } from '../../models/projectList.model';

@Component({
  selector: 'app-edit-project',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject implements OnInit {

  projectId!: number;
  project!: projectBuilding;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }



  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService.getProjetById(this.projectId).subscribe({
      next: project => {
        this.project = <projectBuilding>(project);
      },
      error: err => console.error('Error fetching project:', err)
    });

  }

  addBuilding() {
    if (!this.project.buildings) {
      this.project.buildings = [];
    }
    // Generate a temporary negative ID so new instances can be individually selected for removal
    const tempId = -(new Date().getTime());
    this.project.buildings.push({ id: tempId, name: '', description: '' });
  }

  removeBuilding(buildingId: number) {
    if (this.project.buildings) {
      this.project.buildings = this.project.buildings.filter(b => b.id !== buildingId);
    }
  }

  updateProject() {
    if (this.project) {
      // Reset temp negative IDs assigned above back to 0 before sending to API
      const projectPayload = {
        ...this.project,
        buildings: this.project.buildings?.map(b => ({
          ...b,
          id: b.id < 0 ? 0 : b.id
        }))
      };

      this.projectService.updateProject(this.projectId, projectPayload).subscribe({
        next: () => {
          this.router.navigate(['/']);
          alert('Project updated successfully!');

        },
        error: (err) => {
          console.error('Error updating project:', err);
          alert('Failed to update project.');
        }
      });
    }
  }


}

