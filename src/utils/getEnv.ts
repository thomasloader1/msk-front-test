import { REBILL_CONF } from "@/logic/Rebill";

export const getEnv = (name: string) => {
  const { PROD,NODE_ENV } = process.env;
  const isProd = (PROD || NODE_ENV === 'production') ? "PRD" : "TEST";
  const [first, ...rest] = name.split("_");
  const envVariable = `NEXT_PUBLIC_${first}_${rest.join("_")}_${isProd}`;
  // @ts-ignore
  console.log({PROD, NODE_ENV,envVariable},REBILL_CONF.PRICES[envVariable])
  // @ts-ignore
  return REBILL_CONF.PRICES[envVariable];
};
