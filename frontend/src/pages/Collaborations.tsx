
import React, { useState, useEffect } from 'react';
import { Plus, Users, Music, Calendar, MessageCircle, Star, Clock, TrendingUp } from 'lucide-react';
import NewProjectModal from '../components/NewProjectModal';

const Collaborations = () => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [collaborations, setCollaborations] = useState([
    {
      id: 1,
      title: "Midnight Vibes",
      participants: ["Producer1", "SynthMaster", "DrummerX"],
      status: "active",
      progress: 75,
      lastActivity: "2 hours ago",
      genre: "Electronic",
      duration: "3:45",
      earnings: 1247.89
    },
    {
      id: 2,
      title: "Jazz Fusion Experiment",
      participants: ["TrumpetKing", "PianoMaster"],
      status: "completed",
      progress: 100,
      lastActivity: "1 day ago",
      genre: "Jazz",
      duration: "4:12",
      earnings: 892.34
    },
    {
      id: 3,
      title: "Urban Beats",
      participants: ["BeatMaker", "RapperX", "VocalArtist"],
      status: "pending",
      progress: 25,
      lastActivity: "3 hours ago",
      genre: "Hip-Hop",
      duration: "2:58",
      earnings: 0
    }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { action: "New collaboration started", project: "Midnight Vibes", time: "2 hours ago" },
    { action: "Track uploaded to IPFS", project: "Jazz Fusion", time: "5 hours ago" },
    { action: "Audio NFT minted", project: "Urban Beats", time: "1 day ago" },
    { action: "Revenue distributed", project: "Electronic Dreams", time: "2 days ago" }
  ]);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('collaborationProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setCollaborations(prev => [...prev, ...parsedProjects]);
    }
  }, []);

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

  const handleNewProject = (projectData: any) => {
    console.log('New project created:', projectData);
    
    // Add new project to collaborations
    const newProject = {
      id: Date.now(),
      title: projectData.trackName,
      participants: [projectData.uploadedBy],
      status: "active",
      progress: 15,
      lastActivity: "Just now",
      genre: "New",
      duration: "4:55",
      earnings: 0
    };

    setCollaborations(prev => {
      const updated = [...prev, newProject];
      // Save to localStorage
      const userProjects = updated.filter(p => p.id >= 1000); // Only save user-created projects
      localStorage.setItem('collaborationProjects', JSON.stringify(userProjects));
      return updated;
    });

    // Add to recent activity
    const newActivity = {
      action: "New project created",
      project: projectData.trackName,
      time: "Just now"
    };

    setRecentActivity(prev => [newActivity, ...prev]);

    // Show notification
    showNotification(`Project "${projectData.trackName}" created successfully!`);
  };

  const handleOpenProject = (project: any) => {
    showNotification(`Opening project: ${project.title}`);
    // Here you would implement project opening logic
    console.log('Opening project:', project);
  };

  const handleChat = (project: any) => {
    showNotification(`Opening chat for: ${project.title}`);
    // Here you would implement chat functionality
    console.log('Opening chat for project:', project);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Collaborations</h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Work together with artists to create amazing music
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-white font-semibold">Active Collaborations</h3>
                <p className="text-gray-400 text-sm">Currently working on</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-cyan-400">{collaborations.filter(c => c.status === 'active').length}</div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-semibold">Total Earnings</h3>
                <p className="text-gray-400 text-sm">From collaborations</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-400">
              ${collaborations.reduce((sum, c) => sum + c.earnings, 0).toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="text-white font-semibold">Completed Projects</h3>
                <p className="text-gray-400 text-sm">Successfully finished</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{collaborations.filter(c => c.status === 'completed').length}</div>
          </div>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {collaborations.map((collab) => (
            <div key={collab.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{collab.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {collab.participants.map((participant, index) => (
                      <span key={index} className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full text-xs">
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  collab.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  collab.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {collab.status}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{collab.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${collab.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-400">Genre:</span>
                  <span className="text-white ml-2">{collab.genre}</span>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white ml-2">{collab.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400">Earnings:</span>
                  <span className="text-green-400 ml-2">${collab.earnings.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-gray-400 text-xs">{collab.lastActivity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleOpenProject(collab)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Open Project
                </button>
                <button 
                  onClick={() => handleChat(collab)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700/30 last:border-b-0">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.project}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onSubmit={handleNewProject}
      />
    </div>
  );
};

export default Collaborations;
