import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { projectBuilding } from '../../models/projectList.model';

@Component({
  selector: 'app-edit-project',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject implements OnInit {

  projectId!: number;
  projectForm!: FormGroup;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      buildings: this.fb.array([])
    });

    this.projectService.getProjectById(this.projectId).subscribe({
      next: project => {
        const proj = project as projectBuilding;
        this.projectForm.patchValue({
          name: proj.name,
          description: proj.description
        });

        if (proj.buildings) {
          proj.buildings.forEach(b => {
            this.buildings.push(this.fb.group({
              id: [b.id],
              name: [b.name, Validators.required],
              description: [b.description, Validators.required]
            }));
          });
        }
        this.isLoaded = true;
      },
      error: err => console.error('Error fetching project:', err)
    });
  }

  get buildings(): FormArray {
    return this.projectForm.get('buildings') as FormArray;
  }

  addBuilding() {
    this.buildings.push(this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeBuilding(index: number) {
    this.buildings.removeAt(index);
  }

  updateProject() {
    if (this.projectForm.valid) {
      const projectPayload = {
        id: this.projectId,
        ...this.projectForm.value
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
    } else {
      this.projectForm.markAllAsTouched();
    }
  }
}
