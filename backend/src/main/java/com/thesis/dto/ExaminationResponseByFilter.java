package com.thesis.dto;

import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import lombok.*;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExaminationResponseByFilter extends ExaminationResponse {
    public ExaminationResponseByFilter(Long id,
                                       String referralNumber,
                                       ExaminationStatus status,
                                       ExaminationType type,
                                       LocalDate date,
                                       Time time,
                                       String firstName,
                                       String lastName,
                                       Long medId) {
        super(id, referralNumber, status, type, date, time);
        this.firstName = firstName;
        this.lastName = lastName;
        this.medId = medId;
    }

    private String firstName;

    private String lastName;

    private Long medId;
}
