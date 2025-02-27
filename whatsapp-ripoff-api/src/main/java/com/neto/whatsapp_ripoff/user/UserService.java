package com.neto.whatsapp_ripoff.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserResponse> getAllUserExceptSelf(Authentication connectedUser) {
        return userRepository.getAllUserExceptSelf(connectedUser.getName()).stream().map(userMapper::toUserResponse).toList();
    }

}
