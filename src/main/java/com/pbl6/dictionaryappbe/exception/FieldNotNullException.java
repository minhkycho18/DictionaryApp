package com.pbl6.dictionaryappbe.exception;

public class FieldNotNullException extends RuntimeException {

    public FieldNotNullException(String fieldName) {
        super(fieldName + " cannot be null");
    }
}
