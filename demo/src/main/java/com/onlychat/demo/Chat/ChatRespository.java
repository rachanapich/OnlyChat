package com.onlychat.demo.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ChatRespository extends JpaRepository<Chat, String> {
}
