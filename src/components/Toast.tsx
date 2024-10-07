import React from 'react';
import { Slide, ToastContainer as ToastifyContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainer = () => {
  return (
    <ToastifyContainer
      toastStyle={{ fontWeight: 500 }}
      position={'top-right'}
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={'light'} 
      transition={Slide}
    />
  );
};

export function SuccessToast(message: string) {
  return toast.success(message);
}
export function ErrorToast(message: string) {
  return toast.error(message);
}
export function WarnToast(message: string) {
  toast.warn(message);
}
export function InfoToast(message: string) {
  toast.info(message);
}