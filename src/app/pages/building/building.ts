import { Component } from '@angular/core';
import { projectBuilding } from '../../models/projectList.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatList } from '../../models/flatList.model';

@Component({
  selector: 'app-building',
  imports: [CommonModule, FormsModule],
  templateUrl: './building.html',
  styleUrl: './building.css',
})
export class Building {

  projectId!: number;
  project!: projectBuilding;
  selectedBuilding: any;
  flats: FlatList[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.projectService.getProjectById(this.projectId).subscribe({
      next: project => {
        this.project = <projectBuilding>(project);
      },
      error: err => console.error('Error fetching project:', err)
    });
  }

  onBuildingSelect() {
    if (this.selectedBuilding && this.selectedBuilding.id) {
      this.projectService.getFlatsByBuildingId(this.selectedBuilding.id).subscribe({
        next: (flats) => {
          this.flats = flats;
        },
        error: (err) => {
          console.error('Error fetching flats:', err);
          this.flats = [];
        }
      });
    } else {
      this.flats = [];
    }
  }


}
