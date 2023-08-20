package com.onlychat.demo.Chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.onlychat.demo.GroupChat.GroupChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
@RestController
@RequestMapping("/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ObjectMapper objectMapper;
    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody String requestJsonData) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(requestJsonData);
        String groupId = jsonNode.get("group_id").asText();
        String message = jsonNode.get("message").asText();
        String userId = jsonNode.get("user_id").asText();
        System.out.println(requestJsonData);
        Chat chat = chatService.createChat(message, groupId, userId);

        return new ResponseEntity<>(chat, HttpStatus.CREATED);
    }

}
