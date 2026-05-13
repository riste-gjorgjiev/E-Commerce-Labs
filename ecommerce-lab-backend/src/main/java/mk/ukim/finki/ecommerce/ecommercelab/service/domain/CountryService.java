package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<Country> findAll();
    Optional<Country> findById(Long id);
    Country create(String name, String continent);
    Country update(Long id, String name, String continent);
    void delete(Long id);
}
