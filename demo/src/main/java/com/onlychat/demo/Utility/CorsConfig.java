package com.onlychat.demo.Utility;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://onlychat.vercel.app/")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     registry.addMapping("/ws/**")
    //             .allowedOriginPatterns("*")
    //             .allowedOrigins("http://localhost:5173")
    //             .allowedMethods("*")
    //             .allowedHeaders("*")
    //             .allowCredentials(true);
    // }
}


