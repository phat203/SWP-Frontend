import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

export default function AddressCard(item, showButton, handleSelectAddress) {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>ThaoDien,P.Quan2,Thu Duc,TP.HCM</p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleSelectAddress(item)}
              sx={{
                color: 'blue', // Text color
                borderColor: 'blue', // Border color
                '&:hover': {
                  borderColor: 'darkblue', // Darker blue on hover
                  backgroundColor: 'lightblue', // Light blue background on hover
                }
              }
            }
          >
            select
          </Button>
        )}
      </div>
    </Card>
  );
}
