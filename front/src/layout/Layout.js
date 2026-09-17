import React, { useEffect,useState }  from 'react';
import { Container, Row, Col,Button,Modal } from 'react-bootstrap';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import useLayout from 'hooks/useLayout';
import Footer from 'layout/footer/Footer';
import Nav from 'layout/nav/Nav';
import RightButtons from 'layout/right-buttons/RightButtons';
import SidebarMenu from 'layout/nav/sidebar-menu/SidebarMenu';
import 'react-toastify/dist/ReactToastify.css';
import { loginPending, loginSuccess, loginFail } from '../auth/authSlice';

const Layout = ({ children }) => {
  useLayout();

  const { pathname } = useLocation();
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [mcode, setmcode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    document.documentElement.click();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
    }, [pathname]);

    const handlechangemembercode = React.useCallback(async () => {
      document.body.classList.add('spinner');
      const admincode=currentUser.createdby;
      // const response = await axios.get(`http://3.109.198.190:5000/dashboard/get_broadcast`, { params: { term, sortBy, pageSize, pageIndex } });
      const response = await axios.post(`${API_URL}member/membercodeavailable`, {  mcode,admincode  });
  
      setTimeout(() => {
       
        if (response.data.success === '1') {
           dispatch(loginSuccess(response.data));
           setShow(false);
           window.location.reload(false);
        }
        else
        {
          toast.success('Please Enter valid Member Code', {
            position: 'top-right',
          });
          // return dispatch(loginFail('Please Enter valid Member Code '));
        }
       
        document.body.classList.remove('spinner');
      }, 1000);
    }, [mcode]);

    const handleClose = () => 
    {
          setShow(false);
    }
    const handleShow = () => {
  
      setShow(true);
     
    }
  return (
    <>
      <Nav />
      <main>
        <Container>
          <Row className="h-100">
            <SidebarMenu />
            {currentUser.membercode !== currentUser.createdby && currentUser.access==='yes' &&
           <div align="right">
            <Button onClick={handleShow} >Change Member</Button>
            <br/><br/>
            </div>
}
            <Col className="h-100" id="contentArea">
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
      <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Member</Modal.Title>
              </Modal.Header>
              {/* <Modal.Body>(Same Template message)</Modal.Body> */}
              <Modal.Body>Member Code : <input type="text" name="member_code" id="member_code"  onChange={(e) => {
                      setmcode(e.target.value);
                    }}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlechangemembercode}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
      {/* <RightButtons /> */}
    </>
  );
};

export default React.memo(Layout);
