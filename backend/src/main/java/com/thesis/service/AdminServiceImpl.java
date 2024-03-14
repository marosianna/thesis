package com.thesis.service;


import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.entity.ExaminationEntity;
import com.thesis.mapper.ExaminationMapper;
import com.thesis.repository.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final ExaminationRepository examinationRepository;
    private final ExaminationMapper examinationMapper;

    @Override
    public List<ExaminationResponseByFilter> getAllByFilter(ExaminationByFilterDto dto) {
        return  examinationRepository.findAllByFilter(
                dto.getMedId(),
                dto.getReferralNumber(),
                dto.getType(),
                dto.getStatus(),
                dto.getDate() != null ? dto.getDate().plusDays(1) : null,
                dto.getTime());
    }
}
