import React from 'react';
import SideMenu from '../components/SideMenu';
import Card from '../components/Card';

const Redeem = () => {
    return (
        <div className="flex">
            <SideMenu />

            <div className="flex-grow p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default Redeem;
