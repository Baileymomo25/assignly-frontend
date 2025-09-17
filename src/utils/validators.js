export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePhone = (phone) => {
    const re = /^\+?[\d\s-()]{10,}$/;
    return re.test(phone);
  };
  
  export const validateRequired = (value) => {
    return value && value.trim().length > 0;
  };
  
  export const validateFile = (file) => {
    if (!file) return true; // File is optional
    
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      return 'File type not supported. Please upload PDF, DOC, DOCX, PPT, PPTX, TXT, ZIP, or RAR files.';
    }
    
    if (file.size > maxSize) {
      return 'File size too large. Maximum size is 10MB.';
    }
    
    return true;
  };