import { useRouteError } from "react-router-dom";
import ButtonRedirect from "@/components/buttons/redirectButton";

const ErrorPage = () => {
  const error: any = useRouteError();

  const errorStatus = error.response?.status as number;

  const errorMessage = {
    403: {
      message: "It seems your session has expired, please login again",
      redirect: "/login",
      redirectLabel: "Back to login",
      code: 403,
    },
    404: {
      message: "We can't seem to find the page you're looking for",
      redirect: "/",
      redirectLabel: "Back to home",
      code: 404,
    },
    500: {
      message:
        "Well, this is unexpected…An error has occurred and we're working to fix the problem!",
      redirect: "/",
      redirectLabel: "Back to home",
      code: 500,
    },
  }[errorStatus || 404];

  return (
    <>
      <div className="absolute top-1/2 left-1/2 max-w-[450px] -translate-y-2/4 -translate-x-2/4">
        <h1 className="mb-6 text-7xl font-bold">Ooops!</h1>
        <p className="mb-3 text-3xl">{errorMessage?.message}</p>
        <p className="text-normal mb-6 font-semibold">
          Error code: {errorMessage?.code}
        </p>
        <ButtonRedirect
          redirect={errorMessage?.redirect!}
          label={errorMessage?.redirectLabel!}
          styles="button-primary px-6"
        />
      </div>
    </>
  );
};

export default ErrorPage;
