import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Layout,
  Button,
  Card,
  Col,
  Row,
  List,
  Form,
  Input,
} from "antd";
import ReactPaginate from "react-paginate";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const App = () => {
  const searchElm = useRef("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const [apis, setApis] = useState({});

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  // function Items({ currentItems }) {
  //   return (
  //     <>
  //       {currentItems &&
  //         currentItems.map((item , key) => (
  //           <div>
  //              <Card
  //                   size="small"
  //                   extra={<a href={item.Link}>More</a>}
  //                   title={item.API}
  //                   bordered={false}
  //                   style={{
  //                     width: 250,
  //                     margin: 15,
  //                   }}
  //                 >
  //                   <h2>{item.API}</h2>
  //                   <p>Category : {item.Category}</p>
  //                   <p style={{

  //           textOverflow: "ellipsis",
  //           overflow: "hidden",
  //           whiteSpace: "nowrap",

  //         }}
  //                   >{item.Description}</p>
  //                 </Card>
  //           </div>
  //         ))}
  //     </>
  //   );
  // }
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems
            .filter((api) => {
              if (searchTerm == "") {
                return api;
              } else if (
                api.API.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return api;
              }
            })
            .map((item, key) => (
              <div>
                <Card
                  size="small"
                  extra={<a href={item.Link}>More</a>}
                  title={item.API}
                  bordered={false}
                  style={{
                    width: 250,
                    margin: 15,
                  }}
                >
                  <h2>{item.API}</h2>
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
    const newOffset = (event.selected * 20) % apis.length;
    setItemOffset(newOffset);
  };

  const onhandleChange = () => {
    const serachTerm = searchElm.current.input.value;
    setSearchTerm(serachTerm);
    // if (serachTerm !== ""){
    // const  newApiList = apis.filter((api)=>{
    //     return  (api.API).toLowerCase().includes(serachTerm.toLowerCase());
    //   })
    //  setApis(newApiList)
    // }
  };
  useEffect(() => {
    const fetchApis = async () => {
      const apis = await axios("https://api.publicapis.org/entries");
      setApis(apis.data.entries);

      const endOffset = itemOffset + 20;

      setCurrentItems(apis.data.entries.slice(itemOffset, endOffset));

      setPageCount(Math.ceil(apis.data.entries.length / 20));
    };

    fetchApis();
  }, [itemOffset, apis]);

  return (
    <div className="App">
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
            onChange={onhandleChange}
            name="search"
            style={{
              width: 200,
              marginTop: 25,
              marginLeft: 40
            }}
          />
        </Header>
        <Content
          className="site-layout "
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
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
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
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
                <Card
                  size="small"
                  extra={<a href="#">More</a>}
                  title=""
                  bordered={false}
                  style={{
                    width: 250,
                    margin: 15,
                  }}
                  loading="true"
                >
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
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
