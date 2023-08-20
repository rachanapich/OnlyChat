package com.onlychat.demo.Dashboard;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "dashboard")
public class Dashboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer activeUsers;

    private Integer totalUsers;

    private Integer totalMessages;
     
    private Integer totalGroups;

    private Integer activeGroups;
}
