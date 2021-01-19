# Alt:V WebView Wrapper
These functions allows you to handle Alt:V Client events raised in the WebView.

## Features:
- Multiple subscriptions to an event.
- Mock incoming events for local-tests.

## How to use:

### Subscribe to an event

```ts
import * as React from 'react';
import * as AltWrapper from "./altV-WebView-Wrapper"

export interface SubscribeExampleProps {}
 
export interface SubscribeExampleState {}
 
class SubscribeExample extends React.Component<SubscribeExampleProps, SubscribeExampleState> {
    constructor(props: SubscribeExampleProps) {
        super(props);
        this.state = {};
        AltWrapper.on("Foo:Bar", this.foobarHandler.bind(this))
    }

    foobarHandler(some:any, arguments:any){
        //Do some stuff;
    }

    render() { 
        return ( <div></div> );
    }
}
 
export default SubscribeExample;
```

### How to emit an event
```js
import * as React from "react";
import * as AltWrapper from "./altV-WebView-Wrapper";

export interface EmitExampleProps {}

export interface EmitExampleState {}

class EmitExample extends React.Component<
  EmitExampleProps,
  EmitExampleState
> {
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

```

### How to test your components locally
To make sure that your index.html has loaded the Alt:V module you should mount your root component inside the `DOMContentLoaded` event handler.
```js
import React from "react";
import ReactDOM from "react-dom";
import { emit, fireAltEvent } from "./altV-WebView-Wrapper";
document.addEventListener("DOMContentLoaded", HasFinished);
function HasFinished(arg) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
```

Now you can mock client-emits by using the `fireAltEvent`-Function.

```js
import React from "react";
import ReactDOM from "react-dom";
import { emit, fireAltEvent } from "./altV-WebView-Wrapper";
document.addEventListener("DOMContentLoaded", HasFinished);
function HasFinished(arg) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

fireAltEvent("foo:bar", "some","arguments");
```



