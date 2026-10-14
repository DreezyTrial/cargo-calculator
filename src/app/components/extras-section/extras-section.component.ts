import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorStateService } from '../../services/calculator-state.service';

@Component({
  selector: 'app-extras-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './extras-section.component.html',
  styleUrl: './extras-section.component.scss',
})
export class ExtrasSectionComponent {
  readonly state = inject(CalculatorStateService);
  readonly extras = PRICING.extras;
}
