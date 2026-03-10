import * as yup from 'yup';


const videoUploadSchema = yup.object().shape({
    videoFile: yup.mixed().required('Video file is required'),
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    thumbnailFile: yup.mixed().required('Thumbnail file is required'),
    playlist: yup.number().required('Playlist is required'),
    audience: yup.number().required('Audience is required'),
    visibility: yup.number().required('Visibility is required'),
    scheduleDate: yup.date().required('Schedule date is required'),
    scheduleTime: yup.string().required('Schedule time is required'),
});


export default videoUploadSchema;