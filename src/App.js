import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Layout,
  Card,
  Row,
  Input,
  Select,
  notification,
  Col
} from "antd";
import ReactPaginate from "react-paginate";
import { MinusCircleOutlined } from "@ant-design/icons";

import "./App.css";

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;
const App = () => {
  
  const searchElm = useRef("");
  const wrapperRef = useRef(null);
  const isInitialMount = useRef(true);

  const [searchArray, setSearchArray] = useState({});
  const [apis, setApis] = useState({});
  const [allCategories, setAllCategories] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState([]);

// react-paginate setup
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);


  function Cards({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, key) => (
            <a href={item.Link} >
            <div>
              <Card
                size="small"
                extra={<a href={item.Link}>More</a>}
                title={item.API}
                bordered={false}
                hoverable={true}
                style={{
                  width: 250,
                  margin: 15,
                }}
              >
                <h2 className="card-text">
                  {item.API}
                </h2>
                <p>Category : {item.Category}</p>
                <p className="card-text" >
                  {item.Description}
                </p>
              </Card>
            </div>
            </a>
          ))}
      </>
    );
  }

  const handlePageClick = (event) => {
    if (searchArray.length) {

      const newOffset = (event.selected * 20) % searchArray.length;
      setItemOffset(newOffset);

      const endOffset = newOffset + 20;
      setCurrentItems(searchArray.slice(newOffset, endOffset));

      setPageCount(Math.ceil(searchArray.length / 20));
    } else  {

      const newOffset = (event.selected * 20) % searchByCategory.length;
      setItemOffset(newOffset);

      const endOffset = newOffset + 20;
      setCurrentItems(searchByCategory.slice(newOffset, endOffset));

      setPageCount(Math.ceil(searchByCategory.length / 20));
    }
    wrapperRef.current.scrollIntoView();
  };

  const onhandleSearch = () => {
    const searchTerm = searchElm.current.input.value;
    if (searchTerm !== "") {
      const newApiList = searchByCategory.filter((api) => {
        return api.API.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (newApiList.length == 0) {
        notification.open({
          message: "No Search Results ",
          description: `Sorry, but nothing matched your search terms " ${searchTerm} " `,
          icon: (
            <MinusCircleOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
      }
      setSearchArray(newApiList);
    } else if (searchTerm == "") {
      setSearchArray([]);
    }
    setItemOffset(0)

  };

  const handleSelectCategory = (value) => {

    searchElm.current.select();
    setSearchArray([]);

    if (value == "allCategories") {
      setSearchByCategory(apis);
    } else {
      const newApiList = apis.filter((api) => {
        return api.Category.toLowerCase() === value.toLowerCase();
      });
      setSearchByCategory(newApiList);
    }
    setItemOffset(0)

  };

  useEffect(() => {
    
    const fetchApis = async () => {
      const data = await axios("https://api.publicapis.org/entries");
      setApis(data.data.entries);
      setSearchByCategory(data.data.entries);

      const endOffset = itemOffset + 20;
      
        setCurrentItems(data.data.entries.slice(itemOffset, endOffset));

        setPageCount(Math.ceil(data.data.entries.length / 20));
      
    };

    const fetchCategory = async () => {
      const categories = await axios("https://api.publicapis.org/categories");
      setAllCategories(categories.data.categories);
    };

    fetchApis();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else
    {
     if (searchArray.length) {
      const itemOffset = 0;
      const endOffset = itemOffset + 20;
      setCurrentItems(searchArray.slice(itemOffset, endOffset));

      setPageCount(Math.ceil(searchArray.length / 20));
      console.log(pageCount);
    } else if (searchByCategory.length) {
      const itemOffset = 0;
      const endOffset = itemOffset + 20;
      setCurrentItems(searchByCategory.slice(itemOffset, endOffset));

      setPageCount(Math.ceil(searchByCategory.length / 20));
      console.log(pageCount);

    }
  }
  }, [searchByCategory, searchArray ]);

  return (
    <div className="App" ref={wrapperRef}>
      <Layout className="layout">
        <Header
        style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
        >
   <Row

      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      <Col className="gutter-row" span={4}>
      
      <Search
              ref={searchElm}
              placeholder="input search text"
              onChange={onhandleSearch}
              name="search"
              style={{
                width: 200,
                marginTop: 25,
                marginLeft: 40,
              }}
            />
      </Col>
      <Col className="gutter-row" span={4}>
      <Select
              defaultValue="All Category"
              placeholder="input Category"
              onChange={handleSelectCategory}
              name="category"
              style={{
                width: 200,
                marginTop: 25,
                marginLeft: 40,
              }}
            >
              <Option value="allCategories">All Categories</Option>

              {allCategories &&
                allCategories.map((item, key) => (
                  <Option value={item}>{item}</Option>
                ))}
            </Select></Col>

            
            
            </Row>
        </Header>
        <Content
          className="site-layout "
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <Breadcrumb
            style={{
              margin: "5px 0",
            }}
          >
            {searchArray.length ? (
              <Breadcrumb.Item>
              total : {searchArray.length} apis , {Math.ceil(searchArray.length / 20)} page  
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item> total : {searchByCategory.length} apis ,  {Math.ceil(searchByCategory.length / 20)} page </Breadcrumb.Item>
            )}
          </Breadcrumb>
          {searchByCategory.length ? (
            <>
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 380,
                }}
              >
                <Row
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                >
                  <Cards currentItems={currentItems} />
                </Row>
                <Row
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  style={{ justifyContent: "center" }}
                >
                  <ReactPaginate
                    className="pagination"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    activeClassName="active"
                  />
                </Row>
              </div>
            </>
          ) : (
            <div
              className="site-layout-background site-card-border-less-wrapper"
              style={{
                padding: 24,
                minHeight: 380,
              }}
            >
              <Row
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
                }}
              >
                {[...Array(8)].map((e, i) => (
                  <Card
                    size="small"
                    extra={<a href="">More</a>}
                    title=""
                    bordered={false}
                    style={{
                      width: 250,
                      margin: 15,
                    }}
                    loading="true"
                  ></Card>
                ))}
              </Row>
            </div>
          )}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
