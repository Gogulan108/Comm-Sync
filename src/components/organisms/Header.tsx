import React from 'react';

type HeaderProps = {
  selectedChannel: {
    name?: string;
    description?: string;
  };
};

const Header: React.FC<HeaderProps> = ({ selectedChannel }) => (
  <header className="h-16 bg-white border-b border-gray-200 flex flex-col justify-center px-6">
    <div className="font-semibold text-lg truncate">{selectedChannel?.name || ''}</div>
    <div className="font-medium text-xs text-gray-500 truncate">
      {selectedChannel?.description || ''}
    </div>
  </header>
);

export default Header;
