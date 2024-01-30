import { Alert } from "react-bootstrap";
import { NetworkError } from "@rest-hooks/react";
import React from "react";

export default function NetworkErrorMessage({
  error,
}: {
  error: NetworkError;
}) {
  return (
    <Alert variant="danger">
      {error.status} {error.response && error.response.statusText}
    </Alert>
  );
}
