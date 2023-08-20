package com.onlychat.demo.GroupChat;

import com.onlychat.demo.Dashboard.DashboardService;
import com.onlychat.demo.User.User;
import com.onlychat.demo.User.UserRespository;
import com.onlychat.demo.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.util.Timer;
import java.util.TimerTask;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.Date;
import org.springframework.messaging.simp.SimpMessagingTemplate;
@Service
public class GroupChatServiceImpl implements GroupChatService{
    private final SimpMessagingTemplate messagingTemplate;
    @Autowired
    public GroupChatServiceImpl(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    @Autowired
    GroupChatRespository group_chat_repo;

    @Autowired
    UserRespository user_repo;

    @Autowired
    private UserService userService;

    @Autowired
    private DashboardService dashboardService;

    @Override
    public GroupChat createGroup(String group_name, int given_time){
        GroupChat returnValue = new GroupChat();
        User user = userService.createUser();
        returnValue.setName(group_name);
        returnValue.setHostId(user.getId());
        returnValue.addParticipant(user);
        // Set time for delete group
        Date set_time = null;
        if (given_time != 0) {
            Date current_time = new Date();
            set_time = new Date(current_time.getTime() + (given_time * 1000)); // Multiply by 1000 to convert seconds to milliseconds
        }
        returnValue.setSetTimeOut(set_time);
        returnValue.setCreated_at(LocalDateTime.now());

        group_chat_repo.save(returnValue);
        dashboardService.addGroupChat((long) 1);
        dashboardService.addUsers((long) 1);
        return returnValue;
    }

    @Override
    public List<GroupChat> getGroups() {
        return group_chat_repo.findAll();
    }

    @Override
    public GroupChat getGroupById(String groupId) {
       return group_chat_repo.findById(groupId).orElse(null);
    }

    @Override
    public Map<String, Object> addToGroupById(String groupId, String userId) {
        GroupChat groupChat = group_chat_repo.findById(groupId).orElse(null);
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        if (groupChat != null) {
            User user = user_repo.findById(userId).orElse(null);
            if (user != null && groupChat.containsUser(user)) {
                result.put("Message","User already in group");
            } else {
                // Create a new user then add to group
                User createdUser = userService.createUser();
                groupChat.addParticipant(createdUser);
                group_chat_repo.save(groupChat);
                result.put("Message","Added User to group");
                result.put("groupChat", groupChat);
                result.put("user", createdUser);
                data.put("groupof", groupChat.getUserCount());
            }
            dashboardService.addUsers((long) 1);
        }
        messagingTemplate.convertAndSend("/topic/group/" + groupId, data);
        return result;
    }


    @Override
    public GroupChat deleteGroupById(String groupId) {
        Timer timer = new Timer();
        final GroupChat[] result = {null};
        
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                GroupChat groupChat = group_chat_repo.findById(groupId).orElse(null);
                if (groupChat != null) {
                    Set<User> users = new HashSet<>(groupChat.getParticipants());
                    for (User user : users) {
                        user.getGroupChats().remove(groupChat);
                    }
                    groupChat.getParticipants().clear();
                    group_chat_repo.save(groupChat);
                    group_chat_repo.deleteById(groupId);
                    for (User user : users) {
                        userService.deleteUserById(user.getId());
                    }
                    result[0] = groupChat; 
                }
            }
        }, 60000);

        try {
            Thread.sleep(60000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Map<String, Object> data = new HashMap<>();
        data.put("status", "deleted");
        messagingTemplate.convertAndSend("/topic/group/" + groupId, data);
        return result[0];
    }

    @Override
    public String getGroupStatusById(String groupId) {
        GroupChat groupChat = group_chat_repo.findById(groupId).orElse(null);
        Map<String, Object> data = new HashMap<>();
        if (groupChat == null) {
            return null;
        }
        data.put("status", "inactive");
        messagingTemplate.convertAndSend("/topic/group/" + groupId, data);
        return data.toString();
    }





}
