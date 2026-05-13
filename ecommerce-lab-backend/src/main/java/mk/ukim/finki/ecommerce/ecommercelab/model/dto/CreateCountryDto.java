package mk.ukim.finki.ecommerce.ecommercelab.model.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateCountryDto(
        @NotBlank(message = "Country name must not be blank") String name,
        @NotBlank(message = "Continent must not be blank") String continent
) {
}
