import { Injectable, signal } from '@angular/core';
import { OrderRequest } from '../models/order-request.model';

function orderApiUrl(): string {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'https://cargo-calculator-six.vercel.app/api/order';
  }
  return '/api/order';
}

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  readonly isModalOpen = signal<boolean>(false);
  readonly orderName = signal<string>('');
  readonly orderPhone = signal<string>('');
  readonly orderSubmitted = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly submitError = signal<string>('');

  openModal(): void {
    this.isModalOpen.set(true);
    this.orderSubmitted.set(false);
    this.submitError.set('');
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  async submitOrder(payload: OrderRequest): Promise<void> {
    if (this.orderPhone().trim().replace(/\D/g, '').length < 9) {
      this.submitError.set('Вкажіть коректний номер телефону.');
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set('');

    try {
      const response = await fetch(orderApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('request_failed');
      }

      this.orderSubmitted.set(true);
      setTimeout(() => this.closeModal(), 3000);
    } catch {
      this.submitError.set('Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте менеджеру.');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
