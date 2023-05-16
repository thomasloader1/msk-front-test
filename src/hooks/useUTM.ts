import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

type UTMParams = {
    [key: string]: string | undefined | null;
};

const useUTM = (): void => {
    const history = useHistory();

    useEffect(() => {
        const captureUTMs = (): void => {
            const { search } = history.location;
            const { utm_source, utm_medium, utm_campaign } = queryString.parse(search);

            // Actualiza los campos ocultos del formulario con los valores de UTM
            const utmSourceInput = document.getElementById('hidden-utm-source') as HTMLInputElement;
            const utmMediumInput = document.getElementById('hidden-utm-medium') as HTMLInputElement;
            const utmCampaignInput = document.getElementById('hidden-utm-campaign') as HTMLInputElement;

            utmSourceInput.value = Array.isArray(utm_source) ? utm_source[0] || '' : utm_source || '';
            utmMediumInput.value = Array.isArray(utm_medium) ? utm_medium[0] || '' : utm_medium || '';
            utmCampaignInput.value = Array.isArray(utm_campaign) ? utm_campaign[0] || '' : utm_campaign || '';
        };

        captureUTMs();

        // Cambia la URL sin recargar la página
        const updateURL = (utmParams: UTMParams): void => {
            const newURL = new URL(window.location.href);

            Object.keys(utmParams).forEach((param) => {
                newURL.searchParams.set(param, utmParams[param] || '');
            });

            history.push(newURL.pathname + newURL.search);
        };

        const setUTMs = (utmParams: UTMParams): void => {
            // Actualiza los campos ocultos del formulario
            Object.keys(utmParams).forEach((param) => {
                const input = document.getElementById(`hidden-${param}`) as HTMLInputElement;
                input.value = Array.isArray(utmParams[param]) ? utmParams[param][0] || '' : utmParams[param] || '';
            });

            // Cambia la URL sin recargar la página
            updateURL(utmParams);
        };

        const cleanup = (): void => {
            // Aquí puedes realizar cualquier limpieza necesaria al desmontar el componente
        };

        return cleanup;
    }, [history]);
};

export default useUTM;
