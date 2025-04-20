package com.eliocarreno;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.eliocarreno.model.Product;
import com.eliocarreno.repository.RepositoryProduct;

@SpringBootApplication
public class MiPequenaJoyaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiPequenaJoyaApplication.class, args);
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
	
	@Bean
    CommandLineRunner initDatabase(RepositoryProduct repositoryProduct) {
        return args -> {
            long count = repositoryProduct.count();
            if (count == 0) {
                Product[] products = {
                    new Product(1L, "Anillo de compromiso", "Un anillo elegante para ocasiones especiales", "anillos", 1500.0, 10),
                    new Product(2L, "Collar de perlas", "Un collar clásico con perlas naturales", "collares", 1200.0, 5),
                    new Product(4L, "Pulsera de diamantes", "Una pulsera brillante con diamantes", "pulseras", 2000.0, 8),
                    new Product(5L, "Pendientes de oro", "Pendientes minimalistas de oro", "pendientes", 900.0, 15),
                    new Product(6L, "Reloj de lujo", "Un reloj de alta gama con diseño moderno", "relojes", 3000.0, 3),
                    new Product(7L, "Anillo de plata", "Un anillo sencillo pero elegante", "anillos", 200.0, 20),
                    new Product(8L, "Collar de diamantes", "Un collar exclusivo con diamantes", "collares", 4000.0, 2),
                    new Product(9L, "Pulsera de plata", "Una pulsera versátil de plata", "pulseras", 150.0, 25)
                };

                for (Product product : products) {
                	repositoryProduct.save(product);
                }

                System.out.println("Productos iniciales agregados correctamente.");
            } else {
                System.out.println("Los productos ya existen en la base de datos. No se han creado nuevos productos.");
            }
        };
    }

}
