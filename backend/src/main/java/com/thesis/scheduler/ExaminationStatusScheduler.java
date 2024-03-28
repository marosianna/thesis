package com.thesis.scheduler;

import com.thesis.entity.ExaminationEntity;
import com.thesis.entity.ExaminationStatus;
import com.thesis.repository.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ExaminationStatusScheduler {

    private final Lock lock = new ReentrantLock();
    private final ExaminationRepository examinationRepository;

    @Scheduled(cron = "${cron.document-status-scheduler}")
    public void examinationStatusCheck() {
        if (lock.tryLock()) {
            try {List<ExaminationEntity> examinations = examinationRepository.findAllByDatesBefore(LocalDate.now());
                examinations.forEach(this::setStatusWaitingForResult);
                log.info("Examination status scheduler is running.");
            } finally {
                lock.unlock();
            }
        }
    }

    private void setStatusWaitingForResult(ExaminationEntity examination) {
        examination.setExaminationStatus(ExaminationStatus.WAITING_FOR_RESULT);
        examinationRepository.save(examination);
    }

}
