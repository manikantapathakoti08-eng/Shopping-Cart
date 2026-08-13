package com.pragathi.shoppingCart.repository;

import com.pragathi.shoppingCart.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {


    Optional<Item> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    @Transactional
    void deleteByNameIgnoreCase(String name);
}