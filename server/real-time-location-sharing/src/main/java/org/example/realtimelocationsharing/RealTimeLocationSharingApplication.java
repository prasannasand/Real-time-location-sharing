package org.example.realtimelocationsharing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class RealTimeLocationSharingApplication {

    public static void main(String[] args) {
        SpringApplication.run(RealTimeLocationSharingApplication.class, args);
        System.out.println("Test");
//        ConfigurableApplicationContext context = SpringApplication.run(RealTimeLocationSharingApplication.class, args);
//        UserRepository userRepository = context.getBean(UserRepository.class);
//        userRepository.save(new User("testuser", "testpass", "testemail@example.com"));
//        context.close();
    }

}
