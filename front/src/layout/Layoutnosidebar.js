import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLayout from 'hooks/useLayout';
import Footer from 'layout/footer/Footer';
import Nav from 'layout/nav/Nav';
import RightButtons from 'layout/right-buttons/RightButtons';
import SidebarMenu from 'layout/nav/sidebar-menu/SidebarMenu';
import 'react-toastify/dist/ReactToastify.css';

const Layoutnosidebar = ({ children }) => {
  useLayout();

  const { pathname } = useLocation();
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    document.documentElement.click();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
    }, [pathname]);
  return (
    <>
      {/* <Nav /> */}
      
        <Container>
          <Row className="h-100">
            {/* <SidebarMenu /> */}
            <Col className="h-100" id="contentArea">
              {children}
            </Col>
          </Row>
        </Container>
      
      {/* <Footer /> */}
      {/* <RightButtons /> */}
    </>
  );
};

export default React.memo(Layoutnosidebar);
