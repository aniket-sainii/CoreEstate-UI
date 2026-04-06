import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flat } from '../../models/flat.model';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flat.html',
  styleUrls: ['./flat.css']
})
export class FlatComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.addCost(); // optional: start with one row
  }

  // ✅ Initialize Form
  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      buildingId: [null, Validators.required],
      configurationId: [null, Validators.required],
      facingId: [null, Validators.required],
      statusId: [null, Validators.required],
      floorNo: [null, Validators.required],
      carpetArea: [null, Validators.required],
      saleArea: [null, Validators.required],
      flatCosts: this.fb.array([])
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: Flat = this.form.value;

    this.projectService.createFlat(payload).subscribe({
      next: () => {
        alert('Flat saved successfully!');
        this.router.navigate(['/flats']);
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