package com.thesis.repository;

import java.util.List;
import java.util.Optional;

import com.thesis.entity.TokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<TokenEntity, Long> {

    @Query("select t from TokenEntity t inner join UserEntity u "
            + " on t.user.id = u.id "
            + " where u.id = :userId and (t.expired = false or t.revoked = false)")
    List<TokenEntity> findAllValidTokenByUserId(@Param("userId") Long userId);

    Optional<TokenEntity> findByToken(String token);
}