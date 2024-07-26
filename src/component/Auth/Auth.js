// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Box, Modal, styled } from '@mui/material';
// import RegisterForm from './RegisterForm';
// import LoginForm from './LoginForm';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export const Auth = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleOnClose = () => {
//     navigate('/');
//   };

//   return (
//     <Modal
//       open={location.pathname === "/account/register" || location.pathname === "/account/login"}
//       onClose={handleOnClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         {location.pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
//       </Box>
//     </Modal>
//   );
// };
