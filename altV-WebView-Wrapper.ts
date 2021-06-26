var onStorage: [string, { (...args: any[]): void}[]][] = [];

/**
 * Adds a subscription to an Alt:V-Event emitted by client.
 * @param EventName EventName you want to subscribe to.
 * @param AFunction The handling function you want to be executed.
 */
export function on(EventName: string, AFunction: { (...args: any[]): void}) {
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


export function off(EventName:string, AFunction: { (...args: any[]): void}){
  //@ts-ignore
  alt.off(EventName, AFunction) //eslint-disable-line no-undef

 /**
  *  THIS PART IS BLINDLY IMPLEMENTED. NOT TESTED
  * */ 
  //   let existingEntry = onStorage.find((i) => i[0] === EventName);
  //     if(!existingEntry){
  //     console.log(`No event-handling found for event-name ${EventName}`)
  //     return;
  //   }
  //   existingEntry[1] = existingEntry[1].filter(f=>f!==AFunction);
  
}

/**
 * Emits an event which has to be handeled by the client.
 * @param EventName EventName you want to send.
 * @param Parameters List of paramters to be submitted to the client.
 */
export function emit(EventName: string, ...Parameters: any[]) {
  // @ts-ignore
  alt.emit(EventName, ...Parameters);

  /**
   * To mock a server-callback you can just check the event-name and emulate datachanges.
   * Use fireAltEvent() to trigger the callback-event
   */
}


/**
 * If you are smart you might made your UI accessible for (non automatic) tests and use this function to mock client-event calls. 
 * You may use this function in your index.html (or where the Root-Component will be mounted).
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
