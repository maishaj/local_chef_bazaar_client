import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { FaWallet, FaUsers, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PlatformStatistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
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

    if (isLoading) return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
            <span className="loading loading-bars loading-lg text-primary"></span>
            <p className="text-sm font-bold text-base-content/40 animate-pulse">GENERATING INSIGHTS...</p>
        </div>
    );

    return (
        <div className="p-4 md:p-8 space-y-10 bg-base-200/30 min-h-screen transition-colors duration-300">
            <div>
                <h2 className="text-3xl font-black text-base-content tracking-tight">
                    Platform <span className="text-primary">Performance</span>
                </h2>
                <p className="text-sm text-base-content/60">Real-time overview of your ecosystem's health.</p>
            </div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                    <FaWallet className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition-transform" />
                    <div className="text-indigo-100 uppercase text-[10px] font-black tracking-widest mb-1">Total Revenue</div>
                    <div className="text-3xl font-black">TK {stats.totalRevenue?.toLocaleString()}</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                    <FaUsers className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition-transform" />
                    <div className="text-purple-100 uppercase text-[10px] font-black tracking-widest mb-1">Total Users</div>
                    <div className="text-3xl font-black">{stats.totalUsers?.toLocaleString()}</div>
                </div>

                <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-300 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                            <FaExclamationCircle />
                        </div>
                        <div className="text-base-content/50 uppercase text-[10px] font-black tracking-widest">
                            Pending
                        </div>
                    </div>
                    <div className="text-3xl font-black text-base-content">
                        {stats?.pendingOrders ?? 0}
                    </div>
                </div>

                <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-300 relative overflow-hidden group">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                            <FaCheckCircle />
                        </div>
                        <div className="text-base-content/50 uppercase text-[10px] font-black tracking-widest">
                            Delivered
                        </div>
                    </div>
                    <div className="text-3xl font-black text-base-content">
                        {stats?.deliveredOrders ?? 0}
                    </div>
                </div>
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-base-content">Order Distribution</h3>
                        <span className="badge badge-outline text-[10px] opacity-50 uppercase">Bar Analysis</span>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-5" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5, fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5, fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: 'currentColor', opacity: 0.05}} 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" barSize={50} radius={[12, 12, 0, 0]} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart (Donut Style) */}
                <div className="bg-base-100 p-8 rounded-[2rem] shadow-sm border border-base-300">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-black text-base-content">Fulfillment Ratio</h3>
                        <span className="badge badge-outline text-[10px] opacity-50 uppercase">Ratio Analysis</span>
                    </div>
                    <div className="h-72 relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-base-content">{stats.deliveredOrders + stats.pendingOrders}</span>
                            <span className="text-[10px] uppercase opacity-40 font-bold">Total Orders</span>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={10}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={200}
                                    animationDuration={1200}
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold'}} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformStatistics;