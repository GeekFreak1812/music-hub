
import React, { useState, useEffect } from 'react';
import { X, Zap, Diamond } from 'lucide-react';

interface QuickMintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (mintData: any) => void;
}

const QuickMintModal = ({ isOpen, onClose, onMint }: QuickMintModalProps) => {
  const [mintData, setMintData] = useState({
    name: '',
    description: '',
    sourceProject: '',
    imageUrl: '',
    price: ''
  });

  // Load projects from localStorage for the dropdown
  const [availableProjects, setAvailableProjects] = useState<string[]>([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('collaborationProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      const projectNames = parsedProjects.map((p: any) => p.title);
      setAvailableProjects(['1st', 'Midnight Vibes', 'Jazz Sessions', ...projectNames]);
    } else {
      setAvailableProjects(['1st', 'Midnight Vibes', 'Jazz Sessions']);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onMint(mintData);
    onClose();
    setMintData({ name: '', description: '', sourceProject: '', imageUrl: '', price: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-cyan-500/30 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Diamond className="w-5 h-5 text-cyan-400" />
            Mint Music NFT
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              NFT Name *
            </label>
            <input
              type="text"
              value={mintData.name}
              onChange={(e) => setMintData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., 'Cosmic Melody #1'"
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={mintData.description}
              onChange={(e) => setMintData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your NFT..."
              rows={3}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Source Project *
            </label>
            <select
              value={mintData.sourceProject}
              onChange={(e) => setMintData(prev => ({ ...prev, sourceProject: e.target.value }))}
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              required
            >
              <option value="">Select a project</option>
              {availableProjects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              value={mintData.imageUrl}
              onChange={(e) => setMintData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/artwork1"
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-xs text-gray-400 mt-1">Leave empty to generate a random image</p>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Price (ICP) *
            </label>
            <input
              type="number"
              step="0.1"
              value={mintData.price}
              onChange={(e) => setMintData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="0.5"
              className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Quick Mint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickMintModal;
