package com.example.quickFood.configs;

//@Component
//@RequiredArgsConstructor
//@Slf4j
//public class SeedDataConfig implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final UserService userService;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//      if (userRepository.count() == 0) {
//
//        User admin = User
//                      .builder()
//                      .firstName("admin")
//                      .lastName("admin")
//                      .email("admin@admin.com")
//                      .password(passwordEncoder.encode("password"))
//                      .role(Role.ROLE_ADMIN)
//                      .build();
//
//        userService.save(admin);
//        log.debug("created ADMIN user - {}", admin);
//      }
//    }
//
//}
