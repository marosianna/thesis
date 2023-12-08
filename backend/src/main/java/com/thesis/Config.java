package com.thesis;

import com.thesis.entity.User;
import com.thesis.repository.UserRepository;
import com.thesis.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
@Slf4j
@Configuration
public class Config {

    /*
    @Bean
    CommandLineRunner commandLineRunner(final UserRepository userRepository, final UserService userService) {
        return args -> {
            User u1 = new User(1L,"asd", "asd");
            User u2 = new User(2L,"asd1", "asd");
            User u3 = new User(3L,"asd2", "asd");
            User u4 = new User(4L, "asd3", "asd");
            userRepository.save(u1);
            userRepository.save(u2);
            userRepository.save(u3);
            userRepository.save(u4);
            List<User> users = userRepository.findAll();
            userService.userList(users);
        };
    }

     */
}
