package mk.ukim.finki.ecommerce.ecommercelab.web.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.ecommerce.ecommercelab.config.JwtService;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.AuthResponseDto;
import mk.ukim.finki.ecommerce.ecommercelab.model.dto.LoginRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto requestDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword())
        );
        UserDetails user = userDetailsService.loadUserByUsername(requestDto.getUsername());
        String jwtToken = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponseDto(jwtToken));
    }
}
