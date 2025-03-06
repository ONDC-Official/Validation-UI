export const flattenRecord = <T>(record: Record<string, T[]>): T[] => {
	return Object.values(record).flatMap((arr) => arr);
};
