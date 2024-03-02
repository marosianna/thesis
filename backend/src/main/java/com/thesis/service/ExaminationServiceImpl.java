package com.thesis.service;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationTableDataResponse;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.UserEntity;
import com.thesis.mapper.ExaminationMapper;
import com.thesis.repository.ExaminationRepository;
import com.thesis.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ExaminationServiceImpl implements ExaminationService{

    private final ExaminationRepository examinationRepository;
    private final ExaminationMapper examinationMapper;
    private final UserRepository userRepository;

    @Override
    public Long createExamination(CreateExaminationDto dto) {

        //TODO
        //validation for referralNumber: 10 digits
        //validation for type: cant be 2 same type for one user
        //validation for date: available or not
        ExaminationEntity examination = new ExaminationEntity();
        examination.setExaminationType(dto.getExaminationType());
        examination.setExaminationStatus(ExaminationStatus.IN_PROGRESS);
        examination.setUser(getCurrentLoggedInUser());
        examination.setDate(dto.getDate());
        examination.setReferralNumber(dto.getReferralNumber());
        return examinationRepository.save(examination).getId();
    }

    private UserEntity getCurrentLoggedInUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByUsername(authentication.getName());
        return user.orElse(null);

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
        if (examination.getDate().isBefore(LocalDate.now().minusDays(2))) {
            examinationRepository.deleteById(id);
        } else {
            //TODO
            //validation for date: cant be in 2 days when deleting
        }
        return id;
    }

    @Override
    public List<ExaminationTableDataResponse> getAllByUserId(Long userId) {
        List<ExaminationEntity> examinations = examinationRepository.findAllByUserId(userId);
        return examinationMapper.mapToTableDataResponseList(examinations);
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
        examination.setExaminationStatus(ExaminationStatus.IN_PROGRESS);
        examination.setUser(getCurrentLoggedInUser());
        examination.setDate(dto.getDate());
        examination.setReferralNumber(dto.getReferralNumber());
        return examinationRepository.save(examination).getId();
    }
}
