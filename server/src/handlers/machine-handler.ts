import { BadRequestError } from '@/middlewares/error/base.ts';

const idPairs = new Map<string, string>();

type IdPair = { targetId: string; sourceId: string };

export function getAllIdPairs(): IdPair[] {
  let idPairsArray: IdPair[] = [];

  idPairs.forEach((value, key) => {
    idPairsArray.push({ targetId: value, sourceId: key });
  });

  console.log(idPairsArray);

  return idPairsArray;
}

export function getTargetId(sourceId: string): string | undefined {
  return idPairs.get(sourceId) || undefined;
}

export function getSourceId(targetId: string): string | undefined {
  return Array.from(idPairs.entries()).find(([_, id]) => id === targetId)?.[0];
}

export function addIdPair(sourceId: string, targetId: string): void {
  if (idPairs.has(sourceId)) {
    throw new BadRequestError(`Id pair already exists for sourceId: ${sourceId}`);
  }

  idPairs.set(sourceId, targetId);
}

export function updateIdPair(sourceId: string, targetId: string): void {
  idPairs.set(sourceId, targetId);
}

export function removePairBySourceId(sourceId: string): void {
  const isPairDeleted = idPairs.delete(sourceId);

  if (isPairDeleted) {
    return;
  } else {
    throw new BadRequestError(`No pair found for sourceId: ${sourceId}`);
  }
}

export function removePairByTargetId(targetId: string): void {
  const sourceId = getSourceId(targetId);

  if (sourceId) {
    idPairs.delete(sourceId);
  } else {
    throw new BadRequestError(`No source found for targetId: ${targetId}`);
  }
}

export function isSourceIdExist(sourceId: string): boolean {
  return idPairs.has(sourceId);
}