package com.example.Backend.dto;

import java.io.Serializable;
import java.util.Objects;

public class ProductDto implements Serializable {
    private final String id;
    private final String title;
    private final String id_cate;
    private final String categorySlug;
    private final String image1;
    private final String image2;
    private final long price;
    private final String slug;
    private final String genres;
    private final String actors;
    private final String status;
    private final int release;
    private final String descriptions;
    private final int sale;
    private final String director;
    private final String video;
    private float rate;

    public ProductDto(){
        this.id = null;
        this.title = null;
        this.id_cate = null;
        this.categorySlug = null;
        this.image1 = null;
        this.image2 = null;
        this.price = 0;
        this.slug = null;
        this.genres = null;
        this.actors = null;
        this.status = null;
        this.release = 0;
        this.descriptions = null;
        this.sale = 0;
        this.director = null;
        this.video = null;
        this.rate = 0;
    }

    public ProductDto(String id, String title, String id_cate, String categorySlug, String image1, String image2,
                      long price, String slug, String genres, String actors, String status, int release,
                      String descriptions, int sale, String director, String video) {
        this.id = id;
        this.title = title;
        this.id_cate = id_cate;
        this.categorySlug = categorySlug;
        this.image1 = image1;
        this.image2 = image2;
        this.price = price;
        this.slug = slug;
        this.genres = genres;
        this.actors = actors;
        this.status = status;
        this.release = release;
        this.descriptions = descriptions;
        this.sale = sale;
        this.director = director;
        this.video = video;
        this.rate = 0;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getId_cate() {
        return id_cate;
    }

    public String getCategorySlug() {
        return categorySlug;
    }

    public String getImage1() {
        return image1;
    }

    public String getImage2() {
        return image2;
    }

    public long getPrice() {
        return price;
    }

    public String getSlug() {
        return slug;
    }

    public String getGenres() {
        return genres;
    }

    public String getActors() {
        return actors;
    }

    public int getRelease() {
        return release;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public String getStatus() {
        return status;
    }

    public int getSale() {
        return sale;
    }

    public float getRate() {
        return rate;
    }

    public String getDirector() {
        return director;
    }

    public String getVideo() {
        return video;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductDto entity = (ProductDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.title, entity.title) &&
                Objects.equals(this.id_cate, entity.id_cate) &&
                Objects.equals(this.categorySlug, entity.categorySlug) &&
                Objects.equals(this.image1, entity.image1) &&
                Objects.equals(this.image2, entity.image2) &&
                Objects.equals(this.price, entity.price) &&
                Objects.equals(this.slug, entity.slug) &&
                Objects.equals(this.genres, entity.genres) &&
                Objects.equals(this.actors, entity.actors) &&
                Objects.equals(this.descriptions, entity.descriptions) &&
                Objects.equals(this.sale, entity.sale);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, id_cate, categorySlug, image1, image2, price, slug, genres, actors, release, descriptions, sale);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "title = " + title + ", " +
                "id_cate = " + id_cate + ", " +
                "categorySlug = " + categorySlug + ", " +
                "image1 = " + image1 + ", " +
                "image2 = " + image2 + ", " +
                "price = " + price + ", " +
                "slug = " + slug + ", " +
                "genres = " + genres + ", " +
                "actors = " + actors + ", " +
                "descriptions = " + descriptions + ", " +
                "sale = " + sale + ")";
    }
}
