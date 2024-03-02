package com.thesis.dto;

import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExaminationTableDataResponse {

    private String referralNumber;
    private ExaminationStatus status;
    private ExaminationType type;
    private LocalDate date;
}
