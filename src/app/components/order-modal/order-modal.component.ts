import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorStateService } from '../../services/calculator-state.service';
import { OrderFormService } from '../../services/order-form.service';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent {
  readonly orderForm = inject(OrderFormService);
  readonly state = inject(CalculatorStateService);

  submitOrder(event: Event): void {
    event.preventDefault();
    this.orderForm.submitOrder();
  }
}
