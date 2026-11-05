import { renderStartScreen } from "../components/startScreen";

export function start(): void {
  document.body.append(
    ...renderStartScreen()
  );
}
