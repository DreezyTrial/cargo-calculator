import { Component, computed, inject } from '@angular/core';
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
  readonly customMin = 5;
  readonly customMax = 20;
  readonly ratePerHour = PRICING.movers.ratePerHourPerMover;

  readonly isCustomCount = computed(() => this.state.moversCount() >= this.customMin);

  selectCustom(): void {
    if (!this.isCustomCount()) {
      this.state.moversCount.set(this.customMin);
    }
  }

  setCustomCount(raw: string | number): void {
    const value = Math.trunc(Number(raw));
    if (!Number.isFinite(value)) {
      return;
    }

    this.state.moversCount.set(Math.min(this.customMax, Math.max(this.customMin, value)));
  }
}
