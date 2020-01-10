import React from "react";
import cx from "classnames";
import "./Form.css";

export function Label({ className, ...props }) {
  return <label className={cx("Label", className)} {...props} />;
}

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={cx("Input", className)}
      type="text"
      ref={ref}
      {...props}
    />
  );
});

export function Required({ className, ...props }) {
  return <span className={cx("Required", className)} {...props}></span>;
}

export function Textarea({ className, ...props }) {
  return <textarea className={cx("Textarea", className)} {...props} />;
}
