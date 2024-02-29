package com.thesis.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Examination")
public class ExaminationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "referral_number", nullable = false)
    private Long referralNumber;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ExaminationType examinationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    public UserEntity user;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ExaminationStatus examinationStatus;

    @Column(name = "date", nullable = false)
    private ZonedDateTime date;

}
