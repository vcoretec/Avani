package com.avanifeeds.common.exception;

/**
 * Exception for duplicate resource conflicts.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
