import React from 'react';
import publiferLogo from '../../assets/image.webp'

const PubliferLogo: React.FC = () => {
  return (
    <img
      src={publiferLogo}
      alt="Publifer Logo"
      className="w-16 h-auto" 
    />
  );
};

export default PubliferLogo;