import { Component, input } from '@angular/core';
import { DurationSectionComponent } from '../duration-section/duration-section.component';
import { ExtrasSectionComponent } from '../extras-section/extras-section.component';
import { MoversSectionComponent } from '../movers-section/movers-section.component';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { PriceSummaryComponent } from '../price-summary/price-summary.component';
import { VehicleSelectorComponent } from '../vehicle-selector/vehicle-selector.component';

@Component({
  selector: 'cargo-calculator',
  standalone: true,
  imports: [
    VehicleSelectorComponent,
    DurationSectionComponent,
    MoversSectionComponent,
    ExtrasSectionComponent,
    PriceSummaryComponent,
    OrderModalComponent,
  ],
  templateUrl: './cargo-calculator.component.html',
  styleUrl: './cargo-calculator.component.scss',
})
export class CargoCalculatorComponent {
  readonly title = input<string>('DniproMove');
  readonly subtitle = input<string>('Швидкий розрахунок та онлайн-замовлення вантажоперевезень');
  readonly dispatcherPhone = input<string>('+38 (068) 33-14-14');
  readonly cityLabel = input<string>('Дніпро');
  readonly compactHeader = input<boolean>(false);
}
