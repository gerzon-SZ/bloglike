import { useEffect } from "react";
import { useTestQuery } from "../features/api/test";

export const ComponentTest = () => {
  const { data, isLoading, isSuccess, isError, error } = useTestQuery({ page: 1, limit: 10 });

  useEffect(() => {
    if (data) {
      console.log(data, " data here");
    }
  }, [data]);
  useEffect(() => {
    if (isLoading) {
      console.log("loading");
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      console.log("success");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      console.log("error");
    }
  }, [isError]);
  useEffect(() => {
    if (error) {
      console.log(error, " error here");
    }
  }, [error]);
  return (
    <>
      <h1>{data ? data.data.map((i) => i) : "loading"}</h1>
    </>
  );
};
