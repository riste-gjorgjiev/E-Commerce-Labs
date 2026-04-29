package mk.ukim.finki.ecommerce.ecommercelab.repository;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.Book;
import mk.ukim.finki.ecommerce.ecommercelab.model.enums.BookCategory;
import mk.ukim.finki.ecommerce.ecommercelab.model.enums.BookState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory(BookCategory category);
    List<Book> findByState(BookState state);
    List<Book> findByAuthorId (Long authorId);
    @Query("SELECT b FROM Book b JOIN FETCH b.author a JOIN FETCH a.country c")
    List<Book> findAll();

    List<Book> findByIdBetween(Long a, Long b);
}
