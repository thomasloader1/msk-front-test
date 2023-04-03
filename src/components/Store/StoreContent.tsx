import React from 'react';
import StorePagination from './StorePagination';
import StoreSideBar from './StoreSideBar';
import StoreProduct from './StoreProduct';

const StoreContent = () => {
    return (
        <section className=" container course-content-area pb-90">
            
                <div className="grid grid-cols-[20%_80%] gap-4 mb-10">
                    <div className="flex flex-col">
                        <StoreSideBar />
                    </div>
                    
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />

                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />

                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />
                            <StoreProduct />

                        
                            <div className='grid grid-cols-1'>
                                <StorePagination />
                            </div>
                        
                    </div>

                </div>
        </section>
    );
};

export default StoreContent;