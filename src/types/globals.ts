export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      REACT_APP_API_URL: string;
      REACT_APP_TITLE: string;
      REACT_APP_NAME: string;
      REACT_APP_IMPRINT_LINK: string,
      REACT_APP_PRIVACY_LINK: string
    };
  }
}
