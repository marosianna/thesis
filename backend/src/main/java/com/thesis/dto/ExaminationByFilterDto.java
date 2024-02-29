package com.thesis.dto;

import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExaminationByFilterDto {

    private ExaminationStatus status;
    private ExaminationType type;
    private ZonedDateTime fromDate;
    private ZonedDateTime toDate;

}
