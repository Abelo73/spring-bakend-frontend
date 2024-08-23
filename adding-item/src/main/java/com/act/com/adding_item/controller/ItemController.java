package com.act.com.adding_item.controller;

import com.act.com.adding_item.entity.Item;
import com.act.com.adding_item.service.ItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item")
public class ItemController {



    @Autowired
    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    private final static Logger log = LoggerFactory.getLogger(ItemController.class);

    @GetMapping
    public List<Item> all(){
        return service.allItems();
    }

    @PostMapping
    public Item addItems(@RequestBody Item item){
        return service.addItem(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        Item updatedItem = service.updateItem(id, itemDetails);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem(@PathVariable Long id){
        Optional<Item> itemOptional = service.findById(id);
        if (itemOptional.isPresent()) {
            service.deleteItem(id);
            return ResponseEntity.ok("Deleted Successfully");
        } else {
            return ResponseEntity.badRequest().body("Not Found");
        }
    }
}
