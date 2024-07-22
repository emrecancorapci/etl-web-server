const idPairs = new Map<string, string>();

export function addIdPair(sourceId: string, targetId: string): void {
  idPairs.set(sourceId, targetId);
}

export function getTargetId(sourceId: string): string | undefined {
  return idPairs.get(sourceId) || undefined;
}