export function removeEmptyKeys<T>(obj: object): T {
  return Object.entries(obj)
    .filter(
      ([_, value]) => value !== null && value !== undefined && value !== '',
    )
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    ) as unknown as T;
}
