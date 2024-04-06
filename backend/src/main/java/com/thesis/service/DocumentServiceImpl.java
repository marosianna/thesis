package com.thesis.service;

import com.thesis.dto.UploadDocumentDto;
import com.thesis.entity.*;
import com.thesis.exception.AppException;
import com.thesis.repository.DocumentRepository;
import com.thesis.repository.ExaminationRepository;
import com.thesis.repository.ResultRepository;
import com.thesis.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.mapstruct.ap.shaded.freemarker.template.utility.StringUtil;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService{

    private final UserRepository userRepository;
    private final ExaminationRepository examinationRepository;
    private final ResultRepository resultRepository;
    private final DocumentRepository documentRepository;

    @Override
    public String uploadDocument(MultipartFile file, String examinationId){
        try {
            String fileName = "without_examination";
            Optional<ExaminationEntity> examination = examinationRepository.findById(Long.valueOf(examinationId));
            if (examination.isPresent()) {
                fileName = examination.get().getReferralNumber() + "_" + examination.get().getExaminationType();

                Files.write(Paths.get("src/main/resources/uploads/" + fileName), file.getBytes());
                ResultEntity result = createResult(examinationId);
                createDocument(file, result);
                examination.get().setExaminationStatus(ExaminationStatus.CLOSED);
            }
            return StringUtils.cleanPath(Objects.requireNonNull(fileName));
        } catch (IOException e) {
            throw new AppException("A fájl feltöltése nem sikerült!");
        }
    }

    @Override
    public Resource downloadFile(Long examinationId) throws IOException {
        String fileName = "without_examination";
        Optional<ExaminationEntity> examination = examinationRepository.findById(examinationId);
        if (examination.isPresent()) {
            fileName = examination.get().getReferralNumber() + "_" + examination.get().getExaminationType();
        }
        Path filePath = Paths.get("src/main/resources/uploads/").resolve(fileName).normalize();
        Resource resource = new org.springframework.core.io.UrlResource(filePath.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found: " + fileName);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

        return ResponseEntity.ok()
                .headers(headers)
                .body(resource).getBody();    }

    @Override
    public Integer getResultByExamination(Long id) {
        List<ResultEntity> results = new ArrayList<>();
        Optional<ExaminationEntity> examination = examinationRepository.findById(id);
        if (examination.isPresent()) {
            results = resultRepository.findByExaminationId(examination.get().getId());
        }
        return results.size();
    }

    private ResultEntity createResult(String examinationId) {
        ResultEntity result = new ResultEntity();
        result.setAdmin(getCurrentLoggedInUser());
        Optional<ExaminationEntity> examination = examinationRepository.findById(Long.valueOf(examinationId));
        examination.ifPresent(result::setExamination);
        return resultRepository.save(result);
    }

    private void createDocument(MultipartFile file, ResultEntity result) throws IOException {
        DocumentEntity document = new DocumentEntity();
        document.setName(file.getOriginalFilename());
        document.setResult(result);
        document.setFile(file.getBytes());
        documentRepository.save(document);

    }

    private UserEntity getCurrentLoggedInUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByUsername(authentication.getName());
        return user.orElse(null);
    }
}
