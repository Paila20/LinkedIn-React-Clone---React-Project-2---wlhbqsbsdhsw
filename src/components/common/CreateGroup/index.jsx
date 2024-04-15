import React, { useState } from 'react';
import { Button, Modal, Typography, Input, Upload } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import './index.css';
import { creatingagroup } from '../../../utils/user/search';

export default function CreateGroup({getChannel}) {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');


  const createGroup = async () => {
    let formData = new FormData();
    formData.append("name", channelName);
    formData.append("description", channelDescription);
     
      const result = await creatingagroup(formData);

      console.log(' res', result);
    if(result.status === 200){

    
      getChannel();
      setChannelName('');
      setChannelDescription('');
     
    }
    
  };


  return (
    <div className="mainGroupContainer">
      <Button type="primary" onClick={() => setOpen(true)}>
        Create Group
      </Button>
      <Modal
        title="Create group"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          
          <Button key="submit" type="primary" onClick={()=>{setOpen(false),createGroup()}}>
            Post
          </Button>,
        ]}
      >
        <div className="coverGroup">
          <div className="groupDp">
            <Upload showUploadList={false}>
              <Button icon={<EditOutlined />} />
            </Upload>
          </div>
        
        </div>
        <div className="flex flexc groupName">
          <label>Group Name*</label>
          <Input
            placeholder="ENTER YOUR GROUP NAME"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
        <div className="flex flexc description">
          <label>Description*</label>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="What do you want to talk about?"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}
