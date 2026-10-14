# Cargo Calculator (віджет)

Angular-віджет розрахунку вартості вантажоперевезень. Призначений для **вбудовування на основний сайт** (iframe або як Angular-компонент `cargo-calculator`).

## Архітектура (SOLID / DRY)

- **Моделі та константи** — `src/app/models`, `src/app/data`
- **Розрахунок цін** — окремі калькулятори (`VehiclePriceCalculator`, `MoversPriceCalculator`, `ExtrasPriceCalculator`) + фасад `CargoPricingService`
- **Стан форми** — `CalculatorStateService`
- **UI** — дрібні standalone-компоненти в `src/app/components`

Подача авто / маршрут за кілометражем **не входить** у розрахунок (лише оренда транспорту, вантажники та додаткові послуги).

## Локальна розробка

```bash
npm install
npm start
```

Відкрийте `http://localhost:4200/`.

## Збірка віджета (static, для Docker / iframe)

```bash
npm run build:widget
```

Артефакти: `dist/cargo-calculator/browser/`.

## Docker

```bash
docker compose up --build
```

Калькулятор доступний на `http://localhost:8080/`.

### Вбудовування на основний сайт (iframe)

```html
<iframe
  src="https://calc.your-domain.com/"
  title="Калькулятор вантажоперевезень"
  width="100%"
  height="900"
  style="border:0;border-radius:16px;"
  loading="lazy"
></iframe>
```

Nginx уже дозволяє iframe (`frame-ancestors *`). Для production обмежте origin у `docker/nginx.conf`, наприклад `frame-ancestors https://your-main-site.com`.

### Angular host

Імпортуйте `CargoCalculatorComponent` (selector: `cargo-calculator`) у застосунок основного сайту:

```typescript
import { CargoCalculatorComponent } from '...';

@Component({
  imports: [CargoCalculatorComponent],
  template: `<cargo-calculator [compactHeader]="true" cityLabel="Дніпро" />`,
})
export class LandingPage {}
```

## Тести

```bash
npm test
```
