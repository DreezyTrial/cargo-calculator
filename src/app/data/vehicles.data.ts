import { VehicleOption } from '../models/vehicle.model';

export const VEHICLES: VehicleOption[] = [
  {
    id: 'bus',
    name: 'Бус/Газель (до 1.5 т)',
    capacity: '1.5 тонни',
    volume: '12-19 м³',
    hourlyRate: 650,
    minHours: 2,
    desc: 'Чудово підходить для переїзду 1-кімнатної квартири або доставки побутової техніки.',
  },
  {
    id: 'gazelle',
    name: '3-тонник/Гідроборт',
    capacity: '3 тонни',
    volume: '18-28 м³',
    hourlyRate: 1000,
    minHours: 2,
    desc: 'Оптимально для 2-3 кімнатних квартир, офісів та великогабаритних меблів.',
  },
  {
    id: '5ton',
    name: '5-тонник (Гідроборт)',
    capacity: '5 тонн',
    volume: '32-45 м³',
    hourlyRate: 1500,
    minHours: 3,
    desc: 'Для масштабних офісних переїздів, обладнання та великих об\'ємів.',
  },
];
