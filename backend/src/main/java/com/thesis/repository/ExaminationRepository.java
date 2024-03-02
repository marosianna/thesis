package com.thesis.repository;

import com.thesis.dto.ExaminationTableDataResponse;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface ExaminationRepository extends JpaRepository<ExaminationEntity, Long> {

    @Query("select e from ExaminationEntity e where "
            + "(:status is null or e.examinationStatus = :status) "
            + "and (:type is null or e.examinationType = :type) "
            + "and (:fromDate is null or :fromDate <= e.date) "
            + "and (:toDate is null or :toDate >= e.date)")
    List<ExaminationEntity> findByFilter(
            ExaminationStatus status,
            ExaminationType type,
            LocalDate fromDate,
            LocalDate toDate
    );

    List<ExaminationEntity> findAllByUserId(Long userId);
}
