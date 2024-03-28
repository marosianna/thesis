package com.thesis.service;

import com.thesis.dto.ExaminationByFilterDto;
import com.thesis.dto.ExaminationResponse;
import com.thesis.dto.ExaminationResponseByFilter;

import java.util.List;

public interface AdminService {

    List<ExaminationResponseByFilter> getAllByFilter(ExaminationByFilterDto dto);

    boolean isAdmin();
}
