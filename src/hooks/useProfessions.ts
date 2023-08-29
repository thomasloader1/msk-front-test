import api from 'Services/api';
import { Profession } from 'data/types';
import { useEffect, useState } from 'react';


const useProfessions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchProfessions = async () => {

        try {
            const res = await api.getProfessions();
            setProfessions(res);
        } catch (err) {
            console.log({ err })
            setError(err as string);
        } finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        fetchProfessions();
    }, []);

    return { professions, loading, error };
};

export default useProfessions;
