import * as React from "react";
import * as AltWrapper from "./altV-WebView-Wrapper";

export interface EmitExampleProps {}

export interface EmitExampleState {}

class EmitExample extends React.Component<EmitExampleProps, EmitExampleState> {
  constructor(props: EmitExampleProps) {
    super(props);
    this.state = {};
  }

  handleOnClick() {
    AltWrapper.emit("Foo:Bar", 1, true, ["Foo", "Bar"]);
  }

  render() {
    return <div onClick={() => this.handleOnClick()}></div>;
  }
}

export default EmitExample;
