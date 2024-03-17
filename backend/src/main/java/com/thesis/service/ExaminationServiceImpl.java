package com.thesis.service;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.entity.*;
import com.thesis.exception.AppException;
import com.thesis.mapper.ExaminationMapper;
import com.thesis.repository.ExaminationRepository;
import com.thesis.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExaminationServiceImpl implements ExaminationService{

    private final ExaminationRepository examinationRepository;
    private final ExaminationMapper examinationMapper;
    private final UserRepository userRepository;

    @Override
    public ExaminationResponse createExamination(CreateExaminationDto dto) {

        //validation for date: available or not
        if (timeValidation(dto.getDate(), dto.getTime())) {
            throw new AppException("This time is not available!");
        }

        //validation for type: cant be 2 same type for one user
        if (typeValidation(getCurrentLoggedInUser(), dto.getExaminationType())) {
           throw new AppException("Cannot have more than one examination of the same type.");
        }

        if (referralNumberValidation(dto.getReferralNumber())) {
            throw new AppException("Referral number must be unique!");
        }

        ExaminationEntity examination = new ExaminationEntity();
        examination.setExaminationType(dto.getExaminationType());
        examination.setExaminationStatus(ExaminationStatus.IN_PROGRESS);
        if (dto.getMedId() == null) {
            examination.setUser(getCurrentLoggedInUser());
        } else {
            Optional<UserEntity> user = userRepository.findByMedId(dto.getMedId());
            if (user.isPresent()) {
                examination.setUser(user.get());
            } else {
                throw new AppException("Taj number doesn't exist");
            }
        }

        examination.setDate(dto.getDate().plusDays(1));
        examination.setTime(dto.getTime());
        examination.setReferralNumber(dto.getReferralNumber());
        ExaminationEntity savedExamination = examinationRepository.save(examination);
        return examinationMapper.mapToExaminationResponse(savedExamination);
    }

    private boolean timeValidation(LocalDate date, Time time) {
        Set<Time> notAvailableTimes = this.getNotAvailableTimesByDate(date);
        return notAvailableTimes.contains(time);
    }

    private boolean typeValidation(UserEntity user, ExaminationType type) {
        Optional<ExaminationEntity> optExam = examinationRepository.findByUserIdAndTypeAndExaminationIsNotClosed(user.getId(), type);
        return optExam.isPresent();
    }

    private boolean referralNumberValidation(String referralNumber) {
        Optional<ExaminationEntity> optExam = examinationRepository.findByReferralNumber(referralNumber);
        return optExam.isPresent();
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
        examinationRepository.deleteById(examination.getId());

        return id;
    }

    @Override
    public List<ExaminationResponse> getAllByUser() {
        UserEntity loggedInUser = getCurrentLoggedInUser();
        List<ExaminationEntity> examinations = examinationRepository.findAllByUserId(loggedInUser.getId());
        return examinationMapper.mapToExaminationResponseList(examinations);
    }

    @Override
    public ExaminationResponse update(Long id, CreateExaminationDto dto) {
        Optional<ExaminationEntity> byId = examinationRepository.findById(id);
        if (!byId.isPresent()) {
            return null;
        }
        //validation for date: available or not
        if (!dto.getDate().isEqual(byId.get().getDate()) && timeValidation(dto.getDate(), dto.getTime())) {
            throw new AppException("This time is not available!");
        }

        //validation for type: cant be 2 same type for one user
        if (!dto.getExaminationType().equals(byId.get().getExaminationType()) && typeValidation(getCurrentLoggedInUser(), dto.getExaminationType())) {
            throw new AppException("Cannot have more than one examination of the same type.");
        }

        if (!dto.getReferralNumber().equals(byId.get().getReferralNumber()) && referralNumberValidation(dto.getReferralNumber())) {
            throw new AppException("Referral number must be unique!");
        }

        ExaminationEntity examination = byId.get();
        examination.setExaminationType(dto.getExaminationType());
        examination.setExaminationStatus(ExaminationStatus.MODIFIED);
        if (dto.getMedId() == null) {
            examination.setUser(getCurrentLoggedInUser());
        } else {
            Optional<UserEntity> user = userRepository.findByMedId(dto.getMedId());
            if (user.isPresent()) {
                examination.setUser(user.get());
            } else {
                throw new AppException("Taj number doesn't exist");
            }
        }
        examination.setDate(dto.getDate().plusDays(1));
        examination.setReferralNumber(dto.getReferralNumber());
        examination.setTime(dto.getTime());
        ExaminationEntity savedExamination = examinationRepository.save(examination);
        return examinationMapper.mapToExaminationResponse(savedExamination);
    }

    @Override
    public Set<Time> getNotAvailableTimesByDate(LocalDate date) {
        List<ExaminationEntity> examinationsByDate = examinationRepository.findAllByDate(date.plusDays(1));

        return examinationsByDate.stream()
                .map(ExaminationEntity::getTime)
                .collect(Collectors.toSet());
    }

    @Override
    public Long getAdmin() {
        Long adminId = null;
        UserEntity user = getCurrentLoggedInUser();
        if (user != null) {
            Role role = user.getRole();
            if(Role.ADMIN.equals(role)) {
                adminId = getCurrentLoggedInUser().getId();
            }
        }
        return adminId;
    }
}
