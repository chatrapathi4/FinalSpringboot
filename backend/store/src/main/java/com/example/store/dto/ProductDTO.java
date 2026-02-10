package com.example.store.dto;

public class ProductDTO {
    private Long id;
    private String productName;
    private double price;
    private CustomerDTO customer;

    public ProductDTO() {}

    public ProductDTO(Long id, String productName, double price, CustomerDTO customer) {
        this.id = id;
        this.productName = productName;
        this.price = price;
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public CustomerDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerDTO customer) {
        this.customer = customer;
    }
}
