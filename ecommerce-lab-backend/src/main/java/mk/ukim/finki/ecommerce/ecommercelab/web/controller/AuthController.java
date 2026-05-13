package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.ecommerce.ecommercelab.config.JwtService;
import mk.ukim.finki.ecommerce.ecommercelab.model.domain.User;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.AuthResponseDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.LoginRequestDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.RegisterRequestDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.enums.Role;
import mk.ukim.finki.ecommerce.ecommercelab.service.domain.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto requestDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword())
        );
        UserDetails user = userDetailsService.loadUserByUsername(requestDto.getUsername());
        String jwtToken = jwtService.generateToken(user);
        String role = user.getAuthorities().stream().findFirst().map(Object::toString).orElse("ROLE_USER");

        return ResponseEntity.ok(new AuthResponseDto(jwtToken, role, user.getUsername()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto requestDto){
        User user = userService.register(requestDto.username(), requestDto.password(), Role.ROLE_USER);
        String jwtToken = jwtService.generateToken(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponseDto(jwtToken, user.getRole().name(), user.getUsername()));
    }
}
