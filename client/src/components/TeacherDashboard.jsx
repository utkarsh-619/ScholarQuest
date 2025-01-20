// eslint-disable-next-line no-unused-vars
import React from 'react';
import SideMenu from './sideMenu';

const TeacherDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-800">
            <SideMenu />
            <div className="flex-grow p-6 bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">TOP PLAYER</h3>
                        <p className="text-3xl font-bold">2361</p>
                        <p className="mt-1">Matthew</p>
                        <p className="text-sm">Level 4</p>
                    </div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">LONGEST RUN</h3>
                        <p className="text-3xl font-bold">1761</p>
                        <p className="mt-1">Matthew</p>
                    </div>
                    <div className="bg-yellow-400 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">MOST COLLECTED</h3>
                        <p className="text-3xl font-bold">60</p>
                        <p className="mt-1">Matthew</p>
                    </div>
                    <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">FAVOURITE LEVEL</h3>
                        <p className="text-3xl font-bold">Level 1</p>
                        <p className="mt-1">Most Played Level</p>
                    </div>
                </div>

                {/* User Scores Section */}
                <div className="bg-gray-600  p-6 rounded-lg shadow-md">
                    <h2 className="text-xl text-white font-semibold mb-4">Students Performance</h2>
                    

                    {/* Search Bar */}
                    {/* <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div> */}

                    {/* Table */}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-yellow-100 rounded-lg">
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Total Run</th>
                                <th className="p-3 text-left">Total Collectibles</th>
                                <th className="p-3 text-left">Best Total Score</th>
                                <th className="p-3 text-left">VS High Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3 text-white">Matthew <span className="text-gray-400">| mattu</span></td>
                                <td className="p-3 text-white">620</td>
                                <td className="p-3 text-white">13</td>
                                <td className="p-3 text-white">750</td>
                                <td className="p-3 text-white">
                                    <div className="flex items-center text-white" >
                                        <span className="mr-2">100%</span>
                                        <div className="w-full bg-gray-300 h-2 rounded">
                                            <div className="bg-green-500 h-2 rounded" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-3 text-white">Paul <span className="text-gray-400">| paul</span></td>
                                <td className="p-3 text-white">475</td>
                                <td className="p-3 text-white">16</td>
                                <td className="p-3 text-white">635</td>
                                <td className="p-3 text-white">
                                    <div className="flex items-center">
                                        <span className="mr-2">85%</span>
                                        <div className="w-full bg-gray-300 h-2 rounded">
                                            <div className="bg-yellow-500 h-2 rounded" style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
