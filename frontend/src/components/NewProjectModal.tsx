
import React, { useState } from 'react';
import { X, Upload, Music, FileAudio, AlertCircle } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: any) => void;
}

const NewProjectModal = ({ isOpen, onClose, onSubmit }: NewProjectModalProps) => {
  const [formData, setFormData] = useState({
    trackName: '',
    uploadedBy: '',
    audioFile: null as File | null,
    ipfsHash: '',
    uploadProgress: 0
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setFormData(prev => ({ ...prev, audioFile: file }));
    
    // Simulate IPFS upload to Pinata
    const interval = setInterval(() => {
      setFormData(prev => {
        const newProgress = prev.uploadProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return {
            ...prev,
            uploadProgress: 100,
            ipfsHash: 'QmX8Y9Z...' // Simulated IPFS hash
          };
        }
        return { ...prev, uploadProgress: newProgress };
      });
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.trackName && formData.uploadedBy && formData.audioFile) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        trackName: '',
        uploadedBy: '',
        audioFile: null,
        ipfsHash: '',
        uploadProgress: 0
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-cyan-500/30 p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-cyan-400" />
            Create New Project
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
              Track Name *
            </label>
            <input
              type="text"
              value={formData.trackName}
              onChange={(e) => setFormData(prev => ({ ...prev, trackName: e.target.value }))}
              placeholder="Billie Jean"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Uploaded By *
            </label>
            <input
              type="text"
              value={formData.uploadedBy}
              onChange={(e) => setFormData(prev => ({ ...prev, uploadedBy: e.target.value }))}
              placeholder="Preet"
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Audio File *
            </label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <FileAudio className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">
                  {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
                </p>
              </label>
            </div>
          </div>

          {isUploading && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">Uploading to IPFS... {formData.uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${formData.uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {formData.audioFile && formData.uploadProgress === 100 && (
            <div className="bg-gray-800/50 rounded-lg p-4 text-sm text-gray-300">
              <div className="text-green-400 mb-2">
                File: {formData.audioFile.name}
              </div>
              <div>Size: {(formData.audioFile.size / (1024 * 1024)).toFixed(2)} MB</div>
              <div>Duration: 4:55</div>
              <div>Format: audio/mpeg</div>
              <div className="text-cyan-400 mt-2">IPFS Hash: {formData.ipfsHash}</div>
            </div>
          )}

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
              disabled={!formData.trackName || !formData.uploadedBy || !formData.audioFile}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;
