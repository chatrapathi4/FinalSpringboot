package com.example.store.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.store.entity.Product;
import com.example.store.repository.ProductRepository;
@Service
public class ProductService {
private final ProductRepository repo;
public ProductService(ProductRepository repo) {
this.repo = repo;
}
public Product save(Product product) {
return repo.save(product);
}
public List<Product> getAll() {
return repo.findAll();
}
}