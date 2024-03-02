package com.thesis.dto;


import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.UserEntity;
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
public class CreateExaminationDto {

    private String referralNumber;
    private ExaminationType examinationType;
    //private UserEntity user;
    //private ExaminationStatus examinationStatus;
    private LocalDate date;

}
