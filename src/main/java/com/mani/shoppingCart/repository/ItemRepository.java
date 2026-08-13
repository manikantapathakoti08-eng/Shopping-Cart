package com.mani.shoppingCart.repository;

import com.mani.shoppingCart.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {


    Optional<Item> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    @Transactional
    void deleteByNameIgnoreCase(String name);
}