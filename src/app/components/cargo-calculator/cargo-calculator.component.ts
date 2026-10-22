import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { DetailsSectionComponent } from '../details-section/details-section.component';
import { DurationSectionComponent } from '../duration-section/duration-section.component';
import { MoversSectionComponent } from '../movers-section/movers-section.component';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { PriceSummaryComponent } from '../price-summary/price-summary.component';
import { VehicleSelectorComponent } from '../vehicle-selector/vehicle-selector.component';
import { applyEmbedPageClass, isEmbedded, postEmbedHeight } from '../../utils/embed.util';

@Component({
  selector: 'cargo-calculator',
  standalone: true,
  imports: [
    VehicleSelectorComponent,
    DurationSectionComponent,
    MoversSectionComponent,
    DetailsSectionComponent,
    PriceSummaryComponent,
    OrderModalComponent,
  ],
  templateUrl: './cargo-calculator.component.html',
  styleUrl: './cargo-calculator.component.scss',
})
export class CargoCalculatorComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly title = input<string>('DniproMove');
  readonly subtitle = input<string>('Швидкий розрахунок та онлайн-замовлення вантажоперевезень');
  readonly cityLabel = input<string>('Дніпро');
  readonly compactHeader = input<boolean | undefined>(undefined);

  readonly embedded = signal(false);
  readonly hideHeader = computed(() => this.compactHeader() ?? this.embedded());

  constructor() {
    afterNextRender(() => {
      const embedded = isEmbedded();
      this.embedded.set(embedded);
      if (!embedded) {
        return;
      }

      applyEmbedPageClass();
      this.publishHeight();

      const observer = new ResizeObserver(() => this.publishHeight());
      observer.observe(this.host.nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private publishHeight(): void {
    const node = this.host.nativeElement;
    const height = Math.max(node.scrollHeight, node.getBoundingClientRect().height);
    postEmbedHeight(height);
  }
}
