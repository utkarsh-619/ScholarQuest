import React from 'react';

const Card = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
            <div
                className="w-full h-64 bg-center bg-cover rounded-lg shadow-md"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)',
                }}
            ></div>
            <div
                className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64"
                style={{ backgroundColor: '#387478' }} // Dark teal for card background
            >
                <h3
                    className="py-2 font-bold tracking-wide text-center uppercase bg-gray-900 text-white"
                    // style={{ color: '#E2F1E7' }} // Light pastel green for title text
                >
                    Pens
                </h3>
                <div
                    className="flex items-center justify-between px-3 py-2"
                    style={{ backgroundColor: '#243642' }} // Dark navy for price and button container
                >
                    <span className="font-bold" style={{ color: '#E2F1E7' }}>$129</span>
                    <button
                        className="px-2 py-1 text-xs font-semibold uppercase transition-colors duration-300 transform rounded focus:outline-none"
                        style={{
                            backgroundColor: '#0B192C', // Soft green for button
                            color: '#E2F1E7', // Light pastel green for button text
                        }}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
