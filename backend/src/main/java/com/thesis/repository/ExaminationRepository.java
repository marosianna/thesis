package com.thesis.repository;

import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponseByFilter;
import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.ExaminationStatus;
import com.thesis.entity.ExaminationType;
import com.thesis.entity.Time;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
            @Param("status") ExaminationStatus status,
            @Param("type") ExaminationType type,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate
    );

    @Query("select e from ExaminationEntity e where "
            + "e.date <= :now and e.examinationStatus = 'IN_PROGRESS'")
    List<ExaminationEntity> findAllByDatesBefore(@Param("now") LocalDate now);

    @Query("select e from ExaminationEntity e where "
            + "e.user.id =:userId "
            + "order by e.date desc"
    )
    List<ExaminationEntity> findAllByUserId(@Param("userId") Long userId);

    @Query("select e from ExaminationEntity e where "
            + "e.referralNumber = :referralNumber")
    Optional<ExaminationEntity> findByReferralNumber(@Param("referralNumber") String referralNumber);

    @Query("select e from ExaminationEntity e where "
    + "e.date = :date")
    List<ExaminationEntity> findAllByDate(@Param("date") LocalDate date);

    @Query("select e from ExaminationEntity e where "
    + "e.user.id = :id and e.examinationType = :type "
    + "and e.examinationStatus != 'CLOSED'")
    Optional<ExaminationEntity> findByUserIdAndTypeAndExaminationIsNotClosed(@Param("id") Long id,
                                                                             @Param("type") ExaminationType type);


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
           + " order by e.date desc"
    )
    List<ExaminationResponseByFilter> findAllByFilter(@Param("medId") Long medId,
                                                      @Param("referralNumber") String referralNumber,
                                                      @Param("type") ExaminationType type,
                                                      @Param("status") ExaminationStatus status,
                                                      @Param("date") LocalDate date,
                                                      @Param("time") Time time);
}
