
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Shield, Zap, Music, ArrowRight, Star, ShoppingBag, Headphones } from 'lucide-react';
import WaveformVisualizer from '../components/WaveformVisualizer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 px-2">
              Create & Trade Music
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                NFTs On-Chain
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              The future of music collaboration and ownership is here. Create together, mint unique NFTs, and trade your music on the blockchain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link 
                to="/studio"
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Creating</span>
              </Link>
              <Link 
                to="/marketplace"
                className="inline-flex items-center justify-center space-x-2 border border-cyan-500/50 text-cyan-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-cyan-500/10 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Explore NFTs</span>
              </Link>
            </div>
          </div>

          {/* Waveform Visualizer */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-20 px-4">
            <WaveformVisualizer />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Revolutionizing Music Creation & Trading
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 px-4">
            Create, collaborate, mint, and trade music NFTs with true ownership and fair revenue distribution
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-time Collaboration</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Create music with artists worldwide using our advanced collaborative tools and real-time synchronization.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Professional Audio Tools</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Access studio-grade audio processing, mixing, and mastering tools directly in your browser.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Decentralized Marketplace</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Buy, sell, and trade music NFTs with transparent pricing and instant settlement on ICP.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 hover:border-green-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Smart Contracts</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Automated royalty distribution and rights management through blockchain-based smart contracts.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-900/30 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
              How NFTune Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">
              Simple steps to collaborative music creation and NFT trading
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Link your crypto wallet to start creating' },
              { step: '02', title: 'Create & Collaborate', desc: 'Work with artists in real-time studio sessions' },
              { step: '03', title: 'Mint as NFT', desc: 'Turn your collaborative tracks into unique NFTs' },
              { step: '04', title: 'Trade & Earn', desc: 'Sell your NFTs on the marketplace and earn revenue' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm sm:text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base px-2">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="w-6 h-6 text-gray-600 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-cyan-400 mb-2">1,247</div>
            <div className="text-gray-400 text-sm sm:text-base">Active Artists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-2">3,892</div>
            <div className="text-gray-400 text-sm sm:text-base">Collaborations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-2">$156K</div>
            <div className="text-gray-400 text-sm sm:text-base">Artist Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-bold text-yellow-400 mb-2">892</div>
            <div className="text-gray-400 text-sm sm:text-base">NFTs Created</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Music className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4">
            Ready to Create the Future of Music NFTs?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
            Join thousands of artists already creating, collaborating, and trading on NFTune
          </p>
          <Link 
            to="/studio"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-base sm:text-lg"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Start Your Journey</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-700/50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  NFTune
                </span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-6">
                Empowering musicians worldwide with blockchain technology for collaborative music creation and fair distribution.
              </p>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/studio" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    Studio
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/collaborations" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700/50 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2025 NFTune. All rights reserved. Built on ICP Blockchain.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
