package com.example.demo.api;

import com.example.demo.model.Person;
import com.example.demo.service.PersonNotFoundException;
import com.example.demo.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // pozwalamy Angularowi łączyć się z tym API
@RestController
@RequestMapping("/api/persons")
public class PersonRestController {

    private final PersonService service;

    public PersonRestController(PersonService service) {
        this.service = service;
    }

    // GET /api/persons
    @GetMapping
    public List<Person> getAll() {
        return service.findAll();
    }

    // GET /api/persons/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Person> getById(@PathVariable Long id) {
        try {
            Person person = service.findById(id);
            return ResponseEntity.ok(person);
        } catch (PersonNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/persons
    @PostMapping
    public ResponseEntity<Person> create(@RequestBody Person person) {
        Person created = service.create(person);
        return ResponseEntity.ok(created);
    }

    // PUT /api/persons/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable Long id,
                                         @RequestBody Person person) {
        try {
            Person updated = service.update(id, person);
            return ResponseEntity.ok(updated);
        } catch (PersonNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/persons/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build(); // 204
        } catch (PersonNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
