import api from 'Services/api';
import { Specialty } from 'data/types';
import { useEffect, useState } from 'react';


const useSpecialties = () => {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchSpecialties = async () => {

        try {
            const res = await api.getSpecialtiesAndGroups();
            setSpecialties(res.specialities);
            setSpecialtiesGroup(res.specialities_group);
        } catch (err) {
            console.log({ err })
            setError(err as string);
        } finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        fetchSpecialties();
    }, []);

    return { specialties, specialtiesGroup, loading, error };
};

export default useSpecialties;
