package com.bpi.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "faq_items")
public class FaqItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;

    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    public Long getId() { return id; }
    public String getQuestion() { return question; }
    public void setQuestion(String v) { this.question = v; }
    public String getAnswer() { return answer; }
    public void setAnswer(String v) { this.answer = v; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer v) { this.sortOrder = v; }
}
