import * as tomlFileHandler from './toml-file-handler.ts';

type IdRecords = Record<string, string>;
type RecordObject = { data: IdRecords };

export function getAllIdRecords(): IdRecords {
  let idRecords = tomlFileHandler.loadFile<RecordObject>('id-records');

  if (!idRecords) {
    idRecords = { data: {} };
  }

  return idRecords.data;
}

export function getRecordBySourceId(id: string): IdRecords | undefined {
  let obj = Object.keys(getAllIdRecords()).find((srcId) => srcId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function getRecordByTargetId(id: string): Record<string, string> | undefined {
  let obj = Object.values(getAllIdRecords()).find((destId) => destId === id);
  return obj ? { [obj[0]]: obj[1] } : undefined;
}

export function isSourceIdExist(id: string): boolean {
  return Object.keys(getAllIdRecords()).some((srcId) => srcId === id);
}

export function isTargetIdExist(id: string): boolean {
  return Object.values(getAllIdRecords()).some((destId) => destId === id);
}

export function setIdRecord(srcId: string, destId: string): void {
  const idRecords = getAllIdRecords();

  idRecords[srcId] = destId;

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteIdRecordBySourceId(id: string): void {
  if (!isSourceIdExist(id)) {
    console.error(`No record found for source id: ${id}`);
  }

  const idRecords = getAllIdRecords();

  delete idRecords[id];

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}

export function deleteIdRecordByTargetId(id: string): void {
  const record = getRecordByTargetId(id);

  if (!record) {
    console.error(`No record found for target id: ${id}`);
    return;
  }

  const idRecords = getAllIdRecords();

  const srcId = Object.keys(record)[0];

  delete idRecords[srcId];

  tomlFileHandler.saveFile({ data: idRecords }, 'id-records');
}
