import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const OrderFailedPage = () => {
    return (
        <div>
            <Header />
            <div className='my-10 flex items-center w-full flex-col gap-2 h-[50vh] justify-center'>
                <h2 className='text-4xl font-medium text-red-600'>Oops! Payment Failed.</h2>
                <p className='text-lg text-indigo-600'>Please order again, and make payment.</p>
            </div>
            <Footer />
        </div>
    );
};

export default OrderFailedPage;