package com.onlychat.demo.Utility;

import com.onlychat.demo.GroupChat.GroupChat;
import com.onlychat.demo.GroupChat.GroupChatRespository;
import com.onlychat.demo.GroupChat.GroupChatService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
@EnableScheduling
public class GroupChatCleanupTask {

    @Autowired
    private GroupChatRespository groupChatRepository;

    @Autowired
    private GroupChatService groupChatService;

    @Transactional
    @Scheduled(fixedRate = 1 * 60 * 1000) // Run every 5 minutes
    public void cleanupGroupChats() {
        List<GroupChat> groupChats = groupChatRepository.findAll();
        System.out.println(groupChats);
        for (GroupChat groupChat : groupChats) {
            Date current_time = new Date();
            Date lastActivityTime = groupChat.getLastActivityTime();
            Date group_duration = groupChat.getSetTimeOut();

            // For group chat which have set time out
            if (group_duration != null && group_duration.before(current_time)) {
                groupChatService.deleteGroupById(groupChat.getId());
            }

            // For groupchat without set time out
            if (group_duration == null && isInactive(lastActivityTime)) {
                groupChatService.deleteGroupById(groupChat.getId());
            }  

            
        }
    }

    private boolean isInactive(Date lastActivityTime) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, -60);
        Date thresholdTime = cal.getTime();
        return lastActivityTime.before(thresholdTime);
    }

}
