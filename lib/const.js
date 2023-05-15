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
      [ApplicationStatus.STATUS_SITE_VIEWED]: 'ViecThom đã xem CV',
      [ApplicationStatus.STATUS_SITE_REJECTED]: 'ViecThom từ chối',
      [ApplicationStatus.STATUS_INFO_REQUIRED]: 'Yêu cầu bổ sung thông tin',
      [ApplicationStatus.STATUS_CLIENT_VIEWED]: 'Khách hàng đã xem',
      [ApplicationStatus.STATUS_CLIENT_REJECTED]: 'Khách hàng từ chối',
      [ApplicationStatus.STATUS_INTERVIEW_INVITED]: 'Đã mời phỏng vấn',
      [ApplicationStatus.STATUS_INTERVIEW_CANCELED]: 'Phỏng vấn bị hủy',
      [ApplicationStatus.STATUS_INTERVIEW_RESULT_FAILED]: 'Kết quả phỏng vấn thất bại',
      [ApplicationStatus.STATUS_OFFER_SENT]: 'Gửi đề xuất',
      [ApplicationStatus.STATUS_OFFER_ACCEPTED]: 'Đã chấp nhận đề xuất',
      [ApplicationStatus.STATUS_OFFER_DECLINED]: 'Từ chối đề xuất',
      [ApplicationStatus.STATUS_NEGOTIATION_REQUIRED]: 'Yêu cầu đàm phán',
      [ApplicationStatus.STATUS_CANDIDATE_FILLED]: 'Ứng viên đã được tuyển',
      [ApplicationStatus.STATUS_CANDIDATE_PROBATION_PASSED]: 'Qua thời gian thử việc',
      [ApplicationStatus.STATUS_CANDIDATE_STARTED_FIRST_DAY]: 'Bắt đầu làm việc ngày đầu tiên',
    };

    static STATUS_NEXT = {
      [ApplicationStatus.STATUS_SUBMITTED]: 'Đang chờ ứng viên xác nhận Email',
      [ApplicationStatus.STATUS_SITE_VIEWED]: 'Đang chờ phản hồi từ công ty',
      [ApplicationStatus.STATUS_SITE_REJECTED]: 'Từ chối trang',
      [ApplicationStatus.STATUS_INFO_REQUIRED]: 'Chờ bổ sung thông tin ứng viên',
      [ApplicationStatus.STATUS_CLIENT_VIEWED]: 'Đang đợi khách phản hồi',
      [ApplicationStatus.STATUS_CLIENT_REJECTED]: '',
      [ApplicationStatus.STATUS_INTERVIEW_INVITED]: 'Đang chờ ứng viên xác nhận lịch',
      [ApplicationStatus.STATUS_INTERVIEW_CANCELED]: 'Nếu có sự thay đổi chúng tôi sẽ thông báo',
      [ApplicationStatus.STATUS_INTERVIEW_RESULT_FAILED]: '',
      [ApplicationStatus.STATUS_OFFER_SENT]: 'Đang chờ phản hồi từ công ty',
      [ApplicationStatus.STATUS_OFFER_ACCEPTED]: 'Đang chờ Offer Letter chính thức',
      [ApplicationStatus.STATUS_OFFER_DECLINED]: 'Đang chờ kết quả thương lượng',
      [ApplicationStatus.STATUS_NEGOTIATION_REQUIRED]: 'Đang chờ phản hồi từ khách hàng',
      [ApplicationStatus.STATUS_CANDIDATE_FILLED]: 'Ứng viên đã được tuyển',
      [ApplicationStatus.STATUS_CANDIDATE_PROBATION_PASSED]: 'Qua thời gian thử việc',
      [ApplicationStatus.STATUS_CANDIDATE_STARTED_FIRST_DAY]: 'Bắt đầu làm việc ngày đầu tiên',
    };

    static STATUS_ICON = {
      [ApplicationStatus.STATUS_SUBMITTED]: 'y',
      [ApplicationStatus.STATUS_SITE_VIEWED]: 'y',
      [ApplicationStatus.STATUS_SITE_REJECTED]: 'y',
      [ApplicationStatus.STATUS_INFO_REQUIRED]: 'n',
      [ApplicationStatus.STATUS_CLIENT_VIEWED]: 'y',
      [ApplicationStatus.STATUS_CLIENT_REJECTED]: 'n',
      [ApplicationStatus.STATUS_INTERVIEW_INVITED]: 'y',
      [ApplicationStatus.STATUS_INTERVIEW_CANCELED]: 'n',
      [ApplicationStatus.STATUS_INTERVIEW_RESULT_FAILED]: 'n',
      [ApplicationStatus.STATUS_OFFER_SENT]: 'y',
      [ApplicationStatus.STATUS_OFFER_ACCEPTED]: 'y',
      [ApplicationStatus.STATUS_OFFER_DECLINED]: 'n',
      [ApplicationStatus.STATUS_NEGOTIATION_REQUIRED]: 'x',
      [ApplicationStatus.STATUS_CANDIDATE_FILLED]: 'y',
      [ApplicationStatus.STATUS_CANDIDATE_PROBATION_PASSED]: 'y',
      [ApplicationStatus.STATUS_CANDIDATE_STARTED_FIRST_DAY]: 'y',
    };
  }
  
  export { ApplicationStatus };
  