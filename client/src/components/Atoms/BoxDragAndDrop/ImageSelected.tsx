import React from 'react';
import { XMarkIcon, PencilIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface Props {
    loading: boolean;
    img: string;
    onUpload: () => Promise<void>;
    onImageRemove: (index: number) => void;
    onImageUpdate: (index: number) => void
}

const ImageSelected = ({ 
    img, 
    loading, 
    onUpload, 
    onImageRemove, 
    onImageUpdate 
}: Props) => {

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <img className='image-selected rounded-full h-36 w-36' src={img} alt='image-selected' width={300} />
            <div className='container-buttons'>
                {
                    loading
                    ? <p className='loading-label'>Upload image ⏳...</p>
                    : <div className='flex gap-4'>
                        <button disabled={loading} onClick={onUpload}><ArrowUpTrayIcon className='h-5'/></button>
                        <button disabled={loading} onClick={() => onImageUpdate(0)}><PencilIcon className='h-5'/></button>
                        <button disabled={loading} onClick={() => onImageRemove(0)}><XMarkIcon className='h-5'/></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ImageSelected;