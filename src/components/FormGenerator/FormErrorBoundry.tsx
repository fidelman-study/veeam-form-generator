import { Component, ReactNode } from "react";
import { ErrorAlert } from "./ErrorAlert";

type IErrorBoundaryProps = {
  children: ReactNode;
};

type IErrorBoundaryState = {
  error: unknown;
};

export class FormErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <ErrorAlert error={this.state.error} />;
    }

    return this.props.children;
  }
}
