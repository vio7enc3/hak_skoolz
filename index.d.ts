/// <reference types="vite-plugin-svgr/client" />
import { i18n } from './node_modules/i18next/index.d';

declare global {
  interface Window {
    i18n: i18n;
  }
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
}

declare module '*.docx';
