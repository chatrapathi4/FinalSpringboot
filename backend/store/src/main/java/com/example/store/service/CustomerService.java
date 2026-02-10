package com.example.store.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.store.entity.Customer;
import com.example.store.repository.CustomerRepository;
@Service
public class CustomerService {
private final CustomerRepository repo;
public CustomerService(CustomerRepository repo) {
this.repo = repo;
}
public Customer save(Customer customer) {
return repo.save(customer);
}
public List<Customer> getAll() {
return repo.findAll();
}
}