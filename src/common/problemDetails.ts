export type ErrorType = "unknown" | "invalid-input" | "not-found";

export interface IErrorDetails extends Error {
  reason: string;
  errorType: ErrorType;
  toJSON(): Record<string, any>;
}

export class ProblemDetails extends Error implements IErrorDetails {
  reason: string;
  errorType: ErrorType;
  constructor(reason: string, errorType: ErrorType = "unknown") {
    super(reason);
    this.reason = reason;
    this.errorType = errorType;
  }
  toJSON(): Record<string, any> {
    return {
      reason: this.reason,
      errorType: this.errorType,
      stack: this.stack,
    };
  }

  static unkownError(message: string): ProblemDetails {
    return new ProblemDetails(message, "unknown");
  }

  static invalidInputError(message: string): ProblemDetails {
    return new ProblemDetails(message, "invalid-input");
  }

  static notFoundError(message: string): ProblemDetails {
    return new ProblemDetails(message, "not-found");
  }
}

export function isProblemDetails(err: unknown): err is ProblemDetails {
  return (
    typeof err === "object" &&
    err !== null &&
    "errorType" in err &&
    typeof (err as any).errorType === "string"
  );
}
