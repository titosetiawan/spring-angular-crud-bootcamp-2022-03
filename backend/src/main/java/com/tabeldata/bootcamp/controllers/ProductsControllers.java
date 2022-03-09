package com.tabeldata.bootcamp.controllers;

import com.tabeldata.bootcamp.dao.ProductsDao;
import com.tabeldata.bootcamp.model.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProductsControllers {

    @Autowired
    private ProductsDao dao;

    @GetMapping("/list")
    public List<Products> listProducts() {
        return dao.list();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try {
            Products data = this.dao.findById(id);
            return ResponseEntity.ok(data);
        } catch (EmptyResultDataAccessException erdae) {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping(value = "/show")
    public Products showData(
            @RequestParam(name = "id") Integer id,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "price") Integer price,
            @RequestParam(name = "category") String category,
            @RequestParam(name = "create_date") LocalDate create_date,
            @RequestParam(name = "create_by") String create_by) {
        Products data = new Products();
        data.setId(id);
        data.setName(name);
        data.setPrice(price);
        data.setCategory(category);
        data.setCreate_date(create_date);
        data.setCreate_by(create_by);
        return data;
    }

    @PostMapping(value = "/insert")
    public ResponseEntity<Map<String, Object>>
    insert(@Valid @RequestBody Products data, BindingResult result) {
        Map<String, Object> hasil = new HashMap<>();
        hasil.put("id", dao.insert(data));
        hasil.put("status", "Simpan berhasil");
        return ResponseEntity.ok(hasil);

    }

    @PostMapping("/update")
    public ResponseEntity<Map<String, Object>>
    update(@RequestBody Products data) {
        Map<String, Object> hasil = new HashMap<>();
        dao.update(data);
        hasil.put("id", 0);
        hasil.put("status", "Update Berhasil");
        return ResponseEntity.ok().build();

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        this.dao.delete(id);
        return ResponseEntity.ok().build();
    }
}