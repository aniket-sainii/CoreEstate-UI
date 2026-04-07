import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flat } from '../../models/flat.model';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { projectBuilding, Building } from '../../models/projectList.model';

@Component({
  selector: 'app-flat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flat.html',
  styleUrls: ['./flat.css']
})
export class FlatComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;
  buildingId: number | null = null;
  projectId: number | null = null;

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
    this.route.queryParams.subscribe(params => {
      this.buildingId = params['buildingId'] ? Number(params['buildingId']) : null;
      this.projectId = params['projectId'] ? Number(params['projectId']) : null;
      this.initForm();
    });
    this.addCost(); // optional: start with one row
    this.loadDropdownData();
  }

  // ✅ Initialize Form
  private initForm(): void {
    this.form = this.fb.group({
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

  // ✅ Load initial dropdown data
  private loadDropdownData(): void {

    // 2. Fetch Master Data (Configurations, Facings, CostTypes)
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
      configurationId: Number(formValue.configurationId),
      facingId: Number(formValue.facingId),
      statusId: Number(formValue.statusId),
      flatCosts: formValue.flatCosts.map((cost: any) => ({
        ...cost,
        costTypeId: Number(cost.costTypeId)
      }))
    };

    this.projectService.createFlat(payload).subscribe({
      next: () => {
        alert('Flat saved successfully!');
        this.router.navigate(['/building'], { queryParams: { projectId: this.projectId } });
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