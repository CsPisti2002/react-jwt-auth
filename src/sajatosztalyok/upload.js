
import axios from 'axios';
import React,{useState} from 'react'

function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);
            //------------------------------------------------------------------------------------------------------------------------------
            alert(props.termek_nev)

            let bemenet={
                bevitel1:props.termek_nev,
                bevitel2:props.termek_info,
                bevitel3:props.termek_ar,
                bevitel4:fileName,
                bevitel3:props.termek_tipus,
              }
          
              fetch('http://localhost:8080/termekfelvitel2',{
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              }
                 
              )
              .then((response) => response.text())


            //--------------------------------------------------------------------------------------------------------------------------------

        } catch (ex) {
            console.log(ex);
        }
    };

        return (
            <div  className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Feltöltés</button>
            </div>
        );
}




export default FileUpload;


