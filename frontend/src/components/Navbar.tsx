import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Music, Users, ShoppingBag, Wallet, Menu, X, BarChart3 } from 'lucide-react';
import detectEthereumProvider from '@metamask/detect-provider';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Wallet state
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const walletBtnRef = useRef<HTMLButtonElement>(null);

  // For desktop dropdown positioning
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (showWalletDialog && walletBtnRef.current) {
      setDropdownStyle({
        position: 'absolute',
        top: '110%',
        left: 0,
        zIndex: 1000,
        minWidth: walletBtnRef.current.offsetWidth,
        maxWidth: 320,
      });
    }
  }, [showWalletDialog]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Music },
    { path: '/studio', label: 'Studio', icon: Music },
    { path: '/collaborations', label: 'Collaborations', icon: Users },
    { path: '/marketplace', label: 'NFT Marketplace', icon: ShoppingBag },
    { path: '/earnings', label: 'Dashboard', icon: BarChart3 },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Wallet connect logic
  const connectWallet = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setShowWalletDialog(true);
      } catch (err) {
        // User rejected or error
      }
    } else {
      alert('MetaMask not detected!');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setShowWalletDialog(false);
  };

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        showWalletDialog &&
        walletBtnRef.current &&
        !(walletBtnRef.current as any).contains(e.target)
      ) {
        setShowWalletDialog(false);
      }
    };
    if (showWalletDialog) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showWalletDialog]);

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              NFTune
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Desktop Connect Wallet Button */}
          <div className="relative inline-block">
            <button
              ref={walletBtnRef}
              className="hidden sm:block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
              onClick={walletAddress ? () => setShowWalletDialog((v) => !v) : connectWallet}
            >
              {walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : 'Connect Wallet'}
            </button>
            {/* Wallet Dropdown (Desktop) */}
            {!isMobileMenuOpen && showWalletDialog && (
              <div
                style={dropdownStyle}
                className="bg-gray-900 rounded-lg p-6 shadow-lg border border-cyan-500/30"
              >
                <h2 className="text-lg font-semibold mb-4 text-cyan-400">Wallet Connected</h2>
                <div className="mb-4">
                  <span className="text-gray-400 text-sm">Address:</span>
                  <div className="font-mono text-white break-all">{walletAddress}</div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity mb-2"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </button>
                <button
                  className="w-full text-gray-400 hover:text-cyan-400 text-sm"
                  onClick={() => setShowWalletDialog(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-base">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 relative">
                <button
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  onClick={walletAddress ? () => setShowWalletDialog((v) => !v) : connectWallet}
                >
                  {walletAddress
                    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : 'Connect Wallet'}
                </button>
                {/* Wallet Dropdown (Mobile) */}
                {isMobileMenuOpen && showWalletDialog && (
                  <div className="absolute left-0 right-0 mt-2 bg-gray-900 rounded-lg p-6 shadow-lg border border-cyan-500/30 z-50">
                    <h2 className="text-lg font-semibold mb-4 text-cyan-400">Wallet Connected</h2>
                    <div className="mb-4">
                      <span className="text-gray-400 text-sm">Address:</span>
                      <div className="font-mono text-white break-all">{walletAddress}</div>
                    </div>
                    <button
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity mb-2"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                    <button
                      className="w-full text-gray-400 hover:text-cyan-400 text-sm"
                      onClick={() => setShowWalletDialog(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
