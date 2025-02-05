import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import axios, { AxiosRequestConfig} from "axios";

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
    const [downloadPerct, setDownloadPerct]=useState(0);
  useEffect(() => {
    const options: AxiosRequestConfig={
        responseType:'blob',
        onDownloadProgress: function({loaded, total}){
            setDownloadPerct(total? Math.floor((loaded/total)*100): 0)
        }
    }
    axios
      .get(
        "https://picsum.photos/id/0/5000/3333", options
      )
      .then((res) => res)
      .catch((err) => console.log(err));
  }, []);

  return (
    <CenterContainer>
      <h2>Downloading</h2>
      <ProgressBar width={downloadPerct}/>
    </CenterContainer>
  );
}

export default App;
