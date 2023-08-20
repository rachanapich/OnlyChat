package com.onlychat.demo.Home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/test")
    public String index2() {
        return "index2.html";
    }
}


