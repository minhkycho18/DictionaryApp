package com.pbl6.dictionaryappbe.utils;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class SqlUtils {
    private SqlUtils(){}
    public static LocalDateTime fromTimestamp(Timestamp timestamp){
        if(timestamp != null) {
            return timestamp.toLocalDateTime();
        }
        return null;
    }
}
