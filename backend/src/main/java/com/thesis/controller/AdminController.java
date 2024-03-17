package com.thesis.controller;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.service.AdminService;
import com.thesis.service.ExaminationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/examination")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private final AdminService adminService;
    private final ExaminationService examinationService;

    @PostMapping("/by-filter")
    public ResponseEntity<List<ExaminationResponseByFilter>> getAllByFilter(
            @RequestBody ExaminationByFilterDto dto
    ) {
        return ResponseEntity.ok(adminService.getAllByFilter(dto));
    }

    @PostMapping(value = "/create", produces = "application/json;charset=UTF-8")
    public ResponseEntity<ExaminationResponse> createExamination(
            @RequestBody CreateExaminationDto dto
    ) {
        return ResponseEntity.ok(examinationService.createExamination(dto));
    }
}
