package com.onlychat.demo.Admin;

public class LoginResponse {
    private Admin admin;
    private String loggedIn;

    public Admin getAdmin() {
        return admin;
    }

    public void setAdmin(Admin admin) {
        this.admin = admin;
    }

    public String getLoggedIn() {
        return loggedIn;
    }

    public void setLoggedIn(String loggedIn) {
        this.loggedIn = loggedIn;
    }

    public LoginResponse(Admin admin, boolean loggedIn) {
        this.admin = admin;
        this.loggedIn = loggedIn ? "true" : "false";
    }
}
