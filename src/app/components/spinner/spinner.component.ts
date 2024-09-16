import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
   constructor(public loadingService : LoadingService) {
   }
}
