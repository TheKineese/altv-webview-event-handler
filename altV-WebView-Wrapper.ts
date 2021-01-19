const onStorage: [string, Function[]][] = [];

/**
 * Adds a subscription to an Alt:V-Event emitted by client.
 * @param EventName EventName you want to subscribe to.
 * @param AFunction The handling function you want to be executed.
 */
export function on(EventName: string, AFunction: Function) {
  // console.log(`Incoming>> Name ${EventName}, ${AFunction.toString()}`);
  //@ts-ignore
  alt.on(EventName, AFunction); //eslint-disable-line no-undef

  let existingEntry = onStorage.find((i) => i[0] === EventName);
  if (existingEntry) {
    existingEntry[1].push(AFunction);
  } else {
    onStorage.push([EventName, [AFunction]]);
  }
}

/**
 * Emits an event which has to be handeled by the client.
 * @param EventName EventName you want to send.
 * @param Parameters List of paramters to be submitted to the client.
 */
export function emit(EventName: string, ...Parameters: any[]) {
  // @ts-ignore
  alt.emit(EventName, ...Parameters);

  // console.log(`${EventName}: ${Parameters.join(", ")}`);
}

/**
 * If you are smart you might made your UI accessible for (non automatic) tests and use this function to mock client-event calls. You may use this function in your index.html.
 * @param EventName
 * @param args
 */
export function fireAltEvent(EventName: string, ...args: any): void {
  var storageEntry = onStorage.find((entry) => entry[0] === EventName);
  if (!storageEntry) {
    console.log("Event without subscription:", EventName);
    return;
  }
  for (var index = 0; index < storageEntry[1].length; index++) {
    let functionToCall = storageEntry[1][index];
    functionToCall.apply(null, args);
  }
}
