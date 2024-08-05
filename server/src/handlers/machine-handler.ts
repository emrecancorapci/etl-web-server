import { BadRequestError } from '@/middlewares/error/base.ts';

let idRecords: Array<IdPair> = [];

type IdPair = { srcId: string; destId: string };

export function getAllIdPairs(): IdPair[] {
  return idRecords;
}

export function getTargetId(srcId: string): string | undefined {
  return idRecords.find((pair) => pair.srcId === srcId)?.destId;
}

export function getSourceId(destId: string): string | undefined {
  return idRecords.find((pair) => pair.destId === destId)?.destId;
}

export function addIdPair(srcId: string, destId: string): void {
  const isExist = idRecords.find((pair) => pair.srcId === srcId)?.destId;

  if (isExist) {
    throw new BadRequestError(`Pair already exists for source id: ${srcId}`);
  }

  idRecords.push({ srcId, destId });
}

export function updateIdPair(srcId: string, destId: string): void {
  const updatedRecords = idRecords.filter((pair) => pair.srcId === srcId);

  if (updatedRecords.length === idRecords.length) {
    throw new BadRequestError(`No pair found for source id: ${srcId}`);
  }

  updatedRecords.push({ srcId, destId });

  idRecords = updatedRecords;
}

export function removePairBySourceId(srcId: string): void {
  const updatedRecords = idRecords.filter((pair) => pair.srcId === srcId);

  if (updatedRecords.length === idRecords.length) {
    throw new BadRequestError(`No pair found for source id: ${srcId}`);
  }

  idRecords = updatedRecords;
}

export function removePairByTargetId(destId: string): void {
  const updatedRecords = idRecords.filter((pair) => pair.destId === destId);

  if (updatedRecords.length === idRecords.length) {
    throw new BadRequestError(`No pair found for destination id: ${destId}`);
  }

  idRecords = updatedRecords;
}

export function isSourceIdExist(srcId: string): boolean {
  return idRecords.some((pair) => pair.srcId === srcId);
}
