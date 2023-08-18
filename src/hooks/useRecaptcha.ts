import { useEffect, useState } from 'react';

declare global {
    interface Window {
        grecaptcha: ReCaptchaInstance | undefined;
    }
}

interface ReCaptchaInstance {
    execute: (sitekey: string, options: ReCaptchaOptions) => Promise<string>;
    reset: () => void;
}

interface ReCaptchaOptions {
    action: string;
}

export function useRecaptcha(action: string) {
    const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(null);
    const [reset, setReset] = useState(false)

    const executeRecaptcha = async () => {
        try {
            if (window.grecaptcha) {
                const response = await window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_PK, {
                    action: action,
                });
                setRecaptchaResponse(response);
            } else {
                console.error('reCAPTCHA library not loaded.');
            }
        } catch (error) {
            console.error('Error executing reCAPTCHA:', error);
        }
    };

    useEffect(() => {
        executeRecaptcha();
    }, [action, reset]);

    const refreshRecaptcha = () => {
        if (window.grecaptcha) {
            setReset(prevState => !prevState);
        } else {
            console.error('reCAPTCHA library not loaded.');
        }
    };



    return { recaptchaResponse, refreshRecaptcha };
}
