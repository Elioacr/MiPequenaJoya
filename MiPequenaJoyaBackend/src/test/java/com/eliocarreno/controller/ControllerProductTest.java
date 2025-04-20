package com.eliocarreno.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.eliocarreno.model.Product;
import com.eliocarreno.service.ServiceProduct;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
public class ControllerProductTest {

    private MockMvc mockMvc;

    @Mock
    private ServiceProduct serviceProduct;

    @InjectMocks
    private ControllerProduct controllerProduct;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(controllerProduct).build();
    }

    @Test
    void testGetAllProducts() throws Exception {
        Product product1 = new Product(1L, "Anillo", "Un anillo elegante", "anillos", 100.0, 10);
        Product product2 = new Product(2L, "Collar", "Un collar clásico", "collares", 200.0, 5);
        when(serviceProduct.getAll()).thenReturn(Arrays.asList(product1, product2));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Anillo"))
                .andExpect(jsonPath("$[1].name").value("Collar"));
    }

    @Test
    void testAddProduct_ValidInput() throws Exception {
        Product newProduct = new Product(null, "Pulsera", "Una pulsera brillante", "pulseras", 300.0, 8);
        Product savedProduct = new Product(3L, "Pulsera", "Una pulsera brillante", "pulseras", 300.0, 8);
        when(serviceProduct.insertProduct(any(Product.class))).thenReturn(savedProduct);

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProduct)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3L))
                .andExpect(jsonPath("$.name").value("Pulsera"));
    }

    @Test
    void testSellProduct_SuccessfulSale() throws Exception {
        Long productId = 1L;
        Integer quantity = 2;
        when(serviceProduct.sellProduct(productId, quantity)).thenReturn(Optional.of(new Product()));

        mockMvc.perform(post("/api/products/{id}", productId)
                .param("quantity", String.valueOf(quantity)))
                .andExpect(status().isOk())
                .andExpect(content().string("Venta exitosa"));
    }

    @Test
    void testSellProduct_InsufficientStock() throws Exception {
        Long productId = 1L;
        Integer quantity = 20;
        when(serviceProduct.sellProduct(productId, quantity)).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/products/{id}", productId)
                .param("quantity", String.valueOf(quantity)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No hay suficiente stock"));
    }
}