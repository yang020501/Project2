package com.example.Backend.dto;

import java.io.Serializable;
import java.util.Objects;

public class CategoryDto implements Serializable {
    private final String id;
    private final String display;

    public CategoryDto(String id, String display) {
        this.id = id;
        this.display = display;
    }

    public String getId() {
        return id;
    }

    public String getDisplay() {
        return display;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryDto entity = (CategoryDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.display, entity.display);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, display);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "display = " + display + ")";
    }
}
