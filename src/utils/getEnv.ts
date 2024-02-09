export const getEnv = (name: string) => {
  const { PROD } = import.meta.env;
  const isProd = PROD ? "PRD" : "TEST";
  const [first, ...rest] = name.split("_");
  const envVariable = `VITE_${first}_${rest.join("_")}_${isProd}`;
  return import.meta.env[envVariable];
};
