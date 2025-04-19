package com.eliocarreno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eliocarreno.model.Product;
import com.eliocarreno.service.ServiceProduct;

import jakarta.validation.Valid;

@RestController  
@RequestMapping("/api/products")  
public class ControllerProduct {
	
	@Autowired  
    private final ServiceProduct serviceProduct;  

    public ControllerProduct(ServiceProduct serviceProduct) {  
        this.serviceProduct = serviceProduct;  
    }  

    @GetMapping  
    public List<Product> getAllProducts() {  
        return serviceProduct.getAll();  
    }  

    @PostMapping  
    public ResponseEntity<?> addProduct(@Valid @RequestBody Product product, BindingResult validations) {  
        if (validations.hasErrors()) {  
            return ResponseEntity.badRequest().body("Errores de validación: " + validations.getAllErrors());  
        }  
        Product addedProduct = serviceProduct.insertProduct(product);  
        return ResponseEntity.ok(addedProduct);  
    }  

    @PostMapping("/{id}")  
    public ResponseEntity<String> sellProduct(@PathVariable Long id, @RequestParam Integer quantity) {  
        return serviceProduct.sellProduct(id, quantity)  
                .map(product -> ResponseEntity.ok("Venta exitosa"))  
                .orElse(ResponseEntity.badRequest().body("No hay suficiente stock"));  
    }
}