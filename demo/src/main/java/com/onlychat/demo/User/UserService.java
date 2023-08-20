package com.onlychat.demo.User;

public interface UserService {
    User createUser();
    User getUserById(String userId);
    User updateUserById(String userId, String username);
    User deleteUserById(String userId);
}
