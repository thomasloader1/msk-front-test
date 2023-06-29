import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

type UTMParams = {
  [key: string]: string;
};

const useUTM = (): UTMParams => {
  const history = useHistory();
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
  });
  useEffect(() => {
    const captureUTMs = () => {
      const { search } = history.location;
      const { utm_source, utm_medium, utm_campaign, utm_content } =
        queryString.parse(search);

      const utmParams: UTMParams = {
        utm_source: Array.isArray(utm_source)
          ? utm_source[0] || ""
          : utm_source || "",
        utm_medium: Array.isArray(utm_medium)
          ? utm_medium[0] || ""
          : utm_medium || "",
        utm_campaign: Array.isArray(utm_campaign)
          ? utm_campaign[0] || ""
          : utm_campaign || "",
        utm_content: Array.isArray(utm_content)
          ? utm_content[0] || ""
          : utm_content || "",
      };

      setUtmParams(utmParams);
    };

    captureUTMs();

    const cleanup = (): void => {
      // Aquí puedes realizar cualquier limpieza necesaria al desmontar el componente
    };

    return cleanup;
  }, [history]);

  return utmParams;
};

export default useUTM;
