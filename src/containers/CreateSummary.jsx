import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Uploader = () => {  
  return (
    <Dropzone
      getUploadParams={() => ({ url: 'https://httpbin.org/post  ' })} // specify upload params and url for your files
      onChangeStatus={({ meta, file }, status) => { console.log(status, meta, file) }}
      onSubmit={(files) => { console.log(files.map(f => f.meta)) }}
      accept="image/*,audio/*,video/*"
    />
  )
}

export default Uploader