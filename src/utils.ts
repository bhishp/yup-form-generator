interface KeyAny {
  [key: string]: any;
}

// TODO: Do a test
export const generateDefaultInitialValues = (fields: KeyAny) => {
  // a flag for sensible defaults
  // e.g. empty strings
  return Object.keys(fields).reduce((dict, name) => {
    dict[name] = undefined;
    return dict;
  }, {} as KeyAny);
};
