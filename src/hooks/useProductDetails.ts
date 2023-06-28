import { FetchSingleProduct } from 'data/types';
import { useState, useEffect } from 'react';

const useProductDetails = (product: FetchSingleProduct) => {
    const [isEbook, setIsEbook] = useState<boolean>(false);
    const [imagen, setImagen] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const isEbookProduct = Object.values(product.details).some((detail) =>
        detail.value.includes("Ebook")
    );

    const { lista_de_cedentes, authors } = product

    useEffect(() => {
        setIsEbook(isEbookProduct);

        if (isEbookProduct) {
            const [firstAuthor] = authors
            const imageOfAuthor = firstAuthor.image.replace("mx.", "")

            setImagen(imageOfAuthor);
            setTitle(firstAuthor.name);

        } else if (lista_de_cedentes) {
            const [firstCedente] = lista_de_cedentes;
            const imageOfCedente = firstCedente.imagen.replace("mx.", "")

            setImagen(imageOfCedente);
            setTitle(firstCedente.post_title);
        }

        return () => {
            setIsEbook(false)
            setImagen('')
            setTitle('')
        }

    }, [product]);

    return { isEbook, imagen, title };
};

export default useProductDetails;
