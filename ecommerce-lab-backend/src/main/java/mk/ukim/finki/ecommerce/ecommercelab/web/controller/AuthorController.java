package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateAuthorDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayAuthorDto;
import mk.ukim.finki.ecommerce.ecommercelab.service.application.AuthorApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
@Tag(name = "Authors", description = "Endpoints for managing book authors")
public class AuthorController {
    private final AuthorApplicationService authorApplicationService;

    @GetMapping
    @Operation(summary = "Get all authors")
    public ResponseEntity<List<DisplayAuthorDto>> findAll(){
        return ResponseEntity.ok(authorApplicationService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an author by ID")
    public ResponseEntity<DisplayAuthorDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(authorApplicationService.findById(id));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new author")
    public ResponseEntity<DisplayAuthorDto> create(@Valid @RequestBody CreateAuthorDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(authorApplicationService.create(dto));
    }

    @PutMapping("/edit/{id}")
    @Operation(summary = "Edit an existing author")
    public ResponseEntity<DisplayAuthorDto> update(@PathVariable Long id, @Valid @RequestBody CreateAuthorDto dto){
        return ResponseEntity.ok(authorApplicationService.update(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete an author")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        authorApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
