class ApplicationStatus {
    static STATUS_SUBMITTED = 1;
    static STATUS_SITE_VIEWED = 2;
    static STATUS_SITE_REJECTED = 3;
    static STATUS_INFO_REQUIRED = 4;
    static STATUS_CLIENT_VIEWED = 5;
    static STATUS_CLIENT_REJECTED = 6;
    static STATUS_INTERVIEW_INVITED = 7;
    static STATUS_INTERVIEW_CANCELED = 8;
    static STATUS_INTERVIEW_RESULT_FAILED = 9;
    static STATUS_OFFER_SENT = 10;
    static STATUS_OFFER_ACCEPTED = 11;
    static STATUS_OFFER_DECLINED = 12;
    static STATUS_NEGOTIATION_REQUIRED = 13;
    static STATUS_CANDIDATE_FILLED = 14;
    static STATUS_CANDIDATE_PROBATION_PASSED = 15;
    static STATUS_CANDIDATE_STARTED_FIRST_DAY = 16;
  
    static STATUS = {
      [ApplicationStatus.STATUS_SUBMITTED]: 'Đã gửi',
      [ApplicationStatus.STATUS_SITE_VIEWED]: 'Xem trang',
      [ApplicationStatus.STATUS_SITE_REJECTED]: 'Từ chối trang',
      [ApplicationStatus.STATUS_INFO_REQUIRED]: 'Yêu cầu thông tin',
      [ApplicationStatus.STATUS_CLIENT_VIEWED]: 'Khách hàng xem',
      [ApplicationStatus.STATUS_CLIENT_REJECTED]: 'Khách hàng từ chối',
      [ApplicationStatus.STATUS_INTERVIEW_INVITED]: 'Mời phỏng vấn',
      [ApplicationStatus.STATUS_INTERVIEW_CANCELED]: 'Huỷ phỏng vấn',
      [ApplicationStatus.STATUS_INTERVIEW_RESULT_FAILED]: 'Kết quả phỏng vấn thất bại',
      [ApplicationStatus.STATUS_OFFER_SENT]: 'Gửi đề xuất',
      [ApplicationStatus.STATUS_OFFER_ACCEPTED]: 'Đã chấp nhận đề xuất',
      [ApplicationStatus.STATUS_OFFER_DECLINED]: 'Từ chối đề xuất',
      [ApplicationStatus.STATUS_NEGOTIATION_REQUIRED]: 'Yêu cầu đàm phán',
      [ApplicationStatus.STATUS_CANDIDATE_FILLED]: 'Ứng viên đã được tuyển',
      [ApplicationStatus.STATUS_CANDIDATE_PROBATION_PASSED]: 'Qua thời gian thử việc',
      [ApplicationStatus.STATUS_CANDIDATE_STARTED_FIRST_DAY]: 'Bắt đầu làm việc ngày đầu tiên',
    };
  }
  
  export { ApplicationStatus };
  