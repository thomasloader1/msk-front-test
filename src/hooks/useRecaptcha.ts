import { useEffect, useState } from 'react';

declare global {
    interface Window {
        grecaptcha: any; //TODO Define el tipo adecuado para grecaptcha
    }
}

export function useRecaptcha(action: string) {
    const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(null);

    useEffect(() => {
        const executeRecaptcha = async () => {
            if (typeof window.grecaptcha === 'undefined') {
                throw new Error('reCAPTCHA library not loaded.');
            }

            try {
                const response = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_PK, {
                    action: action,
                });
                setRecaptchaResponse(response);
            } catch (error) {
                console.error('Error executing reCAPTCHA:', error);
            }
        };

        executeRecaptcha();
    }, [action]);

    return recaptchaResponse;
}
