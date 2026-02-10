package com.example.store.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.store.entity.Customer;
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}