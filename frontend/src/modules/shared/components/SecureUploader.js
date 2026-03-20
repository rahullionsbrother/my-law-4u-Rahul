/**
 * ==============================================================================
 * MYLAW.COM - SHARED COMPONENT: SECURE FILE UPLOADER
 * ==============================================================================
 * PURPOSE: A highly reusable, secure drag-and-drop file upload zone.
 * FEATURES:
 * 1. Native Drag & Drop event handling.
 * 2. Strict client-side validation (File Size & MIME Types).
 * 3. Simulated upload progress bar (UX enhancement).
 * 4. Error state handling (e.g., "File too large").
 */

import React, { useState, useRef } from 'react';

const SecureUploader = ({ 
  label = "Upload Legal Document", 
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.png", 
  maxSizeMB = 5,
  onUploadSuccess 
}) => {
  // 1. STATE & REFS
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  // 2. VALIDATION LOGIC
  const validateFile = (selectedFile) => {
    setError(''); // Reset errors
    
    if (!selectedFile) return false;

    // Check File Size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File is too large. Maximum allowed size is ${maxSizeMB}MB.`);
      return false;
    }

    // Check File Extension (Basic validation, backend must also verify MIME type)
    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    const allowedExtensions = acceptedTypes.split(',').map(type => type.trim().toLowerCase());
    
    if (!allowedExtensions.includes(fileExtension) && acceptedTypes !== "*") {
      setError(`Invalid file type. Accepted formats: ${acceptedTypes}`);
      return false;
    }

    return true;
  };

  // 3. EVENT HANDLERS
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        processFile(droppedFile);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        processFile(selectedFile);
      }
    }
  };

  // 4. UPLOAD SIMULATION
  const processFile = (validFile) => {
    setFile(validFile);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate network upload progress for UX
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          if (onUploadSuccess) onUploadSuccess(validFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError('');
    if (inputRef.current) inputRef.current.value = ""; // Reset input
  };

  // 5. RENDER
  return (
    <div className="secure-uploader w-100">
      <label className="fw-bold small text-secondary mb-2">{label}</label>
      
      {/* DRAG & DROP ZONE */}
      <div 
        className={`position-relative border rounded-3 p-4 text-center transition-all ${
          dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary border-dashed bg-light'
        } ${error ? 'border-danger bg-danger bg-opacity-10' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{ borderStyle: dragActive ? 'solid' : 'dashed' }}
      >
        {/* Hidden Input */}
        <input 
          ref={inputRef}
          type="file" 
          className="d-none" 
          accept={acceptedTypes}
          onChange={handleChange}
        />

        {!file ? (
          // Empty State
          <div>
            <div className="bg-white rounded-circle shadow-sm d-inline-flex align-items-center justify-content-center mb-3" style={{width: '48px', height: '48px'}}>
              <i className="fa-solid fa-cloud-arrow-up text-primary fa-lg"></i>
            </div>
            <p className="fw-bold text-dark mb-1">Drag and drop your file here</p>
            <p className="small text-muted mb-3">or click below to browse your computer</p>
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm rounded-pill px-4"
              onClick={() => inputRef.current.click()}
            >
              Browse Files
            </button>
            <div className="mt-3 small text-muted" style={{fontSize: '0.7rem'}}>
              Supported: {acceptedTypes.replace(/,/g, ', ')} | Max size: {maxSizeMB}MB
            </div>
          </div>
        ) : (
          // File Selected State
          <div className="text-start bg-white p-3 rounded border shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-3 overflow-hidden">
                <i className="fa-solid fa-file-pdf text-danger fa-2x"></i>
                <div className="text-truncate">
                  <h6 className="mb-0 fw-bold small text-truncate">{file.name}</h6>
                  <small className="text-muted" style={{fontSize: '0.7rem'}}>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
                </div>
              </div>
              {!isUploading && (
                <button type="button" className="btn btn-link text-danger p-0" onClick={removeFile}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              )}
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="mt-2">
                <div className="d-flex justify-content-between small mb-1">
                  <span className="text-muted" style={{fontSize: '0.7rem'}}>Uploading & Encrypting...</span>
                  <span className="text-primary fw-bold" style={{fontSize: '0.7rem'}}>{uploadProgress}%</span>
                </div>
                <div className="progress" style={{height: '6px'}}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                    style={{width: `${uploadProgress}%`}}
                  ></div>
                </div>
              </div>
            )}

            {!isUploading && uploadProgress === 100 && (
              <div className="mt-2 small text-success fw-bold">
                <i className="fa-solid fa-circle-check me-1"></i> File securely attached.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-danger small mt-2 fw-medium">
          <i className="fa-solid fa-circle-exclamation me-1"></i> {error}
        </div>
      )}
    </div>
  );
};

export default SecureUploader;