package com.example.Backend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class CartDto implements Serializable {
    private final String id;
    private final String customer_id;
    private final String address;
    private final LocalDate create_date;
    private final long total;
    private final String status;
    private final boolean active;

    public CartDto(String id, String customer_id, String address, LocalDate create_date, long total, String status) {
        this.id = id;
        this.customer_id = customer_id;
        this.address = address;
        this.create_date = create_date;
        this.total = total;
        this.status = status;
        this.active = true;
    }

    public String getId() {
        return id;
    }

    public String getCustomer_id() {
        return customer_id;
    }

    public String getAddress() {
        return address;
    }

    public LocalDate getCreate_date() {
        return create_date;
    }

    public long getTotal() {
        return total;
    }

    public String getStatus() {
        return status;
    }

    public boolean getActive() {
        return active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartDto entity = (CartDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.customer_id, entity.customer_id) &&
                Objects.equals(this.address, entity.address) &&
                Objects.equals(this.create_date, entity.create_date) &&
                Objects.equals(this.total, entity.total) &&
                Objects.equals(this.status, entity.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customer_id, address, create_date, total, status, active);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "customer_id = " + customer_id + ", " +
                "address = " + address + ", " +
                "create_date = " + create_date + ", " +
                "total = " + total + ", " +
                "status = " + status;
    }
}
