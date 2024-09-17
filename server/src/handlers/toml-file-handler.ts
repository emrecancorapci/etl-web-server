import fs from 'node:fs';

import { parse, stringify } from 'smol-toml';

export function saveFile<T>(data: T, name: string): void {
  const stringifiedData = stringify(data);

  fs.writeFileSync(`./data/${name}.toml`, stringifiedData);
}

export function loadFile<T>(name: string): T | undefined {
  try {
    const data = fs.readFileSync(`./data/${name}.toml`, 'utf-8');

    const parsedData = parse(data);

    if (!parsedData) {
      console.info('No data found');
      return undefined;
    }

    return parsedData as T;
  } catch (error) {
    console.error('Error while loading data:', error);
    return undefined;
  }
}

export function clearFile(name: string) {
  fs.writeFileSync(`./data/${name}.toml`, '');
}
