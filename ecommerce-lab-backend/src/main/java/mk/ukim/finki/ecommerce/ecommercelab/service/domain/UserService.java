package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.User;
import mk.ukim.finki.ecommerce.ecommercelab.model.enums.Role;

public interface UserService {
    User register(String username, String password, Role role);
}
