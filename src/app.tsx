import * as React from 'react'
import styled from 'styled-components'
import { Color } from './brand'
import logo from './logo.svg'
import { GoogleMap } from './components/google-map'

const App = () => (
  <Wrapper>
    <Header>
      <Logo src={logo} />
      <H1>Welcome to React</H1>
    </Header>
    <ContentWrapper>
      <GoogleMapWrapper>
        <GoogleMap
          places={[
            {
              name: '大通公園',
              sporName: 'A',
              imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipOAdYrYwDE4nCIm78iNvrNPKouYlmFT9tNn08YD=w408-h271-k-no',
              geoPoint: {
                lat: 43.0582954,
                lng: 141.3466919
              }
            },
            {
              name: 'NORBESA (ノルベサ)',
              sporName: 'B',
              imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPMBHu0zqk5aViqNVXoY_LQ1PHko8g_r3om2t-D=w408-h725-k-no',
              geoPoint: {
                lat: 43.0552276,
                lng: 141.3511253
              }
            }
          ]}
        />
      </GoogleMapWrapper>
    </ContentWrapper>
  </Wrapper>
)
const Wrapper = styled.div`
  text-align: center;
`
const Header = styled.header`
  background-color: ${Color.Primary};
  height: 150px;
  padding: 20px;
  color: white;
`
const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`
const H1 = styled.h1`
  font-size: 1.5em;
`

const GoogleMapWrapper = styled.div`
  height: 100vh;
  width: 100%;
`
const ContentWrapper = styled.div`
  background: ${Color.Bg};
`

export default App
