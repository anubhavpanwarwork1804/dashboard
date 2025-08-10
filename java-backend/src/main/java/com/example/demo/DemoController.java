package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class DemoController {
    @PostMapping("/name")
    public ResponseEntity<Map<String, String>> postName(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        if (name != null && name.length() <= 10) {
            return ResponseEntity.ok(Map.of("name", name));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Name too long"));
        }
    }
}
