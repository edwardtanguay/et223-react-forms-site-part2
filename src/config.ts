import * as config from './config';

const _debugging = true;

export const environment = () => import.meta.env.VITE_ENVIRONMENT;

export const debugging = () => config.environment() === 'development' && _debugging;