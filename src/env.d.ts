/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string;
  readonly NEXT_PUBLIC_APP_URL: string;
  readonly PAPERCLIP_API_URL: string;
  readonly PAPERCLIP_API_KEY: string;
  readonly PAPERCLIP_COMPANY_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
