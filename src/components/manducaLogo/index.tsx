import React from 'react';
import manducaLogo from '../../assets/manduca-logo.webp'

const ManducaLogo: React.FC = () => {
  return (
    <img
      src={manducaLogo}
      alt="Publifer Logo"
      className="w-16 h-auto" 
    />
  );
};

export default ManducaLogo;