package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateCountryDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayCountryDto;
import mk.ukim.finki.ecommerce.ecommercelab.service.application.CountryApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
@Tag(name = "Countries", description = "Endpoints for listing countries")
public class CountryController {
    private final CountryApplicationService countryApplicationService;

    @GetMapping
    @Operation(summary = "Get all countries")
    public ResponseEntity<List<DisplayCountryDto>> findAll(){
        return ResponseEntity.ok(countryApplicationService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a country by ID")
    public ResponseEntity<DisplayCountryDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(countryApplicationService.findById(id));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new country")
    public ResponseEntity<DisplayCountryDto> create(@Valid @RequestBody CreateCountryDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(countryApplicationService.create(dto));
    }

    @PutMapping("/edit/{id}")
    @Operation(summary = "Update an existing country")
    public ResponseEntity<DisplayCountryDto> update(@PathVariable Long id, @Valid @RequestBody CreateCountryDto dto){
        return ResponseEntity.ok(countryApplicationService.update(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a country")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        countryApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
