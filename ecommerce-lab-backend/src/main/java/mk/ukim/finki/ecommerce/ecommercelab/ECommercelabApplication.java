package mk.ukim.finki.ecommerce.ecommercelab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ECommercelabApplication {

    public static void main(String[] args) {
        SpringApplication.run(ECommercelabApplication.class, args);
    }

}

//For this application, I need to implement the following features.
// Go step by step and do them as the instructions say. Also implement any other
// functionalities that aren't present, but are needed for the proper function of the application
//
//The UI application should support all CRUD operations for the entities: book, author, and country,
// which you need to perform using the defined API. To connect to the API, use the Axios library and also
// follow the repository pattern.
//
//When navigating to the "/books" route, a page should be displayed that lists all books and the
// functionality for adding a new book should be enabled. You are free to define the components for
// the page layout yourself, but make sure that they are modular and reusable. Regarding adding a
// new book, implement the same using a dialog (modal) component. Also, for each book, enable the user
// to update the book (edit) as well as delete a specific book (delete). Enable the same functionalities
// for authors and countries.
//
//Encapsulate the data manipulation logic in custom hooks (for example, useBooks, useAuthors, useCountries, etc.)
// and use them within components to perform a specific CRUD operation. Note that each CRUD operation requires
// a refetch and a refresh of the view.
//
//Enable user registration and login via JWT authentication and authorization on the "/register" and "/login"
// routes, respectively. Define appropriate components and pages for this requirement.
//
//For an unlogged user, only the home page should be available. For all other pages, the user must be
// authenticated. Also, READ operations should be available for users with the USER and ADMINISTRATOR roles,
// and CREATE, UPDATE, and DELETE should be available only for users with the ADMINISTRATOR role. For the
// purposes of this request, implement and use the ProtectedRoute component as well as appropriate checks
// for the user role.