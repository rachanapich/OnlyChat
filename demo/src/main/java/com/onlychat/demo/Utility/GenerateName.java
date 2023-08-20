package com.onlychat.demo.Utility;
import com.github.javafaker.Faker;

public class GenerateName {
    public static String generateName() {
        Faker faker = new Faker();
//        return faker.animal().name();
        return faker.superhero().name();
    }
}
