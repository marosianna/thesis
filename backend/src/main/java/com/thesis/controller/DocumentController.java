package com.thesis.controller;

import com.thesis.entity.ResultEntity;
import com.thesis.service.DocumentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/document")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("examinationId") String examinationId) throws IOException {
       return ResponseEntity.ok(documentService.uploadDocument(file, examinationId));
    }

    @GetMapping(value = "/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws IOException{
        return ResponseEntity.ok(documentService.downloadFile(id));
    }

    @GetMapping(value = "/result/{id}")
    public ResponseEntity<Optional<ResultEntity>> userHasResult(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getResultByExamination(id));
    }



}
