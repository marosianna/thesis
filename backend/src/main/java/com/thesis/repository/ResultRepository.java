package com.thesis.repository;

import com.thesis.entity.ResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<ResultEntity, Long> {

    @Query("select r from ResultEntity r where "
            + "r.examination.id = :examinationId order by r.examination.date desc")
    List<ResultEntity> findByExaminationId(@Param("examinationId") Long examinationId);
}
