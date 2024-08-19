"use client";
import React from "react";
import { CartProvider } from "react-use-cart";

const MyAppCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <CartProvider>{children}</CartProvider>;
};

export default MyAppCartProvider;
