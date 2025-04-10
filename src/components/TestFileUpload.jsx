import  { useState } from 'react';

import {postResults} from "./../services/admin/admin"


const TestFileUpload = () => {


  const handleUpload = async () => {

      const response = await postResults()
      console.log( response.data )

  };

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <button onClick={handleUpload}>Upload File</button>
      
    </div>
  );
};

export default TestFileUpload;
// export default 