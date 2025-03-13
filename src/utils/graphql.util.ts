export const transformGraphQLFields = (fields: object): object => {
  const result: object = {};

  for (const key in fields) {
    if (Object.keys(fields[key]).length === 0) {
      result[key] = true;
    } else {
      // Otherwise, recursively transform nested fields
      result[key] = transformGraphQLFields(fields[key]);
    }
  }

  return result;
};
