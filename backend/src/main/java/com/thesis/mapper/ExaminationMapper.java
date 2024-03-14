package com.thesis.mapper;

import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.entity.ExaminationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ExaminationMapper {

    List<ExaminationResponse> mapToExaminationResponseList(List<ExaminationEntity> examinationEntities);

    @Mapping(source = "referralNumber", target = "referralNumber")
    @Mapping(source = "examinationStatus", target = "status")
    @Mapping(source = "examinationType", target = "type")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "time", target = "time")
    @Mapping(source = "id", target = "id")
    ExaminationResponse mapToExaminationResponse(ExaminationEntity examinationEntity);


}
