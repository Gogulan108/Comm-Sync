import React, { useState } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import ThreadSlider from './ThreadSlider';
import ChatArea from './ChatArea';

const Dashboard: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState({});
  const [threadMessage, setThreadMessage] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar selectedChannel={selectedChannel} onSelectChannel={setSelectedChannel} />
      <div className="flex flex-col flex-1">
        <Header selectedChannel={selectedChannel} />
        <div className="flex flex-1 relative overflow-hidden">
          <div
            className={`transition-all duration-300 h-full ${threadMessage ? 'w-[calc(100%-24rem)]' : 'w-full'}`}
          >
            <ChatArea channelId={selectedChannel} onOpenThread={setThreadMessage} />
          </div>
          <div
            className={`transition-all duration-300 h-full ${threadMessage ? 'w-96' : 'w-0'} overflow-hidden`}
          >
            <ThreadSlider
              open={!!threadMessage}
              message={threadMessage}
              channelId={selectedChannel?.id ?? ''}
              onClose={() => setThreadMessage(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
