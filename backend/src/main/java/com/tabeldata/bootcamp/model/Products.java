package com.tabeldata.bootcamp.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;

@Data
public class Products {
    private Integer id;

    private String name;

    private Integer price;

    private String category;

    private LocalDate create_date;
    private String create_by;


}
