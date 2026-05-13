package mk.ukim.finki.ecommerce.ecommercelab.model.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDto(
        @NotBlank(message = "Username must not be blank") String username,
        @NotBlank(message = "Password must not be blank") String password
) {
}
