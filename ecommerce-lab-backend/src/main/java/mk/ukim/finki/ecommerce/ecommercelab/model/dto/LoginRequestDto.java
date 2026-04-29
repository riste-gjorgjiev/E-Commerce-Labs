package mk.ukim.finki.ecommerce.ecommercelab.model.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
