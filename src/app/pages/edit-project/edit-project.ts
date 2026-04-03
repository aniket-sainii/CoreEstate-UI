import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { projectBuilding } from '../../models/projectList.model';

@Component({
  selector: 'app-edit-project',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject {

projectId!: number;
project!: projectBuilding;

constructor(private route: ActivatedRoute,private projectService: ProjectService){}



ngOnInit(): void {
  this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  console.log('Project ID:', this.projectId);

  this.projectService.getProjetById(this.projectId).subscribe({
    next: project => {
      console.log('Project data:', project);
      this.project = <projectBuilding>(project);
    },
    error: err => console.error('Error fetching project:', err)
  });

}

addBuilding() {}
removeBuilding(buildingId: number) {}
updateProject(){}


}

