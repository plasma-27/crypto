
import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";

const Homepage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currencyFilter, setCurrencyFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [kindFilter, setKindFilter] = useState("");
  const [filterType, setFilterType] = useState("");

  const fetchNews = async (filters = {}) => {
    setLoading(true);

    // Default API endpoint
    let apiUrl = `https://cryptopanic.com/api/free/v1/posts/?auth_token=c9ca3527fd6e028e7c3edf0c1450d691876d0854&public=true`;

    // If filters are applied, modify the API call
    if (Object.keys(filters).length > 0) {
      const { currencyFilter, regionFilter, kindFilter, filterType } = filters;
      apiUrl +=
        (currencyFilter ? `&currencies=${currencyFilter}` : "") +
        (regionFilter ? `&regions=${regionFilter}` : "") +
        (kindFilter ? `&kind=${kindFilter}` : "") +
        (filterType ? `&filter=${filterType}` : "");
    }

    try {
      const { data } = await axios.get(apiUrl);
      console.log("Fetched news:", data);
      if (data.results) {
        setNews(data.results);
      } else {
        setNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    // Fetch default news on page load (without any filters)
    fetchNews();
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    
    // Fetch news with filters
    fetchNews({ currencyFilter, regionFilter, kindFilter, filterType });
  };

  return (
    <>
      <Banner />
      <CoinsTable />

      {/* News Filter Section */}
      <Container style={{ textAlign: "center", marginTop: 20 }}>
        <Typography variant="h4" style={{ marginBottom: 20 }}>
          Filter Cryptocurrency News
        </Typography>

        <form onSubmit={handleFilterChange} style={{ marginBottom: 30 }}>
          <FormControl variant="outlined" style={{ marginRight: 20, minWidth: 150 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              label="Currency"
            >
             

              <MenuItem value="">All</MenuItem>
              <MenuItem value="ADA">Cardano</MenuItem>
              <MenuItem value="AVAX">Avalanche</MenuItem>
              <MenuItem value="BAT">Basic Attention Token</MenuItem>
              <MenuItem value="BCH">Bitcoin Cash</MenuItem>
              <MenuItem value="BTC">Bitcoin</MenuItem>
              <MenuItem value="CHZ">Chiliz</MenuItem>
              <MenuItem value="COMP">Compound</MenuItem>
              <MenuItem value="CRO">Crypto.com Coin</MenuItem>
              <MenuItem value="CRV">Curve DAO Token</MenuItem>
              <MenuItem value="DOGE">Dogecoin</MenuItem>
              <MenuItem value="DASH">Dash</MenuItem>
              <MenuItem value="DGB">DigiByte</MenuItem>
              <MenuItem value="ETC">Ethereum Classic</MenuItem>
              <MenuItem value="ETH">Ethereum</MenuItem>
              <MenuItem value="FIL">Filecoin</MenuItem>
              <MenuItem value="FTT">FTX Token</MenuItem>
              <MenuItem value="GRT">The Graph</MenuItem>
              <MenuItem value="HBAR">Hedera Hashgraph</MenuItem>
              <MenuItem value="KSM">Kusama</MenuItem>
              <MenuItem value="LINK">Chainlink</MenuItem>
              <MenuItem value="LEND">Aave (LEND)</MenuItem>
              <MenuItem value="LTC">Litecoin</MenuItem>
              <MenuItem value="MANA">Decentraland</MenuItem>
              <MenuItem value="MATIC">Polygon (Matic)</MenuItem>
              <MenuItem value="NEO">Neo</MenuItem>
              <MenuItem value="OMG">OMG Network</MenuItem>
              <MenuItem value="RUNE">Thorchain</MenuItem>
              <MenuItem value="SHIB">Shiba Inu (SHIB)</MenuItem>
              <MenuItem value="SNX">Synthetix</MenuItem>
              <MenuItem value="SOL">Solana</MenuItem>
              <MenuItem value="TRX">Tron</MenuItem>
              <MenuItem value="UNI">Uniswap</MenuItem>
              <MenuItem value="WAVES">Waves</MenuItem>
              <MenuItem value="XEM">NEM</MenuItem>
              <MenuItem value="XRP">Ripple (XRP)</MenuItem>
              <MenuItem value="XVG">Verge</MenuItem>
              <MenuItem value="ZEC">Zcash</MenuItem>
              <MenuItem value="XTZ">Tezos</MenuItem>
              <MenuItem value="YFI">Yearn.Finance</MenuItem>

            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginRight: 20, minWidth: 150 }}>
            <InputLabel>Region</InputLabel>
            <Select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              label="Region"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ar">عربي (Arabic)</MenuItem>
              <MenuItem value="cn">中國人 (Chinese)</MenuItem>
              <MenuItem value="de">Deutsch (German)</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español (Spanish)</MenuItem>
              <MenuItem value="fr">Français (French)</MenuItem>
              <MenuItem value="it">Italiano (Italian)</MenuItem>
              <MenuItem value="jp">日本 (Japanese)</MenuItem>
              <MenuItem value="ko">한국인 (Korean)</MenuItem>
              <MenuItem value="nl">Dutch</MenuItem>
              <MenuItem value="pt">Português (Portuguese)</MenuItem>
              <MenuItem value="ru">Русский (Russian)</MenuItem>
              <MenuItem value="tr">Türkçe (Turkish)</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginRight: 20, minWidth: 150 }}>
            <InputLabel>Kind</InputLabel>
            <Select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value)}
              label="Kind"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="news">News</MenuItem>
              <MenuItem value="media">Media</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginRight: 20, minWidth: 150 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="rising">Rising</MenuItem>
              <MenuItem value="hot">Hot</MenuItem>
              <MenuItem value="bullish">Bullish</MenuItem>
              <MenuItem value="bearish">Bearish</MenuItem>
              <MenuItem value="important">Important</MenuItem>
              <MenuItem value="saved">Saved</MenuItem>
              <MenuItem value="lol">LOL</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
          >
            Apply Filters
          </Button>
        </form>

        {/* News Display Section */}
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <div style={{ textAlign: "left", width: "100%", backgroundColor: "#14161a", padding: "20px", borderRadius: "8px" }}>
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item.id} style={{ marginBottom: 20 }}>
                  <Typography variant="h6" style={{ color: "#EEBC1D" }}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: "#EEBC1D" }}>
                      {item.title}
                    </a>
                  </Typography>
                  <Typography variant="body2" style={{ color: "white" }}>
                    Source: {item.source.title} | Published: {new Date(item.published_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" style={{ color: "#aaa" }}>
                    {item.currencies && item.currencies.length > 0 ? 
                      item.currencies.map((currency) => currency.title).join(", ") 
                      : "No currencies available"}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="h6" style={{ color: "white" }}>
                No news available for the selected filters.
              </Typography>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Homepage;
