package com.example.Backend.dto.request;

import java.io.Serializable;

public class ProductRequestDto implements Serializable {
    private String id;
    private String title;
    private String category;
    private String image1;
    private String image2;
    private Long price;
    private String genres;
    private String actors;
    private int release;
    private String descriptions;
    private String status;
    private int sale;
    private String director;
    private String video;

    public ProductRequestDto(){ }
    public ProductRequestDto(String id,String title, String category, String image1, String status, String image2,
                             Long price, String genres, String actors, int release, String descriptions, int sale ,
                             String director, String video) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.image1 = image1;
        this.image2 = image2;
        this.price = price;
        this.genres = genres;
        this.actors = actors;
        this.status = status;
        this.release = release;
        this.descriptions = descriptions;
        this.sale = sale;
        this.director = director;
        this.video = video;
    }

    public String getId(){ return id; }
    public String getTitle() {
        return title;
    }
    public String getCategory() {
        return category;
    }
    public String getImage1() {
        return image1;
    }
    public String getImage2() {
        return image2;
    }
    public Long getPrice() {
        return price;
    }
    public String getGenres() {
        return genres;
    }
    public String getStatus() {
        return status;
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
    public int getSale() {
        return sale;
    }

    public String getDirector() {
        return director;
    }

    public String getVideo() {
        return video;
    }
}
