import { useDropzone } from "react-dropzone";
import { useState, useCallback, useRef } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

export default function ModalIMG() {
  // const [file, setFile] = useState();
  const [slideImages, setSlideImages] = useState([
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 1",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Slide 2",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Slide 3",
    },
]);
  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[acceptedFiles.length - 1]);

    let image = {
      url: URL.createObjectURL(acceptedFiles[acceptedFiles.length - 1]),
      caption: `Slide ${slideImages.length + 1}`,
    };
    setSlideImages(...slideImages, image);

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

        {acceptedFiles[0] ? (
          <div style={{ width: "70%", margin: "auto" }}>
            <Slideshow />
          </div>
        ) : (
          <></>
        )}

        <button>Enviar</button>
      </form>
    </div>
  );
}
