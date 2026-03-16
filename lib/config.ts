const getRequiredEnv = (value: string | undefined, key: string) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const getServerRequiredEnv = (value: string | undefined, key: string) => {
  if (typeof window !== "undefined") {
    return "";
  }

  return getRequiredEnv(value, key);
};

const normalizeBaseUrl = (url: string) =>
  url.replace(/\/api\/?$/, "").replace(/\/$/, "");

const config = {
  env: {
    apiEndpoint: normalizeBaseUrl(
      process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000",
    ),
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT
      ? normalizeBaseUrl(process.env.NEXT_PUBLIC_PROD_API_ENDPOINT)
      : "",
    imagekit: {
      publicKey: getRequiredEnv(
        process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY",
      ),
      urlEndpoint: getRequiredEnv(
        process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
        "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT",
      ),
      privateKey: getServerRequiredEnv(
        process.env.IMAGEKIT_PRIVATE_KEY,
        "IMAGEKIT_PRIVATE_KEY",
      ),
    },
    databaseUrl: getServerRequiredEnv(process.env.DATABASE_URL, "DATABASE_URL"),
  },
};

export default config;
