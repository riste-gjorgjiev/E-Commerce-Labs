package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import mk.ukim.finki.ecommerce.ecommercelab.model.domain.UserPreference;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.UserPreferenceDto;
import mk.ukim.finki.ecommerce.ecommercelab.repository.UserRepository;
import mk.ukim.finki.ecommerce.ecommercelab.service.domain.UserPreferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-preferences")
public class UserPreferenceController {
    private final UserPreferenceService userPreferenceService;
    private final UserRepository userRepository;

    public UserPreferenceController(UserPreferenceService userPreferenceService, UserRepository userRepository) {
        this.userPreferenceService = userPreferenceService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<UserPreferenceDto> getPreferences(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = userRepository.findByUsername(userDetails.getUsername()).orElseThrow().getId();
        UserPreference preference = userPreferenceService.getOrCreate(userId);
        return ResponseEntity.ok(new UserPreferenceDto(preference.getBooksViewMode()));
    }

    @PutMapping
    public ResponseEntity<UserPreferenceDto> updatePreferences(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserPreferenceDto request
    ) {
        Long userId = userRepository.findByUsername(userDetails.getUsername()).orElseThrow().getId();
        UserPreference preference = userPreferenceService.updateBooksViewMode(userId, request.booksViewMode());
        return ResponseEntity.ok(new UserPreferenceDto(preference.getBooksViewMode()));
    }
}
