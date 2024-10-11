export interface IWebShareData extends Record<string, unknown> {
  files?: File[];
  text?: string;
  title?: string;
  url?: string;
}

export interface IUseWebShareResult {
  isAvailable: boolean;
  share: () => Promise<void>;
  isSharing: boolean;
  isError: boolean;
  error: string | null;
}
