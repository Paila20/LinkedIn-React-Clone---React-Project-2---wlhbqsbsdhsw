import { Avatar, Button, Space, Typography, Box } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import './index.css'


export default function  Premium() {
  return (
    <div className='mainContainerTrypremium'>
      <div
        style={{
          height: "130px",
          width: "100%",
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <div style={{ height: "100px", width: "100%", borderBottom: "1px solid #8c8c8c33", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Space style={{ width: "74%", height: 50, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" style={{ transform: "scale(1.8)", marginTop: "10px" }}><HomeOutlined /></Link>
            <Link className='backtohomeLink' to='/'>Back to LinkedIn.com</Link>
          </Space>
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginBottom: "50px", gap: "5px" }}>
          <h2>Achieve your goals faster with Premium.</h2>
        
          <p className='monthTrail'>Start your free 1-month trial today. Cancel anytime. We’ll send you a reminder 7 days before your trial ends.</p>
          <Button
              style={{ marginTop: "15px", width: "10%", borderRadius: "20px" }}
              type="primary"
              shape="round"
            >
              Try Now
            </Button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <div className='career'>
          <span className='headerCareer'>
            <h2>Career</h2>
            <p>Get hired and get ahead</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Stand out and get in touch with hiring managers</li>
              <li>See how you compare to other applicants</li>
              <li>Learn new skills to advance your career</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              style={{ marginTop: "10px", width: "100%", borderRadius: "20px" }}
              type="primary"
              shape="round"
            >
              Learn more
            </Button>
          </span>
        </div>
        <div className='career'>
          <span className='headerCareer'>
            <h2>Business</h2>
            <p>Grow and nurture your network</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Find and Contact the right people</li>
              <li>Promote and grow your business</li>
              <li>Learn new skills to enhance your professional brand</li>
            </ul>
          </span>
          <span className='footerCareer'>
            <Button
              style={{ marginTop: "10px", width: "100%", borderRadius: "20px" }}
              type="primary"
              shape="round"
            >
              Learn more
            </Button>
          </span>
        </div>
        <div className='career'>
          <span className='headerCareer'>
            <h2>Recruiter Lite</h2>
            <p>Find and hire talent</p>
            <hr />
          </span>
          <span className='mainCareer'>
            <ul>
              <li>Find Great candidates,faster</li>
              <li>Contact top talent directly</li>
              <li>Build relationships with top talents</li>
            </ul>
          </span>
         
          <span className='footerCareer'>
            <Button
              style={{ marginTop: "60px", width: "100%", borderRadius: "20px" }}
              type="primary"
              shape="round"
            >
              Learn more
            </Button>
          </span>
        </div>
      
      </div>
    </div>
  );
}



