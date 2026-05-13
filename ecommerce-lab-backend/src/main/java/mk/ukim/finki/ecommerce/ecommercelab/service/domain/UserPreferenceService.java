package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.UserPreference;

public interface UserPreferenceService {
    UserPreference getOrCreate(Long userId);
    UserPreference updateBooksViewMode(Long userId, String booksViewMode);
}
