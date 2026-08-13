package com.pragathi.shoppingCart.service;

import com.pragathi.shoppingCart.model.Item;
import com.pragathi.shoppingCart.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    // Constructor-based dependency injection
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    public boolean removeItem(String name) {
        if (itemRepository.existsByNameIgnoreCase(name)) {
            itemRepository.deleteByNameIgnoreCase(name);
            return true;
        }
        return false;
    }

    public Item updateItem(String name, Item updatedItem) {
        Optional<Item> existingItem = itemRepository.findByNameIgnoreCase(name);
        if (existingItem.isPresent()) {
            Item item = existingItem.get();
            item.setName(updatedItem.getName());
            item.setQuantity(updatedItem.getQuantity());
            item.setPrice(updatedItem.getPrice());

            return itemRepository.save(item);
        }
        return null;
    }

    public void clearCart() {
        itemRepository.deleteAll();
    }
}