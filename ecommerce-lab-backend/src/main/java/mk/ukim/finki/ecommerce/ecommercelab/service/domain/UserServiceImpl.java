package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.User;
import mk.ukim.finki.ecommerce.ecommercelab.model.enums.Role;
import mk.ukim.finki.ecommerce.ecommercelab.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(String username, String password, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }
}
