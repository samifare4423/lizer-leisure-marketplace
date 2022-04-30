import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout} from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: 'Play, sans-serif',
    backgroundColor :"rgb(0,0,0)",
    marginTop: "50px",
    fontSize:"18px",
    height:"50vh",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: 'Barlow Condensed, sans-serif',
    fontSize:"25px",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          
          <Menu
            theme="dark"
            mode="vertical"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "150px",
              width: "100%",
              background:"black",
              justifyContent:"flex-start",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
            <Menu.Item key="nftMarket" onClick={() => setInputValue("explore")} style={{ borderRadius:"15px", }} >
              <NavLink to="/NFTMarketPlace" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize:"25px",}}>EXPLORE</NavLink>
            </Menu.Item>
            <Menu.Item key="nft" style={{ borderRadius:"15px", }}>
              <NavLink to="/nftBalance" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize:"25px",}}>MY NFTs</NavLink>
            </Menu.Item>

          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
    
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "inline" }}>
  <h1 style={{color:"white", fontFamily: 'Bebas Neue, cursive', fontSize:"40px",width:"250px",}}>LIZER LEISURE</h1>
  </div>
);

export default App;
