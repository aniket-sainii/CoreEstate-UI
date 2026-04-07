import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Flat } from '../../models/flat.model';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { projectBuilding, Building } from '../../models/projectList.model';

@Component({
  selector: 'app-flat',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './flat.html',
  styleUrls: ['./flat.css']
})
export class FlatComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;
  buildingId: number | null = null;
  projectId: number | null = null;
  flatId: number | null = null;
  isEditMode = false;

  // Dropdown Data
  projects: Project[] = [];
  buildings: Building[] = [];
  configurations: any[] = [];
  facings: any[] = [];
  costTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Read from route parameters
    const projectIdParam = this.route.snapshot.paramMap.get('projectId');
    const buildingIdParam = this.route.snapshot.paramMap.get('buildingId');
    const flatIdParam = this.route.snapshot.paramMap.get('flatId');
    
    this.projectId = projectIdParam ? Number(projectIdParam) : null;
    this.buildingId = buildingIdParam ? Number(buildingIdParam) : null;
    this.flatId = flatIdParam ? Number(flatIdParam) : null;

    if (this.flatId) {
      this.isEditMode = true;
    }

    // Optional: Keep queryParams for fallback
    if (!this.buildingId || !this.projectId) {
      this.route.queryParams.subscribe(params => {
        if (!this.buildingId) this.buildingId = params['buildingId'] ? Number(params['buildingId']) : null;
        if (!this.projectId) this.projectId = params['projectId'] ? Number(params['projectId']) : null;
        this.completeInit();
      });
    } else {
      this.completeInit();
    }
  }

  private completeInit(): void {
    this.initForm();
    this.loadDropdownData();

    if (this.isEditMode && this.flatId) {
      this.loadFlatData(this.flatId);
    } else {
      this.addCost(); // optional: start with one row
    }
  }

  // ✅ Initialize Form
  private initForm(): void {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      buildingId: [this.buildingId, Validators.required],
      configurationId: [null, Validators.required],
      facingId: [null, Validators.required],
      statusId: [1, Validators.required], // Default to 1 (Available)
      floorNo: [null, Validators.required],
      carpetArea: [null, Validators.required],
      saleArea: [null, Validators.required],
      flatCosts: this.fb.array([])
    });
  }

  // ✅ Load Flat Data for Edit
  private loadFlatData(id: number): void {
    this.projectService.getFlatById(id).subscribe({
      next: (flat) => {
        this.form.patchValue({
          id: flat.id,
          name: flat.name,
          buildingId: flat.buildingId || this.buildingId,
          configurationId: flat.configurationId,
          facingId: flat.facingId,
          statusId: flat.statusId,
          floorNo: flat.floorNo,
          carpetArea: flat.carpetArea,
          saleArea: flat.saleArea
        });

        // Handle Flat Costs
        if (flat.flatCosts && flat.flatCosts.length > 0) {
          const costsArray = this.flatCosts;
          costsArray.clear();
          flat.flatCosts.forEach(cost => {
            costsArray.push(this.createCostGroup(cost));
          });
        }
      },
      error: (err) => {
        console.error('Error loading flat data:', err);
        alert('Failed to load flat data');
      }
    });
  }

  // ✅ Load initial dropdown data
  private loadDropdownData(): void {
    this.projectService.getMasterData().subscribe(data => {
      this.configurations = data.configurations;
      this.facings = data.facings;
      this.costTypes = data.costTypes;
    });
  }


  // ✅ Getter for FormArray
  get flatCosts(): FormArray {
    return this.form.get('flatCosts') as FormArray;
  }

  // ✅ Create Cost Group (Reusable)
  private createCostGroup(data?: any): FormGroup {
    return this.fb.group({
      id: [data?.id || 0],
      title: [data?.title || '', Validators.required],
      amount: [data?.amount || null],
      costTypeId: [data?.costTypeId || null, Validators.required]
    });
  }

  // ✅ Add Cost Row
  addCost(): void {
    this.flatCosts.push(this.createCostGroup());
  }

  // ❌ Remove Cost Row
  removeCost(index: number): void {
    this.flatCosts.removeAt(index);
  }

  // ✅ Submit Form
  submit(): void {
    this.isSubmitting = true;

    const formValue = this.form.value;
    const payload: Flat = {
      ...formValue,
      id: this.isEditMode ? this.flatId : 0,
      configurationId: Number(formValue.configurationId),
      facingId: Number(formValue.facingId),
      statusId: Number(formValue.statusId),
      flatCosts: formValue.flatCosts.map((cost: any) => ({
        ...cost,
        costTypeId: Number(cost.costTypeId)
      }))
    };

    const request = this.isEditMode && this.flatId
      ? this.projectService.updateFlat(this.flatId, payload)
      : this.projectService.createFlat(payload);

    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Flat updated successfully!' : 'Flat created successfully!');
        if (this.projectId) {
          this.router.navigate(['/building', this.projectId]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Error saving flat:', err);
        alert('Failed to save flat');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  // ✅ TrackBy (performance)
  trackByIndex(index: number): number {
    return index;
  }
}