package com.onlychat.demo.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    AdminRepository adminRepository;

    @Override
    public LoginResponse login(String email, String password) {
        if (email == null || password == null) {
            return new LoginResponse(null, false);
        }
        Admin admin = adminRepository.findByEmail(email).orElse(null);
        if (admin == null) {
            return new LoginResponse(null, false);
        } else {
            if (admin.getPassword().equals(password)) {
                return new LoginResponse(admin, true);
            } else {
                Admin user = new Admin();
                user.setEmail(email);
                user.setPassword(password);
                return new LoginResponse(user, false);
            }
        }

    }

    @Override
    public Admin createAdmin(Admin admin) {
        System.out.println(admin.getEmail() + " " + admin.getPassword());
        if (admin.getEmail() == null || admin.getPassword() == null) {
            return null;
        }
        adminRepository.save(admin);
        return admin;
    }

}
