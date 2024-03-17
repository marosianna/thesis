package com.thesis.dto;

import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExaminationByFilterDto {

    private ExaminationStatus status;
    private ExaminationType type;
    private Long medId;
    private String referralNumber;
    private LocalDate date;
    private Time time;

}
