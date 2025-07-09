
import React from 'react';
import { Play, Users, Clock, Disc } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  artist: string;
  collaborators: number;
  duration: string;
  genre: string;
  image?: string;
  status: 'active' | 'completed' | 'pending';
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  artist,
  collaborators,
  duration,
  genre,
  status
}) => {
  const statusColors = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400">by {artist}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {status}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{collaborators}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Disc className="w-4 h-4" />
          <span>{genre}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <Play className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          Open Studio
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
