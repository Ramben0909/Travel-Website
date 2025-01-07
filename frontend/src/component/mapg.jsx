"use client"
import {APIProvider, Map, AdvancedMarker,Pin,InfoWindow} from '@vis.gl/react-google-maps';

const mapg = () => {
 const position ={lat:22.56166,long:88.35130};

  return (
    <APIProvider apiKey={'Your API key here'}>
    <div style={{height:"80%",width:"100%"}}>
    <Map zoom={9}
    centre={position}>
    </Map>
    </div>
    </APIProvider>
  )
}

export default mapg;


 
 

