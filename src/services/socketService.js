import io from 'socket.io-client';

let socket = null;

const SOCKET_URL = 'http://localhost:5000';

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('join_room', userId);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  return socket;
};

export const joinRoom = (userId) => {
  if (socket) {
    socket.emit('join_room', userId);
  }
};

export const sendMessage = (senderId, receiverId, message) => {
  if (socket) {
    socket.emit('send_message', {
      senderId,
      receiverId,
      message,
    });
  }
};

export const onReceiveMessage = (callback) => {
  if (socket) {
    socket.on('receive_message', callback);
  }
};

export const onMessageSent = (callback) => {
  if (socket) {
    socket.on('message_sent', callback);
  }
};

export const userTyping = (senderId, receiverId) => {
  if (socket) {
    socket.emit('user_typing', { senderId, receiverId });
  }
};

export const userStopTyping = (senderId, receiverId) => {
  if (socket) {
    socket.emit('user_stop_typing', { senderId, receiverId });
  }
};

export const boothVisit = (companyId, studentName) => {
  if (socket) {
    socket.emit('booth_visit', { companyId, studentName });
  }
};

export const onNewVisitor = (callback) => {
  if (socket) {
    socket.on('new_visitor', callback);
  }
};
