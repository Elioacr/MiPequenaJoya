package com.eliocarreno.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.eliocarreno.model.Product;

@Repository
public interface RepositoryProduct extends CrudRepository<Product, Long> {
	List<Product> findAll();
}