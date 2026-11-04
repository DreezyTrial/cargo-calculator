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

  async submitOrder(event: Event): Promise<void> {
    event.preventDefault();
    if (this.orderForm.isSubmitting()) {
      return;
    }

    const breakdown = this.state.priceBreakdown();
    await this.orderForm.submitOrder({
      name: this.orderForm.orderName(),
      phone: this.orderForm.orderPhone(),
      orderDate: this.state.formattedOrderDate(),
      city: this.state.cityLabel(),
      vehicleName: this.state.selectedVehicle().name,
      durationHours: this.state.durationHours(),
      moversCount: this.state.moversCount(),
      hasLiftFrom: this.state.hasLiftFrom(),
      floorsFrom: this.state.floorsFrom(),
      hasLiftTo: this.state.hasLiftTo(),
      floorsTo: this.state.floorsTo(),
      workDescription: this.state.workDescription(),
      extraServicesNote: this.state.extraServicesNote(),
      vehiclePrice: breakdown.vehicle,
      moversPrice: breakdown.movers,
      total: breakdown.total,
    });
  }
}
