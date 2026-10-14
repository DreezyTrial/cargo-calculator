import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorStateService } from '../../services/calculator-state.service';

@Component({
  selector: 'app-duration-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './duration-section.component.html',
  styleUrl: './duration-section.component.scss',
})
export class DurationSectionComponent {
  readonly state = inject(CalculatorStateService);
  readonly maxHours = PRICING.duration.maxHours;
}
