package com.onlychat.demo.Dashboard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface DashboardRepository extends JpaRepository<Dashboard, Long>{
    Integer countByActiveUsers(Integer activeUsers);
}
