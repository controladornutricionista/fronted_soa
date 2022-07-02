import { Buffer } from 'buffer';

export const encBtoa = (str) => {
  return Buffer.from(str, 'binary').toString('base64');
};

export const decAtob = (str) => {
  try {
    return Buffer.from(str, 'base64').toString('binary');
  } catch (error) {
    return null
  }
};
