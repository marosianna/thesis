package com.thesis.entity;

import lombok.Getter;

@Getter
public enum Time {

    TIME_07_00("07:00"),
    TIME_07_30("07:30"),
    TIME_08_00("08:00"),
    TIME_08_30("08:30"),
    TIME_09_00("09:00"),
    TIME_09_30("09:30"),
    TIME_10_00("10:00"),
    TIME_10_30("10:30"),
    TIME_11_00("11:00"),
    TIME_11_30("11:30"),
    TIME_12_00("12:00");

    private final String value;

    Time(String value) {
        this.value = value;
    }

}