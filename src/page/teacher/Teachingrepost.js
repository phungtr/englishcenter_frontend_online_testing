import React, { useState, useEffect } from 'react';
import '../../page/teacher/TeachingScheduleReport.css';
import Schedule from '../../component/Calender'
import Navbar from '../../component/pagebar';
const TeachingScheduleReport = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [filters, setFilters] = useState({ lecturer: '', course: '', date: '' });

  useEffect(() => {
    // Fake data for demo
    const demoData = [
      { id: 1, lecturer: 'Nguyễn Văn Dưỡng', course: 'Tiếng anh cấp tốc', dateTime: '2025-02-25 07:55' },
      { id: 2, lecturer: 'Hà Xuân Bách', course: 'Tiếng anh trẻ em', dateTime: '2025-02-24 07:00' },
      { id: 3, lecturer: 'Vũ Minh Đăng', course: 'Luyện nghe và nói', dateTime: '2025-02-25 09:45' },
      { id: 4, lecturer: 'Lê Anh Nuôi', course: 'Tiếng anh chuyên ngành', dateTime: '2025-02-26 07:00' },
      { id: 5, lecturer: 'Đoàn Nguyễn Thành Hưng', course: 'Ngữ pháp nâng cao', dateTime: '2025-02-24 09:45' }
    ];
    setSchedules(demoData);
    setFilteredSchedules(demoData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const applyFilters = (currentFilters) => {
    let filtered = schedules.filter(schedule => {
      return (
        (currentFilters.lecturer ? schedule.lecturer.toLowerCase().includes(currentFilters.lecturer.toLowerCase()) : true) &&
        (currentFilters.course ? schedule.course.toLowerCase().includes(currentFilters.course.toLowerCase()) : true) &&
        (currentFilters.date ? schedule.dateTime.startsWith(currentFilters.date) : true)
      );
    });
    setFilteredSchedules(filtered);
  };

  return (
    <div className="schedule-container">
    <div style={{alignItems:"center",display:"flex"}}>  <Navbar /></div>
  
      <h1 className="schedule-title">Báo cáo lịch giảng dạy - {new Date().toLocaleDateString()}</h1>
      <div className="filter-container">
        <input
          type="text"
          name="lecturer"
          placeholder="Lọc theo giảng viên"
          value={filters.lecturer}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Lọc theo khóa học"
          value={filters.course}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>
      <div className="schedule-grid">
        {filteredSchedules.map((schedule) => (
          <div key={schedule.id} className="schedule-item">
            <div className="course-title">{schedule.course}</div>
            <div className="course-info">
              <p>Giảng viên: {schedule.lecturer}</p>
              <p>Thời gian: {schedule.dateTime}</p>
            </div>
          </div>
        ))}
      </div>
      <Schedule/>
            {/* Footer */}
            <footer className="footer-container">
      <div className="footer-section">
        <h3>Quản lý trung tâm tiếng Anh</h3>
        <p>Hệ thống quản lý hiện đại và tiện lợi</p>
      </div>
      <div className="footer-section">
        <h4>Bạn cần hỗ trợ</h4>
        <p>0867 460 906</p>
        <p>Địa chỉ: Hà Đông, Hà Nội, Việt Nam</p>
        <p>Email: phungtra@gmail.com</p>
      </div>
      <div className="footer-section">
        <h4>Hỗ trợ khách hàng</h4>
        <ul>
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/about">Giới thiệu</a></li>
          <li><a href="/categories">Danh mục</a></li>
          <li><a href="/news">Tin tức</a></li>
          <li><a href="/help">Hướng dẫn sử dụng</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; Bản quyền thuộc về Phùng Quang Trà | Cung cấp bởi Nhóm 1</p>
      </div>
    </footer>
    </div>
  );
};

export default TeachingScheduleReport;