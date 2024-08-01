import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupons } from "../State/Event/Action";
import EventCard from "./EventCard";
import { Dialog, DialogContent, DialogTitle, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export const EventShow = () => {
  const dispatch = useDispatch();
  const coupon = useSelector((state) => state.coupon);
  const jwt = localStorage.getItem("jwt");

  const [fadeIn, setFadeIn] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    // Dispatch action to fetch coupons when the component is rendered
    dispatch(getCoupons(jwt));
  }, [dispatch, jwt]);

  useEffect(() => {
    if (coupon.coupons.length > 0) {
      setFadeIn(true);
    }
  }, [coupon.coupons]);

  // Function to get the two events closest to the current date
  const getClosestCoupons = (coupons) => {
    const currentDate = new Date();

    return coupons
      .map((coupon) => ({
        ...coupon,
        dateDifference: Math.abs(new Date(coupon.createdAt) - currentDate),
      }))
      .sort((a, b) => a.dateDifference - b.dateDifference) // Sort by date difference in ascending order
      .slice(0, 2); // Get the first two
  };

  const closestCoupons = getClosestCoupons(coupon.coupons);

  const fadeInStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 500ms, transform 500ms",
  };

  const handleCouponClick = (id) => {
    setSelectedCouponId(id);
  };

  const handleCloseDialog = () => {
    setSelectedCouponId(null);
  };

  const handleToggleShowEvents = () => {
    setShowEvents((prevShowEvents) => !prevShowEvents);
  };

  const handleCopyGiftCode = (giftCode) => {
    navigator.clipboard.writeText(giftCode).then(
      () => {
        console.log("Gift code copied to clipboard!");
        alert("Gift code copied!");
      },
      (err) => {
        console.error("Failed to copy gift code: ", err);
      }
    );
  };

  const selectedCoupon = closestCoupons.find(
    (coupon) => coupon.id === selectedCouponId
  );

  return (
    <div className="mt-5">
      <IconButton onClick={handleToggleShowEvents}>
        <VisibilityIcon />
      </IconButton>

      {showEvents && (
        <div className="flex flex-wrap gap-5">
          {closestCoupons.map((coupon) => (
            <div
              key={coupon.id}
              style={fadeInStyle}
              onClick={() => handleCouponClick(coupon.id)}
            >
              <EventCard coupon={coupon} />
            </div>
          ))}
        </div>
      )}

      <Dialog open={Boolean(selectedCouponId)} onClose={handleCloseDialog}>
        <DialogTitle>
          Coupon Details
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedCoupon && (
            <div>
              <EventCard coupon={selectedCoupon} />
              <div style={{ marginTop: "10px" }}>
                <span>GIFTCODE: {selectedCoupon.giftCode}</span>
                <IconButton onClick={() => handleCopyGiftCode(selectedCoupon.giftCode)}>
                  <FileCopyIcon />
                </IconButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
