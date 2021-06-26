import * as alt from "alt-client";
interface ExampleWithHooksProps{

}
function ExampleWithHooks(props:ExampleWithHooksProps){

    const [_aStateProperty, _setAStateProperty] = React.useState<AClass>();
    const aStateProperty = React.useRef(_aStateProperty);

    const setAStateProperty =(newVal:AClass)=>{
        _aStateProperty.current = newVal;
        _setAStateProperty(newVal);
    }

    // MOUNTING THE COMPONENT --> SUBSCRIBING TO INCOMING EVENTS
    // UNMOUNTING THE COMPONENT --> UNSUBSCRIBE TO INCOMING EVENTS
    React.useEffect(()=>{
        alt.on("UpdateAProperty", setAStateProperty);
        return ()=>{
            alt.off("UPdateAProperty", setAStateProperty);
        }
    },[])


    return <div>
        <AComponentUsingTheProperty property={aStateProperty.current} />
    </div>
}