interface KeyAny {
  [key: string]: any;
}
interface KeyUndefined {
  [key: string]: undefined;
}

// TODO: Do a test
export const generateDefaultInitialValues = (fields: any)  => {
  // a flag for sensible defaults
  // e.g. empty strings
  return Object.keys(fields).reduce((dict, name) => {
    dict[name] = undefined;
    return dict;
  }, {} as any);
};
