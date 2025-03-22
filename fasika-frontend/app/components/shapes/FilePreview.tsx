'use client';

import { Download, Eye } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileName, fileUrl }) => {
  const [fileSize, setFileSize] = useState<string>('');

  useEffect(() => {
    const fetchFileSize = async () => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const sizeInBytes = blob.size;
        const sizeInKB = (sizeInBytes / 1024).toFixed(2);
        setFileSize(`${sizeInKB} KB`);
      } catch (error) {
        console.error('Error fetching file size:', error);
      }
    };

    fetchFileSize();
  }, [fileUrl]);

  const handlePreview = () => {
    window.open(fileUrl, '_blank'); // Open PDF in a new tab for preview
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'Brochure.pdf'; // Fallback name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="flex items-center justify-between border border-gray-300 rounded-lg p-4 w-96 shadow-md"
      style={{
        borderBottom: '4px solid #F59E0B', // Bold yellow bottom border
        borderTop: '2px solid #F59E0B', // Thick yellow top border
      }}
    >
      {/* Left Side: PDF Icon, File Name, and Size */}
      <div className="flex items-center gap-4 flex-grow">
        {/* PDF Icon */}
        <img src="/pdf.svg" alt="PDF Icon" className="w-10 h-10" />

        {/* File Name and Size */}
        <div className="text-left">
          <div className="font-semibold">{fileName || 'Brochure'}</div>
          {fileSize && <div className="text-sm text-gray-500">{fileSize}</div>}
        </div>
      </div>

      {/* Right Side: Preview and Download Buttons */}
      <div className="flex space-x-4">
        <button onClick={handlePreview} className="flex flex-col items-center text-gray-800">
          <Eye className="w-6 h-6" />
          <span className="text-sm">Preview</span>
        </button>
        <button onClick={handleDownload} className="flex flex-col items-center text-gray-800">
          <Download className="w-6 h-6" />
          <span className="text-sm">Download</span>
        </button>
      </div>
    </div>
  );
};

export default FilePreview;