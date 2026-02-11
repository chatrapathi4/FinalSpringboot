package com.example.store.controllers;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import com.example.store.dto.CustomerDTO;
import com.example.store.dto.ProductDTO;
import com.example.store.entity.Product;
import com.example.store.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    private final ProductService service;
    
    public ProductController(ProductService service) {
        this.service = service;
    }
    
    @PostMapping
    public Product create(@RequestBody Product product) {
        return service.save(product);
    }
    
    @GetMapping
    public List<ProductDTO> getAll() {
        return service.getAll().stream()
            .map(p -> {
                CustomerDTO customerDTO = null;
                if (p.getCustomer() != null) {
                    customerDTO = new CustomerDTO(
                        p.getCustomer().getId(),
                        p.getCustomer().getName(),
                        p.getCustomer().getEmail()
                    );
                }
                return new ProductDTO(
                    p.getId(),
                    p.getProductName(),
                    p.getPrice(),
                    customerDTO
                );
            })
            .collect(Collectors.toList());
    }
}