import { useRef } from 'react';

export default function FileUploader({ onFileSelect }) {
    const fileInput = useRef(null);

    const handleFileInput = (e, onFileSelectError, onFileSelectSuccess) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > 1024) onFileSelectError({ error: 'File size cannot exceed more than 1MB' });
        else onFileSelectSuccess(file);
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} />
            <button type="submit" onClick={() => fileInput.current && fileInput.current.click()} className="btn btn-primary" />
        </div>
    );
}
