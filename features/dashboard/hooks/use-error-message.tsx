import React from "react";

type ErrorItemType = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

type ErrorType = string | ErrorItemType | ErrorItemType[];

const Msg = ({ error }: { error: string }) => {
  return (
    <small className="flex min-h-4 h-full text-xs text-destructive">
      {error}
    </small>
  );
};

export default function useErrorMessage(error: ErrorType = ""): React.ReactNode {
  
  // if string
  if (typeof error === "string") {
    return <Msg error={error} key={error} />;
  }
  // if array
  if (Array.isArray(error)) {
    return error.map((item) => (
      <Msg error={`${item.path}: ${item.msg}`} key={`${item.path}-${item.msg}`} />
    ));
  }
  // if object
  return <Msg error={`${error.path}: ${error.msg}`} key={`${error.path}-${error.msg}`} />;
}
