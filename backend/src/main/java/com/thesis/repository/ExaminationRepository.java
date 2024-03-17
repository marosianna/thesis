package com.thesis.repository;

import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

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

    @Query("select e from ExaminationEntity e where "
            + "e.referralNumber = :referralNumber")
    Optional<ExaminationEntity> findByReferralNumber(String referralNumber);

    @Query("select e from ExaminationEntity e where "
    + "e.date = :date")
    List<ExaminationEntity> findAllByDate(LocalDate date);

    @Query("select e from ExaminationEntity e where "
    + "e.user.id = :id and e.examinationType = :type "
    + "and e.examinationStatus != 'CLOSED'")
    Optional<ExaminationEntity> findByUserIdAndTypeAndExaminationIsNotClosed(Long id, ExaminationType type);


    @Query("select distinct new com.thesis.dto.ExaminationResponseByFilter("
           + " e.id, e.referralNumber, e.examinationStatus, e.examinationType, e.date, e.time, u.firstName, u.lastName, u.medId) "
           + " from ExaminationEntity e "
           + " inner join UserEntity u on e.user.id = u.id "
           + " where (:medId is null or u.medId = :medId) "
           + " and (:referralNumber is null or lower(e.referralNumber) = lower(concat('%', :referralNumber, '%')))"
           + " and (:type is null or e.examinationType = :type)"
           + " and (:status is null or e.examinationStatus = :status)"
           + " and (:time is null or e.time = :time)"
           + " and (cast(:date as date) is null or e.date = :date)"
    )
    List<ExaminationResponseByFilter> findAllByFilter(Long medId,
                                                      String referralNumber,
                                                      ExaminationType type,
                                                      ExaminationStatus status,
                                                      LocalDate date,
                                                      Time time);
}
