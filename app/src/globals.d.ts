// globals.d.ts or in a new .d.ts file in the project
declare global {
  interface NodeModule {
    hot: {
      accept: (path?: string, callback?: () => void) => void;
      dispose: (callback: () => void) => void;
      // You can extend it as needed for your use case
    };
  }
}

// Ensure this file is treated as a module
export {};
