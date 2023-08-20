package com.onlychat.demo.Utility;

public class AvatarUrlGenerator {
    private static final String AVATAR_URL_TEMPLATE = "https://avatars.dicebear.com/api/identicon/{superhero}.svg";
    public static String generateAvatarUrl(String randomName) {
        String superheroName = randomName.replaceAll(" ", "-");
        String avatarUrl = AVATAR_URL_TEMPLATE.replace("{superhero}", superheroName);
        return avatarUrl;
    }
}
