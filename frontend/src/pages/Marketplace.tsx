import React, { useState, useEffect } from 'react';
import { Play, Music, ShoppingBag, Filter, Search, ShoppingCart, ExternalLink, Diamond, Zap, Headphones } from 'lucide-react';
import AudioNFTModal from '../components/AudioNFTModal';
import QuickMintModal from '../components/QuickMintModal';

const Marketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showAudioNFTModal, setShowAudioNFTModal] = useState(false);
  const [showQuickMintModal, setShowQuickMintModal] = useState(false);
  const [myNFTs, setMyNFTs] = useState<any[]>([]);

  // Unique images for each NFT
  const uniqueImages = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop", 
    "https://images.unsplash.com/photo-1571974599782-87624638275c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop"
  ];

  const [nftCollections, setNftCollections] = useState([
    {
      id: 1,
      title: "Midnight Vibes",
      artist: "Producer1 & SynthMaster",
      price: "2.5 ICP",
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/1",
      image: uniqueImages[0],
      category: "electronic",
      likes: 234,
      plays: 1205,
      collaboration: true,
      creator: "ijw65-bm...",
      isOwned: false
    },
    {
      id: 2,
      title: "Jazz Sessions", 
      artist: "TrumpetKing",
      price: "1.8 ICP",
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/2",
      image: uniqueImages[1],
      category: "jazz",
      likes: 189,
      plays: 892,
      collaboration: false,
      creator: "abc123-xy...",
      isOwned: true
    },
    {
      id: 3,
      title: "Urban Beats",
      artist: "BeatMaker & RapperX",
      price: "3.2 ICP", 
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/3",
      image: uniqueImages[2],
      category: "hip-hop",
      likes: 456,
      plays: 2341,
      collaboration: true,
      creator: "xyz789-ab...",
      isOwned: false
    },
    {
      id: 4,
      title: "Ocean Dreams",
      artist: "AmbientSoul",
      price: "1.2 ICP",
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/4",
      image: uniqueImages[3],
      category: "ambient",
      likes: 123,
      plays: 678,
      collaboration: false,
      creator: "amb456-cd...",
      isOwned: false
    },
    {
      id: 5,
      title: "Rock Revolution",
      artist: "GuitarHero & DrummerX",
      price: "2.9 ICP",
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/5",
      image: uniqueImages[4],
      category: "rock",
      likes: 567,
      plays: 3456,
      collaboration: true,
      creator: "rock123-ef...",
      isOwned: false
    },
    {
      id: 6,
      title: "Classical Fusion",
      artist: "ViolinMaster",
      price: "4.1 ICP",
      openseaUrl: "https://opensea.io/assets/ethereum/0x123/6",
      image: uniqueImages[5],
      category: "classical",
      likes: 234,
      plays: 1567,
      collaboration: false,
      creator: "violin789-gh...",
      isOwned: false
    }
  ]);

  // Load my NFTs from localStorage on component mount
  useEffect(() => {
    const savedMyNFTs = localStorage.getItem('myNFTs');
    if (savedMyNFTs) {
      const parsedNFTs = JSON.parse(savedMyNFTs);
      setMyNFTs(parsedNFTs);
    }
  }, []);

  const categories = [
    { id: 'all', label: 'All Genres' },
    { id: 'electronic', label: 'Electronic' },
    { id: 'jazz', label: 'Jazz' },
    { id: 'hip-hop', label: 'Hip-Hop' },
    { id: 'ambient', label: 'Ambient' },
    { id: 'rock', label: 'Rock' },
    { id: 'classical', label: 'Classical' }
  ];

  // Combine original NFTs with user's minted NFTs
  const allNFTs = [...nftCollections, ...myNFTs];

  const filteredNFTs = allNFTs.filter(nft => {
    const matchesFilter = selectedFilter === 'all' || nft.category === selectedFilter;
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-nfts' && (nft.isOwned || myNFTs.some(myNft => myNft.id === nft.id))) ||
                      (activeTab === 'available' && !nft.isOwned && !myNFTs.some(myNft => myNft.id === nft.id));
    return matchesFilter && matchesSearch && matchesTab;
  });

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2';
    notification.innerHTML = `
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      ${message}
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleOpenSeaClick = (openseaUrl: string) => {
    window.open(openseaUrl, '_blank', 'noopener,noreferrer');
  };

  const generateWaveformDataURL = (style: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Create gradient based on style
    const gradient = ctx.createLinearGradient(0, 0, 400, 0);
    
    switch (style) {
      case 'steampunk':
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(0.5, '#DAA520');
        gradient.addColorStop(1, '#CD853F');
        break;
      case 'cyberpunk':
        gradient.addColorStop(0, '#00FFFF');
        gradient.addColorStop(0.5, '#FF00FF');
        gradient.addColorStop(1, '#00FF00');
        break;
      case 'neon':
        gradient.addColorStop(0, '#FF1493');
        gradient.addColorStop(0.5, '#00FFFF');
        gradient.addColorStop(1, '#FFFF00');
        break;
      case 'vintage':
        gradient.addColorStop(0, '#8B0000');
        gradient.addColorStop(0.5, '#FFD700');
        gradient.addColorStop(1, '#800080');
        break;
      default:
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#06b6d4');
    }

    ctx.fillStyle = gradient;
    ctx.clearRect(0, 0, 400, 200);

    // Draw waveform
    for (let i = 0; i < 100; i++) {
      const height = Math.random() * 150 + 20;
      const x = i * 4;
      const y = (200 - height) / 2;
      ctx.fillRect(x, y, 3, height);
    }

    return canvas.toDataURL();
  };

  const handleAudioNFT = (nftData: any) => {
    console.log('Audio NFT created:', nftData);
    
    // Generate waveform image for Audio NFT
    const waveformImage = generateWaveformDataURL(nftData.waveformStyle);
    
    // Create new NFT object
    const newNFT = {
      id: Date.now(),
      title: nftData.name,
      artist: "You",
      price: `${nftData.price} ICP`,
      openseaUrl: `https://opensea.io/assets/ethereum/0x123/${Date.now()}`,
      image: nftData.imageUrl || waveformImage, // Use waveform if no custom image
      category: "electronic",
      likes: 0,
      plays: 0,
      collaboration: false,
      creator: "you",
      isOwned: true,
      waveformStyle: nftData.waveformStyle,
      description: nftData.description,
      sourceProject: nftData.sourceProject,
      isAudioNFT: true
    };

    // Add to myNFTs and save to localStorage
    setMyNFTs(prev => {
      const updated = [...prev, newNFT];
      localStorage.setItem('myNFTs', JSON.stringify(updated));
      return updated;
    });

    showNotification(`Audio NFT "${nftData.name}" created and added to your collection!`);
  };

  const handleQuickMint = (mintData: any) => {
    console.log('Quick mint:', mintData);
    
    // Use a unique random image for quick minted NFTs
    const randomImage = uniqueImages[Math.floor(Math.random() * uniqueImages.length)];
    
    // Create new NFT object
    const newNFT = {
      id: Date.now() + 1,
      title: mintData.name,
      artist: "You",
      price: `${mintData.price} ICP`,
      openseaUrl: `https://opensea.io/assets/ethereum/0x123/${Date.now() + 1}`,
      image: mintData.imageUrl || randomImage,
      category: "electronic",
      likes: 0,
      plays: 0,
      collaboration: false,
      creator: "you",
      isOwned: true,
      description: mintData.description,
      sourceProject: mintData.sourceProject
    };

    // Add to myNFTs and save to localStorage
    setMyNFTs(prev => {
      const updated = [...prev, newNFT];
      localStorage.setItem('myNFTs', JSON.stringify(updated));
      return updated;
    });

    showNotification(`NFT "${mintData.name}" quick minted and added to your collection!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Music className="w-8 h-8 text-cyan-400" />
            Music NFT Marketplace
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Discover and collect unique music NFTs from talented artists worldwide
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            ALL NFTs
          </button>
          <button
            onClick={() => setActiveTab('my-nfts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'my-nfts'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Diamond className="w-4 h-4" />
            MY NFTs ({myNFTs.length + nftCollections.filter(nft => nft.isOwned).length})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'available'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            AVAILABLE
          </button>
          <button
            onClick={() => setShowQuickMintModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-cyan-400 to-cyan-500 text-black hover:opacity-90 transition-opacity"
          >
            <Zap className="w-4 h-4" />
            QUICK MINT
          </button>
          <button
            onClick={() => setShowAudioNFTModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
          >
            <Headphones className="w-4 h-4" />
            AUDIO NFT
          </button>
        </div>

        {/* OpenSea Integration Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Integrated with OpenSea
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                View and trade these NFTs directly on OpenSea, the world's largest NFT marketplace
              </p>
            </div>
            <button
              onClick={() => window.open('https://opensea.io', '_blank', 'noopener,noreferrer')}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit OpenSea</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            <div className="relative flex-1 max-w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 text-sm sm:text-base"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:border-cyan-500 text-sm sm:text-base min-w-0"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group">
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-36 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 sm:p-3 rounded-full transition-colors">
                    <Play className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>
                </div>
                {nft.collaboration && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-purple-500/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Collaboration
                  </div>
                )}
                {nft.isAudioNFT && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-cyan-500/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Audio NFT
                  </div>
                )}
                <div className="absolute bottom-2 right-2 text-xs text-cyan-400 font-mono bg-black/50 px-2 py-1 rounded">
                  {nft.price}
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">{nft.title}</h3>
                <p className="text-gray-400 mb-1 text-sm sm:text-base truncate">by {nft.artist}</p>
                <p className="text-gray-500 mb-3 text-xs">Creator: {nft.creator}</p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Music className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{nft.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{nft.plays}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenSeaClick(nft.openseaUrl)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    title="View on OpenSea"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-cyan-400 font-semibold text-base sm:text-lg">{nft.price}</div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-1 sm:space-x-2">
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => handleOpenSeaClick(nft.openseaUrl)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    >
                      OpenSea
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-gray-700/50">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">Marketplace Stats</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">{allNFTs.length}</div>
              <div className="text-gray-400 text-sm sm:text-base">Total NFTs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">892</div>
              <div className="text-gray-400 text-sm sm:text-base">Artists</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">45.2K</div>
              <div className="text-gray-400 text-sm sm:text-base">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">234</div>
              <div className="text-gray-400 text-sm sm:text-base">Active Bids</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AudioNFTModal
        isOpen={showAudioNFTModal}
        onClose={() => setShowAudioNFTModal(false)}
        onMint={handleAudioNFT}
      />
      
      <QuickMintModal
        isOpen={showQuickMintModal}
        onClose={() => setShowQuickMintModal(false)}
        onMint={handleQuickMint}
      />
    </div>
  );
};

export default Marketplace;
