package com.onlychat.demo.Dashboard;

public interface DashboardService {
    Dashboard createDashboard(Dashboard dashboard);
    Integer countByActiveUsers();
    Integer countByTotalUsers(Long id);
    Integer countByTotalMessages(Long id);
    Integer countByTotalGroups();
    Integer countByActiveGroups();
    Integer addTotalUser(Integer user, Long id);
    Integer updateTotalGroups(Long id);
    void addGroupChat(Long id);
    void addUsers(Long id);
}
