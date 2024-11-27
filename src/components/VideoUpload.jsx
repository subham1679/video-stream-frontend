import React, { useState } from 'react';
import videoLogo from '../assets/play-video.png';
import { Button, Card, Label, FileInput, TextInput, Textarea, Progress, Alert } from 'flowbite-react';
import axios from 'axios';

function VideoUpload() {
    const [selectFile, setSelectFile] = useState(null);
    const [meta, setMeta] = useState({
        title: "",
        description: "",
    });
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    function handleFileChange(event) {
        console.log(event.target.files[0]);
        setSelectFile(event.target.files[0]);
    }


    function formFieldChange(event) {
        // console.log(event.target.name);
        // console.log(event.target.value);
        setMeta({
            ...meta,
            [event.target.name]: event.target.value,
        });

    }

    function handleForm(formEvent) {
        if (!selectFile) {
            alert("Please select a file");
            return;

        }
        formEvent.preventDefault();
        uploadToServer(selectFile, meta);
    }


    //method to save video to server
    async function uploadToServer(video, videoMetaData) {

        let formData = new FormData();
        formData.append("title", videoMetaData.title);
        formData.append("description", videoMetaData.description);
        formData.append("file", selectFile);

        setUploading(true);
        try {

            const resposne = await axios.post("http://localhost:8080/api/video", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },

                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(percentage);
                    setProgress(percentage); // Update the progress state
                },

            });

            console.log(resposne);

            setMessage("File Uploaded");
            setUploading(false);

        } catch (error) {
            console.log(error);
            setMessage("Error in uploading file");
            setUploading(false);  //even if error occurs make set uploading to false
        }

    }

    return (
        <div className="text-white">
            <Card className="flex flex-col items-center justify-center">
                <h1>Upload your video here</h1>

                <div>
                    {/* Form with flex container */}
                    <form className="space-y-4" onSubmit={handleForm}>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="file-upload" value="Upload file" />
                            </div>
                            <TextInput onChange={formFieldChange} id="title" name="title" placeholder='Enter Title' />
                        </div>

                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="comment" value="Video Description" />
                            </div>
                            <Textarea onChange={formFieldChange} id="description" name="description" placeholder="Write video description..." required rows={4} />
                        </div>

                        <div className='flex items-center space-x-4 justify-center'>
                            <div className='shrink-0'>
                                <img className="h-16 w-16 object-cover" src={videoLogo} alt="Current profile photo" />
                            </div>
                            <label className="block">
                                <span className="sr-only">Choose video file</span>
                                <input
                                    name="file"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-r-xl file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100"
                                />
                            </label>
                        </div>

                        <div className="mt-4">
                            {uploading &&
                                <Progress progress={progress} textLabel="Uploading..." size="lg" labelProgress labelText />
                            }
                        </div>

                        <div className="mt-4">
                            {message &&
                                <Alert color="info">
                                <span className="font-medium"></span> Successfully Uploaded
                              </Alert>
                            }
                        </div>

                        <div className="flex justify-center mt-4">
                            <Button disabled={uploading} type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default VideoUpload;
