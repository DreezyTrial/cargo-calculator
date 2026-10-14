import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PRICING } from '../../data/pricing.constants';
import { CalculatorStateService } from '../../services/calculator-state.service';

@Component({
  selector: 'app-movers-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movers-section.component.html',
  styleUrl: './movers-section.component.scss',
})
export class MoversSectionComponent {
  readonly state = inject(CalculatorStateService);
  readonly moverOptions = [0, 1, 2, 3, 4] as const;
  readonly ratePerHour = PRICING.movers.ratePerHourPerMover;
}
