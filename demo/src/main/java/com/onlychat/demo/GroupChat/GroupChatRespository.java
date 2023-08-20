package com.onlychat.demo.GroupChat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface GroupChatRespository extends JpaRepository<GroupChat,String> {
    @Query("SELECT DISTINCT gc FROM GroupChat gc LEFT JOIN FETCH gc.participants")
    List<GroupChat> findAllWithParticipants();
}

