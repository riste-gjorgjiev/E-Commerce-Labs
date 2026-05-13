package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Country;
import mk.ukim.finki.ecommerce.ecommercelab.model.exceptions.CountryNotFoundException;
import mk.ukim.finki.ecommerce.ecommercelab.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return countryRepository.findById(id);
    }

    @Override
    public Country create(String name, String continent) {
        return countryRepository.save(new Country(name, continent));
    }

    @Override
    public Country update(Long id, String name, String continent) {
        Country country = countryRepository.findById(id).orElseThrow(() -> new CountryNotFoundException(id));
        country.setName(name);
        country.setContinent(continent);
        return countryRepository.save(country);
    }

    @Override
    public void delete(Long id) {
        if (!countryRepository.existsById(id)) {
            throw new CountryNotFoundException(id);
        }
        countryRepository.deleteById(id);
    }
}
