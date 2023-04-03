import SingleProductDetail from 'components/SingleProductDetail/SingleProductDetail'
import React from 'react'

const PageSingleProduct = () => {
    return (
        <div
            className={`nc-PageSubcription `}
            data-nc-id="PageSubcription"
        >
            <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
                <SingleProductDetail />
            </section>
        </div>
    )
}

export default PageSingleProduct