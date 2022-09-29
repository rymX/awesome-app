import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Breadcrumb, Layout, Button, Card, Row, Input, Select } from "antd";
import ReactPaginate from "react-paginate";
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

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, key) => (
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
                <h2
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.API}
                </h2>
                <p>Category : {item.Category}</p>
                <p
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.Description}
                </p>
              </Card>
            </div>
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
    } else {
      const newOffset = (event.selected * 20) % apis.length;
      setItemOffset(newOffset);

      const endOffset = newOffset + 20;
      setCurrentItems(apis.slice(newOffset, endOffset));

      setPageCount(Math.ceil(apis.length / 20));
    }

    wrapperRef.current.scrollIntoView();
  };

  const onhandleSearch = () => {
    const searchTerm = searchElm.current.input.value;
    if (searchTerm !== "") {
      const newApiList = apis.filter((api) => {
        return api.API.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchArray(newApiList);
      // if(searchArray.length) {
      //   const  newApiList = searchArray.filter((api)=>{
      //     return  (api.API).toLowerCase().includes(searchTerm.toLowerCase());
      //   })
      //   // console.log(newApiList);
      //  setSearchArray(newApiList)
      // }
      // else {
      //   const  newApiList = apis.filter((api)=>{
      //     return  (api.API).toLowerCase().includes(searchTerm.toLowerCase());
      //   })
      //   // console.log(newApiList);
      //  setSearchArray(newApiList)
      // }
    } else if (searchTerm == "") {
      setSearchArray(apis);
    }
  };

  const handleSelectCategory = (value) => {
    // empty search input
    if (value == "allCategories") {
      setSearchArray(apis);
      setSearchByCategory(apis);
    } else {
      const newApiList = apis.filter((api) => {
        return api.Category.toLowerCase() === value.toLowerCase();
      });

      setSearchArray(newApiList);
      setSearchByCategory(newApiList);
    }
  };

  useEffect(() => {
    const fetchApis = async () => {
      const data = await axios("https://api.publicapis.org/entries");
      setApis(data.data.entries);
      // setSearchArray(data.data.entries)

      const itemOffset = 0;
      const endOffset = itemOffset + 20;

      if (searchArray.length) {
        setCurrentItems(searchArray.slice(itemOffset, endOffset));

        setPageCount(Math.ceil(searchArray.length / 20));
      } else {
        setCurrentItems(data.data.entries.slice(itemOffset, endOffset));

        setPageCount(Math.ceil(data.data.entries.length / 20));
      }
    };

    const fetchCategory = async () => {
      const categories = await axios("https://api.publicapis.org/categories");
      setAllCategories(categories.data.categories);
      console.log(categories.data.categories);
      console.log(typeof categories.data.categories);
    };

    fetchApis();
    fetchCategory();
  }, []);
  // useEffect(() => {
  //   if (searchArray ) console.log("test ")
  //   setApis(searchArray)
  //   console.log("new api list " + searchArray)
  //  }, [searchTerm])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (searchArray.length) {
      const itemOffset = 0;
      const endOffset = itemOffset + 20;
      setCurrentItems(searchArray.slice(itemOffset, endOffset));

      setPageCount(Math.ceil(searchArray.length / 20));
    }
  }, [searchArray]);

  return (
    <div className="App" ref={wrapperRef}>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            theme: "dark",
            mode: "horizontal",
          }}
        >
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
          {/* <Select
            defaultValue="All Category"
            placeholder="input Category"
            onChange={handleSelectCategory}
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
          </Select> */}

          {/* {allCategories ? (
            <>
             <Select
            defaultValue="All Category"
            placeholder="input Category"
            style={{
              width: 200,
              marginTop: 25,
              marginLeft: 40,
            }}  

          <ItemsOfCategory items={allCategories} />

          </Select>
            </>
           
          ) : (
            <div>
            <h1>test2</h1></div>
          ) } */}
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
              margin: "16px 0",
            }}
          >
            {searchArray.length ? (
              <Breadcrumb.Item>
                total : {searchArray.length} apis{" "}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item> total : {apis.length} apis </Breadcrumb.Item>
            )}
          </Breadcrumb>
          {apis.length ? (
            <>
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
                  <Items currentItems={currentItems} />
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
                  style ={{justifyContent : 'center'}}
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
