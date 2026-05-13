package mk.ukim.finki.ecommerce.ecommercelab.service.application;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Country;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateCountryDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayCountryDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.exceptions.CountryNotFoundException;
import mk.ukim.finki.ecommerce.ecommercelab.service.domain.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryApplicationServiceImpl implements CountryApplicationService {
    private final CountryService countryService;

    public CountryApplicationServiceImpl(CountryService countryService) {
        this.countryService = countryService;
    }

    @Override
    public List<DisplayCountryDto> findAll() {
        return countryService.findAll().stream().map(DisplayCountryDto::from).toList();
    }

    @Override
    public DisplayCountryDto findById(Long id) {
        Country country = countryService.findById(id).orElseThrow(() -> new CountryNotFoundException(id));
        return DisplayCountryDto.from(country);
    }

    @Override
    public DisplayCountryDto create(CreateCountryDto dto) {
        Country country = countryService.create(dto.name(), dto.continent());
        return DisplayCountryDto.from(country);
    }

    @Override
    public DisplayCountryDto update(Long id, CreateCountryDto dto) {
        Country country = countryService.update(id, dto.name(), dto.continent());
        return DisplayCountryDto.from(country);
    }

    @Override
    public void delete(Long id) {
        countryService.delete(id);
    }
}
