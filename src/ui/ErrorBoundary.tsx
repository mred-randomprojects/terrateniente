import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface Props {
  readonly children: ReactNode;
  /** Optional custom screen; `reset` remounts the children. */
  readonly fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  readonly error: Error | null;
}

/** Keeps a render crash from blanking the whole app. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[error-boundary]", error, info.componentStack);
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) return this.props.children;
    if (this.props.fallback) return this.props.fallback(error, this.reset);
    return (
      <div className="setup" role="alert">
        <div className="setup-card">
          <h1>Algo falló</h1>
          <p className="hint">Recargá la página para seguir.</p>
          <button type="button" className="primary" onClick={() => window.location.reload()}>
            Recargar
          </button>
        </div>
      </div>
    );
  }
}
