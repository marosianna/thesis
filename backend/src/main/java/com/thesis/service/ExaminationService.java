package com.thesis.service;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.entity.ExaminationEntity;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {

    Long createExamination(CreateExaminationDto dto);

    Optional<ExaminationEntity> getById(Long id);

    Long deleteById(Long id);

    List<ExaminationEntity> getAllByUserId(Long id);

    List<ExaminationEntity> getAllByFilter(ExaminationByFilterDto dto);

    Long update(Long id, CreateExaminationDto dto);

}
