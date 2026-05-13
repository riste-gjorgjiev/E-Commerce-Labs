package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateBookDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayBookDto;
import mk.ukim.finki.ecommerce.ecommercelab.service.application.BookApplicationService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/books")
@Tag(name = "Books", description = "Endpoints for managing library books")
public class BookController {
    private final BookApplicationService bookApplicationService;

    public BookController(BookApplicationService bookApplicationService) {
        this.bookApplicationService = bookApplicationService;
    }

    @GetMapping
    @Operation(summary = "Get all books")
    public ResponseEntity<List<DisplayBookDto>> findAll(){
        return ResponseEntity.ok(bookApplicationService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a book by ID")
    public ResponseEntity<DisplayBookDto> findById(@PathVariable Long id){
        return ResponseEntity.ok(bookApplicationService.findById(id));
    }

    @PostMapping("/add")
    @Operation(summary = "Add a new book")
    public ResponseEntity<DisplayBookDto> create(@Valid @RequestBody CreateBookDto dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookApplicationService.create(dto));
    }

    @PutMapping("/edit/{id}")
    @Operation(summary = "Update an existing book")
    public ResponseEntity<DisplayBookDto> update(@PathVariable Long id, @Valid @RequestBody CreateBookDto dto){
        return ResponseEntity.ok(bookApplicationService.update(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete a book that is no longer in good condition")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        bookApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/rent/{id}")
    @Operation(summary = "Mark a book as rented (decreases available copies by 1)")
    public ResponseEntity<DisplayBookDto> rent(@PathVariable Long id){
        return ResponseEntity.ok(bookApplicationService.rent(id));
    }
    @GetMapping("/filter-by-id")
    @Operation(summary = "Filter by two ids")
    public ResponseEntity<List<DisplayBookDto>> findByIdBetween(@RequestParam Long a, @RequestParam Long b){
        return ResponseEntity.ok(bookApplicationService.findByIdBetween(a, b));
    }
}
