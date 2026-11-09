declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.wav' {
  const src: string;
  export default src;
}

declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
