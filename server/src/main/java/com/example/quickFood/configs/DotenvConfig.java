package com.example.quickFood.configs;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class DotenvConfig {

    @PostConstruct
    public void init() {
        Dotenv dotenv = Dotenv.configure().load();
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
    }
}


