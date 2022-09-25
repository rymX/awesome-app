import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Layout, Menu, Card, Col, Row, List } from "antd";
import ReactPaginate from "react-paginate";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [apis, setApis] = useState([]);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const fetchApis = async () => {
    const apis = await axios("https://api.publicapis.org/entries");
    setApis(apis.data.entries);

    const endOffset = itemOffset + 20;

    setCurrentItems(apis.data.entries.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(apis.data.entries.length / 20));
  };

  useEffect(() => {
    fetchApis();
  }, [itemOffset]);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div>
               <Card
                    size="small"
                    extra={<a href="#">More</a>}
                    title={"test"}
                    bordered={false}
                    style={{
                      width: 250,
                      margin: 15,
                    }}
                  >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
            </div>
          ))}
      </>
    );
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % apis.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="App">
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            theme:"dark",
            mode:"horizontal"
          }}
        >

          
         
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
