import React, { useState } from "react";
import { Button, Form,  Modal} from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { createPost, updatePost } from "../../../utils/user/post";
import { toast } from "react-toastify";
import "./index.css";


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

  const handleFileUpload = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const handlingPostCreate = async () => {
    form.validateFields().then(async (formValues) => {
      const formData = new FormData();
      formData.append("title", formValues.content.slice(0, 2));
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
    <>
      <Modal
        title="Create a post"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handlingPostCreate}
          autoComplete="off"
          initialValues={{
            content: posts !== null ? posts.content : null,
          }}
        >
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
              style={{height:400}}
              className="modal-input"
                defaultValue={posts.content}
                placeholder="What do you want to talk about?"
              />
            ) : (
              <TextArea className="modal-input"
               style={{height:400}} 
              
               placeholder="What do you want to talk about?" />
            )} 

          
          </Form.Item>

          <label htmlFor="pic-upload">
            <AiOutlinePicture size={35} className="picture-icon" />
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
    </>
  );
};

export default ModalComponent;
