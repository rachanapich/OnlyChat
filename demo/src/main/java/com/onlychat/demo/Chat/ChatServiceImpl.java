package com.onlychat.demo.Chat;

import com.onlychat.demo.GroupChat.GroupChat;
import com.onlychat.demo.User.User;
import com.onlychat.demo.GroupChat.GroupChatRespository;
import com.onlychat.demo.User.UserRespository;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatServiceImpl implements ChatService {
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    ChatRespository chat_repo;
    @Autowired
    UserRespository user_repo;
    @Autowired
    GroupChatRespository group_chat_repo;    @Autowired
    public ChatServiceImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }


    @Override
    public Chat createChat(String message, String groupId, String userId) {
        Chat chat = new Chat();
        chat.setMessage(message);
        chat.setTimestamp(LocalDateTime.now());
        GroupChat groupChat = group_chat_repo.findById(groupId).orElse(null);
        chat.setGroupChat(groupChat);
        User user = user_repo.findById(userId).orElse(null);
        chat.setSender(user);
        chat_repo.save(chat);

        // Update the last activity time of the group chat to current time
        groupChat.updateLastActivityTime();
        group_chat_repo.save(groupChat);
        
        // Send the chat message to the WebSocket subscribers
        messagingTemplate.convertAndSend("/topic/group/" + groupId, chat);
        return chat;
    }
}
