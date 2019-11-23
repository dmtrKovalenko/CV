// TODO reimport from materal-ui when will be exposed typed analog
export const styledBy = (property: any, mapping: any): any => (props: any) =>
  mapping[props[property]];

export const isChrome =
  typeof window === "undefined"
    ? undefined
    : /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
