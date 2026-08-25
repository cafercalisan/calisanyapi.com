declare module "sharp" {
  interface SharpOptions {
    limitInputPixels?: number;
    failOn?: "none" | "truncated" | "error" | "warning";
  }

  interface ResizeOptions {
    width?: number;
    height?: number;
    fit?: "cover" | "contain" | "fill" | "inside" | "outside";
    withoutEnlargement?: boolean;
  }

  interface WebpOptions {
    quality?: number;
    effort?: number;
  }

  interface SharpInstance {
    rotate(): SharpInstance;
    resize(options: ResizeOptions): SharpInstance;
    webp(options?: WebpOptions): SharpInstance;
    toBuffer(): Promise<Buffer>;
  }

  export default function sharp(input: Buffer | Uint8Array, options?: SharpOptions): SharpInstance;
}
