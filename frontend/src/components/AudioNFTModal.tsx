
import React, { useState, useRef, useEffect } from 'react';
import { X, Music, Palette, Zap, CheckCircle } from 'lucide-react';

interface AudioNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (nftData: any) => void;
}

const AudioNFTModal = ({ isOpen, onClose, onMint }: AudioNFTModalProps) => {
  const [step, setStep] = useState(1);
  const [waveformGenerated, setWaveformGenerated] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('steampunk');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    sourceProject: '',
    price: '',
    imageUrl: ''
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

  const waveformStyles = [
    { id: 'steampunk', name: 'Steampunk', description: 'Victorian steampunk design with bronze and copper tones' },
    { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic neon aesthetics with electric colors' },
    { id: 'vintage', name: 'Vintage', description: 'Classic retro vibes with warm analog colors' },
    { id: 'cosmic', name: 'Cosmic', description: 'Space-themed design with deep blues and purples' },
    { id: 'neon', name: 'Neon', description: 'Bright electric colors with glowing effects' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple monochrome design' },
    { id: 'rainbow', name: 'Rainbow', description: 'Vibrant multicolor spectrum waves' },
    { id: 'fire', name: 'Fire', description: 'Hot reds and oranges like burning flames' },
    { id: 'ocean', name: 'Ocean', description: 'Cool blues and teals like ocean waves' },
    { id: 'forest', name: 'Forest', description: 'Natural greens and earth tones' },
    { id: 'galaxy', name: 'Galaxy', description: 'Deep space with stars and nebula colors' },
    { id: 'synthwave', name: 'Synthwave', description: 'Retro 80s aesthetic with pink and blue' },
    { id: 'lava', name: 'Lava', description: 'Molten rock with red and orange gradients' },
    { id: 'aurora', name: 'Aurora', description: 'Northern lights with green and purple' },
    { id: 'sunset', name: 'Sunset', description: 'Warm evening colors with orange and pink' },
    { id: 'arctic', name: 'Arctic', description: 'Cool ice colors with white and blue' }
  ];

  useEffect(() => {
    if (isOpen && step === 2 && canvasRef.current) {
      generateWaveform();
    }
  }, [isOpen, step]);

  const generateWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;

    // Create gradient based on selected style
    const gradient = ctx.createLinearGradient(0, 0, 400, 0);
    
    switch (selectedStyle) {
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
      case 'vintage':
        gradient.addColorStop(0, '#8B0000');
        gradient.addColorStop(0.5, '#FFD700');
        gradient.addColorStop(1, '#800080');
        break;
      case 'neon':
        gradient.addColorStop(0, '#FF1493');
        gradient.addColorStop(0.5, '#00FFFF');
        gradient.addColorStop(1, '#FFFF00');
        break;
      case 'minimal':
        gradient.addColorStop(0, '#333333');
        gradient.addColorStop(0.5, '#666666');
        gradient.addColorStop(1, '#999999');
        break;
      case 'rainbow':
        gradient.addColorStop(0, '#FF0000');
        gradient.addColorStop(0.16, '#FF8000');
        gradient.addColorStop(0.33, '#FFFF00');
        gradient.addColorStop(0.5, '#00FF00');
        gradient.addColorStop(0.66, '#0080FF');
        gradient.addColorStop(0.83, '#8000FF');
        gradient.addColorStop(1, '#FF0080');
        break;
      case 'fire':
        gradient.addColorStop(0, '#FF4500');
        gradient.addColorStop(0.5, '#FF6347');
        gradient.addColorStop(1, '#FFD700');
        break;
      case 'ocean':
        gradient.addColorStop(0, '#006994');
        gradient.addColorStop(0.5, '#0099CC');
        gradient.addColorStop(1, '#66CCFF');
        break;
      case 'forest':
        gradient.addColorStop(0, '#228B22');
        gradient.addColorStop(0.5, '#32CD32');
        gradient.addColorStop(1, '#90EE90');
        break;
      case 'galaxy':
        gradient.addColorStop(0, '#191970');
        gradient.addColorStop(0.5, '#483D8B');
        gradient.addColorStop(1, '#9370DB');
        break;
      case 'synthwave':
        gradient.addColorStop(0, '#FF1493');
        gradient.addColorStop(0.5, '#00BFFF');
        gradient.addColorStop(1, '#FF69B4');
        break;
      case 'lava':
        gradient.addColorStop(0, '#DC143C');
        gradient.addColorStop(0.5, '#FF4500');
        gradient.addColorStop(1, '#FF8C00');
        break;
      case 'aurora':
        gradient.addColorStop(0, '#00FF7F');
        gradient.addColorStop(0.5, '#7B68EE');
        gradient.addColorStop(1, '#00CED1');
        break;
      case 'sunset':
        gradient.addColorStop(0, '#FF6347');
        gradient.addColorStop(0.5, '#FFB347');
        gradient.addColorStop(1, '#FFA07A');
        break;
      case 'arctic':
        gradient.addColorStop(0, '#F0F8FF');
        gradient.addColorStop(0.5, '#87CEEB');
        gradient.addColorStop(1, '#4682B4');
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

    setTimeout(() => {
      setWaveformGenerated(true);
      // Show notification
      showNotification('Waveform generated successfully');
    }, 1500);
  };

  const showNotification = (message: string) => {
    // Create a toast notification
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

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleMint = () => {
    onMint({ ...nftData, waveformStyle: selectedStyle });
    onClose();
    showNotification('Audio NFT minted successfully!');
    setStep(1);
    setWaveformGenerated(false);
    setNftData({ name: '', description: '', sourceProject: '', price: '', imageUrl: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-cyan-500/30 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-cyan-400" />
            Create Audio NFT - Step {step}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                NFT Name *
              </label>
              <input
                type="text"
                value={nftData.name}
                onChange={(e) => setNftData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., 'Cosmic Melody #1'"
                className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                value={nftData.description}
                onChange={(e) => setNftData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your NFT..."
                rows={4}
                className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Source Project *
                </label>
                <select
                  value={nftData.sourceProject}
                  onChange={(e) => setNftData(prev => ({ ...prev, sourceProject: e.target.value }))}
                  className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
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
                  value={nftData.imageUrl}
                  onChange={(e) => setNftData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/artwork1"
                  className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty to generate a random image</p>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Price (ICP) *
              </label>
              <input
                type="number"
                step="0.1"
                value={nftData.price}
                onChange={(e) => setNftData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.5"
                className="w-full bg-gray-800/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleNext}
                disabled={!nftData.name || !nftData.description || !nftData.sourceProject || !nftData.price}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                NEXT: UPLOAD AUDIO
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <canvas
                ref={canvasRef}
                className="w-full max-w-md mx-auto rounded-lg bg-gray-800/50 border border-cyan-500/30"
              />
              
              {waveformGenerated && (
                <div className="flex items-center justify-center gap-2 mt-4 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Waveform generated successfully</span>
                </div>
              )}
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-cyan-500/30">
              <h3 className="text-white font-medium mb-2">{selectedStyle}</h3>
              <p className="text-gray-400 text-sm">
                {waveformStyles.find(s => s.id === selectedStyle)?.description}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Choose Waveform Style:</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {waveformStyles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedStyle(style.id);
                      setWaveformGenerated(false);
                      setTimeout(generateWaveform, 100);
                      showNotification('Waveform style updated to ' + style.name);
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedStyle === style.id
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-sm">{style.name}</div>
                    <div className="text-xs opacity-70 mt-1">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                BACK
              </button>
              <button
                onClick={handleMint}
                disabled={!waveformGenerated}
                className="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                MINT AUDIO NFT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioNFTModal;
