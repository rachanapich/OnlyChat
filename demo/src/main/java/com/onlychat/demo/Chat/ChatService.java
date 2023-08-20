package com.onlychat.demo.Chat;

import com.onlychat.demo.GroupChat.GroupChat;

public interface ChatService {
    Chat createChat(String message, String groupId, String userId);
}
