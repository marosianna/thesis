package com.thesis.service;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.entity.ExaminationEntity;
import com.thesis.repository.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExaminationServiceImpl implements ExaminationService{

    private final ExaminationRepository examinationRepository;
    @Override
    public Long createExamination(CreateExaminationDto dto) {
        //TODO
        //validation for referralNumber: 10 digits
        //validation for type: cant be 2 same type for one user
        //validation for date: available or not
        ExaminationEntity examination = new ExaminationEntity();
        examination.setExaminationType(dto.getExaminationType());
        examination.setExaminationStatus(dto.getExaminationStatus());
        examination.setUser(dto.getUser());
        examination.setDate(dto.getDate());
        examination.setReferralNumber(dto.getReferralNumber());
        return examinationRepository.save(examination).getId();
    }

    @Override
    public Optional<ExaminationEntity> getById(Long id) {
        return examinationRepository.findById(id);
    }

    @Override
    public Long deleteById(Long id) {
        Optional<ExaminationEntity> byId = getById(id);
        if (!byId.isPresent()) {
            return null;
        }
        ExaminationEntity examination = byId.get();
        if (examination.getDate().isBefore(ZonedDateTime.now().minusDays(2))) {
            examinationRepository.deleteById(id);
        } else {
            //TODO
            //validation for date: cant be in 2 days when deleting
        }
        return id;
    }

    @Override
    public List<ExaminationEntity> getAllByUserId(Long userId) {
        return examinationRepository.findAllByUserId(userId);
    }

    @Override
    public List<ExaminationEntity> getAllByFilter(ExaminationByFilterDto dto) {
        return examinationRepository.findByFilter(
                dto.getStatus(),
                dto.getType(),
                dto.getFromDate(),
                dto.getToDate()
        );
    }

    @Override
    public Long update(Long id, CreateExaminationDto dto) {
        Optional<ExaminationEntity> byId = examinationRepository.findById(id);
        if (!byId.isPresent()) {
            return null;
        }
        //TODO
        //validation for referralNumber: 10 digits
        //validation for type: cant be 2 same type for one user
        //validation for date: available or not
        //validation for date: cant be in 2 days when updating

        ExaminationEntity examination = byId.get();
        examination.setExaminationType(dto.getExaminationType());
        examination.setExaminationStatus(dto.getExaminationStatus());
        examination.setUser(dto.getUser());
        examination.setDate(dto.getDate());
        examination.setReferralNumber(dto.getReferralNumber());
        return examinationRepository.save(examination).getId();
    }
}
