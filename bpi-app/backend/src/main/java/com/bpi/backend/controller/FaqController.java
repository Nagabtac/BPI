package com.bpi.backend.controller;

import com.bpi.backend.model.FaqItem;
import com.bpi.backend.service.FaqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {

    private final FaqService service;

    public FaqController(FaqService service) {
        this.service = service;
    }

    @GetMapping
    public List<FaqItem> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<FaqItem> create(@RequestBody FaqItem item) {
        return ResponseEntity.ok(service.create(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
