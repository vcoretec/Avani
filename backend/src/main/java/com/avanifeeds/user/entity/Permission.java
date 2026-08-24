package com.avanifeeds.user.entity;

import com.avanifeeds.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * Permission entity for granular access control.
 * Examples: PROCUREMENT_VIEW, PROCUREMENT_CREATE, FINANCE_APPROVE, etc.
 */
@Entity
@Table(name = "permissions")
public class Permission extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String code;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 50)
    private String module;

    @Column(length = 500)
    private String description;

    // Getters and Setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
