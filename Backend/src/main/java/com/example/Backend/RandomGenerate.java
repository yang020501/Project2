package com.example.Backend;

import java.util.Random;

public class RandomGenerate {
    public static String GenerateId(int number){
        String id = "";
        String setOfCharacters = "qwertyuiopasdfghjklzxcvbnm1234567890@+=";
        Random r = new Random();
        for(int i=0; i<number; i++){
            char key = setOfCharacters.charAt(r.nextInt(setOfCharacters.length()));
            id += key;
        }
        return id;
    }
}
