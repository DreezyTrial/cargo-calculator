const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function asText(value, max = 2000) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, max);
}

function asNumber(value) {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function liftLine(hasLift, floors) {
  return hasLift ? 'є ліфт' : `без ліфта, поверх ${floors}`;
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    return json(500, { ok: false, error: 'telegram_not_configured' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }

  const name = asText(body.name, 80);
  const phone = asText(body.phone, 40);
  if (name.length < 2 || phone.replace(/\D/g, '').length < 9) {
    return json(400, { ok: false, error: 'invalid_contacts' });
  }

  const durationHours = asNumber(body.durationHours);
  const moversCount = asNumber(body.moversCount);
  const floorsFrom = asNumber(body.floorsFrom) ?? 1;
  const floorsTo = asNumber(body.floorsTo) ?? 1;
  const vehiclePrice = asNumber(body.vehiclePrice);
  const moversPrice = asNumber(body.moversPrice);
  const total = asNumber(body.total);
  const isCallback = body.source === 'site';

  if (
    !isCallback &&
    (durationHours === null ||
      moversCount === null ||
      vehiclePrice === null ||
      moversPrice === null ||
      total === null)
  ) {
    return json(400, { ok: false, error: 'invalid_quote' });
  }

  const message = isCallback
    ? [
        'Нова заявка з сайту Dnipro Move',
        '',
        `Ім'я: ${name}`,
        `Телефон: ${phone}`,
        `Звідки і куди: ${asText(body.comment) || 'не вказано'}`,
      ].join('\n')
    : [
    'Нова заявка з калькулятора DniproMove',
    '',
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    `Місто: ${asText(body.city, 40) || 'Дніпро'}`,
    `Дата: ${asText(body.orderDate, 32) || 'не вказано'}`,
    '',
    `Авто: ${asText(body.vehicleName, 80) || 'не вказано'}`,
    `Час оренди: ${durationHours} год`,
    `Вантажники: ${moversCount} чол`,
    `Завантаження: ${liftLine(Boolean(body.hasLiftFrom), floorsFrom)}`,
    `Вивантаження: ${liftLine(Boolean(body.hasLiftTo), floorsTo)}`,
    '',
    `Що перевезти: ${asText(body.workDescription) || 'не вказано'}`,
    `Додаткові послуги: ${asText(body.extraServicesNote) || 'не вказано'}`,
    '',
    `Авто: ${vehiclePrice} грн`,
    `Вантажники: ${moversPrice} грн`,
    `Разом: ${total} грн`,
    '',
    'Ціна вказана для перевезення в межах міста та до 21:00.',
  ].join('\n');

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });

  if (!telegramResponse.ok) {
    const details = await telegramResponse.json().catch(() => null);
    console.error('telegram_send_failed', details?.description || details?.error_code || 'unknown');
    return json(502, { ok: false, error: 'telegram_failed' });
  }

  return json(200, { ok: true });
}
