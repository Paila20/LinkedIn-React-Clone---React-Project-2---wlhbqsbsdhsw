import React, { useState } from 'react';
import { Button, Modal, Typography, Input, Upload, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
import './index.css';
import { creatingagroup } from '../../../utils/user/search';
import { UseAuthContext } from '../../../helpers/AuthContext';

export default function CreateGroup({getChannel}) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const {darkmode, currentUser} = UseAuthContext();

  const createGroup = () => {
    form.validateFields().then (async(formValues)=>{
      let formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
    
      if(currentUser !== undefined){
        const result = await creatingagroup(formData,  currentUser.token);
        console.log(result)
        if(result.status === 200){
        
          form.resetFields();
      
          setOpen(false);
          getChannel();

         
        }
      }
    })
   };


  return (
    <div className="mainGroupContainer" style={{ backgroundColor: darkmode ? 'black' : '' }}>
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
        <Form  form={form} onFinish={createGroup} initialValues={{remember:true}}>
        <div className="coverGroup">
          <div className="groupDp">
         
          </div>
        
        </div>
        <Form.Item  name="name"
            rules={[
              {
                required: true,
                message: "Please write group name to create group!",
              },
            ]}>
        <div className="flex flexc groupName">
          <label>Group Name*</label>
          <Input
            placeholder="ENTER YOUR GROUP NAME"
          
         
          />
        </div>
        </Form.Item>
        <Form.Item  name="description"
            rules={[
              {
                required: true,
                message: "Please write something to create group!",
              },
            ]}>
        <div className="flex flexc description">
          <label>Description*</label>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="What do you want to talk about?"
  

          />
        </div>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
