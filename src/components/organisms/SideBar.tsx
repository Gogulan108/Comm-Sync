import React, { useState, useRef, useEffect } from 'react';

import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import AddChannelDialog from '../molecules/addChannelDialog/AddChannelDialog';
import { useGetAllChannels } from '../../api/hooks/useGetAllChannels';
import Button from '../atoms/button/Button';

type SidebarProps = {
  selectedChannel: any;
  onSelectChannel: (val) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedChannel, onSelectChannel }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [openAddChannel, setOpenAddChannel] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fetch channels from Firestore
  const { data, isLoading, isError, error, refetch } = useGetAllChannels();

  const handleAddChannel = () => setOpenAddChannel(true);

  const handleAddChannelSubmit = (data: {
    name: string;
    description: string;
    isPrivate: boolean;
  }) => {
    refetch();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Parse Firestore snapshot to array
  let channels: any[] = [];
  if (data) {
    channels = data.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopoverOpen(false);
      }
    }
    if (popoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverOpen]);

  return (
    <aside className="w-64 bg-gray-100 text-black flex flex-col">
      <div className="p-4 font-bold text-xl border-b border-gray-800">Comm-Sync Workspace</div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="mb-2 text-xs text-gray-600 uppercase tracking-wider font-semibold">
          Channels
        </div>
        {isLoading && <div className="text-xs text-gray-400">Loading channels...</div>}
        {isError && (
          <div className="text-xs text-red-500">
            Failed to load channels: {error?.message}
            <button className="ml-2 underline" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
        {!isLoading &&
          !isError &&
          channels.map((channel) => (
            <div
              key={channel.id}
              className={`
                mb-2 cursor-pointer rounded-lg px-3 py-2 transition-all
                ${
                  selectedChannel.id === channel.id
                    ? 'bg-blue-100 font-bold text-blue-900'
                    : 'hover:bg-gray-200 font-medium'
                }
              `}
              title={channel.description}
              onClick={() => onSelectChannel(channel)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">#{channel.name}</span>
                {channel.isPrivate && (
                  <span className="text-xs text-white bg-gray-700 px-1 rounded">private</span>
                )}
              </div>
              <div className="text-xs text-gray-400 truncate">{channel.lastMessage || ''}</div>
              <div className="text-[10px] text-gray-500">
                {channel.lastMessageAt
                  ? new Date(
                      channel.lastMessageAt.seconds
                        ? channel.lastMessageAt.seconds * 1000
                        : channel.lastMessageAt
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </div>
            </div>
          ))}
      </nav>
      <div className="p-4 cursor-pointer text-sm" onClick={handleAddChannel}>
        +Add Channels
      </div>
      <AddChannelDialog
        open={openAddChannel}
        onClose={() => setOpenAddChannel(false)}
        onSubmit={handleAddChannelSubmit}
      />
      <div className="p-4 border-t border-gray-800">
        <div className="flex flex-col items-start gap-2 relative">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <button
              className="focus:outline-none cursor-pointer"
              onClick={() => setPopoverOpen((v) => !v)}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                  {user?.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </button>
            <span className="text-gray-800 font-medium">{user?.displayName}</span>
          </div>
          {/* Popover */}
          {popoverOpen && (
            <div
              ref={popoverRef}
              className="absolute left-0 -top-52 bg-white border rounded shadow-lg z-50 w-52 p-3"
            >
              <div className="flex items-center justify-center">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                    {user?.displayName?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="mb-2 flex flex-col items-center justify-center">
                <div className="font-semibold text-gray-800">{user?.displayName}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <Button
                className="w-full mb-2 bg-blue-500 text-white"
                onClick={() => {
                  setPopoverOpen(false);
                  alert('Edit Profile coming soon!');
                }}
              >
                Edit Profile
              </Button>
              <Button className="w-full bg-red-500 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
