import { REBILL_CONF } from "@/logic/Rebill";

export const getEnv = (name: string) => {
  const { PROD } = process.env;
  const isProd = PROD ? "PRD" : "TEST";
  const [first, ...rest] = name.split("_");
  const envVariable = `NEXT_PUBLIC_${first}_${rest.join("_")}_${isProd}`;
  // @ts-ignore
  console.log({envVariable},REBILL_CONF.PRICES[envVariable])
  // @ts-ignore
  return REBILL_CONF.PRICES[envVariable];
};
