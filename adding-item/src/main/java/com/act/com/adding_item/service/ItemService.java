package com.act.com.adding_item.service;

import com.act.com.adding_item.entity.Item;
import com.act.com.adding_item.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    public Item addItem(@RequestBody Item item){
        return repository.save(item);
    }

    public List<Item> allItems(){
        return repository.findAll();
    }

    public Optional<Item> findById(Long id) {
        return repository.findById(id);
    }

//    public void deleteItem(@PathVariable Long id){
//        repository.delete(id);
//    }

    public void deleteItem(@PathVariable Long id){
        repository.deleteById(id);
    }

    public Item updateItem(Long id, Item itemDetails) {
        Optional<Item> optionalItem = repository.findById(id);
        if (optionalItem.isPresent()) {
            Item existingItem = optionalItem.get();
            existingItem.setName(itemDetails.getName());
            existingItem.setDescription(itemDetails.getDescription());
            existingItem.setPrice(itemDetails.getPrice());
            existingItem.setUpdatedOn(LocalDateTime.now());
            // The @PreUpdate method in the entity will automatically set the updatedOn field
            return repository.save(existingItem);
        } else {
            throw new RuntimeException("Item not found with id " + id);
        }
    }
}
