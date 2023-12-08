package com.thesis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MessageController {
    @GetMapping("/messages")
    public ResponseEntity<String> messages() {
        return new ResponseEntity<>("Sikeres bejelentkezés!", HttpStatus.OK);
    }
}
