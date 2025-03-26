'use client';

import { Download, Eye } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface FilePreviewProps {
  fileName: string;
  fileUrl: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileName, fileUrl }) => {
  const [fileSize, setFileSize] = useState<string>('');
  const [isLoadingSize, setIsLoadingSize] = useState<boolean>(false);

  const fetchFileSize = useCallback(async () => {
    setIsLoadingSize(true);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const sizeInBytes = blob.size;
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);
      setFileSize(`${sizeInKB} KB`);
    } catch (error) {
      console.error('Error fetching file size:', error);
    } finally {
      setIsLoadingSize(false);
    }
  }, [fileUrl]);

  useEffect(() => {
    fetchFileSize();
  }, [fetchFileSize]);

  const handlePreview = useCallback(() => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  }, [fileUrl]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'Brochure.pdf';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [fileUrl, fileName]);

  return (
    <div
      className="flex items-center justify-between border border-gray-300 rounded-lg p-4 w-full max-w-md shadow-md"
      style={{
        borderBottom: '4px solid #F59E0B',
        borderTop: '2px solid #F59E0B',
      }}
    >
      {/* Left Side: PDF Icon, File Name, and Size */}
      <div className="flex items-center gap-4 flex-grow">
        {/* PDF Icon using next/image */}
        <div className="relative w-10 h-10">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/pdf.svg`}
            alt="PDF Icon"
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>

        {/* File Name and Size */}
        <div className="text-left min-w-0">
          <div className="font-semibold truncate">{fileName || 'Brochure'}</div>
          {isLoadingSize ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            fileSize && <div className="text-sm text-gray-500">{fileSize}</div>
          )}
        </div>
      </div>

      {/* Right Side: Preview and Download Buttons */}
      <div className="flex space-x-4">
        <button 
          onClick={handlePreview} 
          className="flex flex-col items-center text-gray-800 hover:text-yellow-600 transition-colors"
          aria-label="Preview file"
        >
          <Eye className="w-6 h-6" />
          <span className="text-sm">Preview</span>
        </button>
        <button 
          onClick={handleDownload} 
          className="flex flex-col items-center text-gray-800 hover:text-yellow-600 transition-colors"
          aria-label="Download file"
        >
          <Download className="w-6 h-6" />
          <span className="text-sm">Download</span>
        </button>
      </div>
    </div>
  );
};

export default FilePreview;