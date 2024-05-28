package org.example.realtimelocationsharing.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Allow this origin to access your API
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify methods allowed
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true);
    }
}