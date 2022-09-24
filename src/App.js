import React, { useState, useEffect } from "react";
import axios from "axios";
import { Breadcrumb, Layout, Menu, Card, Col, Row, List } from "antd";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [apis, setApis] = useState([]);

  const fetchApis = async () => {
    const apis = await axios("https://api.publicapis.org/entries");
    setApis(apis);
  };

  useEffect(() => {
    fetchApis();
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
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
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          {apis.data ? (
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
                  title={apis.data.entries[0]["API"]}
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
               
              </Row>
            </div>
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
        </Content>  <Card
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
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {apis.data ? (
            <h1>{apis.data.entries[0]["API"]}</h1>
          ) : (
            <h1>spinner</h1>
          )}
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
