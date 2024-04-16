package com.thesis.service;

import com.thesis.dto.UploadDocumentDto;
import com.thesis.entity.ResultEntity;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface DocumentService {

    String uploadDocument(MultipartFile file, String examinationId) throws IOException;

    Resource downloadFile(Long examinationId) throws IOException;

    Integer getResultByExamination(Long id);

}
