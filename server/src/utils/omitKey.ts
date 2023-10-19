export function omit(key: string, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}