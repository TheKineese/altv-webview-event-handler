import * as React from "react";
import * as AltWrapper from "./altV-WebView-Wrapper";

export interface SubscribeExampleProps {}

export interface SubscribeExampleState {}

class SubscribeExample extends React.Component<
  SubscribeExampleProps,
  SubscribeExampleState
> {
  constructor(props: SubscribeExampleProps) {
    super(props);
    this.state = {};
    AltWrapper.on("Foo:Bar", this.foobarHandler.bind(this));
  }

  foobarHandler(some: any, arguments: any) {
    //Do some stuff;
  }

  render() {
    return <div></div>;
  }
}

export default SubscribeExample;
