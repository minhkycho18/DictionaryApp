package com.pbl6.dictionaryappbe.mapper;

import com.pbl6.dictionaryappbe.dto.UserDto;
import com.pbl6.dictionaryappbe.persistence.user.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto entityToUserDTO(User user);
}
