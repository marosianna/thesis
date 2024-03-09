package com.thesis.service;

import com.thesis.dto.CreateExaminationDto;
import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationTableDataResponse;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.Time;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ExaminationService {

    ExaminationResponse createExamination(CreateExaminationDto dto);

    Optional<ExaminationEntity> getById(Long id);

    Long deleteById(Long id);

    List<ExaminationTableDataResponse> getAllByUser();

    List<ExaminationEntity> getAllByFilter(ExaminationByFilterDto dto);

    ExaminationResponse update(Long id, CreateExaminationDto dto);

    Set<Time> getNotAvailableTimesByDate(LocalDate date);

}
