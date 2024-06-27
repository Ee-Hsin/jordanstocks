// Inside vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_SERVICE_ID: string
  readonly VITE_TEMPLATE_ID: string
  readonly VITE_API_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
