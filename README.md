# Cargo Calculator (віджет)

Angular-віджет розрахунку вартості вантажоперевезень. Призначений для **вбудовування в body основного сайту** на повну ширину блоку.

## Локальна розробка

```bash
npm install
npm start
```

Відкрийте `http://localhost:4200/`.

## Docker

```bash
docker compose up --build
```

Віджет: `http://localhost:8080/`.

## Vercel

Статичний віджет (як Docker): `npm run build:widget`, каталог `dist/cargo-calculator/browser`. Після деплою iframe можна вставляти з `https://<проєкт>.vercel.app/embed.js`.

```bash
npx vercel --prod
```

Заявки з кнопки **«Залишити заявку»** йдуть у Telegram через `/api/order`. У Vercel додайте змінні:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Вбудовування на основний сайт

У потрібне місце в `body` вставте контейнер і скрипт. Iframe сам підлаштує **ширину 100%** і **висоту** під контент, розкладка реагує на ширину блоку (телефон / планшет / десктоп).

```html
<div id="cargo-calculator"></div>
<script
  src="https://calc.your-domain.com/embed.js"
  data-target="#cargo-calculator"
></script>
```

Локально, поки крутиться Docker:

```html
<div id="cargo-calculator"></div>
<script src="http://localhost:8080/embed.js" data-target="#cargo-calculator"></script>
```

Режим iframe відкриває `/?embed=1`: без власної шапки (шапка сайту вже є), без подвійного скролу.

Nginx дозволяє iframe (`frame-ancestors *`). Для production обмежте origin у `docker/nginx.conf`.

### Angular host

```typescript
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
