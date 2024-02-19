
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Sign from './Components/sign/Sign';
import { useState } from 'react';
import Signup from './Components/Register/Signup';


function App() {
  const [input, setinput] = useState("")
  const [imageUrl, setimageUrl] = useState("")
  const [box, setbox] = useState("")
  const [route, setroute] = useState("")
  const [isSignedIn, setisSignedIn] = useState(false)

  const onInputChange = (event) => {
    console.log(event.target.value)
    setinput(event.target.value)
  }



  const calculateFaceLocation = (data) => {
    let clarifyFace = data
    const imageElement = document.getElementById('input_image');
    const imageWidth = Number(imageElement.offsetWidth);
    const imageHeight = Number(imageElement.offsetHeight)

    console.log(imageElement.offsetWidth, "css image")

    return {
      leftCol: clarifyFace.left_col * imageWidth,
      topRow: clarifyFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifyFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifyFace.bottom_row * imageHeight)
    }

  }

  const displayFaceBox = (box) => {

    setbox(box)
  }

  const onRouteChange = (Route) => {
    console.log(Route)
    if (Route === "Home") {
      setisSignedIn(true)
    } else {
      setisSignedIn(false)
    }
    setroute(Route)
  }


  const onButtonSubmit = () => {
    setimageUrl(input)
    console.log('clicked')

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '5c5bcb7079384973a7208f144278ae78';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'v01pks6uzplt';
    const APP_ID = "image_detector";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = input
    //'https://samples.clarifai.com/metro-north.jpg';

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });



    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };


    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => {
        var jsonObj = JSON.parse(result)
        if (jsonObj.outputs[0].status.details) {
          throw new Error("long url ")
        } else {
          console.log(jsonObj.outputs[0].data.regions[0].region_info.bounding_box)
          displayFaceBox(calculateFaceLocation(jsonObj.outputs[0].data.regions[0].region_info.bounding_box))
        }


      })
      .catch(error => console.log('error', error));



    //{"status":{"code":10000,"description":"Ok","req_id":"6881b9bd93dee7992af461e2616bb89a"},"outputs":[{"id":"3fd06c96b4bd489ca3a18f6ba34e9a77","status":{"code":10000,"description":"Ok"},"created_at":"2023-06-22T17:34:44.607335799Z","model":{"id":"face-detection","name":"Face","created_at":"2020-11-25T16:50:24.453038Z","modified_at":"2022-10-11T17:30:18.021257Z","app_id":"main","model_version":{"id":"6dc7e46bc9124c5c8824be4822abe105","created_at":"2021-03-04T17:40:26.081729Z","status":{"code":21100,"description":"Model is trained and ready"},"visibility":{"gettable":50},"app_id":"main","user_id":"clarifai","metadata":{}},"user_id":"clarifai","model_type_id":"visual-detector","visibility":{"gettable":50},"toolkits":[],"use_cases":[],"languages":[],"languages_full":[],"check_consents":[],"workflow_recommended":false},"input":{"id":"d4ffe09f5f7b4c16b4ebfd38a2a8ef0d","data":{"image":{"url":"https://media.istockphoto.com/id/583809524/photo/alberta-wilderness-near-banff.jpg?s=1024x1024\u0026w=is\u0026k=20\u0026c=6bxHWXai9KT3HiuxUYEMWz4JBEmbaK55K06auBoct1o="}}},"data":{"regions":[{"id":"1ea2efb37becb354f9acbc7e25583f17","region_info":{"bounding_box":{"top_row":0.16747516,"left_col":0.80385715,"bottom_row":0.52223694,"right_col":0.9991554}},"data":{"concepts":[{"id":"ai_b1b1b1b1","name":"BINARY_POSITIVE","value":0.57878864,"app_id":"main"}]},"value":0.57878864}]}}]}

  }
  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "Home" ? <div>
        <Logo />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
        <FaceRecognition imageUrl={imageUrl} box={box} />
      </div> : (
        route === "signin" ?
          <Sign onRouteChange={onRouteChange} /> : <Signup onRouteChange={onRouteChange} />
      )

      }

    </div>
  );
}

export default App;
