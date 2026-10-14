import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorStateService } from '../../services/calculator-state.service';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './details-section.component.html',
  styleUrl: './details-section.component.scss',
})
export class DetailsSectionComponent {
  readonly state = inject(CalculatorStateService);
}
