import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

export default function ModalIMG() {
    // const [file, setFile] = useState();
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles[0]);
        // Do something with the files
      }, []);
      const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({ onDrop });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        formData.append("upload_preset", "ofzmhwkh");
        formData.append("api_key", "542713237697278");
    
        // console.log(e.target[1].files[0])
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dkzxujw6k/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        console.log(data);
      };
    
      return (
        <div>
          <form onSubmit={handleSubmit}>    
            <div
              {...getRootProps()}
              style={{
                background: "#e3e3e3",
                padding: "20px",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
    
            {acceptedFiles[0] && (
              <img src={URL.createObjectURL(acceptedFiles[0])} alt="" 
                style={{
                  width: '300px',
                  height: '300px'
                }}
              />
            )}
    
            <button>Enviar</button>
          </form>
        </div>
      );
}
