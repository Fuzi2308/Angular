package com.example.demo.service;

import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository repo;

    public PersonService(PersonRepository repo) {
        this.repo = repo;
    }

    public List<Person> findAll() {
        return repo.findAll();
    }

    public Person findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new PersonNotFoundException(id));
    }

    public Person create(Person p) {
        p.setId(null); // nowy rekord, ID wygeneruje baza
        return repo.save(p);
    }

    public Person update(Long id, Person data) {
        Person existing = findById(id); // jeśli nie ma -> poleci PersonNotFoundException

        existing.setFirstName(data.getFirstName());
        existing.setFamilyName(data.getFamilyName());
        existing.setAge(data.getAge());
        existing.setAddress(data.getAddress());

        return repo.save(existing);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new PersonNotFoundException(id);
        }
        repo.deleteById(id);
    }
}
