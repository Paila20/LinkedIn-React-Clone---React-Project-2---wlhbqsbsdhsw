import React, { useState } from "react";
import { Button, Form,  Modal} from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { createPost, updatePost } from "../../../utils/user/post";
import { toast } from "react-toastify";
import "./index.css";
import { UseAuthContext } from "../../../helpers/AuthContext";


const ModalComponent = ({
  modalOpen,
  setModalOpen,
  fetchingPosts,
  isEdit,
  posts,
  currentUser
 
}) => {
  const [form] = Form.useForm();
  const [imageUpload, setImageUpload] = useState(null);
  const {darkmode} = UseAuthContext();

  const handleFileUpload = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const handlingPostCreate =  () => {
    form.validateFields().then(async (formValues) => {
      const formData = new FormData();
   
      formData.append("title", formValues.title);
      formData.append("content", formValues.content);
      formData.append("images", imageUpload);

      if (isEdit !== true) {
        if(currentUser !== undefined){
          const creatingPost = await createPost(formData, currentUser.token);

          if (creatingPost.status === 201) {
            toast.success("You created a new post");
            form.resetFields();
            setImageUpload(null);
            setModalOpen(false);
            fetchingPosts();
          } else {
            toast.error("Something went wrong");
          }
        }
       
      } else {
        if(currentUser !== undefined){
          const updatingPost = await updatePost(formData, posts._id, currentUser.token);
        if (updatingPost.status === 200) {
          toast.success("You updated your post");
          form.resetFields();
          setImageUpload(null);
          setModalOpen(false);
          fetchingPosts();
        } else {
          toast.error("Something went wrong");
        }
       }
        
      }
    });
  };

  return (
    <div   style={{ backgroundColor: darkmode ? 'black' : '' }}>
      <Modal
        title=""
        className={darkmode ? "input-dark-mode " : "modal-createpost"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        style={{ backgroundColor: darkmode ? 'black' : 'grey' }}
      >
        <p className="modal-email"> {currentUser.data.user.email}</p>
        <Form
          form={form}
          name="basic"
          onFinish={handlingPostCreate}
          autoComplete="off"
          initialValues={{
            title :posts !== null ? posts.title : null,
            content: posts !== null ? posts.content : null,
          }}
          style={{ backgroundColor: darkmode ? 'black' : '' }}
        >
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please write something to create post!",
              },
            ]}
          >
          
          {posts?.title ? (
              <input 
     
              className="modalin"
                defaultValue={posts.title}
                placeholder="title"
                style={{ backgroundColor: darkmode ? 'black' : '' ,color : darkmode ? 'white': '' }}
              />
            ) : (
              <input 
              className="modalin"
              placeholder="title" 
              style={{ backgroundColor: darkmode ? 'black' : '', color : darkmode ? 'white': '' }}/>
            )} 
                      
          </Form.Item>

        <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please write something to create post!",
              },
            ]}
          >

           {posts?.content ? (
              <TextArea 
           
              className="modal-input"
                defaultValue={posts.content}
                placeholder="What do you want to talk about?"
                style={{ backgroundColor: darkmode ? 'black' : '', height: 300,color : darkmode ? 'white': ''  }}
              />
            ) : (
              <TextArea className="modal-input"
             
               style={{ backgroundColor: darkmode ? 'black' : '', height: 300, color : darkmode ? 'white': ''  }}
               placeholder="What do you want to talk about?" />
            )} 

          
          </Form.Item>

          <label htmlFor="pic-upload">
            <AiOutlinePicture size={35} className="picture-icon"  style={{color : darkmode ? 'white': '' }}/>
          </label>

          <input
            id="pic-upload"
            type={"file"}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileUpload}
          />

          <Button type="primary" htmlType="submit" className="post-btn">
            {isEdit !== true ? "Post" : "Update"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalComponent;
