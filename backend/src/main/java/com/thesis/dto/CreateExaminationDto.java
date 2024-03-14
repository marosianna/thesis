package com.thesis.dto;


import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateExaminationDto {

    private String referralNumber;
    private ExaminationType examinationType;
    private LocalDate date;
    private Time time;
    private Long medId;

}
