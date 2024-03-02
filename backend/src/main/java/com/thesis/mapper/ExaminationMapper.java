package com.thesis.mapper;

import com.thesis.dto.ExaminationTableDataResponse;
import com.thesis.entity.ExaminationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ExaminationMapper {

    @Mapping(source = "referralNumber", target = "referralNumber")
    @Mapping(source = "examinationStatus", target = "status")
    @Mapping(source = "examinationType", target = "type")
    @Mapping(source = "date", target = "date")
    ExaminationTableDataResponse mapToTableDataResponse(ExaminationEntity examinationEntity);

    List<ExaminationTableDataResponse> mapToTableDataResponseList(List<ExaminationEntity> examinationEntities);

}
