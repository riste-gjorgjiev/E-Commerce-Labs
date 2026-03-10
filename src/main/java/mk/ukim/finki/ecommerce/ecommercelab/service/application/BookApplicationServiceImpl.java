package mk.ukim.finki.ecommerce.ecommercelab.service.application;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Author;
import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Book;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.CreateBookDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.DisplayBookDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.exceptions.AuthorNotFoundException;
import mk.ukim.finki.ecommerce.ecommercelab.model.exceptions.BookNotFoundException;
import mk.ukim.finki.ecommerce.ecommercelab.service.domain.AuthorService;
import mk.ukim.finki.ecommerce.ecommercelab.service.domain.BookService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookApplicationServiceImpl implements BookApplicationService{
    private final BookService bookService;
    private final AuthorService authorService;

    public BookApplicationServiceImpl(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    @Override
    public List<DisplayBookDto> findAll() {
        return bookService.findAll().stream().map(DisplayBookDto::from).toList();
    }

    @Override
    public DisplayBookDto findById(Long id) {
        return bookService.findById(id)
                .map(DisplayBookDto::from)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @Override
    public DisplayBookDto create(CreateBookDto dto) {
        Author author = authorService.findById(dto.authorId())
                .orElseThrow(() -> new AuthorNotFoundException(dto.authorId()));
        Book book = bookService.create(dto.name(), dto.bookCategory(), author, dto.bookState(), dto.copies());
        return DisplayBookDto.from(book);
    }

    @Override
    public DisplayBookDto update(Long id, CreateBookDto dto) {
        Author author = authorService.findById(dto.authorId())
                .orElseThrow(() -> new AuthorNotFoundException(dto.authorId()));
        Book book = bookService.update(id, dto.name(), dto.bookCategory(), author, dto.bookState(), dto.copies());
        return DisplayBookDto.from(book);
    }

    @Override
    public void delete(Long id) {
        bookService.deleteById(id);
    }

    @Override
    public DisplayBookDto rent(Long id) {
        return DisplayBookDto.from(bookService.rentBook(id));
    }
}
