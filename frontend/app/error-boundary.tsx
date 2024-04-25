import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
  type ErrorResponse,
} from "@remix-run/react";
import { getErrorMessage, useIsDevmode } from "utils/utils.ts";

type StatusHandler = (info: {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
}) => JSX.Element | null;

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <p>
      {error.status}{" "}
      {typeof error.data?.message === "string"
        ? error.data?.message
        : error.data?.message?.join(", ")}
    </p>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}) {
  const error = useRouteError();
  const params = useParams();
  const isDev = useIsDevmode();

  if (typeof document !== "undefined") {
    console.error(error);
  }
  return (
    <div className="max-w-[800px] mx-auto flex items-center justify-center">
      <div className="text-2xl flex items-center justify-center p-20">
        {isRouteErrorResponse(error)
          ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
              error,
              params,
            })
          : unexpectedErrorHandler(error)}
      </div>
    </div>
  );
}
