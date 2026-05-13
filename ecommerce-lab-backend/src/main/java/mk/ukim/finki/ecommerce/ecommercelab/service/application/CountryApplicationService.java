package mk.ukim.finki.ecommerce.ecommercelab.service.application;

import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateCountryDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayCountryDto;

import java.util.List;

public interface CountryApplicationService {
    List<DisplayCountryDto> findAll();
    DisplayCountryDto findById(Long id);
    DisplayCountryDto create(CreateCountryDto dto);
    DisplayCountryDto update(Long id, CreateCountryDto dto);
    void delete(Long id);
}
