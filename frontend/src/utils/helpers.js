export const formatDate = (date) => {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid date';
    
    return d.toLocaleDateString();
  };
  
  export const truncateText = (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    
    return `${text.substring(0, length)}...`;
  };
 
  export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 8) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;
    }
    
    return phoneNumber;
  };
  

  export const getLanguageName = (code) => {
    const languages = {
      'NORD': 'Northern Sami',
      'SØR': 'Southern Sami',
      'LULE': 'Lule Sami',
      'PITE': 'Pite Sami',
      'UME': 'Ume Sami',
      'ENARE': 'Inari Sami',
      'SKOLT': 'Skolt Sami',
      'KILDIN': 'Kildin Sami',
      'AKKALA': 'Akkala Sami',
      'TER': 'Ter Sami'
    };
    
    return languages[code] || code;
  };