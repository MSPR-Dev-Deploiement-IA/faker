import { clubs } from './data/Clubs';
import { competitions } from './data/Competitions';
import { faker } from '@faker-js/faker';
import { Ip, Logs } from './types';

const stadiums = require('./data/SoccerStadiums.json');

export const DEFAULT_TO_GENERATE = 15000;

export const IPS: Ip[] = Array.from({ length: 100 }).map(() => generateFakeIp());

export const LOGS: Logs[] =  Array.from({ length: DEFAULT_TO_GENERATE }).map(() => generateFakeLog());


function getRandomIp(range: number): number {
    return Math.floor(Math.random() * range) + 1;
}

function generateFakeIp() {
    return {
        ip: faker.internet.ip(),
        created_at: faker.date.past().getTime(),
        update_at: faker.date.recent().getTime(),
        deleted_at: Math.random() < 0.2 ? faker.date.recent().getTime() : null,  // 20% de chance d'être supprimé
        lat: faker.address.latitude(),
        lon: faker.address.longitude(),
    };
}

function generateFakeLog() {
    return {
        ip_id: getRandomIp(IPS.length),
        created_at: faker.date.past().getTime(),
        update_at: faker.date.recent().getTime(),
        deleted_at: Math.random() < 0.2 ? faker.date.recent().getTime() : null,  // 20% de chance d'être supprimé
        path: faker.system.directoryPath(),
        method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
        status: faker.helpers.arrayElement([200, 201, 400, 401, 404, 500]),
        latency: getRandomInt(10, 200),
    };
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
