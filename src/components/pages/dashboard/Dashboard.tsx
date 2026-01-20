import React, { useState } from 'react';
import Sidebar from '../../organisms/SideBar';
import Header from '../../organisms/Header';
import ThreadSlider from '../../organisms/ThreadSlider';
import ChatArea from '../../organisms/ChatArea';
import DmChatArea from '../../organisms/DmChatArea';

const Dashboard: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState({});
  const [selectedDmUser, setSelectedDmUser] = useState(null);
  const [viewType, setViewType] = useState<'channel' | 'dm'>('channel');
  const [threadMessage, setThreadMessage] = useState(null);

  // You should fetch dmUsers from context, props, or API
  const dmUsers = []; // TODO: Replace with actual DM users data

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        selectedChannel={selectedChannel}
        onSelectChannel={(channel) => {
          setSelectedChannel(channel);
          setViewType('channel');
        }}
        dmUsers={dmUsers}
        onSelectDmUser={(user) => {
          setSelectedDmUser(user);
          setViewType('dm');
        }}
        selectedDmUser={selectedDmUser}
      />
      <div className="flex flex-col flex-1">
        <Header selectedChannel={selectedChannel} />
        <div className="flex flex-1 relative overflow-hidden">
          <div
            className={`transition-all duration-300 h-full ${threadMessage ? 'w-[calc(100%-24rem)]' : 'w-full'}`}
          >
            {viewType === 'channel' ? (
              <ChatArea channelId={selectedChannel} onOpenThread={setThreadMessage} />
            ) : (
              <DmChatArea user={selectedDmUser} onOpenThread={setThreadMessage} />
            )}
          </div>
          <div
            className={`transition-all duration-300 h-full ${threadMessage ? 'w-96' : 'w-0'} overflow-hidden`}
          >
            <ThreadSlider
              open={!!threadMessage}
              message={threadMessage}
              channelId={
                viewType === 'channel' ? (selectedChannel?.id ?? '') : (selectedDmUser?.id ?? '')
              }
              onClose={() => setThreadMessage(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
