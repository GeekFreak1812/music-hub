import React, { useState } from 'react';
import { Edit, Music, Users, Award, MapPin } from 'lucide-react';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    bio: 'Passionate music producer with over 8 years of experience in electronic music production. Specialized in ambient, downtempo, and experimental soundscapes. I believe in the power of collaborative creation and the future of decentralized music ownership.',
    location: 'Los Angeles, CA',
    collaborators: 47,
    role: 'Producer & Sound Engineer',
    wallet: '0x742d...3f1a',
    icp: 125.67,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSave = () => setEditMode(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-8 border border-gray-700/50 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
              <Music className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                {editMode ? (
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="text-3xl font-bold text-white bg-transparent border-b border-cyan-400 outline-none"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                )}
                <button
                  className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  onClick={() => setEditMode((v) => !v)}
                >
                  <Edit className="w-5 h-5" />
                </button>
                {editMode && (
                  <button
                    className="ml-2 px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}
              </div>
              {editMode ? (
                <input
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="text-gray-400 mb-4 bg-transparent border-b border-cyan-400 outline-none"
                />
              ) : (
                <p className="text-gray-400 mb-4">{profile.role}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {editMode ? (
                    <input
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="bg-transparent border-b border-cyan-400 outline-none text-white"
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {editMode ? (
                    <input
                      name="collaborators"
                      type="number"
                      value={profile.collaborators}
                      onChange={handleChange}
                      className="bg-transparent border-b border-cyan-400 outline-none text-white w-16"
                    />
                  ) : (
                    <span>{profile.collaborators} Collaborators</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">About</h2>
              {editMode ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="text-gray-300 leading-relaxed bg-transparent border-b border-cyan-400 outline-none w-full"
                  rows={4}
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Recent Projects */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
              <div className="space-y-4">
                {[
                  { title: "Midnight Vibes", status: "Active", collaborators: 4 },
                  { title: "Cosmic Journey", status: "Completed", collaborators: 3 },
                  { title: "Urban Echoes", status: "In Review", collaborators: 5 },
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.collaborators} collaborators</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'Music Production', 'Sound Design', 'Mixing', 'Mastering',
                  'Ableton Live', 'Logic Pro', 'Synthesizers', 'Audio Engineering'
                ].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Projects</span>
                  <span className="text-white font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Collaborations</span>
                  <span className="text-white font-semibold">{profile.collaborators}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Revenue</span>
                  <span className="text-green-400 font-semibold">$12,456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">NFTs Minted</span>
                  <span className="text-purple-400 font-semibold">8</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
              <div className="space-y-3">
                {[
                  { title: 'First Collaboration', desc: 'Completed your first project' },
                  { title: 'Producer Pro', desc: '10+ successful projects' },
                  { title: 'Community Builder', desc: '25+ collaborators' },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{achievement.title}</h3>
                      <p className="text-gray-400 text-xs">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Wallet</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Connected Wallet</p>
                  {editMode ? (
                    <input
                      name="wallet"
                      value={profile.wallet}
                      onChange={handleChange}
                      className="bg-transparent border-b border-cyan-400 outline-none text-cyan-400 font-mono text-sm"
                    />
                  ) : (
                    <p className="text-cyan-400 font-mono text-sm">{profile.wallet}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">ICP Balance</p>
                  {editMode ? (
                    <input
                      name="icp"
                      type="number"
                      value={profile.icp}
                      onChange={handleChange}
                      className="bg-transparent border-b border-cyan-400 outline-none text-white font-semibold"
                    />
                  ) : (
                    <p className="text-white font-semibold">{profile.icp} ICP</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;