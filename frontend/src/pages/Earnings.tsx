
import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Music, Calendar, Crown, Zap } from 'lucide-react';

const Earnings = () => {
  const [currentStats, setCurrentStats] = useState({
    totalEarnings: 12456,
    activeProjects: 12,
    monthlyRevenue: 2890,
    growthRate: 45,
    royaltyRevenue: 1856,
    streamingRevenue: 8945,
    nftSales: 1655
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        ...prev,
        totalEarnings: prev.totalEarnings + Math.floor(Math.random() * 10),
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 5),
        royaltyRevenue: prev.royaltyRevenue + Math.floor(Math.random() * 3),
        streamingRevenue: prev.streamingRevenue + Math.floor(Math.random() * 4)
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Earnings Dashboard</h1>
          <p className="text-gray-400">Real-time revenue tracking and royalty distribution</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live Updates Active</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-green-400">${currentStats.totalEarnings.toLocaleString()}</p>
                <p className="text-green-400 text-sm">+{currentStats.growthRate}% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Royalty Revenue</p>
                <p className="text-2xl font-bold text-purple-400">${currentStats.royaltyRevenue.toLocaleString()}</p>
                <p className="text-purple-400 text-sm">5% from all sales</p>
              </div>
              <Crown className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-cyan-400">{currentStats.activeProjects}</p>
                <p className="text-cyan-400 text-sm">Generating revenue</p>
              </div>
              <Music className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-yellow-400">${currentStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-yellow-400 text-sm">From 8 projects</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-6">Revenue Sources</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white">Streaming Revenue</span>
                </div>
                <span className="text-green-400 font-semibold">${currentStats.streamingRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-white">Royalty Payments</span>
                </div>
                <span className="text-purple-400 font-semibold">${currentStats.royaltyRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-white">NFT Sales</span>
                </div>
                <span className="text-cyan-400 font-semibold">${currentStats.nftSales.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Equal Revenue Distribution
            </h2>
            <div className="space-y-4">
              {[
                { project: 'Midnight Vibes', collaborators: 4, totalRevenue: 3450, yourShare: 862.50 },
                { project: 'Jazz Fusion', collaborators: 3, totalRevenue: 2890, yourShare: 963.33 },
                { project: 'Ambient Sounds', collaborators: 2, totalRevenue: 2100, yourShare: 1050.00 },
                { project: 'Urban Echoes', collaborators: 5, totalRevenue: 1560, yourShare: 312.00 }
              ].map((project, index) => (
                <div key={index} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-medium">{project.project}</h3>
                      <p className="text-gray-400 text-sm">{project.collaborators} collaborators</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-semibold block">${project.totalRevenue.toLocaleString()}</span>
                      <span className="text-cyan-400 text-sm">Total Revenue</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                    <span className="text-gray-400 text-sm">Your Equal Share</span>
                    <span className="text-purple-400 font-semibold">${project.yourShare.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Royalty System Details */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-400" />
            Royalty Revenue System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-400">5%</span>
              </div>
              <h3 className="text-white font-medium mb-2">Royalty Rate</h3>
              <p className="text-gray-400 text-sm">Automatic collection from all secondary sales</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Auto Distribution</h3>
              <p className="text-gray-400 text-sm">Payments split equally among collaborators</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Instant Payouts</h3>
              <p className="text-gray-400 text-sm">Real-time blockchain transactions</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 pb-3">Date</th>
                  <th className="text-left text-gray-400 pb-3">Project</th>
                  <th className="text-left text-gray-400 pb-3">Type</th>
                  <th className="text-right text-gray-400 pb-3">Amount</th>
                  <th className="text-right text-gray-400 pb-3">Your Share</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-01-15', project: 'Midnight Vibes', type: 'Royalty Payment', amount: 125.50, share: 31.38 },
                  { date: '2024-01-14', project: 'Jazz Fusion', type: 'NFT Sale', amount: 890.00, share: 296.67 },
                  { date: '2024-01-13', project: 'Ambient Sounds', type: 'Streaming Revenue', amount: 450.00, share: 225.00 },
                  { date: '2024-01-12', project: 'Urban Echoes', type: 'Royalty Payment', amount: 78.25, share: 15.65 },
                  { date: '2024-01-11', project: 'Midnight Vibes', type: 'Collaboration Bonus', amount: 200.00, share: 50.00 },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="py-3 text-gray-300">{transaction.date}</td>
                    <td className="py-3 text-white">{transaction.project}</td>
                    <td className="py-3 text-gray-400">{transaction.type}</td>
                    <td className="py-3 text-right text-green-400 font-semibold">${transaction.amount.toFixed(2)}</td>
                    <td className="py-3 text-right text-cyan-400 font-semibold">${transaction.share.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
