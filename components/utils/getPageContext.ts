import * as React from "react";
import { theme } from "./theme";
import { SheetsRegistry } from "jss";
import { Theme, createGenerateClassName } from "@material-ui/core";

export interface PageContext {
  theme: Theme;
  children: React.ReactNode;
  generateClassName: any;
  sheetsManager: Map<string, string>;
  sheetsRegistry: SheetsRegistry;
}

export default function(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    children: undefined
  };
}
