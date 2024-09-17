import * as tomlFileHandler from './toml-file-handler.ts';

type IdRecords = Record<string, string>;
type RecordObject = { data: IdRecords };

export function getAll(): IdRecords {
  let idRecords = tomlFileHandler.loadFile<RecordObject>('id-records');

  if (!idRecords) {
    idRecords = { data: {} };
  }

  return idRecords.data;
}

export function getBySourceId(id: string): IdRecords | undefined {
  let obj = Object.keys(getAll()).find((srcId) => srcId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function getByTargetId(id: string): Record<string, string> | undefined {
  let obj = Object.values(getAll()).find((destId) => destId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function isSourceIdExist(id: string): boolean {
  return Object.keys(getAll()).some((srcId) => srcId === id);
}

export function isTargetIdExist(id: string): boolean {
  return Object.values(getAll()).some((destId) => destId === id);
}

export function set(srcId: string, destId: string): void {
  const idRecords = getAll();

  idRecords[srcId] = destId;

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteBySourceId(id: string): void {
  if (!isSourceIdExist(id)) {
    console.error(`No record found for source id: ${id}`);
  }

  const idRecords = getAll();

  delete idRecords[id];

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteByTargetId(id: string): void {
  const record = getByTargetId(id);

  if (!record) {
    console.error(`No record found for target id: ${id}`);
    return;
  }

  const idRecords = getAll();

  const srcId = Object.keys(record)[0];

  delete idRecords[srcId];

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}
