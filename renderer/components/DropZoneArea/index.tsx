import { UploadCloud } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

type Props = {
  sendFiles: Dispatch<SetStateAction<File[]>>;
  accept?: Accept;
  multiple?: boolean;
  textLabel1?: string;
  textLabel2?: string;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  disabled?: boolean;
  onChange?: (...event: any[]) => void;
  onBlur?: any;
  name: string;
  processingFiles?: boolean;
};

const DropZoneArea = ({
  sendFiles,
  accept = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    // "image/jpeg": [],
  },
  multiple = false,
  textLabel1 = "Click to upload or drag and drop",
  textLabel2 = "SVG, PNG, JPG or GIF (MAX, 800x400px)",
  maxFiles = 0,
  maxSize,
  minSize,
  disabled = false,
  onChange,
  onBlur,
  name = "file",
  processingFiles = false,
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };
  const {
    getInputProps,
    acceptedFiles,
    fileRejections,
    getRootProps,
    inputRef,
  } = useDropzone({
    onDrop,
    multiple,
    accept,
    maxFiles,
    maxSize,
    minSize,
    disabled,
  });

  function removeAll() {
    console.log("removeAll...");
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    inputRef.current.value = "";
    console.log(acceptedFiles);
  }

  const acceptedFileItems = files.map((file, i) => {
    return <li key={String(i)}>{file.name}</li>;
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }, i) => (
    <li key={String(i)} className="text-error">
      {file.name}
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    if (files.length > 0) {
      sendFiles(files);
    }
  }, [files]);

  useEffect(() => {
    if (processingFiles) {
      setFiles([]);
    }
  }, [processingFiles]);

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center w-full"
        {...getRootProps()}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud
              size={34}
              className="dark:text-gray-400 text-black mb-4"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {textLabel1}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {textLabel2}
            </p>
          </div>
          <input
            {...getInputProps({
              id: name,
              onChange,
              onBlur,
            })}
          />
        </label>
      </div>
      {files.length > 0 && (
        <ol className="list-decimal px-8 py-2 border-dashed border-blue-700 rounded-b-md border-t-0 border-2">
          {acceptedFileItems}
        </ol>
      )}
      {fileRejections.length > 0 && (
        <ol className="list-decimal px-8 py-2 border-dashed border-blue-700 rounded-b-md border-t-0 border-2">
          {fileRejectionItems}
        </ol>
      )}
    </div>
  );
};

export default DropZoneArea;
