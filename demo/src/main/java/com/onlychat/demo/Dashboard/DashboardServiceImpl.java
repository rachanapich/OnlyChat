package com.onlychat.demo.Dashboard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlychat.demo.GroupChat.GroupChat;
import com.onlychat.demo.GroupChat.GroupChatService;

@Service
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    DashboardRepository dashboardRepo;

    @Autowired
    GroupChatService groupChatService;


    @Override
    public Integer countByActiveUsers() {
        Integer activeUsers = 0;
        List<GroupChat> groups = groupChatService.getGroups();
        for (GroupChat group : groups) {
            activeUsers += group.getParticipants().size();
        }
        return activeUsers;
    }

    @Override
    public Integer countByTotalUsers(Long id) {
        return dashboardRepo.findById(id).orElse(null).getTotalUsers();
    }

    @Override
    public Integer countByTotalMessages(Long id) {
        Dashboard dash = dashboardRepo.findById(id).orElse(null);
        Integer msgInDb = dash.getTotalMessages();
        List<GroupChat> groups = groupChatService.getGroups();
        for (GroupChat group : groups) {
            msgInDb += group.getChats().size();
        }
        dash.setTotalMessages(msgInDb);
        return dash.getTotalMessages();
    }

    @Override
    public Integer countByTotalGroups() {
        return dashboardRepo.findById((long) 1).orElse(null).getTotalGroups();
    }

    @Override
    public Integer countByActiveGroups() {
        List<GroupChat> groups = groupChatService.getGroups();
        Integer activeGroups = 0;
        for (GroupChat group : groups) {
            if(group.getParticipants().size() > 0){
                activeGroups++;
            }
        }
        return activeGroups;
    }

    @Override
    public Integer addTotalUser(Integer user, Long id) {
        Dashboard dash = dashboardRepo.findById(id).orElse(null);
        dash.setTotalUsers(dash.getTotalUsers() + user);
        return dash.getTotalUsers();
    }

    @Override
    public Dashboard createDashboard(Dashboard dashboard) {
        return dashboardRepo.save(dashboard);
    }

    @Override
    public Integer updateTotalGroups(Long id) {
        Integer previous = dashboardRepo.findById(id).orElse(null).getTotalGroups();
        Integer currentGroups = countByTotalGroups();
        if (previous < currentGroups) {
            dashboardRepo.save(dashboardRepo.findById(id).orElse(null));
        } else {
            Integer diff = currentGroups - previous;
            dashboardRepo.findById(id).orElse(null).setTotalGroups(diff);
            dashboardRepo.save(dashboardRepo.findById(id).orElse(null));
        }
        Integer total = dashboardRepo.findById(id).orElse(null).getTotalGroups();
        return total;
    }

    @Override
    public void addGroupChat(Long id) {
        Dashboard dash = dashboardRepo.findById(id).orElse(null);
        dash.setTotalGroups(dash.getTotalGroups() + 1);
        dashboardRepo.save(dash);
    }

    @Override
    public void addUsers(Long id) {
        Dashboard dash = dashboardRepo.findById(id).orElse(null);
        dash.setTotalUsers(dash.getTotalUsers() + 1);
        dashboardRepo.save(dash);
    }
}
