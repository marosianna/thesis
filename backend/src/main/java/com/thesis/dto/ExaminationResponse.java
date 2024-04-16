package com.thesis.dto;


import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExaminationResponse {

    private Long id;
    private String referralNumber;
    private ExaminationStatus status;
    private ExaminationType type;
    private LocalDate date;
    private Time time;
}
