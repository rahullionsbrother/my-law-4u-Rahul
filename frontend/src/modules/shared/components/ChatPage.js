/**
 * ==============================================================================
 * MYLAW.COM - CHAT LAYOUT COMPONENT
 * ==============================================================================
 * Provides a responsive, flexbox-based chat UI that avoids overflow issues.
 */

import React, { useState, useRef, useEffect } from 'react';

const MOCK_CONVERSATIONS = [
  { id: 1, name: 'Adv. Rajesh Sharma', last: 'I checked your case file.' },
  { id: 2, name: 'Adv. Priya Desai', last: 'Please upload the document.' },
  { id: 3, name: 'Adv. Ankit Mehra', last: 'Court date has been updated.' },
  { id: 4, name: 'Adv. Khanna', last: 'Let us discuss the strategy.' },
];

const MOCK_MESSAGES = {
  1: [
    { id: 'm1', direction: 'in', text: 'Hello! I reviewed your case.' },
    { id: 'm2', direction: 'out', text: 'Thanks, could you propose next steps?' },
    { id: 'm3', direction: 'in', text: 'Sure. I am scheduling a call for tomorrow.' },
  ],
  2: [
    { id: 'm4', direction: 'in', text: 'Can you share the signed agreement?' },
    { id: 'm5', direction: 'out', text: 'Uploading now.' },
  ],
  3: [
    { id: 'm6', direction: 'in', text: 'Your hearing date is 5th April.' },
    { id: 'm7', direction: 'out', text: 'Noted, thank you.' },
  ],
  4: [
    { id: 'm8', direction: 'in', text: 'I suggest we file a petition first.' },
  ],
};

const ChatPage = () => {
  const [activeId, setActiveId] = useState(1);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeId, messages]);

  const sendMessage = () => {
    if (!draft.trim()) return;

    const next = {
      id: `m-${Date.now()}`,
      direction: 'out',
      text: draft.trim(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), next],
    }));

    setDraft('');
  };

  return (
    <div className="chat-page h-100 d-flex flex-column">
      <div className="chat-header border-bottom px-3 py-2 d-flex align-items-center justify-content-between">
        <h4 className="mb-0">Messages</h4>
        <span className="small text-secondary">Active conversations: {MOCK_CONVERSATIONS.length}</span>
      </div>

      <div className="chat-layout flex-1 d-flex overflow-hidden">

        <aside className="chat-list border-end bg-white d-flex flex-column" aria-label="Chat list">
          <div className="chat-list-inner overflow-y-auto flex-1">
            {MOCK_CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                className={`chat-list-item d-flex flex-column text-start p-3 border-0 w-100 ${activeId === conv.id ? 'active':''}`}
                onClick={() => setActiveId(conv.id)}
              >
                <strong>{conv.name}</strong>
                <small className="text-muted" style={{ fontSize: '0.8rem' }}>{conv.last}</small>
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-window d-flex flex-column flex-1 min-w-0">
          <div
            ref={scrollRef}
            className="chat-history flex-1 overflow-y-auto p-3"
            aria-live="polite"
          >
            {(messages[activeId] || []).map((msg) => (
              <div key={msg.id} className={`chat-msg d-inline-block mb-2 p-2 rounded ${msg.direction === 'in' ? 'incoming' : 'outgoing'} `}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input border-top p-2 d-flex gap-2 align-items-center">
            <textarea
              className="form-control flex-1"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={1}
              placeholder="Type your message..."
              style={{ resize: 'none', minHeight: '42px' }}
            />
            <button className="btn btn-primary" type="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ChatPage;
