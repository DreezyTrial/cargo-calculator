import { Component, inject, input } from '@angular/core';
import { CalculatorStateService } from '../../services/calculator-state.service';
import { OrderFormService } from '../../services/order-form.service';

@Component({
  selector: 'app-price-summary',
  standalone: true,
  templateUrl: './price-summary.component.html',
  styleUrl: './price-summary.component.scss',
})
export class PriceSummaryComponent {
  readonly cityLabel = input<string>('Дніпро');
  readonly state = inject(CalculatorStateService);
  readonly orderForm = inject(OrderFormService);
}
