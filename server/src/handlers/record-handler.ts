import * as tomlFileHandler from './toml-file-handler.ts';

type IdRecords = Record<string, string>;
type RecordObject = { data: IdRecords };

export function getAll(): IdRecords | undefined {
  let idRecords = tomlFileHandler.loadFile<RecordObject>('id-records');

  if (!idRecords) {
    console.error('No id records found in the file');
    return undefined;
  }

  return idRecords.data;
}

export function set(srcId: string, destId: string): void {
  const idRecords = getAll();

  if (!idRecords) {
    tomlFileHandler.saveFile({ data: { [srcId]: destId } }, 'id-records');
    return;
  }

  idRecords[srcId] = destId;

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteBySourceId(id: string): void {
  if (!isSourceIdExist(id)) {
    console.error(`No record found for source id: ${id}`);
  }

  const idRecords = getAll();

  if (!idRecords) {
    console.error('No id records found in the file');
    return;
  }

  delete idRecords[id];

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteByTargetId(id: string): void {
  const record = getByTargetId(id);

  if (!record) {
    console.error(`No record found for target id: ${id}`);
    return;
  }

  const srcId = Object.keys(record)[0];

  deleteBySourceId(srcId);
}

export function getBySourceId(id: string): IdRecords | undefined {
  if (!isSourceIdExist(id)) {
    console.error(`No record found for source id: ${id}`);
    return undefined;
  }

  let obj = Object.keys(getAll() as IdRecords).find((srcId) => srcId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function getByTargetId(id: string): Record<string, string> | undefined {
  if (!isTargetIdExist(id)) {
    console.error(`No record found for target id: ${id}`);
    return undefined;
  }

  let obj = Object.values(getAll() as IdRecords).find((destId) => destId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function isSourceIdExist(id: string): boolean {
  const records = getAll();

  if (!records) {
    return false;
  }

  return Object.keys(records).some((srcId) => srcId === id);
}

export function isTargetIdExist(id: string): boolean {
  const records = getAll();

  if (!records) {
    return false;
  }

  return Object.values(records).some((destId) => destId === id);
}

export function getSourceId(id: string): string | undefined {
  const record = getByTargetId(id);

  return record ? Object.keys(record)[0] : undefined;
}

export function getTargetId(id: string): string | undefined {
  return getBySourceId(id)?.[id];
}
