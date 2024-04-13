export const getEnv = (name: string) => {
  const { PROD } = process.env;
  const isProd = PROD ? "PRD" : "TEST";
  const [first, ...rest] = name.split("_");
  const envVariable = `NEXT_PUBLIC_${first}_${rest.join("_")}_${isProd}`;
  console.log({envVariable},process)
  return process.env[envVariable];
};
