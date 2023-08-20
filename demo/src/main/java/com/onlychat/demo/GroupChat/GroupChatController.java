package com.onlychat.demo.GroupChat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupChatController {

    @Autowired
    private GroupChatService groupChatService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping
    public ResponseEntity<GroupChat> createGroup(@RequestBody String requestJsonData) throws JsonProcessingException  {
        JsonNode jsonNode = objectMapper.readTree(requestJsonData);
        String group_name = jsonNode.get("group_name").asText();
        int given_time= jsonNode.get("given_time").asInt();
        GroupChat groupchat = groupChatService.createGroup(group_name, given_time);
        return new ResponseEntity<>(groupchat, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<GroupChat>> getGroups() {
        List<GroupChat> groupChatList = groupChatService.getGroups();
        return new ResponseEntity<>(groupChatList, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GroupChat>> getActiveGroups() {
        List<GroupChat> groupChatList = groupChatService.getGroups();
        return new ResponseEntity<>(groupChatList, HttpStatus.OK);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupChat> getGroupById(@PathVariable String groupId) {
        GroupChat groupchat = groupChatService.getGroupById(groupId);
        if (groupchat != null) {
            return new ResponseEntity<>(groupchat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("add/{groupId}")
    public ResponseEntity<Map<String, Object>> addToGroupById(@PathVariable String groupId, @RequestBody String requestJsonData) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(requestJsonData);
        String userId = jsonNode.get("user_id").asText();
        Map<String, Object> result = groupChatService.addToGroupById(groupId, userId);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<GroupChat> deleteGroupById(@PathVariable String groupId) {
        GroupChat groupchat = groupChatService.deleteGroupById(groupId);
        if (groupchat != null) {
            return new ResponseEntity<>(groupchat, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{groupId}/status")
    public ResponseEntity<String> getGroupStatusById(@PathVariable String groupId) {
        String result = groupChatService.getGroupStatusById(groupId);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
