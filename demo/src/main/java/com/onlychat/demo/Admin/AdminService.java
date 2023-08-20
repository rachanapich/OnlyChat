package com.onlychat.demo.Admin;

public interface AdminService {
    LoginResponse login(String email, String password);
    Admin createAdmin(Admin admin);
}
