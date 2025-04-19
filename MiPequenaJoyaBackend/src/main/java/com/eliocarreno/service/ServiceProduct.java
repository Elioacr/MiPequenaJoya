package com.eliocarreno.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eliocarreno.model.Product;
import com.eliocarreno.repository.RepositoryProduct;

@Service
public class ServiceProduct {
	@Autowired
	private final RepositoryProduct repositoryProduct;
	
	public ServiceProduct(RepositoryProduct repositoryProduct) {
        this.repositoryProduct = repositoryProduct;
    }

    public List<Product> getAll() {
        return repositoryProduct.findAll();
    }

    public Product insertProduct(Product producto) {
        return repositoryProduct.save(producto);
    }

    @Transactional
    public Optional<Product> sellProduct(Long id, Integer quantity) {
        return repositoryProduct.findById(id).map(product -> {
            if (product.getStock() >= quantity) {
                product.setStock(product.getStock() - quantity);
                return product;
            }
            return null;
        });
    }
}