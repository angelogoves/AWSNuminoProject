import React, { useState } from "react";
import AWS from "aws-sdk";
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "./drop.css";

const S3_BUCKET = "angelowebapp";
const REGION = "ap-south-1";

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Drop = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
    Swal.fire({
      icon: "success",
      title: "File Uploaded.!!!",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      window.location.reload();
    });
  };

  return (
    <div className="small-container">
      <div>
        <div className="drop-file-input">
          <FaCloudUploadAlt size="169px" />
          <p id="drop-file-input-text">Select Excel File to Add Students</p>
          <input
            className="choosefile"
            type="file"
            onChange={handleFileInput}
          ></input>
          <br></br>
          <br></br>
          <br></br>
        </div>
        <button
          className="accent-button"
          style={{ textAlign: "center", marginTop: "4%" }}
          onClick={() => uploadFile(selectedFile)}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Drop;

//<p>File Upload Progress is {progress}%</p>
