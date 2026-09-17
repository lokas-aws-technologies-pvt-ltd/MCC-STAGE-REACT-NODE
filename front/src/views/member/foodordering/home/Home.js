/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowSize } from 'hooks/useWindowSize';
import { Row, Col, Button, Badge, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { SERVICE_URL, API_URL } from 'config.js';
import { NavLink, useHistory } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import Clamp from 'components/clamp';
import { catImageLivePath, itemImageLivePath } from 'constants.js';
import CategoryMenuContent from './components/CategoryMenuContent';
import ItemCounter from './components/ItemCounter';
import Layout from '../../../../layout/Layout';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../cart/cartSlice';
import { getProducts } from '../../../../api/products';

const Home = () => {
  const title = 'F & B';
  const description = 'F & B';
  const { themeValues } = useSelector((state) => state.settings);
  const xlBreakpoint = parseInt(themeValues.xl.replace('px', ''), 10);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isXlScreen, setIsXlScreen] = useState(false);
  const [isOpenCategoriesModal, setIsOpenCategoriesModal] = useState(false);
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [currentCat, setCurrentCat] = useState('');
  const [currentCatName, setCurrentCatName] = useState('');
  const [currentSubCat, setCurrentSubCat] = useState('');
  const [currentSubCatName, setCurrentSubCatName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [foodAvailability, setFoodAvailability] = useState('');
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = React.useState(3);
  const [term, setTerm] = useState('');
  const cart = useSelector((state) => state.cart);
  const [pageSize, setpageSize] = useState(12);
  const [pageIndex, setPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    // dispatch(clearCart());
    dispatch(getTotals());
  }, [cart, dispatch]);
  useEffect(() => {
    if (width) {
      if (width >= xlBreakpoint) {
        if (!isXlScreen) setIsXlScreen(true);
        if (isOpenCategoriesModal) setIsOpenCategoriesModal(false);
      } else if (isXlScreen) setIsXlScreen(false);
    }
    return () => {};
    // eslint-disable-next-line
  }, [width]);

  const fetchCategoryData = React.useCallback(async () => {
    document.body.classList.add('spinner');
    const sortBy = [{ id: 'orderby', desc: false }];
    const response = await axios.get(`${API_URL}restaurant/category_get`, { params: { active: 1, sortBy } });

    setTimeout(() => {
      const { result } = response.data;
      setCatData(result);
      document.body.classList.remove('spinner');
    }, 1000);
  }, []);
  useEffect(() => {
    fetchCategoryData();
  }, []);
  const fetchSubCategoryData = React.useCallback(async () => {
    if (currentCat != '') {
      const response = await axios.get(`${API_URL}restaurant/sub_category_get`, { params: { active: 1, catid: currentCat } });

      setTimeout(() => {
        const { result } = response.data;
        setSubCatData(result);
        document.body.classList.remove('spinner');
      }, 1000);
    }
  }, [currentCat]);
  useEffect(() => {
    fetchSubCategoryData();
  }, [currentCat]);
  const searchItem = (val) => {
    setTerm(val || undefined);
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // history.push('/cart');
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const onInput = (event, previousvalue, product) => {
    // console.log('enteredvalue', event.target.value);
    // console.log('previousvalue', previousvalue);
    if (event.target.value <= 0) {
      dispatch(removeFromCart(product));
    } else if (event.target.value < previousvalue) {
      dispatch(decreaseCart(product));
    } else if (event.target.value > previousvalue) {
      dispatch(addToCart(product));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadProducts = () => {
    document.body.classList.add('spinner');
    setLoading(true);
    const active = 1;
    // console.log('currentSubCat', currentSubCat);
    setTimeout(() => {
      getProducts(term, currentCat, currentSubCat, pageSize, pageIndex, foodType, foodAvailability, active)
        .then((res) => {
          // ('pageIndex', pageIndex);
          const newPage = pageIndex + 1;
          const newList = data.concat(res.result);
          setData(newList);
          setPageIndex(newPage);
          if (res.result.length === 0) setNoData(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          document.body.classList.remove('spinner');
        });
    }, 1500);
  };

  window.onscroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - 20;
    const windowBottom = windowHeight + window.pageYOffset;
    // console.log('docHeight', docHeight);
    // console.log('windowBottom', windowBottom);
    // if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    if (windowBottom >= docHeight) {
      // console.log('scrollloading');
      // console.log('noData', noData);
      if (!noData) {
        loadProducts();
      }
    }
  };

  const getFoodIcon = (i) => {
    const myArray = ['loaf', 'banana', 'burger', 'cupcake', 'mushrooms', 'pear', 'pepper', 'radish', 'tea'];
    const j = myArray.length;
    // console.log('j', j);
    if (i > j) {
      const k = i % j;
      // console.log('k', k);
      return myArray[k];
    }
    return myArray[i];
  };
  useEffect(() => {
    loadProducts();
  }, [currentCat, currentSubCat, foodType, foodAvailability, term]);
  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <Layout>
        <div className="page-title-container">
          <Row className="g-0">
            {/* Title Start */}
            <Col xs="auto" className="mb-3 mb-sm-0 me-auto">
              <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
                <CsLineIcons icon="chevron-left" size="13" />
                <span className="align-middle text-small ms-1">Home</span>
              </NavLink>
              <h1 className="mb-0 pb-0 display-4" id="title">
                {title}
              </h1>
            </Col>
            {/* Title End */}

            {/* Top Buttons Start */}
            <Col xs="12" o sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3" style={{ position: 'relative' }}>
              <NavLink
                className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
                to="/member/foodordering/cart"
                style={{ position: 'fixed', zIndex: 1 }}
              >
                <Button
                  variant="primary"
                  className="btn-icon btn-icon-start w-100 w-md-auto d-inline-block"
                  style={{ backgroundColor: '#f3a40f', color: '#000000', border: 'none' }}
                >
                  <CsLineIcons icon="cart" />{' '}
                  <span>
                    {cart.cartTotalQuantity > 1 ? `${cart.cartTotalQuantity} items` : `${cart.cartTotalQuantity} item`} &#x20B9;.{cart.cartTotalAmount}
                  </span>{' '}
                  <CsLineIcons icon="chevron-right" />
                </Button>
              </NavLink>
            </Col>
            {/* Top Buttons End */}
          </Row>
        </div>
        {/* Title End */}
        {/* Categories Start */}
        <Row className="g-2 row-cols-2 row-cols-md-3 row-cols-xl-6 mb-5">
          {subCatData.length > 0 && (
            <Col className="sh-15 catCol">
              <Card
              // eslint-disable-next-line eqeqeq
              >
                <Card.Img
                  src="/img/product/small/allcat.png"
                  className="h-100 hover-border-primary cat"
                  style={{
                    minHeight: 120,
                    padding: 1,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setPageIndex(0);
                    setData([]);
                    setSubCatData([]);
                    setNoData(false);
                    setCurrentCat('');
                    setCurrentCatName('');
                    setCurrentSubCat('');
                    setCurrentSubCatName('');
                  }}
                  alt="card image"
                />
              </Card>
            </Col>
          )}
          {/*    <Col className="sh-15 catCol" >
            <Card
              // eslint-disable-next-line eqeqeq
              
            >

<Card.Img
                        src='/img/product/small/allcat.png'
                        className={currentCat === ''? `h-100 hover-border-primary activeCat` : `h-100 hover-border-primary cat`}
                        style={{ 

                          minHeight:120,padding:1, cursor:'pointer'}}
                        onClick={() => {
                          setPageIndex(0);
                          setData([]);
                          setNoData(false);
                          setCurrentCat('');
                        }}
                        alt="card image"
                      />
            
            </Card>
          </Col> */}
          {subCatData.length > 0 &&
            subCatData.map(function (value, i) {
              // const imgUrl = value.image ? `${catImageLivePath}${value.image}` : '/img/product/small/default.png';
              return (
                <Col key={`cat_${value.sub_id}`} className="sh-15 catCol">
                  <Card
                  // eslint-disable-next-line eqeqeq
                  >
                    <Card.Title
                      className={currentSubCat === value.sub_id ? `h-100 hover-border-primary activeCat` : `h-100 hover-border-primary cat`}
                      style={{
                        minHeight: 120,
                        padding: '20% 20%',
                        margin: '0 auto',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setPageIndex(0);
                        setData([]);
                        setNoData(false);
                        setCurrentSubCat(value.sub_id);
                        setCurrentSubCatName(value.sub_name);
                      }}
                    >
                      {value.sub_name}
                    </Card.Title>
                  </Card>
                </Col>
              );
            })}
          {catData.length > 0 &&
            subCatData.length <= 0 &&
            catData.map(function (value, i) {
              const imgUrl = value.image ? `${catImageLivePath}${value.image}` : '/img/product/small/default.png';
              return (
                <Col key={`cat_${value.id}`} className="sh-15 catCol">
                  <Card
                  // eslint-disable-next-line eqeqeq
                  >
                    <Card.Img
                      src={imgUrl}
                      className={currentCat === value.id ? `h-100 hover-border-primary activeCat` : `h-100 hover-border-primary cat`}
                      style={{
                        minHeight: 120,
                        padding: 1,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setPageIndex(0);
                        setData([]);
                        setNoData(false);
                        setCurrentCat(value.id);
                        setCurrentCatName(value.name);
                      }}
                      alt="card image"
                    />
                  </Card>
                </Col>
              );
            })}
        </Row>
        {/* Categories End */}
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-2 mb-5">
          <Col xs="12" o sm="auto" className="d-flex align-items-end mb-2 mb-sm-0 order-sm-3">
            <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 search-input-container w-100 shadow bg-foreground">
              <input
                className="form-control datatable-search"
                value={term || ''}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setPageIndex(0);
                  setData([]);
                  setNoData(false);
                }}
                placeholder="Search"
              />
              {term && term.length > 0 ? (
                <span
                  className="search-delete-icon"
                  onClick={() => {
                    setTerm('');
                    setPageIndex(0);
                    setData([]);
                    setNoData(false);
                  }}
                >
                  <CsLineIcons icon="close" />
                </span>
              ) : (
                <span className="search-magnifier-icon pe-none">
                  <CsLineIcons icon="search" />
                </span>
              )}
            </div>
          </Col>
          <Col xs="12" o sm="auto" className="d-flex align-items-end mb-2 mb-sm-0 order-sm-3">
            <div className="o-switch btn-group" data-toggle="buttons" role="group">
              <label className="btn btn-secondary" style={{ backgroundColor: '#29060c', borderColor: '#29060c', color: '#FFF' }}>
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  value=""
                  autoComplete="off"
                  checked={foodType === ''}
                  onChange={() => {
                    setPageIndex(0);
                    setData([]);
                    setNoData(false);
                    setFoodType('');
                  }}
                />
                All
              </label>
              <label className="btn btn-secondary" style={{ backgroundColor: '#039851', borderColor: '#039851', color: '#29060c' }}>
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  value="V"
                  autoComplete="off"
                  checked={foodType === 'V'}
                  onChange={() => {
                    setPageIndex(0);
                    setData([]);
                    setNoData(false);
                    setFoodType('V');
                  }}
                />
                Veg Only
              </label>
              <label className="btn btn-secondary" style={{ backgroundColor: '#85472a', borderColor: '#85472a', color: '#29060c' }}>
                <input
                  type="radio"
                  name="options"
                  id="option3"
                  value="N"
                  autoComplete="off"
                  checked={foodType === 'N'}
                  onChange={() => {
                    setPageIndex(0);
                    setData([]);
                    setNoData(false);
                    setFoodType('N');
                  }}
                />
                Non-veg Only
              </label>
            </div>
          </Col>
        </Row>
        <Row className="row-cols-1 row-colls-sm-2 row-cols-md-2 row-cols-lg-4 g-2 md-5">
          <Col xs="12" sm="auto" className="d-flex align-items-end mb-2 mb-sm-0 order-sm-3">
            <div className="d-inline-block float-md-start me-1 mb-1 mb-md-0 w-100 ">
              {currentCatName != '' && (
                <span>
                  {currentCatName}
                  <span>
                    <Button
                      variant="foreground"
                      size="sm"
                      className="btn-icon btn-icon-only mb-1"
                      onClick={() => {
                        setPageIndex(0);
                        setData([]);
                        setSubCatData([]);
                        setNoData(false);
                        setCurrentCat('');
                        setCurrentCatName('');
                        setCurrentSubCat('');
                        setCurrentSubCatName('');
                      }}
                    >
                      <CsLineIcons icon="error-hexagon" size="13" />
                    </Button>
                  </span>
                </span>
              )}{' '}
              {currentSubCatName != '' && (
                <span>
                  {currentSubCatName}{' '}
                  <span>
                    <Button
                      variant="foreground"
                      size="sm"
                      className="btn-icon btn-icon-only mb-1"
                      onClick={() => {
                        setPageIndex(0);
                        setData([]);
                        setNoData(false);
                        setCurrentSubCat('');
                        setCurrentSubCatName('');
                      }}
                    >
                      <CsLineIcons icon="error-hexagon" size="13" />
                    </Button>
                  </span>
                </span>
              )}
            </div>
          </Col>
        </Row>
        {/* Product List Start */}
        <Row className="row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-2 mb-5">
          {data.length > 0
            ? // eslint-disable-next-line func-names
              data.map(function (product, i) {
                const existingIndex = cart.cartItems.findIndex((item) => item.item_id === product.item_id);
                // console.log('existingIndex', existingIndex);
                // eslint-disable-next-line eqeqeq
                const catid = catData.filter((p) => p.id == product.cat_id);
                return (
                  <Col key={`prod_${product.item_id}`}>
                    <Card className="h-97" style={{ marginBottom: '10px' }}>
                      {/* <Card.Img
                        src={product.item_image ? `${itemImageLivePath}${product.item_image}` : '/img/product/small/default.png'}
                        className="card-img-top sh-22"
                        alt="card image"
                      /> */}
                      <Card.Body style={{ minHeight: '125px', padding: '5%' }}>
                        <Row>
                          <Col className="mb-12 mb-sm-12">
                            <h6 className="heading mb-1"> {product.item_name}</h6>

                            {product.varient === 'V' ? (
                              <img
                                src="/assets/images/veg.svg"
                                alt="veg"
                                style={{ position: 'relative', display: 'inline-block', float: 'right', top: '-52%' }}
                              />
                            ) : (
                              <img
                                src="/assets/images/non_veg.svg"
                                alt="non-veg"
                                style={{ position: 'relative', display: 'inline-block', float: 'right', top: '-52%' }}
                              />
                            )}
                          </Col>
                        </Row>

                        {/* <p style={{ marginBottom: '5px' }}>{product.description}</p> */}
                        <p>Available time : {product.availability_time}</p>
                        <Row>
                          <Col>
                            {/* {catid && Array.isArray(catid) && catid.length > 0 ? `${catid[0].name}` : ''} */}
                            <br />
                            <p style={{ position: 'absolute', bottom: '10px' }}>&#x20B9; {product.price}</p>
                          </Col>
                          <Col>
                            {existingIndex < 0 ? (
                              <button
                                type="button"
                                style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                                className="btn btn-outline-primary "
                                onClick={() => handleAddToCart(product)}
                              >
                                Add To Cart
                              </button>
                            ) : (
                              <InputGroup className="spinner sw-11" style={{ position: 'relative', display: 'inline-flex', height: '0px', background: '#fff' }}>
                                <InputGroup.Text id="basic-addon1">
                                  <button type="button" className="spin-down single px-2" onClick={() => handleDecreaseCart(product)}>
                                    -
                                  </button>
                                </InputGroup.Text>
                                <Form.Control
                                  value={cart.cartItems[existingIndex].cartQuantity}
                                  onInput={(e) => {
                                    onInput(e, cart.cartItems[existingIndex].cartQuantity, product);
                                  }}
                                  placeholder="Count"
                                  className="text-center"
                                />
                                <InputGroup.Text id="basic-addon2">
                                  <button type="button" className="spin-up single px-2" onClick={() => handleAddToCart(product)}>
                                    +
                                  </button>
                                </InputGroup.Text>
                              </InputGroup>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : ''}
        </Row>
        <Row>
          <Col>
            {loading ? <div className="text-center">loading data ...</div> : ''}
            {noData ? <div className="text-center">No More Products Available...</div> : ''}
            <div className="text-center">
              (Food Images are only representative of the food category and item, and not meant to be an exact reproduction of the item)
            </div>
          </Col>
        </Row>
        <br />
        <br />
        {/* Trending End */}
      </Layout>
    </>
  );
};

export default Home;
