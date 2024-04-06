package com.thesis.service;


import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.Role;
import com.thesis.entity.UserEntity;
import com.thesis.mapper.ExaminationMapper;
import com.thesis.repository.ExaminationRepository;
import com.thesis.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final ExaminationRepository examinationRepository;
    private final UserRepository userRepository;

    @Override
    public List<ExaminationResponseByFilter> getAllByFilter(ExaminationByFilterDto dto) {
        List<ExaminationResponseByFilter> pageableExaminations =
        examinationRepository.findAllByFilter(
                dto.getMedId(),
                dto.getReferralNumber(),
                dto.getType(),
                dto.getStatus(),
                dto.getDate() != null ? dto.getDate().plusDays(1) : null,
                dto.getTime());

        return pageableExaminations;
    }

    @Override
    public boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByUsername(authentication.getName());
        if (user.isPresent()) {
            if (Role.ADMIN.equals(user.get().getRole())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!Objects.isNull(authentication)){
            Optional<UserEntity> user = userRepository.findByUsername(authentication.getName());
            return user.isPresent();
        }
        return false;
    }
}
