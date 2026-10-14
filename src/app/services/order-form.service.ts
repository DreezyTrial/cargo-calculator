import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  readonly isModalOpen = signal<boolean>(false);
  readonly orderName = signal<string>('');
  readonly orderPhone = signal<string>('');
  readonly orderSubmitted = signal<boolean>(false);

  openModal(): void {
    this.isModalOpen.set(true);
    this.orderSubmitted.set(false);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitOrder(): void {
    if (this.orderPhone().trim().length < 9) {
      return;
    }
    this.orderSubmitted.set(true);
    setTimeout(() => this.closeModal(), 3000);
  }
}
