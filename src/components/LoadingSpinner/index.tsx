import React from "react";
import { Spinner } from "react-bootstrap";

// import styles from "../LoadingSpinner/

interface ILoadingSpinnerProps {
  className?: string | undefined;
  isButtonSpinner?: boolean;
}

export default function LoadingSpinner({
  // className = styles.loading,
  isButtonSpinner = false,
}: ILoadingSpinnerProps) {
  return isButtonSpinner ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div className="h-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
