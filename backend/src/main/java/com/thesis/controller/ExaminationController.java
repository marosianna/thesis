package com.thesis.controller;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.Time;
import com.thesis.service.ExaminationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/examination")
@CrossOrigin(origins = "http://localhost:4200")
public class ExaminationController {

    private final ExaminationService examinationService;

    @PostMapping(value = "/create", produces = "application/json;charset=UTF-8")
    public ResponseEntity<ExaminationResponse> createExamination(
            @RequestBody CreateExaminationDto dto
    ) {
        return ResponseEntity.ok(examinationService.createExamination(dto));
    }

    @PostMapping(value = "/available-times", produces = "application/json;charset=UTF-8")
    public ResponseEntity<Set<Time>> getNotAvailableTimes(
            @RequestBody LocalDate date
            ) {
        return ResponseEntity.ok(examinationService.getNotAvailableTimesByDate(date));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ExaminationEntity>> getById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(examinationService.getById(id));
    }

    @GetMapping(value = "/by-user", produces = "application/json;charset=UTF-8")
    public ResponseEntity<List<ExaminationResponse>> getAllByUserId(
    ) {
        return ResponseEntity.ok(examinationService.getAllByUser());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(examinationService.deleteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExaminationResponse> update(
            @RequestBody CreateExaminationDto dto,
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(examinationService.update(id,dto));
    }

    @PostMapping("/get-admin")
    public ResponseEntity<Long> getAdmin() {
        return ResponseEntity.ok(examinationService.getAdmin());
    }
}
