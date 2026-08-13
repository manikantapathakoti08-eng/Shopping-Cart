package com.pragathi.shoppingCart.controller;

import com.pragathi.shoppingCart.model.Item;
import com.pragathi.shoppingCart.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*") // This is crucial for later: it allows your React or Flutter frontend to talk to this API
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // Replaces Case 6: View All Items
    @GetMapping
    public List<Item> getCart() {
        return itemService.getAllItems();
    }

    // Replaces Case 1: Add Item
    @PostMapping
    public Item addToCart(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    // Replaces Case 3: Update Item
    @PutMapping("/{name}")
    public ResponseEntity<Item> updateCartItem(@PathVariable String name, @RequestBody Item updatedItem) {
        Item item = itemService.updateItem(name, updatedItem);
        if (item != null) {
            return ResponseEntity.ok(item);
        }
        return ResponseEntity.notFound().build();
    }

    // Replaces Case 2: Remove Item
    @DeleteMapping("/{name}")
    public ResponseEntity<String> removeFromCart(@PathVariable String name) {
        if (itemService.removeItem(name)) {
            return ResponseEntity.ok("Item removed successfully");
        }
        return ResponseEntity.notFound().build();
    }

    // Replaces Case 7: Clear Cart
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart() {
        itemService.clearCart();
        return ResponseEntity.ok("Cart cleared");
    }
}