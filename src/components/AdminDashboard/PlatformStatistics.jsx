import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';

const PlatformStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    
    const orderData = useMemo(() => [
        { name: 'Pending', value: stats.pendingOrders || 0 },
        { name: 'Delivered', value: stats.deliveredOrders || 0 },
    ], [stats]);

    const COLORS = ['#FBBF24', '#10B981']; 

    return (
        <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800">Platform Performance</h2>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="stat shadow-lg rounded-2xl bg-indigo-600 text-white">
                    <div className="stat-title text-indigo-100 uppercase text-xs font-bold">Total Revenue</div>
                    <div className="stat-value">TK {stats.totalRevenue?.toLocaleString()}</div>
                </div>
                
                <div className="stat shadow-lg rounded-2xl bg-purple-600 text-white">
                    <div className="stat-title text-purple-100 uppercase text-xs font-bold">Total Users</div>
                    <div className="stat-value">{stats.totalUsers}</div>
                </div>

                <div className="stat shadow-lg rounded-2xl bg-amber-500 text-white">
                    <div className="stat-title text-amber-100 uppercase text-xs font-bold">Pending Orders</div>
                    <div className="stat-value">{stats.pendingOrders}</div>
                </div>

                <div className="stat shadow-lg rounded-2xl bg-emerald-500 text-white">
                    <div className="stat-title text-emerald-100 uppercase text-xs font-bold">Delivered</div>
                    <div className="stat-value">{stats.deliveredOrders}</div>
                </div>
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Order Comparison</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{fill: '#f3f4f6'}} />
                                <Bar dataKey="value" fill="#6366f1" barSize={60} radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Fulfillment Ratio</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformStatistics;