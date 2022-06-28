import React from "react";
import { Button } from "react-bootstrap";

function ComponentButton({
  children,
  action,
  variant,
  size,
  loading,
  disable,
  className,
}) {
  return (
    <Button
      className={className}
      onClick={action}
      variant={variant}
      size={size}
      disabled={disable}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}

export default ComponentButton;
