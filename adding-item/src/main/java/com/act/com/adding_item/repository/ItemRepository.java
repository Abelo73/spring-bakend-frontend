package com.act.com.adding_item.repository;

import com.act.com.adding_item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
//    Void delete(Long id);
}
