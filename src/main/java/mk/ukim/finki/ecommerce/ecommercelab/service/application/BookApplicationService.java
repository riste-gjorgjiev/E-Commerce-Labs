package mk.ukim.finki.ecommerce.ecommercelab.service.application;

import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateBookDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayBookDto;

import java.util.List;

public interface BookApplicationService {
    List<DisplayBookDto> findAll();
    DisplayBookDto findById(Long id);
    DisplayBookDto create(CreateBookDto dto);
    DisplayBookDto update(Long id, CreateBookDto dto);
    void delete(Long id);
    DisplayBookDto rent(Long id);
}
