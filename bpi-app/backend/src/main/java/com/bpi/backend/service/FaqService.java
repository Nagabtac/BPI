package com.bpi.backend.service;

import com.bpi.backend.model.FaqItem;
import com.bpi.backend.repository.FaqItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    private final FaqItemRepository repo;

    public FaqService(FaqItemRepository repo) {
        this.repo = repo;
    }

    public List<FaqItem> getAll() {
        return repo.findAllByOrderBySortOrderAsc();
    }

    public FaqItem create(FaqItem item) {
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
