package mk.ukim.finki.ecommerce.ecommercelab.service.domain;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.User;
import mk.ukim.finki.ecommerce.ecommercelab.model.domain.UserPreference;
import mk.ukim.finki.ecommerce.ecommercelab.repository.UserPreferenceRepository;
import mk.ukim.finki.ecommerce.ecommercelab.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserPreferenceServiceImpl implements UserPreferenceService {
    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;

    public UserPreferenceServiceImpl(UserPreferenceRepository userPreferenceRepository, UserRepository userRepository) {
        this.userPreferenceRepository = userPreferenceRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserPreference getOrCreate(Long userId) {
        return userPreferenceRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId).orElseThrow();
                    UserPreference preference = new UserPreference();
                    preference.setUser(user);
                    preference.setBooksViewMode("grid");
                    return userPreferenceRepository.save(preference);
                });
    }

    @Override
    @Transactional
    public UserPreference updateBooksViewMode(Long userId, String booksViewMode) {
        UserPreference preference = getOrCreate(userId);
        preference.setBooksViewMode(booksViewMode);
        return userPreferenceRepository.save(preference);
    }
}
