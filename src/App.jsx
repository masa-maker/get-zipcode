import { useState } from 'react';
import axios from "axios";
import styled from 'styled-components';

function App() {

  const [ searchText, setSearchText ] = useState("");
  const [ results, setResults ] = useState({ zipcode: "", address1: "", address2: "" });
  
  const onChangeSearchText = (event) => setSearchText(event.target.value);

  const onClickSearch = () => {
    axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${searchText}`).then((res) => {
      setResults(
        {
          zipcode: res.data.results[0].zipcode,
          address1: res.data.results[0].address1,
          address2: res.data.results[0].address2 + res.data.results[0].address3
        }
      )
    })
    .catch((err) => alert("郵便番号を入力してください。"));
  }

  return (
    <div className="App">
      <div>
        <h1>郵便番号検索</h1>
        <SInput type="text" placeholder="郵便番号を入力" value={searchText} onChange={onChangeSearchText} />
        <SButton onClick={onClickSearch} >検索</SButton>
      </div>
      <SCard>
        <SDl>
          <dt>郵便番号</dt>
            <dd>{results.zipcode || "検索結果がここに表示されます"}</dd>
          <dt>都道府県</dt>
            <dd>{results.address1 || "検索結果がここに表示されます"}</dd>
          <dt>市区町村</dt>
            <dd>{results.address2 || "検索結果がここに表示されます"}</dd>
        </SDl>
      </SCard>
    </div>
  );
}


const SButton = styled.button`
background-color: #40514e;
color: #fff;
padding: 6px 24px;
border: none;
outline: none;
border-radius: 9999px;
&:hover {
  cursor: pointer;
  opacity: 0.8;
}
`;

const SInput = styled.input`
padding: 8px 16px;
border: solid #ddd 1px;
border-radius: 9999px;
outline: none;
margin-right: 10px;
`;

const SDl = styled.dl`
  text-align: left;
 margin-bottom: 0px;
  dt {
    float: left;
  }
  dd {
  padding-left: 32px;
  padding-bottom: 8px;
  overflow-wrap: break-word;
  }
`;

const SCard = styled.div`
background-color : #fff;
box-shadow: #ddd 0px 0px 4px 2px;
border-radius: 8px;
padding: 16px; 
margin-top: 20px;
width: 400px;
`;

export default App;
