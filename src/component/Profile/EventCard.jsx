import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import format from "date-fns/format";

const EventCard = ({ coupon }) => {
  // nhớ npm install date-fns
  // Định dạng ngày tháng năm giờ phút từ chuỗi ngày
  const formattedValidFrom = format(
    new Date(coupon.validFrom),
    "dd/MM/yyyy HH:mm"
  );
  const formattedValidUntil = format(
    new Date(coupon.validUntil),
    "dd/MM/yyyy HH:mm"
  );

  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia sx={{ height: 345 }} image={coupon.images} />
        <CardContent>
          <Typography variant="h5">
            {coupon.name}{" "}
            {/* Thay 'name' bằng trường dữ liệu tên sự kiện trong đối tượng coupon */}
          </Typography>
          <Typography variant="body2">
            <span>GIFTCODE : </span> {coupon.code}{" "}
            {/* Thay 'description' bằng trường dữ liệu mô tả trong đối tượng coupon */}
          </Typography>
          <Typography variant="body2">
            <span>DISSCOUNT : </span> {coupon.discountPercentage}%{" "}
            {/* Thay 'description' bằng trường dữ liệu mô tả trong đối tượng coupon */}
          </Typography>
          <div>
            <p>{coupon.location}</p>{" "}
            {/* Thay 'location' bằng trường dữ liệu địa điểm trong đối tượng coupon */}
            <p className="text-sm text-blue-600">START: {formattedValidFrom}</p>{" "}
            {/* Hiển thị ngày bắt đầu đã định dạng */}
            <p className="text-sm text-red-600">
              END :{formattedValidUntil}
            </p>{" "}
            {/* Hiển thị ngày kết thúc đã định dạng */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCard;
