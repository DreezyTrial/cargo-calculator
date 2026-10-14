import { VehicleOption } from '../models/vehicle.model';

export const VEHICLES: VehicleOption[] = [
  {
    id: 'bus',
    name: 'Бус (до 1.5 т)',
    capacity: '1.5 тонни',
    volume: '9-12 м³',
    basePrice: 1400,
    extraHourPrice: 700,
    minHours: 2,
    icon: '🚚',
    desc: 'Чудово підходить для переїзду 1-кімнатної квартири або доставки побутової техніки.',
  },
  {
    id: 'gazelle',
    name: 'Газель / 3-тонник',
    capacity: '3 тонни',
    volume: '16-20 м³',
    basePrice: 1500,
    extraHourPrice: 750,
    minHours: 2,
    icon: '🚛',
    desc: 'Оптимально для 2-3 кімнатних квартир, офісів та великогабаритних меблів.',
  },
  {
    id: '5ton',
    name: '5-тонник (Гідроборт)',
    capacity: '5 тонн',
    volume: '30-36 м³',
    basePrice: 4500,
    extraHourPrice: 1500,
    minHours: 3,
    icon: '📦',
    desc: 'Для масштабних офісних переїздів, обладнання та великих об\'ємів.',
  },
];
