
import React, { useState } from 'react';
import { Play, Pause, Square, Mic, Headphones, Settings, Bot, Music2, MessageCircle, Users, Download, TrendingUp } from 'lucide-react';
import WaveformVisualizer from '../components/WaveformVisualizer';

const Studio = () => {
  const [selectedTune, setSelectedTune] = useState('ambient');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [publishedStats, setPublishedStats] = useState({
    downloads: 1247,
    totalRevenue: 2856.50,
    yourShare: 714.13
  });

  const tuneVarieties = [
    { id: 'ambient', name: 'Ambient Soundscape', description: 'Ethereal pads and atmospheric textures' },
    { id: 'electronic', name: 'Electronic Beat', description: 'Synthesized rhythms and digital sounds' },
    { id: 'jazz', name: 'Jazz Fusion', description: 'Complex harmonies and improvisation' },
    { id: 'rock', name: 'Rock Elements', description: 'Guitar riffs and driving rhythms' },
    { id: 'classical', name: 'Classical Orchestra', description: 'Traditional orchestral instruments' },
    { id: 'hip-hop', name: 'Hip-Hop Beats', description: 'Urban rhythms and bass lines' }
  ];

  const collaborators = [
    { 
      id: 1, 
      name: 'Producer1', 
      role: 'Producer', 
      status: 'online', 
      avatar: 'P1',
      contribution: '25%',
      earnings: 714.13
    },
    { 
      id: 2, 
      name: 'DrummerX', 
      role: 'Drummer', 
      status: 'recording', 
      avatar: 'DX',
      contribution: '25%',
      earnings: 714.13
    },
    { 
      id: 3, 
      name: 'SynthMaster', 
      role: 'Synthesist', 
      status: 'offline', 
      avatar: 'SM',
      contribution: '25%',
      earnings: 714.13
    },
    { 
      id: 4, 
      name: 'VocalArtist', 
      role: 'Vocalist', 
      status: 'online', 
      avatar: 'VA',
      contribution: '25%',
      earnings: 714.13
    }
  ];

  const chatMessages = [
    { user: 'Producer1', message: 'The bass line sounds great!', time: '2m ago' },
    { user: 'DrummerX', message: 'Should we add more reverb to the drums?', time: '5m ago' },
    { user: 'You', message: 'Working on the melody now', time: '8m ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Studio Session</h1>
          <p className="text-gray-400">Project: "Midnight Vibes" - Collaborative Track</p>
        </div>

        {/* Published Track Stats */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 mb-8 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Published Track Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Download className="w-5 h-5 text-cyan-400" />
                <span className="text-2xl font-bold text-cyan-400">{publishedStats.downloads.toLocaleString()}</span>
              </div>
              <p className="text-gray-400">Total Downloads</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">${publishedStats.totalRevenue.toFixed(2)}</div>
              <p className="text-gray-400">Total Revenue</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">${publishedStats.yourShare.toFixed(2)}</div>
              <p className="text-gray-400">Your Share (25%)</p>
            </div>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 mb-8 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="w-12 h-12 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors">
                <Play className="w-6 h-6 text-white ml-1" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <Pause className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                <Square className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-cyan-400 font-mono">00:02:34</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400 font-mono">04:12</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Headphones className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              >
                <Bot className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                onClick={() => setChatOpen(!chatOpen)}
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <WaveformVisualizer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* AI Tune Varieties */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Music2 className="w-5 h-5 text-purple-400" />
                AI Tune Varieties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tuneVarieties.map((tune) => (
                  <div 
                    key={tune.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTune === tune.id 
                        ? 'border-purple-500 bg-purple-500/20' 
                        : 'border-gray-700/30 bg-gray-800/50 hover:border-purple-500/50'
                    }`}
                    onClick={() => setSelectedTune(tune.id)}
                  >
                    <h3 className="text-white font-medium mb-1">{tune.name}</h3>
                    <p className="text-gray-400 text-sm">{tune.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Panel */}
            {aiAssistantOpen && (
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  AI Music Assistant
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-300 mb-3">
                      <strong className="text-purple-400">AI:</strong> I've analyzed your current track. Here are some suggestions:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Add a low-pass filter at 2:15 to create tension</li>
                      <li>• Consider layering the selected {tuneVarieties.find(t => t.id === selectedTune)?.name} style</li>
                      <li>• The chord progression could benefit from a minor 7th in bar 16</li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                      Apply Suggestions
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
                      Generate New Ideas
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Track Layers */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Track Layers</h2>
              
              <div className="space-y-4">
                {[
                  { name: 'Bass Line', artist: 'Producer1', color: 'cyan', active: true },
                  { name: 'Drum Kit', artist: 'DrummerX', color: 'purple', active: true },
                  { name: 'Lead Synth', artist: 'SynthMaster', color: 'yellow', active: false },
                  { name: 'Vocal Layer', artist: 'VocalArtist', color: 'green', active: true },
                ].map((track, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/30">
                    <div className={`w-3 h-3 rounded-full bg-${track.color}-400`}></div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{track.name}</h3>
                      <p className="text-gray-400 text-sm">by {track.artist}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        track.active ? 'bg-cyan-500 text-white' : 'bg-gray-600 text-gray-400'
                      }`}>
                        <Play className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Collaborators with Earnings */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Collaborators & Revenue
              </h2>
              <div className="space-y-4">
                {collaborators.map((collab) => (
                  <div key={collab.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {collab.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{collab.name}</p>
                          <div className={`w-2 h-2 rounded-full ${
                            collab.status === 'online' ? 'bg-green-400' :
                            collab.status === 'recording' ? 'bg-red-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <p className="text-gray-400 text-sm">{collab.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Contribution:</span>
                        <span className="text-cyan-400 font-semibold">{collab.contribution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Earnings:</span>
                        <span className="text-green-400 font-semibold">${collab.earnings.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Panel */}
            {chatOpen && (
              <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  Collaboration Chat
                </h2>
                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-cyan-400 font-medium text-sm">{msg.user}</span>
                        <span className="text-gray-500 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                    Send
                  </button>
                </div>
              </div>
            )}
            
            {/* Rights & Revenue */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Rights & Revenue</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your Share</span>
                  <span className="text-cyan-400 font-semibold">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Smart Contract</span>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">NFT Minted</span>
                  <span className="text-purple-400 text-sm">Live</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Royalty Rate</span>
                  <span className="text-yellow-400 font-semibold">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
