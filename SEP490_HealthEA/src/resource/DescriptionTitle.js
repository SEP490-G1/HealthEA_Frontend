const value = {
  LEU: {
    Description: 'Là dấu hiệu giúp phát hiện tình trạng nhiễm trùng đường niệu. ',
    Title: 'Chỉ số bạch cầu trong máu',
    Notice: '',
    Warning:
      'Nếu kết quả xét nghiệm sinh hóa nước tiểu dương tính nghĩa là nhiễm trùng đường tiểu, cần vệ sinh sạch sẽ và uống nhiều nước'
  },
  P002: 'Quần jean',
  P003: 'Giày thể thao'
}

const mappingIndex = {
  'Leukocytes (LEU-BLO)': value['LEU'],
  Leukocytes: value['LEU'],
  BLO: value['LEU'],
  LEU: value['LEU'],
  'NIT (Nitrite)':
    'Là dấu hiệu phát hiện tình trạng nhiễm trùng đường tiểu - Chỉ số bình thường âm tính',
  NIT: 'Là dấu hiệu phát hiện tình trạng nhiễm trùng đường tiểu - Chỉ số bình thường âm tính',
  Nitrite: 'Là dấu hiệu phát hiện tình trạng nhiễm trùng đường tiểu Chỉ số bình thường âm tính'
}

export default  {
    mappingIndex
}
