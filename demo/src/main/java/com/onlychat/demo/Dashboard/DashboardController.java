package com.onlychat.demo.Dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    DashboardService dashboardService;
    
    @GetMapping("/activeUsers")
    public Integer countByActiveUsers() {
        return dashboardService.countByActiveUsers();
    }

    @GetMapping("/totalUsers/{id}")
    public Integer countByTotalUsers(@PathVariable Long id) {
        return dashboardService.countByTotalUsers(id);
    }

    @GetMapping("/totalMessages/{id}")
    public Integer countByTotalMessages(@PathVariable Long id) {
        return dashboardService.countByTotalMessages(id);
    }

    @GetMapping("/totalGroups") 
        public Integer countByTotalGroups() {
            return dashboardService.countByTotalGroups();
    }

    @GetMapping("/activeGroups")
    public Integer countByActiveGroups() {
        return dashboardService.countByActiveGroups();
    }

    @PutMapping("/addTotalUser/{id}")
    public Integer addTotalUser(@RequestBody Integer user, @PathVariable Long id) {
        return dashboardService.addTotalUser(user, id);
    }

    @PostMapping("/create")
    public Dashboard createDashboard(@RequestBody Dashboard dashboard) {
        return dashboardService.createDashboard(dashboard);
    }
}
